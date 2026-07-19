import { describe, expect, it } from "vitest";

import { allTrue, anyTrue, choose } from "./k-131-type-level-boolean-logic.js";

describe("k-131 type-level boolean logic", () => {
  it("chooses the true branch", () => {
    expect(choose(true, "yes", "no")).toBe("yes");
  });

  it("chooses the false branch", () => {
    expect(choose(false, "yes", "no")).toBe("no");
  });

  it("uses true as the empty all identity", () => {
    expect(allTrue([])).toBe(true);
    expect(allTrue([true, true, true])).toBe(true);
  });

  it("uses false as the empty any identity", () => {
    expect(anyTrue([])).toBe(false);
    expect(anyTrue([false, false, true])).toBe(true);
  });

  it("evaluates ordinary broad runtime arrays", () => {
    const flags: boolean[] = [true, false];
    expect(allTrue(flags)).toBe(false);
    expect(anyTrue(flags)).toBe(true);
  });
});
