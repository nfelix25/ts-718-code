import { describe, expect, it } from "vitest";
import {
  collectionKind,
  firstString,
  isStringList,
  sumNumbers,
  toArray,
} from "./k-034-built-in-and-array-guards.js";

describe("k-034 built-in and array guards", () => {
  it("normalizes scalar and array inputs", () => {
    expect(toArray("x")).toEqual(["x"]);
    expect(toArray(["x"])).toEqual(["x"]);
  });

  it("validates every numeric element before reducing", () => {
    expect(sumNumbers([1, 2, 3])).toBe(6);
    expect(sumNumbers([1, "2"])).toBeUndefined();
  });

  it("finds a checked string element", () => {
    expect(firstString([1, "a", "b"])).toBe("a");
    expect(firstString({ 0: "a" })).toBeUndefined();
  });

  it("distinguishes ordinary arrays from typed-array views", () => {
    expect(collectionKind([])).toBe("array");
    expect(collectionKind(new Uint8Array([1]))).toBe("view");
  });

  it("handles empty arrays through vacuous every", () => {
    expect(isStringList([])).toBe(true);
    expect(isStringList(["a", 1])).toBe(false);
  });
});
