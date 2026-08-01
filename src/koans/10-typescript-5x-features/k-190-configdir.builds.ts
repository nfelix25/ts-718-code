import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-190: the ${configDir} template variable — constructions
 * =============================================================================
 *
 * A relative path in a tsconfig is resolved against the file that wrote it. That
 * is the wrong anchor for a shared base config: every project extending it wants
 * *its own* `dist`, not the base package's. TypeScript 5.5 added `${configDir}`
 * to the path-valued options, meaning "the directory of the config being
 * compiled" — one base file, a different absolute path per project.
 *
 * It is a configuration substitution and nothing more: not shell interpolation,
 * not available in arbitrary string options, and not a value any program can
 * read. The interesting modelling job is therefore the string work — recognising
 * an anchored path, substituting the token, and carrying the substitution
 * through the nested shapes (`typeRoots`, `paths`) that hold several of them.
 * Replace each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

type BaseConfig = {
  outDir: "${configDir}/dist";
  declarationDir: "${configDir}/types";
  typeRoots: readonly ["${configDir}/node_modules/@types", "${configDir}/custom-types"];
  paths: { readonly "@app/*": readonly ["${configDir}/src/*"] };
};

// ─── The token ────────────────────────────────────────────────────────

// 1. Build the placeholder itself. It is an ordinary string literal type — the
//    braces are characters, not syntax.
export type ConfigDirToken = TODO; // TODO(koan)

type _01a = Expect<Equal<ConfigDirToken, "${configDir}">>;
type _01b = Expect<Equal<Uppercase<ConfigDirToken>, "${CONFIGDIR}">>;
type _01c = Expect<Equal<`${ConfigDirToken}/dist`, "${configDir}/dist">>;
type _01d = Expect<
  Equal<
    {
      theTokenIsOneParticularString: GivenExtends<ConfigDirToken, string>;
      andNotStringInGeneral: GivenExtends<string, ConfigDirToken>;
    },
    { theTokenIsOneParticularString: true; andNotStringInGeneral: false }
  >
>;

// 2. Build the shape of a path anchored at the config directory.
export type ConfigRelativePath = TODO; // TODO(koan)

type _02a = Expect<Equal<ConfigRelativePath, `${"${configDir}"}/${string}`>>;
type _02b = Expect<
  Equal<
    {
      anAnchoredPathFits: GivenExtends<"${configDir}/dist", ConfigRelativePath>;
      andOnlyTheAnchoredOneIsKept: Extract<"${configDir}/dist" | "./dist", ConfigRelativePath>;
    },
    { anAnchoredPathFits: true; andOnlyTheAnchoredOneIsKept: "${configDir}/dist" }
  >
>;
type _02c = Expect<Equal<GivenExtends<"./dist", ConfigRelativePath>, false>>;
type _02d = Expect<Equal<GivenExtends<"${configDir}", ConfigRelativePath>, false>>;

// 3. Build the recogniser. A bare token with nothing after it is not a path, and
//    a plain relative path is anchored somewhere else entirely.
export type StartsAtConfigDir<Path extends string> = TODO; // TODO(koan)

type _03a = Expect<Equal<StartsAtConfigDir<"${configDir}/dist">, true>>;
type _03b = Expect<Equal<StartsAtConfigDir<"./dist">, false>>;
type _03c = Expect<Equal<StartsAtConfigDir<"${configDir}">, false>>;
type _03d = Expect<Equal<StartsAtConfigDir<string>, false>>;

// ─── Substitution ─────────────────────────────────────────────────────

// 4. Build the substitution. Recur on the tail so a path mentioning the token
//    more than once is fully expanded, and leave a path without it alone.
export type ExpandToken<Path extends string, Dir extends string> = TODO; // TODO(koan)

type _04a = Expect<Equal<ExpandToken<"${configDir}/dist", "/repo/app">, "/repo/app/dist">>;
type _04b = Expect<Equal<ExpandToken<"./dist", "/repo/app">, "./dist">>;
type _04c = Expect<Equal<ExpandToken<"${configDir}/a/${configDir}/b", "/r">, "/r/a//r/b">>;
type _04d = Expect<Equal<ExpandToken<string, "/r">, string>>;

// 5. Build the list version, for the options that hold several paths.
export type ExpandAll<Paths extends readonly string[], Dir extends string> = TODO; // TODO(koan)

type _05a = Expect<Equal<ExpandAll<["${configDir}/a", "${configDir}/b"], "/r">, ["/r/a", "/r/b"]>>;
type _05b = Expect<Equal<ExpandAll<readonly ["${configDir}/a"], "/r">, readonly ["/r/a"]>>;
type _05c = Expect<Equal<ExpandAll<[], "/r">, []>>;
type _05d = Expect<Equal<ExpandAll<["./a"], "/r">, ["./a"]>>;

// ─── Which options take it ────────────────────────────────────────────

// 6. Build the path-valued options this model substitutes into.
export type SupportedField = TODO; // TODO(koan)

type _06a = Expect<
  Equal<SupportedField, "outDir" | "declarationDir" | "typeRoots" | "paths" | "rootDir">
>;
type _06b = Expect<Equal<Extract<SupportedField, "paths">, "paths">>;
type _06c = Expect<Equal<Exclude<SupportedField, "outDir" | "declarationDir" | "rootDir">, "typeRoots" | "paths">>;
type _06d = Expect<Equal<Extract<SupportedField, "target" | "module">, never>>;

// 7. Build the question the compiler answers before substituting at all.
export type SupportsToken<Field extends string> = TODO; // TODO(koan)

type _07a = Expect<Equal<SupportsToken<"outDir">, true>>;
type _07b = Expect<Equal<SupportsToken<"paths">, true>>;
type _07c = Expect<Equal<SupportsToken<"target">, false>>;
type _07d = Expect<Equal<SupportsToken<SupportedField>, true>>;

// 8. Build the guarded substitution: an unsupported option keeps the characters
//    it was given, because nothing is interpolating anything.
export type ExpandForField<
  Field extends string,
  Path extends string,
  Dir extends string,
> = TODO; // TODO(koan)

type _08a = Expect<Equal<ExpandForField<"outDir", "${configDir}/dist", "/r">, "/r/dist">>;
type _08b = Expect<Equal<ExpandForField<"target", "${configDir}/dist", "/r">, "${configDir}/dist">>;
type _08c = Expect<Equal<ExpandForField<"rootDir", "${configDir}/src", "/r">, "/r/src">>;
type _08d = Expect<Equal<ExpandForField<"outDir", "./dist", "/r">, "./dist">>;

// ─── The config shapes ────────────────────────────────────────────────

// 9. Build the shape a base config is written in — every path anchored.
export type SharedPathConfig = TODO; // TODO(koan)

type _09a = Expect<Equal<SharedPathConfig["outDir"], `${"${configDir}"}/${string}`>>;
type _09b = Expect<Equal<keyof SharedPathConfig, "outDir" | "declarationDir" | "typeRoots" | "paths">>;
type _09c = Expect<Equal<SharedPathConfig["typeRoots"][number], `${"${configDir}"}/${string}`>>;
type _09d = Expect<
  Equal<
    {
      theLiteralBaseConfigFitsTheShape: GivenExtends<BaseConfig, SharedPathConfig>;
      butTheShapeIsNotThatOneConfig: GivenExtends<SharedPathConfig, BaseConfig>;
    },
    { theLiteralBaseConfigFitsTheShape: true; butTheShapeIsNotThatOneConfig: false }
  >
>;

// 10. Build the shape it becomes once the compiler has resolved it. The
//     structure is identical; only the strings changed.
export type ExpandedPathConfig = TODO; // TODO(koan)

type _10a = Expect<Equal<ExpandedPathConfig["outDir"], string>>;
type _10b = Expect<
  Equal<keyof ExpandedPathConfig, "outDir" | "declarationDir" | "typeRoots" | "paths">
>;
type _10c = Expect<Equal<ExpandedPathConfig["typeRoots"][number], string>>;
type _10d = Expect<
  Equal<
    {
      anAnchoredConfigIsAlreadyAnExpandedOne: GivenExtends<SharedPathConfig, ExpandedPathConfig>;
      butAnExpandedOneIsNotAnchored: GivenExtends<ExpandedPathConfig, SharedPathConfig>;
    },
    { anAnchoredConfigIsAlreadyAnExpandedOne: true; butAnExpandedOneIsNotAnchored: false }
  >
>;

// 11. Build the whole-config substitution, nested options included.
export type ExpandConfig<Config extends SharedPathConfig, Dir extends string> = TODO; // TODO(koan)

type _11a = Expect<Equal<ExpandConfig<BaseConfig, "/repo/app">["outDir"], "/repo/app/dist">>;
type _11b = Expect<Equal<ExpandConfig<BaseConfig, "/repo/app">["declarationDir"], "/repo/app/types">>;
type _11c = Expect<
  Equal<
    ExpandConfig<BaseConfig, "/repo/app">["typeRoots"],
    readonly ["/repo/app/node_modules/@types", "/repo/app/custom-types"]
  >
>;
type _11d = Expect<
  Equal<
    ExpandConfig<BaseConfig, "/repo/app">["paths"],
    { readonly "@app/*": readonly ["/repo/app/src/*"] }
  >
>;

// 12. Build the alias map on its own — one alias, several candidate targets.
export type PathAliasMap<Alias extends string, Targets extends readonly string[]> = TODO; // TODO(koan)

type _12a = Expect<
  Equal<PathAliasMap<"@app/*", ["${configDir}/src/*"]>, { readonly "@app/*": ["${configDir}/src/*"] }>
>;
type _12b = Expect<Equal<keyof PathAliasMap<"@app/*" | "@lib/*", []>, "@app/*" | "@lib/*">>;
type _12c = Expect<Equal<PathAliasMap<"@app/*", ["a", "b"]>["@app/*"], ["a", "b"]>>;
type _12d = Expect<Equal<PathAliasMap<never, []>, {}>>;

// ─── What the anchor buys ─────────────────────────────────────────────

// 13. Build the answer to "relative to what?" — the question the token exists to
//     change.
export type ResolutionBase<Path extends string> = TODO; // TODO(koan)

type _13a = Expect<Equal<ResolutionBase<"${configDir}/dist">, "the project being compiled">>;
type _13b = Expect<Equal<ResolutionBase<"./dist">, "the file that declared it">>;
type _13c = Expect<Equal<ResolutionBase<"../shared/dist">, "the file that declared it">>;
type _13d = Expect<Equal<ResolutionBase<"${configDir}">, "the file that declared it">>;

// 14. Build the signature of the runtime expander the koan writes.
export type ExpanderSignature = TODO; // TODO(koan)

type _14a = Expect<Equal<Parameters<ExpanderSignature>, [string, string]>>;
type _14b = Expect<Equal<ReturnType<ExpanderSignature>, string>>;
type _14c = Expect<Equal<Parameters<ExpanderSignature>["length"], 2>>;
type _14d = Expect<
  Equal<
    {
      itIsAnOrdinaryTwoStringFunction: GivenExtends<ExpanderSignature, (a: string, b: string) => string>;
      butNotOneThatReturnsANumber: GivenExtends<(a: string, b: string) => number, ExpanderSignature>;
    },
    { itIsAnOrdinaryTwoStringFunction: true; butNotOneThatReturnsANumber: false }
  >
>;

// 15. Build the signature that expands a whole config, so the two shapes above
//     line up as input and output.
export type ConfigExpanderSignature = TODO; // TODO(koan)

type _15a = Expect<Equal<Parameters<ConfigExpanderSignature>[1], string>>;
type _15b = Expect<Equal<ReturnType<ConfigExpanderSignature>["outDir"], string>>;
type _15c = Expect<Equal<Parameters<ConfigExpanderSignature>["length"], 2>>;
type _15d = Expect<Equal<ReturnType<ConfigExpanderSignature>["typeRoots"][number], string>>;

// 16. Report the point of the whole feature: one written string, two projects,
//     two different resolved paths.
export type InheritanceProfile = TODO; // TODO(koan)

type _16a = Expect<Equal<InheritanceProfile["writtenOnce"], "${configDir}/dist">>;
type _16b = Expect<Equal<InheritanceProfile["inTheFirstProject"], "/repo/app/dist">>;
type _16c = Expect<Equal<InheritanceProfile["inTheSecondProject"], "/repo/tools/dist">>;
type _16d = Expect<Equal<InheritanceProfile["andTheTwoDiffer"], false>>;

// 17. Report what the token is not. Nothing outside the supported options is
//     touched, and a path without the token keeps its old anchor.
export type SubstitutionLimitsProfile = TODO; // TODO(koan)

type _17a = Expect<Equal<SubstitutionLimitsProfile["inAPathOption"], "/r/dist">>;
type _17b = Expect<Equal<SubstitutionLimitsProfile["inSomeOtherOption"], "${configDir}/dist">>;
type _17c = Expect<Equal<SubstitutionLimitsProfile["aPlainRelativePathIsUntouched"], "./dist">>;
type _17d = Expect<Equal<SubstitutionLimitsProfile["andItsAnchorIsUnchanged"], "the file that declared it">>;

// 18. Report one path at a glance: whether it is anchored, what it resolves
//     against, and what it becomes in a given project.
export type ConfigDirReport<Field extends string, Path extends string, Dir extends string> = TODO; // TODO(koan)

type _18a = Expect<Equal<ConfigDirReport<"outDir", "${configDir}/dist", "/r">["anchored"], true>>;
type _18b = Expect<Equal<ConfigDirReport<"outDir", "${configDir}/dist", "/r">["substituted"], "/r/dist">>;
type _18c = Expect<Equal<ConfigDirReport<"outDir", "${configDir}/dist", "/r">["changedAtAll"], false>>;
type _18d = Expect<
  Equal<ConfigDirReport<"target", "${configDir}/dist", "/r">["changedAtAll"], true>
>;
type _18e = Expect<
  Equal<ConfigDirReport<"outDir", "./dist", "/r">["resolvedAgainst"], "the file that declared it">
>;
