## Why

Experienced TypeScript developers need a learning resource that builds durable type-system intuition through sustained practice rather than shallow feature coverage. This repository will provide a self-contained, test-driven curriculum with enough guided examples, drills, and deliberate edge cases to make intermediate and advanced patterns automatic on the current native TypeScript toolchain.

## What Changes

- Create a pnpm-managed, ESM TypeScript 7 project using the native compiler, strict checking, Vitest, and tsx.
- Add a dual-verification koan workflow where runtime tests always pass while plain `Expect<Equal<...>>` assertions remain unsolved until the learner replaces `TODO` or stand-in `any` types.
- Add 229 numbered lesson packets across 12 progressive phases, from type relations and generic inference through narrowing, mapped and conditional types, template literals, tuples, recursion, type-level programming, advanced API patterns, TypeScript 5.x and 6.x features, and the TypeScript 7 native transition.
- Give every type-system lesson a narrative core, a large guided-drill companion, a deliberate edge-case companion, and paired runtime tests.
- Add focused lesson commands and authoring verification so an individual packet can be checked without losing the required repository-wide `pnpm test` and `pnpm typecheck` workflows.
- Maintain `SYLLABUS.md` as the ordered curriculum index and progress map.

## Capabilities

### New Capabilities
- `typescript-koan-curriculum`: Defines the project toolchain, lesson-packet contract, dual-verification behavior, curriculum scope and ordering, exercise depth, focused workflow, and authoring validation requirements.

### Modified Capabilities

None.

## Impact

- Adds the repository's package manifest, lockfile, TypeScript and Vitest configuration, shared type utilities, authoring scripts, smoke test, syllabus, and lesson sources under `src/koans/`.
- Introduces development dependencies on pnpm, native TypeScript 7, the TypeScript 6 compatibility package, Vitest, tsx, and Node type declarations.
- Produces a deliberately large source corpus, so full-suite runtime and type-check performance must be monitored at phase boundaries.
- Does not expose a production API or alter an existing application; this repository is the learning product.
