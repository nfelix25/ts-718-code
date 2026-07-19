import { describe, expect, it } from "vitest";

import {
  safeCategory,
  safeUpper,
  unsafeNestedRead,
  unsafeUpper,
} from "./k-062-any-in-conditionals.js";

describe("k-062 any in conditionals", () => {
  it("allows an unsafe call that succeeds for a compatible runtime value", () => {
    expect(unsafeUpper("hello")).toBe("HELLO");
  });

  it("allows the same unsafe call to fail at runtime", () => {
    expect(() => unsafeUpper(42)).toThrow();
  });

  it("validates unknown before calling string behavior", () => {
    expect(safeUpper("hello")).toBe("HELLO");
    expect(safeUpper(42)).toBeUndefined();
  });

  it("shows unchecked nested any access failing at runtime", () => {
    expect(() => unsafeNestedRead({})).toThrow();
  });

  it("classifies unknown runtime input safely", () => {
    expect(safeCategory("x")).toBe("string");
    expect(safeCategory({})).toBe("other");
  });
});
