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

/** GUIDED DRILLS: compare literals, unions, objects, functions, representations, and special types. */

// Literal and primitive assignability (1-12)
type _01 = Expect<Equal<Assignable<"x", string>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Assignable<string, "x">, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Assignable<1, number>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Assignable<number, 1>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Assignable<true, boolean>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Assignable<boolean, true>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<StrictEqual<"x", "x">, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<StrictEqual<"x", string>, TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<MutuallyAssignable<string, string>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<MutuallyAssignable<"x", string>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Relation<"x", string>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Relation<string, "x">, TODO>>; // TODO(koan) @koan-error

// Union comparisons (13-24)
type _13 = Expect<Equal<Assignable<"a", "a" | "b">, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Assignable<"a" | "b", "a">, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Assignable<"a" | "b", string>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Assignable<string, "a" | "b">, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<StrictEqual<"a" | "b", "b" | "a">, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<MutuallyAssignable<"a" | "b", "b" | "a">, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Relation<"a" | "b", string>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Relation<string, "a" | "b">, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Relation<"a" | 1, string | number>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<Relation<string | number, "a" | 1>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<Relation<string | number, string | boolean>, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<StrictEqual<string | never, string>, TODO>>; // TODO(koan) @koan-error

// Structural object comparisons (25-36)
type _25 = Expect<Equal<Assignable<{ id: 1; name: string }, { id: number }>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<Assignable<{ id: number }, { id: 1; name: string }>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<Relation<{ id: 1; name: string }, { id: number }>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Relation<{ id: number }, { id: 1; name: string }>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<StrictEqual<{ id: 1 }, { id: 1 }>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<StrictEqual<{ a: 1 } & { b: 2 }, { a: 1; b: 2 }>, TODO>>; // TODO(koan) @koan-error
type _31 = Expect<Equal<MutuallyAssignable<{ a: 1 } & { b: 2 }, { a: 1; b: 2 }>, TODO>>; // TODO(koan) @koan-error
type _32 = Expect<Equal<Assignable<{ readonly id: 1 }, { id: 1 }>, TODO>>; // TODO(koan) @koan-error
type _33 = Expect<Equal<Assignable<{ id: 1 }, { readonly id: 1 }>, TODO>>; // TODO(koan) @koan-error
type _34 = Expect<Equal<StrictEqual<{ a?: 1 }, { a: 1 | undefined }>, TODO>>; // TODO(koan) @koan-error
type _35 = Expect<Equal<Relation<{ a?: 1 }, { a: 1 | undefined }>, TODO>>; // TODO(koan) @koan-error
type _36 = Expect<Equal<Relation<{ a: 1 }, { b: 2 }>, TODO>>; // TODO(koan) @koan-error

// Function, tuple, and array comparisons (37-48)
type _37 = Expect<Equal<Assignable<(x: unknown) => void, (x: string) => void>, TODO>>; // TODO(koan) @koan-error
type _38 = Expect<Equal<Assignable<(x: string) => void, (x: unknown) => void>, TODO>>; // TODO(koan) @koan-error
type _39 = Expect<Equal<Relation<(x: unknown) => void, (x: string) => void>, TODO>>; // TODO(koan) @koan-error
type _40 = Expect<Equal<Assignable<() => 1, () => number>, TODO>>; // TODO(koan) @koan-error
type _41 = Expect<Equal<Assignable<() => number, () => 1>, TODO>>; // TODO(koan) @koan-error
type _42 = Expect<Equal<StrictEqual<[1, 2], readonly [1, 2]>, TODO>>; // TODO(koan) @koan-error
type _43 = Expect<Equal<Assignable<[1, 2], readonly [1, 2]>, TODO>>; // TODO(koan) @koan-error
type _44 = Expect<Equal<Assignable<readonly [1, 2], [1, 2]>, TODO>>; // TODO(koan) @koan-error
type _45 = Expect<Equal<Relation<[1, 2], number[]>, TODO>>; // TODO(koan) @koan-error
type _46 = Expect<Equal<Relation<readonly [1, 2], readonly number[]>, TODO>>; // TODO(koan) @koan-error
type _47 = Expect<Equal<StrictEqual<string[], Array<string>>, TODO>>; // TODO(koan) @koan-error
type _48 = Expect<Equal<MutuallyAssignable<string[], Array<string>>, TODO>>; // TODO(koan) @koan-error

// Special types and relation labels (49-60)
type _49 = Expect<Equal<IsAny<any>, TODO>>; // TODO(koan) @koan-error
type _50 = Expect<Equal<IsAny<unknown>, TODO>>; // TODO(koan) @koan-error
type _51 = Expect<Equal<IsNever<never>, TODO>>; // TODO(koan) @koan-error
type _52 = Expect<Equal<IsNever<unknown>, TODO>>; // TODO(koan) @koan-error
type _53 = Expect<Equal<IsUnknown<unknown>, TODO>>; // TODO(koan) @koan-error
type _54 = Expect<Equal<IsUnknown<any>, TODO>>; // TODO(koan) @koan-error
type _55 = Expect<Equal<StrictEqual<any, unknown>, TODO>>; // TODO(koan) @koan-error
type _56 = Expect<Equal<StrictEqual<never, never>, TODO>>; // TODO(koan) @koan-error
type _57 = Expect<Equal<RawRelation<any, string>, TODO>>; // TODO(koan) @koan-error
type _58 = Expect<Equal<Relation<any, string>, TODO>>; // TODO(koan) @koan-error
type _59 = Expect<Equal<Relation<unknown, string>, TODO>>; // TODO(koan) @koan-error
type _60 = Expect<Equal<Relation<never, string>, TODO>>; // TODO(koan) @koan-error
