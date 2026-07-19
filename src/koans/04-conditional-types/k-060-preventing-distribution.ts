import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-060: preventing distribution
 * =============================================================================
 *
 * Distribution is optional. Wrapping the checked parameter makes it non-naked,
 * so `[T] extends [U] ? X : Y` tests T as one complete type. Tuple wrapping is
 * conventional because it preserves assignability information without adding
 * runtime meaning.
 *
 * I read the contrast aloud as:
 *
 *   "Naked T asks the question of each union member. Wrapped [T] asks one
 *    question about the entire union."
 *
 * Member-wise checks answer "which members match?" Whole checks answer "does
 * every member fit this constraint?" An overlap helper can separately answer
 * "does any member match?" by filtering and checking whether the remainder is
 * never. Wrapping also changes constructed results: distributive `T[]` gives
 * `A[] | B[]`, whereas a non-distributive branch can give `(A | B)[]`. Object,
 * function, and intersection wrappers also inhibit nakedness, but `[T]` is the
 * clearest signal of intent. Correlation may be lost when a whole union is kept
 * together, so opt out only when the algorithm truly needs an aggregate test.
 */

export type IsEvery<T, Constraint> = [T] extends [Constraint] ? true : false;
export type IsSome<T, Constraint> = [Extract<T, Constraint>] extends [never] ? false : true;
export type DistributedArray<T> = T extends unknown ? T[] : never;
export type WholeArray<T> = [T] extends [unknown] ? T[] : never;
export type DistributedBox<T> = T extends unknown ? { value: T } : never;
export type WholeBox<T> = [T] extends [unknown] ? { value: T } : never;

export function allStrings<const T extends readonly unknown[]>(values: T): IsEvery<T[number], string> {
  return values.every(value => typeof value === "string") as IsEvery<T[number], string>;
}

export function someStrings<const T extends readonly unknown[]>(values: T): IsSome<T[number], string> {
  return values.some(value => typeof value === "string") as IsSome<T[number], string>;
}

export function asWholeArray<T>(values: T[]): WholeArray<T> {
  return values as WholeArray<T>;
}

export function asDistributedArray<T>(values: T[]): DistributedArray<T> {
  return values as DistributedArray<T>;
}

// Part 1: Tuple wrapping turns member questions into one aggregate question.
type _Main01 = Expect<Equal<IsEvery<string | number, string>, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<IsEvery<"a" | "b", string>, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<IsEvery<1 | 2, number>, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<IsEvery<1 | "a", number | string>, TODO>>; // TODO(koan) @koan-error

// Part 2: Some-member overlap is distinct from every-member assignability.
type _Main05 = Expect<Equal<IsSome<string | number, string>, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<IsSome<number | boolean, string>, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<IsSome<"a" | 1 | "b", string>, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<IsSome<never, string>, TODO>>; // TODO(koan) @koan-error

// Part 3: Distributed arrays preserve homogeneous member alternatives.
type _Main09 = Expect<Equal<DistributedArray<string | number>, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<DistributedArray<"a" | "b">, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<DistributedArray<boolean>, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<DistributedArray<never>, TODO>>; // TODO(koan) @koan-error

// Part 4: Whole arrays allow members to coexist in one container.
type _Main13 = Expect<Equal<WholeArray<string | number>, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<WholeArray<"a" | "b">, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<WholeArray<boolean>, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<WholeArray<never>, TODO>>; // TODO(koan) @koan-error

// Part 5: Boxing shows correlation preserved per member or combined as a union.
type _Main17 = Expect<Equal<DistributedBox<"a" | 1>, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<WholeBox<"a" | 1>, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<DistributedBox<boolean>, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<WholeBox<boolean>, TODO>>; // TODO(koan) @koan-error
