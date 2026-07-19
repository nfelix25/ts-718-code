import { describe, expect, it, vi } from "vitest";

import {
  makeChangeHandlers,
  makeGetters,
  namespace,
} from "./k-083-mapped-template-keys.js";

describe("k-083 mapped template keys", () => {
  it("builds getters from every string key", () => {
    const getters = makeGetters({ name: "Ada", age: 37 });
    expect(getters.getName()).toBe("Ada");
    expect(getters.getAge()).toBe(37);
  });

  it("reads current values rather than snapshots", () => {
    const model = { count: 1 };
    const getters = makeGetters(model);
    model.count = 2;
    expect(getters.getCount()).toBe(2);
  });

  it("namespaces object entries", () => {
    expect(namespace({ name: "Ada", age: 37 }, "user")).toEqual({
      "user.name": "Ada",
      "user.age": 37,
    });
  });

  it("builds correlated change handlers", () => {
    const onName = vi.fn<(value: string) => void>();
    const handlers = makeChangeHandlers<{ name: string }>({ name: onName });
    handlers.onNameChange("Grace");
    expect(onName).toHaveBeenCalledWith("Grace");
  });

  it("handles an empty source object", () => {
    expect(makeGetters({})).toEqual({});
    expect(namespace({}, "empty")).toEqual({});
  });
});
