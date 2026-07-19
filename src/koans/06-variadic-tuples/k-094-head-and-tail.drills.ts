import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-094 guided drills: head and tail
 * =============================================================================
 * First decide whether the input guarantees a position zero. Only then bind the
 * first element and the remaining tuple; do not confuse possible with required.
 */

type DH<T extends readonly unknown[]> = T extends readonly [infer H, ...unknown[]] ? H : never;
type DT<T extends readonly unknown[]> = T extends readonly [unknown, ...infer R] ? R : never;

// Head follows the first required position across literal and labeled tuples.
type _D01 = Expect<Equal<DH<[1]>, TODO>>; // TODO(koan) @koan-error
type _D02 = Expect<Equal<DH<[1, 2]>, TODO>>; // TODO(koan) @koan-error
type _D03 = Expect<Equal<DH<["a", 1, true]>, TODO>>; // TODO(koan) @koan-error
type _D04 = Expect<Equal<DH<[first: string, second: number]>, TODO>>; // TODO(koan) @koan-error
type _D05 = Expect<Equal<DH<readonly [1, 2]>, TODO>>; // TODO(koan) @koan-error
type _D06 = Expect<Equal<DH<readonly [name: "Ada"]>, TODO>>; // TODO(koan) @koan-error
type _D07 = Expect<Equal<DH<[null, undefined]>, TODO>>; // TODO(koan) @koan-error
type _D08 = Expect<Equal<DH<[never]>, TODO>>; // TODO(koan) @koan-error
type _D09 = Expect<Equal<DH<[unknown]>, TODO>>; // TODO(koan) @koan-error
type _D10 = Expect<Equal<DH<[1 | 2, 3]>, TODO>>; // TODO(koan) @koan-error
type _D11 = Expect<Equal<DH<[]>, TODO>>; // TODO(koan) @koan-error
type _D12 = Expect<Equal<DH<readonly []>, TODO>>; // TODO(koan) @koan-error
type _D13 = Expect<Equal<DH<string[]>, TODO>>; // TODO(koan) @koan-error
type _D14 = Expect<Equal<DH<readonly string[]>, TODO>>; // TODO(koan) @koan-error
type _D15 = Expect<Equal<DH<[value?: string]>, TODO>>; // TODO(koan) @koan-error

// Tail returns a new tuple shape without the first required position.
type _D16 = Expect<Equal<DT<[1]>, TODO>>; // TODO(koan) @koan-error
type _D17 = Expect<Equal<DT<[1, 2]>, TODO>>; // TODO(koan) @koan-error
type _D18 = Expect<Equal<DT<[1, 2, 3]>, TODO>>; // TODO(koan) @koan-error
type _D19 = Expect<Equal<DT<[first: string, second: number]>, TODO>>; // TODO(koan) @koan-error
type _D20 = Expect<Equal<DT<readonly [1, 2]>, TODO>>; // TODO(koan) @koan-error
type _D21 = Expect<Equal<DT<readonly [1, 2, 3]>, TODO>>; // TODO(koan) @koan-error
type _D22 = Expect<Equal<DT<[null, undefined]>, TODO>>; // TODO(koan) @koan-error
type _D23 = Expect<Equal<DT<[never]>, TODO>>; // TODO(koan) @koan-error
type _D24 = Expect<Equal<DT<[unknown, any]>, TODO>>; // TODO(koan) @koan-error
type _D25 = Expect<Equal<DT<[]>, TODO>>; // TODO(koan) @koan-error
type _D26 = Expect<Equal<DT<string[]>, TODO>>; // TODO(koan) @koan-error
type _D27 = Expect<Equal<DT<[value?: string]>, TODO>>; // TODO(koan) @koan-error
type _D28 = Expect<Equal<DT<[head: string, value?: number]>, TODO>>; // TODO(koan) @koan-error
type _D29 = Expect<Equal<DT<[head: string, a?: number, b?: boolean]>, TODO>>; // TODO(koan) @koan-error
type _D30 = Expect<Equal<DT<readonly [head: string, value?: number]>, TODO>>; // TODO(koan) @koan-error

// Required prefixes before open tails guarantee a decomposition.
type _D31 = Expect<Equal<DH<[head: string, ...tail: number[]]>, TODO>>; // TODO(koan) @koan-error
type _D32 = Expect<Equal<DT<[head: string, ...tail: number[]]>, TODO>>; // TODO(koan) @koan-error
type _D33 = Expect<Equal<DH<[head: 0, ...tail: 1[]]>, TODO>>; // TODO(koan) @koan-error
type _D34 = Expect<Equal<DT<[head: 0, ...tail: 1[]]>, TODO>>; // TODO(koan) @koan-error
type _D35 = Expect<Equal<DH<readonly [head: "x", ...tail: boolean[]]>, TODO>>; // TODO(koan) @koan-error
type _D36 = Expect<Equal<DT<readonly [head: "x", ...tail: boolean[]]>, TODO>>; // TODO(koan) @koan-error
type _D37 = Expect<Equal<DH<[head?: string, ...tail: number[]]>, TODO>>; // TODO(koan) @koan-error
type _D38 = Expect<Equal<DT<[head?: string, ...tail: number[]]>, TODO>>; // TODO(koan) @koan-error
type _D39 = Expect<Equal<DH<[first: string, second: number, ...rest: boolean[]]>, TODO>>; // TODO(koan) @koan-error
type _D40 = Expect<Equal<DT<[first: string, second: number, ...rest: boolean[]]>, TODO>>; // TODO(koan) @koan-error
type _D41 = Expect<Equal<DH<[first: string, ...middle: boolean[], last: number]>, TODO>>; // TODO(koan) @koan-error
type _D42 = Expect<Equal<DT<[first: string, ...middle: boolean[], last: number]>, TODO>>; // TODO(koan) @koan-error
type _D43 = Expect<Equal<DT<[head: 0, ...tail: 1[]]>[number], TODO>>; // TODO(koan) @koan-error
type _D44 = Expect<Equal<DT<[head: 0, ...tail: 1[]]>["length"], TODO>>; // TODO(koan) @koan-error
type _D45 = Expect<Equal<DT<[head: 0, second: 1, ...tail: 2[]]>, TODO>>; // TODO(koan) @koan-error

// Naked conditional parameters distribute across tuple unions.
type _D46 = Expect<Equal<DH<[1] | [2]>, TODO>>; // TODO(koan) @koan-error
type _D47 = Expect<Equal<DH<[] | [1]>, TODO>>; // TODO(koan) @koan-error
type _D48 = Expect<Equal<DH<[] | [1] | [2, 3]>, TODO>>; // TODO(koan) @koan-error
type _D49 = Expect<Equal<DT<[1] | [2, 3]>, TODO>>; // TODO(koan) @koan-error
type _D50 = Expect<Equal<DT<[] | [1] | [2, 3]>, TODO>>; // TODO(koan) @koan-error
type _D51 = Expect<Equal<DH<never>, TODO>>; // TODO(koan) @koan-error
type _D52 = Expect<Equal<DT<never>, TODO>>; // TODO(koan) @koan-error
type _D53 = Expect<Equal<DH<[1] | string[]>, TODO>>; // TODO(koan) @koan-error
type _D54 = Expect<Equal<DT<[1, 2] | string[]>, TODO>>; // TODO(koan) @koan-error
type _D55 = Expect<Equal<DH<[1] | [2, ...3[]]>, TODO>>; // TODO(koan) @koan-error

// Parameter tuples provide realistic labeled inputs for decomposition.
type DP = Parameters<(path: string, retries: number, force?: boolean) => void>;
type _D56 = Expect<Equal<DH<DP>, TODO>>; // TODO(koan) @koan-error
type _D57 = Expect<Equal<DT<DP>, TODO>>; // TODO(koan) @koan-error
type _D58 = Expect<Equal<DH<DT<DP>>, TODO>>; // TODO(koan) @koan-error
type _D59 = Expect<Equal<DT<DT<DP>>, TODO>>; // TODO(koan) @koan-error
type _D60 = Expect<Equal<DT<DT<DT<DP>>>, TODO>>; // TODO(koan) @koan-error
