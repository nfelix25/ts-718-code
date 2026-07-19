import { describe, expect, it } from "vitest";
import {
  coordinateLabel,
  formatValue,
  partitionValues,
  requireText,
  stateMessage,
} from "./k-035-aliased-conditions.js";

describe("k-035 aliased conditions", () => {
  it("reuses a named typeof fact", () => {
    expect(formatValue("go")).toBe("GO");
    expect(formatValue(12)).toBe("12");
  });

  it("reuses discriminant comparisons", () => {
    expect(stateMessage({ state: "ready", data: "done" })).toBe("done");
    expect(stateMessage({ state: "idle" })).toBe("idle");
  });

  it("combines aliased presence and type facts", () => {
    expect(requireText("text")).toBe("text");
    expect(() => requireText(null)).toThrow("missing text");
  });

  it("aliases an in-operator condition", () => {
    expect(coordinateLabel({ x: 2, y: 3 })).toBe("2,3");
    expect(coordinateLabel({ name: "origin" })).toBe("origin");
  });

  it("reuses a guard inside repeated loop control flow", () => {
    expect(partitionValues(["a", 1, "b", 2])).toEqual([["a", "b"], [1, 2]]);
  });
});
