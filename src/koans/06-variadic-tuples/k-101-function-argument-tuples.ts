import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-101: function argument tuples
 * =============================================================================
 *
 * A function parameter list is a tuple. `Parameters<F>` exposes its required,
 * optional, labeled, and rest positions, so ordinary tuple spreads can build a
 * new call signature without duplicating the original parameter types.
 *
 * I read `(...args: [Context, ...Parameters<F>]) => ReturnType<F>` aloud as
 * "accept one context value, then exactly the arguments F accepts, and return
 * what F returns." Decomposition supports binding or dropping guaranteed end
 * positions. Optional positions are not guaranteed, generic call signatures
 * often widen through Parameters, and overloaded functions expose their last
 * signature to conditional inference.
 */

type AnyFunction = (...args: any[]) => unknown;

export type PrependArgument<Fn extends AnyFunction, Value> =
  (...args: [value: Value, ...rest: Parameters<Fn>]) => ReturnType<Fn>;

export type AppendArgument<Fn extends AnyFunction, Value> =
  (...args: [...rest: Parameters<Fn>, value: Value]) => ReturnType<Fn>;

export type DropFirstArgument<Fn extends AnyFunction> =
  Fn extends (first: any, ...rest: infer Rest) => infer Result
    ? (...args: Rest) => Result
    : never;

export type DropLastArgument<Fn extends AnyFunction> =
  Parameters<Fn> extends [...infer Init, unknown]
    ? (...args: Init) => ReturnType<Fn>
    : never;

export function invoke<Args extends unknown[], Result>(
  fn: (...args: Args) => Result,
  args: Args,
): Result {
  return fn(...args);
}

export function bindFirst<First, Rest extends unknown[], Result>(
  fn: (first: First, ...rest: Rest) => Result,
  first: First,
): (...rest: Rest) => Result {
  return (...rest) => fn(first, ...rest);
}

export function bindLast<Prefix extends unknown[], Last, Result>(
  fn: (...args: [...Prefix, Last]) => Result,
  last: Last,
): (...args: Prefix) => Result {
  return (...args) => fn(...args, last);
}

export function withTrace<Args extends unknown[], Result>(
  fn: (...args: Args) => Result,
): (traceId: string, ...args: Args) => Result {
  return (_traceId, ...args) => fn(...args);
}

type MainFunction = (path: string, retries: number, force?: boolean) => Promise<string>;

// Part 1: Parameters exposes the complete argument tuple.
type _Main01 = Expect<Equal<Parameters<MainFunction>, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<Parameters<MainFunction>[0], TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<Parameters<MainFunction>[2], TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<Parameters<MainFunction>["length"], TODO>>; // TODO(koan) @koan-error

// Part 2: tuple spreads prepend and append required arguments.
type _Main05 = Expect<Equal<Parameters<PrependArgument<MainFunction, Date>>, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<ReturnType<PrependArgument<MainFunction, Date>>, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<Parameters<AppendArgument<(x: number) => string, boolean>>, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<ReturnType<AppendArgument<(x: number) => string, boolean>>, TODO>>; // TODO(koan) @koan-error

// Part 3: required end positions can be removed through tuple patterns.
type _Main09 = Expect<Equal<Parameters<DropFirstArgument<(a: string, b: number) => boolean>>, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<ReturnType<DropFirstArgument<(a: string, b: number) => boolean>>, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<Parameters<DropLastArgument<(a: string, b: number) => boolean>>, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<DropLastArgument<(a: string, b?: number) => boolean>, TODO>>; // TODO(koan) @koan-error

// Part 4: rest and optional parameter shapes survive tuple transformation.
type _Main13 = Expect<Equal<Parameters<PrependArgument<(...values: number[]) => number, string>>, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<Parameters<AppendArgument<(x?: number) => void, string>>, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<Parameters<DropFirstArgument<(head: string, ...tail: number[]) => void>>, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<Parameters<(this: Date, value: number) => void>, TODO>>; // TODO(koan) @koan-error

// Part 5: runtime adapters infer the same argument tuples.
declare const mainFn: (prefix: string, value: number, suffix: string) => string;
type _Main17 = Expect<Equal<ReturnType<typeof bindFirst<string, [number, string], string>>, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<ReturnType<typeof bindLast<[string, number], string, string>>, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<Parameters<ReturnType<typeof withTrace<[number, boolean], string>>>, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<ReturnType<typeof invoke<Parameters<typeof mainFn>, ReturnType<typeof mainFn>>>, TODO>>; // TODO(koan) @koan-error
