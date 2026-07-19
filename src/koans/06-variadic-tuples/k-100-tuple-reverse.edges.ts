import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-100 edge cases: tuple reverse
 * =============================================================================
 * The dangerous implementation is one that treats "does not guarantee a head"
 * as "is empty." Optional and open shapes make that false, so the public type
 * classifies them before invoking exact accumulator recursion.
 */

type ERF<T extends readonly unknown[], A extends readonly unknown[] = []> = T extends readonly [infer H, ...infer R] ? ERF<R, [H, ...A]> : A;
type ER<T extends readonly unknown[]> = T extends unknown ? number extends T["length"] ? T[number][] : T extends Required<T> ? ERF<T> : T[number][] : never;
type EIsAny<T> = 0 extends (1 & T) ? true : false;

// Naive finite recursion silently drops optional positions.
type _E01 = Expect<Equal<ERF<[value?: string]>, TODO>>; // TODO(koan) @koan-error
type _E02 = Expect<Equal<ER<[value?: string]>, TODO>>; // TODO(koan) @koan-error
type _E03 = Expect<Equal<ERF<[head: string, value?: number]>, TODO>>; // TODO(koan) @koan-error
type _E04 = Expect<Equal<ER<[head: string, value?: number]>, TODO>>; // TODO(koan) @koan-error
type _E05 = Expect<Equal<Equal<ERF<[head: string, value?: number]>, ER<[head: string, value?: number]>>, TODO>>; // TODO(koan) @koan-error

// Open tuples also need fallback instead of an apparently exact partial answer.
type _E06 = Expect<Equal<ERF<[head: string, ...tail: number[]]>, TODO>>; // TODO(koan) @koan-error
type _E07 = Expect<Equal<ER<[head: string, ...tail: number[]]>, TODO>>; // TODO(koan) @koan-error
type _E08 = Expect<Equal<ERF<[...head: string[], tail: number]>, TODO>>; // TODO(koan) @koan-error
type _E09 = Expect<Equal<ER<[...head: string[], tail: number]>, TODO>>; // TODO(koan) @koan-error
type _E10 = Expect<Equal<ER<string[]>, TODO>>; // TODO(koan) @koan-error

// Never and any require boundary classification.
type _E11 = Expect<Equal<ER<never>, TODO>>; // TODO(koan) @koan-error
type _E12 = Expect<Equal<ER<never[]>, TODO>>; // TODO(koan) @koan-error
type _E13 = Expect<Equal<EIsAny<ER<any>[number]>, TODO>>; // TODO(koan) @koan-error
type _E14 = Expect<Equal<EIsAny<ER<any[]>[number]>, TODO>>; // TODO(koan) @koan-error
type _E15 = Expect<Equal<ER<unknown[]>, TODO>>; // TODO(koan) @koan-error

// Union distribution lets exact and fallback members coexist.
type _E16 = Expect<Equal<ER<[1, 2] | string[]>, TODO>>; // TODO(koan) @koan-error
type _E17 = Expect<Equal<ER<[1] | [value?: 2]>, TODO>>; // TODO(koan) @koan-error
type _E18 = Expect<Equal<ER<[] | [1] | [2, 3]>, TODO>>; // TODO(koan) @koan-error
type _E19 = Expect<Equal<ER<[never] | [1, 2]>, TODO>>; // TODO(koan) @koan-error
type _E20 = Expect<Equal<ER<never | [1]>, TODO>>; // TODO(koan) @koan-error

// Exact reversal is an involution but fallback arrays cannot restore order.
type _E21 = Expect<Equal<ER<ER<[1, 2, 3]>>, TODO>>; // TODO(koan) @koan-error
type _E22 = Expect<Equal<ER<ER<readonly [1, 2, 3]>>, TODO>>; // TODO(koan) @koan-error
type _E23 = Expect<Equal<ER<ER<string[]>>, TODO>>; // TODO(koan) @koan-error
type _E24 = Expect<Equal<ER<ER<[value?: string]>>, TODO>>; // TODO(koan) @koan-error
type _E25 = Expect<Equal<Equal<ER<ER<[value?: string]>>, [value?: string]>, TODO>>; // TODO(koan) @koan-error

// A moderate tuple demonstrates accumulator recursion without nested rebuilding.
type Twenty = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19];
type _E26 = Expect<Equal<ER<Twenty>[0], TODO>>; // TODO(koan) @koan-error
type _E27 = Expect<Equal<ER<Twenty>[19], TODO>>; // TODO(koan) @koan-error
type _E28 = Expect<Equal<ER<Twenty>["length"], TODO>>; // TODO(koan) @koan-error
type _E29 = Expect<Equal<ER<ER<Twenty>>, TODO>>; // TODO(koan) @koan-error
type _E30 = Expect<Equal<ER<Twenty>[number], TODO>>; // TODO(koan) @koan-error

// Pre-solved: required finite reversal is exact.
type _DemoFinite = Expect<Equal<ER<[1, 2, 3]>, [3, 2, 1]>>;

// Pre-solved: optional input uses a conservative element-array fallback.
type _DemoOptional = Expect<Equal<ER<[head: string, value?: number]>, (string | number | undefined)[]>>;

// Pre-solved: applying exact reversal twice restores a mutable value shape.
type _DemoInvolution = Expect<Equal<ER<ER<readonly [1, 2]>>, [1, 2]>>;

declare const readonlyReversed: Readonly<ER<[1, 2]>>;
// @ts-expect-error An explicitly readonly reverse result rejects writes.
readonlyReversed[0] = 2;
