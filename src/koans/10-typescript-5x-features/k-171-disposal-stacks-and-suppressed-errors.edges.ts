import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type IsAny,
  type MoveResult,
  type StackResource,
  StackTraceResource,
} from "./k-171-disposal-stacks-and-suppressed-errors.js";

/** EDGE CASES: moved stacks reject new ownership, callbacks preserve generic adopted values, async stacks accept sync resources, repeated disposal is idempotent, and nested SuppressedError values are intentionally typed as any. */

type Extends<From, To> = [From] extends [To] ? true : false;
type SyncStack = DisposableStack;
type AsyncStack = AsyncDisposableStack;
type Resource = StackTraceResource;

// Pre-solved demonstrations pin ownership and error-type facts.
type _DemoMovedSync = Expect<Equal<MoveResult<SyncStack>, DisposableStack>>;
type _DemoMovedAsync = Expect<Equal<MoveResult<AsyncStack>, AsyncDisposableStack>>;
type _DemoErrorAny = Expect<Equal<IsAny<SuppressedError["error"]>, true>>;
type _DemoAsyncAcceptsSync = Expect<Equal<Extends<Resource, AsyncDisposable | Disposable>, true>>;

// 1. Stack state is boolean, while lifecycle restrictions are runtime checks (1-8)
type _01 = Expect<Equal<SyncStack["disposed"], TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<AsyncStack["disposed"], TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<ReturnType<SyncStack["move"]>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<ReturnType<AsyncStack["move"]>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<ReturnType<SyncStack["dispose"]>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<ReturnType<AsyncStack["disposeAsync"]>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<ReturnType<SyncStack[typeof Symbol.dispose]>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<ReturnType<AsyncStack[typeof Symbol.asyncDispose]>, TODO>>; // TODO(koan) @koan-error

// 2. Generic registration retains exact values, including nullish entries (9-16)
type SyncUse = SyncStack["use"];
type SyncAdopt = SyncStack["adopt"];
type AsyncUse = AsyncStack["use"];
declare const syncStack: SyncStack;
declare const asyncStack: AsyncStack;
type _09 = Expect<Equal<ReturnType<typeof syncStack.use<Resource>>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<ReturnType<typeof syncStack.use<null>>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<ReturnType<typeof syncStack.use<undefined>>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<ReturnType<typeof syncStack.adopt<readonly [1, 2]>>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<Parameters<typeof syncStack.adopt<readonly [1, 2]>>[1], TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<ReturnType<typeof asyncStack.use<Resource>>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<ReturnType<typeof asyncStack.use<AsyncDisposable>>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<ReturnType<typeof asyncStack.use<null>>, TODO>>; // TODO(koan) @koan-error

// 3. SuppressedError keeps arbitrary thrown JavaScript values (17-23)
type _17 = Expect<Equal<IsAny<SuppressedError["error"]>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<IsAny<SuppressedError["suppressed"]>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<ConstructorParameters<typeof SuppressedError>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<SuppressedError["name"], TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<SuppressedError["message"], TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<SuppressedError extends Error ? true : false, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<Error extends SuppressedError ? true : false, TODO>>; // TODO(koan) @koan-error

// 4. Stack family conditionals, top/bottom types, and symbols stay distinct (24-30)
type _24 = Expect<Equal<StackResource<SyncStack>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<StackResource<AsyncStack>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<StackResource<never>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<StackResource<DisposableStack | AsyncDisposableStack>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<typeof Symbol.dispose, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<typeof Symbol.asyncDispose, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<Extends<AsyncStack, Disposable>, TODO>>; // TODO(koan) @koan-error
