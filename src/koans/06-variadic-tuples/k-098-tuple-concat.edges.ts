import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-098 edge cases: tuple concat
 * =============================================================================
 * Algebraic laws depend on the chosen output policy and on normalization of
 * open shapes. Recursive many-concat also needs a broad-array base case or it
 * would incorrectly treat an unknown number of chunks as no chunks.
 */

type EC<A extends readonly unknown[], B extends readonly unknown[]> = [...A, ...B];
type ERC<A extends readonly unknown[], B extends readonly unknown[]> = readonly [...A, ...B];
type EMany<C extends readonly (readonly unknown[])[]> = number extends C["length"] ? C[number][number][] : C extends readonly [infer H extends readonly unknown[], ...infer R extends readonly (readonly unknown[])[]] ? [...H, ...EMany<R>] : [];
type EIsAny<T> = 0 extends (1 & T) ? true : false;

// Empty identity preserves values but default concat may change readonly capability.
type _E01 = Expect<Equal<EC<[], readonly [1, 2]>, TODO>>; // TODO(koan) @koan-error
type _E02 = Expect<Equal<EC<readonly [1, 2], []>, TODO>>; // TODO(koan) @koan-error
type _E03 = Expect<Equal<Equal<EC<[], readonly [1, 2]>, readonly [1, 2]>, TODO>>; // TODO(koan) @koan-error
type _E04 = Expect<Equal<ERC<[], readonly [1, 2]>, TODO>>; // TODO(koan) @koan-error
type _E05 = Expect<Equal<Equal<ERC<[], readonly [1, 2]>, readonly [1, 2]>, TODO>>; // TODO(koan) @koan-error

// Associativity survives normalized open regions.
type OpenLeft = EC<EC<[0], 1[]>, [2]>;
type OpenRight = EC<[0], EC<1[], [2]>>;
type _E06 = Expect<Equal<OpenLeft, TODO>>; // TODO(koan) @koan-error
type _E07 = Expect<Equal<OpenRight, TODO>>; // TODO(koan) @koan-error
type _E08 = Expect<Equal<Equal<OpenLeft, OpenRight>, TODO>>; // TODO(koan) @koan-error
type _E09 = Expect<Equal<OpenLeft[number], TODO>>; // TODO(koan) @koan-error
type _E10 = Expect<Equal<OpenLeft["length"], TODO>>; // TODO(koan) @koan-error

// Union operands form cross-products and never operands eliminate branches.
type _E11 = Expect<Equal<EC<[1] | [2], [3] | [4]>, TODO>>; // TODO(koan) @koan-error
type _E12 = Expect<Equal<EC<never, [1]>, TODO>>; // TODO(koan) @koan-error
type _E13 = Expect<Equal<EC<[1], never>, TODO>>; // TODO(koan) @koan-error
type _E14 = Expect<Equal<EC<never[], [1]>, TODO>>; // TODO(koan) @koan-error
type _E15 = Expect<Equal<EC<[1], never[]>, TODO>>; // TODO(koan) @koan-error

// Any and unknown array operands affect normalized element unions differently.
type _E16 = Expect<Equal<EIsAny<EC<any[], [1]>[number]>, TODO>>; // TODO(koan) @koan-error
type _E17 = Expect<Equal<EIsAny<EC<[1], any[]>[number]>, TODO>>; // TODO(koan) @koan-error
type _E18 = Expect<Equal<EC<unknown[], [1]>[number], TODO>>; // TODO(koan) @koan-error
type _E19 = Expect<Equal<EC<[1], unknown[]>[number], TODO>>; // TODO(koan) @koan-error
type _E20 = Expect<Equal<EC<never[], unknown[]>[number], TODO>>; // TODO(koan) @koan-error

// Broad many-concat must reflect arbitrary chunks rather than return empty.
type _E21 = Expect<Equal<EMany<string[][]>, TODO>>; // TODO(koan) @koan-error
type _E22 = Expect<Equal<EMany<(string[] | number[])[]>, TODO>>; // TODO(koan) @koan-error
type _E23 = Expect<Equal<EMany<readonly (readonly unknown[])[]>, TODO>>; // TODO(koan) @koan-error
type _E24 = Expect<Equal<EMany<never[]>, TODO>>; // TODO(koan) @koan-error
type _E25 = Expect<Equal<EIsAny<EMany<any[][]>[number]>, TODO>>; // TODO(koan) @koan-error

// Finite many-concat preserves exact order through empty and readonly chunks.
type _E26 = Expect<Equal<EMany<readonly [readonly [], readonly [1], readonly [], readonly [2, 3]]>, TODO>>; // TODO(koan) @koan-error
type _E27 = Expect<Equal<EMany<[[1, ...2[]], [3]]>, TODO>>; // TODO(koan) @koan-error
type _E28 = Expect<Equal<EMany<[[a?: 1], [b: 2]]>, TODO>>; // TODO(koan) @koan-error
type _E29 = Expect<Equal<EMany<[[1] | [2], [3]]>, TODO>>; // TODO(koan) @koan-error
type _E30 = Expect<Equal<EMany<never>, TODO>>; // TODO(koan) @koan-error

// Pre-solved: empty tuple is a value identity for mutable finite concat.
type _DemoIdentity = Expect<Equal<EC<[], [1, 2]>, [1, 2]>>;

// Pre-solved: finite concatenation is associative.
type _DemoAssociative = Expect<Equal<EC<EC<[1], [2]>, [3]>, EC<[1], EC<[2], [3]>>>>;

// Pre-solved: broad chunk arrays use their nested element domain.
type _DemoBroad = Expect<Equal<EMany<string[][]>, string[]>>;

declare const readonlyResult: ERC<[1], [2]>;
// @ts-expect-error The explicit readonly concat policy removes writes.
readonlyResult[0] = 1;
