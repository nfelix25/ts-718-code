import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/** K-029 edges: overlapping tags, mutable correlations, nesting, and structural impostors weaken selection. */

// Group 1: Broad, optional, and shared tags overlap branches.
type BroadTag = { kind: "known"; value: number } | { kind: string; raw: unknown };
function edgeBroad(value: BroadTag) {
  if (value.kind === "known") {
    type _E001 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _E002 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (value.kind === "other") {
    type _E003 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
type OptionalTag = { kind: "fixed"; value: number } | { kind?: "optional"; note: string };
function edgeOptional(value: OptionalTag) {
  if (value.kind === "fixed") {
    type _E004 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _E005 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (value.kind === undefined) {
    type _E006 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
type SharedTag = { kind: "same"; left: string } | { kind: "same"; right: number };
function edgeShared(value: SharedTag) {
  if (value.kind === "same") {
    type _E007 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  type _E008 = Expect<Equal<keyof SharedTag, TODO>>; // TODO(koan) @koan-error
  const kind = value.kind;
  type _E009 = Expect<Equal<typeof kind, TODO>>; // TODO(koan) @koan-error
  type _E010 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
}
void edgeBroad;
void edgeOptional;
void edgeShared;

// Demonstration A: a broad string member can also have kind "known", so it
// remains beside the specifically tagged member on the true branch.
function solvedBroad(value: BroadTag) {
  if (value.kind === "known") {
    type _Solved = Expect<Equal<typeof value, BroadTag>>;
  }
}
void solvedBroad;

// Group 2: Location and mutation determine whether correlations are available.
type Mutable = { kind: "text"; value: string } | { kind: "count"; value: number };
function edgeMutable(value: Mutable) {
  if (value.kind === "text") {
    type _E011 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    value.kind = "text";
    type _E012 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
function edgeDestructure(value: Mutable) {
  const { kind, value: payload } = value;
  if (kind === "text") {
    type _E013 = Expect<Equal<typeof kind, TODO>>; // TODO(koan) @koan-error
    type _E014 = Expect<Equal<typeof payload, TODO>>; // TODO(koan) @koan-error
  } else {
    type _E015 = Expect<Equal<typeof payload, TODO>>; // TODO(koan) @koan-error
  }
  type _E016 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
}
type Nested = { meta: { kind: "a" }; a: number } | { meta: { kind: "b" }; b: string };
function edgeNested(value: Nested) {
  if (value.meta.kind === "a") {
    type _E017 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    type _E018 = Expect<Equal<typeof value.meta.kind, TODO>>; // TODO(koan) @koan-error
  }
}
void edgeMutable;
void edgeDestructure;
void edgeNested;

// Demonstration B: top-level const destructuring preserves useful correlation
// in modern TypeScript. A nested discriminant narrows that nested literal but
// does not necessarily select the containing object union.

// Group 3: Symbols, numbers, tuples, and structural values still obey runtime identity.
declare const tagA: unique symbol;
declare const tagB: unique symbol;
type SymbolState = { tag: typeof tagA; a: string } | { tag: typeof tagB; b: number };
function edgeSymbol(value: SymbolState) {
  if (value.tag === tagA) {
    type _E019 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _E020 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
type NumberState = { tag: 0; zero: true } | { tag: 1; one: true };
function edgeNumber(value: NumberState) {
  if (value.tag) {
    type _E021 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _E022 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
type TupleState = readonly ["ok", string] | readonly ["error", Error];
function edgeTuple(value: TupleState) {
  if (value[0] === "ok") {
    type _E023 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    type _E024 = Expect<Equal<typeof value[1], TODO>>; // TODO(koan) @koan-error
  }
}
void edgeSymbol;
void edgeNumber;
void edgeTuple;

// Demonstration C: TypeScript's union is structural. Any object with the right
// literal tag and fields can participate; no nominal constructor is required.

// Group 4: unknown needs shape evidence; any and generics keep their own limits.
type Kind<T> = 0 extends 1 & T ? "any" : [T] extends [never] ? "never" : "ordinary";
function edgeUnknown(value: unknown) {
  if (typeof value === "object" && value !== null && "kind" in value && value.kind === "ready") {
    type _E025 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    type _E026 = Expect<Equal<typeof value.kind, TODO>>; // TODO(koan) @koan-error
  }
}
function edgeAny(value: any) {
  if (value.kind === "ready") {
    type _E027 = Expect<Equal<Kind<typeof value>, TODO>>; // TODO(koan) @koan-error
  }
}
function edgeNever(value: never) {
  type _E028 = Expect<Equal<Kind<typeof value>, TODO>>; // TODO(koan) @koan-error
}
function edgeGeneric<T extends Mutable>(value: T) {
  if (value.kind === "text") {
    type _E029 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    type _E030 = Expect<Equal<typeof value.value, TODO>>; // TODO(koan) @koan-error
  }
}
void edgeUnknown;
void edgeAny;
void edgeNever;
void edgeGeneric;

// Demonstration D: checking an unknown record's kind proves only that literal
// property. It does not invent the rest of an application-specific union member.
