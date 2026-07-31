import { describe, expect, it } from "vitest";
import {
  allOutcomes,
  assess,
  describeScenario,
  scenarioList,
  explicitOrderingBoundary
} from "./k-213-stable-type-ordering.js";

describe("k-213-stable-type-ordering: Stable Type Ordering", () => {
  it("classifies the opening scenario", () => {
    expect(assess("legacy-order").outcome).toBe("encounter-based");
  });

  it("preserves literal details for another scenario", () => {
    expect(assess("stable-flag").detail).toBe("6.0 uses the 7.0 ordering strategy");
  });

  it("classifies the final scenario", () => {
    expect(assess("long-term-config").outcome).toBe("remove-probe");
  });

  it("keeps the scenario and outcome inventories aligned", () => {
    expect(allOutcomes()).toHaveLength(scenarioList.length);
    expect(describeScenario("legacy-order")).toContain("legacy-order");
  });

  it("exercises the lesson-specific runtime boundary", () => {
    expect(explicitOrderingBoundary(500)).toBe(500);
  });
});
