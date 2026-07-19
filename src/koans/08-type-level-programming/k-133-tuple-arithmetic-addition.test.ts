import { describe, expect, it } from "vitest";

import { add, sum } from "./k-133-tuple-arithmetic-addition.js";

describe("k-133 tuple arithmetic addition", () => {
  it("adds natural literals", () => {
    expect(add(2, 3)).toBe(5);
  });

  it("uses zero as an identity", () => {
    expect(add(0, 7)).toBe(7);
    expect(add(7, 0)).toBe(7);
  });

  it("sums a finite const tuple", () => {
    expect(sum([1, 2, 3, 4] as const)).toBe(10);
  });

  it("uses zero as the empty sum", () => {
    expect(sum([] as const)).toBe(0);
  });

  it("falls back to ordinary number behavior for broad runtime values", () => {
    const left: number = 1.5;
    const right: number = 2.5;
    expect(add(left, right)).toBe(4);
  });
});
