import { describe, expect, it } from "vitest";
import {
  copyTags,
  describeCount,
  doubleIfPresent,
  formatName,
  selectLabel,
} from "./k-026-truthiness-narrowing.js";

describe("k-026 truthiness narrowing", () => {
  it("uses a fallback for nullish and empty names", () => {
    expect(formatName(null)).toBe("anonymous");
    expect(formatName("")).toBe("anonymous");
    expect(formatName(" Ada ")).toBe("Ada");
  });

  it("shows why zero is not a nullish-presence check", () => {
    expect(describeCount(0)).toBe("none");
    expect(describeCount(3)).toBe("count:3");
  });

  it("replaces every falsy member used with logical OR", () => {
    expect(selectLabel(false, "fallback")).toBe("fallback");
    expect(selectLabel("saved", "fallback")).toBe("saved");
  });

  it("branches before numeric work", () => {
    expect(doubleIfPresent(undefined)).toBe(0);
    expect(doubleIfPresent(4)).toBe(8);
  });

  it("treats even an empty array as truthy", () => {
    const tags: readonly string[] = [];
    const copied = copyTags(tags);
    expect(copied).toEqual([]);
    expect(copied).not.toBe(tags);
  });
});
