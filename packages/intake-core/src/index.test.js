import assert from 'node:assert/strict';
import { detectSourceType, normalizeInput, buildAnalysisPacket } from './index.js';

assert.equal(detectSourceType({ sourceUrl: 'https://x.com/some/status/1' }), 'x');
assert.equal(detectSourceType({ sourceUrl: 'https://youtube.com/watch?v=abc' }), 'youtube');
assert.equal(detectSourceType({ sourceUrl: 'https://github.com/a/b' }), 'github');
assert.equal(detectSourceType({ rawText: 'idea only' }), 'idea');

const n = normalizeInput({ sourceUrl: 'https://github.com/a/b', capturedBy: 'tester' });
assert.equal(n.sourceType, 'github');
assert.equal(n.capturedBy, 'tester');

const p = buildAnalysisPacket(n);
assert.equal(typeof p.executiveSummary, 'string');
assert.ok(Array.isArray(p.opportunities));

console.log('intake-core:test ok');
