import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-064: infer basics
 * =============================================================================
 *
 * `infer` introduces a type variable inside a conditional pattern. Instead of
 * asking only whether T matches an array, promise, object, function, or
 * constructor shape, the pattern captures the type found at a chosen position.
 * The captured name is available only in the true branch.
 *
 * I read `T extends readonly (infer Element)[] ? Element : never` aloud as:
 *
 *   "If T is a readonly-compatible array, call its element type Element and
 *    return Element; otherwise return never."
 *
 * Inference extracts information already justified by structural matching; it
 * does not inspect runtime values or invent an annotation. Tuple element
 * capture usually produces the union of positions when using an array pattern.
 * Function patterns can capture parameters or returns, object patterns capture
 * property values, promises capture their fulfillment value, and construct
 * signatures capture instance types. Because the conditional is distributive
 * when T is naked, each union member may infer independently and failed members
 * can fall back to never or another deliberate result.
 */

export type ElementOf<T> = T extends readonly (infer Element)[] ? Element : never;
export type ReturnOf<T> = T extends (...args: any[]) => infer Result ? Result : never;
export type IdOf<T> = T extends { id: infer Id } ? Id : never;
export type PromiseValue<T> = T extends PromiseLike<infer Value> ? Value : never;
export type InstanceOf<T> = T extends abstract new (...args: any[]) => infer Instance ? Instance : never;

export function first<T extends readonly unknown[]>(values: T): ElementOf<T> | undefined {
  return values[0] as ElementOf<T> | undefined;
}

export function call<Fn extends (...args: any[]) => any>(fn: Fn, ...args: Parameters<Fn>): ReturnOf<Fn> {
  return fn(...args) as ReturnOf<Fn>;
}

export function getId<T extends { id: unknown }>(value: T): IdOf<T> {
  return value.id as IdOf<T>;
}

export async function promiseValue<T extends PromiseLike<unknown>>(value: T): Promise<PromiseValue<T>> {
  return await value as PromiseValue<T>;
}

// Part 1: Array patterns capture element unions.
type _Main01 = Expect<Equal<ElementOf<string[]>, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<ElementOf<readonly number[]>, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<ElementOf<readonly ["a", 1, true]>, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<ElementOf<string>, TODO>>; // TODO(koan) @koan-error

// Part 2: Function patterns capture the return position.
type _Main05 = Expect<Equal<ReturnOf<() => string>, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<ReturnOf<(id: number) => { id: number }>, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<ReturnOf<() => Promise<boolean>>, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<ReturnOf<string>, TODO>>; // TODO(koan) @koan-error

// Part 3: Object patterns capture a required property's value.
type _Main09 = Expect<Equal<IdOf<{ id: number; name: string }>, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<IdOf<{ readonly id: "fixed" }>, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<IdOf<{ id?: string }>, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<IdOf<{ name: string }>, TODO>>; // TODO(koan) @koan-error

// Part 4: Promise-like patterns capture one fulfillment layer.
type _Main13 = Expect<Equal<PromiseValue<Promise<string>>, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<PromiseValue<Promise<Promise<number>>>, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<PromiseValue<{ then(onfulfilled: (value: boolean) => unknown): unknown }>, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<PromiseValue<number>, TODO>>; // TODO(koan) @koan-error

// Part 5: Construct signatures capture produced instances.
class MainUser { constructor(readonly name: string) {} }
abstract class MainEntity { abstract id: PropertyKey; }
type _Main17 = Expect<Equal<InstanceOf<typeof MainUser>, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<InstanceOf<typeof MainEntity>, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<InstanceOf<new () => Date>, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<InstanceOf<() => Date>, TODO>>; // TODO(koan) @koan-error
