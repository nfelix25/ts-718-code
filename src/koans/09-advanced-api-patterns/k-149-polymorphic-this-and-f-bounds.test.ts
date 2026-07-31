import { describe, expect, it } from "vitest";

import { Command, DeployCommand, Priority, Version, cloneSelf, maxSelf } from "./k-149-polymorphic-this-and-f-bounds.js";

describe("k-149 polymorphic this and F-bounds", () => {
  it("preserves subclass methods through inherited fluent calls", () => {
    const command = new DeployCommand().label("release").flag("--force").to("production");
    expect(command).toMatchObject({
      labels: ["release"],
      flags: ["--force"],
      environment: "production",
    });
  });

  it("passes the most-derived receiver to tap", () => {
    const environments: string[] = [];
    new DeployCommand().to("staging").tap((command) => environments.push(command.environment));
    expect(environments).toEqual(["staging"]);
  });

  it("keeps ordinary base chains on the base subtype", () => {
    expect(new Command().label("x").flag("y").flags).toEqual(["y"]);
  });

  it("selects values within one F-bounded domain", () => {
    expect(maxSelf(new Version(1), new Version(2)).value).toBe(2);
    expect(maxSelf(new Priority(5), new Priority(3)).value).toBe(5);
  });

  it("clones with the same explicit self type", () => {
    const original = new Version(7);
    const copy = cloneSelf(original);
    expect(copy).toBeInstanceOf(Version);
    expect(copy.value).toBe(original.value);
    expect(copy).not.toBe(original);
  });
});
