import { describe, expect, it } from "vitest";

import {
  makeDefinedReader,
  makeTextReader,
  makeUrlReader,
  mapAgainstBase,
} from "./k-185-preserved-closure-narrowing.js";

describe("k-185 preserved closure narrowing", () => {
  it("captures a URL created by the last assignment", () => {
    expect(makeUrlReader("https://example.com/path")()).toBe(
      "https://example.com/path",
    );
  });

  it("captures an already narrowed URL", () => {
    const url = new URL("https://example.com/ready");
    expect(makeUrlReader(url)()).toBe(url.href);
  });

  it("captures a string established by nullish assignment", () => {
    expect(makeTextReader(undefined)()).toBe("FALLBACK");
    expect(makeTextReader("koan")()).toBe("KOAN");
  });

  it("uses a narrowed URL inside an array callback", () => {
    expect(mapAgainstBase("https://example.com/root/", ["a", "../b"])).toEqual([
      "https://example.com/root/a",
      "https://example.com/b",
    ]);
  });

  it("preserves a generic fallback value", () => {
    expect(makeDefinedReader<number>(undefined, 42)()).toBe(42);
    expect(makeDefinedReader("present", "fallback")()).toBe("present");
  });
});
