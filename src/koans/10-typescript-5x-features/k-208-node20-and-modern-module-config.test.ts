import { describe, expect, it } from "vitest";
import {
  effectiveTarget,
  modernNodeConfig,
  modernNodeConfigs,
} from "./k-208-node20-and-modern-module-config.js";

describe("k-208: Node20 and modern module config", () => {
  it("builds the stable Node 20 configuration", () => {
    expect(modernNodeConfig("node20")).toEqual({
      module: "node20",
      moduleResolution: "node16",
      impliedTarget: "es2023",
      stability: "stable",
      requireEsm: true,
    });
  });

  it("builds the floating NodeNext configuration", () => {
    expect(modernNodeConfig("nodenext")).toEqual({
      module: "nodenext",
      moduleResolution: "nodenext",
      impliedTarget: "esnext",
      stability: "floating",
      requireEsm: true,
    });
  });

  it("uses the stable implied target when no override exists", () => {
    expect(effectiveTarget(modernNodeConfigs[0])).toBe("es2023");
  });

  it("uses the floating implied target for NodeNext", () => {
    expect(effectiveTarget(modernNodeConfigs[1])).toBe("esnext");
  });

  it("lets an explicit target override either implication", () => {
    expect(effectiveTarget(modernNodeConfigs[0], "es2020")).toBe("es2020");
    expect(effectiveTarget(modernNodeConfigs[1], "es2024")).toBe("es2024");
  });
});
