import { describe, expect, it } from "vitest";

import { compareValues } from "./k-132-type-level-equality-and-comparison.js";

describe("k-132 type-level equality and comparison", () => {
  it("reports equal primitive values as same", () => {
    expect(compareValues("x", "x")).toBe("same");
  });

  it("reports distinct primitive values as different", () => {
    expect(compareValues(1, 2)).toBe("different");
  });

  it("uses Object.is semantics for NaN", () => {
    expect(compareValues(Number.NaN, Number.NaN)).toBe("same");
  });

  it("distinguishes positive and negative zero", () => {
    expect(compareValues(0, -0)).toBe("different");
  });

  it("compares objects by runtime identity, not structural type", () => {
    const value = { id: 1 };
    expect(compareValues(value, value)).toBe("same");
    expect(compareValues(value, { id: 1 })).toBe("different");
  });
});
