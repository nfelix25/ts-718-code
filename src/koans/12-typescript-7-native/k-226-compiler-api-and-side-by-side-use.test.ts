import { describe, expect, it } from "vitest";
import {
  assess, explain, outcomes, scenarioList,
  compilerFor
} from "./k-226-compiler-api-and-side-by-side-use.js";

describe("k-226-compiler-api-and-side-by-side-use: Compiler API and Side-by-side Use", () => {
  it("classifies the opening scenario", () => {
    expect(assess("native-tsc").outcome).toBe("typescript-7");
  });
  it("preserves a second scenario's concrete detail", () => {
    expect(assess("tsc6").detail).toBe("the compatibility package exposes a nonconflicting CLI");
  });
  it("classifies the final scenario", () => {
    expect(assess("future-api").outcome).toBe("typescript-7.1");
  });
  it("keeps scenario and outcome inventories aligned", () => {
    expect(outcomes()).toHaveLength(scenarioList.length);
    expect(explain("native-tsc")).toContain("native-tsc");
  });
  it("exercises the lesson-specific runtime boundary", () => {
    expect(compilerFor("legacy-api")).toBe("typescript-6");
  });
});
