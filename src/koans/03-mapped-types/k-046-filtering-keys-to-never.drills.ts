import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-046 guided drills: filtering keys to never
 * =============================================================================
 * Keep reading every case as a predicate over the current source key. These
 * repetitions vary which evidence the predicate examines: key identity, value
 * assignability, value overlap, nullish removal, modifier-bearing properties,
 * and the complete PropertyKey domain.
 */

type DWithout<T, Removed extends PropertyKey> = {
  [K in keyof T as K extends Removed ? never : K]: T[K]
};
type DOnly<T, Included extends PropertyKey> = {
  [K in keyof T as K extends Included ? K : never]: T[K]
};
type DPickValue<T, Value> = {
  [K in keyof T as T[K] extends Value ? K : never]: T[K]
};
type DPickOverlap<T, Value> = {
  [K in keyof T as Extract<T[K], Value> extends never ? never : K]: T[K]
};
type DPickNonNullish<T, Value> = {
  [K in keyof T as NonNullable<T[K]> extends Value ? K : never]: T[K]
};

declare const dSecret: unique symbol;
interface DBase {
  id: number;
  name: string;
  active: boolean;
  0: Date;
  [dSecret]: bigint;
}

// Named exclusion: one, many, none, all, absent, numeric, and symbol keys.
type _D01 = Expect<Equal<DWithout<DBase, "active">, TODO>>; // TODO(koan) @koan-error
type _D02 = Expect<Equal<keyof DWithout<DBase, "active">, TODO>>; // TODO(koan) @koan-error
type _D03 = Expect<Equal<DWithout<DBase, "id" | "name">, TODO>>; // TODO(koan) @koan-error
type _D04 = Expect<Equal<DWithout<DBase, never>, TODO>>; // TODO(koan) @koan-error
type _D05 = Expect<Equal<DWithout<DBase, PropertyKey>, TODO>>; // TODO(koan) @koan-error
type _D06 = Expect<Equal<DWithout<DBase, "missing">, TODO>>; // TODO(koan) @koan-error
type _D07 = Expect<Equal<DWithout<DWithout<DBase, "id">, "id">, TODO>>; // TODO(koan) @koan-error
type _D08 = Expect<Equal<keyof DWithout<DBase, keyof DBase>, TODO>>; // TODO(koan) @koan-error
type _D09 = Expect<Equal<DWithout<DBase, 0>, TODO>>; // TODO(koan) @koan-error
type _D10 = Expect<Equal<DWithout<DBase, typeof dSecret>, TODO>>; // TODO(koan) @koan-error

// Named inclusion: intersections with the actual source domain do the work.
type _D11 = Expect<Equal<DOnly<DBase, "id">, TODO>>; // TODO(koan) @koan-error
type _D12 = Expect<Equal<keyof DOnly<DBase, "id" | "active">, TODO>>; // TODO(koan) @koan-error
type _D13 = Expect<Equal<DOnly<DBase, "missing">, TODO>>; // TODO(koan) @koan-error
type _D14 = Expect<Equal<DOnly<DBase, never>, TODO>>; // TODO(koan) @koan-error
type _D15 = Expect<Equal<DOnly<DBase, PropertyKey>, TODO>>; // TODO(koan) @koan-error
type _D16 = Expect<Equal<DOnly<DBase, 0>, TODO>>; // TODO(koan) @koan-error
type _D17 = Expect<Equal<DOnly<DBase, typeof dSecret>, TODO>>; // TODO(koan) @koan-error
type _D18 = Expect<Equal<DOnly<DBase, string>, TODO>>; // TODO(koan) @koan-error
type _D19 = Expect<Equal<DOnly<DBase, number>, TODO>>; // TODO(koan) @koan-error
type _D20 = Expect<Equal<DOnly<DBase, symbol>, TODO>>; // TODO(koan) @koan-error

interface DValues {
  text: string;
  count: number;
  literal: 1;
  flag: boolean;
  maybeText: string | undefined;
  mixed: string | number;
  callback: () => void;
  top: unknown;
  bottom: never;
}

// Value predicates use assignability of the complete property value.
type _D21 = Expect<Equal<DPickValue<DValues, string>, TODO>>; // TODO(koan) @koan-error
type _D22 = Expect<Equal<keyof DPickValue<DValues, number>, TODO>>; // TODO(koan) @koan-error
type _D23 = Expect<Equal<DPickValue<DValues, 1>, TODO>>; // TODO(koan) @koan-error
type _D24 = Expect<Equal<DPickValue<DValues, boolean>, TODO>>; // TODO(koan) @koan-error
type _D25 = Expect<Equal<DPickValue<DValues, Function>, TODO>>; // TODO(koan) @koan-error
type _D26 = Expect<Equal<DPickValue<DValues, string | number>, TODO>>; // TODO(koan) @koan-error
type _D27 = Expect<Equal<DPickValue<DValues, unknown>, TODO>>; // TODO(koan) @koan-error
type _D28 = Expect<Equal<keyof DPickValue<DValues, never>, TODO>>; // TODO(koan) @koan-error
type _D29 = Expect<Equal<DPickValue<{}, string>, TODO>>; // TODO(koan) @koan-error
type _D30 = Expect<Equal<DPickValue<{ value: "x" }, string>, TODO>>; // TODO(koan) @koan-error
type _D31 = Expect<Equal<DPickValue<{ value: string }, "x">, TODO>>; // TODO(koan) @koan-error
type _D32 = Expect<Equal<DPickValue<{ value: string | number }, string>, TODO>>; // TODO(koan) @koan-error
type _D33 = Expect<Equal<DPickOverlap<{ value: string | number }, string>, TODO>>; // TODO(koan) @koan-error
type _D34 = Expect<Equal<DPickOverlap<DValues, Date>, TODO>>; // TODO(koan) @koan-error
type _D35 = Expect<Equal<keyof DPickOverlap<DValues, number>, TODO>>; // TODO(koan) @koan-error

interface DModified {
  readonly id: number;
  readonly code?: string;
  label?: string;
  count?: number;
  explicit: string | undefined;
  active: boolean;
}

// Optionality changes the indexed value tested; surviving modifiers stay intact.
type _D36 = Expect<Equal<DPickValue<DModified, number>, TODO>>; // TODO(koan) @koan-error
type _D37 = Expect<Equal<DPickValue<DModified, string>, TODO>>; // TODO(koan) @koan-error
type _D38 = Expect<Equal<DPickValue<DModified, string | undefined>, TODO>>; // TODO(koan) @koan-error
type _D39 = Expect<Equal<DPickNonNullish<DModified, string>, TODO>>; // TODO(koan) @koan-error
type _D40 = Expect<Equal<DPickNonNullish<DModified, number>, TODO>>; // TODO(koan) @koan-error
type _D41 = Expect<Equal<keyof DPickOverlap<DModified, undefined>, TODO>>; // TODO(koan) @koan-error
type _D42 = Expect<Equal<DOnly<DModified, "id" | "code">, TODO>>; // TODO(koan) @koan-error
type _D43 = Expect<Equal<Readonly<DOnly<DModified, "label">>, TODO>>; // TODO(koan) @koan-error
type _D44 = Expect<Equal<Required<DOnly<DModified, "count">>, TODO>>; // TODO(koan) @koan-error
type _D45 = Expect<Equal<DWithout<DModified, "active" | "explicit">, TODO>>; // TODO(koan) @koan-error

// Broad and mixed key domains show that filtering acts on type-level keys.
type _D46 = Expect<Equal<DOnly<Record<string, number>, string>, TODO>>; // TODO(koan) @koan-error
type _D47 = Expect<Equal<keyof DOnly<Record<string, number>, string>, TODO>>; // TODO(koan) @koan-error
type _D48 = Expect<Equal<DOnly<Record<number, string>, number>, TODO>>; // TODO(koan) @koan-error
type _D49 = Expect<Equal<DOnly<Record<symbol, boolean>, symbol>, TODO>>; // TODO(koan) @koan-error
type _D50 = Expect<Equal<DWithout<Record<string, number>, "one">, TODO>>; // TODO(koan) @koan-error
type _D51 = Expect<Equal<DOnly<DBase, string | typeof dSecret>, TODO>>; // TODO(koan) @koan-error
type _D52 = Expect<Equal<DPickValue<DBase, bigint>, TODO>>; // TODO(koan) @koan-error
type _D53 = Expect<Equal<DPickValue<DBase, Date>, TODO>>; // TODO(koan) @koan-error
type _D54 = Expect<Equal<DOnly<readonly ["a", 1], "0" | "1">, TODO>>; // TODO(koan) @koan-error
type _D55 = Expect<Equal<keyof DOnly<readonly ["a", 1], "0" | "1">, TODO>>; // TODO(koan) @koan-error

// Filters compose as successive domain reductions.
type _D56 = Expect<Equal<DOnly<DWithout<DBase, "active">, "id" | "active">, TODO>>; // TODO(koan) @koan-error
type _D57 = Expect<Equal<DWithout<DOnly<DBase, "id" | "name">, "name">, TODO>>; // TODO(koan) @koan-error
type _D58 = Expect<Equal<DPickValue<DWithout<DValues, "literal">, number>, TODO>>; // TODO(koan) @koan-error
type _D59 = Expect<Equal<DWithout<DPickOverlap<DValues, string>, "text">, TODO>>; // TODO(koan) @koan-error
type _D60 = Expect<Equal<DOnly<DPickNonNullish<DModified, string>, "code" | "explicit">, TODO>>; // TODO(koan) @koan-error
