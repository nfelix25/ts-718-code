import { describe, expect, it } from "vitest";

import {
  createDecoratedService,
} from "./k-161-class-decorators.js";

describe("k-161 class decorators", () => {
  it("preserves constructor arguments and declared instance behavior", () => {
    const Service = createDecoratedService([], []);
    const service = new Service("Ada");
    expect(service.name).toBe("Ada");
    expect(service.greet()).toBe("Hello, Ada");
  });

  it("runs replacement constructor logic around super", () => {
    const log: string[] = [];
    const Service = createDecoratedService(log, []);
    new Service("Ada");
    expect(log).toEqual([
      "decorate:Service",
      "construct:Service:before",
      "construct:Service:after",
    ]);
  });

  it("adds runtime instance state without changing the declared type", () => {
    const Service = createDecoratedService([], []);
    const service = new Service("Ada") as InstanceType<typeof Service> & {
      readonly runtimeTag: "service";
    };
    expect(service.runtimeTag).toBe("service");
  });

  it("keeps replacement instances in the final class's instanceof chain", () => {
    const Service = createDecoratedService([], []);
    expect(new Service("Ada")).toBeInstanceOf(Service);
  });

  it("registers the finalized decorated class from a class initializer", () => {
    const registry: Function[] = [];
    const Service = createDecoratedService([], registry);
    expect(registry).toEqual([Service]);
    expect(Service.category).toBe("service");
  });
});
