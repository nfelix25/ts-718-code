import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 170 - ASYNCHRONOUS RESOURCE MANAGEMENT
 * ============================================
 *
 * `await using` extends lexical resource management to cleanup that returns a
 * `PromiseLike<void>`. Scope exit pauses until each async disposer settles.
 * Resources still unwind one at a time in reverse acquisition order; cleanup is
 * deliberately sequential rather than `Promise.all` concurrency.
 *
 * An await-using initializer may be `AsyncDisposable`, synchronously
 * `Disposable`, null, or undefined. The async symbol wins when a value supports
 * both protocols; otherwise synchronous cleanup is adapted into the awaited
 * exit. Plain `using` has no reverse adaptation for async-only resources.
 *
 * Read `await using resource = acquire()` aloud as: "use this ordinary value in
 * the async scope, then suspend every exit until its selected disposer settles."
 *
 * Feature ownership: ECMAScript Explicit Resource Management syntax/runtime
 * semantics, implemented by TypeScript 5.2 with `esnext.disposable` contracts
 * and downlevel transforms.
 *
 * Official source:
 * - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-2.html#using-declarations-and-explicit-resource-management
 */

export type AsyncDisposeMethod<Value> =
  Value extends AsyncDisposable
    ? Value[typeof Symbol.asyncDispose]
    : never;

export type AsyncDisposeResult<Value> =
  AsyncDisposeMethod<Value> extends (...args: never[]) => infer Result
    ? Result
    : never;

export type AwaitUsingValue<
  Value extends AsyncDisposable | Disposable | null | undefined,
> = Value;

export class AsynchronousResource implements AsyncDisposable {
  disposed = false;

  constructor(
    readonly name: string,
    private readonly log: string[],
  ) {
    this.log.push(`acquire:${name}`);
  }

  use(): string {
    if (this.disposed) {
      throw new Error(`${this.name} is already disposed`);
    }
    this.log.push(`use:${this.name}`);
    return this.name;
  }

  async [Symbol.asyncDispose](): Promise<void> {
    if (this.disposed) return;
    this.log.push(`dispose-start:${this.name}`);
    await Promise.resolve();
    this.disposed = true;
    this.log.push(`dispose-end:${this.name}`);
  }
}

export class SynchronousFallback implements Disposable {
  disposed = false;

  constructor(
    readonly name: string,
    private readonly log: string[],
  ) {
    this.log.push(`acquire-sync:${name}`);
  }

  [Symbol.dispose](): void {
    this.disposed = true;
    this.log.push(`dispose-sync:${this.name}`);
  }
}

export async function runAsyncScope(log: string[]): Promise<void> {
  await using first = new AsynchronousResource("first", log);
  await using second = new AsynchronousResource("second", log);
  first.use();
  second.use();
  log.push("body");
}

export async function runAsyncEarlyReturn(log: string[]): Promise<string> {
  await using resource = new AsynchronousResource("return", log);
  return resource.use();
}

export async function runAsyncThrow(log: string[]): Promise<never> {
  await using resource = new AsynchronousResource("throw", log);
  resource.use();
  throw new Error("async body failed");
}

export async function runMixedAsyncScope(log: string[]): Promise<void> {
  await using synchronous = new SynchronousFallback("sync", log);
  await using asynchronous = new AsynchronousResource("async", log);
  log.push(`body:${synchronous.name}:${asynchronous.name}`);
}

export async function runNullableAsyncScope(
  log: string[],
  resource: AsynchronousResource | null | undefined,
): Promise<void> {
  await using selected = resource;
  log.push(`selected:${selected?.name ?? "none"}`);
}

type AsyncResource = AsynchronousResource;
type StructuralAsync = {
  [Symbol.asyncDispose](): PromiseLike<void>;
};

// Part 1: Async disposal is a separate structural symbol protocol.
type _01 = Expect<Equal<keyof AsyncDisposable, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<typeof Symbol.asyncDispose, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<AsyncDisposeMethod<AsyncResource>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<AsyncDisposeResult<AsyncResource>, TODO>>; // TODO(koan) @koan-error

// Part 2: Async disposer completion is itself awaitable.
type _05 = Expect<Equal<ReturnType<AsyncResource[typeof Symbol.asyncDispose]>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Awaited<ReturnType<AsyncResource[typeof Symbol.asyncDispose]>>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<StructuralAsync extends AsyncDisposable ? true : false, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<AsyncResource extends Disposable ? true : false, TODO>>; // TODO(koan) @koan-error

// Part 3: Await-using accepts async, sync, and nullish values.
type _09 = Expect<Equal<AwaitUsingValue<AsyncResource>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<AwaitUsingValue<SynchronousFallback>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<AwaitUsingValue<AsyncResource | null>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<AwaitUsingValue<undefined>, TODO>>; // TODO(koan) @koan-error

// Part 4: Async scope helpers always surface Promise results.
type _13 = Expect<Equal<ReturnType<typeof runAsyncScope>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<ReturnType<typeof runAsyncEarlyReturn>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Awaited<ReturnType<typeof runAsyncEarlyReturn>>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Awaited<ReturnType<typeof runAsyncThrow>>, TODO>>; // TODO(koan) @koan-error

// Part 5: Runtime classes retain their ordinary value surfaces.
type _17 = Expect<Equal<ConstructorParameters<typeof AsynchronousResource>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<AsyncResource["name"], TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<ReturnType<AsyncResource["use"]>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Parameters<typeof runNullableAsyncScope>[1], TODO>>; // TODO(koan) @koan-error
