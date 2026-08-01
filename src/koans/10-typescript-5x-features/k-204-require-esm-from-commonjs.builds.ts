import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-204: require of ECMAScript modules — constructions
 * =============================================================================
 *
 * ESM could always import CommonJS; the reverse was refused, because `require`
 * is synchronous and a module graph might not be. Modern Node lifted that ban
 * for graphs that *are* synchronous, and TypeScript 5.8 stopped reporting those
 * calls under `module: "nodenext"` — the acceptance now depends on the mode, the
 * runtime line, and whether the target graph uses top-level await.
 *
 * Two things do not follow from acceptance. `nodenext` tracks whatever Node
 * currently does, so `node18` deliberately keeps the old rule; and no compiler
 * can prove that nothing anywhere in a dependency graph awaits at the top level,
 * which is why `import()` remains the honest asynchronous bridge. Build the
 * three-way decision and the two module namespaces it chooses between.
 * Replace each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

// ─── The three inputs ─────────────────────────────────────────────────

// 1. Build the module modes involved. One is frozen; the other moves with Node.
export type NodeModuleMode = TODO; // TODO(koan)

type _01a = Expect<Equal<NodeModuleMode, "node18" | "nodenext">>;
type _01b = Expect<Equal<Exclude<NodeModuleMode, "node18">, "nodenext">>;
type _01c = Expect<Equal<Extract<NodeModuleMode, `node${number}`>, "node18">>;
type _01d = Expect<Equal<Extract<NodeModuleMode, "commonjs">, never>>;

// 2. Build the runtime lines, since the mode is only a claim about which one you
//    are targeting.
export type NodeRuntimeLine = TODO; // TODO(koan)

type _02a = Expect<Equal<NodeRuntimeLine, "node18" | "node22-plus">>;
type _02b = Expect<Equal<Exclude<NodeRuntimeLine, "node18">, "node22-plus">>;
type _02c = Expect<Equal<Extract<NodeRuntimeLine, `${string}plus`>, "node22-plus">>;
type _02d = Expect<Equal<Extract<NodeRuntimeLine, "deno">, never>>;

// 3. Build the property of the target graph that decides whether a synchronous
//    load can work at all.
export type EsmAsyncShape = TODO; // TODO(koan)

type _03a = Expect<Equal<EsmAsyncShape, "synchronous" | "top-level-await">>;
type _03b = Expect<Equal<Exclude<EsmAsyncShape, "synchronous">, "top-level-await">>;
type _03c = Expect<Equal<Extract<EsmAsyncShape, `top-${string}`>, "top-level-await">>;
type _03d = Expect<Equal<Extract<EsmAsyncShape, "streaming">, never>>;

// 4. Build one row of the matrix.
export type RequireEsmCase<
  Mode extends NodeModuleMode,
  Runtime extends NodeRuntimeLine,
  Shape extends EsmAsyncShape,
> = TODO; // TODO(koan)

type _04a = Expect<
  Equal<RequireEsmCase<"nodenext", "node22-plus", "synchronous">["moduleMode"], "nodenext">
>;
type _04b = Expect<
  Equal<RequireEsmCase<"nodenext", "node22-plus", "synchronous">["esmShape"], "synchronous">
>;
type _04c = Expect<
  Equal<keyof RequireEsmCase<"node18", "node18", "synchronous">, "moduleMode" | "runtime" | "esmShape">
>;
type _04d = Expect<
  Equal<RequireEsmCase<"nodenext", NodeRuntimeLine, "synchronous">["runtime"], "node18" | "node22-plus">
>;

// ─── The decision ─────────────────────────────────────────────────────

// 5. Build the outcomes. Note that two of the three are failures at different
//    times — one at the compiler, one at the runtime.
export type RequireEsmCheck = TODO; // TODO(koan)

type _05a = Expect<Equal<RequireEsmCheck, "compiler-error" | "supported" | "runtime-async-error">>;
type _05b = Expect<
  Equal<Extract<RequireEsmCheck, `${string}error`>, "compiler-error" | "runtime-async-error">
>;
type _05c = Expect<Equal<Exclude<RequireEsmCheck, `${string}error`>, "supported">>;
type _05d = Expect<Equal<Extract<RequireEsmCheck, "warning">, never>>;

// 6. Build the compiler's half of the decision: it depends on the mode and the
//    runtime line, and nothing about the target module.
export type AcceptedByCompiler<
  Mode extends NodeModuleMode,
  Runtime extends NodeRuntimeLine,
> = TODO; // TODO(koan)

type _06a = Expect<Equal<AcceptedByCompiler<"nodenext", "node22-plus">, true>>;
type _06b = Expect<Equal<AcceptedByCompiler<"nodenext", "node18">, false>>;
type _06c = Expect<Equal<AcceptedByCompiler<"node18", "node22-plus">, false>>;
type _06d = Expect<Equal<AcceptedByCompiler<NodeModuleMode, "node22-plus">, boolean>>;

// 7. Build the whole assessment. Acceptance comes first; only then does the
//    target graph's shape get a say, and it has that say at runtime.
export type AssessRequireEsm<
  Mode extends NodeModuleMode,
  Runtime extends NodeRuntimeLine,
  Shape extends EsmAsyncShape,
> = TODO; // TODO(koan)

type _07a = Expect<Equal<AssessRequireEsm<"nodenext", "node22-plus", "synchronous">, "supported">>;
type _07b = Expect<
  Equal<AssessRequireEsm<"nodenext", "node22-plus", "top-level-await">, "runtime-async-error">
>;
type _07c = Expect<Equal<AssessRequireEsm<"nodenext", "node18", "synchronous">, "compiler-error">>;
type _07d = Expect<Equal<AssessRequireEsm<"node18", "node22-plus", "synchronous">, "compiler-error">>;
type _07e = Expect<
  Equal<AssessRequireEsm<"node18", "node18", "top-level-await">, "compiler-error">
>;

// 8. Build when each failure would be noticed, which is the practical difference
//    between the two error outcomes.
export type FailsAt<Check extends RequireEsmCheck> = TODO; // TODO(koan)

type _08a = Expect<Equal<FailsAt<"compiler-error">, "build">>;
type _08b = Expect<Equal<FailsAt<"runtime-async-error">, "first load">>;
type _08c = Expect<Equal<FailsAt<"supported">, "never">>;
type _08d = Expect<Equal<FailsAt<RequireEsmCheck>, "build" | "first load" | "never">>;

// ─── The two bridges ──────────────────────────────────────────────────

// 9. Build the namespace an ESM module presents. A default export and named
//    exports sit side by side; `require` and `import()` both hand you this.
export type EsmNamespace<Default, Named extends object> = TODO; // TODO(koan)

type _09a = Expect<
  Equal<EsmNamespace<string, { double(value: number): number }>["default"], string>
>;
type _09b = Expect<
  Equal<
    ReturnType<EsmNamespace<string, { double(value: number): number }>["double"]>,
    number
  >
>;
type _09c = Expect<
  Equal<keyof EsmNamespace<string, { double(value: number): number }>, "default" | "double">
>;
type _09d = Expect<Equal<keyof EsmNamespace<string, {}>, "default">>;

// 10. Build the synchronous bridge's result type: the namespace itself.
export type RequireResult<Namespace> = TODO; // TODO(koan)

type _10a = Expect<Equal<RequireResult<EsmNamespace<string, {}>>, { default: string }>>;
type _10b = Expect<Equal<RequireResult<EsmNamespace<string, {}>>["default"], string>>;
type _10c = Expect<Equal<Awaited<RequireResult<EsmNamespace<string, {}>>>, { default: string }>>;
type _10d = Expect<Equal<RequireResult<never>, never>>;

// 11. Build the asynchronous bridge's result type, which is the one that never
//     stopped working.
export type DynamicImportResult<Namespace> = TODO; // TODO(koan)

type _11a = Expect<
  Equal<DynamicImportResult<EsmNamespace<string, {}>>, Promise<{ default: string }>>
>;
type _11b = Expect<Equal<Awaited<DynamicImportResult<EsmNamespace<string, {}>>>, { default: string }>>;
type _11c = Expect<
  Equal<
    {
      theSynchronousResultIsNotAPromise: GivenExtends<
        RequireResult<EsmNamespace<string, {}>>,
        Promise<unknown>
      >;
      butTheAsynchronousOneIs: GivenExtends<
        DynamicImportResult<EsmNamespace<string, {}>>,
        Promise<unknown>
      >;
    },
    { theSynchronousResultIsNotAPromise: false; butTheAsynchronousOneIs: true }
  >
>;
type _11d = Expect<Equal<Awaited<DynamicImportResult<Promise<string>>>, string>>;

// 12. Build which bridge a given graph shape can use. Top-level await is exactly
//     what the synchronous one cannot survive.
export type BridgeFor<Shape extends EsmAsyncShape> = TODO; // TODO(koan)

type _12a = Expect<Equal<BridgeFor<"synchronous">, "require or dynamic import">>;
type _12b = Expect<Equal<BridgeFor<"top-level-await">, "dynamic import">>;
type _12c = Expect<Equal<BridgeFor<EsmAsyncShape>, "require or dynamic import" | "dynamic import">>;
type _12d = Expect<Equal<Equal<BridgeFor<"synchronous">, BridgeFor<"top-level-await">>, false>>;

// 13. Build the loader signature the asynchronous consumer takes.
export type LoaderOf<Namespace> = TODO; // TODO(koan)

type _13a = Expect<Equal<ReturnType<LoaderOf<EsmNamespace<string, {}>>>, Promise<{ default: string }>>>;
type _13b = Expect<Equal<Parameters<LoaderOf<EsmNamespace<string, {}>>>, []>>;
type _13c = Expect<Equal<Awaited<ReturnType<LoaderOf<EsmNamespace<string, {}>>>>, { default: string }>>;
type _13d = Expect<Equal<ReturnType<LoaderOf<never>>, Promise<never>>>;

// 14. Build the statement each bridge is written as.
export type RenderBridge<
  Bridge extends "require" | "dynamicImport",
  Specifier extends string,
> = TODO; // TODO(koan)

type _14a = Expect<
  Equal<RenderBridge<"require", "./esm.js">, 'const namespace = require("./esm.js");'>
>;
type _14b = Expect<
  Equal<RenderBridge<"dynamicImport", "./esm.js">, 'const namespace = await import("./esm.js");'>
>;
type _14c = Expect<
  Equal<
    {
      theAsynchronousBridgeAwaits: GivenExtends<
        RenderBridge<"dynamicImport", "./esm.js">,
        `${string}await${string}`
      >;
      andItNamesTheSpecifierItLoads: RenderBridge<"dynamicImport", "./esm.js"> extends
        `${string}("${infer Specifier}")${string}`
        ? Specifier
        : never;
    },
    { theAsynchronousBridgeAwaits: true; andItNamesTheSpecifierItLoads: "./esm.js" }
  >
>;
type _14d = Expect<
  Equal<GivenExtends<RenderBridge<"require", "./esm.js">, `${string}await${string}`>, false>
>;

// ─── What acceptance does not prove ───────────────────────────────────

// 15. Build the claims a green build might be read as making.
export type Claim = TODO; // TODO(koan)

type _15a = Expect<
  Equal<
    Claim,
    "theCallIsAllowedInThisMode" | "theTargetIsSynchronous" | "noDependencyAwaitsAtTopLevel" | "theBehaviourIsFrozen"
  >
>;
type _15b = Expect<Equal<Extract<Claim, `no${string}`>, "noDependencyAwaitsAtTopLevel">>;
type _15c = Expect<
  Equal<Exclude<Claim, "theCallIsAllowedInThisMode">, "theTargetIsSynchronous" | "noDependencyAwaitsAtTopLevel" | "theBehaviourIsFrozen">
>;
type _15d = Expect<Equal<Extract<Claim, "theGraphIsSmall">, never>>;

// 16. Build which of them a clean compile supports. One — and `nodenext` is a
//     moving mode, so even the frozen-behaviour claim is false.
export type ProvedByCompiling<TheClaim extends Claim> = TODO; // TODO(koan)

type _16a = Expect<Equal<ProvedByCompiling<"theCallIsAllowedInThisMode">, true>>;
type _16b = Expect<Equal<ProvedByCompiling<"theTargetIsSynchronous">, false>>;
type _16c = Expect<Equal<ProvedByCompiling<"noDependencyAwaitsAtTopLevel">, false>>;
type _16d = Expect<Equal<ProvedByCompiling<"theBehaviourIsFrozen">, false>>;
type _16e = Expect<Equal<ProvedByCompiling<Claim>, boolean>>;

// 17. Report the matrix the koan tabulates.
export type MatrixProfile = TODO; // TODO(koan)

type _17a = Expect<Equal<MatrixProfile["modernModeModernRuntimeSyncGraph"], "supported">>;
type _17b = Expect<Equal<MatrixProfile["modernModeModernRuntimeAwaitingGraph"], "runtime-async-error">>;
type _17c = Expect<Equal<MatrixProfile["modernModeOldRuntime"], "compiler-error">>;
type _17d = Expect<Equal<MatrixProfile["frozenModeModernRuntime"], "compiler-error">>;
type _17e = Expect<Equal<MatrixProfile["andTheTwoFailuresHappenAtDifferentTimes"], false>>;

// 18. Report one call site at a glance: the verdict, when it would fail, which
//     bridge is safe, and what the build did not prove.
export type RequireEsmReport<
  Mode extends NodeModuleMode,
  Runtime extends NodeRuntimeLine,
  Shape extends EsmAsyncShape,
> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<RequireEsmReport<"nodenext", "node22-plus", "synchronous">["verdict"], "supported">
>;
type _18b = Expect<
  Equal<RequireEsmReport<"nodenext", "node22-plus", "top-level-await">["failsAt"], "first load">
>;
type _18c = Expect<
  Equal<RequireEsmReport<"nodenext", "node22-plus", "top-level-await">["compilerAccepts"], true>
>;
type _18d = Expect<
  Equal<RequireEsmReport<"nodenext", "node22-plus", "top-level-await">["safeBridge"], "dynamic import">
>;
type _18e = Expect<
  Equal<RequireEsmReport<"nodenext", "node22-plus", "synchronous">["provesNothingAwaits"], false>
>;
