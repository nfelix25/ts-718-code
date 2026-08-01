import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-207: import defer — constructions
 * =============================================================================
 *
 * A static import links, loads *and evaluates* its graph before the importing
 * module's body runs. `import defer * as feature from "./feature.js"` keeps the
 * linking and the loading and postpones only the evaluation, until something
 * first touches a property of the namespace. TypeScript 5.9 accepts the
 * proposal's syntax — and only the namespace form, because a named or default
 * binding would have to read the export immediately, which is the very thing
 * being deferred.
 *
 * It is not `import()`. Nothing is asynchronous, no promise is produced, and the
 * module is already in memory; only its evaluation is pending. TypeScript also
 * does not downlevel it, so `esnext` and `preserve` are the only module modes
 * that accept it and the runtime has to implement the rest. Build the form rule,
 * the mode rule, and the difference from the dynamic bridge.
 * Replace each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

type FeatureNamespace = { run(): void; readonly version: "1.0" };

// ─── The two rules ────────────────────────────────────────────────────

// 1. Build the import forms, only one of which can be deferred.
export type DeferredImportForm = TODO; // TODO(koan)

type _01a = Expect<Equal<DeferredImportForm, "namespace" | "named" | "default">>;
type _01b = Expect<Equal<Exclude<DeferredImportForm, "namespace">, "named" | "default">>;
type _01c = Expect<Equal<Extract<DeferredImportForm, "namespace">, "namespace">>;
type _01d = Expect<Equal<Extract<DeferredImportForm, "sideEffect">, never>>;

// 2. Build the module modes involved, and note that two of them are the ones
//    that emit the syntax untouched.
export type DeferredModuleMode = TODO; // TODO(koan)

type _02a = Expect<Equal<DeferredModuleMode, "esnext" | "preserve" | "commonjs" | "nodenext">>;
type _02b = Expect<Equal<Extract<DeferredModuleMode, "esnext" | "preserve">, "esnext" | "preserve">>;
type _02c = Expect<Equal<Exclude<DeferredModuleMode, "esnext" | "preserve">, "commonjs" | "nodenext">>;
type _02d = Expect<Equal<Extract<DeferredModuleMode, "amd">, never>>;

// 3. Build the first rule: only a namespace binding defers, because only a
//    property access can be the trigger.
export type FormIsDeferrable<Form extends DeferredImportForm> = TODO; // TODO(koan)

type _03a = Expect<Equal<FormIsDeferrable<"namespace">, true>>;
type _03b = Expect<Equal<FormIsDeferrable<"named">, false>>;
type _03c = Expect<Equal<FormIsDeferrable<"default">, false>>;
type _03d = Expect<Equal<FormIsDeferrable<DeferredImportForm>, boolean>>;

// 4. Build the second rule: the syntax survives emit only where nothing has to
//    be rewritten.
export type ModeEmitsSyntax<Mode extends DeferredModuleMode> = TODO; // TODO(koan)

type _04a = Expect<Equal<ModeEmitsSyntax<"esnext">, true>>;
type _04b = Expect<Equal<ModeEmitsSyntax<"preserve">, true>>;
type _04c = Expect<Equal<ModeEmitsSyntax<"commonjs">, false>>;
type _04d = Expect<Equal<ModeEmitsSyntax<"nodenext">, false>>;
type _04e = Expect<Equal<ModeEmitsSyntax<DeferredModuleMode>, boolean>>;

// 5. Build the verdicts.
export type DeferredImportCheck = TODO; // TODO(koan)

type _05a = Expect<
  Equal<DeferredImportCheck, "supported" | "namespace-only-error" | "module-mode-error">
>;
type _05b = Expect<
  Equal<Extract<DeferredImportCheck, `${string}error`>, "namespace-only-error" | "module-mode-error">
>;
type _05c = Expect<Equal<Exclude<DeferredImportCheck, `${string}error`>, "supported">>;
type _05d = Expect<Equal<Extract<DeferredImportCheck, "downlevel-error">, never>>;

// 6. Build the check. The form is a syntax question and is answered first; the
//    mode question is about what could possibly be emitted.
export type ValidateDeferredImport<
  Form extends DeferredImportForm,
  Mode extends DeferredModuleMode,
> = TODO; // TODO(koan)

type _06a = Expect<Equal<ValidateDeferredImport<"namespace", "esnext">, "supported">>;
type _06b = Expect<Equal<ValidateDeferredImport<"namespace", "preserve">, "supported">>;
type _06c = Expect<Equal<ValidateDeferredImport<"namespace", "commonjs">, "module-mode-error">>;
type _06d = Expect<Equal<ValidateDeferredImport<"named", "esnext">, "namespace-only-error">>;
type _06e = Expect<Equal<ValidateDeferredImport<"default", "commonjs">, "namespace-only-error">>;

// ─── What you are holding ─────────────────────────────────────────────

// 7. Build the namespace a deferred import binds. It is the ordinary module
//    namespace — nothing in the type says the module has not run yet.
export type DeferredNamespaceOf<Namespace extends object> = TODO; // TODO(koan)

type _07a = Expect<Equal<DeferredNamespaceOf<FeatureNamespace>, FeatureNamespace>>;
type _07b = Expect<Equal<keyof DeferredNamespaceOf<FeatureNamespace>, "run" | "version">>;
type _07c = Expect<Equal<DeferredNamespaceOf<FeatureNamespace>["version"], "1.0">>;
type _07d = Expect<
  Equal<
    {
      itLooksLikeAnOrdinaryNamespace: Equal<DeferredNamespaceOf<FeatureNamespace>, FeatureNamespace>;
      soNothingInTheTypeMarksItDeferred: Extract<keyof DeferredNamespaceOf<FeatureNamespace>, "evaluated">;
    },
    { itLooksLikeAnOrdinaryNamespace: true; soNothingInTheTypeMarksItDeferred: never }
  >
>;

// 8. Build the observable trigger: reading any export is what evaluates the
//    module.
export type TriggersEvaluation<Namespace extends object, Key> = TODO; // TODO(koan)

type _08a = Expect<Equal<TriggersEvaluation<FeatureNamespace, "run">, true>>;
type _08b = Expect<Equal<TriggersEvaluation<FeatureNamespace, "version">, true>>;
type _08c = Expect<Equal<TriggersEvaluation<FeatureNamespace, "absent">, false>>;
type _08d = Expect<Equal<TriggersEvaluation<FeatureNamespace, keyof FeatureNamespace>, true>>;

// 9. Build the module's lifecycle stages, so "deferred" can be said precisely.
export type ModuleStage = TODO; // TODO(koan)

type _09a = Expect<Equal<ModuleStage, "linked" | "loaded" | "evaluated">>;
type _09b = Expect<Equal<Exclude<ModuleStage, "evaluated">, "linked" | "loaded">>;
type _09c = Expect<Equal<Extract<ModuleStage, "evaluated">, "evaluated">>;
type _09d = Expect<Equal<Extract<ModuleStage, "fetched">, never>>;

// 10. Build which stages have happened by the time the importing module's body
//     starts, for each kind of import.
export type StagesDoneBefore<Kind extends "static" | "deferred" | "dynamic"> = TODO; // TODO(koan)

type _10a = Expect<Equal<StagesDoneBefore<"static">, "linked" | "loaded" | "evaluated">>;
type _10b = Expect<Equal<StagesDoneBefore<"deferred">, "linked" | "loaded">>;
type _10c = Expect<Equal<StagesDoneBefore<"dynamic">, never>>;
type _10d = Expect<Equal<Exclude<StagesDoneBefore<"static">, StagesDoneBefore<"deferred">>, "evaluated">>;

// ─── Not the dynamic bridge ───────────────────────────────────────────

// 11. Build what each form of import hands back. Only one of them is
//     asynchronous, and it is not this one.
export type ResultOf<
  Kind extends "static" | "deferred" | "dynamic",
  Namespace extends object,
> = TODO; // TODO(koan)

type _11a = Expect<Equal<ResultOf<"deferred", FeatureNamespace>, FeatureNamespace>>;
type _11b = Expect<Equal<ResultOf<"dynamic", FeatureNamespace>, Promise<FeatureNamespace>>>;
type _11c = Expect<Equal<Awaited<ResultOf<"dynamic", FeatureNamespace>>, FeatureNamespace>>;
type _11d = Expect<
  Equal<
    {
      theDeferredResultIsNotAPromise: GivenExtends<
        ResultOf<"deferred", FeatureNamespace>,
        Promise<unknown>
      >;
      butTheDynamicOneIs: GivenExtends<ResultOf<"dynamic", FeatureNamespace>, Promise<unknown>>;
    },
    { theDeferredResultIsNotAPromise: false; butTheDynamicOneIs: true }
  >
>;

// 12. Build whether an `await` is required to reach the exports.
export type NeedsAwait<Kind extends "static" | "deferred" | "dynamic"> = TODO; // TODO(koan)

type _12a = Expect<Equal<NeedsAwait<"static">, false>>;
type _12b = Expect<Equal<NeedsAwait<"deferred">, false>>;
type _12c = Expect<Equal<NeedsAwait<"dynamic">, true>>;
type _12d = Expect<Equal<NeedsAwait<"static" | "deferred">, false>>;

// 13. Build the statement each kind is written as.
export type RenderImport<
  Kind extends "static" | "deferred" | "dynamic",
  Alias extends string,
  Specifier extends string,
> = TODO; // TODO(koan)

type _13a = Expect<
  Equal<RenderImport<"deferred", "feature", "./feature.js">, 'import defer * as feature from "./feature.js";'>
>;
type _13b = Expect<
  Equal<RenderImport<"static", "feature", "./feature.js">, 'import * as feature from "./feature.js";'>
>;
type _13c = Expect<
  Equal<RenderImport<"dynamic", "feature", "./feature.js">, 'const feature = await import("./feature.js");'>
>;
type _13d = Expect<
  Equal<
    {
      theDeferredStatementSaysDefer: GivenExtends<
        RenderImport<"deferred", "f", "./m.js">,
        `${string}defer${string}`
      >;
      andTheStaticOneDoesNot: GivenExtends<
        RenderImport<"static", "f", "./m.js">,
        `${string}defer${string}`
      >;
    },
    { theDeferredStatementSaysDefer: true; andTheStaticOneDoesNot: false }
  >
>;

// ─── What has to be true elsewhere ────────────────────────────────────

// 14. Build the claims a clean compile might be read as making.
export type Claim = TODO; // TODO(koan)

type _14a = Expect<
  Equal<
    Claim,
    "theSyntaxIsAccepted" | "theSyntaxSurvivesEmit" | "theRuntimeDefersEvaluation" | "theModuleIsNotLoadedYet"
  >
>;
type _14b = Expect<Equal<Extract<Claim, `theSyntax${string}`>, "theSyntaxIsAccepted" | "theSyntaxSurvivesEmit">>;
type _14c = Expect<
  Equal<Exclude<Claim, `theSyntax${string}`>, "theRuntimeDefersEvaluation" | "theModuleIsNotLoadedYet">
>;
type _14d = Expect<Equal<Extract<Claim, "theBundlerInlinesIt">, never>>;

// 15. Build which of them the compiler settles. The last one is false outright —
//     deferring evaluation is not deferring loading.
export type SettledByCompiler<TheClaim extends Claim> = TODO; // TODO(koan)

type _15a = Expect<Equal<SettledByCompiler<"theSyntaxIsAccepted">, true>>;
type _15b = Expect<Equal<SettledByCompiler<"theSyntaxSurvivesEmit">, true>>;
type _15c = Expect<Equal<SettledByCompiler<"theRuntimeDefersEvaluation">, false>>;
type _15d = Expect<Equal<SettledByCompiler<"theModuleIsNotLoadedYet">, false>>;
type _15e = Expect<Equal<SettledByCompiler<Claim>, boolean>>;

// ─── Reading it back ──────────────────────────────────────────────────

// 16. Report the matrix of forms and modes.
export type MatrixProfile = TODO; // TODO(koan)

type _16a = Expect<Equal<MatrixProfile["namespaceUnderEsnext"], "supported">>;
type _16b = Expect<Equal<MatrixProfile["namespaceUnderPreserve"], "supported">>;
type _16c = Expect<Equal<MatrixProfile["namespaceUnderCommonJs"], "module-mode-error">>;
type _16d = Expect<Equal<MatrixProfile["namedUnderEsnext"], "namespace-only-error">>;
type _16e = Expect<Equal<MatrixProfile["defaultUnderNodeNext"], "namespace-only-error">>;

// 17. Report the three kinds side by side: what has already happened, what you
//     are holding, and whether you had to wait for it.
export type KindProfile = TODO; // TODO(koan)

type _17a = Expect<Equal<KindProfile["staticDoes"], "linked" | "loaded" | "evaluated">>;
type _17b = Expect<Equal<KindProfile["deferredDoes"], "linked" | "loaded">>;
type _17c = Expect<Equal<KindProfile["dynamicDoes"], never>>;
type _17d = Expect<Equal<KindProfile["deferredHandsBack"], FeatureNamespace>>;
type _17e = Expect<Equal<KindProfile["dynamicHandsBack"], Promise<FeatureNamespace>>>;

// 18. Report one import at a glance: the statement, the verdict, what it binds,
//     and what still has to be true at runtime.
export type DeferredImportReport<
  Form extends DeferredImportForm,
  Mode extends DeferredModuleMode,
  Namespace extends object,
> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<DeferredImportReport<"namespace", "esnext", FeatureNamespace>["verdict"], "supported">
>;
type _18b = Expect<
  Equal<DeferredImportReport<"namespace", "esnext", FeatureNamespace>["binds"], FeatureNamespace>
>;
type _18c = Expect<
  Equal<DeferredImportReport<"named", "esnext", FeatureNamespace>["binds"], never>
>;
type _18d = Expect<
  Equal<DeferredImportReport<"namespace", "esnext", FeatureNamespace>["awaited"], false>
>;
type _18e = Expect<
  Equal<DeferredImportReport<"namespace", "esnext", FeatureNamespace>["runtimeMustImplementIt"], false>
>;
