import { describe, expect, it } from "vitest";

import {
  appendRuntime,
  collectValues,
  describePoint,
  prependRuntime,
} from "./k-175-tuple-label-relaxation.js";

describe("k-175 tuple label relaxation", () => {
  it("destructures mixed labeled and unlabeled fixed positions", () => {
    expect(describePoint(3, 4)).toBe("point(3,4)");
    expect(describePoint(3, 4, "origin")).toBe("origin(3,4)");
  });

  it("accepts an unlabeled rest after labeled and unlabeled heads", () => {
    expect(collectValues("a", "b", "c", "d")).toEqual([
      "a",
      "b",
      "c",
      "d",
    ]);
  });

  it("prepends without changing the tail's runtime order", () => {
    expect(prependRuntime(true, ["Ada", 36] as const)).toEqual([
      true,
      "Ada",
      36,
    ]);
  });

  it("appends without changing the prefix's runtime order", () => {
    expect(appendRuntime(["Ada", 36] as const, "active")).toEqual([
      "Ada",
      36,
      "active",
    ]);
  });

  it("confirms labels have no runtime representation", () => {
    const labeled: [name: string, count: number] = ["items", 2];
    expect(Object.keys(labeled)).toEqual(["0", "1"]);
    expect("name" in labeled).toBe(false);
  });
});
