import { describe, expect, it } from "vitest";
import {
  boxItems,
  mutableItems,
  presentItems,
  stringifyItems,
} from "./k-044-mapping-arrays-and-tuples.js";

describe("k-044 mapping arrays and tuples", () => {
  it("maps array elements to strings", () => {
    expect(stringifyItems([1, 2, 3])).toEqual(["1", "2", "3"]);
  });
  it("preserves tuple order at runtime", () => {
    expect(stringifyItems(["Ada", 3, true] as const)).toEqual(["Ada", "3", "true"]);
  });
  it("boxes each tuple position", () => {
    expect(boxItems(["x", 1] as const)).toEqual([{ value: "x" }, { value: 1 }]);
  });
  it("copies readonly inputs into mutable arrays", () => {
    const source = ["a", 1] as const;
    const copy = mutableItems(source);
    expect(copy).toEqual(source);
    expect(copy).not.toBe(source);
  });
  it("filters absent array elements", () => {
    expect(presentItems(["a", undefined, "b"])).toEqual(["a", "b"]);
  });
});
