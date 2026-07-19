import { describe, expect, it } from "vitest";

import { append, concatTuples, prepend, surround } from "./k-093-tuple-spread-normalization.js";

describe("k-093 tuple spread normalization", () => {
  it("concatenates two empty tuples", () => {
    expect(concatTuples([], [])).toEqual([]);
  });

  it("preserves finite operand order", () => {
    expect(concatTuples([1, 2] as const, ["a", true] as const)).toEqual([1, 2, "a", true]);
  });

  it("prepends one fixed position", () => {
    expect(prepend("start", [1, 2] as const)).toEqual(["start", 1, 2]);
  });

  it("appends one fixed position", () => {
    expect(append([1, 2] as const, "end")).toEqual([1, 2, "end"]);
  });

  it("surrounds a variable middle", () => {
    expect(surround("(", ["a", "b"] as const, ")")).toEqual(["(", "a", "b", ")"]);
  });
});
