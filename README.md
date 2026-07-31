# Extensive TypeScript Koans

An intermediate-to-advanced TypeScript curriculum built as 229 ordered,
test-driven lesson packets. The repository targets TypeScript 7's native
compiler and includes TypeScript 6 as a compatibility reference.

The runtime suite is green on a fresh clone. Compile-time koans are deliberately
unsolved: each learner assertion fails until its `TODO` is replaced with the
actual type.

## Setup

Requirements:

- Node.js 24 or newer
- pnpm 10

```sh
pnpm install
pnpm test
pnpm progress
```

`pnpm test` should pass. `pnpm typecheck` should fail while koans remain
unsolved; those failures are the exercise mechanism.

## Learning Loop

Start with `k-001` and proceed numerically. The complete index and lesson
digests are in [SYLLABUS.md](./SYLLABUS.md).

```sh
# Show one packet and its current status.
pnpm koan -- k-001

# Run only that packet's TypeScript check.
pnpm typecheck:koan -- k-001

# Keep all runtime behavior anchors green.
pnpm test

# Inspect repository-wide progress.
pnpm progress
```

Solve assertions by replacing `TODO` in:

```ts
type _01 = Expect<Equal<Actual, TODO>>;
```

with the type you expect:

```ts
type _01 = Expect<Equal<Actual, Expected>>;
```

Do not change `TODO` in `src/utils/type-utils.ts`. It is the shared unsolved
sentinel.

## Packet Structure

Every lesson has four companion files:

```text
k-NNN-topic.ts          narrative koan and guided Parts
k-NNN-topic.drills.ts   high-volume repetitions
k-NNN-topic.edges.ts    gotchas, failure modes, and stress cases
k-NNN-topic.test.ts     runtime behavior anchors
```

The standard packet contains 20 narrative assertions, 60 drills, 30 edge
assertions, and 5 runtime tests. A few foundational packets are intentionally
denser. Across the repository there are 25,373 learner holes and 1,153 runtime
tests.

The assertion toolkit is intentionally small:

```ts
export type TODO = any;
export type Expect<T extends true> = T;
export type Equal<A, B> =
  (<T>() => T extends A ? 1 : 2) extends
  (<T>() => T extends B ? 1 : 2) ? true : false;
```

## Commands

| Command | Purpose |
| --- | --- |
| `pnpm test` | Run all runtime anchors once |
| `pnpm test:watch` | Run Vitest in watch mode |
| `pnpm typecheck` | Run the intentionally failing full native typecheck |
| `pnpm koan -- k-NNN` | Show one lesson packet |
| `pnpm typecheck:koan -- k-NNN` | Typecheck one learner packet |
| `pnpm progress` | Report solved, unsolved, incomplete, and planned lessons |
| `pnpm validate:syllabus` | Validate numbering and four-file packet structure |
| `pnpm verify:koan -- k-NNN` | Author gate: match runtime tests and intended diagnostics |
| `pnpm verify:solved-samples` | Author gate: mechanically solve one packet per phase |

`verify:koan` and `verify:solved-samples` are repository-authoring checks. The
normal learner loop uses `typecheck:koan`.

## Compiler Transition Fixtures

`typescript` supplies native TypeScript 7. `@typescript/typescript6` supplies
the `tsc6` executable and legacy compiler API for transition work.

The solved compatibility fixture can be checked with both lines:

```sh
node_modules/.bin/tsc6 -p fixtures/typescript-6-7/tsconfig.json
node_modules/.bin/tsc6 -p fixtures/typescript-6-7/tsconfig.json --stableTypeOrdering
node_modules/.bin/tsc -p fixtures/typescript-6-7/tsconfig.json
```

Versioned lesson headers cite their primary sources and distinguish TypeScript
language/compiler behavior from standard-library declarations and host runtime
support.

## Repository Gates

[QUALITY-GATES.md](./QUALITY-GATES.md) records runtime, structural, diagnostic,
and performance measurements after every phase. The root typecheck is expected
to return nonzero until the learner has solved every assertion; focused author
verification proves those diagnostics occur only at declared learner holes.
