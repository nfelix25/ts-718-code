import { describe, expect, it } from "vitest";

import {
  buildPath,
  defineRoute,
} from "./k-085-routes-and-path-parameters.js";

describe("k-085 routes and path parameters", () => {
  it("builds a required path parameter", () => {
    expect(buildPath("/users/:id", { id: "42" })).toBe("/users/42");
  });

  it("builds several required parameters", () => {
    expect(buildPath("/users/:userId/posts/:postId", { userId: "1", postId: "9" }))
      .toBe("/users/1/posts/9");
  });

  it("omits a missing optional segment", () => {
    expect(buildPath("/users/:id/:tab?", { id: "42" })).toBe("/users/42");
    expect(buildPath("/users/:id/:tab?", { id: "42", tab: "settings" }))
      .toBe("/users/42/settings");
  });

  it("substitutes wildcard text", () => {
    expect(buildPath("/files/*rest", { rest: "images/avatar.png" }))
      .toBe("/files/images/avatar.png");
  });

  it("defines a reusable route builder with no-parameter support", () => {
    const about = defineRoute("/about");
    const user = defineRoute("/users/:id");
    expect(about.build()).toBe("/about");
    expect(user.build({ id: "7" })).toBe("/users/7");
  });
});
