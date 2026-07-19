import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type {
  KoanOmitThisParameter,
  KoanThisParameterType,
  KoanThisType,
} from "./k-128-this-utility-types.js";

/** EDGE CASES: unknown receiver sentinel, overload loss, marker emptiness, and binding variance. */

type TP<F> = KoanThisParameterType<F>;
type OT<F> = KoanOmitThisParameter<F>;
type IsAny<T> = 0 extends 1 & T ? true : false;

// Pre-solved demonstrations.
type _DemoNoThisIsUnknown = Expect<Equal<TP<(value: string) => void>, unknown>>;
type _DemoThisExcluded = Expect<Equal<OT<(this: { id: 1 }, value: string) => number>, (value: string) => number>>;
type _DemoUnknownThisLooksAbsent = Expect<Equal<OT<(this: unknown, value: string) => number>, (this: unknown, value: string) => number>>;
type _DemoMarkerIsEmpty = Expect<Equal<KoanThisType<{ x: number }>, {}>>;
type _DemoAnyOmission = Expect<Equal<IsAny<OT<any>>, true>>;
type _DemoNeverOmission = Expect<Equal<OT<never>, never>>;

// 1. unknown is both a receiver type and the no-receiver sentinel (1-8)
type _01 = Expect<Equal<TP<(value: string) => void>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<TP<(this: unknown, value: string) => void>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<OT<(value: string) => void>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<OT<(this: unknown, value: string) => void>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<TP<(this: void, value: string) => void>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<OT<(this: void, value: string) => void>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<TP<(this: any, value: string) => void> extends infer R ? IsAny<R> : false, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<OT<(this: any, value: string) => void>, TODO>>; // TODO(koan) @koan-error

// 2. Omission rebuilds one visible signature (9-16)
interface Forward {
  (this: { a: 1 }, value: string): 1;
  (this: { b: 2 }, value: number): 2;
}
interface Reverse {
  (this: { b: 2 }, value: number): 2;
  (this: { a: 1 }, value: string): 1;
}
type _09 = Expect<Equal<TP<Forward>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<OT<Forward>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<TP<Reverse>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<OT<Reverse>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<Parameters<OT<Forward>>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<ReturnType<OT<Forward>>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Parameters<OT<Reverse>>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<ReturnType<OT<Reverse>>, TODO>>; // TODO(koan) @koan-error

// 3. ThisType is structurally empty and only works in contextual positions (17-23)
type _17 = Expect<Equal<KoanThisType<{ x: 1 }>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<keyof KoanThisType<{ x: 1 }>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<KoanThisType<{ x: 1 }> & { value: 2 }, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Readonly<KoanThisType<{ x: 1 }>>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Partial<KoanThisType<{ x: 1 }>>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<KoanThisType<any>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<KoanThisType<never>, TODO>>; // TODO(koan) @koan-error

// 4. Special types and composition (24-30)
type _24 = Expect<Equal<TP<any>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<TP<never>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<IsAny<OT<any>>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<OT<never>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<TP<OT<(this: { id: 1 }, value: string) => number>>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<Parameters<OT<(this: { id: 1 }, value?: string) => number>>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<ReturnType<OT<(this: { id: 1 }, value?: string) => number>>, TODO>>; // TODO(koan) @koan-error
