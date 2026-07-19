import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 118 - REBUILD PICK
 * ========================================
 *
 * `Pick<T, K>` is the smallest useful mapped program: iterate over the selected
 * key union K and look up T[P] for each P. Its power comes from the relationship
 * `K extends keyof T`, which rejects keys the source cannot prove.
 *
 * Read `{ [P in K]: T[P] }` aloud as: "for every requested property P, create P
 * with the value type found at T[P]." Because the mapping comes directly from T,
 * readonly and optional modifiers are preserved. Object unions require another
 * choice: map their common surface once, or distribute and pick each branch.
 */

export type KoanPick<T, K extends keyof T> = {
  [P in K]: T[P];
};

export type DistributedPick<T, K extends PropertyKey> = T extends unknown
  ? KoanPick<T, Extract<K, keyof T>>
  : never;

type User = {
  readonly id: string;
  name: string;
  email?: string;
  active: boolean;
};

// Part 1: K controls the output key set.
type _01 = Expect<Equal<KoanPick<User, "id">, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<KoanPick<User, "name" | "active">, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<KoanPick<User, keyof User>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<KoanPick<User, never>, TODO>>; // TODO(koan) @koan-error

// Part 2: Value types are indexed directly from the source.
type _05 = Expect<Equal<KoanPick<User, "name">["name"], TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<KoanPick<User, "email">["email"], TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<keyof KoanPick<User, "id" | "email">, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<KoanPick<{ value: 1 | 2 }, "value">, TODO>>; // TODO(koan) @koan-error

// Part 3: Source modifiers survive the mapping.
type _09 = Expect<Equal<KoanPick<User, "id" | "email">, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Required<KoanPick<User, "email">>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Readonly<KoanPick<User, "name">>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<KoanPick<Partial<User>, "name" | "active">, TODO>>; // TODO(koan) @koan-error

// Part 4: PropertyKey includes string, number, and symbol keys.
declare const token: unique symbol;
type Mixed = { 0: "zero"; label: string; [token]: boolean };
type _13 = Expect<Equal<KoanPick<Mixed, 0>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<KoanPick<Mixed, typeof token>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<KoanPick<Mixed, 0 | "label" | typeof token>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<keyof KoanPick<Mixed, 0 | typeof token>, TODO>>; // TODO(koan) @koan-error

// Part 5: Distribution preserves branch-specific keys and correlations.
type Event = { kind: "click"; x: number } | { kind: "key"; key: string };
type _17 = Expect<Equal<KoanPick<Event, "kind">, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<DistributedPick<Event, "kind">, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<DistributedPick<Event, "kind" | "x" | "key">, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<DistributedPick<never, "kind">, TODO>>; // TODO(koan) @koan-error

export function pick<T extends object, const Keys extends readonly (keyof T)[]>(
  source: T,
  keys: Keys,
): KoanPick<T, Keys[number]> {
  const result = {} as KoanPick<T, Keys[number]>;
  for (const key of keys) {
    result[key] = source[key];
  }
  return result;
}
