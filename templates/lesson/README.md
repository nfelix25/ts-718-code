# Lesson Packet Template

Copy the four templates into the appropriate phase directory and replace `k-NNN-topic` with the assigned stem.

## Authoring Contract

1. Explain why the concept exists and give a read-it-aloud mental model before the first exercise.
2. Keep runtime behavior complete. Learners edit only types or explicitly marked stand-in annotations.
3. Mark every learner hole with `TODO(koan)` and every expected unsolved diagnostic line with `@koan-error`.
4. Use only the shared `TODO`, `Expect`, and `Equal` assertion primitives. Local type helpers are lesson material, not a second assertion API.
5. Give every drill group a distinct variation dimension. Do not meet density targets by renaming equivalent examples.
6. Explain pre-solved gotchas in prose. Isolate intentional negative diagnostics with `@ts-expect-error`.
7. Run `pnpm verify:koan -- <number>`, update `SYLLABUS.md`, and mark the packet's OpenSpec task immediately.

## Default Density

- Narrative: 4-8 Parts and 15-25 unsolved assertions.
- Drills: 60-120 unsolved assertions.
- Edges: 30-70 unsolved assertions and 10-25 pre-solved demonstrations.
- Runtime: 4-10 focused Vitest cases.

Compiler-history packets can replace artificial assertion volume with diagnostic or configuration matrices.
