import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-061 guided drills: never in conditional types
 * =============================================================================
 * Ask whether never is being used as a concrete bottom type, an empty union fed
 * to a naked parameter, a filter result, or a retained value/property marker.
 */

type DIsNever<T> = [T] extends [never] ? true : false;
type DNaive<T> = T extends never ? true : false;
type DKeep<T, U> = T extends U ? T : never;
type DDrop<T, U> = T extends U ? never : T;
type DReplace<T, R> = [T] extends [never] ? R : T;
type DWrap<T> = T extends unknown ? [T] : never;

// Bottom assignability and union identity.
type _D01 = Expect<Equal<never extends string ? true : false, TODO>>; // TODO(koan) @koan-error
type _D02 = Expect<Equal<never extends number ? true : false, TODO>>; // TODO(koan) @koan-error
type _D03 = Expect<Equal<never extends object ? true : false, TODO>>; // TODO(koan) @koan-error
type _D04 = Expect<Equal<never extends unknown ? true : false, TODO>>; // TODO(koan) @koan-error
type _D05 = Expect<Equal<never extends any ? true : false, TODO>>; // TODO(koan) @koan-error
type _D06 = Expect<Equal<never extends never ? true : false, TODO>>; // TODO(koan) @koan-error
type _D07 = Expect<Equal<string extends never ? true : false, TODO>>; // TODO(koan) @koan-error
type _D08 = Expect<Equal<unknown extends never ? true : false, TODO>>; // TODO(koan) @koan-error
type _D09 = Expect<Equal<string | never, TODO>>; // TODO(koan) @koan-error
type _D10 = Expect<Equal<never | never, TODO>>; // TODO(koan) @koan-error

// Naked generic distribution over zero or surviving members.
type _D11 = Expect<Equal<DWrap<never>, TODO>>; // TODO(koan) @koan-error
type _D12 = Expect<Equal<DKeep<never, string>, TODO>>; // TODO(koan) @koan-error
type _D13 = Expect<Equal<DDrop<never, string>, TODO>>; // TODO(koan) @koan-error
type _D14 = Expect<Equal<DNaive<never>, TODO>>; // TODO(koan) @koan-error
type _D15 = Expect<Equal<DWrap<string | never>, TODO>>; // TODO(koan) @koan-error
type _D16 = Expect<Equal<DKeep<string | never, string>, TODO>>; // TODO(koan) @koan-error
type _D17 = Expect<Equal<DDrop<string | never, string>, TODO>>; // TODO(koan) @koan-error
type _D18 = Expect<Equal<DWrap<1 | 2 | never>, TODO>>; // TODO(koan) @koan-error
type _D19 = Expect<Equal<DKeep<1 | 2 | never, 1>, TODO>>; // TODO(koan) @koan-error
type _D20 = Expect<Equal<DDrop<1 | 2 | never, 1>, TODO>>; // TODO(koan) @koan-error
type _D21 = Expect<Equal<(never extends infer T ? T extends string ? "yes" : "no" : never), TODO>>; // TODO(koan) @koan-error
type _D22 = Expect<Equal<([never] extends [infer T] ? T extends string ? "yes" : "no" : never), TODO>>; // TODO(koan) @koan-error
type _D23 = Expect<Equal<Promise<never> extends Promise<string> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D24 = Expect<Equal<never[] extends string[] ? true : false, TODO>>; // TODO(koan) @koan-error
type _D25 = Expect<Equal<[never] extends [string] ? true : false, TODO>>; // TODO(koan) @koan-error

// Wrapped detection and replacement across special and ordinary types.
type _D26 = Expect<Equal<DIsNever<never>, TODO>>; // TODO(koan) @koan-error
type _D27 = Expect<Equal<DIsNever<string>, TODO>>; // TODO(koan) @koan-error
type _D28 = Expect<Equal<DIsNever<unknown>, TODO>>; // TODO(koan) @koan-error
type _D29 = Expect<Equal<DIsNever<any>, TODO>>; // TODO(koan) @koan-error
type _D30 = Expect<Equal<DIsNever<void>, TODO>>; // TODO(koan) @koan-error
type _D31 = Expect<Equal<DIsNever<undefined>, TODO>>; // TODO(koan) @koan-error
type _D32 = Expect<Equal<DIsNever<never | string>, TODO>>; // TODO(koan) @koan-error
type _D33 = Expect<Equal<DIsNever<never & string>, TODO>>; // TODO(koan) @koan-error
type _D34 = Expect<Equal<DReplace<never, "empty">, TODO>>; // TODO(koan) @koan-error
type _D35 = Expect<Equal<DReplace<string, "empty">, TODO>>; // TODO(koan) @koan-error
type _D36 = Expect<Equal<DReplace<unknown, "empty">, TODO>>; // TODO(koan) @koan-error
type _D37 = Expect<Equal<DReplace<never | 1, "empty">, TODO>>; // TODO(koan) @koan-error
type _D38 = Expect<Equal<DReplace<never & 1, "empty">, TODO>>; // TODO(koan) @koan-error
type _D39 = Expect<Equal<[DNaive<never>] extends [never] ? true : false, TODO>>; // TODO(koan) @koan-error
type _D40 = Expect<Equal<DIsNever<DNaive<never>>, TODO>>; // TODO(koan) @koan-error

// Filter repetitions show never as union deletion.
type _D41 = Expect<Equal<DKeep<string | number, string>, TODO>>; // TODO(koan) @koan-error
type _D42 = Expect<Equal<DDrop<string | number, string>, TODO>>; // TODO(koan) @koan-error
type _D43 = Expect<Equal<DKeep<"a" | 1 | "b" | 2, string>, TODO>>; // TODO(koan) @koan-error
type _D44 = Expect<Equal<DDrop<"a" | 1 | "b" | 2, string>, TODO>>; // TODO(koan) @koan-error
type _D45 = Expect<Equal<DKeep<1 | 2 | 3, 2>, TODO>>; // TODO(koan) @koan-error
type _D46 = Expect<Equal<DDrop<1 | 2 | 3, 2>, TODO>>; // TODO(koan) @koan-error
type _D47 = Expect<Equal<DKeep<{ id: 1 } | { name: "x" }, { id: unknown }>, TODO>>; // TODO(koan) @koan-error
type _D48 = Expect<Equal<DDrop<{ id: 1 } | { name: "x" }, { id: unknown }>, TODO>>; // TODO(koan) @koan-error
type _D49 = Expect<Equal<DKeep<string | null | undefined, {}>, TODO>>; // TODO(koan) @koan-error
type _D50 = Expect<Equal<DDrop<string | null | undefined, {}>, TODO>>; // TODO(koan) @koan-error

// Never in values, keys, tuples, arrays, and function returns.
type _D51 = Expect<Equal<{ value: never }["value"], TODO>>; // TODO(koan) @koan-error
type _D52 = Expect<Equal<keyof { value: never }, TODO>>; // TODO(koan) @koan-error
type _D53 = Expect<Equal<{ [K in "a" | "b" as K extends "b" ? never : K]: K }, TODO>>; // TODO(koan) @koan-error
type _D54 = Expect<Equal<keyof { [K in "a" | "b" as K extends "b" ? never : K]: K }, TODO>>; // TODO(koan) @koan-error
type _D55 = Expect<Equal<(never)[], TODO>>; // TODO(koan) @koan-error
type _D56 = Expect<Equal<(never)[][number], TODO>>; // TODO(koan) @koan-error
type _D57 = Expect<Equal<(readonly [never])[0], TODO>>; // TODO(koan) @koan-error
type _D58 = Expect<Equal<ReturnType<() => never>, TODO>>; // TODO(koan) @koan-error
type _D59 = Expect<Equal<Parameters<(value: never) => void>, TODO>>; // TODO(koan) @koan-error
type _D60 = Expect<Equal<Awaited<Promise<never>>, TODO>>; // TODO(koan) @koan-error
