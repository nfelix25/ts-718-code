import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-091 edge cases: optional tuple elements
 * =============================================================================
 * Optionality affects reads, writes, cardinality, inference, and assignability
 * in different ways. Exact optional checking and unchecked indexed reads make
 * those differences visible instead of collapsing everything to undefined.
 */

type ERequired<T extends readonly unknown[]> = { [K in keyof T]-?: T[K] };
type EIsAny<T> = 0 extends (1 & T) ? true : false;

// An optional never position can be omitted but has no present value.
type _E01 = Expect<Equal<[x?: never][0], TODO>>; // TODO(koan) @koan-error
type _E02 = Expect<Equal<[x?: never]["length"], TODO>>; // TODO(koan) @koan-error
type _E03 = Expect<Equal<[] extends [x?: never] ? true : false, TODO>>; // TODO(koan) @koan-error
type _E04 = Expect<Equal<[undefined] extends [x?: never] ? true : false, TODO>>; // TODO(koan) @koan-error
type _E05 = Expect<Equal<ERequired<[x?: never]>, TODO>>; // TODO(koan) @koan-error

// Optional any poisons observations but length remains a precise union.
type _E06 = Expect<Equal<EIsAny<[x?: any][0]>, TODO>>; // TODO(koan) @koan-error
type _E07 = Expect<Equal<EIsAny<[x?: any][number]>, TODO>>; // TODO(koan) @koan-error
type _E08 = Expect<Equal<[x?: any]["length"], TODO>>; // TODO(koan) @koan-error
type _E09 = Expect<Equal<ERequired<[x?: any]>["length"], TODO>>; // TODO(koan) @koan-error
type _E10 = Expect<Equal<EIsAny<ERequired<[x?: any]>[0]>, TODO>>; // TODO(koan) @koan-error

// Explicit undefined in the element domain differs from mere omission.
type _E11 = Expect<Equal<[undefined] extends [x?: string] ? true : false, TODO>>; // TODO(koan) @koan-error
type _E12 = Expect<Equal<[undefined] extends [x?: string | undefined] ? true : false, TODO>>; // TODO(koan) @koan-error
type _E13 = Expect<Equal<[x?: string][0], TODO>>; // TODO(koan) @koan-error
type _E14 = Expect<Equal<[x?: string | undefined][0], TODO>>; // TODO(koan) @koan-error
type _E15 = Expect<Equal<Equal<[x?: string], [x?: string | undefined]>, TODO>>; // TODO(koan) @koan-error

// Multiple optional suffixes produce every length between required and total.
type Multi = [head: string, middle?: number, tail?: boolean];
type _E16 = Expect<Equal<Multi["length"], TODO>>; // TODO(koan) @koan-error
type _E17 = Expect<Equal<Multi[number], TODO>>; // TODO(koan) @koan-error
type _E18 = Expect<Equal<["x"] extends Multi ? true : false, TODO>>; // TODO(koan) @koan-error
type _E19 = Expect<Equal<["x", 1] extends Multi ? true : false, TODO>>; // TODO(koan) @koan-error
type _E20 = Expect<Equal<["x", 1, true] extends Multi ? true : false, TODO>>; // TODO(koan) @koan-error
type _E21 = Expect<Equal<["x", undefined, true] extends Multi ? true : false, TODO>>; // TODO(koan) @koan-error

// Arrays under unchecked indexed access and optional tuples reach undefined differently.
declare const eArray: string[];
declare const eOptional: [value?: string];
type _E22 = Expect<Equal<typeof eArray[0], TODO>>; // TODO(koan) @koan-error
type _E23 = Expect<Equal<typeof eOptional[0], TODO>>; // TODO(koan) @koan-error
type _E24 = Expect<Equal<string[][number], TODO>>; // TODO(koan) @koan-error
type _E25 = Expect<Equal<[value?: string][number], TODO>>; // TODO(koan) @koan-error

// Optional-before-rest is positional; omission cannot skip directly into the rest.
type OptionalThenRest = [label?: string, ...codes: number[]];
type _E26 = Expect<Equal<OptionalThenRest["length"], TODO>>; // TODO(koan) @koan-error
type _E27 = Expect<Equal<OptionalThenRest[number], TODO>>; // TODO(koan) @koan-error
type _E28 = Expect<Equal<[] extends OptionalThenRest ? true : false, TODO>>; // TODO(koan) @koan-error
type _E29 = Expect<Equal<["x", 1, 2] extends OptionalThenRest ? true : false, TODO>>; // TODO(koan) @koan-error
type _E30 = Expect<Equal<[1, 2] extends OptionalThenRest ? true : false, TODO>>; // TODO(koan) @koan-error

// Pre-solved: a read includes undefined even when explicit undefined is rejected.
type _DemoRead = Expect<Equal<[value?: string][0], string | undefined>>;

// Pre-solved: every permitted finite cardinality appears in length.
type _DemoLengths = Expect<Equal<[a: string, b?: number, c?: boolean]["length"], 1 | 2 | 3>>;

// Pre-solved: a tuple union and optional tuple are not strict-equality identical.
type _DemoNotIdentical = Expect<Equal<Equal<[x?: string], [] | [string]>, false>>;

// @ts-expect-error A required element cannot follow an optional tuple element.
type InvalidOrder = [first?: string, second: number];

declare let exactOptional: [value?: string];
// @ts-expect-error Exact optional checking rejects explicitly writing undefined.
exactOptional[0] = undefined;
