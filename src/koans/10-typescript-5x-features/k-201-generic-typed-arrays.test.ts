import { describe, expect, it } from "vitest";
import {
  copyBytes,
  readBuffer,
  tailView,
  viewBytes,
} from "./k-201-generic-typed-arrays.js";

describe("k-201: generic typed arrays", () => {
  it("preserves an ordinary ArrayBuffer backing store", () => {
    const buffer = new ArrayBuffer(4);
    expect(readBuffer(viewBytes(buffer))).toBe(buffer);
  });

  it("preserves a SharedArrayBuffer backing store", () => {
    const buffer = new SharedArrayBuffer(4);
    expect(readBuffer(viewBytes(buffer))).toBe(buffer);
  });

  it("makes subarrays alias the original storage", () => {
    const bytes = viewBytes(new SharedArrayBuffer(3));
    const tail = tailView(bytes);
    tail[0] = 42;
    expect(bytes[1]).toBe(42);
    expect(tail.buffer).toBe(bytes.buffer);
  });

  it("copies shared bytes into ordinary ArrayBuffer storage", () => {
    const shared = viewBytes(new SharedArrayBuffer(2));
    shared.set([7, 9]);
    const copied = copyBytes(shared);
    expect([...copied]).toEqual([7, 9]);
    expect(copied.buffer).toBeInstanceOf(ArrayBuffer);
  });

  it("keeps element semantics independent of backing storage", () => {
    const local = viewBytes(new ArrayBuffer(2));
    const shared = viewBytes(new SharedArrayBuffer(2));
    local[0] = 255;
    shared[0] = 255;
    expect([local[0], shared[0]]).toEqual([255, 255]);
  });
});
