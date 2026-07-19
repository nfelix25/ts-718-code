import { describe, expect, it } from "vitest";

import { approve, createDraft, mapContent, readContent, submit } from "./k-140-phantom-types.js";

describe("k-140 phantom types", () => {
  it("moves one runtime shape through typed states", () => {
    const draft = createDraft("koan");
    const submitted = submit(draft);
    const approved = approve(submitted);
    expect(approved).toBe(draft);
  });

  it("stores no runtime state field", () => {
    const draft = createDraft("content");
    expect(draft).toEqual({ id: expect.stringMatching(/^doc-/u), content: "content" });
    expect(Reflect.ownKeys(draft)).toEqual(["id", "content"]);
  });

  it("reads shared data from every state", () => {
    expect(readContent(submit(createDraft("shared")))).toBe("shared");
  });

  it("preserves the phantom state while mapping runtime content", () => {
    const draft = createDraft("lower");
    expect(mapContent(draft, (value) => value.toUpperCase())).toMatchObject({ content: "LOWER" });
  });

  it("creates fresh runtime objects only for data-changing operations", () => {
    const draft = createDraft("x");
    expect(mapContent(draft, (value) => value + value)).not.toBe(draft);
    expect(submit(draft)).toBe(draft);
  });
});
