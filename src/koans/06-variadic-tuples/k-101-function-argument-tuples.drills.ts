import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-101 guided drills: function argument tuples
 * =============================================================================
 * Extract the parameter tuple once, transform it with ordinary tuple operations,
 * and rebuild the call signature while leaving the result type correlated.
 */

type DF = (...args: any[]) => unknown;
type DPre<F extends DF, V> = (...args: [value: V, ...rest: Parameters<F>]) => ReturnType<F>;
type DApp<F extends DF, V> = (...args: [...rest: Parameters<F>, value: V]) => ReturnType<F>;
type DDropFirst<F extends DF> = F extends (first: any, ...rest: infer R) => infer O ? (...args: R) => O : never;
type DDropLast<F extends DF> = Parameters<F> extends [...infer I, unknown] ? (...args: I) => ReturnType<F> : never;

// Parameters represents zero, fixed, optional, and rest parameter lists.
type _D01 = Expect<Equal<Parameters<() => void>, TODO>>; // TODO(koan) @koan-error
type _D02 = Expect<Equal<Parameters<(x: string) => void>, TODO>>; // TODO(koan) @koan-error
type _D03 = Expect<Equal<Parameters<(x: string, y: number) => void>, TODO>>; // TODO(koan) @koan-error
type _D04 = Expect<Equal<Parameters<(x?: string) => void>, TODO>>; // TODO(koan) @koan-error
type _D05 = Expect<Equal<Parameters<(x: string, y?: number) => void>, TODO>>; // TODO(koan) @koan-error
type _D06 = Expect<Equal<Parameters<(...values: number[]) => void>, TODO>>; // TODO(koan) @koan-error
type _D07 = Expect<Equal<Parameters<(head: string, ...tail: number[]) => void>, TODO>>; // TODO(koan) @koan-error
type _D08 = Expect<Equal<Parameters<(...args: [x: string, y?: number]) => void>, TODO>>; // TODO(koan) @koan-error
type _D09 = Expect<Equal<Parameters<(this: Date, x: number) => void>, TODO>>; // TODO(koan) @koan-error
type _D10 = Expect<Equal<Parameters<(x: never) => unknown>, TODO>>; // TODO(koan) @koan-error
type _D11 = Expect<Equal<Parameters<(x: unknown) => unknown>, TODO>>; // TODO(koan) @koan-error
type _D12 = Expect<Equal<Parameters<(x: any) => unknown>, TODO>>; // TODO(koan) @koan-error
type _D13 = Expect<Equal<Parameters<(x: 1, y: 2) => 3>[number], TODO>>; // TODO(koan) @koan-error
type _D14 = Expect<Equal<Parameters<(x: 1, y?: 2) => 3>["length"], TODO>>; // TODO(koan) @koan-error
type _D15 = Expect<Equal<Parameters<(...x: 1[]) => 2>["length"], TODO>>; // TODO(koan) @koan-error

// Prepending retains all original positions after one new required value.
type _D16 = Expect<Equal<Parameters<DPre<() => void, string>>, TODO>>; // TODO(koan) @koan-error
type _D17 = Expect<Equal<Parameters<DPre<(x: number) => boolean, string>>, TODO>>; // TODO(koan) @koan-error
type _D18 = Expect<Equal<ReturnType<DPre<(x: number) => boolean, string>>, TODO>>; // TODO(koan) @koan-error
type _D19 = Expect<Equal<Parameters<DPre<(x?: number) => void, string>>, TODO>>; // TODO(koan) @koan-error
type _D20 = Expect<Equal<Parameters<DPre<(...x: number[]) => void, string>>, TODO>>; // TODO(koan) @koan-error
type _D21 = Expect<Equal<Parameters<DPre<(x: number, ...y: boolean[]) => void, string>>, TODO>>; // TODO(koan) @koan-error
type _D22 = Expect<Equal<Parameters<DPre<(x: 1, y: 2) => 3, 0>>, TODO>>; // TODO(koan) @koan-error
type _D23 = Expect<Equal<Parameters<DPre<(x: 1, y?: 2) => 3, 0>>["length"], TODO>>; // TODO(koan) @koan-error
type _D24 = Expect<Equal<Parameters<DPre<() => void, never>>, TODO>>; // TODO(koan) @koan-error
type _D25 = Expect<Equal<Parameters<DPre<() => void, unknown>>, TODO>>; // TODO(koan) @koan-error

// Appending may normalize an earlier optional position before the required value.
type _D26 = Expect<Equal<Parameters<DApp<() => void, string>>, TODO>>; // TODO(koan) @koan-error
type _D27 = Expect<Equal<Parameters<DApp<(x: number) => boolean, string>>, TODO>>; // TODO(koan) @koan-error
type _D28 = Expect<Equal<ReturnType<DApp<(x: number) => boolean, string>>, TODO>>; // TODO(koan) @koan-error
type _D29 = Expect<Equal<Parameters<DApp<(x?: number) => void, string>>, TODO>>; // TODO(koan) @koan-error
type _D30 = Expect<Equal<Parameters<DApp<(x: number, y?: boolean) => void, string>>, TODO>>; // TODO(koan) @koan-error
type _D31 = Expect<Equal<Parameters<DApp<(...x: number[]) => void, string>>, TODO>>; // TODO(koan) @koan-error
type _D32 = Expect<Equal<Parameters<DApp<(x: 1, ...y: 2[]) => 3, 4>>, TODO>>; // TODO(koan) @koan-error
type _D33 = Expect<Equal<Parameters<DApp<() => void, never>>, TODO>>; // TODO(koan) @koan-error
type _D34 = Expect<Equal<Parameters<DApp<() => void, unknown>>, TODO>>; // TODO(koan) @koan-error
type _D35 = Expect<Equal<Parameters<DApp<(x?: 1) => 2, 3>>[0], TODO>>; // TODO(koan) @koan-error

// Dropping arguments requires a guaranteed corresponding position.
type _D36 = Expect<Equal<DDropFirst<() => void>, TODO>>; // TODO(koan) @koan-error
type _D37 = Expect<Equal<Parameters<DDropFirst<(x: string) => number>>, TODO>>; // TODO(koan) @koan-error
type _D38 = Expect<Equal<Parameters<DDropFirst<(x: string, y: number) => boolean>>, TODO>>; // TODO(koan) @koan-error
type _D39 = Expect<Equal<ReturnType<DDropFirst<(x: string, y: number) => boolean>>, TODO>>; // TODO(koan) @koan-error
type _D40 = Expect<Equal<Parameters<DDropFirst<(x: string, y?: number) => boolean>>, TODO>>; // TODO(koan) @koan-error
type _D41 = Expect<Equal<Parameters<DDropFirst<(x: string, ...y: number[]) => boolean>>, TODO>>; // TODO(koan) @koan-error
type _D42 = Expect<Equal<DDropFirst<(x?: string) => boolean>, TODO>>; // TODO(koan) @koan-error
type _D43 = Expect<Equal<DDropLast<() => void>, TODO>>; // TODO(koan) @koan-error
type _D44 = Expect<Equal<Parameters<DDropLast<(x: string) => number>>, TODO>>; // TODO(koan) @koan-error
type _D45 = Expect<Equal<Parameters<DDropLast<(x: string, y: number) => boolean>>, TODO>>; // TODO(koan) @koan-error
type _D46 = Expect<Equal<ReturnType<DDropLast<(x: string, y: number) => boolean>>, TODO>>; // TODO(koan) @koan-error
type _D47 = Expect<Equal<DDropLast<(x: string, y?: number) => boolean>, TODO>>; // TODO(koan) @koan-error
type _D48 = Expect<Equal<DDropLast<(...x: number[]) => boolean>, TODO>>; // TODO(koan) @koan-error
type _D49 = Expect<Equal<Parameters<DDropLast<(...x: [a: string, b: number]) => boolean>>, TODO>>; // TODO(koan) @koan-error
type _D50 = Expect<Equal<Parameters<DDropFirst<DDropLast<(a: 1, b: 2, c: 3) => 4>>>, TODO>>; // TODO(koan) @koan-error

// Rebuilt signatures retain parameter and result relationships.
type Base = (path: string, count: number) => Promise<boolean>;
type _D51 = Expect<Equal<Parameters<DPre<Base, Date>>, TODO>>; // TODO(koan) @koan-error
type _D52 = Expect<Equal<ReturnType<DPre<Base, Date>>, TODO>>; // TODO(koan) @koan-error
type _D53 = Expect<Equal<Parameters<DApp<Base, AbortSignal>>, TODO>>; // TODO(koan) @koan-error
type _D54 = Expect<Equal<ReturnType<DApp<Base, AbortSignal>>, TODO>>; // TODO(koan) @koan-error
type _D55 = Expect<Equal<Parameters<DDropFirst<Base>>, TODO>>; // TODO(koan) @koan-error
type _D56 = Expect<Equal<ReturnType<DDropFirst<Base>>, TODO>>; // TODO(koan) @koan-error
type _D57 = Expect<Equal<Parameters<DDropLast<Base>>, TODO>>; // TODO(koan) @koan-error
type _D58 = Expect<Equal<ReturnType<DDropLast<Base>>, TODO>>; // TODO(koan) @koan-error
type _D59 = Expect<Equal<Parameters<DPre<DApp<Base, boolean>, Date>>, TODO>>; // TODO(koan) @koan-error
type _D60 = Expect<Equal<ReturnType<DPre<DApp<Base, boolean>, Date>>, TODO>>; // TODO(koan) @koan-error
