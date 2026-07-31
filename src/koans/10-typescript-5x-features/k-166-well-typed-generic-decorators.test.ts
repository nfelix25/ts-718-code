import { describe, expect, it } from "vitest";

import {
  createAuditedBox,
  createGenericService,
} from "./k-166-well-typed-generic-decorators.js";

describe("k-166 well-typed generic decorators", () => {
  it("forwards a monomorphic argument tuple and result", () => {
    const log: string[] = [];
    const Service = createGenericService(log);
    expect(new Service("item-").format(3, "?")).toBe("item-3?");
    expect(log).toContain('call:format:[3,"?"]');
  });

  it("preserves a generic method's input-output relationship", () => {
    const log: string[] = [];
    const Service = createGenericService(log);
    const service = new Service("");
    expect(service.identity({ id: 1 })).toEqual({ id: 1 });
    expect(service.identity("literal")).toBe("literal");
    expect(log.filter((entry) => entry.startsWith("generic:identity"))).toHaveLength(2);
  });

  it("preserves an asynchronous result contract", async () => {
    const log: string[] = [];
    const Service = createGenericService(log);
    await expect(new Service("").increment(4)).resolves.toBe(5);
    expect(log).toContain("async:increment:[4]");
  });

  it("uses a tuple constraint to validate the first argument", () => {
    const Service = createGenericService([]);
    const service = new Service("Hello, ");
    expect(service.greet("Ada", "!")).toBe("Hello, Ada!");
    expect(() => service.greet("   ")).toThrow("greet requires non-empty text");
  });

  it("infers captured class type parameters at each decoration site", () => {
    const log: string[] = [];
    const NumberBox = createAuditedBox(1, log);
    const box = new NumberBox();
    expect(box.set(5)).toBe(5);
    expect(box.value).toBe(5);
    expect(log).toContain("box:set:[5]");
  });
});
