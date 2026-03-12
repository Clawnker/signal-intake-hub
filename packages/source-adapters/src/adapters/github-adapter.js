/**
 * github-adapter.js — Extract structured metadata from GitHub URLs.
 *
 * Handles:
 *   - github.com/owner/repo
 *   - github.com/owner/repo/issues/123
 *   - github.com/owner/repo/pull/456
 *   - github.com/owner/repo/blob/branch/path
 *   - github.com/owner/repo/releases
 *   - github.com/owner/repo/actions/runs/789
 *
 * Returns normalized intake metadata without requiring API keys.
 */

const GH_REPO = /github\.com\/([\w.-]+)\/([\w.-]+)\/?$/i;
const GH_ISSUE = /github\.com\/([\w.-]+)\/([\w.-]+)\/issues\/(\d+)/i;
const GH_PR = /github\.com\/([\w.-]+)\/([\w.-]+)\/pull\/(\d+)/i;
const GH_BLOB = /github\.com\/([\w.-]+)\/([\w.-]+)\/blob\/([\w.-]+)\/(.+)/i;
const GH_RELEASE = /github\.com\/([\w.-]+)\/([\w.-]+)\/releases/i;
const GH_ACTION = /github\.com\/([\w.-]+)\/([\w.-]+)\/actions\/runs\/(\d+)/i;

/**
 * Check if a URL is a GitHub URL.
 * @param {string} url
 * @returns {boolean}
 */
export function isGitHubUrl(url = '') {
  return /github\.com\//i.test(url);
}

/**
 * Extract metadata from a GitHub URL.
 * @param {string} url
 * @returns {object} { platform, owner, repo, type, number?, branch?, path?, runId?, url }
 */
export function parseGitHubUrl(url = '') {
  let match;

  match = url.match(GH_ISSUE);
  if (match) return { platform: 'github', owner: match[1], repo: match[2], type: 'issue', number: parseInt(match[3]), url };

  match = url.match(GH_PR);
  if (match) return { platform: 'github', owner: match[1], repo: match[2], type: 'pull_request', number: parseInt(match[3]), url };

  match = url.match(GH_ACTION);
  if (match) return { platform: 'github', owner: match[1], repo: match[2], type: 'action_run', runId: match[3], url };

  match = url.match(GH_BLOB);
  if (match) return { platform: 'github', owner: match[1], repo: match[2], type: 'file', branch: match[3], path: match[4], url };

  match = url.match(GH_RELEASE);
  if (match) return { platform: 'github', owner: match[1], repo: match[2], type: 'releases', url };

  match = url.match(GH_REPO);
  if (match) return { platform: 'github', owner: match[1], repo: match[2], type: 'repo', url };

  return { platform: 'github', owner: null, repo: null, type: 'unknown', url };
}

/**
 * Build a normalized intake item from a GitHub URL.
 * @param {string} url
 * @param {object} [options] - { capturedBy, tags }
 * @returns {object} Intake-ready item
 */
export function buildGitHubIntake(url, options = {}) {
  const parsed = parseGitHubUrl(url);
  return {
    sourceType: 'github',
    sourceUrl: url,
    metadata: parsed,
    tags: options.tags || [],
    capturedBy: options.capturedBy || 'unknown',
    capturedAt: new Date().toISOString(),
  };
}
