/**
 * github-adapter.js — Extract structured metadata from GitHub URLs.
 *
 * Handles:
 *   - github.com/owner/repo
 *   - github.com/owner/repo/issues/123
 *   - github.com/owner/repo/pull/456
 *   - github.com/owner/repo/blob/ref/path
 *   - github.com/owner/repo/releases
 *   - github.com/owner/repo/actions/runs/789
 *
 * Returns normalized intake metadata without requiring API keys.
 */

const GH_REPO = /github\.com\/([\w.-]+)\/([\w.-]+)\/?$/i;
const GH_ISSUE = /github\.com\/([\w.-]+)\/([\w.-]+)\/issues\/(\d+)/i;
const GH_PR = /github\.com\/([\w.-]+)\/([\w.-]+)\/pull\/(\d+)/i;
const GH_BLOB = /github\.com\/([\w.-]+)\/([\w.-]+)\/blob\/([^?#]+)/i;
const GH_RELEASE = /github\.com\/([\w.-]+)\/([\w.-]+)\/releases/i;
const GH_ACTION = /github\.com\/([\w.-]+)\/([\w.-]+)\/actions\/runs\/(\d+)/i;

const COMMON_PATH_ROOTS = new Set([
  '.github',
  'app',
  'apps',
  'assets',
  'bin',
  'cmd',
  'config',
  'configs',
  'docs',
  'examples',
  'lib',
  'packages',
  'public',
  'scripts',
  'src',
  'spec',
  'test',
  'tests',
]);

const COMMON_TOP_LEVEL_FILES = new Set([
  'CHANGELOG.md',
  'LICENSE',
  'LICENSE.md',
  'README',
  'README.md',
  'package-lock.json',
  'package.json',
  'pnpm-lock.yaml',
  'tsconfig.json',
  'yarn.lock',
]);

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
 *
 * Blob URLs use best-effort ref/path splitting so branch names with slashes
 * are preserved more often than a naive regex can manage.
 *
 * @param {string} url
 * @returns {object} { platform, owner, repo, type, number?, ref?, branch?, path?, runId?, url }
 */
export function parseGitHubUrl(url = '') {
  let match;

  match = url.match(GH_ISSUE);
  if (match) return { platform: 'github', owner: match[1], repo: match[2], type: 'issue', number: parseInt(match[3], 10), url };

  match = url.match(GH_PR);
  if (match) return { platform: 'github', owner: match[1], repo: match[2], type: 'pull_request', number: parseInt(match[3], 10), url };

  match = url.match(GH_ACTION);
  if (match) return { platform: 'github', owner: match[1], repo: match[2], type: 'action_run', runId: match[3], url };

  match = url.match(GH_BLOB);
  if (match) {
    const { ref, path } = splitBlobRefAndPath(match[3]);
    return { platform: 'github', owner: match[1], repo: match[2], type: 'file', ref, branch: ref, path, url };
  }

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

function splitBlobRefAndPath(refAndPath = '') {
  const segments = refAndPath.split('/').filter(Boolean);

  if (segments.length < 2) {
    return { ref: segments.join('/'), path: '' };
  }

  let best = {
    ref: segments[0],
    path: segments.slice(1).join('/'),
    score: Number.NEGATIVE_INFINITY,
  };

  for (let index = 1; index < segments.length; index++) {
    const refSegments = segments.slice(0, index);
    const pathSegments = segments.slice(index);
    if (pathSegments.length === 0) continue;

    const candidate = {
      ref: refSegments.join('/'),
      path: pathSegments.join('/'),
      score: scoreBlobPath(pathSegments),
    };

    if (candidate.score > best.score) {
      best = candidate;
    }
  }

  return { ref: best.ref, path: best.path };
}

function scoreBlobPath(pathSegments) {
  const first = pathSegments[0] || '';
  const last = pathSegments[pathSegments.length - 1] || '';

  let score = 0;

  if (COMMON_PATH_ROOTS.has(first)) score += 5;
  if (COMMON_TOP_LEVEL_FILES.has(first)) score += 4;
  if (looksFileLike(last)) score += 3;
  if (pathSegments.length > 1) score += 1;
  if (pathSegments.some((segment) => COMMON_PATH_ROOTS.has(segment))) score += 1;
  if (pathSegments.some((segment) => COMMON_TOP_LEVEL_FILES.has(segment))) score += 1;

  return score;
}

function looksFileLike(segment) {
  return COMMON_TOP_LEVEL_FILES.has(segment) || /\.[a-z0-9]{1,8}$/i.test(segment);
}
