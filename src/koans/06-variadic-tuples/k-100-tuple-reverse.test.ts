import { describe, expect, it } from "vitest";

import { reverseReadonly, reverseTuple, reverseTwice } from "./k-100-tuple-reverse.js";

describe("k-100 tuple reverse", () => {
  it("reverses an empty tuple", () => {
    expect(reverseTuple([] as const)).toEqual([]);
  });

  it("reverses finite heterogeneous positions", () => {
    expect(reverseTuple([1, "a", true] as const)).toEqual([true, "a", 1]);
  });

  it("returns a fresh array", () => {
    const source = [1, 2, 3] as const;
    const reversed = reverseTuple(source);
    expect(reversed).not.toBe(source);
    expect(source).toEqual([1, 2, 3]);
  });

  it("restores order after two reversals", () => {
    expect(reverseTwice([1, "a", true] as const)).toEqual([1, "a", true]);
  });

  it("uses the same runtime array for a readonly result view", () => {
    expect(reverseReadonly([1, 2] as const)).toEqual([2, 1]);
  });
});
