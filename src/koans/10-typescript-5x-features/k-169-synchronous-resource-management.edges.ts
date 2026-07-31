import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type DisposeMethod,
  type DisposeResult,
  type UsingValue,
  SynchronousResource,
} from "./k-169-synchronous-resource-management.js";

/** EDGE CASES: Disposable is structural, void-return compatibility permits ignored values, async-only resources are invalid for using, nullish values are skipped, and any/unknown/never behave very differently at the protocol boundary. */

type Extends<From, To> = [From] extends [To] ? true : false;
type IsAny<Value> = 0 extends 1 & Value ? true : false;
type Minimal = { [Symbol.dispose](): void };
type ReturnsNumber = { [Symbol.dispose](): number };
type OptionalDispose = { [Symbol.dispose]?: () => void };
type AsyncOnly = { [Symbol.asyncDispose](): Promise<void> };
type Both = Minimal & AsyncOnly;
type Resource = SynchronousResource;

// Pre-solved demonstrations call out structural and void-return compatibility.
type _DemoStructural = Expect<Equal<Extends<Minimal, Disposable>, true>>;
type _DemoReturnIgnored = Expect<Equal<Extends<ReturnsNumber, Disposable>, true>>;
type _DemoAsyncOnly = Expect<Equal<Extends<AsyncOnly, Disposable>, false>>;
type _DemoNullishUnion = Expect<Equal<UsingValue<Resource | null | undefined>, Resource | null | undefined>>;

// 1. A matching well-known symbol matters more than names or inheritance (1-8)
type _01 = Expect<Equal<Extends<Minimal, Disposable>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Extends<{ dispose(): void }, Disposable>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Extends<OptionalDispose, Disposable>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Extends<ReturnsNumber, Disposable>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Extends<AsyncOnly, Disposable>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Extends<Both, Disposable>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<keyof Minimal, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<typeof Symbol.dispose, TODO>>; // TODO(koan) @koan-error

// 2. Dispose extraction distributes over unions and drops nonresources (9-16)
type _09 = Expect<Equal<DisposeMethod<Minimal | string>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<DisposeMethod<Minimal | AsyncOnly>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<DisposeMethod<never>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<DisposeMethod<unknown>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<IsAny<DisposeMethod<any>>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<DisposeResult<ReturnsNumber>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<DisposeResult<Minimal>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<DisposeResult<AsyncOnly>, TODO>>; // TODO(koan) @koan-error

// 3. Nullish resources preserve unions but contribute no disposer call (17-23)
type _17 = Expect<Equal<UsingValue<null>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<UsingValue<undefined>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<UsingValue<Minimal | null>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<NonNullable<UsingValue<Minimal | null | undefined>>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Extract<UsingValue<Minimal | null>, null>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<Exclude<UsingValue<Minimal | undefined>, undefined>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<Extends<Minimal | null, Disposable | null | undefined>, TODO>>; // TODO(koan) @koan-error

// 4. Instance state, iterator disposal, and bottom/top types remain visible (24-30)
type _24 = Expect<Equal<Resource["disposed"], TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<ReturnType<Resource[typeof Symbol.dispose]>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<Extends<IteratorObject<number, void, unknown>, Disposable>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<Extends<AsyncIteratorObject<number, void, unknown>, Disposable>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Extends<never, Disposable>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<Extends<unknown, Disposable>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<Extends<any, Disposable>, TODO>>; // TODO(koan) @koan-error
