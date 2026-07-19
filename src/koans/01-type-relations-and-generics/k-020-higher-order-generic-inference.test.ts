import { describe, expect, it } from "vitest";
import {
  bindFirst,
  compose,
  lift,
  makeIdentity,
  preserveGeneric,
  toArray,
  toBox,
} from "./k-020-higher-order-generic-inference.js";

describe("k-020 higher-order generic inference", () => {
  it("instantiates one returned identity at unrelated calls", () => {
    const identity = makeIdentity();
    expect(identity(1)).toBe(1);
    expect(identity("a")).toBe("a");
  });

  it("composes generic array and box operations", () => {
    const boxedArray = compose(toArray, toBox);
    expect(boxedArray("a")).toEqual({ value: ["a"] });
  });

  it("composes concrete stages", () => {
    expect(compose((text: string) => text.trim(), (text) => text.length)("  ts  ")).toBe(2);
  });

  it("binds only the first runtime argument", () => {
    const format = bindFirst((prefix: string, value: number, suffix: string) => `${prefix}${value}${suffix}`, "#");
    expect(format(1, "!")).toBe("#1!");
  });

  it("lifts a scalar transform and preserves a generic function value", () => {
    expect(lift((value: number) => value * 2)([1, 2])).toEqual([2, 4]);
    expect(preserveGeneric(makeIdentity())({ id: 1 })).toEqual({ id: 1 });
  });
});
