import { describe, expect, it } from "vitest";
import {
  compact,
  isDefined,
  isString,
  isSuccess,
  onlyStrings,
} from "./k-033-inferred-type-predicates.js";

describe("k-033 inferred type predicates", () => {
  it("infers a primitive guard from typeof", () => {
    expect(isString("text")).toBe(true);
    expect(isString(1)).toBe(false);
  });

  it("infers a generic undefined guard", () => {
    expect([0, undefined, false, ""].filter(isDefined)).toEqual([0, false, ""]);
  });

  it("infers a discriminant guard", () => {
    expect(isSuccess({ ok: true, value: "saved" })).toBe(true);
    expect(isSuccess({ ok: false, error: new Error("no") })).toBe(false);
  });

  it("narrows through an inline filter callback", () => {
    expect(onlyStrings(["a", 1, "b", null])).toEqual(["a", "b"]);
  });

  it("removes both nullish members generically", () => {
    expect(compact([0, null, false, undefined, ""])).toEqual([0, false, ""]);
  });
});
