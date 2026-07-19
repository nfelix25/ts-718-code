import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-100 guided drills: tuple reverse
 * =============================================================================
 * Move one required head into the front of an accumulator. Before recursion,
 * classify optional and open inputs so possible positions are not discarded.
 */

type DRF<T extends readonly unknown[], A extends readonly unknown[] = []> = T extends readonly [infer H, ...infer R] ? DRF<R, [H, ...A]> : A;
type DR<T extends readonly unknown[]> = T extends unknown ? number extends T["length"] ? T[number][] : T extends Required<T> ? DRF<T> : T[number][] : never;
type DRR<T extends readonly unknown[]> = Readonly<DR<T>>;

// Required finite tuples reverse exactly from zero through several positions.
type _D01 = Expect<Equal<DR<[]>, TODO>>; // TODO(koan) @koan-error
type _D02 = Expect<Equal<DR<[1]>, TODO>>; // TODO(koan) @koan-error
type _D03 = Expect<Equal<DR<[1, 2]>, TODO>>; // TODO(koan) @koan-error
type _D04 = Expect<Equal<DR<[1, 2, 3]>, TODO>>; // TODO(koan) @koan-error
type _D05 = Expect<Equal<DR<[1, 2, 3, 4]>, TODO>>; // TODO(koan) @koan-error
type _D06 = Expect<Equal<DR<["a", 1, true]>, TODO>>; // TODO(koan) @koan-error
type _D07 = Expect<Equal<DR<[first: string, second: number]>, TODO>>; // TODO(koan) @koan-error
type _D08 = Expect<Equal<DR<[never, 1]>, TODO>>; // TODO(koan) @koan-error
type _D09 = Expect<Equal<DR<[unknown, 1]>, TODO>>; // TODO(koan) @koan-error
type _D10 = Expect<Equal<DR<[1 | 2, 3]>, TODO>>; // TODO(koan) @koan-error
type _D11 = Expect<Equal<DR<[null, undefined]>, TODO>>; // TODO(koan) @koan-error
type _D12 = Expect<Equal<DR<readonly [1, 2, 3]>, TODO>>; // TODO(koan) @koan-error
type _D13 = Expect<Equal<DR<[1, 2, 3]>[0], TODO>>; // TODO(koan) @koan-error
type _D14 = Expect<Equal<DR<[1, 2, 3]>[number], TODO>>; // TODO(koan) @koan-error
type _D15 = Expect<Equal<DR<[1, 2, 3]>["length"], TODO>>; // TODO(koan) @koan-error

// Applying exact finite reverse twice restores the original value shape.
type _D16 = Expect<Equal<DR<DR<[]>>, TODO>>; // TODO(koan) @koan-error
type _D17 = Expect<Equal<DR<DR<[1]>>, TODO>>; // TODO(koan) @koan-error
type _D18 = Expect<Equal<DR<DR<[1, 2]>>, TODO>>; // TODO(koan) @koan-error
type _D19 = Expect<Equal<DR<DR<[1, 2, 3]>>, TODO>>; // TODO(koan) @koan-error
type _D20 = Expect<Equal<Equal<DR<DR<[1, 2, 3]>>, [1, 2, 3]>, TODO>>; // TODO(koan) @koan-error
type _D21 = Expect<Equal<DR<DR<readonly [1, 2]>>, TODO>>; // TODO(koan) @koan-error
type _D22 = Expect<Equal<DR<DR<[never, 1]>>, TODO>>; // TODO(koan) @koan-error
type _D23 = Expect<Equal<DR<DR<[unknown, 1]>>, TODO>>; // TODO(koan) @koan-error
type _D24 = Expect<Equal<DR<DR<[1 | 2, 3]>>, TODO>>; // TODO(koan) @koan-error
type _D25 = Expect<Equal<DR<DR<["a", 1, true]>>, TODO>>; // TODO(koan) @koan-error

// Open and optional shapes fall back to arrays of possible elements.
type _D26 = Expect<Equal<DR<string[]>, TODO>>; // TODO(koan) @koan-error
type _D27 = Expect<Equal<DR<readonly string[]>, TODO>>; // TODO(koan) @koan-error
type _D28 = Expect<Equal<DR<never[]>, TODO>>; // TODO(koan) @koan-error
type _D29 = Expect<Equal<DR<unknown[]>, TODO>>; // TODO(koan) @koan-error
type _D30 = Expect<Equal<DR<[head: string, ...tail: number[]]>, TODO>>; // TODO(koan) @koan-error
type _D31 = Expect<Equal<DR<[...head: string[], tail: number]>, TODO>>; // TODO(koan) @koan-error
type _D32 = Expect<Equal<DR<[first: string, ...middle: boolean[], last: number]>, TODO>>; // TODO(koan) @koan-error
type _D33 = Expect<Equal<DR<[value?: string]>, TODO>>; // TODO(koan) @koan-error
type _D34 = Expect<Equal<DR<[head: string, value?: number]>, TODO>>; // TODO(koan) @koan-error
type _D35 = Expect<Equal<DR<[a?: string, b?: number]>, TODO>>; // TODO(koan) @koan-error
type _D36 = Expect<Equal<DR<[head?: string, ...tail: number[]]>, TODO>>; // TODO(koan) @koan-error
type _D37 = Expect<Equal<DR<[head: string, ...tail: never[]]>, TODO>>; // TODO(koan) @koan-error
type _D38 = Expect<Equal<DR<[head: string, ...tail: unknown[]]>, TODO>>; // TODO(koan) @koan-error
type _D39 = Expect<Equal<DR<[value?: never]>, TODO>>; // TODO(koan) @koan-error
type _D40 = Expect<Equal<DR<[value?: unknown]>, TODO>>; // TODO(koan) @koan-error

// Readonly output is an explicit wrapper over either exact or fallback results.
type _D41 = Expect<Equal<DRR<[]>, TODO>>; // TODO(koan) @koan-error
type _D42 = Expect<Equal<DRR<[1]>, TODO>>; // TODO(koan) @koan-error
type _D43 = Expect<Equal<DRR<[1, 2, 3]>, TODO>>; // TODO(koan) @koan-error
type _D44 = Expect<Equal<DRR<readonly [1, 2]>, TODO>>; // TODO(koan) @koan-error
type _D45 = Expect<Equal<DRR<string[]>, TODO>>; // TODO(koan) @koan-error
type _D46 = Expect<Equal<DRR<[value?: string]>, TODO>>; // TODO(koan) @koan-error
type _D47 = Expect<Equal<"push" extends keyof DR<[1, 2]> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D48 = Expect<Equal<"push" extends keyof DRR<[1, 2]> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D49 = Expect<Equal<DRR<[1, 2]>[0], TODO>>; // TODO(koan) @koan-error
type _D50 = Expect<Equal<DRR<[1, 2]>["length"], TODO>>; // TODO(koan) @koan-error

// Distribution reverses each finite tuple union member independently.
type _D51 = Expect<Equal<DR<[1] | [2]>, TODO>>; // TODO(koan) @koan-error
type _D52 = Expect<Equal<DR<[1] | [2, 3]>, TODO>>; // TODO(koan) @koan-error
type _D53 = Expect<Equal<DR<[] | [1]>, TODO>>; // TODO(koan) @koan-error
type _D54 = Expect<Equal<DR<[1, 2] | string[]>, TODO>>; // TODO(koan) @koan-error
type _D55 = Expect<Equal<DR<never>, TODO>>; // TODO(koan) @koan-error
type _D56 = Expect<Equal<DR<[never] | [1, 2]>, TODO>>; // TODO(koan) @koan-error
type _D57 = Expect<Equal<DR<readonly [1] | readonly [2, 3]>, TODO>>; // TODO(koan) @koan-error
type _D58 = Expect<Equal<DR<DR<[1] | [2, 3]>>, TODO>>; // TODO(koan) @koan-error
type _D59 = Expect<Equal<DR<[1, 2] | [3, 4]>[number], TODO>>; // TODO(koan) @koan-error
type _D60 = Expect<Equal<DR<[1, 2] | [3, 4]>["length"], TODO>>; // TODO(koan) @koan-error
