import { describe, expect, it } from "vitest";
import {
  classifyStatus,
  normalizeLimit,
  preserveFalsy,
  readOptionalName,
  sameText,
} from "./k-027-equality-and-nullish-narrowing.js";

describe("k-027 equality and nullish narrowing", () => {
  it("defaults only nullish limits and preserves zero", () => {
    expect(normalizeLimit(null)).toBe(10);
    expect(normalizeLimit(undefined)).toBe(10);
    expect(normalizeLimit(0)).toBe(0);
  });

  it("consumes literal statuses through equality checks", () => {
    expect(classifyStatus("idle")).toBe("waiting");
    expect(classifyStatus("running")).toBe("active");
    expect(classifyStatus("done")).toBe("complete");
  });

  it("compares values without loose coercion", () => {
    expect(sameText("1", "1")).toBe(true);
    expect(sameText(1, true)).toBe(false);
  });

  it("uses optional-chain equality for missing names", () => {
    expect(readOptionalName(undefined)).toBe("missing");
    expect(readOptionalName({})).toBe("missing");
    expect(readOptionalName({ name: "Ada" })).toBe("Ada");
  });

  it("preserves every non-nullish falsy value", () => {
    expect(preserveFalsy(0)).toBe(0);
    expect(preserveFalsy(false)).toBe(false);
    expect(preserveFalsy("")).toBe("");
  });
});
