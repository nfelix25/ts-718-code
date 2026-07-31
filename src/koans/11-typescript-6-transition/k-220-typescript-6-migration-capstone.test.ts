import { describe, expect, it } from "vitest";
import {
  allOutcomes,
  assess,
  describeScenario,
  scenarioList,
  blockingFindings,
  migrationReady
} from "./k-220-typescript-6-migration-capstone.js";

describe("k-220-typescript-6-migration-capstone: TypeScript 6 Migration Capstone", () => {
  it("classifies the opening scenario", () => {
    expect(assess("pin-defaults").outcome).toBe("configure");
  });

  it("preserves literal details for another scenario", () => {
    expect(assess("enumerate-types").detail).toBe("list required ambient @types packages");
  });

  it("classifies the final scenario", () => {
    expect(assess("dual-compiler").outcome).toBe("verify");
  });

  it("keeps the scenario and outcome inventories aligned", () => {
    expect(allOutcomes()).toHaveLength(scenarioList.length);
    expect(describeScenario("pin-defaults")).toContain("pin-defaults");
  });

  it("exercises the lesson-specific runtime boundary", () => {
    expect(migrationReady([{ area: "dual-compiler", action: "verify", blocking: false }])).toBe(true);
  });
});
