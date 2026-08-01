import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-221: native compiler architecture — constructions
 * =============================================================================
 *
 * TypeScript 7 keeps the language and replaces the implementation. The Go port
 * follows the old compiler's structure closely; what changes is what a native
 * program can do with data layout, shared memory and threads — parsing and
 * emitting are largely per-file and parallelise, checking partitions across
 * workers that share inputs but hold their own views.
 *
 * The separation to hold onto is implementation facts versus language facts. A
 * type is not more or less sound because the compiler is native; the latency,
 * the memory profile, the concurrency model and the executable surface are what
 * moved. Build both sides of that line, and the parallelism each phase admits.
 * Replace each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

// ─── The two kinds of fact ────────────────────────────────────────────

// 1. Build the properties an observer might attribute to a compiler release.
export type Property = TODO; // TODO(koan)

type _01a = Expect<
  Equal<
    Property,
    "assignability" | "inferenceResults" | "diagnosticText" | "latency" | "memoryProfile" | "concurrencyModel"
  >
>;
type _01b = Expect<Equal<Extract<Property, `${string}Model`>, "concurrencyModel">>;
type _01c = Expect<
  Equal<Exclude<Property, "latency" | "memoryProfile" | "concurrencyModel">, "assignability" | "inferenceResults" | "diagnosticText">
>;
type _01d = Expect<Equal<Extract<Property, "syntax">, never>>;

// 2. Build which side of the line each property is on.
export type KindOf<TheProperty extends Property> = TODO; // TODO(koan)

type _02a = Expect<Equal<KindOf<"assignability">, "language">>;
type _02b = Expect<Equal<KindOf<"inferenceResults">, "language">>;
type _02c = Expect<Equal<KindOf<"latency">, "implementation">>;
type _02d = Expect<Equal<KindOf<"concurrencyModel">, "implementation">>;
type _02e = Expect<Equal<KindOf<Property>, "language" | "implementation">>;

// 3. Build what a reimplementation is allowed to change. The language facts are
//    exactly the ones a port has to preserve.
export type MayChange<TheProperty extends Property> = TODO; // TODO(koan)

type _03a = Expect<Equal<MayChange<"latency">, true>>;
type _03b = Expect<Equal<MayChange<"memoryProfile">, true>>;
type _03c = Expect<Equal<MayChange<"assignability">, false>>;
type _03d = Expect<Equal<MayChange<"inferenceResults">, false>>;

// 4. Build the awkward middle: diagnostic *text* is an implementation detail
//    that a test suite will nonetheless notice.
export type ObservableInTests<TheProperty extends Property> = TODO; // TODO(koan)

type _04a = Expect<Equal<ObservableInTests<"assignability">, true>>;
type _04b = Expect<Equal<ObservableInTests<"diagnosticText">, true>>;
type _04c = Expect<Equal<ObservableInTests<"latency">, false>>;
type _04d = Expect<
  Equal<
    {
      theTextIsAnImplementationDetail: KindOf<"diagnosticText">;
      andYourSnapshotsStillSeeIt: ObservableInTests<"diagnosticText">;
    },
    { theTextIsAnImplementationDetail: "implementation"; andYourSnapshotsStillSeeIt: true }
  >
>;

// ─── The phases ───────────────────────────────────────────────────────

// 5. Build the compiler's phases.
export type Phase = TODO; // TODO(koan)

type _05a = Expect<Equal<Phase, "parsing" | "checking" | "emitting">>;
type _05b = Expect<Equal<Extract<Phase, `${string}ing`>, "parsing" | "checking" | "emitting">>;
type _05c = Expect<Equal<Exclude<Phase, "checking">, "parsing" | "emitting">>;
type _05d = Expect<Equal<Extract<Phase, "linking">, never>>;

// 6. Build the parallelism each phase admits, which follows from what each one
//    needs to see.
export type ParallelismOf<TheePhase extends Phase> = TODO; // TODO(koan)

type _06a = Expect<Equal<ParallelismOf<"parsing">, "per-file">>;
type _06b = Expect<Equal<ParallelismOf<"emitting">, "per-file">>;
type _06c = Expect<Equal<ParallelismOf<"checking">, "worker-partitioned">>;
type _06d = Expect<Equal<ParallelismOf<Phase>, "per-file" | "worker-partitioned">>;

// 7. Build why checking is the odd one out: it is the phase that has to consult
//    other files.
export type NeedsWholeProgram<TheePhase extends Phase> = TODO; // TODO(koan)

type _07a = Expect<Equal<NeedsWholeProgram<"checking">, true>>;
type _07b = Expect<Equal<NeedsWholeProgram<"parsing">, false>>;
type _07c = Expect<Equal<NeedsWholeProgram<"emitting">, false>>;
type _07d = Expect<
  Equal<Equal<ParallelismOf<"parsing">, ParallelismOf<"checking">>, false>
>;

// 8. Build the unit of work each phase is divided into. Route the parameter
//    through its own constraint first, or a union argument answers once for the
//    whole union instead of once per member.
export type WorkUnitOf<TheePhase extends Phase> = TODO; // TODO(koan)

type _08a = Expect<Equal<WorkUnitOf<"parsing">, "one file">>;
type _08b = Expect<Equal<WorkUnitOf<"emitting">, "one file">>;
type _08c = Expect<Equal<WorkUnitOf<"checking">, "a worker's partition">>;
type _08d = Expect<Equal<WorkUnitOf<Phase>, "one file" | "a worker's partition">>;

// ─── What the workers share ───────────────────────────────────────────

// 9. Build what a checking worker holds versus what it reads.
export type WorkerResource = TODO; // TODO(koan)

type _09a = Expect<Equal<WorkerResource, "parsed sources" | "checker view" | "diagnostic output">>;
type _09b = Expect<Equal<Extract<WorkerResource, `checker${string}`>, "checker view">>;
type _09c = Expect<
  Equal<Exclude<WorkerResource, "checker view">, "parsed sources" | "diagnostic output">
>;
type _09d = Expect<Equal<Extract<WorkerResource, "source map">, never>>;

// 10. Build the sharing model: inputs are shared, per-worker state is not.
export type SharingOf<Resource extends WorkerResource> = TODO; // TODO(koan)

type _10a = Expect<Equal<SharingOf<"parsed sources">, "shared">>;
type _10b = Expect<Equal<SharingOf<"checker view">, "per-worker">>;
type _10c = Expect<Equal<SharingOf<"diagnostic output">, "per-worker">>;
type _10d = Expect<Equal<SharingOf<WorkerResource>, "shared" | "per-worker">>;

// 11. Build the consequence for ordering: anything a worker produces has to be
//     mergeable without depending on which worker got there first.
export type MustBeDeterministic<Resource extends WorkerResource> = TODO; // TODO(koan)

type _11a = Expect<Equal<MustBeDeterministic<"diagnostic output">, true>>;
type _11b = Expect<Equal<MustBeDeterministic<"checker view">, true>>;
type _11c = Expect<Equal<MustBeDeterministic<"parsed sources">, false>>;
type _11d = Expect<Equal<MustBeDeterministic<WorkerResource>, boolean>>;

// ─── The executable surface ───────────────────────────────────────────

// 12. Build what a consumer actually installs and runs.
export type Artifact = TODO; // TODO(koan)

type _12a = Expect<Equal<Artifact, "native executable" | "language server" | "javascript api">>;
type _12b = Expect<Equal<Extract<Artifact, `${string}api`>, "javascript api">>;
type _12c = Expect<
  Equal<Exclude<Artifact, "javascript api">, "native executable" | "language server">
>;
type _12d = Expect<Equal<Extract<Artifact, "browser bundle">, never>>;

// 13. Build what each artifact is written in, which is the actual change.
export type ImplementedIn<TheArtifact extends Artifact> = TODO; // TODO(koan)

type _13a = Expect<Equal<ImplementedIn<"native executable">, "go">>;
type _13b = Expect<Equal<ImplementedIn<"language server">, "go">>;
type _13c = Expect<Equal<ImplementedIn<"javascript api">, "a wrapper over the native program">>;
type _13d = Expect<
  Equal<ImplementedIn<Artifact>, "go" | "a wrapper over the native program">
>;

// 14. Build the claims a native port might be read as making.
export type Claim = TODO; // TODO(koan)

type _14a = Expect<
  Equal<
    Claim,
    "theSameProgramsTypecheck" | "theSameDiagnosticsAreProduced" | "itIsFaster" | "theTypesAreMoreSound"
  >
>;
type _14b = Expect<Equal<Extract<Claim, `it${string}`>, "itIsFaster">>;
type _14c = Expect<
  Equal<Exclude<Claim, "itIsFaster" | "theTypesAreMoreSound">, "theSameProgramsTypecheck" | "theSameDiagnosticsAreProduced">
>;
type _14d = Expect<Equal<Extract<Claim, "theOutputIsSmaller">, never>>;

// 15. Build which of them the port intends. The last one is a category error:
//     soundness is a property of the language, not of the implementation.
export type IntendedByThePort<TheClaim extends Claim> = TODO; // TODO(koan)

type _15a = Expect<Equal<IntendedByThePort<"theSameProgramsTypecheck">, true>>;
type _15b = Expect<Equal<IntendedByThePort<"theSameDiagnosticsAreProduced">, true>>;
type _15c = Expect<Equal<IntendedByThePort<"itIsFaster">, true>>;
type _15d = Expect<Equal<IntendedByThePort<"theTypesAreMoreSound">, false>>;
type _15e = Expect<Equal<IntendedByThePort<Claim>, boolean>>;

// ─── Reading it back ──────────────────────────────────────────────────

// 16. Report the line between the two kinds of fact.
export type FactProfile = TODO; // TODO(koan)

type _16a = Expect<Equal<FactProfile["assignability"], "language">>;
type _16b = Expect<Equal<FactProfile["inferenceResults"], "language">>;
type _16c = Expect<Equal<FactProfile["latency"], "implementation">>;
type _16d = Expect<Equal<FactProfile["concurrencyModel"], "implementation">>;
type _16e = Expect<Equal<keyof FactProfile, Property>>;

// 17. Report the phases: what each one can do at once, and why checking cannot.
export type PhaseProfile = TODO; // TODO(koan)

type _17a = Expect<Equal<PhaseProfile["parsing"], "per-file">>;
type _17b = Expect<Equal<PhaseProfile["checking"], "worker-partitioned">>;
type _17c = Expect<Equal<PhaseProfile["emitting"], "per-file">>;
type _17d = Expect<Equal<PhaseProfile["andCheckingIsTheOneThatLooksAround"], true>>;
type _17e = Expect<Equal<PhaseProfile["soItsUnitOfWorkIsBigger"], "a worker's partition">>;

// 18. Report one property at a glance: which side of the line it is on, whether
//     a port may move it, and whether your tests would notice.
export type ArchitectureReport<TheProperty extends Property, TheePhase extends Phase> = TODO; // TODO(koan)

type _18a = Expect<Equal<ArchitectureReport<"assignability", "checking">["kind"], "language">>;
type _18b = Expect<Equal<ArchitectureReport<"assignability", "checking">["mayChange"], false>>;
type _18c = Expect<Equal<ArchitectureReport<"latency", "parsing">["mayChange"], true>>;
type _18d = Expect<
  Equal<ArchitectureReport<"latency", "parsing">["phaseParallelism"], "per-file">
>;
type _18e = Expect<Equal<ArchitectureReport<"latency", "parsing">["soundnessClaim"], false>>;
