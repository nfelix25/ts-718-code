import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-198: noCheck and building through errors — constructions
 * =============================================================================
 *
 * Checking and emitting are separable jobs. TypeScript 5.6's `noCheck` emits
 * with only the semantic work emit itself requires, leaving a separate `noEmit`
 * pass to produce the full diagnostics — and with `isolatedDeclarations`, even
 * declaration emit becomes a per-file syntactic transform. Build mode gained the
 * matching policy: `tsc -b` reports an upstream error and keeps going, emitting
 * best-effort output downstream, unless `stopOnBuildErrors` restores fail-fast.
 *
 * Both are scheduling policies, not correctness claims: emitted JavaScript may
 * well come from a program with type errors, and `.tsbuildinfo` is written
 * either way. Build the pass plan, the per-project outcome, and the fold across
 * a project graph under each policy — the place where "continue" and "stop"
 * visibly diverge. Replace each `TODO` with a type satisfying the assertions
 * directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

// ─── The passes ───────────────────────────────────────────────────────

// 1. Build the two jobs a compiler invocation can do.
export type CompilerPass = TODO; // TODO(koan)

type _01a = Expect<Equal<CompilerPass, "emit" | "typecheck">>;
type _01b = Expect<Equal<Exclude<CompilerPass, "emit">, "typecheck">>;
type _01c = Expect<Equal<Extract<CompilerPass, "emit">, "emit">>;
type _01d = Expect<Equal<Extract<CompilerPass, "lint">, never>>;

// 2. Build the plan each setting produces. `noCheck` does not skip a pass so
//    much as split the work into two invocations.
export type PassesFor<NoCheck extends boolean> = TODO; // TODO(koan)

type _02a = Expect<Equal<PassesFor<true>, ["emit"]>>;
type _02b = Expect<Equal<PassesFor<false>, ["typecheck", "emit"]>>;
type _02c = Expect<Equal<PassesFor<true>["length"], 1>>;
type _02d = Expect<Equal<PassesFor<boolean>, ["emit"] | ["typecheck", "emit"]>>;
type _02e = Expect<Equal<PassesFor<false>[number], "typecheck" | "emit">>;

// ─── The project graph ────────────────────────────────────────────────

// 3. Build the policy a build runs under.
export type BuildErrorPolicy = TODO; // TODO(koan)

type _03a = Expect<Equal<BuildErrorPolicy, "continue" | "stop">>;
type _03b = Expect<Equal<Exclude<BuildErrorPolicy, "stop">, "continue">>;
type _03c = Expect<Equal<Extract<BuildErrorPolicy, "stop">, "stop">>;
type _03d = Expect<Equal<Extract<BuildErrorPolicy, "retry">, never>>;

// 4. Build what one project's own check produced.
export type ProjectStatus = TODO; // TODO(koan)

type _04a = Expect<Equal<ProjectStatus, "clean" | "error">>;
type _04b = Expect<Equal<Exclude<ProjectStatus, "error">, "clean">>;
type _04c = Expect<Equal<Extract<ProjectStatus, "error">, "error">>;
type _04d = Expect<Equal<Extract<ProjectStatus, "warning">, never>>;

// 5. Build what the build did about it. Note that two of the three still wrote
//    output.
export type ProjectBuildOutcome = TODO; // TODO(koan)

type _05a = Expect<Equal<ProjectBuildOutcome, "emitted" | "emitted-with-errors" | "skipped">>;
type _05b = Expect<Equal<Extract<ProjectBuildOutcome, `emitted${string}`>, "emitted" | "emitted-with-errors">>;
type _05c = Expect<Equal<Exclude<ProjectBuildOutcome, `emitted${string}`>, "skipped">>;
type _05d = Expect<Equal<Extract<ProjectBuildOutcome, "failed">, never>>;

// 6. Build one project as the build sees it going in.
export type ProjectBuildInput<Name extends string, Status extends ProjectStatus> = TODO; // TODO(koan)

type _06a = Expect<Equal<ProjectBuildInput<"core", "error">["name"], "core">>;
type _06b = Expect<Equal<ProjectBuildInput<"core", "error">["status"], "error">>;
type _06c = Expect<Equal<keyof ProjectBuildInput<"core", "clean">, "name" | "status">>;
type _06d = Expect<
  Equal<ProjectBuildInput<"core", ProjectStatus>["status"], "clean" | "error">
>;

// 7. Build the record it comes out as. `.tsbuildinfo` is written whatever
//    happened, which is why the flag is a literal rather than a boolean.
export type ProjectBuildRecord<Name extends string, Outcome extends ProjectBuildOutcome> = TODO; // TODO(koan)

type _07a = Expect<Equal<ProjectBuildRecord<"core", "emitted">["outcome"], "emitted">>;
type _07b = Expect<Equal<ProjectBuildRecord<"core", "skipped">["buildInfoWritten"], true>>;
type _07c = Expect<Equal<keyof ProjectBuildRecord<"core", "emitted">, "name" | "outcome" | "buildInfoWritten">>;
type _07d = Expect<Equal<Extract<ProjectBuildRecord<"core", "skipped">["buildInfoWritten"], false>, never>>;

// ─── The policy in action ─────────────────────────────────────────────

// 8. Build the outcome for one project, given whether the build has already
//    given up.
export type OutcomeFor<
  Status extends ProjectStatus,
  Stopped extends boolean,
> = TODO; // TODO(koan)

type _08a = Expect<Equal<OutcomeFor<"clean", false>, "emitted">>;
type _08b = Expect<Equal<OutcomeFor<"error", false>, "emitted-with-errors">>;
type _08c = Expect<Equal<OutcomeFor<"clean", true>, "skipped">>;
type _08d = Expect<Equal<OutcomeFor<"error", true>, "skipped">>;

// 9. Build the carry: whether the *next* project will be skipped. Only the stop
//    policy can turn this on, and it never turns back off.
export type StoppedAfter<
  Status extends ProjectStatus,
  Policy extends BuildErrorPolicy,
  Stopped extends boolean,
> = TODO; // TODO(koan)

type _09a = Expect<Equal<StoppedAfter<"error", "stop", false>, true>>;
type _09b = Expect<Equal<StoppedAfter<"error", "continue", false>, false>>;
type _09c = Expect<Equal<StoppedAfter<"clean", "stop", false>, false>>;
type _09d = Expect<Equal<StoppedAfter<"clean", "continue", true>, true>>;

// 10. Build the fold over the project list. This is where the two policies stop
//     agreeing: `continue` keeps producing records, `stop` starts skipping.
export type BuildAll<
  Projects extends readonly ProjectBuildInput<string, ProjectStatus>[],
  Policy extends BuildErrorPolicy,
  Stopped extends boolean = false,
> = TODO; // TODO(koan)

type _10a = Expect<
  Equal<
    BuildAll<[ProjectBuildInput<"core", "error">, ProjectBuildInput<"app", "clean">], "continue">,
    [ProjectBuildRecord<"core", "emitted-with-errors">, ProjectBuildRecord<"app", "emitted">]
  >
>;
type _10b = Expect<
  Equal<
    BuildAll<[ProjectBuildInput<"core", "error">, ProjectBuildInput<"app", "clean">], "stop">,
    [ProjectBuildRecord<"core", "emitted-with-errors">, ProjectBuildRecord<"app", "skipped">]
  >
>;
type _10c = Expect<Equal<BuildAll<[], "continue">, []>>;
type _10d = Expect<
  Equal<
    BuildAll<[ProjectBuildInput<"core", "clean">, ProjectBuildInput<"app", "clean">], "stop">,
    [ProjectBuildRecord<"core", "emitted">, ProjectBuildRecord<"app", "emitted">]
  >
>;

// 11. Build the reader for just the outcomes, which is what a build log shows.
export type OutcomesOf<
  Records extends readonly ProjectBuildRecord<string, ProjectBuildOutcome>[],
> = TODO; // TODO(koan)

type _11a = Expect<
  Equal<
    OutcomesOf<[ProjectBuildRecord<"core", "emitted-with-errors">, ProjectBuildRecord<"app", "skipped">]>,
    ["emitted-with-errors", "skipped"]
  >
>;
type _11b = Expect<Equal<OutcomesOf<[]>, []>>;
type _11c = Expect<
  Equal<OutcomesOf<BuildAll<[ProjectBuildInput<"core", "error">], "continue">>, ["emitted-with-errors"]>
>;
type _11d = Expect<
  Equal<
    OutcomesOf<BuildAll<[ProjectBuildInput<"a", "error">, ProjectBuildInput<"b", "clean">], "stop">>,
    ["emitted-with-errors", "skipped"]
  >
>;

// 12. Build the question CI actually asks: did anything get emitted from a
//     project that did not typecheck?
export type EmittedDespiteErrors<
  Records extends readonly ProjectBuildRecord<string, ProjectBuildOutcome>[],
> = TODO; // TODO(koan)

type _12a = Expect<
  Equal<EmittedDespiteErrors<BuildAll<[ProjectBuildInput<"core", "error">], "continue">>, true>
>;
type _12b = Expect<
  Equal<EmittedDespiteErrors<BuildAll<[ProjectBuildInput<"core", "clean">], "continue">>, false>
>;
type _12c = Expect<Equal<EmittedDespiteErrors<[]>, false>>;
type _12d = Expect<
  Equal<EmittedDespiteErrors<BuildAll<[ProjectBuildInput<"core", "error">], "stop">>, true>
>;

// 13. Build the state written regardless. Build mode records `.tsbuildinfo` even
//     without explicit incremental or composite settings.
export type BuildInfoWritten<
  Records extends readonly ProjectBuildRecord<string, ProjectBuildOutcome>[],
> = TODO; // TODO(koan)

type _13a = Expect<
  Equal<BuildInfoWritten<BuildAll<[ProjectBuildInput<"core", "error">], "stop">>, [true]>
>;
type _13b = Expect<
  Equal<
    BuildInfoWritten<BuildAll<[ProjectBuildInput<"a", "error">, ProjectBuildInput<"b", "clean">], "stop">>,
    [true, true]
  >
>;
type _13c = Expect<Equal<BuildInfoWritten<[]>, []>>;
type _13d = Expect<
  Equal<BuildInfoWritten<BuildAll<[ProjectBuildInput<"a", "clean">], "continue">>[number], true>
>;

// ─── What none of it proves ───────────────────────────────────────────

// 14. Build the claims someone might read into a successful build.
export type Claim = TODO; // TODO(koan)

type _14a = Expect<
  Equal<Claim, "outputWasProduced" | "buildStateWasRecorded" | "theProgramTypechecks" | "theOutputIsCorrect">
>;
type _14b = Expect<Equal<Extract<Claim, `the${string}`>, "theProgramTypechecks" | "theOutputIsCorrect">>;
type _14c = Expect<Equal<Exclude<Claim, `the${string}`>, "outputWasProduced" | "buildStateWasRecorded">>;
type _14d = Expect<Equal<Extract<Claim, "testsPassed">, never>>;

// 15. Build which of them an emit under these policies supports.
export type SupportedByEmit<TheClaim extends Claim> = TODO; // TODO(koan)

type _15a = Expect<Equal<SupportedByEmit<"outputWasProduced">, true>>;
type _15b = Expect<Equal<SupportedByEmit<"buildStateWasRecorded">, true>>;
type _15c = Expect<Equal<SupportedByEmit<"theProgramTypechecks">, false>>;
type _15d = Expect<Equal<SupportedByEmit<"theOutputIsCorrect">, false>>;
type _15e = Expect<Equal<SupportedByEmit<Claim>, boolean>>;

// 16. Build how declaration emit is produced, which is the other thing 5.6
//     unlocked: with isolated declarations it is a per-file transform rather
//     than a whole-program inference.
export type DeclarationEmitPath<
  IsolatedDeclarations extends boolean,
> = TODO; // TODO(koan)

type _16a = Expect<Equal<DeclarationEmitPath<true>, "per-file syntactic transform">>;
type _16b = Expect<Equal<DeclarationEmitPath<false>, "whole-program inference">>;
type _16c = Expect<
  Equal<DeclarationEmitPath<boolean>, "per-file syntactic transform" | "whole-program inference">
>;
type _16d = Expect<Equal<Equal<DeclarationEmitPath<true>, DeclarationEmitPath<false>>, false>>;

// ─── Reading a build back ─────────────────────────────────────────────

// 17. Report the same three-project graph under both policies. The first project
//     fails either way; everything after it is where the policies differ.
export type PolicyProfile = TODO; // TODO(koan)

type _17a = Expect<
  Equal<PolicyProfile["underContinue"], ["emitted-with-errors", "emitted", "emitted"]>
>;
type _17b = Expect<Equal<PolicyProfile["underStop"], ["emitted-with-errors", "skipped", "skipped"]>>;
type _17c = Expect<Equal<PolicyProfile["bothWroteBuildInfo"], [true, true]>>;
type _17d = Expect<Equal<PolicyProfile["andBothEmittedFromABrokenProject"], true>>;

// 18. Report one invocation at a glance: which passes it runs, what the build
//     produced, and what that does not license anyone to believe.
export type BuildReport<
  Projects extends readonly ProjectBuildInput<string, ProjectStatus>[],
  Policy extends BuildErrorPolicy,
  NoCheck extends boolean,
> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<BuildReport<[ProjectBuildInput<"core", "error">], "continue", true>["passes"], ["emit"]>
>;
type _18b = Expect<
  Equal<
    BuildReport<[ProjectBuildInput<"core", "error">], "continue", true>["outcomes"],
    ["emitted-with-errors"]
  >
>;
type _18c = Expect<
  Equal<BuildReport<[ProjectBuildInput<"core", "error">], "continue", true>["typecheckedInThisInvocation"], false>
>;
type _18d = Expect<
  Equal<BuildReport<[ProjectBuildInput<"core", "clean">], "stop", false>["passes"], ["typecheck", "emit"]>
>;
type _18e = Expect<
  Equal<BuildReport<[ProjectBuildInput<"core", "clean">], "stop", false>["provesTheProgramTypechecks"], false>
>;
