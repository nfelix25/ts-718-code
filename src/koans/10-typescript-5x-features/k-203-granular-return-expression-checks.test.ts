import { describe, expect, it } from "vitest";
import {
  classifyReturnBranches,
  granularReturnCases,
  selectLabel,
  selectUrl,
} from "./k-203-granular-return-expression-checks.js";

describe("k-203: granular return-expression checks", () => {
  it("reports the incompatible false branch independently", () => {
    expect(classifyReturnBranches(granularReturnCases[0])).toBe(
      "false-branch-error",
    );
  });

  it("accepts two compatible branches", () => {
    expect(classifyReturnBranches(granularReturnCases[1])).toBe(
      "both-compatible",
    );
  });

  it("returns a proven cached URL", () => {
    const cached = new URL("https://cached.example/");
    expect(selectUrl(cached, "https://fresh.example/", true)).toBe(cached);
  });

  it("constructs a URL in the non-cache branch", () => {
    expect(selectUrl("not a URL", "https://fresh.example/", false).hostname)
      .toBe("fresh.example");
  });

  it("returns a string from either label branch", () => {
    expect(selectLabel("preferred", "fallback")).toBe("preferred");
    expect(selectLabel(undefined, "fallback")).toBe("fallback");
  });
});
