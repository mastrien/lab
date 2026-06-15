const assert = require('node:assert');
const test = require('node:test');
const { loadSourceModule } = require('./test-helper.js');

// Mock browser dependencies for App.js
class MockHtmlElement {
    constructor(id = '') {
        this.id = id;
        this.listeners = {};
        this.style = { display: '' };
        this.classList = {
            add: (c) => { this.className = c; },
            remove: (c) => { this.className = ''; }
        };
        this.options = [];
    }
    addEventListener(event, callback) {
        if (!this.listeners[event]) this.listeners[event] = [];
        this.listeners[event].push(callback);
    }
    click() {
        if (this.listeners['click']) {
            this.listeners['click'].forEach(cb => cb());
        }
    }
    trigger(event, data = {}) {
        if (this.listeners[event]) {
            this.listeners[event].forEach(cb => cb(data));
        }
    }
}

// Global mocks
globalThis.document = {
    getElementById: (id) => new MockHtmlElement(id),
    querySelectorAll: () => [],
    querySelector: () => null,
    addEventListener: () => {}
};

globalThis.window = {
    addEventListener: () => {},
    DocxParser: class {},
    LatexGenerator: class {
        generate() {
            return { cls: 'cls', tex: 'tex', bib: 'bib' };
        }
    },
    PreviewRenderer: class {
        renderCode() {}
        renderLayout() {}
    },
    ZipPackager: class {
        static async download() {}
    }
};

// FileReader mock
globalThis.FileReader = class FileReader {
    constructor() {
        setTimeout(() => {
            if (this.onload) {
                this.onload({ target: { result: new ArrayBuffer(8) } });
            }
        }, 10);
    }
    readAsArrayBuffer(file) {}
};

// Load App module
const App = loadSourceModule('App.js');

test('App - initialization maps PreviewRenderer and registers listeners', () => {
    const app = new App();
    
    // Stub setupEventListeners to prevent actual listeners register during constructor check
    let listenersRegistered = false;
    app.setupEventListeners = () => { listenersRegistered = true; };
    
    app.init();
    
    assert.ok(app.previewRenderer);
    assert.strictEqual(listenersRegistered, true);
});

test('App - getOptions retrieves values from DOM elements mapping', () => {
    const app = new App();
    
    // Set custom element values to verify mapping
    app.elements.compilerSelect.value = 'xelatex';
    app.elements.formatSelect.value = 'preamble';
    app.elements.citationsSelect.value = 'biblatex';
    app.elements.citationStyleSelect.value = 'ieee';
    app.elements.fontSelect.value = 'standard';
    app.elements.toggleHyperref.checked = false;
    app.elements.toggleBooktabs = { checked: true };
    app.elements.toggleGraphicx = { checked: true };
    
    const options = app.getOptions();
    
    assert.strictEqual(options.compiler, 'xelatex');
    assert.strictEqual(options.classFormat, 'preamble');
    assert.strictEqual(options.citations, 'biblatex');
    assert.strictEqual(options.citationStyle, 'ieee');
    assert.strictEqual(options.fontOverride, 'standard');
    assert.strictEqual(options.includeHyperref, false);
    assert.strictEqual(options.includeBooktabs, true);
    assert.strictEqual(options.includeGraphics, true);
});

test('App - selectFileTab manages active class tags state', () => {
    const app = new App();
    
    app.selectFileTab('tex');
    assert.strictEqual(app.currentActiveFileTab, 'tex');
    assert.ok(app.elements.fileTabTex.className.includes('active'));
    assert.ok(!app.elements.fileTabCls.className.includes('active'));
    
    app.selectFileTab('cls');
    assert.strictEqual(app.currentActiveFileTab, 'cls');
    assert.ok(app.elements.fileTabCls.className.includes('active'));
});

test('App - setViewMode switches panels layout triggers', () => {
    const app = new App();
    
    // Test layout mode
    app.setViewMode('layout');
    assert.ok(app.elements.tabLayout.className.includes('active'));
    assert.ok(app.elements.layoutViewport.className.includes('active'));
    assert.strictEqual(app.elements.codeViewportContainer.style.display, 'none');
    
    // Test code mode
    app.setViewMode('code');
    assert.ok(app.elements.tabCode.className.includes('active'));
    assert.ok(!app.elements.layoutViewport.className.includes('active'));
    assert.strictEqual(app.elements.codeViewportContainer.style.display, 'flex');
});
