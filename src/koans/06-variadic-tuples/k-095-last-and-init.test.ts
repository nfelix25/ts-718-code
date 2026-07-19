import { describe, expect, it } from "vitest";

import { dropLast, last, lastOrUndefined, popTuple } from "./k-095-last-and-init.js";

describe("k-095 last and init", () => {
  it("returns the final position of a nonempty tuple", () => {
    expect(last(["head", 1, true] as const)).toBe(true);
  });

  it("drops exactly one final position", () => {
    expect(dropLast(["head", 1, true] as const)).toEqual(["head", 1]);
  });

  it("returns an empty init for a singleton", () => {
    expect(dropLast([42] as const)).toEqual([]);
  });

  it("returns both right-decomposed pieces", () => {
    expect(popTuple(["command", "--force", 3] as const)).toEqual([["command", "--force"], 3]);
  });

  it("uses undefined for an unchecked empty array", () => {
    expect(lastOrUndefined([] as string[])).toBeUndefined();
  });
});
