import { describe, expect, it } from "vitest";

import { invoke } from "./k-124-rebuild-returntype.js";

describe("k-124 rebuild ReturnType", () => {
  it("returns a synchronous function result", () => {
    expect(invoke((a: number, b: number) => a + b, 2, 3)).toBe(5);
  });

  it("preserves object result identity", () => {
    const result = { id: 1 };
    expect(invoke(() => result)).toBe(result);
  });

  it("supports void-returning functions", () => {
    const seen: string[] = [];
    expect(invoke((value: string) => { seen.push(value); }, "ready")).toBeUndefined();
    expect(seen).toEqual(["ready"]);
  });

  it("returns an async result without awaiting it", async () => {
    const result = invoke(async () => 42);
    expect(result).toBeInstanceOf(Promise);
    await expect(result).resolves.toBe(42);
  });

  it("propagates a thrown never-returning path", () => {
    expect(() => invoke((): never => { throw new Error("stop"); })).toThrow("stop");
  });
});
