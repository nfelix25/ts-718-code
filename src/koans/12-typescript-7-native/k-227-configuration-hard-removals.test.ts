import { describe, expect, it } from "vitest";
import {
  assess, explain, outcomes, scenarioList,
  migrationRequired
} from "./k-227-configuration-hard-removals.js";

describe("k-227-configuration-hard-removals: Configuration Hard Removals", () => {
  it("classifies the opening scenario", () => {
    expect(assess("target-es5").outcome).toBe("es2015-plus");
  });
  it("preserves a second scenario's concrete detail", () => {
    expect(assess("moduleResolution-node10-classic").detail).toBe("match the actual host");
  });
  it("classifies the final scenario", () => {
    expect(assess("legacy-syntax").outcome).toBe("modern-syntax");
  });
  it("keeps scenario and outcome inventories aligned", () => {
    expect(outcomes()).toHaveLength(scenarioList.length);
    expect(explain("target-es5")).toContain("target-es5");
  });
  it("exercises the lesson-specific runtime boundary", () => {
    expect(migrationRequired("baseUrl")).toBe(true);
  });
});
