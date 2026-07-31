import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type CallbackResult,
  type UndefinedCallback,
  type VoidCallback,
  asynchronouslyUndefined,
  createContextualCallbacks,
  implicitlyUndefined,
  invokeUndefined,
  mapWithUndefined,
  recordUndefined,
} from "./k-173-easier-undefined-returns.js";

/** GUIDED DRILLS: repeat undefined/void return types, callback tuples, directional assignability, contextual inference, generic mapping, and promised undefined completion. */

type Extends<From, To> = [From] extends [To] ? true : false;
type U0 = UndefinedCallback;
type U1 = UndefinedCallback<[value: string]>;
type U2 = UndefinedCallback<[left: number, right?: number]>;
type V0 = VoidCallback;
type V1 = VoidCallback<[value: string]>;

// Undefined callback construction and extraction (1-15)
type _01 = Expect<Equal<U0, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Parameters<U0>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<ReturnType<U0>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<CallbackResult<U0>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Parameters<U1>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<ReturnType<U1>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<CallbackResult<U1>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Parameters<U2>, TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<ReturnType<U2>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<UndefinedCallback<[boolean, Date]>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<CallbackResult<() => undefined>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<CallbackResult<() => void>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<CallbackResult<() => never>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<CallbackResult<() => null>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<CallbackResult<() => Promise<undefined>>, TODO>>; // TODO(koan) @koan-error

// Void versus undefined directional relationships (16-30)
type _16 = Expect<Equal<ReturnType<V0>, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<Parameters<V1>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Extends<U0, V0>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Extends<V0, U0>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Extends<() => number, V0>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Extends<() => number, U0>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<Extends<() => never, V0>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<Extends<() => never, U0>, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<Extends<undefined, void>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<Extends<void, undefined>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<Extends<never, undefined>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<Extends<null, undefined>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Exclude<void | undefined, undefined>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<Extract<void | undefined, undefined>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<NonNullable<undefined>, TODO>>; // TODO(koan) @koan-error

// Concrete functions and contextual callbacks (31-45)
type Contextual = ReturnType<typeof createContextualCallbacks>;
type _31 = Expect<Equal<Parameters<typeof implicitlyUndefined>, TODO>>; // TODO(koan) @koan-error
type _32 = Expect<Equal<ReturnType<typeof implicitlyUndefined>, TODO>>; // TODO(koan) @koan-error
type _33 = Expect<Equal<Parameters<typeof recordUndefined>, TODO>>; // TODO(koan) @koan-error
type _34 = Expect<Equal<ReturnType<typeof recordUndefined>, TODO>>; // TODO(koan) @koan-error
type _35 = Expect<Equal<Parameters<typeof invokeUndefined>, TODO>>; // TODO(koan) @koan-error
type _36 = Expect<Equal<Parameters<typeof invokeUndefined>[0], TODO>>; // TODO(koan) @koan-error
type _37 = Expect<Equal<ReturnType<typeof invokeUndefined>, TODO>>; // TODO(koan) @koan-error
type _38 = Expect<Equal<keyof Contextual, TODO>>; // TODO(koan) @koan-error
type _39 = Expect<Equal<Contextual["undefinedCallback"], TODO>>; // TODO(koan) @koan-error
type _40 = Expect<Equal<ReturnType<Contextual["undefinedCallback"]>, TODO>>; // TODO(koan) @koan-error
type _41 = Expect<Equal<Contextual["voidCallback"], TODO>>; // TODO(koan) @koan-error
type _42 = Expect<Equal<ReturnType<Contextual["voidCallback"]>, TODO>>; // TODO(koan) @koan-error
type _43 = Expect<Equal<Extends<Contextual["undefinedCallback"], V0>, TODO>>; // TODO(koan) @koan-error
type _44 = Expect<Equal<Extends<Contextual["voidCallback"], U0>, TODO>>; // TODO(koan) @koan-error
type _45 = Expect<Equal<ReturnType<typeof createContextualCallbacks>, TODO>>; // TODO(koan) @koan-error

// Generic mapping and asynchronous undefined (46-60)
type NumberMapper = typeof mapWithUndefined<number>;
type StringMapper = typeof mapWithUndefined<string>;
type _46 = Expect<Equal<Parameters<NumberMapper>, TODO>>; // TODO(koan) @koan-error
type _47 = Expect<Equal<Parameters<NumberMapper>[0], TODO>>; // TODO(koan) @koan-error
type _48 = Expect<Equal<Parameters<NumberMapper>[1], TODO>>; // TODO(koan) @koan-error
type _49 = Expect<Equal<ReturnType<NumberMapper>, TODO>>; // TODO(koan) @koan-error
type _50 = Expect<Equal<Parameters<StringMapper>[0], TODO>>; // TODO(koan) @koan-error
type _51 = Expect<Equal<Parameters<StringMapper>[1], TODO>>; // TODO(koan) @koan-error
type _52 = Expect<Equal<ReturnType<StringMapper>, TODO>>; // TODO(koan) @koan-error
type _53 = Expect<Equal<Parameters<typeof asynchronouslyUndefined>, TODO>>; // TODO(koan) @koan-error
type _54 = Expect<Equal<ReturnType<typeof asynchronouslyUndefined>, TODO>>; // TODO(koan) @koan-error
type _55 = Expect<Equal<Awaited<ReturnType<typeof asynchronouslyUndefined>>, TODO>>; // TODO(koan) @koan-error
type _56 = Expect<Equal<Extends<ReturnType<typeof asynchronouslyUndefined>, PromiseLike<undefined>>, TODO>>; // TODO(koan) @koan-error
type _57 = Expect<Equal<Promise<undefined> extends Promise<void> ? true : false, TODO>>; // TODO(koan) @koan-error
type _58 = Expect<Equal<Promise<void> extends Promise<undefined> ? true : false, TODO>>; // TODO(koan) @koan-error
type _59 = Expect<Equal<Awaited<Promise<undefined>>, TODO>>; // TODO(koan) @koan-error
type _60 = Expect<Equal<Awaited<Promise<void>>, TODO>>; // TODO(koan) @koan-error
