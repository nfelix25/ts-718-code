import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type { KoanParameters } from "./k-125-rebuild-parameters.js";

/** EDGE CASES: this exclusion, overload order, generic erasure, and any inference. */

type P<F extends (...args: any[]) => any> = KoanParameters<F>;
type IsAny<T> = 0 extends 1 & T ? true : false;

// Pre-solved demonstrations.
type _DemoThisExcluded = Expect<Equal<P<(this: { id: string }, value: number) => void>, [value: number]>>;
type _DemoGenericUnknown = Expect<Equal<P<<T>(value: T) => T>, [value: unknown]>>;
type _DemoConstrainedGeneric = Expect<Equal<P<<T extends string>(value: T) => T>, [value: string]>>;
type _DemoAnyFunction = Expect<Equal<P<any>, unknown[]>>;
type _DemoNeverFunction = Expect<Equal<P<never>, never>>;

interface FinalOverloadWins {
  (x: string): 1;
  (x: number): 2;
  (x: string | number): 1 | 2;
}
type _DemoFinalOverload = Expect<Equal<P<FinalOverloadWins>, [x: string | number]>>;

// @ts-expect-error Parameters rejects non-callable input types.
type _InvalidObject = P<{ value: 1 }>;

// 1. this and argument tuples are separate channels (1-8)
type _01 = Expect<Equal<P<(this: { id: string }) => void>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<P<(this: { id: string }, value: number) => void>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<ThisParameterType<(this: { id: string }, value: number) => void>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<OmitThisParameter<(this: { id: string }, value: number) => void>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<P<OmitThisParameter<(this: { id: string }, value: number) => void>>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<P<(this: void, value: number) => void>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<P<(this: unknown, value: number) => void>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<P<(this: never, value: number) => void>, TODO>>; // TODO(koan) @koan-error

// 2. Overload and intersection order (9-16)
interface ReverseOverload {
  (x: number): 2;
  (x: string): 1;
}
type _09 = Expect<Equal<P<FinalOverloadWins>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<P<ReverseOverload>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<P<((x: string) => 1) & ((x: number) => 2)>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<P<((x: number) => 2) & ((x: string) => 1)>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<P<((x: string) => 1) | ((x: number) => 2)>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<P<{ (x: string): 1; (x: number): 2 }>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<P<{ (x: number): 2; (x: string): 1 }>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<P<(...args: [x: string] | [x: number]) => void>, TODO>>; // TODO(koan) @koan-error

// 3. Generic erasure and dependent positions (17-23)
type _17 = Expect<Equal<P<<T>(value: T) => T>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<P<<T>(value: T, again: T) => T>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<P<<T extends string>(value: T, again: T) => T>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<P<<T, U>(left: T, right: U) => [T, U]>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<P<<T extends readonly unknown[]>(...args: T) => T>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<P<<T>(callback: (value: T) => void) => T>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<P<<T extends object>(value: T, key: keyof T) => unknown>, TODO>>; // TODO(koan) @koan-error

// 4. any, never, rest domains, and tuple observations (24-30)
type _24 = Expect<Equal<P<any>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<P<never>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<IsAny<P<(...args: any[]) => void>[number]>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<P<(...args: unknown[]) => void>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<P<(...args: never[]) => void>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<P<(x?: string) => void>["length"], TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<P<(x: string, y?: number) => void>[number], TODO>>; // TODO(koan) @koan-error
