import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-187: inferred type predicates release lab — constructions
 * =============================================================================
 *
 * TypeScript 5.5 will write `value is T` for you when a boolean-returning
 * function proves it. The proof is if-and-only-if: the true branch must narrow
 * the parameter to `T`, and the false branch must be left with exactly the
 * complement. `!!value` on `object | null` qualifies — every object is truthy.
 * The same expression on `number | null` does not, because `0` is a falsy
 * number, so the false branch still contains numbers.
 *
 * Two further facts shape how the result is used. Syntax can block the proof
 * outright — an explicit `: boolean`, several returns, a written-to parameter,
 * a detour through `Boolean(...)` — and `ReturnType` reports `boolean` either
 * way, because the predicate lives in the call signature rather than the return
 * type. Build the rule, the blockers, and what `filter` and `find` do with the
 * result. Replace each `TODO` with a type satisfying the assertions below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

type SuccessResult = { status: "success"; value: string };
type FailureResult = { status: "failure"; error: Error };
type PendingResult = { status: "pending"; startedAt: number };

// ─── The domain and the signature ─────────────────────────────────────

// 1. Build the union the lab narrows all the way through.
export type ApiResult = TODO; // TODO(koan)

type _01a = Expect<Equal<Extract<ApiResult, { status: "success" }>, SuccessResult>>;
type _01b = Expect<Equal<Exclude<ApiResult, SuccessResult>, FailureResult | PendingResult>>;
type _01c = Expect<Equal<ApiResult["status"], "success" | "failure" | "pending">>;
type _01d = Expect<Equal<keyof ApiResult, "status">>;

// 2. Build the shape of a predicate signature.
export type PredicateFor<Input, Target extends Input> = TODO; // TODO(koan)

type _02a = Expect<Equal<Parameters<PredicateFor<ApiResult, SuccessResult>>[0], ApiResult>>;
type _02b = Expect<Equal<ReturnType<PredicateFor<ApiResult, SuccessResult>>, boolean>>;
type _02c = Expect<Equal<PredicateFor<unknown, string>, (value: unknown) => value is string>>;
type _02d = Expect<Equal<Parameters<PredicateFor<ApiResult, SuccessResult>>["length"], 1>>;

// 3. Build the reader that recovers the asserted type, so a proved signature can
//    be told apart from an unproved one.
export type TargetOf<Signature> = TODO; // TODO(koan)

type _03a = Expect<Equal<TargetOf<PredicateFor<ApiResult, SuccessResult>>, SuccessResult>>;
type _03b = Expect<Equal<TargetOf<PredicateFor<unknown, string>>, string>>;
type _03c = Expect<Equal<TargetOf<(value: unknown) => boolean>, never>>;
type _03d = Expect<Equal<TargetOf<number>, never>>;

// ─── The proof ────────────────────────────────────────────────────────

// 4. Build the if-and-only-if condition: the false branch has to be exactly what
//    is left over, not merely something smaller than the parameter.
export type PartitionsExactly<Input, WhenTrue, WhenFalse> = TODO; // TODO(koan)

type _04a = Expect<Equal<PartitionsExactly<ApiResult, SuccessResult, FailureResult | PendingResult>, true>>;
type _04b = Expect<Equal<PartitionsExactly<object | null, object, null>, true>>;
type _04c = Expect<Equal<PartitionsExactly<number | null, number, number | null>, false>>;
type _04d = Expect<Equal<PartitionsExactly<unknown, string, unknown>, true>>;

// 5. Build the signature the checker settles on: the predicate when the proof
//    goes through, a plain boolean function when it does not.
export type InferredPredicate<Input, WhenTrue extends Input, WhenFalse> = TODO; // TODO(koan)

type _05a = Expect<
  Equal<InferredPredicate<object | null, object, null>, (value: object | null) => value is object>
>;
type _05b = Expect<
  Equal<InferredPredicate<number | null, number, number | null>, (value: number | null) => boolean>
>;
type _05c = Expect<Equal<TargetOf<InferredPredicate<object | null, object, null>>, object>>;
type _05d = Expect<Equal<TargetOf<InferredPredicate<number | null, number, number | null>>, never>>;

// 6. Build the list of things that stop the proof before it starts. None of them
//    is about what the function computes; all of them are about how it is written.
export type Blocker = TODO; // TODO(koan)

type _06a = Expect<
  Equal<
    Blocker,
    "explicitBooleanAnnotation" | "multipleReturns" | "parameterMutation" | "indirectionThroughBoolean"
  >
>;
type _06b = Expect<Equal<Extract<Blocker, `parameter${string}`>, "parameterMutation">>;
type _06c = Expect<
  Equal<
    Exclude<Blocker, "multipleReturns" | "parameterMutation">,
    "explicitBooleanAnnotation" | "indirectionThroughBoolean"
  >
>;
type _06d = Expect<Equal<Extract<Blocker, "extraSemanticCondition">, never>>;

// 7. Build the signature a function actually gets: any blocker at all and the
//    proof is not attempted, however clean the logic is.
export type SignatureUnder<
  Blockers extends readonly Blocker[],
  Input,
  WhenTrue extends Input,
  WhenFalse,
> = TODO; // TODO(koan)

type _07a = Expect<
  Equal<SignatureUnder<[], unknown, string, unknown>, (value: unknown) => value is string>
>;
type _07b = Expect<
  Equal<SignatureUnder<["multipleReturns"], unknown, string, unknown>, (value: unknown) => boolean>
>;
type _07c = Expect<Equal<TargetOf<SignatureUnder<[], object | null, object, null>>, object>>;
type _07d = Expect<
  Equal<TargetOf<SignatureUnder<["explicitBooleanAnnotation"], object | null, object, null>>, never>
>;

// ─── What the collection methods do with it ───────────────────────────

// 8. Build `filter`'s result. The narrowing overload returns the predicate's
//    target — not the intersection of it with the element type.
export type FilteredBy<Element, Predicate> = TODO; // TODO(koan)

type _08a = Expect<
  Equal<FilteredBy<ApiResult, PredicateFor<ApiResult, SuccessResult>>, SuccessResult[]>
>;
type _08b = Expect<Equal<FilteredBy<ApiResult, (value: ApiResult) => boolean>, ApiResult[]>>;
type _08c = Expect<Equal<FilteredBy<unknown, PredicateFor<unknown, string>>, string[]>>;
type _08d = Expect<Equal<FilteredBy<string | number, PredicateFor<string | number, string>>, string[]>>;

// 9. Build `find`'s result, which adds the absence the array cannot rule out.
export type FoundBy<Element, Predicate> = TODO; // TODO(koan)

type _09a = Expect<
  Equal<FoundBy<ApiResult, PredicateFor<ApiResult, FailureResult>>, FailureResult | undefined>
>;
type _09b = Expect<
  Equal<
    FoundBy<ApiResult, (value: ApiResult) => boolean>,
    SuccessResult | FailureResult | PendingResult | undefined
  >
>;
type _09c = Expect<
  Equal<Exclude<FoundBy<ApiResult, PredicateFor<ApiResult, FailureResult>>, undefined>, FailureResult>
>;
type _09d = Expect<Equal<FoundBy<string, PredicateFor<string, "a">>, "a" | undefined>>;

// 10. Build the generic presence guard — the one inferred predicate that is
//     worth writing once and reusing everywhere.
export type PresenceGuard<Value> = TODO; // TODO(koan)

type _10a = Expect<Equal<Parameters<PresenceGuard<string>>[0], string | null | undefined>>;
type _10b = Expect<Equal<TargetOf<PresenceGuard<string>>, string>>;
type _10c = Expect<Equal<ReturnType<PresenceGuard<string>>, boolean>>;
type _10d = Expect<Equal<Parameters<PresenceGuard<never>>[0], null | undefined>>;

// 11. Build the compaction helper that guard makes possible.
export type Compacted<Value> = TODO; // TODO(koan)

type _11a = Expect<Equal<Parameters<Compacted<number>>[0], readonly (number | null | undefined)[]>>;
type _11b = Expect<Equal<ReturnType<Compacted<number>>, number[]>>;
type _11c = Expect<Equal<ReturnType<Compacted<never>>, never[]>>;
type _11d = Expect<Equal<Parameters<Compacted<string>>["length"], 1>>;

// ─── Reading the result back ──────────────────────────────────────────

// 12. Report where the predicate does and does not show up. `ReturnType` erases
//     it; assignability still knows the difference.
export type ErasureProfile = TODO; // TODO(koan)

type _12a = Expect<Equal<ErasureProfile["returnTypeSaysBoolean"], boolean>>;
type _12b = Expect<Equal<ErasureProfile["butTheTargetIsStillThere"], string>>;
type _12c = Expect<Equal<ErasureProfile["aPredicateFitsAPlainBooleanSlot"], true>>;
type _12d = Expect<Equal<ErasureProfile["butNotTheOtherWayAround"], false>>;
type _12e = Expect<Equal<ErasureProfile["soTheTwoSignaturesAreNotEqual"], false>>;

// 13. Report the four blockers against the same logic, plus the unblocked case.
export type BlockerProfile = TODO; // TODO(koan)

type _13a = Expect<Equal<BlockerProfile["explicitAnnotation"], never>>;
type _13b = Expect<Equal<BlockerProfile["severalReturns"], never>>;
type _13c = Expect<Equal<BlockerProfile["aWrittenParameter"], never>>;
type _13d = Expect<Equal<BlockerProfile["aDetourThroughBoolean"], never>>;
type _13e = Expect<Equal<BlockerProfile["andTheSameLogicUnblocked"], string>>;

// 14. Report the truthiness pair the release notes are built around.
export type TruthinessProfile = TODO; // TODO(koan)

type _14a = Expect<Equal<TruthinessProfile["everyObjectIsTruthy"], true>>;
type _14b = Expect<Equal<TruthinessProfile["soTheObjectCheckProves"], object>>;
type _14c = Expect<Equal<TruthinessProfile["butZeroIsAFalsyNumber"], false>>;
type _14d = Expect<Equal<TruthinessProfile["soTheNumberCheckDoesNot"], never>>;

// 15. Report the domain pipeline: select, find, and read a payload that only
//     exists on the selected member.
export type DomainProfile = TODO; // TODO(koan)

type _15a = Expect<Equal<DomainProfile["keptSuccesses"], SuccessResult[]>>;
type _15b = Expect<Equal<DomainProfile["theFirstFailure"], FailureResult | undefined>>;
type _15c = Expect<Equal<DomainProfile["everythingElse"], FailureResult | PendingResult>>;
type _15d = Expect<Equal<DomainProfile["aPayloadOnlyTheSelectedMemberHas"], string>>;

// 16. Report the generic guard at three instantiations.
export type GenericProfile = TODO; // TODO(koan)

type _16a = Expect<Equal<GenericProfile["guardParameter"], string | null | undefined>>;
type _16b = Expect<Equal<GenericProfile["guardTarget"], string>>;
type _16c = Expect<Equal<GenericProfile["compacted"], string[]>>;
type _16d = Expect<Equal<GenericProfile["atUnknownTheParameterSwallowsEverything"], unknown>>;
type _16e = Expect<Equal<GenericProfile["atNeverThereIsNothingToKeep"], never[]>>;

// 17. Build the classifier that names what a signature turned out to be.
export type Classify<Signature> = TODO; // TODO(koan)

type _17a = Expect<Equal<Classify<PredicateFor<unknown, string>>, "type predicate">>;
type _17b = Expect<Equal<Classify<(value: unknown) => boolean>, "plain boolean">>;
type _17c = Expect<
  Equal<Classify<SignatureUnder<["multipleReturns"], unknown, string, unknown>>, "plain boolean">
>;
type _17d = Expect<Equal<Classify<InferredPredicate<object | null, object, null>>, "type predicate">>;

// 18. Report one function at a glance: whether the proof went through, what it
//     proves, and what `filter` will hand back.
export type InferenceReport<
  Blockers extends readonly Blocker[],
  Input,
  WhenTrue extends Input,
  WhenFalse,
> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<InferenceReport<[], ApiResult, SuccessResult, FailureResult | PendingResult>["kind"], "type predicate">
>;
type _18b = Expect<
  Equal<InferenceReport<[], ApiResult, SuccessResult, FailureResult | PendingResult>["proves"], SuccessResult>
>;
type _18c = Expect<
  Equal<
    InferenceReport<[], ApiResult, SuccessResult, FailureResult | PendingResult>["filtered"],
    SuccessResult[]
  >
>;
type _18d = Expect<
  Equal<
    InferenceReport<["parameterMutation"], ApiResult, SuccessResult, FailureResult | PendingResult>["kind"],
    "plain boolean"
  >
>;
type _18e = Expect<
  Equal<
    InferenceReport<["parameterMutation"], ApiResult, SuccessResult, FailureResult | PendingResult>["filtered"],
    ApiResult[]
  >
>;
