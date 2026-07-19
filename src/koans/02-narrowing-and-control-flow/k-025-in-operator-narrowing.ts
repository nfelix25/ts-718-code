import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-025: in-operator narrowing
 * =============================================================================
 *
 * JavaScript's `key in value` asks whether a property exists anywhere on an
 * object's prototype chain. TypeScript uses a literal key to divide a union by
 * which members declare that property. Required properties stay in the true
 * branch; members that do not declare it stay in the false branch.
 *
 * I read `if ("swim" in animal)` aloud as:
 *
 *   "On the true path, retain union members that may provide swim; on the false
 *    path, retain members that may omit it."
 *
 * "May" matters for optional properties: a member with `swim?` can appear in
 * either branch because the property may exist or be absent at runtime. The `in`
 * operator is not an own-property check; inherited properties count. Modern
 * TypeScript also narrows an object with no listed property to an intersection
 * carrying `Record<key, unknown>`, which makes guarded property access possible
 * after first proving an unknown value is a non-null object. The right operand
 * must be object-like, and the left operand must be a property key.
 */

export interface Fish {
  kind: "fish";
  swim(): string;
}

export interface Bird {
  kind: "bird";
  fly(): string;
}

export interface Human {
  kind: "human";
  swim?: () => string;
  fly?: () => string;
}

export function move(creature: Fish | Bird): string {
  return "swim" in creature ? creature.swim() : creature.fly();
}

export function readName(value: unknown): string | undefined {
  if (typeof value !== "object" || value === null || !("name" in value)) return undefined;
  return typeof value.name === "string" ? value.name : undefined;
}

export function errorCode(value: Error | { code: number }): number | undefined {
  return "code" in value ? value.code : undefined;
}

export function contact(value: { email: string } | { phone: string }): string {
  return "email" in value ? value.email : value.phone;
}

export function hasInheritedToString(value: object): boolean {
  return "toString" in value;
}

// Part 1: Required unique properties divide a union cleanly.
function mainRequired(value: Fish | Bird) {
  if ("swim" in value) {
    type _Main01 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _Main02 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if ("fly" in value) {
    type _Main03 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _Main04 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
void mainRequired;

// Part 2: Optional properties can survive on both paths.
function mainOptional(value: Fish | Bird | Human) {
  if ("swim" in value) {
    type _Main05 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _Main06 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  if ("fly" in value) {
    type _Main07 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _Main08 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
}
void mainOptional;

// Part 3: Chained checks accumulate property evidence and exclusions.
type MainMessage = { text: string } | { bytes: Uint8Array } | { error: Error };
function mainChain(value: MainMessage) {
  if ("text" in value) {
    type _Main09 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else if ("bytes" in value) {
    type _Main10 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _Main11 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  }
  type _Main12 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
}
void mainChain;

// Part 4: Early returns leave only members without the checked keys.
function mainReturns(value: MainMessage) {
  if ("text" in value) return value.text.length;
  type _Main13 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  if ("bytes" in value) return value.bytes.length;
  type _Main14 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  const remaining = value;
  type _Main15 = Expect<Equal<typeof remaining, TODO>>; // TODO(koan) @koan-error
  return remaining.error.message.length;
}
type _Main16 = Expect<Equal<ReturnType<typeof mainReturns>, TODO>>; // TODO(koan) @koan-error

// Part 5: Unknown needs an object guard before unlisted-property narrowing.
function mainUnknown(value: unknown) {
  if (typeof value === "object" && value !== null && "name" in value) {
    type _Main17 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
    type _Main18 = Expect<Equal<typeof value.name, TODO>>; // TODO(koan) @koan-error
  }
  if (typeof value === "object" && value !== null && "count" in value) {
    type _Main19 = Expect<Equal<typeof value.count, TODO>>; // TODO(koan) @koan-error
  }
  type _Main20 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
}
void mainUnknown;
