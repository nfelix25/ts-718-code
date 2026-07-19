import { describe, expect, it } from "vitest";

import { curryN, partial } from "./k-130-curry-and-partial-application.js";

describe("k-130 curry and partial application", () => {
  it("curries a fixed three-argument function", () => {
    const curried = curryN((a: number, b: number, c: number) => a + b + c);
    expect(curried(1)(2)(3)).toBe(6);
  });

  it("evaluates a zero-argument function immediately", () => {
    expect(curryN(() => "ready")).toBe("ready");
  });

  it("partially binds a valid prefix", () => {
    const format = (name: string, count: number, active: boolean) => `${name}:${count}:${active}`;
    expect(partial(format, "items", 3)(true)).toBe("items:3:true");
  });

  it("supports an empty partial prefix", () => {
    const add = (a: number, b: number) => a + b;
    expect(partial(add)(2, 3)).toBe(5);
  });

  it("uses explicit arity for runtime rest functions", () => {
    const sum = (...values: number[]) => values.reduce((total, value) => total + value, 0);
    const curried = curryN(sum, 3) as unknown as (a: number) => (b: number) => (c: number) => number;
    expect(curried(1)(2)(3)).toBe(6);
  });
});
