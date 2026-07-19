import { describe, expect, it } from "vitest";

import {
  Coordinate,
  applyFormatter,
  labelOf,
  magnitudeSquared,
  summarizeAccount,
  translate,
} from "./k-001-structural-assignability.js";

describe("k-001 structural assignability", () => {
  it("accepts a richer object through a smaller parameter contract", () => {
    const profile = { label: "Ada", role: "admin" };
    expect(labelOf(profile)).toBe("Ada");
  });

  it("returns only the shape promised by the function", () => {
    expect(translate({ x: 2, y: 3 }, 5, -1)).toEqual({ x: 7, y: 2 });
  });

  it("ignores unrelated source properties", () => {
    const account = { id: "acct-1", active: false, internalScore: 99 };
    expect(summarizeAccount(account)).toEqual({
      id: "acct-1",
      status: "inactive",
    });
  });

  it("accepts a class instance without an implements clause", () => {
    expect(magnitudeSquared(new Coordinate(3, 4, "point"))).toBe(25);
  });

  it("accepts independently declared method-bearing objects", () => {
    const formatter = {
      format(value: string) {
        return `[${value}]`;
      },
      debug: true,
    };
    expect(applyFormatter(formatter, "ok")).toBe("[ok]");
  });

  it("reads readonly data through a non-mutating structural contract", () => {
    const point = { x: 6, y: 8 } as const;
    expect(magnitudeSquared(point)).toBe(100);
  });
});
