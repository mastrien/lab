/**
 * DocToTex - DOCX Parser Module
 * Adheres to Clean Code principles and SRP.
 */
class DocxParser {
    constructor() {
        this.styles = {};
        this.images = [];
        this.relationships = {};
        this.documentGeometry = {
            width: 21.0,
            height: 29.7,
            orientation: 'portrait',
            margins: { top: 2.5, bottom: 2.5, left: 3.0, right: 2.0 }
        };
        this.documentBody = [];
        this.sections = [];
        this.header = null;
        this.footer = null;
    }

    // ==========================================================
    // Static Utility Units
    // ==========================================================

    static dxaToCm(dxa) {
        if (dxa === null || dxa === undefined || dxa === '') return null;
        return parseFloat(((parseInt(dxa) / 1440) * 2.54).toFixed(2));
    }

    static szToPt(sz) {
        if (sz === null || sz === undefined || sz === '') return null;
        return parseFloat((parseInt(sz) / 2).toFixed(1));
    }

    static parseColor(colorVal) {
        if (!colorVal || colorVal === 'auto') return null;
        return colorVal.startsWith('#') ? colorVal : '#' + colorVal;
    }

    // ==========================================================
    // Main Orchestration
    // ==========================================================

    async parse(fileBuffer) {
        const zip = await JSZip.loadAsync(fileBuffer);

        await this.loadRelationships(zip);
        await this.loadStyles(zip);
        await this.loadDocumentContent(zip);

        return {
            geometry: this.documentGeometry,
            styles: this.styles,
            body: this.documentBody,
            images: this.images,
            sections: this.sections,
            header: this.header,
            footer: this.footer
        };
    }

    async loadRelationships(zip) {
        if (zip.file("word/_rels/document.xml.rels")) {
            const relsXml = await zip.file("word/_rels/document.xml.rels").async("text");
            this.relationships = this.parseRelationships(relsXml);
        }
    }

    async loadStyles(zip) {
        if (zip.file("word/styles.xml")) {
            const stylesXml = await zip.file("word/styles.xml").async("text");
            this.parseStyles(stylesXml);
        }
    }

    async loadDocumentContent(zip) {
        if (zip.file("word/document.xml")) {
            const docXml = await zip.file("word/document.xml").async("text");
            await this.parseDocument(docXml, zip);
        }
    }

    // ==========================================================
    // Relationship Parsing
    // ==========================================================

    parseRelationships(xmlText, saveGlobal = true) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "application/xml");
        const rels = xmlDoc.getElementsByTagName("Relationship");
        const relsMap = {};
        for (let i = 0; i < rels.length; i++) {
            const rel = rels[i];
            const id = rel.getAttribute("Id");
            const type = rel.getAttribute("Type");
            const target = rel.getAttribute("Target");
            relsMap[id] = { type, target };
            if (saveGlobal) {
                this.relationships[id] = { type, target };
            }
        }
        return relsMap;
    }

    // ==========================================================
    // Style parsing & sub-parsers
    // ==========================================================

    parseStyles(xmlText) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "application/xml");
        const styles = xmlDoc.getElementsByTagName("w:style");

        this.setDefaultStyles();

        for (let i = 0; i < styles.length; i++) {
            const style = styles[i];
            const id = style.getAttribute("w:styleId");
            const type = style.getAttribute("w:type");
            const nameEl = style.getElementsByTagName("w:name")[0];
            const name = nameEl ? nameEl.getAttribute("w:val") : id;

            const existingStyle = this.styles[id] || {};
            const styleData = {
                bold: false,
                italic: false,
                ...existingStyle,
                name: name,
                type: type,
                ...this.parseRunStyleProperties(style.getElementsByTagName("w:rPr")[0]),
                ...this.parseParagraphStyleProperties(style.getElementsByTagName("w:pPr")[0])
            };

            const rPr = style.getElementsByTagName("w:rPr")[0];
            if (rPr) {
                const bEl = rPr.getElementsByTagName("w:b")[0];
                if (bEl) {
                    const bVal = bEl.getAttribute("w:val") || bEl.getAttribute("val");
                    styleData.bold = !(bVal === '0' || bVal === 'false' || bVal === 'none' || bVal === 'off');
                }
                const iEl = rPr.getElementsByTagName("w:i")[0];
                if (iEl) {
                    const iVal = iEl.getAttribute("w:val") || iEl.getAttribute("val");
                    styleData.italic = !(iVal === '0' || iVal === 'false' || iVal === 'none' || iVal === 'off');
                }
            }

            this.styles[id] = styleData;
        }
    }

    setDefaultStyles() {
        this.styles['Normal'] = {
            name: 'Normal',
            fontSize: 12,
            fontFamily: 'Times New Roman',
            color: '#000000',
            bold: false,
            italic: false,
            lineSpacing: 1.5,
            spaceAfter: 6,
            spaceBefore: 0,
            alignment: 'justified'
        };
    }

    parseRunStyleProperties(rPr) {
        if (!rPr) return {};

        const props = {};
        const sz = rPr.getElementsByTagName("w:sz")[0];
        if (sz) props.fontSize = DocxParser.szToPt(sz.getAttribute("w:val"));

        const color = rPr.getElementsByTagName("w:color")[0];
        if (color) props.color = DocxParser.parseColor(color.getAttribute("w:val"));

        const rFonts = rPr.getElementsByTagName("w:rFonts")[0];
        if (rFonts) {
            props.fontFamily = rFonts.getAttribute("w:ascii") || rFonts.getAttribute("w:hAnsi") || 'Times New Roman';
        }

        return props;
    }

    parseParagraphStyleProperties(pPr) {
        if (!pPr) return {};

        const props = {};
        const jc = pPr.getElementsByTagName("w:jc")[0];
        if (jc) {
            const alignment = jc.getAttribute("w:val");
            props.alignment = alignment === 'both' ? 'justified' : alignment;
        }

        const spacing = pPr.getElementsByTagName("w:spacing")[0];
        if (spacing) {
            const before = spacing.getAttribute("w:before");
            const after = spacing.getAttribute("w:after");
            const line = spacing.getAttribute("w:line");
            const lineRule = spacing.getAttribute("w:lineRule");

            if (before) props.spaceBefore = Math.round(parseInt(before) / 20);
            if (after) props.spaceAfter = Math.round(parseInt(after) / 20);

            if (line && lineRule === 'auto') {
                props.lineSpacing = parseFloat((parseInt(line) / 240).toFixed(2));
            } else if (line) {
                props.lineSpacing = parseFloat((parseInt(line) / 1440).toFixed(2));
            }
        }

        const ind = pPr.getElementsByTagName("w:ind")[0];
        if (ind) {
            const firstLine = ind.getAttribute("w:firstLine");
            if (firstLine) props.indent = DocxParser.dxaToCm(firstLine);

            const left = ind.getAttribute("w:left") || ind.getAttribute("w:start");
            if (left) props.leftIndent = DocxParser.dxaToCm(left);

            const right = ind.getAttribute("w:right") || ind.getAttribute("w:end");
            if (right) props.rightIndent = DocxParser.dxaToCm(right);
        }

        return props;
    }

    // ==========================================================
    // Document parsing & sub-parsers
    // ==========================================================

    async parseDocument(xmlText, zip) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "application/xml");

        const bodyNode = xmlDoc.getElementsByTagName("w:body")[0];
        if (!bodyNode) return;

        // Collect all sectPr in document order and build section map
        await this.collectSections(bodyNode, zip);

        await this.parseBodyNodes(bodyNode, zip);
    }

    async collectSections(bodyNode, zip) {
        let currentSectionIndex = 0;

        // Find all paragraph-level sectPrs (section breaks mid-document)
        const paragraphs = bodyNode.childNodes;
        for (let i = 0; i < paragraphs.length; i++) {
            const node = paragraphs[i];
            if (node.nodeType !== 1 || node.localName !== 'p') continue;

            const pPr = OmmlConverter.findChild(node, 'pPr');
            if (!pPr) continue;

            const sectPr = OmmlConverter.findChild(pPr, 'sectPr');
            if (!sectPr) continue;

            const section = this.parseSectionProperties(sectPr);
            section.index = currentSectionIndex++;
            section.endsAtParagraphIndex = i;
            this.sections.push(section);
        }

        // Find the body-level sectPr (final section)
        const bodySectPr = OmmlConverter.findChild(bodyNode, 'sectPr');
        if (bodySectPr) {
            const finalSection = this.parseSectionProperties(bodySectPr);
            finalSection.index = currentSectionIndex;
            finalSection.endsAtParagraphIndex = null; // goes to end of document
            // Final section inherits header/footer from first section if not set
            if (!finalSection.headerRId && this.sections.length > 0) {
                finalSection.headerRId = this.sections[0].headerRId;
                finalSection.footerRId = this.sections[0].footerRId;
            }
            this.sections.push(finalSection);

            // Use body sectPr for document geometry
            this.parseGeometry(bodySectPr);
        } else if (this.sections.length > 0) {
            // Fallback: use first section for geometry
            const firstSectNode = bodyNode.getElementsByTagName("w:sectPr")[0];
            if (firstSectNode) this.parseGeometry(firstSectNode);
        }

        // Load header and footer content from the section that defines them
        const headerSection = this.sections.find(s => s.headerRId);
        if (headerSection) {
            this.header = await this.loadHeaderFooterContent(zip, headerSection.headerRId);
            this.footer = await this.loadHeaderFooterContent(zip, headerSection.footerRId);
        }
    }

    parseSectionProperties(sectPr) {
        const section = {
            columns: 1,
            columnSpaceCm: 1.27,
            headerRId: null,
            footerRId: null,
            type: 'nextPage'
        };

        // Column count
        const cols = OmmlConverter.findChild(sectPr, 'cols');
        if (cols) {
            const numAttr = OmmlConverter.getAttr(cols, 'num');
            if (numAttr) section.columns = parseInt(numAttr);
            const spaceAttr = OmmlConverter.getAttr(cols, 'space');
            if (spaceAttr) section.columnSpaceCm = DocxParser.dxaToCm(spaceAttr);
        }

        // Section type
        const typeEl = OmmlConverter.findChild(sectPr, 'type');
        if (typeEl) section.type = OmmlConverter.getAttr(typeEl, 'val') || 'nextPage';

        // Header reference
        const headerRefs = sectPr.getElementsByTagName('w:headerReference');
        for (let i = 0; i < headerRefs.length; i++) {
            const t = headerRefs[i].getAttribute('w:type') || headerRefs[i].getAttribute('type');
            if (t === 'default') {
                section.headerRId = headerRefs[i].getAttribute('r:id') || headerRefs[i].getAttribute('id');
            }
        }

        // Footer reference
        const footerRefs = sectPr.getElementsByTagName('w:footerReference');
        for (let i = 0; i < footerRefs.length; i++) {
            const t = footerRefs[i].getAttribute('w:type') || footerRefs[i].getAttribute('type');
            if (t === 'default') {
                section.footerRId = footerRefs[i].getAttribute('r:id') || footerRefs[i].getAttribute('id');
            }
        }

        return section;
    }

    async loadHeaderFooterContent(zip, rId) {
        if (!rId || !this.relationships[rId]) return null;

        const target = this.relationships[rId].target;
        const zipPath = target.startsWith('word/') ? target : `word/${target}`;
        const file = zip.file(zipPath);
        if (!file) return null;

        const xmlText = await file.async("text");

        // Load local relationships for header/footer (e.g. image links)
        let localRels = {};
        const pathParts = zipPath.split('/');
        const fileName = pathParts.pop();
        const relsFolder = pathParts.join('/') + '/_rels';
        const relsPath = `${relsFolder}/${fileName}.rels`;

        if (zip.file(relsPath)) {
            const relsXml = await zip.file(relsPath).async("text");
            localRels = this.parseRelationships(relsXml, false);
        }

        return await this.parseHeaderFooterParagraphs(xmlText, zip, localRels);
    }

    async parseHeaderFooterParagraphs(xmlText, zip, localRels) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "application/xml");
        const paragraphs = xmlDoc.getElementsByTagName("w:p");
        const parsedParagraphs = [];

        for (let i = 0; i < paragraphs.length; i++) {
            const p = paragraphs[i];
            const props = this.extractParagraphProperties(p);
            const pPr = OmmlConverter.findChild(p, 'pPr');
            const pRunProps = this.parseParagraphRunProperties(pPr);
            const runsData = await this.processParagraphRuns(p, zip, localRels, props.styleId, pRunProps);
            
            if (runsData.runs.length > 0) {
                parsedParagraphs.push({
                    type: 'paragraph',
                    styleId: props.styleId,
                    isHeading: props.isHeading,
                    headingLevel: props.headingLevel,
                    alignment: props.alignment,
                    indent: props.indent,
                    leftIndent: props.leftIndent || null,
                    rightIndent: props.rightIndent || null,
                    runs: runsData.runs,
                    hasMath: runsData.hasMath,
                    hasImage: runsData.hasImage
                });
            }
        }

        return parsedParagraphs;
    }

    parseHeaderFooterLines(xmlText) {
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(xmlText, "application/xml");
        const paragraphs = xmlDoc.getElementsByTagName("w:p");
        const lines = [];

        for (let i = 0; i < paragraphs.length; i++) {
            const p = paragraphs[i];
            const text = this.extractParagraphText(p);
            const alignment = this.extractParagraphAlignment(p);
            if (text.trim()) {
                lines.push({ text, alignment });
            }
        }

        return lines;
    }

    extractParagraphText(pNode) {
        const textNodes = pNode.getElementsByTagName("w:t");
        let text = '';
        for (let i = 0; i < textNodes.length; i++) {
            text += textNodes[i].textContent;
        }
        return text;
    }

    extractParagraphAlignment(pNode) {
        const pPr = OmmlConverter.findChild(pNode, 'pPr');
        if (!pPr) return 'left';
        const jc = OmmlConverter.findChild(pPr, 'jc');
        if (!jc) return 'left';
        const val = OmmlConverter.getAttr(jc, 'val');
        if (val === 'both') return 'justified';
        return val || 'left';
    }

    parseGeometry(sectPr) {
        const pgSz = sectPr.getElementsByTagName("w:pgSz")[0];
        if (pgSz) {
            const w = pgSz.getAttribute("w:w");
            const h = pgSz.getAttribute("w:h");
            const orient = pgSz.getAttribute("w:orient");
            if (w) this.documentGeometry.width = DocxParser.dxaToCm(w);
            if (h) this.documentGeometry.height = DocxParser.dxaToCm(h);
            if (orient) this.documentGeometry.orientation = orient;
        }

        const pgMar = sectPr.getElementsByTagName("w:pgMar")[0];
        if (pgMar) {
            const top = pgMar.getAttribute("w:top");
            const bottom = pgMar.getAttribute("w:bottom");
            const left = pgMar.getAttribute("w:left");
            const right = pgMar.getAttribute("w:right");

            this.documentGeometry.margins = {
                top: DocxParser.dxaToCm(top) || 2.5,
                bottom: DocxParser.dxaToCm(bottom) || 2.5,
                left: DocxParser.dxaToCm(left) || 3.0,
                right: DocxParser.dxaToCm(right) || 2.0
            };
        }
    }

    async parseBodyNodes(bodyNode, zip) {
        let currentSectionIdx = 0;
        let paragraphBodyIdx = 0;

        for (let i = 0; i < bodyNode.childNodes.length; i++) {
            const node = bodyNode.childNodes[i];
            if (node.nodeType !== 1) continue;

            const name = node.localName;

            if (name === 'p') {
                // Advance section index when we pass a paragraph that ends a section
                const pPr = OmmlConverter.findChild(node, 'pPr');
                const hasSectPr = pPr && OmmlConverter.findChild(pPr, 'sectPr');

                if (hasSectPr) {
                    // This paragraph terminates its section; mark it and advance
                    const terminalSection = this.sections.find(s => s.endsAtParagraphIndex === i);
                    if (terminalSection) currentSectionIdx = terminalSection.index + 1;
                    // A sectPr paragraph with no content is a section divider; skip rendering
                    continue;
                }

                const section = this.sections.find(s => s.index === currentSectionIdx);
                const sectionColumns = section ? section.columns : 1;
                const columnSpaceCm = section ? section.columnSpaceCm : 1.27;

                await this.processParagraph(node, zip, sectionColumns, columnSpaceCm);
                paragraphBodyIdx++;
            } else if (name === 'tbl') {
                const section = this.sections.find(s => s.index === currentSectionIdx);
                const sectionColumns = section ? section.columns : 1;
                const columnSpaceCm = section ? section.columnSpaceCm : 1.27;

                this.processTable(node, sectionColumns, columnSpaceCm);
            }
        }
    }

    resolveSectionColumnsAt(sectionIdx) {
        if (!this.sections || this.sections.length === 0) return 1;
        const section = this.sections.find(s => s.index === sectionIdx);
        return section ? section.columns : 1;
    }

    // ==========================================================
    // Paragraph Sub-parsers
    // ==========================================================

    parseParagraphRunProperties(pPr) {
        if (!pPr) return {};
        const rPr = OmmlConverter.findChild(pPr, 'rPr');
        if (!rPr) return {};

        const props = {};
        if (OmmlConverter.findChild(rPr, 'b')) props.bold = true;
        if (OmmlConverter.findChild(rPr, 'i')) props.italic = true;
        if (OmmlConverter.findChild(rPr, 'u')) props.underline = true;

        const sz = OmmlConverter.findChild(rPr, 'sz');
        if (sz) props.fontSize = DocxParser.szToPt(OmmlConverter.getAttr(sz, 'val'));

        const color = OmmlConverter.findChild(rPr, 'color');
        if (color) props.color = DocxParser.parseColor(OmmlConverter.getAttr(color, 'val'));

        return props;
    }

    async processParagraph(pNode, zip, columns = 1, columnSpaceCm = 1.27) {
        const props = this.extractParagraphProperties(pNode);
        const pPr = OmmlConverter.findChild(pNode, 'pPr');
        const pRunProps = this.parseParagraphRunProperties(pPr);
        const runsData = await this.processParagraphRuns(pNode, zip, null, props.styleId, pRunProps);

        if (runsData.runs.length > 0) {
            // Get combined text to run heuristics
            const combinedText = runsData.runs
                .filter(r => r.type === 'text')
                .map(r => r.data.text)
                .join('')
                .trim();

            let isHeading = props.isHeading;
            let headingLevel = props.headingLevel;

            if (!isHeading && combinedText.length > 0 && combinedText.length < 80) {
                const upperText = combinedText.toUpperCase();
                const knownSections = [
                    'INTRODUÇÃO', 'INTRODUCAO', 'INTRODUCTION',
                    'MATERIAL E MÉTODOS', 'MATERIAL E METODOS', 'METODOLOGIA', 'METHODOLOGY', 'METHODS',
                    'RESULTADOS E DISCUSSÃO', 'RESULTADOS E DISCUSSAO', 'RESULTS AND DISCUSSION', 'RESULTS', 'DISCUSSION',
                    'CONCLUSÃO', 'CONCLUSAO', 'CONCLUSÕES', 'CONCLUSOES', 'CONCLUSIONS', 'CONCLUSION',
                    'AGRADECIMENTOS', 'ACKNOWLEDGEMENTS', 'ACKNOWLEDGEMENT',
                    'REFERÊNCIAS', 'REFERENCIAS', 'REFERENCES', 'BIBLIOGRAFIA'
                ];
                
                const matchesKnownSection = knownSections.includes(upperText);
                const isAllPageTitleOrHeading = upperText === combinedText && /[A-ZÀ-Ý]/.test(combinedText) && !/[a-zà-ÿ]/.test(combinedText);
                
                if (matchesKnownSection || (isAllPageTitleOrHeading && (props.alignment === 'center' || runsData.runs.some(r => r.data && r.data.bold)))) {
                    // Check if it's the very first paragraph of the document (usually the title of the paper)
                    const isFirstTextParagraph = !this.documentBody.some(p => p.type === 'paragraph' && p.runs && p.runs.some(r => r.type === 'text' && r.data.text.trim().length > 0));
                    if (!isFirstTextParagraph || matchesKnownSection) {
                        isHeading = true;
                        headingLevel = 1;
                    }
                }
            }

            this.documentBody.push({
                type: 'paragraph',
                styleId: props.styleId,
                isHeading: isHeading,
                headingLevel: headingLevel,
                alignment: props.alignment,
                indent: props.indent,
                leftIndent: props.leftIndent || null,
                rightIndent: props.rightIndent || null,
                runs: runsData.runs,
                hasMath: runsData.hasMath,
                hasImage: runsData.hasImage,
                columns: columns,
                columnSpaceCm: columnSpaceCm
            });
        }
    }

    extractParagraphProperties(pNode) {
        const pPr = OmmlConverter.findChild(pNode, 'pPr');
        let styleId = 'Normal';
        let alignment = null;
        let indent = null;
        let leftIndent = null;
        let rightIndent = null;

        if (pPr) {
            const pStyle = OmmlConverter.findChild(pPr, 'pStyle');
            if (pStyle) {
                styleId = OmmlConverter.getAttr(pStyle, 'val') || 'Normal';
            }
            const jc = OmmlConverter.findChild(pPr, 'jc');
            if (jc) {
                const val = OmmlConverter.getAttr(jc, 'val');
                alignment = val === 'both' ? 'justified' : val;
            }
            const ind = OmmlConverter.findChild(pPr, 'ind');
            if (ind) {
                const firstLine = OmmlConverter.getAttr(ind, 'firstLine');
                if (firstLine) indent = DocxParser.dxaToCm(firstLine);

                const left = OmmlConverter.getAttr(ind, 'left') || OmmlConverter.getAttr(ind, 'start');
                if (left) leftIndent = DocxParser.dxaToCm(left);

                const right = OmmlConverter.getAttr(ind, 'right') || OmmlConverter.getAttr(ind, 'end');
                if (right) rightIndent = DocxParser.dxaToCm(right);
            }
        }

        const styleIdLower = styleId.toLowerCase();
        const headingMatch = styleId.match(/\d+/);

        const isDocTitle = styleIdLower === 'title' || styleIdLower === 'subtitle' || styleIdLower === 'titre' || styleIdLower === 'titulo' || styleIdLower.includes('titulo_trabalho') || styleIdLower.includes('titulotrabalho');

        let isHeading = false;
        let headingLevel = null;

        if (!isDocTitle && (styleIdLower.includes('heading') || styleIdLower.includes('titulo') || styleIdLower.includes('titre'))) {
            isHeading = true;
            headingLevel = headingMatch ? parseInt(headingMatch[0]) : 1;
        }

        return { styleId, alignment, indent, leftIndent, rightIndent, isHeading, headingLevel };
    }

    async processParagraphRuns(pNode, zip, localRels = null, pStyleId = 'Normal', pRunProps = {}) {
        const runs = [];
        let hasMath = false;
        let hasImage = false;

        for (let j = 0; j < pNode.childNodes.length; j++) {
            const child = pNode.childNodes[j];
            if (child.nodeType !== 1) continue;

            const name = child.localName;

            if (name === 'r') {
                const runResult = await this.parseRun(child, zip, localRels, pStyleId, pRunProps);
                if (runResult) {
                    runs.push(runResult);
                    if (runResult.type === 'image') hasImage = true;
                }
            } else if (name === 'oMath' || name === 'oMathPara') {
                const latexMath = OmmlConverter.convert(child);
                runs.push({ type: 'math', data: { latex: latexMath } });
                hasMath = true;
            }
        }

        return { runs, hasMath, hasImage };
    }

    async parseRun(rNode, zip, localRels = null, pStyleId = 'Normal', pRunProps = {}) {
        const textNode = OmmlConverter.findChild(rNode, 't');
        if (textNode) {
            return {
                type: 'text',
                data: this.parseTextRunProperties(rNode, textNode.textContent, pStyleId, pRunProps)
            };
        }

        const drawing = OmmlConverter.findChild(rNode, 'drawing');
        if (drawing) {
            const imageObj = await this.parseDrawing(drawing, zip, localRels);
            if (imageObj) {
                return { type: 'image', data: imageObj };
            }
        }

        return null;
    }

    parseTextRunProperties(rNode, textContent, pStyleId = 'Normal', pRunProps = {}) {
        const rPr = OmmlConverter.findChild(rNode, 'rPr');
        const styleDef = this.styles[pStyleId] || {};

        const runData = {
            text: textContent,
            bold: false,
            italic: false,
            underline: false,
            color: null,
            fontSize: null,
            bgColor: null
        };

        let runBold = null;
        let runItalic = null;
        let runUnderline = null;

        if (rPr) {
            const bNode = OmmlConverter.findChild(rPr, 'b');
            if (bNode) {
                const val = OmmlConverter.getAttr(bNode, 'val');
                runBold = !(val === '0' || val === 'false' || val === 'none' || val === 'off');
            }
            const iNode = OmmlConverter.findChild(rPr, 'i');
            if (iNode) {
                const val = OmmlConverter.getAttr(iNode, 'val');
                runItalic = !(val === '0' || val === 'false' || val === 'none' || val === 'off');
            }
            const uNode = OmmlConverter.findChild(rPr, 'u');
            if (uNode) {
                const val = OmmlConverter.getAttr(uNode, 'val');
                runUnderline = !(val === '0' || val === 'false' || val === 'none' || val === 'off');
            }

            const sz = OmmlConverter.findChild(rPr, 'sz');
            if (sz) runData.fontSize = DocxParser.szToPt(OmmlConverter.getAttr(sz, 'val'));

            const color = OmmlConverter.findChild(rPr, 'color');
            if (color) runData.color = DocxParser.parseColor(OmmlConverter.getAttr(color, 'val'));

            const shd = OmmlConverter.findChild(rPr, 'shd');
            if (shd) runData.bgColor = DocxParser.parseColor(OmmlConverter.getAttr(shd, 'val') || OmmlConverter.getAttr(shd, 'fill'));

            const highlight = OmmlConverter.findChild(rPr, 'highlight');
            if (highlight) {
                const hiVal = OmmlConverter.getAttr(highlight, 'val');
                const highlightMap = {
                    'black': '#000000', 'blue': '#0000ff', 'cyan': '#00ffff', 'green': '#00ff00',
                    'magenta': '#ff00ff', 'red': '#ff0000', 'yellow': '#ffff00', 'white': '#ffffff',
                    'darkBlue': '#00008b', 'darkCyan': '#008b8b', 'darkGreen': '#006400', 'darkMagenta': '#8b008b',
                    'darkRed': '#8b0000', 'darkYellow': '#808000', 'darkGray': '#808080', 'lightGray': '#d3d3d3'
                };
                if (!runData.bgColor) runData.bgColor = highlightMap[hiVal] || hiVal;
            }
        }

        // Apply inheritance: run properties > paragraph run properties > style defaults
        runData.bold = runBold !== null ? runBold : (pRunProps.bold !== undefined ? pRunProps.bold : !!styleDef.bold);
        runData.italic = runItalic !== null ? runItalic : (pRunProps.italic !== undefined ? pRunProps.italic : !!styleDef.italic);
        runData.underline = runUnderline !== null ? runUnderline : (pRunProps.underline !== undefined ? pRunProps.underline : !!styleDef.underline);

        if (runData.fontSize === null) {
            runData.fontSize = pRunProps.fontSize !== undefined ? pRunProps.fontSize : (styleDef.fontSize || null);
        }
        if (runData.color === null) {
            runData.color = pRunProps.color !== undefined ? pRunProps.color : (styleDef.color || null);
        }

        return runData;
    }

    async parseDrawing(drawingNode, zip, localRels = null) {
        const imageRelId = this.extractImageRelationshipId(drawingNode);
        const rels = localRels || this.relationships;
        if (!imageRelId || !rels[imageRelId]) return null;

        const target = rels[imageRelId].target;
        const zipPath = target.startsWith('word/') ? target : `word/${target}`;
        const imgFile = zip.file(zipPath);
        if (!imgFile) return null;

        const ext = target.split('.').pop();
        const filename = `image_${this.images.length + 1}.${ext}`;
        const base64 = await imgFile.async("base64");
        const blob = await imgFile.async("blob");

        const imgObj = {
            rId: imageRelId,
            zipPath: zipPath,
            filename: filename,
            ext: ext,
            base64: base64,
            blob: blob
        };

        this.images.push(imgObj);
        return imgObj;
    }

    extractImageRelationshipId(drawingNode) {
        const blips = drawingNode.getElementsByTagName("a:blip");
        if (blips.length > 0) {
            return blips[0].getAttribute("r:embed") || blips[0].getAttribute("r:link");
        }
        const allNodes = drawingNode.getElementsByTagName("*");
        for (let i = 0; i < allNodes.length; i++) {
            if (allNodes[i].localName === 'blip') {
                return allNodes[i].getAttribute("r:embed") || allNodes[i].getAttribute("r:link") || allNodes[i].getAttribute("embed");
            }
        }
        return null;
    }

    // ==========================================================
    // Table Sub-parsers
    // ==========================================================

    processTable(tblNode, columns = 1, columnSpaceCm = 1.27) {
        const rows = [];
        const trList = OmmlConverter.findChildren(tblNode, 'tr');
        let maxCols = 0;

        for (let i = 0; i < trList.length; i++) {
            const tr = trList[i];
            const cells = [];
            const tcList = OmmlConverter.findChildren(tr, 'tc');

            for (let j = 0; j < tcList.length; j++) {
                cells.push(this.parseTableCell(tcList[j]));
            }

            maxCols = Math.max(maxCols, cells.length);
            rows.push({ cells });
        }

        this.documentBody.push({
            type: 'table',
            cols: maxCols,
            rows: rows,
            columns: columns,
            columnSpaceCm: columnSpaceCm
        });
    }

    parseTableCell(tcNode) {
        let cellText = "";
        const pList = OmmlConverter.findChildren(tcNode, 'p');

        for (let k = 0; k < pList.length; k++) {
            const p = pList[k];
            const rList = OmmlConverter.findChildren(p, 'r');
            let pText = "";
            for (let l = 0; l < rList.length; l++) {
                const t = OmmlConverter.findChild(rList[l], 't');
                if (t) pText += t.textContent;
            }
            if (k > 0) cellText += "\n";
            cellText += pText;
        }

        return {
            text: cellText.trim(),
            bgColor: this.parseTableCellBgColor(tcNode)
        };
    }

    parseTableCellBgColor(tcNode) {
        const tcPr = OmmlConverter.findChild(tcNode, 'tcPr');
        if (!tcPr) return null;

        const shd = OmmlConverter.findChild(tcPr, 'shd');
        if (!shd) return null;

        return DocxParser.parseColor(OmmlConverter.getAttr(shd, 'val') || OmmlConverter.getAttr(shd, 'fill'));
    }
}

window.DocxParser = DocxParser;
