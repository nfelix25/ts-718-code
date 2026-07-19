import { describe, expect, it } from "vitest";

import {
  asyncMethods,
  stringifyPrimitiveProperties,
} from "./k-053-conditional-property-transformations.js";

describe("k-053 conditional property transformations", () => {
  it("stringifies scalar properties and preserves other values", () => {
    const created = new Date(0);
    expect(stringifyPrimitiveProperties({ id: 7, active: false, created })).toEqual({ id: "7", active: "false", created });
  });

  it("handles an empty input object", () => {
    expect(stringifyPrimitiveProperties({})).toEqual({});
  });

  it("wraps synchronous methods in promises", async () => {
    const api = asyncMethods({ load: (id: number) => `item-${id}` });
    await expect(api.load(3)).resolves.toBe("item-3");
  });

  it("flattens promises returned by existing async methods", async () => {
    const api = asyncMethods({ save: async (value: string) => value.length });
    await expect(api.save("abc")).resolves.toBe(3);
  });

  it("preserves non-function properties beside transformed methods", () => {
    const api = asyncMethods({ version: "1.0", ping: () => true });
    expect(api.version).toBe("1.0");
  });
});
