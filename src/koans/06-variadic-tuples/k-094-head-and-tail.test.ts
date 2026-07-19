import { describe, expect, it } from "vitest";

import { dropFirst, first, firstOrUndefined, shiftTuple } from "./k-094-head-and-tail.js";

describe("k-094 head and tail", () => {
  it("returns the first position of a nonempty tuple", () => {
    expect(first(["head", 1, true] as const)).toBe("head");
  });

  it("drops exactly one position", () => {
    expect(dropFirst(["head", 1, true] as const)).toEqual([1, true]);
  });

  it("returns an empty tail for a singleton", () => {
    expect(dropFirst([42] as const)).toEqual([]);
  });

  it("returns both decomposed pieces", () => {
    expect(shiftTuple(["command", "--force", 3] as const)).toEqual(["command", ["--force", 3]]);
  });

  it("uses undefined for an unchecked empty array", () => {
    expect(firstOrUndefined([] as string[])).toBeUndefined();
  });
});
