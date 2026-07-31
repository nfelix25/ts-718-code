import { describe, expect, it } from "vitest";
import {
  defineNamedImport,
  defineNamespaceImport,
  namedModelImport,
  namespaceModelImport,
  referenceImportedType,
  renderJSDocImport,
} from "./k-192-jsdoc-import.js";

describe("k-192: JSDoc @import", () => {
  it("renders a named type-only import comment", () => {
    expect(renderJSDocImport(namedModelImport)).toBe(
      '/** @import { User, UserId } from "./models.js" */',
    );
  });

  it("renders a namespace type-only import comment", () => {
    expect(renderJSDocImport(namespaceModelImport)).toBe(
      '/** @import * as models from "./models.js" */',
    );
  });

  it("references a named import directly", () => {
    const spec = defineNamedImport("./domain.js", "Order");
    expect(referenceImportedType(spec, "Order")).toBe("Order");
  });

  it("qualifies a namespace import reference", () => {
    const spec = defineNamespaceImport("./domain.js", "domain");
    expect(referenceImportedType(spec, "Order")).toBe("domain.Order");
  });

  it("renders an empty named form without loading a module", () => {
    const spec = defineNamedImport("./types-only.js");
    expect(renderJSDocImport(spec)).toBe(
      '/** @import {  } from "./types-only.js" */',
    );
  });
});
