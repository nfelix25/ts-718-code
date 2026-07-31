import { describe, expect, it } from "vitest";
import {
  describeWordStep,
  drainIterator,
  firstSetValue,
  wordsThenCount,
} from "./k-194-strict-builtin-iterator-return.js";

describe("k-194: strict built-in iterator return", () => {
  it("returns undefined for an exhausted built-in iterator", () => {
    expect(firstSetValue(new Set())).toBeUndefined();
  });

  it("reads a yielded built-in value after checking done", () => {
    expect(firstSetValue(new Set(["type", "system"]))).toBe("type");
  });

  it("drains an iterator without appending its completion value", () => {
    expect(drainIterator(["a", "b"].values())).toEqual(["a", "b"]);
  });

  it("distinguishes yielded and returned generator values", () => {
    const iterator = wordsThenCount();
    expect(describeWordStep(iterator.next())).toBe("yielded:type");
    expect(describeWordStep(iterator.next())).toBe("yielded:system");
    expect(describeWordStep(iterator.next())).toBe("returned:2");
  });

  it("exposes done on the exhausted built-in result", () => {
    const iterator = [1].values();
    expect(iterator.next()).toEqual({ value: 1, done: false });
    expect(iterator.next()).toEqual({ value: undefined, done: true });
  });
});
