import { describe, expect, it } from "vitest";

import { enumerateTuple, hasLength, safeAt, tupleAt } from "./k-097-tuple-length-and-indexing.js";

describe("k-097 tuple length and indexing", () => {
  const tuple = ["a", 1, true] as const;

  it("reads a statically valid tuple index", () => {
    expect(tupleAt(tuple, 1)).toBe(1);
  });

  it("returns undefined for an unchecked runtime index", () => {
    expect(safeAt(tuple, 9)).toBeUndefined();
  });

  it("checks a requested runtime length", () => {
    expect(hasLength(tuple, 3)).toBe(true);
    expect(hasLength(tuple, 2)).toBe(false);
  });

  it("enumerates positions and values", () => {
    expect(enumerateTuple(tuple)).toEqual([[0, "a"], [1, 1], [2, true]]);
  });

  it("handles the empty tuple", () => {
    expect(enumerateTuple([] as const)).toEqual([]);
  });
});
