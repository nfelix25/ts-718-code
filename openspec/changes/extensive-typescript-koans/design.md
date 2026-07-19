## Context

The repository is empty except for OpenSpec configuration. The product is a long-form, single-learner TypeScript curriculum, not an application or library. It must remain approachable one lesson at a time even though the completed corpus will contain hundreds of lesson files and tens of thousands of type assertions.

TypeScript 7.0 is the primary compiler. It is the native implementation and does not expose the legacy compiler API, so repository tooling must use the CLI rather than importing compiler internals. TypeScript 6 remains useful as a compatibility oracle for the transition lessons. Runtime code is executed by Vitest through Vite/esbuild and by tsx for repository scripts.

## Goals / Non-Goals

**Goals:**

- Build 229 ordered lesson packets across 12 phases, with each lesson teaching one focused concept and building on earlier vocabulary.
- Make the narrative tier self-contained and interactive before exposing the learner to high-volume repetition.
- Provide unusually deep drill and edge-case coverage without replacing the requested `Expect<Equal<...>>` mechanism.
- Keep all runtime tests green on a fresh clone while unsolved compile-time assertions fail predictably.
- Make one-lesson iteration ergonomic and make authoring mistakes distinguishable from intended koan failures.
- Keep the full runtime and type-check workflows acceptably fast as the corpus grows.

**Non-Goals:**

- Teaching beginner JavaScript or introductory TypeScript syntax.
- Building a browser UI, documentation site, published package, or production API.
- Replacing `Expect<Equal<...>>` with a third-party type-test framework.
- Reproducing every historical compiler version or guaranteeing identical diagnostic wording across versions.
- Making intentionally unsolved repository-wide typechecking return a successful exit code.

## Decisions

### 1. Use four files per lesson packet inside phase directories

Each packet uses a shared numbered stem:

```text
src/koans/01-type-relations-and-generics/
  k-001-structural-assignability.ts
  k-001-structural-assignability.drills.ts
  k-001-structural-assignability.edges.ts
  k-001-structural-assignability.test.ts
```

The main file contains the first-person narrative, guided Parts, runtime implementation, and initial type assertions. The drills file contains fast repetitions. The edges file contains stress cases and pre-solved explanations. The test file contains Vitest behavior anchors.

This is preferred over one monolithic file because the expected exercise volume would obscure the teaching path. It is preferred over one directory per lesson because 229 nested directories make sequential browsing cumbersome.

### 2. Use native TypeScript 7 as the source of truth

`typescript` supplies native `tsc`, and the required `typecheck` script is exactly `tsc --noEmit`. `@typescript/typescript6` supplies `tsc6` for targeted compatibility fixtures. Tooling will spawn CLIs with `--pretty false`; it will not import a compiler API.

The project uses ESM, pnpm, Node 24 LTS, strict checking, `target` and `lib` set to `ESNext`, and `moduleResolution` set to `bundler`. Strict-adjacent flags such as `noUncheckedIndexedAccess` and `exactOptionalPropertyTypes` are enabled deliberately and explained early.

### 3. Preserve the exact assertion toolkit and make holes fail honestly

The only shared assertion primitives are:

```ts
export type TODO = any;
export type Expect<T extends true> = T;
export type Equal<A, B> =
  (<T>() => T extends A ? 1 : 2) extends
  (<T>() => T extends B ? 1 : 2) ? true : false;
```

Learner assertions remain bare type aliases. Local helper types can be part of a lesson, but there is no alternate assertion API.

Because `TODO` is `any`, `Equal<TODO, any>` succeeds without being solved. A hole whose correct semantic result is `any` must therefore assert a classification such as `IsAny<Result> -> true` or `Classify<Result> -> "any"`. The same rule applies whenever stand-in `any` would poison a larger expression and hide the exercise.

### 4. Set a meaningful density target, not a line-count target

For type-system lessons, the default packet budget is:

- Narrative: 4-8 Parts, 15-25 unsolved assertions, and 4-10 runtime tests.
- Drills: 60-120 short unsolved assertions spanning varied inputs and contrasts.
- Edges: 30-70 unsolved assertions plus 10-25 pre-solved, commented demonstrations.

This gives roughly 105-215 learner exercises per type-heavy packet. Compiler-history, configuration, and native-architecture lessons use smaller assertion sets plus diagnostic matrices and fixtures where additional aliases would be artificial repetition. Every exercise must add a distinct input, contrast, inference site, composition, or failure mode.

### 5. Separate behavior anchors from learner failures

Runtime implementations and Vitest expectations are complete on a fresh clone. Learner holes appear only in types or stand-in annotations that do not change the tested runtime behavior. Runtime tests import the main lesson file; drill and edge files are type-only unless a sharp edge requires a small behavior demonstration.

Pre-solved negative compiler demonstrations can use `@ts-expect-error` with explanatory prose. Learner solve-it assertions do not use `@ts-expect-error` as a substitute for `Expect<Equal<...>>`.

### 6. Add focused, CLI-based learner and author workflows

The required scripts remain:

```text
pnpm test        -> vitest run
pnpm test:watch  -> vitest
pnpm typecheck   -> tsc --noEmit
```

Additional tsx scripts provide `pnpm koan -- k-042`, `pnpm typecheck:koan -- k-042`, and `pnpm progress`. Focused typechecking creates a temporary tsconfig outside the source tree that extends the root configuration and includes the selected packet.

An author verifier parses non-pretty CLI diagnostics and confirms that a new unsolved packet fails only at declared learner holes. It also confirms that the packet becomes clean when checked against an author-only solved fixture or mechanically substituted expected definitions. This verifier is repository tooling, not part of the learner assertion interface.

### 7. Treat versioned behavior according to its real ownership

Language semantics, compiler diagnostics, configuration behavior, and ECMAScript library declarations are labeled separately. For example, constrained `infer` is taught as a TypeScript 4.7-era conditional-type capability, while `RegExp.escape`, Temporal, Map upsert, and Set methods are taught as library surface changes. Versioned lessons use official TypeScript sources and current TS7 behavior.

Features unavailable in the Node host are tested through type declarations, feature-detected runtime assertions, or narrowly scoped polyfills/fixtures. The runtime suite must never fail merely because the host does not yet implement an `ESNext` API.

### 8. Keep a generated-looking but manually reviewed syllabus

`SYLLABUS.md` is the learner-facing index and contains every number, title, phase, prerequisites, mental model, major edge cases, and completion marker. It is updated with each packet rather than generated only after a phase. A validation script checks number continuity, unique stems, required companion files, and agreement between the filesystem and syllabus.

### 9. Preserve the approved curriculum manifest

The implementation source of truth is the following phase and number allocation:

- Phase 1, `k-001` through `k-022`: structural assignability; any/unknown/never; union/intersection algebra; literal widening/as const/satisfies; generic function inference; parameter-site inference; contextual/return inference; constraints; keyof; indexed access; related parameters; defaults; const parameters; NoInfer; generic classes; generic methods/this; multiple candidates; best common type; contextual/positional inference; higher-order inference; overloads/call signatures; partial inference/freshness/correlation capstone.
- Phase 2, `k-023` through `k-039`: typeof; instanceof; in; truthiness; equality/nullish; assignment/reachability; discriminated unions; exhaustiveness; user predicates; assertion functions; inferred predicates; built-in/array guards; aliased conditions; destructured discriminants; closures/callback invalidation; const assertions; generic narrowing and CFA capstone.
- Phase 3, `k-040` through `k-054`: mapped basics/PropertyKey; homomorphic mapping; modifiers; exact optionality; arrays/tuples; key remapping; never filtering; template keys; getter/event transforms; object unions; keyof unions/distributed mapping; string/number/symbol keys; indexed access plus mapping; conditional property transforms; schema-transformer capstone and gotchas.
- Phase 4, `k-055` through `k-073`: conditional basics; structural assignability; nested conditionals; deferred generics; distribution; preventing distribution; never; any; unknown; infer basics; function inference; multiple/nested infer; constrained infer; covariant candidates; contravariant candidates; overload inference; recursion; accumulator recursion/performance; filtering/dispatch capstone.
- Phase 5, `k-074` through `k-088`: template literal fundamentals; union products; intrinsic casing; pattern inference; prefix/suffix parsing; split; trim; replace; join; mapped template keys; event names; routes/path parameters; constrained literal parsing; query parser; recursive grammar capstone and gotchas.
- Phase 6, `k-089` through `k-103`: tuple identity/labels; readonly; optional; rest; spreads; head/tail; last/init; tuple-to-union; length/indexing; concat; zip; reverse; function argument tuples; label/optional/rest preservation; detection/empty/readonly/any adapter capstone.
- Phase 7, `k-104` through `k-117`: recursive aliases; JSON; trees; base cases/leaves; DeepPartial; DeepReadonly; DeepRequired; DeepMutable; collection-aware recursion; dot paths; value by path; unions; cycle guards; depth limits and path-lens capstone.
- Phase 8, `k-118` through `k-137`: Pick; Omit; Exclude/Extract; NonNullable; Partial/Required; Readonly/Record; ReturnType; Parameters; constructor utilities; Awaited; this utilities; compose/pipe; curry/partial; boolean logic; equality/comparison; addition; subtraction/comparison/ranges; string toolbelt; union algorithms; interpreter/state-machine capstone.
- Phase 9, `k-138` through `k-159`: branded; opaque; phantom; unique symbols; covariance; contravariance; invariance; variance annotations; bivariance; soundness holes; builders; polymorphic this/F-bounds; typestate; transition tables; event emitters; event transformations; fluent DSLs; XOR; exact/at-least-one objects; correlated unions; higher-kinded emulation; registry/workflow/middleware capstone.
- Phase 10, `k-160` through `k-208`: decorator model; class/method/field/accessor decorators; factories/composition; generic decorator typing; initializers; metadata; sync/async resource management; disposal stacks; getter/setter types; undefined returns; JSX ElementType; tuple labels; array-union methods; copying arrays; weak collection symbols; import attributes; resolution-mode; switch(true); boolean comparisons; Symbol.hasInstance; groupBy; closure narrowing; NoInfer; inferred predicates; indexed CFA; isolatedDeclarations; configDir; RegExp checks; JSDoc import; iterator helpers; strict iterator returns; side-effect imports; arbitrary module identifiers; truthy/nullish diagnostics; noCheck/build-through-errors; never-initialized variables; extension rewriting; generic typed arrays; NodeNext JSON; return-expression checks; require ESM; erasableSyntaxOnly; libReplacement; import defer; Node20/module configuration.
- Phase 11, `k-209` through `k-220`: strict family; strict-adjacent flags; modern defaults; this-less function context; stable type ordering; ES2025/RegExp.escape; Temporal; Map upsert; Set/Iterator/Promise ES2025 APIs; DOM iterable consolidation; module-resolution tightening; TS6 migration capstone.
- Phase 12, `k-221` through `k-229`: native architecture; compatibility contract; checker/builder parallelism; native watch; LSP/editor architecture; missing compiler API and TS6 side-by-side use; configuration hard removals; diagnostics/JS/JSDoc/emit differences; parity/performance capstone and TS7.1 horizon.

## Risks / Trade-offs

- [Risk] Tens of thousands of assertions make repository-wide diagnostic output overwhelming. -> Mitigation: focused lesson commands are the normal learner loop; the full command remains available as the completion gate.
- [Risk] Large recursive and union-heavy examples can make even native typechecking slow or trigger unintended depth errors. -> Mitigation: benchmark at every phase, isolate pathological fixtures, cap solved recursion depth, and keep intentional TS2589 cases pre-solved or fixture-based.
- [Risk] Exercise-count goals can produce repetitive filler. -> Mitigation: count only distinct semantic variations and review each drill matrix for a stated dimension of variation.
- [Risk] `TODO = any` can silently satisfy or poison assertions. -> Mitigation: author verification rejects silent holes and uses classification exercises when `any` is the intended result.
- [Risk] TypeScript and ECMAScript APIs continue to evolve. -> Mitigation: pin exact dependency versions in the lockfile, cite official release sources in versioned headers, and centralize version assumptions in the syllabus.
- [Risk] Vitest's transform may differ from native tsc for new syntax such as decorators and resource management. -> Mitigation: typecheck with native tsc, add smoke fixtures before each syntax family, and keep transform-dependent runtime examples narrow.
- [Trade-off] Four files per packet create roughly 900 lesson files. -> This is accepted because it keeps the narrative readable and makes high-volume drills and edges independently navigable.

## Migration Plan

1. Scaffold the toolchain, shared type utilities, smoke test, focused scripts, and empty syllabus; require clean runtime and type checks.
2. Implement one packet at a time in numerical order and update the syllabus immediately.
3. At each phase boundary, validate all runtime tests, expected diagnostics, syllabus/file agreement, and performance.
4. Do not begin a later phase until the preceding phase's packets are structurally complete and author-verified.

Rollback is file-level because the repository has no deployed system. A broken lesson can be removed from the active phase without changing earlier lesson contracts; dependency and lockfile changes should be reverted only with their associated phase.

## Open Questions

None. Exact patch versions and any narrowly required runtime polyfill will be selected and recorded during scaffold or the first lesson that needs it.
