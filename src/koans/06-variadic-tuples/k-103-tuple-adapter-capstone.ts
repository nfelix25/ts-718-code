import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-103: tuple adapter capstone
 * =============================================================================
 *
 * Function adaptation is tuple algebra applied to parameter lists. Binding a
 * prefix recursively compares bound values with required leading parameters and
 * returns the unbound tail. Binding a suffix performs the same proof from the
 * right. Flipping a fixed signature reverses its complete parameter tuple.
 *
 * I read `DropPrefix<Whole, Bound>` aloud as "for each bound head, prove it is
 * accepted by the corresponding whole head; consume both; return what remains."
 * A mismatch, missing required position, optional-only endpoint, or open shape
 * that cannot support the requested proof yields `never`. The runtime closures
 * concatenate or reverse arrays, while their public types retain exact literals,
 * labels where possible, cardinality, and the original result type.
 */

type AnyFunction = (...args: any[]) => unknown;

export type DropPrefix<
  Whole extends readonly unknown[],
  Prefix extends readonly unknown[],
> = Prefix extends readonly []
  ? Whole
  : Prefix extends readonly [infer PrefixHead, ...infer PrefixTail]
    ? Whole extends readonly [infer WholeHead, ...infer WholeTail]
      ? PrefixHead extends WholeHead
        ? DropPrefix<WholeTail, PrefixTail>
        : never
      : never
    : never;

export type DropSuffix<
  Whole extends readonly unknown[],
  Suffix extends readonly unknown[],
> = Suffix extends readonly []
  ? Whole
  : Suffix extends readonly [...infer SuffixInit, infer SuffixLast]
    ? Whole extends readonly [...infer WholeInit, infer WholeLast]
      ? SuffixLast extends WholeLast
        ? DropSuffix<WholeInit, SuffixInit>
        : never
      : never
    : never;

type ReverseFinite<Value extends readonly unknown[], Acc extends readonly unknown[] = []> =
  Value extends readonly [infer Head, ...infer Tail]
    ? ReverseFinite<Tail, [Head, ...Acc]>
    : Acc;

export type BindPrefix<Fn extends AnyFunction, Prefix extends readonly unknown[]> =
  DropPrefix<Parameters<Fn>, Prefix> extends infer Rest
    ? [Rest] extends [never]
      ? never
      : Rest extends readonly unknown[] ? (...args: Rest) => ReturnType<Fn> : never
    : never;

export type BindSuffix<Fn extends AnyFunction, Suffix extends readonly unknown[]> =
  DropSuffix<Parameters<Fn>, Suffix> extends infer Rest
    ? [Rest] extends [never]
      ? never
      : Rest extends readonly unknown[] ? (...args: Rest) => ReturnType<Fn> : never
    : never;

export type FlipFunction<Fn extends AnyFunction> =
  Parameters<Fn> extends Required<Parameters<Fn>>
    ? (...args: ReverseFinite<Parameters<Fn>>) => ReturnType<Fn>
    : never;

export function bindPrefix<
  Fn extends AnyFunction,
  const Prefix extends readonly unknown[],
>(
  fn: Fn,
  ...prefix: Prefix & (BindPrefix<Fn, Prefix> extends never ? never : unknown)
): BindPrefix<Fn, Prefix> {
  return ((...rest: unknown[]) => fn(...prefix, ...rest)) as BindPrefix<Fn, Prefix>;
}

export function bindSuffix<
  Fn extends AnyFunction,
  const Suffix extends readonly unknown[],
>(
  fn: Fn,
  ...suffix: Suffix & (BindSuffix<Fn, Suffix> extends never ? never : unknown)
): BindSuffix<Fn, Suffix> {
  return ((...rest: unknown[]) => fn(...rest, ...suffix)) as BindSuffix<Fn, Suffix>;
}

export function flipFunction<Fn extends AnyFunction>(
  fn: Fn & (FlipFunction<Fn> extends never ? never : unknown),
): FlipFunction<Fn> {
  return ((...args: unknown[]) => fn(...args.reverse())) as unknown as FlipFunction<Fn>;
}

export function invokeTuple<Args extends unknown[], Result>(
  fn: (...args: Args) => Result,
  args: Args,
): Result {
  return fn(...args);
}

type MainFn = (method: "GET" | "POST", path: string, retries: number, trace: boolean) => Promise<string>;

// Part 1: prefix recursion validates and returns the exact remaining tail.
type _Main01 = Expect<Equal<DropPrefix<Parameters<MainFn>, []>, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<DropPrefix<Parameters<MainFn>, ["GET"]>, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<DropPrefix<Parameters<MainFn>, ["POST", "/users"]>, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<DropPrefix<Parameters<MainFn>, ["DELETE"]>, TODO>>; // TODO(koan) @koan-error

// Part 2: suffix recursion performs the same proof from the right.
type _Main05 = Expect<Equal<DropSuffix<Parameters<MainFn>, []>, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<DropSuffix<Parameters<MainFn>, [true]>, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<DropSuffix<Parameters<MainFn>, [3, false]>, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<DropSuffix<Parameters<MainFn>, ["bad"]>, TODO>>; // TODO(koan) @koan-error

// Part 3: adapter signatures retain the unbound tuple and original result.
type _Main09 = Expect<Equal<Parameters<BindPrefix<MainFn, ["GET"]>>, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<ReturnType<BindPrefix<MainFn, ["GET", "/users"]>>, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<Parameters<BindSuffix<MainFn, [3, true]>>, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<ReturnType<BindSuffix<MainFn, [3, true]>>, TODO>>; // TODO(koan) @koan-error

// Part 4: complete binding and flipping are derived from tuple endpoints.
type _Main13 = Expect<Equal<Parameters<BindPrefix<MainFn, ["GET", "/x", 2, true]>>, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<Parameters<BindSuffix<MainFn, ["POST", "/x", 2, false]>>, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<Parameters<FlipFunction<MainFn>>, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<ReturnType<FlipFunction<MainFn>>, TODO>>; // TODO(koan) @koan-error

// Part 5: runtime helpers expose the same exact adapter types.
declare const mainFn: MainFn;
type _Main17 = Expect<Equal<ReturnType<typeof bindPrefix<MainFn, readonly ["GET", "/users"]>>, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<ReturnType<typeof bindSuffix<MainFn, readonly [2, true]>>, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<ReturnType<typeof flipFunction<MainFn>>, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<ReturnType<typeof invokeTuple<Parameters<typeof mainFn>, ReturnType<typeof mainFn>>>, TODO>>; // TODO(koan) @koan-error
