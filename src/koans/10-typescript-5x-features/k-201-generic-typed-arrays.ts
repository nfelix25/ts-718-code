import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 201 - GENERIC TYPED ARRAYS
 * =================================
 *
 * ECMAScript 2024 gave `ArrayBuffer` and `SharedArrayBuffer` increasingly
 * different capabilities. A typed view therefore needs to remember which
 * backing-buffer family it exposes through `.buffer`.
 *
 * TypeScript 5.7 made typed arrays generic:
 * `Uint8Array<TArrayBuffer extends ArrayBufferLike = ArrayBufferLike>`.
 * Read that aloud as "bytes whose buffer is TArrayBuffer." The default keeps
 * old annotations source-compatible, while an explicit argument preserves
 * whether memory is ordinary or shared.
 *
 * A subarray aliases the same storage and preserves its backing type. A slice
 * copies bytes into new ordinary `ArrayBuffer` storage. This distinction is
 * both a runtime ownership fact and now a type-level API contract.
 *
 * Official source:
 * - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-7.html#support-for---target-es2024-and---lib-es2024
 */

export type BackingBuffer<View> =
  View extends Uint8Array<infer Buffer>
    ? Buffer
    : View extends Int32Array<infer Buffer>
      ? Buffer
      : never;

export function viewBytes<Buffer extends ArrayBufferLike>(
  buffer: Buffer,
): Uint8Array<Buffer> {
  return new Uint8Array(buffer);
}

export function tailView<Buffer extends ArrayBufferLike>(
  bytes: Uint8Array<Buffer>,
): Uint8Array<Buffer> {
  return bytes.subarray(1);
}

export function copyBytes(
  bytes: Uint8Array<ArrayBufferLike>,
): Uint8Array<ArrayBuffer> {
  return bytes.slice();
}

export function readBuffer<Buffer extends ArrayBufferLike>(
  bytes: Uint8Array<Buffer>,
): Buffer {
  return bytes.buffer;
}

export const localBytes = viewBytes(new ArrayBuffer(4));
export const sharedBytes = viewBytes(new SharedArrayBuffer(4));

// Part 1: typed arrays carry a default backing-buffer parameter.
type _01 = Expect<Equal<Uint8Array, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Uint8Array["buffer"], TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Uint8Array<ArrayBuffer>["buffer"], TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Uint8Array<SharedArrayBuffer>["buffer"], TODO>>; // TODO(koan) @koan-error

// Part 2: inference preserves concrete backing storage.
type _05 = Expect<Equal<typeof localBytes, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<typeof localBytes.buffer, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<typeof sharedBytes, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<typeof sharedBytes.buffer, TODO>>; // TODO(koan) @koan-error

// Part 3: a conditional can extract the backing channel.
type _09 = Expect<Equal<BackingBuffer<Uint8Array<ArrayBuffer>>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<BackingBuffer<Uint8Array<SharedArrayBuffer>>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<BackingBuffer<Int32Array<ArrayBuffer>>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<BackingBuffer<string>, TODO>>; // TODO(koan) @koan-error

// Part 4: aliasing and copying have different result buffers.
type _13 = Expect<Equal<ReturnType<typeof tailView<ArrayBuffer>>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<ReturnType<typeof tailView<SharedArrayBuffer>>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<ReturnType<typeof copyBytes>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<BackingBuffer<ReturnType<typeof copyBytes>>, TODO>>; // TODO(koan) @koan-error

// Part 5: helper signatures propagate or broaden ownership deliberately.
type _17 = Expect<Equal<Parameters<typeof viewBytes>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<ReturnType<typeof viewBytes>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Parameters<typeof readBuffer<ArrayBuffer>>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<ReturnType<typeof readBuffer<SharedArrayBuffer>>, TODO>>; // TODO(koan) @koan-error
