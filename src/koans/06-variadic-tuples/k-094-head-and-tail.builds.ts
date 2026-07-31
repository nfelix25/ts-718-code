import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-094: head and tail — constructions
 * =============================================================================
 *
 * These constructions decompose tuple shapes from the left only when position
 * zero is guaranteed. They extract a precise head and ordered mutable tail,
 * reapply readonly deliberately, distribute over tuple unions, and reject
 * empty tuples, plain arrays, and wholly optional prefixes. They also cover
 * required prefixes before open or middle rests, never-valued heads, any and
 * never inputs, parameter tuples, and repeated decomposition. Replace each
 * `TODO` with a type satisfying the assertions directly below it.
 */

type GivenHead<Value extends readonly unknown[]> =
  Value extends readonly [infer First, ...unknown[]]
    ? First
    : never;

type GivenTail<Value extends readonly unknown[]> =
  Value extends readonly [unknown, ...infer Rest]
    ? Rest
    : never;

type GivenIsAny<Value> =
  0 extends (1 & Value) ? true : false;

type GivenParameters = Parameters<
  (path: string, retries: number, force?: boolean) => void
>;

// ─── Core left decomposition ───────────────────────────────────────────

// 1. Extract position zero when the input guarantees a first value.
export type Head<Value extends readonly unknown[]> = TODO; // TODO(koan)

type _01a = Expect<Equal<Head<[1]>, 1>>;
type _01b = Expect<Equal<Head<[1, 2, 3]>, 1>>;
type _01c = Expect<Equal<Head<readonly ["x", true]>, "x">>;
type _01d = Expect<Equal<Head<[]>, never>>;
type _01e = Expect<
  Equal<Head<[] | [1] | [2, 3]>, 1 | 2>
>;

// 2. Remove the guaranteed first position and preserve every remaining position.
export type Tail<Value extends readonly unknown[]> = TODO; // TODO(koan)

type _02a = Expect<Equal<Tail<[1]>, []>>;
type _02b = Expect<Equal<Tail<[1, 2, 3]>, [2, 3]>>;
type _02c = Expect<
  Equal<Tail<readonly ["x", true, 3]>, [true, 3]>
>;
type _02d = Expect<
  Equal<Tail<[head: string, value?: number]>, [value?: number]>
>;
type _02e = Expect<
  Equal<Tail<[] | [1] | [2, 3]>, [] | [3]>
>;

// 3. Reapply readonly to the mutable tail inferred from a readonly input.
export type ReadonlyTail<Value extends readonly unknown[]> = TODO; // TODO(koan)

type _03a = Expect<
  Equal<ReadonlyTail<readonly [1, 2, 3]>, readonly [2, 3]>
>;
type _03b = Expect<
  Equal<ReadonlyTail<[1]>, readonly []>
>;
type _03c = Expect<
  Equal<
    ReadonlyTail<[head: string, value?: number]>,
    readonly [value?: number]
  >
>;
type _03d = Expect<
  Equal<
    ReadonlyTail<[head: 0, ...tail: 1[]]>,
    readonly 1[]
  >
>;
type _03e = Expect<Equal<ReadonlyTail<[]>, never>>;

// 4. Capture the head and tail together in one labeled result tuple.
export type SplitHeadTail<Value extends readonly unknown[]> = TODO; // TODO(koan)

type _04a = Expect<
  Equal<SplitHeadTail<[1]>, [head: 1, tail: []]>
>;
type _04b = Expect<
  Equal<
    SplitHeadTail<readonly ["x", true, 3]>,
    [head: "x", tail: [true, 3]]
  >
>;
type _04c = Expect<
  Equal<
    SplitHeadTail<[head: string, ...tail: number[]]>,
    [head: string, tail: number[]]
  >
>;
type _04d = Expect<Equal<SplitHeadTail<[]>, never>>;
type _04e = Expect<
  Equal<
    SplitHeadTail<[1] | [2, 3]>,
    [head: 1, tail: []] | [head: 2, tail: [3]]
  >
>;

// 5. Reconstruct any guaranteed nonempty tuple from its inferred pieces.
export type RebuildFromHead<Value extends readonly unknown[]> = TODO; // TODO(koan)

type _05a = Expect<Equal<RebuildFromHead<[1]>, [1]>>;
type _05b = Expect<
  Equal<RebuildFromHead<readonly [1, 2, 3]>, [1, 2, 3]>
>;
type _05c = Expect<
  Equal<
    RebuildFromHead<[head: string, value?: number]>,
    [string, value?: number]
  >
>;
type _05d = Expect<
  Equal<
    RebuildFromHead<[head: string, ...tail: number[]]>,
    [string, ...number[]]
  >
>;
type _05e = Expect<Equal<RebuildFromHead<string[]>, never>>;

// 6. Extract the second required position by taking the head of the first tail.
export type Second<Value extends readonly unknown[]> = TODO; // TODO(koan)

type _06a = Expect<Equal<Second<[1, 2]>, 2>>;
type _06b = Expect<Equal<Second<[1, 2, 3]>, 2>>;
type _06c = Expect<
  Equal<Second<readonly ["x", true]>, true>
>;
type _06d = Expect<Equal<Second<[1]>, never>>;
type _06e = Expect<
  Equal<Second<[1, 2] | [3, 4, 5]>, 2 | 4>
>;

// 7. Remove two guaranteed positions by applying tail decomposition twice.
export type DropTwo<Value extends readonly unknown[]> = TODO; // TODO(koan)

type _07a = Expect<Equal<DropTwo<[1, 2]>, []>>;
type _07b = Expect<Equal<DropTwo<[1, 2, 3, 4]>, [3, 4]>>;
type _07c = Expect<
  Equal<DropTwo<readonly ["x", true, 3]>, [3]>
>;
type _07d = Expect<Equal<DropTwo<[1]>, never>>;
type _07e = Expect<
  Equal<
    DropTwo<[1, 2] | [3, 4, 5]>,
    [] | [5]
  >
>;

// ─── Parameter and helper tuple surfaces ───────────────────────────────

// 8. Extract the first parameter type from a call signature.
export type FirstParameter<
  FunctionType extends (...arguments_: never[]) => unknown,
> = TODO; // TODO(koan)

type _08a = Expect<Equal<FirstParameter<(path: string) => void>, string>>;
type _08b = Expect<
  Equal<
    FirstParameter<(path: string, retries: number) => void>,
    string
  >
>;
type _08c = Expect<
  Equal<FirstParameter<(value: 42) => 42>, 42>
>;
type _08d = Expect<Equal<FirstParameter<() => void>, never>>;
type _08e = Expect<
  Equal<
    FirstParameter<
      ((value: "a") => void) | ((value: "b", flag: true) => void)
    >,
    "a" | "b"
  >
>;

// 9. Remove the first parameter and preserve the remaining parameter tuple.
export type RemainingParameters<
  FunctionType extends (...arguments_: never[]) => unknown,
> = TODO; // TODO(koan)

type _09a = Expect<
  Equal<RemainingParameters<(path: string) => void>, []>
>;
type _09b = Expect<
  Equal<
    RemainingParameters<(path: string, retries: number) => void>,
    [retries: number]
  >
>;
type _09c = Expect<
  Equal<
    RemainingParameters<
      (path: string, retries: number, force?: boolean) => void
    >,
    [retries: number, force?: boolean | undefined]
  >
>;
type _09d = Expect<Equal<RemainingParameters<() => void>, never>>;
type _09e = Expect<
  Equal<
    RemainingParameters<
      ((value: "a") => void) | ((value: "b", flag: true) => void)
    >,
    [] | [flag: true]
  >
>;

// 10. Build the runtime helper return shapes from one nonempty input tuple.
export type HeadTailHelperProfile = TODO; // TODO(koan)

type _10a = Expect<Equal<HeadTailHelperProfile["first"], "a">>;
type _10b = Expect<Equal<HeadTailHelperProfile["dropped"], [1, true]>>;
type _10c = Expect<
  Equal<
    HeadTailHelperProfile["shifted"],
    [head: "a", tail: [1, true]]
  >
>;
type _10d = Expect<Equal<HeadTailHelperProfile["singletonTail"], []>>;
type _10e = Expect<
  Equal<HeadTailHelperProfile["arrayFallback"], string | undefined>
>;

// ─── Guaranteed positions and distributed failure ─────────────────────

// 11. Describe inputs that do or do not prove a guaranteed first position.
export type NonemptyProofProfile = TODO; // TODO(koan)

type _11a = Expect<Equal<NonemptyProofProfile["emptyHead"], never>>;
type _11b = Expect<Equal<NonemptyProofProfile["arrayHead"], never>>;
type _11c = Expect<Equal<NonemptyProofProfile["optionalHead"], never>>;
type _11d = Expect<
  Equal<NonemptyProofProfile["readonlyArrayTail"], never>
>;
type _11e = Expect<
  Equal<
    NonemptyProofProfile["requiredOptionalTail"],
    [optional?: number]
  >
>;

// 12. Decompose required prefixes before trailing and middle rest regions.
export type RequiredPrefixProfile = TODO; // TODO(koan)

type _12a = Expect<
  Equal<RequiredPrefixProfile["trailingHead"], string>
>;
type _12b = Expect<
  Equal<RequiredPrefixProfile["trailingTail"], number[]>
>;
type _12c = Expect<
  Equal<
    RequiredPrefixProfile["twoRequiredTail"],
    [second: number, ...rest: boolean[]]
  >
>;
type _12d = Expect<
  Equal<RequiredPrefixProfile["middleHead"], string>
>;
type _12e = Expect<
  Equal<
    RequiredPrefixProfile["middleTail"],
    [...middle: boolean[], last: number]
  >
>;

// 13. Preserve results from matching union members and drop failed branches.
export type DistributedDecompositionProfile = TODO; // TODO(koan)

type _13a = Expect<
  Equal<DistributedDecompositionProfile["heads"], 1 | 2>
>;
type _13b = Expect<
  Equal<DistributedDecompositionProfile["tails"], [] | [3]>
>;
type _13c = Expect<
  Equal<DistributedDecompositionProfile["arrayFilteredHead"], 1>
>;
type _13d = Expect<
  Equal<DistributedDecompositionProfile["arrayFilteredTail"], [2]>
>;
type _13e = Expect<
  Equal<DistributedDecompositionProfile["openHeads"], 1 | 2>
>;

// 14. Show where never results erase the difference between failure and presence.
export type NeverHeadProfile = TODO; // TODO(koan)

type _14a = Expect<Equal<NeverHeadProfile["emptyHead"], never>>;
type _14b = Expect<Equal<NeverHeadProfile["presentNeverHead"], never>>;
type _14c = Expect<Equal<NeverHeadProfile["emptyTail"], never>>;
type _14d = Expect<Equal<NeverHeadProfile["presentNeverTail"], []>>;
type _14e = Expect<Equal<NeverHeadProfile["filteredUnionHead"], 1>>;

// 15. Describe readonly loss during inference and deliberate reapplication.
export type ReadonlyInferenceProfile = TODO; // TODO(koan)

type _15a = Expect<
  Equal<ReadonlyInferenceProfile["inferredTail"], [2]>
>;
type _15b = Expect<
  Equal<ReadonlyInferenceProfile["readonlyTail"], readonly [2]>
>;
type _15c = Expect<
  Equal<ReadonlyInferenceProfile["inferredHasPush"], true>
>;
type _15d = Expect<
  Equal<ReadonlyInferenceProfile["readonlyFitsInferred"], false>
>;
type _15e = Expect<
  Equal<ReadonlyInferenceProfile["inferredFitsReadonly"], true>
>;

// 16. Classify any, never, and unknown at the decomposition boundary safely.
export type SpecialDecompositionProfile = TODO; // TODO(koan)

type _16a = Expect<
  Equal<SpecialDecompositionProfile["anyHeadIsAny"], false>
>;
type _16b = Expect<
  Equal<SpecialDecompositionProfile["anyTailIsAny"], false>
>;
type _16c = Expect<
  Equal<SpecialDecompositionProfile["neverHead"], never>
>;
type _16d = Expect<
  Equal<SpecialDecompositionProfile["neverTail"], never>
>;
type _16e = Expect<
  Equal<SpecialDecompositionProfile["unknownHead"], unknown>
>;

// 17. Repeatedly decompose a realistic required-plus-optional parameter tuple.
export type RecursiveParameterProfile = TODO; // TODO(koan)

type _17a = Expect<
  Equal<
    RecursiveParameterProfile["parameters"],
    [path: string, retries: number, force?: boolean | undefined]
  >
>;
type _17b = Expect<Equal<RecursiveParameterProfile["head"], string>>;
type _17c = Expect<
  Equal<
    RecursiveParameterProfile["tail"],
    [retries: number, force?: boolean | undefined]
  >
>;
type _17d = Expect<Equal<RecursiveParameterProfile["second"], number>>;
type _17e = Expect<
  Equal<
    RecursiveParameterProfile["finalTail"],
    [force?: boolean | undefined]
  >
>;

// 18. Build one complete decomposition view for a readonly tuple or array.
export type HeadTailSummary<Value extends readonly unknown[]> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<
    HeadTailSummary<readonly [name: string, score: number]>,
    {
      value: readonly [name: string, score: number];
      head: string;
      tail: [score: number];
      readonlyTail: readonly [score: number];
      decomposable: true;
    }
  >
>;
type _18b = Expect<
  Equal<
    HeadTailSummary<[]>["head" | "tail" | "decomposable"],
    false
  >
>;
type _18c = Expect<
  Equal<
    HeadTailSummary<string[]>["head" | "tail" | "decomposable"],
    false
  >
>;
type _18d = Expect<
  Equal<
    HeadTailSummary<[head: 0, ...tail: 1[]]>["head" | "tail"],
    0 | 1[]
  >
>;
type _18e = Expect<
  Equal<
    HeadTailSummary<[1] | [2, 3]>["head" | "tail"],
    1 | 2 | [] | [3]
  >
>;
