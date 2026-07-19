import { describe, expect, it } from "vitest";

import {
  headAndTail,
  invokeShape,
  resolvePair,
  splitPair,
} from "./k-066-multiple-and-nested-infer.js";

describe("k-066 multiple and nested infer", () => {
  it("splits a heterogeneous pair", () => {
    expect(splitPair(["age", 42] as const)).toEqual({ left: "age", right: 42 });
  });

  it("preserves object identity in either pair slot", () => {
    const value = { id: 1 };
    expect(splitPair([value, "kept"] as const).left).toBe(value);
  });

  it("separates a tuple head from its tail", () => {
    expect(headAndTail(["command", 1, true] as const)).toEqual(["command", [1, true]]);
  });

  it("resolves both nested pair positions", async () => {
    await expect(resolvePair(Promise.resolve(["ok", 200] as const))).resolves.toEqual(["ok", 200]);
  });

  it("invokes a function through its captured signature", () => {
    expect(invokeShape((name: string, count: number) => name.repeat(count), "ts", 2)).toBe("tsts");
  });
});
