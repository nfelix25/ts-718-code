import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-055 guided drills: conditional type basics
 * =============================================================================
 * Read every exercise as one assignability sentence. Determine the answer before
 * considering the branch types, then substitute only the selected branch.
 */

type DChoose<C, U, Y, N> = C extends U ? Y : N;
type DIsString<T> = T extends string ? true : false;
type DBox<T> = T extends object ? { object: T } : { scalar: T };

// Primitive and literal subtype directions.
type _D01 = Expect<Equal<DChoose<string, string, 1, 0>, TODO>>; // TODO(koan) @koan-error
type _D02 = Expect<Equal<DChoose<number, string, 1, 0>, TODO>>; // TODO(koan) @koan-error
type _D03 = Expect<Equal<DChoose<boolean, boolean, "y", "n">, TODO>>; // TODO(koan) @koan-error
type _D04 = Expect<Equal<DChoose<bigint, number, "y", "n">, TODO>>; // TODO(koan) @koan-error
type _D05 = Expect<Equal<DChoose<symbol, PropertyKey, "y", "n">, TODO>>; // TODO(koan) @koan-error
type _D06 = Expect<Equal<DChoose<"x", string, "y", "n">, TODO>>; // TODO(koan) @koan-error
type _D07 = Expect<Equal<DChoose<string, "x", "y", "n">, TODO>>; // TODO(koan) @koan-error
type _D08 = Expect<Equal<DChoose<1, number, "y", "n">, TODO>>; // TODO(koan) @koan-error
type _D09 = Expect<Equal<DChoose<number, 1, "y", "n">, TODO>>; // TODO(koan) @koan-error
type _D10 = Expect<Equal<DChoose<true, boolean, "y", "n">, TODO>>; // TODO(koan) @koan-error
type _D11 = Expect<Equal<DChoose<boolean, true, "y", "n">, TODO>>; // TODO(koan) @koan-error
type _D12 = Expect<Equal<DChoose<null, null | undefined, "y", "n">, TODO>>; // TODO(koan) @koan-error
type _D13 = Expect<Equal<DChoose<undefined, null, "y", "n">, TODO>>; // TODO(koan) @koan-error
type _D14 = Expect<Equal<DChoose<"", string, true, false>, TODO>>; // TODO(koan) @koan-error
type _D15 = Expect<Equal<DChoose<0, number, true, false>, TODO>>; // TODO(koan) @koan-error

// Concrete unions are checked as complete source and target sets.
type _D16 = Expect<Equal<("a" | "b") extends string ? true : false, TODO>>; // TODO(koan) @koan-error
type _D17 = Expect<Equal<(string | number) extends string ? true : false, TODO>>; // TODO(koan) @koan-error
type _D18 = Expect<Equal<(1 | 2) extends number ? true : false, TODO>>; // TODO(koan) @koan-error
type _D19 = Expect<Equal<number extends 1 | 2 ? true : false, TODO>>; // TODO(koan) @koan-error
type _D20 = Expect<Equal<(1 | "a") extends number | string ? true : false, TODO>>; // TODO(koan) @koan-error
type _D21 = Expect<Equal<(1 | 2) extends 1 | 2 | 3 ? true : false, TODO>>; // TODO(koan) @koan-error
type _D22 = Expect<Equal<(1 | 3) extends 1 | 2 ? true : false, TODO>>; // TODO(koan) @koan-error
type _D23 = Expect<Equal<DChoose<"a" | "b", "a" | "b", "all", "not-all">, TODO>>; // TODO(koan) @koan-error
type _D24 = Expect<Equal<DChoose<"a" | "b", "a", "all", "not-all">, TODO>>; // TODO(koan) @koan-error
type _D25 = Expect<Equal<DChoose<never[], unknown[], "array", "other">, TODO>>; // TODO(koan) @koan-error
type _D26 = Expect<Equal<DChoose<readonly [1, 2], readonly number[], "array", "other">, TODO>>; // TODO(koan) @koan-error
type _D27 = Expect<Equal<DChoose<number[], readonly number[], "array", "other">, TODO>>; // TODO(koan) @koan-error
type _D28 = Expect<Equal<DChoose<readonly number[], number[], "array", "other">, TODO>>; // TODO(koan) @koan-error
type _D29 = Expect<Equal<DChoose<[], [unknown], "tuple", "other">, TODO>>; // TODO(koan) @koan-error
type _D30 = Expect<Equal<DChoose<[1], readonly [number], "tuple", "other">, TODO>>; // TODO(koan) @koan-error

// Structural object checks depend on required properties and value compatibility.
type _D31 = Expect<Equal<DChoose<{ id: number }, { id: number }, true, false>, TODO>>; // TODO(koan) @koan-error
type _D32 = Expect<Equal<DChoose<{ id: 1; name: string }, { id: number }, true, false>, TODO>>; // TODO(koan) @koan-error
type _D33 = Expect<Equal<DChoose<{ id: number }, { id: number; name: string }, true, false>, TODO>>; // TODO(koan) @koan-error
type _D34 = Expect<Equal<DChoose<{ id?: number }, { id: number }, true, false>, TODO>>; // TODO(koan) @koan-error
type _D35 = Expect<Equal<DChoose<{ id: number }, { id?: number }, true, false>, TODO>>; // TODO(koan) @koan-error
type _D36 = Expect<Equal<DChoose<{ readonly id: number }, { id: number }, true, false>, TODO>>; // TODO(koan) @koan-error
type _D37 = Expect<Equal<DChoose<{ id: 1 }, Record<string, unknown>, true, false>, TODO>>; // TODO(koan) @koan-error
type _D38 = Expect<Equal<DChoose<{}, object, true, false>, TODO>>; // TODO(koan) @koan-error
type _D39 = Expect<Equal<DChoose<string, object, true, false>, TODO>>; // TODO(koan) @koan-error
type _D40 = Expect<Equal<DChoose<() => void, object, true, false>, TODO>>; // TODO(koan) @koan-error
type _D41 = Expect<Equal<DChoose<Date, { getTime(): number }, true, false>, TODO>>; // TODO(koan) @koan-error
type _D42 = Expect<Equal<DChoose<Map<string, number>, { size: number }, true, false>, TODO>>; // TODO(koan) @koan-error
type _D43 = Expect<Equal<DChoose<{ x: number; y: number }, { x: number } & { y: number }, true, false>, TODO>>; // TODO(koan) @koan-error
type _D44 = Expect<Equal<DChoose<{ x: number }, { x: number } | { y: number }, true, false>, TODO>>; // TODO(koan) @koan-error
type _D45 = Expect<Equal<DBox<{ id: string }>, TODO>>; // TODO(koan) @koan-error

// Callable, container, template, and branch-construction repetitions.
type _D46 = Expect<Equal<DChoose<() => string, () => unknown, true, false>, TODO>>; // TODO(koan) @koan-error
type _D47 = Expect<Equal<DChoose<(x: string) => void, (x: string) => unknown, true, false>, TODO>>; // TODO(koan) @koan-error
type _D48 = Expect<Equal<DChoose<(x: unknown) => void, (x: string) => void, true, false>, TODO>>; // TODO(koan) @koan-error
type _D49 = Expect<Equal<DChoose<(x: string) => void, (x: unknown) => void, true, false>, TODO>>; // TODO(koan) @koan-error
type _D50 = Expect<Equal<DChoose<Promise<string>, Promise<unknown>, true, false>, TODO>>; // TODO(koan) @koan-error
type _D51 = Expect<Equal<DChoose<`user-${number}`, string, true, false>, TODO>>; // TODO(koan) @koan-error
type _D52 = Expect<Equal<DChoose<string, `user-${number}`, true, false>, TODO>>; // TODO(koan) @koan-error
type _D53 = Expect<Equal<DIsString<"hello">, TODO>>; // TODO(koan) @koan-error
type _D54 = Expect<Equal<DIsString<42>, TODO>>; // TODO(koan) @koan-error
type _D55 = Expect<Equal<DBox<42>, TODO>>; // TODO(koan) @koan-error
type _D56 = Expect<Equal<DBox<readonly []>, TODO>>; // TODO(koan) @koan-error
type _D57 = Expect<Equal<DChoose<string, string, { yes: string }, { no: string }>, TODO>>; // TODO(koan) @koan-error
type _D58 = Expect<Equal<DChoose<number, string, { yes: number }, { no: number }>, TODO>>; // TODO(koan) @koan-error
type _D59 = Expect<Equal<DChoose<1, number, 1[], 1>, TODO>>; // TODO(koan) @koan-error
type _D60 = Expect<Equal<DChoose<"x", number, "x"[], "x">, TODO>>; // TODO(koan) @koan-error
