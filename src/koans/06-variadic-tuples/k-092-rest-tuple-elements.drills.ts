import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-092 guided drills: rest tuple elements
 * =============================================================================
 * Mark the fixed positions, the variable region, and the fixed suffix. Then
 * derive minimum cardinality, numeric element union, and assignment behavior.
 */

type DTrailing = [head: string, ...tail: number[]];
type DLeading = [...head: string[], tail: number];
type DMiddle = [head: string, ...middle: boolean[], tail: number];
type DOptional = [head?: string, ...tail: number[]];

// Trailing rests keep precise prefix reads and open-ended length.
type _D01 = Expect<Equal<DTrailing[0], TODO>>; // TODO(koan) @koan-error
type _D02 = Expect<Equal<DTrailing[1], TODO>>; // TODO(koan) @koan-error
type _D03 = Expect<Equal<DTrailing[20], TODO>>; // TODO(koan) @koan-error
type _D04 = Expect<Equal<DTrailing[number], TODO>>; // TODO(koan) @koan-error
type _D05 = Expect<Equal<DTrailing["length"], TODO>>; // TODO(koan) @koan-error
type _D06 = Expect<Equal<[...values: number[]][number], TODO>>; // TODO(koan) @koan-error
type _D07 = Expect<Equal<[...values: number[]]["length"], TODO>>; // TODO(koan) @koan-error
type _D08 = Expect<Equal<[head: 1, ...tail: never[]][0], TODO>>; // TODO(koan) @koan-error
type _D09 = Expect<Equal<[head: 1, ...tail: never[]][number], TODO>>; // TODO(koan) @koan-error
type _D10 = Expect<Equal<[head: 1, ...tail: unknown[]][number], TODO>>; // TODO(koan) @koan-error

// Assignment enforces the fixed prefix and each present rest element.
type _D11 = Expect<Equal<["x"] extends DTrailing ? true : false, TODO>>; // TODO(koan) @koan-error
type _D12 = Expect<Equal<["x", 1] extends DTrailing ? true : false, TODO>>; // TODO(koan) @koan-error
type _D13 = Expect<Equal<["x", 1, 2, 3] extends DTrailing ? true : false, TODO>>; // TODO(koan) @koan-error
type _D14 = Expect<Equal<[] extends DTrailing ? true : false, TODO>>; // TODO(koan) @koan-error
type _D15 = Expect<Equal<[1] extends DTrailing ? true : false, TODO>>; // TODO(koan) @koan-error
type _D16 = Expect<Equal<["x", "y"] extends DTrailing ? true : false, TODO>>; // TODO(koan) @koan-error
type _D17 = Expect<Equal<["x", never] extends DTrailing ? true : false, TODO>>; // TODO(koan) @koan-error
type _D18 = Expect<Equal<["x", 1] extends readonly [string, ...number[]] ? true : false, TODO>>; // TODO(koan) @koan-error
type _D19 = Expect<Equal<readonly ["x", 1] extends [string, ...number[]] ? true : false, TODO>>; // TODO(koan) @koan-error
type _D20 = Expect<Equal<readonly ["x", 1] extends readonly [string, ...number[]] ? true : false, TODO>>; // TODO(koan) @koan-error

// Leading and middle rests use their fixed suffix to close the shape.
type _D21 = Expect<Equal<DLeading[number], TODO>>; // TODO(koan) @koan-error
type _D22 = Expect<Equal<DLeading["length"], TODO>>; // TODO(koan) @koan-error
type _D23 = Expect<Equal<[1] extends DLeading ? true : false, TODO>>; // TODO(koan) @koan-error
type _D24 = Expect<Equal<["a", "b", 2] extends DLeading ? true : false, TODO>>; // TODO(koan) @koan-error
type _D25 = Expect<Equal<[] extends DLeading ? true : false, TODO>>; // TODO(koan) @koan-error
type _D26 = Expect<Equal<DMiddle[0], TODO>>; // TODO(koan) @koan-error
type _D27 = Expect<Equal<DMiddle[number], TODO>>; // TODO(koan) @koan-error
type _D28 = Expect<Equal<DMiddle["length"], TODO>>; // TODO(koan) @koan-error
type _D29 = Expect<Equal<["x", 1] extends DMiddle ? true : false, TODO>>; // TODO(koan) @koan-error
type _D30 = Expect<Equal<["x", true, false, 1] extends DMiddle ? true : false, TODO>>; // TODO(koan) @koan-error
type _D31 = Expect<Equal<["x", false] extends DMiddle ? true : false, TODO>>; // TODO(koan) @koan-error
type _D32 = Expect<Equal<["x", 1, true] extends DMiddle ? true : false, TODO>>; // TODO(koan) @koan-error
type _D33 = Expect<Equal<["x", true, 1, 2] extends DMiddle ? true : false, TODO>>; // TODO(koan) @koan-error
type _D34 = Expect<Equal<readonly ["x", true, 1] extends readonly [string, ...boolean[], number] ? true : false, TODO>>; // TODO(koan) @koan-error
type _D35 = Expect<Equal<[...string[], number][number], TODO>>; // TODO(koan) @koan-error

// Optional fixed prefixes do not make the numeric rest shift left by type.
type _D36 = Expect<Equal<DOptional[0], TODO>>; // TODO(koan) @koan-error
type _D37 = Expect<Equal<DOptional[1], TODO>>; // TODO(koan) @koan-error
type _D38 = Expect<Equal<DOptional[number], TODO>>; // TODO(koan) @koan-error
type _D39 = Expect<Equal<DOptional["length"], TODO>>; // TODO(koan) @koan-error
type _D40 = Expect<Equal<[] extends DOptional ? true : false, TODO>>; // TODO(koan) @koan-error
type _D41 = Expect<Equal<["x"] extends DOptional ? true : false, TODO>>; // TODO(koan) @koan-error
type _D42 = Expect<Equal<["x", 1, 2] extends DOptional ? true : false, TODO>>; // TODO(koan) @koan-error
type _D43 = Expect<Equal<[1] extends DOptional ? true : false, TODO>>; // TODO(koan) @koan-error
type _D44 = Expect<Equal<[undefined, 1] extends DOptional ? true : false, TODO>>; // TODO(koan) @koan-error
type _D45 = Expect<Equal<[undefined, 1] extends [head?: string | undefined, ...tail: number[]] ? true : false, TODO>>; // TODO(koan) @koan-error

// Function rest parameters expose the same tuple shapes through Parameters.
type DF0 = Parameters<(...values: number[]) => void>;
type DF1 = Parameters<(label: string, ...values: number[]) => void>;
type DF2 = Parameters<(...args: [path: string, force?: boolean]) => void>;
type _D46 = Expect<Equal<DF0, TODO>>; // TODO(koan) @koan-error
type _D47 = Expect<Equal<DF0[number], TODO>>; // TODO(koan) @koan-error
type _D48 = Expect<Equal<DF0["length"], TODO>>; // TODO(koan) @koan-error
type _D49 = Expect<Equal<DF1, TODO>>; // TODO(koan) @koan-error
type _D50 = Expect<Equal<DF1[0], TODO>>; // TODO(koan) @koan-error
type _D51 = Expect<Equal<DF1[1], TODO>>; // TODO(koan) @koan-error
type _D52 = Expect<Equal<DF1[number], TODO>>; // TODO(koan) @koan-error
type _D53 = Expect<Equal<DF1["length"], TODO>>; // TODO(koan) @koan-error
type _D54 = Expect<Equal<DF2, TODO>>; // TODO(koan) @koan-error
type _D55 = Expect<Equal<DF2[0], TODO>>; // TODO(koan) @koan-error
type _D56 = Expect<Equal<DF2[1], TODO>>; // TODO(koan) @koan-error
type _D57 = Expect<Equal<DF2["length"], TODO>>; // TODO(koan) @koan-error
type _D58 = Expect<Equal<Parameters<(...args: readonly [1, 2]) => void>, TODO>>; // TODO(koan) @koan-error
type _D59 = Expect<Equal<Parameters<(...args: [1, ...2[]]) => void>[number], TODO>>; // TODO(koan) @koan-error
type _D60 = Expect<Equal<Parameters<(...args: [1, ...2[]]) => void>["length"], TODO>>; // TODO(koan) @koan-error
