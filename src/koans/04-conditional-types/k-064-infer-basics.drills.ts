import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-064 guided drills: infer basics
 * =============================================================================
 * Locate the infer position in the pattern, verify the outer shape matches, and
 * substitute the captured type only inside the true branch.
 */

type DElement<T> = T extends readonly (infer E)[] ? E : never;
type DReturn<T> = T extends (...args: any[]) => infer R ? R : never;
type DProperty<T, K extends PropertyKey> = T extends Record<K, infer V> ? V : never;
type DPromise<T> = T extends PromiseLike<infer V> ? V : never;
type DInstance<T> = T extends abstract new (...args: any[]) => infer I ? I : never;

// Mutable, readonly, tuple, empty, union, and failed array captures.
type _D01 = Expect<Equal<DElement<string[]>, TODO>>; // TODO(koan) @koan-error
type _D02 = Expect<Equal<DElement<readonly string[]>, TODO>>; // TODO(koan) @koan-error
type _D03 = Expect<Equal<DElement<[string, number]>, TODO>>; // TODO(koan) @koan-error
type _D04 = Expect<Equal<DElement<readonly ["a", 1, true]>, TODO>>; // TODO(koan) @koan-error
type _D05 = Expect<Equal<DElement<[]>, TODO>>; // TODO(koan) @koan-error
type _D06 = Expect<Equal<DElement<readonly []>, TODO>>; // TODO(koan) @koan-error
type _D07 = Expect<Equal<DElement<Array<Promise<string>>>, TODO>>; // TODO(koan) @koan-error
type _D08 = Expect<Equal<DElement<string[] | number[]>, TODO>>; // TODO(koan) @koan-error
type _D09 = Expect<Equal<DElement<string | number[]>, TODO>>; // TODO(koan) @koan-error
type _D10 = Expect<Equal<DElement<never>, TODO>>; // TODO(koan) @koan-error
type _D11 = Expect<Equal<DElement<unknown>, TODO>>; // TODO(koan) @koan-error
type _D12 = Expect<Equal<DElement<{ 0: string; length: 1 }>, TODO>>; // TODO(koan) @koan-error
type _D13 = Expect<Equal<DElement<readonly [string?, ...number[]]>, TODO>>; // TODO(koan) @koan-error
type _D14 = Expect<Equal<DElement<Set<string>>, TODO>>; // TODO(koan) @koan-error
type _D15 = Expect<Equal<DElement<Uint8Array>, TODO>>; // TODO(koan) @koan-error

// Function return capture across parameters, async, unions, and non-functions.
type _D16 = Expect<Equal<DReturn<() => string>, TODO>>; // TODO(koan) @koan-error
type _D17 = Expect<Equal<DReturn<(x: number) => boolean>, TODO>>; // TODO(koan) @koan-error
type _D18 = Expect<Equal<DReturn<(...args: string[]) => number>, TODO>>; // TODO(koan) @koan-error
type _D19 = Expect<Equal<DReturn<() => void>, TODO>>; // TODO(koan) @koan-error
type _D20 = Expect<Equal<DReturn<() => never>, TODO>>; // TODO(koan) @koan-error
type _D21 = Expect<Equal<DReturn<() => Promise<string>>, TODO>>; // TODO(koan) @koan-error
type _D22 = Expect<Equal<DReturn<(() => string) | (() => number)>, TODO>>; // TODO(koan) @koan-error
type _D23 = Expect<Equal<DReturn<(() => string) | number>, TODO>>; // TODO(koan) @koan-error
type _D24 = Expect<Equal<DReturn<string>, TODO>>; // TODO(koan) @koan-error
type _D25 = Expect<Equal<DReturn<unknown>, TODO>>; // TODO(koan) @koan-error
type _D26 = Expect<Equal<DReturn<never>, TODO>>; // TODO(koan) @koan-error
type _D27 = Expect<Equal<DReturn<() => { id: 1 }>, TODO>>; // TODO(koan) @koan-error
type _D28 = Expect<Equal<DReturn<{ (): string; label: string }>, TODO>>; // TODO(koan) @koan-error
type _D29 = Expect<Equal<DReturn<new () => Date>, TODO>>; // TODO(koan) @koan-error
type _D30 = Expect<Equal<DReturn<Function>, TODO>>; // TODO(koan) @koan-error

// Required object property capture with string, numeric, and symbol keys.
declare const dToken: unique symbol;
type _D31 = Expect<Equal<DProperty<{ id: number }, "id">, TODO>>; // TODO(koan) @koan-error
type _D32 = Expect<Equal<DProperty<{ readonly id: "x" }, "id">, TODO>>; // TODO(koan) @koan-error
type _D33 = Expect<Equal<DProperty<{ id?: number }, "id">, TODO>>; // TODO(koan) @koan-error
type _D34 = Expect<Equal<DProperty<{ name: string }, "id">, TODO>>; // TODO(koan) @koan-error
type _D35 = Expect<Equal<DProperty<{ id: 1 } | { id: 2 }, "id">, TODO>>; // TODO(koan) @koan-error
type _D36 = Expect<Equal<DProperty<{ id: 1 } | { name: string }, "id">, TODO>>; // TODO(koan) @koan-error
type _D37 = Expect<Equal<DProperty<{ 0: string }, 0>, TODO>>; // TODO(koan) @koan-error
type _D38 = Expect<Equal<DProperty<{ [dToken]: Date }, typeof dToken>, TODO>>; // TODO(koan) @koan-error
type _D39 = Expect<Equal<DProperty<Record<string, unknown>, "anything">, TODO>>; // TODO(koan) @koan-error
type _D40 = Expect<Equal<DProperty<unknown, "id">, TODO>>; // TODO(koan) @koan-error

// Promise-like capture extracts one syntactic layer.
type _D41 = Expect<Equal<DPromise<Promise<string>>, TODO>>; // TODO(koan) @koan-error
type _D42 = Expect<Equal<DPromise<Promise<Promise<number>>>, TODO>>; // TODO(koan) @koan-error
type _D43 = Expect<Equal<DPromise<Promise<void>>, TODO>>; // TODO(koan) @koan-error
type _D44 = Expect<Equal<DPromise<Promise<never>>, TODO>>; // TODO(koan) @koan-error
type _D45 = Expect<Equal<DPromise<Promise<string> | Promise<number>>, TODO>>; // TODO(koan) @koan-error
type _D46 = Expect<Equal<DPromise<Promise<string> | number>, TODO>>; // TODO(koan) @koan-error
type _D47 = Expect<Equal<DPromise<number>, TODO>>; // TODO(koan) @koan-error
type _D48 = Expect<Equal<DPromise<unknown>, TODO>>; // TODO(koan) @koan-error
type _D49 = Expect<Equal<DPromise<{ then(onfulfilled: (value: 1) => unknown): unknown }>, TODO>>; // TODO(koan) @koan-error
type _D50 = Expect<Equal<Awaited<Promise<Promise<string>>>, TODO>>; // TODO(koan) @koan-error

// Construct signatures capture instance types from concrete and abstract classes.
class DUser { id = 1; }
abstract class DEntity { abstract id: PropertyKey; }
type _D51 = Expect<Equal<DInstance<typeof DUser>, TODO>>; // TODO(koan) @koan-error
type _D52 = Expect<Equal<DInstance<typeof DEntity>, TODO>>; // TODO(koan) @koan-error
type _D53 = Expect<Equal<DInstance<new () => Date>, TODO>>; // TODO(koan) @koan-error
type _D54 = Expect<Equal<DInstance<abstract new () => object>, TODO>>; // TODO(koan) @koan-error
type _D55 = Expect<Equal<DInstance<new (id: number) => { id: number }>, TODO>>; // TODO(koan) @koan-error
type _D56 = Expect<Equal<DInstance<(new () => Date) | (new () => RegExp)>, TODO>>; // TODO(koan) @koan-error
type _D57 = Expect<Equal<DInstance<() => Date>, TODO>>; // TODO(koan) @koan-error
type _D58 = Expect<Equal<DInstance<Date>, TODO>>; // TODO(koan) @koan-error
type _D59 = Expect<Equal<DInstance<unknown>, TODO>>; // TODO(koan) @koan-error
type _D60 = Expect<Equal<DInstance<never>, TODO>>; // TODO(koan) @koan-error
