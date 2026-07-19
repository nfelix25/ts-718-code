import { describe, expect, it } from "vitest";

import {
  call,
  first,
  getId,
  promiseValue,
} from "./k-064-infer-basics.js";

describe("k-064 infer basics", () => {
  it("returns the first tuple element", () => {
    expect(first(["a", 1] as const)).toBe("a");
    expect(first([] as const)).toBeUndefined();
  });

  it("calls a function with its captured parameter and return contract", () => {
    expect(call((a: number, b: number) => a + b, 2, 3)).toBe(5);
  });

  it("returns a structurally captured identifier", () => {
    expect(getId({ id: 7 as const, name: "Ada" })).toBe(7);
  });

  it("extracts a promise fulfillment value", async () => {
    await expect(promiseValue(Promise.resolve("done"))).resolves.toBe("done");
  });

  it("preserves object identity through a promise", async () => {
    const value = { id: 1 };
    await expect(promiseValue(Promise.resolve(value))).resolves.toBe(value);
  });
});
