import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type BuildErrorPolicy,
  type CompilerPass,
  type ProjectBuildInput,
  type ProjectBuildOutcome,
  type ProjectBuildRecord,
  migrationProjects,
  planCompilerPasses,
  planProjectBuild,
} from "./k-198-no-check-and-build-through-errors.js";

/** EDGE CASES: noCheck is not no-parse and may do declaration-required inference, isolatedDeclarations is what enables purely local declaration transforms, parallel passes need distinct build-info paths, best-effort emit is not successful validation, stopOnBuildErrors affects downstream scheduling, and build mode writes state even without composite/incremental. */

type Extends<From, To> = [From] extends [To] ? true : false;
type IsNever<Value> = [Value] extends [never] ? true : false;
type IsBroadString<Value> = string extends Value ? true : false;

// Pre-solved demonstrations of scheduling, not compiler correctness.
type _DemoNoCheckPlan = Expect<Equal<ReturnType<typeof planCompilerPasses>, readonly CompilerPass[]>>;
type _DemoBuildInfo = Expect<Equal<ProjectBuildRecord["buildInfoWritten"], true>>;
type _DemoPoliciesClosed = Expect<Equal<IsBroadString<BuildErrorPolicy>, false>>;
type _DemoOutcomesClosed = Expect<Equal<IsBroadString<ProjectBuildOutcome>, false>>;

// 1. Emission and validation remain separate facts (1-7)
type _01 = Expect<Equal<CompilerPass, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Extract<CompilerPass, "emit">, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Extract<CompilerPass, "typecheck">, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Extends<"emit", "typecheck">, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Extends<"emit", CompilerPass>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Parameters<typeof planCompilerPasses>[0], TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<ReturnType<typeof planCompilerPasses>[number], TODO>>; // TODO(koan) @koan-error

// 2. Best-effort output preserves error status (8-14)
type _08 = Expect<Equal<ProjectBuildOutcome, TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<Extract<ProjectBuildOutcome, `${string}error${string}`>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Extract<ProjectBuildOutcome, "emitted">, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Extract<ProjectBuildOutcome, "skipped">, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Extends<"emitted-with-errors", "emitted">, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<Extends<"emitted-with-errors", ProjectBuildOutcome>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Exclude<ProjectBuildOutcome, "emitted-with-errors">, TODO>>; // TODO(koan) @koan-error

// 3. Stop policy is an explicit opt-in (15-20)
type _15 = Expect<Equal<BuildErrorPolicy, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Extract<BuildErrorPolicy, "continue">, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<Extract<BuildErrorPolicy, "stop">, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Exclude<BuildErrorPolicy, "continue">, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<IsBroadString<BuildErrorPolicy>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Extends<string, BuildErrorPolicy>, TODO>>; // TODO(koan) @koan-error

// 4. Empty and error-first project graphs (21-26)
type EmptyPlan = ReturnType<typeof planProjectBuild<readonly []>>;
type MigrationPlan = ReturnType<typeof planProjectBuild<typeof migrationProjects>>;
type _21 = Expect<Equal<EmptyPlan, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<EmptyPlan[number], TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<IsNever<EmptyPlan[number]>, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<MigrationPlan[number]["name"], TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<MigrationPlan[number]["outcome"], TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<MigrationPlan[number]["buildInfoWritten"], TODO>>; // TODO(koan) @koan-error

// 5. Top/bottom and record relationships (27-30)
type _27 = Expect<Equal<Extends<never, ProjectBuildInput>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<Extends<unknown, ProjectBuildInput>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<Extends<ProjectBuildRecord, unknown>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<keyof ProjectBuildRecord, TODO>>; // TODO(koan) @koan-error
