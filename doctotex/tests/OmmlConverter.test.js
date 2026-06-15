const assert = require('node:assert');
const test = require('node:test');
const { parseMiniXML, loadSourceModule } = require('./test-helper.js');

// Load module
const OmmlConverter = loadSourceModule('OmmlConverter.js');

test('OmmlConverter.findChild - retrieves child by local tag name', () => {
    const xml = parseMiniXML('<parent><child w:val="1"/></parent>');
    const parentNode = xml.getElementsByTagName('parent')[0];
    const childNode = OmmlConverter.findChild(parentNode, 'child');
    
    assert.ok(childNode);
    assert.strictEqual(childNode.localName, 'child');
    assert.strictEqual(OmmlConverter.findChild(parentNode, 'nonexistent'), null);
});

test('OmmlConverter.findChildren - retrieves all children matching tag', () => {
    const xml = parseMiniXML('<parent><child val="1"/><child val="2"/><other/></parent>');
    const parentNode = xml.getElementsByTagName('parent')[0];
    const children = OmmlConverter.findChildren(parentNode, 'child');
    
    assert.strictEqual(children.length, 2);
    assert.strictEqual(children[0].getAttribute('val'), '1');
    assert.strictEqual(children[1].getAttribute('val'), '2');
});

test('OmmlConverter.getAttr - retrieves attributes correctly', () => {
    const xml = parseMiniXML('<node attr="val"/>');
    const node = xml.getElementsByTagName('node')[0];
    
    assert.strictEqual(OmmlConverter.getAttr(node, 'attr'), 'val');
    assert.strictEqual(OmmlConverter.getAttr(node, 'nonexistent'), null);
});

test('OmmlConverter.convert - converts text nodes', () => {
    const xml = parseMiniXML('<m:oMath><m:r><m:t>x±y≠z</m:t></m:r></m:oMath>');
    const root = xml.getElementsByTagName('oMath')[0];
    const result = OmmlConverter.convert(root);
    assert.strictEqual(result, 'x\\pm y\\neq z');
});

test('OmmlConverter.convert - converts fractions', () => {
    const xml = parseMiniXML('<m:f><m:num><m:r><m:t>1</m:t></m:r></m:num><m:den><m:r><m:t>2</m:t></m:r></m:den></m:f>');
    const root = xml.getElementsByTagName('f')[0];
    const result = OmmlConverter.convert(root);
    assert.strictEqual(result, '\\frac{1}{2}');
});

test('OmmlConverter.convert - converts subscripts & superscripts', () => {
    // Subscript
    const subXml = parseMiniXML('<m:sSub><m:e><m:r><m:t>x</m:t></m:r></m:e><m:sub><m:r><m:t>0</m:t></m:r></m:sub></m:sSub>');
    const subRoot = subXml.getElementsByTagName('sSub')[0];
    assert.strictEqual(OmmlConverter.convert(subRoot), 'x_{0}');

    // Superscript
    const supXml = parseMiniXML('<m:sSup><m:e><m:r><m:t>y</m:t></m:r></m:e><m:sup><m:r><m:t>2</m:t></m:r></m:sup></m:sSup>');
    const supRoot = supXml.getElementsByTagName('sSup')[0];
    assert.strictEqual(OmmlConverter.convert(supRoot), 'y^{2}');
});

test('OmmlConverter.convert - converts integrals and delimiters', () => {
    // Delimiters
    const delimXml = parseMiniXML('<m:d><m:e><m:r><m:t>k</m:t></m:r></m:e></m:d>');
    const delimRoot = delimXml.getElementsByTagName('d')[0];
    assert.strictEqual(OmmlConverter.convert(delimRoot), '\\left(k\\right)');

    // N-ary Integral
    const naryXml = parseMiniXML('<m:nary><m:naryPr><m:chr val="∫"/></m:naryPr><m:sub><m:r><m:t>a</m:t></m:r></m:sub><m:sup><m:r><m:t>b</m:t></m:r></m:sup><m:e><m:r><m:t>x</m:t></m:r></m:e></m:nary>');
    const naryRoot = naryXml.getElementsByTagName('nary')[0];
    assert.strictEqual(OmmlConverter.convert(naryRoot), '\\int_{a}^{b} {x}');
});
