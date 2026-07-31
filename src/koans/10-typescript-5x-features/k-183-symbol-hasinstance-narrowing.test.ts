import { describe, expect, it } from "vitest";

import {
  Point,
  UndefinedMatcher,
  matchedUndefined,
  pointCoordinates,
} from "./k-183-symbol-hasinstance-narrowing.js";

describe("k-183 Symbol.hasInstance narrowing", () => {
  it("matches a plain structural point", () => {
    const value = { x: 3, y: 4 };
    expect(value instanceof Point).toBe(true);
    expect(pointCoordinates(value)).toEqual([3, 4]);
  });

  it("matches a constructed point and retains its runtime method", () => {
    const point = new Point(6, 8);
    expect(point instanceof Point).toBe(true);
    expect(point.distanceFromOrigin()).toBe(10);
  });

  it("rejects malformed point-like values", () => {
    expect(pointCoordinates({ x: 1, y: "2" })).toBeNull();
    expect(pointCoordinates(null)).toBeNull();
  });

  it("can customize instanceof to match a primitive", () => {
    expect((undefined as unknown) instanceof UndefinedMatcher).toBe(true);
    expect(matchedUndefined(undefined)).toBe(true);
  });

  it("rejects other values from the primitive matcher", () => {
    expect((null as unknown) instanceof UndefinedMatcher).toBe(false);
    expect(matchedUndefined("undefined")).toBe(false);
  });
});
