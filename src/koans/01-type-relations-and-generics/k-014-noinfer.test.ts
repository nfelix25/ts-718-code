import { describe, expect, it } from "vitest";
import {
  checkedDefault,
  createMachine,
  looseDefault,
  mapWithFallback,
  preferPrimary,
} from "./k-014-noinfer.js";

describe("k-014 NoInfer", () => {
  it("uses a member fallback when it belongs to the choices", () => {
    expect(checkedDefault(["red", "green"] as const, "green")).toBe("green");
  });

  it("has the same runtime fallback behavior without NoInfer", () => {
    expect(looseDefault(["red", "green"] as const, "blue")).toBe("red");
  });

  it("returns the primary runtime value", () => {
    expect(preferPrimary(1 as number, 2)).toBe(1);
  });

  it("uses a mapped result when the callback succeeds", () => {
    expect(mapWithFallback("42", Number, 0)).toBe(42);
  });

  it("returns the configured initial machine state", () => {
    expect(createMachine({ states: ["idle", "running"] as const, initial: "running" })).toBe("running");
  });
});
