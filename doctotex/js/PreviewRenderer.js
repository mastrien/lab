/**
 * DocToTex - UI Preview Renderer Module
 * Refactored using Clean Code principles and SRP.
 */
class PreviewRenderer {
    /**
     * @param {HTMLElement} paperSheet - The mockup page paper container
     * @param {Object} codeBlocks - DOM code node containers { cls, tex, bib }
     */
    constructor(paperSheet, codeBlocks) {
        this.paperSheet = paperSheet;
        this.codeBlocks = codeBlocks;
    }

    // ==========================================================
    // Code View Rendering
    // ==========================================================

    renderCode(latexData) {
        this.updateCodeBlock(this.codeBlocks.cls, latexData.cls);
        this.updateCodeBlock(this.codeBlocks.tex, latexData.tex);
        this.updateCodeBlock(this.codeBlocks.bib, latexData.bib);
    }

    updateCodeBlock(blockEl, content) {
        if (blockEl && content) {
            blockEl.textContent = content;
            Prism.highlightElement(blockEl);
        }
    }

    // ==========================================================
    // Visual Mockup Layout Rendering
    // ==========================================================

    renderLayout(parsedDoc, fontOverride) {
        this.applyLayoutGeometries(parsedDoc.geometry, parsedDoc.styles, fontOverride);
        this.clearLayout();

        this.renderDocumentHeader(parsedDoc.header);
        this.renderDocumentBody(parsedDoc.body, parsedDoc.styles);
        this.renderDocumentFooter(parsedDoc.footer);

        this.applyMathTypesetting();
    }

    applyLayoutGeometries(geom, styles, fontOverride) {
        this.paperSheet.style.paddingTop = `${geom.margins.top}cm`;
        this.paperSheet.style.paddingBottom = `${geom.margins.bottom}cm`;
        this.paperSheet.style.paddingLeft = `${geom.margins.left}cm`;
        this.paperSheet.style.paddingRight = `${geom.margins.right}cm`;

        let fontFamily = 'Times New Roman, serif';
        const normalStyle = styles['Normal'] || styles['normal'];
        if (fontOverride === 'keep' && normalStyle && normalStyle.fontFamily) {
            fontFamily = `"${normalStyle.fontFamily}", serif`;
        }
        this.paperSheet.style.fontFamily = fontFamily;

        const baseFontSize = normalStyle && normalStyle.fontSize ? normalStyle.fontSize : 12;
        this.paperSheet.style.fontSize = `${baseFontSize}pt`;
    }

    clearLayout() {
        this.paperSheet.innerHTML = '';
    }

    // ==========================================================
    // Header & Footer Rendering
    // ==========================================================

    renderDocumentHeader(headerParagraphs) {
        if (!headerParagraphs || headerParagraphs.length === 0) return;

        const headerEl = document.createElement('div');
        headerEl.className = 'paper-header';

        headerParagraphs.forEach(p => {
            const lineEl = document.createElement('p');
            lineEl.style.textAlign = this.mapAlignmentToCSS(p.alignment);
            lineEl.style.margin = '0';
            lineEl.style.padding = '0';
            lineEl.style.fontSize = '9pt';
            
            if (p.runs) {
                this.renderParagraphRuns(lineEl, p.runs, null, true);
            } else {
                lineEl.innerText = p.text || '';
            }
            headerEl.appendChild(lineEl);
        });

        this.paperSheet.appendChild(headerEl);
    }

    renderDocumentFooter(footerParagraphs) {
        if (!footerParagraphs || footerParagraphs.length === 0) return;

        const footerEl = document.createElement('div');
        footerEl.className = 'paper-footer';

        footerParagraphs.forEach(p => {
            const lineEl = document.createElement('p');
            lineEl.style.textAlign = this.mapAlignmentToCSS(p.alignment);
            lineEl.style.margin = '0';
            lineEl.style.padding = '0';
            lineEl.style.fontSize = '9pt';
            
            if (p.runs) {
                this.renderParagraphRuns(lineEl, p.runs, null, true);
            } else {
                lineEl.innerText = p.text || '';
            }
            footerEl.appendChild(lineEl);
        });

        this.paperSheet.appendChild(footerEl);
    }

    mapAlignmentToCSS(alignment) {
        const map = {
            'left': 'left',
            'right': 'right',
            'center': 'center',
            'justified': 'justify',
            'both': 'justify'
        };
        return map[alignment] || 'left';
    }

    // ==========================================================
    // Document Body Rendering
    // ==========================================================

    renderDocumentBody(body, styles) {
        let currentContainer = this.paperSheet;
        let inMultiCol = false;
        let multiColEl = null;

        body.forEach(elem => {
            const elemColumns = elem.columns || 1;

            // Transition: entering multi-column layout
            if (elemColumns > 1 && !inMultiCol) {
                const colSpace = elem.columnSpaceCm || 1.27;
                multiColEl = this.createMultiColumnContainer(elemColumns, colSpace);
                this.paperSheet.appendChild(multiColEl);
                currentContainer = multiColEl;
                inMultiCol = true;
            }

            // Transition: leaving multi-column layout
            if (elemColumns === 1 && inMultiCol) {
                currentContainer = this.paperSheet;
                inMultiCol = false;
                multiColEl = null;
            }

            if (elem.type === 'paragraph') {
                this.renderParagraphNode(elem, styles, currentContainer);
            } else if (elem.type === 'table') {
                this.renderTableNode(elem, currentContainer);
            }
        });
    }

    createMultiColumnContainer(columnCount, columnSpaceCm = 1.5) {
        const container = document.createElement('div');
        container.className = 'multi-column-section';
        container.style.columnCount = columnCount;
        container.style.columnGap = `${columnSpaceCm}cm`;
        container.style.columnFill = 'balance';
        return container;
    }

    // ==========================================================
    // HTML Paragraph Rendering Sub-units
    // ==========================================================

    renderParagraphNode(elem, styles, container) {
        const tag = elem.isHeading ? `H${Math.min(3, elem.headingLevel || 1)}` : 'P';
        const el = document.createElement(tag);

        const styleDef = styles[elem.styleId];
        this.applyParagraphAlignAndIndent(el, elem, styleDef);
        this.applyParagraphSpacing(el, elem, styles);
        this.renderParagraphRuns(el, elem.runs, styleDef);

        container.appendChild(el);
    }

    applyParagraphAlignAndIndent(el, elem, styleDef) {
        if (elem.alignment) {
            el.style.textAlign = this.mapAlignmentToCSS(elem.alignment);
        } else if (styleDef && styleDef.alignment) {
            el.style.textAlign = this.mapAlignmentToCSS(styleDef.alignment);
        } else {
            el.style.textAlign = 'justify';
        }

        if (styleDef) {
            if (styleDef.color) el.style.color = styleDef.color;
            if (styleDef.fontSize && !elem.isHeading) el.style.fontSize = `${styleDef.fontSize}pt`;
        }

        if (!elem.isHeading) {
            const indent = elem.indent !== null ? elem.indent : (styleDef && styleDef.indent ? styleDef.indent : 0);
            if (indent > 0) {
                el.style.textIndent = `${indent}cm`;
            }

            const leftIndent = elem.leftIndent !== null ? elem.leftIndent : (styleDef && styleDef.leftIndent ? styleDef.leftIndent : 0);
            if (leftIndent > 0) {
                el.style.marginLeft = `${leftIndent}cm`;
            }

            const rightIndent = elem.rightIndent !== null ? elem.rightIndent : (styleDef && styleDef.rightIndent ? styleDef.rightIndent : 0);
            if (rightIndent > 0) {
                el.style.marginRight = `${rightIndent}cm`;
            }
        }
    }

    applyParagraphSpacing(el, elem, styles) {
        const styleDef = styles[elem.styleId];
        if (elem.isHeading) {
            const headingColors = { 1: '#000000', 2: '#000000', 3: '#000000' };
            const level = Math.min(3, elem.headingLevel || 1);
            
            // Resolve style size and color by ID or Name (e.g. Titre1)
            const normalStyle = styles['Normal'] || styles['normal'] || { fontSize: 12 };
            const normalSize = normalStyle.fontSize || 12;
            
            let hStyle = styles[`Heading${level}`] || styles[`heading${level}`];
            if (!hStyle) {
                for (let id in styles) {
                    const name = styles[id].name || '';
                    if (name.toLowerCase() === `heading ${level}`) {
                        hStyle = styles[id];
                        break;
                    }
                }
            }

            const fontSize = (hStyle && hStyle.fontSize) ? hStyle.fontSize : normalSize;
            const color = (hStyle && hStyle.color) ? hStyle.color : headingColors[level];

            const runsBold = elem.runs && elem.runs.some(r => r.data && r.data.bold);
            const isBold = (styleDef && styleDef.bold) || runsBold;

            el.style.color = color;
            el.style.fontSize = `${fontSize}pt`;
            el.style.marginTop = '6pt';
            el.style.marginBottom = '6pt';
            el.style.fontWeight = isBold ? 'bold' : 'normal';
        } else {
            el.style.lineHeight = styleDef && styleDef.lineSpacing ? styleDef.lineSpacing : 1.5;
            el.style.marginTop = '0px';
            if (elem.alignment === 'center') {
                el.style.marginBottom = '4px';
                el.style.lineHeight = '1.15';
            } else {
                el.style.marginBottom = '10px';
            }
        }
    }

    renderParagraphRuns(parentEl, runs, styleDef, isHeaderFooter = false) {
        runs.forEach(run => {
            if (run.type === 'text') {
                parentEl.appendChild(this.createTextRunSpan(run.data, styleDef));
            } else if (run.type === 'math') {
                parentEl.appendChild(this.createMathRunSpan(run.data));
            } else if (run.type === 'image') {
                parentEl.appendChild(this.createImageRunElement(run.data, isHeaderFooter));
            }
        });
    }

    createTextRunSpan(data, styleDef) {
        const span = document.createElement('span');
        span.innerText = data.text;

        if (data.bold) span.style.fontWeight = 'bold';
        if (data.italic) span.style.fontStyle = 'italic';
        if (data.underline) span.style.textDecoration = 'underline';
        if (data.color) span.style.color = data.color;
        if (data.bgColor) span.style.backgroundColor = data.bgColor;

        if (data.fontSize) {
            span.style.fontSize = `${data.fontSize}pt`;
        } else if (styleDef && styleDef.fontSize && styleDef.fontSize !== 12) {
            span.style.fontSize = `${styleDef.fontSize}pt`;
        }

        return span;
    }

    createMathRunSpan(data) {
        const mathSpan = document.createElement('span');
        mathSpan.classList.add('math-block');
        try {
            katex.render(data.latex, mathSpan, { displayMode: false, throwOnError: false });
        } catch (e) {
            mathSpan.innerText = data.latex;
        }
        return mathSpan;
    }

    createImageRunElement(data, isHeaderFooter = false) {
        const img = document.createElement('img');
        img.src = `data:image/${data.ext};base64,${data.base64}`;
        if (isHeaderFooter) {
            img.style.height = '32px';
            img.style.float = 'right';
            img.style.marginLeft = '10px';
            img.style.display = 'inline-block';
        } else {
            img.style.maxWidth = '80%';
            img.style.margin = '15px auto';
            img.style.display = 'block';
        }
        return img;
    }

    // ==========================================================
    // HTML Table Rendering Sub-units
    // ==========================================================

    renderTableNode(elem, container) {
        const tbl = document.createElement('table');
        const tbody = document.createElement('tbody');

        elem.rows.forEach(row => {
            const tr = document.createElement('tr');
            row.cells.forEach(cell => {
                const td = document.createElement('td');
                td.innerText = cell.text;
                td.style.whiteSpace = 'pre-wrap';
                this.applyTableCellStyling(td, cell.bgColor);
                tr.appendChild(td);
            });
            tbody.appendChild(tr);
        });

        tbl.appendChild(tbody);
        container.appendChild(tbl);
    }

    applyTableCellStyling(tdEl, bgColor) {
        if (!bgColor) return;

        tdEl.style.backgroundColor = bgColor;
        tdEl.style.color = this.isColorDark(bgColor) ? '#ffffff' : '#1e293b';
    }

    isColorDark(hexColor) {
        if (!hexColor) return false;
        let hex = hexColor.replace('#', '');
        if (hex.length === 3) {
            hex = hex[0]+hex[0]+hex[1]+hex[1]+hex[2]+hex[2];
        }
        const r = parseInt(hex.substr(0,2), 16);
        const g = parseInt(hex.substr(2,2), 16);
        const b = parseInt(hex.substr(4,2), 16);
        const yiq = ((r*299)+(g*587)+(b*114))/1000;
        return yiq < 128;
    }

    // ==========================================================
    // Late-binding math formatting triggers
    // ==========================================================

    applyMathTypesetting() {
        renderMathInElement(this.paperSheet, {
            delimiters: [
                {left: '$$', right: '$$', display: true},
                {left: '$', right: '$', display: false}
            ],
            throwOnError: false
        });
    }
}

window.PreviewRenderer = PreviewRenderer;
