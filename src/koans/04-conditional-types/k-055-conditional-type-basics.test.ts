import { describe, expect, it } from "vitest";

import {
  boxString,
  resultFor,
  stringOrLength,
} from "./k-055-conditional-type-basics.js";

describe("k-055 conditional type basics", () => {
  it("builds the string branch at runtime", () => {
    expect(boxString("hello")).toEqual({ text: "hello" });
  });

  it("builds the fallback branch at runtime", () => {
    expect(boxString(42)).toEqual({ value: 42 });
  });

  it("constructs successful and failed result shapes", () => {
    expect(resultFor(true, 3)).toEqual({ ok: true, value: 3 });
    expect(resultFor(false, "bad")).toEqual({ ok: false, error: "bad" });
  });

  it("returns uppercase text for the string branch", () => {
    expect(stringOrLength("typescript")).toBe("TYPESCRIPT");
  });

  it("returns length for the readonly-array branch", () => {
    expect(stringOrLength([1, 2, 3] as const)).toBe(3);
  });
});
