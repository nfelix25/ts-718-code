import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-220: TypeScript 6 migration capstone — constructions
 * =============================================================================
 *
 * A migration is an evidence-gathering sequence, not a single pass/fail bit. Pin
 * the defaults that float, enumerate the ambient type packages, make the output
 * structure intentional, rewrite the removed options, run the ordering probe, and
 * compare the two compilers before trusting either. Each step produces a finding,
 * and each finding is an action of a particular kind.
 *
 * The one that needs discipline is suppression. `ignoreDeprecations: "6.0"` buys
 * time and nothing else: every option it silences still has to be gone before the
 * next major, so a suppression is inventory to be worked off rather than a
 * setting to be kept. Build the steps, the actions, and the debt a suppression
 * leaves behind.
 * Replace each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

// ─── The sequence ─────────────────────────────────────────────────────

// 1. Build the steps of the migration.
export type MigrationStep = TODO; // TODO(koan)

type _01a = Expect<
  Equal<
    MigrationStep,
    | "pin-defaults"
    | "enumerate-types"
    | "set-root-dir"
    | "remove-deprecations"
    | "compare-ordering"
    | "dual-compiler"
  >
>;
type _01b = Expect<Equal<Extract<MigrationStep, `${string}-defaults`>, "pin-defaults">>;
type _01c = Expect<
  Equal<Extract<MigrationStep, `compare-${string}` | `dual-${string}`>, "compare-ordering" | "dual-compiler">
>;
type _01d = Expect<Equal<Extract<MigrationStep, "rewrite-imports">, never>>;

// 2. Build the kinds of action a step produces.
export type ActionKind = TODO; // TODO(koan)

type _02a = Expect<Equal<ActionKind, "configure" | "rewrite" | "diagnose" | "verify">>;
type _02b = Expect<Equal<Exclude<ActionKind, "configure">, "rewrite" | "diagnose" | "verify">>;
type _02c = Expect<Equal<Extract<ActionKind, "verify">, "verify">>;
type _02d = Expect<Equal<Extract<ActionKind, "ignore">, never>>;

// 3. Build the mapping. Three steps are configuration, one is a rewrite, and the
//    last two are about finding out rather than changing anything.
export type ActionFor<Step extends MigrationStep> = TODO; // TODO(koan)

type _03a = Expect<Equal<ActionFor<"pin-defaults">, "configure">>;
type _03b = Expect<Equal<ActionFor<"remove-deprecations">, "rewrite">>;
type _03c = Expect<Equal<ActionFor<"compare-ordering">, "diagnose">>;
type _03d = Expect<Equal<ActionFor<"dual-compiler">, "verify">>;
type _03e = Expect<
  Equal<ActionFor<MigrationStep>, "configure" | "rewrite" | "diagnose" | "verify">
>;

// 4. Build the steps that leave a permanent change in the repository, as opposed
//    to the ones that only tell you something.
export type LeavesAChange<Step extends MigrationStep> = TODO; // TODO(koan)

type _04a = Expect<Equal<LeavesAChange<"pin-defaults">, true>>;
type _04b = Expect<Equal<LeavesAChange<"remove-deprecations">, true>>;
type _04c = Expect<Equal<LeavesAChange<"compare-ordering">, false>>;
type _04d = Expect<Equal<LeavesAChange<"dual-compiler">, false>>;

// ─── Tracking the work ────────────────────────────────────────────────

// 5. Build the state of one step.
export type StepState = TODO; // TODO(koan)

type _05a = Expect<Equal<StepState, "not-started" | "in-progress" | "done">>;
type _05b = Expect<Equal<Exclude<StepState, "done">, "not-started" | "in-progress">>;
type _05c = Expect<Equal<Extract<StepState, `${string}-${string}`>, "not-started" | "in-progress">>;
type _05d = Expect<Equal<Extract<StepState, "skipped">, never>>;

// 6. Build the board: every step with its state.
export type Board<Done extends readonly MigrationStep[]> = TODO; // TODO(koan)

type _06a = Expect<Equal<Board<["pin-defaults"]>["pin-defaults"], "done">>;
type _06b = Expect<Equal<Board<["pin-defaults"]>["dual-compiler"], "not-started">>;
type _06c = Expect<Equal<keyof Board<[]>, MigrationStep>>;
type _06d = Expect<Equal<Board<[]>[MigrationStep], "not-started">>;

// 7. Build what is left.
export type Remaining<Done extends readonly MigrationStep[]> = TODO; // TODO(koan)

type _07a = Expect<
  Equal<
    Remaining<["pin-defaults"]>,
    "enumerate-types" | "set-root-dir" | "remove-deprecations" | "compare-ordering" | "dual-compiler"
  >
>;
type _07b = Expect<
  Equal<
    Remaining<[]>,
    "pin-defaults" | "enumerate-types" | "set-root-dir" | "remove-deprecations" | "compare-ordering" | "dual-compiler"
  >
>;
type _07c = Expect<
  Equal<
    Remaining<
      [
        "pin-defaults",
        "enumerate-types",
        "set-root-dir",
        "remove-deprecations",
        "compare-ordering",
        "dual-compiler",
      ]
    >,
    never
  >
>;
type _07d = Expect<Equal<Extract<Remaining<["dual-compiler"]>, "dual-compiler">, never>>;

// 8. Build the finished question.
export type MigrationComplete<Done extends readonly MigrationStep[]> = TODO; // TODO(koan)

type _08a = Expect<Equal<MigrationComplete<[]>, false>>;
type _08b = Expect<Equal<MigrationComplete<["pin-defaults"]>, false>>;
type _08c = Expect<
  Equal<
    MigrationComplete<
      [
        "pin-defaults",
        "enumerate-types",
        "set-root-dir",
        "remove-deprecations",
        "compare-ordering",
        "dual-compiler",
      ]
    >,
    true
  >
>;
type _08d = Expect<Equal<MigrationComplete<["compare-ordering", "dual-compiler"]>, false>>;

// ─── The suppression ──────────────────────────────────────────────────

// 9. Build what a suppression covers: a deprecated option, silenced for now.
export type Suppressed<Options extends readonly string[]> = TODO; // TODO(koan)

type _09a = Expect<Equal<Suppressed<["baseUrl"]>, "baseUrl">>;
type _09b = Expect<Equal<Suppressed<["baseUrl", "outFile"]>, "baseUrl" | "outFile">>;
type _09c = Expect<Equal<Suppressed<[]>, never>>;
type _09d = Expect<Equal<Extract<Suppressed<["outFile"]>, "baseUrl">, never>>;

// 10. Build what a suppression is worth: silence now, and exactly the same work
//     later.
export type SuppressionEffect<Horizon extends "this major" | "next major"> = TODO; // TODO(koan)

type _10a = Expect<Equal<SuppressionEffect<"this major">, "silenced">>;
type _10b = Expect<Equal<SuppressionEffect<"next major">, "still an error">>;
type _10c = Expect<
  Equal<SuppressionEffect<"this major" | "next major">, "silenced" | "still an error">
>;
type _10d = Expect<
  Equal<Equal<SuppressionEffect<"this major">, SuppressionEffect<"next major">>, false>
>;

// 11. Build the debt a suppression leaves: the same options, still to be
//     removed, with a deadline attached.
export type Debt<Options extends readonly string[]> = TODO; // TODO(koan)

type _11a = Expect<Equal<Debt<["baseUrl"]>, { baseUrl: "still an error" }>>;
type _11b = Expect<Equal<keyof Debt<["baseUrl", "outFile"]>, "baseUrl" | "outFile">>;
type _11c = Expect<Equal<Debt<[]>, {}>>;
type _11d = Expect<Equal<Debt<["outFile"]>["outFile"], "still an error">>;

// 12. Build the check a release process should run: nothing suppressed.
export type NoOutstandingDebt<Options extends readonly string[]> = TODO; // TODO(koan)

type _12a = Expect<Equal<NoOutstandingDebt<[]>, true>>;
type _12b = Expect<Equal<NoOutstandingDebt<["baseUrl"]>, false>>;
type _12c = Expect<Equal<NoOutstandingDebt<["baseUrl", "outFile"]>, false>>;
type _12d = Expect<Equal<Equal<NoOutstandingDebt<[]>, NoOutstandingDebt<["baseUrl"]>>, false>>;

// ─── What "ready" means ───────────────────────────────────────────────

// 13. Build the readiness question, which is both halves at once: the steps are
//     done *and* nothing is being suppressed.
export type ReadyForNextMajor<
  Done extends readonly MigrationStep[],
  Options extends readonly string[],
> = TODO; // TODO(koan)

type _13a = Expect<
  Equal<
    ReadyForNextMajor<
      [
        "pin-defaults",
        "enumerate-types",
        "set-root-dir",
        "remove-deprecations",
        "compare-ordering",
        "dual-compiler",
      ],
      []
    >,
    true
  >
>;
type _13b = Expect<
  Equal<
    ReadyForNextMajor<
      [
        "pin-defaults",
        "enumerate-types",
        "set-root-dir",
        "remove-deprecations",
        "compare-ordering",
        "dual-compiler",
      ],
      ["baseUrl"]
    >,
    false
  >
>;
type _13c = Expect<Equal<ReadyForNextMajor<[], []>, false>>;
type _13d = Expect<Equal<ReadyForNextMajor<["pin-defaults"], ["outFile"]>, false>>;

// 14. Build what blocks readiness, so a report can say *why* rather than just no.
export type BlockedBy<
  Done extends readonly MigrationStep[],
  Options extends readonly string[],
> = TODO; // TODO(koan)

type _14a = Expect<
  Equal<
    BlockedBy<[], []>,
    "pin-defaults" | "enumerate-types" | "set-root-dir" | "remove-deprecations" | "compare-ordering" | "dual-compiler"
  >
>;
type _14b = Expect<
  Equal<
    BlockedBy<
      [
        "pin-defaults",
        "enumerate-types",
        "set-root-dir",
        "remove-deprecations",
        "compare-ordering",
        "dual-compiler",
      ],
      ["baseUrl"]
    >,
    "baseUrl"
  >
>;
type _14c = Expect<
  Equal<
    BlockedBy<
      [
        "pin-defaults",
        "enumerate-types",
        "set-root-dir",
        "remove-deprecations",
        "compare-ordering",
        "dual-compiler",
      ],
      []
    >,
    never
  >
>;
type _14d = Expect<Equal<Extract<BlockedBy<["pin-defaults"], []>, "pin-defaults">, never>>;

// 15. Build the two compilers a verification step compares, since agreeing with
//     yourself is not evidence.
export type Compiler = TODO; // TODO(koan)

type _15a = Expect<Equal<Compiler, "6.0" | "7.0">>;
type _15b = Expect<Equal<Exclude<Compiler, "6.0">, "7.0">>;
type _15c = Expect<Equal<Extract<Compiler, "7.0">, "7.0">>;
type _15d = Expect<Equal<Extract<Compiler, "5.9">, never>>;

// ─── Reading it back ──────────────────────────────────────────────────

// 16. Report the steps by what they leave behind.
export type StepProfile = TODO; // TODO(koan)

type _16a = Expect<Equal<StepProfile["pin-defaults"], "configure">>;
type _16b = Expect<Equal<StepProfile["remove-deprecations"], "rewrite">>;
type _16c = Expect<Equal<StepProfile["compare-ordering"], "diagnose">>;
type _16d = Expect<Equal<StepProfile["dual-compiler"], "verify">>;
type _16e = Expect<Equal<keyof StepProfile, MigrationStep>>;

// 17. Report a project that has done the configuration but is still suppressing
//     one option — the state a migration most often stalls in.
export type StalledProfile = TODO; // TODO(koan)

type _17a = Expect<Equal<StalledProfile["board"]["pin-defaults"], "done">>;
type _17b = Expect<
  Equal<StalledProfile["remaining"], "remove-deprecations" | "compare-ordering" | "dual-compiler">
>;
type _17c = Expect<Equal<StalledProfile["debt"], { baseUrl: "still an error" }>>;
type _17d = Expect<Equal<StalledProfile["ready"], false>>;
type _17e = Expect<Equal<StalledProfile["andTheSuppressionExpires"], "still an error">>;

// 18. Report one migration at a glance: what is done, what is suppressed, and
//     whether the next major can be attempted.
export type MigrationReport<
  Done extends readonly MigrationStep[],
  Options extends readonly string[],
> = TODO; // TODO(koan)

type _18a = Expect<Equal<MigrationReport<[], []>["stepsComplete"], false>>;
type _18b = Expect<Equal<MigrationReport<["pin-defaults"], ["baseUrl"]>["debt"], { baseUrl: "still an error" }>>;
type _18c = Expect<Equal<MigrationReport<["pin-defaults"], []>["ready"], false>>;
type _18d = Expect<
  Equal<
    MigrationReport<
      [
        "pin-defaults",
        "enumerate-types",
        "set-root-dir",
        "remove-deprecations",
        "compare-ordering",
        "dual-compiler",
      ],
      []
    >["ready"],
    true
  >
>;
type _18e = Expect<
  Equal<
    MigrationReport<
      [
        "pin-defaults",
        "enumerate-types",
        "set-root-dir",
        "remove-deprecations",
        "compare-ordering",
        "dual-compiler",
      ],
      ["outFile"]
    >["blockedBy"],
    "outFile"
  >
>;
