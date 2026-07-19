import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type {
  Assignable,
  IsAny,
  IsNever,
  IsUnknown,
  MutuallyAssignable,
  RawRelation,
  Relation,
  StrictEqual,
} from "./k-132-type-level-equality-and-comparison.js";

/** EDGE CASES: representational identity, any paradoxes, intersections, readonly, and functions. */

// Pre-solved demonstrations.
type _DemoLiteralSubtype = Expect<Equal<Relation<"x", string>, "subtype">>;
type _DemoPrimitiveSupertype = Expect<Equal<Relation<string, "x">, "supertype">>;
type _DemoAnyIntercepted = Expect<Equal<Relation<any, string>, "indeterminate">>;
type _DemoNeverSubtype = Expect<Equal<Relation<never, string>, "subtype">>;
type _DemoMutualIntersection = Expect<Equal<MutuallyAssignable<{ a: 1 } & { b: 2 }, { a: 1; b: 2 }>, true>>;
type _DemoStrictIntersection = Expect<Equal<StrictEqual<{ a: 1 } & { b: 2 }, { a: 1; b: 2 }>, false>>;

// 1. any produces misleading raw relations (1-8)
type _01 = Expect<Equal<IsAny<any>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Assignable<any, string>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Assignable<string, any>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<MutuallyAssignable<any, string>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<StrictEqual<any, string>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<RawRelation<any, string>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Relation<any, string>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Relation<string, any>, TODO>>; // TODO(koan) @koan-error

// 2. never and unknown sit at opposite extremes (9-16)
type _09 = Expect<Equal<IsNever<never>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Assignable<never, string>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Assignable<string, never>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Relation<never, string>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<IsUnknown<unknown>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Assignable<string, unknown>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Assignable<unknown, string>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Relation<unknown, string>, TODO>>; // TODO(koan) @koan-error

// 3. Mutual assignability does not guarantee strict representation identity (17-23)
type _17 = Expect<Equal<MutuallyAssignable<{ a: 1 } & { b: 2 }, { a: 1; b: 2 }>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<StrictEqual<{ a: 1 } & { b: 2 }, { a: 1; b: 2 }>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<MutuallyAssignable<string[], Array<string>>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<StrictEqual<string[], Array<string>>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<MutuallyAssignable<{ readonly a: 1 }, { a: 1 }>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<StrictEqual<{ readonly a: 1 }, { a: 1 }>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<StrictEqual<{ a?: 1 }, { a: 1 | undefined }>, TODO>>; // TODO(koan) @koan-error

// 4. Incomparable means neither subtype direction, not necessarily disjoint values (24-30)
type _24 = Expect<Equal<Relation<string, number>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<Relation<{ a: 1 }, { b: 2 }>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<({ a: 1 } & { b: 2 }) extends { a: 1 } ? true : false, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<({ a: 1 } & { b: 2 }) extends { b: 2 } ? true : false, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Relation<(x: unknown) => void, (x: string) => void>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<Relation<() => 1, () => number>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<Relation<readonly [1], [1]>, TODO>>; // TODO(koan) @koan-error
