import { describe, expect, it } from "vitest";
import {
  describeAction,
  makeMessage,
  referencedMutation,
  routeSecurity,
  runCommand,
} from "./k-038-const-assertions-and-narrowing.js";

describe("k-038 const assertions and narrowing", () => {
  it("consumes a union derived from a const action table", () => {
    expect(describeAction({ type: "add", amount: 1 })).toBe("add:1");
    expect(describeAction({ type: "reset" })).toBe("reset");
  });
  it("returns a stable factory discriminator", () => {
    expect(makeMessage("hello")).toEqual({ kind: "message", text: "hello" });
  });
  it("reads exact registry entries", () => {
    expect(routeSecurity("home")).toBe(false);
    expect(routeSecurity("admin")).toBe(true);
  });
  it("narrows readonly tuple commands", () => {
    expect(runCommand(["write", "file"])).toBe("FILE");
    expect(runCommand(["read", 4])).toBe("4");
  });
  it("does not freeze referenced objects at runtime", () => {
    expect(referencedMutation()).toBe(2);
  });
});
