import { describe, expect, it } from "vitest";

import {
  createDecoratedRecord,
} from "./k-163-field-decorators.js";

describe("k-163 field decorators", () => {
  it("transforms a numeric initial value per instance", () => {
    const Record = createDecoratedRecord([]);
    expect(new Record().score).toBe(10);
    expect(new Record().score).toBe(10);
  });

  it("preserves the field type while replacing its initial value", () => {
    const Record = createDecoratedRecord([]);
    expect(new Record().name).toBe("Ada");
  });

  it("runs access-based initializers after values are available", () => {
    const log: string[] = [];
    const Record = createDecoratedRecord(log);
    new Record();
    expect(log).toContain("initialize:status:ready");
    expect(log).toContain("initialize:#secret:42");
  });

  it("distinguishes static and private field contexts", () => {
    const log: string[] = [];
    const Record = createDecoratedRecord(log);
    expect(log).toContain("decorate:category:true:false");
    expect(log).toContain("decorate:#secret:false:true");
    expect(Record.category).toBe("record");
  });

  it("uses private access without exposing the private field", () => {
    const Record = createDecoratedRecord([]);
    expect(new Record().readSecret()).toBe(42);
  });
});
