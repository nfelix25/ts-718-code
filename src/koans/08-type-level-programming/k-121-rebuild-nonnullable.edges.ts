import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type { ConditionalNonNullable, KoanNonNullable } from "./k-121-rebuild-nonnullable.js";

/** EDGE CASES: `{}` versus object, top types, void, shallow properties, and generics. */

type N<T> = KoanNonNullable<T>;
type C<T> = ConditionalNonNullable<T>;
type IsAny<T> = 0 extends 1 & T ? true : false;

// Pre-solved demonstrations.
type _DemoUnknownIntersection = Expect<Equal<N<unknown>, {}>>;
type _DemoUnknownConditional = Expect<Equal<C<unknown>, unknown>>;
type _DemoFalsyValuesRemain = Expect<Equal<N<0 | "" | false | null>, 0 | "" | false>>;
type _DemoShallowOnly = Expect<Equal<N<{ value: null } | null>, { value: null }>>;
type _DemoNever = Expect<Equal<N<null | undefined>, never>>;
type _DemoAnyClassified = Expect<Equal<IsAny<N<any>>, true>>;

// 1. `{}` is non-nullish, not non-primitive (1-8)
type _01 = Expect<Equal<string extends {} ? true : false, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<number extends {} ? true : false, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<boolean extends {} ? true : false, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<symbol extends {} ? true : false, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<null extends {} ? true : false, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<undefined extends {} ? true : false, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<string extends object ? true : false, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<{ id: 1 } extends object ? true : false, TODO>>; // TODO(koan) @koan-error

// 2. Intersection and conditional forms diverge on top-like inputs (9-16)
type _09 = Expect<Equal<N<unknown>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<C<unknown>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<IsAny<N<any>>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<IsAny<C<any>>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<N<never>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<C<never>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<N<void>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<C<void>, TODO>>; // TODO(koan) @koan-error

// 3. Outer null removal does not traverse containers (17-23)
type _17 = Expect<Equal<N<{ value: null } | null>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<N<{ value?: string | null } | undefined>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<N<{ value?: string | null } | undefined>["value"], TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<N<Array<string | null> | null>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<N<Array<string | null> | null>[number], TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<N<Promise<string | null> | undefined>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<Awaited<N<Promise<string | null> | undefined>>, TODO>>; // TODO(koan) @koan-error

// 4. Idempotence, brands, and intersections (24-30)
type UserId = string & { readonly __brand: "UserId" };
type _24 = Expect<Equal<N<N<string | null>>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<N<UserId | null>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<N<string & {}>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<N<unknown> & object, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<N<string | null> & number, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<C<string | null> & {}, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<N<null & { impossible: true }>, TODO>>; // TODO(koan) @koan-error
