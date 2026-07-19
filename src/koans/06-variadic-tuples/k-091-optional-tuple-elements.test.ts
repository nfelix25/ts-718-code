import { describe, expect, it } from "vitest";

import { describePoint, expandRange, optionalPair, tupleLength } from "./k-091-optional-tuple-elements.js";

describe("k-091 optional tuple elements", () => {
  it("defaults an omitted range end to the start", () => {
    expect(expandRange([3])).toEqual([3]);
  });

  it("expands a complete range in ascending order", () => {
    expect(expandRange([2, 5])).toEqual([2, 3, 4, 5]);
  });

  it("defaults an omitted point label", () => {
    expect(describePoint([4, 7])).toBe("unlabeled@4,7");
  });

  it("preserves a supplied optional position", () => {
    expect(optionalPair("attempts", 3)).toEqual(["attempts", 3]);
  });

  it("reports the actual runtime cardinality", () => {
    expect(tupleLength(optionalPair("only"))).toBe(1);
    expect(tupleLength(optionalPair("both", true))).toBe(2);
  });
});
