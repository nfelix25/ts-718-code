import { describe, expect, it } from "vitest";

import {
  describeCredentials,
  exactlyOnePresent,
  parseContact,
} from "./k-155-xor-and-exactly-one-types.js";

describe("k-155 XOR and exactly-one types", () => {
  it("recognizes exactly one own property", () => {
    expect(exactlyOnePresent({ email: "a@example.test" }, ["email", "phone"])).toBe(true);
    expect(exactlyOnePresent({}, ["email", "phone"])).toBe(false);
    expect(exactlyOnePresent({ email: "a", phone: "1" }, ["email", "phone"])).toBe(false);
  });

  it("parses a valid single-channel contact", () => {
    expect(parseContact({ label: "work", email: "a@example.test" })).toEqual({
      label: "work",
      email: "a@example.test",
    });
  });

  it("rejects multiple contact channels", () => {
    expect(() => parseContact({ label: "work", email: "a", phone: "1" }))
      .toThrow("exactly one");
  });

  it("rejects a selected channel with the wrong runtime value", () => {
    expect(() => parseContact({ label: "work", slack: 42 }))
      .toThrow("must be a string");
  });

  it("handles both credential variants", () => {
    expect(describeCredentials({ token: "abc" })).toBe("token:abc");
    expect(describeCredentials({ username: "ada", password: "secret" }))
      .toBe("password:ada");
  });
});
