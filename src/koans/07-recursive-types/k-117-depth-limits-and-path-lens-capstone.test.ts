import { describe, expect, it } from "vitest";

import { lensFor } from "./k-117-depth-limits-and-path-lens-capstone.js";

type Model = {
  id: string;
  profile: { name: string; contact: { email: string } };
  settings?: { theme: "light" | "dark" };
};

const lens = lensFor<Model>();

describe("k-117 depth limits and path-lens capstone", () => {
  it("reads through a typed nested lens", () => {
    const email = lens("profile.contact.email");
    expect(email.get({ id: "u1", profile: { name: "Ada", contact: { email: "a@example.test" } } })).toBe(
      "a@example.test",
    );
  });

  it("immutably sets a root property", () => {
    const source: Model = { id: "u1", profile: { name: "Ada", contact: { email: "a@x.test" } } };
    const result = lens("id").set(source, "u2");
    expect(result).toEqual({ ...source, id: "u2" });
    expect(result).not.toBe(source);
  });

  it("copies only containers along a nested path", () => {
    const source: Model = { id: "u1", profile: { name: "Ada", contact: { email: "a@x.test" } } };
    const result = lens("profile.contact.email").set(source, "new@x.test");
    expect(result.profile).not.toBe(source.profile);
    expect(result.profile.contact).not.toBe(source.profile.contact);
    expect(result.profile.name).toBe(source.profile.name);
  });

  it("materializes an absent optional object branch", () => {
    const source: Model = { id: "u1", profile: { name: "Ada", contact: { email: "a@x.test" } } };
    const result = lens("settings.theme").set(source, "dark");
    expect(result.settings).toEqual({ theme: "dark" });
    expect(source.settings).toBeUndefined();
  });

  it("reuses a lens for repeated reads and writes", () => {
    const id = lens("id");
    const source: Model = { id: "u1", profile: { name: "Ada", contact: { email: "a@x.test" } } };
    const result = id.set(source, "u2");
    expect(id.path).toBe("id");
    expect(id.get(result)).toBe("u2");
  });
});
