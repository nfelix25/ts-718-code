import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/** K-042 edges: exact optionality, readonly assignability, containers, shallow values, and composition order sharpen modifier algebra. */

type EMutable<T> = { -readonly [K in keyof T]: T[K] };
type ERequired<T> = { [K in keyof T]-?: T[K] };
type EReadonly<T> = { +readonly [K in keyof T]: T[K] };
type EOptional<T> = { [K in keyof T]+?: T[K] };

// Group 1: Removing optionality changes presence but preserves explicit undefined.
interface EValues {
  absent?: string;
  explicit: string | undefined;
  both?: string | undefined;
}
type EConcrete = ERequired<EValues>;
type _E001 = Expect<Equal<EConcrete, TODO>>; // TODO(koan) @koan-error
type _E002 = Expect<Equal<EConcrete["absent"], TODO>>; // TODO(koan) @koan-error
type _E003 = Expect<Equal<EConcrete["explicit"], TODO>>; // TODO(koan) @koan-error
type _E004 = Expect<Equal<EConcrete["both"], TODO>>; // TODO(koan) @koan-error
type _E005 = Expect<Equal<EOptional<EConcrete>, TODO>>; // TODO(koan) @koan-error
type _E006 = Expect<Equal<EOptional<EConcrete>["explicit"], TODO>>; // TODO(koan) @koan-error
type _E007 = Expect<Equal<ERequired<EOptional<EConcrete>>, TODO>>; // TODO(koan) @koan-error
type _E008 = Expect<Equal<keyof EConcrete, TODO>>; // TODO(koan) @koan-error

// Demonstration A: `-?` does not mean NonNullable. It removes the possibility of
// omission; any explicit undefined union member remains in the value type.

// Group 2: Readonly affects writes more than structural assignability.
interface EMutablePoint { x: number; y: number }
interface EReadonlyPoint { readonly x: number; readonly y: number }
type _E009 = Expect<Equal<EReadonly<EMutablePoint>, TODO>>; // TODO(koan) @koan-error
type _E010 = Expect<Equal<EMutable<EReadonlyPoint>, TODO>>; // TODO(koan) @koan-error
type _E011 = Expect<Equal<EMutablePoint extends EReadonlyPoint ? true : false, TODO>>; // TODO(koan) @koan-error
type _E012 = Expect<Equal<EReadonlyPoint extends EMutablePoint ? true : false, TODO>>; // TODO(koan) @koan-error
type _E013 = Expect<Equal<Readonly<EMutablePoint>, TODO>>; // TODO(koan) @koan-error
type _E014 = Expect<Equal<EMutable<Readonly<EMutablePoint>>, TODO>>; // TODO(koan) @koan-error
type _E015 = Expect<Equal<EReadonly<EMutable<EReadonlyPoint>>, TODO>>; // TODO(koan) @koan-error
type _E016 = Expect<Equal<EMutable<EReadonly<EMutablePoint>>, TODO>>; // TODO(koan) @koan-error

// Demonstration B: TypeScript's structural assignability often permits readonly
// and mutable object views in both directions; readonly primarily blocks writes through a view.

// Group 3: Modifier transforms are shallow and container-aware.
interface ENested { readonly config?: { readonly enabled: boolean; tags: readonly string[] } }
type _E017 = Expect<Equal<EMutable<ERequired<ENested>>, TODO>>; // TODO(koan) @koan-error
type _E018 = Expect<Equal<EMutable<ERequired<ENested>>["config"], TODO>>; // TODO(koan) @koan-error
type _E019 = Expect<Equal<EReadonly<string[]>, TODO>>; // TODO(koan) @koan-error
type _E020 = Expect<Equal<EMutable<readonly string[]>, TODO>>; // TODO(koan) @koan-error
type _E021 = Expect<Equal<EReadonly<[string, number]>, TODO>>; // TODO(koan) @koan-error
type _E022 = Expect<Equal<EMutable<readonly [string, number]>, TODO>>; // TODO(koan) @koan-error
type _E023 = Expect<Equal<EOptional<[string, number]>, TODO>>; // TODO(koan) @koan-error
type _E024 = Expect<Equal<ERequired<[string?, number?]>, TODO>>; // TODO(koan) @koan-error

// Demonstration C: object transforms do not recurse into config, while the same
// homomorphic syntax changes an array or tuple container's own modifiers.

// Group 4: Order, idempotence, empty domains, and special types complete the algebra.
interface EMixed { readonly id?: number; name: string }
type _E025 = Expect<Equal<EMutable<EMutable<EMixed>>, TODO>>; // TODO(koan) @koan-error
type _E026 = Expect<Equal<EReadonly<EReadonly<EMixed>>, TODO>>; // TODO(koan) @koan-error
type _E027 = Expect<Equal<ERequired<ERequired<EMixed>>, TODO>>; // TODO(koan) @koan-error
type _E028 = Expect<Equal<EOptional<EOptional<EMixed>>, TODO>>; // TODO(koan) @koan-error
type _E029 = Expect<Equal<EMutable<EReadonly<EMixed>>, TODO>>; // TODO(koan) @koan-error
type _E030 = Expect<Equal<EReadonly<EMutable<EMixed>>, TODO>>; // TODO(koan) @koan-error

// The `+` and `-` modifier operators are mapped-type grammar; ordinary property
// declarations use `readonly` and `?` without algebraic prefixes.
