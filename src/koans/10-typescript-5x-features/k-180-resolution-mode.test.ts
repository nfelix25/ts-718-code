import { describe, expect, it } from "vitest";

import {
  activeCondition,
  makeResolutionAttributes,
} from "./k-180-resolution-mode.js";

describe("k-180 resolution mode", () => {
  it("constructs an import-resolution attribute", () => {
    expect(makeResolutionAttributes("import")).toEqual({
      "resolution-mode": "import",
    });
  });

  it("constructs a require-resolution attribute", () => {
    expect(makeResolutionAttributes("require")).toEqual({
      "resolution-mode": "require",
    });
  });

  it("preserves import as the active condition", () => {
    expect(activeCondition("import")).toBe("import");
  });

  it("preserves require as the active condition", () => {
    expect(activeCondition("require")).toBe("require");
  });

  it("creates independent plain records", () => {
    const first = makeResolutionAttributes("import");
    const second = makeResolutionAttributes("import");
    expect(first).toEqual(second);
    expect(first).not.toBe(second);
  });
});
