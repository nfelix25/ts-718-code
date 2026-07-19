import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 124 - REBUILD RETURNTYPE
 * ========================================
 *
 * `ReturnType<F>` asks whether F has a call signature and captures the type in
 * its return position with infer. The generic constraint rejects non-callable
 * inputs before the conditional is evaluated.
 *
 * Read `F extends (...args: any) => infer R ? R : any` aloud as: "if F can be
 * called with some arguments and returns a value R, capture R; otherwise use the
 * unreachable fallback." For overloads, inference reads the final signature.
 * For generic functions, a return that depends on an unresolved type parameter
 * commonly becomes its constraint or unknown.
 */

export type KoanReturnType<F extends (...args: any[]) => any> =
  F extends (...args: any[]) => infer Result ? Result : any;

type IsAny<T> = 0 extends 1 & T ? true : false;

// Part 1: Capture ordinary return positions.
type _01 = Expect<Equal<KoanReturnType<() => string>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<KoanReturnType<(x: number) => boolean>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<KoanReturnType<(...values: number[]) => number>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<KoanReturnType<() => { id: string }>, TODO>>; // TODO(koan) @koan-error

// Part 2: Return unions, void, never, and promises are captured as written.
type _05 = Expect<Equal<KoanReturnType<() => string | number>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<KoanReturnType<() => void>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<KoanReturnType<() => never>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<KoanReturnType<() => Promise<number>>, TODO>>; // TODO(koan) @koan-error

// Part 3: Generic output depends on what can be known without a call.
type _09 = Expect<Equal<KoanReturnType<<T>(value: T) => T>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<KoanReturnType<<T extends string>(value: T) => T>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<KoanReturnType<<T extends { id: string }>(value: T) => T>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<KoanReturnType<<T>(value: T) => T[]>, TODO>>; // TODO(koan) @koan-error

// Part 4: Overload inference observes the last signature.
interface Parser {
  (value: string): number;
  (value: number): string;
  (value: string | number): string | number;
}
type _13 = Expect<Equal<KoanReturnType<Parser>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<KoanReturnType<(() => 1) | (() => 2)>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<KoanReturnType<{ (): "call"; meta: string }>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Awaited<KoanReturnType<() => Promise<"ready">>>, TODO>>; // TODO(koan) @koan-error

// Part 5: any and never retain conditional-type special behavior.
type _17 = Expect<Equal<IsAny<KoanReturnType<any>>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<KoanReturnType<never>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<KoanReturnType<(this: { id: string }) => number>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<KoanReturnType<(new () => { id: string }) & (() => boolean)>, TODO>>; // TODO(koan) @koan-error

export function invoke<F extends (...args: any[]) => any>(
  fn: F,
  ...args: Parameters<F>
): KoanReturnType<F> {
  return fn(...args) as KoanReturnType<F>;
}
