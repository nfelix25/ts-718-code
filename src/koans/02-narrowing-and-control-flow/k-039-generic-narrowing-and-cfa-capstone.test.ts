import { describe, expect, it } from "vitest";
import {
  compact,
  formatField,
  mapPresent,
  stringify,
  unwrap,
} from "./k-039-generic-narrowing-and-cfa-capstone.js";

describe("k-039 generic narrowing and CFA capstone", () => {
  it("uses primitive guards inside a generic implementation", () => {
    expect(stringify("go")).toBe("GO");
    expect(stringify(12)).toBe("12");
  });
  it("unwraps generic discriminated results", () => {
    expect(unwrap({ ok: true, value: { id: 1 } })).toEqual({ id: 1 });
    expect(() => unwrap({ ok: false, error: new Error("no") })).toThrow("no");
  });
  it("preserves every generic non-nullish member", () => {
    expect(compact([0, null, false, undefined, ""])).toEqual([0, false, ""]);
  });
  it("retains tuple key/value correlation", () => {
    expect(formatField("name", "ada")).toBe("ADA");
    expect(formatField("count", 3)).toBe("3");
  });
  it("maps only present generic values", () => {
    expect(mapPresent("x", value => value.length)).toBe(1);
    expect(mapPresent(null, () => 1)).toBeUndefined();
  });
});
