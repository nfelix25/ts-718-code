import { describe, expect, it } from "vitest";

import {
  duplicate,
  first,
  fromFactory,
  identity,
  makeBox,
  makePair,
  mapValue,
} from "./k-005-generic-function-inference.js";

describe("k-005 generic function inference", () => {
  it("returns the same runtime value through identity", () => {
    const value = { id: "a" };
    expect(identity(value)).toBe(value);
  });

  it("substitutes an inferred value into wrapper shapes", () => {
    expect(makeBox("inside")).toEqual({ value: "inside" });
    expect(duplicate(3)).toEqual([3, 3]);
  });

  it("preserves two independent runtime inputs", () => {
    expect(makePair("left", 1)).toEqual(["left", 1]);
  });

  it("returns the first element or undefined", () => {
    expect(first(["a", "b"])).toBe("a");
    expect(first([])).toBeUndefined();
  });

  it("relates callback input and output", () => {
    expect(mapValue("koan", (value) => value.length)).toBe(4);
  });

  it("infers a value produced by a factory", () => {
    expect(fromFactory(() => ({ ready: true }))).toEqual({ ready: true });
  });
});
