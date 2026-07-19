import { describe, expect, it } from "vitest";
import {
  assert,
  assertDefined,
  assertString,
  assertUser,
  parseUser,
} from "./k-032-assertion-functions.js";

describe("k-032 assertion functions", () => {
  it("continues for true conditions and throws for false ones", () => {
    expect(() => assert(true)).not.toThrow();
    expect(() => assert(false, "stop")).toThrow("stop");
  });

  it("asserts primitive types", () => {
    expect(() => assertString("text")).not.toThrow();
    expect(() => assertString(1)).toThrow("expected string");
  });

  it("asserts generic non-nullish values while preserving falsy data", () => {
    expect(() => assertDefined(0)).not.toThrow();
    expect(() => assertDefined(false)).not.toThrow();
    expect(() => assertDefined(undefined)).toThrow("expected value");
  });

  it("validates every field promised by a structural assertion", () => {
    expect(() => assertUser({ id: 1, name: "Ada" })).not.toThrow();
    expect(() => assertUser({ id: "1", name: "Ada" })).toThrow("numeric id");
  });

  it("uses the assertion to return validated unknown input", () => {
    expect(parseUser({ id: 2, name: "Grace" })).toEqual({ id: 2, name: "Grace" });
  });
});
