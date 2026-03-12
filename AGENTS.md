# AGENTS.md — signal-intake-hub contributor contract

## Mission
Build a reusable public framework for ingesting external signals and producing actionable Discord analysis threads.

## Scope boundaries
- No private channel IDs, secrets, or org-only assumptions.
- Keep code generic and adapter-driven.
- Keep docs synchronized with what is actually implemented.

## Required workflow
1. Plan the change and identify module target.
2. Implement in the correct layer:
   - intake-core (normalization/analysis)
   - source-adapters (provider-specific parsing/enrichment)
   - discord-delivery (thread output contract)
   - starter (reference orchestration)
3. Run verification:
   - `npm run build`
   - `npm run test`
4. Commit with clear scope and update docs.

## Definition of done
- Build/test pass
- README + ROADMAP + skill docs match shipped behavior
- Output contains source traceability and explicit recommendation
