import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type AllOrNone,
  type AtLeastOne,
  type ConnectionConfig,
  type Exact,
  type ExtraKeys,
  type IsExactShape,
  type Normalize,
  type UpdateRequest,
  type UserPatch,
  defineConnection,
  parseUserPatch,
} from "./k-156-exact-object-and-at-least-one-types.js";

/**
 * GUIDED DRILLS
 * =============
 *
 * Practice cardinality and exactness independently. AtLeastOne changes property
 * presence inside a controlled subset; Exact compares a concrete generic
 * candidate's complete key set against an allowed shape.
 */

type Extends<From, To> = [From] extends [To] ? true : false;
type Pair = AtLeastOne<{ a?: 1; b?: 2 }>;
type Contact = AtLeastOne<
  { id: string; email?: string; phone?: string },
  "email" | "phone"
>;
type Good = { host: string; port: number; secure: true };
type Extra = Good & { debug: boolean };

// At-least-one choice members and assignment behavior (1-15)
type _01 = Expect<Equal<Pair, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<keyof Pair, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Extract<Pair, { a: 1 }>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Extract<Pair, { b: 2 }>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Pair["a"], TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Extends<{}, Pair>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Extends<{ a: 1 }, Pair>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Extends<{ b: 2 }, Pair>, TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<Extends<{ a: 1; b: 2 }, Pair>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<AtLeastOne<{ only?: number }>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<AtLeastOne<{ a: 1; b: 2 }>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<AtLeastOne<{ a?: 1; b?: 2; c?: 3 }, "a" | "b">["c"], TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<AtLeastOne<{ a?: 1; b?: 2 }, never>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<AtLeastOne<{}, never>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Normalize<{ a: 1 } & { b: 2 }>, TODO>>; // TODO(koan) @koan-error

// Subset choices, common fields, and all-or-none groups (16-30)
type Headers = AllOrNone<
  { requestId: string; username?: string; password?: string },
  "username" | "password"
>;
type _16 = Expect<Equal<Contact, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<Extract<Contact, { email: string }>["id"], TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Extract<Contact, { email: string }>["phone"], TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Extract<Contact, { phone: string }>["email"], TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Extract<UpdateRequest, { name: string }>["id"], TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<UpdateRequest["active"], TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<keyof UserPatch, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<UserPatch["email"], TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<Headers, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<Extract<Headers, { username: string }>["password"], TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<Extract<Headers, { username?: never }>["requestId"], TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<Extends<{ requestId: string }, Headers>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Extends<{ requestId: string; username: string }, Headers>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<Extends<{ requestId: string; username: string; password: string }, Headers>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<AllOrNone<{}>, TODO>>; // TODO(koan) @koan-error

// Candidate key comparison and exact-shape classification (31-45)
type _31 = Expect<Equal<ExtraKeys<Good, ConnectionConfig>, TODO>>; // TODO(koan) @koan-error
type _32 = Expect<Equal<ExtraKeys<Extra, ConnectionConfig>, TODO>>; // TODO(koan) @koan-error
type _33 = Expect<Equal<ExtraKeys<{ host: string; port: number; other: 1 }, ConnectionConfig>, TODO>>; // TODO(koan) @koan-error
type _34 = Expect<Equal<ExtraKeys<ConnectionConfig, ConnectionConfig>, TODO>>; // TODO(koan) @koan-error
type _35 = Expect<Equal<IsExactShape<Good, ConnectionConfig>, TODO>>; // TODO(koan) @koan-error
type _36 = Expect<Equal<IsExactShape<Extra, ConnectionConfig>, TODO>>; // TODO(koan) @koan-error
type _37 = Expect<Equal<IsExactShape<ConnectionConfig, ConnectionConfig>, TODO>>; // TODO(koan) @koan-error
type _38 = Expect<Equal<IsExactShape<{ host: string }, ConnectionConfig>, TODO>>; // TODO(koan) @koan-error
type _39 = Expect<Equal<IsExactShape<{ host: "localhost"; port: 5432 }, ConnectionConfig>, TODO>>; // TODO(koan) @koan-error
type _40 = Expect<Equal<Exact<ConnectionConfig, Good>, TODO>>; // TODO(koan) @koan-error
type _41 = Expect<Equal<Exact<ConnectionConfig, Extra>["debug"], TODO>>; // TODO(koan) @koan-error
type _42 = Expect<Equal<Exact<ConnectionConfig, Good>["secure"], TODO>>; // TODO(koan) @koan-error
type _43 = Expect<Equal<ExtraKeys<{ 0: string; name: string }, { name: string }>, TODO>>; // TODO(koan) @koan-error
declare const extraSymbol: unique symbol;
type _44 = Expect<Equal<ExtraKeys<{ name: string; [extraSymbol]: true }, { name: string }>, TODO>>; // TODO(koan) @koan-error
type _45 = Expect<Equal<IsExactShape<{ name: string }, Record<string, unknown>>, TODO>>; // TODO(koan) @koan-error

// Constructor/parser reflection and practical boundary types (46-60)
type _46 = Expect<Equal<Parameters<typeof defineConnection>, TODO>>; // TODO(koan) @koan-error
type _47 = Expect<Equal<ReturnType<typeof defineConnection>, TODO>>; // TODO(koan) @koan-error
type _48 = Expect<Equal<Parameters<typeof parseUserPatch>, TODO>>; // TODO(koan) @koan-error
type _49 = Expect<Equal<ReturnType<typeof parseUserPatch>, TODO>>; // TODO(koan) @koan-error
type _50 = Expect<Equal<Extends<{ name: string }, UserPatch>, TODO>>; // TODO(koan) @koan-error
type _51 = Expect<Equal<Extends<{ email: string; active: boolean }, UserPatch>, TODO>>; // TODO(koan) @koan-error
type _52 = Expect<Equal<Extends<{}, UserPatch>, TODO>>; // TODO(koan) @koan-error
type _53 = Expect<Equal<Extends<{ name: string; extra: true }, UserPatch>, TODO>>; // TODO(koan) @koan-error
type _54 = Expect<Equal<IsExactShape<{ name: string; extra: true }, UserPatch>, TODO>>; // TODO(koan) @koan-error
type _55 = Expect<Equal<ExtraKeys<{ name: string; extra: true }, UserPatch>, TODO>>; // TODO(koan) @koan-error
type _56 = Expect<Equal<AtLeastOne<{ readonly a?: 1; readonly b?: 2 }>, TODO>>; // TODO(koan) @koan-error
type _57 = Expect<Equal<Extract<AtLeastOne<{ readonly a?: 1; readonly b?: 2 }>, { readonly a: 1 }>["a"], TODO>>; // TODO(koan) @koan-error
type _58 = Expect<Equal<AllOrNone<{ a?: string; b?: number }>["a"], TODO>>; // TODO(koan) @koan-error
type _59 = Expect<Equal<IsExactShape<{}, {}>, TODO>>; // TODO(koan) @koan-error
type _60 = Expect<Equal<ExtraKeys<{}, {}>, TODO>>; // TODO(koan) @koan-error
