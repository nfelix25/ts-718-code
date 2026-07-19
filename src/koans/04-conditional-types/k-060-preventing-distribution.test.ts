import { describe, expect, it } from "vitest";

import {
  allStrings,
  asDistributedArray,
  asWholeArray,
  someStrings,
} from "./k-060-preventing-distribution.js";

describe("k-060 preventing distribution", () => {
  it("answers the every-member runtime question", () => {
    expect(allStrings(["a", "b"] as const)).toBe(true);
    expect(allStrings(["a", 1] as const)).toBe(false);
  });

  it("answers the some-member runtime question", () => {
    expect(someStrings([1, "a", false] as const)).toBe(true);
    expect(someStrings([1, false] as const)).toBe(false);
  });

  it("keeps mixed values together in a whole array", () => {
    expect(asWholeArray<string | number>(["a", 1])).toEqual(["a", 1]);
  });

  it("has the same runtime representation for a distributed array cast", () => {
    expect(asDistributedArray<string | number>(["a", 1])).toEqual(["a", 1]);
  });

  it("handles an empty input for every and some", () => {
    expect(allStrings([] as const)).toBe(true);
    expect(someStrings([] as const)).toBe(false);
  });
});
