import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-074: template literal fundamentals
 * =============================================================================
 *
 * A template literal type describes strings with compile-time structure. Fixed
 * text stays fixed, while `${T}` substitutes every string representation
 * permitted by T. The type-level syntax mirrors runtime template strings but
 * operates over types rather than values.
 *
 * I read `` `user:${Id}` `` aloud as:
 *
 *   "A string beginning with user-colon, followed by the textual form of Id."
 *
 * Literal substitutions stay literal: `${42}` is `"42"`. Broad primitives
 * create pattern types: `${number}` means strings TypeScript recognizes as
 * numeric text, while `${boolean}` is the finite union `"true" | "false"`.
 * `string` makes that substitution segment unconstrained, and an entirely
 * unconstrained segment simplifies to `string`. The legal interpolation domain
 * is string, number, bigint, boolean, null, or undefined. Symbol and arbitrary
 * object types are excluded even though some runtime string conversions exist.
 * `never` contributes no possible string.
 */

export type Interpolatable = string | number | bigint | boolean | null | undefined;
export type ToText<Value extends Interpolatable> = `${Value}`;
export type Label<Value extends Interpolatable> = `value:${Value}`;
export type Suffixed<Value extends Interpolatable> = `${Value}:done`;
export type Coordinate<X extends number, Y extends number> = `${X},${Y}`;
export type Flag<Name extends string, Enabled extends boolean> = `${Name}:${Enabled}`;

export function label<const Value extends Interpolatable>(value: Value): Label<Value> {
  return `value:${value}` as Label<Value>;
}

export function coordinate<const X extends number, const Y extends number>(
  x: X,
  y: Y,
): Coordinate<X, Y> {
  return `${x},${y}` as Coordinate<X, Y>;
}

export function flag<const Name extends string, const Enabled extends boolean>(
  name: Name,
  enabled: Enabled,
): Flag<Name, Enabled> {
  return `${name}:${enabled}` as Flag<Name, Enabled>;
}

export function suffix<const Value extends Interpolatable>(value: Value): Suffixed<Value> {
  return `${value}:done` as Suffixed<Value>;
}

// Part 1: fixed segments and literal substitutions produce literal strings.
type _Main01 = Expect<Equal<`hello`, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<`${"hello"}`, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<Label<"ready">, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<Suffixed<7>, TODO>>; // TODO(koan) @koan-error

// Part 2: primitive literals convert to their canonical textual types.
type _Main05 = Expect<Equal<ToText<42>, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<ToText<-3.5>, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<ToText<99n>, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<ToText<true>, TODO>>; // TODO(koan) @koan-error

// Part 3: nullish values also have literal string representations.
type _Main09 = Expect<Equal<ToText<false>, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<ToText<null>, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<ToText<undefined>, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<Label<null>, TODO>>; // TODO(koan) @koan-error

// Part 4: broad primitives describe families of strings.
type _Main13 = Expect<Equal<ToText<string>, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<ToText<boolean>, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<Label<number>, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<Flag<string, true>, TODO>>; // TODO(koan) @koan-error

// Part 5: several substitutions build a structured string contract.
type _Main17 = Expect<Equal<Coordinate<3, 4>, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<Coordinate<number, 0>, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<Flag<"cache", boolean>, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<ToText<never>, TODO>>; // TODO(koan) @koan-error
