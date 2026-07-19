import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/** K-035 edges: finite alias depth and mutable source locations limit replayed control-flow facts. */

// Group 1: The compiler follows only a bounded chain of boolean indirections.
function edgeDepth(value: string | number) {
  const direct = typeof value === "string";
  const one = direct;
  const two = one;
  const three = two;
  const four = three;
  const five = four;
  const six = five;
  if (direct) {
    type _E001 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (one) {
    type _E002 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (two) {
    type _E003 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (three) {
    type _E004 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (four) {
    type _E005 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (five) {
    type _E006 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (six) {
    type _E007 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  type _E008 = Expect<Equal<typeof six, TODO>>; // TODO(koan) @koan-error
}
void edgeDepth;

// Demonstration A: alias analysis is intentionally finite rather than a general
// theorem prover. Deep boolean pipelines should be replaced with a direct guard
// or an explicitly typed predicate when callers need reliable narrowing.

// Group 2: Writes to a source or boolean alias prevent stale facts from replaying.
function edgeWrites(value: string | number, flag: boolean) {
  const wasString = typeof value === "string";
  type _E009 = Expect<Equal<typeof wasString, TODO>>; // TODO(koan) @koan-error
  value = flag ? "next" : 1;
  if (wasString) {
    type _E010 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  let mutable = typeof value === "string";
  if (mutable) {
    type _E011 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  mutable = !mutable;
  if (mutable) {
    type _E012 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  const snapshot = value;
  const snapshotString = typeof snapshot === "string";
  value = 2;
  if (snapshotString) {
    type _E013 = Expect<Equal<typeof snapshot, TODO>>; // TODO(koan) @koan-error
    type _E014 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  type _E015 = Expect<Equal<typeof snapshot, TODO>>; // TODO(koan) @koan-error
  type _E016 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
}
void edgeWrites;

// Demonstration B: a const snapshot is a separate stable source. Its alias can
// still narrow the snapshot after the original variable has been reassigned.

// Group 3: Property writes and opaque boolean helpers break source correlation.
type Box = { value: string | number };
function edgeProperty(box: Box, flag: boolean) {
  const text = typeof box.value === "string";
  if (text) {
    type _E017 = Expect<Equal<typeof box.value, TODO>>; // TODO(koan) @koan-error
  }
  box.value = flag ? "next" : 1;
  if (text) {
    type _E018 = Expect<Equal<typeof box.value, TODO>>; // TODO(koan) @koan-error
  }
  const coerced = Boolean(typeof box.value === "string");
  if (coerced) {
    type _E019 = Expect<Equal<typeof box.value, TODO>>; // TODO(koan) @koan-error
  }
  const helper = (condition: boolean) => condition;
  const wrapped = helper(typeof box.value === "string");
  if (wrapped) {
    type _E020 = Expect<Equal<typeof box.value, TODO>>; // TODO(koan) @koan-error
  }
  type _E021 = Expect<Equal<typeof text, TODO>>; // TODO(koan) @koan-error
  type _E022 = Expect<Equal<typeof coerced, TODO>>; // TODO(koan) @koan-error
  type _E023 = Expect<Equal<typeof wrapped, TODO>>; // TODO(koan) @koan-error
}
void edgeProperty;

// Demonstration C: alias replay recognizes control-flow expressions, not an
// arbitrary function's semantics. Use a type predicate when a helper is a guard.

// Group 4: Unknown, any, never, and annotations retain their normal behavior.
type Kind<T> = 0 extends 1 & T
  ? "any"
  : [T] extends [never]
    ? "never"
    : unknown extends T
      ? [keyof T] extends [never] ? "unknown" : "ordinary"
      : "ordinary";
function edgeUnknown(value: unknown) {
  const text = typeof value === "string";
  if (text) {
    type _E024 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _E025 = Expect<Equal<Kind<typeof value>, TODO>>; // TODO(koan) @koan-error
  }
}
function edgeAny(value: any) {
  const text = typeof value === "string";
  if (text) {
    type _E026 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _E027 = Expect<Equal<Kind<typeof value>, TODO>>; // TODO(koan) @koan-error
  }
}
function edgeNever(value: never) {
  const text = typeof value === "string";
  if (text) {
    type _E028 = Expect<Equal<Kind<typeof value>, TODO>>; // TODO(koan) @koan-error
  }
}
function edgeAnnotated(value: string | number) {
  const text: boolean = typeof value === "string";
  if (text) {
    type _E029 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  type _E030 = Expect<Equal<typeof text, TODO>>; // TODO(koan) @koan-error
}
void edgeUnknown;
void edgeAny;
void edgeNever;
void edgeAnnotated;
