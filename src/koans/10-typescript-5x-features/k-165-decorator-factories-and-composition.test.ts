import { describe, expect, it } from "vitest";

import {
  createManuallyComposedWorker,
  createStackedWorker,
  createTransformedCalculator,
} from "./k-165-decorator-factories-and-composition.js";

describe("k-165 decorator factories and composition", () => {
  it("evaluates factory expressions top-down and applies decorators bottom-up", () => {
    const log: string[] = [];
    createStackedWorker(log);
    expect(log).toEqual([
      "factory:outer",
      "factory:inner",
      "factory:failure-outer",
      "factory:failure-inner",
      "apply:inner:run",
      "apply:outer:run",
      "apply:failure-inner:fail",
      "apply:failure-outer:fail",
    ]);
  });

  it("invokes stacked wrappers from the outside inward", () => {
    const log: string[] = [];
    const Worker = createStackedWorker(log);
    log.length = 0;
    expect(new Worker().run(4)).toBe(8);
    expect(log).toEqual([
      "enter:outer",
      "enter:inner",
      "body:run",
      "exit:inner",
      "exit:outer",
    ]);
  });

  it("folds manual composition right-to-left and preserves void observers", () => {
    const log: string[] = [];
    const Worker = createManuallyComposedWorker(log);
    expect(log).toEqual([
      "factory:outer",
      "factory:observer",
      "factory:inner",
      "apply:inner:run",
      "observe:observer:run",
      "apply:outer:run",
    ]);
    log.length = 0;
    expect(new Worker().run(4)).toBe(5);
    expect(log).toEqual([
      "enter:outer",
      "enter:inner",
      "body:run",
      "exit:inner",
      "exit:outer",
    ]);
  });

  it("makes noncommutative result transforms expose application order", () => {
    const Calculator = createTransformedCalculator([]);
    expect(new Calculator().calculate(5)).toBe(13);
  });

  it("unwinds thrown calls from the inner wrapper outward", () => {
    const log: string[] = [];
    const Worker = createStackedWorker(log);
    log.length = 0;
    expect(() => new Worker().fail()).toThrow("expected failure");
    expect(log).toEqual([
      "enter:failure-outer",
      "enter:failure-inner",
      "body:fail",
      "throw:failure-inner",
      "throw:failure-outer",
    ]);
  });
});
