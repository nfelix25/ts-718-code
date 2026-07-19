import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-049: mapping object unions
 * =============================================================================
 *
 * A homomorphic generic mapped type preserves the outer structure of its input.
 * When `T` is an object union, `{ [K in keyof T]: F<T[K]> }` maps each union
 * member independently and returns a union of transformed members. It does not
 * first flatten every possible property into one large object.
 *
 * I read the operation aloud as:
 *
 *   "For each possible object member of T, transform that member's own fields,
 *    then keep the transformed alternatives as a union."
 *
 * This is why `Partial`, `Readonly`, and homomorphic wrappers preserve variant
 * structure. Yet `keyof (A | B)` and direct unguarded reads expose only keys
 * safe on every member. A concrete mapping over that common key union is a
 * different operation: it constructs one common-view object. Key remapping can
 * preserve or remove discriminants per member, affecting whether later control
 * flow can recover the original correlation.
 */

export type BoxProperties<T> = {
  [K in keyof T]: { value: T[K] }
};

export type RemoveDiscriminant<T> = {
  [K in keyof T as K extends "kind" ? never : K]: T[K]
};

export function boxProperties<T extends object>(value: T): BoxProperties<T> {
  return Object.fromEntries(
    Reflect.ownKeys(value).map(key => [key, { value: Reflect.get(value, key) }]),
  ) as BoxProperties<T>;
}

export function removeKind<T extends { kind: PropertyKey }>(value: T): RemoveDiscriminant<T> {
  const { kind: _kind, ...rest } = value;
  return rest as unknown as RemoveDiscriminant<T>;
}

export function boxedVariantValue(
  value: BoxProperties<{ kind: "text"; value: string } | { kind: "count"; value: number }>,
): string {
  const boxed = value.value.value;
  return typeof boxed === "string" ? boxed.toUpperCase() : boxed.toFixed(0);
}

type MainVariant =
  | { kind: "text"; value: string; length: number }
  | { kind: "count"; value: number; step: number };

// Part 1: Homomorphic wrapping maps each union member independently.
type MainBoxed = BoxProperties<MainVariant>;
type _Main01 = Expect<Equal<MainBoxed, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<keyof MainBoxed, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<MainBoxed["kind"], TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<MainBoxed["value"], TODO>>; // TODO(koan) @koan-error

// Part 2: Extracting a transformed member recovers its member-only fields.
type MainTextBox = Extract<MainBoxed, { kind: { value: "text" } }>;
type MainCountBox = Extract<MainBoxed, { kind: { value: "count" } }>;
type _Main05 = Expect<Equal<MainTextBox, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<keyof MainTextBox, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<MainTextBox["length"], TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<MainCountBox["step"], TODO>>; // TODO(koan) @koan-error

// Part 3: Built-in homomorphic transforms also preserve union alternatives.
type MainPartial = Partial<MainVariant>;
type MainReadonly = Readonly<MainVariant>;
type _Main09 = Expect<Equal<MainPartial, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<Extract<MainPartial, { kind?: "text" }>, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<MainReadonly, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<keyof MainReadonly, TODO>>; // TODO(koan) @koan-error

// Part 4: Mapping a concrete common key union builds one common-view object.
type MainCommonFlags = { [K in keyof MainVariant]: boolean };
type MainCommonValues = { [K in keyof MainVariant]: MainVariant[K] };
type _Main13 = Expect<Equal<MainCommonFlags, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<keyof MainCommonFlags, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<MainCommonValues, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<MainCommonValues["value"], TODO>>; // TODO(koan) @koan-error

// Part 5: Remapping still acts per member, but removing the tag loses correlation.
type MainPayloads = RemoveDiscriminant<MainVariant>;
type _Main17 = Expect<Equal<MainPayloads, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<keyof MainPayloads, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<Extract<MainPayloads, { length: number }>, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<RemoveDiscriminant<{ kind: "only"; id: string }>, TODO>>; // TODO(koan) @koan-error
