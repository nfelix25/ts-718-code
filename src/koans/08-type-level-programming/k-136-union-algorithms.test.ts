import { describe, expect, it } from "vitest";

import { countUnique, mergeMembers, uniqueValues } from "./k-136-union-algorithms.js";

describe("k-136 union algorithms", () => {
  it("retains the first occurrence of each runtime member", () => {
    expect(uniqueValues(["a", "b", "a", "c"])).toEqual(["a", "b", "c"]);
  });

  it("counts normalized runtime members", () => {
    expect(countUnique([1, 1, 2, 3, 3])).toBe(3);
  });

  it("uses SameValueZero for runtime uniqueness", () => {
    expect(countUnique([Number.NaN, Number.NaN, 0, -0])).toBe(2);
  });

  it("merges object member capabilities", () => {
    expect(mergeMembers([{ a: 1 }, { b: 2 }])).toEqual({ a: 1, b: 2 });
  });

  it("lets later runtime members overwrite shared keys", () => {
    expect(mergeMembers([{ value: 1 }, { value: 2 }])).toEqual({ value: 2 });
  });
});
