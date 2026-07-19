import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 128 - THIS UTILITY TYPES
 * ========================================
 *
 * TypeScript has three utilities with different roles. `ThisParameterType<F>`
 * extracts an explicit fake first `this` parameter. `OmitThisParameter<F>`
 * rebuilds a callable without that receiver channel. `ThisType<T>` is an empty
 * contextual marker that tells object-literal methods what `this` means.
 *
 * Read the extractor aloud as: "if T can be viewed as a function with receiver
 * U, capture U; otherwise return unknown." Omission first checks whether a real
 * receiver was found, then infers ordinary arguments and return type. ThisType
 * cannot be recreated structurally; its behavior is recognized by the compiler.
 */

export type KoanThisParameterType<T> =
  T extends (this: infer Receiver, ...args: never) => any ? Receiver : unknown;

export type KoanOmitThisParameter<T> = unknown extends KoanThisParameterType<T>
  ? T
  : T extends (...args: infer Args) => infer Result
    ? (...args: Args) => Result
    : T;

/** Alias to the compiler-recognized empty marker; a user-defined empty type cannot replace its context behavior. */
export type KoanThisType<T> = ThisType<T>;

type Handler = (this: { prefix: string }, value: number, suffix?: string) => string;

// Part 1: Extract explicit receiver types.
type _01 = Expect<Equal<KoanThisParameterType<Handler>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<KoanThisParameterType<(this: Date) => number>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<KoanThisParameterType<(value: string) => number>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<KoanThisParameterType<() => void>, TODO>>; // TODO(koan) @koan-error

// Part 2: Remove only the receiver, preserving the ordinary tuple and result.
type _05 = Expect<Equal<KoanOmitThisParameter<Handler>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Parameters<KoanOmitThisParameter<Handler>>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<ReturnType<KoanOmitThisParameter<Handler>>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<KoanOmitThisParameter<(value: string) => number>, TODO>>; // TODO(koan) @koan-error

// Part 3: Receiver types may be void, unknown, or structured.
type _09 = Expect<Equal<KoanThisParameterType<(this: void, value: string) => void>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<KoanThisParameterType<(this: unknown, value: string) => void>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<KoanOmitThisParameter<(this: void, value: string) => void>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<KoanOmitThisParameter<(this: { id: string }, ...values: number[]) => boolean>, TODO>>; // TODO(koan) @koan-error

// Part 4: ThisType is structurally empty but contextually meaningful.
type _13 = Expect<Equal<keyof KoanThisType<{ x: number }>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<KoanThisType<{ x: number }>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<{ methods: {} & KoanThisType<{ x: number }> }, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<KoanThisType<{ x: number }> & { label: string }, TODO>>; // TODO(koan) @koan-error

// Part 5: Generic, overloaded, and special functions expose inference limits.
interface Overloaded {
  (this: { kind: "text" }, value: string): 1;
  (this: { kind: "count" }, value: number): 2;
}
type IsAny<T> = 0 extends 1 & T ? true : false;
type _17 = Expect<Equal<KoanThisParameterType<Overloaded>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<KoanOmitThisParameter<Overloaded>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<IsAny<KoanOmitThisParameter<any>>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<KoanOmitThisParameter<never>, TODO>>; // TODO(koan) @koan-error

export function bindReceiver<Receiver, F extends (this: Receiver, ...args: any[]) => any>(
  fn: F,
  receiver: Receiver,
): KoanOmitThisParameter<F> {
  return fn.bind(receiver) as KoanOmitThisParameter<F>;
}

export function defineObject<Data, Methods>(spec: {
  data: Data;
  methods: Methods & ThisType<Data & Methods>;
}): Data & Methods {
  return Object.assign({}, spec.data, spec.methods);
}
