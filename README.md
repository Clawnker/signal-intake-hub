# signal-intake-hub

Public framework for channel-driven research intake:
- ingest signals (X posts, YouTube links, GitHub repos, freeform ideas)
- normalize into intake items
- run analysis pipelines
- generate Discord thread drafts with structured summaries

## Current status (accurate)
This repo is now a working **monorepo scaffold** with runnable starter wiring.

### Included now
- `packages/intake-core`
  - source type detection
  - input normalization
  - analysis packet generation
- `packages/source-adapters`
  - adapter stub for parsing source payloads
- `packages/discord-delivery`
  - Discord thread draft formatter (dry-run)
- `apps/starter`
  - sample pipeline execution in Node
- `docs/skills/signal-intake-discord-threading.md`
  - operator/agent skill guide
- `docs/ROADMAP.md`
  - phased implementation plan

## Monorepo layout
- `packages/intake-core`
- `packages/source-adapters`
- `packages/discord-delivery`
- `apps/starter`

## Quickstart
```bash
npm install
npm run build
npm run test
npm run -w @signal-intake/starter dev
```

## Principles
1. Separate ingestion, analysis, and delivery.
2. Keep provider adapters pluggable.
3. Preserve source traceability to posted thread.
4. Always include explicit recommendation + next action.
