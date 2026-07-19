import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type { ConditionalNonNullable, KoanNonNullable } from "./k-121-rebuild-nonnullable.js";

/** GUIDED DRILLS: remove nullish members across literals, objects, generics, and top types. */

type N<T> = KoanNonNullable<T>;
type C<T> = ConditionalNonNullable<T>;
type IsAny<T> = 0 extends 1 & T ? true : false;

// Nullish union filtering (1-12)
type _01 = Expect<Equal<N<string>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<N<string | null>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<N<string | undefined>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<N<string | null | undefined>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<N<null>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<N<undefined>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<N<null | undefined>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<N<number | null>, TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<N<boolean | undefined>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<N<symbol | null | undefined>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<N<bigint | null>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<N<string | number | null | undefined>, TODO>>; // TODO(koan) @koan-error

// Falsy but present values (13-24)
type _13 = Expect<Equal<N<0 | null>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<N<"" | undefined>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<N<false | null>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<N<0 | "" | false | null | undefined>, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<N<1 | 2 | null>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<N<"a" | "b" | undefined>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<N<true | false | null>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<N<typeof NaN | null>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<N<{} | null>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<N<object | undefined>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<N<Function | null>, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<N<readonly [] | undefined>, TODO>>; // TODO(koan) @koan-error

// Structured values and shallow behavior (25-36)
type _25 = Expect<Equal<N<{ id: 1 } | null>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<N<{ value?: string | null } | null>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<N<{ value?: string | null } | null>["value"], TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<N<N<{ value?: string | null } | null>["value"]>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<N<Array<string | null> | null>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<N<Array<string | null> | null>[number], TODO>>; // TODO(koan) @koan-error
type _31 = Expect<Equal<N<Promise<string | null> | null>, TODO>>; // TODO(koan) @koan-error
type _32 = Expect<Equal<N<Map<string, number | null> | undefined>, TODO>>; // TODO(koan) @koan-error
type _33 = Expect<Equal<N<(() => string | null) | undefined>, TODO>>; // TODO(koan) @koan-error
type _34 = Expect<Equal<ReturnType<N<(() => string | null) | undefined>>, TODO>>; // TODO(koan) @koan-error
type _35 = Expect<Equal<N<{ a: null } | { a: string }>, TODO>>; // TODO(koan) @koan-error
type _36 = Expect<Equal<N<{ a: null } | null>, TODO>>; // TODO(koan) @koan-error

// Conditional spelling on ordinary unions (37-48)
type _37 = Expect<Equal<C<string | null>, TODO>>; // TODO(koan) @koan-error
type _38 = Expect<Equal<C<number | undefined>, TODO>>; // TODO(koan) @koan-error
type _39 = Expect<Equal<C<boolean | null | undefined>, TODO>>; // TODO(koan) @koan-error
type _40 = Expect<Equal<C<null | undefined>, TODO>>; // TODO(koan) @koan-error
type _41 = Expect<Equal<C<{ id: 1 } | null>, TODO>>; // TODO(koan) @koan-error
type _42 = Expect<Equal<C<readonly [1] | undefined>, TODO>>; // TODO(koan) @koan-error
type _43 = Expect<Equal<C<never>, TODO>>; // TODO(koan) @koan-error
type _44 = Expect<Equal<C<string | never>, TODO>>; // TODO(koan) @koan-error
type _45 = Expect<Equal<C<unknown>, TODO>>; // TODO(koan) @koan-error
type _46 = Expect<Equal<IsAny<C<any>>, TODO>>; // TODO(koan) @koan-error
type _47 = Expect<Equal<C<void>, TODO>>; // TODO(koan) @koan-error
type _48 = Expect<Equal<C<{}>, TODO>>; // TODO(koan) @koan-error

// Intersection form and idempotence (49-60)
type _49 = Expect<Equal<N<unknown>, TODO>>; // TODO(koan) @koan-error
type _50 = Expect<Equal<IsAny<N<any>>, TODO>>; // TODO(koan) @koan-error
type _51 = Expect<Equal<N<never>, TODO>>; // TODO(koan) @koan-error
type _52 = Expect<Equal<N<{}>, TODO>>; // TODO(koan) @koan-error
type _53 = Expect<Equal<N<object>, TODO>>; // TODO(koan) @koan-error
type _54 = Expect<Equal<N<N<string | null>>, TODO>>; // TODO(koan) @koan-error
type _55 = Expect<Equal<N<N<unknown>>, TODO>>; // TODO(koan) @koan-error
type _56 = Expect<Equal<N<string | number> & string, TODO>>; // TODO(koan) @koan-error
type _57 = Expect<Equal<N<string | null> | undefined, TODO>>; // TODO(koan) @koan-error
type _58 = Expect<Equal<Exclude<string | null, null | undefined>, TODO>>; // TODO(koan) @koan-error
type _59 = Expect<Equal<Extract<string | null, {}>, TODO>>; // TODO(koan) @koan-error
type _60 = Expect<Equal<N<{ readonly id?: string } | null>, TODO>>; // TODO(koan) @koan-error
