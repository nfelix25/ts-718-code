import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-068: covariant inference candidates
 * =============================================================================
 *
 * One `infer` variable may appear at several positions in the same pattern.
 * When those positions are covariant, each successful position contributes a
 * candidate and TypeScript combines the candidates as a union.
 *
 * I read
 *
 *   `T extends { left: infer U; right: infer U } ? U : never`
 *
 * aloud as:
 *
 *   "If T has both properties, infer one U from both value-producing slots;
 *    collect the left and right candidates into their union."
 *
 * This does not require both properties to have identical types. `{ left: 1,
 * right: 2 }` infers `1 | 2`. Return positions, readonly property values,
 * tuple elements, array elements, and promise fulfillment values are common
 * covariant sources. Normal union algebra then applies: `never` disappears,
 * a broad primitive absorbs its literals, `unknown` absorbs everything except
 * `any`, and `any` poisons the result. This is candidate aggregation inside one
 * match, distinct from a conditional distributing over an outer union.
 */

export type PropertyCandidates<T> = T extends { left: infer Value; right: infer Value }
  ? Value
  : never;
export type TupleCandidates<T> = T extends readonly [infer Value, infer Value]
  ? Value
  : never;
export type ReturnCandidates<T> = T extends {
  left: (...args: any[]) => infer Value;
  right: (...args: any[]) => infer Value;
}
  ? Value
  : never;
export type PromiseCandidates<T> = T extends readonly [
  PromiseLike<infer Value>,
  PromiseLike<infer Value>,
]
  ? Value
  : never;

export function collectProperties<const Value extends { left: unknown; right: unknown }>(
  value: Value,
): PropertyCandidates<Value>[] {
  return [value.left, value.right] as PropertyCandidates<Value>[];
}

export function collectTuple<const Value extends readonly [unknown, unknown]>(
  value: Value,
): TupleCandidates<Value>[] {
  return [value[0], value[1]] as TupleCandidates<Value>[];
}

export function collectReturns<const Value extends {
  left: () => unknown;
  right: () => unknown;
}>(value: Value): ReturnCandidates<Value>[] {
  return [value.left(), value.right()] as ReturnCandidates<Value>[];
}

export async function collectPromises<const Value extends readonly [
  PromiseLike<unknown>,
  PromiseLike<unknown>,
]>(value: Value): Promise<PromiseCandidates<Value>[]> {
  return Promise.all(value) as Promise<PromiseCandidates<Value>[]>;
}

// Part 1: repeated property captures collect a union.
type _Main01 = Expect<Equal<PropertyCandidates<{ left: 1; right: 2 }>, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<PropertyCandidates<{ left: string; right: number }>, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<PropertyCandidates<{ left: "a"; right: string }>, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<PropertyCandidates<{ left: 1 }>, TODO>>; // TODO(koan) @koan-error

// Part 2: tuple positions are value-producing candidates too.
type _Main05 = Expect<Equal<TupleCandidates<[1, 2]>, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<TupleCandidates<readonly ["a", true]>, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<TupleCandidates<[never, "kept"]>, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<TupleCandidates<[1, 2, 3]>, TODO>>; // TODO(koan) @koan-error

// Part 3: several return positions contribute covariant candidates.
type _Main09 = Expect<Equal<ReturnCandidates<{ left: () => 1; right: () => 2 }>, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<ReturnCandidates<{ left: () => string; right: () => number }>, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<ReturnCandidates<{ left: () => "a"; right: () => string }>, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<ReturnCandidates<{ left: () => 1; right: string }>, TODO>>; // TODO(koan) @koan-error

// Part 4: nested promise fulfillment positions also collect a union.
type _Main13 = Expect<Equal<PromiseCandidates<[Promise<1>, Promise<2>]>, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<PromiseCandidates<readonly [Promise<string>, Promise<number>]>, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<PromiseCandidates<[Promise<never>, Promise<boolean>]>, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<PromiseCandidates<[Promise<1>, number]>, TODO>>; // TODO(koan) @koan-error

// Part 5: union normalization happens after candidate collection.
type _Main17 = Expect<Equal<PropertyCandidates<{ left: "a"; right: "b" }>, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<PropertyCandidates<{ left: "a"; right: string }>, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<PropertyCandidates<{ left: never; right: 1 }>, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<PropertyCandidates<{ left: unknown; right: 1 }>, TODO>>; // TODO(koan) @koan-error
