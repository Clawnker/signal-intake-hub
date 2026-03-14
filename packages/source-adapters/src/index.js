/**
 * source-adapters — Unified source detection and parsing.
 *
 * Re-exports individual adapters and provides a single `parseSource()`
 * entry point that auto-detects the platform and delegates.
 */

export { isXUrl, parseXUrl, buildXIntake } from './adapters/x-adapter.js';
export { isYouTubeUrl, parseYouTubeUrl, buildYouTubeIntake } from './adapters/youtube-adapter.js';
export { isGitHubUrl, parseGitHubUrl, buildGitHubIntake } from './adapters/github-adapter.js';

import { isXUrl, buildXIntake } from './adapters/x-adapter.js';
import { isYouTubeUrl, buildYouTubeIntake } from './adapters/youtube-adapter.js';
import { isGitHubUrl, buildGitHubIntake } from './adapters/github-adapter.js';

/**
 * Auto-detect source type and parse into a normalized intake item.
 * Falls back to 'idea' type for unrecognized URLs or plain text.
 *
 * @param {string} urlOrText - URL or freeform text
 * @param {object} [options] - { capturedBy, tags }
 * @returns {object} Normalized intake item
 */
export function parseSource(urlOrText = '', options = {}) {
  const s = String(urlOrText).trim();
  const isUrl = /^https?:\/\//i.test(s);

  if (isUrl) {
    if (isXUrl(s)) return buildXIntake(s, options);
    if (isYouTubeUrl(s)) return buildYouTubeIntake(s, options);
    if (isGitHubUrl(s)) return buildGitHubIntake(s, options);

    // Generic URL — no specific adapter
    return {
      sourceType: 'url',
      sourceUrl: s,
      metadata: { platform: 'web', url: s },
      tags: options.tags || [],
      capturedBy: options.capturedBy || 'unknown',
      capturedAt: new Date().toISOString(),
    };
  }

  // Plain text / idea
  return {
    sourceType: 'idea',
    sourceUrl: '',
    rawText: s,
    metadata: { platform: 'text' },
    tags: options.tags || [],
    capturedBy: options.capturedBy || 'unknown',
    capturedAt: new Date().toISOString(),
  };
}
