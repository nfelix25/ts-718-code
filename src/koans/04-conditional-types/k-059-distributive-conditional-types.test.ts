import { describe, expect, it } from "vitest";

import {
  cartesian,
  partitionStrings,
  tagValues,
} from "./k-059-distributive-conditional-types.js";

describe("k-059 distributive conditional types", () => {
  it("partitions runtime strings from other values", () => {
    expect(partitionStrings(["a", 1, "b", false])).toEqual([["a", "b"], [1, false]]);
  });

  it("tags every runtime union member independently", () => {
    expect(tagValues(["a", "b"] as const)).toEqual([{ type: "a", value: "a" }, { type: "b", value: "b" }]);
  });

  it("builds a two-by-two Cartesian product", () => {
    expect(cartesian(["x", "y"] as const, [1, 2] as const)).toEqual([["x", 1], ["x", 2], ["y", 1], ["y", 2]]);
  });

  it("produces no pairs when one side is empty", () => {
    expect(cartesian([], [1, 2])).toEqual([]);
  });

  it("preserves object values while tagging", () => {
    const value = { type: "open", path: "/" } as const;
    expect(tagValues([value])).toEqual([{ type: value, value }]);
  });
});
