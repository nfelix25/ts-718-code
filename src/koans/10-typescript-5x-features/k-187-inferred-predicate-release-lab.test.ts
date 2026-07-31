import { describe, expect, it } from "vitest";

import {
  type ApiResult,
  compactValues,
  firstFailure,
  isStringValue,
  successfulValues,
} from "./k-187-inferred-predicate-release-lab.js";

describe("k-187 inferred predicate release lab", () => {
  const results: ApiResult[] = [
    { status: "success", value: "a" },
    { status: "pending", startedAt: 1 },
    { status: "failure", error: new Error("failed") },
    { status: "success", value: "b" },
  ];

  it("maps narrowed successful results", () => {
    expect(successfulValues(results)).toEqual(["a", "b"]);
  });

  it("finds a narrowed failure result", () => {
    expect(firstFailure(results)?.error.message).toBe("failed");
  });

  it("returns undefined when find has no matching subtype", () => {
    expect(firstFailure([{ status: "pending", startedAt: 1 }])).toBeUndefined();
  });

  it("compacts nullish generic values", () => {
    expect(compactValues([0, null, 1, undefined, 2])).toEqual([0, 1, 2]);
  });

  it("retains ordinary runtime boolean behavior", () => {
    expect(isStringValue("text")).toBe(true);
    expect(isStringValue(1)).toBe(false);
  });
});
