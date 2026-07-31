import { describe, expect, it } from "vitest";

import {
  jsonImportAttributes,
  makeImportOptions,
  mergeImportAttributes,
  readImportAttribute,
} from "./k-179-import-attributes.js";

describe("k-179 import attributes", () => {
  it("builds dynamic import options under with", () => {
    expect(makeImportOptions(jsonImportAttributes)).toEqual({
      with: { type: "json" },
    });
  });

  it("reads known and absent attributes", () => {
    expect(readImportAttribute(jsonImportAttributes, "type")).toBe("json");
    expect(readImportAttribute(jsonImportAttributes, "mode")).toBeUndefined();
  });

  it("preserves custom host-defined string attributes", () => {
    expect(makeImportOptions({ flavor: "custom" })).toEqual({
      with: { flavor: "custom" },
    });
  });

  it("merges attributes with later values winning", () => {
    expect(mergeImportAttributes(
      { type: "json", mode: "loose" },
      { mode: "strict" },
    )).toEqual({ type: "json", mode: "strict" });
  });

  it("does not mutate either record while merging", () => {
    const base = { type: "json" };
    const extra = { integrity: "sha256-example" };
    mergeImportAttributes(base, extra);
    expect(base).toEqual({ type: "json" });
    expect(extra).toEqual({ integrity: "sha256-example" });
  });
});
