import { describe, expect, it } from "vitest";

import {
  firstString,
  parseBigInt,
  parseBoolean,
  parseNumber,
} from "./k-067-constrained-infer.js";

describe("k-067 constrained infer", () => {
  it("returns a constrained tuple head", () => {
    expect(firstString(["route", 7, true] as const)).toBe("route");
  });

  it("parses an integer", () => {
    expect(parseNumber("42")).toBe(42);
  });

  it("parses a signed decimal", () => {
    expect(parseNumber("-3.5")).toBe(-3.5);
  });

  it("parses a bigint beyond safe integer precision", () => {
    expect(parseBigInt("9007199254740993")).toBe(9007199254740993n);
  });

  it("parses both boolean spellings", () => {
    expect(parseBoolean("true")).toBe(true);
    expect(parseBoolean("false")).toBe(false);
  });
});
