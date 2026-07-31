import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-059: distributive conditional types — constructions
 * =============================================================================
 *
 * These constructions map naked type parameters over union members into
 * arrays, boxes, functions, tags, filters, products, handlers, and correlated
 * structural rows. They contrast naked checks with wrapped, intersected, and
 * constructed checked sides; cover never/any/unknown/boolean and duplicate
 * normalization; and compose filters with later transformations. Replace each
 * `TODO` with a type satisfying the assertions directly below it.
 */

type GivenBox<Value> =
  Value extends unknown ? { value: Value } : never;
type GivenKeep<Value, Constraint> =
  Value extends Constraint ? Value : never;
type GivenDist<Value> =
  Value extends string ? { text: Value } : { other: Value };
type GivenIsAny<Value> = 0 extends (1 & Value) ? true : false;

type GivenEvent =
  | { type: "open"; path: string }
  | { type: "close"; code: number }
  | { type: "tick"; at: Date };

type GivenShape =
  | { kind: "point"; x: number; y: number }
  | { kind: "line"; x: number; y: number; length: number }
  | { kind: "label"; text: string };

// ─── Mapping and filtering union members ──────────────────────────────────

// 1. Map every union member to its own array type.
export type ToArray<Value> = TODO; // TODO(koan)

type _01a = Expect<Equal<ToArray<string | number>, string[] | number[]>>;
type _01b = Expect<Equal<ToArray<1 | 2 | 3>, 1[] | 2[] | 3[]>>;
type _01c = Expect<
  Equal<ToArray<null | undefined>, null[] | undefined[]>
>;
type _01d = Expect<
  Equal<ToArray<PropertyKey>, string[] | number[] | symbol[]>
>;
type _01e = Expect<Equal<ToArray<never>, never>>;

// 2. Map every union member to a value box.
export type ToBox<Value> = TODO; // TODO(koan)

type _02a = Expect<
  Equal<ToBox<string | number>, { value: string } | { value: number }>
>;
type _02b = Expect<
  Equal<ToBox<boolean>, { value: false } | { value: true }>
>;
type _02c = Expect<
  Equal<
    ToBox<readonly [1] | readonly [2]>,
    { value: readonly [1] } | { value: readonly [2] }
  >
>;
type _02d = Expect<Equal<ToBox<unknown>, { value: unknown }>>;
type _02e = Expect<Equal<ToBox<never>, never>>;

// 3. Preserve each member in two correlated tagged fields.
export type Tagged<Value> = TODO; // TODO(koan)

type _03a = Expect<
  Equal<
    Tagged<"a" | "b">,
    { type: "a"; value: "a" } | { type: "b"; value: "b" }
  >
>;
type _03b = Expect<
  Equal<
    Tagged<1 | 2>,
    { type: 1; value: 1 } | { type: 2; value: 2 }
  >
>;
type _03c = Expect<
  Equal<
    Tagged<boolean>,
    { type: false; value: false } | { type: true; value: true }
  >
>;
type _03d = Expect<Equal<Tagged<never>, never>>;

// 4. Map each union member to a zero-argument function returning that member.
export type ToFunction<Value> = TODO; // TODO(koan)

type _04a = Expect<
  Equal<ToFunction<"a" | 1>, (() => "a") | (() => 1)>
>;
type _04b = Expect<
  Equal<ToFunction<true | false>, (() => true) | (() => false)>
>;
type _04c = Expect<Equal<ToFunction<unknown>, () => unknown>>;
type _04d = Expect<Equal<ToFunction<never>, never>>;

// 5. Keep only members assignable to a supplied constraint.
export type Keep<Value, Constraint> = TODO; // TODO(koan)

type _05a = Expect<Equal<Keep<string | number | boolean, string>, string>>;
type _05b = Expect<Equal<Keep<"a" | 1 | "b" | 2, string>, "a" | "b">>;
type _05c = Expect<Equal<Keep<1 | 2 | 3, 1 | 3>, 1 | 3>>;
type _05d = Expect<
  Equal<Keep<{ id: 1 } | { name: "x" }, { id: unknown }>, { id: 1 }>
>;
type _05e = Expect<Equal<Keep<never, unknown>, never>>;

// 6. Drop members assignable to a supplied constraint.
export type Drop<Value, Constraint> = TODO; // TODO(koan)

type _06a = Expect<Equal<Drop<string | number | boolean, string>, number | boolean>>;
type _06b = Expect<Equal<Drop<"a" | 1 | "b" | 2, string>, 1 | 2>>;
type _06c = Expect<Equal<Drop<1 | 2 | 3, 2>, 1 | 3>>;
type _06d = Expect<
  Equal<Drop<{ id: 1 } | { name: "x" }, { id: unknown }>, { name: "x" }>
>;
type _06e = Expect<Equal<Drop<string | number, unknown>, never>>;

// 7. Filter structurally overlapping shape members by one capability.
export type StructuralFilter<Value, Capability> = TODO; // TODO(koan)

type _07a = Expect<
  Equal<
    StructuralFilter<GivenShape, { x: number }>,
    Extract<GivenShape, { kind: "point" | "line" }>
  >
>;
type _07b = Expect<
  Equal<
    StructuralFilter<GivenShape, { length: number }>,
    Extract<GivenShape, { kind: "line" }>
  >
>;
type _07c = Expect<
  Equal<
    StructuralFilter<GivenShape, { kind: "point" | "label" }>,
    Extract<GivenShape, { kind: "point" | "label" }>
  >
>;
type _07d = Expect<Equal<StructuralFilter<GivenShape | null, object>, GivenShape>>;

// ─── Naked versus non-naked checked sides ─────────────────────────────────

// 8. Expose distributed, wrapped, intersected, and array-constructed checks.
export type DistributionModes<Value> = TODO; // TODO(koan)

type _08a = Expect<
  Equal<
    DistributionModes<string | number>,
    [
      { text: string } | { other: number },
      { other: string | number },
      { other: string | number },
      "other",
    ]
  >
>;
type _08b = Expect<
  Equal<
    DistributionModes<"a" | "b">,
    [
      { text: "a" } | { text: "b" },
      { text: "a" | "b" },
      { text: "a" | "b" },
      "strings",
    ]
  >
>;
type _08c = Expect<
  Equal<
    DistributionModes<number>,
    [{ other: number }, { other: number }, { other: number }, "other"]
  >
>;
type _08d = Expect<
  Equal<
    DistributionModes<unknown>,
    [{ other: unknown }, { other: unknown }, { other: unknown }, "other"]
  >
>;

// 9. Ask whether a complete union fits a constraint without distributing it.
export type WholeUnionChoice<Value, Constraint, Yes, No> = TODO; // TODO(koan)

type _09a = Expect<
  Equal<WholeUnionChoice<string | number, string, "yes", "no">, "no">
>;
type _09b = Expect<
  Equal<WholeUnionChoice<"a" | "b", string, "yes", "no">, "yes">
>;
type _09c = Expect<
  Equal<WholeUnionChoice<1 | 3, 1 | 2, "yes", "no">, "no">
>;
type _09d = Expect<
  Equal<WholeUnionChoice<never, string, "yes", "no">, "yes">
>;

// 10. Normalize duplicate branch results after member-wise evaluation.
export type NormalizeBranches<Value> = TODO; // TODO(koan)

type _10a = Expect<Equal<NormalizeBranches<"a" | "b">, string>>;
type _10b = Expect<Equal<NormalizeBranches<1 | 2 | 3>, 0>>;
type _10c = Expect<Equal<NormalizeBranches<string | number>, string | 0>>;
type _10d = Expect<Equal<NormalizeBranches<boolean>, never>>;
type _10e = Expect<Equal<NormalizeBranches<never>, never>>;

// ─── Nested distribution and Cartesian products ───────────────────────────

// 11. Distribute two naked parameters into their Cartesian product.
export type Product<Left, Right> = TODO; // TODO(koan)

type _11a = Expect<
  Equal<
    Product<"a" | "b", 1 | 2>,
    ["a", 1] | ["a", 2] | ["b", 1] | ["b", 2]
  >
>;
type _11b = Expect<
  Equal<Product<"a", 1 | 2 | 3>, ["a", 1] | ["a", 2] | ["a", 3]>
>;
type _11c = Expect<
  Equal<Product<boolean, "x">, [false, "x"] | [true, "x"]>
>;
type _11d = Expect<Equal<Product<never, 1 | 2>, never>>;
type _11e = Expect<Equal<Product<"a" | "b", never>, never>>;

// 12. Distribute three naked parameters into a three-axis product.
export type TripleProduct<First, Second, Third> = TODO; // TODO(koan)

type _12a = Expect<
  Equal<
    TripleProduct<"a" | "b", 1 | 2, true>,
    | ["a", 1, true]
    | ["a", 2, true]
    | ["b", 1, true]
    | ["b", 2, true]
  >
>;
type _12b = Expect<
  Equal<
    TripleProduct<"a", 1 | 2, "x" | "y">,
    ["a", 1, "x"] | ["a", 1, "y"] | ["a", 2, "x"] | ["a", 2, "y"]
  >
>;
type _12c = Expect<
  Equal<
    TripleProduct<null | undefined, 0, "x">,
    [null, 0, "x"] | [undefined, 0, "x"]
  >
>;
type _12d = Expect<Equal<TripleProduct<"a", never, true>, never>>;

// ─── Structured member correlation ────────────────────────────────────────

// 13. Build one event-specific handler per distributed event member.
export type HandlerFor<Event extends { type: PropertyKey }> = TODO; // TODO(koan)

type _13a = Expect<
  Equal<
    HandlerFor<GivenEvent>,
    | {
      type: "open";
      handle: (event: { type: "open"; path: string }) => void;
    }
    | {
      type: "close";
      handle: (event: { type: "close"; code: number }) => void;
    }
    | {
      type: "tick";
      handle: (event: { type: "tick"; at: Date }) => void;
    }
  >
>;
type _13b = Expect<
  Equal<
    Extract<HandlerFor<GivenEvent>, { type: "open" }>,
    {
      type: "open";
      handle: (event: { type: "open"; path: string }) => void;
    }
  >
>;
type _13c = Expect<
  Equal<
    Parameters<Extract<HandlerFor<GivenEvent>, { type: "close" }>["handle"]>,
    [event: { type: "close"; code: number }]
  >
>;
type _13d = Expect<Equal<HandlerFor<never>, never>>;

// 14. Pair each event discriminator with its complete correlated event member.
export type EventRow<Event extends { type: PropertyKey }> = TODO; // TODO(koan)

type _14a = Expect<
  Equal<
    EventRow<GivenEvent>,
    | ["open", { type: "open"; path: string }]
    | ["close", { type: "close"; code: number }]
    | ["tick", { type: "tick"; at: Date }]
  >
>;
type _14b = Expect<
  Equal<
    Extract<EventRow<GivenEvent>, ["tick", unknown]>,
    ["tick", { type: "tick"; at: Date }]
  >
>;
type _14c = Expect<
  Equal<
    EventRow<
      { type: 0; value: string } | { type: 1; value: number }
    >,
    [0, { type: 0; value: string }] | [1, { type: 1; value: number }]
  >
>;
type _14d = Expect<Equal<EventRow<never>, never>>;

// 15. Correlate each shape's discriminator, keys, and complete member.
export type CorrelateShape<Shape extends { kind: PropertyKey }> = TODO; // TODO(koan)

type _15a = Expect<
  Equal<
    Extract<CorrelateShape<GivenShape>, ["point", any, any]>,
    ["point", "kind" | "x" | "y", Extract<GivenShape, { kind: "point" }>]
  >
>;
type _15b = Expect<
  Equal<
    Extract<CorrelateShape<GivenShape>, ["line", any, any]>,
    [
      "line",
      "kind" | "x" | "y" | "length",
      Extract<GivenShape, { kind: "line" }>,
    ]
  >
>;
type _15c = Expect<
  Equal<
    Extract<CorrelateShape<GivenShape>, ["label", any, any]>[1],
    "kind" | "text"
  >
>;
type _15d = Expect<Equal<CorrelateShape<never>, never>>;

// 16. Map each shape member into its own discriminator-keyed singleton record.
export type ShapeSingletonRecords<Shape extends { kind: PropertyKey }> = TODO; // TODO(koan)

type _16a = Expect<
  Equal<
    ShapeSingletonRecords<Extract<GivenShape, { kind: "point" | "label" }>>,
    | { point: Extract<GivenShape, { kind: "point" }> }
    | { label: Extract<GivenShape, { kind: "label" }> }
  >
>;
type _16b = Expect<
  Equal<
    ShapeSingletonRecords<{ kind: 0; value: string } | { kind: 1; value: number }>,
    | { 0: { kind: 0; value: string } }
    | { 1: { kind: 1; value: number } }
  >
>;
type _16c = Expect<
  Equal<
    keyof ShapeSingletonRecords<GivenShape>,
    never
  >
>;
type _16d = Expect<Equal<ShapeSingletonRecords<never>, never>>;

// ─── Composed transforms and special inputs ───────────────────────────────

// 17. Filter members, then box each survivor independently.
export type BoxFiltered<Value, Constraint> = TODO; // TODO(koan)

type _17a = Expect<
  Equal<
    BoxFiltered<"a" | 1 | "b" | 2, string>,
    { value: "a" } | { value: "b" }
  >
>;
type _17b = Expect<
  Equal<
    BoxFiltered<GivenEvent, { type: "open" | "close" }>,
    | { value: Extract<GivenEvent, { type: "open" }> }
    | { value: Extract<GivenEvent, { type: "close" }> }
  >
>;
type _17c = Expect<
  Equal<BoxFiltered<string | number, unknown>, { value: string } | { value: number }>
>;
type _17d = Expect<Equal<BoxFiltered<string | number, never>, never>>;

// 18. Filter members, then map each survivor to its own array.
export type ArrayFiltered<Value, Constraint> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<ArrayFiltered<"a" | 1 | "b", string>, "a"[] | "b"[]>
>;
type _18b = Expect<
  Equal<
    ArrayFiltered<GivenEvent, { path: string }>,
    Extract<GivenEvent, { type: "open" }>[]
  >
>;
type _18c = Expect<
  Equal<ArrayFiltered<1 | 2 | 3, 1 | 3>, 1[] | 3[]>
>;
type _18d = Expect<Equal<ArrayFiltered<never, unknown>, never>>;

// 19. Compare correlated rows with a loose whole-union pair.
export type EventRowModes<Event extends { type: PropertyKey }> = TODO; // TODO(koan)

type _19a = Expect<
  Equal<
    EventRowModes<
      { type: "open"; path: string } | { type: "close"; code: number }
    >,
    [
      | ["open", { type: "open"; path: string }]
      | ["close", { type: "close"; code: number }],
      [
        "open" | "close",
        { type: "open"; path: string } | { type: "close"; code: number },
      ],
    ]
  >
>;
type _19b = Expect<
  Equal<
    EventRowModes<{ type: 0; value: string }>[0],
    [0, { type: 0; value: string }]
  >
>;
type _19c = Expect<
  Equal<
    EventRowModes<GivenEvent>[0],
    | ["open", { type: "open"; path: string }]
    | ["close", { type: "close"; code: number }]
    | ["tick", { type: "tick"; at: Date }]
  >
>;
type _19d = Expect<
  Equal<EventRowModes<never>, [never, [never, never]]>
>;
type _19e = Expect<
  Equal<
    EventRowModes<{ type: 0; value: string }>[1],
    [0, { type: 0; value: string }]
  >
>;

// 20. Classify special distributive results without expecting raw any.
export type DistributionSpecialProfile<Value> = TODO; // TODO(koan)

type _20a = Expect<
  Equal<
    DistributionSpecialProfile<any>,
    [
      true,
      false,
      true,
      false,
      { text: any } | { other: any },
      "any",
    ]
  >
>;
type _20b = Expect<
  Equal<
    DistributionSpecialProfile<never>,
    [false, false, false, true, never, never]
  >
>;
type _20c = Expect<
  Equal<
    DistributionSpecialProfile<unknown>,
    [false, false, false, false, { other: unknown }, never]
  >
>;
type _20d = Expect<
  Equal<
    DistributionSpecialProfile<boolean>,
    [
      false,
      false,
      false,
      false,
      { other: false } | { other: true },
      never,
    ]
  >
>;
