import { describe, expect, it } from "vitest";
import {
  assertNever,
  commandName,
  fail,
  formatState,
  renderShape,
} from "./k-030-exhaustiveness-and-never.js";

describe("k-030 exhaustiveness and never", () => {
  it("renders every closed shape member", () => {
    expect(renderShape({ kind: "circle", radius: 2 })).toBe("circle:2");
    expect(renderShape({ kind: "rectangle", width: 3, height: 4 })).toBe("rectangle:3x4");
  });

  it("consumes state members with early returns", () => {
    expect(formatState({ state: "ready", value: "done" })).toBe("done");
    expect(formatState({ state: "failed", error: new Error("no") })).toBe("no");
  });

  it("exhausts tuple-head commands", () => {
    expect(commandName(["push", "x"])).toBe("push:x");
    expect(commandName(["size"])).toBe("size");
  });

  it("throws from never-returning helpers", () => {
    expect(() => fail("stop")).toThrow("stop");
  });

  it("keeps a runtime defense behind the compile-time proof", () => {
    expect(() => assertNever({ kind: "future" } as never)).toThrow("Unexpected value");
  });
});
