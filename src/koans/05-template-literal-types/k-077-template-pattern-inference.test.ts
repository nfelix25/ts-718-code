import { describe, expect, it } from "vitest";

import {
  firstAndRest,
  removePrefix,
  removeSuffix,
  splitOnce,
} from "./k-077-template-pattern-inference.js";

describe("k-077 template pattern inference", () => {
  it("removes a known prefix", () => {
    expect(removePrefix("user:42", "user:")).toBe("42");
  });

  it("removes a known suffix", () => {
    expect(removeSuffix("index.ts", ".ts")).toBe("index");
  });

  it("splits at the first delimiter", () => {
    expect(splitOnce("a:b:c", ":")).toEqual(["a", "b:c"]);
  });

  it("preserves empty captures", () => {
    expect(splitOnce(":tail", ":")).toEqual(["", "tail"]);
    expect(splitOnce("head:", ":")).toEqual(["head", ""]);
  });

  it("separates the first character from the rest", () => {
    expect(firstAndRest("Type")).toEqual(["T", "ype"]);
    expect(firstAndRest("T")).toEqual(["T", ""]);
  });
});
