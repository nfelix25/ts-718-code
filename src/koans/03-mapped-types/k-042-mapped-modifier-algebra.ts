import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-042: mapped modifier algebra
 * =============================================================================
 *
 * Mapped properties can explicitly add or remove the `readonly` and optional
 * modifiers inherited from a source. `+readonly` and `+?` add modifiers;
 * `-readonly` and `-?` remove them. The plus signs are optional, so `readonly`
 * means `+readonly` and `?` means `+?`.
 *
 * I read `-readonly [K in keyof T]-?: T[K]` aloud as:
 *
 *   "For every source key, emit a mutable required property with the same value
 *    type."
 *
 * The axes are independent. Removing readonly does not make a property required,
 * and removing optionality does not make it mutable. Transform composition can
 * therefore be reasoned about as two small state machines. Operations are
 * shallow and idempotent: adding readonly twice is the same as once. With
 * `exactOptionalPropertyTypes`, removing `?` changes presence, not an explicitly
 * declared `undefined` member. Homomorphic modifier transforms also affect array
 * and tuple container mutability in useful, specialized ways.
 */

export type Mutable<T> = { -readonly [K in keyof T]: T[K] };
export type Concrete<T> = { [K in keyof T]-?: T[K] };
export type Optional<T> = { [K in keyof T]+?: T[K] };
export type Frozen<T> = { +readonly [K in keyof T]: T[K] };
export type MutableRequired<T> = { -readonly [K in keyof T]-?: T[K] };

export function mutableCopy<T extends object>(value: T): Mutable<T> {
  return { ...value };
}

export function applyUpdate<T extends object>(value: T, update: Optional<T>): T {
  return { ...value, ...update };
}

export function requireDefaults<T extends object>(
  value: T,
  defaults: MutableRequired<T>,
): MutableRequired<T> {
  return { ...defaults, ...value } as MutableRequired<T>;
}

interface MainSource {
  readonly id: number;
  readonly name?: string;
  active?: boolean;
  count: number;
}

// Part 1: Adding modifiers forces every mapped property into that state.
type MainFrozen = { +readonly [K in keyof MainSource]: MainSource[K] };
type MainOptional = { [K in keyof MainSource]+?: MainSource[K] };
type _Main01 = Expect<Equal<MainFrozen, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<MainOptional, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<Frozen<MainSource>, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<Optional<MainSource>, TODO>>; // TODO(koan) @koan-error

// Part 2: Removing one modifier leaves the other axis unchanged.
type MainMutable = { -readonly [K in keyof MainSource]: MainSource[K] };
type MainConcrete = { [K in keyof MainSource]-?: MainSource[K] };
type _Main05 = Expect<Equal<MainMutable, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<MainConcrete, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<Mutable<MainSource>, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<Concrete<MainSource>, TODO>>; // TODO(koan) @koan-error

// Part 3: Both axes can be changed in one mapped declaration.
type MainMutableRequired = { -readonly [K in keyof MainSource]-?: MainSource[K] };
type MainReadonlyOptional = { +readonly [K in keyof MainSource]+?: MainSource[K] };
type _Main09 = Expect<Equal<MainMutableRequired, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<MainReadonlyOptional, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<MutableRequired<MainSource>, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<Frozen<Optional<MainSource>>, TODO>>; // TODO(koan) @koan-error

// Part 4: Composition is idempotent but opposite operations are order-sensitive.
type _Main13 = Expect<Equal<Mutable<Mutable<MainSource>>, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<Frozen<Frozen<MainSource>>, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<Mutable<Frozen<MainSource>>, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<Frozen<Mutable<MainSource>>, TODO>>; // TODO(koan) @koan-error

// Part 5: Explicit undefined and readonly containers retain their own value facts.
interface MainUndefined { optional?: string; explicit: string | undefined }
type _Main17 = Expect<Equal<Concrete<MainUndefined>, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<Concrete<MainUndefined>["explicit"], TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<Mutable<readonly ["a", 1]>, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<Frozen<string[]>, TODO>>; // TODO(koan) @koan-error
