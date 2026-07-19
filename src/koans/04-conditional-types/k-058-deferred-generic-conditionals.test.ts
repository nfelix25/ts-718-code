import { describe, expect, it } from "vitest";

import {
  conditionalBox,
  firstOrSelf,
  formatValue,
  overloaded,
} from "./k-058-deferred-generic-conditionals.js";

describe("k-058 deferred generic conditionals", () => {
  it("specializes string and number box branches", () => {
    expect(conditionalBox("x")).toEqual({ text: "x" });
    expect(conditionalBox(1)).toEqual({ value: 1 });
  });

  it("formats constrained string and number inputs", () => {
    expect(formatValue("hi")).toBe("text:hi");
    expect(formatValue(3)).toBe("3.00");
  });

  it("returns a tuple's first element", () => {
    expect(firstOrSelf(["a", 1] as const)).toBe("a");
  });

  it("returns a non-array constrained input unchanged", () => {
    expect(firstOrSelf("whole")).toBe("whole");
  });

  it("implements overload-specific runtime shapes", () => {
    expect(overloaded("x")).toEqual({ text: "x" });
    expect(overloaded(1)).toEqual({ value: 1 });
  });
});
