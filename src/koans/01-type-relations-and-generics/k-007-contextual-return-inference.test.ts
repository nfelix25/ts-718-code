import { describe, expect, it } from "vitest";
import {
  defer,
  emptyList,
  produce,
  promiseFrom,
  transform,
} from "./k-007-contextual-return-inference.js";

describe("k-007 contextual and return inference", () => {
  it("infers values from callback returns", () => {
    expect(produce(() => ({ id: "a" }))).toEqual({ id: "a" });
  });

  it("infers independent mapper output", () => {
    expect(transform("koan", (value) => value.length)).toBe(4);
  });

  it("defers a typed result", () => {
    expect(defer(() => "later")()).toBe("later");
  });

  it("creates an empty list regardless of contextual element type", () => {
    const values: number[] = emptyList();
    expect(values).toEqual([]);
  });

  it("wraps inferred output in a promise", async () => {
    await expect(promiseFrom(() => ({ ready: true }))).resolves.toEqual({ ready: true });
  });
});
