import { describe, expect, it } from "vitest";

import {
  trim,
  trimLeft,
  trimRight,
} from "./k-080-type-level-trim.js";

describe("k-080 type-level trim", () => {
  it("trims recognized whitespace from the left", () => {
    expect(trimLeft(" \t\nvalue")).toBe("value");
  });

  it("trims recognized whitespace from the right", () => {
    expect(trimRight("value\r\n ")).toBe("value");
  });

  it("trims both ends", () => {
    expect(trim("\t value \n")).toBe("value");
  });

  it("preserves internal whitespace", () => {
    expect(trim("  hello  world  ")).toBe("hello  world");
  });

  it("leaves excluded Unicode whitespace untouched", () => {
    expect(trim("\u00a0value\u00a0")).toBe("\u00a0value\u00a0");
  });
});
