import { describe, expect, it } from "vitest";
import {
  allOutcomes,
  assess,
  describeScenario,
  scenarioList,
  strictFamily
} from "./k-209-strict-family-unpacked.js";

describe("k-209-strict-family-unpacked: Strict Family Unpacked", () => {
  it("classifies the opening scenario", () => {
    expect(assess("strictNullChecks").outcome).toBe("nullability");
  });

  it("preserves literal details for another scenario", () => {
    expect(assess("noImplicitAny").detail).toBe("unannotated unresolved values cannot become any");
  });

  it("classifies the final scenario", () => {
    expect(assess("useUnknownInCatchVariables").outcome).toBe("unknown-catch");
  });

  it("keeps the scenario and outcome inventories aligned", () => {
    expect(allOutcomes()).toHaveLength(scenarioList.length);
    expect(describeScenario("strictNullChecks")).toContain("strictNullChecks");
  });

  it("exercises the lesson-specific runtime boundary", () => {
    expect(Object.values(strictFamily).every(Boolean)).toBe(true);
  });
});
