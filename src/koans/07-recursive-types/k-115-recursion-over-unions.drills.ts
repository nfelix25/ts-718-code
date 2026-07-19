import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type { DeepBox, DeepLeaves, WholeDeepLeaves } from "./k-115-recursion-over-unions.js";

/** GUIDED DRILLS: follow distribution from roots into properties, arrays, and tuples. */

type D<T> = DeepLeaves<T>;
type W<T> = WholeDeepLeaves<T>;
type B<T> = DeepBox<T>;
type IsAny<T> = 0 extends 1 & T ? true : false;

// Primitive and root unions (1-12)
type _01 = Expect<Equal<D<1>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<D<1 | 2>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<D<string | number>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<D<null | undefined>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<D<boolean>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<D<symbol | bigint>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<D<Date | RegExp>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<D<(() => 1) | string>, TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<D<unknown>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<D<never>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<IsAny<D<any>>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<D<string | unknown>, TODO>>; // TODO(koan) @koan-error

// Arrays and tuples discover new unions (13-24)
type _13 = Expect<Equal<D<string[]>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<D<Array<string | number>>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<D<ReadonlyArray<{ id: number } | null>>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<D<[]>, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<D<[1]>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<D<[1, "x", true]>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<D<readonly [1 | 2, { x: "a" | "b" }]>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<D<[{ a: 1 } | { b: 2 }]>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<D<Array<Array<1 | 2>>>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<D<[head: 1, ...tail: Array<2 | 3>]>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<D<[value?: { id: 1 }]>, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<D<readonly never[]>, TODO>>; // TODO(koan) @koan-error

// Objects and object unions (25-36)
type _25 = Expect<Equal<D<{}>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<D<{ a: 1 }>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<D<{ a: 1; b: 2 }>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<D<{ a: { b: 1 } }>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<D<{ a: 1 | { b: 2 } }>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<D<{ a?: { b: 1 } }>, TODO>>; // TODO(koan) @koan-error
type _31 = Expect<Equal<D<{ a: 1 } | { b: 2 }>, TODO>>; // TODO(koan) @koan-error
type _32 = Expect<Equal<D<{ a: { x: 1 } } | { a: { y: 2 } }>, TODO>>; // TODO(koan) @koan-error
type _33 = Expect<Equal<D<{ kind: "a"; value: 1 } | { kind: "b"; value: 2 }>, TODO>>; // TODO(koan) @koan-error
type _34 = Expect<Equal<D<Record<"a" | "b", 1 | 2>>, TODO>>; // TODO(koan) @koan-error
type _35 = Expect<Equal<D<Record<string, { id: number }>>, TODO>>; // TODO(koan) @koan-error
type _36 = Expect<Equal<D<{ readonly a: { readonly b: 1 } }>, TODO>>; // TODO(koan) @koan-error

// Whole-union checks (37-48)
type _37 = Expect<Equal<W<1 | 2>, TODO>>; // TODO(koan) @koan-error
type _38 = Expect<Equal<W<string | number>, TODO>>; // TODO(koan) @koan-error
type _39 = Expect<Equal<W<string | { id: number }>, TODO>>; // TODO(koan) @koan-error
type _40 = Expect<Equal<W<{ a: 1 } | { b: 2 }>, TODO>>; // TODO(koan) @koan-error
type _41 = Expect<Equal<W<{ common: 0; a: 1 } | { common: 0; b: 2 }>, TODO>>; // TODO(koan) @koan-error
type _42 = Expect<Equal<W<Array<1> | Array<2>>, TODO>>; // TODO(koan) @koan-error
type _43 = Expect<Equal<W<Array<1> | { value: 2 }>, TODO>>; // TODO(koan) @koan-error
type _44 = Expect<Equal<W<{ value: 1 | 2 }>, TODO>>; // TODO(koan) @koan-error
type _45 = Expect<Equal<W<unknown>, TODO>>; // TODO(koan) @koan-error
type _46 = Expect<Equal<W<never>, TODO>>; // TODO(koan) @koan-error
type _47 = Expect<Equal<IsAny<W<any>>, TODO>>; // TODO(koan) @koan-error
type _48 = Expect<Equal<W<{} | null>, TODO>>; // TODO(koan) @koan-error

// Shape-preserving distributed boxing (49-60)
type _49 = Expect<Equal<B<1>, TODO>>; // TODO(koan) @koan-error
type _50 = Expect<Equal<B<1 | 2>, TODO>>; // TODO(koan) @koan-error
type _51 = Expect<Equal<B<{ a: 1 | 2 }>, TODO>>; // TODO(koan) @koan-error
type _52 = Expect<Equal<B<{ a: 1 } | { b: 2 }>, TODO>>; // TODO(koan) @koan-error
type _53 = Expect<Equal<B<[1, 2 | 3]>, TODO>>; // TODO(koan) @koan-error
type _54 = Expect<Equal<B<readonly [1 | 2]>, TODO>>; // TODO(koan) @koan-error
type _55 = Expect<Equal<B<Array<1 | 2>>, TODO>>; // TODO(koan) @koan-error
type _56 = Expect<Equal<B<{ nested: Array<{ x: 1 } | { y: 2 }> }>, TODO>>; // TODO(koan) @koan-error
type _57 = Expect<Equal<B<{ value?: 1 | 2 }>, TODO>>; // TODO(koan) @koan-error
type _58 = Expect<Equal<B<unknown>, TODO>>; // TODO(koan) @koan-error
type _59 = Expect<Equal<B<never>, TODO>>; // TODO(koan) @koan-error
type _60 = Expect<Equal<IsAny<B<any>>, TODO>>; // TODO(koan) @koan-error
