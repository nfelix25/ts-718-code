import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type {
  CurryArgs,
  CurryFunction,
  PartiallyApply,
  RemainingArgs,
} from "./k-130-curry-and-partial-application.js";

/** GUIDED DRILLS: vary tuple arity, optional/rest tails, prefix length, literals, and reflection. */

type C<F extends (...args: any[]) => any> = CurryFunction<F>;
type PA<F extends (...args: any[]) => any, B extends readonly unknown[]> = PartiallyApply<F, B>;
type RA<A extends readonly unknown[], B extends readonly unknown[]> = RemainingArgs<A, B>;
type IsAny<T> = 0 extends 1 & T ? true : false;

// Curry fixed tuples (1-12)
type _01 = Expect<Equal<CurryArgs<[], string>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<CurryArgs<[number], string>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<CurryArgs<[number, boolean], string>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<CurryArgs<[number, boolean, Date], string>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<C<() => 1>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<C<(x: string) => number>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<C<(x: string, y: number) => boolean>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<C<(a: 1, b: 2, c: 3) => 4>, TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<ReturnType<C<(x: string) => number>>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Parameters<C<(x: string, y: number) => boolean>>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<ReturnType<C<(x: string, y: number) => boolean>>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<ReturnType<ReturnType<C<(x: string, y: number) => boolean>>>, TODO>>; // TODO(koan) @koan-error

// Optional and rest tails (13-24)
type _13 = Expect<Equal<C<(x?: string) => number>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<C<(x: string, y?: number) => boolean>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<C<(...values: number[]) => number>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<C<(head: string, ...tail: number[]) => boolean>, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<C<(...args: [name?: string]) => number>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<C<(...args: [name: string, count?: number]) => boolean>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<C<(...args: [head: string, ...tail: number[]]) => Date>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<CurryArgs<string[], boolean>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<CurryArgs<readonly string[], boolean>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<CurryArgs<[head?: string], boolean>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<CurryArgs<[head: string, tail?: number], boolean>, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<CurryArgs<[head: string, ...tail: number[]], boolean>, TODO>>; // TODO(koan) @koan-error

// Remaining prefix arithmetic (25-36)
type _25 = Expect<Equal<RA<[string, number, boolean], []>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<RA<[string, number, boolean], [string]>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<RA<[string, number, boolean], [string, number]>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<RA<[string, number, boolean], [string, number, boolean]>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<RA<[string, number], ["x"]>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<RA<["x", number], [string]>, TODO>>; // TODO(koan) @koan-error
type _31 = Expect<Equal<RA<[number], [string]>, TODO>>; // TODO(koan) @koan-error
type _32 = Expect<Equal<RA<[string], [string, number]>, TODO>>; // TODO(koan) @koan-error
type _33 = Expect<Equal<RA<[], []>, TODO>>; // TODO(koan) @koan-error
type _34 = Expect<Equal<RA<[], [string]>, TODO>>; // TODO(koan) @koan-error
type _35 = Expect<Equal<RA<[unknown, object], [string, { id: 1 }]>, TODO>>; // TODO(koan) @koan-error
type _36 = Expect<Equal<RA<[any, number], [Date]>, TODO>>; // TODO(koan) @koan-error

// Partially applied functions (37-48)
type F = (name: string, count: number, active: boolean) => { name: string };
type _37 = Expect<Equal<PA<F, []>, TODO>>; // TODO(koan) @koan-error
type _38 = Expect<Equal<PA<F, [string]>, TODO>>; // TODO(koan) @koan-error
type _39 = Expect<Equal<PA<F, ["Ada"]>, TODO>>; // TODO(koan) @koan-error
type _40 = Expect<Equal<PA<F, [string, number]>, TODO>>; // TODO(koan) @koan-error
type _41 = Expect<Equal<PA<F, [string, number, boolean]>, TODO>>; // TODO(koan) @koan-error
type _42 = Expect<Equal<PA<F, [number]>, TODO>>; // TODO(koan) @koan-error
type _43 = Expect<Equal<PA<F, [string, string]>, TODO>>; // TODO(koan) @koan-error
type _44 = Expect<Equal<PA<F, [string, number, boolean, Date]>, TODO>>; // TODO(koan) @koan-error
type _45 = Expect<Equal<Parameters<PA<F, [string]>>, TODO>>; // TODO(koan) @koan-error
type _46 = Expect<Equal<ReturnType<PA<F, [string]>>, TODO>>; // TODO(koan) @koan-error
type _47 = Expect<Equal<PA<(x: string, y?: number) => boolean, [string]>, TODO>>; // TODO(koan) @koan-error
type _48 = Expect<Equal<PA<(head: string, ...tail: number[]) => boolean, [string]>, TODO>>; // TODO(koan) @koan-error

// Generic, overload, and special types (49-60)
type _49 = Expect<Equal<C<<T>(value: T) => T>, TODO>>; // TODO(koan) @koan-error
type _50 = Expect<Equal<C<<T extends string>(value: T) => T>, TODO>>; // TODO(koan) @koan-error
type _51 = Expect<Equal<C<<T, U>(left: T, right: U) => [T, U]>, TODO>>; // TODO(koan) @koan-error
interface Overloaded { (x: string): 1; (x: number): 2 }
type _52 = Expect<Equal<C<Overloaded>, TODO>>; // TODO(koan) @koan-error
type _53 = Expect<Equal<PA<Overloaded, [number]>, TODO>>; // TODO(koan) @koan-error
type _54 = Expect<Equal<IsAny<C<any>>, TODO>>; // TODO(koan) @koan-error
type _55 = Expect<Equal<C<never>, TODO>>; // TODO(koan) @koan-error
type _56 = Expect<Equal<PA<any, []> extends infer Value ? IsAny<Value> : false, TODO>>; // TODO(koan) @koan-error
type _57 = Expect<Equal<PA<never, []>, TODO>>; // TODO(koan) @koan-error
type _58 = Expect<Equal<C<(this: { id: 1 }, value: string) => number>, TODO>>; // TODO(koan) @koan-error
type _59 = Expect<Equal<PA<(this: { id: 1 }, value: string) => number, [string]>, TODO>>; // TODO(koan) @koan-error
type _60 = Expect<Equal<C<(...args: unknown[]) => unknown>, TODO>>; // TODO(koan) @koan-error
