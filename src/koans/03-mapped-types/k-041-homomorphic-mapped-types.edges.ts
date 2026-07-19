import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/** K-041 edges: syntactic key provenance, optional reads, primitives, unions, and shallow values test homomorphism. */

type EHomo<T> = { [K in keyof T]: boolean };
type EIdentity<T> = { [K in keyof T]: T[K] };

// Group 1: Equal-looking key unions do not necessarily carry modifier provenance.
interface ESource { readonly id: number; name?: string; active: boolean }
type EFresh = { [K in keyof ESource]: boolean };
type ERecord = Record<keyof ESource, boolean>;
type EAliasKeys = keyof ESource;
type EAliasMap = { [K in EAliasKeys]: boolean };
type _E001 = Expect<Equal<EFresh, TODO>>; // TODO(koan) @koan-error
type _E002 = Expect<Equal<ERecord, TODO>>; // TODO(koan) @koan-error
type _E003 = Expect<Equal<EAliasMap, TODO>>; // TODO(koan) @koan-error
type _E004 = Expect<Equal<EFresh["name"], TODO>>; // TODO(koan) @koan-error
type _E005 = Expect<Equal<ERecord["name"], TODO>>; // TODO(koan) @koan-error
type _E006 = Expect<Equal<EAliasMap["name"], TODO>>; // TODO(koan) @koan-error
type _E007 = Expect<Equal<EHomo<ESource>, TODO>>; // TODO(koan) @koan-error
type _E008 = Expect<Equal<keyof EHomo<ESource>, TODO>>; // TODO(koan) @koan-error

// Demonstration A: homomorphism depends on the mapping's relationship to T, not
// merely on two key unions being equal after evaluation.

// Group 2: Optional markers and indexed reads are related but not identical facts.
type EOptional = { value?: string };
type EMappedOptional = EHomo<EOptional>;
type _E009 = Expect<Equal<EMappedOptional, TODO>>; // TODO(koan) @koan-error
type _E010 = Expect<Equal<EMappedOptional["value"], TODO>>; // TODO(koan) @koan-error
type _E011 = Expect<Equal<EIdentity<EOptional>, TODO>>; // TODO(koan) @koan-error
type _E012 = Expect<Equal<EIdentity<EOptional>["value"], TODO>>; // TODO(koan) @koan-error
type EExplicitUndefined = { value: string | undefined };
type _E013 = Expect<Equal<EHomo<EExplicitUndefined>, TODO>>; // TODO(koan) @koan-error
type _E014 = Expect<Equal<EHomo<EExplicitUndefined>["value"], TODO>>; // TODO(koan) @koan-error
type _E015 = Expect<Equal<EOptional extends EExplicitUndefined ? true : false, TODO>>; // TODO(koan) @koan-error
type _E016 = Expect<Equal<EExplicitUndefined extends EOptional ? true : false, TODO>>; // TODO(koan) @koan-error

// Demonstration B: an optional property may be absent; a required property whose
// value includes undefined must be present. Indexed reads can include undefined in both.

// Group 3: Generic homomorphic behavior over primitives and containers is special.
type _E017 = Expect<Equal<EIdentity<string>, TODO>>; // TODO(koan) @koan-error
type _E018 = Expect<Equal<EHomo<string>, TODO>>; // TODO(koan) @koan-error
type _E019 = Expect<Equal<EIdentity<readonly ["a", 1]>, TODO>>; // TODO(koan) @koan-error
type _E020 = Expect<Equal<EHomo<readonly ["a", 1]>, TODO>>; // TODO(koan) @koan-error
type _E021 = Expect<Equal<EIdentity<() => string>, TODO>>; // TODO(koan) @koan-error
type _E022 = Expect<Equal<EHomo<() => string>, TODO>>; // TODO(koan) @koan-error
type _E023 = Expect<Equal<EIdentity<Date>, TODO>>; // TODO(koan) @koan-error
type _E024 = Expect<Equal<EHomo<Date>, TODO>>; // TODO(koan) @koan-error

// Demonstration C: arrays and tuples receive container-aware mapping. Other
// object-like built-ins expose their declared property surfaces instead.

// Group 4: Shallow mapping, special types, and union inputs retain their own algebra.
interface ENested { readonly child?: { mutable: string } }
type _E025 = Expect<Equal<EIdentity<ENested>, TODO>>; // TODO(koan) @koan-error
type _E026 = Expect<Equal<EIdentity<ENested>["child"], TODO>>; // TODO(koan) @koan-error
type _E027 = Expect<Equal<EHomo<never>, TODO>>; // TODO(koan) @koan-error
type _E028 = Expect<Equal<EHomo<unknown>, TODO>>; // TODO(koan) @koan-error
type _E029 = Expect<Equal<EHomo<any>, TODO>>; // TODO(koan) @koan-error
type EUnion = { readonly a?: string } | { readonly b: number };
type _E030 = Expect<Equal<EHomo<EUnion>, TODO>>; // TODO(koan) @koan-error

// Demonstration D: mapped types over unions have distribution and keyof subtleties
// that receive dedicated treatment in k-049 and k-050.
