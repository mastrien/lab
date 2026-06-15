const assert = require('node:assert');
const test = require('node:test');
const { loadSourceModule } = require('./test-helper.js');

globalThis.Prism = {
    highlightElement: () => {}
};
globalThis.katex = {
    render: (latex, span) => { span.innerHTML = `[rendered:${latex}]`; }
};
globalThis.renderMathInElement = () => {};

class MockElement {
    constructor(tagName) {
        this.tagName = tagName;
        this.style = {};
        this.childNodes = [];
        this.innerHTML = '';
        this.innerText = '';
        this.className = '';
        this.classList = {
            add: (c) => { this.className = c; }
        };
    }

    appendChild(child) {
        this.childNodes.push(child);
    }
}

globalThis.document = {
    createElement: (tag) => new MockElement(tag)
};

const PreviewRenderer = loadSourceModule('PreviewRenderer.js');

test('PreviewRenderer.isColorDark - detects light/dark background colors', () => {
    const renderer = new PreviewRenderer(null, {});

    assert.strictEqual(renderer.isColorDark('#000000'), true);
    assert.strictEqual(renderer.isColorDark('#1B365D'), true);
    assert.strictEqual(renderer.isColorDark('#333333'), true);

    assert.strictEqual(renderer.isColorDark('#ffffff'), false);
    assert.strictEqual(renderer.isColorDark('#f3f4f6'), false);
    assert.strictEqual(renderer.isColorDark('#e2e8f0'), false);
});

test('PreviewRenderer.applyLayoutGeometries - applies margins and fonts to page element', () => {
    const paperMock = new MockElement('div');
    const renderer = new PreviewRenderer(paperMock, {});

    const geom = { margins: { top: 3.0, bottom: 2.5, left: 2.5, right: 2.0 } };
    const styles = { 'Normal': { fontFamily: 'Calibri' } };

    renderer.applyLayoutGeometries(geom, styles, 'keep');

    assert.strictEqual(paperMock.style.paddingTop, '3cm');
    assert.strictEqual(paperMock.style.paddingBottom, '2.5cm');
    assert.strictEqual(paperMock.style.paddingLeft, '2.5cm');
    assert.strictEqual(paperMock.style.paddingRight, '2cm');
    assert.strictEqual(paperMock.style.fontFamily, '"Calibri", serif');
});

test('PreviewRenderer.renderCode - updates syntax highlights text content', () => {
    const clsBlock = new MockElement('code');
    const texBlock = new MockElement('code');
    const bibBlock = new MockElement('code');

    const renderer = new PreviewRenderer(null, {
        cls: clsBlock,
        tex: texBlock,
        bib: bibBlock
    });

    renderer.renderCode({
        cls: 'cls-code',
        tex: 'tex-code',
        bib: 'bib-code'
    });

    assert.strictEqual(clsBlock.textContent, 'cls-code');
    assert.strictEqual(texBlock.textContent, 'tex-code');
    assert.strictEqual(bibBlock.textContent, 'bib-code');
});

test('PreviewRenderer - renders paragraphs and runs inline text', () => {
    const paperMock = new MockElement('div');
    const renderer = new PreviewRenderer(paperMock, {});

    const styles = {
        'Normal': { fontFamily: 'Calibri', fontSize: 12, lineSpacing: 1.5 }
    };

    const paragraphElem = {
        type: 'paragraph',
        styleId: 'Normal',
        isHeading: false,
        alignment: 'center',
        indent: 1.25,
        columns: 1,
        runs: [
            { type: 'text', data: { text: 'Hello ', bold: true } },
            { type: 'math', data: { latex: 'x=y' } }
        ]
    };

    renderer.renderParagraphNode(paragraphElem, styles, paperMock);

    assert.strictEqual(paperMock.childNodes.length, 1);
    const pEl = paperMock.childNodes[0];
    assert.strictEqual(pEl.tagName, 'P');
    assert.strictEqual(pEl.style.textAlign, 'center');
    assert.strictEqual(pEl.style.textIndent, '1.25cm');

    assert.strictEqual(pEl.childNodes.length, 2);
    assert.strictEqual(pEl.childNodes[0].tagName, 'span');
    assert.strictEqual(pEl.childNodes[0].innerText, 'Hello ');
    assert.strictEqual(pEl.childNodes[0].style.fontWeight, 'bold');

    assert.strictEqual(pEl.childNodes[1].tagName, 'span');
    assert.strictEqual(pEl.childNodes[1].className, 'math-block');
    assert.strictEqual(pEl.childNodes[1].innerHTML, '[rendered:x=y]');
});

test('PreviewRenderer - renders tables', () => {
    const paperMock = new MockElement('div');
    const renderer = new PreviewRenderer(paperMock, {});

    const tableElem = {
        type: 'table',
        cols: 2,
        columns: 1,
        rows: [
            { cells: [{ text: 'Cell 1', bgColor: '#000000' }, { text: 'Cell 2', bgColor: null }] }
        ]
    };

    renderer.renderTableNode(tableElem, paperMock);

    assert.strictEqual(paperMock.childNodes.length, 1);
    const tblEl = paperMock.childNodes[0];
    assert.strictEqual(tblEl.tagName, 'table');

    const tr = tblEl.childNodes[0].childNodes[0]; // tbody -> tr
    assert.strictEqual(tr.childNodes.length, 2);

    assert.strictEqual(tr.childNodes[0].style.backgroundColor, '#000000');
    assert.strictEqual(tr.childNodes[0].style.color, '#ffffff');
    // Table cells should use pre-wrap for multi-line content
    assert.strictEqual(tr.childNodes[0].style.whiteSpace, 'pre-wrap');
});

test('PreviewRenderer.renderDocumentHeader - renders header lines with alignment', () => {
    const paperMock = new MockElement('div');
    const renderer = new PreviewRenderer(paperMock, {});

    const headerLines = [
        { text: 'Conference Title', alignment: 'center' },
        { text: 'Subtitle Line', alignment: 'left' }
    ];

    renderer.renderDocumentHeader(headerLines);

    assert.strictEqual(paperMock.childNodes.length, 1);
    const headerEl = paperMock.childNodes[0];
    assert.strictEqual(headerEl.className, 'paper-header');
    assert.strictEqual(headerEl.childNodes.length, 2);
    assert.strictEqual(headerEl.childNodes[0].innerText, 'Conference Title');
    assert.strictEqual(headerEl.childNodes[0].style.textAlign, 'center');
    assert.strictEqual(headerEl.childNodes[1].innerText, 'Subtitle Line');
    assert.strictEqual(headerEl.childNodes[1].style.textAlign, 'left');
});

test('PreviewRenderer.renderDocumentFooter - renders footer lines', () => {
    const paperMock = new MockElement('div');
    const renderer = new PreviewRenderer(paperMock, {});

    const footerLines = [
        { text: 'Event Online', alignment: 'center' }
    ];

    renderer.renderDocumentFooter(footerLines);

    assert.strictEqual(paperMock.childNodes.length, 1);
    const footerEl = paperMock.childNodes[0];
    assert.strictEqual(footerEl.className, 'paper-footer');
    assert.strictEqual(footerEl.childNodes[0].innerText, 'Event Online');
    assert.strictEqual(footerEl.childNodes[0].style.textAlign, 'center');
});

test('PreviewRenderer.createMultiColumnContainer - creates CSS column container', () => {
    const paperMock = new MockElement('div');
    const renderer = new PreviewRenderer(paperMock, {});

    const container = renderer.createMultiColumnContainer(2);

    assert.strictEqual(container.className, 'multi-column-section');
    assert.strictEqual(container.style.columnCount, 2);
    assert.strictEqual(container.style.columnGap, '1.5cm');
});

test('PreviewRenderer.mapAlignmentToCSS - maps Word alignments to CSS', () => {
    const renderer = new PreviewRenderer(null, {});

    assert.strictEqual(renderer.mapAlignmentToCSS('justified'), 'justify');
    assert.strictEqual(renderer.mapAlignmentToCSS('both'), 'justify');
    assert.strictEqual(renderer.mapAlignmentToCSS('center'), 'center');
    assert.strictEqual(renderer.mapAlignmentToCSS('right'), 'right');
    assert.strictEqual(renderer.mapAlignmentToCSS('left'), 'left');
    assert.strictEqual(renderer.mapAlignmentToCSS(null), 'left');
});

test('PreviewRenderer - applies tighter line-height to centered paragraphs', () => {
    const docMock = new MockElement('div');
    const renderer = new PreviewRenderer(docMock, {});
    const elem = {
        type: 'paragraph',
        styleId: 'Normal',
        isHeading: false,
        alignment: 'center',
        runs: [{ type: 'text', data: { text: 'Centered Author' } }]
    };
    const styles = { 'Normal': { fontSize: 12, lineSpacing: 1.5 } };
    
    renderer.renderParagraphNode(elem, styles, docMock);
    
    const pEl = docMock.childNodes[0];
    assert.strictEqual(pEl.style.lineHeight, '1.15');
});

