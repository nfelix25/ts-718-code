import { describe, expect, it } from "vitest";

import {
  isIdentified,
  isStringRecord,
  publicEntity,
} from "./k-056-structural-assignability-in-conditionals.js";

describe("k-056 structural assignability in conditionals", () => {
  it("recognizes objects with PropertyKey identifiers", () => {
    expect(isIdentified({ id: 1, extra: true })).toBe(true);
    expect(isIdentified({ id: Symbol("id") })).toBe(true);
  });

  it("rejects missing and invalid identifiers", () => {
    expect(isIdentified({ name: "Ada" })).toBe(false);
    expect(isIdentified({ id: {} })).toBe(false);
  });

  it("projects a wider entity to its public structural view", () => {
    expect(publicEntity({ id: 1, name: "Ada", secret: "hidden" })).toEqual({ id: 1, name: "Ada" });
  });

  it("accepts an open record whose values are all strings", () => {
    expect(isStringRecord({ first: "Ada", last: "Lovelace" })).toBe(true);
  });

  it("rejects an open record with an incompatible value", () => {
    expect(isStringRecord({ name: "Ada", age: 36 })).toBe(false);
  });
});
