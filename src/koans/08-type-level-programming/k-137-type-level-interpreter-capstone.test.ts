import { describe, expect, it } from "vitest";

import { evaluate } from "./k-137-type-level-interpreter-capstone.js";

describe("k-137 type-level interpreter capstone", () => {
  it("evaluates nested arithmetic", () => {
    const program = { kind: "add", left: { kind: "literal", value: 2 }, right: { kind: "literal", value: 3 } } as const;
    expect(evaluate(program)).toEqual({ ok: true, value: 5 });
  });

  it("evaluates lexical let bindings", () => {
    const program = {
      kind: "let",
      name: "x",
      value: { kind: "literal", value: "Type" },
      body: { kind: "concat", left: { kind: "variable", name: "x" }, right: { kind: "literal", value: "Script" } },
    } as const;
    expect(evaluate(program)).toEqual({ ok: true, value: "TypeScript" });
  });

  it("evaluates only the selected conditional branch", () => {
    const program = {
      kind: "if",
      condition: { kind: "literal", value: true },
      then: { kind: "literal", value: 1 },
      else: { kind: "variable", name: "missing" },
    } as const;
    expect(evaluate(program)).toEqual({ ok: true, value: 1 });
  });

  it("reports unbound variables", () => {
    expect(evaluate({ kind: "variable", name: "missing" } as const)).toEqual({ ok: false, error: "unbound:missing" });
  });

  it("reports operator domain errors", () => {
    const program = { kind: "add", left: { kind: "literal", value: "1" }, right: { kind: "literal", value: 2 } } as const;
    expect(evaluate(program)).toEqual({ ok: false, error: "type:add" });
  });
});
