import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type AsyncDisposeMethod,
  type AsyncDisposeResult,
  type AwaitUsingValue,
  AsynchronousResource,
  SynchronousFallback,
} from "./k-170-asynchronous-resource-management.js";

/** EDGE CASES: PromiseLike<void> is stricter than ignored sync void returns, await-using falls back to Symbol.dispose, both-protocol values prefer async disposal, and cleanup remains sequential across nullable/union/top/bottom cases. */

type Extends<From, To> = [From] extends [To] ? true : false;
type IsAny<Value> = 0 extends 1 & Value ? true : false;
type MinimalAsync = { [Symbol.asyncDispose](): PromiseLike<void> };
type PromiseNumber = { [Symbol.asyncDispose](): Promise<number> };
type ReturnsVoid = { [Symbol.asyncDispose](): void };
type SyncOnly = { [Symbol.dispose](): void };
type Both = MinimalAsync & SyncOnly;
type AsyncResource = AsynchronousResource;
type SyncResource = SynchronousFallback;

// Pre-solved demonstrations contrast async result strictness and sync fallback.
type _DemoPromiseLike = Expect<Equal<Extends<MinimalAsync, AsyncDisposable>, true>>;
type _DemoPromiseNumber = Expect<Equal<Extends<PromiseNumber, AsyncDisposable>, false>>;
type _DemoSyncFallback = Expect<Equal<Extends<SyncOnly, AsyncDisposable | Disposable>, true>>;
type _DemoAsyncNotSync = Expect<Equal<Extends<AsyncResource, Disposable>, false>>;

// 1. Async result compatibility requires awaitable void (1-8)
type _01 = Expect<Equal<Extends<MinimalAsync, AsyncDisposable>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Extends<PromiseNumber, AsyncDisposable>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Extends<ReturnsVoid, AsyncDisposable>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Extends<SyncOnly, AsyncDisposable>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Extends<Both, AsyncDisposable>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<AsyncDisposeResult<MinimalAsync>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Awaited<AsyncDisposeResult<MinimalAsync>>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Awaited<AsyncDisposeResult<PromiseNumber>>, TODO>>; // TODO(koan) @koan-error

// 2. Async method extraction drops sync-only and nonresource union members (9-16)
type _09 = Expect<Equal<AsyncDisposeMethod<MinimalAsync | string>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<AsyncDisposeMethod<MinimalAsync | SyncOnly>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<AsyncDisposeMethod<Both>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<AsyncDisposeMethod<never>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<AsyncDisposeMethod<unknown>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<IsAny<AsyncDisposeMethod<any>>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<AsyncDisposeResult<SyncOnly>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<keyof Both, TODO>>; // TODO(koan) @koan-error

// 3. Await-using eligibility is a wider union than AsyncDisposable alone (17-23)
type _17 = Expect<Equal<AwaitUsingValue<AsyncResource>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<AwaitUsingValue<SyncResource>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<AwaitUsingValue<Both>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<AwaitUsingValue<AsyncResource | SyncResource>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<AwaitUsingValue<null | undefined>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<NonNullable<AwaitUsingValue<AsyncResource | null>>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<Extends<SyncResource, AsyncDisposable | Disposable | null | undefined>, TODO>>; // TODO(koan) @koan-error

// 4. Iterator protocols, unique symbols, and top/bottom types remain distinct (24-30)
type _24 = Expect<Equal<typeof Symbol.asyncDispose, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<typeof Symbol.dispose, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<Extends<AsyncIteratorObject<number, void, unknown>, AsyncDisposable>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<Extends<IteratorObject<number, void, unknown>, AsyncDisposable>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Extends<never, AsyncDisposable>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<Extends<unknown, AsyncDisposable>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<Extends<any, AsyncDisposable>, TODO>>; // TODO(koan) @koan-error
