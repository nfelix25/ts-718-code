import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-066 guided drills: multiple and nested infer
 * =============================================================================
 * Identify every capture site, check the complete enclosing shape, and retain
 * the relationship among captures instead of flattening them independently.
 */

type DPair<T> = T extends readonly [infer A, infer B] ? [A, B] : never;
type DEnds<T> = T extends readonly [infer H, ...infer M, infer L] ? [H, M, L] : never;
type DEntry<T> = T extends readonly (readonly [infer K, infer V])[] ? [K, V] : never;
type DPromiseArray<T> = T extends PromiseLike<readonly (infer E)[]> ? E : never;
type DFn<T> = T extends (...args: infer P) => infer R ? [P, R] : never;
type DReturnedArray<T> = T extends (...args: infer P) => readonly (infer E)[] ? [P, E] : never;

// Fixed pairs capture both positions or reject the entire shape.
type _D01 = Expect<Equal<DPair<[string, number]>, TODO>>; // TODO(koan) @koan-error
type _D02 = Expect<Equal<DPair<readonly [1, "a"]>, TODO>>; // TODO(koan) @koan-error
type _D03 = Expect<Equal<DPair<[1, 2] | [3, 4]>, TODO>>; // TODO(koan) @koan-error
type _D04 = Expect<Equal<DPair<[1]>, TODO>>; // TODO(koan) @koan-error
type _D05 = Expect<Equal<DPair<[1, 2, 3]>, TODO>>; // TODO(koan) @koan-error
type _D06 = Expect<Equal<DPair<[]>, TODO>>; // TODO(koan) @koan-error
type _D07 = Expect<Equal<DPair<string[]>, TODO>>; // TODO(koan) @koan-error
type _D08 = Expect<Equal<DPair<readonly number[]>, TODO>>; // TODO(koan) @koan-error
type _D09 = Expect<Equal<DPair<[first?: string, second?: number]>, TODO>>; // TODO(koan) @koan-error
type _D10 = Expect<Equal<DPair<[string, number?]>, TODO>>; // TODO(koan) @koan-error
type _D11 = Expect<Equal<DPair<[string, ...number[]]>, TODO>>; // TODO(koan) @koan-error
type _D12 = Expect<Equal<DPair<string>, TODO>>; // TODO(koan) @koan-error
type _D13 = Expect<Equal<DPair<unknown>, TODO>>; // TODO(koan) @koan-error
type _D14 = Expect<Equal<DPair<never>, TODO>>; // TODO(koan) @koan-error
type _D15 = Expect<Equal<DPair<[Promise<string>, Promise<number>]>, TODO>>; // TODO(koan) @koan-error

// Head, middle, and last captures expose variadic structure.
type _D16 = Expect<Equal<DEnds<[1, 2]>, TODO>>; // TODO(koan) @koan-error
type _D17 = Expect<Equal<DEnds<[1, 2, 3]>, TODO>>; // TODO(koan) @koan-error
type _D18 = Expect<Equal<DEnds<readonly ["a", true, 3, "z"]>, TODO>>; // TODO(koan) @koan-error
type _D19 = Expect<Equal<DEnds<[1]>, TODO>>; // TODO(koan) @koan-error
type _D20 = Expect<Equal<DEnds<[]>, TODO>>; // TODO(koan) @koan-error
type _D21 = Expect<Equal<DEnds<string[]>, TODO>>; // TODO(koan) @koan-error
type _D22 = Expect<Equal<DEnds<[head: string, ...middle: boolean[], last: number]>, TODO>>; // TODO(koan) @koan-error
type _D23 = Expect<Equal<DEnds<[1, 2] | [3, 4, 5]>, TODO>>; // TODO(koan) @koan-error
type _D24 = Expect<Equal<DEnds<unknown>, TODO>>; // TODO(koan) @koan-error
type _D25 = Expect<Equal<DEnds<never>, TODO>>; // TODO(koan) @koan-error

// Arrays of entries infer key and value unions from nested tuple members.
type _D26 = Expect<Equal<DEntry<Array<[string, number]>>, TODO>>; // TODO(koan) @koan-error
type _D27 = Expect<Equal<DEntry<readonly (readonly ["id", number])[]>, TODO>>; // TODO(koan) @koan-error
type _D28 = Expect<Equal<DEntry<[["id", 1], ["name", "Ada"]]>, TODO>>; // TODO(koan) @koan-error
type _D29 = Expect<Equal<DEntry<Array<[string, number] | [number, string]>>, TODO>>; // TODO(koan) @koan-error
type _D30 = Expect<Equal<DEntry<string[]>, TODO>>; // TODO(koan) @koan-error
type _D31 = Expect<Equal<DEntry<[string, number]>, TODO>>; // TODO(koan) @koan-error
type _D32 = Expect<Equal<DEntry<[]>, TODO>>; // TODO(koan) @koan-error
type _D33 = Expect<Equal<DEntry<unknown>, TODO>>; // TODO(koan) @koan-error
type _D34 = Expect<Equal<DEntry<never>, TODO>>; // TODO(koan) @koan-error
type _D35 = Expect<Equal<DEntry<readonly [readonly [1, true], readonly [2, false]]>, TODO>>; // TODO(koan) @koan-error

// Promise-plus-array patterns require both container layers.
type _D36 = Expect<Equal<DPromiseArray<Promise<string[]>>, TODO>>; // TODO(koan) @koan-error
type _D37 = Expect<Equal<DPromiseArray<Promise<readonly number[]>>, TODO>>; // TODO(koan) @koan-error
type _D38 = Expect<Equal<DPromiseArray<Promise<readonly [1, 2]>>, TODO>>; // TODO(koan) @koan-error
type _D39 = Expect<Equal<DPromiseArray<Promise<[]>>, TODO>>; // TODO(koan) @koan-error
type _D40 = Expect<Equal<DPromiseArray<Promise<string[]> | Promise<number[]>>, TODO>>; // TODO(koan) @koan-error
type _D41 = Expect<Equal<DPromiseArray<Promise<string[]> | number>, TODO>>; // TODO(koan) @koan-error
type _D42 = Expect<Equal<DPromiseArray<string[]>, TODO>>; // TODO(koan) @koan-error
type _D43 = Expect<Equal<DPromiseArray<Array<Promise<string>>>, TODO>>; // TODO(koan) @koan-error
type _D44 = Expect<Equal<DPromiseArray<unknown>, TODO>>; // TODO(koan) @koan-error
type _D45 = Expect<Equal<DPromiseArray<never>, TODO>>; // TODO(koan) @koan-error

// Function patterns preserve parameter-result and parameter-element relations.
type _D46 = Expect<Equal<DFn<() => void>, TODO>>; // TODO(koan) @koan-error
type _D47 = Expect<Equal<DFn<(x: string) => number>, TODO>>; // TODO(koan) @koan-error
type _D48 = Expect<Equal<DFn<(x: 1, y?: 2) => 3>, TODO>>; // TODO(koan) @koan-error
type _D49 = Expect<Equal<DFn<((x: 1) => "a") | ((x: 2) => "b")>, TODO>>; // TODO(koan) @koan-error
type _D50 = Expect<Equal<DFn<string>, TODO>>; // TODO(koan) @koan-error
type _D51 = Expect<Equal<DReturnedArray<() => string[]>, TODO>>; // TODO(koan) @koan-error
type _D52 = Expect<Equal<DReturnedArray<(id: number) => readonly boolean[]>, TODO>>; // TODO(koan) @koan-error
type _D53 = Expect<Equal<DReturnedArray<(...xs: string[]) => [number, boolean]>, TODO>>; // TODO(koan) @koan-error
type _D54 = Expect<Equal<DReturnedArray<() => []>, TODO>>; // TODO(koan) @koan-error
type _D55 = Expect<Equal<DReturnedArray<() => string>, TODO>>; // TODO(koan) @koan-error
type _D56 = Expect<Equal<DReturnedArray<((x: 1) => "a"[]) | ((x: 2) => "b"[])>, TODO>>; // TODO(koan) @koan-error
type _D57 = Expect<Equal<DReturnedArray<unknown>, TODO>>; // TODO(koan) @koan-error
type _D58 = Expect<Equal<DReturnedArray<never>, TODO>>; // TODO(koan) @koan-error
type _D59 = Expect<Equal<DFn<{ (): 1; label: string }>, TODO>>; // TODO(koan) @koan-error
type _D60 = Expect<Equal<DReturnedArray<(this: Date, format: string) => readonly [1, 2]>, TODO>>; // TODO(koan) @koan-error
