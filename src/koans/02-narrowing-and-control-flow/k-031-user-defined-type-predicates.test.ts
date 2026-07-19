import { describe, expect, it } from "vitest";
import {
  collectStrings,
  isNonNullish,
  isNumberArray,
  isString,
  isSuccess,
} from "./k-031-user-defined-type-predicates.js";

describe("k-031 user-defined type predicates", () => {
  it("checks primitive values", () => {
    expect(isString("text")).toBe(true);
    expect(isString(1)).toBe(false);
  });

  it("removes only nullish values generically", () => {
    expect([0, null, false, undefined, ""].filter(isNonNullish)).toEqual([0, false, ""]);
  });

  it("selects a discriminated result member", () => {
    expect(isSuccess({ ok: true, value: "saved" })).toBe(true);
    expect(isSuccess({ ok: false, error: new Error("no") })).toBe(false);
  });

  it("validates every array element before promising number[]", () => {
    expect(isNumberArray([1, 2, 3])).toBe(true);
    expect(isNumberArray([1, "2"])).toBe(false);
    expect(isNumberArray({ 0: 1 })).toBe(false);
  });

  it("activates the predicate-aware filter overload", () => {
    expect(collectStrings(["a", 1, "b", null])).toEqual(["a", "b"]);
  });
});
