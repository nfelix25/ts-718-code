import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/** K-044 edges: tuple keys, optional reads, rest length, detached mappings, and method surfaces sharpen container mapping. */

type EIdentity<T> = { [K in keyof T]: T[K] };
type EStrings<T> = { [K in keyof T]: string };

// Group 1: Tuple keyof is broader than its fixed position labels.
type EPair = readonly ["a", 1];
type _E001 = Expect<Equal<keyof EPair, TODO>>; // TODO(koan) @koan-error
type _E002 = Expect<Equal<"0" extends keyof EPair ? true : false, TODO>>; // TODO(koan) @koan-error
type _E003 = Expect<Equal<"1" extends keyof EPair ? true : false, TODO>>; // TODO(koan) @koan-error
type _E004 = Expect<Equal<number extends keyof EPair ? true : false, TODO>>; // TODO(koan) @koan-error
type _E005 = Expect<Equal<"length" extends keyof EPair ? true : false, TODO>>; // TODO(koan) @koan-error
type _E006 = Expect<Equal<EPair[0], TODO>>; // TODO(koan) @koan-error
type _E007 = Expect<Equal<EPair[number], TODO>>; // TODO(koan) @koan-error
type _E008 = Expect<Equal<EPair["length"], TODO>>; // TODO(koan) @koan-error

// Demonstration A: homomorphic tuple mapping filters and handles those keys as a
// tuple operation; it does not naively replace every array method with the value type.

// Group 2: Optional slots combine declared optionality with indexed-read uncertainty.
type EMaybe = [name?: string, count?: number | undefined];
type _E009 = Expect<Equal<EMaybe, TODO>>; // TODO(koan) @koan-error
type _E010 = Expect<Equal<EMaybe[0], TODO>>; // TODO(koan) @koan-error
type _E011 = Expect<Equal<EMaybe[1], TODO>>; // TODO(koan) @koan-error
type _E012 = Expect<Equal<EMaybe[number], TODO>>; // TODO(koan) @koan-error
type _E013 = Expect<Equal<Required<EMaybe>, TODO>>; // TODO(koan) @koan-error
type _E014 = Expect<Equal<Required<EMaybe>[0], TODO>>; // TODO(koan) @koan-error
type _E015 = Expect<Equal<Required<EMaybe>[1], TODO>>; // TODO(koan) @koan-error
type _E016 = Expect<Equal<Partial<[string, number]>, TODO>>; // TODO(koan) @koan-error

// Demonstration B: requiring a slot removes absence, not explicit undefined from
// its declared value. Optional tuple reads still observe undefined.

// Group 3: Rest tuples have non-literal lengths and position-dependent head behavior.
type ERest = [head: string, ...tail: number[]];
type EOnlyRest = [...items: boolean[]];
type _E017 = Expect<Equal<ERest[0], TODO>>; // TODO(koan) @koan-error
type _E018 = Expect<Equal<ERest[1], TODO>>; // TODO(koan) @koan-error
type _E019 = Expect<Equal<ERest[number], TODO>>; // TODO(koan) @koan-error
type _E020 = Expect<Equal<ERest["length"], TODO>>; // TODO(koan) @koan-error
type _E021 = Expect<Equal<EStrings<ERest>, TODO>>; // TODO(koan) @koan-error
type _E022 = Expect<Equal<EOnlyRest, TODO>>; // TODO(koan) @koan-error
type _E023 = Expect<Equal<EOnlyRest["length"], TODO>>; // TODO(koan) @koan-error
type _E024 = Expect<Equal<EStrings<EOnlyRest>, TODO>>; // TODO(koan) @koan-error

// Demonstration C: an unbounded rest makes length number. A fixed prefix still
// retains its positional value even though later numeric indexes come from the rest.

// Group 4: Detached mappings, empty tuples, readonly conversion, and special inputs.
type ENumeric<T extends readonly unknown[]> = { [K in keyof T & number]: T[K] };
type _E025 = Expect<Equal<ENumeric<EPair>, TODO>>; // TODO(koan) @koan-error
type _E026 = Expect<Equal<EIdentity<EPair>, TODO>>; // TODO(koan) @koan-error
type _E027 = Expect<Equal<EStrings<readonly []>, TODO>>; // TODO(koan) @koan-error
type _E028 = Expect<Equal<EStrings<readonly []>[number], TODO>>; // TODO(koan) @koan-error
type _E029 = Expect<Equal<{ -readonly [K in keyof EPair]: EPair[K] }, TODO>>; // TODO(koan) @koan-error
type _E030 = Expect<Equal<EStrings<any>, TODO>>; // TODO(koan) @koan-error

// Demonstration D: mapping a detached numeric domain creates an index-like object;
// homomorphic mapping preserves the tuple. Empty tuple element unions are never.
