import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 144 - INVARIANCE
 * ======================
 *
 * A type parameter is invariant when neither narrowing nor widening is safe. A
 * mutable cell produces T from `get` and consumes T through `set`. Treating a
 * Dog cell as an Animal cell would permit writing a Cat; treating an Animal cell
 * as a Dog cell would permit reading a Cat and calling `bark`.
 *
 * Read `Cell<T>` aloud as: "T occurs once positively and once negatively, so
 * assignments must preserve T exactly." Function properties make both directions
 * visible under `strictFunctionTypes`. Codecs and `(T) => T` transformations have
 * the same shape even when their runtime purpose looks very different.
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

export type Cell<Value> = {
  get: () => Value;
  set: (value: Value) => void;
};

export type Codec<Value> = {
  decode: (source: string) => Value;
  encode: (value: Value) => string;
};

export type Endomorphism<Value> = (value: Value) => Value;
export type InvariantWitness<Value> = (value: Value) => Value;

type Extends<From, To> = [From] extends [To] ? true : false;

// Part 1: Establish the ordinary subtype direction.
type _01 = Expect<Equal<Extends<Dog, Animal>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Extends<Animal, Dog>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Extends<Cat, Animal>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Extends<Dog, Cat>, TODO>>; // TODO(koan) @koan-error

// Part 2: A strict mutable cell rejects both generic directions.
type _05 = Expect<Equal<Extends<Cell<Dog>, Cell<Animal>>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Extends<Cell<Animal>, Cell<Dog>>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<ReturnType<Cell<Dog>["get"]>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Parameters<Cell<Dog>["set"]>[0], TODO>>; // TODO(koan) @koan-error

// Part 3: Encoding consumes while decoding produces, so Codec is invariant too.
type _09 = Expect<Equal<Extends<Codec<Dog>, Codec<Animal>>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Extends<Codec<Animal>, Codec<Dog>>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<ReturnType<Codec<Dog>["decode"]>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Parameters<Codec<Dog>["encode"]>[0], TODO>>; // TODO(koan) @koan-error

// Part 4: One function can contain both variance positions.
type _13 = Expect<Equal<Extends<Endomorphism<Dog>, Endomorphism<Animal>>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Extends<Endomorphism<Animal>, Endomorphism<Dog>>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Parameters<Endomorphism<Dog>>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<ReturnType<Endomorphism<Dog>>, TODO>>; // TODO(koan) @koan-error

// Part 5: Exactness persists across unions and special types, except for any.
type _17 = Expect<Equal<Extends<Cell<Dog>, Cell<Dog | Cat>>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Extends<Cell<Dog | Cat>, Cell<Animal>>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Extends<Cell<never>, Cell<Dog>>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Extends<Cell<unknown>, Cell<Dog>>, TODO>>; // TODO(koan) @koan-error

export function makeDog(name: string): Dog {
  return { kind: "dog", name, bark: () => `${name}: woof` };
}

export function makeCell<Value>(initial: Value): Cell<Value> {
  let current = initial;
  return {
    get: () => current,
    set: (value) => { current = value; },
  };
}

export function modify<Value>(cell: Cell<Value>, transform: Endomorphism<Value>): Value {
  const next = transform(cell.get());
  cell.set(next);
  return next;
}

export function roundTrip<Value>(codec: Codec<Value>, value: Value): Value {
  return codec.decode(codec.encode(value));
}
