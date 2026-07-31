import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-098: tuple concat — constructions
 * =============================================================================
 *
 * These constructions treat tuple concatenation as an algebra over finite,
 * optional, open, union, and recursive chunk shapes. They preserve positions
 * and labels where the compiler can do so, make output mutability an explicit
 * policy, and account for normalization when a spread has no fixed length.
 * Replace each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenConcat<
  Left extends readonly unknown[],
  Right extends readonly unknown[],
> = [...Left, ...Right];

type GivenReadonlyConcat<
  Left extends readonly unknown[],
  Right extends readonly unknown[],
> = readonly [...Left, ...Right];

type GivenConcatLikeLeft<
  Left extends readonly unknown[],
  Right extends readonly unknown[],
> = Left extends unknown[]
  ? [...Left, ...Right]
  : readonly [...Left, ...Right];

type GivenConcatMany<
  Chunks extends readonly (readonly unknown[])[],
> = number extends Chunks["length"]
  ? Chunks[number][number][]
  : Chunks extends readonly [
    infer Head extends readonly unknown[],
    ...infer Tail extends readonly (readonly unknown[])[],
  ]
    ? [...Head, ...GivenConcatMany<Tail>]
    : [];

type GivenIsAny<Value> =
  0 extends (1 & Value) ? true : false;

// ─── Finite concatenation and output policy ────────────────────────────

// 1. Concatenate two tuple or array shapes into one fresh mutable shape.
export type TupleConcat<
  Left extends readonly unknown[],
  Right extends readonly unknown[],
> = TODO; // TODO(koan)

type _01a = Expect<Equal<TupleConcat<[], []>, []>>;
type _01b = Expect<Equal<TupleConcat<[], [1, 2]>, [1, 2]>>;
type _01c = Expect<Equal<TupleConcat<[1, 2], []>, [1, 2]>>;
type _01d = Expect<
  Equal<TupleConcat<[left: 1, middle: "a"], [right: true]>, [1, "a", true]>
>;
type _01e = Expect<
  Equal<TupleConcat<readonly [1], readonly [2]>, [1, 2]>
>;

// 2. Concatenate two shapes while promising a readonly result.
export type ReadonlyTupleConcat<
  Left extends readonly unknown[],
  Right extends readonly unknown[],
> = TODO; // TODO(koan)

type _02a = Expect<
  Equal<ReadonlyTupleConcat<[], []>, readonly []>
>;
type _02b = Expect<
  Equal<ReadonlyTupleConcat<[1], [2, 3]>, readonly [1, 2, 3]>
>;
type _02c = Expect<
  Equal<
    ReadonlyTupleConcat<readonly [1], readonly [2]>,
    readonly [1, 2]
  >
>;
type _02d = Expect<
  Equal<ReadonlyTupleConcat<string[], [number]>, readonly [...string[], number]>
>;
type _02e = Expect<
  Equal<"push" extends keyof ReadonlyTupleConcat<[1], [2]> ? true : false, false>
>;

// 3. Follow the left operand's mutable or readonly capability.
export type TupleConcatLikeLeft<
  Left extends readonly unknown[],
  Right extends readonly unknown[],
> = TODO; // TODO(koan)

type _03a = Expect<
  Equal<TupleConcatLikeLeft<[1], [2]>, [1, 2]>
>;
type _03b = Expect<
  Equal<TupleConcatLikeLeft<[1], readonly [2]>, [1, 2]>
>;
type _03c = Expect<
  Equal<TupleConcatLikeLeft<readonly [1], [2]>, readonly [1, 2]>
>;
type _03d = Expect<
  Equal<
    TupleConcatLikeLeft<readonly [1], readonly [2]>,
    readonly [1, 2]
  >
>;
type _03e = Expect<
  Equal<
    TupleConcatLikeLeft<[1] | readonly [2], [3]>,
    [1, 3] | readonly [2, 3]
  >
>;

// 4. Prepend one element to any readonly-compatible tuple shape.
export type PrependWithConcat<
  Item,
  Values extends readonly unknown[],
> = TODO; // TODO(koan)

type _04a = Expect<Equal<PrependWithConcat<1, []>, [1]>>;
type _04b = Expect<
  Equal<PrependWithConcat<1, [2, 3]>, [1, 2, 3]>
>;
type _04c = Expect<
  Equal<PrependWithConcat<1, readonly [2]>, [1, 2]>
>;
type _04d = Expect<
  Equal<PrependWithConcat<1, string[]>, [1, ...string[]]>
>;
type _04e = Expect<
  Equal<PrependWithConcat<1 | 2, [3]>, [1 | 2, 3]>
>;

// 5. Append one element after any readonly-compatible tuple shape.
export type AppendWithConcat<
  Values extends readonly unknown[],
  Item,
> = TODO; // TODO(koan)

type _05a = Expect<Equal<AppendWithConcat<[], 1>, [1]>>;
type _05b = Expect<
  Equal<AppendWithConcat<[1, 2], 3>, [1, 2, 3]>
>;
type _05c = Expect<
  Equal<AppendWithConcat<readonly [1], 2>, [1, 2]>
>;
type _05d = Expect<
  Equal<AppendWithConcat<string[], number>, [...string[], number]>
>;
type _05e = Expect<
  Equal<AppendWithConcat<[1] | [2, 3], 4>, [1, 4] | [2, 3, 4]>
>;

// ─── Derived finite facts and algebraic laws ──────────────────────────

// 6. Return the element domain admitted anywhere in a concatenated result.
export type ConcatElements<
  Left extends readonly unknown[],
  Right extends readonly unknown[],
> = TODO; // TODO(koan)

type _06a = Expect<Equal<ConcatElements<[], []>, never>>;
type _06b = Expect<
  Equal<ConcatElements<[1, "a"], [true]>, 1 | "a" | true>
>;
type _06c = Expect<
  Equal<ConcatElements<[value?: string], [number]>, string | number | undefined>
>;
type _06d = Expect<
  Equal<ConcatElements<string[], number[]>, string | number>
>;
type _06e = Expect<
  Equal<ConcatElements<[1] | [2], [3] | [4]>, 1 | 2 | 3 | 4>
>;

// 7. Return the exact or open length domain of a concatenated result.
export type ConcatLength<
  Left extends readonly unknown[],
  Right extends readonly unknown[],
> = TODO; // TODO(koan)

type _07a = Expect<Equal<ConcatLength<[], []>, 0>>;
type _07b = Expect<Equal<ConcatLength<[1, 2], [3, 4]>, 4>>;
type _07c = Expect<
  Equal<ConcatLength<[a?: 1], [b: 2]>, 2>
>;
type _07d = Expect<Equal<ConcatLength<string[], [1]>, number>>;
type _07e = Expect<
  Equal<ConcatLength<[1] | [1, 2], [3]>, 2 | 3>
>;

// 8. Describe left and right empty identity, including readonly qualification.
export type ConcatIdentityProfile<
  Values extends readonly unknown[],
> = TODO; // TODO(koan)

type _08a = Expect<
  Equal<ConcatIdentityProfile<[1, 2]>["left"], [1, 2]>
>;
type _08b = Expect<
  Equal<ConcatIdentityProfile<[1, 2]>["rightLaw"], true>
>;
type _08c = Expect<
  Equal<ConcatIdentityProfile<readonly [1, 2]>["left"], [1, 2]>
>;
type _08d = Expect<
  Equal<ConcatIdentityProfile<readonly [1, 2]>["leftLaw"], false>
>;
type _08e = Expect<
  Equal<
    ConcatIdentityProfile<readonly [1, 2]>["readonlyLeft"],
    readonly [1, 2]
  >
>;

// 9. Describe both groupings and the law for three concatenated operands.
export type ConcatAssociativityProfile<
  First extends readonly unknown[],
  Second extends readonly unknown[],
  Third extends readonly unknown[],
> = TODO; // TODO(koan)

type _09a = Expect<
  Equal<ConcatAssociativityProfile<[1], [2], [3]>["left"], [1, 2, 3]>
>;
type _09b = Expect<
  Equal<ConcatAssociativityProfile<[1], [2], [3]>["right"], [1, 2, 3]>
>;
type _09c = Expect<
  Equal<ConcatAssociativityProfile<[1], [2], [3]>["law"], true>
>;
type _09d = Expect<
  Equal<
    ConcatAssociativityProfile<[0], 1[], [2]>["elements"],
    0 | 1 | 2
  >
>;
type _09e = Expect<
  Equal<ConcatAssociativityProfile<[0], 1[], [2]>["length"], number>
>;

// ─── Spread normalization and special operands ───────────────────────

// 10. Construct the characteristic normal forms produced by open spreads.
export type OpenConcatProfile = TODO; // TODO(koan)

type _10a = Expect<
  Equal<OpenConcatProfile["fixedThenOpen"], [0, ...1[]]>
>;
type _10b = Expect<
  Equal<OpenConcatProfile["openThenFixed"], [...1[], 2]>
>;
type _10c = Expect<
  Equal<OpenConcatProfile["openThenOpen"], (1 | 2)[]>
>;
type _10d = Expect<
  Equal<OpenConcatProfile["absorbedSuffix"], [0, ...(1 | 2)[]]>
>;
type _10e = Expect<
  Equal<OpenConcatProfile["leadingRestSuffix"], [...(1 | 2)[], 3]>
>;

// 11. Construct optional-element forms before and after required positions.
export type OptionalConcatProfile = TODO; // TODO(koan)

type _11a = Expect<
  Equal<OptionalConcatProfile["identity"], [value?: string]>
>;
type _11b = Expect<
  Equal<OptionalConcatProfile["beforeRequired"], [a: 1 | undefined, b: 2]>
>;
type _11c = Expect<
  Equal<OptionalConcatProfile["afterRequired"], [a: 1, b?: 2]>
>;
type _11d = Expect<
  Equal<OptionalConcatProfile["bothOptional"], [a?: 1, b?: 2]>
>;
type _11e = Expect<
  Equal<
    OptionalConcatProfile["twoBeforeRequired"],
    [a: 1 | undefined, b: 2 | undefined, c: 3]
  >
>;

// 12. Form every branch combination when either operand is a tuple union.
export type ConcatUnionProfile = TODO; // TODO(koan)

type _12a = Expect<
  Equal<ConcatUnionProfile["left"], [1, 3] | [2, 3]>
>;
type _12b = Expect<
  Equal<ConcatUnionProfile["right"], [1, 2] | [1, 3]>
>;
type _12c = Expect<
  Equal<
    ConcatUnionProfile["cross"],
    [1, 3] | [1, 4] | [2, 3] | [2, 4]
  >
>;
type _12d = Expect<
  Equal<ConcatUnionProfile["emptyBranch"], [2] | [1, 2]>
>;
type _12e = Expect<
  Equal<ConcatUnionProfile["mixedLength"], 2 | 3>
>;

// 13. Separate a whole `never` operand from an open `never[]` operand.
export type NeverConcatProfile = TODO; // TODO(koan)

type _13a = Expect<Equal<NeverConcatProfile["wholeLeft"], never>>;
type _13b = Expect<Equal<NeverConcatProfile["wholeRight"], never>>;
type _13c = Expect<
  Equal<NeverConcatProfile["openLeft"], [...never[], 1]>
>;
type _13d = Expect<
  Equal<NeverConcatProfile["openRight"], [1, ...never[]]>
>;
type _13e = Expect<Equal<NeverConcatProfile["openElements"], 1>>;

// 14. Classify `any` while preserving the distinct `unknown` normalizations.
export type ExtremeConcatProfile = TODO; // TODO(koan)

type _14a = Expect<Equal<ExtremeConcatProfile["anyOnLeft"], true>>;
type _14b = Expect<Equal<ExtremeConcatProfile["anyOnRight"], true>>;
type _14c = Expect<Equal<ExtremeConcatProfile["unknownOnLeft"], unknown>>;
type _14d = Expect<Equal<ExtremeConcatProfile["unknownOnRight"], unknown>>;
type _14e = Expect<Equal<ExtremeConcatProfile["neverAndUnknown"], unknown>>;

// 15. Report write capability under the three concat mutability policies.
export type ConcatMutabilityProfile<
  Left extends readonly unknown[],
  Right extends readonly unknown[],
> = TODO; // TODO(koan)

type _15a = Expect<
  Equal<ConcatMutabilityProfile<[1], [2]>["freshIsMutable"], true>
>;
type _15b = Expect<
  Equal<ConcatMutabilityProfile<[1], [2]>["readonlyIsMutable"], false>
>;
type _15c = Expect<
  Equal<ConcatMutabilityProfile<[1], [2]>["likeLeftIsMutable"], true>
>;
type _15d = Expect<
  Equal<
    ConcatMutabilityProfile<readonly [1], [2]>["likeLeftIsMutable"],
    false
  >
>;
type _15e = Expect<
  Equal<
    ConcatMutabilityProfile<readonly [1], readonly [2]>["readonlyValues"],
    readonly [1, 2]
  >
>;

// ─── Recursive chunk concatenation and runtime surface ────────────────

// 16. Recursively concatenate finite chunks, with an element-domain fallback.
export type TupleConcatMany<
  Chunks extends readonly (readonly unknown[])[],
> = TODO; // TODO(koan)

type _16a = Expect<Equal<TupleConcatMany<[]>, []>>;
type _16b = Expect<
  Equal<TupleConcatMany<[[1], [2, 3], [], [4]]>, [1, 2, 3, 4]>
>;
type _16c = Expect<
  Equal<
    TupleConcatMany<readonly [readonly [1], readonly ["a", true]]>,
    [1, "a", true]
  >
>;
type _16d = Expect<
  Equal<TupleConcatMany<[[1] | [2], [3]]>, [1, 3] | [2, 3]>
>;
type _16e = Expect<Equal<TupleConcatMany<string[][]>, string[]>>;

// 17. Describe finite recursive results through empty, open, and optional chunks.
export type FiniteConcatManyProfile = TODO; // TODO(koan)

type _17a = Expect<
  Equal<FiniteConcatManyProfile["empties"], [1]>
>;
type _17b = Expect<
  Equal<FiniteConcatManyProfile["labels"], [a: string, b: number]>
>;
type _17c = Expect<
  Equal<FiniteConcatManyProfile["open"], [1, ...(2 | 3)[]]>
>;
type _17d = Expect<
  Equal<FiniteConcatManyProfile["optional"], [a: 1 | undefined, b: 2]>
>;
type _17e = Expect<Equal<FiniteConcatManyProfile["length"], 4>>;

// 18. Describe broad recursive fallbacks and classify their element domains.
export type BroadConcatManyProfile = TODO; // TODO(koan)

type _18a = Expect<Equal<BroadConcatManyProfile["strings"], string[]>>;
type _18b = Expect<
  Equal<BroadConcatManyProfile["mixed"], (string | number)[]>
>;
type _18c = Expect<Equal<BroadConcatManyProfile["unknowns"], unknown[]>>;
type _18d = Expect<Equal<BroadConcatManyProfile["nevers"], never[]>>;
type _18e = Expect<Equal<BroadConcatManyProfile["anyElement"], true>>;

// 19. Build the generic runtime API signatures backed by the concat types.
export type ConcatRuntimeApi = TODO; // TODO(koan)

type _19a = Expect<
  Equal<
    ConcatRuntimeApi["concat"],
    <
      const Left extends readonly unknown[],
      const Right extends readonly unknown[],
    >(
      left: Left,
      right: Right,
    ) => [...Left, ...Right]
  >
>;
type _19b = Expect<
  Equal<
    ConcatRuntimeApi["concatMany"],
    <const Chunks extends readonly (readonly unknown[])[]>(
      ...chunks: Chunks
    ) => GivenConcatMany<Chunks>
  >
>;
type _19c = Expect<
  Equal<
    ConcatRuntimeApi["concatReadonly"],
    <
      const Left extends readonly unknown[],
      const Right extends readonly unknown[],
    >(
      left: Left,
      right: Right,
    ) => readonly [...Left, ...Right]
  >
>;
type _19d = Expect<
  Equal<ReturnType<ConcatRuntimeApi["concat"]>, unknown[]>
>;
type _19e = Expect<
  Equal<
    ReturnType<ConcatRuntimeApi["concatReadonly"]>,
    readonly unknown[]
  >
>;
