import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-099 guided drills: tuple zip
 * =============================================================================
 * Pair one head from each side, recurse on both tails, and stop at the first
 * empty side. Classify open arrays before attempting finite decomposition.
 */

type DZF<A extends readonly unknown[], B extends readonly unknown[]> = A extends readonly [infer AH, ...infer AT] ? B extends readonly [infer BH, ...infer BT] ? [[AH, BH], ...DZF<AT, BT>] : [] : [];
type DZ<A extends readonly unknown[], B extends readonly unknown[]> = number extends A["length"] | B["length"] ? [A[number], B[number]][] : DZF<A, B>;
type DZE<A extends readonly unknown[], B extends readonly unknown[]> = [A["length"]] extends [B["length"]] ? [B["length"]] extends [A["length"]] ? DZ<A, B> : never : never;

// Equal finite lengths pair every position exactly.
type _D01 = Expect<Equal<DZ<[], []>, TODO>>; // TODO(koan) @koan-error
type _D02 = Expect<Equal<DZ<[1], ["a"]>, TODO>>; // TODO(koan) @koan-error
type _D03 = Expect<Equal<DZ<[1, 2], ["a", "b"]>, TODO>>; // TODO(koan) @koan-error
type _D04 = Expect<Equal<DZ<[1, 2, 3], ["a", "b", "c"]>, TODO>>; // TODO(koan) @koan-error
type _D05 = Expect<Equal<DZ<readonly [1], readonly ["a"]>, TODO>>; // TODO(koan) @koan-error
type _D06 = Expect<Equal<DZ<readonly [1, 2], readonly ["a", "b"]>, TODO>>; // TODO(koan) @koan-error
type _D07 = Expect<Equal<DZ<[left: 1, right: 2], [first: "a", second: "b"]>, TODO>>; // TODO(koan) @koan-error
type _D08 = Expect<Equal<DZ<[never], [1]>, TODO>>; // TODO(koan) @koan-error
type _D09 = Expect<Equal<DZ<[unknown], [1]>, TODO>>; // TODO(koan) @koan-error
type _D10 = Expect<Equal<DZ<[1 | 2], ["a" | "b"]>, TODO>>; // TODO(koan) @koan-error
type _D11 = Expect<Equal<DZ<[1, 2], ["a", "b"]>[0], TODO>>; // TODO(koan) @koan-error
type _D12 = Expect<Equal<DZ<[1, 2], ["a", "b"]>[1], TODO>>; // TODO(koan) @koan-error
type _D13 = Expect<Equal<DZ<[1, 2], ["a", "b"]>[number], TODO>>; // TODO(koan) @koan-error
type _D14 = Expect<Equal<DZ<[1, 2], ["a", "b"]>["length"], TODO>>; // TODO(koan) @koan-error
type _D15 = Expect<Equal<DZ<readonly [], readonly [1]>, TODO>>; // TODO(koan) @koan-error

// Unequal finite inputs stop at the shortest side.
type _D16 = Expect<Equal<DZ<[1], ["a", "b"]>, TODO>>; // TODO(koan) @koan-error
type _D17 = Expect<Equal<DZ<[1, 2], ["a"]>, TODO>>; // TODO(koan) @koan-error
type _D18 = Expect<Equal<DZ<[], ["a", "b"]>, TODO>>; // TODO(koan) @koan-error
type _D19 = Expect<Equal<DZ<[1, 2], []>, TODO>>; // TODO(koan) @koan-error
type _D20 = Expect<Equal<DZ<[1, 2], ["a", "b", "c"]>, TODO>>; // TODO(koan) @koan-error
type _D21 = Expect<Equal<DZ<[1, 2, 3], ["a", "b"]>, TODO>>; // TODO(koan) @koan-error
type _D22 = Expect<Equal<DZ<[1], ["a", "b"]>["length"], TODO>>; // TODO(koan) @koan-error
type _D23 = Expect<Equal<DZ<[1, 2], ["a"]>[number], TODO>>; // TODO(koan) @koan-error
type _D24 = Expect<Equal<DZ<readonly [1], readonly ["a", "b"]>, TODO>>; // TODO(koan) @koan-error
type _D25 = Expect<Equal<DZ<[never, 2], ["a"]>, TODO>>; // TODO(koan) @koan-error

// Open input on either side switches to an array-of-pairs fallback.
type _D26 = Expect<Equal<DZ<number[], string[]>, TODO>>; // TODO(koan) @koan-error
type _D27 = Expect<Equal<DZ<readonly number[], readonly string[]>, TODO>>; // TODO(koan) @koan-error
type _D28 = Expect<Equal<DZ<[1, 2], string[]>, TODO>>; // TODO(koan) @koan-error
type _D29 = Expect<Equal<DZ<number[], ["a", "b"]>, TODO>>; // TODO(koan) @koan-error
type _D30 = Expect<Equal<DZ<[head: 1, ...tail: 2[]], string[]>, TODO>>; // TODO(koan) @koan-error
type _D31 = Expect<Equal<DZ<[head: 1, ...tail: 2[]], ["a", "b"]>, TODO>>; // TODO(koan) @koan-error
type _D32 = Expect<Equal<DZ<[1, 2], [head: "a", ...tail: "b"[]]>, TODO>>; // TODO(koan) @koan-error
type _D33 = Expect<Equal<DZ<never[], string[]>, TODO>>; // TODO(koan) @koan-error
type _D34 = Expect<Equal<DZ<unknown[], string[]>, TODO>>; // TODO(koan) @koan-error
type _D35 = Expect<Equal<DZ<number[], never[]>, TODO>>; // TODO(koan) @koan-error

// Exact zip compares complete length domains before pairing.
type _D36 = Expect<Equal<DZE<[], []>, TODO>>; // TODO(koan) @koan-error
type _D37 = Expect<Equal<DZE<[1], ["a"]>, TODO>>; // TODO(koan) @koan-error
type _D38 = Expect<Equal<DZE<[1, 2], ["a", "b"]>, TODO>>; // TODO(koan) @koan-error
type _D39 = Expect<Equal<DZE<[1], ["a", "b"]>, TODO>>; // TODO(koan) @koan-error
type _D40 = Expect<Equal<DZE<[1, 2], ["a"]>, TODO>>; // TODO(koan) @koan-error
type _D41 = Expect<Equal<DZE<number[], string[]>, TODO>>; // TODO(koan) @koan-error
type _D42 = Expect<Equal<DZE<[1, ...2[]], ["a", ..."b"[]]>, TODO>>; // TODO(koan) @koan-error
type _D43 = Expect<Equal<DZE<[a?: 1], [b?: "x"]>, TODO>>; // TODO(koan) @koan-error
type _D44 = Expect<Equal<DZE<[a: 1, b?: 2], [x: "a", y?: "b"]>, TODO>>; // TODO(koan) @koan-error
type _D45 = Expect<Equal<DZE<[a?: 1], [x: "a"]>, TODO>>; // TODO(koan) @koan-error

// Union operands distribute into the possible zipped shapes.
type _D46 = Expect<Equal<DZ<[1] | [2], ["a"]>, TODO>>; // TODO(koan) @koan-error
type _D47 = Expect<Equal<DZ<[1], ["a"] | ["b"]>, TODO>>; // TODO(koan) @koan-error
type _D48 = Expect<Equal<DZ<[1] | [2], ["a"] | ["b"]>, TODO>>; // TODO(koan) @koan-error
type _D49 = Expect<Equal<DZ<[] | [1], ["a"]>, TODO>>; // TODO(koan) @koan-error
type _D50 = Expect<Equal<DZ<[1, 2] | [3], ["a", "b"]>, TODO>>; // TODO(koan) @koan-error
type _D51 = Expect<Equal<DZ<never, [1]>, TODO>>; // TODO(koan) @koan-error
type _D52 = Expect<Equal<DZ<[1], never>, TODO>>; // TODO(koan) @koan-error
type _D53 = Expect<Equal<DZE<[1] | [2], ["a"]>, TODO>>; // TODO(koan) @koan-error
type _D54 = Expect<Equal<DZE<[1] | [2, 3], ["a"]>, TODO>>; // TODO(koan) @koan-error
type _D55 = Expect<Equal<DZ<readonly [1] | readonly [2], readonly ["a"]>, TODO>>; // TODO(koan) @koan-error

// Pair indexing retains correlation within each position.
type Pairs = DZ<[1, 2, 3], ["a", "b", "c"]>;
type _D56 = Expect<Equal<Pairs[0][0], TODO>>; // TODO(koan) @koan-error
type _D57 = Expect<Equal<Pairs[0][1], TODO>>; // TODO(koan) @koan-error
type _D58 = Expect<Equal<Pairs[1], TODO>>; // TODO(koan) @koan-error
type _D59 = Expect<Equal<Pairs[number][0], TODO>>; // TODO(koan) @koan-error
type _D60 = Expect<Equal<Pairs[number][1], TODO>>; // TODO(koan) @koan-error
