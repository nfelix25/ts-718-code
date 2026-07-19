import { describe, expect, it } from "vitest";

import { distanceFromOrigin, mutableCopy, readonlyPair, replaceFirst } from "./k-090-readonly-tuples.js";

describe("k-090 readonly tuples", () => {
  it("reads a readonly point without mutation", () => {
    expect(distanceFromOrigin([3, 4] as const)).toBe(5);
  });

  it("returns an ordinary pair at runtime", () => {
    expect(readonlyPair("status", 200)).toEqual(["status", 200]);
  });

  it("creates a distinct mutable copy", () => {
    const source: readonly [string, number] = ["a", 1];
    const copy = mutableCopy(source);
    copy[0] = "b";
    expect(source).toEqual(["a", 1]);
    expect(copy).toEqual(["b", 1]);
  });

  it("replaces a position without touching the source", () => {
    const source: readonly [string, number] = ["old", 2];
    expect(replaceFirst(source, "new")).toEqual(["new", 2]);
    expect(source).toEqual(["old", 2]);
  });

  it("preserves finite cardinality through copying", () => {
    expect(mutableCopy([true, false] as const)).toHaveLength(2);
  });
});
