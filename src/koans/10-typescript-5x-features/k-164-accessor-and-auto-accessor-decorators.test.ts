import { describe, expect, it } from "vitest";

import {
  createDecoratedGauge,
} from "./k-164-accessor-and-auto-accessor-decorators.js";

describe("k-164 accessor and auto-accessor decorators", () => {
  it("replaces an ordinary getter", () => {
    const Gauge = createDecoratedGauge([]);
    expect(new Gauge().label).toBe("READY");
  });

  it("replaces an ordinary setter independently", () => {
    const Gauge = createDecoratedGauge([]);
    const gauge = new Gauge();
    gauge.label = "  changed  ";
    expect(gauge.readRawLabel()).toBe("changed");
  });

  it("maps an auto-accessor's initial backing value", () => {
    const Gauge = createDecoratedGauge([]);
    expect(new Gauge().percent).toBe(100);
  });

  it("uses the replacement setter for later assignments", () => {
    const Gauge = createDecoratedGauge([]);
    const gauge = new Gauge();
    gauge.percent = -25;
    expect(gauge.percent).toBe(0);
  });

  it("observes auto-accessor initialization, reads, and writes separately", () => {
    const log: string[] = [];
    const Gauge = createDecoratedGauge(log);
    const gauge = new Gauge();
    gauge.enabled = false;
    expect(gauge.enabled).toBe(false);
    expect(log).toEqual([
      "decorate:enabled:false:false",
      "init:enabled:true",
      "set:enabled:false",
      "get:enabled:false",
    ]);
  });
});
