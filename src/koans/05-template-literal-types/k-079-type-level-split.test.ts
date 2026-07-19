import { describe, expect, it } from "vitest";

import {
  firstSegment,
  lastSegment,
  split,
} from "./k-079-type-level-split.js";

describe("k-079 type-level split", () => {
  it("splits every delimiter occurrence", () => {
    expect(split("a,b,c", ",")).toEqual(["a", "b", "c"]);
  });

  it("supports multi-character delimiters", () => {
    expect(split("a--b--c", "--")).toEqual(["a", "b", "c"]);
  });

  it("preserves leading, trailing, and consecutive empty fields", () => {
    expect(split(",a,,", ",")).toEqual(["", "a", "", ""]);
  });

  it("splits into characters for an empty delimiter", () => {
    expect(split("Type", "")).toEqual(["T", "y", "p", "e"]);
    expect(split("", "")).toEqual([]);
  });

  it("returns first and last segments", () => {
    expect(firstSegment("users/42/posts", "/")).toBe("users");
    expect(lastSegment("users/42/posts", "/")).toBe("posts");
  });
});
