import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type { Add, Increment, IsNatural, Sum, TupleOf } from "./k-133-tuple-arithmetic-addition.js";

/** EDGE CASES: invalid naturals, union normalization, any/never, broad numbers, and recursion cost. */

// Pre-solved demonstrations.
type _DemoZeroIdentity = Expect<Equal<Add<0, 7>, 7>>;
type _DemoCommutative = Expect<Equal<Add<3, 4>, Add<4, 3>>>;
type _DemoUnionCrossProduct = Expect<Equal<Add<1 | 2, 10 | 20>, 11 | 12 | 21 | 22>>;
type _DemoBroadFallback = Expect<Equal<Add<number, 1>, number>>;
type _DemoNegativeRejected = Expect<Equal<TupleOf<-1>, never>>;
type _DemoFractionRejected = Expect<Equal<TupleOf<1.5>, never>>;
type _DemoEmptySum = Expect<Equal<Sum<[]>, 0>>;

// 1. Natural validation occurs before tuple recursion (1-8)
type _01 = Expect<Equal<IsNatural<-1>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<IsNatural<-1.5>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<IsNatural<0>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<IsNatural<1.5>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<TupleOf<-1>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<TupleOf<1.5>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Add<-1, 2>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Add<1.5, 2>, TODO>>; // TODO(koan) @koan-error

// 2. Union cross-products normalize duplicate sums (9-16)
type _09 = Expect<Equal<Add<0 | 1, 0 | 1>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Add<1 | 2, 2 | 3>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Add<1 | 3, 1 | 3>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Add<0 | 2, 0 | 2>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<Increment<1 | 2 | 3>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Sum<[1 | 2, 1 | 2]>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<TupleOf<1 | 2 | 3>["length"], TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Add<never | 1, 2>, TODO>>; // TODO(koan) @koan-error

// 3. Broad, any, and never policies (17-23)
type _17 = Expect<Equal<TupleOf<number>["length"], TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Add<number, 1>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Add<any, 1>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Add<never, 1>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Sum<number[]>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<Sum<[number, 1]>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<Sum<[never, 1]>, TODO>>; // TODO(koan) @koan-error

// 4. Algebraic composition and practical recursion sizes (24-30)
type _24 = Expect<Equal<Add<2, Add<3, 4>>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<Add<Add<2, 3>, 4>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<Add<10, 20>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<Add<25, 25>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Sum<[10, 20, 30]>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<Sum<readonly [1, 2, 3, 4, 5]>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<Increment<99>, TODO>>; // TODO(koan) @koan-error
