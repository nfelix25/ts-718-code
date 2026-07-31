import { describe, expect, it } from "vitest";

import {
  type AnyClass,
  createInitializedController,
  createRegisteredController,
} from "./k-167-decorator-initializers.js";

describe("k-167 decorator initializers", () => {
  it("binds a method separately for every instance", () => {
    const Controller = createInitializedController([]);
    const first = new Controller("first");
    const second = new Controller("second");
    const firstCallback = first.handle;
    const secondCallback = second.handle;
    expect(firstCallback("x")).toBe("first:x");
    expect(secondCallback("x")).toBe("second:x");
    expect(first.handle).not.toBe(second.handle);
  });

  it("runs instance method initializers before instance fields", () => {
    const log: string[] = [];
    const Controller = createInitializedController(log);
    new Controller("item");
    expect(log.slice(0, 2)).toEqual([
      "method-extra:handle:true",
      "field-value:status",
    ]);
  });

  it("runs a field extra initializer after the field value is installed", () => {
    const log: string[] = [];
    const Controller = createInitializedController(log);
    new Controller("item");
    expect(log.indexOf("field-value:status")).toBeLessThan(
      log.indexOf("field-extra:status:ready"),
    );
  });

  it("runs an accessor extra initializer after its backing value is installed", () => {
    const log: string[] = [];
    const Controller = createInitializedController(log);
    const controller = new Controller("item");
    expect(controller.count).toBe(1);
    expect(log.indexOf("accessor-value:count")).toBeLessThan(
      log.indexOf("accessor-extra:count:1"),
    );
    expect(log.at(-1)).toBe("constructor-body");
  });

  it("runs a class initializer once with the finalized constructor", () => {
    const registry: AnyClass[] = [];
    const log: string[] = [];
    const Controller = createRegisteredController(registry, log);
    new Controller();
    new Controller();
    expect(registry).toEqual([Controller]);
    expect(log).toEqual(["class-extra:Controller"]);
  });
});
