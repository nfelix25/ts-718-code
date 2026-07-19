import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 125 - REBUILD PARAMETERS
 * ========================================
 *
 * `Parameters<F>` matches a call signature and infers its entire argument list
 * as one tuple. That tuple retains labels, optional positions, and rest shape,
 * making it suitable for forwarding, adapters, and higher-order APIs.
 *
 * Read `F extends (...args: infer P) => any ? P : never` aloud as: "if F is
 * callable, capture the tuple P accepted by its rest parameter." Explicit `this`
 * parameters are contextual and do not appear in P. Generic inputs lose the
 * call-site-specific type arguments, and overloads expose the final signature.
 */

export type KoanParameters<F extends (...args: any[]) => any> =
  F extends (...args: infer Params) => any ? Params : never;

// Part 1: Capture zero, one, and many parameters as tuples.
type _01 = Expect<Equal<KoanParameters<() => void>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<KoanParameters<(value: string) => void>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<KoanParameters<(name: string, age: number) => boolean>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<KoanParameters<(...values: number[]) => number>, TODO>>; // TODO(koan) @koan-error

// Part 2: Tuple labels and optional/rest structure survive inference.
type _05 = Expect<Equal<KoanParameters<(name: string, age?: number) => void>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<KoanParameters<(head: string, ...tail: number[]) => void>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<KoanParameters<(...args: [id: string, enabled?: boolean]) => void>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<KoanParameters<(this: { id: string }, value: number) => void>, TODO>>; // TODO(koan) @koan-error

// Part 3: Generic parameter types reflect what is knowable without a call.
type _09 = Expect<Equal<KoanParameters<<T>(value: T) => T>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<KoanParameters<<T extends string>(value: T) => T>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<KoanParameters<<T, U>(left: T, right: U) => [T, U]>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<KoanParameters<<T extends readonly unknown[]>(...values: T) => T>, TODO>>; // TODO(koan) @koan-error

// Part 4: Overload inference observes the final signature.
interface Parser {
  (value: string): number;
  (value: number): string;
  (value: string | number): string | number;
}
type _13 = Expect<Equal<KoanParameters<Parser>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<KoanParameters<((x: string) => 1) | ((x: number) => 2)>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<KoanParameters<{ (x: string): 1; meta: boolean }>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<KoanParameters<((x: string) => 1) & ((x: number) => 2)>, TODO>>; // TODO(koan) @koan-error

// Part 5: Special types retain conditional inference behavior.
type IsAny<T> = 0 extends 1 & T ? true : false;
type _17 = Expect<Equal<KoanParameters<any>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<KoanParameters<never>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<IsAny<KoanParameters<(...args: any[]) => void>[number]>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<KoanParameters<(...args: unknown[]) => void>, TODO>>; // TODO(koan) @koan-error

export function callWithTuple<F extends (...args: any[]) => any>(
  fn: F,
  args: KoanParameters<F>,
): ReturnType<F> {
  return fn(...args) as ReturnType<F>;
}
