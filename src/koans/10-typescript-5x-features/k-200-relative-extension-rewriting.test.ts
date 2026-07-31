import { describe, expect, it } from "vitest";
import {
  rewriteCases,
  rewriteRelativeImport,
} from "./k-200-relative-extension-rewriting.js";

describe("k-200: relative extension rewriting", () => {
  it("maps every TypeScript source extension to its JS counterpart", () => {
    expect([
      rewriteRelativeImport("./a.ts"),
      rewriteRelativeImport("./a.tsx"),
      rewriteRelativeImport("./a.mts"),
      rewriteRelativeImport("./a.cts"),
    ]).toEqual(["./a.js", "./a.jsx", "./a.mjs", "./a.cjs"]);
  });

  it("rewrites parent-relative paths", () => {
    expect(rewriteRelativeImport("../source/file.ts")).toBe(
      "../source/file.js",
    );
  });

  it("does not rewrite package or import-map specifiers", () => {
    expect(rewriteRelativeImport("package/file.ts")).toBe("package/file.ts");
    expect(rewriteRelativeImport("#root/file.ts")).toBe("#root/file.ts");
  });

  it("does not rewrite declaration or existing JavaScript paths", () => {
    expect(rewriteRelativeImport("./types.d.ts")).toBe("./types.d.ts");
    expect(rewriteRelativeImport("./ready.js")).toBe("./ready.js");
  });

  it("matches the documented rewrite case matrix", () => {
    expect(rewriteCases.map(([input]) => rewriteRelativeImport(input))).toEqual(
      rewriteCases.map(([, output]) => output),
    );
  });
});
