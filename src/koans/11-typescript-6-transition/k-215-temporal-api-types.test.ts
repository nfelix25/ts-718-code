import { describe, expect, it } from "vitest";
import {
  allOutcomes,
  assess,
  describeScenario,
  scenarioList,
  addTemporalDuration,
  hasTemporalRuntime
} from "./k-215-temporal-api-types.js";

describe("k-215-temporal-api-types: Temporal API Types", () => {
  it("classifies the opening scenario", () => {
    expect(assess("Instant").outcome).toBe("timeline");
  });

  it("preserves literal details for another scenario", () => {
    expect(assess("PlainDate").detail).toBe("a date without time or zone");
  });

  it("classifies the final scenario", () => {
    expect(assess("Now").outcome).toBe("host-clock");
  });

  it("keeps the scenario and outcome inventories aligned", () => {
    expect(allOutcomes()).toHaveLength(scenarioList.length);
    expect(describeScenario("Instant")).toContain("Instant");
  });

  it("exercises the lesson-specific runtime boundary", () => {
    expect(hasTemporalRuntime()).toBe(typeof globalThis.Temporal !== "undefined");
  });
});
