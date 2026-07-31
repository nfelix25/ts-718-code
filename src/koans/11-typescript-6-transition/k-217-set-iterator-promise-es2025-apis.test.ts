import { describe, expect, it } from "vitest";
import {
  allOutcomes,
  assess,
  describeScenario,
  scenarioList,
  unionValues,
  doubledIterator
} from "./k-217-set-iterator-promise-es2025-apis.js";

describe("k-217-set-iterator-promise-es2025-apis: Set, Iterator, and Promise ES2025 APIs", () => {
  it("classifies the opening scenario", () => {
    expect(assess("Set.union").outcome).toBe("eager-set");
  });

  it("preserves literal details for another scenario", () => {
    expect(assess("Set.difference").detail).toBe("returns members absent from the other set");
  });

  it("classifies the final scenario", () => {
    expect(assess("Promise.try").outcome).toBe("promise-normalization");
  });

  it("keeps the scenario and outcome inventories aligned", () => {
    expect(allOutcomes()).toHaveLength(scenarioList.length);
    expect(describeScenario("Set.union")).toContain("Set.union");
  });

  it("exercises the lesson-specific runtime boundary", () => {
    expect(unionValues(new Set([1, 2]), new Set([2, 3]))).toEqual([1, 2, 3]);
  });
});
