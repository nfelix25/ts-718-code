import { describe, expect, it } from "vitest";

import {
  createDecoratedCalculator,
} from "./k-162-method-decorators.js";

function setup() {
  const log: string[] = [];
  const counter = { count: 0 };
  const bodyCalls = { count: 0 };
  const Calculator = createDecoratedCalculator(log, counter, bodyCalls);
  return { Calculator, log, counter, bodyCalls };
}

describe("k-162 method decorators", () => {
  it("preserves receiver, parameters, and result", () => {
    const { Calculator } = setup();
    expect(new Calculator(10).add(2, 3)).toBe(15);
  });

  it("wraps a method with argument and result logging", () => {
    const { Calculator, log } = setup();
    new Calculator(1).add(2, 3);
    expect(log.slice(-2)).toEqual([
      "call:add:args:[2,3]",
      "call:add:result:6",
    ]);
  });

  it("composes stacked wrappers", () => {
    const { Calculator, counter } = setup();
    const calculator = new Calculator(0);
    calculator.add(1, 2);
    calculator.add(3, 4);
    expect(counter.count).toBe(2);
  });

  it("memoizes independently per receiver", () => {
    const { Calculator, bodyCalls } = setup();
    const first = new Calculator(0);
    const second = new Calculator(0);
    expect([first.double(4), first.double(4), second.double(4)]).toEqual([8, 8, 8]);
    expect(bodyCalls.count).toBe(2);
  });

  it("reports static and private method context facts", () => {
    const { Calculator, log } = setup();
    expect(log).toContain("square:true:false");
    expect(log).toContain("#negate:false:true");
    expect(Calculator.square(3)).toBe(9);
    expect(new Calculator(0).negate(3)).toBe(-3);
  });
});
