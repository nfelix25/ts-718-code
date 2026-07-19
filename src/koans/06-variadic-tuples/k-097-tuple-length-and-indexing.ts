import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-097: tuple length and indexing
 * =============================================================================
 *
 * Tuples expose three related but different facts. `T["length"]` describes
 * admitted cardinalities. `T[number]` describes values at an arbitrary numeric
 * position. Tuple-only keys such as `"0" | "1"` describe stable finite
 * positions and can be parsed into numeric literals.
 *
 * I read `Exclude<keyof T, keyof readonly unknown[]>` as "remove the ordinary
 * array surface from T's keys; keep only positions supplied by this tuple."
 * A template capture then turns `"0"` into `0`. Open rest regions have arbitrary
 * numeric positions but only their fixed prefix positions are stable keys.
 */

export type TupleKeyStrings<Value extends readonly unknown[]> =
  Exclude<keyof Value, keyof readonly unknown[]>;

export type StringToNumber<Value> =
  Value extends `${infer Numeric extends number}` ? Numeric : never;

export type TupleIndices<Value extends readonly unknown[]> =
  StringToNumber<TupleKeyStrings<Value>>;

export type DistributedTupleIndices<Value extends readonly unknown[]> =
  Value extends unknown ? TupleIndices<Value> : never;

export type FiniteLength<Value extends readonly unknown[]> =
  number extends Value["length"] ? never : Value["length"];

export function tupleAt<
  const Values extends readonly unknown[],
  Index extends TupleIndices<Values>,
>(values: Values, index: Index): Values[Index] {
  return values[index];
}

export function safeAt<Values extends readonly unknown[]>(
  values: Values,
  index: number,
): Values[number] | undefined {
  return values[index];
}

export function hasLength<const Length extends number>(
  values: readonly unknown[],
  length: Length,
): values is readonly unknown[] & { length: Length } {
  return values.length === length;
}

export function enumerateTuple<const Values extends readonly unknown[]>(values: Values): Array<[number, Values[number]]> {
  return values.map((value, index) => [index, value as Values[number]]);
}

// Part 1: finite, optional, and open shapes expose different length domains.
type _Main01 = Expect<Equal<[]["length"], TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<[1, 2]["length"], TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<[a: 1, b?: 2]["length"], TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<[head: 1, ...tail: 2[]]["length"], TODO>>; // TODO(koan) @koan-error

// Part 2: finite-length classification rejects open arrays and rests.
type _Main05 = Expect<Equal<FiniteLength<[1, 2]>, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<FiniteLength<[a: 1, b?: 2]>, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<FiniteLength<string[]>, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<FiniteLength<[1, ...2[]]>, TODO>>; // TODO(koan) @koan-error

// Part 3: tuple-only string keys convert into numeric literal indices.
type _Main09 = Expect<Equal<TupleKeyStrings<[]>, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<TupleKeyStrings<[string, number]>, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<TupleIndices<[string, number]>, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<TupleIndices<readonly [string, number, boolean]>, TODO>>; // TODO(koan) @koan-error

// Part 4: an open tail has arbitrary numeric positions plus stable prefix keys.
type MainOpen = [head: string, ...tail: number[]];
type _Main13 = Expect<Equal<TupleIndices<MainOpen>, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<MainOpen[number], TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<number extends keyof MainOpen ? true : false, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<TupleIndices<string[]>, TODO>>; // TODO(koan) @koan-error

// Part 5: union-wide stable keys differ from distributed possible keys.
type MainUnion = [1] | [1, 2];
type _Main17 = Expect<Equal<TupleIndices<MainUnion>, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<DistributedTupleIndices<MainUnion>, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<ReturnType<typeof tupleAt<readonly ["a", 1], 1>>, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<ReturnType<typeof safeAt<readonly ["a", 1]>>, TODO>>; // TODO(koan) @koan-error
