import { describe, expect, it } from "vitest";

import {
  makeValidators,
  parseSchema,
  type Field,
} from "./k-054-schema-transformer-capstone.js";

const schema = {
  id: { type: "number" },
  name: { type: "string", default: "anonymous" },
  active: { type: "boolean" },
  tags: { type: "strings", optional: true },
} as const satisfies Record<string, Field>;

describe("k-054 schema transformer capstone", () => {
  it("parses required fields with correlated output values", () => {
    expect(parseSchema(schema, { id: 1, name: "Ada", active: true })).toEqual({ id: 1, name: "Ada", active: true });
  });

  it("applies a present schema default", () => {
    expect(parseSchema(schema, { id: 1, active: false })).toEqual({ id: 1, name: "anonymous", active: false });
  });

  it("preserves an optional field when provided", () => {
    expect(parseSchema(schema, { id: 1, active: true, tags: ["ts", "types"] })).toEqual({ id: 1, name: "anonymous", active: true, tags: ["ts", "types"] });
  });

  it("rejects missing and invalid required fields", () => {
    expect(() => parseSchema(schema, { active: true })).toThrow("Missing field: id");
    expect(() => parseSchema(schema, { id: "1", active: true })).toThrow("Invalid field: id");
  });

  it("generates validators with field-specific runtime behavior", () => {
    const validators = makeValidators(schema);
    expect(validators.validateId(3)).toBe(true);
    expect(validators.validateId("3")).toBe(false);
    expect(validators.validateTags(["a", "b"])).toBe(true);
  });
});
