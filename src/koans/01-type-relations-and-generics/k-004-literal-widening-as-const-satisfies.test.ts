import { describe, expect, it } from "vitest";

import {
  checkedService,
  describeService,
  formatRgb,
  getRoutePath,
  isRouteSecure,
  mutateReferencedObject,
  routeNames,
  routeTable,
} from "./k-004-literal-widening-as-const-satisfies.js";

describe("k-004 literal widening, as const, and satisfies", () => {
  it("uses exact route keys and paths at runtime", () => {
    expect(routeNames()).toEqual(["home", "admin"]);
    expect(getRoutePath("home")).toBe("/");
    expect(getRoutePath("admin")).toBe("/admin");
  });

  it("reads preserved boolean literals through a boolean API", () => {
    expect(isRouteSecure("home")).toBe(false);
    expect(isRouteSecure("admin")).toBe(true);
  });

  it("formats a readonly literal tuple", () => {
    expect(formatRgb([255, 128, 0] as const)).toBe("rgb(255, 128, 0)");
  });

  it("uses a satisfies-validated value through its contract", () => {
    expect(describeService(checkedService)).toBe(
      "production:8080:logging",
    );
  });

  it("shows that as const does not freeze objects at runtime", () => {
    expect(Object.isFrozen(routeTable)).toBe(false);
    expect(mutateReferencedObject()).toBe(2);
  });
});
