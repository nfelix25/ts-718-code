import { describe, expect, it } from "vitest";

import {
  allMatch,
  describeAll,
  filterTruthy,
  findFirst,
  findPrologue,
  hasMatch,
  totalPrintedLength,
} from "./k-176-methods-on-array-unions.js";

describe("k-176 methods on unions of arrays", () => {
  it("filters either member of an array union", () => {
    expect(filterTruthy(["", "Ada", "Grace"])).toEqual(["Ada", "Grace"]);
    expect(filterTruthy([0, 2, 3])).toEqual([2, 3]);
  });

  it("finds and tests through a combined callback parameter", () => {
    expect(findFirst(["a", "long"], (value) => String(value).length > 1)).toBe("long");
    expect(hasMatch([1, 4, 9], (value) => Number(value) > 5)).toBe(true);
  });

  it("supports readonly inputs for non-mutating methods", () => {
    expect(allMatch(["a", "b"] as const, (value) => typeof value === "string")).toBe(true);
    expect(describeAll([2, 3] as const)).toEqual(["number:2", "number:3"]);
  });

  it("reduces a union of arrays with an explicit accumulator", () => {
    expect(totalPrintedLength(["TS", "5.2"])).toBe(5);
    expect(totalPrintedLength([10, 200])).toBe(5);
  });

  it("finds a chapter through a union of chapter arrays", () => {
    expect(findPrologue({
      kind: "comic",
      chapters: [
        { type: "prologue", pages: 4 },
        { type: "chapter", pages: 20 },
      ],
    })).toEqual({ type: "prologue", pages: 4 });
  });
});
