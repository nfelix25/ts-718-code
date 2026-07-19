import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type {
  KoanExclude,
  KoanExtract,
  WholeExclude,
  WholeExtract,
} from "./k-120-rebuild-exclude-and-extract.js";

/** GUIDED DRILLS: filter literal, primitive, structural, callable, and special unions. */

type E<T, U> = KoanExclude<T, U>;
type X<T, U> = KoanExtract<T, U>;
type WE<T, U> = WholeExclude<T, U>;
type WX<T, U> = WholeExtract<T, U>;
type IsAny<T> = 0 extends 1 & T ? true : false;

// Literal union subtraction (1-12)
type _01 = Expect<Equal<E<"a" | "b", "a">, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<E<"a" | "b", "a" | "b">, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<E<"a" | "b", "c">, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<X<"a" | "b", "a">, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<X<"a" | "b", "a" | "b">, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<X<"a" | "b", "c">, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<E<1 | 2 | 3 | 4, 2 | 4>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<X<1 | 2 | 3 | 4, 2 | 4>, TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<E<true | false, true>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<X<true | false, true>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<E<"a" | 1 | true, string>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<X<"a" | 1 | true, string>, TODO>>; // TODO(koan) @koan-error

// Primitive and nullish filters (13-24)
type Values = string | number | bigint | boolean | symbol | null | undefined;
type _13 = Expect<Equal<E<Values, null | undefined>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<X<Values, null | undefined>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<E<Values, string | number>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<X<Values, string | number>, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<E<string | "x", "x">, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<X<string | "x", "x">, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<E<number | 1, 1>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<X<number | 1, 1>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<E<null | { id: 1 }, object>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<X<null | { id: 1 }, object>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<E<undefined | (() => void), Function>, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<X<undefined | (() => void), Function>, TODO>>; // TODO(koan) @koan-error

// Structural object filtering (25-36)
type A = { kind: "a"; value: number };
type B = { kind: "b"; value: string };
type C = { kind: "c"; other: boolean };
type _25 = Expect<Equal<X<A | B | C, { value: unknown }>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<E<A | B | C, { value: unknown }>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<X<A | B | C, { kind: "a" }>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<E<A | B | C, { kind: "a" }>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<X<A | B | C, { kind: string }>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<E<A | B | C, { kind: string }>, TODO>>; // TODO(koan) @koan-error
type _31 = Expect<Equal<X<{ a: 1 } | { a: 1; b: 2 }, { a: 1 }>, TODO>>; // TODO(koan) @koan-error
type _32 = Expect<Equal<E<{ a: 1 } | { a: 1; b: 2 }, { a: 1 }>, TODO>>; // TODO(koan) @koan-error
type _33 = Expect<Equal<X<readonly [1] | [1, 2] | string[], readonly unknown[]>, TODO>>; // TODO(koan) @koan-error
type _34 = Expect<Equal<E<readonly [1] | [1, 2] | string[], readonly unknown[]>, TODO>>; // TODO(koan) @koan-error
type _35 = Expect<Equal<X<(() => 1) | ((x: number) => 2) | string, (...args: any[]) => unknown>, TODO>>; // TODO(koan) @koan-error
type _36 = Expect<Equal<E<(() => 1) | ((x: number) => 2) | string, (...args: any[]) => unknown>, TODO>>; // TODO(koan) @koan-error

// Whole-union comparisons (37-48)
type _37 = Expect<Equal<WE<string | number, string>, TODO>>; // TODO(koan) @koan-error
type _38 = Expect<Equal<WX<string | number, string>, TODO>>; // TODO(koan) @koan-error
type _39 = Expect<Equal<WE<"a" | "b", string>, TODO>>; // TODO(koan) @koan-error
type _40 = Expect<Equal<WX<"a" | "b", string>, TODO>>; // TODO(koan) @koan-error
type _41 = Expect<Equal<WE<A | B, { kind: string }>, TODO>>; // TODO(koan) @koan-error
type _42 = Expect<Equal<WX<A | B, { kind: string }>, TODO>>; // TODO(koan) @koan-error
type _43 = Expect<Equal<WE<A | C, { value: unknown }>, TODO>>; // TODO(koan) @koan-error
type _44 = Expect<Equal<WX<A | C, { value: unknown }>, TODO>>; // TODO(koan) @koan-error
type _45 = Expect<Equal<WE<never, string>, TODO>>; // TODO(koan) @koan-error
type _46 = Expect<Equal<WX<never, string>, TODO>>; // TODO(koan) @koan-error
type _47 = Expect<Equal<WE<unknown, unknown>, TODO>>; // TODO(koan) @koan-error
type _48 = Expect<Equal<WX<unknown, unknown>, TODO>>; // TODO(koan) @koan-error

// Top, bottom, and utility composition (49-60)
type _49 = Expect<Equal<E<never, string>, TODO>>; // TODO(koan) @koan-error
type _50 = Expect<Equal<X<never, string>, TODO>>; // TODO(koan) @koan-error
type _51 = Expect<Equal<E<unknown, string>, TODO>>; // TODO(koan) @koan-error
type _52 = Expect<Equal<X<unknown, string>, TODO>>; // TODO(koan) @koan-error
type _53 = Expect<Equal<E<string, never>, TODO>>; // TODO(koan) @koan-error
type _54 = Expect<Equal<X<string, never>, TODO>>; // TODO(koan) @koan-error
type _55 = Expect<Equal<E<string, unknown>, TODO>>; // TODO(koan) @koan-error
type _56 = Expect<Equal<X<string, unknown>, TODO>>; // TODO(koan) @koan-error
type _57 = Expect<Equal<IsAny<E<any, string>>, TODO>>; // TODO(koan) @koan-error
type _58 = Expect<Equal<IsAny<X<any, string>>, TODO>>; // TODO(koan) @koan-error
type _59 = Expect<Equal<X<E<"a" | "b" | 1, number>, string>, TODO>>; // TODO(koan) @koan-error
type _60 = Expect<Equal<E<X<"a" | "b" | 1, string>, "a">, TODO>>; // TODO(koan) @koan-error
