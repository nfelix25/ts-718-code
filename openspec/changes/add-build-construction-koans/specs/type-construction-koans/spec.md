## ADDED Requirements

### Requirement: Optional construction supplement
An eligible lesson selected for construction practice SHALL receive a
`k-NNN-topic.builds.ts` file beside its four core packet files, and the presence
of that supplement SHALL NOT become part of packet completeness.

#### Scenario: Constructible packet
- **WHEN** a packet teaches material expressible as reusable type-level transformations, queries, parsers, relations, or algorithms
- **THEN** its supplement SHALL present that material as learner-implemented type constructions

#### Scenario: Non-constructible packet
- **WHEN** a packet's substance is compiler configuration, diagnostics, host availability, native architecture, or another behavior without a meaningful constructible type
- **THEN** the packet SHALL be skipped with a rationale instead of receiving filler exercises

#### Scenario: Core packet remains complete
- **WHEN** a packet has no `.builds.ts` supplement
- **THEN** its narrative, drills, edges, and runtime test files SHALL continue to constitute a complete packet

### Requirement: Exhaustive source-derived coverage
Each supplement SHALL re-express the distinct teaching material from all four
core packet files in construction form, including natural variations those
files introduce without fully enumerating.

#### Scenario: Coverage inventory
- **WHEN** a supplement is authored
- **THEN** its coverage inventory SHALL account for every narrative Part, drill-group variation dimension, edge-file gotcha or qualification, and materially relevant runtime semantic

#### Scenario: Distinct learning value
- **WHEN** two candidate constructions differ only by renaming or equivalent example values
- **THEN** they SHALL be represented by one construction rather than counted as separate exercises

#### Scenario: Material-driven size
- **WHEN** the source packet supports more or fewer constructions than the typical range
- **THEN** the supplement SHALL scale to the packet's distinct material instead of meeting a fixed exercise quota

### Requirement: Stable supplement layout
Every supplement SHALL use the shared assertion primitives and a consistent
numbered organization. Supplements from `k-010` onward SHALL keep each
construction adjacent to its assertion battery; the already completed
`k-001` through `k-009` supplements MAY retain their original
construction-first, assertion-second organization.

#### Scenario: File opening
- **WHEN** a learner opens a supplement
- **THEN** its first statement SHALL be `import type { Equal, Expect, TODO } from "../../utils/type-utils.js";`

#### Scenario: Header and instructions
- **WHEN** the import is followed
- **THEN** the file SHALL identify the packet and title, explain what its constructions have in common and how they relate to the narrative, and instruct the learner to replace each `TODO` with a satisfying type

#### Scenario: Ordered content
- **WHEN** a supplement from `k-010` onward contains multiple conceptual clusters
- **THEN** numbered constructions SHALL appear from easier to harder under descriptive group headers, with each construction's assertions immediately following it

#### Scenario: Earlier completed supplements
- **WHEN** a supplement is one of the already completed `k-001` through `k-009` files
- **THEN** it MAY retain assertions in a separate final section ordered by construction number

#### Scenario: Assertion names
- **WHEN** an assertion grades a numbered construction
- **THEN** its alias SHALL use an underscore, the zero-padded construction number, and a letter such as `_07a`

### Requirement: Single implementation hole per construction
Each construction SHALL expose a fully supplied generic interface and exactly
one learner-controlled right-hand side.

#### Scenario: Supplied scaffolding
- **WHEN** a construction takes generic inputs
- **THEN** its exported name, parameter names, constraints, defaults, and arity SHALL be supplied while its right-hand side SHALL be `TODO` followed by `// TODO(koan)`

#### Scenario: Given machinery
- **WHEN** a construction requires helper types
- **THEN** the helpers SHALL be fully implemented immediately above the construction and described as given machinery

#### Scenario: Unambiguous prompt
- **WHEN** prose alone does not precisely communicate the required behavior
- **THEN** the construction SHALL include an input-to-output example and SHALL include a hint only when it introduces a genuinely new technique

#### Scenario: Any-related material
- **WHEN** packet material requires reasoning about `any`
- **THEN** the construction SHALL produce a distinguishable classification or enclosing result and SHALL NOT have `any` as its intended answer

### Requirement: Discriminating Equal assertion battery
Every construction SHALL have two to five inline assertions that use the shared
`Expect<Equal<...>>` API and discriminate across the behavioral axes relevant
to that construction.

#### Scenario: Baseline and boundary behavior
- **WHEN** a construction is graded
- **THEN** its assertions SHALL include a canonical positive case and at least one applicable degenerate input such as `{}`, `never`, `unknown`, an empty tuple, a single-key object, an absent optional property, or an empty union

#### Scenario: Observable distribution
- **WHEN** union distribution or its prevention is observable
- **THEN** the assertion battery SHALL include a union input that distinguishes the intended behavior

#### Scenario: Modifier transformation
- **WHEN** a construction touches `readonly` or optional modifiers
- **THEN** the assertion battery SHALL pin down modifier preservation, addition, or removal explicitly

#### Scenario: Recursive construction
- **WHEN** a construction is recursive
- **THEN** the assertion battery SHALL include a nested or deeper instantiation in addition to its base case

#### Scenario: Multiple generic inputs
- **WHEN** a construction takes multiple type parameters or operates on multiple union members
- **THEN** the assertion battery SHALL include a higher-arity case that rejects a single-member-only implementation

#### Scenario: No assignability-shaped substitutes
- **WHEN** an ordinary assertion grades a learner hole
- **THEN** it SHALL compare exact results through `Equal` and SHALL NOT rely on `extends`, `satisfies`, assignment, or call-site assignability as the assertion mechanism

### Requirement: Explicit negative obligations
Negative compiler obligations SHALL use `@ts-expect-error` only when their
behavior cannot be represented as an `Equal` result.

#### Scenario: Unsolved negative probe
- **WHEN** `TODO = any` causes a negative probe to accept an otherwise forbidden operation
- **THEN** the file SHALL explain that the unused `@ts-expect-error` directive is an expected unsolved diagnostic that disappears after the construction is correct

#### Scenario: Equal-expressible negative result
- **WHEN** forbidden behavior can instead be represented by a result such as `never` or a classification literal
- **THEN** the construction SHALL use an `Expect<Equal<...>>` assertion rather than a compiler-error probe

### Requirement: Solved-first authoring
Each supplement SHALL be authored with correct implementations before its
right-hand sides are converted to learner holes.

#### Scenario: Solved state
- **WHEN** all constructions contain their intended implementations
- **THEN** the TypeScript language service SHALL report no diagnostics in the supplement

#### Scenario: Learner state
- **WHEN** every construction right-hand side is replaced by `TODO`
- **THEN** each construction SHALL cause at least one intended inline assertion diagnostic, except that a documented negative probe can additionally cause an unused-directive diagnostic

#### Scenario: Manual audit
- **WHEN** the learner form is finalized
- **THEN** every construction SHALL have assertions, every assertion SHALL discriminate intended behavior, and applicable degenerate cases SHALL be re-derived rather than inferred solely from a clean solved state

#### Scenario: Completion report
- **WHEN** a supplement is delivered
- **THEN** the author SHALL report its construction count, its source-to-construction coverage map, and confirmation that the solved state was diagnostic-free

### Requirement: IDE-first operation
Each supplement SHALL provide its complete learner feedback inline and SHALL
remain independent of repository packet automation.

#### Scenario: Learner feedback
- **WHEN** a learner edits a construction in a TypeScript-aware IDE
- **THEN** the file's own assertions SHALL provide the success and failure feedback needed to work the exercise

#### Scenario: Existing commands
- **WHEN** packet discovery, focused typechecking, progress reporting, syllabus validation, runtime testing, or author diagnostic inventory runs
- **THEN** the supplement SHALL remain outside those workflows unless exclusion would break the existing repository configuration

#### Scenario: Root project inclusion
- **WHEN** the root TypeScript configuration includes a supplement through its existing `src/**/*.ts` pattern
- **THEN** intended unsolved diagnostics SHALL be accepted as part of the repository's already-failing learner typecheck contract

#### Scenario: No supplemental infrastructure
- **WHEN** supplements are added without breaking existing configuration
- **THEN** no script, command, runtime test, template, syllabus entry, quality-gate record, solution file, or external validation artifact SHALL be added for them

### Requirement: Existing material remains untouched
Construction supplements SHALL be additive and SHALL use the existing shared
assertion toolkit without altering established curriculum material.

#### Scenario: Adding a supplement
- **WHEN** a `.builds.ts` file is authored for a packet
- **THEN** the packet's narrative, drills, edges, and runtime test files and the shared `TODO`, `Expect`, and `Equal` definitions SHALL remain unchanged

#### Scenario: Diagnostic inventory isolation
- **WHEN** learner holes are marked in a supplement
- **THEN** they SHALL use `// TODO(koan)` and SHALL NOT add `@koan-error` markers

#### Scenario: Module syntax
- **WHEN** a supplement imports the shared primitives
- **THEN** it SHALL use a type-only import compatible with `verbatimModuleSyntax`
