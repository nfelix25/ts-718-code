import { describe, expect, it } from "vitest";

import { allTuple, boxTuple, mapTuple } from "./k-102-tuple-shape-preservation.js";

describe("k-102 tuple shape preservation", () => {
  it("boxes each finite position", () => {
    expect(boxTuple([1, "a", true] as const)).toEqual([{ value: 1 }, { value: "a" }, { value: true }]);
  });

  it("preserves empty tuple cardinality", () => {
    expect(boxTuple([] as const)).toEqual([]);
  });

  it("awaits heterogeneous tuple positions", async () => {
    await expect(allTuple([Promise.resolve(1), "ready", Promise.resolve(true)] as const)).resolves.toEqual([1, "ready", true]);
  });

  it("maps every position without changing length", () => {
    expect(mapTuple([1, 2, 3] as const, (value) => value * 2)).toEqual([2, 4, 6]);
  });

  it("passes the runtime index to the mapper", () => {
    expect(mapTuple(["a", "b"] as const, (value, index) => `${index}:${value}`)).toEqual(["0:a", "1:b"]);
  });
});
