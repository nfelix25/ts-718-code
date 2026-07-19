import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-044: mapping arrays and tuples
 * =============================================================================
 *
 * Homomorphic mapped types recognize array and tuple containers. Mapping
 * `{ [K in keyof T]: F<T[K]> }` over an array produces another array-like type,
 * and mapping it over a tuple transforms element positions while preserving the
 * tuple's length, optional/rest structure, labels, and readonly state.
 *
 * I read a tuple mapping aloud as:
 *
 *   "Transform each element slot, while keeping the container facts that relate
 *    those slots to one another."
 *
 * This is more precise than manually mapping `keyof T & number`. Tuple `keyof`
 * contains numeric indexing and array members in addition to position keys, but
 * homomorphic mapping has dedicated behavior that emits a tuple rather than a
 * plain numeric object. `T[number]` extracts the union of possible element values;
 * it does not preserve positions. Readonly modifier transforms convert whole
 * array/tuple containers, and optionality transforms affect tuple slots. Empty,
 * optional, rest, variadic, labeled, and readonly tuples each provide distinct
 * repetitions of the same container-preserving rule.
 */

export type Strings<T extends readonly unknown[]> = { [K in keyof T]: string };
export type Boxed<T extends readonly unknown[]> = { [K in keyof T]: { value: T[K] } };
export type Mutable<T extends readonly unknown[]> = { -readonly [K in keyof T]: T[K] };
export type OptionalElements<T extends readonly unknown[]> = { [K in keyof T]+?: T[K] };

export function stringifyItems<T extends readonly unknown[]>(values: T): Strings<T> {
  return values.map(String) as unknown as Strings<T>;
}

export function boxItems<T extends readonly unknown[]>(values: T): Boxed<T> {
  return values.map(value => ({ value })) as unknown as Boxed<T>;
}

export function mutableItems<T extends readonly unknown[]>(values: T): Mutable<T> {
  return [...values] as Mutable<T>;
}

export function presentItems<T>(values: readonly (T | undefined)[]): T[] {
  return values.filter((value): value is T => value !== undefined);
}

// Part 1: Array mappings preserve array containers and transform element types.
type MainArray = { [K in keyof number[]]: string };
type MainGenericArray = Strings<number[]>;
type _Main01 = Expect<Equal<MainArray, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<MainGenericArray, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<MainGenericArray[number], TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<keyof MainGenericArray, TODO>>; // TODO(koan) @koan-error

// Part 2: Tuple mappings preserve fixed positions and literal length.
type MainTuple = [name: string, count: number, active: boolean];
type MainTupleStrings = Strings<MainTuple>;
type _Main05 = Expect<Equal<MainTupleStrings, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<MainTupleStrings[0], TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<MainTupleStrings["length"], TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<MainTuple[number], TODO>>; // TODO(koan) @koan-error

// Part 3: Readonly modifier mappings convert the whole container.
type MainReadonly = readonly ["a", 1];
type _Main09 = Expect<Equal<Strings<MainReadonly>, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<Mutable<MainReadonly>, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<Readonly<string[]>, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<Mutable<readonly string[]>, TODO>>; // TODO(koan) @koan-error

// Part 4: Optional and rest slots retain tuple structure through mapping.
type MainOptional = [name?: string, count?: number];
type MainRest = [head: string, ...tail: number[]];
type _Main13 = Expect<Equal<Strings<MainOptional>, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<Required<MainOptional>, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<Strings<MainRest>, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<MainRest[number], TODO>>; // TODO(koan) @koan-error

// Part 5: Detached numeric mappings are objects, not homomorphic tuple transforms.
type MainNumericMap<T extends readonly unknown[]> = { [K in keyof T & number]: T[K] };
type MainDetached = MainNumericMap<readonly ["a", 1]>;
type _Main17 = Expect<Equal<MainDetached, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<keyof MainDetached, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<MainDetached[number], TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<Strings<readonly []>, TODO>>; // TODO(koan) @koan-error
