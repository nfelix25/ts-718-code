import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-057 edge cases: nested conditional types
 * =============================================================================
 * Each distributed union member follows one path through the ordered tree.
 * Special types and overlapping structural constraints can preserve multiple
 * leaves, no leaves, or shadowed leaves, so branch order must be reviewed as a
 * set of reachable cases rather than merely formatted syntax.
 */

type EKind<T> = T extends string ? "string" : T extends number ? "number" : T extends readonly unknown[] ? "array" : T extends (...args: any[]) => unknown ? "function" : T extends object ? "object" : "other";
type EBadObjectOrder<T> = T extends object ? "object" : T extends readonly unknown[] ? "array" : T extends (...args: any[]) => unknown ? "function" : "other";
type ESpecific<T> = T extends "x" ? "x" : T extends string ? "string" : "other";
type EIsAny<T> = 0 extends (1 & T) ? true : false;

// Union members, never, any, and unknown traverse nested trees differently.
type _E01 = Expect<Equal<EKind<string | number>, TODO>>; // TODO(koan) @koan-error
type _E02 = Expect<Equal<EKind<string | Date>, TODO>>; // TODO(koan) @koan-error
type _E03 = Expect<Equal<EKind<never>, TODO>>; // TODO(koan) @koan-error
type _E04 = Expect<Equal<EKind<any>, TODO>>; // TODO(koan) @koan-error
type _E05 = Expect<Equal<EIsAny<EKind<any>>, TODO>>; // TODO(koan) @koan-error
type _E06 = Expect<Equal<EKind<unknown>, TODO>>; // TODO(koan) @koan-error
type _E07 = Expect<Equal<EKind<unknown | string>, TODO>>; // TODO(koan) @koan-error
type _E08 = Expect<Equal<EKind<never | number>, TODO>>; // TODO(koan) @koan-error

// Broad object checks shadow arrays and functions placed later.
type _E09 = Expect<Equal<EBadObjectOrder<readonly [1, 2]>, TODO>>; // TODO(koan) @koan-error
type _E10 = Expect<Equal<EBadObjectOrder<() => void>, TODO>>; // TODO(koan) @koan-error
type _E11 = Expect<Equal<EKind<readonly [1, 2]>, TODO>>; // TODO(koan) @koan-error
type _E12 = Expect<Equal<EKind<() => void>, TODO>>; // TODO(koan) @koan-error
type _E13 = Expect<Equal<EKind<null>, TODO>>; // TODO(koan) @koan-error
type _E14 = Expect<Equal<EKind<{}>, TODO>>; // TODO(koan) @koan-error

// Literal and template subtypes must precede their broad string parent.
type _E15 = Expect<Equal<ESpecific<"x">, TODO>>; // TODO(koan) @koan-error
type _E16 = Expect<Equal<ESpecific<string>, TODO>>; // TODO(koan) @koan-error
type _E17 = Expect<Equal<("id-1" extends `id-${number}` ? "numeric-id" : "id-1" extends string ? "string" : "other"), TODO>>; // TODO(koan) @koan-error
type _E18 = Expect<Equal<("id-1" extends string ? "string" : "id-1" extends `id-${number}` ? "numeric-id" : "other"), TODO>>; // TODO(koan) @koan-error
type _E19 = Expect<Equal<(`id-${number}` extends string ? "string" : "other"), TODO>>; // TODO(koan) @koan-error
type _E20 = Expect<Equal<(string extends `id-${number}` ? "id" : string extends string ? "string" : "other"), TODO>>; // TODO(koan) @koan-error

// Overlapping structural capabilities select the first satisfied contract.
type EShape<T> = T extends { kind: "a"; value: number } ? "specific-a" : T extends { kind: string } ? "tagged" : T extends object ? "object" : "other";
type _E21 = Expect<Equal<EShape<{ kind: "a"; value: 1; extra: true }>, TODO>>; // TODO(koan) @koan-error
type _E22 = Expect<Equal<EShape<{ kind: "a"; value: string }>, TODO>>; // TODO(koan) @koan-error
type _E23 = Expect<Equal<EShape<{ kind: "b" }>, TODO>>; // TODO(koan) @koan-error
type _E24 = Expect<Equal<EShape<{ value: 1 }>, TODO>>; // TODO(koan) @koan-error
type _E25 = Expect<Equal<EShape<{ kind: "a"; value: 1 } | { kind: "b" }>, TODO>>; // TODO(koan) @koan-error

// Boolean and numeric broad types distribute into or bypass literal leaves.
type EBoolean<T> = T extends true ? "true" : T extends false ? "false" : "other";
type ENumber<T> = T extends 0 ? "zero" : T extends 1 ? "one" : T extends number ? "number" : "other";
type _E26 = Expect<Equal<EBoolean<boolean>, TODO>>; // TODO(koan) @koan-error
type _E27 = Expect<Equal<EBoolean<true | null>, TODO>>; // TODO(koan) @koan-error
type _E28 = Expect<Equal<ENumber<number>, TODO>>; // TODO(koan) @koan-error
type _E29 = Expect<Equal<ENumber<0 | 1 | 2>, TODO>>; // TODO(koan) @koan-error
type _E30 = Expect<Equal<ENumber<any>, TODO>>; // TODO(koan) @koan-error

// Pre-solved: broad object first makes later array/function branches unreachable.
type _DemoShadowedArray = Expect<Equal<EBadObjectOrder<readonly [1]>, "object">>;

// Pre-solved: each union member independently selects its first matching leaf.
type _DemoUnionLeaves = Expect<Equal<EKind<string | number>, "string" | "number">>;

// Pre-solved: never contributes no member and therefore selects no leaf.
type _DemoNever = Expect<Equal<EKind<never>, never>>;

// An implementation cannot claim a later shadowed leaf for an array.
// @ts-expect-error The bad ordering classifies arrays as object.
const invalidShadowed: EBadObjectOrder<readonly [1]> = "array";
void invalidShadowed;
