import { describe, expect, it } from "vitest";
import {
  handleAction,
  keepWhole,
  renamed,
  renderResult,
  runTuple,
} from "./k-036-destructured-discriminants.js";

describe("k-036 destructured discriminants", () => {
  it("correlates const object bindings", () => {
    expect(handleAction({ kind: "text", payload: "go" })).toBe("GO");
    expect(handleAction({ kind: "count", payload: 12 })).toBe("12");
  });
  it("correlates destructured parameters", () => {
    expect(renderResult({ ok: true, value: "saved" })).toBe("saved");
    expect(renderResult({ ok: false, value: new Error("no") })).toBe("no");
  });
  it("correlates tuple elements", () => {
    expect(runTuple(["add", 2])).toBe("3");
    expect(runTuple(["label", "x"])).toBe("X");
  });
  it("preserves correlation through renaming", () => {
    expect(renamed({ kind: "text", payload: "x" })).toBe("x");
  });
  it("retains the straightforward whole-object alternative", () => {
    expect(keepWhole({ kind: "count", payload: 4 })).toBe("4");
  });
});
