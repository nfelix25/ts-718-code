## Context

The curriculum currently uses four required files per packet. Its three
type-level tiers leave the type expression fixed and ask the learner to report
the result expected by `Equal`; the runtime tier anchors behavior separately.
The proposed supplement reverses that interaction: the public generic
signature and expected behaviors are fixed, while the learner constructs the
type-level implementation.

These supplements are personal, IDE-first practice material. Existing scripts
discover and operate on the four core files only, while the root TypeScript
configuration already includes every `.ts` file beneath `src/`. The repository
typecheck already reports intended failures for unsolved koans, so additional
inline failures do not require a new build contract.

## Goals / Non-Goals

**Goals:**

- Add demanding construction practice that is traceable to each source
  packet's complete teaching surface.
- Make every learner implementation hole fail visibly against a discriminating
  inline assertion battery.
- Preserve the established four-file packet and all existing learner and
  author workflows.
- Scale each supplement according to the concept and omit it when construction
  would be artificial.
- Keep each file understandable and usable directly from a TypeScript-aware
  editor.

**Non-Goals:**

- Making `.builds.ts` a required companion or a new curriculum tier tracked by
  packet completeness.
- Adding commands, diagnostic inventories, runtime tests, solution keys,
  templates, syllabus entries, or quality-gate records for supplements.
- Changing the packet's four existing files or the shared assertion toolkit.
- Forcing compiler, configuration, library-availability, or native-toolchain
  topics into type constructions that do not express their real lesson.
- Making the intentionally unsolved root typecheck return successfully.

## Decisions

### 1. Keep supplements outside the packet model

An eligible supplement is named `k-NNN-topic.builds.ts` and placed beside the
packet's four core files. Packet discovery, focused typechecking, progress,
syllabus validation, runtime testing, and author diagnostic inventory continue
to enumerate only the core files.

This is preferred over integrating a fifth packet member because the learner
wants local editor feedback, not another completion or build gate. Existing
automation will change only if an unanticipated filename or configuration
interaction makes leaving it unchanged invalid.

### 2. Evaluate the curriculum one packet at a time

Authoring proceeds packet by packet. Each packet is first classified as:

- **constructible**: its material can be expressed as reusable type-level
  transformations, queries, parsers, relations, or algorithms; or
- **skipped**: its substance is compiler configuration, diagnostics, host
  availability, native architecture, or other behavior that a learner cannot
  meaningfully construct as a type.

Phase membership alone does not decide eligibility. A late-phase packet may
still be constructible, and an earlier packet may be skipped if construction
would only produce filler. Skip rationales are recorded in the change's task
history rather than in learner-facing repository documentation.

### 3. Derive coverage from all four source files

Before authoring, inventory:

- every concept introduced by the narrative Parts;
- every variation dimension exercised by drill groups;
- every gotcha, failure mode, and qualification in the edge file;
- runtime semantics that materially constrain the corresponding type; and
- natural variations the packet introduces without fully enumerating.

Each inventory item maps to at least one construction or assertion. This is
exhaustive coverage of the packet's material, not a requirement to repeat every
existing assertion. Constructions that differ only in names or example values
are collapsed. A typical supplement may contain 15–30 constructions, but
material coverage and distinct learning value control the actual size.

### 4. Give each construction one implementation hole

A construction is a named, reusable type-level operator with:

- a fully supplied exported name, generic parameter list, constraints,
  defaults, and arity;
- an imperative specification and, when useful, an input/output example;
- a technique hint only when that technique is new;
- any required given helper types implemented immediately above it; and
- exactly one learner-controlled right-hand side.

The learner form is:

```ts
export type Construction<Parameters> = TODO; // TODO(koan)
```

Helpers are never holed. No construction has an intended answer of `any`
because `TODO` itself is `any`; material involving `any` instead constructs a
classification or enclosing result that remains distinguishable.

### 5. Treat inline `Equal` assertions as the exercise specification

Every construction receives a numbered battery of two to five
`Expect<Equal<...>>` assertions selected from the axes the construction
actually varies on: canonical behavior, degenerate input, union distribution,
modifier fidelity, recursion depth, and higher arity.

All ordinary checks are `Equal`-based so that the `TODO = any` sentinel cannot
pass through assignability. Negative compiler obligations use
`@ts-expect-error` only when the obligation cannot be represented as an equal
result; the expected unused-directive diagnostic in the unsolved state is
explained next to the probe. Such a diagnostic is an intentional exception to
the normal assertion-line failure shape.

A finite battery cannot prevent a deliberately hardcoded lookup over every
listed input. Its quality threshold is instead to reject obvious constant,
single-example, shallow, non-distributive, modifier-dropping, and
single-member implementations.

### 6. Use one stable file layout

Every supplement contains, in order:

1. `import type { Equal, Expect, TODO } from "../../utils/type-utils.js";`
2. a header identifying the packet and explaining the construction exercise;
3. numbered constructions grouped under descriptive section headers; and
4. each construction's assertions immediately after that construction, named
   with the construction's zero-padded number plus a letter.

Construction-local assertions keep the specification and its feedback together
while the learner works down the file. Supplements `k-001` through `k-009` were
completed before this layout refinement and retain their original
construction-first, assertion-second organization; supplements from `k-010`
onward use the construction-local layout.

The shared primitives are the only assertion API. The file has no runtime
imports, runtime exports, `@koan-error` inventory markers, or separate solution
artifact.

### 7. Author solved-first, with editor diagnostics as sufficient verification

The author first writes real implementations, then checks through the
TypeScript language service that the file has no diagnostics and audits the
assertion matrix by hand. The author then replaces every construction
right-hand side with `TODO`, confirms that diagnostics appear only at the
intended assertions or documented negative probes, and reports the construction
count and source-to-construction coverage map.

No persistent script or external validation artifact is required. A temporary
isolated compiler invocation may be used when useful, but the repository does
not depend on it and the editor's TypeScript diagnostics are sufficient for the
intended workflow.

## Risks / Trade-offs

- [Risk] An underspecified assertion battery can accept a subtly wrong
  implementation. → Mitigation: solved-first authoring, explicit variation
  axes, degenerate cases, and a manual coverage audit.
- [Risk] A large number of supplements can increase root diagnostic volume and
  editor work. → Mitigation: keep them outside focused tooling and add only
  distinct constructions with genuine learning value.
- [Risk] Optional supplements can have uneven curriculum coverage. →
  Mitigation: evaluate every packet explicitly and record skip rationales in
  the change tasks.
- [Risk] `TODO = any` can silently satisfy assignability checks or intended
  `any` results. → Mitigation: require `Equal` and classification-based
  exercises, and forbid intended `any` construction results.
- [Trade-off] No automated inventory tracks supplement completeness or
  diagnostics. → Accepted because these files are personal IDE exercises and
  should not alter the stable repository workflow.

## Migration Plan

1. Review packets in curriculum order and classify each as constructible or
   skipped.
2. For each constructible packet, author and audit its solved supplement, then
   convert it to the learner form.
3. Leave all packet automation and existing source files unchanged.
4. If a supplement unexpectedly breaks an existing structural or runtime gate,
   make only the smallest compatibility change required; otherwise no build
   migration occurs.

Each supplement is independent and can be removed without affecting its core
packet, so rollback is file-level.

## Open Questions

None.
