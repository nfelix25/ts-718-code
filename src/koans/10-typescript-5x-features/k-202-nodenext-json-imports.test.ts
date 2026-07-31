import { describe, expect, it } from "vitest";
import {
  jsonImportAttributes,
  nodeNextJsonCases,
  unwrapJsonModule,
  validateNodeNextJsonImport,
} from "./k-202-nodenext-json-imports.js";

describe("k-202: NodeNext JSON imports", () => {
  it("accepts a default import with the JSON attribute", () => {
    expect(validateNodeNextJsonImport(nodeNextJsonCases[0])).toBe("valid");
  });

  it("accepts namespace access through default", () => {
    expect(validateNodeNextJsonImport(nodeNextJsonCases[1])).toBe("valid");
  });

  it("reports the missing JSON import attribute", () => {
    expect(validateNodeNextJsonImport(nodeNextJsonCases[2])).toBe(
      "missing-json-attribute",
    );
  });

  it("rejects synthesized named exports", () => {
    expect(validateNodeNextJsonImport(nodeNextJsonCases[3])).toBe(
      "default-export-only",
    );
  });

  it("unwraps the default-only namespace value", () => {
    expect(jsonImportAttributes()).toEqual({ type: "json" });
    expect(unwrapJsonModule({ default: { version: 7 } })).toEqual({
      version: 7,
    });
  });
});
