import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-059: distributive conditional types
 * =============================================================================
 *
 * A conditional distributes when its checked side is a naked type parameter:
 * `T extends U ? X<T> : Y<T>`. Instantiating T with `A | B` evaluates the full
 * conditional once for A and once for B, then unions the branch results.
 *
 * I read distribution aloud as:
 *
 *   "Split T into its union members, run this conditional for each member, and
 *    union every surviving result."
 *
 * This is a mapping operation over a union. Returning `never` for a member
 * removes it because `X | never` simplifies to X. Mentioning T in a branch
 * preserves the current member rather than the original whole union, enabling
 * filters, wrappers, tagged representations, and correlated dispatch tables.
 * A concrete expression such as `(A | B) extends U` is not naked-generic and is
 * tested as a whole. If two naked parameters are nested, each distributes and
 * the result is their Cartesian product. The next lesson shows tuple wrapping
 * and other ways to opt out deliberately.
 */

export type ToArray<T> = T extends unknown ? T[] : never;
export type KeepStrings<T> = T extends string ? T : never;
export type Tagged<T> = T extends unknown ? { type: T; value: T } : never;
export type Product<A, B> = A extends unknown ? B extends unknown ? [A, B] : never : never;

export type HandlerFor<Event extends { type: PropertyKey }> =
  Event extends unknown ? { type: Event["type"]; handle: (event: Event) => void } : never;

export function partitionStrings(values: readonly unknown[]): [strings: string[], others: unknown[]] {
  const strings: string[] = [];
  const others: unknown[] = [];
  for (const value of values) (typeof value === "string" ? strings : others).push(value);
  return [strings, others];
}

export function tagValues<T>(values: readonly T[]): Tagged<T>[] {
  return values.map(value => ({ type: value, value })) as Tagged<T>[];
}

export function cartesian<A, B>(left: readonly A[], right: readonly B[]): Product<A, B>[] {
  return left.flatMap(a => right.map(b => [a, b])) as Product<A, B>[];
}

// Part 1: A naked parameter maps each union member independently.
type _Main01 = Expect<Equal<ToArray<string | number>, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<Tagged<"a" | "b">, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<ToArray<1 | 2 | 3>, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<Tagged<boolean>, TODO>>; // TODO(koan) @koan-error

// Part 2: Returning never filters out the current member.
type _Main05 = Expect<Equal<KeepStrings<string | number | boolean>, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<KeepStrings<"a" | 1 | "b" | 2>, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<KeepStrings<number | boolean>, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<KeepStrings<never>, TODO>>; // TODO(koan) @koan-error

// Part 3: A concrete union expression is tested whole instead of distributed.
type MainConcrete = (string | number) extends string ? "yes" : "no";
type MainGeneric = KeepStrings<string | number>;
type _Main09 = Expect<Equal<MainConcrete, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<MainGeneric, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<("a" | "b") extends string ? true : false, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<KeepStrings<"a" | "b">, TODO>>; // TODO(koan) @koan-error

// Part 4: Two nested naked parameters form a Cartesian product.
type MainProduct = Product<"x" | "y", 1 | 2>;
type _Main13 = Expect<Equal<MainProduct, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<Product<"x", 1 | 2>, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<Product<never, 1 | 2>, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<Product<"x" | "y", never>, TODO>>; // TODO(koan) @koan-error

// Part 5: The current structured member remains correlated inside its branch.
type MainEvent = { type: "open"; path: string } | { type: "close"; code: number };
type MainHandlers = HandlerFor<MainEvent>;
type _Main17 = Expect<Equal<MainHandlers, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<Extract<MainHandlers, { type: "open" }>, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<Parameters<Extract<MainHandlers, { type: "close" }>["handle"]>, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<MainHandlers["type"], TODO>>; // TODO(koan) @koan-error
