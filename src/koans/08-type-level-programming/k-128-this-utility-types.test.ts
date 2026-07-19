import { describe, expect, it } from "vitest";

import { bindReceiver, defineObject } from "./k-128-this-utility-types.js";

describe("k-128 this utility types", () => {
  it("binds an explicit receiver and removes it from calls", () => {
    function format(this: { prefix: string }, value: number) { return `${this.prefix}${value}`; }
    const bound = bindReceiver(format, { prefix: "#" });
    expect(bound(42)).toBe("#42");
  });

  it("preserves optional and rest parameters after binding", () => {
    function join(this: { separator: string }, head: string, ...tail: string[]) {
      return [head, ...tail].join(this.separator);
    }
    expect(bindReceiver(join, { separator: ":" })("a", "b", "c")).toBe("a:b:c");
  });

  it("gives object-literal methods a contextual this type", () => {
    const point = defineObject({
      data: { x: 1, y: 2 },
      methods: { move(dx: number, dy: number) { this.x += dx; this.y += dy; } },
    });
    point.move(2, 3);
    expect(point).toMatchObject({ x: 3, y: 5 });
  });

  it("lets contextual methods call sibling methods", () => {
    const counter = defineObject({
      data: { value: 1 },
      methods: {
        increment() { this.value += 1; },
        incrementTwice() { this.increment(); this.increment(); },
      },
    });
    counter.incrementTwice();
    expect(counter.value).toBe(3);
  });

  it("returns a new combined object", () => {
    const data = { value: 1 };
    const result = defineObject({ data, methods: { read() { return this.value; } } });
    expect(result).not.toBe(data);
    expect(result.read()).toBe(1);
  });
});
