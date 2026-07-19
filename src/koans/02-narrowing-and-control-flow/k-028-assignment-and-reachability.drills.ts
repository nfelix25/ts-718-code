import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/** K-028 drills: trace observed types through writes, joins, exits, loops, and destructuring. */

// Group 1: Direct writes replace the current observation.
function drillWrites(flag: boolean) {
  let value: string | number = "start";
  type _D001 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  const first = value;
  type _D002 = Expect<Equal<typeof first, TODO>>; // TODO(koan) @koan-error
  value = 1;
  type _D003 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  const second = value;
  type _D004 = Expect<Equal<typeof second, TODO>>; // TODO(koan) @koan-error
  let bool: boolean | null = false;
  type _D005 = Expect<Equal<typeof bool, TODO>>; // TODO(koan) @koan-error
  let letter: "a" | "b" = "a";
  type _D006 = Expect<Equal<typeof letter, TODO>>; // TODO(koan) @koan-error
  let object: { kind: "a" } | { kind: "b" } = { kind: "a" };
  type _D007 = Expect<Equal<typeof object, TODO>>; // TODO(koan) @koan-error
  let collection: string[] | Set<string> = [];
  type _D008 = Expect<Equal<typeof collection, TODO>>; // TODO(koan) @koan-error
  let count: string | number = 1;
  count += 1;
  type _D009 = Expect<Equal<typeof count, TODO>>; // TODO(koan) @koan-error
  let text: string | undefined;
  text ||= "fallback";
  type _D010 = Expect<Equal<typeof text, TODO>>; // TODO(koan) @koan-error
  let nullish: string | null;
  nullish ??= "fallback";
  type _D011 = Expect<Equal<typeof nullish, TODO>>; // TODO(koan) @koan-error
  value = flag ? "next" : 2;
  type _D012 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  void bool;
  void letter;
  void object;
  void collection;
}
void drillWrites;

// Group 2: Branches merge only the assignments that can reach the join.
function drillBranches(flag: boolean, status: "a" | "b") {
  let result: string | number;
  if (flag) {
    result = "yes";
    type _D013 = Expect<Equal<typeof result, TODO>>; // TODO(koan) @koan-error
  } else {
    result = 1;
    type _D014 = Expect<Equal<typeof result, TODO>>; // TODO(koan) @koan-error
  }
  type _D015 = Expect<Equal<typeof result, TODO>>; // TODO(koan) @koan-error
  let changing: string | number = 0;
  if (flag) changing = "changed";
  type _D016 = Expect<Equal<typeof changing, TODO>>; // TODO(koan) @koan-error
  let conditional: string | number = flag ? "text" : 2;
  type _D017 = Expect<Equal<typeof conditional, TODO>>; // TODO(koan) @koan-error
  if (!flag) return conditional;
  type _D018 = Expect<Equal<typeof flag, TODO>>; // TODO(koan) @koan-error
  type _D019 = Expect<Equal<typeof conditional, TODO>>; // TODO(koan) @koan-error
  let switched: "first" | "second";
  switch (status) {
    case "a":
      switched = "first";
      type _D020 = Expect<Equal<typeof switched, TODO>>; // TODO(koan) @koan-error
      break;
    case "b":
      switched = "second";
      type _D021 = Expect<Equal<typeof switched, TODO>>; // TODO(koan) @koan-error
      break;
  }
  type _D022 = Expect<Equal<typeof switched, TODO>>; // TODO(koan) @koan-error
  let optional: string | undefined;
  if (flag) optional = "set";
  type _D023 = Expect<Equal<typeof optional, TODO>>; // TODO(koan) @koan-error
  return optional;
}
type _D024 = Expect<Equal<ReturnType<typeof drillBranches>, TODO>>; // TODO(koan) @koan-error

// Group 3: Return, throw, continue, and replacement change reachable unions.
function drillExits(value: string | number | null) {
  if (value === null) return undefined;
  type _D025 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  if (typeof value === "string") throw new Error(value);
  type _D026 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  return value;
}
type _D027 = Expect<Equal<ReturnType<typeof drillExits>, TODO>>; // TODO(koan) @koan-error
function drillReverseExit(value: string | number) {
  if (typeof value === "number") return value;
  type _D028 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  return value.length;
}
function drillNested(value: string | number | boolean) {
  if (typeof value === "boolean") {
    type _D029 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    return;
  }
  type _D030 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
}
function drillContinue(values: readonly (string | number)[]) {
  for (const value of values) {
    if (typeof value === "number") continue;
    type _D031 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  type _D032 = Expect<Equal<typeof values, TODO>>; // TODO(koan) @koan-error
}
function drillBreak(values: readonly (string | number)[]) {
  let found: string | undefined;
  for (const value of values) {
    if (typeof value === "number") continue;
    found = value;
    break;
  }
  type _D033 = Expect<Equal<typeof found, TODO>>; // TODO(koan) @koan-error
}
function drillReplace(value: string | number) {
  if (typeof value === "string") {
    value = value.length;
    type _D034 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  type _D035 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  return value;
}
type _D036 = Expect<Equal<ReturnType<typeof drillReplace>, TODO>>; // TODO(koan) @koan-error
void drillNested;
void drillContinue;
void drillBreak;

// Group 4: Loop entry and exit depend on whether an iteration is guaranteed.
function drillLoops(values: readonly string[], flag: boolean) {
  let current: string | undefined;
  type _D037 = Expect<Equal<typeof current, TODO>>; // TODO(koan) @koan-error
  for (const value of values) {
    current = value;
    type _D038 = Expect<Equal<typeof current, TODO>>; // TODO(koan) @koan-error
  }
  type _D039 = Expect<Equal<typeof current, TODO>>; // TODO(koan) @koan-error
  let whileValue: string | number = 0;
  while (flag) {
    whileValue = "loop";
    type _D040 = Expect<Equal<typeof whileValue, TODO>>; // TODO(koan) @koan-error
    break;
  }
  type _D041 = Expect<Equal<typeof whileValue, TODO>>; // TODO(koan) @koan-error
  let maybe: string | undefined;
  while (flag) {
    maybe = "set";
    break;
  }
  type _D042 = Expect<Equal<typeof maybe, TODO>>; // TODO(koan) @koan-error
  let once: string | number = 0;
  do {
    once = "done";
  } while (false);
  type _D043 = Expect<Equal<typeof once, TODO>>; // TODO(koan) @koan-error
  let last: string | undefined;
  for (const value of values) last = value;
  type _D044 = Expect<Equal<typeof last, TODO>>; // TODO(koan) @koan-error
  switch (current) {
    case undefined:
      type _D045 = Expect<Equal<typeof current, TODO>>; // TODO(koan) @koan-error
      break;
    default:
      type _D046 = Expect<Equal<typeof current, TODO>>; // TODO(koan) @koan-error
  }
  type _D047 = Expect<Equal<typeof current, TODO>>; // TODO(koan) @koan-error
  try {
    current = "try";
    type _D048 = Expect<Equal<typeof current, TODO>>; // TODO(koan) @koan-error
  } finally {
    void current;
  }
}
void drillLoops;

// Group 5: Destructuring, dotted writes, snapshots, and special types.
type Kind<T> = 0 extends 1 & T
  ? "any"
  : [T] extends [never]
    ? "never"
    : unknown extends T
      ? [keyof T] extends [never] ? "unknown" : "ordinary"
      : "ordinary";
function drillMisc<T>(value: T) {
  let first: string | number = "start";
  [first] = [1] as const;
  type _D049 = Expect<Equal<typeof first, TODO>>; // TODO(koan) @koan-error
  let second: string | number = 0;
  ({ value: second } = { value: "next" });
  type _D050 = Expect<Equal<typeof second, TODO>>; // TODO(koan) @koan-error
  const box: { value: string | number } = { value: 0 };
  box.value = "text";
  type _D051 = Expect<Equal<typeof box.value, TODO>>; // TODO(koan) @koan-error
  box.value = 2;
  type _D052 = Expect<Equal<typeof box.value, TODO>>; // TODO(koan) @koan-error
  let original: string | number = "saved";
  const snapshot = original;
  original = 3;
  type _D053 = Expect<Equal<typeof snapshot, TODO>>; // TODO(koan) @koan-error
  let anyValue: any = "text";
  anyValue = 1;
  type _D054 = Expect<Equal<Kind<typeof anyValue>, TODO>>; // TODO(koan) @koan-error
  let unknownValue: unknown = 1;
  type _D055 = Expect<Equal<typeof unknownValue, TODO>>; // TODO(koan) @koan-error
  let ordinary: string | never = "text";
  type _D056 = Expect<Equal<typeof ordinary, TODO>>; // TODO(koan) @koan-error
  let generic: T | undefined;
  generic = value;
  type _D057 = Expect<Equal<typeof generic, TODO>>; // TODO(koan) @koan-error
  generic = undefined;
  type _D058 = Expect<Equal<typeof generic, TODO>>; // TODO(koan) @koan-error
  try {
    throw value;
  } catch (error) {
    type _D059 = Expect<Equal<typeof error, TODO>>; // TODO(koan) @koan-error
  }
  return generic;
}
type _D060 = Expect<Equal<ReturnType<typeof drillMisc>, TODO>>; // TODO(koan) @koan-error
