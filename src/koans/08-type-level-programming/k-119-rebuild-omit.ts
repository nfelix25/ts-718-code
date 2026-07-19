import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 119 - REBUILD OMIT
 * ========================================
 *
 * `Omit<T, K>` computes the surviving keys with `Exclude<keyof T, K>`, then
 * maps those keys back to their values. Unlike Pick, K need not be proven
 * present: asking to omit an absent key is a harmless no-op.
 *
 * Read `[P in Exclude<keyof T, K>]: T[P]` aloud as: "subtract blocked keys K
 * from T's visible key set, then copy every survivor P and its value." Modifiers
 * flow from T. As with Pick, explicitly distributing T is required when each
 * union branch must retain its own keys. A key-remapped alternative is also
 * shown because its homomorphic union behavior is a memorable contrast.
 */

type PickKeys<T, K extends keyof T> = { [P in K]: T[P] };

export type KoanOmit<T, K extends PropertyKey> = PickKeys<T, Exclude<keyof T, K>>;

export type RemappedOmit<T, K extends PropertyKey> = {
  [P in keyof T as P extends K ? never : P]: T[P];
};

export type DistributedOmit<T, K extends PropertyKey> = T extends unknown
  ? KoanOmit<T, K>
  : never;

type User = {
  readonly id: string;
  name: string;
  email?: string;
  password: string;
};

// Part 1: Omission is the complement of a selected key set.
type _01 = Expect<Equal<KoanOmit<User, "password">, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<KoanOmit<User, "email" | "password">, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<KoanOmit<User, never>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<KoanOmit<User, keyof User>, TODO>>; // TODO(koan) @koan-error

// Part 2: Missing blocked keys are ignored rather than rejected.
type _05 = Expect<Equal<KoanOmit<User, "missing">, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<KoanOmit<User, "password" | "missing">, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<keyof KoanOmit<User, "password">, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<keyof KoanOmit<User, PropertyKey>, TODO>>; // TODO(koan) @koan-error

// Part 3: Retained modifiers and values come directly from T.
type _09 = Expect<Equal<KoanOmit<User, "name" | "password">, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<KoanOmit<User, "id" | "password">, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<KoanOmit<Partial<User>, "password">, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<KoanOmit<Readonly<User>, "password">, TODO>>; // TODO(koan) @koan-error

// Part 4: K can filter string, number, and symbol key domains.
declare const token: unique symbol;
type Mixed = { 0: "zero"; 1: "one"; label: string; [token]: boolean };
type _13 = Expect<Equal<KoanOmit<Mixed, 0>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<KoanOmit<Mixed, typeof token>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<KoanOmit<Mixed, string>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<KoanOmit<Mixed, number | symbol>, TODO>>; // TODO(koan) @koan-error

// Part 5: Distribution retains keys that exist on only one branch.
type Event = { kind: "click"; x: number } | { kind: "key"; key: string };
type _17 = Expect<Equal<KoanOmit<Event, "kind">, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<DistributedOmit<Event, "kind">, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<DistributedOmit<Event, "x">, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<DistributedOmit<never, "kind">, TODO>>; // TODO(koan) @koan-error

export function omit<T extends object, const Keys extends readonly PropertyKey[]>(
  source: T,
  keys: Keys,
): KoanOmit<T, Keys[number]> {
  const blocked = new Set<PropertyKey>(keys);
  const result: Record<PropertyKey, unknown> = {};
  for (const key of Reflect.ownKeys(source)) {
    if (!blocked.has(key) && Object.prototype.propertyIsEnumerable.call(source, key)) {
      result[key] = Reflect.get(source, key);
    }
  }
  return result as KoanOmit<T, Keys[number]>;
}
