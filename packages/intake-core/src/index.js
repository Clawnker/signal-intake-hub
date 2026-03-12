export function detectSourceType(input = {}) {
  const url = (input.sourceUrl || '').toLowerCase();
  if (url.includes('x.com/') || url.includes('twitter.com/')) return 'x';
  if (url.includes('youtube.com/') || url.includes('youtu.be/')) return 'youtube';
  if (url.includes('github.com/')) return 'github';
  return 'idea';
}

export function normalizeInput(input = {}) {
  const sourceType = input.sourceType || detectSourceType(input);
  const now = new Date().toISOString();
  return {
    id: input.id || `sig_${Math.random().toString(36).slice(2, 10)}`,
    sourceType,
    sourceUrl: input.sourceUrl || '',
    rawText: input.rawText || '',
    tags: Array.isArray(input.tags) ? input.tags : [],
    capturedAt: input.capturedAt || now,
    capturedBy: input.capturedBy || 'unknown',
    metadata: input.metadata || {},
  };
}

export function buildAnalysisPacket(item) {
  const title = item.sourceUrl || item.rawText?.slice(0, 80) || 'signal';
  return {
    executiveSummary: `Signal detected from ${item.sourceType}: ${title}`,
    strategicFit: 'Potentially relevant; requires human decision on priority.',
    opportunities: ['Extract actionable tasks', 'Track as intake card', 'Compare with existing roadmap'],
    risks: ['Insufficient context', 'Potential duplication'],
    unknowns: ['Impact size', 'Execution cost'],
    recommendation: 'Open discussion thread and request triage decision.',
    confidence: 'medium',
  };
}
