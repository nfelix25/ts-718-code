import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type IsAny,
  type MoveResult,
  type StackResource,
  StackTraceResource,
  failBodyAndCleanup,
  failCleanupOnly,
  runAsyncDisposableStack,
  runDisposableStack,
  runMovedStack,
} from "./k-171-disposal-stacks-and-suppressed-errors.js";

/** GUIDED DRILLS: inspect synchronous and asynchronous stack APIs, generic registration returns, ownership transfer, stack disposability, suppressed error fields, and helper surfaces. */

type Extends<From, To> = [From] extends [To] ? true : false;
type SyncStack = DisposableStack;
type AsyncStack = AsyncDisposableStack;

// DisposableStack construction, state, and disposal protocol (1-15)
type _01 = Expect<Equal<ConstructorParameters<typeof DisposableStack>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<InstanceType<typeof DisposableStack>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<SyncStack["disposed"], TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<SyncStack["dispose"], TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Parameters<SyncStack["dispose"]>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<ReturnType<SyncStack["dispose"]>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<SyncStack[typeof Symbol.dispose], TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<ReturnType<SyncStack[typeof Symbol.dispose]>, TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<SyncStack[typeof Symbol.toStringTag], TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Extends<SyncStack, Disposable>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<StackResource<SyncStack>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<MoveResult<SyncStack>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<ReturnType<SyncStack["move"]>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Parameters<SyncStack["move"]>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<keyof SyncStack, TODO>>; // TODO(koan) @koan-error

// Generic use/adopt/defer relationships (16-30)
type Use = SyncStack["use"];
type Adopt = SyncStack["adopt"];
type Defer = SyncStack["defer"];
declare const syncStack: SyncStack;
type _16 = Expect<Equal<Parameters<Use>, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<ReturnType<Use>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Parameters<Adopt>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<ReturnType<Adopt>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Parameters<Defer>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<ReturnType<Defer>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<ReturnType<typeof syncStack.use<string & Disposable>>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<ReturnType<typeof syncStack.use<null>>, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<ReturnType<typeof syncStack.use<undefined>>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<ReturnType<typeof syncStack.adopt<{ id: number }>>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<Parameters<typeof syncStack.adopt<{ id: number }>>[0], TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<Parameters<typeof syncStack.adopt<{ id: number }>>[1], TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Parameters<Parameters<typeof syncStack.adopt<string>>[1]>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<ReturnType<Parameters<typeof syncStack.adopt<string>>[1]>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<ReturnType<Parameters<Defer>[0]>, TODO>>; // TODO(koan) @koan-error

// AsyncDisposableStack mirrors and widens registration (31-45)
type _31 = Expect<Equal<ConstructorParameters<typeof AsyncDisposableStack>, TODO>>; // TODO(koan) @koan-error
type _32 = Expect<Equal<AsyncStack["disposed"], TODO>>; // TODO(koan) @koan-error
type _33 = Expect<Equal<ReturnType<AsyncStack["disposeAsync"]>, TODO>>; // TODO(koan) @koan-error
type _34 = Expect<Equal<Awaited<ReturnType<AsyncStack["disposeAsync"]>>, TODO>>; // TODO(koan) @koan-error
type _35 = Expect<Equal<ReturnType<AsyncStack[typeof Symbol.asyncDispose]>, TODO>>; // TODO(koan) @koan-error
type _36 = Expect<Equal<Extends<AsyncStack, AsyncDisposable>, TODO>>; // TODO(koan) @koan-error
type _37 = Expect<Equal<StackResource<AsyncStack>, TODO>>; // TODO(koan) @koan-error
type _38 = Expect<Equal<MoveResult<AsyncStack>, TODO>>; // TODO(koan) @koan-error
type _39 = Expect<Equal<Parameters<AsyncStack["use"]>, TODO>>; // TODO(koan) @koan-error
type _40 = Expect<Equal<ReturnType<AsyncStack["use"]>, TODO>>; // TODO(koan) @koan-error
type _41 = Expect<Equal<Parameters<AsyncStack["adopt"]>, TODO>>; // TODO(koan) @koan-error
type _42 = Expect<Equal<ReturnType<AsyncStack["adopt"]>, TODO>>; // TODO(koan) @koan-error
type _43 = Expect<Equal<Parameters<AsyncStack["defer"]>, TODO>>; // TODO(koan) @koan-error
type _44 = Expect<Equal<ReturnType<AsyncStack["defer"]>, TODO>>; // TODO(koan) @koan-error
type _45 = Expect<Equal<AsyncStack[typeof Symbol.toStringTag], TODO>>; // TODO(koan) @koan-error

// SuppressedError and concrete helper reflection (46-60)
type _46 = Expect<Equal<ConstructorParameters<typeof SuppressedError>, TODO>>; // TODO(koan) @koan-error
type _47 = Expect<Equal<IsAny<SuppressedError["error"]>, TODO>>; // TODO(koan) @koan-error
type _48 = Expect<Equal<IsAny<SuppressedError["suppressed"]>, TODO>>; // TODO(koan) @koan-error
type _49 = Expect<Equal<SuppressedError["message"], TODO>>; // TODO(koan) @koan-error
type _50 = Expect<Equal<Extends<SuppressedError, Error>, TODO>>; // TODO(koan) @koan-error
type _51 = Expect<Equal<ConstructorParameters<typeof StackTraceResource>, TODO>>; // TODO(koan) @koan-error
type _52 = Expect<Equal<ReturnType<StackTraceResource[typeof Symbol.dispose]>, TODO>>; // TODO(koan) @koan-error
type _53 = Expect<Equal<ReturnType<typeof runDisposableStack>["stack"], TODO>>; // TODO(koan) @koan-error
type _54 = Expect<Equal<ReturnType<typeof runDisposableStack>["resource"], TODO>>; // TODO(koan) @koan-error
type _55 = Expect<Equal<ReturnType<typeof runMovedStack>["source"], TODO>>; // TODO(koan) @koan-error
type _56 = Expect<Equal<ReturnType<typeof runMovedStack>["destination"], TODO>>; // TODO(koan) @koan-error
type _57 = Expect<Equal<ReturnType<typeof runAsyncDisposableStack>, TODO>>; // TODO(koan) @koan-error
type _58 = Expect<Equal<Awaited<ReturnType<typeof runAsyncDisposableStack>>, TODO>>; // TODO(koan) @koan-error
type _59 = Expect<Equal<ReturnType<typeof failBodyAndCleanup>, TODO>>; // TODO(koan) @koan-error
type _60 = Expect<Equal<ReturnType<typeof failCleanupOnly>, TODO>>; // TODO(koan) @koan-error
