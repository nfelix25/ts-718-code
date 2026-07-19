import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-049 edge cases: mapping object unions
 * =============================================================================
 * Union preservation depends on the mapped type's relationship to its generic
 * source. These cases contrast homomorphic transforms with common-key Pick and
 * Omit forms, then stress optionality, modifier differences, empty members,
 * primitives, containers, index signatures, and unions collapsed by any or
 * unknown before mapping begins.
 */

type EBox<T> = { [K in keyof T]: { value: T[K] } };
type EFlags<T> = { [K in keyof T]: boolean };
type ERemoveKind<T> = { [K in keyof T as K extends "kind" ? never : K]: T[K] };
type EIsAny<T> = 0 extends (1 & T) ? true : false;

type EVariant =
  | { kind: "a"; common: string; a: number }
  | { kind: "b"; common: string; b: boolean };

// Common-key utilities and homomorphic transforms have different outer shapes.
type _E01 = Expect<Equal<keyof EVariant, TODO>>; // TODO(koan) @koan-error
type _E02 = Expect<Equal<EVariant[keyof EVariant], TODO>>; // TODO(koan) @koan-error
type _E03 = Expect<Equal<{ [K in keyof EVariant]: boolean }, TODO>>; // TODO(koan) @koan-error
type _E04 = Expect<Equal<EFlags<EVariant>, TODO>>; // TODO(koan) @koan-error
type _E05 = Expect<Equal<Pick<EVariant, keyof EVariant>, TODO>>; // TODO(koan) @koan-error
type _E06 = Expect<Equal<Omit<EVariant, "kind">, TODO>>; // TODO(koan) @koan-error
type _E07 = Expect<Equal<ERemoveKind<EVariant>, TODO>>; // TODO(koan) @koan-error
type _E08 = Expect<Equal<keyof ERemoveKind<EVariant>, TODO>>; // TODO(koan) @koan-error

type EOptional =
  | { kind: "left"; shared?: string; left: number }
  | { kind: "right"; shared: string; right: boolean };

// Common optionality and per-member modifiers remain member-specific.
type _E09 = Expect<Equal<keyof EOptional, TODO>>; // TODO(koan) @koan-error
type _E10 = Expect<Equal<EOptional["shared"], TODO>>; // TODO(koan) @koan-error
type _E11 = Expect<Equal<Partial<EOptional>, TODO>>; // TODO(koan) @koan-error
type _E12 = Expect<Equal<Required<EOptional>, TODO>>; // TODO(koan) @koan-error
type _E13 = Expect<Equal<Readonly<EOptional>, TODO>>; // TODO(koan) @koan-error
type _E14 = Expect<Equal<EBox<EOptional>, TODO>>; // TODO(koan) @koan-error

// Removing tags can make alternatives indistinguishable or leave only unique keys.
type _E15 = Expect<Equal<ERemoveKind<{ kind: "a"; value: string } | { kind: "b"; value: string }>, TODO>>; // TODO(koan) @koan-error
type _E16 = Expect<Equal<ERemoveKind<{ kind: "a"; a: 1 } | { kind: "b"; b: 2 }>, TODO>>; // TODO(koan) @koan-error
type _E17 = Expect<Equal<keyof ERemoveKind<{ kind: "a"; a: 1 } | { kind: "b"; b: 2 }>, TODO>>; // TODO(koan) @koan-error
type _E18 = Expect<Equal<EBox<{} | { id: string }>, TODO>>; // TODO(koan) @koan-error

// Nested values are wrapped, not recursively mapped; containers remain members.
type _E19 = Expect<Equal<EBox<{ nested: { a: 1 } } | { nested: { b: 2 } }>["nested"], TODO>>; // TODO(koan) @koan-error
type _E20 = Expect<Equal<EBox<string[] | number[]>, TODO>>; // TODO(koan) @koan-error
type _E21 = Expect<Equal<EBox<readonly ["a"] | readonly [1, 2]>, TODO>>; // TODO(koan) @koan-error
type _E22 = Expect<Equal<EBox<string | { value: number }>, TODO>>; // TODO(koan) @koan-error

// Top, bottom, poison, and broad key domains affect the union before mapping.
type _E23 = Expect<Equal<EBox<never>, TODO>>; // TODO(koan) @koan-error
type _E24 = Expect<Equal<EBox<unknown>, TODO>>; // TODO(koan) @koan-error
type _E25 = Expect<Equal<EBox<unknown | { id: string }>, TODO>>; // TODO(koan) @koan-error
type _E26 = Expect<Equal<EIsAny<EBox<any | { id: string }>>, TODO>>; // TODO(koan) @koan-error
type _E27 = Expect<Equal<EFlags<Record<string, number> | { fixed: 1 }>, TODO>>; // TODO(koan) @koan-error
type _E28 = Expect<Equal<keyof EFlags<Record<string, number> | { fixed: 1 }>, TODO>>; // TODO(koan) @koan-error
type _E29 = Expect<Equal<{ [K in keyof EVariant as "all"]: EVariant[K] }, TODO>>; // TODO(koan) @koan-error
type _E30 = Expect<Equal<Readonly<EBox<EVariant>>, TODO>>; // TODO(koan) @koan-error

// Pre-solved: a generic homomorphic flag transform preserves disjoint members.
type DemoDisjointFlags = EFlags<{ a: 1 } | { b: 2 }>;
type _DemoDisjointFlags = Expect<Equal<DemoDisjointFlags, { a: boolean } | { b: boolean }>>;

// Pre-solved: no property is safe to access on every member of a disjoint union.
type DemoDisjointKeys = keyof ({ a: 1 } | { b: 2 });
type _DemoDisjointKeys = Expect<Equal<DemoDisjointKeys, never>>;

// Pre-solved: the custom remap removes the tag independently from each member.
type DemoPayloads = ERemoveKind<EVariant>;
type _DemoPayloads = Expect<Equal<DemoPayloads, { common: string; a: number } | { common: string; b: boolean }>>;

declare const variant: EVariant;
// @ts-expect-error Member-only fields require narrowing the union first.
variant.a;
