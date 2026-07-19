import { describe, expect, it } from "vitest";
import {
  inspectPair,
  pipeThree,
  produceAndConsume,
  visitArgs,
  zipWith,
} from "./k-019-contextual-positional-inference.js";

describe("k-019 contextual positional inference", () => {
  it("passes tuple positions to their contextual callback parameters", () => {
    expect(inspectPair([1, "a"] as const, (number, text) => `${number}:${text}`)).toBe("1:a");
  });

  it("zips collections through the shorter runtime length", () => {
    expect(zipWith([1, 2], ["a"], (number, text) => `${number}:${text}`)).toEqual(["1:a"]);
  });

  it("feeds each pipeline result into the next stage", () => {
    expect(pipeThree(2, (value) => value * 3, String)).toBe("6");
  });

  it("produces before consuming an object-literal value", () => {
    expect(produceAndConsume({ produce: () => ({ id: 1 }), consume: (value) => value.id })).toBe(1);
  });

  it("spreads a tuple into matching callback positions", () => {
    expect(visitArgs([1, "a"] as const, (number, text) => `${text}${number}`)).toBe("a1");
  });
});
