import { describe, expect, it, vi } from "vitest";

import {
  changeEventName,
  emitChange,
  makeAccessors,
  type ChangeHandlers,
} from "./k-048-getter-and-event-transformations.js";

describe("k-048 getter and event transformations", () => {
  it("creates related getter and setter methods", () => {
    const api = makeAccessors({ name: "Ada", count: 1 });
    expect(api.getName()).toBe("Ada");
    api.setName("Grace");
    expect(api.getName()).toBe("Grace");
  });

  it("keeps fields independent inside the generated surface", () => {
    const api = makeAccessors({ name: "Ada", active: false });
    api.setActive(true);
    expect([api.getName(), api.getActive()]).toEqual(["Ada", true]);
  });

  it("computes a change-event name", () => {
    expect(changeEventName("count")).toBe("countChanged");
  });

  it("emits current and previous values to the matching handler", () => {
    type Model = { count: number };
    const countChanged = vi.fn<ChangeHandlers<Model>["countChanged"]>();
    emitChange<Model, "count">({ countChanged }, "count", 2, 1);
    expect(countChanged).toHaveBeenCalledWith(2, 1);
  });

  it("does nothing when a change handler is absent", () => {
    expect(() => emitChange<{ active: boolean }, "active">({}, "active", true, false)).not.toThrow();
  });
});
