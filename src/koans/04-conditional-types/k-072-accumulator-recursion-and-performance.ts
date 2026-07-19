import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-072: accumulator recursion and performance
 * =============================================================================
 *
 * Recursive type aliases consume compiler work. An accumulator makes progress
 * explicit by carrying the partial answer as another type parameter. The
 * recursive call can then be the branch's final operation instead of wrapping
 * a large pending expression around its result.
 *
 * I read
 *
 *   `Build<N, [...Acc, unknown]>`
 *
 * aloud as:
 *
 *   "The accumulator is still shorter than N, so append one slot and repeat."
 *
 * Accumulators model numbers as tuple lengths, reverse tuples by prepending one
 * consumed head, count string segments, and enforce an explicit recursion
 * budget. They do not make recursion free or infinite. Every instantiated
 * state consumes memory and checking time, union branches multiply work, and
 * broad inputs can make a literal-oriented algorithm stop surprisingly early.
 * Production utilities should bound untrusted depth, avoid recomputing the same
 * subproblem, and prefer a tail-position recursive call when it expresses the
 * same result clearly.
 */

export type BuildTuple<Length extends number, Acc extends unknown[] = []> =
  Acc["length"] extends Length ? Acc : BuildTuple<Length, [...Acc, unknown]>;
export type ReverseTuple<Values extends readonly unknown[], Acc extends unknown[] = []> =
  Values extends readonly [infer Head, ...infer Tail]
    ? ReverseTuple<Tail, [Head, ...Acc]>
    : Acc;
export type Take<
  Values extends readonly unknown[],
  Count extends number,
  Acc extends unknown[] = [],
> = Acc["length"] extends Count
  ? Acc
  : Values extends readonly [infer Head, ...infer Tail]
    ? Take<Tail, Count, [...Acc, Head]>
    : Acc;
export type StringLength<Text extends string, Acc extends unknown[] = []> =
  Text extends `${infer _Head}${infer Tail}`
    ? StringLength<Tail, [...Acc, unknown]>
    : Acc["length"];
export type AwaitAtMost<
  Value,
  Limit extends number,
  Seen extends unknown[] = [],
> = Seen["length"] extends Limit
  ? Value
  : Value extends PromiseLike<infer Inner>
    ? AwaitAtMost<Inner, Limit, [...Seen, unknown]>
    : Value;

export function reverse<const Values extends readonly unknown[]>(
  values: Values,
): ReverseTuple<Values> {
  return [...values].reverse() as ReverseTuple<Values>;
}

export function take<const Values extends readonly unknown[], const Count extends number>(
  values: Values,
  count: Count,
): Take<Values, Count> {
  return values.slice(0, count) as Take<Values, Count>;
}

export function literalLength<const Text extends string>(text: Text): StringLength<Text> {
  return text.length as StringLength<Text>;
}

export function makeSlots<const Length extends number>(length: Length): BuildTuple<Length> {
  return Array.from({ length }) as BuildTuple<Length>;
}

// Part 1: tuple length is an accumulator-backed natural number.
type _Main01 = Expect<Equal<BuildTuple<0>, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<BuildTuple<1>["length"], TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<BuildTuple<5>["length"], TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<BuildTuple<8>, TODO>>; // TODO(koan) @koan-error

// Part 2: reverse consumes from the front and prepends into its accumulator.
type _Main05 = Expect<Equal<ReverseTuple<[]>, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<ReverseTuple<[1]>, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<ReverseTuple<[1, 2, 3]>, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<ReverseTuple<readonly ["a", true, 3]>, TODO>>; // TODO(koan) @koan-error

// Part 3: take stops when either the budget or input is exhausted.
type _Main09 = Expect<Equal<Take<[1, 2, 3], 0>, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<Take<[1, 2, 3], 2>, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<Take<[1, 2, 3], 5>, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<Take<readonly ["a", "b"], 1>, TODO>>; // TODO(koan) @koan-error

// Part 4: a string-length accumulator stores count as tuple state.
type _Main13 = Expect<Equal<StringLength<"">, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<StringLength<"TS">, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<StringLength<"types">, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<StringLength<"a-b-c">, TODO>>; // TODO(koan) @koan-error

// Part 5: an explicit budget makes the unfinished remainder part of the result.
type _Main17 = Expect<Equal<AwaitAtMost<Promise<Promise<string>>, 0>, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<AwaitAtMost<Promise<Promise<string>>, 1>, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<AwaitAtMost<Promise<Promise<string>>, 2>, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<AwaitAtMost<number, 10>, TODO>>; // TODO(koan) @koan-error
