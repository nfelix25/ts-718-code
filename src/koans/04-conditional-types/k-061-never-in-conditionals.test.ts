import { describe, expect, it } from "vitest";

import {
  assertNever,
  fail,
  keepStrings,
  requireValue,
} from "./k-061-never-in-conditionals.js";

describe("k-061 never in conditionals", () => {
  it("throws from a never-returning function", () => {
    expect(() => fail("stop")).toThrow("stop");
  });

  it("returns a present value before the never fallback", () => {
    expect(requireValue(0)).toBe(0);
    expect(requireValue("")).toBe("");
  });

  it("uses the never fallback for nullish values", () => {
    expect(() => requireValue(null, "required")).toThrow("required");
  });

  it("filters rejected runtime values", () => {
    expect(keepStrings(["a", 1, "b", false])).toEqual(["a", "b"]);
  });

  it("throws if an alleged exhaustive value reaches assertNever", () => {
    expect(() => assertNever("future" as never)).toThrow("Unexpected value: future");
  });
});
