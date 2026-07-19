import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-093 guided drills: tuple spread normalization
 * =============================================================================
 * Concatenate finite positions first. If an unbounded rest appears, merge every
 * later unbounded contribution into that region and preserve only legal fixed ends.
 */

type DS<A extends readonly unknown[], B extends readonly unknown[]> = [...A, ...B];

// Finite operands concatenate without widening their elements.
type _D01 = Expect<Equal<DS<[], []>, TODO>>; // TODO(koan) @koan-error
type _D02 = Expect<Equal<DS<[], [1]>, TODO>>; // TODO(koan) @koan-error
type _D03 = Expect<Equal<DS<[1], []>, TODO>>; // TODO(koan) @koan-error
type _D04 = Expect<Equal<DS<[1], [2]>, TODO>>; // TODO(koan) @koan-error
type _D05 = Expect<Equal<DS<[1, 2], [3]>, TODO>>; // TODO(koan) @koan-error
type _D06 = Expect<Equal<DS<[1], [2, 3]>, TODO>>; // TODO(koan) @koan-error
type _D07 = Expect<Equal<DS<[1, 2], [3, 4]>, TODO>>; // TODO(koan) @koan-error
type _D08 = Expect<Equal<DS<readonly [1], readonly [2]>, TODO>>; // TODO(koan) @koan-error
type _D09 = Expect<Equal<DS<[left: string], [right: number]>, TODO>>; // TODO(koan) @koan-error
type _D10 = Expect<Equal<DS<[true, false], [null, undefined]>, TODO>>; // TODO(koan) @koan-error
type _D11 = Expect<Equal<DS<[1], [2]>[0], TODO>>; // TODO(koan) @koan-error
type _D12 = Expect<Equal<DS<[1], [2]>[1], TODO>>; // TODO(koan) @koan-error
type _D13 = Expect<Equal<DS<[1], [2]>[number], TODO>>; // TODO(koan) @koan-error
type _D14 = Expect<Equal<DS<[1], [2]>["length"], TODO>>; // TODO(koan) @koan-error
type _D15 = Expect<Equal<DS<readonly [1, 2], readonly [3]> extends readonly [1, 2, 3] ? true : false, TODO>>; // TODO(koan) @koan-error

// One open operand combines with fixed positions on either side.
type _D16 = Expect<Equal<DS<[0], 1[]>, TODO>>; // TODO(koan) @koan-error
type _D17 = Expect<Equal<DS<0[], [1]>, TODO>>; // TODO(koan) @koan-error
type _D18 = Expect<Equal<DS<[0, 1], 2[]>, TODO>>; // TODO(koan) @koan-error
type _D19 = Expect<Equal<DS<0[], [1, 2]>, TODO>>; // TODO(koan) @koan-error
type _D20 = Expect<Equal<DS<[head: string], number[]>[0], TODO>>; // TODO(koan) @koan-error
type _D21 = Expect<Equal<DS<[head: string], number[]>[1], TODO>>; // TODO(koan) @koan-error
type _D22 = Expect<Equal<DS<[head: string], number[]>[number], TODO>>; // TODO(koan) @koan-error
type _D23 = Expect<Equal<DS<[head: string], number[]>["length"], TODO>>; // TODO(koan) @koan-error
type _D24 = Expect<Equal<DS<string[], [tail: number]>[number], TODO>>; // TODO(koan) @koan-error
type _D25 = Expect<Equal<DS<string[], [tail: number]>["length"], TODO>>; // TODO(koan) @koan-error
type _D26 = Expect<Equal<DS<[0, ...1[]], [2]>, TODO>>; // TODO(koan) @koan-error
type _D27 = Expect<Equal<DS<[0], [...1[], 2]>, TODO>>; // TODO(koan) @koan-error
type _D28 = Expect<Equal<DS<[0, ...1[]], [2, 3]>, TODO>>; // TODO(koan) @koan-error
type _D29 = Expect<Equal<DS<[0, ...1[]], [2]>[number], TODO>>; // TODO(koan) @koan-error
type _D30 = Expect<Equal<DS<[0, ...1[]], [2]>["length"], TODO>>; // TODO(koan) @koan-error

// Two open operands merge their element types into one rest region.
type _D31 = Expect<Equal<DS<string[], number[]>, TODO>>; // TODO(koan) @koan-error
type _D32 = Expect<Equal<DS<1[], 2[]>, TODO>>; // TODO(koan) @koan-error
type _D33 = Expect<Equal<DS<never[], string[]>, TODO>>; // TODO(koan) @koan-error
type _D34 = Expect<Equal<DS<unknown[], string[]>, TODO>>; // TODO(koan) @koan-error
type _D35 = Expect<Equal<DS<[0, ...1[]], 2[]>, TODO>>; // TODO(koan) @koan-error
type _D36 = Expect<Equal<DS<1[], [...2[], 3]>, TODO>>; // TODO(koan) @koan-error
type _D37 = Expect<Equal<DS<[0, ...1[]], [...2[], 3]>, TODO>>; // TODO(koan) @koan-error
type _D38 = Expect<Equal<DS<[0, ...1[]], [...2[], 3]>[number], TODO>>; // TODO(koan) @koan-error
type _D39 = Expect<Equal<DS<[0, ...1[]], [...2[], 3]>["length"], TODO>>; // TODO(koan) @koan-error
type _D40 = Expect<Equal<DS<readonly string[], readonly number[]>, TODO>>; // TODO(koan) @koan-error

// Optional positions remain optional only while no required position follows.
type _D41 = Expect<Equal<DS<[a?: 1], []>, TODO>>; // TODO(koan) @koan-error
type _D42 = Expect<Equal<DS<[], [a?: 1]>, TODO>>; // TODO(koan) @koan-error
type _D43 = Expect<Equal<DS<[a: 1], [b?: 2]>, TODO>>; // TODO(koan) @koan-error
type _D44 = Expect<Equal<DS<[a?: 1], [b: 2]>, TODO>>; // TODO(koan) @koan-error
type _D45 = Expect<Equal<DS<[a?: 1, b?: 2], [c: 3]>, TODO>>; // TODO(koan) @koan-error
type _D46 = Expect<Equal<DS<[a: 1, b?: 2], [c: 3]>, TODO>>; // TODO(koan) @koan-error
type _D47 = Expect<Equal<DS<[a?: 1], [b?: 2]>, TODO>>; // TODO(koan) @koan-error
type _D48 = Expect<Equal<DS<[a?: 1], [b: 2]>[0], TODO>>; // TODO(koan) @koan-error
type _D49 = Expect<Equal<DS<[a?: 1], [b: 2]>[1], TODO>>; // TODO(koan) @koan-error
type _D50 = Expect<Equal<DS<[a?: 1], [b: 2]>["length"], TODO>>; // TODO(koan) @koan-error

// Unions and special operands expose the generic spread's conditional behavior.
type _D51 = Expect<Equal<DS<[1] | [2], [3]>, TODO>>; // TODO(koan) @koan-error
type _D52 = Expect<Equal<DS<[1], [2] | [3]>, TODO>>; // TODO(koan) @koan-error
type _D53 = Expect<Equal<DS<[1] | [2], [3] | [4]>, TODO>>; // TODO(koan) @koan-error
type _D54 = Expect<Equal<DS<never, [1]>, TODO>>; // TODO(koan) @koan-error
type _D55 = Expect<Equal<DS<[1], never>, TODO>>; // TODO(koan) @koan-error
type _D56 = Expect<Equal<DS<never[], [1]>, TODO>>; // TODO(koan) @koan-error
type _D57 = Expect<Equal<DS<[1], never[]>, TODO>>; // TODO(koan) @koan-error
type _D58 = Expect<Equal<DS<any[], [1]>[number] extends any ? true : false, TODO>>; // TODO(koan) @koan-error
type _D59 = Expect<Equal<DS<[1], unknown[]>[number], TODO>>; // TODO(koan) @koan-error
type _D60 = Expect<Equal<DS<readonly [], readonly []>, TODO>>; // TODO(koan) @koan-error
