import { describe, expect, it } from "vitest";

import {
  fail,
  formatPrimitive,
  isRecord,
  parseJson,
  readStringField,
  safeUpper,
  unsafeUpper,
} from "./k-002-any-unknown-never.js";

describe("k-002 any, unknown, and never", () => {
  it("contains JSON.parse's any at an unknown boundary", () => {
    expect(parseJson('{"name":"Ada"}')).toEqual({ name: "Ada" });
  });

  it("recognizes non-null, non-array records", () => {
    expect(isRecord({ value: 1 })).toBe(true);
    expect(isRecord(null)).toBe(false);
    expect(isRecord([1, 2])).toBe(false);
  });

  it("reads a string only after checking unknown input", () => {
    expect(readStringField({ name: "Ada" }, "name")).toBe("Ada");
    expect(readStringField({ name: 42 }, "name")).toBeUndefined();
    expect(readStringField("not an object", "name")).toBeUndefined();
  });

  it("narrows unknown before calling a string method", () => {
    expect(safeUpper("careful")).toBe("CAREFUL");
    expect(safeUpper(42)).toBeUndefined();
  });

  it("shows that any can hide a real runtime failure", () => {
    expect(unsafeUpper("unchecked")).toBe("UNCHECKED");
    expect(() => unsafeUpper(42 as any)).toThrow(TypeError);
  });

  it("anchors a never-returning path as an exception", () => {
    expect(() => fail("stopped")).toThrow("stopped");
  });

  it("formats a narrowed union through ordinary runtime checks", () => {
    expect(formatPrimitive("koan")).toBe("KOAN");
    expect(formatPrimitive(3)).toBe("3.00");
  });
});
