import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { test } from 'node:test';

const root = new URL('../', import.meta.url);
const provenance = JSON.parse(readFileSync(new URL('docs/SCREENSHOTS.json', root), 'utf8'));

test('three genuine simulator captures have synthetic-only provenance and exact hashes', () => {
  assert.equal(provenance.capture_kind, 'native-ios-simulator');
  assert.equal(provenance.data_classification, 'synthetic-only');
  assert.deepEqual(provenance.files.map(row => row.screen), ['GoalsListScreen', 'QuickLogScreen', 'HomeScreen']);
  for (const row of provenance.files) {
    const data = readFileSync(new URL(row.file, root));
    assert.equal(createHash('sha256').update(data).digest('hex'), row.sha256);
    assert.equal(data.readUInt32BE(16), row.width);
    assert.equal(data.readUInt32BE(20), row.height);
  }
});

test('README embeds every capture and preserves simulator, synthetic and model limits', () => {
  const text = readFileSync(new URL('README.md', root), 'utf8');
  for (const row of provenance.files) assert.ok(text.includes(`src="${row.file}"`));
  assert.ok(text.includes('iOS-Simulator'));
  assert.ok(text.includes('synthetischen Zielen'));
  assert.ok(text.includes('kein Nachweis eines signierten App-Builds'));
  assert.ok(text.includes('Apple Intelligence / Gemini Nano wurden nicht ausgeführt'));
});
