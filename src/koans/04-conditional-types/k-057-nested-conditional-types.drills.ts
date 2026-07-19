import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-057 guided drills: nested conditional types
 * =============================================================================
 * Walk top to bottom and stop at the first true test. For overlapping cases,
 * compare the candidate against every earlier constraint before reading its own
 * intended branch.
 */

type DKind<T> = T extends null ? "null" : T extends undefined ? "undefined" : T extends string ? "string" : T extends number ? "number" : T extends boolean ? "boolean" : T extends readonly unknown[] ? "array" : T extends (...args: any[]) => unknown ? "function" : T extends object ? "object" : "other";
type DSpecific<T> = T extends "x" ? "literal-x" : T extends string ? "string" : T extends number ? "number" : "other";
type DStatus<T> = T extends 200 | 201 ? "ok" : T extends 300 | 301 ? "redirect" : T extends 400 | 404 ? "client" : T extends number ? "other-number" : "not-number";

// Primitive, nullish, container, callable, and object classifier branches.
type _D01 = Expect<Equal<DKind<null>, TODO>>; // TODO(koan) @koan-error
type _D02 = Expect<Equal<DKind<undefined>, TODO>>; // TODO(koan) @koan-error
type _D03 = Expect<Equal<DKind<string>, TODO>>; // TODO(koan) @koan-error
type _D04 = Expect<Equal<DKind<"x">, TODO>>; // TODO(koan) @koan-error
type _D05 = Expect<Equal<DKind<number>, TODO>>; // TODO(koan) @koan-error
type _D06 = Expect<Equal<DKind<1>, TODO>>; // TODO(koan) @koan-error
type _D07 = Expect<Equal<DKind<boolean>, TODO>>; // TODO(koan) @koan-error
type _D08 = Expect<Equal<DKind<true>, TODO>>; // TODO(koan) @koan-error
type _D09 = Expect<Equal<DKind<symbol>, TODO>>; // TODO(koan) @koan-error
type _D10 = Expect<Equal<DKind<bigint>, TODO>>; // TODO(koan) @koan-error
type _D11 = Expect<Equal<DKind<string[]>, TODO>>; // TODO(koan) @koan-error
type _D12 = Expect<Equal<DKind<readonly [1, 2]>, TODO>>; // TODO(koan) @koan-error
type _D13 = Expect<Equal<DKind<() => void>, TODO>>; // TODO(koan) @koan-error
type _D14 = Expect<Equal<DKind<{ id: number }>, TODO>>; // TODO(koan) @koan-error
type _D15 = Expect<Equal<DKind<Date>, TODO>>; // TODO(koan) @koan-error

// Narrow-before-broad ordering and deliberately shadowed branches.
type _D16 = Expect<Equal<DSpecific<"x">, TODO>>; // TODO(koan) @koan-error
type _D17 = Expect<Equal<DSpecific<"y">, TODO>>; // TODO(koan) @koan-error
type _D18 = Expect<Equal<DSpecific<string>, TODO>>; // TODO(koan) @koan-error
type _D19 = Expect<Equal<DSpecific<42>, TODO>>; // TODO(koan) @koan-error
type _D20 = Expect<Equal<DSpecific<false>, TODO>>; // TODO(koan) @koan-error
type _D21 = Expect<Equal<("x" extends string ? "broad" : "x" extends "x" ? "narrow" : "other"), TODO>>; // TODO(koan) @koan-error
type _D22 = Expect<Equal<(1 extends number ? "broad" : 1 extends 1 ? "narrow" : "other"), TODO>>; // TODO(koan) @koan-error
type _D23 = Expect<Equal<(readonly [1] extends readonly unknown[] ? "array" : readonly [1] extends object ? "object" : "other"), TODO>>; // TODO(koan) @koan-error
type _D24 = Expect<Equal<(() => void) extends object ? "object" : (() => void) extends (...args: any[]) => unknown ? "function" : "other", TODO>>; // TODO(koan) @koan-error
type _D25 = Expect<Equal<null extends object ? "object" : null extends null ? "null" : "other", TODO>>; // TODO(koan) @koan-error
type _D26 = Expect<Equal<{ id: 1 } extends { id: number; name: string } ? "full" : { id: 1 } extends { id: number } ? "id" : "none", TODO>>; // TODO(koan) @koan-error
type _D27 = Expect<Equal<{ id: 1; name: "x" } extends { id: number } ? "id" : { id: 1; name: "x" } extends { id: number; name: string } ? "full" : "none", TODO>>; // TODO(koan) @koan-error
type _D28 = Expect<Equal<"admin" extends "admin" ? 3 : "admin" extends string ? 1 : 0, TODO>>; // TODO(koan) @koan-error
type _D29 = Expect<Equal<"viewer" extends "admin" ? 3 : "viewer" extends string ? 1 : 0, TODO>>; // TODO(koan) @koan-error
type _D30 = Expect<Equal<undefined extends string ? 1 : undefined extends null | undefined ? 0 : -1, TODO>>; // TODO(koan) @koan-error

// Finite protocol categories plus broad numeric fallback.
type _D31 = Expect<Equal<DStatus<200>, TODO>>; // TODO(koan) @koan-error
type _D32 = Expect<Equal<DStatus<201>, TODO>>; // TODO(koan) @koan-error
type _D33 = Expect<Equal<DStatus<300>, TODO>>; // TODO(koan) @koan-error
type _D34 = Expect<Equal<DStatus<301>, TODO>>; // TODO(koan) @koan-error
type _D35 = Expect<Equal<DStatus<400>, TODO>>; // TODO(koan) @koan-error
type _D36 = Expect<Equal<DStatus<404>, TODO>>; // TODO(koan) @koan-error
type _D37 = Expect<Equal<DStatus<500>, TODO>>; // TODO(koan) @koan-error
type _D38 = Expect<Equal<DStatus<418>, TODO>>; // TODO(koan) @koan-error
type _D39 = Expect<Equal<DStatus<number>, TODO>>; // TODO(koan) @koan-error
type _D40 = Expect<Equal<DStatus<"200">, TODO>>; // TODO(koan) @koan-error
type _D41 = Expect<Equal<200 extends number ? "number" : 200 extends 200 ? "literal" : "other", TODO>>; // TODO(koan) @koan-error
type _D42 = Expect<Equal<200 extends 200 ? "literal" : 200 extends number ? "number" : "other", TODO>>; // TODO(koan) @koan-error
type _D43 = Expect<Equal<404 extends 400 | 404 ? "known" : 404 extends number ? "other" : "bad", TODO>>; // TODO(koan) @koan-error
type _D44 = Expect<Equal<999 extends 400 | 404 ? "known" : 999 extends number ? "other" : "bad", TODO>>; // TODO(koan) @koan-error
type _D45 = Expect<Equal<"bad" extends number ? "number" : "not-number", TODO>>; // TODO(koan) @koan-error

// Branches preserve input evidence and can delegate to named sub-classifiers.
type DPayload<T> = T extends string ? { kind: "text"; value: T } : T extends number ? { kind: "count"; value: T } : { kind: "other"; value: T };
type DObjectKind<T> = T extends readonly unknown[] ? "array" : T extends (...args: any[]) => unknown ? "function" : T extends object ? "record" : "scalar";
type _D46 = Expect<Equal<DPayload<"hello">, TODO>>; // TODO(koan) @koan-error
type _D47 = Expect<Equal<DPayload<42>, TODO>>; // TODO(koan) @koan-error
type _D48 = Expect<Equal<DPayload<false>, TODO>>; // TODO(koan) @koan-error
type _D49 = Expect<Equal<DPayload<string>["value"], TODO>>; // TODO(koan) @koan-error
type _D50 = Expect<Equal<DPayload<number>["kind"], TODO>>; // TODO(koan) @koan-error
type _D51 = Expect<Equal<DObjectKind<readonly []>, TODO>>; // TODO(koan) @koan-error
type _D52 = Expect<Equal<DObjectKind<(x: number) => string>, TODO>>; // TODO(koan) @koan-error
type _D53 = Expect<Equal<DObjectKind<{ x: 1 }>, TODO>>; // TODO(koan) @koan-error
type _D54 = Expect<Equal<DObjectKind<null>, TODO>>; // TODO(koan) @koan-error
type _D55 = Expect<Equal<(string extends string ? (string extends "x" ? "x" : "wide") : "other"), TODO>>; // TODO(koan) @koan-error
type _D56 = Expect<Equal<("x" extends string ? ("x" extends "x" ? "x" : "wide") : "other"), TODO>>; // TODO(koan) @koan-error
type _D57 = Expect<Equal<(number extends number ? (number extends 1 ? "one" : "wide") : "other"), TODO>>; // TODO(koan) @koan-error
type _D58 = Expect<Equal<(1 extends number ? (1 extends 1 ? "one" : "wide") : "other"), TODO>>; // TODO(koan) @koan-error
type _D59 = Expect<Equal<({ x: 1 } extends object ? ({ x: 1 } extends readonly unknown[] ? "array" : "object") : "scalar"), TODO>>; // TODO(koan) @koan-error
type _D60 = Expect<Equal<(readonly [1] extends object ? (readonly [1] extends readonly unknown[] ? "array" : "object") : "scalar"), TODO>>; // TODO(koan) @koan-error
