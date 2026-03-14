/**
 * youtube-adapter.js — Extract structured metadata from YouTube URLs.
 *
 * Handles:
 *   - youtube.com/watch?v=ID
 *   - youtu.be/ID
 *   - youtube.com/shorts/ID
 *   - youtube.com/playlist?list=ID
 *   - youtube.com/@channel
 *
 * Returns normalized intake metadata without requiring API keys.
 */

const YT_WATCH = /(?:youtube\.com\/watch\?.*v=)([\w-]{11})/i;
const YT_SHORT_URL = /youtu\.be\/([\w-]{11})/i;
const YT_SHORTS = /youtube\.com\/shorts\/([\w-]{11})/i;
const YT_PLAYLIST = /youtube\.com\/playlist\?.*list=([\w-]+)/i;
const YT_CHANNEL = /youtube\.com\/@([\w.-]+)/i;

/**
 * Check if a URL is a YouTube URL.
 * @param {string} url
 * @returns {boolean}
 */
export function isYouTubeUrl(url = '') {
  return /(?:youtube\.com|youtu\.be)\//i.test(url);
}

/**
 * Extract metadata from a YouTube URL.
 * @param {string} url
 * @returns {object} { platform, videoId, playlistId, channel, type, url }
 */
export function parseYouTubeUrl(url = '') {
  let match;

  match = url.match(YT_WATCH);
  if (match) {
    // Check for playlist param too
    const plMatch = url.match(/[?&]list=([\w-]+)/);
    return {
      platform: 'youtube',
      videoId: match[1],
      playlistId: plMatch ? plMatch[1] : null,
      channel: null,
      type: 'video',
      url,
    };
  }

  match = url.match(YT_SHORT_URL);
  if (match) return { platform: 'youtube', videoId: match[1], playlistId: null, channel: null, type: 'video', url };

  match = url.match(YT_SHORTS);
  if (match) return { platform: 'youtube', videoId: match[1], playlistId: null, channel: null, type: 'short', url };

  match = url.match(YT_PLAYLIST);
  if (match) return { platform: 'youtube', videoId: null, playlistId: match[1], channel: null, type: 'playlist', url };

  match = url.match(YT_CHANNEL);
  if (match) return { platform: 'youtube', videoId: null, playlistId: null, channel: match[1], type: 'channel', url };

  return { platform: 'youtube', videoId: null, playlistId: null, channel: null, type: 'unknown', url };
}

/**
 * Build a normalized intake item from a YouTube URL.
 * @param {string} url
 * @param {object} [options] - { capturedBy, tags }
 * @returns {object} Intake-ready item
 */
export function buildYouTubeIntake(url, options = {}) {
  const parsed = parseYouTubeUrl(url);
  return {
    sourceType: 'youtube',
    sourceUrl: url,
    metadata: parsed,
    tags: options.tags || [],
    capturedBy: options.capturedBy || 'unknown',
    capturedAt: new Date().toISOString(),
  };
}
