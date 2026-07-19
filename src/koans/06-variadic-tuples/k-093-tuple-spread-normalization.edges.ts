import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-093 edge cases: tuple spread normalization
 * =============================================================================
 * Normalization is where optionality, unbounded regions, unions, and extreme
 * element types interact. These cases emphasize the legal output shape rather
 * than imagining that source rest boundaries survive unchanged.
 */

type ES<A extends readonly unknown[], B extends readonly unknown[]> = [...A, ...B];
type EIsAny<T> = 0 extends (1 & T) ? true : false;

// Required suffixes force earlier optional positions to become present.
type _E01 = Expect<Equal<ES<[a?: string], [b: number]>, TODO>>; // TODO(koan) @koan-error
type _E02 = Expect<Equal<ES<[a?: string, b?: boolean], [c: number]>, TODO>>; // TODO(koan) @koan-error
type _E03 = Expect<Equal<ES<[a?: string], [b?: number]>, TODO>>; // TODO(koan) @koan-error
type _E04 = Expect<Equal<ES<[a?: never], [b: 1]>, TODO>>; // TODO(koan) @koan-error
type _E05 = Expect<Equal<ES<[a?: any], [b: 1]>[0] extends any ? true : false, TODO>>; // TODO(koan) @koan-error
type _E06 = Expect<Equal<ES<[a?: unknown], [b: 1]>[0], TODO>>; // TODO(koan) @koan-error

// Fixed positions after an open region are absorbed when another spread follows.
type _E07 = Expect<Equal<ES<[0, ...1[]], [2]>, TODO>>; // TODO(koan) @koan-error
type _E08 = Expect<Equal<ES<[0, ...1[]], [2, 3]>, TODO>>; // TODO(koan) @koan-error
type _E09 = Expect<Equal<ES<[0, ...1[]], [...2[], 3]>, TODO>>; // TODO(koan) @koan-error
type _E10 = Expect<Equal<ES<[0, ...never[]], [2]>, TODO>>; // TODO(koan) @koan-error
type _E11 = Expect<Equal<ES<[0, ...unknown[]], [2]>[number], TODO>>; // TODO(koan) @koan-error

// Readonly input capability is not copied onto the fresh output shape.
type _E12 = Expect<Equal<ES<readonly [1], readonly [2]>, TODO>>; // TODO(koan) @koan-error
type _E13 = Expect<Equal<ES<readonly [1], readonly [2]> extends [1, 2] ? true : false, TODO>>; // TODO(koan) @koan-error
type _E14 = Expect<Equal<readonly [1, 2] extends ES<readonly [1], readonly [2]> ? true : false, TODO>>; // TODO(koan) @koan-error
type _E15 = Expect<Equal<"push" extends keyof ES<readonly [1], readonly [2]> ? true : false, TODO>>; // TODO(koan) @koan-error

// Union operands form cross-products of possible normalized tuple shapes.
type _E16 = Expect<Equal<ES<[1] | [2], [3]>, TODO>>; // TODO(koan) @koan-error
type _E17 = Expect<Equal<ES<[1], [2] | [3]>, TODO>>; // TODO(koan) @koan-error
type _E18 = Expect<Equal<ES<[1] | [2], [3] | [4]>, TODO>>; // TODO(koan) @koan-error
type _E19 = Expect<Equal<ES<[] | [1], [2]>["length"], TODO>>; // TODO(koan) @koan-error
type _E20 = Expect<Equal<ES<[1], [] | [2]>[number], TODO>>; // TODO(koan) @koan-error

// Never as the whole operand differs from an array whose element is never.
type _E21 = Expect<Equal<ES<never, [1]>, TODO>>; // TODO(koan) @koan-error
type _E22 = Expect<Equal<ES<never[], [1]>, TODO>>; // TODO(koan) @koan-error
type _E23 = Expect<Equal<ES<[1], never>, TODO>>; // TODO(koan) @koan-error
type _E24 = Expect<Equal<ES<[1], never[]>, TODO>>; // TODO(koan) @koan-error
type _E25 = Expect<Equal<ES<never[], never[]>[number], TODO>>; // TODO(koan) @koan-error

// Any and unknown normalize through element unions with different precision.
type _E26 = Expect<Equal<EIsAny<ES<any[], [1]>[number]>, TODO>>; // TODO(koan) @koan-error
type _E27 = Expect<Equal<EIsAny<ES<[1], any[]>[number]>, TODO>>; // TODO(koan) @koan-error
type _E28 = Expect<Equal<ES<unknown[], [1]>[number], TODO>>; // TODO(koan) @koan-error
type _E29 = Expect<Equal<ES<[1], unknown[]>[number], TODO>>; // TODO(koan) @koan-error
type _E30 = Expect<Equal<ES<unknown[], unknown[]>[number], TODO>>; // TODO(koan) @koan-error

// Pre-solved: finite readonly inputs produce a mutable concatenated tuple type.
type _DemoFinite = Expect<Equal<ES<readonly [1, 2], readonly [3]>, [1, 2, 3]>>;

// Pre-solved: a required suffix normalizes an earlier optional element.
type _DemoOptional = Expect<Equal<ES<[value?: string], [count: number]>, [value: string | undefined, count: number]>>;

// Pre-solved: two plain arrays become one array of their element union.
type _DemoArrays = Expect<Equal<ES<string[], number[]>, (string | number)[]>>;

// @ts-expect-error A direct tuple declaration cannot contain two rest elements.
type DirectTwoRests = [...left: string[], ...right: number[]];
