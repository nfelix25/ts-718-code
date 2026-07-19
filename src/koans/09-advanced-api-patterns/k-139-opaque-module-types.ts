import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 139 - OPAQUE MODULE TYPES
 * =================================
 *
 * A brand is most effective when consumers cannot manufacture its marker shape.
 * An opaque module type keeps the unique-symbol key private and exports only the
 * named type plus trusted constructors and operations. Outside this module the
 * representation remains usable in the safe direction, but its evidence cannot
 * be written structurally because the key cannot be named.
 *
 * Read `Cents` aloud as: "a number that crossed this module's money boundary."
 * `makeCents` creates the proof, `addCents` preserves it, and `centsValue` opts
 * back into an ordinary number. Opaqueness is an API architecture, not merely an
 * intersection spelling: who can construct and unwrap the value is the design.
 */

declare const opaque: unique symbol;

export type EmailAddress = string & { readonly [opaque]: "EmailAddress" };
export type Cents = number & { readonly [opaque]: "Cents" };
export type Meters = number & { readonly [opaque]: "Meters" };
export type SessionToken = Readonly<{ value: string }> & { readonly [opaque]: "SessionToken" };

type Extends<From, To> = [From] extends [To] ? true : false;

// Part 1: The public type exposes its representation only in the safe direction.
type _01 = Expect<Equal<Extends<EmailAddress, string>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Extends<string, EmailAddress>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Extends<Cents, number>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Extends<number, Cents>, TODO>>; // TODO(koan) @koan-error

// Part 2: Opaque identities distinguish equal runtime representations.
type _05 = Expect<Equal<Extends<Cents, Meters>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Extends<Meters, Cents>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Equal<Cents, Meters>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Cents | Meters extends number ? true : false, TODO>>; // TODO(koan) @koan-error

// Part 3: Exported signatures reveal where proof enters, stays, and leaves.
type _09 = Expect<Equal<ReturnType<typeof makeEmailAddress>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Parameters<typeof addCents>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<ReturnType<typeof addCents>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<ReturnType<typeof centsValue>, TODO>>; // TODO(koan) @koan-error

// Part 4: Type-preserving wrappers retain opacity; representation operations do not.
type _13 = Expect<Equal<Promise<Cents> extends Promise<infer Value> ? Value : never, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<ReadonlyArray<EmailAddress>[number], TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<ReturnType<(amount: Cents) => number>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<NonNullable<Cents | null>, TODO>>; // TODO(koan) @koan-error

// Part 5: Structural and union normalization rules still apply around the boundary.
type _17 = Expect<Equal<EmailAddress | string, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Cents | number, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Extends<SessionToken, { readonly value: string }>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Extract<Cents | Meters, Cents>, TODO>>; // TODO(koan) @koan-error

export function makeEmailAddress(value: string): EmailAddress {
  const normalized = value.trim().toLowerCase();
  if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/u.test(normalized)) {
    throw new TypeError("invalid email address");
  }
  return normalized as EmailAddress;
}

export function makeCents(value: number): Cents {
  if (!Number.isSafeInteger(value) || value < 0) {
    throw new RangeError("cents must be a non-negative safe integer");
  }
  return value as Cents;
}

export function makeMeters(value: number): Meters {
  if (!Number.isFinite(value) || value < 0) {
    throw new RangeError("meters must be finite and non-negative");
  }
  return value as Meters;
}

export function addCents(left: Cents, right: Cents): Cents {
  return makeCents(left + right);
}

export function centsValue(value: Cents): number {
  return value;
}

export function makeSessionToken(value: string): SessionToken {
  if (value.length < 8) throw new TypeError("session token is too short");
  return Object.freeze({ value }) as SessionToken;
}
