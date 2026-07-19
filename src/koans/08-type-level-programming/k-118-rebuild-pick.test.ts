import { describe, expect, it } from "vitest";

import { pick } from "./k-118-rebuild-pick.js";

describe("k-118 rebuild Pick", () => {
  it("copies one requested property", () => {
    expect(pick({ id: 1, name: "Ada" }, ["id"])).toEqual({ id: 1 });
  });

  it("copies several properties in key-list order", () => {
    expect(Object.keys(pick({ id: 1, name: "Ada", active: true }, ["active", "id"]))).toEqual([
      "active",
      "id",
    ]);
  });

  it("returns an empty object for an empty key list", () => {
    expect(pick({ id: 1 }, [])).toEqual({});
  });

  it("copies an optional property when it is present", () => {
    const source: { id: number; label?: string } = { id: 1, label: "ready" };
    expect(pick(source, ["label"])).toEqual({ label: "ready" });
  });

  it("supports symbol keys", () => {
    const token = Symbol("token");
    const result = pick({ [token]: 42, shown: true }, [token]);
    expect(result[token]).toBe(42);
    expect(Reflect.ownKeys(result)).toEqual([token]);
  });
});
