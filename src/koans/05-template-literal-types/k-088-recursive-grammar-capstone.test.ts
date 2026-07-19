import { describe, expect, it } from "vitest";

import { executeProgram } from "./k-088-recursive-grammar-capstone.js";

describe("k-088 recursive grammar capstone", () => {
  it("sets and gets a scalar value", () => {
    expect(executeProgram("set count=42;get count")).toEqual([42, 42]);
  });

  it("parses several scalar kinds", () => {
    expect(executeProgram("set enabled=true;set limit=42n;set name=Ada"))
      .toEqual([true, 42n, "Ada"]);
  });

  it("increments existing and missing values", () => {
    expect(executeProgram("increment count by 2;increment count by 3;get count"))
      .toEqual([2, 5, 5]);
  });

  it("deletes state and accepts outer whitespace plus a trailing semicolon", () => {
    expect(executeProgram("  get name ; delete name ; ", { name: "Ada" }))
      .toEqual(["Ada", true]);
  });

  it("rejects an invalid runtime command", () => {
    expect(() => executeProgram("unknown name" as string)).toThrow("Invalid command");
  });
});
