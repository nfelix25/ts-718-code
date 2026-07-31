import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type AsyncDisposeMethod,
  type AsyncDisposeResult,
  type AwaitUsingValue,
  AsynchronousResource,
  SynchronousFallback,
  runAsyncEarlyReturn,
  runAsyncScope,
  runAsyncThrow,
  runMixedAsyncScope,
  runNullableAsyncScope,
} from "./k-170-asynchronous-resource-management.js";

/** GUIDED DRILLS: repeat async protocol shapes, PromiseLike completion, sync fallback eligibility, nullish unions, concrete classes, and promised exit-path results. */

type Extends<From, To> = [From] extends [To] ? true : false;
type AsyncResource = AsynchronousResource;
type SyncResource = SynchronousFallback;
type MinimalAsync = { [Symbol.asyncDispose](): PromiseLike<void> };
type PromiseAsync = { [Symbol.asyncDispose](): Promise<void> };
type SyncOnly = { [Symbol.dispose](): void };
type Both = MinimalAsync & SyncOnly;

// Async well-known symbol and protocol members (1-15)
type _01 = Expect<Equal<typeof Symbol.asyncDispose, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<keyof AsyncDisposable, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<AsyncDisposable[typeof Symbol.asyncDispose], TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Parameters<AsyncDisposable[typeof Symbol.asyncDispose]>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<ReturnType<AsyncDisposable[typeof Symbol.asyncDispose]>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Awaited<ReturnType<AsyncDisposable[typeof Symbol.asyncDispose]>>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<AsyncDisposeMethod<MinimalAsync>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<AsyncDisposeResult<MinimalAsync>, TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<AsyncDisposeMethod<PromiseAsync>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<AsyncDisposeResult<PromiseAsync>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<AsyncDisposeMethod<SyncOnly>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Extends<MinimalAsync, AsyncDisposable>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<Extends<PromiseAsync, AsyncDisposable>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Extends<SyncOnly, AsyncDisposable>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Extends<Both, AsyncDisposable>, TODO>>; // TODO(koan) @koan-error

// Concrete asynchronous and synchronous fallback resources (16-30)
type _16 = Expect<Equal<ConstructorParameters<typeof AsynchronousResource>, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<keyof AsyncResource, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<AsyncResource["name"], TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<AsyncResource["disposed"], TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<ReturnType<AsyncResource["use"]>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<AsyncResource[typeof Symbol.asyncDispose], TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<ReturnType<AsyncResource[typeof Symbol.asyncDispose]>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<Awaited<ReturnType<AsyncResource[typeof Symbol.asyncDispose]>>, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<ConstructorParameters<typeof SynchronousFallback>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<keyof SyncResource, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<SyncResource[typeof Symbol.dispose], TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<ReturnType<SyncResource[typeof Symbol.dispose]>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Extends<AsyncResource, AsyncDisposable>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<Extends<SyncResource, Disposable>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<Extends<AsyncResource, Disposable>, TODO>>; // TODO(koan) @koan-error

// Await-using eligible value unions (31-45)
type _31 = Expect<Equal<AwaitUsingValue<AsyncResource>, TODO>>; // TODO(koan) @koan-error
type _32 = Expect<Equal<AwaitUsingValue<SyncResource>, TODO>>; // TODO(koan) @koan-error
type _33 = Expect<Equal<AwaitUsingValue<Both>, TODO>>; // TODO(koan) @koan-error
type _34 = Expect<Equal<AwaitUsingValue<AsyncResource | SyncResource>, TODO>>; // TODO(koan) @koan-error
type _35 = Expect<Equal<AwaitUsingValue<AsyncResource | null>, TODO>>; // TODO(koan) @koan-error
type _36 = Expect<Equal<AwaitUsingValue<AsyncResource | undefined>, TODO>>; // TODO(koan) @koan-error
type _37 = Expect<Equal<AwaitUsingValue<AsyncResource | null | undefined>, TODO>>; // TODO(koan) @koan-error
type _38 = Expect<Equal<AwaitUsingValue<null>, TODO>>; // TODO(koan) @koan-error
type _39 = Expect<Equal<AwaitUsingValue<undefined>, TODO>>; // TODO(koan) @koan-error
type _40 = Expect<Equal<NonNullable<AwaitUsingValue<AsyncResource | null>>, TODO>>; // TODO(koan) @koan-error
type _41 = Expect<Equal<Exclude<AwaitUsingValue<AsyncResource | SyncResource>, Disposable>, TODO>>; // TODO(koan) @koan-error
type _42 = Expect<Equal<Extract<AwaitUsingValue<AsyncResource | SyncResource>, Disposable>, TODO>>; // TODO(koan) @koan-error
type _43 = Expect<Equal<Extends<AsyncResource, AsyncDisposable | Disposable>, TODO>>; // TODO(koan) @koan-error
type _44 = Expect<Equal<Extends<SyncResource, AsyncDisposable | Disposable>, TODO>>; // TODO(koan) @koan-error
type _45 = Expect<Equal<Extends<null, AsyncDisposable | Disposable | null | undefined>, TODO>>; // TODO(koan) @koan-error

// Async scope helper arguments, Promises, and awaited results (46-60)
type _46 = Expect<Equal<Parameters<typeof runAsyncScope>, TODO>>; // TODO(koan) @koan-error
type _47 = Expect<Equal<ReturnType<typeof runAsyncScope>, TODO>>; // TODO(koan) @koan-error
type _48 = Expect<Equal<Awaited<ReturnType<typeof runAsyncScope>>, TODO>>; // TODO(koan) @koan-error
type _49 = Expect<Equal<ReturnType<typeof runAsyncEarlyReturn>, TODO>>; // TODO(koan) @koan-error
type _50 = Expect<Equal<Awaited<ReturnType<typeof runAsyncEarlyReturn>>, TODO>>; // TODO(koan) @koan-error
type _51 = Expect<Equal<ReturnType<typeof runAsyncThrow>, TODO>>; // TODO(koan) @koan-error
type _52 = Expect<Equal<Awaited<ReturnType<typeof runAsyncThrow>>, TODO>>; // TODO(koan) @koan-error
type _53 = Expect<Equal<Parameters<typeof runMixedAsyncScope>, TODO>>; // TODO(koan) @koan-error
type _54 = Expect<Equal<ReturnType<typeof runMixedAsyncScope>, TODO>>; // TODO(koan) @koan-error
type _55 = Expect<Equal<Awaited<ReturnType<typeof runMixedAsyncScope>>, TODO>>; // TODO(koan) @koan-error
type _56 = Expect<Equal<Parameters<typeof runNullableAsyncScope>, TODO>>; // TODO(koan) @koan-error
type _57 = Expect<Equal<Parameters<typeof runNullableAsyncScope>[1], TODO>>; // TODO(koan) @koan-error
type _58 = Expect<Equal<ReturnType<typeof runNullableAsyncScope>, TODO>>; // TODO(koan) @koan-error
type _59 = Expect<Equal<Awaited<ReturnType<typeof runNullableAsyncScope>>, TODO>>; // TODO(koan) @koan-error
type _60 = Expect<Equal<Extends<ReturnType<typeof runAsyncScope>, PromiseLike<void>>, TODO>>; // TODO(koan) @koan-error
