import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-090: readonly tuples — constructions
 * =============================================================================
 *
 * These constructions separate positional observation from write capability.
 * They preserve finite tuple shape while adding or removing outer readonly,
 * accept both mutable and readonly inputs through readonly constraints, and
 * deliberately create mutable copies with mapped modifiers or tuple spread.
 * They also cover assignability direction, shallow behavior, variance, nested
 * values, `as const`, unions, special types, and method-key surfaces. Replace
 * each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenMutable<Value extends readonly unknown[]> = {
  -readonly [Key in keyof Value]: Value[Key];
};

type GivenReadonly<Value extends readonly unknown[]> = {
  readonly [Key in keyof Value]: Value[Key];
};

type GivenSpread<Value extends readonly unknown[]> = [...Value];

type GivenIsAny<Value> =
  0 extends (1 & Value) ? true : false;

type GivenMutableBox = { value: number };

type GivenShallow = readonly [
  box: GivenMutableBox,
  nested: [number],
];

type GivenDeepSource = readonly [
  readonly [1, 2],
  { readonly id: 1 },
];

const givenConstLiteral = [{ id: 1 }, ["a", "b"]] as const;

// ─── Readonly shape and observation ────────────────────────────────────

// 1. Build a labeled readonly pair from independent position types.
export type BuildReadonlyPair<First, Second> = TODO; // TODO(koan)

type _01a = Expect<
  Equal<
    BuildReadonlyPair<string, number>,
    readonly [first: string, second: number]
  >
>;
type _01b = Expect<
  Equal<BuildReadonlyPair<"ready", 200>, readonly ["ready", 200]>
>;
type _01c = Expect<
  Equal<BuildReadonlyPair<never, unknown>, readonly [never, unknown]>
>;
type _01d = Expect<
  Equal<
    BuildReadonlyPair<"a" | "b", true | false>,
    readonly ["a" | "b", boolean]
  >
>;
type _01e = Expect<
  Equal<BuildReadonlyPair<[], {}>["length"], 2>
>;

// 2. Read the exact type at a known key of a readonly tuple or array.
export type ReadonlyTupleAt<
  Value extends readonly unknown[],
  Key extends keyof Value,
> = TODO; // TODO(koan)

type _02a = Expect<
  Equal<ReadonlyTupleAt<readonly [string, number], 0>, string>
>;
type _02b = Expect<
  Equal<ReadonlyTupleAt<readonly [string, number], 1>, number>
>;
type _02c = Expect<
  Equal<ReadonlyTupleAt<readonly [1, 2, 3], 2>, 3>
>;
type _02d = Expect<
  Equal<ReadonlyTupleAt<readonly [true, false], 0 | 1>, boolean>
>;
type _02e = Expect<
  Equal<ReadonlyTupleAt<readonly number[], number>, number>
>;

// 3. Form the element union without changing readonly capability.
export type ReadonlyTupleElements<Value extends readonly unknown[]> = TODO; // TODO(koan)

type _03a = Expect<
  Equal<
    ReadonlyTupleElements<readonly [string, number]>,
    string | number
  >
>;
type _03b = Expect<
  Equal<ReadonlyTupleElements<readonly [true, false]>, boolean>
>;
type _03c = Expect<
  Equal<ReadonlyTupleElements<readonly [1, "two", 3n]>, 1 | "two" | 3n>
>;
type _03d = Expect<Equal<ReadonlyTupleElements<readonly []>, never>>;
type _03e = Expect<
  Equal<ReadonlyTupleElements<readonly number[]>, number>
>;

// 4. Read the finite literal length or broad array length.
export type ReadonlyTupleLength<Value extends readonly unknown[]> = TODO; // TODO(koan)

type _04a = Expect<Equal<ReadonlyTupleLength<readonly []>, 0>>;
type _04b = Expect<Equal<ReadonlyTupleLength<readonly [true]>, 1>>;
type _04c = Expect<
  Equal<ReadonlyTupleLength<readonly [string, number]>, 2>
>;
type _04d = Expect<
  Equal<
    ReadonlyTupleLength<readonly [1] | readonly [1, 2, 3]>,
    1 | 3
  >
>;
type _04e = Expect<
  Equal<ReadonlyTupleLength<readonly number[]>, number>
>;

// ─── Deliberate capability conversion ──────────────────────────────────

// 5. Remove only the outer readonly modifier while preserving tuple shape.
export type MutableTuple<Value extends readonly unknown[]> = TODO; // TODO(koan)

type _05a = Expect<Equal<MutableTuple<readonly []>, []>>;
type _05b = Expect<
  Equal<MutableTuple<readonly [1]>, [1]>
>;
type _05c = Expect<
  Equal<MutableTuple<readonly [1, "x"]>, [1, "x"]>
>;
type _05d = Expect<
  Equal<
    MutableTuple<readonly [left: 1, right: 2]>,
    [left: 1, right: 2]
  >
>;
type _05e = Expect<
  Equal<MutableTuple<readonly number[]>, number[]>
>;

// 6. Add outer readonly while preserving cardinality, labels, and element types.
export type ReadonlyTuple<Value extends readonly unknown[]> = TODO; // TODO(koan)

type _06a = Expect<Equal<ReadonlyTuple<[]>, readonly []>>;
type _06b = Expect<
  Equal<ReadonlyTuple<[1]>, readonly [1]>
>;
type _06c = Expect<
  Equal<ReadonlyTuple<[1, "x"]>, readonly [1, "x"]>
>;
type _06d = Expect<
  Equal<
    ReadonlyTuple<[left: 1, right: 2]>,
    readonly [left: 1, right: 2]
  >
>;
type _06e = Expect<
  Equal<ReadonlyTuple<number[]>, readonly number[]>
>;

// 7. Spread either source view into a fresh mutable tuple or array type.
export type MutableSpreadCopy<Value extends readonly unknown[]> = TODO; // TODO(koan)

type _07a = Expect<Equal<MutableSpreadCopy<readonly []>, []>>;
type _07b = Expect<
  Equal<MutableSpreadCopy<readonly [1]>, [1]>
>;
type _07c = Expect<
  Equal<MutableSpreadCopy<readonly [1, 2]>, [1, 2]>
>;
type _07d = Expect<
  Equal<
    MutableSpreadCopy<readonly [name: string, count: number]>,
    [name: string, count: number]
  >
>;
type _07e = Expect<
  Equal<MutableSpreadCopy<readonly string[]>, string[]>
>;

// 8. Accept either capability view and preserve the exact input shape.
export type AcceptReadonly<Value extends readonly unknown[]> = TODO; // TODO(koan)

type _08a = Expect<Equal<AcceptReadonly<[]>, []>>;
type _08b = Expect<Equal<AcceptReadonly<readonly []>, readonly []>>;
type _08c = Expect<
  Equal<AcceptReadonly<[string, number]>, [string, number]>
>;
type _08d = Expect<
  Equal<
    AcceptReadonly<readonly [string, number]>,
    readonly [string, number]
  >
>;
type _08e = Expect<
  Equal<AcceptReadonly<readonly string[]>, readonly string[]>
>;

// 9. Replace the first position by producing a fresh mutable pair type.
export type ReplaceFirst<
  Pair extends readonly [unknown, unknown],
  First extends Pair[0],
> = TODO; // TODO(koan)

type _09a = Expect<
  Equal<
    ReplaceFirst<readonly [string, number], string>,
    [first: string, second: number]
  >
>;
type _09b = Expect<
  Equal<
    ReplaceFirst<readonly ["old" | "new", 2], "new">,
    [first: "new", second: 2]
  >
>;
type _09c = Expect<
  Equal<ReplaceFirst<readonly [1, true], 1>, [first: 1, second: true]>
>;
type _09d = Expect<
  Equal<
    ReplaceFirst<[unknown, never], unknown>,
    [first: unknown, second: never]
  >
>;
type _09e = Expect<
  Equal<
    ReplaceFirst<readonly [string | number, {}], number>,
    [first: number, second: {}]
  >
>;

// ─── Assignability, variance, and shallow behavior ─────────────────────

// 10. Describe assignability direction between mutable and readonly views.
export type MutabilityAssignabilityProfile = TODO; // TODO(koan)

type _10a = Expect<
  Equal<MutabilityAssignabilityProfile["mutableTupleToReadonly"], true>
>;
type _10b = Expect<
  Equal<MutabilityAssignabilityProfile["readonlyTupleToMutable"], false>
>;
type _10c = Expect<
  Equal<MutabilityAssignabilityProfile["mutableArrayToReadonly"], true>
>;
type _10d = Expect<
  Equal<MutabilityAssignabilityProfile["readonlyArrayToMutable"], false>
>;
type _10e = Expect<
  Equal<MutabilityAssignabilityProfile["strictlyEqual"], false>
>;

// 11. Show mapped modifier fidelity for labels, literals, arrays, and unions.
export type ModifierFidelityProfile = TODO; // TODO(koan)

type _11a = Expect<
  Equal<ModifierFidelityProfile["mutableLabels"], [left: 1, right: 2]>
>;
type _11b = Expect<
  Equal<
    ModifierFidelityProfile["readonlyLabels"],
    readonly [left: 1, right: 2]
  >
>;
type _11c = Expect<
  Equal<ModifierFidelityProfile["mutableArray"], never[]>
>;
type _11d = Expect<
  Equal<ModifierFidelityProfile["readonlyArray"], readonly never[]>
>;
type _11e = Expect<
  Equal<ModifierFidelityProfile["mutableUnion"], [1] | [2, 3]>
>;

// 12. Expose that outer readonly does not recursively freeze stored values.
export type ShallowReadonlyProfile = TODO; // TODO(koan)

type _12a = Expect<
  Equal<ShallowReadonlyProfile["box"], GivenMutableBox>
>;
type _12b = Expect<Equal<ShallowReadonlyProfile["value"], number>>;
type _12c = Expect<
  Equal<ShallowReadonlyProfile["nested"], [number]>
>;
type _12d = Expect<
  Equal<ShallowReadonlyProfile["nestedIsReadonlyCompatible"], true>
>;
type _12e = Expect<
  Equal<ShallowReadonlyProfile["readonlyBoxAssignable"], true>
>;

// 13. Separate element variance from the outer tuple's write capability.
export type ReadonlyVarianceProfile = TODO; // TODO(koan)

type _13a = Expect<Equal<ReadonlyVarianceProfile["narrowToWide"], true>>;
type _13b = Expect<Equal<ReadonlyVarianceProfile["wideToNarrow"], false>>;
type _13c = Expect<
  Equal<ReadonlyVarianceProfile["mutableNarrowToReadonlyWide"], true>
>;
type _13d = Expect<
  Equal<ReadonlyVarianceProfile["readonlyNarrowToMutableWide"], false>
>;
type _13e = Expect<
  Equal<ReadonlyVarianceProfile["neverArrayToStringArray"], true>
>;

// 14. Show idempotence and union distribution for mapped conversions.
export type ConversionProfile = TODO; // TODO(koan)

type _14a = Expect<Equal<ConversionProfile["mutableTwice"], [1, 2]>>;
type _14b = Expect<
  Equal<ConversionProfile["readonlyTwice"], readonly [1, 2]>
>;
type _14c = Expect<
  Equal<ConversionProfile["mutableUnion"], [1] | [2, 3]>
>;
type _14d = Expect<
  Equal<
    ConversionProfile["readonlyUnion"],
    readonly [1] | readonly [2, 3]
  >
>;
type _14e = Expect<
  Equal<ConversionProfile["spreadUnion"], [1] | [2, 3]>
>;

// 15. Remove outer readonly while leaving nested readonly values untouched.
export type NestedRemovalProfile = TODO; // TODO(koan)

type _15a = Expect<
  Equal<
    NestedRemovalProfile["mutable"],
    [readonly [1, 2], { readonly id: 1 }]
  >
>;
type _15b = Expect<
  Equal<NestedRemovalProfile["first"], readonly [1, 2]>
>;
type _15c = Expect<
  Equal<NestedRemovalProfile["second"], { readonly id: 1 }>
>;
type _15d = Expect<
  Equal<NestedRemovalProfile["firstBecameMutable"], false>
>;
type _15e = Expect<Equal<NestedRemovalProfile["secondId"], 1>>;

// ─── Special inputs, keys, and inference surfaces ──────────────────────

// 16. Classify mapped results over any and never without intending an any answer.
export type SpecialReadonlyProfile = TODO; // TODO(koan)

type _16a = Expect<Equal<SpecialReadonlyProfile[0], false>>;
type _16b = Expect<Equal<SpecialReadonlyProfile[1], false>>;
type _16c = Expect<Equal<SpecialReadonlyProfile[2], true>>;
type _16d = Expect<Equal<SpecialReadonlyProfile[3], true>>;
type _16e = Expect<Equal<SpecialReadonlyProfile[4], true>>;

// 17. Describe mutating and observing methods visible on each capability view.
export type ReadonlyKeyProfile = TODO; // TODO(koan)

type _17a = Expect<Equal<ReadonlyKeyProfile["mutableHasPush"], true>>;
type _17b = Expect<Equal<ReadonlyKeyProfile["readonlyHasPush"], false>>;
type _17c = Expect<Equal<ReadonlyKeyProfile["readonlyHasMap"], true>>;
type _17d = Expect<
  Equal<ReadonlyKeyProfile["mutableKeysFitReadonly"], false>
>;
type _17e = Expect<
  Equal<ReadonlyKeyProfile["readonlyKeysFitMutable"], true>
>;

// 18. Describe recursive literal narrowing from the packet's `as const` shape.
export type ConstLiteralProfile = TODO; // TODO(koan)

type _18a = Expect<
  Equal<
    ConstLiteralProfile["whole"],
    readonly [{ readonly id: 1 }, readonly ["a", "b"]]
  >
>;
type _18b = Expect<
  Equal<ConstLiteralProfile["object"], { readonly id: 1 }>
>;
type _18c = Expect<Equal<ConstLiteralProfile["id"], 1>>;
type _18d = Expect<
  Equal<ConstLiteralProfile["nested"], readonly ["a", "b"]>
>;
type _18e = Expect<
  Equal<ConstLiteralProfile["nestedElements"], "a" | "b">
>;

// 19. Build the public helper signature surfaces used by the runtime examples.
export type ReadonlyHelperProfile = TODO; // TODO(koan)

type _19a = Expect<
  Equal<
    ReadonlyHelperProfile["readonlyPair"],
    readonly [first: "x", second: 1]
  >
>;
type _19b = Expect<
  Equal<
    ReadonlyHelperProfile["mutableCopy"],
    [first: "x", second: 1]
  >
>;
type _19c = Expect<
  Equal<ReadonlyHelperProfile["replaceFirst"], [string, number]>
>;
type _19d = Expect<
  Equal<
    ReadonlyHelperProfile["distanceArgument"],
    readonly [x: number, y: number]
  >
>;
type _19e = Expect<
  Equal<
    ReadonlyHelperProfile["constMutableCopy"],
    [{ readonly id: 1 }, readonly ["a", "b"]]
  >
>;

// 20. Build one observation and conversion view for a readonly tuple or array.
export type ReadonlyTupleSummary<
  Value extends readonly unknown[],
> = TODO; // TODO(koan)

type _20a = Expect<
  Equal<
    ReadonlyTupleSummary<readonly [name: string, count: number]>,
    {
      value: readonly [name: string, count: number];
      first: string;
      elements: string | number;
      length: 2;
      mutable: [name: string, count: number];
      spread: [name: string, count: number];
    }
  >
>;
type _20b = Expect<
  Equal<
    ReadonlyTupleSummary<readonly []>["first" | "elements" | "length"],
    0
  >
>;
type _20c = Expect<
  Equal<
    ReadonlyTupleSummary<readonly [1, 2]>["mutable" | "spread"],
    [1, 2]
  >
>;
type _20d = Expect<
  Equal<
    ReadonlyTupleSummary<readonly string[]>["first" | "elements" | "length"],
    string | number
  >
>;
type _20e = Expect<
  Equal<
    ReadonlyTupleSummary<[1] | readonly [2, 3]>["length" | "elements"],
    1 | 2 | 3
  >
>;
