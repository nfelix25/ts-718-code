import { describe, expect, it } from "vitest";
import {
  allOutcomes,
  assess,
  describeScenario,
  scenarioList,
  resolutionForHost
} from "./k-219-module-resolution-tightening.js";

describe("k-219-module-resolution-tightening: Module Resolution Tightening", () => {
  it("classifies the opening scenario", () => {
    expect(assess("moduleResolution-node10").outcome).toBe("migrate");
  });

  it("preserves literal details for another scenario", () => {
    expect(assess("moduleResolution-classic").detail).toBe("replace pre-Node lookup semantics");
  });

  it("classifies the final scenario", () => {
    expect(assess("outFile").outcome).toBe("external-bundler");
  });

  it("keeps the scenario and outcome inventories aligned", () => {
    expect(allOutcomes()).toHaveLength(scenarioList.length);
    expect(describeScenario("moduleResolution-node10")).toContain("moduleResolution-node10");
  });

  it("exercises the lesson-specific runtime boundary", () => {
    expect(resolutionForHost("bundler")).toBe("bundler");
  });
});
