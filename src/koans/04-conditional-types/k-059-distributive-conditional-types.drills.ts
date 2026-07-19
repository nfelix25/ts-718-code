import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-059 guided drills: distributive conditional types
 * =============================================================================
 * Expand each naked checked parameter into one evaluation per union member.
 * Simplify each branch result, remove never, and union what remains.
 */

type DArray<T> = T extends unknown ? T[] : never;
type DBox<T> = T extends unknown ? { value: T } : never;
type DKeep<T, U> = T extends U ? T : never;
type DDrop<T, U> = T extends U ? never : T;
type DPair<A, B> = A extends unknown ? B extends unknown ? [A, B] : never : never;

// Mapping each member into arrays, boxes, tuples, and functions.
type _D01 = Expect<Equal<DArray<string | number>, TODO>>; // TODO(koan) @koan-error
type _D02 = Expect<Equal<DArray<"a" | "b">, TODO>>; // TODO(koan) @koan-error
type _D03 = Expect<Equal<DArray<1 | 2 | 3>, TODO>>; // TODO(koan) @koan-error
type _D04 = Expect<Equal<DBox<string | number>, TODO>>; // TODO(koan) @koan-error
type _D05 = Expect<Equal<DBox<boolean>, TODO>>; // TODO(koan) @koan-error
type _D06 = Expect<Equal<DBox<true | false>, TODO>>; // TODO(koan) @koan-error
type _D07 = Expect<Equal<(string | number) extends infer T ? T extends unknown ? [T] : never : never, TODO>>; // TODO(koan) @koan-error
type _D08 = Expect<Equal<{ a: 1 } | { b: 2 } extends infer T ? T extends unknown ? { item: T } : never : never, TODO>>; // TODO(koan) @koan-error
type _D09 = Expect<Equal<DArray<null | undefined>, TODO>>; // TODO(koan) @koan-error
type _D10 = Expect<Equal<DBox<readonly [1] | readonly [2]>, TODO>>; // TODO(koan) @koan-error
type _D11 = Expect<Equal<("a" | 1) extends infer T ? T extends unknown ? () => T : never : never, TODO>>; // TODO(koan) @koan-error
type _D12 = Expect<Equal<DArray<never>, TODO>>; // TODO(koan) @koan-error
type _D13 = Expect<Equal<DBox<unknown>, TODO>>; // TODO(koan) @koan-error
type _D14 = Expect<Equal<DBox<{} | null>, TODO>>; // TODO(koan) @koan-error
type _D15 = Expect<Equal<DArray<PropertyKey>, TODO>>; // TODO(koan) @koan-error

// Filtering and exclusion use never as the zero-member result.
type _D16 = Expect<Equal<DKeep<string | number, string>, TODO>>; // TODO(koan) @koan-error
type _D17 = Expect<Equal<DKeep<"a" | 1 | "b" | 2, string>, TODO>>; // TODO(koan) @koan-error
type _D18 = Expect<Equal<DKeep<1 | 2 | 3, 1 | 3>, TODO>>; // TODO(koan) @koan-error
type _D19 = Expect<Equal<DKeep<string | null | undefined, null | undefined>, TODO>>; // TODO(koan) @koan-error
type _D20 = Expect<Equal<DKeep<{ id: 1 } | { name: "x" }, { id: unknown }>, TODO>>; // TODO(koan) @koan-error
type _D21 = Expect<Equal<DDrop<string | number, string>, TODO>>; // TODO(koan) @koan-error
type _D22 = Expect<Equal<DDrop<"a" | 1 | "b" | 2, string>, TODO>>; // TODO(koan) @koan-error
type _D23 = Expect<Equal<DDrop<1 | 2 | 3, 2>, TODO>>; // TODO(koan) @koan-error
type _D24 = Expect<Equal<DDrop<string | null | undefined, null | undefined>, TODO>>; // TODO(koan) @koan-error
type _D25 = Expect<Equal<DDrop<{ id: 1 } | { name: "x" }, { id: unknown }>, TODO>>; // TODO(koan) @koan-error
type _D26 = Expect<Equal<DKeep<never, string>, TODO>>; // TODO(koan) @koan-error
type _D27 = Expect<Equal<DDrop<never, string>, TODO>>; // TODO(koan) @koan-error
type _D28 = Expect<Equal<DKeep<string | number, unknown>, TODO>>; // TODO(koan) @koan-error
type _D29 = Expect<Equal<DDrop<string | number, unknown>, TODO>>; // TODO(koan) @koan-error
type _D30 = Expect<Equal<DKeep<string | number, never>, TODO>>; // TODO(koan) @koan-error

// Concrete whole-union checks contrast with generic member-wise checks.
type _D31 = Expect<Equal<(string | number) extends string ? true : false, TODO>>; // TODO(koan) @koan-error
type _D32 = Expect<Equal<DKeep<string | number, string>, TODO>>; // TODO(koan) @koan-error
type _D33 = Expect<Equal<("a" | "b") extends string ? true : false, TODO>>; // TODO(koan) @koan-error
type _D34 = Expect<Equal<DKeep<"a" | "b", string>, TODO>>; // TODO(koan) @koan-error
type _D35 = Expect<Equal<({ a: 1 } | { b: 2 }) extends object ? "object" : "other", TODO>>; // TODO(koan) @koan-error
type _D36 = Expect<Equal<DKeep<{ a: 1 } | { b: 2 }, { a: unknown }>, TODO>>; // TODO(koan) @koan-error
type _D37 = Expect<Equal<(1 | 2) extends 1 ? "one" : "other", TODO>>; // TODO(koan) @koan-error
type _D38 = Expect<Equal<DKeep<1 | 2, 1>, TODO>>; // TODO(koan) @koan-error
type _D39 = Expect<Equal<(null | string) extends null ? true : false, TODO>>; // TODO(koan) @koan-error
type _D40 = Expect<Equal<DKeep<null | string, null>, TODO>>; // TODO(koan) @koan-error

// Nested distribution forms Cartesian products.
type _D41 = Expect<Equal<DPair<"a" | "b", 1 | 2>, TODO>>; // TODO(koan) @koan-error
type _D42 = Expect<Equal<DPair<"a", 1 | 2 | 3>, TODO>>; // TODO(koan) @koan-error
type _D43 = Expect<Equal<DPair<"a" | "b", 1>, TODO>>; // TODO(koan) @koan-error
type _D44 = Expect<Equal<DPair<never, 1 | 2>, TODO>>; // TODO(koan) @koan-error
type _D45 = Expect<Equal<DPair<"a" | "b", never>, TODO>>; // TODO(koan) @koan-error
type _D46 = Expect<Equal<DPair<boolean, "x" | "y">, TODO>>; // TODO(koan) @koan-error
type _D47 = Expect<Equal<DPair<null | undefined, 0 | 1>, TODO>>; // TODO(koan) @koan-error
type _D48 = Expect<Equal<DPair<1 | 2 | 3, "a" | "b" | "c">, TODO>>; // TODO(koan) @koan-error
type _D49 = Expect<Equal<DPair<unknown, 1 | 2>, TODO>>; // TODO(koan) @koan-error
type _D50 = Expect<Equal<DPair<"a" | "b", unknown>, TODO>>; // TODO(koan) @koan-error

type DEvent = { type: "open"; path: string } | { type: "close"; code: number } | { type: "tick"; at: Date };
type DRow<T extends { type: PropertyKey }> = T extends unknown ? [T["type"], T] : never;

// Structured members retain correlation inside each distributed branch.
type _D51 = Expect<Equal<DRow<DEvent>, TODO>>; // TODO(koan) @koan-error
type _D52 = Expect<Equal<Extract<DRow<DEvent>, ["open", unknown]>, TODO>>; // TODO(koan) @koan-error
type _D53 = Expect<Equal<Extract<DRow<DEvent>, ["close", unknown]>[1], TODO>>; // TODO(koan) @koan-error
type _D54 = Expect<Equal<DKeep<DEvent, { code: number }>, TODO>>; // TODO(koan) @koan-error
type _D55 = Expect<Equal<DDrop<DEvent, { type: "tick" }>, TODO>>; // TODO(koan) @koan-error
type _D56 = Expect<Equal<DEvent extends infer E ? E extends { type: PropertyKey } ? { key: E["type"]; event: E } : never : never, TODO>>; // TODO(koan) @koan-error
type _D57 = Expect<Equal<DRow<{ type: 0; value: string } | { type: 1; value: number }>, TODO>>; // TODO(koan) @koan-error
type _D58 = Expect<Equal<DRow<{ type: "same"; a: 1 } | { type: "same"; b: 2 }>, TODO>>; // TODO(koan) @koan-error
type _D59 = Expect<Equal<DBox<DKeep<DEvent, { type: "open" | "close" }>>, TODO>>; // TODO(koan) @koan-error
type _D60 = Expect<Equal<DArray<DKeep<DEvent, { path: string }>>, TODO>>; // TODO(koan) @koan-error
