import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-203: granular return-expression checks — constructions
 * =============================================================================
 *
 * `any` absorbs whatever it is unioned with. A conditional whose branches are
 * `any` and `string` used to become `any` first, and only that result was
 * compared with the declared `URL` return type — so the broken branch sailed
 * through. TypeScript 5.8 special-cases a conditional written *directly* in a
 * return statement of a function with a declared return type: each branch is
 * checked against the contract on its own.
 *
 * The limits are the lesson. It is contextual checking at one syntactic site,
 * not a change to `any`: assign the same conditional to an `any` temporary and
 * return that, and there is nothing left to check. Build the union rule, the
 * per-branch rule, and the sites where each one applies.
 * Replace each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;
type IsAny<Value> = 0 extends 1 & Value ? true : false;

// ─── How a conditional is typed ───────────────────────────────────────

// 1. Build the type a conditional expression has on its own: the union of its
//    branches, which is where `any` does its damage.
export type BranchUnion<WhenTrue, WhenFalse> = TODO; // TODO(koan)

type _01a = Expect<Equal<BranchUnion<string, number>, string | number>>;
type _01b = Expect<
  Equal<
    {
      anAnyBranchSwallowsTheOther: IsAny<BranchUnion<any, string>>;
      butTwoOrdinaryBranchesStayAUnion: BranchUnion<string, number>;
    },
    { anAnyBranchSwallowsTheOther: true; butTwoOrdinaryBranchesStayAUnion: string | number }
  >
>;
type _01c = Expect<Equal<BranchUnion<never, string>, string>>;
type _01d = Expect<Equal<BranchUnion<URL, URL>, URL>>;

// 2. Build the old check: compare that union with the declared type, once.
export type UnionSatisfies<Declared, WhenTrue, WhenFalse> = TODO; // TODO(koan)

type _02a = Expect<Equal<UnionSatisfies<URL, URL, URL>, true>>;
type _02b = Expect<Equal<UnionSatisfies<URL, any, string>, true>>;
type _02c = Expect<Equal<UnionSatisfies<URL, URL, string>, false>>;
type _02d = Expect<Equal<UnionSatisfies<string | URL, URL, string>, true>>;

// 3. Build the new check: each branch against the declared type, separately.
export type BranchesSatisfy<Declared, WhenTrue, WhenFalse> = TODO; // TODO(koan)

type _03a = Expect<
  Equal<BranchesSatisfy<URL, URL, URL>, { whenTrue: true; whenFalse: true }>
>;
type _03b = Expect<
  Equal<BranchesSatisfy<URL, any, string>, { whenTrue: true; whenFalse: false }>
>;
type _03c = Expect<Equal<BranchesSatisfy<URL, string, URL>["whenTrue"], false>>;
type _03d = Expect<Equal<BranchesSatisfy<string, "a", "b">["whenFalse"], true>>;

// 4. Build the verdicts a return site can reach.
export type BranchCompatibility = TODO; // TODO(koan)

type _04a = Expect<
  Equal<BranchCompatibility, "both-compatible" | "true-branch-error" | "false-branch-error">
>;
type _04b = Expect<
  Equal<Extract<BranchCompatibility, `${string}-error`>, "true-branch-error" | "false-branch-error">
>;
type _04c = Expect<Equal<Exclude<BranchCompatibility, `${string}-error`>, "both-compatible">>;
type _04d = Expect<Equal<Extract<BranchCompatibility, "union-error">, never>>;

// 5. Build the classifier over a pair of branch results. The true branch is
//    reported first, exactly as the checker walks them.
export type ClassifyBranches<Declared, WhenTrue, WhenFalse> = TODO; // TODO(koan)

type _05a = Expect<Equal<ClassifyBranches<URL, URL, URL>, "both-compatible">>;
type _05b = Expect<Equal<ClassifyBranches<URL, any, string>, "false-branch-error">>;
type _05c = Expect<Equal<ClassifyBranches<URL, string, URL>, "true-branch-error">>;
type _05d = Expect<Equal<ClassifyBranches<string, "a", "b">, "both-compatible">>;

// ─── Where the rule applies ───────────────────────────────────────────

// 6. Build the sites a conditional can be written at.
export type ReturnExpressionSite = TODO; // TODO(koan)

type _06a = Expect<
  Equal<ReturnExpressionSite, "direct-annotated-return" | "temporary-then-return" | "inferred-return">
>;
type _06b = Expect<
  Equal<
    Extract<ReturnExpressionSite, `${string}return`>,
    "direct-annotated-return" | "temporary-then-return" | "inferred-return"
  >
>;
type _06c = Expect<Equal<Exclude<ReturnExpressionSite, "direct-annotated-return">, "temporary-then-return" | "inferred-return">>;
type _06d = Expect<Equal<Extract<ReturnExpressionSite, "argument-position">, never>>;

// 7. Build the condition for the granular check running at all: the conditional
//    has to be the returned expression, and there has to be a contract to check
//    it against.
export type ChecksEachBranch<Site extends ReturnExpressionSite> = TODO; // TODO(koan)

type _07a = Expect<Equal<ChecksEachBranch<"direct-annotated-return">, true>>;
type _07b = Expect<Equal<ChecksEachBranch<"temporary-then-return">, false>>;
type _07c = Expect<Equal<ChecksEachBranch<"inferred-return">, false>>;
type _07d = Expect<Equal<ChecksEachBranch<ReturnExpressionSite>, boolean>>;

// 8. Build the verdict a site actually produces. Away from the annotated return
//    the union rule is all there is, and `any` wins it.
export type VerdictAt<
  Site extends ReturnExpressionSite,
  Declared,
  WhenTrue,
  WhenFalse,
> = TODO; // TODO(koan)

type _08a = Expect<Equal<VerdictAt<"direct-annotated-return", URL, any, string>, "false-branch-error">>;
type _08b = Expect<Equal<VerdictAt<"temporary-then-return", URL, any, string>, "both-compatible">>;
type _08c = Expect<Equal<VerdictAt<"direct-annotated-return", URL, URL, URL>, "both-compatible">>;
type _08d = Expect<Equal<VerdictAt<"inferred-return", URL, any, string>, "both-compatible">>;

// 9. Build the question that matters: does the broken branch get caught?
export type CaughtHere<
  Site extends ReturnExpressionSite,
  Declared,
  WhenTrue,
  WhenFalse,
> = TODO; // TODO(koan)

type _09a = Expect<Equal<CaughtHere<"direct-annotated-return", URL, any, string>, true>>;
type _09b = Expect<Equal<CaughtHere<"temporary-then-return", URL, any, string>, false>>;
type _09c = Expect<Equal<CaughtHere<"inferred-return", URL, any, string>, false>>;
type _09d = Expect<Equal<CaughtHere<"direct-annotated-return", URL, URL, URL>, false>>;

// ─── The functions involved ───────────────────────────────────────────

// 10. Build the annotated function whose contract makes the check possible.
export type AnnotatedSelector<Declared> = TODO; // TODO(koan)

type _10a = Expect<Equal<ReturnType<AnnotatedSelector<URL>>, URL>>;
type _10b = Expect<Equal<Parameters<AnnotatedSelector<URL>>, [unknown, string, boolean]>>;
type _10c = Expect<Equal<Parameters<AnnotatedSelector<URL>>["length"], 3>>;
type _10d = Expect<Equal<ReturnType<AnnotatedSelector<string>>, string>>;

// 11. Build the same function without the annotation, where the return type is
//     whatever the branches came to — including `any`.
export type InferredSelector<WhenTrue, WhenFalse> = TODO; // TODO(koan)

type _11a = Expect<Equal<ReturnType<InferredSelector<URL, URL>>, URL>>;
type _11b = Expect<
  Equal<
    {
      anAnyBranchMakesTheWholeReturnAny: IsAny<ReturnType<InferredSelector<any, string>>>;
      whereasTwoUrlBranchesInferUrl: ReturnType<InferredSelector<URL, URL>>;
    },
    { anAnyBranchMakesTheWholeReturnAny: true; whereasTwoUrlBranchesInferUrl: URL }
  >
>;
type _11c = Expect<Equal<ReturnType<InferredSelector<URL, string>>, URL | string>>;
type _11d = Expect<Equal<Parameters<InferredSelector<URL, URL>>["length"], 3>>;

// 12. Build the narrowing the true branch relies on. From `unknown` an
//     `instanceof` lands exactly on the class; from a union it filters instead.
export type NarrowedCache<Cached, Target> = TODO; // TODO(koan)

type _12a = Expect<Equal<NarrowedCache<unknown, URL>, URL>>;
type _12b = Expect<Equal<NarrowedCache<URL | string, URL>, URL>>;
type _12c = Expect<Equal<NarrowedCache<string, URL>, never>>;
type _12d = Expect<Equal<NarrowedCache<unknown, never>, never>>;

// 13. Build the honest alternative the release notes recommend: an input that
//     was never `any` to begin with.
export type PreciseSelector<Cached, Declared> = TODO; // TODO(koan)

type _13a = Expect<Equal<Parameters<PreciseSelector<URL | undefined, URL>>[0], URL | undefined>>;
type _13b = Expect<Equal<ReturnType<PreciseSelector<URL | undefined, URL>>, URL>>;
type _13c = Expect<
  Equal<
    {
      thePreciseInputIsNotAny: IsAny<Parameters<PreciseSelector<URL | undefined, URL>>[0]>;
      andItIsExactlyWhatWasDeclared: Parameters<PreciseSelector<URL | undefined, URL>>[0];
    },
    { thePreciseInputIsNotAny: false; andItIsExactlyWhatWasDeclared: URL | undefined }
  >
>;
type _13d = Expect<
  Equal<
    {
      thePreciseInputStillFitsTheLooseSignature: GivenExtends<
        PreciseSelector<unknown, URL>,
        AnnotatedSelector<URL>
      >;
      butANarrowerInputDoesNot: GivenExtends<PreciseSelector<URL, URL>, AnnotatedSelector<URL>>;
    },
    { thePreciseInputStillFitsTheLooseSignature: true; butANarrowerInputDoesNot: false }
  >
>;

// ─── What did not change ──────────────────────────────────────────────

// 14. Build the claims one might make about the new check.
export type Claim = TODO; // TODO(koan)

type _14a = Expect<
  Equal<
    Claim,
    | "eachBranchIsCheckedAtAnAnnotatedReturn"
    | "anyIsNarrowedByTheCheck"
    | "aTemporaryPreservesTheEvidence"
    | "inferredReturnsGetTheSameTreatment"
  >
>;
type _14b = Expect<Equal<Extract<Claim, `any${string}`>, "anyIsNarrowedByTheCheck">>;
type _14c = Expect<Equal<Extract<Claim, `a${"T"}${string}`>, "aTemporaryPreservesTheEvidence">>;
type _14d = Expect<Equal<Extract<Claim, "unionsAreGone">, never>>;

// 15. Build which of them hold. Exactly one.
export type Holds<TheClaim extends Claim> = TODO; // TODO(koan)

type _15a = Expect<Equal<Holds<"eachBranchIsCheckedAtAnAnnotatedReturn">, true>>;
type _15b = Expect<Equal<Holds<"anyIsNarrowedByTheCheck">, false>>;
type _15c = Expect<Equal<Holds<"aTemporaryPreservesTheEvidence">, false>>;
type _15d = Expect<Equal<Holds<"inferredReturnsGetTheSameTreatment">, false>>;
type _15e = Expect<Equal<Holds<Claim>, boolean>>;

// ─── Reading it back ──────────────────────────────────────────────────

// 16. Report the case the release notes open with: one good branch, one broken
//     one, and a declared return type.
export type MixedBranchProfile = TODO; // TODO(koan)

type _16a = Expect<
  Equal<
    {
      theUnionIsAny: IsAny<MixedBranchProfile["theUnionOfTheBranches"]>;
      andTheVerdictNamesTheBrokenSide: MixedBranchProfile["theVerdict"];
    },
    { theUnionIsAny: true; andTheVerdictNamesTheBrokenSide: "false-branch-error" }
  >
>;
type _16b = Expect<Equal<MixedBranchProfile["theOldWholeExpressionCheck"], true>>;
type _16c = Expect<
  Equal<MixedBranchProfile["theNewPerBranchCheck"], { whenTrue: true; whenFalse: false }>
>;
type _16d = Expect<Equal<MixedBranchProfile["theVerdict"], "false-branch-error">>;
type _16e = Expect<Equal<MixedBranchProfile["soTheBrokenBranchIsCaught"], true>>;

// 17. Report the same expression moved one line away, where the evidence is gone
//     before the return statement is reached.
export type TemporaryProfile = TODO; // TODO(koan)

type _17a = Expect<Equal<TemporaryProfile["atTheAnnotatedReturn"], "false-branch-error">>;
type _17b = Expect<Equal<TemporaryProfile["throughATemporary"], "both-compatible">>;
type _17c = Expect<Equal<TemporaryProfile["withNoAnnotationAtAll"], "both-compatible">>;
type _17d = Expect<Equal<TemporaryProfile["andOnlyTheFirstCatchesIt"], false>>;

// 18. Report one return site at a glance: what each branch does with the
//     contract, the verdict, and whether writing it this way caught anything.
export type ReturnCheckReport<
  Site extends ReturnExpressionSite,
  Declared,
  WhenTrue,
  WhenFalse,
> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<ReturnCheckReport<"direct-annotated-return", URL, any, string>["verdict"], "false-branch-error">
>;
type _18b = Expect<
  Equal<ReturnCheckReport<"direct-annotated-return", URL, any, string>["wholeExpression"], true>
>;
type _18c = Expect<Equal<ReturnCheckReport<"temporary-then-return", URL, any, string>["caught"], false>>;
type _18d = Expect<
  Equal<ReturnCheckReport<"direct-annotated-return", URL, URL, URL>["branches"], { whenTrue: true; whenFalse: true }>
>;
type _18e = Expect<
  Equal<ReturnCheckReport<"inferred-return", URL, any, string>["perBranchChecking"], false>
>;
