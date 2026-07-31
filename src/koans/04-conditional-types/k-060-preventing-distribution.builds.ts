import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-060: preventing distribution — constructions
 * =============================================================================
 *
 * These constructions choose deliberately between member-wise and aggregate
 * union questions. They build every/some/none quantifiers, distributed and
 * whole filters, arrays, boxes, tags, and products; expose mixed-state
 * admission and correlation loss; compare several non-naked wrappers; and pin
 * vacuous never, uncertain any, top unknown, structural overlap, and common-key
 * behavior. Replace each `TODO` with a type satisfying the assertions directly
 * below it.
 */

type GivenKeep<Value, Constraint> =
  Value extends Constraint ? Value : never;
type GivenEvery<Value, Constraint> =
  [Value] extends [Constraint] ? true : false;
type GivenSome<Value, Constraint> =
  [Extract<Value, Constraint>] extends [never] ? false : true;
type GivenDistributedArray<Value> =
  Value extends unknown ? Value[] : never;
type GivenWholeArray<Value> =
  [Value] extends [unknown] ? Value[] : never;
type GivenDistributedPairBox<Value> =
  Value extends unknown ? { value: Value; same: Value } : never;
type GivenWholePairBox<Value> =
  [Value] extends [unknown] ? { value: Value; same: Value } : never;
type GivenIsAny<Value> = 0 extends (1 & Value) ? true : false;

// ─── Every, some, none, and filtering ─────────────────────────────────────

// 1. Ask whether every union member satisfies one constraint.
export type IsEvery<Value, Constraint> = TODO; // TODO(koan)

type _01a = Expect<Equal<IsEvery<string | number, string>, false>>;
type _01b = Expect<Equal<IsEvery<"a" | "b", string>, true>>;
type _01c = Expect<
  Equal<
    IsEvery<
      { id: 1 } | { id: 2; name: string },
      { id: number }
    >,
    true
  >
>;
type _01d = Expect<
  Equal<IsEvery<string[] | readonly number[], unknown[]>, false>
>;
type _01e = Expect<Equal<IsEvery<never, string>, true>>;

// 2. Ask whether at least one union member satisfies one constraint.
export type IsSome<Value, Constraint> = TODO; // TODO(koan)

type _02a = Expect<Equal<IsSome<string | number, string>, true>>;
type _02b = Expect<Equal<IsSome<number | boolean, string>, false>>;
type _02c = Expect<
  Equal<
    IsSome<{ id: 1 } | { name: string }, { id: unknown }>,
    true
  >
>;
type _02d = Expect<
  Equal<IsSome<string[] | number, readonly unknown[]>, true>
>;
type _02e = Expect<Equal<IsSome<never, string>, false>>;

// 3. Ask whether no union member satisfies one constraint.
export type IsNone<Value, Constraint> = TODO; // TODO(koan)

type _03a = Expect<Equal<IsNone<number | boolean, string>, true>>;
type _03b = Expect<Equal<IsNone<string | number, string>, false>>;
type _03c = Expect<Equal<IsNone<1 | 2 | 3, 4>, true>>;
type _03d = Expect<Equal<IsNone<PropertyKey, symbol>, false>>;
type _03e = Expect<Equal<IsNone<never, unknown>, true>>;

// 4. Report every, some, none, and the distributed matching members together.
export type QuantifierProfile<Value, Constraint> = TODO; // TODO(koan)

type _04a = Expect<
  Equal<
    QuantifierProfile<string | number, string>,
    [false, true, false, string]
  >
>;
type _04b = Expect<
  Equal<
    QuantifierProfile<"a" | "b", string>,
    [true, true, false, "a" | "b"]
  >
>;
type _04c = Expect<
  Equal<
    QuantifierProfile<number | boolean, string>,
    [false, false, true, never]
  >
>;
type _04d = Expect<
  Equal<
    QuantifierProfile<never, string>,
    [true, false, true, never]
  >
>;

// 5. Contrast member-wise filtering with an all-or-nothing whole-union filter.
export type FilterModes<Value, Constraint> = TODO; // TODO(koan)

type _05a = Expect<
  Equal<FilterModes<string | number, string>, [string, never]>
>;
type _05b = Expect<
  Equal<FilterModes<"a" | "b", string>, ["a" | "b", "a" | "b"]>
>;
type _05c = Expect<
  Equal<
    FilterModes<
      { id: 1 } | { name: string },
      { id: unknown }
    >,
    [{ id: 1 }, never]
  >
>;
type _05d = Expect<
  Equal<FilterModes<never, string>, [never, never]>
>;

// ─── Distributed and whole containers ─────────────────────────────────────

// 6. Build one homogeneous array alternative per union member.
export type DistributedArray<Value> = TODO; // TODO(koan)

type _06a = Expect<
  Equal<DistributedArray<string | number>, string[] | number[]>
>;
type _06b = Expect<
  Equal<DistributedArray<"a" | "b">, "a"[] | "b"[]>
>;
type _06c = Expect<
  Equal<DistributedArray<boolean>, false[] | true[]>
>;
type _06d = Expect<
  Equal<
    DistributedArray<{ a: 1 } | { b: 2 }>,
    { a: 1 }[] | { b: 2 }[]
  >
>;
type _06e = Expect<Equal<DistributedArray<never>, never>>;

// 7. Build one array whose elements may use any union member.
export type WholeArray<Value> = TODO; // TODO(koan)

type _07a = Expect<
  Equal<WholeArray<string | number>, (string | number)[]>
>;
type _07b = Expect<
  Equal<WholeArray<"a" | "b">, ("a" | "b")[]>
>;
type _07c = Expect<Equal<WholeArray<boolean>, boolean[]>>;
type _07d = Expect<
  Equal<
    WholeArray<{ a: 1 } | { b: 2 }>,
    ({ a: 1 } | { b: 2 })[]
  >
>;
type _07e = Expect<Equal<WholeArray<never>, never[]>>;

// 8. Report whether a candidate array fits distributed and whole alternatives.
export type ArrayAdmission<Value, Candidate> = TODO; // TODO(koan)

type _08a = Expect<
  Equal<ArrayAdmission<string | number, string[]>, [true, true]>
>;
type _08b = Expect<
  Equal<
    ArrayAdmission<string | number, (string | number)[]>,
    [false, true]
  >
>;
type _08c = Expect<
  Equal<ArrayAdmission<"a" | "b", readonly ("a" | "b")[]>, [false, false]>
>;
type _08d = Expect<
  Equal<ArrayAdmission<never, never[]>, [false, true]>
>;

// 9. Build one two-field box per member, preserving same-member correlation.
export type DistributedPairBox<Value> = TODO; // TODO(koan)

type _09a = Expect<
  Equal<
    DistributedPairBox<"a" | 1>,
    { value: "a"; same: "a" } | { value: 1; same: 1 }
  >
>;
type _09b = Expect<
  Equal<
    DistributedPairBox<boolean>,
    { value: false; same: false } | { value: true; same: true }
  >
>;
type _09c = Expect<
  Equal<
    DistributedPairBox<{ kind: "a" } | { kind: "b" }>,
    | { value: { kind: "a" }; same: { kind: "a" } }
    | { value: { kind: "b" }; same: { kind: "b" } }
  >
>;
type _09d = Expect<Equal<DistributedPairBox<never>, never>>;

// 10. Build one two-field box retaining the complete union in both fields.
export type WholePairBox<Value> = TODO; // TODO(koan)

type _10a = Expect<
  Equal<
    WholePairBox<"a" | 1>,
    { value: "a" | 1; same: "a" | 1 }
  >
>;
type _10b = Expect<
  Equal<
    WholePairBox<boolean>,
    { value: boolean; same: boolean }
  >
>;
type _10c = Expect<
  Equal<
    WholePairBox<{ kind: "a" } | { kind: "b" }>,
    {
      value: { kind: "a" } | { kind: "b" };
      same: { kind: "a" } | { kind: "b" };
    }
  >
>;
type _10d = Expect<
  Equal<WholePairBox<never>, { value: never; same: never }>
>;

// 11. Report whether a candidate box fits correlated and aggregate box forms.
export type BoxAdmission<Value, Candidate> = TODO; // TODO(koan)

type _11a = Expect<
  Equal<
    BoxAdmission<"a" | 1, { value: "a"; same: "a" }>,
    [true, true]
  >
>;
type _11b = Expect<
  Equal<
    BoxAdmission<"a" | 1, { value: "a"; same: 1 }>,
    [false, true]
  >
>;
type _11c = Expect<
  Equal<
    BoxAdmission<boolean, { value: false; same: true }>,
    [false, true]
  >
>;
type _11d = Expect<
  Equal<
    BoxAdmission<{ kind: "a" } | { kind: "b" }, {
      value: { kind: "a" };
      same: { kind: "b" };
    }>,
    [false, true]
  >
>;

// 12. Tag each union member independently with correlated type and value fields.
export type DistributedTag<Value> = TODO; // TODO(koan)

type _12a = Expect<
  Equal<
    DistributedTag<"a" | 1>,
    { type: "a"; value: "a" } | { type: 1; value: 1 }
  >
>;
type _12b = Expect<
  Equal<
    DistributedTag<boolean>,
    { type: false; value: false } | { type: true; value: true }
  >
>;
type _12c = Expect<
  Equal<
    DistributedTag<null | undefined>,
    { type: null; value: null } | { type: undefined; value: undefined }
  >
>;
type _12d = Expect<Equal<DistributedTag<never>, never>>;

// 13. Tag the complete union once, allowing cross-member field combinations.
export type WholeTag<Value> = TODO; // TODO(koan)

type _13a = Expect<
  Equal<
    WholeTag<"a" | 1>,
    { type: "a" | 1; value: "a" | 1 }
  >
>;
type _13b = Expect<
  Equal<
    WholeTag<boolean>,
    { type: boolean; value: boolean }
  >
>;
type _13c = Expect<
  Equal<
    WholeTag<null | undefined>,
    { type: null | undefined; value: null | undefined }
  >
>;
type _13d = Expect<
  Equal<WholeTag<never>, { type: never; value: never }>
>;

// ─── Selective product expansion ──────────────────────────────────────────

// 14. Distribute both parameters into a full Cartesian product.
export type DistributedProduct<Left, Right> = TODO; // TODO(koan)

type _14a = Expect<
  Equal<
    DistributedProduct<"a" | "b", 1 | 2>,
    ["a", 1] | ["a", 2] | ["b", 1] | ["b", 2]
  >
>;
type _14b = Expect<
  Equal<
    DistributedProduct<boolean, "x">,
    [false, "x"] | [true, "x"]
  >
>;
type _14c = Expect<Equal<DistributedProduct<never, 1 | 2>, never>>;
type _14d = Expect<Equal<DistributedProduct<"a" | "b", never>, never>>;

// 15. Distribute only the left parameter and retain the right union whole.
export type LeftDistributedProduct<Left, Right> = TODO; // TODO(koan)

type _15a = Expect<
  Equal<
    LeftDistributedProduct<"a" | "b", 1 | 2>,
    ["a", 1 | 2] | ["b", 1 | 2]
  >
>;
type _15b = Expect<
  Equal<
    LeftDistributedProduct<boolean, "x" | "y">,
    [false, "x" | "y"] | [true, "x" | "y"]
  >
>;
type _15c = Expect<Equal<LeftDistributedProduct<never, 1 | 2>, never>>;
type _15d = Expect<
  Equal<
    LeftDistributedProduct<"a" | "b", never>,
    ["a", never] | ["b", never]
  >
>;

// 16. Retain the left union whole and distribute only the right parameter.
export type RightDistributedProduct<Left, Right> = TODO; // TODO(koan)

type _16a = Expect<
  Equal<
    RightDistributedProduct<"a" | "b", 1 | 2>,
    ["a" | "b", 1] | ["a" | "b", 2]
  >
>;
type _16b = Expect<
  Equal<
    RightDistributedProduct<boolean, "x" | "y">,
    [boolean, "x"] | [boolean, "y"]
  >
>;
type _16c = Expect<
  Equal<
    RightDistributedProduct<never, 1 | 2>,
    [never, 1] | [never, 2]
  >
>;
type _16d = Expect<Equal<RightDistributedProduct<"a", never>, never>>;

// 17. Retain both parameters whole in one product tuple.
export type WholeProduct<Left, Right> = TODO; // TODO(koan)

type _17a = Expect<
  Equal<WholeProduct<"a" | "b", 1 | 2>, ["a" | "b", 1 | 2]>
>;
type _17b = Expect<
  Equal<WholeProduct<boolean, "x" | "y">, [boolean, "x" | "y"]>
>;
type _17c = Expect<
  Equal<WholeProduct<never, 1 | 2>, [never, 1 | 2]>
>;
type _17d = Expect<
  Equal<WholeProduct<"a" | "b", never>, ["a" | "b", never]>
>;

// ─── Wrapper variance, key views, and special types ───────────────────────

// 18. Compare aggregate assignability through several non-naked wrappers.
export type WrapperChecks<Value, Constraint> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<
    WrapperChecks<string | number, string>,
    [false, false, false, false, false, true]
  >
>;
type _18b = Expect<
  Equal<
    WrapperChecks<"a" | "b", string>,
    [true, true, true, true, true, false]
  >
>;
type _18c = Expect<
  Equal<
    WrapperChecks<string | null, string>,
    [false, false, false, false, true, true]
  >
>;
type _18d = Expect<
  Equal<
    WrapperChecks<{ x: 1 } | { y: 2 }, { x: 1 }>,
    [false, false, false, false, false, true]
  >
>;

// 19. Compare the union of every member key with keys common to the whole union.
export type KeyViews<Value> = TODO; // TODO(koan)

type _19a = Expect<
  Equal<
    KeyViews<{ kind: "a"; a: number } | { kind: "b"; b: string }>,
    ["kind" | "a" | "b", "kind"]
  >
>;
type _19b = Expect<
  Equal<KeyViews<{ a: 1 } | { b: 2 }>, ["a" | "b", never]>
>;
type _19c = Expect<
  Equal<KeyViews<{ id: number; name: string }>, ["id" | "name", "id" | "name"]>
>;
type _19d = Expect<Equal<KeyViews<unknown>, [never, never]>>;
type _19e = Expect<
  Equal<KeyViews<never>, [never, string | number | symbol]>
>;

// 20. Classify special aggregate/filter results without expecting raw any.
export type SpecialQuantifierProfile<Value, Constraint> = TODO; // TODO(koan)

type _20a = Expect<
  Equal<
    SpecialQuantifierProfile<any, string>,
    [true, true, true, false, "any"]
  >
>;
type _20b = Expect<
  Equal<
    SpecialQuantifierProfile<never, string>,
    [true, false, false, true, never]
  >
>;
type _20c = Expect<
  Equal<
    SpecialQuantifierProfile<unknown, string>,
    [false, false, false, true, never]
  >
>;
type _20d = Expect<
  Equal<
    SpecialQuantifierProfile<unknown, unknown>,
    [true, true, false, false, unknown]
  >
>;
