var test = require('tape');

var TESTuber = require('../index.js');

test('TESTuber is a function', function (assert) {
    assert.strictEqual(typeof TESTuber, 'function');
    assert.end();
});
