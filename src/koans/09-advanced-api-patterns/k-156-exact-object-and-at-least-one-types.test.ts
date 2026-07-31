import { describe, expect, it } from "vitest";

import {
  defineConnection,
  parseUserPatch,
} from "./k-156-exact-object-and-at-least-one-types.js";

describe("k-156 exact objects and at-least-one types", () => {
  it("preserves a precise exact configuration", () => {
    const config = defineConnection({ host: "localhost", port: 5432, secure: true });
    expect(config).toEqual({ host: "localhost", port: 5432, secure: true });
  });

  it("parses one patch field", () => {
    expect(parseUserPatch({ active: false })).toEqual({ active: false });
  });

  it("parses several allowed patch fields", () => {
    expect(parseUserPatch({ name: "Ada", email: "ada@example.test" })).toEqual({
      name: "Ada",
      email: "ada@example.test",
    });
  });

  it("rejects an empty patch", () => {
    expect(() => parseUserPatch({})).toThrow("at least one");
  });

  it("rejects extra keys and invalid field values", () => {
    expect(() => parseUserPatch({ name: "Ada", admin: true })).toThrow("unexpected");
    expect(() => parseUserPatch({ active: "yes" })).toThrow("boolean");
  });
});
