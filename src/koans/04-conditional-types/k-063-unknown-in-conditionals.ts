import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-063: unknown in conditional types
 * =============================================================================
 *
 * `unknown` is the safe top type. Every type is assignable to unknown, but a
 * value known only as unknown is not assignable to a narrower type without a
 * proof. Conditionals preserve that directionality: `T extends unknown` accepts
 * every distributed member, while `unknown extends T` is true only for top-like
 * targets such as unknown and any.
 *
 * I read the two directions aloud as:
 *
 *   "T extends unknown: can this value fit the safe top? Yes."
 *   "unknown extends T: can an entirely unverified value fit T? Usually no."
 *
 * Unknown absorbs unions (`unknown | T` is unknown) and disappears from
 * intersections (`unknown & T` is T), so normalization may erase a union before
 * distribution begins. Unlike any, unknown chooses deterministic conditional
 * branches and does not silently flow through property access. A detector must
 * rule out any first because `unknown extends any` is also true. `keyof unknown`
 * is never, mapped views are empty, and runtime boundary code must narrow before
 * reading. This makes unknown the correct default for untrusted external data.
 */

export type IsAny<T> = 0 extends (1 & T) ? true : false;
export type IsUnknown<T> = IsAny<T> extends true
  ? false
  : unknown extends T ? true : false;
export type UnknownRelation<T> = T extends unknown ? "fits-top" : "impossible";
export type AcceptsUnknown<T> = unknown extends T ? true : false;
export type SafeCategory<T> = IsAny<T> extends true ? "any" : IsUnknown<T> extends true ? "unknown" : T extends string ? "string" : "other";

export interface SafeUser { id: number; name: string }

export function parseUser(value: unknown): SafeUser | undefined {
  if (typeof value !== "object" || value === null) return undefined;
  if (!("id" in value) || !("name" in value)) return undefined;
  return typeof value.id === "number" && typeof value.name === "string"
    ? { id: value.id, name: value.name }
    : undefined;
}

export function safeUpper(value: unknown): string | undefined {
  return typeof value === "string" ? value.toUpperCase() : undefined;
}

export function safeOwnKeys(value: unknown): PropertyKey[] {
  return typeof value === "object" && value !== null ? Reflect.ownKeys(value) : [];
}

// Part 1: Assignability to and from the safe top is directional.
type _Main01 = Expect<Equal<string extends unknown ? true : false, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<unknown extends string ? true : false, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<unknown extends unknown ? true : false, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<never extends unknown ? true : false, TODO>>; // TODO(koan) @koan-error

// Part 2: Generic conditionals over unknown remain deterministic.
type _Main05 = Expect<Equal<UnknownRelation<string>, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<UnknownRelation<unknown>, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<AcceptsUnknown<string>, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<AcceptsUnknown<unknown>, TODO>>; // TODO(koan) @koan-error

// Part 3: Union absorption and intersection identity happen before checking.
type _Main09 = Expect<Equal<unknown | string, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<unknown & string, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<UnknownRelation<unknown | string>, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<UnknownRelation<unknown & string>, TODO>>; // TODO(koan) @koan-error

// Part 4: IsUnknown excludes any before testing top-like assignability.
type _Main13 = Expect<Equal<IsUnknown<unknown>, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<IsUnknown<any>, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<IsUnknown<never>, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<IsUnknown<string>, TODO>>; // TODO(koan) @koan-error

// Part 5: Unknown exposes no safe keys until narrowed.
type _Main17 = Expect<Equal<keyof unknown, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<{ [K in keyof unknown]: K }, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<SafeCategory<unknown>, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<SafeCategory<any>, TODO>>; // TODO(koan) @koan-error
