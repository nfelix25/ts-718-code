import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type {
  KoanExclude,
  KoanExtract,
  WholeExclude,
  WholeExtract,
} from "./k-120-rebuild-exclude-and-extract.js";

/** EDGE CASES: union normalization, any branching, never, variance, and structure. */

type E<T, U> = KoanExclude<T, U>;
type X<T, U> = KoanExtract<T, U>;
type WE<T, U> = WholeExclude<T, U>;
type WX<T, U> = WholeExtract<T, U>;
type IsAny<T> = 0 extends 1 & T ? true : false;

// Pre-solved demonstrations.
type _DemoNeverInput = Expect<Equal<E<never, string>, never>>;
type _DemoUnknownNotString = Expect<Equal<E<unknown, string>, unknown>>;
type _DemoUnknownExtractString = Expect<Equal<X<unknown, string>, never>>;
type _DemoUnknownFilter = Expect<Equal<E<string | number, unknown>, never>>;
type _DemoWholeDoesNotFilter = Expect<Equal<WE<string | number, string>, string | number>>;
type _DemoAnyMustBeClassified = Expect<Equal<IsAny<X<any, string>>, true>>;

// 1. Union normalization happens before filtering (1-8)
type _01 = Expect<Equal<E<string | "x", "x">, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<X<string | "x", "x">, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<E<number | 1, 1>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<X<number | 1, 1>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<E<unknown | string, string>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<X<unknown | string, string>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<IsAny<E<any | string, string>>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<IsAny<X<any | string, string>>, TODO>>; // TODO(koan) @koan-error

// 2. Never and any interact differently with conditionals (9-16)
type _09 = Expect<Equal<E<never, never>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<X<never, never>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<WE<never, string>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<WX<never, string>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<IsAny<E<any, string>>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<IsAny<X<any, string>>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<IsAny<WE<any, string>>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<IsAny<WX<any, string>>, TODO>>; // TODO(koan) @koan-error

// 3. Structural direction and readonly assignability (17-23)
type Mutable = { value: number };
type ReadonlyValue = { readonly value: number };
type Narrow = { value: 1 };
type _17 = Expect<Equal<X<Mutable | string, ReadonlyValue>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<E<Mutable | string, ReadonlyValue>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<X<ReadonlyValue | string, Mutable>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<X<Mutable | Narrow, Narrow>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<E<Mutable | Narrow, Narrow>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<X<{ a: 1 } | { a: 1; b: 2 }, { a: 1 }>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<E<{ a: 1 } | { a: 1; b: 2 }, { a: 1 }>, TODO>>; // TODO(koan) @koan-error

// 4. Callable variance and broad filters (24-30)
type F0 = () => void;
type F1 = (value: string) => void;
type F2 = (value: unknown) => void;
type _24 = Expect<Equal<X<F0 | F1 | string, Function>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<E<F0 | F1 | string, Function>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<X<F1 | F2, (value: string) => void>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<E<F1 | F2, (value: string) => void>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<X<readonly [1] | number[] | object, readonly unknown[]>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<E<readonly [1] | number[] | object, readonly unknown[]>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<WX<string | number, unknown>, TODO>>; // TODO(koan) @koan-error
