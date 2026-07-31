import { describe, expect, it } from "vitest";

import {
  expandConfigDir,
  expandSharedPaths,
  sharedPathConfig,
} from "./k-190-configdir.js";

describe("k-190 configDir", () => {
  it("expands a project-relative output path", () => {
    expect(expandConfigDir("${configDir}/dist", "/repo/packages/app")).toBe(
      "/repo/packages/app/dist",
    );
  });

  it("leaves ordinary relative paths untouched", () => {
    expect(expandConfigDir("./dist", "/repo/packages/app")).toBe("./dist");
  });

  it("expands shared scalar path options", () => {
    const result = expandSharedPaths(sharedPathConfig, "/repo/app");
    expect(result.outDir).toBe("/repo/app/dist");
    expect(result.declarationDir).toBe("/repo/app/types");
  });

  it("expands path arrays and mappings", () => {
    const result = expandSharedPaths(sharedPathConfig, "/repo/app");
    expect(result.typeRoots).toEqual([
      "/repo/app/node_modules/@types",
      "/repo/app/custom-types",
    ]);
    expect(result.paths["@app/*"]).toEqual(["/repo/app/src/*"]);
  });

  it("does not mutate the shared base config", () => {
    expandSharedPaths(sharedPathConfig, "/repo/app");
    expect(sharedPathConfig.outDir).toBe("${configDir}/dist");
  });
});
