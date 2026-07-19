import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-046 edge cases: filtering keys to never
 * =============================================================================
 * The remapping mechanism is predictable; surprising results come from the
 * conditional predicate. This tier contrasts whole-value assignability with
 * overlap, then makes `never`, `any`, optional reads, modifiers, index
 * signatures, tuples, and all three PropertyKey families explicit.
 */

type EExtends<T, Value> = {
  [K in keyof T as T[K] extends Value ? K : never]: T[K]
};
type EOverlap<T, Value> = {
  [K in keyof T as Extract<T[K], Value> extends never ? never : K]: T[K]
};
type ENonNullableExtends<T, Value> = {
  [K in keyof T as NonNullable<T[K]> extends Value ? K : never]: T[K]
};
type EIsAny<T> = 0 extends (1 & T) ? true : false;
type ESafeExtends<T, Value> = {
  [K in keyof T as EIsAny<T[K]> extends true
    ? never
    : [T[K]] extends [never]
      ? never
      : T[K] extends Value
        ? K
        : never]: T[K]
};
type EOnly<T, Included extends PropertyKey> = {
  [K in keyof T as K extends Included ? K : never]: T[K]
};
type EWithout<T, Removed extends PropertyKey> = {
  [K in keyof T as K extends Removed ? never : K]: T[K]
};

interface ESpecialValues {
  text: string;
  bottom: never;
  poison: any;
  top: unknown;
}

// `never` passes every extends test; `any` contributes both conditional paths.
type _E01 = Expect<Equal<EExtends<{ text: string; bottom: never }, string>, TODO>>; // TODO(koan) @koan-error
type _E02 = Expect<Equal<keyof EExtends<{ count: number; bottom: never }, string>, TODO>>; // TODO(koan) @koan-error
type _E03 = Expect<Equal<ESafeExtends<{ text: string; bottom: never }, string>, TODO>>; // TODO(koan) @koan-error
type _E04 = Expect<Equal<EExtends<ESpecialValues, never>, TODO>>; // TODO(koan) @koan-error
type _E05 = Expect<Equal<keyof EExtends<ESpecialValues, string>, TODO>>; // TODO(koan) @koan-error
type _E06 = Expect<Equal<ESafeExtends<ESpecialValues, string>, TODO>>; // TODO(koan) @koan-error
type _E07 = Expect<Equal<keyof EExtends<ESpecialValues, object>, TODO>>; // TODO(koan) @koan-error
type _E08 = Expect<Equal<EExtends<ESpecialValues, unknown>, TODO>>; // TODO(koan) @koan-error

// Whole-union assignability and member overlap answer different questions.
interface EUnions {
  text: string;
  textOrNumber: string | number;
  numberOrBoolean: number | boolean;
  literal: "ready";
}
type _E09 = Expect<Equal<EExtends<EUnions, string>, TODO>>; // TODO(koan) @koan-error
type _E10 = Expect<Equal<EOverlap<EUnions, string>, TODO>>; // TODO(koan) @koan-error
type _E11 = Expect<Equal<EExtends<EUnions, "ready">, TODO>>; // TODO(koan) @koan-error
type _E12 = Expect<Equal<EExtends<EUnions, string | number>, TODO>>; // TODO(koan) @koan-error

interface EOptional {
  requiredText: string;
  optionalText?: string;
  optionalCount?: number;
  explicitText: string | undefined;
  absent: undefined;
}

// Optional indexed reads include undefined, so normalize only when intended.
type _E13 = Expect<Equal<EExtends<EOptional, string>, TODO>>; // TODO(koan) @koan-error
type _E14 = Expect<Equal<keyof EOverlap<EOptional, undefined>, TODO>>; // TODO(koan) @koan-error
type _E15 = Expect<Equal<ENonNullableExtends<EOptional, string>, TODO>>; // TODO(koan) @koan-error
type _E16 = Expect<Equal<EExtends<EOptional, string | undefined>, TODO>>; // TODO(koan) @koan-error
type _E17 = Expect<Equal<EOverlap<EOptional, string>, TODO>>; // TODO(koan) @koan-error
type _E18 = Expect<Equal<EExtends<EOptional, undefined>, TODO>>; // TODO(koan) @koan-error

// Filtering preserves modifiers; later mapped transforms may change them.
interface EModified {
  readonly id: number;
  readonly label?: string;
  count?: number;
  active: boolean;
}
type _E19 = Expect<Equal<EExtends<EModified, number>, TODO>>; // TODO(koan) @koan-error
type _E20 = Expect<Equal<ENonNullableExtends<EModified, string>, TODO>>; // TODO(koan) @koan-error
type _E21 = Expect<Equal<{ -readonly [K in keyof EExtends<EModified, number>]: EExtends<EModified, number>[K] }, TODO>>; // TODO(koan) @koan-error
type _E22 = Expect<Equal<{ [K in keyof ENonNullableExtends<EModified, number>]-?: ENonNullableExtends<EModified, number>[K] }, TODO>>; // TODO(koan) @koan-error

declare const eSymbol: unique symbol;
interface EMixedKeys {
  0: string;
  1: number;
  name: string;
  [eSymbol]: boolean;
}

// Literal, broad, tuple, and special object domains expose key-domain limits.
type _E23 = Expect<Equal<EOnly<EMixedKeys, symbol>, TODO>>; // TODO(koan) @koan-error
type _E24 = Expect<Equal<EOnly<EMixedKeys, number>, TODO>>; // TODO(koan) @koan-error
type _E25 = Expect<Equal<EOnly<EMixedKeys, string>, TODO>>; // TODO(koan) @koan-error
type _E26 = Expect<Equal<EWithout<Record<string, number>, "secret">, TODO>>; // TODO(koan) @koan-error
type _E27 = Expect<Equal<keyof EWithout<Record<string, number>, "secret">, TODO>>; // TODO(koan) @koan-error
type _E28 = Expect<Equal<EOnly<readonly ["left", "right"], "0" | "1">, TODO>>; // TODO(koan) @koan-error
type _E29 = Expect<Equal<EExtends<unknown, string>, TODO>>; // TODO(koan) @koan-error
type _E30 = Expect<Equal<EExtends<never, string>, TODO>>; // TODO(koan) @koan-error

// Pre-solved demonstration: a `never` destination contributes no key at all.
type DemoDestination = {
  [K in "kept" | "removed" as K extends "removed" ? never : K]: K
};
type _DemoDestination = Expect<Equal<DemoDestination, { kept: "kept" }>>;

// Pre-solved demonstration: value filtering does not rewrite the surviving value.
type DemoOverlap = EOverlap<{ value: string | number; flag: boolean }, string>;
type _DemoOverlap = Expect<Equal<DemoOverlap, { value: string | number }>>;

// Pre-solved demonstration: filtering a homomorphic source preserves optionality.
type DemoOptional = ENonNullableExtends<{ label?: string; count: number }, string>;
type _DemoOptional = Expect<Equal<DemoOptional, { label?: string }>>;

// A remapped destination must still be assignable to PropertyKey.
type InvalidDestination = {
  // @ts-expect-error Objects cannot be emitted as property keys.
  [K in "value" as { source: K }]: K
};
