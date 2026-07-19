import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-071 guided drills: recursive conditional types
 * =============================================================================
 * Name the base case, identify the one layer consumed by the recursive branch,
 * and determine whether the branch returns a leaf union or rebuilds a tuple.
 */

type DAwait<T> = T extends PromiseLike<infer V> ? DAwait<V> : T;
type DLeaf<T> = T extends readonly (infer E)[] ? DLeaf<E> : T;
type DFlatten<T extends readonly unknown[]> = T extends readonly [infer H, ...infer R]
  ? H extends readonly unknown[]
    ? [...DFlatten<H>, ...DFlatten<R>]
    : [H, ...DFlatten<R>]
  : [];
type DChars<S extends string> = S extends `${infer H}${infer R}` ? [H, ...DChars<R>] : [];

// Promise-like recursion stops at each non-promise leaf.
type _D01 = Expect<Equal<DAwait<string>, TODO>>; // TODO(koan) @koan-error
type _D02 = Expect<Equal<DAwait<Promise<string>>, TODO>>; // TODO(koan) @koan-error
type _D03 = Expect<Equal<DAwait<Promise<Promise<string>>>, TODO>>; // TODO(koan) @koan-error
type _D04 = Expect<Equal<DAwait<Promise<Promise<Promise<1>>>>, TODO>>; // TODO(koan) @koan-error
type _D05 = Expect<Equal<DAwait<Promise<void>>, TODO>>; // TODO(koan) @koan-error
type _D06 = Expect<Equal<DAwait<Promise<undefined>>, TODO>>; // TODO(koan) @koan-error
type _D07 = Expect<Equal<DAwait<Promise<never>>, TODO>>; // TODO(koan) @koan-error
type _D08 = Expect<Equal<DAwait<Promise<string> | number>, TODO>>; // TODO(koan) @koan-error
type _D09 = Expect<Equal<DAwait<Promise<string | number>>, TODO>>; // TODO(koan) @koan-error
type _D10 = Expect<Equal<DAwait<Promise<1 | Promise<2>>>, TODO>>; // TODO(koan) @koan-error
type _D11 = Expect<Equal<DAwait<{ then(onfulfilled: (value: "x") => unknown): unknown }>, TODO>>; // TODO(koan) @koan-error
type _D12 = Expect<Equal<DAwait<number>, TODO>>; // TODO(koan) @koan-error
type _D13 = Expect<Equal<DAwait<unknown>, TODO>>; // TODO(koan) @koan-error
type _D14 = Expect<Equal<DAwait<never>, TODO>>; // TODO(koan) @koan-error
type _D15 = Expect<Equal<Awaited<Promise<Promise<"x">>>, TODO>>; // TODO(koan) @koan-error

// Deep element recursion unions the leaves encountered through array layers.
type _D16 = Expect<Equal<DLeaf<string>, TODO>>; // TODO(koan) @koan-error
type _D17 = Expect<Equal<DLeaf<string[]>, TODO>>; // TODO(koan) @koan-error
type _D18 = Expect<Equal<DLeaf<string[][]>, TODO>>; // TODO(koan) @koan-error
type _D19 = Expect<Equal<DLeaf<readonly number[][][]>, TODO>>; // TODO(koan) @koan-error
type _D20 = Expect<Equal<DLeaf<[1, 2, 3]>, TODO>>; // TODO(koan) @koan-error
type _D21 = Expect<Equal<DLeaf<readonly [1, [2], [[3]]]>, TODO>>; // TODO(koan) @koan-error
type _D22 = Expect<Equal<DLeaf<Array<string[] | number[]>>, TODO>>; // TODO(koan) @koan-error
type _D23 = Expect<Equal<DLeaf<string[][] | boolean[][]>, TODO>>; // TODO(koan) @koan-error
type _D24 = Expect<Equal<DLeaf<readonly []>, TODO>>; // TODO(koan) @koan-error
type _D25 = Expect<Equal<DLeaf<never[]>, TODO>>; // TODO(koan) @koan-error
type _D26 = Expect<Equal<DLeaf<unknown[]>, TODO>>; // TODO(koan) @koan-error
type _D27 = Expect<Equal<DLeaf<unknown>, TODO>>; // TODO(koan) @koan-error
type _D28 = Expect<Equal<DLeaf<never>, TODO>>; // TODO(koan) @koan-error
type _D29 = Expect<Equal<DLeaf<Promise<string>[]>, TODO>>; // TODO(koan) @koan-error
type _D30 = Expect<Equal<DAwait<DLeaf<Promise<string>[][]>>, TODO>>; // TODO(koan) @koan-error

// Tuple flattening rebuilds precise order while removing nested tuple layers.
type _D31 = Expect<Equal<DFlatten<[]>, TODO>>; // TODO(koan) @koan-error
type _D32 = Expect<Equal<DFlatten<[1]>, TODO>>; // TODO(koan) @koan-error
type _D33 = Expect<Equal<DFlatten<[1, 2]>, TODO>>; // TODO(koan) @koan-error
type _D34 = Expect<Equal<DFlatten<[[1], 2]>, TODO>>; // TODO(koan) @koan-error
type _D35 = Expect<Equal<DFlatten<[1, [2, 3], 4]>, TODO>>; // TODO(koan) @koan-error
type _D36 = Expect<Equal<DFlatten<[[[1]] ]>, TODO>>; // TODO(koan) @koan-error
type _D37 = Expect<Equal<DFlatten<readonly [readonly ["a", "b"], true]>, TODO>>; // TODO(koan) @koan-error
type _D38 = Expect<Equal<DFlatten<[[], 1, []]>, TODO>>; // TODO(koan) @koan-error
type _D39 = Expect<Equal<DFlatten<[[1] | [2], 3]>, TODO>>; // TODO(koan) @koan-error
type _D40 = Expect<Equal<DFlatten<[[1, [2]], [[3, 4]]]>, TODO>>; // TODO(koan) @koan-error
type _D41 = Expect<Equal<DFlatten<[Promise<1>, [Promise<2>]]>, TODO>>; // TODO(koan) @koan-error
type _D42 = Expect<Equal<DFlatten<[[never], 1]>, TODO>>; // TODO(koan) @koan-error
type _D43 = Expect<Equal<DFlatten<[[unknown], 1]>, TODO>>; // TODO(koan) @koan-error
type _D44 = Expect<Equal<DFlatten<[readonly [1], readonly [2, 3]]>, TODO>>; // TODO(koan) @koan-error
type _D45 = Expect<Equal<DFlatten<[[[[]]]]>, TODO>>; // TODO(koan) @koan-error

// String recursion emits one code-unit-like template segment per step.
type _D46 = Expect<Equal<DChars<"">, TODO>>; // TODO(koan) @koan-error
type _D47 = Expect<Equal<DChars<"a">, TODO>>; // TODO(koan) @koan-error
type _D48 = Expect<Equal<DChars<"ab">, TODO>>; // TODO(koan) @koan-error
type _D49 = Expect<Equal<DChars<"Type">, TODO>>; // TODO(koan) @koan-error
type _D50 = Expect<Equal<DChars<"a-b">, TODO>>; // TODO(koan) @koan-error
type _D51 = Expect<Equal<DChars<"123">, TODO>>; // TODO(koan) @koan-error
type _D52 = Expect<Equal<DChars<" ">, TODO>>; // TODO(koan) @koan-error
type _D53 = Expect<Equal<DChars<"a b">, TODO>>; // TODO(koan) @koan-error
type _D54 = Expect<Equal<DChars<"true">, TODO>>; // TODO(koan) @koan-error
type _D55 = Expect<Equal<DChars<"x/y">, TODO>>; // TODO(koan) @koan-error
type _D56 = Expect<Equal<DChars<"aa">, TODO>>; // TODO(koan) @koan-error
type _D57 = Expect<Equal<DChars<"A">[0], TODO>>; // TODO(koan) @koan-error
type _D58 = Expect<Equal<DChars<"ABC">[number], TODO>>; // TODO(koan) @koan-error
type _D59 = Expect<Equal<DChars<"ABC">["length"], TODO>>; // TODO(koan) @koan-error
type _D60 = Expect<Equal<DChars<string>, TODO>>; // TODO(koan) @koan-error
