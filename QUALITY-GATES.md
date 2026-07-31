# Phase Quality Gates

This file records the required phase-boundary runtime, structural, diagnostic,
and native-compiler measurements. Root `pnpm typecheck` is expected to exit with
learner diagnostics while packets are unsolved; the focused author inventory is
the authoritative check that every diagnostic corresponds to a declared hole.

## Phase 1 - Type Relations and Advanced Generics

Recorded: 2026-07-18

Environment:

- Node.js: `v24.11.1`
- pnpm: `10.19.0`
- TypeScript: `7.0.2`

Results:

| Gate | Command | Result |
| --- | --- | --- |
| Runtime | `pnpm test` | Passed: 23 files, 117 tests, 660 ms Vitest duration |
| Structure | `pnpm validate:syllabus` | Passed: 229 continuous entries, 22 authored packets |
| Progress structure | `pnpm progress` | Passed: 22 unsolved, 0 incomplete, 207 planned |
| Diagnostic inventory | `pnpm verify:koan -- k-NNN` for `k-001` through `k-022` | Passed: all 22 packets; 2,603 learner holes matched 2,603 intended diagnostics |
| Native performance | `pnpm exec tsc --noEmit --pretty false --extendedDiagnostics` | Measured expected-failing unsolved corpus; 398 files, 56,043 instantiations, 101,894 KiB, 0.083 s check, 0.162 s total |

The nonzero root typecheck result is the curriculum's intended fresh-clone state.
Every individual diagnostic was validated by the focused inventory, which also
ran each packet's runtime test and rejected missing or unexpected diagnostics.

## Phase 2 - Narrowing and Control-Flow Analysis

Recorded: 2026-07-18

Environment:

- Node.js: `v24.11.1`
- pnpm: `10.19.0`
- TypeScript: `7.0.2`

Results:

| Gate | Command | Result |
| --- | --- | --- |
| Runtime | `pnpm test` | Passed: 40 files, 202 tests, 1.17 s Vitest duration |
| Structure | `pnpm validate:syllabus` | Passed: 229 continuous entries, 39 authored packets |
| Progress structure | `pnpm progress` | Passed: 39 unsolved, 0 incomplete, 190 planned |
| Diagnostic inventory | `pnpm verify:koan -- k-NNN` for `k-023` through `k-039` | Passed: all 17 packets; 1,870 learner holes matched 1,870 intended diagnostics |
| Native performance | `pnpm exec tsc --noEmit --pretty false --extendedDiagnostics` | Measured expected-failing unsolved corpus; 466 files, 79,756 instantiations, 121,261 KiB, 0.155 s check, 0.270 s total |

The root compiler remains intentionally nonzero because all authored packets are
unsolved. Focused verification proves that each Phase 2 diagnostic belongs to a
declared learner hole and that every packet's runtime behavior remains green.

## Phase 3 - Mapped Types

Recorded: 2026-07-18

Environment:

- Node.js: `v24.11.1`
- pnpm: `10.19.0`
- TypeScript: `7.0.2`

Results:

| Gate | Command | Result |
| --- | --- | --- |
| Runtime | `pnpm test` | Passed: 55 files, 277 tests, 1.73 s Vitest duration |
| Structure | `pnpm validate:syllabus` | Passed: 229 continuous entries, 54 authored packets |
| Progress structure | `pnpm progress` | Passed: 54 unsolved, 0 incomplete, 175 planned |
| Diagnostic inventory | `pnpm verify:koan -- k-NNN` for `k-040` through `k-054` | Passed: all 15 packets; 1,650 learner holes matched 1,650 intended diagnostics |
| Native performance | `pnpm exec tsc --noEmit --pretty false --extendedDiagnostics` | Measured expected-failing unsolved corpus; 526 files, 133,346 instantiations, 145,685 KiB, 0.143 s check, 0.260 s total |

The root typecheck remains intentionally nonzero because learner assertions are
unsolved. Phase 3 focused verification found no syntax, implementation, fixture,
or unmarked diagnostics, and every mapped-type runtime anchor passed.

## Phase 4 - Conditional Types

Recorded: 2026-07-18

Environment:

- Node.js: `v24.11.1`
- pnpm: `10.19.0`
- TypeScript: `7.0.2`

Results:

| Gate | Command | Result |
| --- | --- | --- |
| Runtime | `pnpm test` | Passed: 74 files, 372 tests, 1.91 s Vitest duration |
| Structure | `pnpm validate:syllabus` | Passed: 229 continuous entries, 73 authored packets |
| Progress structure | `pnpm progress` | Passed: 73 unsolved, 0 incomplete, 156 planned |
| Diagnostic inventory | `pnpm verify:koan -- k-NNN` for `k-055` through `k-073` | Passed: all 19 packets; 2,090 learner holes matched 2,090 intended diagnostics |
| Native performance | `pnpm exec tsc --noEmit --pretty false --extendedDiagnostics` | Measured expected-failing unsolved corpus; 602 files, 719,069 instantiations, 519,255 KiB, 1.076 s check, 1.367 s total |

The root compiler remains intentionally nonzero because all authored lessons are
unsolved. Phase 4 focused verification found no syntax, implementation, fixture,
missing-marker, or unexpected diagnostics, including the recursive stress and
correlated-dispatch packets.

## Phase 5 - Template Literal Types

Recorded: 2026-07-18

Environment:

- Node.js: `v24.11.1`
- pnpm: `10.19.0`
- TypeScript: `7.0.2`

Results:

| Gate | Command | Result |
| --- | --- | --- |
| Runtime | `pnpm test` | Passed: 89 files, 447 tests, 2.20 s Vitest duration |
| Structure | `pnpm validate:syllabus` | Passed: 229 continuous entries, 88 authored packets |
| Progress structure | `pnpm progress` | Passed: 88 unsolved, 0 incomplete, 141 planned |
| Diagnostic inventory | `pnpm verify:koan -- k-NNN` for `k-074` through `k-088` | Passed: all 15 packets; 1,650 learner holes matched 1,650 intended diagnostics |
| Native performance | `pnpm exec tsc --noEmit --pretty false --extendedDiagnostics` | Measured expected-failing unsolved corpus; 662 files, 807,763 instantiations, 547,175 KiB, 1.097 s check, 1.432 s total |

The root compiler remains intentionally nonzero because learner assertions are
unsolved. Phase 5 focused verification found no syntax, implementation, fixture,
missing-marker, or unexpected diagnostics across the complete parser sequence.

## Phase 6 - Variadic Tuples

Recorded: 2026-07-18

Environment:

- Node.js: `v24.11.1`
- pnpm: `10.19.0`
- TypeScript: `7.0.2`

Results:

| Gate | Command | Result |
| --- | --- | --- |
| Runtime | `pnpm test` | Passed: 104 files, 522 tests, 2.80 s Vitest duration |
| Structure | `pnpm validate:syllabus` | Passed: 229 continuous entries, 103 authored packets |
| Progress structure | `pnpm progress` | Passed: 103 unsolved, 0 incomplete, 126 planned |
| Diagnostic inventory | `pnpm verify:koan -- k-NNN` for `k-089` through `k-103` | Passed: all 15 packets; 1,650 learner holes matched 1,650 intended diagnostics |
| Native performance | `pnpm exec tsc --noEmit --pretty false --extendedDiagnostics` | Measured expected-failing unsolved corpus; 722 files, 874,181 instantiations, 589,177 KiB, 1.331 s check, 1.709 s total |

The root compiler remains intentionally nonzero because learner assertions are
unsolved. Phase 6 focused verification found no syntax, implementation, fixture,
missing-marker, or unexpected diagnostics across tuple fundamentals, recursive
transforms, function parameter adaptation, and the capstone adapter boundary.

## Phase 7 - Recursive Types

Recorded: 2026-07-18

Environment:

- Node.js: `v24.11.1`
- pnpm: `10.19.0`
- TypeScript: `7.0.2`

Results:

| Gate | Command | Result |
| --- | --- | --- |
| Runtime | `pnpm test` | Passed: 118 files, 593 tests, 3.16 s Vitest duration |
| Structure | `pnpm validate:syllabus` | Passed: 229 continuous entries, 117 authored packets |
| Progress structure | `pnpm progress` | Passed: 117 unsolved, 0 incomplete, 112 planned |
| Diagnostic inventory | `pnpm verify:koan -- k-NNN` for `k-104` through `k-117` | Passed: all 14 packets; 1,540 learner holes matched 1,540 intended diagnostics |
| Native performance | `pnpm exec tsc --noEmit --pretty false --extendedDiagnostics` | Measured expected-failing unsolved corpus; 778 files, 962,315 instantiations, 617,651 KiB, 1.406 s check, 1.889 s total |

The root compiler remains intentionally nonzero because learner assertions are
unsolved. Phase 7 focused verification found no syntax, implementation, fixture,
missing-marker, or unexpected diagnostics across recursive models, deep transforms,
collection policies, path computation, cycle guards, and the bounded lens capstone.

## Phase 8 - Type-Level Programming

Recorded: 2026-07-18

Environment:

- Node.js: `v24.11.1`
- pnpm: `10.19.0`
- TypeScript: `7.0.2`

Results:

| Gate | Command | Result |
| --- | --- | --- |
| Runtime | `pnpm test` | Passed: 138 files, 693 tests, 4.24 s Vitest duration |
| Structure | `pnpm validate:syllabus` | Passed: 229 continuous entries, 137 authored packets |
| Progress structure | `pnpm progress` | Passed: 137 unsolved, 0 incomplete, 92 planned |
| Diagnostic inventory | `pnpm verify:koan -- k-NNN` for `k-118` through `k-137` | Passed: all 20 packets; 2,200 learner holes matched 2,200 intended diagnostics |
| Native performance | `pnpm exec tsc --noEmit --pretty false --extendedDiagnostics` | Measured expected-failing unsolved corpus; 858 files, 1,077,220 instantiations, 666,446 KiB, 1.538 s check, 1.856 s total |

The root compiler remains intentionally nonzero because learner assertions are
unsolved. Phase 8 focused verification found no syntax, implementation, fixture,
missing-marker, or unexpected diagnostics across rebuilt utilities, function
transforms, tuple arithmetic, string and union algorithms, and the interpreter capstone.

## Phase 9 - Advanced API Patterns

Recorded: 2026-07-28

Environment:

- Node.js: `v24.11.1`
- pnpm: `10.19.0`
- TypeScript: `7.0.2`

Results:

| Gate | Command | Result |
| --- | --- | --- |
| Runtime | `pnpm test` | Passed: 160 files, 803 tests, 3.96 s Vitest duration |
| Structure | `pnpm validate:syllabus` | Passed: 229 continuous entries, 159 authored packets |
| Progress structure | `pnpm progress` | Passed: 159 unsolved, 0 incomplete, 70 planned |
| Diagnostic inventory | `pnpm verify:koan -- k-NNN` for `k-138` through `k-159` | Passed: all 22 packets; 2,420 learner holes matched 2,420 intended diagnostics |
| Native performance | `pnpm exec tsc --noEmit --pretty false --extendedDiagnostics` | Measured expected-failing unsolved corpus; 946 files, 1,172,628 instantiations, 715,869 KiB, 1.585 s check, 2.180 s total |

The root compiler remains intentionally nonzero because learner assertions are
unsolved. Phase 9 focused verification found no syntax, implementation, fixture,
missing-marker, or unexpected diagnostics across nominal identity, the variance
sequence, deliberate soundness boundaries, fluent and typestate APIs, correlated
event/command maps, object cardinality utilities, HKT emulation, and the registry
capstone.

## Phase 10 - TypeScript 5.x Features

Recorded: 2026-07-28

Environment:

- Node.js: `v24.11.1`
- pnpm: `10.19.0`
- TypeScript: `7.0.2`

Results:

| Gate | Command | Result |
| --- | --- | --- |
| Runtime | `pnpm test` | Passed: 209 files, 1,048 tests, 7.74 s Vitest duration |
| Structure | `pnpm validate:syllabus` | Passed: 229 continuous entries, 208 authored packets |
| Progress structure | `pnpm progress` | Passed: 208 unsolved, 0 incomplete, 21 planned |
| Diagnostic inventory | `pnpm verify:koan -- k-NNN` for `k-160` through `k-208` | Passed: all 49 packets; 5,390 learner holes matched 5,390 intended diagnostics |
| Native performance | `pnpm exec tsc --noEmit --pretty false --extendedDiagnostics` | Measured expected-failing unsolved corpus; 1,144 files, 1,283,523 instantiations, 798,664 KiB, 2.101 s check, 2.544 s total |

The root compiler remains intentionally nonzero because learner assertions are
unsolved. Phase 10 focused verification found no syntax, implementation, fixture,
missing-marker, or unexpected diagnostics across decorators, resource management,
TypeScript 5.1 through 5.9 language changes, library declarations, module behavior,
control-flow analysis, migration flags, and modern Node configuration.

## Phase 11 - TypeScript 6 Transition

Recorded: 2026-07-28

Environment:

- Node.js: `v24.11.1`
- pnpm: `10.19.0`
- TypeScript 6: `6.0.3`
- TypeScript 7: `7.0.2`

Results:

| Gate | Command | Result |
| --- | --- | --- |
| Runtime | `pnpm test` | Passed: 221 files, 1,108 tests, 9.26 s Vitest duration |
| Structure | `pnpm validate:syllabus` | Passed: 229 continuous entries, 220 authored packets |
| Progress structure | `pnpm progress` | Passed: 220 unsolved, 0 incomplete, 9 planned |
| Diagnostic inventory | `pnpm verify:koan -- k-NNN` for `k-209` through `k-220` | Passed: all 12 packets; 1,320 learner holes matched 1,320 intended diagnostics |
| TS6/TS7 fixture | `tsc6`, `tsc6 --stableTypeOrdering`, and native `tsc` against `fixtures/typescript-6-7/tsconfig.json` | Passed under all three invocations with no diagnostics |
| Native performance | `pnpm exec tsc --noEmit --pretty false --extendedDiagnostics` | Measured expected-failing unsolved corpus; 1,192 files, 1,311,218 instantiations, 813,720 KiB, 2.819 s check, 3.336 s total |
| TypeScript 6 comparison | `tsc6 --noEmit --pretty false --extendedDiagnostics` | Measured the same expected-failing corpus; 1,171,912 instantiations, 1,005,704 KiB, 9.35 s check, 11.35 s total |

The root compilers remain intentionally nonzero because learner assertions are
unsolved. Phase 11 focused verification and the solved comparison fixture found no
syntax, implementation, fixture, missing-marker, or unexpected diagnostics across
strict defaults, inference ordering, ES2025 and ESNext declarations, DOM iterable
consolidation, module migration, and the TypeScript 6-to-7 compatibility workflow.

## Phase 12 - TypeScript 7 Native Epilogue

Recorded: 2026-07-28

Environment:

- Node.js: `v24.11.1`
- pnpm: `10.19.0`
- TypeScript 7: `7.0.2`

Results:

| Gate | Command | Result |
| --- | --- | --- |
| Runtime | `pnpm test` | Passed: 230 files, 1,153 tests, 9.99 s Vitest duration |
| Structure | `pnpm validate:syllabus` | Passed: 229 continuous entries, 229 authored packets |
| Progress structure | `pnpm progress` | Passed: 229 unsolved, 0 incomplete, 0 planned |
| Diagnostic inventory | `pnpm verify:koan -- k-NNN` for `k-221` through `k-229` | Passed: all 9 packets; 990 learner holes matched 990 intended diagnostics |
| Native performance | `pnpm exec tsc --noEmit --pretty false --extendedDiagnostics` | Measured expected-failing corpus; 1,228 files, 1,332,736 instantiations, 824,907 KiB, 2.890 s check, 3.410 s total |
| Single-threaded comparison | `pnpm exec tsc --noEmit --pretty false --extendedDiagnostics --singleThreaded` | Same corpus; 1,192,426 instantiations, 743,354 KiB, 4.203 s check, 5.160 s total |

The root compiler remains intentionally nonzero because learner assertions are
unsolved. Phase 12 focused verification found no syntax, implementation, fixture,
missing-marker, or unexpected diagnostics across native architecture, compatibility,
parallel controls, watch/LSP behavior, API bridging, configuration removals,
Unicode/JSDoc differences, and the parity/performance capstone.

## Final Repository Validation

Recorded: 2026-07-28

Environment:

- Node.js: `v24.11.1`
- pnpm: `10.19.0`
- TypeScript 6: `6.0.3`
- TypeScript 7: `7.0.2`
- Vitest: `4.1.10`

Results:

| Gate | Command or audit | Result |
| --- | --- | --- |
| Packet structure | `pnpm validate:syllabus` | Passed: 229 continuous syllabus entries and 229 complete four-file packets |
| Runtime | `pnpm test` | Passed: 230 files, 1,153 tests, 9.79 s Vitest duration |
| Progress | `pnpm progress` | Passed: 229 unsolved, 0 incomplete, 0 planned |
| Complete author inventory | `pnpm verify:koan -- k-NNN` for every `k-001` through `k-229` | Passed: all 229 packets; 25,373 learner holes matched 25,373 intended diagnostics |
| Aggregate diagnostic count | `pnpm exec tsc --noEmit --pretty false` with diagnostic counting | Expected nonzero compile produced exactly 25,373 diagnostics |
| Solved representatives | `pnpm verify:solved-samples` | Passed: one capstone packet from each of 12 phases, 1,320 mechanically solved assertions, no remaining diagnostics |
| Native performance | `pnpm exec tsc --noEmit --pretty false --extendedDiagnostics` | Expected-failing corpus; 1,229 files, 1,332,823 instantiations, 824,980 KiB, 2.818 s check, 3.348 s total |
| TS6/TS7 compatibility | Both compilers plus the TS6 stable-ordering probe against `fixtures/typescript-6-7/tsconfig.json` | Passed with no diagnostics |
| Version-source audit | Primary lesson headers `k-160` through `k-229` | Passed: all 70 versioned lessons cite an official TypeScript primary source; runtime/proposal references are supplementary |
| Curriculum-content audit | Four-file inventory, syllabus digest fields, narrative ordering, drill/edge duplicate review, and phase prerequisite review | Passed: 229 main/drill/edge/test files, 229 complete lesson digests, no gaps; repeated narrowing expressions occur in distinct flow scopes, and literal duplicates found during review were replaced |
| Usage documentation | `README.md`, `SYLLABUS.md`, and this gate record | Complete: learner loop, expected-failure contract, packet tiers, command reference, compiler fixtures, all lesson metadata, and measured gates are documented |

The repository-wide `pnpm typecheck` failure is the intended initial learner
state. The complete focused inventory and solved representative audit demonstrate
that those failures are confined to declared koan holes and disappear when the
exercise expectations are supplied.
