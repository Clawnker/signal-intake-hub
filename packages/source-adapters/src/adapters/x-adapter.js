/**
 * x-adapter.js — Extract structured metadata from X (Twitter) URLs.
 *
 * Handles:
 *   - x.com/user/status/123
 *   - twitter.com/user/status/123
 *   - Quote tweets, threads (partial)
 *
 * Returns normalized intake metadata without requiring API keys.
 * For full content extraction, pair with a fetch/scrape layer.
 */

const X_PATTERN = /(?:x\.com|twitter\.com)\/(\w+)\/status\/(\d+)/i;
const X_PROFILE_PATTERN = /(?:x\.com|twitter\.com)\/(\w+)\/?$/i;

/**
 * Check if a URL is an X/Twitter URL.
 * @param {string} url
 * @returns {boolean}
 */
export function isXUrl(url = '') {
  return /(?:x\.com|twitter\.com)\//i.test(url);
}

/**
 * Extract metadata from an X URL.
 * @param {string} url
 * @returns {object} { platform, author, postId, type, url }
 */
export function parseXUrl(url = '') {
  const statusMatch = url.match(X_PATTERN);
  if (statusMatch) {
    return {
      platform: 'x',
      author: statusMatch[1],
      postId: statusMatch[2],
      type: 'post',
      url: url,
    };
  }

  const profileMatch = url.match(X_PROFILE_PATTERN);
  if (profileMatch) {
    return {
      platform: 'x',
      author: profileMatch[1],
      postId: null,
      type: 'profile',
      url: url,
    };
  }

  return {
    platform: 'x',
    author: null,
    postId: null,
    type: 'unknown',
    url: url,
  };
}

/**
 * Build a normalized intake item from an X URL.
 * @param {string} url
 * @param {object} [options] - { capturedBy, tags }
 * @returns {object} Intake-ready item
 */
export function buildXIntake(url, options = {}) {
  const parsed = parseXUrl(url);
  return {
    sourceType: 'x',
    sourceUrl: url,
    metadata: parsed,
    tags: options.tags || [],
    capturedBy: options.capturedBy || 'unknown',
    capturedAt: new Date().toISOString(),
  };
}
