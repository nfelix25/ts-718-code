import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-109 guided drills: DeepReadonly
 * =============================================================================
 * Preserve leaf identity, convert every data-container capability to readonly,
 * and keep optionality separate from mutability.
 */

type DP = string | number | boolean | bigint | symbol | null | undefined;
type DF = (...args: any[]) => unknown;
type DA = DP | Date | RegExp | DF | Map<unknown, unknown> | Set<unknown> | Promise<unknown>;
type DAny<T> = 0 extends (1 & T) ? true : false;
type DRO<T> = DAny<T> extends true ? any : T extends DA ? T : T extends readonly unknown[] ? number extends T["length"] ? readonly DRO<T[number]>[] : { readonly [K in keyof T]: DRO<T[K]> } : T extends object ? { readonly [K in keyof T]: DRO<T[K]> } : T;

// Atomic leaves are identity cases.
type _D01 = Expect<Equal<DRO<string>, TODO>>; // TODO(koan) @koan-error
type _D02 = Expect<Equal<DRO<number>, TODO>>; // TODO(koan) @koan-error
type _D03 = Expect<Equal<DRO<boolean>, TODO>>; // TODO(koan) @koan-error
type _D04 = Expect<Equal<DRO<null>, TODO>>; // TODO(koan) @koan-error
type _D05 = Expect<Equal<DRO<undefined>, TODO>>; // TODO(koan) @koan-error
type _D06 = Expect<Equal<DRO<Date>, TODO>>; // TODO(koan) @koan-error
type _D07 = Expect<Equal<DRO<RegExp>, TODO>>; // TODO(koan) @koan-error
type _D08 = Expect<Equal<DRO<(x: number) => string>, TODO>>; // TODO(koan) @koan-error
type _D09 = Expect<Equal<DRO<Map<string, number>>, TODO>>; // TODO(koan) @koan-error
type _D10 = Expect<Equal<DRO<Set<boolean>>, TODO>>; // TODO(koan) @koan-error
type _D11 = Expect<Equal<DRO<Promise<1>>, TODO>>; // TODO(koan) @koan-error
type _D12 = Expect<Equal<DRO<unknown>, TODO>>; // TODO(koan) @koan-error
type _D13 = Expect<Equal<DRO<never>, TODO>>; // TODO(koan) @koan-error
type _D14 = Expect<Equal<DAny<DRO<any>>, TODO>>; // TODO(koan) @koan-error
type _D15 = Expect<Equal<DRO<string | number>, TODO>>; // TODO(koan) @koan-error

// Object properties become recursively readonly without changing optionality.
type _D16 = Expect<Equal<DRO<{}>, TODO>>; // TODO(koan) @koan-error
type _D17 = Expect<Equal<DRO<{ id: number }>, TODO>>; // TODO(koan) @koan-error
type _D18 = Expect<Equal<DRO<{ id: number; name: string }>, TODO>>; // TODO(koan) @koan-error
type _D19 = Expect<Equal<DRO<{ user: { id: number } }>, TODO>>; // TODO(koan) @koan-error
type _D20 = Expect<Equal<DRO<{ user: { profile: { name: string } } }>, TODO>>; // TODO(koan) @koan-error
type _D21 = Expect<Equal<DRO<{ value?: string }>, TODO>>; // TODO(koan) @koan-error
type _D22 = Expect<Equal<DRO<{ value?: { nested: number } }>, TODO>>; // TODO(koan) @koan-error
type _D23 = Expect<Equal<DRO<{ readonly id: number }>, TODO>>; // TODO(koan) @koan-error
type _D24 = Expect<Equal<DRO<{ readonly nested: { id: number } }>, TODO>>; // TODO(koan) @koan-error
type _D25 = Expect<Equal<DRO<Record<string, { id: number }>>, TODO>>; // TODO(koan) @koan-error
type _D26 = Expect<Equal<DRO<Record<number, { id: number }>>, TODO>>; // TODO(koan) @koan-error
type _D27 = Expect<Equal<DRO<{ fn: () => string; data: { id: number } }>, TODO>>; // TODO(koan) @koan-error
type _D28 = Expect<Equal<DRO<{ date: Date; nested: { id: number } }>, TODO>>; // TODO(koan) @koan-error
type _D29 = Expect<Equal<DRO<{ user: { id: number } }>["user"], TODO>>; // TODO(koan) @koan-error
type _D30 = Expect<Equal<DRO<{ user: { id: number } }>["user"]["id"], TODO>>; // TODO(koan) @koan-error

// All broad arrays expose readonly recursively transformed elements.
type _D31 = Expect<Equal<DRO<string[]>, TODO>>; // TODO(koan) @koan-error
type _D32 = Expect<Equal<DRO<readonly string[]>, TODO>>; // TODO(koan) @koan-error
type _D33 = Expect<Equal<DRO<Array<{ id: number }>>, TODO>>; // TODO(koan) @koan-error
type _D34 = Expect<Equal<DRO<readonly { id: number }[]>, TODO>>; // TODO(koan) @koan-error
type _D35 = Expect<Equal<DRO<Array<Array<{ id: number }>>>, TODO>>; // TODO(koan) @koan-error
type _D36 = Expect<Equal<DRO<readonly (readonly { id: number }[])[]>, TODO>>; // TODO(koan) @koan-error
type _D37 = Expect<Equal<DRO<never[]>, TODO>>; // TODO(koan) @koan-error
type _D38 = Expect<Equal<DRO<unknown[]>, TODO>>; // TODO(koan) @koan-error
type _D39 = Expect<Equal<"push" extends keyof DRO<string[]> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D40 = Expect<Equal<"map" extends keyof DRO<string[]> ? true : false, TODO>>; // TODO(koan) @koan-error

// Tuple positions retain cardinality, labels, and optionality while becoming readonly.
type _D41 = Expect<Equal<DRO<[]>, TODO>>; // TODO(koan) @koan-error
type _D42 = Expect<Equal<DRO<[1]>, TODO>>; // TODO(koan) @koan-error
type _D43 = Expect<Equal<DRO<[1, 2]>, TODO>>; // TODO(koan) @koan-error
type _D44 = Expect<Equal<DRO<readonly [1, 2]>, TODO>>; // TODO(koan) @koan-error
type _D45 = Expect<Equal<DRO<[left: { id: number }, right: string]>, TODO>>; // TODO(koan) @koan-error
type _D46 = Expect<Equal<DRO<[value?: { id: number }]>, TODO>>; // TODO(koan) @koan-error
type _D47 = Expect<Equal<DRO<[head: { id: number }, ...tail: string[]]>, TODO>>; // TODO(koan) @koan-error
type _D48 = Expect<Equal<DRO<[{ id: number }, { name: string }]>, TODO>>; // TODO(koan) @koan-error
type _D49 = Expect<Equal<DRO<[1, 2]>["length"], TODO>>; // TODO(koan) @koan-error
type _D50 = Expect<Equal<"push" extends keyof DRO<[1, 2]> ? true : false, TODO>>; // TODO(koan) @koan-error

// Union members transform independently and retain discriminants.
type U = { kind: "a"; a: { value: number } } | { kind: "b"; b: { value: string } };
type _D51 = Expect<Equal<DRO<U>, TODO>>; // TODO(koan) @koan-error
type _D52 = Expect<Equal<DRO<{ x: 1 } | { y: 2 }>, TODO>>; // TODO(koan) @koan-error
type _D53 = Expect<Equal<DRO<[1] | [2, 3]>, TODO>>; // TODO(koan) @koan-error
type _D54 = Expect<Equal<DRO<string[] | { id: number }>, TODO>>; // TODO(koan) @koan-error
type _D55 = Expect<Equal<DRO<Date | { id: number }>, TODO>>; // TODO(koan) @koan-error
type _D56 = Expect<Equal<DRO<never | { id: number }>, TODO>>; // TODO(koan) @koan-error
type _D57 = Expect<Equal<DRO<unknown | { id: number }>, TODO>>; // TODO(koan) @koan-error
type _D58 = Expect<Equal<DRO<any | { id: number }> extends any ? true : false, TODO>>; // TODO(koan) @koan-error
type _D59 = Expect<Equal<keyof DRO<U>, TODO>>; // TODO(koan) @koan-error
type _D60 = Expect<Equal<DRO<U>["kind"], TODO>>; // TODO(koan) @koan-error
