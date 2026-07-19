import { describe, expect, it } from "vitest";

import { parseQuery } from "./k-087-query-string-parser.js";

describe("k-087 query-string parser", () => {
  it("parses several scalar fields", () => {
    expect(parseQuery("name=Ada&count=42&enabled=true")).toEqual({
      name: "Ada",
      count: 42,
      enabled: true,
    });
  });

  it("accepts a leading question mark and bare flags", () => {
    expect(parseQuery("?debug&limit=42n")).toEqual({ debug: true, limit: 42n });
  });

  it("ignores empty fields and empty keys", () => {
    expect(parseQuery("&&=ignored&ok=1&")).toEqual({ ok: 1 });
  });

  it("uses the final duplicate key", () => {
    expect(parseQuery("a=1&b=2&a=3")).toEqual({ a: 3, b: 2 });
  });

  it("leaves percent escapes and plus signs raw", () => {
    expect(parseQuery("name=Ada+Lovelace&path=a%2Fb")).toEqual({
      name: "Ada+Lovelace",
      path: "a%2Fb",
    });
  });
});
