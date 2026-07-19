import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-099 edge cases: tuple zip
 * =============================================================================
 * Optional positions, union length domains, special element types, and broad
 * fallbacks expose the difference between guaranteed finite pairing and merely
 * possible runtime elements.
 */

type EZF<A extends readonly unknown[], B extends readonly unknown[]> = A extends readonly [infer AH, ...infer AT] ? B extends readonly [infer BH, ...infer BT] ? [[AH, BH], ...EZF<AT, BT>] : [] : [];
type EZ<A extends readonly unknown[], B extends readonly unknown[]> = number extends A["length"] | B["length"] ? [A[number], B[number]][] : EZF<A, B>;
type EZE<A extends readonly unknown[], B extends readonly unknown[]> = [A["length"]] extends [B["length"]] ? [B["length"]] extends [A["length"]] ? EZ<A, B> : never : never;
type EIsAny<T> = 0 extends (1 & T) ? true : false;

// Optional-only tuples do not guarantee heads for the finite recursion.
type _E01 = Expect<Equal<EZ<[a?: 1], [b?: "x"]>, TODO>>; // TODO(koan) @koan-error
type _E02 = Expect<Equal<EZ<[a: 1, b?: 2], [x: "a", y?: "b"]>, TODO>>; // TODO(koan) @koan-error
type _E03 = Expect<Equal<EZ<[a: 1, b?: 2], [x: "a", y: "b"]>, TODO>>; // TODO(koan) @koan-error
type _E04 = Expect<Equal<EZE<[a?: 1], [b?: "x"]>, TODO>>; // TODO(koan) @koan-error
type _E05 = Expect<Equal<EZE<[a: 1, b?: 2], [x: "a", y?: "b"]>, TODO>>; // TODO(koan) @koan-error

// Broad fallbacks cannot express the shorter runtime length precisely.
type _E06 = Expect<Equal<EZ<[1, 2], string[]>, TODO>>; // TODO(koan) @koan-error
type _E07 = Expect<Equal<EZ<number[], ["a"]>, TODO>>; // TODO(koan) @koan-error
type _E08 = Expect<Equal<EZ<never[], string[]>, TODO>>; // TODO(koan) @koan-error
type _E09 = Expect<Equal<EZ<unknown[], string[]>[number], TODO>>; // TODO(koan) @koan-error
type _E10 = Expect<Equal<EZ<number[], never[]>[number], TODO>>; // TODO(koan) @koan-error

// Never and any in positions affect only their corresponding pairs.
type _E11 = Expect<Equal<EZ<[never, 2], ["a", "b"]>, TODO>>; // TODO(koan) @koan-error
type _E12 = Expect<Equal<EZ<[1, 2], [never, "b"]>, TODO>>; // TODO(koan) @koan-error
type _E13 = Expect<Equal<EIsAny<EZ<[any], [1]>[0][0]>, TODO>>; // TODO(koan) @koan-error
type _E14 = Expect<Equal<EIsAny<EZ<[1], [any]>[0][1]>, TODO>>; // TODO(koan) @koan-error
type _E15 = Expect<Equal<EZ<[unknown], [1]>, TODO>>; // TODO(koan) @koan-error

// Union inputs cross-product through nested distributed conditionals.
type _E16 = Expect<Equal<EZ<[1] | [2], ["a"] | ["b"]>, TODO>>; // TODO(koan) @koan-error
type _E17 = Expect<Equal<EZ<[] | [1], ["a"]>, TODO>>; // TODO(koan) @koan-error
type _E18 = Expect<Equal<EZ<[1], [] | ["a"]>, TODO>>; // TODO(koan) @koan-error
type _E19 = Expect<Equal<EZ<never, ["a"]>, TODO>>; // TODO(koan) @koan-error
type _E20 = Expect<Equal<EZ<[1], never>, TODO>>; // TODO(koan) @koan-error

// Exact comparison operates on complete length domains, not each pairing branch.
type _E21 = Expect<Equal<EZE<[1] | [2, 3], ["a"]>, TODO>>; // TODO(koan) @koan-error
type _E22 = Expect<Equal<EZE<[1] | [2], ["a"]>, TODO>>; // TODO(koan) @koan-error
type _E23 = Expect<Equal<EZE<[a?: 1], [b?: "x"]>, TODO>>; // TODO(koan) @koan-error
type _E24 = Expect<Equal<EZE<number[], string[]>, TODO>>; // TODO(koan) @koan-error
type _E25 = Expect<Equal<EZE<[1, ...2[]], ["a", ..."b"[]]>, TODO>>; // TODO(koan) @koan-error

// Readonly inputs produce fresh mutable pair and outer tuple shapes.
type ReadonlyZip = EZ<readonly [1, 2], readonly ["a", "b"]>;
type _E26 = Expect<Equal<ReadonlyZip, TODO>>; // TODO(koan) @koan-error
type _E27 = Expect<Equal<"push" extends keyof ReadonlyZip ? true : false, TODO>>; // TODO(koan) @koan-error
type _E28 = Expect<Equal<"push" extends keyof ReadonlyZip[0] ? true : false, TODO>>; // TODO(koan) @koan-error
type _E29 = Expect<Equal<readonly [1, "a"] extends ReadonlyZip[0] ? true : false, TODO>>; // TODO(koan) @koan-error
type _E30 = Expect<Equal<ReadonlyZip["length"], TODO>>; // TODO(koan) @koan-error

// Pre-solved: unequal finite inputs stop at the shortest side.
type _DemoShortest = Expect<Equal<EZ<[1, 2], ["a"]>, [[1, "a"]]>>;

// Pre-solved: broad arrays use an array-of-pairs fallback.
type _DemoBroad = Expect<Equal<EZ<number[], string[]>, [number, string][]>>;

// Pre-solved: readonly inputs produce fresh mutable pair shapes.
type _DemoReadonly = Expect<Equal<EZ<readonly [1], readonly ["a"]>, [[1, "a"]]>>;

declare function sameLength<A extends readonly unknown[], B extends readonly unknown[]>(a: A, b: B & (EZE<A, B> extends never ? never : unknown)): void;
// @ts-expect-error Exact finite zip rejects mismatched tuple lengths.
sameLength([1, 2] as const, ["a"] as const);
