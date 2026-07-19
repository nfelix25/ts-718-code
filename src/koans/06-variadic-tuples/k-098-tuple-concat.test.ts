import { describe, expect, it } from "vitest";

import { concat, concatMany, concatReadonly } from "./k-098-tuple-concat.js";

describe("k-098 tuple concat", () => {
  it("uses the empty tuple as a left identity", () => {
    expect(concat([], [1, 2] as const)).toEqual([1, 2]);
  });

  it("uses the empty tuple as a right identity", () => {
    expect(concat([1, 2] as const, [])).toEqual([1, 2]);
  });

  it("preserves finite operand order", () => {
    expect(concat([1, "a"] as const, [true, 2] as const)).toEqual([1, "a", true, 2]);
  });

  it("flattens many chunks in order", () => {
    expect(concatMany([1] as const, [] as const, [2, 3] as const)).toEqual([1, 2, 3]);
  });

  it("returns the same runtime representation for a readonly view", () => {
    expect(concatReadonly([1] as const, [2] as const)).toEqual([1, 2]);
  });
});
