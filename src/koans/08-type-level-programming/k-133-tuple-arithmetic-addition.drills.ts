import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type { Add, Increment, IsNatural, Sum, TupleOf } from "./k-133-tuple-arithmetic-addition.js";

/** GUIDED DRILLS: build lengths, add identities, cross unions, and fold finite tuples. */

type IsAny<T> = 0 extends 1 & T ? true : false;

// Tuple construction (1-12)
type _01 = Expect<Equal<TupleOf<0>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<TupleOf<1>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<TupleOf<2>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<TupleOf<5>["length"], TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<TupleOf<10>["length"], TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<TupleOf<0>[number], TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<TupleOf<3>[number], TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<TupleOf<1 | 2>["length"], TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<TupleOf<number>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<TupleOf<number>["length"], TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<TupleOf<never>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<IsAny<TupleOf<any>[number]>, TODO>>; // TODO(koan) @koan-error

// Natural-number classification (13-20)
type _13 = Expect<Equal<IsNatural<0>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<IsNatural<1>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<IsNatural<100>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<IsNatural<-1>, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<IsNatural<-0.5>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<IsNatural<1.5>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<IsNatural<number>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<IsNatural<any>, TODO>>; // TODO(koan) @koan-error

// Addition table and identities (21-36)
type _21 = Expect<Equal<Add<0, 0>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<Add<0, 1>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<Add<1, 0>, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<Add<1, 1>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<Add<1, 2>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<Add<2, 1>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<Add<2, 3>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Add<3, 2>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<Add<5, 5>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<Add<10, 15>, TODO>>; // TODO(koan) @koan-error
type _31 = Expect<Equal<Add<20, 0>, TODO>>; // TODO(koan) @koan-error
type _32 = Expect<Equal<Add<0, 20>, TODO>>; // TODO(koan) @koan-error
type _33 = Expect<Equal<Add<2, Add<3, 4>>, TODO>>; // TODO(koan) @koan-error
type _34 = Expect<Equal<Add<Add<2, 3>, 4>, TODO>>; // TODO(koan) @koan-error
type _35 = Expect<Equal<Equal<Add<7, 8>, Add<8, 7>>, TODO>>; // TODO(koan) @koan-error
type _36 = Expect<Equal<Increment<Increment<3>>, TODO>>; // TODO(koan) @koan-error

// Union cross-products and broad inputs (37-48)
type _37 = Expect<Equal<Add<1 | 2, 10>, TODO>>; // TODO(koan) @koan-error
type _38 = Expect<Equal<Add<1, 10 | 20>, TODO>>; // TODO(koan) @koan-error
type _39 = Expect<Equal<Add<1 | 2, 10 | 20>, TODO>>; // TODO(koan) @koan-error
type _40 = Expect<Equal<Add<0 | 1, 0 | 1>, TODO>>; // TODO(koan) @koan-error
type _41 = Expect<Equal<Add<number, 1>, TODO>>; // TODO(koan) @koan-error
type _42 = Expect<Equal<Add<1, number>, TODO>>; // TODO(koan) @koan-error
type _43 = Expect<Equal<Add<number, number>, TODO>>; // TODO(koan) @koan-error
type _44 = Expect<Equal<Add<any, 1>, TODO>>; // TODO(koan) @koan-error
type _45 = Expect<Equal<Add<1, any>, TODO>>; // TODO(koan) @koan-error
type _46 = Expect<Equal<Add<never, 1>, TODO>>; // TODO(koan) @koan-error
type _47 = Expect<Equal<Add<1, never>, TODO>>; // TODO(koan) @koan-error
type _48 = Expect<Equal<Add<1 | never, 2>, TODO>>; // TODO(koan) @koan-error

// Finite sums (49-60)
type _49 = Expect<Equal<Sum<[]>, TODO>>; // TODO(koan) @koan-error
type _50 = Expect<Equal<Sum<[1]>, TODO>>; // TODO(koan) @koan-error
type _51 = Expect<Equal<Sum<[1, 2]>, TODO>>; // TODO(koan) @koan-error
type _52 = Expect<Equal<Sum<[1, 2, 3]>, TODO>>; // TODO(koan) @koan-error
type _53 = Expect<Equal<Sum<[0, 0, 0]>, TODO>>; // TODO(koan) @koan-error
type _54 = Expect<Equal<Sum<[5, 5, 5, 5]>, TODO>>; // TODO(koan) @koan-error
type _55 = Expect<Equal<Sum<readonly [2, 3, 4]>, TODO>>; // TODO(koan) @koan-error
type _56 = Expect<Equal<Sum<[1 | 2, 10]>, TODO>>; // TODO(koan) @koan-error
type _57 = Expect<Equal<Sum<number[]>, TODO>>; // TODO(koan) @koan-error
type _58 = Expect<Equal<Sum<readonly number[]>, TODO>>; // TODO(koan) @koan-error
type _59 = Expect<Equal<Sum<[number, 1]>, TODO>>; // TODO(koan) @koan-error
type _60 = Expect<Equal<Sum<[never, 1]>, TODO>>; // TODO(koan) @koan-error
