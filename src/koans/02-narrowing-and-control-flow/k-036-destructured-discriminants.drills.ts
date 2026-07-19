import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/** K-036 drills: repeat correlated object, parameter, renamed, switch, and tuple destructuring. */

type Action = { kind: "text"; payload: string } | { kind: "count"; payload: number };

// Group 1: Const object destructuring correlates sibling bindings.
function drillConst(action: Action) {
  const { kind, payload } = action;
  if (kind === "text") {
    type _D001 = Expect<Equal<typeof kind, TODO>>; // TODO(koan) @koan-error
    type _D002 = Expect<Equal<typeof payload, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D003 = Expect<Equal<typeof kind, TODO>>; // TODO(koan) @koan-error
    type _D004 = Expect<Equal<typeof payload, TODO>>; // TODO(koan) @koan-error
  }
  if (kind !== "text") {
    type _D005 = Expect<Equal<typeof payload, TODO>>; // TODO(koan) @koan-error
  }
  type _D006 = Expect<Equal<typeof kind, TODO>>; // TODO(koan) @koan-error
  type _D007 = Expect<Equal<typeof payload, TODO>>; // TODO(koan) @koan-error
  type _D008 = Expect<Equal<typeof action, TODO>>; // TODO(koan) @koan-error
}
function drillBoolean(action: { ok: true; value: string } | { ok: false; value: Error }) {
  const { ok, value } = action;
  if (ok) {
    type _D009 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D010 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  type _D011 = Expect<Equal<typeof ok, TODO>>; // TODO(koan) @koan-error
  type _D012 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
}
void drillConst;
void drillBoolean;

// Group 2: Switches and renamed bindings preserve the same relationship.
type Event =
  | { type: "text"; data: string }
  | { type: "count"; data: number }
  | { type: "flag"; data: boolean };
function drillSwitch(event: Event) {
  const { type, data } = event;
  switch (type) {
    case "text":
      type _D013 = Expect<Equal<typeof data, TODO>>; // TODO(koan) @koan-error
      break;
    case "count":
      type _D014 = Expect<Equal<typeof data, TODO>>; // TODO(koan) @koan-error
      break;
    case "flag":
      type _D015 = Expect<Equal<typeof data, TODO>>; // TODO(koan) @koan-error
      break;
  }
  type _D016 = Expect<Equal<typeof data, TODO>>; // TODO(koan) @koan-error
}
function drillRename(action: Action) {
  const { kind: category, payload: data } = action;
  if (category === "text") {
    type _D017 = Expect<Equal<typeof category, TODO>>; // TODO(koan) @koan-error
    type _D018 = Expect<Equal<typeof data, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D019 = Expect<Equal<typeof category, TODO>>; // TODO(koan) @koan-error
    type _D020 = Expect<Equal<typeof data, TODO>>; // TODO(koan) @koan-error
  }
  const isText = category === "text";
  if (isText) {
    type _D021 = Expect<Equal<typeof data, TODO>>; // TODO(koan) @koan-error
  }
  type _D022 = Expect<Equal<typeof data, TODO>>; // TODO(koan) @koan-error
  type _D023 = Expect<Equal<typeof action, TODO>>; // TODO(koan) @koan-error
  type _D024 = Expect<Equal<typeof isText, TODO>>; // TODO(koan) @koan-error
}
void drillSwitch;
void drillRename;

// Group 3: Destructured parameters carry correlation when not assigned.
function drillParameter({ kind, payload }: Action) {
  if (kind === "text") {
    type _D025 = Expect<Equal<typeof kind, TODO>>; // TODO(koan) @koan-error
    type _D026 = Expect<Equal<typeof payload, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D027 = Expect<Equal<typeof kind, TODO>>; // TODO(koan) @koan-error
    type _D028 = Expect<Equal<typeof payload, TODO>>; // TODO(koan) @koan-error
  }
}
function drillParameterSwitch({ type, data }: Event) {
  switch (type) {
    case "text":
      type _D029 = Expect<Equal<typeof data, TODO>>; // TODO(koan) @koan-error
      break;
    case "count":
      type _D030 = Expect<Equal<typeof data, TODO>>; // TODO(koan) @koan-error
      break;
    case "flag":
      type _D031 = Expect<Equal<typeof data, TODO>>; // TODO(koan) @koan-error
  }
  type _D032 = Expect<Equal<typeof data, TODO>>; // TODO(koan) @koan-error
}
function drillDefault({ kind, payload }: Action = { kind: "count", payload: 0 }) {
  if (kind === "text") {
    type _D033 = Expect<Equal<typeof payload, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D034 = Expect<Equal<typeof payload, TODO>>; // TODO(koan) @koan-error
  }
  return payload;
}
type _D035 = Expect<Equal<ReturnType<typeof drillDefault>, TODO>>; // TODO(koan) @koan-error
type _D036 = Expect<Equal<Parameters<typeof drillParameter>, TODO>>; // TODO(koan) @koan-error
void drillParameter;
void drillParameterSwitch;

// Group 4: Discriminated tuple destructuring correlates fixed positions.
type Tuple = ["text", string] | ["count", number] | ["flag", boolean];
function drillTuple(tuple: Tuple) {
  const [kind, payload] = tuple;
  if (kind === "text") {
    type _D037 = Expect<Equal<typeof payload, TODO>>; // TODO(koan) @koan-error
  } else if (kind === "count") {
    type _D038 = Expect<Equal<typeof payload, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D039 = Expect<Equal<typeof payload, TODO>>; // TODO(koan) @koan-error
  }
  type _D040 = Expect<Equal<typeof kind, TODO>>; // TODO(koan) @koan-error
  type _D041 = Expect<Equal<typeof payload, TODO>>; // TODO(koan) @koan-error
  type _D042 = Expect<Equal<typeof tuple, TODO>>; // TODO(koan) @koan-error
}
function drillTupleParameter([kind, payload]: Tuple) {
  if (kind === "text") {
    type _D043 = Expect<Equal<typeof payload, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D044 = Expect<Equal<typeof payload, TODO>>; // TODO(koan) @koan-error
  }
}
type ReadonlyTuple = readonly ["ok", string] | readonly ["error", Error];
function drillReadonly(tuple: ReadonlyTuple) {
  const [kind, payload] = tuple;
  if (kind === "ok") {
    type _D045 = Expect<Equal<typeof payload, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D046 = Expect<Equal<typeof payload, TODO>>; // TODO(koan) @koan-error
  }
  type _D047 = Expect<Equal<typeof kind, TODO>>; // TODO(koan) @koan-error
  type _D048 = Expect<Equal<typeof payload, TODO>>; // TODO(koan) @koan-error
}
void drillTuple;
void drillTupleParameter;
void drillReadonly;

// Group 5: Mutable, separate, rest, and nested bindings lose useful links.
function drillLimits(action: Action) {
  let { kind, payload } = action;
  if (kind === "text") {
    type _D049 = Expect<Equal<typeof payload, TODO>>; // TODO(koan) @koan-error
  }
  const separateKind = action.kind;
  const separatePayload = action.payload;
  if (separateKind === "text") {
    type _D050 = Expect<Equal<typeof separatePayload, TODO>>; // TODO(koan) @koan-error
  }
  const { kind: restKind, ...rest } = action;
  if (restKind === "text") {
    type _D051 = Expect<Equal<typeof rest, TODO>>; // TODO(koan) @koan-error
    type _D052 = Expect<Equal<typeof rest.payload, TODO>>; // TODO(koan) @koan-error
  }
  type _D053 = Expect<Equal<typeof rest, TODO>>; // TODO(koan) @koan-error
  type _D054 = Expect<Equal<typeof payload, TODO>>; // TODO(koan) @koan-error
  kind = "count";
  payload = 1;
}
type Nested = { meta: { kind: "a" }; payload: string } | { meta: { kind: "b" }; payload: number };
function drillNested(value: Nested) {
  const { meta, payload } = value;
  if (meta.kind === "a") {
    type _D055 = Expect<Equal<typeof payload, TODO>>; // TODO(koan) @koan-error
  }
  const { kind } = meta;
  if (kind === "a") {
    type _D056 = Expect<Equal<typeof payload, TODO>>; // TODO(koan) @koan-error
  }
  type _D057 = Expect<Equal<typeof meta, TODO>>; // TODO(koan) @koan-error
  type _D058 = Expect<Equal<typeof payload, TODO>>; // TODO(koan) @koan-error
}
type _D059 = Expect<Equal<ReturnType<typeof drillLimits>, TODO>>; // TODO(koan) @koan-error
type _D060 = Expect<Equal<Parameters<typeof drillNested>, TODO>>; // TODO(koan) @koan-error
void drillLimits;
void drillNested;
