import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-093: tuple spread normalization — constructions
 * =============================================================================
 *
 * These constructions compose tuple shapes with `[...Left, ...Right]`. They
 * preserve finite positions, normalize unbounded operands into one legal rest
 * region, make earlier optional positions present when a required suffix
 * follows, and produce fresh mutable shapes from readonly inputs. They also
 * cover fixed-position absorption, union cross-products, whole `never` versus
 * `never[]`, and any/unknown element domains. Replace each `TODO` with a type
 * satisfying the assertions directly below it.
 */

type GivenSpread<
  Left extends readonly unknown[],
  Right extends readonly unknown[],
> = [...Left, ...Right];

type GivenIsAny<Value> =
  0 extends (1 & Value) ? true : false;

// ─── Core spread constructions ─────────────────────────────────────────

// 1. Concatenate two tuple or array shapes and let TypeScript normalize them.
export type SpreadTuple<
  Left extends readonly unknown[],
  Right extends readonly unknown[],
> = TODO; // TODO(koan)

type _01a = Expect<Equal<SpreadTuple<[], []>, []>>;
type _01b = Expect<Equal<SpreadTuple<[1], [2]>, [1, 2]>>;
type _01c = Expect<
  Equal<SpreadTuple<[1, 2], [3, 4]>, [1, 2, 3, 4]>
>;
type _01d = Expect<
  Equal<
    SpreadTuple<readonly [left: 1], readonly [right: 2]>,
    [left: 1, right: 2]
  >
>;
type _01e = Expect<
  Equal<
    SpreadTuple<[1] | [2], [3] | [4]>,
    [1, 3] | [1, 4] | [2, 3] | [2, 4]
  >
>;

// 2. Prepend one fixed position to any readonly tuple or array shape.
export type Prepend<Value, Values extends readonly unknown[]> = TODO; // TODO(koan)

type _02a = Expect<Equal<Prepend<0, []>, [0]>>;
type _02b = Expect<
  Equal<Prepend<0, readonly [1, 2]>, [0, 1, 2]>
>;
type _02c = Expect<
  Equal<Prepend<"head", number[]>, ["head", ...number[]]>
>;
type _02d = Expect<
  Equal<Prepend<never, readonly [unknown]>, [never, unknown]>
>;
type _02e = Expect<
  Equal<
    Prepend<0, readonly [1] | readonly [2, 3]>,
    [0, 1] | [0, 2, 3]
  >
>;

// 3. Append one fixed position after any readonly tuple or array shape.
export type Append<Values extends readonly unknown[], Value> = TODO; // TODO(koan)

type _03a = Expect<Equal<Append<[], 0>, [0]>>;
type _03b = Expect<
  Equal<Append<readonly [1, 2], 3>, [1, 2, 3]>
>;
type _03c = Expect<
  Equal<Append<string[], "tail">, [...string[], "tail"]>
>;
type _03d = Expect<
  Equal<Append<readonly [unknown], never>, [unknown, never]>
>;
type _03e = Expect<
  Equal<
    Append<readonly [1] | readonly [2, 3], 4>,
    [1, 4] | [2, 3, 4]
  >
>;

// 4. Surround a readonly middle shape with fixed start and end positions.
export type Surround<
  Start,
  Middle extends readonly unknown[],
  End,
> = TODO; // TODO(koan)

type _04a = Expect<Equal<Surround<"(", [], ")">, ["(", ")"]>>;
type _04b = Expect<
  Equal<Surround<"(", readonly [1, 2], ")">, ["(", 1, 2, ")"]>
>;
type _04c = Expect<
  Equal<
    Surround<0, string[], 1>,
    [0, ...string[], 1]
  >
>;
type _04d = Expect<
  Equal<Surround<never, readonly [unknown], never>, [never, unknown, never]>
>;
type _04e = Expect<
  Equal<
    Surround<0, readonly [1] | readonly [2, 3], 4>,
    [0, 1, 4] | [0, 2, 3, 4]
  >
>;

// 5. Form the numeric element union of a normalized spread result.
export type SpreadElements<
  Left extends readonly unknown[],
  Right extends readonly unknown[],
> = TODO; // TODO(koan)

type _05a = Expect<
  Equal<SpreadElements<[1, 2], [3, 4]>, 1 | 2 | 3 | 4>
>;
type _05b = Expect<
  Equal<SpreadElements<string[], number[]>, string | number>
>;
type _05c = Expect<
  Equal<SpreadElements<[0, ...1[]], [2]>, 0 | 1 | 2>
>;
type _05d = Expect<
  Equal<SpreadElements<never[], string[]>, string>
>;
type _05e = Expect<
  Equal<SpreadElements<unknown[], [1]>, unknown>
>;

// 6. Read the finite or widened length of a normalized spread result.
export type SpreadLength<
  Left extends readonly unknown[],
  Right extends readonly unknown[],
> = TODO; // TODO(koan)

type _06a = Expect<Equal<SpreadLength<[], []>, 0>>;
type _06b = Expect<Equal<SpreadLength<[1, 2], [3]>, 3>>;
type _06c = Expect<
  Equal<SpreadLength<[1] | [1, 2], [3]>, 2 | 3>
>;
type _06d = Expect<Equal<SpreadLength<string[], [1]>, number>>;
type _06e = Expect<
  Equal<SpreadLength<[0, ...1[]], [...2[], 3]>, number>
>;

// ─── Finite, open, and optional normalization ──────────────────────────

// 7. Describe finite empty, labeled, readonly, heterogeneous, and indexed spreads.
export type FiniteSpreadProfile = TODO; // TODO(koan)

type _07a = Expect<Equal<FiniteSpreadProfile["empty"], []>>;
type _07b = Expect<
  Equal<FiniteSpreadProfile["labeled"], [left: string, right: number]>
>;
type _07c = Expect<
  Equal<FiniteSpreadProfile["readonly"], [1, 2, 3]>
>;
type _07d = Expect<
  Equal<
    FiniteSpreadProfile["heterogeneous"],
    [true, false, null, undefined]
  >
>;
type _07e = Expect<Equal<FiniteSpreadProfile["length"], 2>>;

// 8. Preserve fixed prefixes and suffixes around one plain unbounded operand.
export type OneOpenSpreadProfile = TODO; // TODO(koan)

type _08a = Expect<
  Equal<
    OneOpenSpreadProfile["fixedPrefix"],
    [head: boolean, ...string[]]
  >
>;
type _08b = Expect<
  Equal<
    OneOpenSpreadProfile["fixedSuffix"],
    [...string[], tail: boolean]
  >
>;
type _08c = Expect<
  Equal<OneOpenSpreadProfile["readonlyRight"], [head: 0, ...string[]]>
>;
type _08d = Expect<
  Equal<OneOpenSpreadProfile["readonlyLeft"], [...string[], tail: 0]>
>;
type _08e = Expect<
  Equal<OneOpenSpreadProfile["suffixElements"], string | boolean>
>;

// 9. Merge two unbounded operands into one union-valued rest region.
export type TwoOpenSpreadProfile = TODO; // TODO(koan)

type _09a = Expect<
  Equal<TwoOpenSpreadProfile["primitives"], (string | number)[]>
>;
type _09b = Expect<
  Equal<TwoOpenSpreadProfile["literals"], (1 | 2)[]>
>;
type _09c = Expect<
  Equal<TwoOpenSpreadProfile["prefixed"], [0, ...(1 | 2)[]]>
>;
type _09d = Expect<
  Equal<TwoOpenSpreadProfile["suffixed"], [...(1 | 2)[], 3]>
>;
type _09e = Expect<
  Equal<TwoOpenSpreadProfile["framed"], [0, ...(1 | 2 | 3)[]]>
>;

// 10. Normalize optional positions when later required positions must follow.
export type OptionalSpreadProfile = TODO; // TODO(koan)

type _10a = Expect<
  Equal<OptionalSpreadProfile["untouchedLeft"], [a?: 1]>
>;
type _10b = Expect<
  Equal<OptionalSpreadProfile["untouchedRight"], [a?: 1]>
>;
type _10c = Expect<
  Equal<OptionalSpreadProfile["optionalSuffix"], [a: 1, b?: 2]>
>;
type _10d = Expect<
  Equal<
    OptionalSpreadProfile["requiredAfter"],
    [a: 1 | undefined, b: 2]
  >
>;
type _10e = Expect<
  Equal<
    OptionalSpreadProfile["severalBefore"],
    [a: 1 | undefined, b: 2 | undefined, c: 3]
  >
>;

// 11. Show how fixed values are absorbed after spreading an already-open tuple.
export type RestAbsorptionProfile = TODO; // TODO(koan)

type _11a = Expect<
  Equal<RestAbsorptionProfile["oneFixed"], [0, ...(1 | 2)[]]>
>;
type _11b = Expect<
  Equal<RestAbsorptionProfile["twoFixed"], [0, ...(1 | 2 | 3)[]]>
>;
type _11c = Expect<
  Equal<RestAbsorptionProfile["laterOpen"], [0, ...(1 | 2 | 3)[]]>
>;
type _11d = Expect<
  Equal<RestAbsorptionProfile["neverRest"], [0, ...2[]]>
>;
type _11e = Expect<
  Equal<RestAbsorptionProfile["unknownElements"], unknown>
>;

// ─── Capability, unions, and extreme operands ──────────────────────────

// 12. Describe the fresh mutable capability produced from readonly operands.
export type ReadonlySpreadProfile = TODO; // TODO(koan)

type _12a = Expect<Equal<ReadonlySpreadProfile["result"], [1, 2]>>;
type _12b = Expect<
  Equal<ReadonlySpreadProfile["mutableAssignable"], true>
>;
type _12c = Expect<
  Equal<ReadonlySpreadProfile["readonlyAssignable"], false>
>;
type _12d = Expect<Equal<ReadonlySpreadProfile["hasPush"], true>>;
type _12e = Expect<Equal<ReadonlySpreadProfile["equalReadonly"], false>>;

// 13. Form the cross-product of finite tuple-union operands.
export type UnionSpreadProfile = TODO; // TODO(koan)

type _13a = Expect<
  Equal<UnionSpreadProfile["left"], [1, 3] | [2, 3]>
>;
type _13b = Expect<
  Equal<UnionSpreadProfile["right"], [1, 2] | [1, 3]>
>;
type _13c = Expect<
  Equal<
    UnionSpreadProfile["both"],
    [1, 3] | [1, 4] | [2, 3] | [2, 4]
  >
>;
type _13d = Expect<Equal<UnionSpreadProfile["length"], 1 | 2>>;
type _13e = Expect<Equal<UnionSpreadProfile["elements"], 1 | 2>>;

// 14. Distinguish a whole never operand from an array of never elements.
export type NeverSpreadProfile = TODO; // TODO(koan)

type _14a = Expect<Equal<NeverSpreadProfile["leftWhole"], never>>;
type _14b = Expect<
  Equal<NeverSpreadProfile["leftArray"], [...never[], 1]>
>;
type _14c = Expect<Equal<NeverSpreadProfile["rightWhole"], never>>;
type _14d = Expect<
  Equal<NeverSpreadProfile["rightArray"], [1, ...never[]]>
>;
type _14e = Expect<
  Equal<NeverSpreadProfile["bothArrayElements"], never>
>;

// 15. Classify any and unknown after their element domains join normalization.
export type ExtremeSpreadProfile = TODO; // TODO(koan)

type _15a = Expect<
  Equal<ExtremeSpreadProfile["anyLeftIsAny"], true>
>;
type _15b = Expect<
  Equal<ExtremeSpreadProfile["anyRightIsAny"], true>
>;
type _15c = Expect<Equal<ExtremeSpreadProfile["unknownLeft"], unknown>>;
type _15d = Expect<Equal<ExtremeSpreadProfile["unknownRight"], unknown>>;
type _15e = Expect<Equal<ExtremeSpreadProfile["unknownBoth"], unknown>>;

// 16. Describe the four runtime helper return shapes over representative literals.
export type SpreadHelperProfile = TODO; // TODO(koan)

type _16a = Expect<
  Equal<SpreadHelperProfile["concat"], [1, 2, "x"]>
>;
type _16b = Expect<
  Equal<SpreadHelperProfile["prepend"], [0, 1, 2]>
>;
type _16c = Expect<Equal<SpreadHelperProfile["append"], [1, 2, 3]>>;
type _16d = Expect<
  Equal<SpreadHelperProfile["surround"], ["(", 1, 2, ")"]>
>;
type _16e = Expect<
  Equal<SpreadHelperProfile["elements"], 1 | 2 | "x">
>;

// 17. Collect representative normalization outputs in one comparison matrix.
export type SpreadNormalizationMatrix = TODO; // TODO(koan)

type _17a = Expect<
  Equal<SpreadNormalizationMatrix["finite"], [1, 2]>
>;
type _17b = Expect<
  Equal<SpreadNormalizationMatrix["prefixOpen"], [0, ...1[]]>
>;
type _17c = Expect<
  Equal<SpreadNormalizationMatrix["suffixOpen"], [...0[], 1]>
>;
type _17d = Expect<
  Equal<SpreadNormalizationMatrix["bothOpen"], (0 | 1)[]>
>;
type _17e = Expect<
  Equal<
    SpreadNormalizationMatrix["optionalRequired"],
    [a: 1 | undefined, b: 2]
  >
>;

// 18. Build one view of a spread's result, observations, length, and capability.
export type SpreadSummary<
  Left extends readonly unknown[],
  Right extends readonly unknown[],
> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<
    SpreadSummary<readonly [1, 2], readonly [3]>,
    {
      result: [1, 2, 3];
      first: 1;
      elements: 1 | 2 | 3;
      length: 3;
      mutable: true;
    }
  >
>;
type _18b = Expect<
  Equal<
    SpreadSummary<[], []>["first" | "elements" | "length"],
    0 | undefined
  >
>;
type _18c = Expect<
  Equal<
    SpreadSummary<[0], 1[]>["result" | "elements"],
    [0, ...1[]] | 0 | 1
  >
>;
type _18d = Expect<
  Equal<
    SpreadSummary<string[], number[]>["result" | "elements"],
    (string | number)[] | string | number
  >
>;
type _18e = Expect<
  Equal<
    SpreadSummary<[a?: 1], [b: 2]>["result" | "length"],
    [a: 1 | undefined, b: 2] | 2
  >
>;
