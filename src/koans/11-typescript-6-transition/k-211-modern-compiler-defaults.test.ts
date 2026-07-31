import { describe, expect, it } from "vitest";
import {
  allOutcomes,
  assess,
  describeScenario,
  scenarioList,
  typescript6Defaults
} from "./k-211-modern-compiler-defaults.js";

describe("k-211-modern-compiler-defaults: Modern Compiler Defaults", () => {
  it("classifies the opening scenario", () => {
    expect(assess("strict").outcome).toBe("true");
  });

  it("preserves literal details for another scenario", () => {
    expect(assess("module").detail).toBe("module emit defaults to ESNext");
  });

  it("classifies the final scenario", () => {
    expect(assess("types").outcome).toBe("empty");
  });

  it("keeps the scenario and outcome inventories aligned", () => {
    expect(allOutcomes()).toHaveLength(scenarioList.length);
    expect(describeScenario("strict")).toContain("strict");
  });

  it("exercises the lesson-specific runtime boundary", () => {
    expect(typescript6Defaults.types).toEqual([]);
  });
});
