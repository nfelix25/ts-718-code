import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/** K-037 edges: later writes, property aliases, asynchronous scheduling, and opaque callbacks bound closure proofs. */

// Group 1: A write anywhere after closure creation invalidates the captured narrowing.
function edgeLater(input: string | number, flag: boolean) {
  let value = input;
  if (typeof value === "string") {
    const read = () => {
      type _E001 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
      return value;
    };
    if (flag) value = 1;
    type _E002 = Expect<Equal<ReturnType<typeof read>, TODO>>; // TODO(koan) @koan-error
  }
  let stable = input;
  stable = "fixed";
  const readStable = () => {
    type _E003 = Expect<Equal<typeof stable, TODO>>; // TODO(koan) @koan-error
    return stable;
  };
  type _E004 = Expect<Equal<ReturnType<typeof readStable>, TODO>>; // TODO(koan) @koan-error
  type _E005 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  type _E006 = Expect<Equal<typeof stable, TODO>>; // TODO(koan) @koan-error
  return readStable;
}
type _E007 = Expect<Equal<ReturnType<typeof edgeLater>, TODO>>; // TODO(koan) @koan-error

// Demonstration A: "last assignment" is a control-flow property. A conditional
// later write is enough to make the older narrowed capture unsafe.

// Group 2: Mutable properties can change through aliases; const snapshots cannot.
function edgeProperty(box: { value: string | number }, flag: boolean) {
  if (typeof box.value === "string") {
    const snapshot = box.value;
    const alias = box;
    const property = () => {
      type _E008 = Expect<Equal<typeof box.value, TODO>>; // TODO(koan) @koan-error
      return box.value;
    };
    const copied = () => {
      type _E009 = Expect<Equal<typeof snapshot, TODO>>; // TODO(koan) @koan-error
      return snapshot;
    };
    if (flag) alias.value = 1;
    type _E010 = Expect<Equal<ReturnType<typeof property>, TODO>>; // TODO(koan) @koan-error
    type _E011 = Expect<Equal<ReturnType<typeof copied>, TODO>>; // TODO(koan) @koan-error
    type _E012 = Expect<Equal<typeof alias.value, TODO>>; // TODO(koan) @koan-error
  }
}
type ReadonlyBox = { readonly value: string | number };
function edgeReadonly(box: ReadonlyBox) {
  if (typeof box.value === "string") {
    const read = () => box.value;
    type _E013 = Expect<Equal<ReturnType<typeof read>, TODO>>; // TODO(koan) @koan-error
  }
}
void edgeProperty;
void edgeReadonly;

// Demonstration B: snapshotting is the clearest way to transfer property proof
// into deferred work, even when a type-level readonly promise appears stable.

// Group 3: Callback execution and mutation are opaque to surrounding reachability.
function edgeCallbacks(values: readonly string[], input: string | number) {
  let result: string | undefined;
  values.forEach(value => { result = value; });
  type _E014 = Expect<Equal<typeof result, TODO>>; // TODO(koan) @koan-error
  let changed = input;
  const mutate = () => { changed = "changed"; };
  if (typeof changed === "number") {
    type _E015 = Expect<Equal<typeof changed, TODO>>; // TODO(koan) @koan-error
    [1].forEach(mutate);
    type _E016 = Expect<Equal<typeof changed, TODO>>; // TODO(koan) @koan-error
  }
  const maybeCallback = values[0] === undefined ? undefined : () => values[0];
  type _E017 = Expect<Equal<typeof maybeCallback, TODO>>; // TODO(koan) @koan-error
  const mapped = values.map(value => () => value);
  type _E018 = Expect<Equal<typeof mapped, TODO>>; // TODO(koan) @koan-error
  type _E019 = Expect<Equal<typeof mapped[0], TODO>>; // TODO(koan) @koan-error
  type _E020 = Expect<Equal<typeof mutate, TODO>>; // TODO(koan) @koan-error
}
void edgeCallbacks;

// Demonstration C: the checker does not assume forEach executes, nor does it
// generally model arbitrary callback invocation counts or side effects.

// Group 4: Async, loops, special values, and nested closures preserve only stable storage.
type Kind<T> = 0 extends 1 & T ? "any" : [T] extends [never] ? "never" : "ordinary";
function edgeAsync(value: string | number) {
  if (typeof value === "string") {
    const promise = Promise.resolve().then(() => value);
    type _E021 = Expect<Equal<typeof promise, TODO>>; // TODO(koan) @koan-error
    const timer = () => setTimeout(() => value.length, 0);
    type _E022 = Expect<Equal<typeof timer, TODO>>; // TODO(koan) @koan-error
    const nested = () => () => value;
    type _E023 = Expect<Equal<ReturnType<ReturnType<typeof nested>>, TODO>>; // TODO(koan) @koan-error
  }
}
function edgeLoop(values: readonly (string | number)[]) {
  const callbacks: Array<() => string | number> = [];
  for (const value of values) {
    callbacks.push(() => value);
    type _E024 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  type _E025 = Expect<Equal<typeof callbacks, TODO>>; // TODO(koan) @koan-error
  type _E026 = Expect<Equal<typeof callbacks[0], TODO>>; // TODO(koan) @koan-error
}
function edgeAny(value: any) {
  const callback = () => value;
  type _E027 = Expect<Equal<Kind<ReturnType<typeof callback>>, TODO>>; // TODO(koan) @koan-error
}
function edgeUnknown(value: unknown) {
  if (typeof value === "string") {
    const callback = () => value;
    type _E028 = Expect<Equal<ReturnType<typeof callback>, TODO>>; // TODO(koan) @koan-error
  }
}
function edgeNever(value: never) {
  const callback = () => value;
  type _E029 = Expect<Equal<Kind<ReturnType<typeof callback>>, TODO>>; // TODO(koan) @koan-error
}
type _E030 = Expect<Equal<ReturnType<typeof edgeLoop>, TODO>>; // TODO(koan) @koan-error
void edgeAsync;
void edgeLoop;
void edgeAny;
void edgeUnknown;
void edgeNever;

// Demonstration D: each for-of const binding is per-iteration storage, so
// closures do not share the classic single-var loop capture problem.
