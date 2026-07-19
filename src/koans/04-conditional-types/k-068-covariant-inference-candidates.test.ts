import { describe, expect, it } from "vitest";

import {
  collectPromises,
  collectProperties,
  collectReturns,
  collectTuple,
} from "./k-068-covariant-inference-candidates.js";

describe("k-068 covariant inference candidates", () => {
  it("collects heterogeneous property values", () => {
    expect(collectProperties({ left: "id", right: 7 } as const)).toEqual(["id", 7]);
  });

  it("collects both tuple positions", () => {
    expect(collectTuple([true, "ready"] as const)).toEqual([true, "ready"]);
  });

  it("preserves duplicate runtime values", () => {
    expect(collectTuple([1, 1] as const)).toEqual([1, 1]);
  });

  it("collects values produced by two functions", () => {
    expect(collectReturns({ left: () => "ok", right: () => 200 })).toEqual(["ok", 200]);
  });

  it("collects two promise fulfillment values", async () => {
    await expect(collectPromises([Promise.resolve("ok"), Promise.resolve(200)] as const))
      .resolves.toEqual(["ok", 200]);
  });
});
