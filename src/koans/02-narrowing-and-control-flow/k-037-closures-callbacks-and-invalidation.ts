import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-037: closures, callbacks, and invalidation
 * =============================================================================
 *
 * A closure may run after the surrounding function has moved on, so a narrowing
 * is safe inside that closure only when the captured storage cannot acquire a
 * conflicting value. Const bindings and never-assigned parameters are stable.
 * Since TypeScript 5.4, a let binding can also keep a narrowing in a closure
 * created after its last assignment, provided no later write is possible.
 *
 * I read a captured narrowing aloud as:
 *
 *   "At every future invocation of this closure, the captured location still
 *    satisfies the guard that was true when the closure was created."
 *
 * A later assignment invalidates that proof even if it appears after closure
 * creation. Mutable object properties are separate storage locations and can be
 * changed through aliases, so snapshot a narrowed property into a const before
 * capturing it. Callback execution also affects reachability: `forEach` may run
 * zero times, so assignments inside it do not make an outer variable definitely
 * assigned. A direct loop exposes its control flow more precisely.
 */

export function makeFormatter(value: string | number): () => string {
  if (typeof value === "string") return () => value.toUpperCase();
  return () => value.toFixed(0);
}

export function makeLastAssignmentReader(input: string | number): () => string {
  let value = input;
  value = "fixed";
  return () => value.toUpperCase();
}

export function makePropertyReader(box: { value: string | number }): () => string {
  if (typeof box.value !== "string") throw new Error("expected string");
  const snapshot = box.value;
  return () => snapshot.toUpperCase();
}

export function lastWithForEach(values: readonly string[]): string | undefined {
  let result: string | undefined;
  values.forEach(value => { result = value; });
  return result;
}

export function callbacksFor(values: readonly (string | number)[]): Array<() => string> {
  const callbacks: Array<() => string> = [];
  for (const value of values) {
    if (typeof value === "string") callbacks.push(() => value.toUpperCase());
    else callbacks.push(() => value.toFixed(0));
  }
  return callbacks;
}

// Part 1: A stable narrowed parameter remains narrowed inside created closures.
function mainStable(value: string | number) {
  if (typeof value === "string") {
    const closure = () => {
      type _Main01 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
      return value;
    };
    type _Main02 = Expect<Equal<ReturnType<typeof closure>, TODO>>; // TODO(koan) @koan-error
    [1].map(() => {
      type _Main03 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
      return value.length;
    });
  }
  type _Main04 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
}
void mainStable;

// Part 2: A closure after the last write keeps that observation; a later write invalidates it.
function mainLast(input: string | number) {
  let value = input;
  value = "ready";
  const stable = () => {
    type _Main05 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    return value;
  };
  type _Main06 = Expect<Equal<ReturnType<typeof stable>, TODO>>; // TODO(koan) @koan-error
  return stable;
}
function mainLater(input: string | number) {
  let value = input;
  if (typeof value === "string") {
    const unstable = () => {
      type _Main07 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
      return value;
    };
    value = 1;
    type _Main08 = Expect<Equal<ReturnType<typeof unstable>, TODO>>; // TODO(koan) @koan-error
    return unstable;
  }
  return () => value;
}
void mainLast;
void mainLater;

// Part 3: Snapshot mutable properties before a deferred callback.
function mainProperty(box: { value: string | number }) {
  if (typeof box.value === "string") {
    const snapshot = box.value;
    const propertyClosure = () => {
      type _Main09 = Expect<Equal<typeof box.value, TODO>>; // TODO(koan) @koan-error
      return box.value;
    };
    const snapshotClosure = () => {
      type _Main10 = Expect<Equal<typeof snapshot, TODO>>; // TODO(koan) @koan-error
      return snapshot;
    };
    type _Main11 = Expect<Equal<ReturnType<typeof propertyClosure>, TODO>>; // TODO(koan) @koan-error
    type _Main12 = Expect<Equal<ReturnType<typeof snapshotClosure>, TODO>>; // TODO(koan) @koan-error
  }
}
void mainProperty;

// Part 4: Callback writes do not prove that a callback ran; direct loops are visible.
function mainCallbacks(values: readonly string[]) {
  let fromCallback: string | undefined;
  values.forEach(value => {
    fromCallback = value;
    type _Main13 = Expect<Equal<typeof fromCallback, TODO>>; // TODO(koan) @koan-error
  });
  type _Main14 = Expect<Equal<typeof fromCallback, TODO>>; // TODO(koan) @koan-error
  let fromLoop: string | undefined;
  for (const value of values) fromLoop = value;
  type _Main15 = Expect<Equal<typeof fromLoop, TODO>>; // TODO(koan) @koan-error
  return fromCallback;
}
type _Main16 = Expect<Equal<ReturnType<typeof mainCallbacks>, TODO>>; // TODO(koan) @koan-error

// Part 5: Returned, immediate, shadowed, and asynchronous closures have distinct surfaces.
function mainForms(value: string | number) {
  if (typeof value !== "string") return () => value;
  const returned = () => value;
  type _Main17 = Expect<Equal<typeof returned, TODO>>; // TODO(koan) @koan-error
  const shadowed = [1].map(value => value.toFixed());
  type _Main18 = Expect<Equal<typeof shadowed, TODO>>; // TODO(koan) @koan-error
  const immediate = (() => value.length)();
  type _Main19 = Expect<Equal<typeof immediate, TODO>>; // TODO(koan) @koan-error
  const deferred = Promise.resolve().then(() => value);
  type _Main20 = Expect<Equal<typeof deferred, TODO>>; // TODO(koan) @koan-error
  return returned;
}
void mainForms;
