import { describe, expect, it } from "vitest";
import {
  chooseMember,
  mapField,
  pickerFor,
  pickFields,
  pickFieldsDefault,
  writeField,
} from "./k-022-partial-inference-and-correlation-capstone.js";

describe("k-022 partial inference and correlation capstone", () => {
  it("projects inferred and defaulted fields", () => {
    const user = { id: 1, name: "Ada", active: true };
    expect(pickFields(user, "id", "active")).toEqual({ id: 1, active: true });
    expect(pickFieldsDefault(user, "name")).toEqual({ name: "Ada" });
  });

  it("stages object choice before key inference", () => {
    const pickUser = pickerFor<{ id: number; name: string }>();
    expect(pickUser({ id: 1, name: "Ada" }, "name")).toEqual({ name: "Ada" });
  });

  it("selects a runtime member from a finite domain", () => {
    expect(chooseMember(["red", "green"] as const, "green")).toBe("green");
  });

  it("contextually transforms a selected field", () => {
    expect(mapField({ count: 2 }, "count", (count) => count * 3)).toBe(6);
  });

  it("writes a value accepted for a literal key", () => {
    const value = { count: 1 };
    writeField(value, "count", 2);
    expect(value.count).toBe(2);
  });
});
