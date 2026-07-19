import { describe, expect, it } from "vitest";

import { assertPresent, requirePresent } from "./k-121-rebuild-nonnullable.js";

describe("k-121 rebuild NonNullable", () => {
  it("returns a present value unchanged", () => {
    const value = { id: 1 };
    expect(requirePresent(value)).toBe(value);
  });

  it("accepts falsy values that are not nullish", () => {
    expect(requirePresent(0)).toBe(0);
    expect(requirePresent("")).toBe("");
    expect(requirePresent(false)).toBe(false);
  });

  it("throws for null", () => {
    expect(() => requirePresent(null)).toThrow(TypeError);
  });

  it("throws for undefined with a custom message", () => {
    expect(() => requirePresent(undefined, "missing id")).toThrow("missing id");
  });

  it("narrows a variable through the assertion function", () => {
    const value: string | null = "ready";
    assertPresent(value);
    expect(value.toUpperCase()).toBe("READY");
  });
});
