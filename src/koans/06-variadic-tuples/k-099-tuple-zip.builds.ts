import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-099: tuple zip — constructions
 * =============================================================================
 *
 * These constructions pair tuple positions in lockstep, stop finite recursion
 * at the shorter input, and switch to an array-of-pairs result when either
 * length is open. They also distinguish shortest-input zip from exact-length
 * zip across optional, union, readonly, and special-type inputs. Replace each
 * `TODO` with a type satisfying the assertions directly below it.
 */

type GivenZipFinite<
  Left extends readonly unknown[],
  Right extends readonly unknown[],
> = Left extends readonly [infer LeftHead, ...infer LeftTail]
  ? Right extends readonly [infer RightHead, ...infer RightTail]
    ? [[LeftHead, RightHead], ...GivenZipFinite<LeftTail, RightTail>]
    : []
  : [];

type GivenZip<
  Left extends readonly unknown[],
  Right extends readonly unknown[],
> = number extends Left["length"] | Right["length"]
  ? Array<[Left[number], Right[number]]>
  : GivenZipFinite<Left, Right>;

type GivenZipExact<
  Left extends readonly unknown[],
  Right extends readonly unknown[],
> = [Left["length"]] extends [Right["length"]]
  ? [Right["length"]] extends [Left["length"]]
    ? GivenZip<Left, Right>
    : never
  : never;

type GivenIsAny<Value> =
  0 extends (1 & Value) ? true : false;

// ─── Finite pairing and public fallback ───────────────────────────────

// 1. Recursively pair finite heads and stop when either tuple has no head.
export type ZipFinite<
  Left extends readonly unknown[],
  Right extends readonly unknown[],
> = TODO; // TODO(koan)

type _01a = Expect<Equal<ZipFinite<[], []>, []>>;
type _01b = Expect<
  Equal<ZipFinite<[1], ["a"]>, [[1, "a"]]>
>;
type _01c = Expect<
  Equal<ZipFinite<[1, 2], ["a", "b"]>, [[1, "a"], [2, "b"]]>
>;
type _01d = Expect<
  Equal<ZipFinite<[1], ["a", "b"]>, [[1, "a"]]>
>;
type _01e = Expect<
  Equal<ZipFinite<readonly [1, 2], readonly ["a"]>, [[1, "a"]]>
>;

// 2. Zip finite tuples recursively and open inputs as an array of pair domains.
export type ZipTuples<
  Left extends readonly unknown[],
  Right extends readonly unknown[],
> = TODO; // TODO(koan)

type _02a = Expect<Equal<ZipTuples<[], []>, []>>;
type _02b = Expect<
  Equal<ZipTuples<[1, 2], ["a", "b"]>, [[1, "a"], [2, "b"]]>
>;
type _02c = Expect<
  Equal<ZipTuples<[1, 2], ["a"]>, [[1, "a"]]>
>;
type _02d = Expect<
  Equal<ZipTuples<number[], string[]>, Array<[number, string]>>
>;
type _02e = Expect<
  Equal<ZipTuples<[1, 2], string[]>, Array<[1 | 2, string]>>
>;

// 3. Zip only when both complete length domains are mutually assignable.
export type ZipTuplesExact<
  Left extends readonly unknown[],
  Right extends readonly unknown[],
> = TODO; // TODO(koan)

type _03a = Expect<Equal<ZipTuplesExact<[], []>, []>>;
type _03b = Expect<
  Equal<ZipTuplesExact<[1, 2], ["a", "b"]>, [[1, "a"], [2, "b"]]>
>;
type _03c = Expect<
  Equal<ZipTuplesExact<[1], ["a", "b"]>, never>
>;
type _03d = Expect<
  Equal<ZipTuplesExact<number[], string[]>, Array<[number, string]>>
>;
type _03e = Expect<
  Equal<
    ZipTuplesExact<[a: 1, b?: 2], [x: "a", y?: "b"]>,
    [[1, "a"]]
  >
>;

// 4. Read a zipped pair at a numeric position.
export type ZipPairAt<
  Left extends readonly unknown[],
  Right extends readonly unknown[],
  Index extends number,
> = TODO; // TODO(koan)

type _04a = Expect<
  Equal<ZipPairAt<[1, 2], ["a", "b"], 0>, [1, "a"]>
>;
type _04b = Expect<
  Equal<ZipPairAt<[1, 2], ["a", "b"], 1>, [2, "b"]>
>;
type _04c = Expect<
  Equal<
    ZipPairAt<[1, 2], ["a", "b"], number>,
    [1, "a"] | [2, "b"]
  >
>;
type _04d = Expect<Equal<ZipPairAt<[], [], number>, never>>;
type _04e = Expect<
  Equal<ZipPairAt<number[], string[], 4>, [number, string]>
>;

// 5. Gather the union of zipped pairs while preserving per-position correlation.
export type ZippedPairUnion<
  Left extends readonly unknown[],
  Right extends readonly unknown[],
> = TODO; // TODO(koan)

type _05a = Expect<Equal<ZippedPairUnion<[], []>, never>>;
type _05b = Expect<
  Equal<
    ZippedPairUnion<[1, 2], ["a", "b"]>,
    [1, "a"] | [2, "b"]
  >
>;
type _05c = Expect<
  Equal<ZippedPairUnion<[1], ["a", "b"]>, [1, "a"]>
>;
type _05d = Expect<
  Equal<ZippedPairUnion<number[], string[]>, [number, string]>
>;
type _05e = Expect<
  Equal<
    ZippedPairUnion<[1] | [2], ["a"] | ["b"]>,
    [1, "a"] | [1, "b"] | [2, "a"] | [2, "b"]
  >
>;

// 6. Project the left and right domains from the correlated pair union.
export type ZipColumns<
  Left extends readonly unknown[],
  Right extends readonly unknown[],
> = TODO; // TODO(koan)

type _06a = Expect<
  Equal<ZipColumns<[1, 2], ["a", "b"]>["left"], 1 | 2>
>;
type _06b = Expect<
  Equal<ZipColumns<[1, 2], ["a", "b"]>["right"], "a" | "b">
>;
type _06c = Expect<Equal<ZipColumns<[], []>["left"], never>>;
type _06d = Expect<
  Equal<ZipColumns<number[], string[]>["right"], string>
>;
type _06e = Expect<
  Equal<ZipColumns<[never, 2], ["a", "b"]>["left"], 2>
>;

// 7. Return the exact finite result length or `number` for an open fallback.
export type ZipResultLength<
  Left extends readonly unknown[],
  Right extends readonly unknown[],
> = TODO; // TODO(koan)

type _07a = Expect<Equal<ZipResultLength<[], []>, 0>>;
type _07b = Expect<
  Equal<ZipResultLength<[1, 2], ["a", "b"]>, 2>
>;
type _07c = Expect<
  Equal<ZipResultLength<[1], ["a", "b"]>, 1>
>;
type _07d = Expect<Equal<ZipResultLength<number[], string[]>, number>>;
type _07e = Expect<
  Equal<ZipResultLength<[] | [1], ["a"]>, 0 | 1>
>;

// ─── Finite, open, optional, and union profiles ───────────────────────

// 8. Describe equal finite pairing, positional lookup, and fresh mutability.
export type EqualFiniteZipProfile = TODO; // TODO(koan)

type _08a = Expect<Equal<EqualFiniteZipProfile["empty"], []>>;
type _08b = Expect<
  Equal<
    EqualFiniteZipProfile["pairs"],
    [[1, "a"], [2, "b"], [3, "c"]]
  >
>;
type _08c = Expect<
  Equal<EqualFiniteZipProfile["second"], [2, "b"]>
>;
type _08d = Expect<
  Equal<
    EqualFiniteZipProfile["pairUnion"],
    [1, "a"] | [2, "b"] | [3, "c"]
  >
>;
type _08e = Expect<Equal<EqualFiniteZipProfile["mutable"], true>>;

// 9. Describe how each finite mismatch truncates at the shorter operand.
export type ShortestZipProfile = TODO; // TODO(koan)

type _09a = Expect<
  Equal<ShortestZipProfile["leftShorter"], [[1, "a"]]>
>;
type _09b = Expect<
  Equal<ShortestZipProfile["rightShorter"], [[1, "a"]]>
>;
type _09c = Expect<Equal<ShortestZipProfile["emptyLeft"], []>>;
type _09d = Expect<Equal<ShortestZipProfile["emptyRight"], []>>;
type _09e = Expect<
  Equal<ShortestZipProfile["deeper"], [[1, "a"], [2, "b"]]>
>;

// 10. Describe array fallbacks when either input has an open length.
export type OpenZipProfile = TODO; // TODO(koan)

type _10a = Expect<
  Equal<OpenZipProfile["both"], Array<[number, string]>>
>;
type _10b = Expect<
  Equal<OpenZipProfile["right"], Array<[1 | 2, string]>>
>;
type _10c = Expect<
  Equal<OpenZipProfile["left"], Array<[number, "a" | "b"]>>
>;
type _10d = Expect<
  Equal<OpenZipProfile["rest"], Array<[1 | 2, "a" | "b"]>>
>;
type _10e = Expect<
  Equal<OpenZipProfile["readonly"], Array<[boolean, number]>>
>;

// 11. Describe the guaranteed prefix produced from optional tuple positions.
export type OptionalZipProfile = TODO; // TODO(koan)

type _11a = Expect<Equal<OptionalZipProfile["optionalOnly"], []>>;
type _11b = Expect<
  Equal<OptionalZipProfile["bothOptionalTails"], [[1, "a"]]>
>;
type _11c = Expect<
  Equal<OptionalZipProfile["leftOptionalTail"], [[1, "a"]]>
>;
type _11d = Expect<
  Equal<OptionalZipProfile["exactOptionalOnly"], []>
>;
type _11e = Expect<
  Equal<OptionalZipProfile["exactOptionalTails"], [[1, "a"]]>
>;

// 12. Construct distributed alternatives from union operands.
export type UnionZipProfile = TODO; // TODO(koan)

type _12a = Expect<
  Equal<
    UnionZipProfile["left"],
    [[1, "a"]] | [[2, "a"], [3, "b"]]
  >
>;
type _12b = Expect<
  Equal<
    UnionZipProfile["right"],
    [[1, "a"]] | [[1, "b"], [2, "c"]]
  >
>;
type _12c = Expect<
  Equal<
    UnionZipProfile["cross"],
    [[1, "a"]] | [[1, "b"]] | [[2, "a"]] | [[2, "b"]]
  >
>;
type _12d = Expect<
  Equal<UnionZipProfile["emptyBranch"], [] | [[1, "a"]]>
>;
type _12e = Expect<
  Equal<
    UnionZipProfile["exactSameLength"],
    [[1, "a"]] | [[2, "a"]]
  >
>;

// 13. Compare complete length domains before exact pairing.
export type ExactLengthZipProfile = TODO; // TODO(koan)

type _13a = Expect<Equal<ExactLengthZipProfile["mismatch"], never>>;
type _13b = Expect<
  Equal<ExactLengthZipProfile["optionalMismatch"], never>
>;
type _13c = Expect<
  Equal<ExactLengthZipProfile["broad"], Array<[number, string]>>
>;
type _13d = Expect<
  Equal<
    ExactLengthZipProfile["openRest"],
    Array<[1 | 2, "a" | "b"]>
  >
>;
type _13e = Expect<
  Equal<ExactLengthZipProfile["readonlyFinite"], [[1, "a"]]>
>;

// ─── Special values, mutability, and runtime surface ─────────────────

// 14. Keep `never`, `unknown`, and classified `any` in their paired positions.
export type SpecialPositionZipProfile = TODO; // TODO(koan)

type _14a = Expect<
  Equal<SpecialPositionZipProfile["neverLeft"], [[never, "a"], [2, "b"]]>
>;
type _14b = Expect<
  Equal<SpecialPositionZipProfile["neverRight"], [[1, never], [2, "b"]]>
>;
type _14c = Expect<
  Equal<SpecialPositionZipProfile["unknownLeft"], [[unknown, 1]]>
>;
type _14d = Expect<Equal<SpecialPositionZipProfile["anyLeft"], true>>;
type _14e = Expect<Equal<SpecialPositionZipProfile["anyRight"], true>>;

// 15. Separate whole `never` inputs from broad arrays with `never` elements.
export type NeverZipProfile = TODO; // TODO(koan)

type _15a = Expect<Equal<NeverZipProfile["wholeLeft"], never>>;
type _15b = Expect<Equal<NeverZipProfile["wholeRight"], never>>;
type _15c = Expect<
  Equal<NeverZipProfile["arrayLeft"], Array<[never, string]>>
>;
type _15d = Expect<
  Equal<NeverZipProfile["arrayRight"], Array<[number, never]>>
>;
type _15e = Expect<
  Equal<NeverZipProfile["arrayPair"], [never, string]>
>;

// 16. Report that readonly inputs produce fresh mutable outer and pair shapes.
export type ReadonlyZipProfile = TODO; // TODO(koan)

type _16a = Expect<
  Equal<ReadonlyZipProfile["result"], [[1, "a"], [2, "b"]]>
>;
type _16b = Expect<Equal<ReadonlyZipProfile["outerMutable"], true>>;
type _16c = Expect<Equal<ReadonlyZipProfile["pairMutable"], true>>;
type _16d = Expect<
  Equal<ReadonlyZipProfile["readonlyPairAssignable"], false>
>;
type _16e = Expect<Equal<ReadonlyZipProfile["length"], 2>>;

// 17. Pair a value domain with runtime numeric indices using the public fallback.
export type ZipWithIndexResult<
  Values extends readonly unknown[],
> = TODO; // TODO(koan)

type _17a = Expect<
  Equal<ZipWithIndexResult<[]>, Array<[never, number]>>
>;
type _17b = Expect<
  Equal<ZipWithIndexResult<readonly ["a", "b"]>, Array<["a" | "b", number]>>
>;
type _17c = Expect<
  Equal<ZipWithIndexResult<string[]>, Array<[string, number]>>
>;
type _17d = Expect<
  Equal<
    ZipWithIndexResult<[head: string, ...tail: number[]]>,
    Array<[string | number, number]>
  >
>;
type _17e = Expect<
  Equal<ZipWithIndexResult<[1] | [2, 3]>, Array<[1 | 2 | 3, number]>>
>;

// 18. Build the generic runtime signatures for zip, exact zip, and indexed zip.
export type ZipRuntimeApi = TODO; // TODO(koan)

type _18a = Expect<
  Equal<
    ZipRuntimeApi["zip"],
    <
      const Left extends readonly unknown[],
      const Right extends readonly unknown[],
    >(
      left: Left,
      right: Right,
    ) => GivenZip<Left, Right>
  >
>;
type _18b = Expect<
  Equal<
    ZipRuntimeApi["zipExact"],
    <
      const Left extends readonly unknown[],
      const Right extends readonly unknown[],
    >(
      left: Left,
      right: Right,
    ) => GivenZipExact<Left, Right>
  >
>;
type _18c = Expect<
  Equal<
    ZipRuntimeApi["zipWithIndex"],
    <const Values extends readonly unknown[]>(
      values: Values,
    ) => GivenZip<Values, number[]>
  >
>;
type _18d = Expect<
  Equal<ReturnType<ZipRuntimeApi["zip"]>, Array<[unknown, unknown]>>
>;
type _18e = Expect<
  Equal<
    ReturnType<ZipRuntimeApi["zipWithIndex"]>,
    Array<[unknown, number]>
  >
>;
