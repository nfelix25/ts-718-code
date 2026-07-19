import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-093: tuple spread normalization
 * =============================================================================
 *
 * Tuple spreads compose shapes: `[...Left, ...Right]`. When both operands are
 * finite, their positions simply concatenate. When an operand contains an
 * unbounded rest, TypeScript must normalize later variable positions into a
 * single rest region because a tuple may contain only one rest element.
 *
 * I read `[...A, ...B]` aloud as "all positions admitted by A, followed by all
 * positions admitted by B, normalized into one legal tuple shape." An optional
 * position before a newly required position can no longer be omitted from the
 * middle, so it becomes required and gains `undefined`. Spreading readonly
 * inputs describes a fresh mutable output unless the resulting tuple is itself
 * marked readonly.
 */

export type SpreadTuple<
  Left extends readonly unknown[],
  Right extends readonly unknown[],
> = [...Left, ...Right];

export function concatTuples<
  const Left extends readonly unknown[],
  const Right extends readonly unknown[],
>(left: Left, right: Right): SpreadTuple<Left, Right> {
  return [...left, ...right] as SpreadTuple<Left, Right>;
}

export function prepend<Value, const Values extends readonly unknown[]>(
  value: Value,
  values: Values,
): [Value, ...Values] {
  return [value, ...values];
}

export function append<const Values extends readonly unknown[], Value>(
  values: Values,
  value: Value,
): [...Values, Value] {
  return [...values, value];
}

export function surround<
  Start,
  const Middle extends readonly unknown[],
  End,
>(start: Start, middle: Middle, end: End): [Start, ...Middle, End] {
  return [start, ...middle, end];
}

// Part 1: finite tuple operands concatenate position for position.
type _Main01 = Expect<Equal<SpreadTuple<[], []>, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<SpreadTuple<[1], [2]>, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<SpreadTuple<[1, 2], [3, 4]>, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<SpreadTuple<readonly [1, 2], readonly [3]>, TODO>>; // TODO(koan) @koan-error

// Part 2: fixed prefixes and suffixes survive one unbounded operand.
type _Main05 = Expect<Equal<SpreadTuple<[head: boolean], string[]>, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<SpreadTuple<string[], [tail: boolean]>, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<SpreadTuple<[head: 0], readonly string[]>, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<SpreadTuple<readonly string[], [tail: 0]>, TODO>>; // TODO(koan) @koan-error

// Part 3: two unbounded operands normalize into one union-valued array region.
type _Main09 = Expect<Equal<SpreadTuple<string[], number[]>, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<SpreadTuple<readonly 1[], readonly 2[]>, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<SpreadTuple<[0, ...1[]], 2[]>, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<SpreadTuple<1[], [...2[], 3]>, TODO>>; // TODO(koan) @koan-error

// Part 4: optional positions normalize when required positions follow.
type _Main13 = Expect<Equal<SpreadTuple<[value?: string], [count: number]>, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<SpreadTuple<[a?: 1, b?: 2], [c: 3]>, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<SpreadTuple<[a: 1], [b?: 2]>, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<SpreadTuple<[], [value?: string]>, TODO>>; // TODO(koan) @koan-error

// Part 5: generic runtime composition preserves literal positions.
type _Main17 = Expect<Equal<ReturnType<typeof concatTuples<readonly [1, 2], readonly ["x"]>>, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<ReturnType<typeof prepend<0, readonly [1, 2]>>, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<ReturnType<typeof append<readonly [1, 2], 3>>, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<ReturnType<typeof surround<"(", readonly [1, 2], ")">>, TODO>>; // TODO(koan) @koan-error
