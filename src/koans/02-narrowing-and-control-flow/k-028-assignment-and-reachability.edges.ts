import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/** K-028 edges: declarations, joins, loops, mutations, and exceptions set the limits of observations. */

type Kind<T> = 0 extends 1 & T
  ? "any"
  : [T] extends [never]
    ? "never"
    : unknown extends T
      ? [keyof T] extends [never] ? "unknown" : "ordinary"
      : "ordinary";

// Group 1: Declared types govern writes; observations govern reads.
let declared: string | number = "text";
type _E001 = Expect<Equal<typeof declared, TODO>>; // TODO(koan) @koan-error
const declaredSnapshot = declared;
type _E002 = Expect<Equal<typeof declaredSnapshot, TODO>>; // TODO(koan) @koan-error
declared = 1;
type _E003 = Expect<Equal<typeof declared, TODO>>; // TODO(koan) @koan-error
let inferred = "text";
type _E004 = Expect<Equal<typeof inferred, TODO>>; // TODO(koan) @koan-error
const preserved = "text";
type _E005 = Expect<Equal<typeof preserved, TODO>>; // TODO(koan) @koan-error
let finite: "x" | "y" = "x";
type _E006 = Expect<Equal<typeof finite, TODO>>; // TODO(koan) @koan-error
let unknownValue: unknown = 1;
type _E007 = Expect<Equal<typeof unknownValue, TODO>>; // TODO(koan) @koan-error
let anyValue: any = 1;
type _E008 = Expect<Equal<Kind<typeof anyValue>, TODO>>; // TODO(koan) @koan-error

// @ts-expect-error Inference gave this variable the declared type string.
inferred = 1;

// Demonstration A: `declared` may later receive either declared member even
// when its current observation is one member. `inferred` has no wider declared
// annotation, so its initial widening to string permanently rejects numbers.

// Group 2: Reassignment and joins can erase earlier narrowing.
function edgeJoin(flag: boolean) {
  let value: string | number = "initial";
  type _E009 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  if (flag) {
    value = 1;
    type _E010 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _E011 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  type _E012 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  if (typeof value === "string") value = value.length;
  type _E013 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  return value;
}
type _E014 = Expect<Equal<ReturnType<typeof edgeJoin>, TODO>>; // TODO(koan) @koan-error
function edgeReplace(value: string | number) {
  if (typeof value === "string") {
    value = value.length;
    type _E015 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  type _E016 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
}
void edgeReplace;

// Demonstration B: after both string paths are replaced with numbers, the join
// is number even though the declared parameter or local still accepts strings.

// Group 3: Loop exits retain states from every route to the exit.
function edgeLoops(values: readonly string[], flag: boolean) {
  let result: string | undefined;
  for (const value of values) {
    result = value;
    type _E017 = Expect<Equal<typeof result, TODO>>; // TODO(koan) @koan-error
    if (value === "stop") break;
    type _E018 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  type _E019 = Expect<Equal<typeof result, TODO>>; // TODO(koan) @koan-error
  let state: string | number = 0;
  while (flag) {
    state = "running";
    type _E020 = Expect<Equal<typeof state, TODO>>; // TODO(koan) @koan-error
    if (values.length === 0) continue;
    state = 1;
    type _E021 = Expect<Equal<typeof state, TODO>>; // TODO(koan) @koan-error
    break;
  }
  type _E022 = Expect<Equal<typeof state, TODO>>; // TODO(koan) @koan-error
}
void edgeLoops;

// Demonstration C: the post-loop type includes the pre-loop state whenever the
// condition or collection allows zero iterations.

// Group 4: Dotted writes, aliases, callbacks, and finally blocks add mutation sites.
function edgeMutation(flag: boolean) {
  const box: { value: string | number } = { value: "text" };
  type _E023 = Expect<Equal<typeof box.value, TODO>>; // TODO(koan) @koan-error
  const alias = box;
  alias.value = 1;
  type _E024 = Expect<Equal<typeof box.value, TODO>>; // TODO(koan) @koan-error
  box.value = flag ? "next" : 2;
  type _E025 = Expect<Equal<typeof box.value, TODO>>; // TODO(koan) @koan-error
  const snapshot = box.value;
  box.value = 3;
  type _E026 = Expect<Equal<typeof snapshot, TODO>>; // TODO(koan) @koan-error
}
function edgeClosure(value: string | number) {
  if (typeof value === "string") {
    type _E027 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    const callback = () => {
      type _E028 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
      return value;
    };
    return callback;
  }
  return () => value;
}
function edgeFinally(flag: boolean) {
  let value: string | number = 0;
  try {
    value = "try";
    type _E029 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    if (flag) throw new Error("stop");
  } finally {
    value = 1;
    type _E030 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  return value;
}
void edgeMutation;
void edgeClosure;
void edgeFinally;

// Demonstration D: a snapshot is a new const binding; later writes to the
// original storage location do not retroactively change the snapshot's type.
