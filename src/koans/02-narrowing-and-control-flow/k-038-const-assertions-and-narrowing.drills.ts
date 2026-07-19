import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/** K-038 drills: preserve discriminants, tuples, derived unions, spreads, references, and factory results. */

// Group 1: Object literals contrast widened and const-preserved fields.
const dObject = { kind: "text", count: 1, active: true };
const dConstObject = { kind: "text", count: 1, active: true } as const;
type _D001 = Expect<Equal<typeof dObject.kind, TODO>>; // TODO(koan) @koan-error
type _D002 = Expect<Equal<typeof dObject.count, TODO>>; // TODO(koan) @koan-error
type _D003 = Expect<Equal<typeof dObject.active, TODO>>; // TODO(koan) @koan-error
type _D004 = Expect<Equal<typeof dConstObject.kind, TODO>>; // TODO(koan) @koan-error
type _D005 = Expect<Equal<typeof dConstObject.count, TODO>>; // TODO(koan) @koan-error
type _D006 = Expect<Equal<typeof dConstObject.active, TODO>>; // TODO(koan) @koan-error
type _D007 = Expect<Equal<typeof dConstObject, TODO>>; // TODO(koan) @koan-error
const dNested = { outer: { inner: { state: "ready" } } } as const;
type _D008 = Expect<Equal<typeof dNested.outer, TODO>>; // TODO(koan) @koan-error
type _D009 = Expect<Equal<typeof dNested.outer.inner, TODO>>; // TODO(koan) @koan-error
type _D010 = Expect<Equal<typeof dNested.outer.inner.state, TODO>>; // TODO(koan) @koan-error
const dSingle = { kind: "text" as const, payload: "value" };
type _D011 = Expect<Equal<typeof dSingle.kind, TODO>>; // TODO(koan) @koan-error
type _D012 = Expect<Equal<typeof dSingle.payload, TODO>>; // TODO(koan) @koan-error

// Group 2: Arrays become readonly tuples with exact positions and lengths.
const dArray = ["a", 1, true];
const dTuple = ["a", 1, true] as const;
const dEmpty = [] as const;
const dNestedTuple = [["x", 1], ["y", 2]] as const;
type _D013 = Expect<Equal<typeof dArray, TODO>>; // TODO(koan) @koan-error
type _D014 = Expect<Equal<typeof dArray[number], TODO>>; // TODO(koan) @koan-error
type _D015 = Expect<Equal<typeof dTuple, TODO>>; // TODO(koan) @koan-error
type _D016 = Expect<Equal<typeof dTuple[0], TODO>>; // TODO(koan) @koan-error
type _D017 = Expect<Equal<typeof dTuple[1], TODO>>; // TODO(koan) @koan-error
type _D018 = Expect<Equal<typeof dTuple[2], TODO>>; // TODO(koan) @koan-error
type _D019 = Expect<Equal<typeof dTuple[number], TODO>>; // TODO(koan) @koan-error
type _D020 = Expect<Equal<typeof dTuple["length"], TODO>>; // TODO(koan) @koan-error
type _D021 = Expect<Equal<typeof dEmpty, TODO>>; // TODO(koan) @koan-error
type _D022 = Expect<Equal<typeof dEmpty[number], TODO>>; // TODO(koan) @koan-error
type _D023 = Expect<Equal<typeof dNestedTuple[0], TODO>>; // TODO(koan) @koan-error
type _D024 = Expect<Equal<typeof dNestedTuple[number][0], TODO>>; // TODO(koan) @koan-error

// Group 3: Derived collection element unions become discriminated domains.
const dActions = [
  { type: "text", payload: "hello" },
  { type: "count", payload: 1 },
  { type: "empty", payload: null },
] as const;
type DAction = (typeof dActions)[number];
type _D025 = Expect<Equal<DAction, TODO>>; // TODO(koan) @koan-error
type _D026 = Expect<Equal<DAction["type"], TODO>>; // TODO(koan) @koan-error
type _D027 = Expect<Equal<DAction["payload"], TODO>>; // TODO(koan) @koan-error
function drillAction(action: DAction) {
  if (action.type === "text") {
    type _D028 = Expect<Equal<typeof action, TODO>>; // TODO(koan) @koan-error
    type _D029 = Expect<Equal<typeof action.payload, TODO>>; // TODO(koan) @koan-error
  } else if (action.type === "count") {
    type _D030 = Expect<Equal<typeof action, TODO>>; // TODO(koan) @koan-error
    type _D031 = Expect<Equal<typeof action.payload, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D032 = Expect<Equal<typeof action, TODO>>; // TODO(koan) @koan-error
    type _D033 = Expect<Equal<typeof action.payload, TODO>>; // TODO(koan) @koan-error
  }
}
const dRegistry = {
  text: { type: "text", payload: "hello" },
  count: { type: "count", payload: 1 },
} as const;
type _D034 = Expect<Equal<keyof typeof dRegistry, TODO>>; // TODO(koan) @koan-error
type _D035 = Expect<Equal<(typeof dRegistry)[keyof typeof dRegistry], TODO>>; // TODO(koan) @koan-error
type _D036 = Expect<Equal<typeof dRegistry.text.type, TODO>>; // TODO(koan) @koan-error
void drillAction;

// Group 4: References, spreads, computed values, and satisfies preserve different layers.
const dShared = { count: 1 };
const dWrapper = { shared: dShared, literal: { count: 1 } } as const;
type _D037 = Expect<Equal<typeof dWrapper.shared, TODO>>; // TODO(koan) @koan-error
type _D038 = Expect<Equal<typeof dWrapper.shared.count, TODO>>; // TODO(koan) @koan-error
type _D039 = Expect<Equal<typeof dWrapper.literal, TODO>>; // TODO(koan) @koan-error
type _D040 = Expect<Equal<typeof dWrapper.literal.count, TODO>>; // TODO(koan) @koan-error
const dBase = { kind: "base", value: 1 } as const;
const dSpread = { ...dBase, extra: true } as const;
type _D041 = Expect<Equal<typeof dSpread.kind, TODO>>; // TODO(koan) @koan-error
type _D042 = Expect<Equal<typeof dSpread.value, TODO>>; // TODO(koan) @koan-error
type _D043 = Expect<Equal<typeof dSpread.extra, TODO>>; // TODO(koan) @koan-error
const dDynamic = Math.random() > 0.5 ? "a" : "b";
const dDynamicObject = { kind: dDynamic } as const;
type _D044 = Expect<Equal<typeof dDynamicObject.kind, TODO>>; // TODO(koan) @koan-error
type DShape = { kind: "a" | "b"; enabled: boolean };
const dChecked = { kind: "a", enabled: true } as const satisfies DShape;
type _D045 = Expect<Equal<typeof dChecked.kind, TODO>>; // TODO(koan) @koan-error
type _D046 = Expect<Equal<typeof dChecked.enabled, TODO>>; // TODO(koan) @koan-error
const dAnnotated: DShape = { kind: "a", enabled: true };
type _D047 = Expect<Equal<typeof dAnnotated.kind, TODO>>; // TODO(koan) @koan-error
type _D048 = Expect<Equal<typeof dAnnotated.enabled, TODO>>; // TODO(koan) @koan-error

// Group 5: Factories and readonly tuple parameters carry preserved evidence into CFA.
const dText = (payload: string) => ({ kind: "text", payload } as const);
const dCount = (payload: number) => ({ kind: "count", payload } as const);
const dCreated = Math.random() > 0.5 ? dText("x") : dCount(1);
type _D049 = Expect<Equal<ReturnType<typeof dText>, TODO>>; // TODO(koan) @koan-error
type _D050 = Expect<Equal<ReturnType<typeof dCount>, TODO>>; // TODO(koan) @koan-error
type _D051 = Expect<Equal<typeof dCreated, TODO>>; // TODO(koan) @koan-error
function drillCreated(value: typeof dCreated) {
  if (value.kind === "text") {
    type _D052 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    type _D053 = Expect<Equal<typeof value.payload, TODO>>; // TODO(koan) @koan-error
  } else {
    type _D054 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    type _D055 = Expect<Equal<typeof value.payload, TODO>>; // TODO(koan) @koan-error
  }
}
type DCommand = readonly ["text", string] | readonly ["count", number];
function drillCommand(command: DCommand) {
  if (command[0] === "text") {
    type _D056 = Expect<Equal<typeof command, TODO>>; // TODO(koan) @koan-error
    type _D057 = Expect<Equal<typeof command[1], TODO>>; // TODO(koan) @koan-error
  } else {
    type _D058 = Expect<Equal<typeof command, TODO>>; // TODO(koan) @koan-error
    type _D059 = Expect<Equal<typeof command[1], TODO>>; // TODO(koan) @koan-error
  }
}
type _D060 = Expect<Equal<Parameters<typeof drillCommand>, TODO>>; // TODO(koan) @koan-error
void drillCreated;
void drillCommand;
