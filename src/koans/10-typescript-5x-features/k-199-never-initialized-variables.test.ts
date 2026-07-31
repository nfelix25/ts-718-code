import { describe, expect, it } from "vitest";
import {
  classifyInitialization,
  createOptionalPrinter,
  createResultPrinter,
  initializationCases,
} from "./k-199-never-initialized-variables.js";

describe("k-199: never-initialized variables", () => {
  it("diagnoses a captured local with no assignment evidence", () => {
    expect(classifyInitialization(initializationCases[0])).toBe(
      "used-before-assigned",
    );
  });

  it("models the remaining optimistic conditional closure case", () => {
    expect(classifyInitialization(initializationCases[1])).toBe(
      "closure-optimistic",
    );
  });

  it("keeps same-scope conditional reads strict", () => {
    expect(classifyInitialization(initializationCases[2])).toBe(
      "used-before-assigned",
    );
  });

  it("captures an explicitly supplied initialized value", () => {
    expect(createResultPrinter(42)()).toBe("result:42");
  });

  it("represents and handles an optional value explicitly", () => {
    expect(createOptionalPrinter(undefined)()).toBe("result:missing");
    expect(createOptionalPrinter(7)()).toBe("result:7");
  });
});
