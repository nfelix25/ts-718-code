import { describe, expect, it } from "vitest";
import { applyUpdate, mutableCopy, requireDefaults } from "./k-042-mapped-modifier-algebra.js";

describe("k-042 mapped modifier algebra", () => {
  it("creates a shallow mutable copy", () => {
    const source = { id: 1 } as const;
    const copy = mutableCopy(source);
    expect(copy).toEqual({ id: 1 });
    expect(copy).not.toBe(source);
  });
  it("applies a partial update", () => {
    expect(applyUpdate({ name: "Ada", active: false }, { active: true })).toEqual({ name: "Ada", active: true });
  });
  it("accepts an empty optional update", () => {
    expect(applyUpdate({ id: 1 }, {})).toEqual({ id: 1 });
  });
  it("fills absent values from required defaults", () => {
    const value: { name?: string; count: number } = { count: 2 };
    expect(requireDefaults(value, { name: "unknown", count: 0 })).toEqual({ name: "unknown", count: 2 });
  });
  it("keeps transformations shallow at runtime", () => {
    const nested = { config: { enabled: true } } as const;
    expect(mutableCopy(nested).config).toBe(nested.config);
  });
});
