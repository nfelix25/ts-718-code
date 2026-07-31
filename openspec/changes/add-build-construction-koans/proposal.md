## Why

The existing narrative, drill, and edge tiers ask learners to report types that
the compiler has already computed, but they do not provide a sustained way to
practice constructing reusable type-level operators from a behavioral
specification. Optional construction supplements will add that inversion as
IDE-first practice without disturbing the established packet workflow.

## What Changes

- Add optional `k-NNN-topic.builds.ts` supplements beside eligible lesson
  packets while retaining the existing four files as the complete required
  packet contract.
- Define a construction exercise as a supplied generic signature with one
  learner-controlled right-hand side and a fixed battery of shared
  `Expect<Equal<...>>` assertions.
- Require each supplement to re-express the source packet's narrative, drill
  dimensions, edge cases, and natural variations as distinct constructions,
  scaled to the material rather than to a fixed quota.
- Require solved-first authoring, discriminating inline assertions, explicit
  coverage reporting, and a final learner version whose construction
  right-hand sides use the shared `TODO` sentinel.
- Allow packets with no meaningful constructible type-level result to omit the
  supplement rather than receive artificial filler.
- Keep supplements independent of packet discovery, focused commands,
  diagnostic inventories, progress reporting, syllabus validation, runtime
  tests, and other repository automation. Learners use their editor's inline
  TypeScript feedback; no external validation workflow is added unless the
  existing project configuration would otherwise be broken.
- Leave the four existing packet files, scripts, documentation, quality-gate
  records, templates, and shared assertion primitives unchanged.

## Capabilities

### New Capabilities

- `type-construction-koans`: Defines eligibility, coverage, structure,
  assertion quality, learner-hole behavior, and IDE-first operation for
  optional `.builds.ts` construction supplements.

### Modified Capabilities

None.

## Impact

- Adds optional source files under existing phase directories in `src/koans/`
  for packets whose concepts support meaningful type construction.
- Adds intended learner diagnostics to the files included by the root
  TypeScript configuration, whose repository-wide typecheck already fails by
  design while koans are unsolved.
- Does not change package dependencies, runtime behavior, production APIs,
  packet completeness, or any existing learner and author commands.
