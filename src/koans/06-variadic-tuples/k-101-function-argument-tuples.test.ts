import { describe, expect, it } from "vitest";

import { bindFirst, bindLast, invoke, withTrace } from "./k-101-function-argument-tuples.js";

describe("k-101 function argument tuples", () => {
  const format = (prefix: string, value: number, suffix: string) => `${prefix}${value}${suffix}`;

  it("invokes a function from its argument tuple", () => {
    expect(invoke(format, ["#", 7, "!"])).toBe("#7!");
  });

  it("binds the required first position", () => {
    expect(bindFirst(format, "#")(7, "!")).toBe("#7!");
  });

  it("binds the required final position", () => {
    expect(bindLast(format, "!")("#", 7)).toBe("#7!");
  });

  it("prepends tracing context without forwarding it", () => {
    const traced = withTrace((left: number, right: number) => left + right);
    expect(traced("trace-1", 2, 3)).toBe(5);
  });

  it("preserves optional argument omission", () => {
    const greet = bindFirst((greeting: string, name = "world") => `${greeting}, ${name}`, "hello");
    expect(greet()).toBe("hello, world");
  });
});
