import { describe, expect, it } from "vitest";

import { collect, commandLine, frameNumbers, summarize } from "./k-092-rest-tuple-elements.js";

describe("k-092 rest tuple elements", () => {
  it("summarizes an empty numeric rest", () => {
    expect(summarize("none")).toEqual(["none", 0, 0]);
  });

  it("summarizes an arbitrary numeric rest", () => {
    expect(summarize("scores", 2, 3, 5)).toEqual(["scores", 10, 3]);
  });

  it("joins a fixed command with variable arguments", () => {
    expect(commandLine("git", "commit", "-m", "message")).toBe("git commit -m message");
  });

  it("handles a middle rest between fixed ends", () => {
    expect(frameNumbers(["values", 2, 4, 6, true])).toBe("values:2,4,6:on");
    expect(frameNumbers(["empty", false])).toBe("empty::off");
  });

  it("collects a literal variadic argument list in order", () => {
    expect(collect("a", 1, true)).toEqual(["a", 1, true]);
  });
});
