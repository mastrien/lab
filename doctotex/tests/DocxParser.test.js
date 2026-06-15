const assert = require('node:assert');
const test = require('node:test');
const { parseMiniXML, loadSourceModule } = require('./test-helper.js');

// Load dependent module first
loadSourceModule('OmmlConverter.js');
const DocxParser = loadSourceModule('DocxParser.js');

test('DocxParser.dxaToCm - converts Twips to centimeters correctly', () => {
    assert.strictEqual(DocxParser.dxaToCm(1440), 2.54);
    assert.strictEqual(DocxParser.dxaToCm(720), 1.27);
    assert.strictEqual(DocxParser.dxaToCm(0), 0);
    assert.strictEqual(DocxParser.dxaToCm(null), null);
    assert.strictEqual(DocxParser.dxaToCm(undefined), null);
});

test('DocxParser.szToPt - converts half-points to pt correctly', () => {
    assert.strictEqual(DocxParser.szToPt(24), 12);
    assert.strictEqual(DocxParser.szToPt(36), 18);
    assert.strictEqual(DocxParser.szToPt(0), 0);
    assert.strictEqual(DocxParser.szToPt(null), null);
    assert.strictEqual(DocxParser.szToPt(''), null);
});

test('DocxParser.parseColor - hex color parsing', () => {
    assert.strictEqual(DocxParser.parseColor('auto'), null);
    assert.strictEqual(DocxParser.parseColor('FFFFFF'), '#FFFFFF');
    assert.strictEqual(DocxParser.parseColor('#FFFFFF'), '#FFFFFF');
    assert.strictEqual(DocxParser.parseColor(''), null);
});

test('DocxParser - parses relationships', () => {
    const parser = new DocxParser();
    const relsXml = `
        <Relationships>
            <Relationship Id="rId1" Type="http://.../image" Target="media/image1.png"/>
            <Relationship Id="rId2" Type="http://.../styles" Target="styles.xml"/>
        </Relationships>
    `;
    parser.parseRelationships(relsXml);

    assert.ok(parser.relationships['rId1']);
    assert.strictEqual(parser.relationships['rId1'].target, 'media/image1.png');
    assert.strictEqual(parser.relationships['rId2'].target, 'styles.xml');
});

test('DocxParser - parses document styles sheets', () => {
    const parser = new DocxParser();
    const stylesXml = `
        <w:styles>
            <w:style w:styleId="Heading1" w:type="paragraph">
                <w:name w:val="heading 1"/>
                <w:rPr>
                    <w:sz w:val="32"/>
                    <w:color w:val="2E74B5"/>
                    <w:rFonts w:ascii="Calibri"/>
                </w:rPr>
                <w:pPr>
                    <w:jc w:val="center"/>
                </w:pPr>
            </w:style>
        </w:styles>
    `;
    parser.parseStyles(stylesXml);

    const h1 = parser.styles['Heading1'];
    assert.ok(h1);
    assert.strictEqual(h1.name, 'heading 1');
    assert.strictEqual(h1.fontSize, 16);
    assert.strictEqual(h1.color, '#2E74B5');
    assert.strictEqual(h1.fontFamily, 'Calibri');
    assert.strictEqual(h1.alignment, 'center');
});

test('DocxParser - extracts paragraph properties overrides', () => {
    const parser = new DocxParser();
    const pNode = parseMiniXML(`
        <w:p>
            <w:pPr>
                <w:pStyle w:val="Heading2"/>
                <w:jc w:val="right"/>
                <w:ind w:firstLine="720"/>
            </w:pPr>
            <w:r><w:t>Heading Text</w:t></w:r>
        </w:p>
    `).childNodes[0];

    const props = parser.extractParagraphProperties(pNode);

    assert.strictEqual(props.styleId, 'Heading2');
    assert.strictEqual(props.alignment, 'right');
    assert.strictEqual(props.indent, 1.27);
    assert.strictEqual(props.isHeading, true);
    assert.strictEqual(props.headingLevel, 2);
});

test('DocxParser - detects section headings even when style is Normal', async () => {
    const parser = new DocxParser();
    const pNode = parseMiniXML(`
        <w:p>
            <w:pPr>
                <w:pStyle w:val="Normal"/>
                <w:jc w:val="center"/>
            </w:pPr>
            <w:r><w:t>INTRODUÇÃO</w:t></w:r>
        </w:p>
    `).childNodes[0];

    // We add a dummy paragraph to body first to simulate not being the very first paragraph
    parser.documentBody.push({ type: 'paragraph', runs: [{ type: 'text', data: { text: 'Title' } }] });

    await parser.processParagraph(pNode, null, 1);
    
    const parsedPara = parser.documentBody[1];
    assert.strictEqual(parsedPara.isHeading, true);
    assert.strictEqual(parsedPara.headingLevel, 1);
});

test('DocxParser - parses table structure', () => {
    const parser = new DocxParser();
    const tblNode = parseMiniXML(`
        <w:tbl>
            <w:tr>
                <w:tc>
                    <w:tcPr><w:shd w:fill="D3D3D3"/></w:tcPr>
                    <w:p><w:r><w:t>Cell 1</w:t></w:r></w:p>
                </w:tc>
                <w:tc>
                    <w:p><w:r><w:t>Cell 2</w:t></w:r></w:p>
                </w:tc>
            </w:tr>
        </w:tbl>
    `).childNodes[0];

    parser.processTable(tblNode, 1);

    assert.strictEqual(parser.documentBody.length, 1);
    const table = parser.documentBody[0];
    assert.strictEqual(table.type, 'table');
    assert.strictEqual(table.cols, 2);
    assert.strictEqual(table.columns, 1);
    assert.strictEqual(table.rows[0].cells[0].text, 'Cell 1');
    assert.strictEqual(table.rows[0].cells[0].bgColor, '#D3D3D3');
    assert.strictEqual(table.rows[0].cells[1].text, 'Cell 2');
    assert.strictEqual(table.rows[0].cells[1].bgColor, null);
});

test('DocxParser - parseSectionProperties extracts columns and section type', () => {
    const parser = new DocxParser();
    const sectNode = parseMiniXML(`
        <w:sectPr>
            <w:cols w:num="2" w:space="454"/>
            <w:type w:val="continuous"/>
        </w:sectPr>
    `).childNodes[0];

    const section = parser.parseSectionProperties(sectNode);

    assert.strictEqual(section.columns, 2);
    assert.strictEqual(section.type, 'continuous');
});

test('DocxParser - parseSectionProperties defaults to 1 column when no w:num', () => {
    const parser = new DocxParser();
    const sectNode = parseMiniXML(`
        <w:sectPr>
            <w:cols w:space="720"/>
        </w:sectPr>
    `).childNodes[0];

    const section = parser.parseSectionProperties(sectNode);

    assert.strictEqual(section.columns, 1);
});

test('DocxParser - parseHeaderFooterLines extracts text and alignment', () => {
    const parser = new DocxParser();
    const headerXml = `
        <w:hdr>
            <w:p>
                <w:pPr><w:jc w:val="center"/></w:pPr>
                <w:r><w:t>Header Title</w:t></w:r>
            </w:p>
            <w:p>
                <w:r><w:t>Header Subtitle</w:t></w:r>
            </w:p>
        </w:hdr>
    `;
    const lines = parser.parseHeaderFooterLines(headerXml);

    assert.strictEqual(lines.length, 2);
    assert.strictEqual(lines[0].text, 'Header Title');
    assert.strictEqual(lines[0].alignment, 'center');
    assert.strictEqual(lines[1].text, 'Header Subtitle');
    assert.strictEqual(lines[1].alignment, 'left');
});

test('DocxParser - integrates with real unzipped exemplo folder', async () => {
    const parser = new DocxParser();
    const result = await parser.parse(new ArrayBuffer(8));

    // Geometry assertion (from body-level sectPr: all margins 1418 dxa = 2.5cm)
    assert.ok(result.geometry);
    assert.strictEqual(result.geometry.width, 21.0);
    assert.strictEqual(result.geometry.height, 29.7);
    assert.strictEqual(result.geometry.margins.top, 2.5);
    assert.strictEqual(result.geometry.margins.right, 2.5);

    // Body assertion
    assert.ok(result.body.length > 0);
    const paragraphs = result.body.filter(x => x.type === 'paragraph');
    assert.ok(paragraphs.length > 0);

    // Paragraphs must carry columns info
    paragraphs.forEach(p => {
        assert.ok(p.columns === 1 || p.columns === 2, `Expected columns 1 or 2, got ${p.columns}`);
    });

    // Verify section structure
    assert.ok(result.sections.length >= 2, 'Expected at least 2 sections');
    const multiColSection = result.sections.find(s => s.columns === 2);
    assert.ok(multiColSection, 'Expected a 2-column section');

    // Header/footer should be extracted
    assert.ok(result.header, 'Header should be extracted');
    assert.ok(result.header.length > 0, 'Header should have text lines');

    // Verify a paragraph runs
    const testPara = paragraphs.find(p => p.runs.some(r => r.data && r.data.text && r.data.text.includes('INTRODUÇÃO')));
    assert.ok(testPara);

    // Verify images extracted
    assert.ok(result.images.length > 0);
    assert.ok(['jpg', 'jpeg'].includes(result.images[0].ext), `Expected jpg or jpeg, got ${result.images[0].ext}`);
    assert.ok(result.images[0].base64.length > 0);
});

test('DocxParser - correctly inherits pRunProps when runs lack them', async () => {
    const parser = new DocxParser();
    const pNode = parseMiniXML(`
        <w:p>
            <w:pPr>
                <w:rPr>
                    <w:sz w:val="24"/>
                    <w:b/>
                </w:rPr>
            </w:pPr>
            <w:r><w:t>Inherits</w:t></w:r>
        </w:p>
    `).childNodes[0];

    await parser.processParagraph(pNode, null, 1);
    const parsedPara = parser.documentBody[0];
    assert.strictEqual(parsedPara.runs[0].data.bold, true);
    assert.strictEqual(parsedPara.runs[0].data.fontSize, 12);
});

test('DocxParser - excludes main title styles from headings', () => {
    const parser = new DocxParser();
    
    // Check custom title styleId
    const propsTitle = parser.extractParagraphProperties(parseMiniXML(`
        <w:p>
            <w:pPr>
                <w:pStyle w:val="Titulo"/>
            </w:pPr>
        </w:p>
    `).childNodes[0]);
    assert.strictEqual(propsTitle.isHeading, false);
    
    const propsHeading = parser.extractParagraphProperties(parseMiniXML(`
        <w:p>
            <w:pPr>
                <w:pStyle w:val="Titre1"/>
            </w:pPr>
        </w:p>
    `).childNodes[0]);
    assert.strictEqual(propsHeading.isHeading, true);
    assert.strictEqual(propsHeading.headingLevel, 1);
});
