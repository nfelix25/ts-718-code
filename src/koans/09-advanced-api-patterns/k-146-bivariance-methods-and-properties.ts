import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 146 - BIVARIANCE: METHODS AND PROPERTIES
 * =================================================
 *
 * Under `strictFunctionTypes`, a function-valued property checks parameters
 * contravariantly. Method declarations are a deliberate exception: their
 * parameters are bivariant, so either subtype direction may satisfy assignment.
 * This preserves compatibility for mutable APIs such as arrays, but admits calls
 * that a narrower implementation cannot actually handle.
 *
 * Read `MethodHandler<Dog> extends MethodHandler<Animal>` aloud as: "the method
 * exception accepts a Dog-only callback where an Animal callback is promised."
 * Replace method syntax with `handle: (value: T) => void` and the unsafe direction
 * closes. The indexed bivariance-hack pattern deliberately extracts that method
 * behavior into a standalone callback type.
 */

export interface Animal { readonly kind: "animal" | "dog" | "cat"; readonly name: string }
export interface Dog extends Animal { readonly kind: "dog"; bark(): string }
export interface Cat extends Animal { readonly kind: "cat"; meow(): string }

export type PropertyHandler<Value> = { handle: (value: Value) => void };
export type MethodHandler<Value> = { handle(value: Value): void };
export type StrictCallback<Value> = (value: Value) => void;
export type BivariantCallback<Value> = {
  bivarianceHack(value: Value): void;
}["bivarianceHack"];

type Extends<From, To> = [From] extends [To] ? true : false;

// Part 1: Property syntax enforces sound contravariance.
type _01 = Expect<Equal<Extends<PropertyHandler<Animal>, PropertyHandler<Dog>>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Extends<PropertyHandler<Dog>, PropertyHandler<Animal>>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Extends<StrictCallback<Animal>, StrictCallback<Dog>>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Extends<StrictCallback<Dog>, StrictCallback<Animal>>, TODO>>; // TODO(koan) @koan-error

// Part 2: Method syntax accepts both parameter directions.
type _05 = Expect<Equal<Extends<MethodHandler<Animal>, MethodHandler<Dog>>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Extends<MethodHandler<Dog>, MethodHandler<Animal>>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Parameters<MethodHandler<Dog>["handle"]>[0], TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Equal<MethodHandler<Dog>["handle"], BivariantCallback<Dog>>, TODO>>; // TODO(koan) @koan-error

// Part 3: The indexed method trick packages bivariance as a callback alias.
type _09 = Expect<Equal<Extends<BivariantCallback<Animal>, BivariantCallback<Dog>>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Extends<BivariantCallback<Dog>, BivariantCallback<Animal>>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Extends<StrictCallback<Dog>, BivariantCallback<Animal>>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Extends<BivariantCallback<Dog>, StrictCallback<Animal>>, TODO>>; // TODO(koan) @koan-error

// Part 4: Return types remain covariant even when parameters are bivariant.
type ReturningMethod<Input, Output> = { run(value: Input): Output };
type _13 = Expect<Equal<Extends<ReturningMethod<Dog, Dog>, ReturningMethod<Animal, Animal>>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Extends<ReturningMethod<Animal, Animal>, ReturningMethod<Dog, Dog>>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<ReturnType<ReturningMethod<Dog, Dog>["run"]>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Parameters<ReturningMethod<Dog, Animal>["run"]>, TODO>>; // TODO(koan) @koan-error

// Part 5: Unions and special types show how broad the exception reaches.
type _17 = Expect<Equal<Extends<MethodHandler<Dog>, MethodHandler<Dog | Cat>>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Extends<PropertyHandler<Dog>, PropertyHandler<Dog | Cat>>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Extends<BivariantCallback<never>, BivariantCallback<Dog>>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Extends<BivariantCallback<unknown>, BivariantCallback<Dog>>, TODO>>; // TODO(koan) @koan-error

export function makeDog(name: string): Dog {
  return { kind: "dog", name, bark: () => `${name}: woof` };
}

export function makeCat(name: string): Cat {
  return { kind: "cat", name, meow: () => `${name}: meow` };
}

export function invokeMethod(handler: MethodHandler<Animal>, animal: Animal): void {
  handler.handle(animal);
}

export function invokeStrict(handler: PropertyHandler<Animal>, animal: Animal): void {
  handler.handle(animal);
}

export function onAnimal(callback: BivariantCallback<Animal>, animal: Animal): void {
  callback(animal);
}
