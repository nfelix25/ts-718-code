import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 198 - noCheck AND BUILDING THROUGH ERRORS
 * =================================================
 *
 * Type checking and emitting are related compiler jobs, but they do not always
 * need to happen in one process. TypeScript 5.6 exposed `noCheck`: emit output
 * with only the semantic work that emit requires, then run a separate
 * `noEmit` pass for complete diagnostics. With `isolatedDeclarations`,
 * declaration emit can use quick per-file syntax transforms too.
 *
 * Project-reference builds also became more migration-friendly. `tsc -b`
 * reports upstream errors but continues through downstream projects and emits
 * best-effort output. `stopOnBuildErrors` restores fail-fast behavior for CI.
 * Build mode writes `.tsbuildinfo` state even without explicit incremental or
 * composite settings.
 *
 * Read these controls as scheduling policies, never as correctness proofs.
 * Emitted JavaScript can still come from a program with type errors.
 *
 * Official sources:
 * - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-6.html#the---nocheck-option
 * - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-6.html#allow---build-with-intermediate-errors
 */

export type CompilerPass = "emit" | "typecheck";
export type BuildErrorPolicy = "continue" | "stop";
export type ProjectStatus = "clean" | "error";
export type ProjectBuildOutcome =
  | "emitted"
  | "emitted-with-errors"
  | "skipped";

export interface ProjectBuildInput<Name extends string = string> {
  name: Name;
  status: ProjectStatus;
}

export interface ProjectBuildRecord<Name extends string = string> {
  name: Name;
  outcome: ProjectBuildOutcome;
  buildInfoWritten: true;
}

export function planCompilerPasses(noCheck: boolean): readonly CompilerPass[] {
  return noCheck ? ["emit"] : ["typecheck", "emit"];
}

export function planProjectBuild<const Projects extends readonly ProjectBuildInput[]>(
  projects: Projects,
  policy: BuildErrorPolicy,
): ProjectBuildRecord<Projects[number]["name"]>[] {
  let stopped = false;
  return projects.map((project) => {
    if (stopped) {
      return {
        name: project.name,
        outcome: "skipped",
        buildInfoWritten: true,
      };
    }
    if (project.status === "error") {
      stopped = policy === "stop";
      return {
        name: project.name,
        outcome: "emitted-with-errors",
        buildInfoWritten: true,
      };
    }
    return {
      name: project.name,
      outcome: "emitted",
      buildInfoWritten: true,
    };
  });
}

export const migrationProjects = [
  { name: "core", status: "error" },
  { name: "api", status: "clean" },
  { name: "app", status: "clean" },
] as const satisfies readonly ProjectBuildInput[];

// Part 1: separate semantic checking from emission.
type _01 = Expect<Equal<CompilerPass, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Parameters<typeof planCompilerPasses>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<ReturnType<typeof planCompilerPasses>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<ReturnType<typeof planCompilerPasses>[number], TODO>>; // TODO(koan) @koan-error

// Part 2: make build error policy explicit.
type _05 = Expect<Equal<BuildErrorPolicy, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<ProjectStatus, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<ProjectBuildOutcome, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Exclude<ProjectBuildOutcome, "skipped">, TODO>>; // TODO(koan) @koan-error

// Part 3: a project graph retains literal project names.
type _09 = Expect<Equal<typeof migrationProjects[number]["name"], TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<typeof migrationProjects[number]["status"], TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<typeof migrationProjects[0]["status"], TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<typeof migrationProjects["length"], TODO>>; // TODO(koan) @koan-error

// Part 4: every build record includes build-state output.
type _13 = Expect<Equal<ProjectBuildRecord["outcome"], TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<ProjectBuildRecord["buildInfoWritten"], TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<keyof ProjectBuildRecord, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<ProjectBuildInput["status"], TODO>>; // TODO(koan) @koan-error

// Part 5: the planner returns records, not a correctness guarantee.
type MigrationPlan = ReturnType<typeof planProjectBuild<typeof migrationProjects>>;
type _17 = Expect<Equal<MigrationPlan, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<MigrationPlan[number]["name"], TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<MigrationPlan[number]["outcome"], TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<MigrationPlan[number]["buildInfoWritten"], TODO>>; // TODO(koan) @koan-error
