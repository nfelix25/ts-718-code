import { describe, expect, it } from "vitest";
import {
  ambientAssetPattern,
  auditSideEffectImport,
  renderSideEffectImport,
  sideEffectCases,
} from "./k-195-unchecked-side-effect-imports.js";

describe("k-195: unchecked side-effect imports", () => {
  it("accepts and checks a resolvable source module", () => {
    expect(auditSideEffectImport(sideEffectCases[0])).toBe("checked-source");
  });

  it("accepts an asset covered by an ambient declaration", () => {
    expect(auditSideEffectImport(sideEffectCases[1])).toBe(
      "accepted-declaration",
    );
  });

  it("reports an unresolved side-effect module", () => {
    expect(auditSideEffectImport(sideEffectCases[2])).toBe("unresolved-error");
  });

  it("renders binding-free import syntax", () => {
    expect(renderSideEffectImport("./setup.js")).toBe('import "./setup.js";');
  });

  it("builds an ambient wildcard for an asset extension", () => {
    expect(ambientAssetPattern("css")).toBe("*.css");
  });
});
