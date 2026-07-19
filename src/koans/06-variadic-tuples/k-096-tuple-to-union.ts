import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-096: tuple to union
 * =============================================================================
 *
 * A tuple is indexable by every numeric position it admits. Indexing with the
 * broad key `number` asks for the union of values observable at any position:
 * `T[number]`. This is the standard bridge from an ordered literal vocabulary
 * to a set-like union.
 *
 * I read `T[number]` aloud as "for an arbitrary numeric position in T, what
 * value could I observe?" The operation deliberately forgets order, duplicates,
 * and cardinality. Empty tuples produce `never`; optional positions contribute
 * `undefined`; open rests contribute their element domain. A mapped tuple can
 * transform each position before the final numeric index forms a union.
 */

export type TupleElement<Value extends readonly unknown[]> = Value[number];

export type TupleChoice<Value extends readonly unknown[]> = {
  [Key in keyof Value]: { index: Key; value: Value[Key] };
}[number];

export function isTupleElement<const Values extends readonly unknown[]>(
  values: Values,
  candidate: unknown,
): candidate is Values[number] {
  return values.includes(candidate);
}

export function tupleSet<const Values extends readonly unknown[]>(values: Values): Set<Values[number]> {
  return new Set(values);
}

export function atTuple<Values extends readonly unknown[]>(
  values: Values,
  index: number,
): Values[number] | undefined {
  return values[index];
}

export function selectTuple<const Values extends readonly unknown[]>(
  values: Values,
  predicate: (value: Values[number]) => boolean,
): Values[number][] {
  return values.filter(predicate) as Values[number][];
}

const mainMethods = ["GET", "POST", "DELETE"] as const;

// Part 1: numeric indexing forms the possible element union.
type _Main01 = Expect<Equal<TupleElement<[1, 2, 3]>, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<TupleElement<[string, number, boolean]>, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<TupleElement<typeof mainMethods>, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<TupleElement<[]>, TODO>>; // TODO(koan) @koan-error

// Part 2: order and duplicates disappear through union normalization.
type _Main05 = Expect<Equal<Equal<TupleElement<[1, 2]>, TupleElement<[2, 1]>>, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<TupleElement<[1, 1, 2]>, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<Equal<TupleElement<[1, 2]>, [1, 2]>, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<TupleElement<[never, 1]>, TODO>>; // TODO(koan) @koan-error

// Part 3: optional and rest regions contribute their observable domains.
type _Main09 = Expect<Equal<TupleElement<[value?: string]>, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<TupleElement<[head: string, ...tail: number[]]>, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<TupleElement<[...names: string[], count: number]>, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<TupleElement<readonly boolean[]>, TODO>>; // TODO(koan) @koan-error

// Part 4: mapping each position before indexing retains per-position correlation.
type MainChoices = TupleChoice<readonly ["draft", 2, true]>;
type _Main13 = Expect<Equal<MainChoices, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<Extract<MainChoices, { index: "0" }>, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<Extract<MainChoices, { index: "1" }>["value"], TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<TupleChoice<[]>, TODO>>; // TODO(koan) @koan-error

// Part 5: const tuples drive runtime APIs with a literal union boundary.
type _Main17 = Expect<Equal<Parameters<typeof isTupleElement<typeof mainMethods>>[1], TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<ReturnType<typeof tupleSet<typeof mainMethods>>, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<ReturnType<typeof atTuple<typeof mainMethods>>, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<ReturnType<typeof selectTuple<typeof mainMethods>>, TODO>>; // TODO(koan) @koan-error
