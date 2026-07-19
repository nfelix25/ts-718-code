import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type { KoanAwaited } from "./k-127-rebuild-awaited.js";

/** GUIDED DRILLS: vary wrapper depth, union placement, thenable shape, and special types. */

type A<T> = KoanAwaited<T>;
type IsAny<T> = 0 extends 1 & T ? true : false;
type Thenable<T> = { then(onfulfilled: (value: T) => unknown): unknown };

// Plain and nullish values (1-12)
type _01 = Expect<Equal<A<string>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<A<number>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<A<boolean>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<A<symbol>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<A<null>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<A<undefined>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<A<null | undefined>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<A<{ id: string }>, TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<A<readonly [1, 2]>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<A<() => Promise<number>>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<A<Date>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<A<RegExp>, TODO>>; // TODO(koan) @koan-error

// Promise recursion depth (13-24)
type _13 = Expect<Equal<A<Promise<string>>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<A<Promise<number>>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<A<Promise<null>>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<A<Promise<undefined>>, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<A<Promise<Promise<1>>>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<A<Promise<Promise<Promise<1>>>>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<A<Promise<readonly [1, 2]>>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<A<Promise<{ id: string }>>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<A<Promise<never>>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<A<Promise<unknown>>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<IsAny<A<Promise<any>>>, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<A<Promise<void>>, TODO>>; // TODO(koan) @koan-error

// Structural thenables (25-36)
type _25 = Expect<Equal<A<Thenable<string>>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<A<Thenable<Promise<number>>>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<A<Promise<Thenable<boolean>>>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<A<Thenable<Thenable<1>>>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<A<{ then(onfulfilled: (value: 1, extra: 2) => void): void }>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<A<{ then(onfulfilled: () => void): void }>, TODO>>; // TODO(koan) @koan-error
type _31 = Expect<Equal<A<{ then(onfulfilled: string): void }>, TODO>>; // TODO(koan) @koan-error
type _32 = Expect<Equal<A<{ then: string }>, TODO>>; // TODO(koan) @koan-error
type _33 = Expect<Equal<A<{ then?: (onfulfilled: (value: 1) => void) => void }>, TODO>>; // TODO(koan) @koan-error
type _34 = Expect<Equal<A<{ readonly then: (onfulfilled: (value: 1) => void) => void }>, TODO>>; // TODO(koan) @koan-error
type _35 = Expect<Equal<A<PromiseLike<string>>, TODO>>; // TODO(koan) @koan-error
type _36 = Expect<Equal<A<PromiseLike<PromiseLike<number>>>, TODO>>; // TODO(koan) @koan-error

// Union distribution (37-48)
type _37 = Expect<Equal<A<Promise<string> | number>, TODO>>; // TODO(koan) @koan-error
type _38 = Expect<Equal<A<Promise<1> | Promise<2>>, TODO>>; // TODO(koan) @koan-error
type _39 = Expect<Equal<A<Promise<1 | 2>>, TODO>>; // TODO(koan) @koan-error
type _40 = Expect<Equal<A<null | Promise<string>>, TODO>>; // TODO(koan) @koan-error
type _41 = Expect<Equal<A<undefined | Thenable<number>>, TODO>>; // TODO(koan) @koan-error
type _42 = Expect<Equal<A<Thenable<1> | { value: 2 }>, TODO>>; // TODO(koan) @koan-error
type _43 = Expect<Equal<A<Promise<Thenable<1> | 2>>, TODO>>; // TODO(koan) @koan-error
type _44 = Expect<Equal<A<Promise<1 | null | undefined>>, TODO>>; // TODO(koan) @koan-error
type _45 = Expect<Equal<A<Promise<never> | 1>, TODO>>; // TODO(koan) @koan-error
type _46 = Expect<Equal<A<Promise<unknown> | 1>, TODO>>; // TODO(koan) @koan-error
type _47 = Expect<Equal<IsAny<A<Promise<any> | 1>>, TODO>>; // TODO(koan) @koan-error
type _48 = Expect<Equal<A<never | Promise<1>>, TODO>>; // TODO(koan) @koan-error

// Top/bottom types and utility composition (49-60)
type _49 = Expect<Equal<A<unknown>, TODO>>; // TODO(koan) @koan-error
type _50 = Expect<Equal<A<never>, TODO>>; // TODO(koan) @koan-error
type _51 = Expect<Equal<IsAny<A<any>>, TODO>>; // TODO(koan) @koan-error
type _52 = Expect<Equal<A<void>, TODO>>; // TODO(koan) @koan-error
type _53 = Expect<Equal<NonNullable<A<Promise<string | null>>>, TODO>>; // TODO(koan) @koan-error
type _54 = Expect<Equal<Extract<A<Promise<string | number>>, string>, TODO>>; // TODO(koan) @koan-error
type _55 = Expect<Equal<Exclude<A<Promise<string | number>>, string>, TODO>>; // TODO(koan) @koan-error
type _56 = Expect<Equal<Readonly<A<Promise<{ value: number }>>>, TODO>>; // TODO(koan) @koan-error
type _57 = Expect<Equal<Partial<A<Promise<{ a: 1; b: 2 }>>>, TODO>>; // TODO(koan) @koan-error
type _58 = Expect<Equal<ReturnType<() => A<Promise<1>>>, TODO>>; // TODO(koan) @koan-error
type _59 = Expect<Equal<A<ReturnType<() => Promise<"done">>>, TODO>>; // TODO(koan) @koan-error
type _60 = Expect<Equal<A<Promise<A<Promise<1>>>>, TODO>>; // TODO(koan) @koan-error
