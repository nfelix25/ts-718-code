import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/** K-036 edges: rest objects, nesting, mutable bindings, and separate reads weaken destructured correlation. */

type Action = { kind: "text"; payload: string } | { kind: "count"; payload: number };

// Group 1: Const sibling bindings preserve correlation, but may not narrow the original object.
function edgeOriginal(action: Action) {
  const { kind, payload } = action;
  if (kind === "text") {
    type _E001 = Expect<Equal<typeof kind, TODO>>; // TODO(koan) @koan-error
    type _E002 = Expect<Equal<typeof payload, TODO>>; // TODO(koan) @koan-error
    type _E003 = Expect<Equal<typeof action, TODO>>; // TODO(koan) @koan-error
  } else {
    type _E004 = Expect<Equal<typeof payload, TODO>>; // TODO(koan) @koan-error
    type _E005 = Expect<Equal<typeof action, TODO>>; // TODO(koan) @koan-error
  }
  type _E006 = Expect<Equal<typeof action, TODO>>; // TODO(koan) @koan-error
}
void edgeOriginal;

// Demonstration A: correlation chiefly links the extracted siblings. Keep the
// original object when downstream code needs the entire member narrowed.

// Group 2: Object rest does not retain a tag-to-rest relationship.
function edgeRest(action: Action) {
  const { kind, ...rest } = action;
  if (kind === "text") {
    type _E007 = Expect<Equal<typeof rest, TODO>>; // TODO(koan) @koan-error
    type _E008 = Expect<Equal<typeof rest.payload, TODO>>; // TODO(koan) @koan-error
  } else {
    type _E009 = Expect<Equal<typeof rest, TODO>>; // TODO(koan) @koan-error
    type _E010 = Expect<Equal<typeof rest.payload, TODO>>; // TODO(koan) @koan-error
  }
  type _E011 = Expect<Equal<typeof rest, TODO>>; // TODO(koan) @koan-error
  type _E012 = Expect<Equal<typeof kind, TODO>>; // TODO(koan) @koan-error
}
function edgeSeparate(action: Action) {
  const kind = action.kind;
  const payload = action.payload;
  if (kind === "text") {
    type _E013 = Expect<Equal<typeof payload, TODO>>; // TODO(koan) @koan-error
  }
  type _E014 = Expect<Equal<typeof payload, TODO>>; // TODO(koan) @koan-error
}
void edgeRest;
void edgeSeparate;

// Demonstration B: rest produces a union of tagless objects. Separate reads do
// not form the single destructuring operation that records sibling correlation.

// Group 3: Mutable bindings and assignments can create impossible combinations.
function edgeMutable(action: Action, flag: boolean) {
  let { kind, payload } = action;
  if (kind === "text") {
    type _E015 = Expect<Equal<typeof payload, TODO>>; // TODO(koan) @koan-error
  }
  kind = flag ? "text" : "count";
  type _E016 = Expect<Equal<typeof kind, TODO>>; // TODO(koan) @koan-error
  type _E017 = Expect<Equal<typeof payload, TODO>>; // TODO(koan) @koan-error
  payload = flag ? "next" : 1;
  type _E018 = Expect<Equal<typeof payload, TODO>>; // TODO(koan) @koan-error
  if (kind === "text") {
    type _E019 = Expect<Equal<typeof payload, TODO>>; // TODO(koan) @koan-error
  }
  type _E020 = Expect<Equal<typeof action, TODO>>; // TODO(koan) @koan-error
}
void edgeMutable;

// Demonstration C: independent let bindings permit `kind = "text"` beside a
// numeric payload, so no sound narrowing can reconnect them.

// Group 4: Nested and generic unions expose the boundary of correlation analysis.
type Nested = { meta: { kind: "a" }; payload: string } | { meta: { kind: "b" }; payload: number };
function edgeNested(value: Nested) {
  const { meta, payload } = value;
  if (meta.kind === "a") {
    type _E021 = Expect<Equal<typeof meta, TODO>>; // TODO(koan) @koan-error
    type _E022 = Expect<Equal<typeof payload, TODO>>; // TODO(koan) @koan-error
  }
  const { kind } = meta;
  if (kind === "a") {
    type _E023 = Expect<Equal<typeof kind, TODO>>; // TODO(koan) @koan-error
    type _E024 = Expect<Equal<typeof payload, TODO>>; // TODO(koan) @koan-error
  }
}
function edgeGeneric<T extends Action>(value: T) {
  const { kind, payload } = value;
  if (kind === "text") {
    type _E025 = Expect<Equal<typeof kind, TODO>>; // TODO(koan) @koan-error
    type _E026 = Expect<Equal<typeof payload, TODO>>; // TODO(koan) @koan-error
    type _E027 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
type Tuple = ["text", string] | ["count", number];
function edgeTupleRest(value: Tuple) {
  const [kind, ...rest] = value;
  if (kind === "text") {
    type _E028 = Expect<Equal<typeof rest, TODO>>; // TODO(koan) @koan-error
    type _E029 = Expect<Equal<typeof rest[0], TODO>>; // TODO(koan) @koan-error
  }
  type _E030 = Expect<Equal<typeof rest, TODO>>; // TODO(koan) @koan-error
}
void edgeNested;
void edgeGeneric;
void edgeTupleRest;

// Demonstration D: nested paths and rest bindings are harder to correlate than
// flat sibling const bindings. Prefer a direct whole-value guard in those cases.
