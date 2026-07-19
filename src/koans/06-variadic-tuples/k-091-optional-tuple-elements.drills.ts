import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-091 guided drills: optional tuple elements
 * =============================================================================
 * For every shape, enumerate legal lengths first, then compute what a read can
 * observe. Keep omission distinct from an explicitly supplied undefined value.
 */

type DOptional<T extends readonly unknown[]> = { [K in keyof T]?: T[K] };
type DRequired<T extends readonly unknown[]> = { [K in keyof T]-?: T[K] };

// One optional suffix changes both reads and length.
type _D01 = Expect<Equal<[value?: string][0], TODO>>; // TODO(koan) @koan-error
type _D02 = Expect<Equal<[value?: string][number], TODO>>; // TODO(koan) @koan-error
type _D03 = Expect<Equal<[value?: string]["length"], TODO>>; // TODO(koan) @koan-error
type _D04 = Expect<Equal<[value?: 1][0], TODO>>; // TODO(koan) @koan-error
type _D05 = Expect<Equal<[value?: 1]["length"], TODO>>; // TODO(koan) @koan-error
type _D06 = Expect<Equal<[first: string, second?: number][0], TODO>>; // TODO(koan) @koan-error
type _D07 = Expect<Equal<[first: string, second?: number][1], TODO>>; // TODO(koan) @koan-error
type _D08 = Expect<Equal<[first: string, second?: number][number], TODO>>; // TODO(koan) @koan-error
type _D09 = Expect<Equal<[first: string, second?: number]["length"], TODO>>; // TODO(koan) @koan-error
type _D10 = Expect<Equal<[a: string, b?: number, c?: boolean]["length"], TODO>>; // TODO(koan) @koan-error

// Assignability tests omission, explicit values, and exact optional behavior.
type _D11 = Expect<Equal<[] extends [x?: string] ? true : false, TODO>>; // TODO(koan) @koan-error
type _D12 = Expect<Equal<["x"] extends [x?: string] ? true : false, TODO>>; // TODO(koan) @koan-error
type _D13 = Expect<Equal<[undefined] extends [x?: string] ? true : false, TODO>>; // TODO(koan) @koan-error
type _D14 = Expect<Equal<[undefined] extends [x?: string | undefined] ? true : false, TODO>>; // TODO(koan) @koan-error
type _D15 = Expect<Equal<[1] extends [x: number, y?: number] ? true : false, TODO>>; // TODO(koan) @koan-error
type _D16 = Expect<Equal<[1, 2] extends [x: number, y?: number] ? true : false, TODO>>; // TODO(koan) @koan-error
type _D17 = Expect<Equal<[1, undefined] extends [x: number, y?: number] ? true : false, TODO>>; // TODO(koan) @koan-error
type _D18 = Expect<Equal<[1, undefined] extends [x: number, y?: number | undefined] ? true : false, TODO>>; // TODO(koan) @koan-error
type _D19 = Expect<Equal<[1, 2, 3] extends [x: number, y?: number] ? true : false, TODO>>; // TODO(koan) @koan-error
type _D20 = Expect<Equal<[] extends [x: number, y?: number] ? true : false, TODO>>; // TODO(koan) @koan-error

// Homomorphic optional mapping makes every position omittable from the end.
type _D21 = Expect<Equal<DOptional<[]>, TODO>>; // TODO(koan) @koan-error
type _D22 = Expect<Equal<DOptional<[string]>, TODO>>; // TODO(koan) @koan-error
type _D23 = Expect<Equal<DOptional<[string, number]>, TODO>>; // TODO(koan) @koan-error
type _D24 = Expect<Equal<DOptional<[string, number, boolean]>, TODO>>; // TODO(koan) @koan-error
type _D25 = Expect<Equal<DOptional<readonly [string, number]>, TODO>>; // TODO(koan) @koan-error
type _D26 = Expect<Equal<DOptional<[left: 1, right: 2]>, TODO>>; // TODO(koan) @koan-error
type _D27 = Expect<Equal<DOptional<[string, number]>["length"], TODO>>; // TODO(koan) @koan-error
type _D28 = Expect<Equal<DOptional<[string, number]>[0], TODO>>; // TODO(koan) @koan-error
type _D29 = Expect<Equal<DOptional<[string, number]>[1], TODO>>; // TODO(koan) @koan-error
type _D30 = Expect<Equal<DOptional<[string, number]>[number], TODO>>; // TODO(koan) @koan-error

// Removing optionality makes every declared position required again.
type _D31 = Expect<Equal<DRequired<[]>, TODO>>; // TODO(koan) @koan-error
type _D32 = Expect<Equal<DRequired<[x?: string]>, TODO>>; // TODO(koan) @koan-error
type _D33 = Expect<Equal<DRequired<[x?: string, y?: number]>, TODO>>; // TODO(koan) @koan-error
type _D34 = Expect<Equal<DRequired<readonly [x?: string, y?: number]>, TODO>>; // TODO(koan) @koan-error
type _D35 = Expect<Equal<DRequired<[x?: string]>[0], TODO>>; // TODO(koan) @koan-error
type _D36 = Expect<Equal<DRequired<[x?: string]>["length"], TODO>>; // TODO(koan) @koan-error
type _D37 = Expect<Equal<DRequired<DOptional<[string, number]>>, TODO>>; // TODO(koan) @koan-error
type _D38 = Expect<Equal<DOptional<DRequired<[x?: string, y?: number]>>, TODO>>; // TODO(koan) @koan-error
type _D39 = Expect<Equal<Required<[x?: string, y?: number]>, TODO>>; // TODO(koan) @koan-error
type _D40 = Expect<Equal<Partial<[x: string, y: number]>, TODO>>; // TODO(koan) @koan-error

// Optional tuples and explicit unions have similar values but distinct identity.
type _D41 = Expect<Equal<[x?: string] extends [] | [string] ? true : false, TODO>>; // TODO(koan) @koan-error
type _D42 = Expect<Equal<[] | [string] extends [x?: string] ? true : false, TODO>>; // TODO(koan) @koan-error
type _D43 = Expect<Equal<Equal<[x?: string], [] | [string]>, TODO>>; // TODO(koan) @koan-error
type _D44 = Expect<Equal<([] | [string])["length"], TODO>>; // TODO(koan) @koan-error
type _D45 = Expect<Equal<([] | [string])[number], TODO>>; // TODO(koan) @koan-error
type _D46 = Expect<Equal<[x?: string]["length"], TODO>>; // TODO(koan) @koan-error
type _D47 = Expect<Equal<[x?: string][number], TODO>>; // TODO(koan) @koan-error
type _D48 = Expect<Equal<[x?: string] extends readonly [x?: string] ? true : false, TODO>>; // TODO(koan) @koan-error
type _D49 = Expect<Equal<readonly [x?: string] extends [x?: string] ? true : false, TODO>>; // TODO(koan) @koan-error
type _D50 = Expect<Equal<(readonly [x?: string])["length"], TODO>>; // TODO(koan) @koan-error

// Optional function parameters become optional trailing tuple positions.
type DP0 = Parameters<() => void>;
type DP1 = Parameters<(value?: string) => void>;
type DP2 = Parameters<(value: string, radix?: number) => void>;
type _D51 = Expect<Equal<DP0, TODO>>; // TODO(koan) @koan-error
type _D52 = Expect<Equal<DP1, TODO>>; // TODO(koan) @koan-error
type _D53 = Expect<Equal<DP1[0], TODO>>; // TODO(koan) @koan-error
type _D54 = Expect<Equal<DP1["length"], TODO>>; // TODO(koan) @koan-error
type _D55 = Expect<Equal<DP2, TODO>>; // TODO(koan) @koan-error
type _D56 = Expect<Equal<DP2[0], TODO>>; // TODO(koan) @koan-error
type _D57 = Expect<Equal<DP2[1], TODO>>; // TODO(koan) @koan-error
type _D58 = Expect<Equal<DP2[number], TODO>>; // TODO(koan) @koan-error
type _D59 = Expect<Equal<DP2["length"], TODO>>; // TODO(koan) @koan-error
type _D60 = Expect<Equal<DRequired<DP2>, TODO>>; // TODO(koan) @koan-error
