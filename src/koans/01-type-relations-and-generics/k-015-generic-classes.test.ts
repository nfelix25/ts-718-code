import { describe, expect, it } from "vitest";
import { Box, Pair, Registry, Stack } from "./k-015-generic-classes.js";

describe("k-015 generic classes", () => {
  it("gets, sets, and maps one instance element type", () => {
    const box = new Box(1);
    box.set(2);
    expect(box.get()).toBe(2);
    expect(box.map(String).get()).toBe("2");
  });

  it("swaps both runtime pair positions", () => {
    expect(new Pair(1, "one").swap()).toEqual({ left: "one", right: 1 });
  });

  it("pushes and pops stack values", () => {
    const stack = new Stack<number>();
    stack.push(1);
    stack.push(2);
    expect(stack.pop()).toBe(2);
    expect(stack.toArray()).toEqual([1]);
  });

  it("stores registry entries and returns this for chaining", () => {
    const registry = new Registry<string, number>();
    expect(registry.set("count", 1)).toBe(registry);
    expect(registry.get("count")).toBe(1);
  });

  it("uses an independently generic static factory", () => {
    expect(Box.of("ready").get()).toBe("ready");
  });
});
