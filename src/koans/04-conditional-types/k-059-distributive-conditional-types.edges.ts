import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-059 edge cases: distributive conditional types
 * =============================================================================
 * Distribution requires a naked checked parameter. Wrapping, indexing, or
 * constructing around T changes the question to one whole-union test. These
 * cases also stress special types, duplicate simplification, boolean expansion,
 * structural overlap, and correlation retention.
 */

type EDist<T> = T extends string ? { text: T } : { other: T };
type EWrapped<T> = [T] extends [string] ? { text: T } : { other: T };
type EIntersected<T> = (T & {}) extends string ? { text: T } : { other: T };
type EArrayChecked<T> = T[] extends string[] ? "strings" : "other";
type EKeep<T, U> = T extends U ? T : never;
type EIsAny<T> = 0 extends (1 & T) ? true : false;

// Naked, wrapped, intersected, and constructed checked sides differ.
type _E01 = Expect<Equal<EDist<string | number>, TODO>>; // TODO(koan) @koan-error
type _E02 = Expect<Equal<EWrapped<string | number>, TODO>>; // TODO(koan) @koan-error
type _E03 = Expect<Equal<EIntersected<string | number>, TODO>>; // TODO(koan) @koan-error
type _E04 = Expect<Equal<EArrayChecked<string | number>, TODO>>; // TODO(koan) @koan-error
type _E05 = Expect<Equal<EArrayChecked<string>, TODO>>; // TODO(koan) @koan-error
type _E06 = Expect<Equal<({ value: string | number })["value"] extends string ? true : false, TODO>>; // TODO(koan) @koan-error

// Never, any, unknown, and boolean have distinctive union behavior.
type _E07 = Expect<Equal<EDist<never>, TODO>>; // TODO(koan) @koan-error
type _E08 = Expect<Equal<EDist<any>, TODO>>; // TODO(koan) @koan-error
type _E09 = Expect<Equal<EIsAny<EDist<any>>, TODO>>; // TODO(koan) @koan-error
type _E10 = Expect<Equal<EDist<unknown>, TODO>>; // TODO(koan) @koan-error
type _E11 = Expect<Equal<EDist<unknown | string>, TODO>>; // TODO(koan) @koan-error
type _E12 = Expect<Equal<EDist<boolean>, TODO>>; // TODO(koan) @koan-error
type _E13 = Expect<Equal<EIsAny<EKeep<any, string>>, TODO>>; // TODO(koan) @koan-error
type _E14 = Expect<Equal<EKeep<unknown, string>, TODO>>; // TODO(koan) @koan-error

// Union normalization removes duplicates before and after distribution.
type _E15 = Expect<Equal<EDist<"a" | "a">, TODO>>; // TODO(koan) @koan-error
type _E16 = Expect<Equal<EKeep<"a" | string, "a">, TODO>>; // TODO(koan) @koan-error
type _E17 = Expect<Equal<EKeep<1 | number, 1>, TODO>>; // TODO(koan) @koan-error
type _E18 = Expect<Equal<("a" | "b") extends infer T ? T extends string ? string : never : never, TODO>>; // TODO(koan) @koan-error
type _E19 = Expect<Equal<(1 | 2) extends infer T ? T extends number ? 0 : never : never, TODO>>; // TODO(koan) @koan-error

type EShapes =
  | { kind: "point"; x: number; y: number }
  | { kind: "line"; x: number; y: number; length: number }
  | { kind: "label"; text: string };

// Structural filtering may match multiple wider members.
type _E20 = Expect<Equal<EKeep<EShapes, { x: number }>, TODO>>; // TODO(koan) @koan-error
type _E21 = Expect<Equal<EKeep<EShapes, { length: number }>, TODO>>; // TODO(koan) @koan-error
type _E22 = Expect<Equal<EKeep<EShapes, { kind: "point" | "label" }>, TODO>>; // TODO(koan) @koan-error
type _E23 = Expect<Equal<EKeep<EShapes, object>, TODO>>; // TODO(koan) @koan-error
type _E24 = Expect<Equal<EKeep<EShapes | null, object>, TODO>>; // TODO(koan) @koan-error

// Branch-local T retains exact members and can derive correlated data.
type ECorrelate<T> = T extends { kind: PropertyKey } ? [T["kind"], keyof T, T] : never;
type _E25 = Expect<Equal<ECorrelate<EShapes>, TODO>>; // TODO(koan) @koan-error
type _E26 = Expect<Equal<Extract<ECorrelate<EShapes>, ["line", any, any]>, TODO>>; // TODO(koan) @koan-error
type _E27 = Expect<Equal<Extract<ECorrelate<EShapes>, ["label", any, any]>[1], TODO>>; // TODO(koan) @koan-error
type _E28 = Expect<Equal<EShapes extends infer S ? S extends { kind: PropertyKey } ? { [K in S["kind"]]: S } : never : never, TODO>>; // TODO(koan) @koan-error
type _E29 = Expect<Equal<EKeep<EShapes, { kind: PropertyKey }> extends infer S ? S extends EShapes ? S["kind"] : never : never, TODO>>; // TODO(koan) @koan-error
type _E30 = Expect<Equal<EKeep<EShapes, never>, TODO>>; // TODO(koan) @koan-error

// Pre-solved: tuple wrapping asks whether the complete union is string.
type _DemoWrapped = Expect<Equal<EWrapped<string | number>, { other: string | number }>>;

// Pre-solved: boolean is normalized as true | false and distributes accordingly.
type _DemoBoolean = Expect<Equal<EDist<boolean>, { other: false } | { other: true }>>;

// Pre-solved: structurally wider line and point members both have x.
type _DemoStructural = Expect<Equal<EKeep<EShapes, { x: number }>, Extract<EShapes, { kind: "point" | "line" }>>>;

// A distributed union of arrays does not accept a mixed-element array.
// @ts-expect-error (string | number)[] is not string[] | number[].
const invalidMixedArray: (string[] | number[]) = ["x", 1];
void invalidMixedArray;
