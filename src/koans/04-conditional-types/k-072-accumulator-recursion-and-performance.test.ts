import { describe, expect, it } from "vitest";

import {
  literalLength,
  makeSlots,
  reverse,
  take,
} from "./k-072-accumulator-recursion-and-performance.js";

describe("k-072 accumulator recursion and performance", () => {
  it("builds a runtime array with the requested tuple length", () => {
    expect(makeSlots(4)).toHaveLength(4);
  });

  it("reverses a heterogeneous tuple", () => {
    expect(reverse([1, "two", true] as const)).toEqual([true, "two", 1]);
  });

  it("does not mutate the input while reversing", () => {
    const input = [1, 2, 3] as const;
    reverse(input);
    expect(input).toEqual([1, 2, 3]);
  });

  it("takes up to the requested number of values", () => {
    expect(take([1, 2, 3] as const, 2)).toEqual([1, 2]);
    expect(take([1, 2] as const, 5)).toEqual([1, 2]);
  });

  it("counts literal string characters", () => {
    expect(literalLength("types")).toBe(5);
    expect(literalLength("")).toBe(0);
  });
});
