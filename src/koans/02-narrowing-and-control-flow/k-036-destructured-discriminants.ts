import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-036: destructured discriminants
 * =============================================================================
 *
 * Destructuring usually creates independent bindings, but TypeScript preserves
 * a useful correlation when a discriminated union is destructured into stable
 * `const` bindings or never-assigned parameter bindings. Narrowing the extracted
 * tag can then narrow its sibling payload even though neither is accessed
 * through the original object.
 *
 * I read `const { kind, payload } = action` aloud as:
 *
 *   "kind and payload came from the same union member; keep that relationship
 *    while both bindings remain immutable."
 *
 * Renaming does not break the relationship, and tuple-head/element destructuring
 * works similarly. Mutable `let` bindings can be reassigned independently, so
 * they lose correlation. Separate property reads and object-rest destructuring
 * also produce shapes the checker cannot reliably reconnect. When narrowing is
 * critical, keep the whole union value or destructure its correlated fields in
 * one stable declaration.
 */

export type Action =
  | { kind: "text"; payload: string }
  | { kind: "count"; payload: number };

export function handleAction(action: Action): string {
  const { kind, payload } = action;
  return kind === "text" ? payload.toUpperCase() : payload.toFixed(0);
}

export type Result =
  | { ok: true; value: string }
  | { ok: false; value: Error };

export function renderResult({ ok, value }: Result): string {
  return ok ? value : value.message;
}

export type TupleAction = ["add", number] | ["label", string];

export function runTuple([kind, payload]: TupleAction): string {
  return kind === "add" ? String(payload + 1) : payload.toUpperCase();
}

export function renamed(action: Action): string {
  const { kind: category, payload: data } = action;
  return category === "text" ? data : String(data);
}

export function keepWhole(action: Action): string {
  if (action.kind === "text") return action.payload;
  return String(action.payload);
}

// Part 1: Sibling const bindings retain their common union-member origin.
function mainConst(action: Action) {
  const { kind, payload } = action;
  if (kind === "text") {
    type _Main01 = Expect<Equal<typeof kind, TODO>>; // TODO(koan) @koan-error
    type _Main02 = Expect<Equal<typeof payload, TODO>>; // TODO(koan) @koan-error
  } else {
    type _Main03 = Expect<Equal<typeof kind, TODO>>; // TODO(koan) @koan-error
    type _Main04 = Expect<Equal<typeof payload, TODO>>; // TODO(koan) @koan-error
  }
}
void mainConst;

// Part 2: Switch cases correlate one tag with one payload variant.
type MainEvent =
  | { type: "name"; data: string }
  | { type: "age"; data: number }
  | { type: "active"; data: boolean };
function mainSwitch(event: MainEvent) {
  const { type, data } = event;
  switch (type) {
    case "name":
      type _Main05 = Expect<Equal<typeof data, TODO>>; // TODO(koan) @koan-error
      break;
    case "age":
      type _Main06 = Expect<Equal<typeof data, TODO>>; // TODO(koan) @koan-error
      break;
    case "active":
      type _Main07 = Expect<Equal<typeof data, TODO>>; // TODO(koan) @koan-error
      break;
  }
  type _Main08 = Expect<Equal<typeof data, TODO>>; // TODO(koan) @koan-error
}
void mainSwitch;

// Part 3: Destructured parameters are correlated when never reassigned.
function mainParameter({ kind, payload }: Action) {
  if (kind === "text") {
    type _Main09 = Expect<Equal<typeof kind, TODO>>; // TODO(koan) @koan-error
    type _Main10 = Expect<Equal<typeof payload, TODO>>; // TODO(koan) @koan-error
  } else {
    type _Main11 = Expect<Equal<typeof kind, TODO>>; // TODO(koan) @koan-error
    type _Main12 = Expect<Equal<typeof payload, TODO>>; // TODO(koan) @koan-error
  }
}
void mainParameter;

// Part 4: Discriminated tuples preserve head/element correlation.
function mainTuple(action: TupleAction) {
  const [kind, payload] = action;
  if (kind === "add") {
    type _Main13 = Expect<Equal<typeof kind, TODO>>; // TODO(koan) @koan-error
    type _Main14 = Expect<Equal<typeof payload, TODO>>; // TODO(koan) @koan-error
  } else {
    type _Main15 = Expect<Equal<typeof kind, TODO>>; // TODO(koan) @koan-error
    type _Main16 = Expect<Equal<typeof payload, TODO>>; // TODO(koan) @koan-error
  }
}
void mainTuple;

// Part 5: Mutable, separate, and rest bindings no longer carry the same proof.
function mainLimits(action: Action) {
  let { kind, payload } = action;
  if (kind === "text") {
    type _Main17 = Expect<Equal<typeof payload, TODO>>; // TODO(koan) @koan-error
  }
  const separateKind = action.kind;
  const separatePayload = action.payload;
  if (separateKind === "text") {
    type _Main18 = Expect<Equal<typeof separatePayload, TODO>>; // TODO(koan) @koan-error
  }
  const { kind: restKind, ...rest } = action;
  if (restKind === "text") {
    type _Main19 = Expect<Equal<typeof rest, TODO>>; // TODO(koan) @koan-error
  }
  type _Main20 = Expect<Equal<typeof payload, TODO>>; // TODO(koan) @koan-error
  kind = "count";
  payload = 1;
}
void mainLimits;
