import { describe, expect, it } from "vitest";
import {
  allOutcomes,
  assess,
  describeScenario,
  scenarioList,
  getOrInsertComputed
} from "./k-216-map-upsert-methods.js";

describe("k-216-map-upsert-methods: Map Upsert Methods", () => {
  it("classifies the opening scenario", () => {
    expect(assess("getOrInsert-hit").outcome).toBe("existing");
  });

  it("preserves literal details for another scenario", () => {
    expect(assess("getOrInsert-miss").detail).toBe("stores the eager default");
  });

  it("classifies the final scenario", () => {
    expect(assess("concurrency").outcome).toBe("not-atomic");
  });

  it("keeps the scenario and outcome inventories aligned", () => {
    expect(allOutcomes()).toHaveLength(scenarioList.length);
    expect(describeScenario("getOrInsert-hit")).toContain("getOrInsert-hit");
  });

  it("exercises the lesson-specific runtime boundary", () => {
    expect(getOrInsertComputed(new Map(), "length", key => key.length)).toBe(6);
  });
});
