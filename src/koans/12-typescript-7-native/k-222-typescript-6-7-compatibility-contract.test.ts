import { describe, expect, it } from "vitest";
import {
  assess, explain, outcomes, scenarioList,
  nativeCandidate
} from "./k-222-typescript-6-7-compatibility-contract.js";

describe("k-222-typescript-6-7-compatibility-contract: TypeScript 6/7 Compatibility Contract", () => {
  it("classifies the opening scenario", () => {
    expect(assess("ts6-clean-stable").outcome).toBe("candidate");
  });
  it("preserves a second scenario's concrete detail", () => {
    expect(assess("ts6-ignore-deprecations").detail).toBe("suppression hides TypeScript 7 hard errors");
  });
  it("classifies the final scenario", () => {
    expect(assess("compiler-api").outcome).toBe("separate-contract");
  });
  it("keeps scenario and outcome inventories aligned", () => {
    expect(outcomes()).toHaveLength(scenarioList.length);
    expect(explain("ts6-clean-stable")).toContain("ts6-clean-stable");
  });
  it("exercises the lesson-specific runtime boundary", () => {
    expect(nativeCandidate({ ts6Clean: true, stableOrdering: true, ignoredDeprecations: false })).toBe(true);
  });
});
