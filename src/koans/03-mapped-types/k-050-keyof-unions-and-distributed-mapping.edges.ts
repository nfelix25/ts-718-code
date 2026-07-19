import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-050 edge cases: keyof unions and distributed mapping
 * =============================================================================
 * Distribution happens only while a union still exists and only at a naked type
 * parameter. These cases stress never elimination, unknown/any absorption,
 * tuple-wrapped non-distribution, intersection key sets, broad index signatures,
 * containers, functions, and the correlation cost of flattening all keys.
 */

type EAllKeys<T> = T extends unknown ? keyof T : never;
type ENonDistributedKeys<T> = [T] extends [unknown] ? keyof T : never;
type EValueAt<T, K extends PropertyKey> = T extends unknown ? K extends keyof T ? T[K] : never : never;
type EOptionalView<T> = { [K in EAllKeys<T>]?: EValueAt<T, K> };
type ERequiredView<T> = { [K in EAllKeys<T>]: EValueAt<T, K> };
type EDistributedNames<T> = T extends unknown ? { [K in keyof T]: K } : never;
type EIsAny<T> = 0 extends (1 & T) ? true : false;

type EDisjoint = { a: string } | { b: number };

// Distribution, non-distribution, never, and absorbed unions.
type _E01 = Expect<Equal<keyof EDisjoint, TODO>>; // TODO(koan) @koan-error
type _E02 = Expect<Equal<EAllKeys<EDisjoint>, TODO>>; // TODO(koan) @koan-error
type _E03 = Expect<Equal<ENonDistributedKeys<EDisjoint>, TODO>>; // TODO(koan) @koan-error
type _E04 = Expect<Equal<EAllKeys<never>, TODO>>; // TODO(koan) @koan-error
type _E05 = Expect<Equal<EAllKeys<{ a: 1 } | never>, TODO>>; // TODO(koan) @koan-error
type _E06 = Expect<Equal<EAllKeys<unknown | { a: 1 }>, TODO>>; // TODO(koan) @koan-error
type _E07 = Expect<Equal<EAllKeys<any | { a: 1 }>, TODO>>; // TODO(koan) @koan-error
type _E08 = Expect<Equal<EIsAny<EValueAt<any, "x">>, TODO>>; // TODO(koan) @koan-error

// Intersections support every constituent key, the opposite union intuition.
type _E09 = Expect<Equal<keyof ({ a: 1 } & { b: 2 }), TODO>>; // TODO(koan) @koan-error
type _E10 = Expect<Equal<EAllKeys<{ a: 1 } & { b: 2 }>, TODO>>; // TODO(koan) @koan-error
type _E11 = Expect<Equal<keyof (({ a: 1 } & { c: 3 }) | ({ b: 2 } & { c: 4 })), TODO>>; // TODO(koan) @koan-error
type _E12 = Expect<Equal<EAllKeys<({ a: 1 } & { c: 3 }) | ({ b: 2 } & { c: 4 })>, TODO>>; // TODO(koan) @koan-error

type ECorrelated =
  | { kind: "text"; text: string }
  | { kind: "count"; count: number };

// Flattening all keys admits states that no original union member represented.
type _E13 = Expect<Equal<EOptionalView<ECorrelated>, TODO>>; // TODO(koan) @koan-error
type _E14 = Expect<Equal<ERequiredView<ECorrelated>, TODO>>; // TODO(koan) @koan-error
type _E15 = Expect<Equal<EValueAt<ECorrelated, "kind">, TODO>>; // TODO(koan) @koan-error
type _E16 = Expect<Equal<EValueAt<ECorrelated, "text">, TODO>>; // TODO(koan) @koan-error
type _E17 = Expect<Equal<EDistributedNames<ECorrelated>, TODO>>; // TODO(koan) @koan-error
type _E18 = Expect<Equal<keyof EDistributedNames<ECorrelated>, TODO>>; // TODO(koan) @koan-error

// Broad index signatures can make literal keys safe across another member.
type EIndexed = { [key: string]: number } | { fixed: 1; other: 2 };
type _E19 = Expect<Equal<keyof EIndexed, TODO>>; // TODO(koan) @koan-error
type _E20 = Expect<Equal<EAllKeys<EIndexed>, TODO>>; // TODO(koan) @koan-error
type _E21 = Expect<Equal<EValueAt<EIndexed, "fixed">, TODO>>; // TODO(koan) @koan-error
type _E22 = Expect<Equal<EOptionalView<EIndexed>, TODO>>; // TODO(koan) @koan-error

declare const eOne: unique symbol;
declare const eTwo: unique symbol;
type EMixedKeys = { 0: string; [eOne]: 1 } | { 1: number; [eTwo]: 2 };

// Numeric, symbol, container, and callable unions use the same key algebra.
type _E23 = Expect<Equal<keyof EMixedKeys, TODO>>; // TODO(koan) @koan-error
type _E24 = Expect<Equal<EAllKeys<EMixedKeys>, TODO>>; // TODO(koan) @koan-error
type _E25 = Expect<Equal<EValueAt<EMixedKeys, typeof eOne>, TODO>>; // TODO(koan) @koan-error
type _E26 = Expect<Equal<keyof (string[] | readonly number[]), TODO>>; // TODO(koan) @koan-error
type _E27 = Expect<Equal<EAllKeys<[string] | readonly [number, boolean]>, TODO>>; // TODO(koan) @koan-error
type _E28 = Expect<Equal<keyof (() => string | ((x: number) => void)), TODO>>; // TODO(koan) @koan-error
type _E29 = Expect<Equal<EAllKeys<(() => string) | { meta: boolean }>, TODO>>; // TODO(koan) @koan-error
type _E30 = Expect<Equal<EOptionalView<{} | { id: string }>, TODO>>; // TODO(koan) @koan-error

// Pre-solved: tuple wrapping prevents the per-member keyof operation.
type _DemoWrapped = Expect<Equal<ENonDistributedKeys<{ a: 1 } | { b: 2 }>, never>>;

// Pre-solved: a flattened view permits fields from incompatible members together.
const impossibleButAllowed: EOptionalView<ECorrelated> = {
  kind: "text",
  text: "hello",
  count: 1,
};
void impossibleButAllowed;

// Pre-solved: the distributed representation retains each member's key set.
type DemoDistributed = EDistributedNames<{ a: 1 } | { b: 2 }>;
type _DemoDistributed = Expect<Equal<DemoDistributed, { a: "a" } | { b: "b" }>>;

declare const correlated: ECorrelated;
// @ts-expect-error A member-only key is unavailable before narrowing.
correlated.text;
