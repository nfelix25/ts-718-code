import { describe, expect, it } from "vitest";

import {
  createDecoratedCounter,
} from "./k-160-decorator-mental-model.js";

describe("k-160 standard decorator mental model", () => {
  it("evaluates stacked decorator expressions in source order", () => {
    const log: string[] = [];
    createDecoratedCounter(log);
    expect(log.filter((entry) => entry.startsWith("evaluate:"))).toEqual([
      "evaluate:class",
      "evaluate:outer",
      "evaluate:inner",
    ]);
  });

  it("applies stacked method decorators from inside out", () => {
    const log: string[] = [];
    createDecoratedCounter(log);
    expect(log.filter((entry) => entry.startsWith("apply:"))).toEqual([
      "apply:inner:add:method",
      "apply:outer:add:method",
      "apply:class:Counter:class",
    ]);
  });

  it("runs decorator application at definition time", () => {
    const log: string[] = [];
    const Counter = createDecoratedCounter(log);
    expect(log.some((entry) => entry.startsWith("apply:"))).toBe(true);
    const before = log.length;
    new Counter();
    expect(log).toHaveLength(before);
  });

  it("invokes replacement wrappers from outside in", () => {
    const log: string[] = [];
    const Counter = createDecoratedCounter(log);
    log.length = 0;
    expect(new Counter().add(2)).toBe(2);
    expect(log).toEqual([
      "enter:outer",
      "enter:inner",
      "body:add",
      "exit:inner",
      "exit:outer",
    ]);
  });

  it("preserves the decorated method's runtime behavior", () => {
    const Counter = createDecoratedCounter([]);
    const counter = new Counter();
    expect(counter.add(2)).toBe(2);
    expect(counter.add(3)).toBe(5);
  });
});
