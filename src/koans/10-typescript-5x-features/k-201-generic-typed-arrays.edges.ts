import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type BackingBuffer,
  copyBytes,
  localBytes,
  readBuffer,
  sharedBytes,
  tailView,
} from "./k-201-generic-typed-arrays.js";

/** EDGE CASES: the default buffer argument deliberately broadens ownership, shared and ordinary buffers are not interchangeable, subarray aliases while slice copies, element types stay numeric regardless of backing store, unions preserve alternatives, never propagates through extraction, and host libraries such as Node may need compatible declaration updates. */

type Extends<From, To> = [From] extends [To] ? true : false;
type IsNever<Value> = [Value] extends [never] ? true : false;
type Local = Uint8Array<ArrayBuffer>;
type Shared = Uint8Array<SharedArrayBuffer>;
type Broad = Uint8Array<ArrayBufferLike>;

// Pre-solved demonstrations of ownership precision.
type _DemoLocalBuffer = Expect<Equal<typeof localBytes.buffer, ArrayBuffer>>;
type _DemoSharedBuffer = Expect<Equal<typeof sharedBytes.buffer, SharedArrayBuffer>>;
type _DemoElementSame = Expect<Equal<Local[number], Shared[number]>>;
type _DemoCopyLocal = Expect<Equal<BackingBuffer<ReturnType<typeof copyBytes>>, ArrayBuffer>>;

// 1. Default broadening versus explicit arguments (1-7)
type _01 = Expect<Equal<Uint8Array["buffer"], TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Local["buffer"], TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Shared["buffer"], TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Broad["buffer"], TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<BackingBuffer<Uint8Array>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<BackingBuffer<Local | Shared>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<BackingBuffer<Broad>, TODO>>; // TODO(koan) @koan-error

// 2. Shared and local assignability (8-14)
type _08 = Expect<Equal<Extends<Local, Broad>, TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<Extends<Shared, Broad>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Extends<Broad, Local>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Extends<Broad, Shared>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Extends<Local, Shared>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<Extends<Shared, Local>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Extends<Local | Shared, Broad>, TODO>>; // TODO(koan) @koan-error

// 3. Aliasing versus copying (15-21)
type _15 = Expect<Equal<ReturnType<typeof tailView<ArrayBuffer>>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<ReturnType<typeof tailView<SharedArrayBuffer>>, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<BackingBuffer<ReturnType<typeof tailView<ArrayBuffer>>>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<BackingBuffer<ReturnType<typeof tailView<SharedArrayBuffer>>>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<ReturnType<typeof copyBytes>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<BackingBuffer<ReturnType<typeof copyBytes>>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Extends<ReturnType<typeof copyBytes>, Shared>, TODO>>; // TODO(koan) @koan-error

// 4. Unsupported and bottom extraction (22-26)
type _22 = Expect<Equal<BackingBuffer<DataView<ArrayBuffer>>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<IsNever<BackingBuffer<DataView<ArrayBuffer>>>, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<BackingBuffer<never>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<IsNever<BackingBuffer<never>>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<BackingBuffer<unknown>, TODO>>; // TODO(koan) @koan-error

// 5. Read helpers preserve exact buffers (27-30)
type _27 = Expect<Equal<Parameters<typeof readBuffer<ArrayBuffer>>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<ReturnType<typeof readBuffer<ArrayBuffer>>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<Parameters<typeof readBuffer<SharedArrayBuffer>>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<ReturnType<typeof readBuffer<SharedArrayBuffer>>, TODO>>; // TODO(koan) @koan-error
