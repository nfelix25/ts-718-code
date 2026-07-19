import { describe, expect, it } from "vitest";

import {
  attachAudit,
  commonValues,
  describeAccess,
  normalizeId,
  resourceId,
  resourceLocation,
} from "./k-003-union-intersection-algebra.js";

describe("k-003 union and intersection algebra", () => {
  it("normalizes either member of a primitive union", () => {
    expect(normalizeId("acct-1")).toBe("acct-1");
    expect(normalizeId(42)).toBe("42");
  });

  it("constructs a value satisfying both object contracts", () => {
    const updatedAt = new Date("2026-01-02T00:00:00.000Z");
    expect(attachAudit({ id: "acct-1" }, { updatedAt })).toEqual({
      id: "acct-1",
      updatedAt,
    });
  });

  it("reads a member shared by every union branch", () => {
    expect(resourceId({ id: "file-1", source: "file", path: "/tmp/a" })).toBe(
      "file-1",
    );
    expect(resourceId({ id: "url-1", source: "url", url: "https://example.test" })).toBe(
      "url-1",
    );
  });

  it("selects branch-specific data after a runtime check", () => {
    expect(resourceLocation({ id: "f", source: "file", path: "/tmp/a" })).toBe(
      "/tmp/a",
    );
    expect(resourceLocation({ id: "u", source: "url", url: "https://example.test" })).toBe(
      "https://example.test",
    );
  });

  it("computes the runtime analogue of set intersection", () => {
    expect(commonValues(["read", "write", "read"], ["admin", "read"])).toEqual([
      "read",
    ]);
  });

  it("accepts each member of a finite literal union", () => {
    expect(describeAccess("read")).toBe("read access");
    expect(describeAccess("write")).toBe("write access");
    expect(describeAccess("admin")).toBe("all access");
  });
});
