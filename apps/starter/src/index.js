import { normalizeInput, buildAnalysisPacket } from '@signal-intake/core';
import { buildThreadDraft } from '@signal-intake/discord-delivery';

const sample = normalizeInput({ sourceUrl: 'https://github.com/octocat/Hello-World', capturedBy: 'starter' });
const analysis = buildAnalysisPacket(sample);
const draft = buildThreadDraft({ item: sample, analysis });

console.log('starter sample thread title:', draft.threadTitle);
console.log('starter ready');
