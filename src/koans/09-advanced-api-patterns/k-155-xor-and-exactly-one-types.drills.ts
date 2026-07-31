import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type AtMostOne,
  type Contact,
  type Credentials,
  type Destination,
  type ExactlyOne,
  type ExclusiveUnion,
  type KeysOfUnion,
  type Normalize,
  type Without,
  type Xor,
  describeCredentials,
  exactlyOnePresent,
  parseContact,
} from "./k-155-xor-and-exactly-one-types.js";

/**
 * GUIDED DRILLS
 * =============
 *
 * Build exclusivity from two operations: require the selected branch and add
 * optional-never properties for keys owned only by alternatives. Repeat the
 * construction for two objects, property choices, and arbitrary object unions.
 */

type Extends<From, To> = [From] extends [To] ? true : false;
type Left = { left: string; shared: boolean };
type Right = { right: number; shared: boolean };
type Pair = Xor<Left, Right>;
type Choice = ExactlyOne<{ email: string; phone: string; slack: string }>;

// Normalization, all-union keys, and binary XOR (1-15)
type _01 = Expect<Equal<Normalize<{ a: 1 } & { b: 2 }>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<keyof ({ a: 1 } | { b: 2 }), TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<KeysOfUnion<{ a: 1 } | { b: 2 }>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<KeysOfUnion<Left | Right>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Without<Right, keyof Left>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Without<Left, keyof Right>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Pair, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Extract<Pair, { left: string }>["right"], TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<Extract<Pair, { right: number }>["left"], TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Extract<Pair, { left: string }>["shared"], TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Extends<{ left: string; shared: true }, Pair>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Extends<{ right: number; shared: false }, Pair>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<Extends<{ left: string; right: number; shared: true }, Pair>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Xor<string, number>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<KeysOfUnion<Credentials>, TODO>>; // TODO(koan) @koan-error

// Exactly-one property choices and preserved common fields (16-30)
type _16 = Expect<Equal<KeysOfUnion<Choice>, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<Extract<Choice, { email: string }>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Extract<Choice, { phone: string }>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Extract<Choice, { slack: string }>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Extract<Choice, { email: string }>["phone"], TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Choice["email"], TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<ExactlyOne<{ a: 1; b: 2 }>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<ExactlyOne<{ a?: 1; b?: 2 }>, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<ExactlyOne<{ id: string; email?: string; phone?: string }, "email" | "phone">, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<Extract<Contact, { email: string }>["label"], TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<Extract<Contact, { phone: string }>["email"], TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<Extends<{ label: string; slack: string }, Contact>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Extends<{ label: string; slack: string; email: string }, Contact>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<ExactlyOne<{ only: Date }>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<ExactlyOne<{ a: 1; b: 2 }, never>, TODO>>; // TODO(koan) @koan-error

// At-most-one and arbitrary exclusive unions (31-45)
type MaybeChoice = AtMostOne<{ email: string; phone: string }>;
type ThreeWay = ExclusiveUnion<{ a: 1 } | { b: 2 } | { c: 3 }>;
type _31 = Expect<Equal<MaybeChoice, TODO>>; // TODO(koan) @koan-error
type _32 = Expect<Equal<KeysOfUnion<MaybeChoice>, TODO>>; // TODO(koan) @koan-error
type _33 = Expect<Equal<Extends<{}, MaybeChoice>, TODO>>; // TODO(koan) @koan-error
type _34 = Expect<Equal<Extends<{ email: string }, MaybeChoice>, TODO>>; // TODO(koan) @koan-error
type _35 = Expect<Equal<Extends<{ email: string; phone: string }, MaybeChoice>, TODO>>; // TODO(koan) @koan-error
type _36 = Expect<Equal<ThreeWay, TODO>>; // TODO(koan) @koan-error
type _37 = Expect<Equal<KeysOfUnion<ThreeWay>, TODO>>; // TODO(koan) @koan-error
type _38 = Expect<Equal<Extract<ThreeWay, { a: 1 }>["b"], TODO>>; // TODO(koan) @koan-error
type _39 = Expect<Equal<Extract<ThreeWay, { b: 2 }>["c"], TODO>>; // TODO(koan) @koan-error
type _40 = Expect<Equal<Extends<{ a: 1 }, ThreeWay>, TODO>>; // TODO(koan) @koan-error
type _41 = Expect<Equal<Extends<{ a: 1; b: 2 }, ThreeWay>, TODO>>; // TODO(koan) @koan-error
type _42 = Expect<Equal<KeysOfUnion<Destination>, TODO>>; // TODO(koan) @koan-error
type _43 = Expect<Equal<Extract<Destination, { file: string }>["url"], TODO>>; // TODO(koan) @koan-error
type _44 = Expect<Equal<Extract<Destination, { url: URL }>["file"], TODO>>; // TODO(koan) @koan-error
type _45 = Expect<Equal<Extract<Destination, { stream: object }>["stream"], TODO>>; // TODO(koan) @koan-error

// API reflection and practical assignment checks (46-60)
type _46 = Expect<Equal<Extract<Credentials, { token: string }>, TODO>>; // TODO(koan) @koan-error
type _47 = Expect<Equal<Extract<Credentials, { username: string }>["password"], TODO>>; // TODO(koan) @koan-error
type _48 = Expect<Equal<Extends<{ token: string }, Credentials>, TODO>>; // TODO(koan) @koan-error
type _49 = Expect<Equal<Extends<{ username: string; password: string }, Credentials>, TODO>>; // TODO(koan) @koan-error
type _50 = Expect<Equal<Extends<{ token: string; username: string; password: string }, Credentials>, TODO>>; // TODO(koan) @koan-error
type _51 = Expect<Equal<Parameters<typeof exactlyOnePresent>[0], TODO>>; // TODO(koan) @koan-error
type _52 = Expect<Equal<Parameters<typeof exactlyOnePresent>[1], TODO>>; // TODO(koan) @koan-error
type _53 = Expect<Equal<ReturnType<typeof exactlyOnePresent>, TODO>>; // TODO(koan) @koan-error
type _54 = Expect<Equal<Parameters<typeof parseContact>, TODO>>; // TODO(koan) @koan-error
type _55 = Expect<Equal<ReturnType<typeof parseContact>, TODO>>; // TODO(koan) @koan-error
type _56 = Expect<Equal<Parameters<typeof describeCredentials>, TODO>>; // TODO(koan) @koan-error
type _57 = Expect<Equal<ReturnType<typeof describeCredentials>, TODO>>; // TODO(koan) @koan-error
type _58 = Expect<Equal<AtMostOne<{ only: string }>, TODO>>; // TODO(koan) @koan-error
type _59 = Expect<Equal<AtMostOne<{}>, TODO>>; // TODO(koan) @koan-error
type _60 = Expect<Equal<ExclusiveUnion<{ common: string; a: 1 } | { common: string; b: 2 }>["common"], TODO>>; // TODO(koan) @koan-error
