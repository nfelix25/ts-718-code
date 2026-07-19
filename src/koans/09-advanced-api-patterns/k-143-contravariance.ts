import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 143 - CONTRAVARIANCE
 * ==========================
 *
 * A generic type is contravariant when its type argument moves opposite ordinary
 * subtyping. A function able to consume every Animal can safely stand in for a
 * function that will only be given Dogs. The reverse would be unsafe: a Dog-only
 * function may call `bark` when handed a Cat.
 *
 * Read `Consumer<Animal> extends Consumer<Dog>` aloud as: "an Animal consumer
 * accepts at least every input a Dog consumer is promised." Under
 * `strictFunctionTypes`, function-property parameters receive this directional
 * check. Each nested input position flips direction; two flips restore it.
 */

export interface Animal {
  readonly kind: "animal" | "dog" | "cat";
  readonly name: string;
}

export interface Dog extends Animal {
  readonly kind: "dog";
  bark(): string;
}

export interface Cat extends Animal {
  readonly kind: "cat";
  meow(): string;
}

export type Consumer<Value> = (value: Value) => void;
export type Predicate<Value> = (value: Value) => boolean;
export type Comparator<Value> = (left: Value, right: Value) => number;
export type Handler<Value> = { handle: (value: Value) => void };
export type Producer<Value> = () => Value;

type Extends<From, To> = [From] extends [To] ? true : false;

// Part 1: Start from the ordinary subtype direction.
type _01 = Expect<Equal<Extends<Dog, Animal>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Extends<Animal, Dog>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Extends<Cat, Animal>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Extends<Dog, Cat>, TODO>>; // TODO(koan) @koan-error

// Part 2: Function parameters reverse the arrow.
type _05 = Expect<Equal<Extends<Consumer<Animal>, Consumer<Dog>>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Extends<Consumer<Dog>, Consumer<Animal>>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Parameters<Consumer<Dog>>[0], TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Extends<Consumer<unknown>, Consumer<Animal>>, TODO>>; // TODO(koan) @koan-error

// Part 3: Predicates, comparators, and callback properties consume too.
type _09 = Expect<Equal<Extends<Predicate<Animal>, Predicate<Dog>>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Extends<Comparator<Animal>, Comparator<Dog>>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Extends<Handler<Animal>, Handler<Dog>>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Extends<Handler<Dog>, Handler<Animal>>, TODO>>; // TODO(koan) @koan-error

// Part 4: Count positive and negative positions through nesting.
type _13 = Expect<Equal<Extends<Consumer<Producer<Animal>>, Consumer<Producer<Dog>>>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Extends<Consumer<Producer<Dog>>, Consumer<Producer<Animal>>>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Extends<Consumer<Consumer<Dog>>, Consumer<Consumer<Animal>>>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Extends<Consumer<Consumer<Animal>>, Consumer<Consumer<Dog>>>, TODO>>; // TODO(koan) @koan-error

// Part 5: Unions, top, and bottom make the reversed endpoints visible.
type _17 = Expect<Equal<Extends<Consumer<Animal>, Consumer<Dog | Cat>>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Extends<Consumer<Dog | Cat>, Consumer<Dog>>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Extends<Consumer<unknown>, Consumer<Dog>>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Extends<Consumer<never>, Consumer<Dog>>, TODO>>; // TODO(koan) @koan-error

export function makeDog(name: string): Dog {
  return { kind: "dog", name, bark: () => `${name}: woof` };
}

export function dispatchDog(handler: Consumer<Dog>, dog: Dog): void {
  handler(dog);
}

export function contramap<Input, Wider>(
  consumer: Consumer<Input>,
  project: (value: Wider) => Input,
): Consumer<Wider> {
  return (value) => consumer(project(value));
}

export function filterWith<Value>(values: readonly Value[], predicate: Predicate<Value>): Value[] {
  return values.filter(predicate);
}
