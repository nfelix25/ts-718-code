import { describe, expect, it } from "vitest";
import {
  libResolutionCases,
  replacementPackageName,
  resolveLibDeclarations,
} from "./k-206-lib-replacement.js";

describe("k-206: lib replacement", () => {
  it("uses an installed replacement when lookup is enabled", () => {
    expect(resolveLibDeclarations(libResolutionCases[0])).toBe(
      "replacement-package",
    );
  });

  it("falls back to the bundled lib when no package is installed", () => {
    expect(resolveLibDeclarations(libResolutionCases[1])).toBe("bundled-lib");
  });

  it("ignores installed replacements when lookup is disabled", () => {
    expect(resolveLibDeclarations(libResolutionCases[2])).toBe("bundled-lib");
  });

  it("applies the same convention to an ES library family", () => {
    expect(resolveLibDeclarations(libResolutionCases[3])).toBe(
      "replacement-package",
    );
  });

  it("derives the replacement package naming convention", () => {
    expect(replacementPackageName("dom")).toBe("@typescript/lib-dom");
    expect(replacementPackageName("ES2024")).toBe("@typescript/lib-es2024");
  });
});
