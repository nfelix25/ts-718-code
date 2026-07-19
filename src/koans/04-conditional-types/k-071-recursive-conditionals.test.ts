import { describe, expect, it } from "vitest";

import {
  awaitDeep,
  characters,
  firstLeaf,
  flattenDeep,
} from "./k-071-recursive-conditionals.js";

describe("k-071 recursive conditional types", () => {
  it("flattens nested arrays recursively", () => {
    expect(flattenDeep([1, [2, [3, 4]], 5] as const)).toEqual([1, 2, 3, 4, 5]);
  });

  it("preserves heterogeneous leaf values", () => {
    expect(flattenDeep(["a", [1, [true]]] as const)).toEqual(["a", 1, true]);
  });

  it("handles the empty tuple base case", () => {
    expect(flattenDeep([] as const)).toEqual([]);
  });

  it("awaits a value through promise assimilation", async () => {
    await expect(awaitDeep(Promise.resolve("done"))).resolves.toBe("done");
  });

  it("decomposes a string and finds a nested first leaf", () => {
    expect(characters("type")).toEqual(["t", "y", "p", "e"]);
    expect(firstLeaf([["first"], "second"] as const)).toBe("first");
  });
});
