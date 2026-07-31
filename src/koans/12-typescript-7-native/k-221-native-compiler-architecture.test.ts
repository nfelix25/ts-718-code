import { describe, expect, it } from "vitest";
import {
  assess, explain, outcomes, scenarioList,
  nativeArchitecture,
  independentlyParallel
} from "./k-221-native-compiler-architecture.js";

describe("k-221-native-compiler-architecture: Native Compiler Architecture", () => {
  it("classifies the opening scenario", () => {
    expect(assess("implementation-language").outcome).toBe("go");
  });
  it("preserves a second scenario's concrete detail", () => {
    expect(assess("language-semantics").detail).toBe("the port aims to keep TypeScript behavior compatible");
  });
  it("classifies the final scenario", () => {
    expect(assess("memory").outcome).toBe("shared-native");
  });
  it("keeps scenario and outcome inventories aligned", () => {
    expect(outcomes()).toHaveLength(scenarioList.length);
    expect(explain("implementation-language")).toContain("implementation-language");
  });
  it("exercises the lesson-specific runtime boundary", () => {
    expect(independentlyParallel("parse")).toBe(true);
  });
});
