import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type {
  KoanConstructorParameters,
  KoanInstanceType,
} from "./k-126-constructor-utility-types.js";

/** EDGE CASES: abstract reflection, generic erasure, overload order, and call/construct duality. */

type Ctor = abstract new (...args: any[]) => any;
type CP<C extends Ctor> = KoanConstructorParameters<C>;
type IT<C extends Ctor> = KoanInstanceType<C>;
type IsAny<T> = 0 extends 1 & T ? true : false;

// Pre-solved demonstrations.
type _DemoAnyParameters = Expect<Equal<CP<any>, unknown[]>>;
type _DemoAnyInstance = Expect<Equal<IsAny<IT<any>>, true>>;
type _DemoNeverParameters = Expect<Equal<CP<never>, never>>;
type _DemoNeverInstance = Expect<Equal<IT<never>, never>>;

abstract class AbstractBase { constructor(public id: string) {} abstract run(): void }
type _DemoAbstractParams = Expect<Equal<CP<typeof AbstractBase>, [id: string]>>;
type _DemoAbstractInstance = Expect<Equal<IT<typeof AbstractBase>, AbstractBase>>;

// @ts-expect-error constructor utilities reject a plain call signature.
type _InvalidFunction = CP<() => void>;

// 1. Abstract constructor reflection versus runtime constructability (1-8)
type _01 = Expect<Equal<CP<typeof AbstractBase>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<IT<typeof AbstractBase>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<CP<abstract new (id: number) => { id: number }>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<IT<abstract new (id: number) => { id: number }>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<(typeof AbstractBase) extends new (...args: any[]) => any ? true : false, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<(typeof AbstractBase) extends abstract new (...args: any[]) => any ? true : false, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<(new () => object) extends abstract new (...args: any[]) => any ? true : false, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<(abstract new () => object) extends new (...args: any[]) => any ? true : false, TODO>>; // TODO(koan) @koan-error

// 2. Generic constructors lose call-site-specific type arguments (9-16)
class Box<T> { constructor(public value: T) {} }
class Pair<A, B> { constructor(public left: A, public right: B) {} }
type _09 = Expect<Equal<CP<typeof Box>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<IT<typeof Box>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<CP<typeof Pair>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<IT<typeof Pair>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<CP<new <T>(value: T) => { value: T }>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<IT<new <T>(value: T) => { value: T }>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<CP<new <T extends string>(value: T) => { value: T }>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<IT<new <T extends string>(value: T) => { value: T }>, TODO>>; // TODO(koan) @koan-error

// 3. Overload and intersection order (17-23)
interface Forward {
  new (x: string): { text: string };
  new (x: number): { count: number };
}
interface Reverse {
  new (x: number): { count: number };
  new (x: string): { text: string };
}
type _17 = Expect<Equal<CP<Forward>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<IT<Forward>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<CP<Reverse>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<IT<Reverse>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<CP<(new (x: string) => { a: 1 }) & (new (x: number) => { b: 2 })>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<IT<(new (x: string) => { a: 1 }) & (new (x: number) => { b: 2 })>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<IT<(new (x: number) => { b: 2 }) & (new (x: string) => { a: 1 })>, TODO>>; // TODO(koan) @koan-error

// 4. Dual call/construct types and special inputs (24-30)
type Both = (new (id: string) => { id: string }) & ((value: number) => boolean);
type _24 = Expect<Equal<CP<Both>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<IT<Both>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<Parameters<Both>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<ReturnType<Both>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<CP<any>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<IsAny<IT<any>>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<IT<never>, TODO>>; // TODO(koan) @koan-error
