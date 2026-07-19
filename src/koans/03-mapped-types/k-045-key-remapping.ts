import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-045: key remapping
 * =============================================================================
 *
 * The `as` clause in a mapped type computes the output property name separately
 * from the source key being iterated. `{ [K in keyof T as Rename<K>]: T[K] }`
 * still uses K to read the original value, but emits that value under the key
 * produced by `Rename<K>`.
 *
 * I read a remapping aloud as:
 *
 *   "For each source key K, compute one or more destination keys, then place the
 *    source property's transformed value at every destination."
 *
 * A destination may be a string, number, symbol, a union of keys, or `never`.
 * A union duplicates one source property; `never` emits none and receives its own
 * filtering lesson next. If several source keys land on the same destination,
 * their value types combine. Remapping can also iterate a union of structured
 * values instead of `keyof T`, using each member's discriminator as the output
 * key. This is the foundation of handler maps and schema indexes. Preserve the
 * distinction between source K, destination name, and value expression while
 * reading every example.
 */

export type SwapCoordinates<T> = {
  [K in keyof T as K extends "x" ? "y" : K extends "y" ? "x" : K]: T[K]
};

export type Duplicate<T> = { [K in keyof T as K | "all"]: T[K] };

export type EventHandlers<E extends { type: PropertyKey }> = {
  [Event in E as Event["type"]]: (event: Event) => void
};

export function swapCoordinates(value: { x: number; y: number }): SwapCoordinates<typeof value> {
  return { x: value.y, y: value.x };
}

export function renameUser(value: { first: string; last: string }): { firstName: string; lastName: string } {
  return { firstName: value.first, lastName: value.last };
}

export function duplicateValue<T>(value: T): { original: T; backup: T } {
  return { original: value, backup: value };
}

export function handlerKeys<E extends { type: PropertyKey }>(handlers: EventHandlers<E>): PropertyKey[] {
  return Reflect.ownKeys(handlers);
}

interface MainSource { id: number; name: string; active: boolean }

// Part 1: Identity and conditional remaps separate source from destination keys.
type MainIdentity = { [K in keyof MainSource as K]: MainSource[K] };
type MainSwap = { [K in keyof MainSource as K extends "id" ? "key" : K]: MainSource[K] };
type _Main01 = Expect<Equal<MainIdentity, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<MainSwap, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<keyof MainSwap, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<MainSwap["key"], TODO>>; // TODO(koan) @koan-error

// Part 2: A lookup object can drive reusable key renaming.
type MainNames = { id: "identifier"; name: "displayName"; active: "enabled" };
type MainRenamed = { [K in keyof MainSource as MainNames[K]]: MainSource[K] };
type _Main05 = Expect<Equal<MainRenamed, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<keyof MainRenamed, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<MainRenamed["identifier"], TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<MainRenamed["displayName"], TODO>>; // TODO(koan) @koan-error

// Part 3: Union destinations duplicate; shared destinations merge source values.
type MainDuplicated = { [K in keyof MainSource as K | "all"]: MainSource[K] };
type MainCollapsed = { [K in keyof MainSource as "value"]: MainSource[K] };
type _Main09 = Expect<Equal<MainDuplicated, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<MainDuplicated["all"], TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<MainCollapsed, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<MainCollapsed["value"], TODO>>; // TODO(koan) @koan-error

// Part 4: Structured union members can map their discriminator to handler values.
type MainEvent =
  | { type: "open"; id: string }
  | { type: "close"; code: number };
type MainHandlers = EventHandlers<MainEvent>;
type _Main13 = Expect<Equal<MainHandlers, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<keyof MainHandlers, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<Parameters<MainHandlers["open"]>, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<Parameters<MainHandlers["close"]>, TODO>>; // TODO(koan) @koan-error

// Part 5: Destination expressions can emit numeric and symbol identities too.
declare const mainSymbol: unique symbol;
type MainMixed = { [K in "text" | "count" as K extends "text" ? typeof mainSymbol : 0]: K };
type _Main17 = Expect<Equal<MainMixed, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<keyof MainMixed, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<MainMixed[typeof mainSymbol], TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<MainMixed[0], TODO>>; // TODO(koan) @koan-error
