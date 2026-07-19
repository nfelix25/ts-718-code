import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type { KoanPartial, KoanRequired } from "./k-122-rebuild-partial-and-required.js";

/** GUIDED DRILLS: vary presence, explicit undefined, readonly, tuples, arrays, and unions. */

type P<T> = KoanPartial<T>;
type R<T> = KoanRequired<T>;

// Flat object modifiers (1-12)
type _01 = Expect<Equal<P<{ a: 1 }>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<P<{ a: 1; b: 2 }>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<R<{ a?: 1 }>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<R<{ a?: 1; b?: 2 }>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<P<{}>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<R<{}>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<keyof P<{ a: 1; b: 2 }>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<keyof R<{ a?: 1; b?: 2 }>, TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<P<{ a?: 1 }>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<R<{ a: 1 }>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<P<P<{ a: 1 }>>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<R<R<{ a?: 1 }>>, TODO>>; // TODO(koan) @koan-error

// Presence versus undefined (13-24)
type _13 = Expect<Equal<R<{ a?: string }>["a"], TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<R<{ a?: string | undefined }>["a"], TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<R<{ a: string | undefined }>["a"], TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<P<{ a: string }>["a"], TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<P<{ a: string | undefined }>["a"], TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<P<{ a: never }>["a"], TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<R<{ a?: never }>["a"], TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<P<{ a: null }>["a"], TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<R<{ a?: null }>["a"], TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<R<P<{ a: string }>>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<P<R<{ a?: string }>>, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<R<P<{ a: string | undefined }>>, TODO>>; // TODO(koan) @koan-error

// Readonly and nested shallow behavior (25-36)
type _25 = Expect<Equal<P<{ readonly a: 1; b: 2 }>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<R<{ readonly a?: 1; b?: 2 }>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<P<Readonly<{ a: 1; b: 2 }>>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<R<Partial<Readonly<{ a: 1; b: 2 }>>>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<P<{ nested: { required: 1 } }>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<P<{ nested: { required: 1 } }>["nested"], TODO>>; // TODO(koan) @koan-error
type _31 = Expect<Equal<R<{ nested?: { optional?: 1 } }>, TODO>>; // TODO(koan) @koan-error
type _32 = Expect<Equal<R<{ nested?: { optional?: 1 } }>["nested"], TODO>>; // TODO(koan) @koan-error
type _33 = Expect<Equal<P<Record<"a" | "b", number>>, TODO>>; // TODO(koan) @koan-error
type _34 = Expect<Equal<R<P<Record<"a" | "b", number>>>, TODO>>; // TODO(koan) @koan-error
type _35 = Expect<Equal<P<{ readonly nested: { id: 1 } }>, TODO>>; // TODO(koan) @koan-error
type _36 = Expect<Equal<R<{ readonly nested?: { id?: 1 } }>, TODO>>; // TODO(koan) @koan-error

// Arrays and tuples (37-48)
type _37 = Expect<Equal<P<[string, number]>, TODO>>; // TODO(koan) @koan-error
type _38 = Expect<Equal<R<[string?, number?]>, TODO>>; // TODO(koan) @koan-error
type _39 = Expect<Equal<P<readonly [string, number]>, TODO>>; // TODO(koan) @koan-error
type _40 = Expect<Equal<R<readonly [string?, number?]>, TODO>>; // TODO(koan) @koan-error
type _41 = Expect<Equal<P<[head: string, tail?: number]>, TODO>>; // TODO(koan) @koan-error
type _42 = Expect<Equal<R<[head?: string, tail?: number]>, TODO>>; // TODO(koan) @koan-error
type _43 = Expect<Equal<P<string[]>, TODO>>; // TODO(koan) @koan-error
type _44 = Expect<Equal<R<Array<string | undefined>>, TODO>>; // TODO(koan) @koan-error
type _45 = Expect<Equal<P<readonly string[]>, TODO>>; // TODO(koan) @koan-error
type _46 = Expect<Equal<R<readonly (string | undefined)[]>, TODO>>; // TODO(koan) @koan-error
type _47 = Expect<Equal<P<[]>, TODO>>; // TODO(koan) @koan-error
type _48 = Expect<Equal<R<readonly []>, TODO>>; // TODO(koan) @koan-error

// Object unions and special types (49-60)
type V = { kind: "a"; a: number } | { kind: "b"; b?: string };
type _49 = Expect<Equal<P<V>, TODO>>; // TODO(koan) @koan-error
type _50 = Expect<Equal<R<V>, TODO>>; // TODO(koan) @koan-error
type _51 = Expect<Equal<P<{ a: 1 } | { b: 2 }>, TODO>>; // TODO(koan) @koan-error
type _52 = Expect<Equal<R<{ a?: 1 } | { b?: 2 }>, TODO>>; // TODO(koan) @koan-error
type _53 = Expect<Equal<P<never>, TODO>>; // TODO(koan) @koan-error
type _54 = Expect<Equal<R<never>, TODO>>; // TODO(koan) @koan-error
type _55 = Expect<Equal<P<unknown>, TODO>>; // TODO(koan) @koan-error
type _56 = Expect<Equal<R<unknown>, TODO>>; // TODO(koan) @koan-error
type _57 = Expect<Equal<P<any>, TODO>>; // TODO(koan) @koan-error
type _58 = Expect<Equal<R<any>, TODO>>; // TODO(koan) @koan-error
type _59 = Expect<Equal<P<null>, TODO>>; // TODO(koan) @koan-error
type _60 = Expect<Equal<R<undefined>, TODO>>; // TODO(koan) @koan-error
