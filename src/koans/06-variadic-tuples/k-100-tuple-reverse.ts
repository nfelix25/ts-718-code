import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-100: tuple reverse
 * =============================================================================
 *
 * Reverse consumes required finite positions from the left and prepends each
 * head to an accumulator. The accumulator is the partial answer, so recursion
 * does not need to rebuild an increasingly deep expression on the way back out.
 *
 * I read `ReverseFinite<Tail, [Head, ...Acc]>` aloud as "remove Head from the
 * source and place it before everything already reversed." A broad array cannot
 * prove a head. More subtly, an optional position is possible but not required;
 * naive decomposition would silently drop it. The public type therefore uses an
 * element-array fallback for open or optional shapes instead of lying about an
 * exact reverse. Fresh output is mutable unless readonly is explicitly chosen.
 */

type ReverseFinite<
  Value extends readonly unknown[],
  Accumulator extends readonly unknown[] = [],
> = Value extends readonly [infer Head, ...infer Tail]
  ? ReverseFinite<Tail, [Head, ...Accumulator]>
  : Accumulator;

export type Reverse<Value extends readonly unknown[]> = Value extends unknown
  ? number extends Value["length"]
    ? Value[number][]
    : Value extends Required<Value> ? ReverseFinite<Value> : Value[number][]
  : never;

export type ReadonlyReverse<Value extends readonly unknown[]> =
  Readonly<Reverse<Value>>;

export function reverseTuple<const Value extends readonly unknown[]>(value: Value): Reverse<Value> {
  return [...value].reverse() as Reverse<Value>;
}

export function reverseReadonly<const Value extends readonly unknown[]>(value: Value): ReadonlyReverse<Value> {
  return [...value].reverse() as unknown as ReadonlyReverse<Value>;
}

export function reverseTwice<const Value extends readonly unknown[]>(value: Value): Reverse<Reverse<Value>> {
  return [...value].reverse().reverse() as Reverse<Reverse<Value>>;
}

// Part 1: the accumulator reverses required finite tuples exactly.
type _Main01 = Expect<Equal<Reverse<[]>, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<Reverse<[1]>, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<Reverse<[1, 2]>, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<Reverse<[1, 2, 3]>, TODO>>; // TODO(koan) @koan-error

// Part 2: reversed indexing swaps the two decomposition directions.
type _Main05 = Expect<Equal<Reverse<[1, 2, 3]>[0], TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<Reverse<[1, 2, 3]>[2], TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<Reverse<[1, 2, 3]>[number], TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<Reverse<[1, 2, 3]>["length"], TODO>>; // TODO(koan) @koan-error

// Part 3: readonly is an explicit output policy for the fresh result.
type _Main09 = Expect<Equal<Reverse<readonly [1, 2, 3]>, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<ReadonlyReverse<[1, 2, 3]>, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<ReadonlyReverse<readonly [1, 2, 3]>, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<"push" extends keyof Reverse<readonly [1, 2]> ? true : false, TODO>>; // TODO(koan) @koan-error

// Part 4: optional and open shapes use an honest array fallback.
type _Main13 = Expect<Equal<Reverse<string[]>, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<Reverse<[head: string, ...tail: number[]]>, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<Reverse<[value?: string]>, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<Reverse<[head: string, value?: number]>, TODO>>; // TODO(koan) @koan-error

// Part 5: required finite reversal distributes and is an involution.
type _Main17 = Expect<Equal<Reverse<[1] | [2, 3]>, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<Reverse<Reverse<[1, 2, 3]>>, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<ReturnType<typeof reverseTuple<readonly [1, "a", true]>>, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<ReturnType<typeof reverseReadonly<readonly [1, "a"]>>, TODO>>; // TODO(koan) @koan-error
