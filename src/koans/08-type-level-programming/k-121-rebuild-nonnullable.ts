import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 121 - REBUILD NONNULLABLE
 * ========================================
 *
 * Modern `NonNullable<T>` is `T & {}`. Under strict null checking, `{}` means
 * every non-nullish value, including primitive values. Intersecting T with that
 * domain removes null and undefined while retaining the rest of T.
 *
 * Read `T & {}` aloud as: "values that are both T and non-nullish." A
 * distributive conditional can filter the same ordinary union members, but it
 * asks a different question for unresolved or top-like inputs. Comparing both
 * forms makes the intersection model durable.
 */

export type KoanNonNullable<T> = T & {};
export type ConditionalNonNullable<T> = T extends null | undefined ? never : T;

type IsAny<T> = 0 extends 1 & T ? true : false;

// Part 1: Intersecting with {} removes nullish constituents.
type _01 = Expect<Equal<KoanNonNullable<string | null>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<KoanNonNullable<number | undefined>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<KoanNonNullable<boolean | null | undefined>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<KoanNonNullable<null | undefined>, TODO>>; // TODO(koan) @koan-error

// Part 2: Every non-nullish primitive and object survives.
type _05 = Expect<Equal<KoanNonNullable<0 | "" | false>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<KoanNonNullable<{ id: string } | null>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<KoanNonNullable<(() => void) | undefined>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<KoanNonNullable<readonly [1, 2] | null>, TODO>>; // TODO(koan) @koan-error

// Part 3: The conditional spelling distributes through ordinary unions.
type _09 = Expect<Equal<ConditionalNonNullable<string | null>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<ConditionalNonNullable<number | undefined>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<ConditionalNonNullable<{ id: 1 } | null | undefined>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<ConditionalNonNullable<never>, TODO>>; // TODO(koan) @koan-error

// Part 4: Top-like inputs reveal the semantic difference.
type _13 = Expect<Equal<KoanNonNullable<unknown>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<ConditionalNonNullable<unknown>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<IsAny<KoanNonNullable<any>>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<IsAny<ConditionalNonNullable<any>>, TODO>>; // TODO(koan) @koan-error

// Part 5: NonNullable changes the value itself, not nested properties.
type Model = { value?: string | null } | null;
type PresentModel = KoanNonNullable<Model>;
type _17 = Expect<Equal<PresentModel, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<PresentModel["value"], TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<KoanNonNullable<PresentModel["value"]>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<KoanNonNullable<never>, TODO>>; // TODO(koan) @koan-error

export function assertPresent<T>(value: T, message = "Expected a non-nullish value"): asserts value is KoanNonNullable<T> {
  if (value === null || value === undefined) throw new TypeError(message);
}

export function requirePresent<T>(value: T, message?: string): KoanNonNullable<T> {
  assertPresent(value, message);
  return value;
}
