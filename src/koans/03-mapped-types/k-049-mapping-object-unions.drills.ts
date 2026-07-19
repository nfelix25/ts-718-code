import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-049 guided drills: mapping object unions
 * =============================================================================
 * Keep two levels visible: the outer union member currently being transformed,
 * and that member's inner property loop. Contrast generic homomorphic mapping
 * with a concrete mapping whose domain is only `keyof` the whole union.
 */

type DBox<T> = { [K in keyof T]: { value: T[K] } };
type DFlags<T> = { [K in keyof T]: boolean };
type DRemoveKind<T> = { [K in keyof T as K extends "kind" ? never : K]: T[K] };
type DPrefix<T> = { [K in keyof T as K extends string ? `x${Capitalize<K>}` : never]: T[K] };

type DShape =
  | { kind: "circle"; color: string; radius: number }
  | { kind: "square"; color: string; side: number };

type DBoxedShape = DBox<DShape>;
type DBoxedCircle = Extract<DBoxedShape, { kind: { value: "circle" } }>;
type DBoxedSquare = Extract<DBoxedShape, { kind: { value: "square" } }>;

// Homomorphic wrapping preserves both transformed alternatives.
type _D01 = Expect<Equal<DBoxedShape, TODO>>; // TODO(koan) @koan-error
type _D02 = Expect<Equal<keyof DBoxedShape, TODO>>; // TODO(koan) @koan-error
type _D03 = Expect<Equal<DBoxedShape["kind"], TODO>>; // TODO(koan) @koan-error
type _D04 = Expect<Equal<DBoxedShape["color"], TODO>>; // TODO(koan) @koan-error
type _D05 = Expect<Equal<DBoxedCircle, TODO>>; // TODO(koan) @koan-error
type _D06 = Expect<Equal<keyof DBoxedCircle, TODO>>; // TODO(koan) @koan-error
type _D07 = Expect<Equal<DBoxedCircle["radius"], TODO>>; // TODO(koan) @koan-error
type _D08 = Expect<Equal<DBoxedSquare, TODO>>; // TODO(koan) @koan-error
type _D09 = Expect<Equal<keyof DBoxedSquare, TODO>>; // TODO(koan) @koan-error
type _D10 = Expect<Equal<DBoxedSquare["side"], TODO>>; // TODO(koan) @koan-error
type _D11 = Expect<Equal<DFlags<DShape>, TODO>>; // TODO(koan) @koan-error
type _D12 = Expect<Equal<Extract<DFlags<DShape>, { radius: boolean }>, TODO>>; // TODO(koan) @koan-error
type _D13 = Expect<Equal<DBox<{ a: 1 } | { b: 2 }>, TODO>>; // TODO(koan) @koan-error
type _D14 = Expect<Equal<keyof DBox<{ a: 1 } | { b: 2 }>, TODO>>; // TODO(koan) @koan-error
type _D15 = Expect<Equal<DBox<{ common: 1; a: "a" } | { common: 2; b: "b" }>["common"], TODO>>; // TODO(koan) @koan-error

type DModifiedUnion =
  | { readonly kind: "saved"; id: string; note?: string }
  | { kind: "draft"; id: string; attempts?: number };

// Built-in homomorphic transforms retain union members and their modifiers.
type _D16 = Expect<Equal<Partial<DShape>, TODO>>; // TODO(koan) @koan-error
type _D17 = Expect<Equal<Readonly<DShape>, TODO>>; // TODO(koan) @koan-error
type _D18 = Expect<Equal<Required<Partial<DShape>>, TODO>>; // TODO(koan) @koan-error
type _D19 = Expect<Equal<DBox<DModifiedUnion>, TODO>>; // TODO(koan) @koan-error
type _D20 = Expect<Equal<Partial<DModifiedUnion>, TODO>>; // TODO(koan) @koan-error
type _D21 = Expect<Equal<Readonly<DModifiedUnion>, TODO>>; // TODO(koan) @koan-error
type _D22 = Expect<Equal<Extract<Partial<DModifiedUnion>, { kind?: "saved" }>, TODO>>; // TODO(koan) @koan-error
type _D23 = Expect<Equal<Extract<Readonly<DModifiedUnion>, { readonly kind: "draft" }>, TODO>>; // TODO(koan) @koan-error
type _D24 = Expect<Equal<keyof Partial<DModifiedUnion>, TODO>>; // TODO(koan) @koan-error
type _D25 = Expect<Equal<keyof Readonly<DModifiedUnion>, TODO>>; // TODO(koan) @koan-error

// A concrete `keyof Union` loop sees only keys common to every member.
type DConcreteFlags = { [K in keyof DShape]: boolean };
type DConcreteValues = { [K in keyof DShape]: DShape[K] };
type _D26 = Expect<Equal<DConcreteFlags, TODO>>; // TODO(koan) @koan-error
type _D27 = Expect<Equal<keyof DConcreteFlags, TODO>>; // TODO(koan) @koan-error
type _D28 = Expect<Equal<DConcreteValues, TODO>>; // TODO(koan) @koan-error
type _D29 = Expect<Equal<DConcreteValues["kind"], TODO>>; // TODO(koan) @koan-error
type _D30 = Expect<Equal<DConcreteValues["color"], TODO>>; // TODO(koan) @koan-error
type _D31 = Expect<Equal<{ [K in keyof ({ a: 1 } | { b: 2 })]: K }, TODO>>; // TODO(koan) @koan-error
type _D32 = Expect<Equal<{ [K in keyof ({ a: 1; c: 3 } | { b: 2; c: 4 })]: K }, TODO>>; // TODO(koan) @koan-error
type _D33 = Expect<Equal<DFlags<{ a: 1 } | { b: 2 }>, TODO>>; // TODO(koan) @koan-error
type _D34 = Expect<Equal<DFlags<DShape>, TODO>>; // TODO(koan) @koan-error
type _D35 = Expect<Equal<keyof DFlags<DShape>, TODO>>; // TODO(koan) @koan-error

// Key remapping and filtering still execute independently for each member.
type DPayloads = DRemoveKind<DShape>;
type DPrefixed = DPrefix<DShape>;
type _D36 = Expect<Equal<DPayloads, TODO>>; // TODO(koan) @koan-error
type _D37 = Expect<Equal<keyof DPayloads, TODO>>; // TODO(koan) @koan-error
type _D38 = Expect<Equal<Extract<DPayloads, { radius: number }>, TODO>>; // TODO(koan) @koan-error
type _D39 = Expect<Equal<Extract<DPayloads, { side: number }>, TODO>>; // TODO(koan) @koan-error
type _D40 = Expect<Equal<DPrefixed, TODO>>; // TODO(koan) @koan-error
type _D41 = Expect<Equal<keyof DPrefixed, TODO>>; // TODO(koan) @koan-error
type _D42 = Expect<Equal<Extract<DPrefixed, { xRadius: number }>, TODO>>; // TODO(koan) @koan-error
type _D43 = Expect<Equal<DRemoveKind<{ kind: "a" } | { kind: "b" }>, TODO>>; // TODO(koan) @koan-error
type _D44 = Expect<Equal<DPrefix<{ a: 1 } | { b: 2 }>, TODO>>; // TODO(koan) @koan-error
type _D45 = Expect<Equal<keyof DPrefix<{ a: 1 } | { b: 2 }>, TODO>>; // TODO(koan) @koan-error

type DOverlap =
  | { kind: "one"; value: string; shared?: boolean }
  | { kind: "two"; value: number; shared: boolean }
  | { kind: "three"; value: Date; extra: bigint };

// Three-way unions repeat common, optional, and member-only distinctions.
type _D46 = Expect<Equal<DBox<DOverlap>, TODO>>; // TODO(koan) @koan-error
type _D47 = Expect<Equal<keyof DOverlap, TODO>>; // TODO(koan) @koan-error
type _D48 = Expect<Equal<DOverlap["value"], TODO>>; // TODO(koan) @koan-error
type _D49 = Expect<Equal<keyof DBox<DOverlap>, TODO>>; // TODO(koan) @koan-error
type _D50 = Expect<Equal<DBox<DOverlap>["value"], TODO>>; // TODO(koan) @koan-error
type _D51 = Expect<Equal<Extract<DBox<DOverlap>, { kind: { value: "one" } }>, TODO>>; // TODO(koan) @koan-error
type _D52 = Expect<Equal<Extract<Partial<DOverlap>, { kind?: "two" }>, TODO>>; // TODO(koan) @koan-error
type _D53 = Expect<Equal<DRemoveKind<DOverlap>, TODO>>; // TODO(koan) @koan-error
type _D54 = Expect<Equal<keyof DRemoveKind<DOverlap>, TODO>>; // TODO(koan) @koan-error
type _D55 = Expect<Equal<{ [K in keyof DOverlap]: DOverlap[K] }, TODO>>; // TODO(koan) @koan-error

// Degenerate and nested members complete the repetition matrix.
type _D56 = Expect<Equal<DBox<never>, TODO>>; // TODO(koan) @koan-error
type _D57 = Expect<Equal<DBox<unknown>, TODO>>; // TODO(koan) @koan-error
type _D58 = Expect<Equal<DBox<{} | { id: string }>, TODO>>; // TODO(koan) @koan-error
type _D59 = Expect<Equal<DBox<{ nested: { a: 1 } } | { nested: { b: 2 } }>["nested"], TODO>>; // TODO(koan) @koan-error
type _D60 = Expect<Equal<Readonly<DBox<DShape>>, TODO>>; // TODO(koan) @koan-error
