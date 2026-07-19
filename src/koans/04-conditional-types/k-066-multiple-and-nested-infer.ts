import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-066: multiple and nested infer
 * =============================================================================
 *
 * A conditional pattern may introduce several inferred variables at once, and
 * its pattern may contain other structures. This lets a type describe
 * relationships rather than extract one isolated slot.
 *
 * I read
 *
 *   `T extends PromiseLike<readonly [infer A, infer B]> ? [A, B] : never`
 *
 * aloud as:
 *
 *   "If T is promise-like and its fulfilled value is a readonly pair, capture
 *    the pair's first member as A and second member as B; otherwise never."
 *
 * The whole pattern must match. A promise of a one-element tuple does not make
 * a partial inference, and an array of pairs is different from a pair of
 * arrays. Multiple variables can preserve correlations such as an input tuple
 * paired with its return type. A nested conditional can take an earlier
 * capture and inspect it again, which is often clearer than one enormous
 * pattern. Naked input parameters still distribute over union members before
 * each nested match runs.
 */

export type PairParts<T> = T extends readonly [infer Left, infer Right]
  ? { left: Left; right: Right }
  : never;
export type HeadAndTail<T> = T extends readonly [infer Head, ...infer Tail]
  ? [Head, Tail]
  : never;
export type PromisedPair<T> = T extends PromiseLike<readonly [infer Left, infer Right]>
  ? [Left, Right]
  : never;
export type FunctionShape<T> = T extends (...args: infer Params) => infer Result
  ? { params: Params; result: Result }
  : never;
export type ReturnedProperty<T, Key extends PropertyKey> = T extends (...args: any[]) => infer Result
  ? Result extends Record<Key, infer Value>
    ? Value
    : never
  : never;

export function splitPair<const Pair extends readonly [unknown, unknown]>(
  pair: Pair,
): PairParts<Pair> {
  return { left: pair[0], right: pair[1] } as PairParts<Pair>;
}

export function headAndTail<const Values extends readonly [unknown, ...unknown[]]>(
  values: Values,
): HeadAndTail<Values> {
  return [values[0], values.slice(1)] as unknown as HeadAndTail<Values>;
}

export async function resolvePair<Pair extends readonly [unknown, unknown]>(
  pair: PromiseLike<Pair>,
): Promise<PromisedPair<PromiseLike<Pair>>> {
  return await pair as unknown as PromisedPair<PromiseLike<Pair>>;
}

export function invokeShape<Fn extends (...args: any[]) => any>(
  fn: Fn,
  ...args: Parameters<Fn>
): FunctionShape<Fn>["result"] {
  return fn(...args) as FunctionShape<Fn>["result"];
}

// Part 1: one tuple pattern can capture several positions.
type _Main01 = Expect<Equal<PairParts<[string, number]>, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<PairParts<readonly ["id", 7]>, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<PairParts<[1, 2, 3]>, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<PairParts<string[]>, TODO>>; // TODO(koan) @koan-error

// Part 2: a rest infer variable captures the remainder as a tuple.
type _Main05 = Expect<Equal<HeadAndTail<["a", 1, true]>, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<HeadAndTail<readonly [1]>, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<HeadAndTail<[]>, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<HeadAndTail<[head: string, ...tail: number[]]>, TODO>>; // TODO(koan) @koan-error

// Part 3: nested patterns match outer and inner containers together.
type _Main09 = Expect<Equal<PromisedPair<Promise<[string, number]>>, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<PromisedPair<Promise<readonly [1, 2]>>, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<PromisedPair<Promise<[1]>>, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<PromisedPair<[Promise<1>, Promise<2>]>, TODO>>; // TODO(koan) @koan-error

// Part 4: multiple captures retain function input/output correlation.
type _Main13 = Expect<Equal<FunctionShape<(id: number) => string>, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<FunctionShape<() => void>, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<FunctionShape<((x: 1) => "a") | ((x: 2) => "b")>, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<FunctionShape<string>, TODO>>; // TODO(koan) @koan-error

// Part 5: an earlier capture can be inspected by a nested conditional.
type _Main17 = Expect<Equal<ReturnedProperty<() => { id: number }, "id">, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<ReturnedProperty<(name: string) => { name: string; active: boolean }, "active">, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<ReturnedProperty<() => { id?: number }, "id">, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<ReturnedProperty<string, "id">, TODO>>; // TODO(koan) @koan-error
