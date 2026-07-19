import { describe, expect, it } from "vitest";

import { collectLeaves, flattenNested, leafCount } from "./k-107-recursion-base-cases-and-leaves.js";

describe("k-107 recursion base cases and leaves", () => {
  it("collects primitive leaves through arrays and objects", () => {
    expect(collectLeaves({ user: { id: 1, name: "Ada" }, flags: [true, false] })).toEqual([1, "Ada", true, false]);
  });

  it("keeps declared built-ins opaque", () => {
    const date = new Date("2020-01-01T00:00:00Z");
    const map = new Map([["x", 1]]);
    expect(collectLeaves({ date, map })).toEqual([date, map]);
  });

  it("counts empty containers as having no leaves", () => {
    expect(leafCount({ emptyObject: {}, emptyArray: [] })).toBe(0);
  });

  it("stops at active cycles", () => {
    const cycle: Record<string, unknown> = { value: 1 };
    cycle.self = cycle;
    expect(collectLeaves(cycle)).toEqual([1]);
  });

  it("flattens a recursively nested array", () => {
    expect(flattenNested([1, [2, [3, 4]]])).toEqual([1, 2, 3, 4]);
  });
});
