import { describe, expect, it } from "vitest";
import { cloneIdentity, makeFlags, valuesFor } from "./k-040-mapped-types-and-propertykey.js";

describe("k-040 mapped types and PropertyKey", () => {
  it("constructs flags for exact literal keys", () => {
    expect(makeFlags(["read", "write"] as const)).toEqual({ read: false, write: false });
  });
  it("supports numeric property keys", () => {
    expect(makeFlags([0, 1] as const)).toEqual({ 0: false, 1: false });
  });
  it("supports symbol property keys", () => {
    const token = Symbol("token");
    expect(makeFlags([token] as const)[token]).toBe(false);
  });
  it("clones every own enumerable property", () => {
    const source = { id: 1, name: "Ada" };
    expect(cloneIdentity(source)).toEqual(source);
    expect(cloneIdentity(source)).not.toBe(source);
  });
  it("reads values correlated with selected keys", () => {
    expect(valuesFor({ id: 1, name: "Ada" }, ["name", "id"])).toEqual(["Ada", 1]);
  });
});
