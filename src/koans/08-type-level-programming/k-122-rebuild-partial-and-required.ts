import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 122 - REBUILD PARTIAL AND REQUIRED
 * ========================================
 *
 * `Partial<T>` adds the optional presence modifier to every property.
 * `Required<T>` removes it. Neither utility is fundamentally about adding or
 * removing `undefined`; with exact optional properties, presence and value are
 * separate axes.
 *
 * Read `{ [P in keyof T]?: T[P] }` aloud as: "copy every property from T, but
 * permit each one to be absent." Read `-?` as subtraction: "copy every property
 * and remove optional presence." Because these are homomorphic mappings, source
 * readonly modifiers, arrays, tuples, and union branches keep special behavior.
 */

export type KoanPartial<T> = {
  [P in keyof T]?: T[P];
};

export type KoanRequired<T> = {
  [P in keyof T]-?: T[P];
};

type Config = {
  readonly id: string;
  host: string;
  port?: number;
  mode: "dev" | "prod" | undefined;
};

// Part 1: Partial changes presence for every key.
type _01 = Expect<Equal<KoanPartial<{ a: 1; b: 2 }>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<KoanPartial<Config>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<keyof KoanPartial<Config>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<KoanPartial<{}>, TODO>>; // TODO(koan) @koan-error

// Part 2: Required removes optional presence.
type _05 = Expect<Equal<KoanRequired<{ a?: 1; b?: 2 }>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<KoanRequired<Config>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<KoanRequired<KoanPartial<{ a: 1; b: 2 }>>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<KoanPartial<KoanRequired<{ a?: 1 }>>, TODO>>; // TODO(koan) @koan-error

// Part 3: Optional presence is not explicit undefined.
type _09 = Expect<Equal<KoanRequired<{ value?: string }>["value"], TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<KoanRequired<{ value?: string | undefined }>["value"], TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<KoanPartial<{ value: string }>["value"], TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<KoanRequired<{ value: string | undefined }>, TODO>>; // TODO(koan) @koan-error

// Part 4: Homomorphic mapping preserves readonly and tuple identity.
type _13 = Expect<Equal<KoanPartial<{ readonly id: string; count: number }>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<KoanRequired<{ readonly id?: string }>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<KoanPartial<[name: string, age: number]>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<KoanRequired<[name?: string, age?: number]>, TODO>>; // TODO(koan) @koan-error

// Part 5: Homomorphic utilities distribute over object unions.
type Variant = { kind: "a"; a: number } | { kind: "b"; b?: string };
type _17 = Expect<Equal<KoanPartial<Variant>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<KoanRequired<Variant>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<KoanPartial<never>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<KoanRequired<unknown>, TODO>>; // TODO(koan) @koan-error

export function withDefaults<T extends object>(defaults: T, values: KoanPartial<T>): T {
  return { ...defaults, ...values };
}
