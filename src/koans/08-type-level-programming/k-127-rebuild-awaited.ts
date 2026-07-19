import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 127 - REBUILD AWAITED
 * ========================================
 *
 * `Awaited<T>` models JavaScript await and Promise resolution rather than merely
 * removing one `Promise<...>` wrapper. It preserves nullish inputs, recognizes
 * structural thenables, captures the fulfilled value from the first callback
 * parameter, and recursively assimilates that value until it is no longer thenable.
 *
 * Read the middle branch aloud as: "if T is an object with a then method, capture
 * the type F of its fulfillment callback; if F is callable with a first value V,
 * recursively Await V; otherwise the thenable is invalid and produces never."
 */

export type KoanAwaited<T> = T extends null | undefined
  ? T
  : T extends object & { then(onfulfilled: infer Fulfilled, ...args: infer _Rest): any }
    ? Fulfilled extends (value: infer Value, ...args: infer _Rest) => any
      ? KoanAwaited<Value>
      : never
    : T;

type IsAny<T> = 0 extends 1 & T ? true : false;

// Part 1: Non-thenable values pass through unchanged.
type _01 = Expect<Equal<KoanAwaited<string>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<KoanAwaited<{ id: number }>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<KoanAwaited<null>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<KoanAwaited<undefined>, TODO>>; // TODO(koan) @koan-error

// Part 2: Promise wrappers unwrap recursively.
type _05 = Expect<Equal<KoanAwaited<Promise<string>>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<KoanAwaited<Promise<Promise<number>>>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<KoanAwaited<Promise<Promise<Promise<boolean>>>>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<KoanAwaited<Promise<string | null>>, TODO>>; // TODO(koan) @koan-error

// Part 3: Thenability is structural, not nominal.
type Thenable<T> = { then(onfulfilled: (value: T) => unknown): unknown };
type _09 = Expect<Equal<KoanAwaited<Thenable<"ready">>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<KoanAwaited<Thenable<Thenable<number>>>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<KoanAwaited<{ then(onfulfilled: string): void }>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<KoanAwaited<{ then: string }>, TODO>>; // TODO(koan) @koan-error

// Part 4: The naked T distributes over unions.
type _13 = Expect<Equal<KoanAwaited<Promise<string> | number>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<KoanAwaited<Promise<1> | Promise<2>>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<KoanAwaited<null | Promise<string>>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<KoanAwaited<Thenable<1> | { value: 2 }>, TODO>>; // TODO(koan) @koan-error

// Part 5: Top and bottom types retain conditional-type algebra.
type _17 = Expect<Equal<KoanAwaited<unknown>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<KoanAwaited<never>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<IsAny<KoanAwaited<any>>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<KoanAwaited<Promise<never>>, TODO>>; // TODO(koan) @koan-error

export function resolveAwaited<T>(value: T): Promise<KoanAwaited<T>> {
  return Promise.resolve(value) as Promise<KoanAwaited<T>>;
}
