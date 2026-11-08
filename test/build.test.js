// test/build.test.js — runs on Node's built-in test runner. No test framework.
// test/build.test.js — runs on Node's built-in test runner.
const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');

const getPages = () =>
  fs.readdirSync('out').filter((f) => f.endsWith('.html'));

test('every source produced a page', () => {
  const pages = getPages();
  const sources = fs.readdirSync('src').filter((f) => f.endsWith('.md'));

  assert.strictEqual(pages.length, sources.length);
});

test('every page is real HTML and not raw Markdown', () => {
  const pages = getPages();

  for (const p of pages) {
    const html = fs.readFileSync('out/' + p, 'utf8');

    assert.match(html, /^<!doctype html>/);
    assert.doesNotMatch(html, /^# /m);
  }
});

test('no page is empty', () => {
  const pages = getPages();

  for (const p of pages) {
    const size = fs.statSync('out/' + p).size;
    assert.ok(size > 0, p + ' is empty');
  }
});
