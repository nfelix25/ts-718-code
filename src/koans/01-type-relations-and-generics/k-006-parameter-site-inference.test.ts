import { describe, expect, it, vi } from "vitest";

import {
  gather,
  inferFromConsumer,
  optionalValue,
  tapValue,
  unwrapBox,
  unwrapPayload,
} from "./k-006-parameter-site-inference.js";

describe("k-006 parameter-site inference", () => {
  it("extracts values from nested object parameter patterns", () => {
    expect(unwrapBox({ value: 42 })).toBe(42);
    expect(unwrapPayload({ payload: "data", source: "api" })).toBe("data");
  });

  it("contextually types and invokes a callback", () => {
    const effect = vi.fn<(value: string) => void>();
    expect(tapValue("text", effect)).toBe("text");
    expect(effect).toHaveBeenCalledWith("text");
  });

  it("returns an explicitly typed consumer unchanged", () => {
    const consumer = (value: number) => void value;
    expect(inferFromConsumer(consumer)).toBe(consumer);
  });

  it("handles omitted optional evidence", () => {
    expect(optionalValue()).toBeUndefined();
    expect(optionalValue("present")).toBe("present");
  });

  it("collects rest arguments", () => {
    expect(gather(1, 2, 3)).toEqual([1, 2, 3]);
  });
});
