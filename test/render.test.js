
const { test } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { spawnSync } = require('child_process');

const { renderPage, main } = require('../tools/build');

test('a heading becomes an h1', () => {
  assert.match(renderPage('# Hello', 'x'), /<h1>Hello<\/h1>/);
});

test('the title is the one we pass in', () => {
  assert.match(renderPage('text', 'notes'), /<title>notes<\/title>/);
});

test('missing arguments give the usage exit code', () => {
  assert.strictEqual(main([]), 2);
});

test('main writes the page it was asked for', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'render-'));
  const src = path.join(dir, 'hello.md');
  const dest = path.join(dir, 'out', 'hello.html');

  fs.writeFileSync(src, '# Hi');

  assert.strictEqual(main([src, dest]), 0);

  const html = fs.readFileSync(dest, 'utf8');
  assert.match(html, /<title>hello<\/title>/);
  assert.match(html, /<h1>Hi<\/h1>/);
});

test('CLI executes build.js directly', () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'build-cli-'));
  const source = path.join(dir, 'input.md');
  const dest = path.join(dir, 'output.html');

  fs.writeFileSync(source, '# CLI Test');

  const result = spawnSync(
    process.execPath,
    ['tools/build.js', source, dest],
    { encoding: 'utf8' }
  );

  assert.strictEqual(result.status, 0);
  assert.ok(fs.existsSync(dest));
});
