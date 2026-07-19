import { describe, expect, it } from "vitest";
import {
  collectDefault,
  constrainedOption,
  createRegistry,
  defaultPair,
  optionalValue,
} from "./k-012-generic-defaults.js";

describe("k-012 generic defaults", () => {
  it("keeps runtime omission separate from a type-argument default", () => {
    expect(optionalValue()).toBeUndefined();
    expect(optionalValue(1)).toBe(1);
  });

  it("returns both independently optional runtime arguments", () => {
    expect(defaultPair(1)).toEqual([1, undefined]);
    expect(defaultPair(1, "one")).toEqual([1, "one"]);
  });

  it("collects zero or more inferred values", () => {
    expect(collectDefault()).toEqual([]);
    expect(collectDefault(1, 2)).toEqual([1, 2]);
  });

  it("creates an ordinary empty registry", () => {
    expect(createRegistry()).toEqual(new Map());
  });

  it("preserves a constrained runtime option", () => {
    const option = { mode: "custom", retries: 3 };
    expect(constrainedOption(option)).toBe(option);
  });
});
