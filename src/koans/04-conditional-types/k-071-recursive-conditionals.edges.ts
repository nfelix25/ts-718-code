import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-071 edge cases: recursive conditional types
 * =============================================================================
 * Recursive aliases amplify every ordinary conditional rule. These cases make
 * distribution at deeper calls, empty bases, broad containers, special types,
 * union branching, and compiler termination requirements explicit.
 */

type EIsAny<T> = 0 extends (1 & T) ? true : false;
type ESafeLeaf<T> = EIsAny<T> extends true
  ? any
  : T extends readonly (infer E)[]
    ? ESafeLeaf<E>
    : T;
type EAwait<T> = T extends PromiseLike<infer V> ? EAwait<V> : T;
type EFlatten<T extends readonly unknown[]> = T extends readonly [infer H, ...infer R]
  ? H extends readonly unknown[]
    ? [...EFlatten<H>, ...EFlatten<R>]
    : [H, ...EFlatten<R>]
  : [];
type EChars<S extends string> = S extends `${infer H}${infer R}` ? [H, ...EChars<R>] : [];

// Empty structures and impossible members have distinct base behavior.
type _E01 = Expect<Equal<ESafeLeaf<[]>, TODO>>; // TODO(koan) @koan-error
type _E02 = Expect<Equal<ESafeLeaf<never[]>, TODO>>; // TODO(koan) @koan-error
type _E03 = Expect<Equal<ESafeLeaf<[never]>, TODO>>; // TODO(koan) @koan-error
type _E04 = Expect<Equal<EFlatten<[]>, TODO>>; // TODO(koan) @koan-error
type _E05 = Expect<Equal<EFlatten<[[]]>, TODO>>; // TODO(koan) @koan-error
type _E06 = Expect<Equal<EChars<"">, TODO>>; // TODO(koan) @koan-error

// Naked recursive checks distribute again whenever a union reaches a call.
type _E07 = Expect<Equal<EAwait<Promise<1 | Promise<2>>>, TODO>>; // TODO(koan) @koan-error
type _E08 = Expect<Equal<ESafeLeaf<Array<1 | 2[]>>, TODO>>; // TODO(koan) @koan-error
type _E09 = Expect<Equal<ESafeLeaf<[1, [2]] | [[3], 4]>, TODO>>; // TODO(koan) @koan-error
type _E10 = Expect<Equal<EFlatten<[[1] | [2], 3]>, TODO>>; // TODO(koan) @koan-error
type _E11 = Expect<Equal<EFlatten<[[1, 2] | [3], 4]>, TODO>>; // TODO(koan) @koan-error

// Readonly-compatible patterns descend through either mutable or readonly layers.
type _E12 = Expect<Equal<ESafeLeaf<number[][]>, TODO>>; // TODO(koan) @koan-error
type _E13 = Expect<Equal<ESafeLeaf<readonly (readonly number[])[]>, TODO>>; // TODO(koan) @koan-error
type _E14 = Expect<Equal<EFlatten<readonly [readonly [1], readonly [2, 3]]>, TODO>>; // TODO(koan) @koan-error
type _E15 = Expect<Equal<EFlatten<[[readonly [1]] ]>, TODO>>; // TODO(koan) @koan-error

// Broad arrays and strings cannot always be decomposed like finite literals.
type _E16 = Expect<Equal<ESafeLeaf<string[]>, TODO>>; // TODO(koan) @koan-error
type _E17 = Expect<Equal<ESafeLeaf<string[][]>, TODO>>; // TODO(koan) @koan-error
type _E18 = Expect<Equal<EFlatten<string[]>, TODO>>; // TODO(koan) @koan-error
type _E19 = Expect<Equal<EChars<string>, TODO>>; // TODO(koan) @koan-error
type _E20 = Expect<Equal<EChars<`${number}`>, TODO>>; // TODO(koan) @koan-error

// Special types need deliberate guards when a branch might recurse forever.
type _E21 = Expect<Equal<EIsAny<ESafeLeaf<any>>, TODO>>; // TODO(koan) @koan-error
type _E22 = Expect<Equal<ESafeLeaf<unknown>, TODO>>; // TODO(koan) @koan-error
type _E23 = Expect<Equal<ESafeLeaf<never>, TODO>>; // TODO(koan) @koan-error
type _E24 = Expect<Equal<EAwait<unknown>, TODO>>; // TODO(koan) @koan-error
type _E25 = Expect<Equal<EAwait<never>, TODO>>; // TODO(koan) @koan-error

// Recursion can be composed, but order determines which structure is removed first.
type _E26 = Expect<Equal<EAwait<ESafeLeaf<Promise<1>[][]>>, TODO>>; // TODO(koan) @koan-error
type _E27 = Expect<Equal<ESafeLeaf<EAwait<Promise<string[][]>>>, TODO>>; // TODO(koan) @koan-error
type _E28 = Expect<Equal<EFlatten<[[Promise<1>], Promise<2>]>, TODO>>; // TODO(koan) @koan-error
type _E29 = Expect<Equal<EChars<"ab">[number], TODO>>; // TODO(koan) @koan-error
type _E30 = Expect<Equal<EFlatten<[[1], [[2]], [[[3]]]]>[number], TODO>>; // TODO(koan) @koan-error

// Pre-solved: each promise step removes one layer until a non-promise base.
type _DemoAwait = Expect<Equal<EAwait<Promise<Promise<"done">>>, "done">>;

// Pre-solved: recursive leaf extraction distributes through nested union members.
type _DemoLeaves = Expect<Equal<ESafeLeaf<[1, [2], [[3]]]>, 1 | 2 | 3>>;

// Pre-solved: tuple recursion can rebuild order while removing every tuple layer.
type _DemoFlatten = Expect<Equal<EFlatten<[1, [2, [3]], 4]>, [1, 2, 3, 4]>>;

// A circular alias with no conditional base case is rejected immediately.
// @ts-expect-error This alias refers to itself without consuming any structure.
type InvalidCircular = InvalidCircular;
