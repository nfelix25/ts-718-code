import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-110 guided drills: DeepRequired
 * =============================================================================
 * Remove omission with `-?`, recurse into present value domains, and keep an
 * explicit undefined union separate from optional syntax.
 */

type DP = string | number | boolean | bigint | symbol | null | undefined;
type DF = (...args: any[]) => unknown;
type DA = DP | Date | RegExp | DF | Map<unknown, unknown> | Set<unknown> | Promise<unknown>;
type DAny<T> = 0 extends (1 & T) ? true : false;
type DReq<T> = DAny<T> extends true ? any : T extends DA ? T : T extends readonly unknown[] ? number extends T["length"] ? T extends unknown[] ? DReq<T[number]>[] : readonly DReq<T[number]>[] : { [K in keyof T]-?: DReq<T[K]> } : T extends object ? { [K in keyof T]-?: DReq<T[K]> } : T;

// Atomic leaves do not acquire or lose undefined beyond their declared domain.
type _D01 = Expect<Equal<DReq<string>, TODO>>; // TODO(koan) @koan-error
type _D02 = Expect<Equal<DReq<number>, TODO>>; // TODO(koan) @koan-error
type _D03 = Expect<Equal<DReq<boolean>, TODO>>; // TODO(koan) @koan-error
type _D04 = Expect<Equal<DReq<null>, TODO>>; // TODO(koan) @koan-error
type _D05 = Expect<Equal<DReq<undefined>, TODO>>; // TODO(koan) @koan-error
type _D06 = Expect<Equal<DReq<Date>, TODO>>; // TODO(koan) @koan-error
type _D07 = Expect<Equal<DReq<RegExp>, TODO>>; // TODO(koan) @koan-error
type _D08 = Expect<Equal<DReq<(x?: number) => string>, TODO>>; // TODO(koan) @koan-error
type _D09 = Expect<Equal<DReq<Map<string, number>>, TODO>>; // TODO(koan) @koan-error
type _D10 = Expect<Equal<DReq<Set<boolean>>, TODO>>; // TODO(koan) @koan-error
type _D11 = Expect<Equal<DReq<Promise<1>>, TODO>>; // TODO(koan) @koan-error
type _D12 = Expect<Equal<DReq<unknown>, TODO>>; // TODO(koan) @koan-error
type _D13 = Expect<Equal<DReq<never>, TODO>>; // TODO(koan) @koan-error
type _D14 = Expect<Equal<DAny<DReq<any>>, TODO>>; // TODO(koan) @koan-error
type _D15 = Expect<Equal<DReq<string | undefined>, TODO>>; // TODO(koan) @koan-error

// Object optionality disappears recursively while readonly is preserved.
type _D16 = Expect<Equal<DReq<{}>, TODO>>; // TODO(koan) @koan-error
type _D17 = Expect<Equal<DReq<{ id?: number }>, TODO>>; // TODO(koan) @koan-error
type _D18 = Expect<Equal<DReq<{ id?: number; name?: string }>, TODO>>; // TODO(koan) @koan-error
type _D19 = Expect<Equal<DReq<{ user?: { id?: number } }>, TODO>>; // TODO(koan) @koan-error
type _D20 = Expect<Equal<DReq<{ user?: { profile?: { name?: string } } }>, TODO>>; // TODO(koan) @koan-error
type _D21 = Expect<Equal<DReq<{ value: string }>, TODO>>; // TODO(koan) @koan-error
type _D22 = Expect<Equal<DReq<{ readonly value?: string }>, TODO>>; // TODO(koan) @koan-error
type _D23 = Expect<Equal<DReq<{ readonly nested?: { readonly id?: number } }>, TODO>>; // TODO(koan) @koan-error
type _D24 = Expect<Equal<DReq<Record<string, { id?: number }>>, TODO>>; // TODO(koan) @koan-error
type _D25 = Expect<Equal<DReq<Record<number, { id?: number }>>, TODO>>; // TODO(koan) @koan-error
type _D26 = Expect<Equal<DReq<{ fn?: () => string; data?: { id?: number } }>, TODO>>; // TODO(koan) @koan-error
type _D27 = Expect<Equal<DReq<{ date?: Date; nested?: { id?: number } }>, TODO>>; // TODO(koan) @koan-error
type _D28 = Expect<Equal<DReq<{ user?: { id?: number } }>["user"], TODO>>; // TODO(koan) @koan-error
type _D29 = Expect<Equal<DReq<{ user?: { id?: number } }>["user"]["id"], TODO>>; // TODO(koan) @koan-error
type _D30 = Expect<Equal<keyof DReq<{ a?: 1; b?: 2 }>, TODO>>; // TODO(koan) @koan-error

// Optional syntax differs from an explicit undefined value union.
type _D31 = Expect<Equal<DReq<{ x?: string }>, TODO>>; // TODO(koan) @koan-error
type _D32 = Expect<Equal<DReq<{ x?: string | undefined }>, TODO>>; // TODO(koan) @koan-error
type _D33 = Expect<Equal<DReq<{ x: string | undefined }>, TODO>>; // TODO(koan) @koan-error
type _D34 = Expect<Equal<DReq<{ x?: { y?: number | undefined } }>, TODO>>; // TODO(koan) @koan-error
type _D35 = Expect<Equal<DReq<{ x?: never }>, TODO>>; // TODO(koan) @koan-error
type _D36 = Expect<Equal<DReq<{ x?: unknown }>, TODO>>; // TODO(koan) @koan-error
type _D37 = Expect<Equal<DAny<DReq<{ x?: any }>["x"]>, TODO>>; // TODO(koan) @koan-error
type _D38 = Expect<Equal<{ x: undefined } extends DReq<{ x?: string }> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D39 = Expect<Equal<{ x: undefined } extends DReq<{ x?: string | undefined }> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D40 = Expect<Equal<{} extends DReq<{ x?: string }> ? true : false, TODO>>; // TODO(koan) @koan-error

// Arrays preserve capability; finite optional tuple positions become required.
type _D41 = Expect<Equal<DReq<Array<{ id?: number }>>, TODO>>; // TODO(koan) @koan-error
type _D42 = Expect<Equal<DReq<readonly { id?: number }[]>, TODO>>; // TODO(koan) @koan-error
type _D43 = Expect<Equal<DReq<never[]>, TODO>>; // TODO(koan) @koan-error
type _D44 = Expect<Equal<DReq<unknown[]>, TODO>>; // TODO(koan) @koan-error
type _D45 = Expect<Equal<DReq<[]>, TODO>>; // TODO(koan) @koan-error
type _D46 = Expect<Equal<DReq<[value?: string]>, TODO>>; // TODO(koan) @koan-error
type _D47 = Expect<Equal<DReq<[a?: { id?: number }, b?: string]>, TODO>>; // TODO(koan) @koan-error
type _D48 = Expect<Equal<DReq<readonly [a?: { id?: number }]>, TODO>>; // TODO(koan) @koan-error
type _D49 = Expect<Equal<DReq<[head: { id?: number }, ...tail: { value?: string }[]]>, TODO>>; // TODO(koan) @koan-error
type _D50 = Expect<Equal<DReq<[a?: 1, b?: 2]>["length"], TODO>>; // TODO(koan) @koan-error

// Union members transform independently, retaining their required discriminants.
type U = { kind: "a"; a?: { value?: number } } | { kind: "b"; b?: { value?: string } };
type _D51 = Expect<Equal<DReq<U>, TODO>>; // TODO(koan) @koan-error
type _D52 = Expect<Equal<DReq<{ x?: 1 } | { y?: 2 }>, TODO>>; // TODO(koan) @koan-error
type _D53 = Expect<Equal<DReq<[a?: 1] | [b?: 2, c?: 3]>, TODO>>; // TODO(koan) @koan-error
type _D54 = Expect<Equal<DReq<Array<{ id?: number }> | { id?: number }>, TODO>>; // TODO(koan) @koan-error
type _D55 = Expect<Equal<DReq<Date | { id?: number }>, TODO>>; // TODO(koan) @koan-error
type _D56 = Expect<Equal<DReq<never | { id?: number }>, TODO>>; // TODO(koan) @koan-error
type _D57 = Expect<Equal<DReq<unknown | { id?: number }>, TODO>>; // TODO(koan) @koan-error
type _D58 = Expect<Equal<DReq<any | { id?: number }> extends any ? true : false, TODO>>; // TODO(koan) @koan-error
type _D59 = Expect<Equal<keyof DReq<U>, TODO>>; // TODO(koan) @koan-error
type _D60 = Expect<Equal<DReq<U>["kind"], TODO>>; // TODO(koan) @koan-error
