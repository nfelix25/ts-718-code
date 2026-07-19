## ADDED Requirements

### Requirement: Native TypeScript project scaffold
The repository SHALL be a pnpm-managed ESM project whose primary compiler is stable native TypeScript 7, with strict checking, no emit, ESNext target and library declarations, bundler module resolution, Vitest runtime testing, and tsx script execution.

#### Scenario: Fresh scaffold verification
- **WHEN** dependencies are installed before any unsolved lesson is added
- **THEN** `pnpm test` SHALL run `vitest run` successfully and `pnpm typecheck` SHALL run `tsc --noEmit` successfully

#### Scenario: TypeScript 6 compatibility access
- **WHEN** a transition lesson needs to compare TypeScript 6 and TypeScript 7 behavior
- **THEN** the repository SHALL provide the TypeScript 6 compatibility compiler without replacing native TypeScript 7 as the primary `tsc`

### Requirement: Exact shared assertion toolkit
The repository SHALL export `TODO = any`, `Expect<T extends true>`, and the strict conditional-function implementation of `Equal<A, B>` from `src/utils/type-utils.ts` without substituting a third-party type assertion library.

#### Scenario: Correct assertion
- **WHEN** `Expect<Equal<Actual, Expected>>` compares strictly equal types
- **THEN** the assertion SHALL compile silently

#### Scenario: Unsolved assertion
- **WHEN** a learner-facing type hole is still unsolved
- **THEN** at least one bare `Expect<Equal<...>>` assertion for that hole SHALL produce a type error

#### Scenario: Intended any result
- **WHEN** the correct semantic result of an exercise is `any`
- **THEN** the exercise SHALL use a classification or enclosing result that still fails while the `TODO = any` placeholder is unsolved

### Requirement: Numbered lesson packet organization
Each curriculum concept SHALL use a unique `k-NNN-kebab-topic` stem inside its phase directory under `src/koans/`, with a narrative `.ts` file, `.drills.ts`, `.edges.ts`, and `.test.ts` companion.

#### Scenario: Complete packet
- **WHEN** a lesson is declared complete by the author
- **THEN** all four companion files SHALL exist with the same number and topic stem

#### Scenario: Curriculum continuity
- **WHEN** all lesson stems are enumerated
- **THEN** their numbers SHALL be unique and continuous from `k-001` through `k-229`

### Requirement: Self-contained narrative tier
Every main lesson file SHALL explain the motivation, mental model, and read-it-aloud interpretation before presenting guided Parts that can be solved iteratively using concepts introduced in that lesson or earlier lessons.

#### Scenario: Beginning a lesson
- **WHEN** the learner opens a main lesson file without external course material
- **THEN** the file SHALL provide enough explanation and local examples to understand why the concept exists, how its syntax is interpreted, and when it is useful before the first unsolved assertion

#### Scenario: Guided progression
- **WHEN** the learner works through the Parts in order
- **THEN** each Part SHALL introduce one additional dimension or composition rather than requiring unexplained later material

### Requirement: High-volume guided drills
Each type-system lesson SHALL provide a substantial drill matrix that repeats the central pattern across distinct inputs, inference sites, transformations, and conceptual contrasts.

#### Scenario: Standard type-heavy lesson
- **WHEN** a concept supports type-level repetition
- **THEN** its narrative and drill tiers together SHALL normally contain at least 75 unsolved `Expect<Equal<...>>` exercises, with a target of 60 to 120 exercises in the drill file alone

#### Scenario: Drill variety
- **WHEN** drill exercises are reviewed
- **THEN** each group SHALL state or demonstrate a variation dimension such as literal versus widened input, union versus intersection, distributive versus non-distributive behavior, structural versus nominal identity, inference position, mutability, or top/bottom/escape type interaction

### Requirement: Deliberate edge-case tier
Each lesson SHALL include a stress section covering surprising, failing, or boundary behavior, mixing learner exercises with pre-solved demonstrations whose prose explains the surprise.

#### Scenario: Type-heavy edge coverage
- **WHEN** a type-system packet is complete
- **THEN** its edge file SHALL normally contain 30 to 70 unsolved assertions and 10 to 25 pre-solved explanatory demonstrations selected from relevant sharp edges

#### Scenario: Intentional compiler limit
- **WHEN** an example is intended to trigger a recursion-depth, complexity, or negative diagnostic limit
- **THEN** it SHALL be isolated or marked as a pre-solved expected diagnostic and SHALL NOT appear as an unexplained repository failure

### Requirement: Dual verification behavior
Every lesson SHALL pair always-green Vitest behavior anchors with compile-time assertions that remain failing until the learner solves its type holes.

#### Scenario: Fresh unsolved lesson
- **WHEN** the learner runs the runtime suite before solving a lesson
- **THEN** all runtime tests SHALL pass while focused typechecking SHALL fail only at that lesson's intended unsolved assertions

#### Scenario: Solved lesson
- **WHEN** all `TODO` and stand-in `any` holes in a lesson packet are replaced correctly
- **THEN** focused typechecking for that packet SHALL pass and its runtime tests SHALL remain unchanged and passing

### Requirement: Focused learner workflow
The repository SHALL supplement the required global scripts with commands for selecting one numbered packet and reporting curriculum progress.

#### Scenario: Focus one lesson
- **WHEN** the learner invokes the focused koan command with a valid lesson number or stem
- **THEN** the command SHALL run that packet's runtime test and native typecheck without reporting unrelated unsolved lessons

#### Scenario: Invalid lesson selection
- **WHEN** the learner supplies an unknown or ambiguous selector
- **THEN** the command SHALL fail with a concise message listing the expected selector format

#### Scenario: Progress report
- **WHEN** the learner invokes the progress command
- **THEN** the command SHALL report ordered packet status derived from remaining learner holes without editing source files

### Requirement: Authoring diagnostic verification
Repository tooling SHALL distinguish expected unsolved assertion diagnostics from syntax errors, configuration errors, unintended negative diagnostics, and broken runtime behavior.

#### Scenario: Valid newly authored packet
- **WHEN** an author verifies an unsolved packet
- **THEN** verification SHALL pass only if runtime tests are green and every emitted diagnostic corresponds to a declared learner hole or documented expected fixture

#### Scenario: Broken packet
- **WHEN** a packet emits a diagnostic outside its learner holes or expected fixtures
- **THEN** author verification SHALL fail and identify the unexpected file, position, and diagnostic code

### Requirement: Complete progressive curriculum
The curriculum SHALL contain 229 lessons in 12 ordered phases covering type relations and advanced generics, narrowing and control-flow analysis, mapped types, conditional types, template literal types, variadic tuples, recursive types, type-level programming, advanced API patterns, TypeScript 5.x features, TypeScript 6 transition behavior, and the TypeScript 7 native compiler.

#### Scenario: Phase ranges
- **WHEN** the curriculum index is validated
- **THEN** the phase ranges SHALL be `001-022`, `023-039`, `040-054`, `055-073`, `074-088`, `089-103`, `104-117`, `118-137`, `138-159`, `160-208`, `209-220`, and `221-229` respectively

#### Scenario: Dependency order
- **WHEN** a later lesson uses a type-system construct as assumed vocabulary
- **THEN** the construct SHALL have been explained in an earlier lesson or explicitly reintroduced in the current narrative

#### Scenario: Version accuracy
- **WHEN** a lesson attributes behavior to a TypeScript or ECMAScript version
- **THEN** its header SHALL distinguish language semantics, compiler diagnostics, configuration behavior, and library declarations and SHALL be checked against an official primary source

### Requirement: Maintained syllabus index
`SYLLABUS.md` SHALL list every lesson in numerical order with its phase, title, learning objective, prerequisite concepts, principal drill dimensions, notable edge cases, and completion marker.

#### Scenario: Packet addition
- **WHEN** a lesson packet is added or renamed
- **THEN** the matching syllabus entry SHALL be added or updated in the same change

#### Scenario: Index validation
- **WHEN** syllabus validation runs
- **THEN** it SHALL fail on missing numbers, duplicate stems, missing companion files, or disagreement between lesson files and syllabus entries

### Requirement: Phase quality gates
Implementation SHALL proceed numerically and each phase SHALL pass runtime, structural, diagnostic, and performance checks before the next phase is considered complete.

#### Scenario: Lesson completion gate
- **WHEN** an author finishes one packet
- **THEN** its Vitest file SHALL pass and focused typechecking SHALL fail only for its intended unsolved assertions

#### Scenario: Phase completion gate
- **WHEN** the final packet of a phase is authored
- **THEN** the complete runtime suite, expected-diagnostic inventory, syllabus validation, and measured native typecheck SHALL be run and recorded

#### Scenario: Unsupported host API
- **WHEN** a versioned lesson covers an ESNext API absent from the supported Node runtime
- **THEN** runtime verification SHALL use feature detection, a narrow fixture, or a documented polyfill while compile-time verification exercises the intended library declarations
