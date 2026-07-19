import { describe, expect, it } from "vitest";

import {
  descriptorObject,
  invertRecord,
  ownEntries,
} from "./k-052-indexed-access-plus-mapping.js";

describe("k-052 indexed access plus mapping", () => {
  it("returns correlated runtime entries", () => {
    expect(ownEntries({ id: 1, name: "Ada" })).toEqual([["id", 1], ["name", "Ada"]]);
  });

  it("preserves symbol keys in runtime entries", () => {
    const token = Symbol("token");
    expect(ownEntries({ [token]: true })).toEqual([[token, true]]);
  });

  it("builds one descriptor per source key", () => {
    expect(descriptorObject({ count: 2 })).toEqual({ count: { key: "count", value: 2 } });
  });

  it("inverts string and numeric values into runtime keys", () => {
    expect(invertRecord({ ready: 200, missing: 404 })).toEqual({ 200: "ready", 404: "missing" });
  });

  it("uses last-write-wins at runtime for duplicate inverted values", () => {
    expect(invertRecord({ first: "same", second: "same" })).toEqual({ same: "second" });
  });
});
