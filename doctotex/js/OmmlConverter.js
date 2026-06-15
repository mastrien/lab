/**
 * DocToTex - OMML to LaTeX Math Converter Module
 */
class OmmlConverter {
    /**
     * Finds a child element by its local XML tag name.
     */
    static findChild(parent, localName) {
        if (!parent) return null;
        for (let i = 0; i < parent.childNodes.length; i++) {
            const node = parent.childNodes[i];
            if (node.nodeType === 1 && node.localName === localName) {
                return node;
            }
        }
        return null;
    }

    /**
     * Finds all child elements matching a local XML tag name.
     */
    static findChildren(parent, localName) {
        const list = [];
        if (!parent) return list;
        for (let i = 0; i < parent.childNodes.length; i++) {
            const node = parent.childNodes[i];
            if (node.nodeType === 1 && node.localName === localName) {
                list.push(node);
            }
        }
        return list;
    }

    /**
     * Gets an attribute value of an element by its local name.
     */
    static getAttr(element, attrName) {
        if (!element) return null;
        for (let i = 0; i < element.attributes.length; i++) {
            const attr = element.attributes[i];
            if (attr.localName === attrName) {
                return attr.value;
            }
        }
        return null;
    }

    /**
     * Recursively converts an OMML node into its equivalent LaTeX string.
     * @param {Node} node - DOM XML node
     * @returns {string} LaTeX math representation
     */
    static convert(node) {
        if (!node) return '';

        let latex = '';
        const name = node.localName;

        switch (name) {
            case 'oMath':
            case 'oMathPara':
                for (let i = 0; i < node.childNodes.length; i++) {
                    latex += this.convert(node.childNodes[i]);
                }
                break;

            case 'r': // Math Run
                const tNode = this.findChild(node, 't');
                if (tNode) {
                    let text = tNode.textContent;
                    // Advanced math symbol dictionary mapping
                    text = text.replace(/±/g, '\\pm ')
                               .replace(/×/g, '\\times ')
                               .replace(/÷/g, '\\div ')
                               .replace(/≠/g, '\\neq ')
                               .replace(/≤/g, '\\le ')
                               .replace(/≥/g, '\\ge ')
                               .replace(/∞/g, '\\infty ')
                               .replace(/π/g, '\\pi ')
                               .replace(/α/g, '\\alpha ')
                               .replace(/β/g, '\\beta ')
                               .replace(/θ/g, '\\theta ')
                               .replace(/λ/g, '\\lambda ')
                               .replace(/Δ/g, '\\Delta ')
                               .replace(/→/g, '\\rightarrow ')
                               .replace(/⇒/g, '\\Rightarrow ');
                    latex += text;
                }
                break;

            case 'f': // Fraction
                const numNode = this.findChild(node, 'num');
                const denNode = this.findChild(node, 'den');
                const numLatex = numNode ? this.convert(numNode) : '';
                const denLatex = denNode ? this.convert(denNode) : '';
                latex += `\\frac{${numLatex}}{${denLatex}}`;
                break;

            case 'num':
            case 'den':
            case 'e':
            case 'sub':
            case 'sup':
                for (let i = 0; i < node.childNodes.length; i++) {
                    latex += this.convert(node.childNodes[i]);
                }
                break;

            case 'sSub': // Subscript
                const subBase = this.findChild(node, 'e');
                const subVal = this.findChild(node, 'sub');
                latex += `${subBase ? this.convert(subBase) : ''}_{${subVal ? this.convert(subVal) : ''}}`;
                break;

            case 'sSup': // Superscript
                const supBase = this.findChild(node, 'e');
                const supVal = this.findChild(node, 'sup');
                latex += `${supBase ? this.convert(supBase) : ''}^{${supVal ? this.convert(supVal) : ''}}`;
                break;

            case 'sSubSup': // Sub-superscript
                const sssBase = this.findChild(node, 'e');
                const sssSub = this.findChild(node, 'sub');
                const sssSup = this.findChild(node, 'sup');
                latex += `${sssBase ? this.convert(sssBase) : ''}_{${sssSub ? this.convert(sssSub) : ''}}^{${sssSup ? this.convert(sssSup) : ''}}`;
                break;

            case 'rad': // Radical
                const degNode = this.findChild(node, 'deg');
                const radBase = this.findChild(node, 'e');
                const radBaseLatex = radBase ? this.convert(radBase) : '';
                if (degNode && degNode.textContent.trim()) {
                    const degLatex = this.convert(degNode);
                    latex += `\\sqrt[${degLatex}]{${radBaseLatex}}`;
                } else {
                    latex += `\\sqrt{${radBaseLatex}}`;
                }
                break;

            case 'd': // Delimiters
                const dPr = this.findChild(node, 'dPr');
                let begCh = '(';
                let endCh = ')';
                if (dPr) {
                    const begNode = this.findChild(dPr, 'begCh');
                    const endNode = this.findChild(dPr, 'endCh');
                    if (begNode) begCh = this.getAttr(begNode, 'val') || begCh;
                    if (endNode) endCh = this.getAttr(endNode, 'val') || endCh;
                }
                const texBeg = (begCh === '{' || begCh === '}') ? '\\' + begCh : begCh;
                const texEnd = (endCh === '{' || endCh === '}') ? '\\' + endCh : endCh;
                
                const dBase = this.findChild(node, 'e');
                latex += `\\left${texBeg}${dBase ? this.convert(dBase) : ''}\\right${texEnd}`;
                break;

            case 'nary': // Limit operators (integral, sum)
                const naryPr = this.findChild(node, 'naryPr');
                let op = '\\sum';
                if (naryPr) {
                    const chrNode = this.findChild(naryPr, 'chr');
                    if (chrNode) {
                        const val = this.getAttr(chrNode, 'val');
                        if (val === '∫') op = '\\int';
                        else if (val === '∏') op = '\\prod';
                    }
                }
                const nSub = this.findChild(node, 'sub');
                const nSup = this.findChild(node, 'sup');
                const nBase = this.findChild(node, 'e');
                
                latex += `${op}`;
                if (nSub) latex += `_{${this.convert(nSub)}}`;
                if (nSup) latex += `^{${this.convert(nSup)}}`;
                if (nBase) latex += ` {${this.convert(nBase)}}`;
                break;

            default:
                if (node.childNodes) {
                    for (let i = 0; i < node.childNodes.length; i++) {
                        latex += this.convert(node.childNodes[i]);
                    }
                }
                break;
        }

        return latex;
    }
}

window.OmmlConverter = OmmlConverter;
