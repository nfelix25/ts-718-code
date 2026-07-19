import { describe, expect, it } from "vitest";

import { formatEntry, makePoint, mapPoint, swapPair } from "./k-089-tuple-identity-and-labels.js";

describe("k-089 tuple identity and labels", () => {
  it("constructs a point in positional order", () => {
    expect(makePoint(3, 4)).toEqual([3, 4]);
  });

  it("destructures a labeled entry by position", () => {
    expect(formatEntry(["attempts", 3])).toBe("attempts=3");
  });

  it("swaps heterogeneous positions", () => {
    expect(swapPair(["ready", true])).toEqual([true, "ready"]);
  });

  it("maps both coordinates without changing cardinality", () => {
    expect(mapPoint([2, 5], (coordinate) => coordinate * 10)).toEqual([20, 50]);
  });

  it("uses ordinary array runtime representation", () => {
    const point = makePoint(1, 2);
    expect(Array.isArray(point)).toBe(true);
    expect(point.length).toBe(2);
  });
});
