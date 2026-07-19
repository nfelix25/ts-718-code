import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 145 - VARIANCE ANNOTATIONS
 * =================================
 *
 * TypeScript usually infers variance from a generic type's structure. `out`,
 * `in`, and `in out` make that contract explicit for supported type aliases.
 * They document intent, let the compiler validate the implementation, and can
 * accelerate comparisons between instantiations of the same generic type.
 *
 * Read `Source<out T>` as: "T may flow out, so narrower sources widen." Read
 * `Sink<in T>` as: "T may flow in, so broader sinks narrow." Read
 * `Channel<in out T>` as: "T crosses both directions, so require exactness."
 * Annotations describe actual use; they are not arbitrary assignment switches.
 */

export interface Animal { readonly kind: "animal" | "dog" | "cat"; readonly name: string }
export interface Dog extends Animal { readonly kind: "dog"; bark(): string }
export interface Cat extends Animal { readonly kind: "cat"; meow(): string }

export type Source<out Value> = { get: () => Value };
export type Sink<in Value> = { put: (value: Value) => void };
export type Channel<in out Value> = { get: () => Value; put: (value: Value) => void };

export type InferredSource<Value> = { get: () => Value };
export type InferredSink<Value> = { put: (value: Value) => void };
export type InferredChannel<Value> = { get: () => Value; put: (value: Value) => void };

type Extends<From, To> = [From] extends [To] ? true : false;

// Part 1: `out` states the familiar producer direction.
type _01 = Expect<Equal<Extends<Source<Dog>, Source<Animal>>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Extends<Source<Animal>, Source<Dog>>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Extends<InferredSource<Dog>, InferredSource<Animal>>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<ReturnType<Source<Dog>["get"]>, TODO>>; // TODO(koan) @koan-error

// Part 2: `in` states the reversed consumer direction.
type _05 = Expect<Equal<Extends<Sink<Animal>, Sink<Dog>>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Extends<Sink<Dog>, Sink<Animal>>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Extends<InferredSink<Animal>, InferredSink<Dog>>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Parameters<Sink<Dog>["put"]>[0], TODO>>; // TODO(koan) @koan-error

// Part 3: `in out` records invariance explicitly.
type _09 = Expect<Equal<Extends<Channel<Dog>, Channel<Animal>>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Extends<Channel<Animal>, Channel<Dog>>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Extends<InferredChannel<Dog>, InferredChannel<Animal>>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Equal<Channel<Dog>, Channel<Dog>>, TODO>>; // TODO(koan) @koan-error

// Part 4: Nested annotated constructors compose by their signs.
type _13 = Expect<Equal<Extends<Source<Sink<Animal>>, Source<Sink<Dog>>>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Extends<Sink<Source<Animal>>, Sink<Source<Dog>>>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Extends<Sink<Sink<Dog>>, Sink<Sink<Animal>>>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Extends<Source<Channel<Dog>>, Source<Channel<Animal>>>, TODO>>; // TODO(koan) @koan-error

// Part 5: Top, bottom, and unions follow the declared direction.
type _17 = Expect<Equal<Extends<Source<never>, Source<Dog>>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Extends<Sink<unknown>, Sink<Dog>>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Extends<Source<Dog>, Source<Dog | Cat>>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Extends<Channel<Dog>, Channel<Dog | Cat>>, TODO>>; // TODO(koan) @koan-error

export function makeSource<Value>(value: Value): Source<Value> {
  return { get: () => value };
}

export function makeSink<Value>(consume: (value: Value) => void): Sink<Value> {
  return { put: consume };
}

export function transfer<Value>(source: Source<Value>, sink: Sink<Value>): void {
  sink.put(source.get());
}

export function makeChannel<Value>(initial: Value): Channel<Value> {
  let current = initial;
  return { get: () => current, put: (value) => { current = value; } };
}
