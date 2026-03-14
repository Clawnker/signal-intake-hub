import test from 'node:test';
import assert from 'node:assert/strict';

import { parseGitHubUrl, parseSource } from './index.js';

test('parseGitHubUrl handles blob URLs on default branches', () => {
  const parsed = parseGitHubUrl('https://github.com/Clawnker/conveyor-core/blob/main/README.md');

  assert.equal(parsed.type, 'file');
  assert.equal(parsed.branch, 'main');
  assert.equal(parsed.path, 'README.md');
});

test('parseGitHubUrl keeps slash-delimited branch names intact for common source paths', () => {
  const parsed = parseGitHubUrl('https://github.com/Clawnker/conveyor-core/blob/feature/foo/src/index.js');

  assert.equal(parsed.type, 'file');
  assert.equal(parsed.branch, 'feature/foo');
  assert.equal(parsed.ref, 'feature/foo');
  assert.equal(parsed.path, 'src/index.js');
});

test('parseSource returns normalized GitHub intake metadata', () => {
  const intake = parseSource('https://github.com/Clawnker/conveyor-core/issues/2', {
    capturedBy: 'codex',
    tags: ['triage'],
  });

  assert.equal(intake.sourceType, 'github');
  assert.equal(intake.metadata.type, 'issue');
  assert.equal(intake.metadata.number, 2);
  assert.deepEqual(intake.tags, ['triage']);
  assert.equal(intake.capturedBy, 'codex');
});
