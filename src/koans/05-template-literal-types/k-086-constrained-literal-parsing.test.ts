import { describe, expect, it } from "vitest";

import {
  parseField,
  parseScalar,
} from "./k-086-constrained-literal-parsing.js";

describe("k-086 constrained literal parsing", () => {
  it("parses canonical scalar literals", () => {
    expect(parseScalar("true")).toBe(true);
    expect(parseScalar("null")).toBeNull();
    expect(parseScalar("undefined")).toBeUndefined();
  });

  it("parses canonical numbers", () => {
    expect(parseScalar("42")).toBe(42);
    expect(parseScalar("-3.5")).toBe(-3.5);
  });

  it("parses bigint text with the declared suffix", () => {
    expect(parseScalar("9007199254740993n")).toBe(9007199254740993n);
  });

  it("preserves unmatched text", () => {
    expect(parseScalar("hello")).toBe("hello");
    expect(parseScalar("NaN")).toBe("NaN");
  });

  it("parses a correlated key-value field", () => {
    expect(parseField("count=42")).toEqual({ key: "count", value: 42 });
    expect(parseField("enabled=true")).toEqual({ key: "enabled", value: true });
  });
});
