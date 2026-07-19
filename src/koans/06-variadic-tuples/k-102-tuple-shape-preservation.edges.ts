import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-102 edge cases: tuple shape preservation
 * =============================================================================
 * Tuple-aware mapped reconstruction is syntactic and structural, not magical.
 * Key remapping, optional observations, open arrays, unions, and special types
 * show the precise boundary of the preservation rule.
 */

type EB<T extends readonly unknown[]> = { [K in keyof T]: { value: T[K] } };
type EA<T extends readonly unknown[]> = { [K in keyof T]: Awaited<T[K]> };
type ER<T extends readonly unknown[]> = { [K in keyof T as `x_${Extract<K, string>}`]: T[K] };
type EIsAny<T> = 0 extends (1 & T) ? true : false;

// Optional mapped positions retain omission and undefined-on-read behavior.
type OptionalBox = EB<[value?: string]>;
type _E01 = Expect<Equal<OptionalBox, TODO>>; // TODO(koan) @koan-error
type _E02 = Expect<Equal<OptionalBox[0], TODO>>; // TODO(koan) @koan-error
type _E03 = Expect<Equal<OptionalBox["length"], TODO>>; // TODO(koan) @koan-error
type _E04 = Expect<Equal<[] extends OptionalBox ? true : false, TODO>>; // TODO(koan) @koan-error
type _E05 = Expect<Equal<[{ value: string }] extends OptionalBox ? true : false, TODO>>; // TODO(koan) @koan-error

// Awaited optional positions transform their present domain and retain absence.
type _E06 = Expect<Equal<EA<[value?: Promise<1>]>, TODO>>; // TODO(koan) @koan-error
type _E07 = Expect<Equal<EA<[value?: Promise<1>]>[0], TODO>>; // TODO(koan) @koan-error
type _E08 = Expect<Equal<EA<[head: Promise<1>, tail?: Promise<2>]>, TODO>>; // TODO(koan) @koan-error
type _E09 = Expect<Equal<EA<[head: Promise<1>, ...tail: Promise<2>[]]>, TODO>>; // TODO(koan) @koan-error
type _E10 = Expect<Equal<EA<Promise<1>[]>, TODO>>; // TODO(koan) @koan-error

// Key remapping exposes ordinary array keys under new names.
type Remapped = ER<[1, 2]>;
type _E11 = Expect<Equal<Remapped["x_0"], TODO>>; // TODO(koan) @koan-error
type _E12 = Expect<Equal<Remapped["x_length"], TODO>>; // TODO(koan) @koan-error
type _E13 = Expect<Equal<"x_push" extends keyof Remapped ? true : false, TODO>>; // TODO(koan) @koan-error
type _E14 = Expect<Equal<Remapped extends [1, 2] ? true : false, TODO>>; // TODO(koan) @koan-error
type _E15 = Expect<Equal<"0" extends keyof Remapped ? true : false, TODO>>; // TODO(koan) @koan-error

// Homomorphic mapping distributes across tuple unions and preserves each shape.
type _E16 = Expect<Equal<EB<[1] | [2, 3]>, TODO>>; // TODO(koan) @koan-error
type _E17 = Expect<Equal<EB<[] | [1]>, TODO>>; // TODO(koan) @koan-error
type _E18 = Expect<Equal<EA<[Promise<1>] | [Promise<2>, Promise<3>]>, TODO>>; // TODO(koan) @koan-error
type _E19 = Expect<Equal<EB<[1] | string[]>, TODO>>; // TODO(koan) @koan-error
type _E20 = Expect<Equal<EB<never>, TODO>>; // TODO(koan) @koan-error

// Any, unknown, and never element domains transform positionally.
type _E21 = Expect<Equal<EIsAny<EB<[any]>[0]["value"]>, TODO>>; // TODO(koan) @koan-error
type _E22 = Expect<Equal<EB<[unknown]>, TODO>>; // TODO(koan) @koan-error
type _E23 = Expect<Equal<EB<[never]>, TODO>>; // TODO(koan) @koan-error
type _E24 = Expect<Equal<EA<[Promise<any>]>[0] extends any ? true : false, TODO>>; // TODO(koan) @koan-error
type _E25 = Expect<Equal<EA<[Promise<never>]>, TODO>>; // TODO(koan) @koan-error

// Labels are preserved for tooling but remain absent from the key domain.
type Labeled = EB<[name: string, count: number]>;
type _E26 = Expect<Equal<Labeled, TODO>>; // TODO(koan) @koan-error
type _E27 = Expect<Equal<"name" extends keyof Labeled ? true : false, TODO>>; // TODO(koan) @koan-error
type _E28 = Expect<Equal<"0" extends keyof Labeled ? true : false, TODO>>; // TODO(koan) @koan-error
type _E29 = Expect<Equal<Labeled[0], TODO>>; // TODO(koan) @koan-error
type _E30 = Expect<Equal<Labeled["length"], TODO>>; // TODO(koan) @koan-error

// Pre-solved: homomorphic mapping preserves a readonly finite tuple.
type _DemoReadonly = Expect<Equal<EB<readonly [1, 2]>, readonly [{ value: 1 }, { value: 2 }]>>;

// Pre-solved: Awaited changes values without changing cardinality.
type _DemoAwaited = Expect<Equal<EA<[Promise<1>, 2]>, [1, 2]>>;

// Pre-solved: key remapping does not reconstruct a tuple.
type _DemoRemapped = Expect<Equal<ER<[1, 2]> extends readonly unknown[] ? true : false, false>>;

declare const boxedReadonly: EB<readonly [1, 2]>;
// @ts-expect-error Homomorphic mapping preserved the source readonly capability.
boxedReadonly[0] = { value: 1 };
