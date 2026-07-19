import { describe, expect, it } from "vitest";
import {
  chooseValue,
  lastDefined,
  normalizeToken,
  parseOrKeep,
  requireValue,
} from "./k-028-assignment-and-reachability.js";

describe("k-028 assignment and reachability", () => {
  it("replaces a string branch with a numeric observation", () => {
    expect(parseOrKeep("12")).toBe(12);
    expect(parseOrKeep(7)).toBe(7);
  });

  it("joins assignments from both branches", () => {
    expect(chooseValue(true)).toBe("chosen");
    expect(chooseValue(false)).toBe(42);
  });

  it("uses throwing reachability to enforce presence", () => {
    expect(requireValue("ready")).toBe("ready");
    expect(() => requireValue(null)).toThrow("missing value");
  });

  it("retains the last value from reachable loop iterations", () => {
    expect(lastDefined([undefined, "a", undefined, "b"])).toBe("b");
    expect(lastDefined([])).toBeUndefined();
  });

  it("returns from mutually exclusive narrowed paths", () => {
    expect(normalizeToken(null)).toBe("missing");
    expect(normalizeToken(12)).toBe("12");
    expect(normalizeToken("go")).toBe("GO");
  });
});
