export function buildThreadDraft({ item, analysis }) {
  return {
    threadTitle: `[${item.sourceType}] ${item.sourceUrl || item.rawText?.slice(0, 60) || 'signal'}`,
    body: [
      `Source: ${item.sourceUrl || 'text idea'}`,
      `Summary: ${analysis.executiveSummary}`,
      `Recommendation: ${analysis.recommendation}`,
      '',
      '## Opportunities',
      ...analysis.opportunities.map((o) => `- ${o}`),
      '',
      '## Risks',
      ...analysis.risks.map((r) => `- ${r}`),
    ].join('\n'),
  };
}
