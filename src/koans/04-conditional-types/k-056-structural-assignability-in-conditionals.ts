import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-056: structural assignability in conditionals
 * =============================================================================
 *
 * A conditional `A extends B` reuses TypeScript's ordinary assignability rules.
 * For object types, B describes required capabilities: A may contain additional
 * fields, but every required B field must exist with a compatible value type.
 * This is structural width and depth checking, not exact-shape equality.
 *
 * I read an object check aloud as:
 *
 *   "Could a value known only as A be passed wherever B is required?"
 *
 * Optional fields require less than required fields. Readonly object properties
 * are intentionally permissive in many assignment directions, while readonly
 * arrays prevent mutation and therefore differ from mutable arrays. Index
 * signatures demand compatible values for an open key domain. Function returns
 * are covariant and, under strictFunctionTypes, function-property parameters are
 * contravariant. Classes are usually structural, except compatible private or
 * protected members must originate from the same declaration. Unique-symbol
 * brands exploit that exception-like identity to make otherwise equal data
 * shapes conditionally distinguishable.
 */

export type Assignable<Source, Target> = Source extends Target ? true : false;
export type HasId<T> = T extends { id: PropertyKey } ? true : false;
export type PublicView<T> = T extends { id: infer Id; name: infer Name }
  ? { id: Id; name: Name }
  : never;

export function isIdentified(value: unknown): value is { id: PropertyKey } {
  return typeof value === "object" && value !== null && "id" in value &&
    (["string", "number", "symbol"] as const).includes(typeof value.id as "string" | "number" | "symbol");
}

export function publicEntity(value: { id: PropertyKey; name: string; [key: PropertyKey]: unknown }): { id: PropertyKey; name: string } {
  return { id: value.id, name: value.name };
}

export function isStringRecord(value: unknown): value is Record<string, string> {
  return typeof value === "object" && value !== null && Object.values(value).every(entry => typeof entry === "string");
}

// Part 1: Extra fields are compatible; missing or incompatible fields are not.
type _Main01 = Expect<Equal<Assignable<{ id: number; name: string }, { id: number }>, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<Assignable<{ id: number }, { id: number; name: string }>, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<Assignable<{ id: 1 }, { id: number }>, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<Assignable<{ id: string }, { id: number }>, TODO>>; // TODO(koan) @koan-error

// Part 2: Optionality, readonly, and indexes change the required contract.
type _Main05 = Expect<Equal<Assignable<{ id: number }, { id?: number }>, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<Assignable<{ id?: number }, { id: number }>, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<Assignable<{ readonly id: number }, { id: number }>, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<Assignable<{ id: string; name: string }, Record<string, string>>, TODO>>; // TODO(koan) @koan-error

// Part 3: Containers and functions apply their own variance rules.
type _Main09 = Expect<Equal<Assignable<string[], readonly string[]>, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<Assignable<readonly string[], string[]>, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<Assignable<() => "x", () => string>, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<Assignable<(value: unknown) => void, (value: string) => void>, TODO>>; // TODO(koan) @koan-error

// Part 4: Private members make structurally similar classes nominally distinct.
class MainFirst { private token = 1; value = "x"; }
class MainSecond { private token = 1; value = "x"; }
class MainChild extends MainFirst { extra = true; }
type _Main13 = Expect<Equal<Assignable<MainFirst, { value: string }>, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<Assignable<MainFirst, MainSecond>, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<Assignable<MainChild, MainFirst>, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<Assignable<MainFirst, MainChild>, TODO>>; // TODO(koan) @koan-error

// Part 5: Unique-symbol brands distinguish equal runtime representations.
declare const mainUserBrand: unique symbol;
declare const mainOrderBrand: unique symbol;
type MainUserId = string & { readonly [mainUserBrand]: "UserId" };
type MainOrderId = string & { readonly [mainOrderBrand]: "OrderId" };
type _Main17 = Expect<Equal<Assignable<MainUserId, string>, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<Assignable<string, MainUserId>, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<Assignable<MainUserId, MainOrderId>, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<HasId<{ id: MainUserId; name: string }>, TODO>>; // TODO(koan) @koan-error
