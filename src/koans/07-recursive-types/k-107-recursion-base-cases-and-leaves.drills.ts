import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-107 guided drills: recursion base cases and leaves
 * =============================================================================
 * Decide which types stop first. Only then recurse through array elements and
 * object property values, remembering that empty key/element unions are never.
 */

type DP = string | number | boolean | bigint | symbol | null | undefined;
type DF = (...args: any[]) => unknown;
type DA = DP | Date | RegExp | DF | Map<unknown, unknown> | Set<unknown> | Promise<unknown>;
type DAny<T> = 0 extends (1 & T) ? true : false;
type DL<T> = DAny<T> extends true ? any : T extends DA ? T : T extends readonly (infer E)[] ? DL<E> : T extends object ? { [K in keyof T]: DL<T[K]> }[keyof T] : T;
type DE<T> = T extends readonly (infer E)[] ? DE<E> : T;
type DIA<T> = [T] extends [DA] ? true : false;

// Primitive and declared opaque objects stop immediately.
type _D01 = Expect<Equal<DL<string>, TODO>>; // TODO(koan) @koan-error
type _D02 = Expect<Equal<DL<number>, TODO>>; // TODO(koan) @koan-error
type _D03 = Expect<Equal<DL<boolean>, TODO>>; // TODO(koan) @koan-error
type _D04 = Expect<Equal<DL<bigint>, TODO>>; // TODO(koan) @koan-error
type _D05 = Expect<Equal<DL<symbol>, TODO>>; // TODO(koan) @koan-error
type _D06 = Expect<Equal<DL<null>, TODO>>; // TODO(koan) @koan-error
type _D07 = Expect<Equal<DL<undefined>, TODO>>; // TODO(koan) @koan-error
type _D08 = Expect<Equal<DL<Date>, TODO>>; // TODO(koan) @koan-error
type _D09 = Expect<Equal<DL<RegExp>, TODO>>; // TODO(koan) @koan-error
type _D10 = Expect<Equal<DL<(x: number) => string>, TODO>>; // TODO(koan) @koan-error
type _D11 = Expect<Equal<DL<Map<string, number>>, TODO>>; // TODO(koan) @koan-error
type _D12 = Expect<Equal<DL<Set<boolean>>, TODO>>; // TODO(koan) @koan-error
type _D13 = Expect<Equal<DL<Promise<1>>, TODO>>; // TODO(koan) @koan-error
type _D14 = Expect<Equal<DIA<Date>, TODO>>; // TODO(koan) @koan-error
type _D15 = Expect<Equal<DIA<{ id: number }>, TODO>>; // TODO(koan) @koan-error

// Array recursion repeatedly removes containers and unions their leaves.
type _D16 = Expect<Equal<DE<string>, TODO>>; // TODO(koan) @koan-error
type _D17 = Expect<Equal<DE<string[]>, TODO>>; // TODO(koan) @koan-error
type _D18 = Expect<Equal<DE<string[][]>, TODO>>; // TODO(koan) @koan-error
type _D19 = Expect<Equal<DE<readonly string[][][]>, TODO>>; // TODO(koan) @koan-error
type _D20 = Expect<Equal<DE<readonly [1, 2]>, TODO>>; // TODO(koan) @koan-error
type _D21 = Expect<Equal<DE<readonly [1, readonly [2]]>, TODO>>; // TODO(koan) @koan-error
type _D22 = Expect<Equal<DL<[]>, TODO>>; // TODO(koan) @koan-error
type _D23 = Expect<Equal<DL<readonly []>, TODO>>; // TODO(koan) @koan-error
type _D24 = Expect<Equal<DL<[1]>, TODO>>; // TODO(koan) @koan-error
type _D25 = Expect<Equal<DL<[1, "x", true]>, TODO>>; // TODO(koan) @koan-error
type _D26 = Expect<Equal<DL<readonly [1, readonly ["x", true]]>, TODO>>; // TODO(koan) @koan-error
type _D27 = Expect<Equal<DL<string[]>, TODO>>; // TODO(koan) @koan-error
type _D28 = Expect<Equal<DL<(string | number)[][]>, TODO>>; // TODO(koan) @koan-error
type _D29 = Expect<Equal<DL<never[]>, TODO>>; // TODO(koan) @koan-error
type _D30 = Expect<Equal<DL<unknown[]>, TODO>>; // TODO(koan) @koan-error

// Object recursion unions leaves from required, optional, and indexed properties.
type _D31 = Expect<Equal<DL<{ id: number }>, TODO>>; // TODO(koan) @koan-error
type _D32 = Expect<Equal<DL<{ id: number; name: string }>, TODO>>; // TODO(koan) @koan-error
type _D33 = Expect<Equal<DL<{ user: { id: number } }>, TODO>>; // TODO(koan) @koan-error
type _D34 = Expect<Equal<DL<{ values: readonly [1, 2] }>, TODO>>; // TODO(koan) @koan-error
type _D35 = Expect<Equal<DL<{ value?: string }>, TODO>>; // TODO(koan) @koan-error
type _D36 = Expect<Equal<DL<{ value: string | undefined }>, TODO>>; // TODO(koan) @koan-error
type _D37 = Expect<Equal<DL<{}>, TODO>>; // TODO(koan) @koan-error
type _D38 = Expect<Equal<DL<Record<string, number>>, TODO>>; // TODO(koan) @koan-error
type _D39 = Expect<Equal<DL<Record<number, boolean>>, TODO>>; // TODO(koan) @koan-error
type _D40 = Expect<Equal<DL<{ readonly x: 1; readonly y: { z: 2 } }>, TODO>>; // TODO(koan) @koan-error
type _D41 = Expect<Equal<DL<{ fn: () => string; data: { id: number } }>, TODO>>; // TODO(koan) @koan-error
type _D42 = Expect<Equal<DL<{ when: Date; source: RegExp }>, TODO>>; // TODO(koan) @koan-error
type _D43 = Expect<Equal<DL<{ map: Map<string, number>; set: Set<boolean> }>, TODO>>; // TODO(koan) @koan-error
type _D44 = Expect<Equal<DL<{ promise: Promise<1>; value: 2 }>, TODO>>; // TODO(koan) @koan-error
type _D45 = Expect<Equal<DL<{ a: { b: { c: "leaf" } } }>, TODO>>; // TODO(koan) @koan-error

// Unions distribute through the leaf decision tree.
type _D46 = Expect<Equal<DL<string | number>, TODO>>; // TODO(koan) @koan-error
type _D47 = Expect<Equal<DL<{ x: 1 } | { y: 2 }>, TODO>>; // TODO(koan) @koan-error
type _D48 = Expect<Equal<DL<readonly [1] | { x: 2 }>, TODO>>; // TODO(koan) @koan-error
type _D49 = Expect<Equal<DL<Date | { id: number }>, TODO>>; // TODO(koan) @koan-error
type _D50 = Expect<Equal<DL<never>, TODO>>; // TODO(koan) @koan-error
type _D51 = Expect<Equal<DL<unknown>, TODO>>; // TODO(koan) @koan-error
type _D52 = Expect<Equal<DAny<DL<any>>, TODO>>; // TODO(koan) @koan-error
type _D53 = Expect<Equal<DL<unknown | string>, TODO>>; // TODO(koan) @koan-error
type _D54 = Expect<Equal<DL<never | string>, TODO>>; // TODO(koan) @koan-error
type _D55 = Expect<Equal<DL<any | string> extends any ? true : false, TODO>>; // TODO(koan) @koan-error

// Atomic classification is non-distributive across whole unions.
type _D56 = Expect<Equal<DIA<string>, TODO>>; // TODO(koan) @koan-error
type _D57 = Expect<Equal<DIA<string | Date>, TODO>>; // TODO(koan) @koan-error
type _D58 = Expect<Equal<DIA<string | { id: number }>, TODO>>; // TODO(koan) @koan-error
type _D59 = Expect<Equal<DIA<never>, TODO>>; // TODO(koan) @koan-error
type _D60 = Expect<Equal<DIA<unknown>, TODO>>; // TODO(koan) @koan-error
