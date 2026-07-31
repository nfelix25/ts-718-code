import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type CallbackResult,
  type UndefinedCallback,
  type VoidCallback,
  mapWithUndefined,
} from "./k-173-easier-undefined-returns.js";

/** EDGE CASES: void ignores implementation results while undefined promises one value, never satisfies both, contextual typing changes inference, union simplification is subtle, and async wrappers preserve the same directional distinction. */

type Extends<From, To> = [From] extends [To] ? true : false;
type IsAny<Value> = 0 extends 1 & Value ? true : false;
type U = UndefinedCallback;
type V = VoidCallback;

// Pre-solved demonstrations establish the core directional asymmetry.
type _DemoUndefinedToVoid = Expect<Equal<Extends<U, V>, true>>;
type _DemoVoidToUndefined = Expect<Equal<Extends<V, U>, false>>;
type _DemoNumberToVoid = Expect<Equal<Extends<() => number, V>, true>>;
type _DemoNumberToUndefined = Expect<Equal<Extends<() => number, U>, false>>;

// 1. Return compatibility treats void as an ignore-result target (1-8)
type _01 = Expect<Equal<Extends<() => undefined, () => void>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Extends<() => void, () => undefined>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Extends<() => number, () => void>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Extends<() => number, () => undefined>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Extends<() => never, () => void>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Extends<() => never, () => undefined>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Extends<() => null, () => void>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Extends<() => null, () => undefined>, TODO>>; // TODO(koan) @koan-error

// 2. Union and utility behavior reflects distinct void/undefined identities (9-16)
type _09 = Expect<Equal<void | undefined, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Exclude<void | undefined, undefined>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Extract<void | undefined, undefined>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<NonNullable<void>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<NonNullable<undefined>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Awaited<void>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Awaited<undefined>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<CallbackResult<() => void | undefined>, TODO>>; // TODO(koan) @koan-error

// 3. Generic mapper callbacks must really return undefined (17-23)
type NumberMapper = typeof mapWithUndefined<number>;
type ExpectedCallback = Parameters<NumberMapper>[1];
type _17 = Expect<Equal<ReturnType<ExpectedCallback>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Parameters<ExpectedCallback>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Extends<(value: number, index: number) => undefined, ExpectedCallback>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Extends<(value: number, index: number) => void, ExpectedCallback>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Extends<(value: number, index: number) => number, ExpectedCallback>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<ReturnType<NumberMapper>[number], TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<ReturnType<NumberMapper>, TODO>>; // TODO(koan) @koan-error

// 4. Async, any, unknown, and never keep their own sharp boundaries (24-30)
type _24 = Expect<Equal<Extends<Promise<undefined>, Promise<void>>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<Extends<Promise<void>, Promise<undefined>>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<Awaited<Promise<undefined>>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<Awaited<Promise<void>>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<IsAny<CallbackResult<() => any>>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<CallbackResult<() => unknown>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<CallbackResult<() => never>, TODO>>; // TODO(koan) @koan-error
