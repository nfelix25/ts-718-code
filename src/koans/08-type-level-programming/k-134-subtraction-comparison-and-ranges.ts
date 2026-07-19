import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 134 - SUBTRACTION, COMPARISON, AND RANGES
 * =================================================
 *
 * Unary tuple arithmetic becomes more useful once tuple shape can answer more
 * than "how many?". If A's tuple begins with every slot in B's tuple, the rest
 * has length A - B. If it does not, A is smaller. That same prefix proof gives
 * us subtraction, ordering, and the boundary checks needed to enumerate ranges.
 *
 * Read `Subtract<7, 3>` aloud as: "remove a three-slot prefix from seven slots
 * and count the four-slot remainder." Read `Compare<2, 5>` as: "two slots
 * cannot cover a five-slot prefix, so two is less than five." These algorithms
 * model natural-number literals, not JavaScript's full floating-point domain.
 */

type IsAny<T> = 0 extends 1 & T ? true : false;

type IsNatural<N extends number> = IsAny<N> extends true
  ? false
  : `${N}` extends `-${string}` | `${string}.${string}`
    ? false
    : true;

type Build<N extends number, Acc extends unknown[] = []> =
  Acc["length"] extends N ? Acc : Build<N, [...Acc, unknown]>;

type TupleOf<N extends number> = IsNatural<N> extends true ? Build<N> : never;

type SubtractOne<A extends number, B extends number> =
  IsNatural<A> extends true
    ? IsNatural<B> extends true
      ? TupleOf<A> extends [...TupleOf<B>, ...infer Rest]
        ? Rest["length"]
        : never
      : never
    : never;

export type Subtract<A extends number, B extends number> = IsAny<A | B> extends true
  ? number
  : number extends A | B
    ? number
    : A extends unknown
      ? B extends unknown
        ? SubtractOne<A, B>
        : never
      : never;

export type Ordering = "lt" | "eq" | "gt";

type CompareOne<A extends number, B extends number> =
  IsNatural<A> extends true
    ? IsNatural<B> extends true
      ? TupleOf<A> extends [...TupleOf<B>, ...infer Rest]
        ? Rest extends [] ? "eq" : "gt"
        : "lt"
      : never
    : never;

export type Compare<A extends number, B extends number> = IsAny<A | B> extends true
  ? Ordering
  : number extends A | B
    ? Ordering
    : A extends unknown
      ? B extends unknown
        ? CompareOne<A, B>
        : never
      : never;

export type LessThan<A extends number, B extends number> =
  Compare<A, B> extends infer Result
    ? Result extends Ordering
      ? Result extends "lt" ? true : false
      : never
    : never;

type Increment<N extends number> = [...TupleOf<N>, unknown]["length"] & number;

type Enumerate<N extends number, Acc extends number[] = []> =
  Acc["length"] extends N
    ? Acc[number]
    : Enumerate<N, [...Acc, Acc["length"]]>;

type RangeOne<Start extends number, End extends number> =
  IsNatural<Start> extends true
    ? IsNatural<End> extends true
      ? CompareOne<Start, End> extends "gt"
        ? never
        : Exclude<Enumerate<Increment<End>>, Enumerate<Start>>
      : never
    : never;

type RangeExclusiveOne<Start extends number, End extends number> =
  IsNatural<Start> extends true
    ? IsNatural<End> extends true
      ? CompareOne<Start, End> extends "gt"
        ? never
        : Exclude<Enumerate<End>, Enumerate<Start>>
      : never
    : never;

export type Range<Start extends number, End extends number> = IsAny<Start | End> extends true
  ? number
  : number extends Start | End
    ? number
    : Start extends unknown
      ? End extends unknown
        ? RangeOne<Start, End>
        : never
      : never;

export type RangeExclusive<Start extends number, End extends number> = IsAny<Start | End> extends true
  ? number
  : number extends Start | End
    ? number
    : Start extends unknown
      ? End extends unknown
        ? RangeExclusiveOne<Start, End>
        : never
      : never;

// Part 1: Removing a tuple prefix performs natural subtraction.
type _01 = Expect<Equal<Subtract<5, 2>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Subtract<5, 0>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Subtract<5, 5>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Subtract<2, 5>, TODO>>; // TODO(koan) @koan-error

// Part 2: The same prefix relationship produces a three-way ordering.
type _05 = Expect<Equal<Compare<2, 5>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Compare<5, 5>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Compare<8, 5>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<LessThan<2, 5>, TODO>>; // TODO(koan) @koan-error

// Part 3: Enumeration plus exclusion builds bounded literal unions.
type _09 = Expect<Equal<Range<0, 0>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Range<1, 4>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<RangeExclusive<1, 4>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Range<4, 1>, TODO>>; // TODO(koan) @koan-error

// Part 4: Literal unions distribute through both numeric positions.
type _13 = Expect<Equal<Subtract<5 | 6, 2>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Compare<1 | 3, 2>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<LessThan<1 | 3, 2>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Range<1 | 3, 4>, TODO>>; // TODO(koan) @koan-error

// Part 5: Broad, invalid, any, and never inputs require explicit policies.
type _17 = Expect<Equal<Subtract<number, 1>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Compare<any, 1>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Range<-1, 3>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Range<never, 3>, TODO>>; // TODO(koan) @koan-error

export function subtractNatural(left: number, right: number): number {
  if (!Number.isInteger(left) || !Number.isInteger(right) || left < right || right < 0) {
    throw new RangeError("natural subtraction requires integers with left >= right >= 0");
  }
  return left - right;
}

export function compareNaturals(left: number, right: number): Ordering {
  return left < right ? "lt" : left > right ? "gt" : "eq";
}

export function rangeInclusive(start: number, end: number): number[] {
  if (!Number.isInteger(start) || !Number.isInteger(end) || start < 0 || start > end) {
    return [];
  }
  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}
