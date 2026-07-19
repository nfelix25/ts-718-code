import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/** K-039 drills: combine generic constraints with primitive, discriminant, predicate, conditional, and correlated control flow. */

// Group 1: Primitive constraints narrow values to intersections with T.
function drillPrimitive<T extends string | number | boolean>(value: T) {
  if (typeof value === "string") {
    type _D001 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    type _D002 = Expect<Equal<T, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D003 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (typeof value === "number") {
    type _D004 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D005 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if (typeof value === "boolean") {
    type _D006 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  type _D007 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  return value;
}
type _D008 = Expect<Equal<ReturnType<typeof drillPrimitive>, TODO>>; // TODO(koan) @koan-error
const dLiteral = drillPrimitive("ready" as const);
const dUnion = drillPrimitive(Math.random() ? "x" : 1);
type _D009 = Expect<Equal<typeof dLiteral, TODO>>; // TODO(koan) @koan-error
type _D010 = Expect<Equal<typeof dUnion, TODO>>; // TODO(koan) @koan-error
type _D011 = Expect<Equal<Parameters<typeof drillPrimitive>, TODO>>; // TODO(koan) @koan-error
type _D012 = Expect<Equal<typeof drillPrimitive, TODO>>; // TODO(koan) @koan-error

// Group 2: Constrained structural values retain generic identity plus branch facts.
type State<D = string> =
  | { state: "idle" }
  | { state: "ready"; data: D }
  | { state: "failed"; error: Error };
function drillState<T extends State>(value: T) {
  if (value.state === "idle") {
    type _D013 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else if (value.state === "ready") {
    type _D014 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    type _D015 = Expect<Equal<typeof value.data, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D016 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    type _D017 = Expect<Equal<typeof value.error, TODO>>; // TODO(koan) @koan-error
  }
  type _D018 = Expect<Equal<T, TODO>>; // TODO(koan) @koan-error
  return value;
}
const dReady = drillState({ state: "ready", data: "x", extra: true } as const);
type _D019 = Expect<Equal<typeof dReady, TODO>>; // TODO(koan) @koan-error
type _D020 = Expect<Equal<ReturnType<typeof drillState>, TODO>>; // TODO(koan) @koan-error
type _D021 = Expect<Equal<Parameters<typeof drillState>, TODO>>; // TODO(koan) @koan-error
function drillExtract<T extends State>(value: T) {
  if (value.state === "ready") {
    const snapshot = value;
    type _D022 = Expect<Equal<typeof snapshot, TODO>>; // TODO(koan) @koan-error
  }
  type _D023 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
}
type _D024 = Expect<Equal<ReturnType<typeof drillExtract>, TODO>>; // TODO(koan) @koan-error
void drillExtract;

// Group 3: Conditional outputs specialize at calls but challenge implementations.
type Label<T> = T extends string ? "text" : T extends number ? "number" : "boolean";
function drillLabel<T extends string | number | boolean>(value: T): Label<T> {
  const result = typeof value === "string" ? "text" : typeof value === "number" ? "number" : "boolean";
  type _D025 = Expect<Equal<typeof result, TODO>>; // TODO(koan) @koan-error
  if (typeof value === "string") {
    type _D026 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    type _D027 = Expect<Equal<Label<T>, TODO>>; // TODO(koan) @koan-error
  }
  return result as Label<T>;
}
const dTextLabel = drillLabel("x");
const dNumberLabel = drillLabel(1);
const dBooleanLabel = drillLabel(true);
const dMixedLabel = drillLabel(Math.random() ? "x" : 1);
type _D028 = Expect<Equal<typeof dTextLabel, TODO>>; // TODO(koan) @koan-error
type _D029 = Expect<Equal<typeof dNumberLabel, TODO>>; // TODO(koan) @koan-error
type _D030 = Expect<Equal<typeof dBooleanLabel, TODO>>; // TODO(koan) @koan-error
type _D031 = Expect<Equal<typeof dMixedLabel, TODO>>; // TODO(koan) @koan-error
type _D032 = Expect<Equal<ReturnType<typeof drillLabel>, TODO>>; // TODO(koan) @koan-error
type _D033 = Expect<Equal<Parameters<typeof drillLabel>, TODO>>; // TODO(koan) @koan-error
type _D034 = Expect<Equal<Label<never>, TODO>>; // TODO(koan) @koan-error
type _D035 = Expect<Equal<Label<any>, TODO>>; // TODO(koan) @koan-error
type _D036 = Expect<Equal<Label<unknown & string>, TODO>>; // TODO(koan) @koan-error

// Group 4: Generic predicates and assertions preserve the chosen T.
const dPresent = <T>(value: T | null | undefined): value is T => value != null;
function dAssertPresent<T>(value: T): asserts value is NonNullable<T> {
  if (value == null) throw new Error("missing");
}
function drillPredicate<T>(value: T | null | undefined) {
  if (dPresent(value)) {
    type _D037 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D038 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
function drillAssertion<T>(value: T) {
  dAssertPresent(value);
  type _D039 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  return value;
}
const dValues: Array<string | number | null | undefined> = ["x", 1];
const dFiltered = dValues.filter(dPresent);
const dFound = dValues.find(dPresent);
type _D040 = Expect<Equal<typeof dFiltered, TODO>>; // TODO(koan) @koan-error
type _D041 = Expect<Equal<typeof dFound, TODO>>; // TODO(koan) @koan-error
type _D042 = Expect<Equal<typeof dPresent, TODO>>; // TODO(koan) @koan-error
type _D043 = Expect<Equal<ReturnType<typeof dPresent>, TODO>>; // TODO(koan) @koan-error
type _D044 = Expect<Equal<typeof dAssertPresent, TODO>>; // TODO(koan) @koan-error
type _D045 = Expect<Equal<ReturnType<typeof dAssertPresent>, TODO>>; // TODO(koan) @koan-error
type _D046 = Expect<Equal<ReturnType<typeof drillAssertion>, TODO>>; // TODO(koan) @koan-error
type _D047 = Expect<Equal<Parameters<typeof drillPredicate>, TODO>>; // TODO(koan) @koan-error
type _D048 = Expect<Equal<ReturnType<typeof drillPredicate>, TODO>>; // TODO(koan) @koan-error
void drillPredicate;

// Group 5: Dependent parameters, tuple correlation, callbacks, and special types.
interface Fields { name: string; count: number; active: boolean }
function drillField<K extends keyof Fields>(key: K, value: Fields[K]) {
  if (key === "count") {
    type _D049 = Expect<Equal<typeof key, TODO>>; // TODO(koan) @koan-error
    type _D050 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  return value;
}
type Args = ["name", string] | ["count", number] | ["active", boolean];
function drillTuple(args: Args) {
  if (args[0] === "name") {
    type _D051 = Expect<Equal<typeof args, TODO>>; // TODO(koan) @koan-error
    type _D052 = Expect<Equal<typeof args[1], TODO>>; // TODO(koan) @koan-error
  } else if (args[0] === "count") {
    type _D053 = Expect<Equal<typeof args, TODO>>; // TODO(koan) @koan-error
    type _D054 = Expect<Equal<typeof args[1], TODO>>; // TODO(koan) @koan-error
  } else {
    type _D055 = Expect<Equal<typeof args[1], TODO>>; // TODO(koan) @koan-error
  }
}
function drillMap<T, U>(value: T | null, mapper: (value: T) => U) {
  if (value === null) return undefined;
  type _D056 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  const mapped = mapper(value);
  type _D057 = Expect<Equal<typeof mapped, TODO>>; // TODO(koan) @koan-error
  return mapped;
}
type _D058 = Expect<Equal<ReturnType<typeof drillField>, TODO>>; // TODO(koan) @koan-error
type _D059 = Expect<Equal<ReturnType<typeof drillTuple>, TODO>>; // TODO(koan) @koan-error
type _D060 = Expect<Equal<ReturnType<typeof drillMap>, TODO>>; // TODO(koan) @koan-error
void drillTuple;
