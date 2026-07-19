import { describe, expect, it } from "vitest";

import { joinText, replaceAllText, splitText, trimText } from "./k-135-type-level-string-toolbelt.js";

describe("k-135 type-level string toolbelt", () => {
  it("trims runtime text while preserving a literal result type", () => {
    expect(trimText("  koan\n")).toBe("koan");
  });

  it("replaces every non-empty literal match", () => {
    expect(replaceAllText("a-b-c", "-", "/")).toBe("a/b/c");
  });

  it("splits ordinary and empty-separator inputs", () => {
    expect(splitText("a/b/c", "/")).toEqual(["a", "b", "c"]);
    expect(splitText("abc", "")).toEqual(["a", "b", "c"]);
  });

  it("uses an empty tuple for an empty delimited input", () => {
    expect(splitText("", ",")).toEqual([]);
  });

  it("joins finite string tuples", () => {
    expect(joinText(["types", "are", "sets"] as const, " ")).toBe("types are sets");
  });
});
