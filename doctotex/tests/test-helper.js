/**
 * DocToTex - Test Environment Helper
 * Sets up mock browser globals and XML parsers for testing in Node.js.
 */
const fs = require('fs');
const path = require('path');

// Mock DOM elements for XML parsing
class MiniXMLNode {
    constructor(localName, parent = null) {
        this.localName = localName;
        this.parent = parent;
        this.childNodes = [];
        this.attributes = [];
        this.nodeType = 1;
        this.textContent = '';
    }

    getAttribute(name) {
        const attr = this.attributes.find(a => a.localName === name || a.name === name);
        return attr ? attr.value : null;
    }

    getElementsByTagName(name) {
        const results = [];
        const traverse = (node) => {
            const matchName = name.includes(':') ? name.split(':')[1] : name;
            if (node.localName === matchName || node.localName === name) {
                results.push(node);
            }
            node.childNodes.forEach(child => {
                if (child.nodeType === 1) traverse(child);
            });
        };
        this.childNodes.forEach(child => {
            if (child.nodeType === 1) traverse(child);
        });
        return results;
    }
}

class MiniXMLTextNode {
    constructor(text) {
        this.nodeType = 3;
        this.textContent = text;
    }
}

function parseMiniXML(xmlString) {
    const root = new MiniXMLNode('root');
    let current = root;

    const cleanXml = xmlString
        .replace(/<\?xml[^>]*\?>/i, '')
        .replace(/xmlns:[^=]*="[^"]*"/g, '');

    const tokenRegex = /<([^>]+)>|([^<]+)/g;
    let token;
    while ((token = tokenRegex.exec(cleanXml)) !== null) {
        const tag = token[1];
        const text = token[2];

        if (text && text.trim()) {
            current.childNodes.push(new MiniXMLTextNode(text));
            let p = current;
            while (p) {
                p.textContent += text;
                p = p.parent;
            }
        } else if (tag) {
            if (tag.startsWith('/')) {
                if (current.parent) {
                    current = current.parent;
                }
            } else if (tag.endsWith('/')) {
                const cleanTag = tag.slice(0, -1).trim();
                const rawName = cleanTag.split(/\s+/)[0];
                const localName = rawName.includes(':') ? rawName.split(':')[1] : rawName;
                const node = new MiniXMLNode(localName, current);
                
                const attrRegex = /([^\s=]+)\s*=\s*"([^"]*)"/g;
                let attrMatch;
                while ((attrMatch = attrRegex.exec(cleanTag)) !== null) {
                    const attrName = attrMatch[1];
                    const attrLocalName = attrName.includes(':') ? attrName.split(':')[1] : attrName;
                    node.attributes.push({ localName: attrLocalName, name: attrName, value: attrMatch[2] });
                }
                current.childNodes.push(node);
            } else {
                const rawName = tag.split(/\s+/)[0];
                const localName = rawName.includes(':') ? rawName.split(':')[1] : rawName;
                const node = new MiniXMLNode(localName, current);

                const attrRegex = /([^\s=]+)\s*=\s*"([^"]*)"/g;
                let attrMatch;
                while ((attrMatch = attrRegex.exec(tag)) !== null) {
                    const attrName = attrMatch[1];
                    const attrLocalName = attrName.includes(':') ? attrName.split(':')[1] : attrName;
                    node.attributes.push({ localName: attrLocalName, name: attrName, value: attrMatch[2] });
                }
                current.childNodes.push(node);
                current = node;
            }
        }
    }

    return root;
}

// Bind Mock Browser Globals
globalThis.DOMParser = class DOMParser {
    parseFromString(xmlText) {
        return parseMiniXML(xmlText);
    }
};

globalThis.JSZip = class JSZip {
    static async loadAsync(buffer) {
        return new JSZip();
    }
    file(filePath) {
        const diskPath = path.join(__dirname, '..', 'exemplo', filePath);
        if (!fs.existsSync(diskPath)) {
            return null;
        }
        
        return {
            async: async (type) => {
                if (type === 'text') {
                    return fs.readFileSync(diskPath, 'utf8');
                } else if (type === 'base64') {
                    return fs.readFileSync(diskPath).toString('base64');
                } else if (type === 'blob') {
                    return fs.readFileSync(diskPath);
                }
                return null;
            }
        };
    }
};

if (!globalThis.window) {
    globalThis.window = {};
}

// Helper to load source files as modules into window and global scopes
function loadSourceModule(fileName) {
    const srcPath = path.join(__dirname, '..', 'js', fileName);
    const content = fs.readFileSync(srcPath, 'utf8');
    new Function(content)();
    
    // Bind window properties to globalThis so sandbox execution works cleanly
    const exportsName = fileName.replace('.js', '');
    if (globalThis.window[exportsName]) {
        globalThis[exportsName] = globalThis.window[exportsName];
    }
    return globalThis.window[exportsName];
}

module.exports = {
    parseMiniXML,
    loadSourceModule
};
