import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type AtMostOne,
  type ExactlyOne,
  type ExclusiveUnion,
  type KeysOfUnion,
  type Without,
  type Xor,
} from "./k-155-xor-and-exactly-one-types.js";

/**
 * EDGE CASES AND GOTCHAS
 * ======================
 *
 * Optional never is an absence constraint, but indexed access still includes
 * `undefined` for an omitted optional property. Broad index signatures cannot
 * enumerate one chosen key, and distributive conditionals give `never` their
 * usual bottom-type propagation.
 */

type Extends<From, To> = [From] extends [To] ? true : false;
type IsAny<Value> = 0 extends 1 & Value ? true : false;
type Inclusive = { email: string } | { phone: string };
type Exclusive = Xor<{ email: string }, { phone: string }>;
type Shared = Xor<
  { kind: "left"; value: string; left: true },
  { kind: "right"; value: number; right: true }
>;

// Pre-solved demonstrations explain why the forbidden properties exist.
type _DemoInclusiveBoth = Expect<Equal<Extends<{ email: string; phone: string }, Inclusive>, true>>;
type _DemoExclusiveBoth = Expect<Equal<Extends<{ email: string; phone: string }, Exclusive>, false>>;
type _DemoOptionalRead = Expect<Equal<Extract<Exclusive, { email: string }>["phone"], undefined>>;
type _DemoBroadKey = Expect<Equal<keyof ExactlyOne<Record<string, string>>, string>>;
// Runtime Object.hasOwn counts a present `undefined`; this matches choosing a property whose declared value type itself includes undefined.

// 1. Inclusive unions, optional never, and indexed reads (1-8)
type _01 = Expect<Equal<Extends<{ email: string; phone: string }, Inclusive>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Extends<{ email: string; phone: string }, Exclusive>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Extract<Exclusive, { email: string }>["phone"], TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Required<{ phone?: never }>["phone"], TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Without<{ email: string; phone: string }, "email">, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Extends<{ email: string; phone: undefined }, Exclusive>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<KeysOfUnion<Exclusive>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<keyof Exclusive, TODO>>; // TODO(koan) @koan-error

// 2. Shared keys are not forbidden; unique keys still are (9-16)
type _09 = Expect<Equal<KeysOfUnion<Shared>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Shared["kind"], TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Shared["value"], TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Extract<Shared, { kind: "left" }>["right"], TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<Extends<{ kind: "left"; value: string; left: true }, Shared>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Extends<{ kind: "left"; value: string; left: true; right: true }, Shared>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Xor<{ value: string }, { value: number }>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<ExclusiveUnion<{ common: 0; a: 1 } | { common: 0; b: 2 }>["common"], TODO>>; // TODO(koan) @koan-error

// 3. Empty choices, broad keys, and special types (17-23)
type _17 = Expect<Equal<ExactlyOne<{ a: 1; b: 2 }, never>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<AtMostOne<{ a: 1; b: 2 }, never>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<ExactlyOne<Record<string, string>>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<keyof ExactlyOne<Record<string, string>>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Xor<never, { b: 2 }>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<IsAny<Xor<any, { b: 2 }>>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<KeysOfUnion<never>, TODO>>; // TODO(koan) @koan-error

// 4. Undefined-valued choices and N-way exclusivity (24-30)
type UndefinedChoice = ExactlyOne<{ a: string | undefined; b: number }>;
type ThreeWay = ExclusiveUnion<{ a: 1 } | { b: 2 } | { c: 3 }>;
type _24 = Expect<Equal<Extract<UndefinedChoice, { a: string | undefined }>["a"], TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<Extract<UndefinedChoice, { b: number }>["a"], TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<KeysOfUnion<ThreeWay>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<keyof ThreeWay, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Extends<{ a: 1; c: 3 }, ThreeWay>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<ExclusiveUnion<string | { a: 1 }>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<AtMostOne<{}>, TODO>>; // TODO(koan) @koan-error
