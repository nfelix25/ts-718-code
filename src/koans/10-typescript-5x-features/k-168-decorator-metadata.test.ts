import { describe, expect, it } from "vitest";

import {
  createMetadataHierarchy,
  createMetadataModel,
  metadataOf,
  routesOf,
  serializableMetadataKey,
  serializableNamesOf,
  serializeMarked,
} from "./k-168-decorator-metadata.js";

describe("k-168 decorator metadata", () => {
  it("shares one metadata object across decorators in a class", () => {
    const seen: object[] = [];
    const Profile = createMetadataModel(seen);
    const metadata = metadataOf(Profile);
    expect(seen).toHaveLength(3);
    expect(seen.every((entry) => entry === metadata)).toBe(true);
  });

  it("exposes decorator-written data through Symbol.metadata", () => {
    const Profile = createMetadataModel();
    expect(serializableNamesOf(Profile)).toEqual(["name", "age"]);
    expect(routesOf(Profile)).toEqual([
      { name: "load", path: "/profiles/:id" },
    ]);
  });

  it("serializes only members selected by the decorator protocol", () => {
    const Profile = createMetadataModel();
    const profile = new Profile();
    expect(serializeMarked(profile)).toEqual({ name: "Ada", age: 36 });
    expect(serializeMarked(profile)).not.toHaveProperty("secret");
  });

  it("uses symbol keys without placing metadata on instances", () => {
    const Profile = createMetadataModel();
    const profile = new Profile();
    expect(serializableMetadataKey in profile).toBe(false);
    expect(Object.hasOwn(Profile, Symbol.metadata)).toBe(true);
  });

  it("copies mutable inherited metadata before extending it", () => {
    const { Base, Derived } = createMetadataHierarchy();
    expect(serializableNamesOf(Base)).toEqual(["base"]);
    expect(serializableNamesOf(Derived)).toEqual(["base", "derived"]);
    expect(Object.getPrototypeOf(metadataOf(Derived))).toBe(metadataOf(Base));
  });
});
