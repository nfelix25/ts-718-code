import { describe, expect, it } from "vitest";
import {
  classifySyntacticCheck,
  hasHexDigits,
  isAtLeast,
  isBelowMaximum,
  syntacticCheckCases,
} from "./k-197-syntactic-truthy-nullish-checks.js";

describe("k-197: syntactic truthy and nullish checks", () => {
  it("calls a RegExp method instead of testing the RegExp object", () => {
    expect(hasHexDigits("value=0x2a")).toBe(true);
    expect(hasHexDigits("value=42")).toBe(false);
  });

  it("uses comparison syntax rather than an arrow function", () => {
    expect(isAtLeast(5, 5)).toBe(true);
    expect(isAtLeast(4, 5)).toBe(false);
  });

  it("coalesces the maximum before comparing", () => {
    expect(isBelowMaximum(99, undefined)).toBe(true);
    expect(isBelowMaximum(101, undefined)).toBe(false);
  });

  it("classifies suspicious expression forms as diagnostics", () => {
    expect(syntacticCheckCases.slice(0, 3).map(classifySyntacticCheck)).toEqual([
      "diagnostic",
      "diagnostic",
      "diagnostic",
    ]);
  });

  it("preserves the deliberate constant exception", () => {
    expect(classifySyntacticCheck(syntacticCheckCases[3])).toBe("allowed");
  });
});
