import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 126 - CONSTRUCTOR UTILITY TYPES
 * ========================================
 *
 * Constructor reflection mirrors function reflection but matches an
 * `abstract new` signature. ConstructorParameters captures the input tuple;
 * InstanceType captures the object produced by `new`.
 *
 * Read `C extends abstract new (...args: infer P) => infer I` aloud as: "if C is
 * a construct signature, capture its initialization tuple P and constructed
 * instance I." `abstract new` accepts both abstract and concrete class types for
 * static reflection. Runtime construction must still require a concrete `new`.
 */

type AnyConstructor = abstract new (...args: any[]) => any;

export type KoanConstructorParameters<C extends AnyConstructor> =
  C extends abstract new (...args: infer Params) => any ? Params : never;

export type KoanInstanceType<C extends AnyConstructor> =
  C extends abstract new (...args: any[]) => infer Instance ? Instance : any;

class User {
  constructor(public id: string, public active = true) {}
}

abstract class Entity {
  constructor(public readonly id: number) {}
  abstract label(): string;
}

class Box<T> {
  constructor(public value: T) {}
}

// Part 1: Capture concrete class initialization tuples.
type _01 = Expect<Equal<KoanConstructorParameters<typeof User>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<KoanInstanceType<typeof User>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<KoanConstructorParameters<new () => Date>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<KoanInstanceType<new () => Date>, TODO>>; // TODO(koan) @koan-error

// Part 2: Optional and rest initialization shape is a tuple.
type _05 = Expect<Equal<KoanConstructorParameters<new (name: string, age?: number) => object>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<KoanConstructorParameters<new (...values: number[]) => object>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<KoanConstructorParameters<new (...args: [id: string, enabled?: boolean]) => object>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<KoanInstanceType<new (...args: [id: string]) => { id: string }>, TODO>>; // TODO(koan) @koan-error

// Part 3: abstract new permits static reflection without permitting construction.
type _09 = Expect<Equal<KoanConstructorParameters<typeof Entity>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<KoanInstanceType<typeof Entity>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<KoanConstructorParameters<abstract new (id: string) => { id: string }>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<KoanInstanceType<abstract new (id: string) => { id: string }>, TODO>>; // TODO(koan) @koan-error

// Part 4: Generic and overloaded constructors reveal final-signature inference.
interface OverloadedFactory {
  new (value: string): { kind: "text"; value: string };
  new (value: number): { kind: "count"; value: number };
  new (value: string | number): { kind: "text" | "count"; value: string | number };
}
type _13 = Expect<Equal<KoanConstructorParameters<typeof Box>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<KoanInstanceType<typeof Box>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<KoanConstructorParameters<OverloadedFactory>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<KoanInstanceType<OverloadedFactory>, TODO>>; // TODO(koan) @koan-error

// Part 5: Call and construct signatures remain separate.
type Both = (new (id: number) => { id: number }) & ((text: string) => boolean);
type IsAny<T> = 0 extends 1 & T ? true : false;
type _17 = Expect<Equal<KoanConstructorParameters<Both>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<KoanInstanceType<Both>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<KoanConstructorParameters<any>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<IsAny<KoanInstanceType<any>>, TODO>>; // TODO(koan) @koan-error

export function construct<C extends new (...args: any[]) => any>(
  Constructor: C,
  ...args: KoanConstructorParameters<C>
): KoanInstanceType<C> {
  return new Constructor(...args) as KoanInstanceType<C>;
}

export { Box, User };
