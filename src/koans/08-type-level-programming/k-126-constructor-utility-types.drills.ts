import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type {
  KoanConstructorParameters,
  KoanInstanceType,
} from "./k-126-constructor-utility-types.js";

/** GUIDED DRILLS: vary constructor arity, abstractness, generics, overloads, and dual signatures. */

type Ctor = abstract new (...args: any[]) => any;
type CP<C extends Ctor> = KoanConstructorParameters<C>;
type IT<C extends Ctor> = KoanInstanceType<C>;
type IsAny<T> = 0 extends 1 & T ? true : false;

// Fixed constructors (1-12)
type _01 = Expect<Equal<CP<new () => {}>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<IT<new () => {}>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<CP<new (id: string) => { id: string }>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<IT<new (id: string) => { id: string }>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<CP<new (name: string, age: number) => object>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<IT<new (name: string, age: number) => { name: string; age: number }>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<CP<new (value: unknown) => unknown>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<IT<new (value: unknown) => unknown>, TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<CP<new (value: never) => never>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<IsAny<IT<new (value: never) => never>>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<CP<new (value: any) => any>[0] extends infer V ? IsAny<V> : false, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<IsAny<IT<new (value: any) => any>>, TODO>>; // TODO(koan) @koan-error

// Optional, rest, and tuple parameters (13-24)
type _13 = Expect<Equal<CP<new (id?: string) => object>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<CP<new (id: string, active?: boolean) => object>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<CP<new (...values: number[]) => object>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<CP<new (head: string, ...tail: number[]) => object>, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<CP<new (...args: [id: string, active?: boolean]) => object>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<CP<new (...args: [head: string, ...tail: number[]]) => object>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<CP<new (...args: unknown[]) => object>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<CP<new (...args: never[]) => object>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<CP<new (a: string, b: number) => object>["length"], TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<CP<new (a: string, b?: number) => object>["length"], TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<CP<new (a: string, b: number) => object>[number], TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<Readonly<CP<new (a: string, b: number) => object>>, TODO>>; // TODO(koan) @koan-error

// Classes and abstract constructors (25-36)
class Empty {}
class Point { constructor(public x: number, public y: number) {} }
abstract class Shape { constructor(public color: string) {} abstract area(): number }
class Generic<T> { constructor(public value: T) {} }
type _25 = Expect<Equal<CP<typeof Empty>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<IT<typeof Empty>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<CP<typeof Point>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<IT<typeof Point>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<CP<typeof Shape>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<IT<typeof Shape>, TODO>>; // TODO(koan) @koan-error
type _31 = Expect<Equal<CP<typeof Generic>, TODO>>; // TODO(koan) @koan-error
type _32 = Expect<Equal<IT<typeof Generic>, TODO>>; // TODO(koan) @koan-error
type _33 = Expect<Equal<CP<abstract new (id: string) => { id: string }>, TODO>>; // TODO(koan) @koan-error
type _34 = Expect<Equal<IT<abstract new (id: string) => { id: string }>, TODO>>; // TODO(koan) @koan-error
type _35 = Expect<Equal<CP<typeof Date>, TODO>>; // TODO(koan) @koan-error
type _36 = Expect<Equal<IT<typeof Date>, TODO>>; // TODO(koan) @koan-error

// Overloads, unions, and intersections (37-48)
interface Overloaded {
  new (x: string): { text: string };
  new (x: number): { count: number };
  new (x: string | number): { text?: string; count?: number };
}
type _37 = Expect<Equal<CP<Overloaded>, TODO>>; // TODO(koan) @koan-error
type _38 = Expect<Equal<IT<Overloaded>, TODO>>; // TODO(koan) @koan-error
type _39 = Expect<Equal<CP<(new (x: string) => { a: 1 }) | (new (x: number) => { b: 2 })>, TODO>>; // TODO(koan) @koan-error
type _40 = Expect<Equal<IT<(new (x: string) => { a: 1 }) | (new (x: number) => { b: 2 })>, TODO>>; // TODO(koan) @koan-error
type _41 = Expect<Equal<CP<(new (x: string) => { a: 1 }) & (new (x: number) => { b: 2 })>, TODO>>; // TODO(koan) @koan-error
type _42 = Expect<Equal<IT<(new (x: string) => { a: 1 }) & (new (x: number) => { b: 2 })>, TODO>>; // TODO(koan) @koan-error
type _43 = Expect<Equal<CP<(new (x: string) => { a: 1 }) & ((x: number) => boolean)>, TODO>>; // TODO(koan) @koan-error
type _44 = Expect<Equal<IT<(new (x: string) => { a: 1 }) & ((x: number) => boolean)>, TODO>>; // TODO(koan) @koan-error
type _45 = Expect<Equal<Parameters<(new (x: string) => { a: 1 }) & ((x: number) => boolean)>, TODO>>; // TODO(koan) @koan-error
type _46 = Expect<Equal<ReturnType<(new (x: string) => { a: 1 }) & ((x: number) => boolean)>, TODO>>; // TODO(koan) @koan-error
type _47 = Expect<Equal<CP<new (...args: [x: string] | [x: number]) => object>, TODO>>; // TODO(koan) @koan-error
type _48 = Expect<Equal<IT<new (...args: [x: string] | [x: number]) => { value: string | number }>, TODO>>; // TODO(koan) @koan-error

// Special types and composition (49-60)
type _49 = Expect<Equal<CP<any>, TODO>>; // TODO(koan) @koan-error
type _50 = Expect<Equal<IsAny<IT<any>>, TODO>>; // TODO(koan) @koan-error
type _51 = Expect<Equal<CP<never>, TODO>>; // TODO(koan) @koan-error
type _52 = Expect<Equal<IT<never>, TODO>>; // TODO(koan) @koan-error
type _53 = Expect<Equal<[boolean, ...CP<new (x: string) => object>], TODO>>; // TODO(koan) @koan-error
type _54 = Expect<Equal<[...CP<new (x: string) => object>, boolean], TODO>>; // TODO(koan) @koan-error
type _55 = Expect<Equal<Partial<IT<new () => { a: 1; b: 2 }>>, TODO>>; // TODO(koan) @koan-error
type _56 = Expect<Equal<Readonly<IT<new () => { value: number }>>, TODO>>; // TODO(koan) @koan-error
type _57 = Expect<Equal<InstanceType<new () => { id: 1 }>, TODO>>; // TODO(koan) @koan-error
type _58 = Expect<Equal<ConstructorParameters<new (id: string) => object>, TODO>>; // TODO(koan) @koan-error
type _59 = Expect<Equal<IT<new () => (() => 1)>, TODO>>; // TODO(koan) @koan-error
type _60 = Expect<Equal<ReturnType<IT<new () => (() => 1)>>, TODO>>; // TODO(koan) @koan-error
