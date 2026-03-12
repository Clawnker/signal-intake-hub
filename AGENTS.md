# AGENTS.md — signal-intake-hub contributor contract

## Goal
Build a reusable, public signal-ingestion + analysis-to-thread framework.

## Rules
1. Keep providers pluggable (no hard lock to one API).
2. Keep scoring and routing deterministic where possible.
3. Separate ingestion, analysis, and delivery layers.
4. Never embed private keys, channel IDs, or org-specific secrets.
5. Document expected input/output schemas for every module.

## Verification before merge
- Build passes
- Tests pass
- README/docs reflect shipped behavior
