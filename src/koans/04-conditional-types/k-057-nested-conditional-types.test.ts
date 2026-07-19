import { describe, expect, it } from "vitest";

import {
  httpCategory,
  roleAccess,
  typeCategory,
} from "./k-057-nested-conditional-types.js";

describe("k-057 nested conditional types", () => {
  it("distinguishes null, arrays, and plain objects in order", () => {
    expect([typeCategory(null), typeCategory([]), typeCategory({})]).toEqual(["null", "array", "object"]);
  });

  it("classifies primitive runtime values", () => {
    expect([typeCategory("x"), typeCategory(1), typeCategory(false)]).toEqual(["string", "number", "boolean"]);
  });

  it("selects narrower role branches before broad strings", () => {
    expect(roleAccess("admin")).toEqual({ level: 3, role: "admin" });
    expect(roleAccess("viewer")).toEqual({ level: 1, role: "viewer" });
  });

  it("classifies known HTTP status families", () => {
    expect([httpCategory(204), httpCategory(302), httpCategory(404), httpCategory(503)]).toEqual(["success", "redirect", "client-error", "server-error"]);
  });

  it("uses the final fallback for an unlisted status", () => {
    expect(httpCategory(418)).toBe("unknown");
  });
});
