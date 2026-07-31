import { describe, expect, it } from "vitest";
import {
  assess, explain, outcomes, scenarioList,
  requestMethod
} from "./k-225-lsp-and-editor-architecture.js";

describe("k-225-lsp-and-editor-architecture: LSP and Editor Architecture", () => {
  it("classifies the opening scenario", () => {
    expect(assess("transport").outcome).toBe("lsp");
  });
  it("preserves a second scenario's concrete detail", () => {
    expect(assess("requests").detail).toBe("multiple language operations can use native threads");
  });
  it("classifies the final scenario", () => {
    expect(assess("embedded-language").outcome).toBe("api-blocked");
  });
  it("keeps scenario and outcome inventories aligned", () => {
    expect(outcomes()).toHaveLength(scenarioList.length);
    expect(explain("transport")).toContain("transport");
  });
  it("exercises the lesson-specific runtime boundary", () => {
    expect(requestMethod({ id: 1, method: "textDocument/hover", params: {} })).toBe("textDocument/hover");
  });
});
