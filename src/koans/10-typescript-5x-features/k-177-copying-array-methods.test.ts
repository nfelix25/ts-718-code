import { describe, expect, it } from "vitest";

import {
  replaceCopy,
  reverseCopy,
  sortCopy,
  spliceCopy,
} from "./k-177-copying-array-methods.js";

describe("k-177 copying array methods", () => {
  it("reverses without changing the source", () => {
    const source = [1, 2, 3] as const;
    expect(reverseCopy(source)).toEqual([3, 2, 1]);
    expect(source).toEqual([1, 2, 3]);
  });

  it("sorts into a new array", () => {
    const source = [10, 2, 5] as const;
    expect(sortCopy(source, (left, right) => left - right)).toEqual([2, 5, 10]);
    expect(source).toEqual([10, 2, 5]);
  });

  it("splices a copy while preserving the original", () => {
    const source: readonly string[] = ["a", "b", "c"];
    expect(spliceCopy(source, 1, 1, "x", "y")).toEqual(["a", "x", "y", "c"]);
    expect(source).toEqual(["a", "b", "c"]);
  });

  it("replaces one copied index", () => {
    const source = ["draft", "draft"] as const;
    expect(replaceCopy(source, -1, "published")).toEqual(["draft", "published"]);
    expect(source).toEqual(["draft", "draft"]);
  });

  it("copies shallowly rather than cloning elements", () => {
    const item = { id: 1 };
    const result = reverseCopy([item] as const);
    expect(result).not.toBe([item]);
    expect(result[0]).toBe(item);
  });
});
