import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-061: never in conditional types
 * =============================================================================
 *
 * `never` is the bottom type and the empty union. As a concrete source it is
 * assignable to every type, so `never extends string ? Y : N` chooses Y. As a
 * naked generic union input, however, it has zero members to distribute over,
 * so `Filter<never>` produces never without selecting either visible branch.
 *
 * I read generic never aloud as:
 *
 *   "There are no members to run this conditional for, so there are no branch
 *    results to union."
 *
 * That makes never ideal for union filtering: rejected members contribute
 * nothing. It also makes naive `T extends never` detection fail, because never
 * disappears before returning true. `[T] extends [never]` asks an aggregate
 * question and reliably detects it. Never is erased from unions, propagates
 * through many distributed transforms, and marks unreachable/exhaustive states.
 * A never-valued property still has a key; a key remapped to never is removed.
 */

export type IsNever<T> = [T] extends [never] ? true : false;
export type NaiveIsNever<T> = T extends never ? true : false;
export type Keep<T, Constraint> = T extends Constraint ? T : never;
export type ReplaceNever<T, Replacement> = [T] extends [never] ? Replacement : T;
export type WrapMembers<T> = T extends unknown ? { value: T } : never;

export function fail(message: string): never {
  throw new Error(message);
}

export function assertNever(value: never): never {
  throw new Error(`Unexpected value: ${String(value)}`);
}

export function requireValue<T>(value: T | null | undefined, message = "Missing value"): T {
  return value ?? fail(message);
}

export function keepStrings(values: readonly unknown[]): string[] {
  return values.filter((value): value is string => typeof value === "string");
}

// Part 1: Concrete never is assignable to every target.
type _Main01 = Expect<Equal<never extends string ? true : false, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<never extends object ? "yes" : "no", TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<never extends never ? true : false, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<string extends never ? true : false, TODO>>; // TODO(koan) @koan-error

// Part 2: Naked generic never distributes over zero members.
type _Main05 = Expect<Equal<Keep<never, string>, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<WrapMembers<never>, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<NaiveIsNever<never>, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<Keep<string | never, string>, TODO>>; // TODO(koan) @koan-error

// Part 3: Tuple wrapping detects and replaces the empty union.
type _Main09 = Expect<Equal<IsNever<never>, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<IsNever<string>, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<ReplaceNever<never, "empty">, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<ReplaceNever<string, "empty">, TODO>>; // TODO(koan) @koan-error

// Part 4: Never filters rejected union members and vanishes from unions.
type _Main13 = Expect<Equal<Keep<string | number | boolean, string>, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<Keep<"a" | 1 | "b", string>, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<string | never, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<never | never, TODO>>; // TODO(koan) @koan-error

// Part 5: Never values and never destinations have different object effects.
type MainValueNever = { [K in "keep" | "drop"]: K extends "drop" ? never : K };
type MainKeyNever = { [K in "keep" | "drop" as K extends "drop" ? never : K]: K };
type _Main17 = Expect<Equal<MainValueNever, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<keyof MainValueNever, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<MainKeyNever, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<keyof MainKeyNever, TODO>>; // TODO(koan) @koan-error
