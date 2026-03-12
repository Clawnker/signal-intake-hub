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
