import { describe, expect, it } from "vitest";

import { callWithTuple } from "./k-125-rebuild-parameters.js";

describe("k-125 rebuild Parameters", () => {
  it("calls a zero-argument function", () => {
    expect(callWithTuple(() => "ready", [])).toBe("ready");
  });

  it("forwards a fixed argument tuple", () => {
    expect(callWithTuple((name: string, count: number) => `${name}:${count}`, ["items", 3])).toBe("items:3");
  });

  it("forwards an omitted optional argument", () => {
    expect(callWithTuple((value = "default") => value, [])).toBe("default");
  });

  it("forwards a rest argument tuple", () => {
    expect(callWithTuple((...values: number[]) => values.reduce((sum, value) => sum + value, 0), [1, 2, 3])).toBe(6);
  });

  it("returns async results without awaiting them", async () => {
    const result = callWithTuple(async (value: number) => value * 2, [21]);
    await expect(result).resolves.toBe(42);
  });
});
