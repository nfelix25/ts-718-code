import { describe, expect, it } from "vitest";
import {
  assessRequireEsm,
  consumeWithDynamicImport,
  renderCommonJsRequire,
  requireEsmCases,
} from "./k-204-require-esm-from-commonjs.js";

describe("k-204: require ESM from CommonJS", () => {
  it("keeps the stable Node 18 mode on the older boundary", () => {
    expect(assessRequireEsm(requireEsmCases[0])).toBe("compiler-error");
  });

  it("supports synchronous ESM under modern NodeNext", () => {
    expect(assessRequireEsm(requireEsmCases[1])).toBe("supported");
  });

  it("preserves the top-level-await runtime barrier", () => {
    expect(assessRequireEsm(requireEsmCases[2])).toBe("runtime-async-error");
  });

  it("renders the synchronous CommonJS form", () => {
    expect(renderCommonJsRequire("./library.mjs")).toBe(
      'const namespace = require("./library.mjs");',
    );
  });

  it("uses dynamic import for an asynchronous bridge", async () => {
    await expect(
      consumeWithDynamicImport(async () => ({
        default: "value",
        double: (value) => value * 2,
      })),
    ).resolves.toBe("value:6");
  });
});
