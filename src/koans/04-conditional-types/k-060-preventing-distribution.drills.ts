import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-060 guided drills: preventing distribution
 * =============================================================================
 * Decide whether the intended quantifier is each, every, or some. Naked T maps
 * each; [T] asks every; filtering followed by a wrapped never check asks some.
 */

type DEvery<T, U> = [T] extends [U] ? true : false;
type DSome<T, U> = [Extract<T, U>] extends [never] ? false : true;
type DDistArray<T> = T extends unknown ? T[] : never;
type DWholeArray<T> = [T] extends [unknown] ? T[] : never;
type DDistBox<T> = T extends unknown ? { value: T } : never;
type DWholeBox<T> = [T] extends [unknown] ? { value: T } : never;

// Every-member aggregate tests across primitives, literals, and structures.
type _D01 = Expect<Equal<DEvery<string | number, string>, TODO>>; // TODO(koan) @koan-error
type _D02 = Expect<Equal<DEvery<"a" | "b", string>, TODO>>; // TODO(koan) @koan-error
type _D03 = Expect<Equal<DEvery<1 | 2, number>, TODO>>; // TODO(koan) @koan-error
type _D04 = Expect<Equal<DEvery<1 | "a", number | string>, TODO>>; // TODO(koan) @koan-error
type _D05 = Expect<Equal<DEvery<true | false, boolean>, TODO>>; // TODO(koan) @koan-error
type _D06 = Expect<Equal<DEvery<null | undefined, null | undefined>, TODO>>; // TODO(koan) @koan-error
type _D07 = Expect<Equal<DEvery<string | null, {}>, TODO>>; // TODO(koan) @koan-error
type _D08 = Expect<Equal<DEvery<{ id: 1 } | { id: 2; name: string }, { id: number }>, TODO>>; // TODO(koan) @koan-error
type _D09 = Expect<Equal<DEvery<{ id: 1 } | { name: string }, { id: number }>, TODO>>; // TODO(koan) @koan-error
type _D10 = Expect<Equal<DEvery<string[] | number[], readonly unknown[]>, TODO>>; // TODO(koan) @koan-error
type _D11 = Expect<Equal<DEvery<string[] | readonly number[], unknown[]>, TODO>>; // TODO(koan) @koan-error
type _D12 = Expect<Equal<DEvery<never, string>, TODO>>; // TODO(koan) @koan-error
type _D13 = Expect<Equal<DEvery<unknown, unknown>, TODO>>; // TODO(koan) @koan-error
type _D14 = Expect<Equal<DEvery<unknown, string>, TODO>>; // TODO(koan) @koan-error
type _D15 = Expect<Equal<DEvery<any, string>, TODO>>; // TODO(koan) @koan-error

// Some-member overlap tests use a distributed filter then a whole never check.
type _D16 = Expect<Equal<DSome<string | number, string>, TODO>>; // TODO(koan) @koan-error
type _D17 = Expect<Equal<DSome<number | boolean, string>, TODO>>; // TODO(koan) @koan-error
type _D18 = Expect<Equal<DSome<"a" | 1 | "b", string>, TODO>>; // TODO(koan) @koan-error
type _D19 = Expect<Equal<DSome<1 | 2 | 3, 2>, TODO>>; // TODO(koan) @koan-error
type _D20 = Expect<Equal<DSome<1 | 2 | 3, 4>, TODO>>; // TODO(koan) @koan-error
type _D21 = Expect<Equal<DSome<null | string, null>, TODO>>; // TODO(koan) @koan-error
type _D22 = Expect<Equal<DSome<undefined | number, null>, TODO>>; // TODO(koan) @koan-error
type _D23 = Expect<Equal<DSome<{ id: 1 } | { name: string }, { id: unknown }>, TODO>>; // TODO(koan) @koan-error
type _D24 = Expect<Equal<DSome<{ id: 1 } | { id: 2 }, { id: number }>, TODO>>; // TODO(koan) @koan-error
type _D25 = Expect<Equal<DSome<string[] | number, readonly unknown[]>, TODO>>; // TODO(koan) @koan-error
type _D26 = Expect<Equal<DSome<never, string>, TODO>>; // TODO(koan) @koan-error
type _D27 = Expect<Equal<DSome<unknown, string>, TODO>>; // TODO(koan) @koan-error
type _D28 = Expect<Equal<DSome<any, string>, TODO>>; // TODO(koan) @koan-error
type _D29 = Expect<Equal<DSome<boolean, true>, TODO>>; // TODO(koan) @koan-error
type _D30 = Expect<Equal<DSome<PropertyKey, symbol>, TODO>>; // TODO(koan) @koan-error

// Distributed homogeneous arrays versus whole mixed arrays.
type _D31 = Expect<Equal<DDistArray<string | number>, TODO>>; // TODO(koan) @koan-error
type _D32 = Expect<Equal<DWholeArray<string | number>, TODO>>; // TODO(koan) @koan-error
type _D33 = Expect<Equal<DDistArray<"a" | "b">, TODO>>; // TODO(koan) @koan-error
type _D34 = Expect<Equal<DWholeArray<"a" | "b">, TODO>>; // TODO(koan) @koan-error
type _D35 = Expect<Equal<DDistArray<boolean>, TODO>>; // TODO(koan) @koan-error
type _D36 = Expect<Equal<DWholeArray<boolean>, TODO>>; // TODO(koan) @koan-error
type _D37 = Expect<Equal<DDistArray<null | undefined>, TODO>>; // TODO(koan) @koan-error
type _D38 = Expect<Equal<DWholeArray<null | undefined>, TODO>>; // TODO(koan) @koan-error
type _D39 = Expect<Equal<DDistArray<{ a: 1 } | { b: 2 }>, TODO>>; // TODO(koan) @koan-error
type _D40 = Expect<Equal<DWholeArray<{ a: 1 } | { b: 2 }>, TODO>>; // TODO(koan) @koan-error
type _D41 = Expect<Equal<DDistArray<never>, TODO>>; // TODO(koan) @koan-error
type _D42 = Expect<Equal<DWholeArray<never>, TODO>>; // TODO(koan) @koan-error
type _D43 = Expect<Equal<DDistArray<unknown>, TODO>>; // TODO(koan) @koan-error
type _D44 = Expect<Equal<DWholeArray<unknown>, TODO>>; // TODO(koan) @koan-error
type _D45 = Expect<Equal<(string | number)[] extends string[] | number[] ? true : false, TODO>>; // TODO(koan) @koan-error

// Box correlation and alternative non-naked wrappers.
type _D46 = Expect<Equal<DDistBox<string | number>, TODO>>; // TODO(koan) @koan-error
type _D47 = Expect<Equal<DWholeBox<string | number>, TODO>>; // TODO(koan) @koan-error
type _D48 = Expect<Equal<DDistBox<"a" | "b">, TODO>>; // TODO(koan) @koan-error
type _D49 = Expect<Equal<DWholeBox<"a" | "b">, TODO>>; // TODO(koan) @koan-error
type _D50 = Expect<Equal<DDistBox<{ kind: "a" } | { kind: "b" }>, TODO>>; // TODO(koan) @koan-error
type _D51 = Expect<Equal<DWholeBox<{ kind: "a" } | { kind: "b" }>, TODO>>; // TODO(koan) @koan-error
type _D52 = Expect<Equal<({ value: string | number }) extends { value: string } ? true : false, TODO>>; // TODO(koan) @koan-error
type _D53 = Expect<Equal<(() => string | number) extends (() => string) ? true : false, TODO>>; // TODO(koan) @koan-error
type _D54 = Expect<Equal<Promise<string | number> extends Promise<string> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D55 = Expect<Equal<[string | number] extends [string | number] ? true : false, TODO>>; // TODO(koan) @koan-error
type _D56 = Expect<Equal<["a" | "b"] extends [string] ? true : false, TODO>>; // TODO(koan) @koan-error
type _D57 = Expect<Equal<["a" | 1] extends [string] ? true : false, TODO>>; // TODO(koan) @koan-error
type _D58 = Expect<Equal<DEvery<"a" | 1, string> extends false ? DWholeBox<"a" | 1> : never, TODO>>; // TODO(koan) @koan-error
type _D59 = Expect<Equal<DSome<"a" | 1, string> extends true ? DDistBox<"a" | 1> : never, TODO>>; // TODO(koan) @koan-error
type _D60 = Expect<Equal<Readonly<DWholeBox<string | number>>, TODO>>; // TODO(koan) @koan-error
