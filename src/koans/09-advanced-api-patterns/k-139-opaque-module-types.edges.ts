import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type { Cents, EmailAddress, Meters, SessionToken } from "./k-139-opaque-module-types.js";
import { addCents, centsValue, makeCents } from "./k-139-opaque-module-types.js";

/** EDGE CASES: private construction, assertion escape hatches, union widening, intersections, variance, and erasure. */

type Extends<From, To> = [From] extends [To] ? true : false;

// Pre-solved demonstrations distinguish opacity from runtime encapsulation.
type _DemoBaseDirection = Expect<Equal<Extends<Cents, number>, true>>;
type _DemoConstructor = Expect<Equal<ReturnType<typeof makeCents>, Cents>>;
type _DemoPreserver = Expect<Equal<ReturnType<typeof addCents>, Cents>>;
type _DemoUnwrapper = Expect<Equal<ReturnType<typeof centsValue>, number>>;
type _DemoUnionWidening = Expect<Equal<Extends<Cents | number, number>, true>>;
type _DemoUnionReverse = Expect<Equal<Extends<number, Cents | number>, true>>;
// Mutual assignability does not guarantee strict representation equality under `Equal`.
// `123 as Cents` remains possible: assertions are an explicit escape from proof checking.

// 1. Consumers can observe but cannot name the private evidence key (1-8)
type _01 = Expect<Equal<Extends<Cents, number>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Extends<number, Cents>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Extends<SessionToken, { readonly value: string }>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Extends<{ readonly value: string }, SessionToken>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<"value" extends keyof SessionToken ? true : false, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<symbol extends keyof SessionToken ? true : false, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Extract<keyof SessionToken, symbol> extends symbol ? true : false, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<SessionToken["value"], TODO>>; // TODO(koan) @koan-error

// 2. Ordinary representation operations lose evidence unless an API reapplies it (9-16)
type _09 = Expect<Equal<ReturnType<(amount: Cents) => number>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<ReturnType<(distance: Meters) => number>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Cents extends number ? number : never, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Meters extends number ? `${Meters}` : never, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<Uppercase<EmailAddress>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<ReturnType<typeof addCents>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<ReturnType<typeof centsValue>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Parameters<typeof addCents>[number], TODO>>; // TODO(koan) @koan-error

// 3. Union normalization can erase a narrower opaque member before filtering (17-23)
type _17 = Expect<Equal<Cents | number, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<EmailAddress | string, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<SessionToken | { readonly value: string }, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Extract<Cents | number, Cents>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Extract<Cents | Meters, Cents>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<Exclude<Cents | Meters, Cents>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<NonNullable<EmailAddress | null | undefined>, TODO>>; // TODO(koan) @koan-error

// 4. Intersections and function variance expose nominal and structural pressure (24-30)
type _24 = Expect<Equal<Cents & Meters, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<Extends<Cents & Meters, never>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<Extends<(value: number) => void, (value: Cents) => void>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<Extends<(value: Cents) => void, (value: number) => void>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Extends<() => Cents, () => number>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<Extends<() => number, () => Cents>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<Readonly<Cents>, TODO>>; // TODO(koan) @koan-error
