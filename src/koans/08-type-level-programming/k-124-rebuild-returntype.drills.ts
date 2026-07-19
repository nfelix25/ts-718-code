import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type { KoanReturnType } from "./k-124-rebuild-returntype.js";

/** GUIDED DRILLS: vary parameters independently from captured output positions. */

type R<F extends (...args: any[]) => any> = KoanReturnType<F>;
type IsAny<T> = 0 extends 1 & T ? true : false;

// Ordinary functions (1-12)
type _01 = Expect<Equal<R<() => string>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<R<() => number>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<R<() => boolean>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<R<() => null>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<R<() => undefined>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<R<() => void>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<R<() => never>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<R<() => unknown>, TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<R<() => any> extends infer Value ? IsAny<Value> : false, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<R<(x: string) => number>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<R<(x: string, y: number) => boolean>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<R<(...args: unknown[]) => symbol>, TODO>>; // TODO(koan) @koan-error

// Structured and union returns (13-24)
type _13 = Expect<Equal<R<() => { id: string }>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<R<() => readonly [1, 2]>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<R<() => string[]>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<R<() => Promise<number>>, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<Awaited<R<() => Promise<number>>>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<R<() => string | number>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<R<() => { kind: "a" } | { kind: "b" }>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<R<() => (() => number)>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<R<R<() => () => number>>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<keyof R<() => { a: 1; b: 2 }>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<R<() => { readonly id?: string }>, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<R<() => Promise<Promise<number>>>, TODO>>; // TODO(koan) @koan-error

// Generic functions (25-36)
type _25 = Expect<Equal<R<<T>(value: T) => T>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<R<<T>(value: T) => T[]>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<R<<T>(value: T) => Promise<T>>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<R<<T extends string>(value: T) => T>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<R<<T extends number>(value: T) => T[]>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<R<<T extends { id: string }>(value: T) => T>, TODO>>; // TODO(koan) @koan-error
type _31 = Expect<Equal<R<<T = string>() => T>, TODO>>; // TODO(koan) @koan-error
type _32 = Expect<Equal<R<<T, U>(a: T, b: U) => [T, U]>, TODO>>; // TODO(koan) @koan-error
type _33 = Expect<Equal<R<<T extends readonly unknown[]>(value: T) => T[number]>, TODO>>; // TODO(koan) @koan-error
type _34 = Expect<Equal<IsAny<R<<T extends object>(value: T) => keyof T>>, TODO>>; // TODO(koan) @koan-error
type _35 = Expect<Equal<R<<T>(value: T) => { value: T }>, TODO>>; // TODO(koan) @koan-error
type _36 = Expect<Equal<R<<T extends string | number>(value: T) => `${T}`>, TODO>>; // TODO(koan) @koan-error

// Overloads, unions, and callable objects (37-48)
interface Overloaded {
  (x: string): 1;
  (x: number): 2;
  (x: string | number): 1 | 2;
}
type _37 = Expect<Equal<R<Overloaded>, TODO>>; // TODO(koan) @koan-error
type _38 = Expect<Equal<R<(() => 1) | (() => 2)>, TODO>>; // TODO(koan) @koan-error
type _39 = Expect<Equal<R<((x: string) => 1) | ((x: number) => 2)>, TODO>>; // TODO(koan) @koan-error
type _40 = Expect<Equal<R<{ (): 1; meta: string }>, TODO>>; // TODO(koan) @koan-error
type _41 = Expect<Equal<R<(() => 1) & { meta: string }>, TODO>>; // TODO(koan) @koan-error
type _42 = Expect<Equal<R<((x: string) => 1) & ((x: number) => 2)>, TODO>>; // TODO(koan) @koan-error
type _43 = Expect<Equal<R<(this: { id: string }) => number>, TODO>>; // TODO(koan) @koan-error
type _44 = Expect<Equal<R<(x?: string) => string | undefined>, TODO>>; // TODO(koan) @koan-error
type _45 = Expect<Equal<R<(...args: [name: string, age?: number]) => object>, TODO>>; // TODO(koan) @koan-error
type _46 = Expect<Equal<R<(new () => object) & (() => "call")>, TODO>>; // TODO(koan) @koan-error
type _47 = Expect<Equal<R<Function & (() => 1)>, TODO>>; // TODO(koan) @koan-error
type _48 = Expect<Equal<R<(() => never) | (() => string)>, TODO>>; // TODO(koan) @koan-error

// any, never, and composition (49-60)
type _49 = Expect<Equal<IsAny<R<any>>, TODO>>; // TODO(koan) @koan-error
type _50 = Expect<Equal<R<never>, TODO>>; // TODO(koan) @koan-error
type _51 = Expect<Equal<R<() => any> extends infer Value ? IsAny<Value> : false, TODO>>; // TODO(koan) @koan-error
type _52 = Expect<Equal<R<() => never>, TODO>>; // TODO(koan) @koan-error
type _53 = Expect<Equal<NonNullable<R<() => string | null>>, TODO>>; // TODO(koan) @koan-error
type _54 = Expect<Equal<Extract<R<() => string | number>, string>, TODO>>; // TODO(koan) @koan-error
type _55 = Expect<Equal<Exclude<R<() => string | number>, string>, TODO>>; // TODO(koan) @koan-error
type _56 = Expect<Equal<Readonly<R<() => { value: number }>>, TODO>>; // TODO(koan) @koan-error
type _57 = Expect<Equal<Partial<R<() => { a: 1; b: 2 }>>, TODO>>; // TODO(koan) @koan-error
type _58 = Expect<Equal<Parameters<R<() => (x: string) => number>>, TODO>>; // TODO(koan) @koan-error
type _59 = Expect<Equal<R<R<() => () => () => 1>>, TODO>>; // TODO(koan) @koan-error
type _60 = Expect<Equal<Awaited<R<() => Promise<"done">>>, TODO>>; // TODO(koan) @koan-error
