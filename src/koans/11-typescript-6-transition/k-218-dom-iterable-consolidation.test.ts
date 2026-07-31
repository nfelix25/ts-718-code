import { describe, expect, it } from "vitest";
import {
  allOutcomes,
  assess,
  describeScenario,
  scenarioList,
  collectDomLike,
  domLibSelection
} from "./k-218-dom-iterable-consolidation.js";

describe("k-218-dom-iterable-consolidation: DOM Iterable Consolidation", () => {
  it("classifies the opening scenario", () => {
    expect(assess("dom").outcome).toBe("includes-iterables");
  });

  it("preserves literal details for another scenario", () => {
    expect(assess("dom.iterable").detail).toBe("the old lib name remains accepted");
  });

  it("classifies the final scenario", () => {
    expect(assess("runtime").outcome).toBe("separate");
  });

  it("keeps the scenario and outcome inventories aligned", () => {
    expect(allOutcomes()).toHaveLength(scenarioList.length);
    expect(describeScenario("dom")).toContain("dom");
  });

  it("exercises the lesson-specific runtime boundary", () => {
    expect(domLibSelection()).toEqual(["dom"]);
  });
});
