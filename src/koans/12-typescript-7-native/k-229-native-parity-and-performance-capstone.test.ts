import { describe, expect, it } from "vitest";
import {
  assess, explain, outcomes, scenarioList,
  speedup,
  parityReady
} from "./k-229-native-parity-and-performance-capstone.js";

describe("k-229-native-parity-and-performance-capstone: Native Parity and Performance Capstone", () => {
  it("classifies the opening scenario", () => {
    expect(assess("freeze-inputs").outcome).toBe("baseline");
  });
  it("preserves a second scenario's concrete detail", () => {
    expect(assess("ts6-stable").detail).toBe("run clean 6.0 with stable ordering and no suppression");
  });
  it("classifies the final scenario", () => {
    expect(assess("tooling-gaps").outcome).toBe("document");
  });
  it("keeps scenario and outcome inventories aligned", () => {
    expect(outcomes()).toHaveLength(scenarioList.length);
    expect(explain("freeze-inputs")).toContain("freeze-inputs");
  });
  it("exercises the lesson-specific runtime boundary", () => {
    expect(speedup({ compiler: "typescript-6", milliseconds: 1000, memoryMiB: 900 }, { compiler: "typescript-7", milliseconds: 100, memoryMiB: 600 })).toBe(10);
  });
});
