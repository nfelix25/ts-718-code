import { describe, expect, it } from "vitest";
import {
  assess, explain, outcomes, scenarioList,
  invalidatesProgram,
  coalesceWatchEvents
} from "./k-224-native-watch-mode.js";

describe("k-224-native-watch-mode: Native Watch Mode", () => {
  it("classifies the opening scenario", () => {
    expect(assess("watch-foundation").outcome).toBe("parcel-port");
  });
  it("preserves a second scenario's concrete detail", () => {
    expect(assess("cross-platform").detail).toBe("the port targets consistent operating-system behavior");
  });
  it("classifies the final scenario", () => {
    expect(assess("resource-profile").outcome).toBe("improved");
  });
  it("keeps scenario and outcome inventories aligned", () => {
    expect(outcomes()).toHaveLength(scenarioList.length);
    expect(explain("watch-foundation")).toContain("watch-foundation");
  });
  it("exercises the lesson-specific runtime boundary", () => {
    expect(invalidatesProgram({ kind: "change", path: "src/index.ts" })).toBe(true);
  });
});
