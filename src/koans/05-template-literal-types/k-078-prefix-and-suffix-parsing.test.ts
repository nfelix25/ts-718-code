import { describe, expect, it } from "vitest";

import {
  ensurePrefix,
  stripAffixes,
  stripPrefix,
  stripSuffix,
} from "./k-078-prefix-and-suffix-parsing.js";

describe("k-078 prefix and suffix parsing", () => {
  it("strips exactly one prefix", () => {
    expect(stripPrefix("preprevalue", "pre")).toBe("prevalue");
  });

  it("strips exactly one suffix", () => {
    expect(stripSuffix("index.test.ts", ".ts")).toBe("index.test");
  });

  it("extracts text between two affixes", () => {
    expect(stripAffixes("<a:b>", "<", ">")).toBe("a:b");
  });

  it("ensures a prefix without duplicating it", () => {
    expect(ensurePrefix("42", "user:")).toBe("user:42");
    expect(ensurePrefix("user:42", "user:")).toBe("user:42");
  });

  it("rejects invalid runtime affixes", () => {
    expect(() => stripPrefix("team:42", "user:")).toThrow("Expected prefix");
    expect(() => stripSuffix("index.js", ".ts")).toThrow("Expected suffix");
  });
});
