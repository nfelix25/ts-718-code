import { describe, expect, it } from "vitest";
import {
  assess, explain, outcomes, scenarioList,
  firstCodePoint
} from "./k-228-diagnostic-js-jsdoc-emit-differences.js";

describe("k-228-diagnostic-js-jsdoc-emit-differences: Diagnostic, JS/JSDoc, and Emit Differences", () => {
  it("classifies the opening scenario", () => {
    expect(assess("template-unicode").outcome).toBe("code-point");
  });
  it("preserves a second scenario's concrete detail", () => {
    expect(assess("js-value-as-type").detail).toBe("values require typeof in type positions");
  });
  it("classifies the final scenario", () => {
    expect(assess("declaration-diagnostic").outcome).toBe("review-semantics");
  });
  it("keeps scenario and outcome inventories aligned", () => {
    expect(outcomes()).toHaveLength(scenarioList.length);
    expect(explain("template-unicode")).toContain("template-unicode");
  });
  it("exercises the lesson-specific runtime boundary", () => {
    expect(firstCodePoint("😀abc")).toBe("😀");
  });
});
