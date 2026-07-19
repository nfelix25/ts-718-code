import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type {
  KoanOmitThisParameter,
  KoanThisParameterType,
  KoanThisType,
} from "./k-128-this-utility-types.js";

/** GUIDED DRILLS: vary receiver domains, argument tuples, generics, overloads, and context markers. */

type TP<F> = KoanThisParameterType<F>;
type OT<F> = KoanOmitThisParameter<F>;
type IsAny<T> = 0 extends 1 & T ? true : false;

// Receiver extraction (1-12)
type _01 = Expect<Equal<TP<(this: { id: string }) => void>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<TP<(this: Date) => number>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<TP<(this: string) => void>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<TP<(this: void) => void>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<TP<(this: unknown) => void>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<TP<(this: never) => void>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<TP<() => void>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<TP<(value: string) => void>, TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<TP<(this: { id: string }, value: number) => void>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<TP<(this: { id: string }, ...values: number[]) => void>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<TP<{ (this: { id: 1 }): void; meta: 2 }>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<TP<((this: { id: 1 }) => void) & { meta: 2 }>, TODO>>; // TODO(koan) @koan-error

// Receiver omission (13-24)
type _13 = Expect<Equal<OT<(this: { id: string }) => void>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<OT<(this: { id: string }, value: number) => string>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<OT<(this: Date, value?: string) => number>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<OT<(this: object, ...values: number[]) => boolean>, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<OT<(value: string) => number>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<OT<() => void>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Parameters<OT<(this: object, name: string, age?: number) => void>>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<ReturnType<OT<(this: object, name: string) => 1>>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<TP<OT<(this: object, name: string) => 1>>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<OT<OT<(this: object, name: string) => 1>>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<OT<(this: void, value: string) => void>, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<OT<(this: unknown, value: string) => void>, TODO>>; // TODO(koan) @koan-error

// Generic and overloaded signatures (25-36)
type _25 = Expect<Equal<TP<<T>(this: T, value: T) => T>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<OT<<T>(this: T, value: T) => T>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<TP<<T extends { id: string }>(this: T, value: number) => T>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<OT<<T extends { id: string }>(this: T, value: number) => T>, TODO>>; // TODO(koan) @koan-error
interface Forward {
  (this: { a: 1 }, value: string): 1;
  (this: { b: 2 }, value: number): 2;
}
interface Reverse {
  (this: { b: 2 }, value: number): 2;
  (this: { a: 1 }, value: string): 1;
}
type _29 = Expect<Equal<TP<Forward>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<OT<Forward>, TODO>>; // TODO(koan) @koan-error
type _31 = Expect<Equal<TP<Reverse>, TODO>>; // TODO(koan) @koan-error
type _32 = Expect<Equal<OT<Reverse>, TODO>>; // TODO(koan) @koan-error
type _33 = Expect<Equal<TP<((this: { a: 1 }) => 1) | ((this: { b: 2 }) => 2)>, TODO>>; // TODO(koan) @koan-error
type _34 = Expect<Equal<OT<((this: { a: 1 }) => 1) | ((this: { b: 2 }) => 2)>, TODO>>; // TODO(koan) @koan-error
type _35 = Expect<Equal<TP<((this: { a: 1 }) => 1) & ((this: { b: 2 }) => 2)>, TODO>>; // TODO(koan) @koan-error
type _36 = Expect<Equal<OT<((this: { a: 1 }) => 1) & ((this: { b: 2 }) => 2)>, TODO>>; // TODO(koan) @koan-error

// ThisType marker structure and composition (37-48)
type _37 = Expect<Equal<KoanThisType<{ x: number }>, TODO>>; // TODO(koan) @koan-error
type _38 = Expect<Equal<keyof KoanThisType<{ x: number }>, TODO>>; // TODO(koan) @koan-error
type _39 = Expect<Equal<KoanThisType<{ x: number }> & { move(): void }, TODO>>; // TODO(koan) @koan-error
type _40 = Expect<Equal<{ methods: {} & KoanThisType<{ x: number }> }, TODO>>; // TODO(koan) @koan-error
type _41 = Expect<Equal<KoanThisType<unknown>, TODO>>; // TODO(koan) @koan-error
type _42 = Expect<Equal<KoanThisType<never>, TODO>>; // TODO(koan) @koan-error
type _43 = Expect<Equal<KoanThisType<any>, TODO>>; // TODO(koan) @koan-error
type _44 = Expect<Equal<KoanThisType<{ x: 1 }> | KoanThisType<{ y: 2 }>, TODO>>; // TODO(koan) @koan-error
type _45 = Expect<Equal<Readonly<KoanThisType<{ x: 1 }>>, TODO>>; // TODO(koan) @koan-error
type _46 = Expect<Equal<Partial<KoanThisType<{ x: 1 }>>, TODO>>; // TODO(koan) @koan-error
type _47 = Expect<Equal<KoanThisType<{ x: 1 }> extends {} ? true : false, TODO>>; // TODO(koan) @koan-error
type _48 = Expect<Equal<{} extends KoanThisType<{ x: 1 }> ? true : false, TODO>>; // TODO(koan) @koan-error

// Special types and utility composition (49-60)
type _49 = Expect<Equal<TP<any>, TODO>>; // TODO(koan) @koan-error
type _50 = Expect<Equal<TP<never>, TODO>>; // TODO(koan) @koan-error
type _51 = Expect<Equal<IsAny<OT<any>>, TODO>>; // TODO(koan) @koan-error
type _52 = Expect<Equal<OT<never>, TODO>>; // TODO(koan) @koan-error
type _53 = Expect<Equal<TP<unknown>, TODO>>; // TODO(koan) @koan-error
type _54 = Expect<Equal<OT<unknown>, TODO>>; // TODO(koan) @koan-error
type _55 = Expect<Equal<Parameters<OT<(this: { id: 1 }, value: string) => number>>, TODO>>; // TODO(koan) @koan-error
type _56 = Expect<Equal<ReturnType<OT<(this: { id: 1 }, value: string) => number>>, TODO>>; // TODO(koan) @koan-error
type _57 = Expect<Equal<TP<OmitThisParameter<(this: { id: 1 }, value: string) => number>>, TODO>>; // TODO(koan) @koan-error
type _58 = Expect<Equal<ThisParameterType<OT<(this: { id: 1 }, value: string) => number>>, TODO>>; // TODO(koan) @koan-error
type _59 = Expect<Equal<OT<(this: { id: 1 }) => Promise<number>>, TODO>>; // TODO(koan) @koan-error
type _60 = Expect<Equal<Awaited<ReturnType<OT<(this: { id: 1 }) => Promise<number>>>>, TODO>>; // TODO(koan) @koan-error
