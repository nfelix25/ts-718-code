import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-010: Indexed access types — constructions
 * =============================================================================
 *
 * These constructions project property values through literal and union keys,
 * arrays, tuples, nested paths, index signatures, and related generic keys.
 * Optionality, empty selections, shared union keys, special types, and runtime
 * value collection are kept visible in the adjacent assertion batteries.
 * Replace each `TODO` with a type that satisfies its assertions below.
 */

// Given machinery: classify special lookup results without expecting `any`.
type GivenKind<Value> =
  0 extends 1 & Value
    ? "any"
    : [Value] extends [never]
      ? "never"
      : unknown extends Value
        ? [keyof Value] extends [never]
          ? "unknown"
          : "ordinary"
        : "ordinary";

declare const givenToken: unique symbol;

// ─── Declared property projections ───────────────────────────────────────────

// 1. Project the value associated with one admissible key.
export type PropertyValue<
  Shape,
  Key extends keyof Shape,
> = TODO; // TODO(koan)

type _01a = Expect<Equal<PropertyValue<{ id: number }, "id">, number>>;
type _01b = Expect<
  Equal<PropertyValue<{ readonly fixed: 1 }, "fixed">, 1>
>;
type _01c = Expect<
  Equal<PropertyValue<{ optional?: string }, "optional">, string | undefined>
>;
type _01d = Expect<
  Equal<PropertyValue<{ 0: "zero" }, 0>, "zero">
>;
type _01e = Expect<
  Equal<PropertyValue<{ [givenToken]: "secret" }, typeof givenToken>, "secret">
>;

// 2. Project and union the values associated with a key union.
export type ValuesFor<
  Shape,
  Keys extends keyof Shape,
> = TODO; // TODO(koan)

type ProjectionModel = {
  id: number;
  title: string;
  published: boolean;
  optional?: "yes";
};

type _02a = Expect<
  Equal<ValuesFor<ProjectionModel, "id" | "title">, number | string>
>;
type _02b = Expect<
  Equal<ValuesFor<ProjectionModel, "published" | "optional">, boolean | "yes" | undefined>
>;
type _02c = Expect<
  Equal<ValuesFor<{ a: 1; b: 1 }, "a" | "b">, 1>
>;
type _02d = Expect<Equal<ValuesFor<ProjectionModel, never>, never>>;

// 3. Form the union of all declared property values.
export type AllValues<Shape> = TODO; // TODO(koan)

type _03a = Expect<
  Equal<AllValues<{ id: number; name: string; active: boolean }>, number | string | boolean>
>;
type _03b = Expect<
  Equal<AllValues<{ a: never; b: string }>, string>
>;
type _03c = Expect<
  Equal<AllValues<{ a?: never; b: string }>, string | undefined>
>;
type _03d = Expect<Equal<AllValues<{}>, never>>;

// 4. Read a property after removing optional modifiers from the whole shape.
export type RequiredPropertyValue<
  Shape,
  Key extends keyof Shape,
> = TODO; // TODO(koan)

type _04a = Expect<
  Equal<RequiredPropertyValue<{ optional?: number }, "optional">, number>
>;
type _04b = Expect<
  Equal<RequiredPropertyValue<{ explicit: boolean | undefined }, "explicit">, boolean | undefined>
>;
type _04c = Expect<
  Equal<
    RequiredPropertyValue<{ a?: 1; b?: 2 }, "a" | "b">,
    1 | 2
  >
>;

// 5. Read a property after making the whole shape optional.
export type PartialPropertyValue<
  Shape,
  Key extends keyof Shape,
> = TODO; // TODO(koan)

type _05a = Expect<
  Equal<PartialPropertyValue<{ required: string }, "required">, string | undefined>
>;
type _05b = Expect<
  Equal<PartialPropertyValue<{ readonly fixed: 1 }, "fixed">, 1 | undefined>
>;
type _05c = Expect<
  Equal<
    PartialPropertyValue<{ a: 1; b: 2 }, "a" | "b">,
    1 | 2 | undefined
  >
>;

// ─── Arrays and tuples ────────────────────────────────────────────────────────

// 6. Project the element type of an array or readonly tuple.
export type ArrayElement<Container extends readonly unknown[]> = TODO; // TODO(koan)

type _06a = Expect<Equal<ArrayElement<number[]>, number>>;
type _06b = Expect<Equal<ArrayElement<readonly string[]>, string>>;
type _06c = Expect<
  Equal<ArrayElement<readonly ["a", 1, true]>, "a" | 1 | true>
>;
type _06d = Expect<Equal<ArrayElement<readonly []>, never>>;

// 7. Project one admissible tuple position or tuple API key.
export type TupleValue<
  Tuple extends readonly unknown[],
  Key extends keyof Tuple,
> = TODO; // TODO(koan)

type _07a = Expect<
  Equal<TupleValue<readonly ["ok", 200, true], 0>, "ok">
>;
type _07b = Expect<
  Equal<TupleValue<readonly ["ok", 200, true], 1 | 2>, 200 | true>
>;
type _07c = Expect<
  Equal<TupleValue<readonly ["ok", 200], "length">, 2>
>;
type _07d = Expect<
  Equal<TupleValue<readonly [head: "a", tail?: "b"], 1>, "b" | undefined>
>;

// 8. Project every possible value from a head-plus-rest tuple.
export type RestTupleValues<
  Head,
  Rest,
> = TODO; // TODO(koan)

type _08a = Expect<Equal<RestTupleValues<"a", number>, "a" | number>>;
type _08b = Expect<Equal<RestTupleValues<1, 2 | 3>, 1 | 2 | 3>>;
type _08c = Expect<
  Equal<RestTupleValues<{ id: string }, never>, { id: string }>
>;
type _08d = Expect<Equal<RestTupleValues<never, never>, never>>;

// ─── Chained projection ───────────────────────────────────────────────────────

// 9. Follow two known keys through a nested object.
export type ValueAt2<
  Shape,
  First extends keyof Shape,
  Second extends keyof Shape[First],
> = TODO; // TODO(koan)

type NestedModel = {
  account: {
    profile: {
      name: string;
      age: number;
    };
  };
  rows: Array<{ id: string }>;
};

type _09a = Expect<
  Equal<ValueAt2<NestedModel, "account", "profile">, { name: string; age: number }>
>;
type _09b = Expect<
  Equal<ValueAt2<NestedModel["account"], "profile", "name">, string>
>;
type _09c = Expect<
  Equal<ValueAt2<{ outer: { optional?: 1 } }, "outer", "optional">, 1 | undefined>
>;

// 10. Recursively follow a key path, removing nullish absence before each step.
//     Hint: use a tuple pattern for the path and NonNullable at each descent.
export type DefinedPathValue<
  Shape,
  Path extends readonly PropertyKey[],
> = TODO; // TODO(koan)

type DeepModel = {
  account?: {
    profile?: {
      preferences?: {
        theme: "light" | "dark";
      };
    };
  };
};

type _10a = Expect<
  Equal<
    DefinedPathValue<DeepModel, ["account", "profile", "preferences", "theme"]>,
    "light" | "dark"
  >
>;
type _10b = Expect<
  Equal<
    DefinedPathValue<DeepModel, ["account", "profile"]>,
    { preferences?: { theme: "light" | "dark" } }
  >
>;
type _10c = Expect<Equal<DefinedPathValue<DeepModel, []>, DeepModel>>;
type _10d = Expect<
  Equal<DefinedPathValue<DeepModel, ["account", "missing"]>, never>
>;

// Given machinery: expose an array property's element before constraining its key.
type GivenElement<Container> =
  Container extends readonly (infer Element)[] ? Element : never;

// 11. Project through an array property and then through an element property.
export type CollectionProperty<
  Shape,
  CollectionKey extends keyof Shape,
  ItemKey extends keyof GivenElement<Shape[CollectionKey]>,
> = TODO; // TODO(koan)

type _11a = Expect<
  Equal<
    CollectionProperty<{ posts: Array<{ id: string; active: boolean }> }, "posts", "id">,
    string
  >
>;
type _11b = Expect<
  Equal<
    CollectionProperty<
      { rows: readonly [{ value: "a" }, { value: 1 }] },
      "rows",
      "value"
    >,
    "a" | 1
  >
>;
type _11c = Expect<
  Equal<
    CollectionProperty<{ empty: readonly never[] }, "empty", never>,
    never
  >
>;

// ─── Related generic keys and result shapes ──────────────────────────────────

// 12. Construct the selected result of a related generic key.
export type SelectedValue<
  Shape,
  Key extends keyof Shape,
> = TODO; // TODO(koan)

type _12a = Expect<Equal<SelectedValue<ProjectionModel, "id">, number>>;
type _12b = Expect<
  Equal<SelectedValue<ProjectionModel, "optional">, "yes" | undefined>
>;
type _12c = Expect<
  Equal<SelectedValue<ProjectionModel, "id" | "title">, number | string>
>;

// 13. Construct the array returned when one property is plucked from many values.
export type PluckedValues<
  Shape,
  Key extends keyof Shape,
> = TODO; // TODO(koan)

type _13a = Expect<
  Equal<PluckedValues<ProjectionModel, "title">, string[]>
>;
type _13b = Expect<
  Equal<PluckedValues<ProjectionModel, "optional">, ("yes" | undefined)[]>
>;
type _13c = Expect<
  Equal<PluckedValues<ProjectionModel, "id" | "published">, (number | boolean)[]>
>;

// 14. Construct the generic property-getter signature.
export type GetPropertySignature = TODO; // TODO(koan)

type _14a = Expect<
  Equal<
    GetPropertySignature,
    <T, K extends keyof T>(value: T, key: K) => T[K]
  >
>;
type _14b = Expect<
  Equal<Parameters<GetPropertySignature>, [value: unknown, key: never]>
>;

// 15. Construct the generic pluck signature.
export type PluckSignature = TODO; // TODO(koan)

type _15a = Expect<
  Equal<
    PluckSignature,
    <T, K extends keyof T>(values: readonly T[], key: K) => Array<T[K]>
  >
>;
type _15b = Expect<
  Equal<
    Parameters<PluckSignature>,
    [values: readonly unknown[], key: never]
  >
>;

// 16. Construct the generic tuple-element getter signature.
export type TupleGetterSignature = TODO; // TODO(koan)

type _16a = Expect<
  Equal<
    TupleGetterSignature,
    <T extends readonly unknown[], K extends keyof T>(
      tuple: T,
      key: K,
    ) => T[K]
  >
>;
type _16b = Expect<Equal<ReturnType<TupleGetterSignature>, unknown>>;

// 17. Construct the asserted enumerable-values helper result.
export type EnumerableValues<Shape extends object> = TODO; // TODO(koan)

type _17a = Expect<
  Equal<EnumerableValues<{ id: number; active: boolean }>, (number | boolean)[]>
>;
type _17b = Expect<
  Equal<EnumerableValues<{ optional?: string }>, (string | undefined)[]>
>;
type _17c = Expect<Equal<EnumerableValues<{}>, never[]>>;

// ─── Unions, indexes, invalid keys, and special propagation ──────────────────

// 18. Project a key guaranteed by every member of an object union.
export type SharedUnionValue<
  Union,
  Key extends keyof Union,
> = TODO; // TODO(koan)

type ObjectUnion =
  | { shared: "left"; left: number }
  | { shared: "right"; right: boolean };

type _18a = Expect<
  Equal<SharedUnionValue<ObjectUnion, "shared">, "left" | "right">
>;
type _18b = Expect<
  Equal<
    SharedUnionValue<{ optional?: 1; a: true } | { optional: 2; b: false }, "optional">,
    1 | 2 | undefined
  >
>;
type _18c = Expect<
  Equal<SharedUnionValue<{ a: 1 } | {}, never>, never>
>;

// 19. Project values from an intersection using keys from either surface.
export type IntersectionValues<
  Left,
  Right,
  Keys extends keyof (Left & Right),
> = TODO; // TODO(koan)

type _19a = Expect<
  Equal<IntersectionValues<{ a: 1 }, { b: 2 }, "a" | "b">, 1 | 2>
>;
type _19b = Expect<
  Equal<IntersectionValues<{ shared: string }, { shared: "fixed" }, "shared">, "fixed">
>;
type _19c = Expect<
  Equal<IntersectionValues<{}, {}, never>, never>
>;

// 20. Project a value through a string index signature using string or number.
export type StringIndexValue<
  Value,
  Key extends string | number,
> = TODO; // TODO(koan)

type _20a = Expect<Equal<StringIndexValue<Date, string>, Date>>;
type _20b = Expect<Equal<StringIndexValue<number, number>, number>>;
type _20c = Expect<
  Equal<StringIndexValue<"a" | "b", "named" | 0>, "a" | "b">
>;
type _20d = Expect<Equal<StringIndexValue<never, string>, never>>;

// 21. Return never for an inadmissible key instead of producing a compiler error.
export type SafeLookup<
  Shape,
  Key extends PropertyKey,
> = TODO; // TODO(koan)

type _21a = Expect<Equal<SafeLookup<{ id: number }, "id">, number>>;
type _21b = Expect<Equal<SafeLookup<{ id: number }, "missing">, never>>;
type _21c = Expect<
  Equal<SafeLookup<{ a: 1; b: 2 }, "a" | "missing">, 1>
>;
type _21d = Expect<Equal<SafeLookup<unknown, "x">, never>>;
type _21e = Expect<Equal<SafeLookup<{ a: 1 }, never>, never>>;

// 22. Classify a lookup result so any remains observable.
export type LookupKind<
  Shape,
  Key extends keyof Shape,
> = TODO; // TODO(koan)

type _22a = Expect<Equal<LookupKind<any, string>, "any">>;
type _22b = Expect<
  Equal<LookupKind<{ [key: string]: unknown }, string>, "unknown">
>;
type _22c = Expect<
  Equal<LookupKind<{ impossible: never }, "impossible">, "never">
>;
type _22d = Expect<
  Equal<LookupKind<{ ordinary: string }, "ordinary">, "ordinary">
>;

// 23. Project a value selected by a unique-symbol key.
export type SymbolValue<
  Shape,
  Key extends keyof Shape & symbol,
> = TODO; // TODO(koan)

type _23a = Expect<
  Equal<SymbolValue<{ [givenToken]: "secret" }, typeof givenToken>, "secret">
>;
type _23b = Expect<
  Equal<
    SymbolValue<
      { [givenToken]: { readonly value: 1 } },
      typeof givenToken
    >,
    { readonly value: 1 }
  >
>;
type _23c = Expect<
  Equal<SymbolValue<{ [key: symbol]: boolean }, typeof givenToken>, boolean>
>;

// 24. Project no values when the selected key union is empty.
export type EmptySelection<Shape> = TODO; // TODO(koan)

type _24a = Expect<Equal<EmptySelection<{ a: 1; b: 2 }>, never>>;
type _24b = Expect<Equal<EmptySelection<{}>, never>>;
type _24c = Expect<
  Equal<EmptySelection<{ optional?: string }>, never>
>;
