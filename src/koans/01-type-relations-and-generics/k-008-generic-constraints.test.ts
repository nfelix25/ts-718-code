import { describe, expect, it } from "vitest";
import {
  addTimestamp,
  identifiedView,
  lengthOf,
  namedAndActive,
  preserveIdentified,
  preserveKind,
} from "./k-008-generic-constraints.js";

describe("k-008 generic constraints", () => {
  it("uses a guaranteed length member", () => {
    expect(lengthOf("koan")).toBe(4);
    expect(lengthOf([1, 2, 3])).toBe(3);
  });

  it("preserves a rich constrained value", () => {
    const value = { id: "a", active: true };
    expect(preserveIdentified(value)).toBe(value);
  });

  it("can deliberately return only the constraint view", () => {
    expect(identifiedView({ id: "a", active: true })).toEqual({ id: "a", active: true });
  });

  it("preserves a member of a literal-union constraint", () => {
    expect(preserveKind("created")).toBe("created");
  });

  it("combines an object with a timestamp", () => {
    const createdAt = new Date(0);
    expect(addTimestamp({ id: "a" }, createdAt)).toEqual({ id: "a", createdAt });
  });

  it("uses every member of an intersection constraint", () => {
    expect(namedAndActive({ name: "Ada", active: true })).toBe("Ada:active");
  });
});
