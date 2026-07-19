import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type { KoanAwaited } from "./k-127-rebuild-awaited.js";

/** EDGE CASES: malformed thenables, callback overloads, optional then, any, and cycles. */

type A<T> = KoanAwaited<T>;
type IsAny<T> = 0 extends 1 & T ? true : false;
type Thenable<T> = { then(onfulfilled: (value: T) => unknown): unknown };

// Pre-solved demonstrations.
type _DemoPlainThenProperty = Expect<Equal<A<{ then: string }>, { then: string }>>;
type _DemoMalformedCallback = Expect<Equal<A<{ then(onfulfilled: string): void }>, never>>;
type _DemoOptionalThenIsPlain = Expect<Equal<A<{ then?: (onfulfilled: (value: 1) => void) => void }>, { then?: (onfulfilled: (value: 1) => void) => void }>>;
type _DemoNullishPreserved = Expect<Equal<A<null | undefined>, null | undefined>>;
type _DemoAnyClassified = Expect<Equal<IsAny<A<any>>, true>>;
type _DemoNever = Expect<Equal<A<never>, never>>;

// 1. Thenable recognition is exact about method shape (1-8)
type _01 = Expect<Equal<A<{ then: string }>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<A<{ then?: (resolve: (value: 1) => void) => void }>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<A<{ then(resolve: (value: 1) => void): void }>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<A<{ then(resolve: string): void }>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<A<{ then(resolve: never): void }>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<A<{ then(resolve: any): void }>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<A<{ readonly then: (resolve: (value: 1) => void) => void }>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<A<Thenable<1> & { meta: 2 }>, TODO>>; // TODO(koan) @koan-error

// 2. Fulfillment callback parameter details (9-16)
type _09 = Expect<Equal<A<{ then(resolve: () => void): void }>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<A<{ then(resolve: (value?: 1) => void): void }>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<A<{ then(resolve: (value: 1, extra: 2) => void): void }>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<A<{ then(resolve: ((value: 1) => void) | ((value: 2) => void)): void }>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<A<{ then(resolve: ((value: 1) => void) & ((value: 2) => void)): void }>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<A<{ then(resolve: (value: any) => void): void }> extends infer V ? IsAny<V> : false, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<A<{ then(resolve: (value: unknown) => void): void }>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<A<{ then(resolve: (value: never) => void): void }>, TODO>>; // TODO(koan) @koan-error

// 3. Recursive assimilation and union absorption (17-23)
type _17 = Expect<Equal<A<Thenable<Thenable<Thenable<1>>>>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<A<Thenable<Promise<Thenable<2>>>>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<A<Thenable<unknown>>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<IsAny<A<Thenable<any>>>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<A<Thenable<never>>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<A<Thenable<unknown> | 1>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<IsAny<A<Thenable<any> | 1>>, TODO>>; // TODO(koan) @koan-error

// 4. Top/bottom and finite recursion boundaries (24-30)
type _24 = Expect<Equal<A<unknown>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<A<never>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<IsAny<A<any>>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<A<Promise<never>>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<A<Promise<unknown>>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<IsAny<A<Promise<any>>>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<A<PromiseLike<PromiseLike<"done">>>, TODO>>; // TODO(koan) @koan-error
