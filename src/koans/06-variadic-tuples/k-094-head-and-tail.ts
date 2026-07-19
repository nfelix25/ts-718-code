import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-094: head and tail
 * =============================================================================
 *
 * Conditional tuple patterns can decompose a shape from the left. The pattern
 * `T extends readonly [infer Head, ...infer Tail]` asks whether T guarantees at
 * least one position. If it does, `Head` captures position zero and `Tail`
 * captures every remaining position in order.
 *
 * I read it aloud as "if T can be viewed as one required first value followed
 * by some tuple, name those pieces Head and Tail." Empty tuples, ordinary
 * arrays, and wholly optional tuples do not guarantee a first value, so this
 * pattern returns `never` for them. Conditional distribution applies the test
 * to each member of a naked generic union independently.
 */

export type Head<Value extends readonly unknown[]> =
  Value extends readonly [infer First, ...unknown[]] ? First : never;

export type Tail<Value extends readonly unknown[]> =
  Value extends readonly [unknown, ...infer Rest] ? Rest : never;

export type ReadonlyTail<Value extends readonly unknown[]> = Readonly<Tail<Value>>;

export function first<First, const Rest extends readonly unknown[]>(
  values: readonly [First, ...Rest],
): First {
  return values[0];
}

export function dropFirst<First, const Rest extends readonly unknown[]>(
  values: readonly [First, ...Rest],
): [...Rest] {
  return values.slice(1) as [...Rest];
}

export function shiftTuple<First, const Rest extends readonly unknown[]>(
  values: readonly [First, ...Rest],
): [head: First, tail: [...Rest]] {
  return [values[0], values.slice(1) as [...Rest]];
}

export function firstOrUndefined<Value>(values: readonly Value[]): Value | undefined {
  return values[0];
}

// Part 1: Head extracts the guaranteed first position.
type _Main01 = Expect<Equal<Head<[1]>, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<Head<[1, 2, 3]>, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<Head<readonly ["x", true]>, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<Head<[]>, TODO>>; // TODO(koan) @koan-error

// Part 2: Tail preserves every remaining finite position.
type _Main05 = Expect<Equal<Tail<[1]>, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<Tail<[1, 2, 3]>, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<Tail<readonly ["x", true, 3]>, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<ReadonlyTail<readonly ["x", true, 3]>, TODO>>; // TODO(koan) @koan-error

// Part 3: open arrays and optional-only tuples lack a guaranteed head.
type _Main09 = Expect<Equal<Head<string[]>, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<Tail<string[]>, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<Head<[value?: string]>, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<Tail<[value?: string]>, TODO>>; // TODO(koan) @koan-error

// Part 4: a required prefix before a rest satisfies the pattern.
type _Main13 = Expect<Equal<Head<[label: string, ...scores: number[]]>, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<Tail<[label: string, ...scores: number[]]>, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<Head<[flag: boolean, value?: number]>, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<Tail<[flag: boolean, value?: number]>, TODO>>; // TODO(koan) @koan-error

// Part 5: union members decompose independently and never branches disappear.
type _Main17 = Expect<Equal<Head<[] | [1] | [2, 3]>, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<Tail<[] | [1] | [2, 3]>, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<ReturnType<typeof first<"a", readonly [1, true]>>, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<ReturnType<typeof dropFirst<"a", readonly [1, true]>>, TODO>>; // TODO(koan) @koan-error
