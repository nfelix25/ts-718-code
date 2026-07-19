import { describe, expect, it } from "vitest";

import {
  callBoth,
  callThree,
  callTuple,
} from "./k-069-contravariant-inference-candidates.js";

describe("k-069 contravariant inference candidates", () => {
  it("passes an overlapping literal to both consumers", () => {
    const handlers = {
      left: (value: 1 | 2) => value + 10,
      right: (value: 2 | 3) => value * 2,
    };
    expect(callBoth(handlers, 2)).toEqual([12, 4]);
  });

  it("uses the narrower string accepted by both consumers", () => {
    const handlers = {
      left: (value: string) => value.length,
      right: (value: "ok") => value.toUpperCase(),
    };
    expect(callBoth(handlers, "ok")).toEqual([2, "OK"]);
  });

  it("requires all structural fields", () => {
    const handlers = {
      left: (value: { id: number }) => value.id,
      right: (value: { name: string }) => value.name,
    };
    expect(callBoth(handlers, { id: 1, name: "Ada" })).toEqual([1, "Ada"]);
  });

  it("works for tuple-held consumers", () => {
    const handlers = [
      (value: number) => value + 1,
      (value: 2) => value * 3,
    ] as const;
    expect(callTuple(handlers, 2)).toEqual([3, 6]);
  });

  it("intersects three accepted literal sets", () => {
    const handlers = {
      first: (value: 1 | 2 | 3) => value,
      second: (value: 2 | 3 | 4) => value,
      third: (value: 3 | 4 | 5) => value,
    };
    expect(callThree(handlers, 3)).toEqual([3, 3, 3]);
  });
});
