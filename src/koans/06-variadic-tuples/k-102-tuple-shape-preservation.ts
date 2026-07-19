import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-102: tuple shape preservation
 * =============================================================================
 *
 * A homomorphic mapped type of the form `{ [K in keyof T]: ... }` receives
 * tuple-aware treatment. TypeScript maps the element positions and reconstructs
 * a tuple, preserving its length, labels, optional elements, and readonly
 * capability unless the mapping explicitly changes a modifier.
 *
 * I read `AwaitedTuple<T>` aloud as "for every position already in T, await the
 * value at that same position." The operation changes values, not structure.
 * Key remapping with `as` opts out of this tuple-specialized reconstruction and
 * maps the full key surface as an ordinary object. Broad arrays stay broad
 * arrays because their structure was never finite to begin with.
 */

export type BoxTuple<Value extends readonly unknown[]> = {
  [Key in keyof Value]: { value: Value[Key] };
};

export type AwaitedTuple<Value extends readonly unknown[]> = {
  [Key in keyof Value]: Awaited<Value[Key]>;
};

export type MutableRequiredTuple<Value extends readonly unknown[]> = {
  -readonly [Key in keyof Value]-?: Value[Key];
};

export type RemappedTupleKeys<Value extends readonly unknown[]> = {
  [Key in keyof Value as `slot_${Extract<Key, string>}`]: Value[Key];
};

export async function allTuple<const Value extends readonly unknown[]>(
  values: Value,
): Promise<AwaitedTuple<Value>> {
  return Promise.all(values) as Promise<AwaitedTuple<Value>>;
}

export function boxTuple<const Value extends readonly unknown[]>(values: Value): BoxTuple<Value> {
  return values.map((value) => ({ value })) as BoxTuple<Value>;
}

export function mapTuple<const Value extends readonly unknown[], Result>(
  values: Value,
  transform: (value: Value[number], index: number) => Result,
): { [Key in keyof Value]: Result } {
  return values.map(transform) as { [Key in keyof Value]: Result };
}

// Part 1: homomorphic mapping retains finite tuple structure.
type _Main01 = Expect<Equal<BoxTuple<[]>, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<BoxTuple<[1]>, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<BoxTuple<[1, "a"]>, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<BoxTuple<[left: number, right: string]>, TODO>>; // TODO(koan) @koan-error

// Part 2: readonly and optional modifiers survive unless explicitly changed.
type _Main05 = Expect<Equal<BoxTuple<readonly [1, 2]>, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<BoxTuple<[value?: string]>, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<MutableRequiredTuple<readonly [a?: 1, b?: 2]>, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<BoxTuple<readonly [head: 1, tail?: 2]>["length"], TODO>>; // TODO(koan) @koan-error

// Part 3: value transformations stay correlated with their positions.
type MainPromises = readonly [Promise<1>, "ready", Promise<boolean>];
type _Main09 = Expect<Equal<AwaitedTuple<MainPromises>, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<AwaitedTuple<MainPromises>[0], TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<AwaitedTuple<MainPromises>[1], TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<AwaitedTuple<MainPromises>["length"], TODO>>; // TODO(koan) @koan-error

// Part 4: arrays remain arrays and key remapping opts out of tuple reconstruction.
type _Main13 = Expect<Equal<BoxTuple<string[]>, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<AwaitedTuple<readonly Promise<number>[]>, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<RemappedTupleKeys<[1, 2]>["slot_0"], TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<RemappedTupleKeys<[1, 2]> extends readonly unknown[] ? true : false, TODO>>; // TODO(koan) @koan-error

// Part 5: runtime tuple mapping exposes the preserved shape.
type _Main17 = Expect<Equal<ReturnType<typeof boxTuple<readonly [1, "a"]>>, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<Awaited<ReturnType<typeof allTuple<readonly [Promise<1>, "a"]>>>, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<ReturnType<typeof mapTuple<readonly [1, 2], string>>, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<ReturnType<typeof mapTuple<readonly [1, 2], string>>["length"], TODO>>; // TODO(koan) @koan-error
