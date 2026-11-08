const { test } = require('node:test');
const assert = require('node:assert');
const { isDuplicate } = require('../tools/duplicates');

test('returns true for pages with identical titles', () => {
  assert.strictEqual(isDuplicate({ title: 'Home' }, { title: 'Home' }), true);
});

test('returns false for pages with different titles', () => {
  assert.strictEqual(isDuplicate({ title: 'Home' }, { title: 'About' }), false);
});
