# Skill: signal-intake-discord-threading

Purpose: convert external signals into Discord analysis threads consistently.

## Use when
- You receive a link/idea in an intake channel and need structured analysis output.

## Input contract
- `sourceType`: `x|youtube|github|idea`
- `sourceUrl` or `rawText`
- optional context tags (theme, priority, requester)

## Required behavior
1. Normalize input into canonical intake item.
   - Normalize source URLs before analysis (including `x.com/i/status/<id>` variants).
2. Classify source + confidence.
3. Generate analysis packet:
   - summary
   - why it matters
   - opportunities
   - risks/unknowns
   - recommended next actions
4. Create Discord thread with:
   - title
   - source link(s)
   - analysis packet
   - decision prompt
5. Persist traceability: source -> thread id -> follow-up status.

## Anti-patterns
- dumping raw links without synthesis
- posting analysis without explicit next actions
- missing backlink to original source


## Example (X status deep link)
Input:
- `https://x.com/i/status/2031899292663771375`

Expected handling:
- classify as `sourceType: x`
- normalize/canonicalize URL
- generate analysis packet + Discord thread draft
- keep original URL in source metadata
