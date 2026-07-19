import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 133 - TUPLE ARITHMETIC: ADDITION
 * ========================================
 *
 * TypeScript cannot directly calculate arbitrary numeric literal expressions,
 * but it can count tuple positions. Build a tuple of length N, concatenate the
 * representations of A and B, then observe the resulting length.
 *
 * Read `Add<2, 3>` aloud as: "build two slots, build three slots, spread both
 * into one tuple, and read five slots." Literal unions distribute into a numeric
 * cross-product. Broad `number` cannot be materialized, so it falls back to
 * number. Negative and fractional literals are rejected before recursion.
 */

type IsAny<T> = 0 extends 1 & T ? true : false;

export type IsNatural<N extends number> = IsAny<N> extends true
  ? false
  : `${N}` extends `-${string}` | `${string}.${string}`
    ? false
    : true;

type Build<N extends number, Acc extends unknown[] = []> =
  Acc["length"] extends N ? Acc : Build<N, [...Acc, unknown]>;

export type TupleOf<N extends number> = IsAny<N> extends true
  ? unknown[]
  : number extends N
    ? unknown[]
    : N extends unknown
      ? IsNatural<N> extends true
        ? Build<N>
        : never
      : never;

export type Add<A extends number, B extends number> = IsAny<A | B> extends true
  ? number
  : number extends A | B
    ? number
    : A extends unknown
      ? B extends unknown
        ? [...TupleOf<A>, ...TupleOf<B>]["length"]
        : never
      : never;

export type Increment<N extends number> = Add<N, 1>;

export type Sum<Values extends readonly number[], Acc extends number = 0> =
  number extends Values["length"]
    ? number
    : Values extends readonly [infer Head extends number, ...infer Tail extends number[]]
      ? Add<Acc, Head> extends infer Next extends number
        ? Sum<Tail, Next>
        : never
      : Acc;

// Part 1: Tuple length represents natural literals.
type _01 = Expect<Equal<TupleOf<0>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<TupleOf<1>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<TupleOf<3>["length"], TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<IsNatural<4>, TODO>>; // TODO(koan) @koan-error

// Part 2: Concatenated lengths add.
type _05 = Expect<Equal<Add<0, 0>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Add<0, 5>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Add<2, 3>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Add<8, 7>, TODO>>; // TODO(koan) @koan-error

// Part 3: Literal unions form a numeric cross-product.
type _09 = Expect<Equal<Add<1 | 2, 10>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Add<1, 10 | 20>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Add<1 | 2, 10 | 20>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<TupleOf<1 | 3>["length"], TODO>>; // TODO(koan) @koan-error

// Part 4: Addition composes into increment and finite sums.
type _13 = Expect<Equal<Increment<0>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Increment<9>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Sum<[]>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Sum<[1, 2, 3, 4]>, TODO>>; // TODO(koan) @koan-error

// Part 5: Invalid naturals, broad numbers, any, and never need policies.
type _17 = Expect<Equal<IsNatural<-1>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<TupleOf<1.5>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Add<number, 1>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Add<never, 1>, TODO>>; // TODO(koan) @koan-error

export function add<const A extends number, const B extends number>(left: A, right: B): Add<A, B> {
  return (left + right) as Add<A, B>;
}

export function sum<const Values extends readonly number[]>(values: Values): Sum<Values> {
  return values.reduce((total, value) => total + value, 0) as Sum<Values>;
}
