import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type { Compare, LessThan, Ordering, Range, RangeExclusive, Subtract } from "./k-134-subtraction-comparison-and-ranges.js";

/** GUIDED DRILLS: subtract prefixes, classify order, derive predicates, and enumerate bounds. */

// Natural subtraction table and composition (1-18)
type _01 = Expect<Equal<Subtract<0, 0>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Subtract<1, 0>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Subtract<1, 1>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Subtract<2, 1>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Subtract<3, 1>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Subtract<3, 2>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Subtract<5, 2>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Subtract<10, 3>, TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<Subtract<20, 10>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Subtract<2, 3>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Subtract<0, 1>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Subtract<8, 8>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<Subtract<Subtract<9, 2>, 3>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Subtract<9, Subtract<5, 2>>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Subtract<5 | 6, 2>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Subtract<5, 1 | 2>, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<Subtract<2 | 5, 1 | 3>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Subtract<10, 0 | 10>, TODO>>; // TODO(koan) @koan-error

// Three-way comparisons (19-36)
type _19 = Expect<Equal<Compare<0, 0>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Compare<0, 1>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Compare<1, 0>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<Compare<1, 1>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<Compare<2, 7>, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<Compare<7, 2>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<Compare<12, 12>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<Compare<20, 19>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<Compare<19, 20>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Compare<1 | 3, 2>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<Compare<2, 1 | 3>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<Compare<1 | 2, 1 | 2>, TODO>>; // TODO(koan) @koan-error
type _31 = Expect<Equal<Compare<number, 1>, TODO>>; // TODO(koan) @koan-error
type _32 = Expect<Equal<Compare<1, number>, TODO>>; // TODO(koan) @koan-error
type _33 = Expect<Equal<Compare<any, 1>, TODO>>; // TODO(koan) @koan-error
type _34 = Expect<Equal<Compare<1, any>, TODO>>; // TODO(koan) @koan-error
type _35 = Expect<Equal<Compare<never, 1>, TODO>>; // TODO(koan) @koan-error
type _36 = Expect<Equal<Equal<Compare<number, number>, Ordering>, TODO>>; // TODO(koan) @koan-error

// Boolean ordering projections (37-44)
type _37 = Expect<Equal<LessThan<0, 1>, TODO>>; // TODO(koan) @koan-error
type _38 = Expect<Equal<LessThan<1, 1>, TODO>>; // TODO(koan) @koan-error
type _39 = Expect<Equal<LessThan<2, 1>, TODO>>; // TODO(koan) @koan-error
type _40 = Expect<Equal<LessThan<1 | 3, 2>, TODO>>; // TODO(koan) @koan-error
type _41 = Expect<Equal<LessThan<2, 1 | 3>, TODO>>; // TODO(koan) @koan-error
type _42 = Expect<Equal<LessThan<number, 2>, TODO>>; // TODO(koan) @koan-error
type _43 = Expect<Equal<LessThan<any, 2>, TODO>>; // TODO(koan) @koan-error
type _44 = Expect<Equal<LessThan<never, 2>, TODO>>; // TODO(koan) @koan-error

// Inclusive and exclusive range unions (45-60)
type _45 = Expect<Equal<Range<0, 0>, TODO>>; // TODO(koan) @koan-error
type _46 = Expect<Equal<Range<0, 1>, TODO>>; // TODO(koan) @koan-error
type _47 = Expect<Equal<Range<1, 1>, TODO>>; // TODO(koan) @koan-error
type _48 = Expect<Equal<Range<1, 3>, TODO>>; // TODO(koan) @koan-error
type _49 = Expect<Equal<Range<3, 6>, TODO>>; // TODO(koan) @koan-error
type _50 = Expect<Equal<RangeExclusive<0, 0>, TODO>>; // TODO(koan) @koan-error
type _51 = Expect<Equal<RangeExclusive<0, 1>, TODO>>; // TODO(koan) @koan-error
type _52 = Expect<Equal<RangeExclusive<1, 4>, TODO>>; // TODO(koan) @koan-error
type _53 = Expect<Equal<Range<5, 2>, TODO>>; // TODO(koan) @koan-error
type _54 = Expect<Equal<RangeExclusive<5, 2>, TODO>>; // TODO(koan) @koan-error
type _55 = Expect<Equal<Range<1 | 3, 4>, TODO>>; // TODO(koan) @koan-error
type _56 = Expect<Equal<Range<1, 2 | 4>, TODO>>; // TODO(koan) @koan-error
type _57 = Expect<Equal<Range<number, 4>, TODO>>; // TODO(koan) @koan-error
type _58 = Expect<Equal<Range<1, number>, TODO>>; // TODO(koan) @koan-error
type _59 = Expect<Equal<Range<any, 4>, TODO>>; // TODO(koan) @koan-error
type _60 = Expect<Equal<Range<never, 4>, TODO>>; // TODO(koan) @koan-error
