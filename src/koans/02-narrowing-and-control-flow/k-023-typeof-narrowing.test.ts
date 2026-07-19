import { describe, expect, it } from "vitest";
import {
  callIfFunction,
  describePrimitive,
  doubleIfNumber,
  normalizeText,
  ownKeyCountIfObject,
} from "./k-023-typeof-narrowing.js";

describe("k-023 typeof narrowing", () => {
  it("describes JavaScript typeof categories and null separately", () => {
    expect(describePrimitive("ts")).toBe("string:2");
    expect(describePrimitive(2)).toBe("number:2");
    expect(describePrimitive(null)).toBe("null");
  });

  it("performs category-specific string and number operations", () => {
    expect(doubleIfNumber(3)).toBe(6);
    expect(doubleIfNumber("ts")).toBe("TS");
  });

  it("calls only runtime functions", () => {
    expect(callIfFunction(() => 42)).toBe(42);
    expect(callIfFunction("value")).toBe("value");
  });

  it("rejects null before reflecting object keys", () => {
    expect(ownKeyCountIfObject(null)).toBe(0);
    expect(ownKeyCountIfObject({ id: 1 })).toBe(1);
  });

  it("normalizes each remaining branch after early returns", () => {
    expect(normalizeText(undefined)).toBe("");
    expect(normalizeText(42)).toBe("42");
    expect(normalizeText(" ts ")).toBe("ts");
  });
});
