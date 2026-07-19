import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type { Compare, LessThan, Ordering, Range, RangeExclusive, Subtract } from "./k-134-subtraction-comparison-and-ranges.js";

/** EDGE CASES: underflow, union collapse, invalid naturals, broad fallbacks, and recursion cost. */

// Pre-solved demonstrations make the policies explicit before the stress reps.
type _DemoUnderflow = Expect<Equal<Subtract<2, 3>, never>>;
type _DemoEqual = Expect<Equal<Compare<4, 4>, "eq">>;
type _DemoBroadOrdering = Expect<Equal<Compare<number, 1>, Ordering>>;
type _DemoInclusiveSingleton = Expect<Equal<Range<3, 3>, 3>>;
type _DemoExclusiveSingleton = Expect<Equal<RangeExclusive<3, 3>, never>>;
type _DemoReversedRange = Expect<Equal<Range<4, 2>, never>>;
type _DemoUnionNormalizes = Expect<Equal<Range<1 | 3, 4>, 1 | 2 | 3 | 4>>;

// 1. Invalid naturals and subtraction underflow (1-8)
type _01 = Expect<Equal<Subtract<2, 3>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Subtract<0, 1>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Subtract<-1, 1>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Subtract<1, -1>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Subtract<1.5, 1>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Compare<-1, 1>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Range<-1, 2>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Range<1, 2.5>, TODO>>; // TODO(koan) @koan-error

// 2. Distribution creates cross-products, then unions remove duplicates (9-16)
type _09 = Expect<Equal<Subtract<3 | 4, 1 | 2>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Subtract<1 | 3, 2>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Compare<1 | 2, 1 | 2>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Compare<0 | 2, 1>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<LessThan<0 | 2, 1>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Range<0 | 2, 3>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Range<2, 2 | 4>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<RangeExclusive<0 | 2, 3>, TODO>>; // TODO(koan) @koan-error

// 3. Broad numbers, any, and never have deliberately different policies (17-24)
type _17 = Expect<Equal<Subtract<number, 1>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Subtract<any, 1>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Subtract<never, 1>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Compare<number, 1>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Compare<any, 1>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<LessThan<number, 1>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<Range<number, 3>, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<Range<never, 3>, TODO>>; // TODO(koan) @koan-error

// 4. Boundaries, identities, and practical recursion sizes (25-30)
type _25 = Expect<Equal<Subtract<100, 99>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<Compare<99, 100>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<Range<10, 15>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<RangeExclusive<10, 15>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<Range<0, 20>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<Subtract<Subtract<20, 5>, 5>, TODO>>; // TODO(koan) @koan-error
