import { describe, expect, it } from "vitest";
import {
  migrationProjects,
  planCompilerPasses,
  planProjectBuild,
} from "./k-198-no-check-and-build-through-errors.js";

describe("k-198: noCheck and build-through-errors", () => {
  it("plans an emit-only noCheck pass", () => {
    expect(planCompilerPasses(true)).toEqual(["emit"]);
  });

  it("plans full checking before ordinary emit", () => {
    expect(planCompilerPasses(false)).toEqual(["typecheck", "emit"]);
  });

  it("continues downstream after an intermediate error by default", () => {
    expect(planProjectBuild(migrationProjects, "continue").map((x) => x.outcome))
      .toEqual(["emitted-with-errors", "emitted", "emitted"]);
  });

  it("stops downstream work under the fail-fast policy", () => {
    expect(planProjectBuild(migrationProjects, "stop").map((x) => x.outcome))
      .toEqual(["emitted-with-errors", "skipped", "skipped"]);
  });

  it("records build state for every visited or skipped project", () => {
    expect(
      planProjectBuild(migrationProjects, "stop").every(
        (record) => record.buildInfoWritten,
      ),
    ).toBe(true);
  });
});
