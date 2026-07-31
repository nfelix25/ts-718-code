import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 171 - DISPOSAL STACKS AND SUPPRESSED ERRORS
 * =================================================
 *
 * `DisposableStack` owns cleanup actions explicitly. `use` registers an existing
 * disposable, `adopt` pairs any value with a callback, and `defer` registers a
 * callback without a value. Disposal runs all entries in LIFO order. `move`
 * transfers ownership into a fresh stack and marks the source disposed.
 * `AsyncDisposableStack` mirrors the model and awaits each action.
 *
 * Cleanup must continue even when an action throws. If both protected work and
 * cleanup fail, the later cleanup failure becomes `SuppressedError.error` and
 * the earlier failure becomes `.suppressed`. Additional cleanup failures nest
 * that chain instead of discarding information.
 *
 * Read a stack aloud as: "register ownership as it is acquired; unwind every
 * action in reverse order; preserve all failures while doing so."
 *
 * Feature ownership: ECMAScript Explicit Resource Management stack/error
 * semantics, shipped in TypeScript 5.2's `esnext.disposable` declarations.
 *
 * Official source:
 * - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-2.html#using-declarations-and-explicit-resource-management
 */

export type StackResource<Value> =
  Value extends DisposableStack
    ? Disposable
    : Value extends AsyncDisposableStack
      ? AsyncDisposable
      : never;

export type MoveResult<Stack extends DisposableStack | AsyncDisposableStack> =
  ReturnType<Stack["move"]>;

export type IsAny<Value> = 0 extends 1 & Value ? true : false;

export class StackTraceResource implements Disposable {
  disposed = false;

  constructor(
    readonly name: string,
    private readonly log: string[],
  ) {
    this.log.push(`acquire:${name}`);
  }

  [Symbol.dispose](): void {
    this.disposed = true;
    this.log.push(`dispose:${this.name}`);
  }
}

export function runDisposableStack(log: string[]) {
  let resource: StackTraceResource;
  let stackAfterScope: DisposableStack;

  {
    using stack = new DisposableStack();
    stackAfterScope = stack;
    resource = stack.use(new StackTraceResource("used", log));
    stack.adopt("adopted", (value) => log.push(`adopt:${value}`));
    stack.defer(() => log.push("defer"));
    log.push("body");
  }

  return {
    resource: resource!,
    stack: stackAfterScope!,
  };
}

export function runMovedStack(log: string[]) {
  const source = new DisposableStack();
  const resource = source.use(new StackTraceResource("moved", log));
  const destination = source.move();
  log.push(`moved:${source.disposed}:${destination.disposed}`);
  destination.dispose();
  return { source, destination, resource };
}

export async function runAsyncDisposableStack(log: string[]): Promise<boolean> {
  const stack = new AsyncDisposableStack();
  stack.adopt("adopted", async (value) => {
    log.push(`adopt-start:${value}`);
    await Promise.resolve();
    log.push(`adopt-end:${value}`);
  });
  stack.defer(async () => {
    log.push("defer-start");
    await Promise.resolve();
    log.push("defer-end");
  });
  log.push("body");
  await stack.disposeAsync();
  return stack.disposed;
}

class ThrowingResource implements Disposable {
  constructor(private readonly message: string) {}

  [Symbol.dispose](): never {
    throw new Error(this.message);
  }
}

export function failBodyAndCleanup(): never {
  using _resource = new ThrowingResource("cleanup failed");
  throw new Error("body failed");
}

export function failCleanupOnly(): void {
  using _resource = new ThrowingResource("cleanup only");
}

type SyncStack = DisposableStack;
type AsyncStack = AsyncDisposableStack;

// Part 1: Synchronous stacks are themselves disposable resources.
type _01 = Expect<Equal<SyncStack extends Disposable ? true : false, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<SyncStack["disposed"], TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<ReturnType<SyncStack["dispose"]>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<ReturnType<SyncStack[typeof Symbol.dispose]>, TODO>>; // TODO(koan) @koan-error

// Part 2: use, adopt, defer, and move model ownership explicitly.
type _05 = Expect<Equal<Parameters<SyncStack["use"]>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<ReturnType<SyncStack["adopt"]>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Parameters<SyncStack["defer"]>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<MoveResult<SyncStack>, TODO>>; // TODO(koan) @koan-error

// Part 3: Async stacks mirror the API with awaited callbacks.
type _09 = Expect<Equal<AsyncStack extends AsyncDisposable ? true : false, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<ReturnType<AsyncStack["disposeAsync"]>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Parameters<AsyncStack["defer"]>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<MoveResult<AsyncStack>, TODO>>; // TODO(koan) @koan-error

// Part 4: SuppressedError preserves two arbitrary failure values.
type _13 = Expect<Equal<ConstructorParameters<typeof SuppressedError>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<IsAny<SuppressedError["error"]>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<IsAny<SuppressedError["suppressed"]>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<SuppressedError extends Error ? true : false, TODO>>; // TODO(koan) @koan-error

// Part 5: Runtime helpers expose stacks, resources, and promised completion.
type _17 = Expect<Equal<ReturnType<typeof runDisposableStack>["stack"], TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<ReturnType<typeof runMovedStack>["destination"], TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<ReturnType<typeof runAsyncDisposableStack>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<ReturnType<typeof failBodyAndCleanup>, TODO>>; // TODO(koan) @koan-error
