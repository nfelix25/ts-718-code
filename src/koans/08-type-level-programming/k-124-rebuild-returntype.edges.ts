import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type { KoanReturnType } from "./k-124-rebuild-returntype.js";

/** EDGE CASES: overload order, generic erasure, call/construct separation, and special types. */

type R<F extends (...args: any[]) => any> = KoanReturnType<F>;
type IsAny<T> = 0 extends 1 & T ? true : false;

// Pre-solved demonstrations.
type _DemoGenericUnknown = Expect<Equal<R<<T>(value: T) => T>, unknown>>;
type _DemoConstrainedGeneric = Expect<Equal<R<<T extends string>(value: T) => T>, string>>;
type _DemoVoidStaysVoid = Expect<Equal<R<() => void>, void>>;
type _DemoNeverStaysNever = Expect<Equal<R<() => never>, never>>;
type _DemoAnyClassified = Expect<Equal<IsAny<R<any>>, true>>;

interface FinalOverloadWins {
  (x: string): 1;
  (x: number): 2;
  (x: string | number): 1 | 2;
}
type _DemoFinalOverload = Expect<Equal<R<FinalOverloadWins>, 1 | 2>>;

// @ts-expect-error ReturnType's constraint rejects a non-callable object.
type _InvalidObject = R<{ value: 1 }>;

// 1. Overloads and intersections use the final visible signature (1-8)
interface ReverseOverload {
  (x: number): 2;
  (x: string): 1;
}
type _01 = Expect<Equal<R<FinalOverloadWins>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<R<ReverseOverload>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<R<((x: string) => 1) & ((x: number) => 2)>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<R<((x: number) => 2) & ((x: string) => 1)>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<R<(() => 1) | (() => 2)>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<R<(() => never) | (() => 2)>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<R<{ (): 1; (x: string): 2 }>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<R<{ (x: string): 2; (): 1 }>, TODO>>; // TODO(koan) @koan-error

// 2. Generic return erasure (9-16)
type _09 = Expect<Equal<R<<T>(value: T) => T>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<R<<T>(value: T) => T[]>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<R<<T extends string>(value: T) => T>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<R<<T extends { id: string }>(value: T) => T>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<R<<T = "default">() => T>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<R<<T, U>(a: T, b: U) => [T, U]>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<R<<T extends readonly unknown[]>(value: T) => T[number]>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<R<<T extends string | number>(value: T) => `${T}`>, TODO>>; // TODO(koan) @koan-error

// 3. Call signatures are distinct from construct signatures (17-23)
type Constructor = new () => { id: string };
type Both = Constructor & (() => "called");
type _17 = Expect<Equal<R<Both>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<InstanceType<Both>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<R<{ (): 1; new (): { id: 2 } }>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<InstanceType<{ (): 1; new (): { id: 2 } }>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<R<(this: { id: string }) => number>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<ThisParameterType<(this: { id: string }) => number>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<R<(() => 1) & { readonly meta: 2 }>, TODO>>; // TODO(koan) @koan-error

// 4. Top/bottom returns and nested async wrappers (24-30)
type _24 = Expect<Equal<IsAny<R<any>>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<R<never>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<IsAny<R<() => any>>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<R<() => unknown>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<R<() => Promise<Promise<1>>>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<Awaited<R<() => Promise<Promise<1>>>>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<R<() => Promise<never>>, TODO>>; // TODO(koan) @koan-error
