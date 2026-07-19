import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-111 guided drills: DeepMutable
 * =============================================================================
 * Remove readonly with `-readonly`, preserve presence modifiers, and reconstruct
 * every array as mutable while retaining finite tuple shape.
 */

type DP = string | number | boolean | bigint | symbol | null | undefined;
type DF = (...args: any[]) => unknown;
type DA = DP | Date | RegExp | DF | Map<unknown, unknown> | Set<unknown> | Promise<unknown>;
type DAny<T> = 0 extends (1 & T) ? true : false;
type DM<T> = DAny<T> extends true ? any : T extends DA ? T : T extends readonly unknown[] ? number extends T["length"] ? DM<T[number]>[] : { -readonly [K in keyof T]: DM<T[K]> } : T extends object ? { -readonly [K in keyof T]: DM<T[K]> } : T;

// Atomic leaves are identity cases.
type _D01 = Expect<Equal<DM<string>, TODO>>; // TODO(koan) @koan-error
type _D02 = Expect<Equal<DM<number>, TODO>>; // TODO(koan) @koan-error
type _D03 = Expect<Equal<DM<boolean>, TODO>>; // TODO(koan) @koan-error
type _D04 = Expect<Equal<DM<null>, TODO>>; // TODO(koan) @koan-error
type _D05 = Expect<Equal<DM<undefined>, TODO>>; // TODO(koan) @koan-error
type _D06 = Expect<Equal<DM<Date>, TODO>>; // TODO(koan) @koan-error
type _D07 = Expect<Equal<DM<RegExp>, TODO>>; // TODO(koan) @koan-error
type _D08 = Expect<Equal<DM<(x: number) => string>, TODO>>; // TODO(koan) @koan-error
type _D09 = Expect<Equal<DM<Map<string, number>>, TODO>>; // TODO(koan) @koan-error
type _D10 = Expect<Equal<DM<Set<boolean>>, TODO>>; // TODO(koan) @koan-error
type _D11 = Expect<Equal<DM<Promise<1>>, TODO>>; // TODO(koan) @koan-error
type _D12 = Expect<Equal<DM<unknown>, TODO>>; // TODO(koan) @koan-error
type _D13 = Expect<Equal<DM<never>, TODO>>; // TODO(koan) @koan-error
type _D14 = Expect<Equal<DAny<DM<any>>, TODO>>; // TODO(koan) @koan-error
type _D15 = Expect<Equal<DM<string | number>, TODO>>; // TODO(koan) @koan-error

// Object readonly is removed recursively while optionality stays unchanged.
type _D16 = Expect<Equal<DM<{}>, TODO>>; // TODO(koan) @koan-error
type _D17 = Expect<Equal<DM<{ readonly id: number }>, TODO>>; // TODO(koan) @koan-error
type _D18 = Expect<Equal<DM<{ readonly id: number; readonly name: string }>, TODO>>; // TODO(koan) @koan-error
type _D19 = Expect<Equal<DM<{ readonly user: { readonly id: number } }>, TODO>>; // TODO(koan) @koan-error
type _D20 = Expect<Equal<DM<{ readonly user: { readonly profile: { readonly name: string } } }>, TODO>>; // TODO(koan) @koan-error
type _D21 = Expect<Equal<DM<{ readonly value?: string }>, TODO>>; // TODO(koan) @koan-error
type _D22 = Expect<Equal<DM<{ readonly value?: { readonly nested: number } }>, TODO>>; // TODO(koan) @koan-error
type _D23 = Expect<Equal<DM<{ id: number }>, TODO>>; // TODO(koan) @koan-error
type _D24 = Expect<Equal<DM<Record<string, { readonly id: number }>>, TODO>>; // TODO(koan) @koan-error
type _D25 = Expect<Equal<DM<Record<number, { readonly id: number }>>, TODO>>; // TODO(koan) @koan-error
type _D26 = Expect<Equal<DM<{ readonly fn: () => string; readonly data: { readonly id: number } }>, TODO>>; // TODO(koan) @koan-error
type _D27 = Expect<Equal<DM<{ readonly date: Date; readonly nested: { readonly id: number } }>, TODO>>; // TODO(koan) @koan-error
type _D28 = Expect<Equal<DM<{ readonly user: { readonly id: number } }>["user"], TODO>>; // TODO(koan) @koan-error
type _D29 = Expect<Equal<DM<{ readonly user: { readonly id: number } }>["user"]["id"], TODO>>; // TODO(koan) @koan-error
type _D30 = Expect<Equal<{} extends DM<{ readonly x?: string }> ? true : false, TODO>>; // TODO(koan) @koan-error

// Every broad array result is mutable and recursively transformed.
type _D31 = Expect<Equal<DM<string[]>, TODO>>; // TODO(koan) @koan-error
type _D32 = Expect<Equal<DM<readonly string[]>, TODO>>; // TODO(koan) @koan-error
type _D33 = Expect<Equal<DM<readonly { readonly id: number }[]>, TODO>>; // TODO(koan) @koan-error
type _D34 = Expect<Equal<DM<ReadonlyArray<Readonly<{ id: number }>>>, TODO>>; // TODO(koan) @koan-error
type _D35 = Expect<Equal<DM<readonly (readonly { readonly id: number }[])[]>, TODO>>; // TODO(koan) @koan-error
type _D36 = Expect<Equal<DM<never[]>, TODO>>; // TODO(koan) @koan-error
type _D37 = Expect<Equal<DM<readonly unknown[]>, TODO>>; // TODO(koan) @koan-error
type _D38 = Expect<Equal<"push" extends keyof DM<readonly string[]> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D39 = Expect<Equal<"map" extends keyof DM<readonly string[]> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D40 = Expect<Equal<DM<readonly string[]>[number], TODO>>; // TODO(koan) @koan-error

// Finite tuples retain cardinality, labels, and optionality while becoming mutable.
type _D41 = Expect<Equal<DM<readonly []>, TODO>>; // TODO(koan) @koan-error
type _D42 = Expect<Equal<DM<readonly [1]>, TODO>>; // TODO(koan) @koan-error
type _D43 = Expect<Equal<DM<readonly [1, 2]>, TODO>>; // TODO(koan) @koan-error
type _D44 = Expect<Equal<DM<[1, 2]>, TODO>>; // TODO(koan) @koan-error
type _D45 = Expect<Equal<DM<readonly [left: { readonly id: number }, right: string]>, TODO>>; // TODO(koan) @koan-error
type _D46 = Expect<Equal<DM<readonly [value?: { readonly id: number }]>, TODO>>; // TODO(koan) @koan-error
type _D47 = Expect<Equal<DM<readonly [head: { readonly id: number }, ...tail: string[]]>, TODO>>; // TODO(koan) @koan-error
type _D48 = Expect<Equal<DM<readonly [{ readonly id: number }, { readonly name: string }]>, TODO>>; // TODO(koan) @koan-error
type _D49 = Expect<Equal<DM<readonly [1, 2]>["length"], TODO>>; // TODO(koan) @koan-error
type _D50 = Expect<Equal<"push" extends keyof DM<readonly [1, 2]> ? true : false, TODO>>; // TODO(koan) @koan-error

// Union members transform independently and preserve value relationships.
type U = { readonly kind: "a"; readonly a: { readonly value: number } } | { readonly kind: "b"; readonly b: { readonly value: string } };
type _D51 = Expect<Equal<DM<U>, TODO>>; // TODO(koan) @koan-error
type _D52 = Expect<Equal<DM<{ readonly x: 1 } | { readonly y: 2 }>, TODO>>; // TODO(koan) @koan-error
type _D53 = Expect<Equal<DM<readonly [1] | readonly [2, 3]>, TODO>>; // TODO(koan) @koan-error
type _D54 = Expect<Equal<DM<readonly string[] | { readonly id: number }>, TODO>>; // TODO(koan) @koan-error
type _D55 = Expect<Equal<DM<Date | { readonly id: number }>, TODO>>; // TODO(koan) @koan-error
type _D56 = Expect<Equal<DM<never | { readonly id: number }>, TODO>>; // TODO(koan) @koan-error
type _D57 = Expect<Equal<DM<unknown | { readonly id: number }>, TODO>>; // TODO(koan) @koan-error
type _D58 = Expect<Equal<DM<any | { readonly id: number }> extends any ? true : false, TODO>>; // TODO(koan) @koan-error
type _D59 = Expect<Equal<keyof DM<U>, TODO>>; // TODO(koan) @koan-error
type _D60 = Expect<Equal<DM<U>["kind"], TODO>>; // TODO(koan) @koan-error
