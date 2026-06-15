const assert = require('node:assert');
const test = require('node:test');
const { loadSourceModule } = require('./test-helper.js');

// Mock browser objects for ZIP packaging download
let downloadTriggered = false;
let downloadFilename = '';
let downloadUrl = '';

globalThis.URL = {
    createObjectURL: (blob) => {
        downloadUrl = 'blob:http://localhost/test-uuid';
        return downloadUrl;
    },
    revokeObjectURL: (url) => {}
};
globalThis.window.URL = globalThis.URL;

class MockAnchor {
    constructor() {
        this.href = '';
        this.download = '';
    }
    click() {
        downloadTriggered = true;
        downloadFilename = this.download;
    }
}

globalThis.document = {
    createElement: (tag) => {
        if (tag === 'a') return new MockAnchor();
        return { style: {} };
    },
    body: {
        appendChild: (el) => {},
        removeChild: (el) => {}
    }
};

// Mock JSZip save outputs tracker
let filesInZip = {};
let foldersInZip = {};

globalThis.JSZip = class JSZip {
    constructor() {
        filesInZip = {};
        foldersInZip = {};
    }
    file(name, content) {
        filesInZip[name] = content;
        return this;
    }
    folder(name) {
        foldersInZip[name] = {
            file: (fname, content) => {
                filesInZip[`${name}/${fname}`] = content;
            }
        };
        return foldersInZip[name];
    }
    async generateAsync(options) {
        assert.strictEqual(options.type, 'blob');
        return new Blob([], { type: 'application/zip' });
    }
};

// Simple global Blob mock for test
globalThis.Blob = class Blob {
    constructor(parts, options) {}
};

const ZipPackager = loadSourceModule('ZipPackager.js');

test('ZipPackager.download - packages files and triggers browser download', async () => {
    downloadTriggered = false;
    
    const parsedDoc = {
        images: [
            { filename: 'img1.png', blob: 'blob-image-data-1' }
        ]
    };
    
    const latexData = {
        tex: 'latex-tex-file-content',
        cls: 'latex-cls-file-content',
        bib: 'latex-bib-file-content'
    };
    
    const options = {
        classFormat: 'cls',
        citations: 'biblatex'
    };
    
    await ZipPackager.download(parsedDoc, latexData, options);
    
    // Check files generated in ZIP
    assert.strictEqual(filesInZip['main.tex'], 'latex-tex-file-content');
    assert.strictEqual(filesInZip['doctotex.cls'], 'latex-cls-file-content');
    assert.strictEqual(filesInZip['references.bib'], 'latex-bib-file-content');
    assert.strictEqual(filesInZip['images/img1.png'], 'blob-image-data-1');
    
    // Check download triggered
    assert.strictEqual(downloadTriggered, true);
    assert.strictEqual(downloadFilename, 'doctotex-template.zip');
});

test('ZipPackager.download - works without cls file format options', async () => {
    const parsedDoc = { images: [] };
    const latexData = { tex: 'latex-tex-only', bib: '' };
    const options = {
        classFormat: 'preamble',
        citations: 'none'
    };
    
    await ZipPackager.download(parsedDoc, latexData, options);
    
    assert.strictEqual(filesInZip['main.tex'], 'latex-tex-only');
    assert.strictEqual(filesInZip['doctotex.cls'], undefined);
    assert.strictEqual(filesInZip['references.bib'], undefined);
});
