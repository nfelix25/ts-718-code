import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 132 - TYPE-LEVEL EQUALITY AND COMPARISON
 * ========================================
 *
 * Type comparison has layers. `[A] extends [B]` asks one non-distributive
 * assignability question. Asking it in both directions gives mutual assignability.
 * The conditional-function trick used by Equal is stricter about generic behavior
 * and representation, so it is the repository's assertion notion of identity.
 *
 * Read `Relation<A, B>` aloud as: "equal under StrictEqual; otherwise A is a
 * subtype when only A fits B, a supertype when only B fits A, and incomparable
 * otherwise." `any` must be intercepted because it claims contradictory relations.
 * Runtime equality is a separate operation over values, anchored here by Object.is.
 */

export type IsAny<T> = 0 extends 1 & T ? true : false;
export type IsNever<T> = [T] extends [never] ? true : false;
export type IsUnknown<T> = IsAny<T> extends true
  ? false
  : unknown extends T
    ? [keyof T] extends [never]
      ? true
      : false
    : false;

export type Assignable<From, To> = [From] extends [To] ? true : false;
export type MutuallyAssignable<A, B> = Assignable<A, B> extends true
  ? Assignable<B, A>
  : false;

export type StrictEqual<A, B> =
  (<T>() => T extends A ? 1 : 2) extends
  (<T>() => T extends B ? 1 : 2)
    ? true
    : false;

export type RawRelation<A, B> = StrictEqual<A, B> extends true
  ? "equal"
  : Assignable<A, B> extends true
    ? "subtype"
    : Assignable<B, A> extends true
      ? "supertype"
      : "incomparable";

export type Relation<A, B> = IsAny<A> extends true
  ? "indeterminate"
  : IsAny<B> extends true
    ? "indeterminate"
    : RawRelation<A, B>;

// Part 1: One-way assignability is directional.
type _01 = Expect<Equal<Assignable<"x", string>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Assignable<string, "x">, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Assignable<{ id: 1; name: string }, { id: number }>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Assignable<{ id: number }, { id: 1; name: string }>, TODO>>; // TODO(koan) @koan-error

// Part 2: Mutual assignability and strict identity are related but distinct.
type _05 = Expect<Equal<MutuallyAssignable<{ a: 1 }, { a: 1 }>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<StrictEqual<{ a: 1 }, { a: 1 }>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<MutuallyAssignable<{ a: 1 } & { b: 2 }, { a: 1; b: 2 }>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<StrictEqual<{ a: 1 } & { b: 2 }, { a: 1; b: 2 }>, TODO>>; // TODO(koan) @koan-error

// Part 3: Relation labels make direction readable.
type _09 = Expect<Equal<Relation<"x", string>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Relation<string, "x">, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Relation<string, string>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Relation<string, number>, TODO>>; // TODO(koan) @koan-error

// Part 4: Classify special types before trusting ordinary comparisons.
type _13 = Expect<Equal<IsAny<any>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<IsNever<never>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<IsUnknown<unknown>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Relation<any, string>, TODO>>; // TODO(koan) @koan-error

// Part 5: Union and function comparisons still use assignability semantics.
type _17 = Expect<Equal<Relation<"a" | "b", string>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Relation<string, "a" | "b">, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Assignable<(value: unknown) => void, (value: string) => void>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Assignable<(value: string) => void, (value: unknown) => void>, TODO>>; // TODO(koan) @koan-error

export function compareValues(left: unknown, right: unknown): "same" | "different" {
  return Object.is(left, right) ? "same" : "different";
}
