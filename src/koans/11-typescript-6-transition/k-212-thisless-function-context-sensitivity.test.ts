import { describe, expect, it } from "vitest";
import {
  allOutcomes,
  assess,
  describeScenario,
  scenarioList,
  callIt,
  inferredFromReversedMethods,
  callbackThenValue,
  inferredFromLaterArgument
} from "./k-212-thisless-function-context-sensitivity.js";

describe("k-212-thisless-function-context-sensitivity: this-less Function Context Sensitivity", () => {
  it("classifies the opening scenario", () => {
    expect(assess("arrow-consumer-first").outcome).toBe("inferred");
  });

  it("preserves literal details for another scenario", () => {
    expect(assess("method-consumer-first").detail).toBe("a this-less method contributes earlier");
  });

  it("classifies the final scenario", () => {
    expect(assess("no-independent-candidate").outcome).toBe("unknown");
  });

  it("keeps the scenario and outcome inventories aligned", () => {
    expect(allOutcomes()).toHaveLength(scenarioList.length);
    expect(describeScenario("arrow-consumer-first")).toContain("arrow-consumer-first");
  });

  it("exercises the lesson-specific runtime boundary", () => {
    expect(inferredFromReversedMethods).toBe(42);
  });
});
