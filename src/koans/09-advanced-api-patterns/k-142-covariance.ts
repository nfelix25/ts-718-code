import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 142 - COVARIANCE
 * ======================
 *
 * A generic type is covariant when its type argument moves in the same direction
 * as ordinary subtyping. Since every Dog is an Animal, every safe producer of Dog
 * can be used as a producer of Animal. Reading a narrower value where a broader
 * value is expected is safe; the consumer simply uses fewer guarantees.
 *
 * Read `Producer<Dog> extends Producer<Animal>` aloud as: "anything promising a
 * Dog also fulfills a promise to return an Animal." Return positions, readonly
 * fields, immutable collections, and fulfilled Promise values are the canonical
 * covariant positions. Mutation changes the safety argument and needs scrutiny.
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

export type Producer<Value> = () => Value;
export type ReadonlyBox<Value> = { readonly value: Value };
export type Source<Value> = { get(): Value; readonly current: Value };

type Extends<From, To> = [From] extends [To] ? true : false;

// Part 1: The concrete hierarchy supplies the subtype direction.
type _01 = Expect<Equal<Extends<Dog, Animal>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Extends<Animal, Dog>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Extends<Cat, Animal>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Extends<Dog, Cat>, TODO>>; // TODO(koan) @koan-error

// Part 2: Function return positions preserve that direction.
type _05 = Expect<Equal<Extends<Producer<Dog>, Producer<Animal>>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Extends<Producer<Animal>, Producer<Dog>>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<ReturnType<Producer<Dog>>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Extends<Producer<never>, Producer<Dog>>, TODO>>; // TODO(koan) @koan-error

// Part 3: Readonly fields and source methods are also output positions.
type _09 = Expect<Equal<Extends<ReadonlyBox<Dog>, ReadonlyBox<Animal>>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Extends<ReadonlyBox<Animal>, ReadonlyBox<Dog>>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Extends<Source<Dog>, Source<Animal>>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Source<Dog>["current"], TODO>>; // TODO(koan) @koan-error

// Part 4: Immutable containers compose covariance through their element outputs.
type _13 = Expect<Equal<Extends<readonly Dog[], readonly Animal[]>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Extends<readonly Animal[], readonly Dog[]>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Extends<Promise<Dog>, Promise<Animal>>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Extends<ReadonlyBox<Producer<Dog>>, ReadonlyBox<Producer<Animal>>>, TODO>>; // TODO(koan) @koan-error

// Part 5: Unions, top, and bottom types reveal the endpoints of the direction.
type _17 = Expect<Equal<Extends<Producer<Dog | Cat>, Producer<Animal>>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Extends<Producer<Dog>, Producer<Dog | Cat>>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Extends<ReadonlyBox<never>, ReadonlyBox<Dog>>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Extends<ReadonlyBox<unknown>, ReadonlyBox<Animal>>, TODO>>; // TODO(koan) @koan-error

export function makeDog(name: string): Dog {
  return { kind: "dog", name, bark: () => `${name}: woof` };
}

export function makeCat(name: string): Cat {
  return { kind: "cat", name, meow: () => `${name}: meow` };
}

export function widenProducer<Narrow extends Broad, Broad>(producer: Producer<Narrow>): Producer<Broad> {
  return producer;
}

export function mapProducer<Input, Output>(producer: Producer<Input>, map: (value: Input) => Output): Producer<Output> {
  return () => map(producer());
}

export function animalNames(values: readonly Animal[]): string[] {
  return values.map((value) => value.name);
}
