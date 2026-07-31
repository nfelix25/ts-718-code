import { describe, expect, it } from "vitest";

import {
  AsyncIcon,
  BadgeTag,
  TextTag,
  renderTag,
} from "./k-174-jsx-elementtype-and-namespaced-attributes.js";

describe("k-174 JSX ElementType and namespaced names", () => {
  it("renders an ordinary intrinsic tag with correlated props", () => {
    expect(renderTag("button", { label: "Save", disabled: true })).toEqual({
      type: "button",
      props: { label: "Save", disabled: true },
    });
  });

  it("treats namespaced tags and attributes as exact keys", () => {
    expect(
      renderTag("svg:path", { d: "M0 0", "stroke:width": 2 }),
    ).toEqual({
      type: "svg:path",
      props: { d: "M0 0", "stroke:width": 2 },
    });
  });

  it("admits a function component whose output is text", () => {
    expect(renderTag(TextTag, { text: "hello" })).toBe("hello");
  });

  it("admits a function component whose output is promised", async () => {
    await expect(renderTag(AsyncIcon, { name: "save" })).resolves.toEqual({
      type: "icon",
      props: { name: "save" },
    });
  });

  it("extracts class-component props independently from render output", () => {
    expect(renderTag(BadgeTag, { tone: "warning" })).toEqual({
      type: "badge",
      props: { tone: "warning" },
    });
  });
});
