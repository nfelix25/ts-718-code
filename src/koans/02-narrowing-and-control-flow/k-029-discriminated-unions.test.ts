import { describe, expect, it } from "vitest";
import {
  area,
  commandOutput,
  describeState,
  isTerminal,
  resultMessage,
} from "./k-029-discriminated-unions.js";

describe("k-029 discriminated unions", () => {
  it("selects shape-specific dimensions", () => {
    expect(area({ kind: "square", side: 3 })).toBe(9);
    expect(area({ kind: "rectangle", width: 3, height: 4 })).toBe(12);
  });

  it("renders each request state from its correlated data", () => {
    expect(describeState({ status: "loading", startedAt: 7 })).toBe("loading:7");
    expect(describeState({ status: "success", data: "ready" })).toBe("ready");
  });

  it("uses a boolean discriminator", () => {
    expect(resultMessage({ ok: true, value: "saved" })).toBe("saved");
    expect(resultMessage({ ok: false, error: "denied" })).toBe("denied");
  });

  it("uses a tuple head as a discriminator", () => {
    expect(commandOutput(["write", "file"])).toBe("write:file");
    expect(commandOutput(["close"])).toBe("closed");
  });

  it("combines terminal discriminator values", () => {
    expect(isTerminal({ status: "idle" })).toBe(false);
    expect(isTerminal({ status: "failure", error: new Error("x") })).toBe(true);
  });
});
