import { describe, expect, it } from "vitest";
import {
  enumerableValues,
  getProperty,
  getTupleElement,
  pluck,
} from "./k-010-indexed-access-types.js";

describe("k-010 indexed access types", () => {
  it("reads the property selected by a related key", () => {
    expect(getProperty({ id: 1, name: "Ada" }, "name")).toBe("Ada");
  });

  it("returns undefined when reading an absent optional property", () => {
    expect(getProperty({ id: 1 } as { id: number; nickname?: string }, "nickname")).toBeUndefined();
  });

  it("plucks one property across a collection", () => {
    expect(pluck([{ id: 1 }, { id: 2 }], "id")).toEqual([1, 2]);
  });

  it("preserves ordinary tuple indexing behavior", () => {
    expect(getTupleElement(["ok", 200] as const, 1)).toBe(200);
  });

  it("collects enumerable record values", () => {
    expect(enumerableValues({ id: 1, active: true })).toEqual([1, true]);
  });
});
