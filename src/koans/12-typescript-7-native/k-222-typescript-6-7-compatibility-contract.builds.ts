import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-222: the 6.0/7.0 compatibility contract — constructions
 * =============================================================================
 *
 * "Is this project ready for the native compiler?" is a question with a
 * precondition: the comparison only means something if the 6.0 build is already
 * clean, with stable ordering on and nothing suppressed. A project that is
 * silencing deprecations is not a candidate — it is hiding exactly the errors the
 * next major turns hard.
 *
 * Two further limits are worth writing down. Diagnostic *wording and location*
 * may differ without any semantic drift, so a text-diff is not a parity signal;
 * and CLI parity says nothing about the old programmatic API, which is a separate
 * contract. Build the readiness ladder, the comparison, and what a green run does
 * and does not entitle you to conclude.
 * Replace each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

// ─── The state of the 6.0 build ───────────────────────────────────────

// 1. Build the states a project's current build can be in.
export type BaselineState = TODO; // TODO(koan)

type _01a = Expect<
  Equal<BaselineState, "clean-and-stable" | "suppressing-deprecations" | "has-type-errors">
>;
type _01b = Expect<Equal<Extract<BaselineState, `has-${string}`>, "has-type-errors">>;
type _01c = Expect<
  Equal<Exclude<BaselineState, "clean-and-stable">, "suppressing-deprecations" | "has-type-errors">
>;
type _01d = Expect<Equal<Extract<BaselineState, "not-configured">, never>>;

// 2. Build what each state calls for. Only one of the three is ready to be
//    compared against anything.
export type NextActionFor<State extends BaselineState> = TODO; // TODO(koan)

type _02a = Expect<Equal<NextActionFor<"clean-and-stable">, "compare">>;
type _02b = Expect<Equal<NextActionFor<"suppressing-deprecations">, "remove the suppressions">>;
type _02c = Expect<Equal<NextActionFor<"has-type-errors">, "fix the errors">>;
type _02d = Expect<
  Equal<NextActionFor<BaselineState>, "compare" | "remove the suppressions" | "fix the errors">
>;

// 3. Build the precondition itself.
export type IsCandidate<State extends BaselineState> = TODO; // TODO(koan)

type _03a = Expect<Equal<IsCandidate<"clean-and-stable">, true>>;
type _03b = Expect<Equal<IsCandidate<"suppressing-deprecations">, false>>;
type _03c = Expect<Equal<IsCandidate<"has-type-errors">, false>>;
type _03d = Expect<Equal<IsCandidate<BaselineState>, boolean>>;

// 4. Build why suppression in particular disqualifies: it hides the errors the
//    next major makes unconditional.
export type SuppressionHides<State extends BaselineState> = TODO; // TODO(koan)

type _04a = Expect<Equal<SuppressionHides<"suppressing-deprecations">, "the next major's hard errors">>;
type _04b = Expect<Equal<SuppressionHides<"clean-and-stable">, "nothing">>;
type _04c = Expect<Equal<SuppressionHides<"has-type-errors">, "nothing">>;
type _04d = Expect<
  Equal<Equal<SuppressionHides<"suppressing-deprecations">, SuppressionHides<"clean-and-stable">>, false>
>;

// ─── The comparison ───────────────────────────────────────────────────

// 5. Build what a compiler run produces that can be compared at all.
export type Observable = TODO; // TODO(koan)

type _05a = Expect<
  Equal<Observable, "acceptance" | "diagnostic set" | "diagnostic text" | "declaration output">
>;
type _05b = Expect<
  Equal<Extract<Observable, `diagnostic ${string}`>, "diagnostic set" | "diagnostic text">
>;
type _05c = Expect<Equal<Extract<Observable, "acceptance">, "acceptance">>;
type _05d = Expect<Equal<Extract<Observable, "timing">, never>>;

// 6. Build which observables the contract covers. Wording is not one of them.
export type CoveredByContract<What extends Observable> = TODO; // TODO(koan)

type _06a = Expect<Equal<CoveredByContract<"acceptance">, true>>;
type _06b = Expect<Equal<CoveredByContract<"diagnostic set">, true>>;
type _06c = Expect<Equal<CoveredByContract<"declaration output">, true>>;
type _06d = Expect<Equal<CoveredByContract<"diagnostic text">, false>>;
type _06e = Expect<Equal<CoveredByContract<Observable>, boolean>>;

// 7. Build the verdict for one observable's comparison: a difference matters
//    only where the contract covers it.
export type DifferenceVerdict<
  What extends Observable,
  Differs extends boolean,
> = TODO; // TODO(koan)

type _07a = Expect<Equal<DifferenceVerdict<"acceptance", false>, "agrees">>;
type _07b = Expect<Equal<DifferenceVerdict<"acceptance", true>, "parity break">>;
type _07c = Expect<Equal<DifferenceVerdict<"diagnostic text", true>, "acceptable variation">>;
type _07d = Expect<Equal<DifferenceVerdict<"declaration output", true>, "parity break">>;

// 8. Build the whole comparison over several observables.
export type ComparisonResult<Differing extends readonly Observable[]> = TODO; // TODO(koan)

type _08a = Expect<Equal<ComparisonResult<[]>["acceptance"], "agrees">>;
type _08b = Expect<Equal<ComparisonResult<["diagnostic text"]>["diagnostic text"], "acceptable variation">>;
type _08c = Expect<Equal<ComparisonResult<["acceptance"]>["acceptance"], "parity break">>;
type _08d = Expect<Equal<keyof ComparisonResult<[]>, Observable>>;

// 9. Build the question a migration actually needs answered.
export type ParityHolds<Differing extends readonly Observable[]> = TODO; // TODO(koan)

type _09a = Expect<Equal<ParityHolds<[]>, true>>;
type _09b = Expect<Equal<ParityHolds<["diagnostic text"]>, true>>;
type _09c = Expect<Equal<ParityHolds<["acceptance"]>, false>>;
type _09d = Expect<Equal<ParityHolds<["diagnostic text", "declaration output"]>, false>>;

// ─── What a green run entitles you to ─────────────────────────────────

// 10. Build the claims a passing comparison might be read as making.
export type Claim = TODO; // TODO(koan)

type _10a = Expect<
  Equal<
    Claim,
    | "theProgramTypechecksUnderBoth"
    | "theSameDiagnosticsWereReported"
    | "theWordingIsIdentical"
    | "theProgrammaticApiIsUnchanged"
  >
>;
type _10b = Expect<Equal<Extract<Claim, `${string}Api${string}`>, "theProgrammaticApiIsUnchanged">>;
type _10c = Expect<Equal<Extract<Claim, `${string}Wording${string}`>, "theWordingIsIdentical">>;
type _10d = Expect<Equal<Extract<Claim, "theBuildIsFaster">, never>>;

// 11. Build which of them a green comparison supports.
export type SupportedByAGreenRun<TheClaim extends Claim> = TODO; // TODO(koan)

type _11a = Expect<Equal<SupportedByAGreenRun<"theProgramTypechecksUnderBoth">, true>>;
type _11b = Expect<Equal<SupportedByAGreenRun<"theSameDiagnosticsWereReported">, true>>;
type _11c = Expect<Equal<SupportedByAGreenRun<"theWordingIsIdentical">, false>>;
type _11d = Expect<Equal<SupportedByAGreenRun<"theProgrammaticApiIsUnchanged">, false>>;
type _11e = Expect<Equal<SupportedByAGreenRun<Claim>, boolean>>;

// 12. Build the separate contract the last claim belongs to.
export type Surface = TODO; // TODO(koan)

type _12a = Expect<Equal<Surface, "cli" | "language server" | "programmatic api">>;
type _12b = Expect<Equal<Extract<Surface, `${string}api`>, "programmatic api">>;
type _12c = Expect<Equal<Exclude<Surface, "programmatic api">, "cli" | "language server">>;
type _12d = Expect<Equal<Extract<Surface, "playground">, never>>;

// 13. Build what CLI parity covers, which is one surface of the three.
export type CoveredByCliParity<TheSurface extends Surface> = TODO; // TODO(koan)

type _13a = Expect<Equal<CoveredByCliParity<"cli">, true>>;
type _13b = Expect<Equal<CoveredByCliParity<"language server">, false>>;
type _13c = Expect<Equal<CoveredByCliParity<"programmatic api">, false>>;
type _13d = Expect<Equal<CoveredByCliParity<Surface>, boolean>>;

// ─── The ladder ───────────────────────────────────────────────────────

// 14. Build the readiness ladder: the baseline decides whether a comparison is
//     even meaningful, and the comparison decides the rest.
export type Readiness<
  State extends BaselineState,
  Differing extends readonly Observable[],
> = TODO; // TODO(koan)

type _14a = Expect<Equal<Readiness<"clean-and-stable", []>, "ready">>;
type _14b = Expect<Equal<Readiness<"clean-and-stable", ["acceptance"]>, "parity work remains">>;
type _14c = Expect<Equal<Readiness<"suppressing-deprecations", []>, "baseline work remains">>;
type _14d = Expect<Equal<Readiness<"has-type-errors", ["acceptance"]>, "baseline work remains">>;
type _14e = Expect<Equal<Readiness<"clean-and-stable", ["diagnostic text"]>, "ready">>;

// 15. Build what to do next, which is the useful output of the whole exercise.
export type NextStep<
  State extends BaselineState,
  Differing extends readonly Observable[],
> = TODO; // TODO(koan)

type _15a = Expect<Equal<NextStep<"clean-and-stable", []>, "adopt the native compiler">>;
type _15b = Expect<Equal<NextStep<"clean-and-stable", ["acceptance"]>, "report the parity break">>;
type _15c = Expect<
  Equal<NextStep<"suppressing-deprecations", []>, "remove the suppressions">
>;
type _15d = Expect<Equal<NextStep<"has-type-errors", []>, "fix the errors">>;

// ─── Reading it back ──────────────────────────────────────────────────

// 16. Report the three baselines and what each one needs first.
export type BaselineProfile = TODO; // TODO(koan)

type _16a = Expect<Equal<BaselineProfile["clean-and-stable"], "compare">>;
type _16b = Expect<Equal<BaselineProfile["suppressing-deprecations"], "remove the suppressions">>;
type _16c = Expect<Equal<BaselineProfile["has-type-errors"], "fix the errors">>;
type _16d = Expect<Equal<keyof BaselineProfile, BaselineState>>;

// 17. Report a comparison whose only difference is wording — the case a naive
//     text diff would fail and the contract does not.
export type WordingProfile = TODO; // TODO(koan)

type _17a = Expect<Equal<WordingProfile["verdict"], "acceptable variation">>;
type _17b = Expect<Equal<WordingProfile["covered"], false>>;
type _17c = Expect<Equal<WordingProfile["parityStillHolds"], true>>;
type _17d = Expect<Equal<WordingProfile["andTheSameDifferenceInAcceptanceWouldNot"], "parity break">>;

// 18. Report one project at a glance: whether it is a candidate, whether parity
//     holds, what to do next, and what the run did not cover.
export type CompatibilityReport<
  State extends BaselineState,
  Differing extends readonly Observable[],
> = TODO; // TODO(koan)

type _18a = Expect<Equal<CompatibilityReport<"clean-and-stable", []>["candidate"], true>>;
type _18b = Expect<Equal<CompatibilityReport<"clean-and-stable", []>["readiness"], "ready">>;
type _18c = Expect<
  Equal<CompatibilityReport<"suppressing-deprecations", []>["nextStep"], "remove the suppressions">
>;
type _18d = Expect<
  Equal<CompatibilityReport<"clean-and-stable", ["diagnostic text"]>["parity"], true>
>;
type _18e = Expect<
  Equal<CompatibilityReport<"clean-and-stable", []>["programmaticApiCovered"], false>
>;
