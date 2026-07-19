import { describe, expect, it } from "vitest";

import {
  classify,
  choose,
  convert,
  OverloadedBox,
} from "./k-070-overload-inference.js";

describe("k-070 overload inference", () => {
  it("runs the string overload", () => {
    expect(convert("koan")).toBe(4);
  });

  it("runs the number overload", () => {
    expect(convert(42)).toBe("42");
  });

  it("uses the runtime summary implementation", () => {
    expect(classify("x")).toBe("string");
    expect(classify(1)).toBe("number");
  });

  it("prefers the earlier exact overload at a call site", () => {
    expect(choose("exact")).toBe(1);
    expect(choose("other")).toBe(2);
  });

  it("constructs through either constructor overload", () => {
    expect(new OverloadedBox("value").value).toBe("value");
    expect(new OverloadedBox(255, 16).value).toBe(255);
  });
});
