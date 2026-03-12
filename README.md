# signal-intake-hub

Public framework for channel-driven research intake:
- ingest signals (X posts, YouTube links, GitHub repos, freeform ideas)
- normalize into intake items
- run analysis pipelines
- generate Discord threads with structured summaries

## Core flow
1. Intake source link/text
2. Parse + classify source type
3. Enrich metadata (author, timestamp, topic)
4. Analyze (risk, value, novelty, actionability)
5. Post thread + analysis packet in Discord

## Source types
- X posts / threads
- YouTube videos
- GitHub repos
- Freeform ideas

## Planned modules
- `packages/intake-core` — schema + routing + scoring
- `packages/source-adapters` — X/YouTube/GitHub parsers
- `packages/discord-delivery` — thread creation + update policy
- `apps/starter` — runnable reference bot

## Status
Initial public scaffold.
