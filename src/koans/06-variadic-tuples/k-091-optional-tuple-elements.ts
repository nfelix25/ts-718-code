import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-091: optional tuple elements
 * =============================================================================
 *
 * An optional tuple element is a position that may be omitted from the end of
 * the tuple. `[start: number, end?: number]` therefore has length `1 | 2`, and
 * reading position one yields `number | undefined`. The `undefined` appears on
 * observation because the position may be absent; with
 * `exactOptionalPropertyTypes`, that does not automatically mean callers may
 * explicitly store `undefined` there.
 *
 * I read the type aloud as "start is always position zero; end, when present,
 * is position one." Optionality is positional, so required elements cannot
 * follow optional elements. Homomorphic `Partial` and `Required` transform
 * tuple positions while preserving tuple identity and labels.
 */

export type OptionalTuple<Value extends readonly unknown[]> = {
  [Key in keyof Value]?: Value[Key];
};

export type RequiredTuple<Value extends readonly unknown[]> = {
  [Key in keyof Value]-?: Value[Key];
};

export type Range = [start: number, end?: number];

export function expandRange([start, end = start]: Range): number[] {
  const low = Math.min(start, end);
  const high = Math.max(start, end);
  return Array.from({ length: high - low + 1 }, (_, offset) => low + offset);
}

export function describePoint([x, y, label = "unlabeled"]: [x: number, y: number, label?: string]): string {
  return `${label}@${x},${y}`;
}

export function optionalPair<A, B>(first: A, second?: B): [first: A, second?: B] {
  return second === undefined ? [first] : [first, second];
}

export function tupleLength(value: readonly unknown[]): number {
  return value.length;
}

// Part 1: reads include absence and length records every allowed cardinality.
type _Main01 = Expect<Equal<Range[0], TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<Range[1], TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<Range[number], TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<Range["length"], TODO>>; // TODO(koan) @koan-error

// Part 2: omission is accepted, while explicit undefined follows exactness.
type _Main05 = Expect<Equal<[1] extends Range ? true : false, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<[1, 2] extends Range ? true : false, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<[] extends Range ? true : false, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<[1, undefined] extends Range ? true : false, TODO>>; // TODO(koan) @koan-error

// Part 3: mapped optionality and requiredness preserve tuple structure.
type _Main09 = Expect<Equal<OptionalTuple<[name: string, count: number]>, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<OptionalTuple<readonly [name: string, count: number]>, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<RequiredTuple<[name?: string, count?: number]>, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<RequiredTuple<readonly [name?: string, count?: number]>, TODO>>; // TODO(koan) @koan-error

// Part 4: an optional tuple is related to, but not identical with, a tuple union.
type OptionalName = [name?: string];
type NameShapes = [] | [name: string];
type _Main13 = Expect<Equal<OptionalName extends NameShapes ? true : false, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<NameShapes extends OptionalName ? true : false, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<Equal<OptionalName, NameShapes>, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<OptionalName["length"], TODO>>; // TODO(koan) @koan-error

// Part 5: optional parameters appear as optional positions in Parameters.
type MainParameters = Parameters<(path: string, encoding?: "utf8" | "ascii") => void>;
type _Main17 = Expect<Equal<MainParameters, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<MainParameters[1], TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<MainParameters["length"], TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<ReturnType<typeof optionalPair<string, number>>, TODO>>; // TODO(koan) @koan-error
