import { describe, expect, it } from "vitest";
import {
  allOutcomes,
  assess,
  describeScenario,
  scenarioList,
  hardeningProfile
} from "./k-210-strict-adjacent-hardening-flags.js";

describe("k-210-strict-adjacent-hardening-flags: Strict-adjacent Hardening Flags", () => {
  it("classifies the opening scenario", () => {
    expect(assess("exactOptionalPropertyTypes").outcome).toBe("presence");
  });

  it("preserves literal details for another scenario", () => {
    expect(assess("noUncheckedIndexedAccess").detail).toBe("open indexed reads include undefined");
  });

  it("classifies the final scenario", () => {
    expect(assess("noUncheckedSideEffectImports").outcome).toBe("side-effect-resolution");
  });

  it("keeps the scenario and outcome inventories aligned", () => {
    expect(allOutcomes()).toHaveLength(scenarioList.length);
    expect(describeScenario("exactOptionalPropertyTypes")).toContain("exactOptionalPropertyTypes");
  });

  it("exercises the lesson-specific runtime boundary", () => {
    expect(hardeningProfile("noImplicitOverride").has("noImplicitOverride")).toBe(true);
  });
});
