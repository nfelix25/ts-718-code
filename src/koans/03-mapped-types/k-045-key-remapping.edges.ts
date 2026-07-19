import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/** K-045 edges: collisions, modifier provenance, broad outputs, union discriminators, and invalid destinations stress remapping. */

// Group 1: Collisions merge values and can combine modifier contributions.
interface ESource { readonly id: number; name?: string; active: boolean }
type ECollapse = { [K in keyof ESource as "value"]: ESource[K] };
type EPartial = { [K in keyof ESource as K extends "id" | "name" ? "identity" : K]: ESource[K] };
type _E001 = Expect<Equal<ECollapse, TODO>>; // TODO(koan) @koan-error
type _E002 = Expect<Equal<ECollapse["value"], TODO>>; // TODO(koan) @koan-error
type _E003 = Expect<Equal<keyof ECollapse, TODO>>; // TODO(koan) @koan-error
type _E004 = Expect<Equal<EPartial, TODO>>; // TODO(koan) @koan-error
type _E005 = Expect<Equal<EPartial["identity"], TODO>>; // TODO(koan) @koan-error
type _E006 = Expect<Equal<EPartial["active"], TODO>>; // TODO(koan) @koan-error
type _E007 = Expect<Equal<keyof EPartial, TODO>>; // TODO(koan) @koan-error
type ERequiredCollapse = { [K in keyof ESource as "value"]-?: ESource[K] };
type _E008 = Expect<Equal<ERequiredCollapse, TODO>>; // TODO(koan) @koan-error

// Demonstration A: many source properties can target one key. The output value is
// the union of their contributions; explicit mapped modifiers make collision policy clear.

// Group 2: Identity remapping and fresh broad outputs have different structure.
type EIdentity<T> = { [K in keyof T as K]: T[K] };
type EBroad<T> = { [K in keyof T as string]: T[K] };
type _E009 = Expect<Equal<EIdentity<ESource>, TODO>>; // TODO(koan) @koan-error
type _E010 = Expect<Equal<EIdentity<ESource>["name"], TODO>>; // TODO(koan) @koan-error
type _E011 = Expect<Equal<EBroad<ESource>, TODO>>; // TODO(koan) @koan-error
type _E012 = Expect<Equal<keyof EBroad<ESource>, TODO>>; // TODO(koan) @koan-error
type _E013 = Expect<Equal<EBroad<ESource>[string], TODO>>; // TODO(koan) @koan-error
type ENumberBroad<T> = { [K in keyof T as number]: T[K] };
type _E014 = Expect<Equal<ENumberBroad<ESource>, TODO>>; // TODO(koan) @koan-error
type _E015 = Expect<Equal<keyof ENumberBroad<ESource>, TODO>>; // TODO(koan) @koan-error
type _E016 = Expect<Equal<ENumberBroad<ESource>[number], TODO>>; // TODO(koan) @koan-error

// Demonstration B: returning broad string/number creates index-like output and
// collapses every source value into that index's value union.

// Group 3: Discriminator collisions reveal whether a union really has unique tags.
type EDuplicateEvent =
  | { type: "data"; text: string }
  | { type: "data"; bytes: Uint8Array }
  | { type: "end" };
type EHandlers<E extends { type: PropertyKey }> = { [V in E as V["type"]]: (event: V) => void };
type EPayloads<E extends { type: PropertyKey }> = { [V in E as V["type"]]: V };
type _E017 = Expect<Equal<EHandlers<EDuplicateEvent>, TODO>>; // TODO(koan) @koan-error
type _E018 = Expect<Equal<Parameters<EHandlers<EDuplicateEvent>["data"]>, TODO>>; // TODO(koan) @koan-error
type _E019 = Expect<Equal<EPayloads<EDuplicateEvent>, TODO>>; // TODO(koan) @koan-error
type _E020 = Expect<Equal<EPayloads<EDuplicateEvent>["data"], TODO>>; // TODO(koan) @koan-error
type _E021 = Expect<Equal<keyof EHandlers<EDuplicateEvent>, TODO>>; // TODO(koan) @koan-error
type _E022 = Expect<Equal<EHandlers<never>, TODO>>; // TODO(koan) @koan-error
type _E023 = Expect<Equal<EPayloads<never>, TODO>>; // TODO(koan) @koan-error
type _E024 = Expect<Equal<keyof EPayloads<EDuplicateEvent>, TODO>>; // TODO(koan) @koan-error

// Demonstration C: duplicate discriminator values collide. Payload maps union the
// members cleanly; function-valued collisions can expose intersection-like call constraints.

// Group 4: Union expansion, never, mixed PropertyKey targets, and validation boundaries.
declare const eSymbol: unique symbol;
type EExpand<T> = { [K in keyof T as K | 0 | typeof eSymbol]: T[K] };
type _E025 = Expect<Equal<EExpand<{ a: string; b: number }>, TODO>>; // TODO(koan) @koan-error
type _E026 = Expect<Equal<EExpand<{ a: string; b: number }>[0], TODO>>; // TODO(koan) @koan-error
type _E027 = Expect<Equal<EExpand<{ a: string; b: number }>[typeof eSymbol], TODO>>; // TODO(koan) @koan-error
type ENone<T> = { [K in keyof T as never]: T[K] };
type _E028 = Expect<Equal<ENone<ESource>, TODO>>; // TODO(koan) @koan-error
type _E029 = Expect<Equal<keyof ENone<ESource>, TODO>>; // TODO(koan) @koan-error
type _E030 = Expect<Equal<EIdentity<any>, TODO>>; // TODO(koan) @koan-error

// @ts-expect-error A remapped destination must still be assignable to PropertyKey.
type InvalidDestination<T> = { [K in keyof T as { source: K }]: T[K] };
