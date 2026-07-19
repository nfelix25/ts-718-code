import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-104 guided drills: recursive type aliases
 * =============================================================================
 * Unroll exactly one layer, identify the base and recursive branches, and verify
 * that the generic payload remains invariant through every recursive reference.
 */

type DL<T> = null | { value: T; next: DL<T> };
type DN<T> = T | readonly DN<T>[];
type DE = { kind: "literal"; value: number } | { kind: "group"; inner: DE } | { kind: "pair"; left: DE; right: DE };
type DNode<T> = NonNullable<DL<T>>;

// One list layer exposes payload, next recursion, and the null base.
type _D01 = Expect<Equal<null extends DL<string> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D02 = Expect<Equal<DNode<string>["value"], TODO>>; // TODO(koan) @koan-error
type _D03 = Expect<Equal<DNode<string>["next"], TODO>>; // TODO(koan) @koan-error
type _D04 = Expect<Equal<NonNullable<DNode<string>["next"]>["value"], TODO>>; // TODO(koan) @koan-error
type _D05 = Expect<Equal<NonNullable<NonNullable<DNode<string>["next"]>["next"]>["value"], TODO>>; // TODO(koan) @koan-error
type _D06 = Expect<Equal<DNode<number>["value"], TODO>>; // TODO(koan) @koan-error
type _D07 = Expect<Equal<DNode<boolean>["next"], TODO>>; // TODO(koan) @koan-error
type _D08 = Expect<Equal<keyof DNode<string>, TODO>>; // TODO(koan) @koan-error
type _D09 = Expect<Equal<DL<never> extends null | object ? true : false, TODO>>; // TODO(koan) @koan-error
type _D10 = Expect<Equal<DL<unknown> extends DL<unknown> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D11 = Expect<Equal<DL<string> extends DL<string | number> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D12 = Expect<Equal<DL<string | number> extends DL<string> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D13 = Expect<Equal<Extract<DL<string>, null>, TODO>>; // TODO(koan) @koan-error
type _D14 = Expect<Equal<Exclude<DL<string>, null>, TODO>>; // TODO(koan) @koan-error
type _D15 = Expect<Equal<NonNullable<DL<1>>["value"], TODO>>; // TODO(koan) @koan-error

// Finite object chains are checked structurally against the recursive family.
type _D16 = Expect<Equal<{ value: 1; next: null } extends DL<number> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D17 = Expect<Equal<{ value: 1; next: { value: 2; next: null } } extends DL<number> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D18 = Expect<Equal<{ value: 1; next: { value: "x"; next: null } } extends DL<number> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D19 = Expect<Equal<{ value: 1; next: undefined } extends DL<number> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D20 = Expect<Equal<{} extends DL<number> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D21 = Expect<Equal<{ value: 1 } extends DL<number> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D22 = Expect<Equal<{ value: 1; next: null; extra: true } extends DL<number> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D23 = Expect<Equal<readonly [] extends DL<number> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D24 = Expect<Equal<null extends DL<never> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D25 = Expect<Equal<{ value: never; next: null } extends DL<never> ? true : false, TODO>>; // TODO(koan) @koan-error

// Nested containers accept leaves and arrays whose members recurse.
type _D26 = Expect<Equal<"x" extends DN<string> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D27 = Expect<Equal<readonly [] extends DN<string> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D28 = Expect<Equal<readonly ["x"] extends DN<string> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D29 = Expect<Equal<readonly ["x", "y"] extends DN<string> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D30 = Expect<Equal<readonly [readonly ["x"]] extends DN<string> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D31 = Expect<Equal<readonly ["x", readonly ["y", readonly ["z"]]] extends DN<string> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D32 = Expect<Equal<readonly [1] extends DN<string> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D33 = Expect<Equal<readonly ["x", 1] extends DN<string> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D34 = Expect<Equal<DN<unknown>, TODO>>; // TODO(koan) @koan-error
type _D35 = Expect<Equal<never extends DN<string> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D36 = Expect<Equal<readonly [] extends DN<never> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D37 = Expect<Equal<readonly [never] extends DN<never> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D38 = Expect<Equal<DN<string> extends DN<string | number> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D39 = Expect<Equal<DN<string | number> extends DN<string> ? true : false, TODO>>; // TODO(koan) @koan-error
type _D40 = Expect<Equal<readonly DN<string>[] extends DN<string> ? true : false, TODO>>; // TODO(koan) @koan-error

// Discriminated recursion exposes finite variants and recursive child fields.
type _D41 = Expect<Equal<DE["kind"], TODO>>; // TODO(koan) @koan-error
type _D42 = Expect<Equal<Extract<DE, { kind: "literal" }>["value"], TODO>>; // TODO(koan) @koan-error
type _D43 = Expect<Equal<Extract<DE, { kind: "group" }>["inner"], TODO>>; // TODO(koan) @koan-error
type _D44 = Expect<Equal<Extract<DE, { kind: "pair" }>["left"], TODO>>; // TODO(koan) @koan-error
type _D45 = Expect<Equal<Extract<DE, { kind: "pair" }>["right"], TODO>>; // TODO(koan) @koan-error
type _D46 = Expect<Equal<{ kind: "literal"; value: 1 } extends DE ? true : false, TODO>>; // TODO(koan) @koan-error
type _D47 = Expect<Equal<{ kind: "group"; inner: { kind: "literal"; value: 1 } } extends DE ? true : false, TODO>>; // TODO(koan) @koan-error
type _D48 = Expect<Equal<{ kind: "group"; inner: null } extends DE ? true : false, TODO>>; // TODO(koan) @koan-error
type _D49 = Expect<Equal<{ kind: "pair"; left: { kind: "literal"; value: 1 }; right: { kind: "literal"; value: 2 } } extends DE ? true : false, TODO>>; // TODO(koan) @koan-error
type _D50 = Expect<Equal<keyof Extract<DE, { kind: "pair" }>, TODO>>; // TODO(koan) @koan-error

// Recursive aliases compose with ordinary utility types one visible layer at a time.
type _D51 = Expect<Equal<Partial<DNode<string>>, TODO>>; // TODO(koan) @koan-error
type _D52 = Expect<Equal<Readonly<DNode<string>>, TODO>>; // TODO(koan) @koan-error
type _D53 = Expect<Equal<Pick<DNode<string>, "value">, TODO>>; // TODO(koan) @koan-error
type _D54 = Expect<Equal<Omit<DNode<string>, "next">, TODO>>; // TODO(koan) @koan-error
type _D55 = Expect<Equal<DNode<string>[keyof DNode<string>], TODO>>; // TODO(koan) @koan-error
type _D56 = Expect<Equal<Extract<DE, { kind: "group" }>["inner"]["kind"], TODO>>; // TODO(koan) @koan-error
type _D57 = Expect<Equal<Extract<Extract<DE, { kind: "group" }>["inner"], { kind: "literal" }>["value"], TODO>>; // TODO(koan) @koan-error
type _D58 = Expect<Equal<NonNullable<DL<1>>["next"], TODO>>; // TODO(koan) @koan-error
type _D59 = Expect<Equal<NonNullable<NonNullable<DL<1>>["next"]>["next"], TODO>>; // TODO(koan) @koan-error
type _D60 = Expect<Equal<DN<1> extends 1 | readonly unknown[] ? true : false, TODO>>; // TODO(koan) @koan-error
