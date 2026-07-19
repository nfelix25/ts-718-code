import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import { assert, assertDefined, assertString, assertUser } from "./k-032-assertion-functions.js";

/** K-032 drills: repeat named and condition assertions across primitives, generics, objects, and receivers. */

// Group 1: Named assertions replace branch syntax with successful continuation.
function assertNumber(value: unknown): asserts value is number {
  if (typeof value !== "number") throw new TypeError("number");
}
function assertBoolean(value: unknown): asserts value is boolean {
  if (typeof value !== "boolean") throw new TypeError("boolean");
}
function drillNamed(value: unknown) {
  assertString(value);
  type _D001 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  const text = value;
  type _D002 = Expect<Equal<typeof text, TODO>>; // TODO(koan) @koan-error
}
function drillNumber(value: string | number) {
  assertNumber(value);
  type _D003 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  return value;
}
function drillBoolean(value: unknown) {
  const result = assertBoolean(value);
  type _D004 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  type _D005 = Expect<Equal<typeof result, TODO>>; // TODO(koan) @koan-error
}
type _D006 = Expect<Equal<Parameters<typeof assertString>, TODO>>; // TODO(koan) @koan-error
type _D007 = Expect<Equal<ReturnType<typeof assertString>, TODO>>; // TODO(koan) @koan-error
type _D008 = Expect<Equal<Parameters<typeof assertNumber>, TODO>>; // TODO(koan) @koan-error
type _D009 = Expect<Equal<ReturnType<typeof assertNumber>, TODO>>; // TODO(koan) @koan-error
type _D010 = Expect<Equal<ReturnType<typeof drillNumber>, TODO>>; // TODO(koan) @koan-error
const assertionValue: (value: unknown) => asserts value is number = assertNumber;
type _D011 = Expect<Equal<typeof assertionValue, TODO>>; // TODO(koan) @koan-error
type _D012 = Expect<Equal<ReturnType<typeof assertionValue>, TODO>>; // TODO(koan) @koan-error
void drillNamed;
void drillBoolean;

// Group 2: Condition assertions preserve ordinary control-flow expressions.
function drillConditions(value: string | number | null, flag: boolean) {
  assert(value !== null);
  type _D013 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  assert(typeof value === "string");
  type _D014 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  assert(value.length > 0);
  type _D015 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  assert(flag);
  type _D016 = Expect<Equal<typeof flag, TODO>>; // TODO(koan) @koan-error
}
function drillLiteral(value: "a" | "b" | "c") {
  assert(value !== "a");
  type _D017 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  assert(value === "b");
  type _D018 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
}
function drillObject(value: { kind: "a"; a: number } | { kind: "b"; b: string }) {
  assert(value.kind === "a");
  type _D019 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  type _D020 = Expect<Equal<typeof value.a, TODO>>; // TODO(koan) @koan-error
}
function drillConjunction(value: unknown) {
  assert(typeof value === "object" && value !== null);
  type _D021 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  assert("id" in value);
  type _D022 = Expect<Equal<typeof value.id, TODO>>; // TODO(koan) @koan-error
}
type _D023 = Expect<Equal<Parameters<typeof assert>, TODO>>; // TODO(koan) @koan-error
type _D024 = Expect<Equal<ReturnType<typeof assert>, TODO>>; // TODO(koan) @koan-error
void drillConditions;
void drillLiteral;
void drillObject;
void drillConjunction;

// Group 3: Generic assertions retain the caller's non-nullish structure.
function drillGeneric<T>(value: T) {
  assertDefined(value);
  type _D025 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  return value;
}
function drillOptional<T>(value: T | undefined) {
  assertDefined(value);
  type _D026 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  return value;
}
const optionalStrings: Array<string | undefined> = ["a"];
const firstString = optionalStrings[0];
assertDefined(firstString);
type _D027 = Expect<Equal<typeof firstString, TODO>>; // TODO(koan) @koan-error
const optionalTuple: readonly [number?, string?] = [1];
const firstTuple = optionalTuple[0];
assertDefined(firstTuple);
type _D028 = Expect<Equal<typeof firstTuple, TODO>>; // TODO(koan) @koan-error
function drillMap<K, V>(map: Map<K, V>, key: K) {
  const found = map.get(key);
  assertDefined(found);
  type _D029 = Expect<Equal<typeof found, TODO>>; // TODO(koan) @koan-error
  return found;
}
type _D030 = Expect<Equal<ReturnType<typeof drillGeneric>, TODO>>; // TODO(koan) @koan-error
type _D031 = Expect<Equal<ReturnType<typeof drillOptional>, TODO>>; // TODO(koan) @koan-error
type _D032 = Expect<Equal<ReturnType<typeof drillMap>, TODO>>; // TODO(koan) @koan-error
type _D033 = Expect<Equal<Parameters<typeof assertDefined>, TODO>>; // TODO(koan) @koan-error
type _D034 = Expect<Equal<ReturnType<typeof assertDefined>, TODO>>; // TODO(koan) @koan-error
function drillFalsy(value: 0 | false | "" | null) {
  assertDefined(value);
  type _D035 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
}
type _D036 = Expect<Equal<Parameters<typeof drillFalsy>, TODO>>; // TODO(koan) @koan-error
void drillFalsy;

// Group 4: Structural and receiver assertions refine several correlated fields.
function drillUser(value: unknown) {
  assertUser(value);
  type _D037 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  type _D038 = Expect<Equal<typeof value.id, TODO>>; // TODO(koan) @koan-error
  type _D039 = Expect<Equal<typeof value.name, TODO>>; // TODO(koan) @koan-error
}
interface Ready { state: "ready"; data: string }
function assertReady(value: { state: string; data?: unknown }): asserts value is Ready {
  if (value.state !== "ready" || typeof value.data !== "string") throw new Error("not ready");
}
function drillReady(value: { state: string; data?: unknown }) {
  assertReady(value);
  type _D040 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  type _D041 = Expect<Equal<typeof value.data, TODO>>; // TODO(koan) @koan-error
}
class Store<T> {
  value: T | undefined;
  assertValue(): asserts this is this & { value: T } {
    if (this.value === undefined) throw new Error("empty");
  }
}
function drillThis(store: Store<string>) {
  store.assertValue();
  type _D042 = Expect<Equal<typeof store, TODO>>; // TODO(koan) @koan-error
  type _D043 = Expect<Equal<typeof store.value, TODO>>; // TODO(koan) @koan-error
}
const users: unknown[] = [{ id: 1, name: "Ada" }];
const firstUser = users[0];
assertUser(firstUser);
type _D044 = Expect<Equal<typeof firstUser, TODO>>; // TODO(koan) @koan-error
type _D045 = Expect<Equal<Parameters<typeof assertReady>, TODO>>; // TODO(koan) @koan-error
type _D046 = Expect<Equal<ReturnType<typeof assertReady>, TODO>>; // TODO(koan) @koan-error
type _D047 = Expect<Equal<Parameters<Store<string>["assertValue"]>, TODO>>; // TODO(koan) @koan-error
type _D048 = Expect<Equal<ReturnType<Store<string>["assertValue"]>, TODO>>; // TODO(koan) @koan-error
void drillUser;
void drillReady;
void drillThis;

// Group 5: Contradictions, special types, aliases, and callable annotations.
type Kind<T> = 0 extends 1 & T
  ? "any"
  : [T] extends [never]
    ? "never"
    : unknown extends T
      ? [keyof T] extends [never] ? "unknown" : "ordinary"
      : "ordinary";
function drillContradiction(value: string | number) {
  assertString(value);
  type _D049 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  assertNumber(value);
  type _D050 = Expect<Equal<Kind<typeof value>, TODO>>; // TODO(koan) @koan-error
}
function drillUnknown(value: unknown) {
  assertString(value);
  type _D051 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
}
function drillAny(value: any) {
  assertString(value);
  type _D052 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
}
function drillNever(value: never) {
  assertString(value);
  type _D053 = Expect<Equal<Kind<typeof value>, TODO>>; // TODO(koan) @koan-error
}
const explicit: (value: unknown) => asserts value is string = assertString;
type _D054 = Expect<Equal<typeof explicit, TODO>>; // TODO(koan) @koan-error
function drillExplicit(value: unknown) {
  explicit(value);
  type _D055 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
}
const conditionAssertion: (condition: unknown) => asserts condition = assert;
function drillAlias(flag: boolean) {
  conditionAssertion(flag);
  type _D056 = Expect<Equal<typeof flag, TODO>>; // TODO(koan) @koan-error
}
type _D057 = Expect<Equal<ReturnType<typeof explicit>, TODO>>; // TODO(koan) @koan-error
type _D058 = Expect<Equal<Parameters<typeof explicit>, TODO>>; // TODO(koan) @koan-error
type _D059 = Expect<Equal<ReturnType<typeof conditionAssertion>, TODO>>; // TODO(koan) @koan-error
type _D060 = Expect<Equal<Parameters<typeof conditionAssertion>, TODO>>; // TODO(koan) @koan-error
void drillContradiction;
void drillUnknown;
void drillAny;
void drillNever;
void drillExplicit;
void drillAlias;
