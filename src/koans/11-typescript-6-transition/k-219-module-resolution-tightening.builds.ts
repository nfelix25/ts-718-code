import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-219: module resolution tightening — constructions
 * =============================================================================
 *
 * TypeScript 6.0 removes a set of module settings that described a world that no
 * longer exists: `node10` and `classic` resolution, the `amd`/`umd`/`system`
 * module formats, `baseUrl` as a lookup root, `assert`-style import assertions,
 * and `outFile` bundling. Each removal has one replacement, and the replacement
 * is usually "a tool whose job that actually is".
 *
 * The migration is mechanical, so it is worth writing down as a mapping rather
 * than a list of regrets: every removed setting maps to a supported one, and the
 * question a project has to answer is only which of them it was relying on. Build
 * the removals, the replacements, and the check that a configuration is clean.
 * Replace each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

// ─── What went ───────────────────────────────────────────────────────

// 1. Build the settings this release removes.
export type RemovedSetting = TODO; // TODO(koan)

type _01a = Expect<
  Equal<
    RemovedSetting,
    | "moduleResolution: node10"
    | "moduleResolution: classic"
    | "module: amd"
    | "module: umd"
    | "module: system"
    | "baseUrl"
    | "import assertions"
    | "outFile"
  >
>;
type _01b = Expect<
  Equal<
    Extract<RemovedSetting, `moduleResolution: ${string}`>,
    "moduleResolution: node10" | "moduleResolution: classic"
  >
>;
type _01c = Expect<
  Equal<Extract<RemovedSetting, `module: ${string}`>, "module: amd" | "module: umd" | "module: system">
>;
type _01d = Expect<Equal<Extract<RemovedSetting, "paths">, never>>;

// 2. Build the categories they fall into, since the replacements differ by kind.
export type RemovalKind = TODO; // TODO(koan)

type _02a = Expect<Equal<RemovalKind, "resolution" | "module-format" | "path-lookup" | "syntax" | "emit">>;
type _02b = Expect<Equal<Extract<RemovalKind, `${string}-${string}`>, "module-format" | "path-lookup">>;
type _02c = Expect<Equal<Exclude<RemovalKind, `${string}-${string}`>, "resolution" | "syntax" | "emit">>;
type _02d = Expect<Equal<Extract<RemovalKind, "checking">, never>>;

// 3. Build the classification.
export type KindOf<Setting extends RemovedSetting> = TODO; // TODO(koan)

type _03a = Expect<Equal<KindOf<"moduleResolution: node10">, "resolution">>;
type _03b = Expect<Equal<KindOf<"module: amd">, "module-format">>;
type _03c = Expect<Equal<KindOf<"baseUrl">, "path-lookup">>;
type _03d = Expect<Equal<KindOf<"import assertions">, "syntax">>;
type _03e = Expect<Equal<KindOf<"outFile">, "emit">>;

// ─── What replaces it ─────────────────────────────────────────────────

// 4. Build the replacements each kind maps to.
export type ReplacementFor<Setting extends RemovedSetting> = TODO; // TODO(koan)

type _04a = Expect<Equal<ReplacementFor<"moduleResolution: node10">, "nodenext or bundler">>;
type _04b = Expect<Equal<ReplacementFor<"module: system">, "esnext or commonjs plus a bundler">>;
type _04c = Expect<Equal<ReplacementFor<"baseUrl">, "paths, with no base URL">>;
type _04d = Expect<Equal<ReplacementFor<"import assertions">, "import attributes">>;
type _04e = Expect<Equal<ReplacementFor<"outFile">, "a dedicated bundler">>;

// 5. Build the observation that makes the migration mechanical: every removal
//    has a replacement, so nothing is left without an answer.
export type HasReplacement<Setting extends RemovedSetting> = TODO; // TODO(koan)

type _05a = Expect<Equal<HasReplacement<"outFile">, true>>;
type _05b = Expect<Equal<HasReplacement<"baseUrl">, true>>;
type _05c = Expect<Equal<HasReplacement<"module: umd">, true>>;
type _05d = Expect<Equal<HasReplacement<RemovedSetting>, true>>;

// 6. Build the observation that decides who does the work now: two of the
//    replacements are other tools rather than other settings.
export type HandledBy<Setting extends RemovedSetting> = TODO; // TODO(koan)

type _06a = Expect<Equal<HandledBy<"outFile">, "another tool">>;
type _06b = Expect<Equal<HandledBy<"module: amd">, "another tool">>;
type _06c = Expect<Equal<HandledBy<"baseUrl">, "another setting">>;
type _06d = Expect<Equal<HandledBy<"moduleResolution: classic">, "another setting">>;

// ─── The import syntax that moved ─────────────────────────────────────

// 7. Build the old spelling of an import assertion.
export type AssertClause<Type extends string> = TODO; // TODO(koan)

type _07a = Expect<Equal<AssertClause<"json">, 'assert { type: "json" }'>>;
type _07b = Expect<Equal<AssertClause<"css">, 'assert { type: "css" }'>>;
type _07c = Expect<
  Equal<AssertClause<"json"> extends `assert ${infer Rest}` ? Rest : never, '{ type: "json" }'>
>;
type _07d = Expect<
  Equal<
    {
      itStartsWithTheOldKeyword: GivenExtends<AssertClause<"json">, `assert${string}`>;
      andTheWholeClauseIsThis: AssertClause<"json">;
    },
    { itStartsWithTheOldKeyword: true; andTheWholeClauseIsThis: 'assert { type: "json" }' }
  >
>;

// 8. Build the replacement spelling.
export type WithClause<Type extends string> = TODO; // TODO(koan)

type _08a = Expect<Equal<WithClause<"json">, 'with { type: "json" }'>>;
type _08b = Expect<Equal<Equal<WithClause<"json">, AssertClause<"json">>, false>>;
type _08c = Expect<
  Equal<
    {
      onlyTheKeywordChanged: WithClause<"json"> extends `with ${infer Rest}` ? Rest : never;
      andTheOldOneSaidTheSame: AssertClause<"json"> extends `assert ${infer Rest}` ? Rest : never;
    },
    { onlyTheKeywordChanged: '{ type: "json" }'; andTheOldOneSaidTheSame: '{ type: "json" }' }
  >
>;
type _08d = Expect<Equal<GivenExtends<WithClause<"json">, `assert${string}`>, false>>;

// 9. Build the rewrite, which is the whole migration for that row.
export type MigrateClause<Clause extends string> = TODO; // TODO(koan)

type _09a = Expect<Equal<MigrateClause<AssertClause<"json">>, 'with { type: "json" }'>>;
type _09b = Expect<Equal<MigrateClause<WithClause<"json">>, 'with { type: "json" }'>>;
type _09c = Expect<Equal<MigrateClause<"">, "">>;
type _09d = Expect<
  Equal<
    {
      theRewriteLandsOnTheNewSpelling: Equal<MigrateClause<AssertClause<"json">>, WithClause<"json">>;
      whichIsThisText: MigrateClause<AssertClause<"json">>;
    },
    { theRewriteLandsOnTheNewSpelling: true; whichIsThisText: 'with { type: "json" }' }
  >
>;

// ─── The path lookup that moved ───────────────────────────────────────

// 10. Build the old two-part configuration: a base URL plus a mapping relative
//     to it.
export type LegacyPathConfig<
  Base extends string,
  Alias extends string,
  Target extends string,
> = TODO; // TODO(koan)

type _10a = Expect<Equal<LegacyPathConfig<"./src", "@app/*", "app/*">["baseUrl"], "./src">>;
type _10b = Expect<
  Equal<LegacyPathConfig<"./src", "@app/*", "app/*">["paths"], { "@app/*": ["app/*"] }>
>;
type _10c = Expect<Equal<keyof LegacyPathConfig<"./src", "@app/*", "app/*">, "baseUrl" | "paths">>;
type _10d = Expect<Equal<LegacyPathConfig<"./src", "@app/*", "app/*">["paths"]["@app/*"], ["app/*"]>>;

// 11. Build the replacement: one mapping, relative to the config file, with no
//     base URL to reason about.
export type ModernPathConfig<Alias extends string, Target extends string> = TODO; // TODO(koan)

type _11a = Expect<Equal<keyof ModernPathConfig<"@app/*", "./src/app/*">, "paths">>;
type _11b = Expect<
  Equal<ModernPathConfig<"@app/*", "./src/app/*">["paths"], { "@app/*": ["./src/app/*"] }>
>;
type _11c = Expect<
  Equal<Extract<"baseUrl", keyof ModernPathConfig<"@app/*", "./src/*">>, never>
>;
type _11d = Expect<
  Equal<
    Equal<
      keyof ModernPathConfig<"@app/*", "./src/*">,
      keyof LegacyPathConfig<"./src", "@app/*", "app/*">
    >,
    false
  >
>;

// ─── Auditing a configuration ─────────────────────────────────────────

// 12. Build the audit: which of a project's settings are gone.
export type RemovedIn<Used extends readonly RemovedSetting[]> = TODO; // TODO(koan)

type _12a = Expect<Equal<RemovedIn<["baseUrl"]>, "baseUrl">>;
type _12b = Expect<Equal<RemovedIn<["baseUrl", "outFile"]>, "baseUrl" | "outFile">>;
type _12c = Expect<Equal<RemovedIn<[]>, never>>;
type _12d = Expect<Equal<Extract<RemovedIn<["outFile"]>, "baseUrl">, never>>;

// 13. Build the yes-or-no question a project asks before upgrading.
export type ConfigurationIsClean<Used extends readonly RemovedSetting[]> = TODO; // TODO(koan)

type _13a = Expect<Equal<ConfigurationIsClean<[]>, true>>;
type _13b = Expect<Equal<ConfigurationIsClean<["baseUrl"]>, false>>;
type _13c = Expect<Equal<ConfigurationIsClean<["baseUrl", "outFile"]>, false>>;
type _13d = Expect<Equal<ConfigurationIsClean<["module: amd"]>, false>>;

// 14. Build the migration plan: every removed setting paired with what to do.
export type MigrationPlan<Used extends readonly RemovedSetting[]> = TODO; // TODO(koan)

type _14a = Expect<Equal<MigrationPlan<["baseUrl"]>, { baseUrl: "paths, with no base URL" }>>;
type _14b = Expect<Equal<MigrationPlan<["outFile"]>["outFile"], "a dedicated bundler">>;
type _14c = Expect<Equal<keyof MigrationPlan<["baseUrl", "outFile"]>, "baseUrl" | "outFile">>;
type _14d = Expect<Equal<MigrationPlan<[]>, {}>>;

// 15. Build the count of steps that need another tool rather than another
//     setting, which is what makes a migration a project rather than an edit.
export type NeedsAnotherTool<Used extends readonly RemovedSetting[]> = TODO; // TODO(koan)

type _15a = Expect<Equal<keyof NeedsAnotherTool<["outFile", "baseUrl"]>, "outFile">>;
type _15b = Expect<Equal<keyof NeedsAnotherTool<["baseUrl"]>, never>>;
type _15c = Expect<Equal<keyof NeedsAnotherTool<["module: amd", "module: umd"]>, "module: amd" | "module: umd">>;
type _15d = Expect<Equal<NeedsAnotherTool<["outFile"]>["outFile"], "a dedicated bundler">>;

// ─── Reading it back ──────────────────────────────────────────────────

// 16. Report the removals by kind, which is also the order of difficulty.
export type RemovalProfile = TODO; // TODO(koan)

type _16a = Expect<
  Equal<RemovalProfile["resolutionSettings"], "moduleResolution: node10" | "moduleResolution: classic">
>;
type _16b = Expect<
  Equal<RemovalProfile["moduleFormats"], "module: amd" | "module: umd" | "module: system">
>;
type _16c = Expect<Equal<RemovalProfile["thePathLookupRoot"], "baseUrl">>;
type _16d = Expect<Equal<RemovalProfile["theImportSyntax"], "import assertions">>;
type _16e = Expect<Equal<RemovalProfile["theBundlingEmit"], "outFile">>;

// 17. Report the two rewrites that are pure text: the import clause and the path
//     configuration.
export type RewriteProfile = TODO; // TODO(koan)

type _17a = Expect<Equal<RewriteProfile["before"], 'assert { type: "json" }'>>;
type _17b = Expect<Equal<RewriteProfile["after"], 'with { type: "json" }'>>;
type _17c = Expect<Equal<RewriteProfile["andTheAttributeItselfIsUnchanged"], true>>;
type _17d = Expect<Equal<RewriteProfile["pathsBefore"], "baseUrl" | "paths">>;
type _17e = Expect<Equal<RewriteProfile["pathsAfter"], "paths">>;

// 18. Report one project at a glance: what it was using, whether it can upgrade
//     as is, and what its migration consists of.
export type TighteningReport<Used extends readonly RemovedSetting[]> = TODO; // TODO(koan)

type _18a = Expect<Equal<TighteningReport<["baseUrl"]>["affected"], "baseUrl">>;
type _18b = Expect<Equal<TighteningReport<["baseUrl"]>["clean"], false>>;
type _18c = Expect<
  Equal<TighteningReport<["baseUrl"]>["plan"], { baseUrl: "paths, with no base URL" }>
>;
type _18d = Expect<Equal<TighteningReport<["baseUrl"]>["needsTooling"], never>>;
type _18e = Expect<Equal<TighteningReport<["outFile"]>["needsTooling"], "outFile">>;
