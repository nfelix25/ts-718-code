import { describe, expect, it } from "vitest";

import {
  createRegistry,
  inspectCommand,
  type CommandCatalog,
} from "./k-159-extensible-registry-capstone.js";

function completeRegistry() {
  return createRegistry<CommandCatalog>()
    .register("greet", ({ name }) => `Hello, ${name}`)
    .register("add", ([left, right]) => left + right)
    .register("toggle", (value) => !value)
    .register(inspectCommand, (value) => JSON.stringify(value));
}

describe("k-159 extensible registry capstone", () => {
  it("dispatches correlated command inputs and outputs", () => {
    const registry = completeRegistry().build();
    expect(registry.run("greet", { name: "Ada" })).toBe("Hello, Ada");
    expect(registry.run("add", [2, 3])).toBe(5);
    expect(registry.run("toggle", true)).toBe(false);
  });

  it("supports unique-symbol command names", () => {
    const registry = completeRegistry().build();
    expect(registry.run(inspectCommand, { ok: true })).toBe('{"ok":true}');
  });

  it("keeps each registration step immutable", () => {
    const empty = createRegistry<CommandCatalog>();
    const one = empty.register("greet", ({ name }) => name);
    expect(empty.names).toEqual([]);
    expect(one.names).toEqual(["greet"]);
  });

  it("rejects assertion-forged duplicate registrations at runtime", () => {
    const one = createRegistry<CommandCatalog>()
      .register("greet", ({ name }) => name);
    const duplicate = "greet" as unknown as "add";
    expect(() => one.register(duplicate, ([left, right]) => left + right))
      .toThrow("already registered");
  });

  it("rejects assertion-forged missing dispatch at runtime", () => {
    const empty = createRegistry<CommandCatalog>();
    const forged = empty as unknown as ReturnType<typeof completeRegistry>;
    expect(() => forged.run("toggle", true)).toThrow("not registered");
  });
});
