import { describe, expect, it } from "vitest";
import {
  arrayAndFallback,
  chooseLiteral,
  fromFactories,
  mergeIdentified,
  samePair,
} from "./k-017-multiple-inference-candidates.js";

describe("k-017 multiple inference candidates", () => {
  it("returns one of two constrained literal candidates", () => {
    expect(["a", "b"]).toContain(chooseLiteral("a", "b"));
  });

  it("retains both runtime values in a same-type pair", () => {
    expect(samePair(1, 2)).toEqual([1, 2]);
  });

  it("evaluates every candidate factory", () => {
    expect(fromFactories(() => 1, () => 2)).toEqual([1, 2]);
  });

  it("uses an array element before its fallback", () => {
    expect(arrayAndFallback([1, 2], 0)).toBe(1);
    expect(arrayAndFallback([], 0)).toBe(0);
  });

  it("returns both identified runtime records", () => {
    expect(mergeIdentified({ id: "a" }, { id: "b" })).toEqual([{ id: "a" }, { id: "b" }]);
  });
});
