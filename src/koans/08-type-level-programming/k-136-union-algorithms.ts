import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 136 - UNION ALGORITHMS
 * ============================
 *
 * A naked conditional maps over union members but does not directly expose the
 * union as an ordered collection. Advanced algorithms exploit variance: a union
 * of function parameters is inferred contravariantly as an intersection. A
 * union of function returns can then reveal one compiler-selected member, which
 * recursion removes until a tuple remains.
 *
 * Read `UnionToIntersection<A | B>` aloud as: "require one callback capable of
 * accepting A and another capable of accepting B, then infer the single input
 * type satisfying both positions." Treat `UnionToTuple<U>` as an inspection
 * mechanism, not a sorting promise. Union order is an implementation detail.
 */

type IsAny<T> = 0 extends 1 & T ? true : false;

export type UnionToIntersection<U> = (
  U extends unknown ? (value: U) => void : never
) extends (value: infer Intersection) => void
  ? Intersection
  : never;

export type LastOf<U> = UnionToIntersection<
  U extends unknown ? () => U : never
> extends () => infer Last
  ? Last
  : never;

export type UnionToTuple<U, Last = LastOf<U>> = [U] extends [never]
  ? []
  : [...UnionToTuple<Exclude<U, Last>>, Last];

export type IsUnion<U, Whole = U> = IsAny<U> extends true
  ? false
  : [U] extends [never]
    ? false
    : U extends unknown
      ? [Whole] extends [U] ? false : true
      : never;

export type UnionSize<U> = UnionToTuple<U>["length"];

export type KeysOfUnion<U> = U extends unknown ? keyof U : never;

export type ValueAt<U, Key extends PropertyKey> = U extends unknown
  ? Key extends keyof U ? U[Key] : never
  : never;

export type MergeUnion<U> = {
  [Key in KeysOfUnion<U>]: ValueAt<U, Key>;
};

// Part 1: Contravariant parameter inference turns a union into an intersection.
type _01 = Expect<Equal<UnionToIntersection<{ a: 1 } | { b: 2 }>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<UnionToIntersection<string | number>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<UnionToIntersection<"x">, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<UnionToIntersection<never>, TODO>>; // TODO(koan) @koan-error

// Part 2: IsUnion compares each distributed member with the original whole.
type _05 = Expect<Equal<IsUnion<string>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<IsUnion<string | number>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<IsUnion<never>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<IsUnion<boolean>, TODO>>; // TODO(koan) @koan-error

// Part 3: Repeated last-member removal materializes a tuple for inspection.
type _09 = Expect<Equal<LastOf<42>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<UnionToTuple<never>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<UnionToTuple<"a" | "b">[number], TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<UnionSize<"a" | "b" | "c">, TODO>>; // TODO(koan) @koan-error

// Part 4: Distributive key and value queries retain every object branch.
type Variant = { kind: "text"; value: string } | { kind: "count"; count: number };
type _13 = Expect<Equal<keyof Variant, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<KeysOfUnion<Variant>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<ValueAt<Variant, "value">, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<MergeUnion<Variant>, TODO>>; // TODO(koan) @koan-error

// Part 5: Normalization, any, and ordering caveats constrain these techniques.
type _17 = Expect<Equal<UnionSize<1 | 1 | 2>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<IsUnion<"a" | string>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<IsAny<UnionToIntersection<any>>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<UnionToTuple<1 | 2 | 3>[number], TODO>>; // TODO(koan) @koan-error

export function uniqueValues<T>(values: readonly T[]): T[] {
  return [...new Set(values)];
}

export function countUnique(values: readonly unknown[]): number {
  return new Set(values).size;
}

export function mergeMembers<const Members extends readonly object[]>(members: Members): object {
  return Object.assign({}, ...members);
}
