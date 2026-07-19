import { describe, expect, it } from "vitest";
import {
  captureConst,
  captureConstMutableArray,
  captureConstReadonlyArray,
  captureOrdinary,
  captureParts,
  defineRoutes,
} from "./k-013-const-type-parameters.js";

describe("k-013 const type parameters", () => {
  it("does not change identity behavior at runtime", () => {
    const value = { kind: "ready" };
    expect(captureOrdinary(value)).toBe(value);
    expect(captureConst(value)).toBe(value);
  });

  it("returns the same mutable array under either constraint", () => {
    const value = ["a", "b"];
    expect(captureConstMutableArray(value)).toBe(value);
    expect(captureConstReadonlyArray(value)).toBe(value);
  });

  it("captures rest arguments in their runtime order", () => {
    expect(captureParts("users", ":id", "settings")).toEqual(["users", ":id", "settings"]);
  });

  it("preserves the exact route object at runtime", () => {
    const routes = { home: { method: "GET", path: "/" } };
    expect(defineRoutes(routes)).toBe(routes);
  });

  it("does not freeze a value at runtime", () => {
    const value = { count: 1 };
    const captured = captureConst(value);
    captured.count = 2;
    expect(value.count).toBe(2);
  });
});
