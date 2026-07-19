import { describe, expect, it } from "vitest";

import { atTuple, isTupleElement, selectTuple, tupleSet } from "./k-096-tuple-to-union.js";

describe("k-096 tuple to union", () => {
  const methods = ["GET", "POST", "DELETE"] as const;

  it("recognizes a member of a literal tuple vocabulary", () => {
    expect(isTupleElement(methods, "POST")).toBe(true);
  });

  it("rejects a value outside the vocabulary", () => {
    expect(isTupleElement(methods, "PATCH")).toBe(false);
  });

  it("builds a set from possible tuple elements", () => {
    expect([...tupleSet([1, 1, 2] as const)]).toEqual([1, 2]);
  });

  it("returns undefined outside runtime bounds", () => {
    expect(atTuple(methods, 9)).toBeUndefined();
  });

  it("filters while retaining only original element values", () => {
    expect(selectTuple([1, "two", 3] as const, (value) => typeof value === "number")).toEqual([1, 3]);
  });
});
