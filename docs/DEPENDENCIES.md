# External dependency mapping

`signal-intake-hub` is intentionally adapter-first and can delegate parsing/enrichment to external skills/tools.

## Source adapters -> expected dependency

### X (Twitter) sources
- Adapter key: `x`
- Expected dependency: external X parsing/research skill/tool
- Contract output:
  - canonical URL
  - author handle
  - post text/thread summary
  - timestamp

### YouTube sources
- Adapter key: `youtube`
- Expected dependency: external YouTube extraction/summary skill/tool
- Contract output:
  - canonical URL
  - title
  - channel
  - summary/key points

### GitHub sources
- Adapter key: `github`
- Expected dependency: GitHub skill/tooling (`gh` / API)
- Contract output:
  - repo owner/name
  - description/topics
  - activity snapshot (stars/forks/recent commits optional)

### Freeform ideas
- Adapter key: `idea`
- Expected dependency: none (local normalization)
- Contract output:
  - cleaned text
  - tags
  - intent summary

## Integration guidance
- Keep provider-specific API logic in `packages/source-adapters`.
- Keep `packages/intake-core` provider-agnostic.
- If a dependency is unavailable, adapter should return partial metadata + low confidence (not fail hard).
