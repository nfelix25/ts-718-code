import { describe, expect, it } from "vitest";

import { zip, zipExact, zipWithIndex } from "./k-099-tuple-zip.js";

describe("k-099 tuple zip", () => {
  it("pairs equal finite inputs positionally", () => {
    expect(zip([1, 2] as const, ["a", "b"] as const)).toEqual([[1, "a"], [2, "b"]]);
  });

  it("stops when the left input is shorter", () => {
    expect(zip([1] as const, ["a", "b"] as const)).toEqual([[1, "a"]]);
  });

  it("stops when the right input is shorter", () => {
    expect(zip([1, 2] as const, ["a"] as const)).toEqual([[1, "a"]]);
  });

  it("rejects mismatched exact inputs at runtime", () => {
    expect(() => zipExact([1, 2] as const, ["a"] as const)).toThrow("equal lengths");
  });

  it("pairs values with runtime indices", () => {
    expect(zipWithIndex(["a", "b"] as const)).toEqual([["a", 0], ["b", 1]]);
  });
});
