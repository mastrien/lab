// Simulação de ambiente de navegador para testar renderApp e views principais
globalThis.window = {
  location: { hash: '' },
  addEventListener: () => {},
  removeEventListener: () => {},
  dispatchEvent: () => {},
  scrollTo: () => {},
  matchMedia: () => ({ matches: false }),
  renderMathInElement: () => {}
};

globalThis.localStorage = {
  store: {},
  getItem(key) { return this.store[key] || null; },
  setItem(key, val) { this.store[key] = String(val); },
  removeItem(key) { delete this.store[key]; }
};

class MockElement {
  constructor(tag = 'div') {
    this.tagName = tag.toUpperCase();
    this.children = [];
    this.innerHTML = '';
    this.className = '';
    this.id = '';
    this.style = {};
    this.attributes = {};
  }
  getContext() {
    return {
      fillRect: () => {},
      clearRect: () => {},
      beginPath: () => {},
      moveTo: () => {},
      lineTo: () => {},
      stroke: () => {},
      fill: () => {},
      arc: () => {},
      measureText: () => ({ width: 0 }),
      fillText: () => {},
      scale: () => {}
    };
  }
  appendChild(child) {
    this.children.push(child);
    return child;
  }
  querySelector(sel) {
    return new MockElement('div');
  }
  querySelectorAll(sel) {
    return [new MockElement('div')];
  }
  addEventListener() {}
  setAttribute(k, v) { this.attributes[k] = v; }
  getAttribute(k) { return this.attributes[k] || ''; }
  classList = {
    add: () => {},
    remove: () => {},
    contains: () => false
  };
}

globalThis.document = {
  readyState: 'complete',
  documentElement: new MockElement('html'),
  getElementById(id) {
    return new MockElement('div');
  },
  createElement(tag) {
    return new MockElement(tag);
  },
  body: new MockElement('body'),
  addEventListener() {}
};

async function testRender() {
  try {
    const { renderOverviewView } = await import('../src/modules/overview/OverviewView.js');
    console.log('Testing renderOverviewView...');
    const overview = renderOverviewView(() => {});
    console.log('renderOverviewView SUCCESS, returned element');

    const { renderChapterView } = await import('../src/modules/chapter/ChapterView.js');
    console.log('Testing renderChapterView (axis-1-cap-3-clt)...');
    const chapter = renderChapterView('axis-1-cap-3-clt');
    console.log('renderChapterView SUCCESS, returned element');

    const { renderLabsCatalogView } = await import('../src/modules/labs/LabsCatalogView.js');
    console.log('Testing renderLabsCatalogView...');
    const labs = renderLabsCatalogView(null);
    console.log('renderLabsCatalogView SUCCESS');

    const { renderAxisDetailView } = await import('../src/modules/axis/AxisDetailView.js');
    console.log('Testing renderAxisDetailView...');
    const axis = renderAxisDetailView('axis-1-matematica-estatistica');
    console.log('renderAxisDetailView SUCCESS');

    const { renderHeader } = await import('../src/components/Header.js');
    console.log('Testing renderHeader...');
    const header = renderHeader();
    console.log('renderHeader SUCCESS');

    const { renderSidebar } = await import('../src/components/Sidebar.js');
    console.log('Testing renderSidebar...');
    const sidebar = renderSidebar('overview');
    console.log('renderSidebar SUCCESS');

    const { renderTrackingView } = await import('../src/modules/tracking/TrackingView.js');
    console.log('Testing renderTrackingView...');
    const tracking = renderTrackingView();
    console.log('renderTrackingView SUCCESS');

    console.log('ALL RENDER TESTS PASSED!');
  } catch (err) {
    console.error('RENDER ERROR:', err);
    process.exit(1);
  }
}

testRender();
