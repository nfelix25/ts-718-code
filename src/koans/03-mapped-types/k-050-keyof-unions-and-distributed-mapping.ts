import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-050: keyof unions and distributed mapping
 * =============================================================================
 *
 * `keyof (A | B)` contains keys that are safe to use before narrowing: the
 * intersection of the members' key sets. Sometimes an algorithm instead needs
 * every key appearing anywhere in the union. A distributive conditional can
 * ask `keyof` of each member separately and then union those answers.
 *
 * I read the contrast aloud as:
 *
 *   "keyof the union asks what every member supports. Distribute first, and
 *    keyof each member asks what any member contributes."
 *
 * This lesson uses `T extends unknown ? ... : never` as a focused preview; the
 * full mechanics arrive in Phase 4. The same placement decision shapes mapped
 * output. `Record<keyof T, V>` builds one common-key view. Distributing that
 * record construction builds a union of member-specific views. Flattening all
 * keys into one optional object is a third, deliberate representation, and it
 * loses the original correlation between which fields coexist.
 */

export type CommonKeys<T> = keyof T;
export type AllKeys<T> = T extends unknown ? keyof T : never;
export type CommonFlags<T> = Record<keyof T, boolean>;
export type DistributedFlags<T> = T extends unknown ? Record<keyof T, boolean> : never;

export type ValueAtAnyMember<T, K extends PropertyKey> =
  T extends unknown ? K extends keyof T ? T[K] : never : never;

export type OptionalUnionView<T> = {
  [K in AllKeys<T>]?: ValueAtAnyMember<T, K>
};

export function commonOwnKeys(values: readonly object[]): PropertyKey[] {
  if (values.length === 0) return [];
  const [first, ...rest] = values;
  return Reflect.ownKeys(first!).filter(key => rest.every(value => Object.hasOwn(value, key)));
}

export function allOwnKeys(values: readonly object[]): PropertyKey[] {
  return [...new Set(values.flatMap(value => Reflect.ownKeys(value)))];
}

export function hasOwnKey<T extends object, K extends PropertyKey>(value: T, key: K): key is K & keyof T {
  return Object.hasOwn(value, key);
}

type MainVariant =
  | { kind: "text"; common: boolean; text: string }
  | { kind: "count"; common: boolean; count: number };

// Part 1: keyof a union exposes the safe, common key surface.
type _Main01 = Expect<Equal<CommonKeys<MainVariant>, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<MainVariant["kind"], TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<MainVariant["common"], TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<keyof ({ a: 1 } | { b: 2 }), TODO>>; // TODO(koan) @koan-error

// Part 2: Distributing keyof collects keys from every member.
type MainAllKeys = AllKeys<MainVariant>;
type _Main05 = Expect<Equal<MainAllKeys, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<AllKeys<{ a: 1 } | { b: 2 }>, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<AllKeys<MainVariant> & string, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<AllKeys<never>, TODO>>; // TODO(koan) @koan-error

// Part 3: A non-distributed Record builds one common-key object.
type MainCommonFlags = CommonFlags<MainVariant>;
type _Main09 = Expect<Equal<MainCommonFlags, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<keyof MainCommonFlags, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<CommonFlags<{ a: 1 } | { b: 2 }>, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<CommonFlags<MainVariant>["kind"], TODO>>; // TODO(koan) @koan-error

// Part 4: Distribution builds a union of member-specific records.
type MainDistributedFlags = DistributedFlags<MainVariant>;
type _Main13 = Expect<Equal<MainDistributedFlags, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<keyof MainDistributedFlags, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<Extract<MainDistributedFlags, { text: boolean }>, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<DistributedFlags<{ a: 1 } | { b: 2 }>, TODO>>; // TODO(koan) @koan-error

// Part 5: An all-key optional view flattens alternatives and loses correlation.
type MainOptionalView = OptionalUnionView<MainVariant>;
type _Main17 = Expect<Equal<MainOptionalView, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<keyof MainOptionalView, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<ValueAtAnyMember<MainVariant, "text">, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<ValueAtAnyMember<MainVariant, "kind">, TODO>>; // TODO(koan) @koan-error
