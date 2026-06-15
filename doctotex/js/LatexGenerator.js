/**
 * DocToTex - LaTeX Code Generator Module
 * Refactored using Clean Code principles and SRP.
 */
class LatexGenerator {
    /**
     * @param {Object} parsedDoc - The parsed document structure
     * @param {Object} options - Document compilation options
     */
    constructor(parsedDoc, options = {}) {
        this.parsedDoc = parsedDoc;
        this.options = {
            compiler: 'pdflatex',
            classFormat: 'cls',
            citations: 'none',
            citationStyle: 'apa',
            fontOverride: 'keep',
            includeHyperref: true,
            includeBooktabs: true,
            includeGraphics: true,
            ...options
        };

        this.geom = this.parsedDoc.geometry;
        this.body = this.parsedDoc.body;
        this.styles = this.parsedDoc.styles;
        this.sections = this.parsedDoc.sections || [];
        this.header = this.parsedDoc.header || null;
        this.footer = this.parsedDoc.footer || null;
    }

    getStyleByNameOrId(key) {
        if (!key) return null;
        const lowerKey = key.toLowerCase();
        if (this.styles[key]) return this.styles[key];
        
        for (let id in this.styles) {
            if (id.toLowerCase() === lowerKey) return this.styles[id];
            const name = this.styles[id].name || '';
            if (name.toLowerCase() === lowerKey || name.toLowerCase() === `heading ${lowerKey.replace('heading', '').trim()}`) {
                return this.styles[id];
            }
        }
        return null;
    }

    // ==========================================================
    // String Escaping & Compilation Utilities
    // ==========================================================

    escapeTex(text) {
        if (!text) return '';
        return text
            .replace(/\\/g, '\\textbackslash ')
            .replace(/&/g, '\\&')
            .replace(/%/g, '\\%')
            .replace(/\$/g, '\\$')
            .replace(/#/g, '\\#')
            .replace(/_/g, '\\_')
            .replace(/{/g, '\\{')
            .replace(/}/g, '\\}')
            .replace(/~/g, '\\textasciitilde ')
            .replace(/\^/g, '\\textasciicircum ');
    }

    compileParagraphRunsText(pElem, escape = false, isHeaderFooter = false) {
        let result = '';
        let imagesText = '';
        pElem.runs.forEach(run => {
            if (run.type === 'text') {
                result += this.compileTextRun(run.data, escape);
            } else if (run.type === 'math') {
                result += ` $${run.data.latex}$ `;
            } else if (run.type === 'image') {
                if (isHeaderFooter) {
                    imagesText += `\\hfill \\includegraphics[height=0.8cm]{images/${run.data.filename}}`;
                } else {
                    result += this.compileImageRun(run.data);
                }
            }
        });
        return result + imagesText;
    }

    compileTextRun(data, escape) {
        let txt = data.text;
        if (escape) {
            txt = this.escapeTex(txt);
        }
        if (data.bold && data.italic) {
            txt = `\\textbf{\\textit{${txt}}}`;
        } else if (data.bold) {
            txt = `\\textbf{${txt}}`;
        } else if (data.italic) {
            txt = `\\textit{${txt}}`;
        }
        if (data.underline) {
            txt = `\\underline{${txt}}`;
        }
        if (data.color) {
            const colorHex = data.color.replace('#', '');
            txt = `\\textcolor[HTML]{${colorHex}}{${txt}}`;
        }
        if (data.bgColor) {
            const bgHex = data.bgColor.replace('#', '');
            txt = `\\colorbox[HTML]{${bgHex}}{${txt}}`;
        }
        if (data.fontSize) {
            const size = data.fontSize;
            const lineSpace = (size * 1.2).toFixed(1);
            txt = `{\\fontsize{${size}pt}{${lineSpace}pt}\\selectfont ${txt}}`;
        }
        return txt;
    }

    compileImageRun(data) {
        return `\n\\begin{figure}[h]\\centering\\includegraphics[width=0.8\\textwidth]{images/${data.filename}}\\end{figure}\n`;
    }

    // ==========================================================
    // Config Setup & String Generators
    // ==========================================================

    resolveMainFont() {
        const baseStyle = this.styles['Normal'] || this.styles['normal'];
        return (baseStyle && baseStyle.fontFamily) ? baseStyle.fontFamily : 'Times New Roman';
    }

    generateFontSetup() {
        const mainFont = this.resolveMainFont();
        const fontLower = mainFont.toLowerCase();

        if (this.options.fontOverride !== 'keep') {
            return '\\RequirePackage{newtxtext}\n\\RequirePackage{newtxmath}';
        }

        if (this.options.compiler === 'pdflatex') {
            if (fontLower.includes('arial') || fontLower.includes('helvetica') || fontLower.includes('sans')) {
                return '\\RequirePackage{helvet}\n\\renewcommand{\\familydefault}{\\sfdefault}';
            } else if (fontLower.includes('times') || fontLower.includes('roman')) {
                return '\\RequirePackage{newtxtext}\n\\RequirePackage{newtxmath}';
            } else if (fontLower.includes('courier') || fontLower.includes('mono')) {
                return '\\RequirePackage{courier}';
            }
            return '% Base pdflatex font\n\\RequirePackage{newtxtext}';
        }

        return `\\RequirePackage{fontspec}\n\\setmainfont{${mainFont}}`;
    }

    generateRequiredPackages() {
        let pkgs = '% Essential layout & geometry\n';
        pkgs += `\\RequirePackage[a4paper, top=${this.geom.margins.top}cm, bottom=${this.geom.margins.bottom}cm, left=${this.geom.margins.left}cm, right=${this.geom.margins.right}cm]{geometry}\n`;
        pkgs += '\\RequirePackage[utf8]{inputenc}\n';
        pkgs += '\\RequirePackage[T1]{fontenc}\n';
        pkgs += '\\RequirePackage{setspace}\n';
        pkgs += '\\RequirePackage{titlesec}\n';
        pkgs += '\\RequirePackage{xcolor}\n';
        pkgs += '\\RequirePackage{fancyhdr}\n';
        pkgs += '\\RequirePackage{amsmath, amssymb, amsfonts}\n';

        const hasMultiColumn = this.sections.some(s => s.columns > 1);
        if (hasMultiColumn) {
            pkgs += '\\RequirePackage{multicol}\n';
        }

        if (this.options.includeGraphics && this.parsedDoc.images.length > 0) {
            pkgs += '\\RequirePackage{graphicx}\n';
        }
        if (this.options.includeBooktabs) {
            pkgs += '\\RequirePackage{booktabs}\n\\RequirePackage{colortbl}\n';
        }
        if (this.options.includeHyperref) {
            pkgs += '\\RequirePackage[hidelinks]{hyperref}\n';
        }

        return pkgs;
    }

    generateCitationSetup() {
        if (this.options.citations === 'none') return '';

        let bibstyle = 'apa';
        if (this.options.citationStyle === 'ieee') bibstyle = 'ieee';
        else if (this.options.citationStyle === 'abnt') bibstyle = 'abnt';

        if (this.options.citations === 'biblatex') {
            return `\\RequirePackage[style=${bibstyle}, backend=biber]{biblatex}\n\\addbibresource{references.bib}\n`;
        }

        const natbibStyle = this.options.citationStyle === 'ieee' ? 'ieeetr' : 'apalike';
        return `\\RequirePackage{natbib}\n\\bibliographystyle{${natbibStyle}}\n`;
    }

    generateHeadingStyles() {
        let stylesText = '% Style configuration for titles/headings\n';
        const normalStyle = this.getStyleByNameOrId('Normal') || { fontSize: 12 };
        const normalSize = normalStyle.fontSize || 12;

        const h1Style = this.getStyleByNameOrId('Heading1') || this.getStyleByNameOrId('heading 1') || {};
        const h2Style = this.getStyleByNameOrId('Heading2') || this.getStyleByNameOrId('heading 2') || {};
        const h3Style = this.getStyleByNameOrId('Heading3') || this.getStyleByNameOrId('heading 3') || {};

        const h1 = {
            fontSize: h1Style.fontSize || normalSize,
            color: h1Style.color || '#000000'
        };
        const h2 = {
            fontSize: h2Style.fontSize || normalSize,
            color: h2Style.color || '#000000'
        };
        const h3 = {
            fontSize: h3Style.fontSize || normalSize,
            color: h3Style.color || '#000000'
        };

        const isH1Centered = this.body.some(p => p.isHeading && p.headingLevel === 1 && p.alignment === 'center');
        const isH2Centered = this.body.some(p => p.isHeading && p.headingLevel === 2 && p.alignment === 'center');
        const isH3Centered = this.body.some(p => p.isHeading && p.headingLevel === 3 && p.alignment === 'center');

        const h1Align = isH1Centered ? '\\filcenter' : '';
        const h2Align = isH2Centered ? '\\filcenter' : '';
        const h3Align = isH3Centered ? '\\filcenter' : '';

        const h1ColorHex = h1.color.replace('#', '');
        const h2ColorHex = h2.color.replace('#', '');
        const h3ColorHex = h3.color.replace('#', '');

        const isH1Bold = (h1Style.bold !== undefined ? h1Style.bold : false) || this.body.some(p => p.isHeading && p.headingLevel === 1 && p.runs.some(r => r.data && r.data.bold));
        const isH2Bold = (h2Style.bold !== undefined ? h2Style.bold : false) || this.body.some(p => p.isHeading && p.headingLevel === 2 && p.runs.some(r => r.data && r.data.bold));
        const isH3Bold = (h3Style.bold !== undefined ? h3Style.bold : false) || this.body.some(p => p.isHeading && p.headingLevel === 3 && p.runs.some(r => r.data && r.data.bold));

        const h1Bf = isH1Bold ? '\\bfseries' : '';
        const h2Bf = isH2Bold ? '\\bfseries' : '';
        const h3Bf = isH3Bold ? '\\bfseries' : '';

        stylesText += `\\definecolor{sectonecolor}{HTML}{${h1ColorHex}}\n`;
        stylesText += `\\definecolor{secttwocolor}{HTML}{${h2ColorHex}}\n`;
        stylesText += `\\definecolor{sectthreecolor}{HTML}{${h3ColorHex}}\n\n`;

        stylesText += `\\titleformat{\\section}\n  {\\normalfont\\fontsize{${h1.fontSize}pt}{${(h1.fontSize * 1.2).toFixed(1)}pt}${h1Bf}\\color{sectonecolor}${h1Align}}\n  {\\thesection}{1em}{}\n`;
        stylesText += `\\titleformat{\\subsection}\n  {\\normalfont\\fontsize{${h2.fontSize}pt}{${(h2.fontSize * 1.2).toFixed(1)}pt}${h2Bf}\\color{secttwocolor}${h2Align}}\n  {\\thesubsection}{1em}{}\n`;
        stylesText += `\\titleformat{\\subsubsection}\n  {\\normalfont\\fontsize{${h3.fontSize}pt}{${(h3.fontSize * 1.2).toFixed(1)}pt}${h3Bf}\\color{sectthreecolor}${h3Align}}\n  {\\thesubsubsection}{1em}{}\n\n`;

        stylesText += `\\titlespacing*{\\section}{0pt}{6pt}{6pt}\n`;
        stylesText += `\\titlespacing*{\\subsection}{0pt}{6pt}{6pt}\n`;
        stylesText += `\\titlespacing*{\\subsubsection}{0pt}{6pt}{6pt}\n`;

        return stylesText;
    }

    generateGlobalBodyFormatting() {
        const baseStyle = this.styles['Normal'] || this.styles['normal'];
        const bodySpacingVal = baseStyle ? baseStyle.lineSpacing : 1.5;
        const indentVal = baseStyle && baseStyle.indent ? `${baseStyle.indent}cm` : '1.25cm';

        let formatting = `\\setstretch{${bodySpacingVal}}\n`;
        formatting += `\\setlength{\\parindent}{${indentVal}}\n`;
        formatting += `\\setlength{\\parskip}{6pt}\n`;

        return formatting;
    }

    generateHeaderFooterSetup() {
        let setup = '\\pagestyle{fancy}\n\\fancyhf{}\n';

        if (this.header && this.header.length > 0) {
            // Map lines to left/center/right positions
            const positions = this.mapLinesToFancyPositions(this.header);
            if (positions.left) setup += `\\fancyhead[L]{${positions.left}}\n`;
            if (positions.center) setup += `\\fancyhead[C]{${positions.center}}\n`;
            if (positions.right) setup += `\\fancyhead[R]{${positions.right}}\n`;
        } else {
            setup += '\\fancyhead[R]{\\thepage}\n';
        }

        if (this.footer && this.footer.length > 0) {
            const positions = this.mapLinesToFancyPositions(this.footer);
            if (positions.left) setup += `\\fancyfoot[L]{${positions.left}}\n`;
            if (positions.center) setup += `\\fancyfoot[C]{${positions.center}}\n`;
            if (positions.right) setup += `\\fancyfoot[R]{${positions.right}}\n`;
        }

        setup += '\\renewcommand{\\headrulewidth}{0pt}\n';
        setup += '\\renewcommand{\\footrulewidth}{0pt}\n';

        return setup;
    }

    mapLinesToFancyPositions(paragraphs) {
        const positions = { left: [], center: [], right: [] };

        paragraphs.forEach(p => {
            const align = p.alignment || 'left';
            const compiledText = p.runs ? this.compileParagraphRunsText(p, true, true) : this.escapeTex(p.text || '');
            if (compiledText.trim()) {
                if (align === 'center') {
                    positions.center.push(compiledText);
                } else if (align === 'right') {
                    positions.right.push(compiledText);
                } else {
                    positions.left.push(compiledText);
                }
            }
        });

        return {
            left: positions.left.join(' \\\\ '),
            center: positions.center.join(' \\\\ '),
            right: positions.right.join(' \\\\ ')
        };
    }

    // ==========================================================
    // File Output Generators
    // ==========================================================

    generateClsContent(packages, fontSetup, citationSetup, headingStyles, globalFormatting, headerFooterSetup) {
        let cls = `\\NeedsTeXFormat{LaTeX2e}\n\\ProvidesClass{doctotex}[2026/06/04 DocToTex Custom Document Class]\n\n`;
        cls += `\\LoadClass[12pt]{article}\n\n`;
        cls += `% --- Packages ---\n${packages}\n`;
        cls += `% --- Font Settings ---\n${fontSetup}\n\n`;
        cls += `% --- Citations Setup ---\n${citationSetup}\n`;
        cls += `% --- Heading Formatting ---\n${headingStyles}\n`;
        cls += `% --- Global Spacing & Indentation ---\n${globalFormatting}\n`;
        cls += `% --- Header and Footer ---\n${headerFooterSetup}`;
        return cls;
    }

    generateTexContent(packages, fontSetup, citationSetup, headingStyles, globalFormatting, headerFooterSetup) {
        let tex = '';
        if (this.options.classFormat === 'cls') {
            tex += `\\documentclass{doctotex}\n\n`;
        } else {
            tex += `\\documentclass[12pt]{article}\n\n`;
            tex += `% === EMBEDDED PREAMBLE ===\n`;
            tex += packages + '\n';
            tex += fontSetup + '\n\n';
            tex += citationSetup + '\n';
            tex += headingStyles + '\n';
            tex += globalFormatting + '\n';
            tex += headerFooterSetup + '\n';
            tex += `% =========================\n\n`;
        }

        tex += `\\begin{document}\n\n`;

        tex += this.compileBodyToLatex();

        if (this.options.citations !== 'none') {
            if (this.options.citations === 'biblatex') {
                tex += `\\printbibliography\n\n`;
            } else {
                tex += `\\bibliography{references}\n\n`;
            }
        }

        tex += `\\end{document}\n`;
        return tex;
    }
    // ==========================================================
    // Body Node Compilers
    // ==========================================================
    compileBodyToLatex() {
        let texContent = '';
        let listState = { inList: false, listType: null };
        let centerState = { inCenter: false };
        let quoteState = { inQuote: false };
        let currentColumns = 1;
        let inMulticols = false;

        this.body.forEach(elem => {
            const elemColumns = elem.columns || 1;

            // Transition: entering multi-column section
            if (elemColumns > 1 && !inMulticols) {
                if (listState.inList) {
                    texContent += `\\end{${listState.listType}}\n\n`;
                    listState.inList = false;
                    listState.listType = null;
                }
                if (centerState.inCenter) {
                    texContent += `\\end{center}\n\n`;
                    centerState.inCenter = false;
                }
                if (quoteState.inQuote) {
                    texContent += `\\end{quote}\n\n`;
                    quoteState.inQuote = false;
                }
                const colSpace = elem.columnSpaceCm || 1.27;
                texContent += `\n\\setlength{\\columnsep}{${colSpace}cm}\n\\begin{multicols}{${elemColumns}}\n`;
                inMulticols = true;
                currentColumns = elemColumns;
            }

            // Transition: leaving multi-column section
            if (elemColumns === 1 && inMulticols) {
                if (listState.inList) {
                    texContent += `\\end{${listState.listType}}\n\n`;
                    listState.inList = false;
                    listState.listType = null;
                }
                if (centerState.inCenter) {
                    texContent += `\\end{center}\n\n`;
                    centerState.inCenter = false;
                }
                if (quoteState.inQuote) {
                    texContent += `\\end{quote}\n\n`;
                    quoteState.inQuote = false;
                }
                texContent += `\\end{multicols}\n\n`;
                inMulticols = false;
                currentColumns = 1;
            }

            if (elem.type === 'paragraph') {
                texContent += this.compileParagraphNode(elem, listState, centerState, quoteState);
            } else if (elem.type === 'table') {
                if (listState.inList) {
                    texContent += `\\end{${listState.listType}}\n\n`;
                    listState.inList = false;
                    listState.listType = null;
                }
                if (centerState.inCenter) {
                    texContent += `\\end{center}\n\n`;
                    centerState.inCenter = false;
                }
                if (quoteState.inQuote) {
                    texContent += `\\end{quote}\n\n`;
                    quoteState.inQuote = false;
                }
                texContent += this.compileTableNode(elem, listState);
            }
        });

        // Close any open environments
        if (listState.inList) {
            texContent += `\\end{${listState.listType}}\n\n`;
        }
        if (centerState.inCenter) {
            texContent += `\\end{center}\n\n`;
        }
        if (quoteState.inQuote) {
            texContent += `\\end{quote}\n\n`;
        }
        if (inMulticols) {
            texContent += `\\end{multicols}\n\n`;
        }

        return texContent;
    }

    compileParagraphNode(elem, listState, centerState, quoteState) {
        let latex = '';
        const styleLower = elem.styleId.toLowerCase();
        const isListItem = styleLower.includes('list') || styleLower.includes('item') || styleLower.includes('bullet') || styleLower.includes('number');

        if (listState.inList && !isListItem) {
            latex += `\\end{${listState.listType}}\n\n`;
            listState.inList = false;
            listState.listType = null;
        }

        if (elem.isHeading || isListItem) {
            if (centerState.inCenter) {
                latex += `\\end{center}\n\n`;
                centerState.inCenter = false;
            }
            if (quoteState.inQuote) {
                latex += `\\end{quote}\n\n`;
                quoteState.inQuote = false;
            }
        }

        if (elem.isHeading) {
            latex += this.compileHeadingParagraph(elem);
        } else if (isListItem) {
            latex += this.compileListItemParagraph(elem, listState, styleLower);
        } else {
            const isCentered = elem.alignment === 'center';
            const isIndented = (elem.leftIndent && elem.leftIndent > 0) || (elem.rightIndent && elem.rightIndent > 0);

            if (isCentered) {
                if (quoteState.inQuote) {
                    latex += `\\end{quote}\n\n`;
                    quoteState.inQuote = false;
                }
                if (!centerState.inCenter) {
                    latex += `\\begin{center}\n  \\setstretch{1.0}\n`;
                    centerState.inCenter = true;
                }
                latex += `  ${this.compileParagraphRunsText(elem, true)} \\\\\n`;
            } else if (isIndented) {
                if (centerState.inCenter) {
                    latex += `\\end{center}\n\n`;
                    centerState.inCenter = false;
                }
                if (!quoteState.inQuote) {
                    latex += `\\begin{quote}\n`;
                    quoteState.inQuote = true;
                }
                latex += `${this.compileParagraphRunsText(elem, true)}\n\n`;
            } else {
                if (centerState.inCenter) {
                    latex += `\\end{center}\n\n`;
                    centerState.inCenter = false;
                }
                if (quoteState.inQuote) {
                    latex += `\\end{quote}\n\n`;
                    quoteState.inQuote = false;
                }
                latex += this.compileNormalParagraph(elem);
            }
        }

        return latex;
    }

    compileHeadingParagraph(elem) {
        let headingText = this.compileParagraphRunsText(elem, true);
        if (elem.headingLevel === 1) {
            return `\\section{${headingText}}\n`;
        } else if (elem.headingLevel === 2) {
            return `\\subsection{${headingText}}\n`;
        } else if (elem.headingLevel === 3) {
            return `\\subsubsection{${headingText}}\n`;
        }
        return `\\section*{${headingText}}\n`;
    }

    compileListItemParagraph(elem, listState, styleLower) {
        let latex = '';
        const isNumbered = styleLower.includes('number') || styleLower.includes('enum') || styleLower.includes('ord');
        const targetListType = isNumbered ? 'enumerate' : 'itemize';

        if (!listState.inList) {
            latex += `\\begin{${targetListType}}\n`;
            listState.inList = true;
            listState.listType = targetListType;
        } else if (listState.listType !== targetListType) {
            latex += `\\end{${listState.listType}}\n`;
            latex += `\\begin{${targetListType}}\n`;
            listState.listType = targetListType;
        }

        latex += `  \\item ${this.compileParagraphRunsText(elem, true)}\n`;
        return latex;
    }

    compileNormalParagraph(elem) {
        const text = this.compileParagraphRunsText(elem, true);
        const alignmentCmds = {
            'left': 'flushleft',
            'right': 'flushright'
        };

        const align = elem.alignment;
        if (align && alignmentCmds[align]) {
            return `\\begin{${alignmentCmds[align]}}\n  ${text}\n\\end{${alignmentCmds[align]}}\n\n`;
        }
        return `${text}\n\n`;
    }

    compileTableNode(elem, listState) {
        let latex = '';

        if (listState.inList) {
            latex += `\\end{${listState.listType}}\n\n`;
            listState.inList = false;
            listState.listType = null;
        }

        const cols = elem.cols;
        let colSpec = '|' + ' l |'.repeat(cols);
        latex += `\\begin{table}[h]\n\\centering\n`;
        latex += `\\begin{tabular}{${colSpec}}\n\\hline\n`;

        elem.rows.forEach((row) => {
            const cellTexts = row.cells.map(cell => this.escapeTex(cell.text));
            while (cellTexts.length < cols) {
                cellTexts.push('');
            }
            latex += `  ` + cellTexts.join(' & ') + ` \\\\ \\hline\n`;
        });

        latex += `\\end{tabular}\n\\caption{Tabela extraída do documento original.}\n\\end{table}\n\n`;
        return latex;
    }

    // ==========================================================
    // Orchestrator Execution
    // ==========================================================

    generate() {
        const fontSetup = this.generateFontSetup();
        const packages = this.generateRequiredPackages();
        const citationSetup = this.generateCitationSetup();
        const headingStyles = this.generateHeadingStyles();
        const globalFormatting = this.generateGlobalBodyFormatting();
        const headerFooterSetup = this.generateHeaderFooterSetup();

        const cls = this.generateClsContent(packages, fontSetup, citationSetup, headingStyles, globalFormatting, headerFooterSetup);
        const tex = this.generateTexContent(packages, fontSetup, citationSetup, headingStyles, globalFormatting, headerFooterSetup);

        const bib = `@article{doctotex2026,
  author = {Laboratório de Experimentos},
  title = {A Simplificação da Engenharia Reversa de Documentos para LaTeX},
  journal = {Revista de Experimentos Antigravity},
  year = {2026},
  volume = {42},
  number = {1},
  pages = {100-112}
}`;

        return { cls, tex, bib };
    }
}

window.LatexGenerator = LatexGenerator;
