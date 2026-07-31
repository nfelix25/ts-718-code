import { describe, expect, it } from "vitest";

import {
  describeCompared,
  describeNegative,
  isTextEntry,
  usesInequality,
  usesReversedComparison,
} from "./k-182-boolean-comparison-narrowing.js";

describe("k-182 boolean comparison narrowing", () => {
  const text = { kind: "text", text: "koan" } as const;
  const count = { kind: "count", count: 7 } as const;

  it("compares a predicate result with true", () => {
    expect(describeCompared(text)).toBe("text:koan");
    expect(describeCompared(count)).toBe("count:7");
  });

  it("compares a predicate result with false", () => {
    expect(describeNegative(text)).toBe("text:koan");
    expect(describeNegative(count)).toBe("count:7");
  });

  it("supports the reversed comparison form", () => {
    expect(usesReversedComparison(text)).toBe("koan");
    expect(usesReversedComparison(count)).toBe("7");
  });

  it("supports inequality with false", () => {
    expect(usesInequality(text)).toBe("koan");
    expect(usesInequality(count)).toBe("7");
  });

  it("keeps the predicate's ordinary boolean runtime result", () => {
    expect(isTextEntry(text)).toBe(true);
    expect(isTextEntry(count)).toBe(false);
  });
});
