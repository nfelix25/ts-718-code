import { describe, expect, it } from "vitest";

import {
  bindFirst,
  construct,
  invoke,
} from "./k-065-function-type-inference.js";

describe("k-065 function-type inference", () => {
  it("invokes a zero-argument function", () => {
    expect(invoke(() => "ready")).toBe("ready");
  });

  it("preserves an inferred argument tuple", () => {
    expect(invoke((left: number, right: number) => left + right, 4, 5)).toBe(9);
  });

  it("supports optional parameters", () => {
    const greet = (name: string, punctuation = "!") => `${name}${punctuation}`;
    expect(invoke(greet, "Ada")).toBe("Ada!");
    expect(invoke(greet, "Ada", ".")).toBe("Ada.");
  });

  it("binds only the first parameter", () => {
    const addFromTen = bindFirst((left: number, right: number) => left + right, 10);
    expect(addFromTen(7)).toBe(17);
  });

  it("constructs an instance from inferred constructor arguments", () => {
    class Point {
      constructor(readonly x: number, readonly y: number) {}
    }

    expect(construct(Point, 2, 3)).toEqual({ x: 2, y: 3 });
  });
});
