import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-108 guided drills: DeepPartial
 * =============================================================================
 * Stop at atomic leaves, distinguish finite tuples from broad arrays, and apply
 * optionality to object keys before recursively transforming their values.
 */

type DP = string | number | boolean | bigint | symbol | null | undefined;
type DF = (...args: any[]) => unknown;
type DA = DP | Date | RegExp | DF | Map<unknown, unknown> | Set<unknown> | Promise<unknown>;
type DAny<T> = 0 extends (1 & T) ? true : false;
type DPartial<T> = DAny<T> extends true ? any : T extends DA ? T : T extends readonly unknown[] ? number extends T["length"] ? T extends unknown[] ? DPartial<T[number]>[] : readonly DPartial<T[number]>[] : { [K in keyof T]?: DPartial<T[K]> } : T extends object ? { [K in keyof T]?: DPartial<T[K]> } : T;

// Atomic leaves are identity cases.
type _D01 = Expect<Equal<DPartial<string>, TODO>>; // TODO(koan) @koan-error
type _D02 = Expect<Equal<DPartial<number>, TODO>>; // TODO(koan) @koan-error
type _D03 = Expect<Equal<DPartial<boolean>, TODO>>; // TODO(koan) @koan-error
type _D04 = Expect<Equal<DPartial<null>, TODO>>; // TODO(koan) @koan-error
type _D05 = Expect<Equal<DPartial<undefined>, TODO>>; // TODO(koan) @koan-error
type _D06 = Expect<Equal<DPartial<Date>, TODO>>; // TODO(koan) @koan-error
type _D07 = Expect<Equal<DPartial<RegExp>, TODO>>; // TODO(koan) @koan-error
type _D08 = Expect<Equal<DPartial<(x: number) => string>, TODO>>; // TODO(koan) @koan-error
type _D09 = Expect<Equal<DPartial<Map<string, number>>, TODO>>; // TODO(koan) @koan-error
type _D10 = Expect<Equal<DPartial<Set<boolean>>, TODO>>; // TODO(koan) @koan-error
type _D11 = Expect<Equal<DPartial<Promise<1>>, TODO>>; // TODO(koan) @koan-error
type _D12 = Expect<Equal<DPartial<unknown>, TODO>>; // TODO(koan) @koan-error
type _D13 = Expect<Equal<DPartial<never>, TODO>>; // TODO(koan) @koan-error
type _D14 = Expect<Equal<DAny<DPartial<any>>, TODO>>; // TODO(koan) @koan-error
type _D15 = Expect<Equal<DPartial<string | number>, TODO>>; // TODO(koan) @koan-error

// Object properties become recursively optional.
type _D16 = Expect<Equal<DPartial<{}>, TODO>>; // TODO(koan) @koan-error
type _D17 = Expect<Equal<DPartial<{ id: number }>, TODO>>; // TODO(koan) @koan-error
type _D18 = Expect<Equal<DPartial<{ id: number; name: string }>, TODO>>; // TODO(koan) @koan-error
type _D19 = Expect<Equal<DPartial<{ user: { id: number } }>, TODO>>; // TODO(koan) @koan-error
type _D20 = Expect<Equal<DPartial<{ user: { profile: { name: string } } }>, TODO>>; // TODO(koan) @koan-error
type _D21 = Expect<Equal<DPartial<{ value?: string }>, TODO>>; // TODO(koan) @koan-error
type _D22 = Expect<Equal<DPartial<{ value?: { nested: number } }>, TODO>>; // TODO(koan) @koan-error
type _D23 = Expect<Equal<DPartial<{ readonly id: number }>, TODO>>; // TODO(koan) @koan-error
type _D24 = Expect<Equal<DPartial<{ readonly nested: { readonly id: number } }>, TODO>>; // TODO(koan) @koan-error
type _D25 = Expect<Equal<DPartial<Record<string, { id: number }>>, TODO>>; // TODO(koan) @koan-error
type _D26 = Expect<Equal<DPartial<Record<number, { id: number }>>, TODO>>; // TODO(koan) @koan-error
type _D27 = Expect<Equal<DPartial<{ fn: () => string; data: { id: number } }>, TODO>>; // TODO(koan) @koan-error
type _D28 = Expect<Equal<DPartial<{ date: Date; nested: { id: number } }>, TODO>>; // TODO(koan) @koan-error
type _D29 = Expect<Equal<NonNullable<DPartial<{ user: { id: number } }>["user"]>, TODO>>; // TODO(koan) @koan-error
type _D30 = Expect<Equal<NonNullable<DPartial<{ user: { id: number } }>["user"]>["id"], TODO>>; // TODO(koan) @koan-error

// Broad arrays recurse into elements and preserve mutable capability.
type _D31 = Expect<Equal<DPartial<string[]>, TODO>>; // TODO(koan) @koan-error
type _D32 = Expect<Equal<DPartial<readonly string[]>, TODO>>; // TODO(koan) @koan-error
type _D33 = Expect<Equal<DPartial<Array<{ id: number }>>, TODO>>; // TODO(koan) @koan-error
type _D34 = Expect<Equal<DPartial<readonly { id: number }[]>, TODO>>; // TODO(koan) @koan-error
type _D35 = Expect<Equal<DPartial<Array<Array<{ id: number }>>>, TODO>>; // TODO(koan) @koan-error
type _D36 = Expect<Equal<DPartial<readonly (readonly { id: number }[])[]>, TODO>>; // TODO(koan) @koan-error
type _D37 = Expect<Equal<DPartial<never[]>, TODO>>; // TODO(koan) @koan-error
type _D38 = Expect<Equal<DPartial<unknown[]>, TODO>>; // TODO(koan) @koan-error
type _D39 = Expect<Equal<"push" extends keyof DPartial<string[]> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D40 = Expect<Equal<"push" extends keyof DPartial<readonly string[]> ? true : false, TODO>>; // TODO(koan) @koan-error

// Finite tuple positions become optional while shape and readonly survive.
type _D41 = Expect<Equal<DPartial<[]>, TODO>>; // TODO(koan) @koan-error
type _D42 = Expect<Equal<DPartial<[1]>, TODO>>; // TODO(koan) @koan-error
type _D43 = Expect<Equal<DPartial<[1, 2]>, TODO>>; // TODO(koan) @koan-error
type _D44 = Expect<Equal<DPartial<readonly [1, 2]>, TODO>>; // TODO(koan) @koan-error
type _D45 = Expect<Equal<DPartial<[left: { id: number }, right: string]>, TODO>>; // TODO(koan) @koan-error
type _D46 = Expect<Equal<DPartial<[value?: { id: number }]>, TODO>>; // TODO(koan) @koan-error
type _D47 = Expect<Equal<DPartial<[head: { id: number }, ...tail: string[]]>, TODO>>; // TODO(koan) @koan-error
type _D48 = Expect<Equal<DPartial<readonly [{ id: number }, { name: string }]>, TODO>>; // TODO(koan) @koan-error
type _D49 = Expect<Equal<DPartial<[1, 2]>["length"], TODO>>; // TODO(koan) @koan-error
type _D50 = Expect<Equal<DPartial<[1, 2]>[0], TODO>>; // TODO(koan) @koan-error

// Unions distribute and preserve each patch shape.
type U = { kind: "a"; a: { value: number } } | { kind: "b"; b: { value: string } };
type _D51 = Expect<Equal<DPartial<U>, TODO>>; // TODO(koan) @koan-error
type _D52 = Expect<Equal<DPartial<{ x: 1 } | { y: 2 }>, TODO>>; // TODO(koan) @koan-error
type _D53 = Expect<Equal<DPartial<readonly [1] | readonly [2, 3]>, TODO>>; // TODO(koan) @koan-error
type _D54 = Expect<Equal<DPartial<string[] | { id: number }>, TODO>>; // TODO(koan) @koan-error
type _D55 = Expect<Equal<DPartial<Date | { id: number }>, TODO>>; // TODO(koan) @koan-error
type _D56 = Expect<Equal<DPartial<never | { id: number }>, TODO>>; // TODO(koan) @koan-error
type _D57 = Expect<Equal<DPartial<unknown | { id: number }>, TODO>>; // TODO(koan) @koan-error
type _D58 = Expect<Equal<DPartial<any | { id: number }> extends any ? true : false, TODO>>; // TODO(koan) @koan-error
type _D59 = Expect<Equal<keyof DPartial<U>, TODO>>; // TODO(koan) @koan-error
type _D60 = Expect<Equal<DPartial<U>["kind"], TODO>>; // TODO(koan) @koan-error
