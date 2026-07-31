import { describe, expect, it } from "vitest";
import {
  assess, explain, outcomes, scenarioList,
  potentialCheckers,
  validParallelism
} from "./k-223-checker-builder-parallelism.js";

describe("k-223-checker-builder-parallelism: Checker and Builder Parallelism", () => {
  it("classifies the opening scenario", () => {
    expect(assess("checkers-default").outcome).toBe("four");
  });
  it("preserves a second scenario's concrete detail", () => {
    expect(assess("checkers-one").detail).toBe("one checker removes duplicated checker work");
  });
  it("classifies the final scenario", () => {
    expect(assess("single-threaded").outcome).toBe("fully-serial");
  });
  it("keeps scenario and outcome inventories aligned", () => {
    expect(outcomes()).toHaveLength(scenarioList.length);
    expect(explain("checkers-default")).toContain("checkers-default");
  });
  it("exercises the lesson-specific runtime boundary", () => {
    expect(potentialCheckers({ checkers: 4, builders: 4, singleThreaded: false })).toBe(16);
  });
});
