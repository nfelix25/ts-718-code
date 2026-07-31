import { describe, expect, it } from "vitest";

import {
  type ArrayLambda,
  arrayFunctor,
  type BoxLambda,
  boxFunctor,
  mapTwice,
  nullableFunctor,
} from "./k-158-higher-kinded-type-emulation.js";

describe("k-158 higher-kinded type emulation", () => {
  it("maps an array through one emulated constructor", () => {
    expect(arrayFunctor.map([1, 2, 3], (value) => String(value)))
      .toEqual(["1", "2", "3"]);
  });

  it("maps a boxed value without changing its container", () => {
    expect(boxFunctor.map({ value: 4 }, (value) => value * 2))
      .toEqual({ value: 8 });
  });

  it("maps a present nullable value", () => {
    expect(nullableFunctor.map("ts", (value) => value.toUpperCase())).toBe("TS");
  });

  it("does not invoke a nullable transform for null", () => {
    let calls = 0;
    const result = nullableFunctor.map(null as string | null, (value) => {
      calls += 1;
      return value.length;
    });
    expect(result).toBeNull();
    expect(calls).toBe(0);
  });

  it("composes two maps for any encoded functor", () => {
    expect(mapTwice<ArrayLambda, number, number, string>(
      arrayFunctor,
      [2, 3],
      (value) => value * 10,
      String,
    ))
      .toEqual(["20", "30"]);
    expect(mapTwice<BoxLambda, number, number, number>(
      boxFunctor,
      { value: 2 },
      (value) => value + 1,
      (value) => value ** 2,
    ))
      .toEqual({ value: 9 });
  });
});
