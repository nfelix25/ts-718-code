import { describe, expect, it } from "vitest";
import {
  hasOwnKey,
  keyCategory,
  ownKeyCount,
  typedEnumerableKeys,
} from "./k-009-keyof-semantics.js";

describe("k-009 keyof semantics", () => {
  it("returns enumerable string keys from an ordinary record", () => {
    expect(typedEnumerableKeys({ id: 1, active: true })).toEqual(["id", "active"]);
  });

  it("uses an own-property check for a runtime key guard", () => {
    const value = { id: 1 };
    expect(hasOwnKey(value, "id")).toBe(true);
    expect(hasOwnKey(value, "toString")).toBe(false);
  });

  it("recognizes owned symbol keys even though Object.keys omits them", () => {
    const token = Symbol("token");
    const value = { [token]: 1, visible: true };
    expect(hasOwnKey(value, token)).toBe(true);
    expect(typedEnumerableKeys(value)).toEqual(["visible"]);
  });

  it("classifies all three JavaScript property-key categories", () => {
    expect([keyCategory("id"), keyCategory(0), keyCategory(Symbol("id"))]).toEqual([
      "string",
      "number",
      "symbol",
    ]);
  });

  it("uses Reflect.ownKeys when symbols and non-enumerable keys must count", () => {
    const value = Object.defineProperty({ [Symbol("s")]: 1 }, "hidden", { value: 2 });
    expect(ownKeyCount(value)).toBe(2);
  });
});
