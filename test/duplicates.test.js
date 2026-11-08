const { test } = require('node:test');
const assert = require('node:assert');

const { isDuplicate } = require('../tools/duplicates');

test('returns true for pages with the same title', () => {
  assert.strictEqual(
    isDuplicate({ title: 'Home' }, { title: 'Home' }),
    true
  );
});

test('returns false for pages with different titles', () => {
  assert.strictEqual(
    isDuplicate({ title: 'Home' }, { title: 'About' }),
    false
  );
});

test('returns false if either page is missing', () => {
  assert.strictEqual(isDuplicate(null, { title: 'Home' }), false);
  assert.strictEqual(isDuplicate({ title: 'Home' }, null), false);
});
