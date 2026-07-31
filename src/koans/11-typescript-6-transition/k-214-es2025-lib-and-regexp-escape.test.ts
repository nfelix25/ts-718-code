import { describe, expect, it } from "vitest";
import {
  allOutcomes,
  assess,
  describeScenario,
  scenarioList,
  literalPattern,
  containsLiteral,
  escapedMetacharacters
} from "./k-214-es2025-lib-and-regexp-escape.js";

describe("k-214-es2025-lib-and-regexp-escape: ES2025 Lib and RegExp.escape", () => {
  it("classifies the opening scenario", () => {
    expect(assess("RegExp.escape").outcome).toBe("es2025");
  });

  it("preserves literal details for another scenario", () => {
    expect(assess("Promise.try").detail).toBe("normalizes sync throws and returned values");
  });

  it("classifies the final scenario", () => {
    expect(assess("target-vs-lib").outcome).toBe("separate");
  });

  it("keeps the scenario and outcome inventories aligned", () => {
    expect(allOutcomes()).toHaveLength(scenarioList.length);
    expect(describeScenario("RegExp.escape")).toContain("RegExp.escape");
  });

  it("exercises the lesson-specific runtime boundary", () => {
    expect(containsLiteral("prefix a+b? suffix", "a+b?")).toBe(true);
  });
});
