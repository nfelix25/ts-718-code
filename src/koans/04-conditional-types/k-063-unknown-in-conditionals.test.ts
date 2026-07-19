import { describe, expect, it } from "vitest";

import {
  parseUser,
  safeOwnKeys,
  safeUpper,
} from "./k-063-unknown-in-conditionals.js";

describe("k-063 unknown in conditionals", () => {
  it("parses a structurally valid unknown user", () => {
    expect(parseUser({ id: 1, name: "Ada", extra: true })).toEqual({ id: 1, name: "Ada" });
  });

  it("rejects invalid unknown user shapes", () => {
    expect(parseUser({ id: "1", name: "Ada" })).toBeUndefined();
    expect(parseUser(null)).toBeUndefined();
  });

  it("narrows unknown before string behavior", () => {
    expect(safeUpper("hello")).toBe("HELLO");
    expect(safeUpper(3)).toBeUndefined();
  });

  it("reflects keys only after validating object-ness", () => {
    expect(safeOwnKeys({ id: 1 })).toEqual(["id"]);
    expect(safeOwnKeys("text")).toEqual([]);
  });

  it("preserves symbol keys after object validation", () => {
    const token = Symbol("token");
    expect(safeOwnKeys({ [token]: true })).toEqual([token]);
  });
});
