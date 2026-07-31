import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-097: tuple length and indexing — constructions
 * =============================================================================
 *
 * These constructions keep three tuple facts separate: admitted lengths,
 * arbitrary numeric element values, and stable tuple-specific positions.
 * String position keys are parsed into numeric literals, while distributive
 * indexing gathers possible positions across tuple unions. The exercises also
 * cover optional and open regions, leading-rest suffixes, readonly and mutable
 * key surfaces, special inputs, safe runtime indexing, length refinement, and
 * position/value correlation. Replace each `TODO` with a type satisfying the
 * assertions directly below it.
 */

type GivenKeyStrings<Value extends readonly unknown[]> =
  Exclude<keyof Value, keyof readonly unknown[]>;

type GivenMutableOnlyKeys =
  Exclude<keyof unknown[], keyof readonly unknown[]>;

type GivenStringToNumber<Value> =
  Value extends `${infer Numeric extends number}`
    ? Numeric
    : never;

type GivenIndices<Value extends readonly unknown[]> =
  GivenStringToNumber<GivenKeyStrings<Value>>;

type GivenDistributedIndices<Value extends readonly unknown[]> =
  Value extends unknown ? GivenIndices<Value> : never;

type GivenFiniteLength<Value extends readonly unknown[]> =
  number extends Value["length"] ? never : Value["length"];

type GivenIsAny<Value> =
  0 extends (1 & Value) ? true : false;

// ─── Stable keys and numeric indices ───────────────────────────────────

// 1. Subtract readonly-array keys, retaining positions and mutable-only methods.
export type TupleKeyStrings<Value extends readonly unknown[]> = TODO; // TODO(koan)

type _01a = Expect<
  Equal<TupleKeyStrings<[]>, GivenMutableOnlyKeys>
>;
type _01b = Expect<
  Equal<
    TupleKeyStrings<[string, number]>,
    "0" | "1" | GivenMutableOnlyKeys
  >
>;
type _01c = Expect<
  Equal<
    TupleKeyStrings<readonly [string, number, boolean]>,
    "0" | "1" | "2"
  >
>;
type _01d = Expect<
  Equal<
    TupleKeyStrings<[head: string, ...tail: number[]]>,
    "0" | GivenMutableOnlyKeys
  >
>;
type _01e = Expect<
  Equal<TupleKeyStrings<readonly string[]>, never>
>;

// 2. Parse numeric-looking string literals into numeric literal types.
export type StringToNumber<Value> = TODO; // TODO(koan)

type _02a = Expect<Equal<StringToNumber<"0">, 0>>;
type _02b = Expect<Equal<StringToNumber<"42">, 42>>;
type _02c = Expect<Equal<StringToNumber<"-3.5">, -3.5>>;
type _02d = Expect<
  Equal<StringToNumber<"0" | "2" | "x">, 0 | 2>
>;
type _02e = Expect<
  Equal<StringToNumber<never | "length" | symbol>, never>
>;

// 3. Convert a tuple's stable numeric string keys into numeric literal indices.
export type TupleIndices<Value extends readonly unknown[]> = TODO; // TODO(koan)

type _03a = Expect<Equal<TupleIndices<[]>, never>>;
type _03b = Expect<Equal<TupleIndices<[string]>, 0>>;
type _03c = Expect<
  Equal<TupleIndices<[string, number, boolean]>, 0 | 1 | 2>
>;
type _03d = Expect<
  Equal<TupleIndices<readonly [string, number]>, 0 | 1>
>;
type _03e = Expect<Equal<TupleIndices<string[]>, never>>;

// 4. Gather every stable index from every member of a tuple union.
export type DistributedTupleIndices<
  Value extends readonly unknown[],
> = TODO; // TODO(koan)

type _04a = Expect<
  Equal<DistributedTupleIndices<[1] | [1, 2]>, 0 | 1>
>;
type _04b = Expect<
  Equal<DistributedTupleIndices<[] | [1]>, 0>
>;
type _04c = Expect<
  Equal<DistributedTupleIndices<[1, 2] | [3, 4]>, 0 | 1>
>;
type _04d = Expect<
  Equal<DistributedTupleIndices<[1] | string[]>, 0>
>;
type _04e = Expect<Equal<DistributedTupleIndices<never>, never>>;

// 5. Keep finite literal length domains and reject an open `number` length.
export type FiniteLength<Value extends readonly unknown[]> = TODO; // TODO(koan)

type _05a = Expect<Equal<FiniteLength<[]>, 0>>;
type _05b = Expect<Equal<FiniteLength<[1, 2]>, 2>>;
type _05c = Expect<
  Equal<FiniteLength<[a: 1, b?: 2]>, 1 | 2>
>;
type _05d = Expect<Equal<FiniteLength<string[]>, never>>;
type _05e = Expect<
  Equal<FiniteLength<[1] | [1, 2]>, 1 | 2>
>;

// ─── Indexed access and correlated entries ─────────────────────────────

// 6. Read a value only through one of the tuple's stable finite indices.
export type TupleAt<
  Value extends readonly unknown[],
  Index extends GivenIndices<Value>,
> = TODO; // TODO(koan)

type _06a = Expect<
  Equal<TupleAt<readonly ["a", 1], 0>, "a">
>;
type _06b = Expect<
  Equal<TupleAt<readonly ["a", 1], 1>, 1>
>;
type _06c = Expect<
  Equal<TupleAt<[head: string, tail?: number], 1>, number | undefined>
>;
type _06d = Expect<
  Equal<TupleAt<[head: string, ...tail: number[]], 0>, string>
>;
type _06e = Expect<
  Equal<TupleAt<[1] | [2, 3], 0>, 1 | 2>
>;

// 7. Build the possible result of an unchecked numeric runtime access.
export type SafeTupleValue<Value extends readonly unknown[]> = TODO; // TODO(koan)

type _07a = Expect<
  Equal<SafeTupleValue<readonly ["a", 1]>, "a" | 1 | undefined>
>;
type _07b = Expect<Equal<SafeTupleValue<[]>, undefined>>;
type _07c = Expect<
  Equal<SafeTupleValue<[value?: string]>, string | undefined>
>;
type _07d = Expect<
  Equal<
    SafeTupleValue<[head: string, ...tail: number[]]>,
    string | number | undefined
  >
>;
type _07e = Expect<
  Equal<SafeTupleValue<readonly unknown[]>, unknown>
>;

// 8. Build the runtime enumeration result from numeric indices and element values.
export type EnumeratedTuple<
  Value extends readonly unknown[],
> = TODO; // TODO(koan)

type _08a = Expect<
  Equal<
    EnumeratedTuple<readonly ["a", 1, true]>,
    Array<[index: number, value: "a" | 1 | true]>
  >
>;
type _08b = Expect<
  Equal<EnumeratedTuple<[]>, Array<[index: number, value: never]>>
>;
type _08c = Expect<
  Equal<
    EnumeratedTuple<[value?: string]>,
    Array<[index: number, value: string | undefined]>
  >
>;
type _08d = Expect<
  Equal<
    EnumeratedTuple<[head: 1, ...tail: 2[]]>,
    Array<[index: number, value: 1 | 2]>
  >
>;
type _08e = Expect<
  Equal<
    EnumeratedTuple<readonly unknown[]>,
    Array<[index: number, value: unknown]>
  >
>;

// 9. Map only stable indices to correlated numeric-index/value alternatives.
export type StableIndexChoice<Value extends readonly unknown[]> = TODO; // TODO(koan)

type _09a = Expect<Equal<StableIndexChoice<[]>, never>>;
type _09b = Expect<
  Equal<
    StableIndexChoice<[1]>,
    { index: 0; value: 1 }
  >
>;
type _09c = Expect<
  Equal<
    StableIndexChoice<readonly ["a", 1]>,
    { index: 0; value: "a" } | { index: 1; value: 1 }
  >
>;
type _09d = Expect<
  Equal<
    StableIndexChoice<[head: string, tail?: number]>,
    | { index: 0; value: string }
    | { index: 1; value: number | undefined }
  >
>;
type _09e = Expect<
  Equal<
    StableIndexChoice<[head: string, ...tail: number[]]>,
    { index: 0; value: string }
  >
>;

// ─── Length and region profiles ────────────────────────────────────────

// 10. Describe exact, optional, open, union, and unusual length domains.
export type TupleLengthProfile = TODO; // TODO(koan)

type _10a = Expect<Equal<TupleLengthProfile["empty"], 0>>;
type _10b = Expect<Equal<TupleLengthProfile["exact"], 3>>;
type _10c = Expect<
  Equal<TupleLengthProfile["optional"], 1 | 2 | 3>
>;
type _10d = Expect<Equal<TupleLengthProfile["open"], number>>;
type _10e = Expect<Equal<TupleLengthProfile["union"], 1 | 2>>;

// 11. Describe stable optional indices, reads, lengths, and omission.
export type OptionalIndexProfile = TODO; // TODO(koan)

type _11a = Expect<Equal<OptionalIndexProfile["indices"], 0 | 1>>;
type _11b = Expect<Equal<OptionalIndexProfile["length"], 1 | 2>>;
type _11c = Expect<
  Equal<OptionalIndexProfile["tailRead"], number | undefined>
>;
type _11d = Expect<Equal<OptionalIndexProfile["hasTailIndex"], true>>;
type _11e = Expect<Equal<OptionalIndexProfile["omitted"], true>>;

// 12. Separate a trailing rest's stable prefix from arbitrary numeric positions.
export type OpenTailIndexProfile = TODO; // TODO(koan)

type _12a = Expect<Equal<OpenTailIndexProfile["indices"], 0>>;
type _12b = Expect<
  Equal<OpenTailIndexProfile["elements"], string | number>
>;
type _12c = Expect<Equal<OpenTailIndexProfile["oneIsStable"], false>>;
type _12d = Expect<Equal<OpenTailIndexProfile["oneIsKey"], true>>;
type _12e = Expect<Equal<OpenTailIndexProfile["stringOneIsKey"], false>>;

// 13. Show that a leading rest leaves no stable literal position for its suffix.
export type OpenHeadIndexProfile = TODO; // TODO(koan)

type _13a = Expect<Equal<OpenHeadIndexProfile["indices"], never>>;
type _13b = Expect<
  Equal<OpenHeadIndexProfile["elements"], string | number>
>;
type _13c = Expect<Equal<OpenHeadIndexProfile["length"], number>>;
type _13d = Expect<Equal<OpenHeadIndexProfile["zeroIsKey"], true>>;
type _13e = Expect<Equal<OpenHeadIndexProfile["stringZeroIsKey"], false>>;

// 14. Contrast common stable indices with distributively gathered possibilities.
export type UnionIndexProfile = TODO; // TODO(koan)

type _14a = Expect<Equal<UnionIndexProfile["common"], 0>>;
type _14b = Expect<
  Equal<UnionIndexProfile["distributed"], 0 | 1 | 2>
>;
type _14c = Expect<Equal<UnionIndexProfile["length"], 1 | 3>>;
type _14d = Expect<Equal<UnionIndexProfile["elements"], 1 | 2 | 3>>;
type _14e = Expect<Equal<UnionIndexProfile["emptyCommon"], never>>;

// ─── Special and runtime boundary profiles ─────────────────────────────

// 15. Classify stable indices and element domains for any, never, and arrays.
export type SpecialIndexProfile = TODO; // TODO(koan)

type _15a = Expect<
  Equal<SpecialIndexProfile["anyIndicesAreAny"], false>
>;
type _15b = Expect<Equal<SpecialIndexProfile["neverIndices"], never>>;
type _15c = Expect<
  Equal<SpecialIndexProfile["unknownArrayIndices"], never>
>;
type _15d = Expect<
  Equal<SpecialIndexProfile["anyArrayIndices"], never>
>;
type _15e = Expect<
  Equal<SpecialIndexProfile["anyArrayElementsAreAny"], true>
>;

// 16. Contrast numeric keyof membership with tuple-specific string positions.
export type NumericKeyProfile = TODO; // TODO(koan)

type _16a = Expect<Equal<NumericKeyProfile["emptyHasNumber"], true>>;
type _16b = Expect<Equal<NumericKeyProfile["pairHasNumber"], true>>;
type _16c = Expect<Equal<NumericKeyProfile["rawHasStringZero"], true>>;
type _16d = Expect<Equal<NumericKeyProfile["rawHasNumericZero"], false>>;
type _16e = Expect<
  Equal<NumericKeyProfile["pairHasOutOfBoundsString"], false>
>;

// 17. Build the packet's runtime helper result and refinement surfaces.
export type TupleIndexRuntimeProfile = TODO; // TODO(koan)

type _17a = Expect<Equal<TupleIndexRuntimeProfile["tupleAt"], 1>>;
type _17b = Expect<
  Equal<TupleIndexRuntimeProfile["safeAt"], "a" | 1 | undefined>
>;
type _17c = Expect<
  Equal<
    TupleIndexRuntimeProfile["lengthGuard"],
    readonly unknown[] & { length: 3 }
  >
>;
type _17d = Expect<
  Equal<
    TupleIndexRuntimeProfile["enumerated"],
    Array<[number, "a" | 1]>
  >
>;
type _17e = Expect<
  Equal<TupleIndexRuntimeProfile["emptyEnumeration"], Array<[number, never]>>
>;

// 18. Build one view of length, values, stable indices, and distributed indices.
export type TupleIndexSummary<Value extends readonly unknown[]> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<
    TupleIndexSummary<readonly [name: string, score?: number]>,
    {
      value: readonly [name: string, score?: number];
      length: 1 | 2;
      finiteLength: 1 | 2;
      elements: string | number | undefined;
      indices: 0 | 1;
      distributedIndices: 0 | 1;
    }
  >
>;
type _18b = Expect<
  Equal<
    TupleIndexSummary<[]>[
      "length" | "finiteLength" | "elements" | "indices"
    ],
    0
  >
>;
type _18c = Expect<
  Equal<
    TupleIndexSummary<[head: 1, ...tail: 2[]]>[
      "length" | "finiteLength" | "elements" | "indices"
    ],
    number | 1 | 2 | 0
  >
>;
type _18d = Expect<
  Equal<
    TupleIndexSummary<[...head: string[], tail: number]>[
      "elements" | "indices"
    ],
    string | number
  >
>;
type _18e = Expect<
  Equal<
    TupleIndexSummary<[1] | [1, 2, 3]>[
      "length" | "indices" | "distributedIndices"
    ],
    0 | 1 | 2 | 3
  >
>;
