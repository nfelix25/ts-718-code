import { describe, expect, it } from "vitest";

import {
  classifyValue,
  scoreBand,
} from "./k-181-switch-true-narrowing.js";

describe("k-181 switch true narrowing", () => {
  it("takes the string guard", () => {
    expect(classifyValue("koan")).toBe("text:KOAN");
  });

  it("takes the number guard", () => {
    expect(classifyValue(3)).toBe("number:3.0");
  });

  it("takes array and null remainder branches", () => {
    expect(classifyValue([1, 2, 3])).toBe("array:3");
    expect(classifyValue(null)).toBe("null");
  });

  it("uses ordered numeric range cases", () => {
    expect([0, 39, 40, 79, 80].map(scoreBand)).toEqual([
      "low", "low", "medium", "medium", "high",
    ]);
  });

  it("handles the nullable case before numeric comparisons", () => {
    expect(scoreBand(null)).toBe("invalid");
  });
});
