import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 169 - SYNCHRONOUS RESOURCE MANAGEMENT
 * ===========================================
 *
 * A `using` declaration acquires a structurally `Disposable` value and
 * guarantees a call to `[Symbol.dispose]()` when control leaves the declaration's
 * scope. The exit can be normal, an early return, or a throw. Multiple resources
 * dispose in reverse acquisition order, so later resources can depend on earlier
 * ones while cleaning up.
 *
 * `using` changes lifetime, not value type: inside the scope the binding still
 * has the initializer's ordinary type. `null` and `undefined` are permitted and
 * ignored. A non-null value must expose the well-known unique-symbol method.
 *
 * Read `using resource = acquire()` aloud as: "acquire this value now, use its
 * normal type in this scope, and invoke its synchronous disposer on every exit."
 *
 * Feature ownership: ECMAScript Explicit Resource Management syntax/runtime
 * semantics, implemented by TypeScript 5.2 with `esnext.disposable` library
 * contracts and downlevel transforms.
 *
 * Official source:
 * - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-2.html#using-declarations-and-explicit-resource-management
 */

export type DisposeMethod<Value> =
  Value extends Disposable ? Value[typeof Symbol.dispose] : never;

export type DisposeResult<Value> =
  DisposeMethod<Value> extends (...args: never[]) => infer Result
    ? Result
    : never;

export type UsingValue<Value extends Disposable | null | undefined> = Value;

export class SynchronousResource implements Disposable {
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

  [Symbol.dispose](): void {
    if (!this.disposed) {
      this.disposed = true;
      this.log.push(`dispose:${this.name}`);
    }
  }
}

export function runNestedScope(log: string[]): void {
  using first = new SynchronousResource("first", log);
  using second = new SynchronousResource("second", log);
  first.use();
  second.use();
  log.push("body");
}

export function runEarlyReturn(log: string[]): string {
  using resource = new SynchronousResource("return", log);
  return resource.use();
}

export function runThrowingScope(log: string[]): never {
  using resource = new SynchronousResource("throw", log);
  resource.use();
  throw new Error("body failed");
}

export function runBlockScope(log: string[]): void {
  log.push("before");
  {
    using resource = new SynchronousResource("block", log);
    resource.use();
  }
  log.push("after");
}

export function runNullableScope(
  log: string[],
  resource: SynchronousResource | null | undefined,
): void {
  using selected = resource;
  log.push(`selected:${selected?.name ?? "none"}`);
}

type Resource = SynchronousResource;
type StructuralResource = {
  name: string;
  [Symbol.dispose](): void;
};

// Part 1: Disposal is a structural unique-symbol protocol.
type _01 = Expect<Equal<keyof Disposable, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<typeof Symbol.dispose, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<DisposeMethod<Resource>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<DisposeResult<Resource>, TODO>>; // TODO(koan) @koan-error

// Part 2: Resource classes retain their ordinary public surface.
type _05 = Expect<Equal<ConstructorParameters<typeof SynchronousResource>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Resource["name"], TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Resource["disposed"], TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<ReturnType<Resource["use"]>, TODO>>; // TODO(koan) @koan-error

// Part 3: Nullable values are legal and preserve their unions.
type _09 = Expect<Equal<UsingValue<Resource>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<UsingValue<Resource | null>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<UsingValue<undefined>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Parameters<typeof runNullableScope>[1], TODO>>; // TODO(koan) @koan-error

// Part 4: Structural lookalikes satisfy Disposable without inheritance.
type _13 = Expect<Equal<StructuralResource extends Disposable ? true : false, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Resource extends Disposable ? true : false, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<DisposeMethod<StructuralResource>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<DisposeMethod<{ close(): void }>, TODO>>; // TODO(koan) @koan-error

// Part 5: Exit-path helpers expose ordinary function results.
type _17 = Expect<Equal<ReturnType<typeof runNestedScope>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<ReturnType<typeof runEarlyReturn>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<ReturnType<typeof runThrowingScope>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Parameters<typeof runBlockScope>, TODO>>; // TODO(koan) @koan-error
