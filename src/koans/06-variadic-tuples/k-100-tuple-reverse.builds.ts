import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-100: tuple reverse — constructions
 * =============================================================================
 *
 * These constructions reverse required finite positions with an accumulator,
 * classify optional and open inputs before they can be mistaken for empty, and
 * make readonly output an explicit wrapper. They cover positional facts,
 * involution limits, unions, special types, and the runtime helper contracts.
 * Replace each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenReverseFinite<
  Value extends readonly unknown[],
  Accumulator extends readonly unknown[] = [],
> = Value extends readonly [infer Head, ...infer Tail]
  ? GivenReverseFinite<Tail, [Head, ...Accumulator]>
  : Accumulator;

type GivenReverse<Value extends readonly unknown[]> =
  Value extends unknown
    ? number extends Value["length"]
      ? Value[number][]
      : Value extends Required<Value>
        ? GivenReverseFinite<Value>
        : Value[number][]
    : never;

type GivenReadonlyReverse<Value extends readonly unknown[]> =
  Readonly<GivenReverse<Value>>;

type GivenIsAny<Value> =
  0 extends (1 & Value) ? true : false;

type GivenTwenty = [
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9,
  10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
];

// ─── Accumulator recursion and derived positions ──────────────────────

// 1. Reverse required finite positions by prepending heads to an accumulator.
export type ReverseFinite<
  Value extends readonly unknown[],
  Accumulator extends readonly unknown[] = [],
> = TODO; // TODO(koan)

type _01a = Expect<Equal<ReverseFinite<[]>, []>>;
type _01b = Expect<Equal<ReverseFinite<[1]>, [1]>>;
type _01c = Expect<Equal<ReverseFinite<[1, 2, 3]>, [3, 2, 1]>>;
type _01d = Expect<
  Equal<ReverseFinite<readonly [1, "a", true]>, [true, "a", 1]>
>;
type _01e = Expect<
  Equal<ReverseFinite<[1, 2], ["done"]>, [2, 1, "done"]>
>;

// 2. Reverse finite tuples exactly and use an element-array fallback otherwise.
export type ReverseTuple<
  Value extends readonly unknown[],
> = TODO; // TODO(koan)

type _02a = Expect<Equal<ReverseTuple<[]>, []>>;
type _02b = Expect<Equal<ReverseTuple<[1, 2, 3]>, [3, 2, 1]>>;
type _02c = Expect<
  Equal<ReverseTuple<readonly [1, "a"]>, ["a", 1]>
>;
type _02d = Expect<Equal<ReverseTuple<string[]>, string[]>>;
type _02e = Expect<
  Equal<ReverseTuple<[value?: string]>, (string | undefined)[]>
>;

// 3. Wrap either exact or fallback reversal in an explicit readonly policy.
export type ReadonlyReverseTuple<
  Value extends readonly unknown[],
> = TODO; // TODO(koan)

type _03a = Expect<Equal<ReadonlyReverseTuple<[]>, readonly []>>;
type _03b = Expect<
  Equal<ReadonlyReverseTuple<[1, 2, 3]>, readonly [3, 2, 1]>
>;
type _03c = Expect<
  Equal<ReadonlyReverseTuple<readonly [1, 2]>, readonly [2, 1]>
>;
type _03d = Expect<
  Equal<ReadonlyReverseTuple<string[]>, readonly string[]>
>;
type _03e = Expect<
  Equal<
    ReadonlyReverseTuple<[value?: string]>,
    readonly (string | undefined)[]
  >
>;

// 4. Read the first position after reversal, which was the original last.
export type FirstAfterReverse<
  Value extends readonly unknown[],
> = TODO; // TODO(koan)

type _04a = Expect<Equal<FirstAfterReverse<[]>, never>>;
type _04b = Expect<Equal<FirstAfterReverse<[1]>, 1>>;
type _04c = Expect<Equal<FirstAfterReverse<[1, 2, 3]>, 3>>;
type _04d = Expect<
  Equal<FirstAfterReverse<readonly ["a", 1]>, 1>
>;
type _04e = Expect<
  Equal<FirstAfterReverse<[1] | [2, 3]>, 1 | 3>
>;

// 5. Read the last position after reversal, which was the original head.
export type LastAfterReverse<
  Value extends readonly unknown[],
> = TODO; // TODO(koan)

type _05a = Expect<Equal<LastAfterReverse<[]>, never>>;
type _05b = Expect<Equal<LastAfterReverse<[1]>, 1>>;
type _05c = Expect<Equal<LastAfterReverse<[1, 2, 3]>, 1>>;
type _05d = Expect<
  Equal<LastAfterReverse<readonly ["a", 1]>, "a">
>;
type _05e = Expect<
  Equal<LastAfterReverse<[1] | [2, 3]>, 1 | 2>
>;

// 6. Gather every value admitted after reversing.
export type ReversedElements<
  Value extends readonly unknown[],
> = TODO; // TODO(koan)

type _06a = Expect<Equal<ReversedElements<[]>, never>>;
type _06b = Expect<
  Equal<ReversedElements<[1, "a", true]>, 1 | "a" | true>
>;
type _06c = Expect<
  Equal<ReversedElements<[head: string, value?: number]>, string | number | undefined>
>;
type _06d = Expect<Equal<ReversedElements<unknown[]>, unknown>>;
type _06e = Expect<
  Equal<ReversedElements<[1, 2] | [3, 4]>, 1 | 2 | 3 | 4>
>;

// 7. Return the preserved finite length or open `number` length.
export type ReversedLength<
  Value extends readonly unknown[],
> = TODO; // TODO(koan)

type _07a = Expect<Equal<ReversedLength<[]>, 0>>;
type _07b = Expect<Equal<ReversedLength<[1, 2, 3]>, 3>>;
type _07c = Expect<Equal<ReversedLength<[value?: string]>, number>>;
type _07d = Expect<Equal<ReversedLength<string[]>, number>>;
type _07e = Expect<
  Equal<ReversedLength<[1] | [2, 3]>, 1 | 2>
>;

// 8. Apply the public reverse twice.
export type ReverseTupleTwice<
  Value extends readonly unknown[],
> = TODO; // TODO(koan)

type _08a = Expect<Equal<ReverseTupleTwice<[]>, []>>;
type _08b = Expect<Equal<ReverseTupleTwice<[1]>, [1]>>;
type _08c = Expect<
  Equal<ReverseTupleTwice<[1, 2, 3]>, [1, 2, 3]>
>;
type _08d = Expect<
  Equal<ReverseTupleTwice<readonly [1, 2]>, [1, 2]>
>;
type _08e = Expect<
  Equal<ReverseTupleTwice<[1] | [2, 3]>, [1] | [2, 3]>
>;

// ─── Classification profiles and qualifications ─────────────────────

// 9. Describe exact finite reversal, indexing, length, and output mutability.
export type FiniteReverseProfile = TODO; // TODO(koan)

type _09a = Expect<Equal<FiniteReverseProfile["empty"], []>>;
type _09b = Expect<
  Equal<FiniteReverseProfile["values"], [boolean, number, string]>
>;
type _09c = Expect<Equal<FiniteReverseProfile["first"], 3>>;
type _09d = Expect<Equal<FiniteReverseProfile["last"], 1>>;
type _09e = Expect<Equal<FiniteReverseProfile["mutable"], true>>;

// 10. Contrast naive finite recursion with the optional-shape fallback.
export type OptionalReverseProfile = TODO; // TODO(koan)

type _10a = Expect<Equal<OptionalReverseProfile["naiveOnly"], []>>;
type _10b = Expect<
  Equal<OptionalReverseProfile["safeOnly"], (string | undefined)[]>
>;
type _10c = Expect<
  Equal<OptionalReverseProfile["naiveTail"], [string]>
>;
type _10d = Expect<
  Equal<
    OptionalReverseProfile["safeTail"],
    (string | number | undefined)[]
  >
>;
type _10e = Expect<Equal<OptionalReverseProfile["same"], false>>;

// 11. Contrast partial finite decomposition with honest open-array fallback.
export type OpenReverseProfile = TODO; // TODO(koan)

type _11a = Expect<
  Equal<OpenReverseProfile["naiveTrailingRest"], [string]>
>;
type _11b = Expect<
  Equal<OpenReverseProfile["safeTrailingRest"], (string | number)[]>
>;
type _11c = Expect<
  Equal<OpenReverseProfile["leadingRest"], (string | number)[]>
>;
type _11d = Expect<
  Equal<
    OpenReverseProfile["middleRest"],
    (string | boolean | number)[]
  >
>;
type _11e = Expect<
  Equal<OpenReverseProfile["neverRest"], string[]>
>;

// 12. Report fresh mutable and explicit readonly results for exact and fallback cases.
export type ReverseMutabilityProfile = TODO; // TODO(koan)

type _12a = Expect<
  Equal<ReverseMutabilityProfile["finiteMutable"], true>
>;
type _12b = Expect<
  Equal<ReverseMutabilityProfile["finiteReadonly"], false>
>;
type _12c = Expect<
  Equal<ReverseMutabilityProfile["fallbackMutable"], true>
>;
type _12d = Expect<
  Equal<ReverseMutabilityProfile["fallbackReadonly"], false>
>;
type _12e = Expect<
  Equal<ReverseMutabilityProfile["readonlyValues"], readonly [2, 1]>
>;

// 13. Distribute reversal so exact and fallback union members can coexist.
export type UnionReverseProfile = TODO; // TODO(koan)

type _13a = Expect<
  Equal<UnionReverseProfile["finite"], [1] | [3, 2]>
>;
type _13b = Expect<Equal<UnionReverseProfile["empty"], [] | [1]>>;
type _13c = Expect<
  Equal<UnionReverseProfile["mixed"], [2, 1] | string[]>
>;
type _13d = Expect<
  Equal<UnionReverseProfile["optional"], [1] | (2 | undefined)[]>
>;
type _13e = Expect<
  Equal<UnionReverseProfile["readonly"], [1] | [3, 2]>
>;

// 14. Separate a whole `never` source from arrays and positions containing it.
export type NeverReverseProfile = TODO; // TODO(koan)

type _14a = Expect<Equal<NeverReverseProfile["whole"], never>>;
type _14b = Expect<Equal<NeverReverseProfile["array"], never[]>>;
type _14c = Expect<Equal<NeverReverseProfile["position"], [1, never]>>;
type _14d = Expect<
  Equal<NeverReverseProfile["optional"], undefined[]>
>;
type _14e = Expect<Equal<NeverReverseProfile["union"], [1]>>;

// 15. Classify `any` and preserve `unknown` through array fallbacks.
export type ExtremeReverseProfile = TODO; // TODO(koan)

type _15a = Expect<Equal<ExtremeReverseProfile["anySource"], true>>;
type _15b = Expect<Equal<ExtremeReverseProfile["anyArray"], true>>;
type _15c = Expect<
  Equal<ExtremeReverseProfile["unknownArray"], unknown[]>
>;
type _15d = Expect<
  Equal<ExtremeReverseProfile["unknownPosition"], [1, unknown]>
>;
type _15e = Expect<
  Equal<ExtremeReverseProfile["optionalUnknown"], unknown[]>
>;

// 16. Distinguish exact involution from fallback loss of positional information.
export type ReverseInvolutionProfile = TODO; // TODO(koan)

type _16a = Expect<
  Equal<ReverseInvolutionProfile["finite"], [1, 2, 3]>
>;
type _16b = Expect<
  Equal<ReverseInvolutionProfile["readonlyFinite"], [1, 2, 3]>
>;
type _16c = Expect<Equal<ReverseInvolutionProfile["broad"], string[]>>;
type _16d = Expect<
  Equal<ReverseInvolutionProfile["optional"], (string | undefined)[]>
>;
type _16e = Expect<
  Equal<ReverseInvolutionProfile["optionalLaw"], false>
>;

// 17. Demonstrate accumulator recursion over a moderate finite tuple.
export type ModerateReverseProfile = TODO; // TODO(koan)

type _17a = Expect<
  Equal<
    ModerateReverseProfile["reversed"],
    [19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0]
  >
>;
type _17b = Expect<Equal<ModerateReverseProfile["first"], 19>>;
type _17c = Expect<Equal<ModerateReverseProfile["last"], 0>>;
type _17d = Expect<Equal<ModerateReverseProfile["length"], 20>>;
type _17e = Expect<
  Equal<ModerateReverseProfile["restored"], GivenTwenty>
>;

// 18. Build the runtime signatures for mutable, readonly, and double reversal.
export type ReverseRuntimeApi = TODO; // TODO(koan)

type _18a = Expect<
  Equal<
    ReverseRuntimeApi["reverseTuple"],
    <const Value extends readonly unknown[]>(
      value: Value,
    ) => GivenReverse<Value>
  >
>;
type _18b = Expect<
  Equal<
    ReverseRuntimeApi["reverseReadonly"],
    <const Value extends readonly unknown[]>(
      value: Value,
    ) => GivenReadonlyReverse<Value>
  >
>;
type _18c = Expect<
  Equal<
    ReverseRuntimeApi["reverseTwice"],
    <const Value extends readonly unknown[]>(
      value: Value,
    ) => GivenReverse<GivenReverse<Value>>
  >
>;
type _18d = Expect<
  Equal<ReturnType<ReverseRuntimeApi["reverseTuple"]>, unknown[]>
>;
type _18e = Expect<
  Equal<
    ReturnType<ReverseRuntimeApi["reverseReadonly"]>,
    readonly unknown[]
  >
>;
