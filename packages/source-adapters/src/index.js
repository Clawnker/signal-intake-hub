export function parseSource(urlOrText = '') {
  const s = String(urlOrText);
  return {
    raw: s,
    isUrl: /^https?:\/\//i.test(s),
  };
}
