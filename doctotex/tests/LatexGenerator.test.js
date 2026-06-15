const assert = require('node:assert');
const test = require('node:test');
const { loadSourceModule } = require('./test-helper.js');

const LatexGenerator = loadSourceModule('LatexGenerator.js');

test('LatexGenerator.escapeTex - escapes characters for LaTeX compatibility', () => {
    const generator = new LatexGenerator({ geometry: { margins: {} }, body: [], styles: {}, sections: [], images: [] });

    assert.strictEqual(generator.escapeTex('A & B'), 'A \\& B');
    assert.strictEqual(generator.escapeTex('Value %'), 'Value \\%');
    assert.strictEqual(generator.escapeTex('formula $x$'), 'formula \\$x\\$');
    assert.strictEqual(generator.escapeTex('my_variable'), 'my\\_variable');
    assert.strictEqual(generator.escapeTex('brackets {curly}'), 'brackets \\{curly\\}');
    assert.strictEqual(generator.escapeTex('tilde ~ and caret ^'), 'tilde \\textasciitilde  and caret \\textasciicircum ');
});

test('LatexGenerator.compileTextRun - formats bold, italic, underline, color runs', () => {
    const generator = new LatexGenerator({ geometry: { margins: {} }, body: [], styles: {}, sections: [], images: [] });

    assert.strictEqual(
        generator.compileTextRun({ text: 'text', bold: true }, true),
        '\\textbf{text}'
    );
    assert.strictEqual(
        generator.compileTextRun({ text: 'text', italic: true }, true),
        '\\textit{text}'
    );
    assert.strictEqual(
        generator.compileTextRun({ text: 'text', underline: true }, true),
        '\\underline{text}'
    );
    assert.strictEqual(
        generator.compileTextRun({ text: 'text', bold: true, italic: true }, true),
        '\\textbf{\\textit{text}}'
    );
    assert.strictEqual(
        generator.compileTextRun({ text: 'text', color: '#FF0000' }, true),
        '\\textcolor[HTML]{FF0000}{text}'
    );
});

test('LatexGenerator.generateFontSetup - maps fonts based on compilers', () => {
    const docArial = {
        geometry: { margins: {} }, body: [],
        styles: { 'Normal': { fontFamily: 'Arial' } },
        sections: [], images: []
    };
    const genPdflatex = new LatexGenerator(docArial, { compiler: 'pdflatex', fontOverride: 'keep' });
    assert.ok(genPdflatex.generateFontSetup().includes('\\RequirePackage{helvet}'));

    const genXelatex = new LatexGenerator(docArial, { compiler: 'xelatex', fontOverride: 'keep' });
    assert.ok(genXelatex.generateFontSetup().includes('\\setmainfont{Arial}'));

    const genOverride = new LatexGenerator(docArial, { compiler: 'pdflatex', fontOverride: 'standard' });
    assert.ok(genOverride.generateFontSetup().includes('\\RequirePackage{newtxtext}'));
});

test('LatexGenerator.compileTableNode - converts tables to booktabs structures', () => {
    const generator = new LatexGenerator({ geometry: { margins: {} }, body: [], styles: {}, sections: [], images: [] });
    const tableNode = {
        type: 'table',
        cols: 2,
        columns: 1,
        rows: [
            { cells: [{ text: 'H1' }, { text: 'H2' }] },
            { cells: [{ text: 'V1' }, { text: 'V2' }] }
        ]
    };
    const listState = { inList: false, listType: null };
    const latex = generator.compileTableNode(tableNode, listState);

    assert.ok(latex.includes('\\begin{tabular}{| l | l |}'));
    assert.ok(latex.includes('H1 & H2 \\\\ \\hline'));
    assert.ok(latex.includes('V1 & V2 \\\\ \\hline'));
});

test('LatexGenerator.compileListItemParagraph - manages list environment state', () => {
    const generator = new LatexGenerator({ geometry: { margins: {} }, body: [], styles: {}, sections: [], images: [] });
    const listState = { inList: false, listType: null };
    const itemNode = {
        type: 'paragraph',
        styleId: 'ListBullet',
        isHeading: false,
        columns: 1,
        runs: [{ type: 'text', data: { text: 'Bullet Item' } }]
    };

    let latex = generator.compileListItemParagraph(itemNode, listState, 'listbullet');
    assert.ok(latex.includes('\\begin{itemize}'));
    assert.ok(latex.includes('\\item Bullet Item'));
    assert.strictEqual(listState.inList, true);
    assert.strictEqual(listState.listType, 'itemize');

    let latex2 = generator.compileListItemParagraph(itemNode, listState, 'listbullet');
    assert.ok(!latex2.includes('\\begin{itemize}'));
    assert.ok(latex2.includes('\\item Bullet Item'));
});

test('LatexGenerator.generateRequiredPackages - includes multicol when sections have multiple columns', () => {
    const docWithMulticol = {
        geometry: { margins: { top: 2.5, bottom: 2.5, left: 3.0, right: 2.0 } },
        body: [], styles: {}, images: [],
        sections: [{ columns: 1 }, { columns: 2 }]
    };
    const generator = new LatexGenerator(docWithMulticol);
    const pkgs = generator.generateRequiredPackages();
    assert.ok(pkgs.includes('\\RequirePackage{multicol}'));
});

test('LatexGenerator.generateRequiredPackages - does not include multicol when all single column', () => {
    const docSingleCol = {
        geometry: { margins: { top: 2.5, bottom: 2.5, left: 3.0, right: 2.0 } },
        body: [], styles: {}, images: [],
        sections: [{ columns: 1 }]
    };
    const generator = new LatexGenerator(docSingleCol);
    const pkgs = generator.generateRequiredPackages();
    assert.ok(!pkgs.includes('\\RequirePackage{multicol}'));
});

test('LatexGenerator.generateHeaderFooterSetup - uses real header lines when available', () => {
    const doc = {
        geometry: { margins: {} }, body: [], styles: {}, sections: [], images: [],
        header: [
            { text: 'Conference Name', alignment: 'left' },
            { text: 'Page Number', alignment: 'right' }
        ],
        footer: [
            { text: 'Event Location', alignment: 'center' }
        ]
    };
    const generator = new LatexGenerator(doc);
    const setup = generator.generateHeaderFooterSetup();

    assert.ok(setup.includes('\\fancyhead[L]{Conference Name}'));
    assert.ok(setup.includes('\\fancyhead[R]{Page Number}'));
    assert.ok(setup.includes('\\fancyfoot[C]{Event Location}'));
    assert.ok(!setup.includes('\\fancyhead[R]{\\thepage}'));
});

test('LatexGenerator.generateHeaderFooterSetup - stacks multiple header lines of same alignment vertically', () => {
    const doc = {
        geometry: { margins: {} }, body: [], styles: {}, sections: [], images: [],
        header: [
            { text: 'Line 1', alignment: 'left' },
            { text: 'Line 2', alignment: 'left' }
        ],
        footer: []
    };
    const generator = new LatexGenerator(doc);
    const setup = generator.generateHeaderFooterSetup();

    assert.ok(setup.includes('\\fancyhead[L]{Line 1 \\\\ Line 2}'));
});

test('LatexGenerator.generateHeaderFooterSetup - falls back to page number when no header', () => {
    const doc = {
        geometry: { margins: {} }, body: [], styles: {}, sections: [], images: [],
        header: null,
        footer: null
    };
    const generator = new LatexGenerator(doc);
    const setup = generator.generateHeaderFooterSetup();

    assert.ok(setup.includes('\\fancyhead[R]{\\thepage}'));
});

test('LatexGenerator.compileBodyToLatex - wraps multi-column paragraphs in multicols', () => {
    const doc = {
        geometry: { margins: {} }, body: [
            { type: 'paragraph', styleId: 'Normal', isHeading: false, columns: 1, alignment: null, runs: [{ type: 'text', data: { text: 'Single col' } }] },
            { type: 'paragraph', styleId: 'Normal', isHeading: false, columns: 2, alignment: null, runs: [{ type: 'text', data: { text: 'Two col' } }] },
            { type: 'paragraph', styleId: 'Normal', isHeading: false, columns: 2, alignment: null, runs: [{ type: 'text', data: { text: 'Also two col' } }] }
        ],
        styles: {}, sections: [{ columns: 1 }, { columns: 2 }], images: [],
        header: null, footer: null
    };
    const generator = new LatexGenerator(doc);
    const latex = generator.compileBodyToLatex();

    assert.ok(latex.includes('\\begin{multicols}{2}'));
    assert.ok(latex.includes('\\end{multicols}'));
    // Single col content should be before multicols
    const singleIdx = latex.indexOf('Single col');
    const multiBeginIdx = latex.indexOf('\\begin{multicols}');
    assert.ok(singleIdx < multiBeginIdx, 'Single-column paragraph should precede multicols block');
});

test('LatexGenerator.generate - compiles fully separate cls and tex files', () => {
    const mockDoc = {
        geometry: { margins: { top: 2.5, bottom: 2.5, left: 3.0, right: 2.0 } },
        styles: {
            'Normal': { fontFamily: 'Times New Roman', lineSpacing: 1.5, fontSize: 12 }
        },
        body: [
            {
                type: 'paragraph',
                styleId: 'Normal',
                isHeading: true,
                headingLevel: 1,
                columns: 1,
                runs: [{ type: 'text', data: { text: 'Title Section' } }]
            }
        ],
        images: [],
        sections: [{ columns: 1 }],
        header: null,
        footer: null
    };

    const generator = new LatexGenerator(mockDoc, {
        classFormat: 'cls',
        citations: 'biblatex',
        citationStyle: 'apa'
    });

    const output = generator.generate();

    assert.ok(output.cls);
    assert.ok(output.tex);
    assert.ok(output.bib);

    assert.ok(output.cls.includes('\\LoadClass[12pt]{article}'));
    assert.ok(output.cls.includes('top=2.5cm'));
    assert.ok(output.cls.includes('style=apa'));

    assert.ok(output.tex.includes('\\documentclass{doctotex}'));
    assert.ok(output.tex.includes('\\section{Title Section}'));
});

test('LatexGenerator.generateHeadingStyles - dynamically centers section headings when centered in body', () => {
    const mockDoc = {
        geometry: { margins: {} },
        styles: { 'Normal': { fontSize: 12 } },
        body: [
            { type: 'paragraph', styleId: 'Normal', isHeading: true, headingLevel: 1, columns: 1, alignment: 'center', runs: [{ type: 'text', data: { text: 'Centered Section', bold: true } }] }
        ],
        sections: [{ columns: 1 }], images: [], header: null, footer: null
    };

    const generator = new LatexGenerator(mockDoc);
    const headingStyles = generator.generateHeadingStyles();
    assert.ok(headingStyles.includes('\\titleformat{\\section}\n  {\\normalfont\\fontsize{12pt}{14.4pt}\\bfseries\\color{sectonecolor}\\filcenter}'));
});

test('LatexGenerator.compileBodyToLatex - overrides spacing to setstretch 1.0 inside center environments', () => {
    const mockDoc = {
        geometry: { margins: {} },
        styles: { 'Normal': { fontSize: 12 } },
        body: [
            { type: 'paragraph', styleId: 'Normal', isHeading: false, columns: 1, alignment: 'center', runs: [{ type: 'text', data: { text: 'Centered Author' } }] }
        ],
        sections: [{ columns: 1 }], images: [], header: null, footer: null
    };

    const generator = new LatexGenerator(mockDoc);
    const latex = generator.compileBodyToLatex();
    assert.ok(latex.includes('\\begin{center}\n  \\setstretch{1.0}\n  Centered Author \\\\'));
});

