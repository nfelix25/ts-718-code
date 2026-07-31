import { describe, expect, it } from "vitest";

import {
  assignmentPattern,
  compileDynamicPattern,
  identifierPattern,
  parseAssignment,
  repeatedWordPattern,
} from "./k-191-regexp-syntax-checking.js";

describe("k-191 RegExp syntax checking", () => {
  it("runs a valid identifier literal", () => {
    expect(identifierPattern.test("valid_name")).toBe(true);
    expect(identifierPattern.test("2invalid")).toBe(false);
  });

  it("extracts valid named capture groups", () => {
    expect(parseAssignment("answer=42")).toEqual({
      key: "answer",
      value: "42",
    });
  });

  it("returns null when a valid literal does not match", () => {
    expect(parseAssignment("not-an-assignment")).toBeNull();
  });

  it("runs a valid numeric backreference", () => {
    expect(repeatedWordPattern.test("go go")).toBe(true);
    expect(repeatedWordPattern.test("go stop")).toBe(false);
  });

  it("defers invalid constructor strings to runtime", () => {
    expect(() => compileDynamicPattern("(unclosed", "u")).toThrow(SyntaxError);
    expect(compileDynamicPattern("^ok$", "u").test("ok")).toBe(true);
  });
});
