import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type { KoanParameters } from "./k-125-rebuild-parameters.js";

/** GUIDED DRILLS: vary tuple arity, labels, optional/rest shape, generics, and overloads. */

type P<F extends (...args: any[]) => any> = KoanParameters<F>;
type IsAny<T> = 0 extends 1 & T ? true : false;

// Fixed parameter tuples (1-12)
type _01 = Expect<Equal<P<() => void>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<P<(x: string) => void>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<P<(x: number) => string>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<P<(x: string, y: number) => boolean>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<P<(a: 1, b: 2, c: 3) => 4>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<P<(value: unknown) => void>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<P<(value: never) => void>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<P<(value: any) => void>[0] extends infer Value ? IsAny<Value> : false, TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<P<(value: string | number) => void>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<P<(value: { id: string }) => void>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<P<(value: readonly [1, 2]) => void>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<P<(callback: () => void) => void>, TODO>>; // TODO(koan) @koan-error

// Optional and rest parameters (13-24)
type _13 = Expect<Equal<P<(x?: string) => void>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<P<(x: string, y?: number) => void>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<P<(...args: string[]) => void>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<P<(head: string, ...tail: number[]) => void>, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<P<(...args: [name: string, age?: number]) => void>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<P<(args: readonly [name: string, age: number]) => void>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<P<(...args: [head: string, ...tail: number[]]) => void>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<P<(...args: [head?: string]) => void>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<P<(this: { id: string }) => void>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<P<(this: { id: string }, value: number) => void>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<P<(this: void, value: string) => void>, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<P<(...args: never[]) => void>, TODO>>; // TODO(koan) @koan-error

// Generic functions (25-36)
type _25 = Expect<Equal<P<<T>(value: T) => T>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<P<<T extends string>(value: T) => T>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<P<<T extends { id: string }>(value: T) => T>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<P<<T, U>(left: T, right: U) => [T, U]>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<P<<T = string>(value?: T) => T>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<P<<T extends readonly unknown[]>(...args: T) => T>, TODO>>; // TODO(koan) @koan-error
type _31 = Expect<Equal<P<<T extends string[]>(...args: T) => T>, TODO>>; // TODO(koan) @koan-error
type _32 = Expect<Equal<P<<T>(value: T, many: T[]) => T>, TODO>>; // TODO(koan) @koan-error
type _33 = Expect<Equal<P<<K extends PropertyKey, V>(key: K, value: V) => Record<K, V>>, TODO>>; // TODO(koan) @koan-error
type _34 = Expect<Equal<P<<T extends object>(value: T, key: keyof T) => unknown>, TODO>>; // TODO(koan) @koan-error
type _35 = Expect<Equal<P<<T>(callback: (value: T) => void) => void>, TODO>>; // TODO(koan) @koan-error
type _36 = Expect<Equal<P<<T extends string | number>(value: T) => `${T}`>, TODO>>; // TODO(koan) @koan-error

// Overloads, unions, intersections, callable objects (37-48)
interface Overloaded {
  (x: string): 1;
  (x: number): 2;
  (x: string | number): 1 | 2;
}
type _37 = Expect<Equal<P<Overloaded>, TODO>>; // TODO(koan) @koan-error
type _38 = Expect<Equal<P<(() => 1) | ((x: string) => 2)>, TODO>>; // TODO(koan) @koan-error
type _39 = Expect<Equal<P<((x: string) => 1) | ((x: number) => 2)>, TODO>>; // TODO(koan) @koan-error
type _40 = Expect<Equal<P<((x: string) => 1) & ((x: number) => 2)>, TODO>>; // TODO(koan) @koan-error
type _41 = Expect<Equal<P<((x: number) => 2) & ((x: string) => 1)>, TODO>>; // TODO(koan) @koan-error
type _42 = Expect<Equal<P<{ (x: string): 1; meta: boolean }>, TODO>>; // TODO(koan) @koan-error
type _43 = Expect<Equal<P<(() => 1) & { meta: boolean }>, TODO>>; // TODO(koan) @koan-error
type _44 = Expect<Equal<P<(new () => object) & ((x: string) => number)>, TODO>>; // TODO(koan) @koan-error
type _45 = Expect<Equal<P<(...args: [x: string] | [x: number]) => void>, TODO>>; // TODO(koan) @koan-error
type _46 = Expect<Equal<P<(...args: [kind: "a", value: number] | [kind: "b", value: string]) => void>, TODO>>; // TODO(koan) @koan-error
type _47 = Expect<Equal<P<(x: string) => never>, TODO>>; // TODO(koan) @koan-error
type _48 = Expect<Equal<P<(x: string) => Promise<number>>, TODO>>; // TODO(koan) @koan-error

// Special types and tuple composition (49-60)
type _49 = Expect<Equal<P<any>, TODO>>; // TODO(koan) @koan-error
type _50 = Expect<Equal<P<never>, TODO>>; // TODO(koan) @koan-error
type _51 = Expect<Equal<P<(...args: any[]) => void>[number] extends infer Value ? IsAny<Value> : false, TODO>>; // TODO(koan) @koan-error
type _52 = Expect<Equal<P<(...args: unknown[]) => void>, TODO>>; // TODO(koan) @koan-error
type _53 = Expect<Equal<P<(...args: never[]) => void>, TODO>>; // TODO(koan) @koan-error
type _54 = Expect<Equal<P<(a: string, b: number) => void>["length"], TODO>>; // TODO(koan) @koan-error
type _55 = Expect<Equal<P<(a: string, b?: number) => void>["length"], TODO>>; // TODO(koan) @koan-error
type _56 = Expect<Equal<P<(...args: string[]) => void>["length"], TODO>>; // TODO(koan) @koan-error
type _57 = Expect<Equal<P<(a: string, b: number) => void>[number], TODO>>; // TODO(koan) @koan-error
type _58 = Expect<Equal<Readonly<P<(a: string, b: number) => void>>, TODO>>; // TODO(koan) @koan-error
type _59 = Expect<Equal<[boolean, ...P<(a: string, b: number) => void>], TODO>>; // TODO(koan) @koan-error
type _60 = Expect<Equal<[...P<(a: string, b: number) => void>, boolean], TODO>>; // TODO(koan) @koan-error
