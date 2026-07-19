import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-095 guided drills: last and init
 * =============================================================================
 * Locate a guaranteed fixed final position. Only then bind everything before it
 * as Init; an open trailing region does not prove that such a position exists.
 */

type DL<T extends readonly unknown[]> = T extends readonly [...unknown[], infer L] ? L : never;
type DI<T extends readonly unknown[]> = T extends readonly [...infer I, unknown] ? I : never;

// Last follows the final required position of finite tuples.
type _D01 = Expect<Equal<DL<[1]>, TODO>>; // TODO(koan) @koan-error
type _D02 = Expect<Equal<DL<[1, 2]>, TODO>>; // TODO(koan) @koan-error
type _D03 = Expect<Equal<DL<["a", 1, true]>, TODO>>; // TODO(koan) @koan-error
type _D04 = Expect<Equal<DL<[first: string, second: number]>, TODO>>; // TODO(koan) @koan-error
type _D05 = Expect<Equal<DL<readonly [1, 2]>, TODO>>; // TODO(koan) @koan-error
type _D06 = Expect<Equal<DL<readonly [name: "Ada"]>, TODO>>; // TODO(koan) @koan-error
type _D07 = Expect<Equal<DL<[null, undefined]>, TODO>>; // TODO(koan) @koan-error
type _D08 = Expect<Equal<DL<[never]>, TODO>>; // TODO(koan) @koan-error
type _D09 = Expect<Equal<DL<[unknown]>, TODO>>; // TODO(koan) @koan-error
type _D10 = Expect<Equal<DL<[1, 2 | 3]>, TODO>>; // TODO(koan) @koan-error
type _D11 = Expect<Equal<DL<[]>, TODO>>; // TODO(koan) @koan-error
type _D12 = Expect<Equal<DL<readonly []>, TODO>>; // TODO(koan) @koan-error
type _D13 = Expect<Equal<DL<string[]>, TODO>>; // TODO(koan) @koan-error
type _D14 = Expect<Equal<DL<readonly string[]>, TODO>>; // TODO(koan) @koan-error
type _D15 = Expect<Equal<DL<[value?: string]>, TODO>>; // TODO(koan) @koan-error

// Init returns the finite positions before a guaranteed final value.
type _D16 = Expect<Equal<DI<[1]>, TODO>>; // TODO(koan) @koan-error
type _D17 = Expect<Equal<DI<[1, 2]>, TODO>>; // TODO(koan) @koan-error
type _D18 = Expect<Equal<DI<[1, 2, 3]>, TODO>>; // TODO(koan) @koan-error
type _D19 = Expect<Equal<DI<[first: string, second: number]>, TODO>>; // TODO(koan) @koan-error
type _D20 = Expect<Equal<DI<readonly [1, 2]>, TODO>>; // TODO(koan) @koan-error
type _D21 = Expect<Equal<DI<readonly [1, 2, 3]>, TODO>>; // TODO(koan) @koan-error
type _D22 = Expect<Equal<DI<[null, undefined]>, TODO>>; // TODO(koan) @koan-error
type _D23 = Expect<Equal<DI<[never]>, TODO>>; // TODO(koan) @koan-error
type _D24 = Expect<Equal<DI<[unknown, any]>, TODO>>; // TODO(koan) @koan-error
type _D25 = Expect<Equal<DI<[]>, TODO>>; // TODO(koan) @koan-error
type _D26 = Expect<Equal<DI<string[]>, TODO>>; // TODO(koan) @koan-error
type _D27 = Expect<Equal<DI<[value?: string]>, TODO>>; // TODO(koan) @koan-error
type _D28 = Expect<Equal<DI<[head: string, value?: number]>, TODO>>; // TODO(koan) @koan-error
type _D29 = Expect<Equal<DI<[head: string, a?: number, b?: boolean]>, TODO>>; // TODO(koan) @koan-error
type _D30 = Expect<Equal<DI<readonly [head: string, value?: number]>, TODO>>; // TODO(koan) @koan-error

// A fixed suffix after a variable region guarantees right decomposition.
type _D31 = Expect<Equal<DL<[...names: string[], count: number]>, TODO>>; // TODO(koan) @koan-error
type _D32 = Expect<Equal<DI<[...names: string[], count: number]>, TODO>>; // TODO(koan) @koan-error
type _D33 = Expect<Equal<DL<[...values: 1[], tail: 2]>, TODO>>; // TODO(koan) @koan-error
type _D34 = Expect<Equal<DI<[...values: 1[], tail: 2]>, TODO>>; // TODO(koan) @koan-error
type _D35 = Expect<Equal<DL<readonly [...names: string[], count: number]>, TODO>>; // TODO(koan) @koan-error
type _D36 = Expect<Equal<DI<readonly [...names: string[], count: number]>, TODO>>; // TODO(koan) @koan-error
type _D37 = Expect<Equal<DL<[head: string, ...tail: number[]]>, TODO>>; // TODO(koan) @koan-error
type _D38 = Expect<Equal<DI<[head: string, ...tail: number[]]>, TODO>>; // TODO(koan) @koan-error
type _D39 = Expect<Equal<DL<[first: string, ...middle: boolean[], last: number]>, TODO>>; // TODO(koan) @koan-error
type _D40 = Expect<Equal<DI<[first: string, ...middle: boolean[], last: number]>, TODO>>; // TODO(koan) @koan-error
type _D41 = Expect<Equal<DL<[first: 0, second: 1, ...middle: 2[], last: 3]>, TODO>>; // TODO(koan) @koan-error
type _D42 = Expect<Equal<DI<[first: 0, second: 1, ...middle: 2[], last: 3]>, TODO>>; // TODO(koan) @koan-error
type _D43 = Expect<Equal<DI<[...values: 1[], tail: 2]>[number], TODO>>; // TODO(koan) @koan-error
type _D44 = Expect<Equal<DI<[...values: 1[], tail: 2]>["length"], TODO>>; // TODO(koan) @koan-error
type _D45 = Expect<Equal<DI<[head: 0, ...middle: 1[], tail: 2]>, TODO>>; // TODO(koan) @koan-error

// Naked conditionals distribute and filter shapes with no fixed suffix.
type _D46 = Expect<Equal<DL<[1] | [2]>, TODO>>; // TODO(koan) @koan-error
type _D47 = Expect<Equal<DL<[] | [1]>, TODO>>; // TODO(koan) @koan-error
type _D48 = Expect<Equal<DL<[] | [1] | [2, 3]>, TODO>>; // TODO(koan) @koan-error
type _D49 = Expect<Equal<DI<[1] | [2, 3]>, TODO>>; // TODO(koan) @koan-error
type _D50 = Expect<Equal<DI<[] | [1] | [2, 3]>, TODO>>; // TODO(koan) @koan-error
type _D51 = Expect<Equal<DL<never>, TODO>>; // TODO(koan) @koan-error
type _D52 = Expect<Equal<DI<never>, TODO>>; // TODO(koan) @koan-error
type _D53 = Expect<Equal<DL<[1] | string[]>, TODO>>; // TODO(koan) @koan-error
type _D54 = Expect<Equal<DI<[1, 2] | string[]>, TODO>>; // TODO(koan) @koan-error
type _D55 = Expect<Equal<DL<[1] | [...2[], 3]>, TODO>>; // TODO(koan) @koan-error

// Parameter tuples provide finite and optional suffix examples.
type DP = Parameters<(path: string, retries: number, force?: boolean) => void>;
type _D56 = Expect<Equal<DL<DP>, TODO>>; // TODO(koan) @koan-error
type _D57 = Expect<Equal<DI<DP>, TODO>>; // TODO(koan) @koan-error
type _D58 = Expect<Equal<DL<DI<DP>>, TODO>>; // TODO(koan) @koan-error
type _D59 = Expect<Equal<DI<DI<[1, 2, 3]>>, TODO>>; // TODO(koan) @koan-error
type _D60 = Expect<Equal<DL<DL<DP> extends readonly unknown[] ? DL<DP> : []>, TODO>>; // TODO(koan) @koan-error
