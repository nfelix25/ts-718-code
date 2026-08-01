import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-195: unchecked side-effect imports — constructions
 * =============================================================================
 *
 * `import "./setup.js"` asks a module to run without taking anything from it.
 * Before TypeScript 5.6 that request was checked only when it happened to
 * resolve: a specifier that resolved to nothing was quietly dropped, so a typo
 * in a side-effect import was invisible. `noUncheckedSideEffectImports` removes
 * the asymmetry — an unresolvable binding-free import is now the ordinary
 * module-resolution error it always should have been.
 *
 * That makes the *asset* case explicit. `import "./button.css"` only typechecks
 * because some `declare module "*.css" {}` says specifiers of that shape are
 * modules — a claim about shape, not about the file existing, the bundler
 * loading it, or the effect happening. Build the resolution outcomes, the
 * wildcard matching that admits assets, and what the declaration does not prove.
 * Replace each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

// ─── The three outcomes ───────────────────────────────────────────────

// 1. Build what a specifier can resolve to.
export type SideEffectResolution = TODO; // TODO(koan)

type _01a = Expect<Equal<SideEffectResolution, "source-file" | "ambient-module" | "missing">>;
type _01b = Expect<Equal<Exclude<SideEffectResolution, "missing">, "source-file" | "ambient-module">>;
type _01c = Expect<Equal<Extract<SideEffectResolution, `${string}-module`>, "ambient-module">>;
type _01d = Expect<Equal<Extract<SideEffectResolution, "node-builtin">, never>>;

// 2. Build what the compiler says about each of them.
export type SideEffectCheck = TODO; // TODO(koan)

type _02a = Expect<
  Equal<SideEffectCheck, "checked-source" | "accepted-declaration" | "unresolved-error">
>;
type _02b = Expect<Equal<Extract<SideEffectCheck, `${string}error`>, "unresolved-error">>;
type _02c = Expect<
  Equal<Exclude<SideEffectCheck, `${string}error`>, "checked-source" | "accepted-declaration">
>;
type _02d = Expect<Equal<Extract<SideEffectCheck, "silently-ignored">, never>>;

// 3. Build one row of the audit, with the specifier kept as a literal.
export type SideEffectImportCase<
  Specifier extends string,
  Resolution extends SideEffectResolution,
> = TODO; // TODO(koan)

type _03a = Expect<Equal<SideEffectImportCase<"./a.js", "source-file">["specifier"], "./a.js">>;
type _03b = Expect<Equal<SideEffectImportCase<"./a.js", "source-file">["resolution"], "source-file">>;
type _03c = Expect<Equal<keyof SideEffectImportCase<"./a.js", "missing">, "specifier" | "resolution">>;
type _03d = Expect<
  Equal<
    SideEffectImportCase<"./a.js", "source-file"> | SideEffectImportCase<"./b.css", "ambient-module">,
    { specifier: "./a.js"; resolution: "source-file" } | { specifier: "./b.css"; resolution: "ambient-module" }
  >
>;

// 4. Build the mapping from what happened to what is reported.
export type Audit<Resolution extends SideEffectResolution> = TODO; // TODO(koan)

type _04a = Expect<Equal<Audit<"source-file">, "checked-source">>;
type _04b = Expect<Equal<Audit<"ambient-module">, "accepted-declaration">>;
type _04c = Expect<Equal<Audit<"missing">, "unresolved-error">>;
type _04d = Expect<
  Equal<Audit<SideEffectResolution>, "checked-source" | "accepted-declaration" | "unresolved-error">
>;

// ─── What the option changed ──────────────────────────────────────────

// 5. Build the outcome set that includes the old behaviour — the one the option
//    exists to remove.
export type LegacyCheck = TODO; // TODO(koan)

type _05a = Expect<
  Equal<
    LegacyCheck,
    "checked-source" | "accepted-declaration" | "unresolved-error" | "silently-ignored"
  >
>;
type _05b = Expect<Equal<Extract<LegacyCheck, "silently-ignored">, "silently-ignored">>;
type _05c = Expect<
  Equal<Exclude<LegacyCheck, "silently-ignored">, "checked-source" | "accepted-declaration" | "unresolved-error">
>;
type _05d = Expect<Equal<Extract<LegacyCheck, `${string}ignored`>, "silently-ignored">>;

// 6. Build the outcome under each setting. Only one row moves, and it is the one
//    that used to hide a typo.
export type CheckedUnder<
  Option extends "on" | "off",
  Resolution extends SideEffectResolution,
> = TODO; // TODO(koan)

type _06a = Expect<Equal<CheckedUnder<"on", "missing">, "unresolved-error">>;
type _06b = Expect<Equal<CheckedUnder<"off", "missing">, "silently-ignored">>;
type _06c = Expect<Equal<CheckedUnder<"off", "source-file">, "checked-source">>;
type _06d = Expect<Equal<CheckedUnder<"on", "ambient-module">, "accepted-declaration">>;
type _06e = Expect<
  Equal<
    {
      theSourceFileRowIsUnchanged: Equal<
        CheckedUnder<"on", "source-file">,
        CheckedUnder<"off", "source-file">
      >;
      andItIsTheOrdinaryCheck: CheckedUnder<"on", "source-file">;
    },
    { theSourceFileRowIsUnchanged: true; andItIsTheOrdinaryCheck: "checked-source" }
  >
>;

// ─── Specifiers and wildcards ─────────────────────────────────────────

// 7. Build the statement itself, as the source text it renders to.
export type RenderImport<Specifier extends string> = TODO; // TODO(koan)

type _07a = Expect<Equal<RenderImport<"./register.js">, 'import "./register.js";'>>;
type _07b = Expect<Equal<RenderImport<"./button.css">, 'import "./button.css";'>>;
type _07c = Expect<
  Equal<
    {
      itNamesNoBindings: GivenExtends<RenderImport<"./a.js">, `import "${string}";`>;
      andItIsNotANamedImport: GivenExtends<RenderImport<"./a.js">, `import {${string}`>;
    },
    { itNamesNoBindings: true; andItIsNotANamedImport: false }
  >
>;
type _07d = Expect<Equal<RenderImport<"">, 'import "";'>>;

// 8. Build the wildcard an ambient declaration is written against.
export type WildcardPattern<Extension extends string> = TODO; // TODO(koan)

type _08a = Expect<Equal<WildcardPattern<"css">, "*.css">>;
type _08b = Expect<Equal<WildcardPattern<"svg">, "*.svg">>;
type _08c = Expect<Equal<WildcardPattern<"css" | "svg">, "*.css" | "*.svg">>;
type _08d = Expect<Equal<WildcardPattern<"">, "*.">>;

// 9. Build the reader for a specifier's extension. The path may contain several
//    dots, so this has to keep going until the last one.
export type ExtensionOf<Specifier extends string> = TODO; // TODO(koan)

type _09a = Expect<Equal<ExtensionOf<"./button.css">, "css">>;
type _09b = Expect<Equal<ExtensionOf<"./register.js">, "js">>;
type _09c = Expect<Equal<ExtensionOf<"./a.b.c.svg">, "svg">>;
type _09d = Expect<Equal<ExtensionOf<"register">, "">>;

// 10. Build the match. A wildcard admits a specifier when the suffix agrees, and
//     that is the whole of what the declaration checks.
export type MatchesWildcard<
  Specifier extends string,
  Pattern extends string,
> = TODO; // TODO(koan)

type _10a = Expect<Equal<MatchesWildcard<"./button.css", "*.css">, true>>;
type _10b = Expect<Equal<MatchesWildcard<"./button.css", "*.svg">, false>>;
type _10c = Expect<Equal<MatchesWildcard<"./register.js", "./register.js">, false>>;
type _10d = Expect<Equal<MatchesWildcard<"./button.css", "*.css" | "*.svg">, true | false>>;

// 11. Build the resolver: a known source file wins, then any wildcard, then the
//     specifier resolves to nothing at all.
export type ResolutionOf<
  Specifier extends string,
  Sources extends readonly string[],
  Patterns extends readonly string[],
> = TODO; // TODO(koan)

type _11a = Expect<
  Equal<ResolutionOf<"./register.js", ["./register.js"], ["*.css"]>, "source-file">
>;
type _11b = Expect<Equal<ResolutionOf<"./button.css", ["./register.js"], ["*.css"]>, "ambient-module">>;
type _11c = Expect<Equal<ResolutionOf<"./regitser.js", ["./register.js"], ["*.css"]>, "missing">>;
type _11d = Expect<Equal<ResolutionOf<"./button.css", [], []>, "missing">>;

// ─── What the declaration promises ────────────────────────────────────

// 12. Build the ambient declaration a wildcard lives in.
export type AmbientDeclaration<
  Pattern extends string,
> = TODO; // TODO(koan)

type _12a = Expect<Equal<AmbientDeclaration<"*.css">, 'declare module "*.css" {}'>>;
type _12b = Expect<
  Equal<AmbientDeclaration<WildcardPattern<"svg">>, 'declare module "*.svg" {}'>
>;
type _12c = Expect<
  Equal<
    {
      itIsADeclaration: GivenExtends<AmbientDeclaration<"*.css">, `declare module ${string}`>;
      andItDeclaresNoExports: AmbientDeclaration<"*.css"> extends `${string}{${infer Body}}`
        ? Body
        : never;
    },
    { itIsADeclaration: true; andItDeclaresNoExports: "" }
  >
>;
type _12d = Expect<
  Equal<
    AmbientDeclaration<"*.css"> extends `declare module "${infer Pattern}" {}` ? Pattern : never,
    "*.css"
  >
>;

// 13. Build the things one might hope such a declaration proves.
export type Guarantee = TODO; // TODO(koan)

type _13a = Expect<
  Equal<
    Guarantee,
    "theSpecifierHasAModuleShape" | "theFileExists" | "theBundlerCanLoadIt" | "theEffectHappens"
  >
>;
type _13b = Expect<Equal<Extract<Guarantee, `the${"File" | "Bundler"}${string}`>, "theFileExists" | "theBundlerCanLoadIt">>;
type _13c = Expect<
  Equal<Exclude<Guarantee, "theSpecifierHasAModuleShape">, "theFileExists" | "theBundlerCanLoadIt" | "theEffectHappens">
>;
type _13d = Expect<Equal<Extract<Guarantee, "theTypesAreCorrect">, never>>;

// 14. Build which of them it actually delivers. Exactly one.
export type ProvedByDeclaration<Claim extends Guarantee> = TODO; // TODO(koan)

type _14a = Expect<Equal<ProvedByDeclaration<"theSpecifierHasAModuleShape">, true>>;
type _14b = Expect<Equal<ProvedByDeclaration<"theFileExists">, false>>;
type _14c = Expect<Equal<ProvedByDeclaration<"theBundlerCanLoadIt">, false>>;
type _14d = Expect<Equal<ProvedByDeclaration<"theEffectHappens">, false>>;
type _14e = Expect<Equal<ProvedByDeclaration<Guarantee>, boolean>>;

// 15. Build the names each import form puts in scope. A side-effect import
//     contributes none, which is exactly why it used to be skippable.
export type BindingsOf<
  Form extends "sideEffect" | "named" | "namespace",
  Name extends string,
> = TODO; // TODO(koan)

type _15a = Expect<Equal<BindingsOf<"sideEffect", "setup">, never>>;
type _15b = Expect<Equal<BindingsOf<"named", "setup">, "setup">>;
type _15c = Expect<Equal<BindingsOf<"namespace", "setup">, "setup">>;
type _15d = Expect<Equal<BindingsOf<"sideEffect" | "named", "setup">, "setup">>;

// ─── The audit ────────────────────────────────────────────────────────

// 16. Report the three cases the koan collects, under the option.
export type CaseProfile = TODO; // TODO(koan)

type _16a = Expect<Equal<CaseProfile["aRealSourceFile"], "checked-source">>;
type _16b = Expect<Equal<CaseProfile["anAssetCoveredByADeclaration"], "accepted-declaration">>;
type _16c = Expect<Equal<CaseProfile["aMisspelledSpecifier"], "unresolved-error">>;
type _16d = Expect<Equal<CaseProfile["andTheAssetsExtension"], "css">>;

// 17. Report the typo under both settings — the single row that made the option
//     worth adding.
export type TypoProfile = TODO; // TODO(koan)

type _17a = Expect<Equal<TypoProfile["withTheOptionOff"], "silently-ignored">>;
type _17b = Expect<Equal<TypoProfile["withTheOptionOn"], "unresolved-error">>;
type _17c = Expect<Equal<TypoProfile["andTheyDiffer"], false>>;
type _17d = Expect<Equal<TypoProfile["whileEveryOtherRowIsUnchanged"], true>>;

// 18. Report one import at a glance: the statement, where it resolves, what the
//     compiler says, and what nobody has proved.
export type SideEffectReport<
  Specifier extends string,
  Sources extends readonly string[],
  Patterns extends readonly string[],
> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<SideEffectReport<"./button.css", [], ["*.css"]>["statement"], 'import "./button.css";'>
>;
type _18b = Expect<Equal<SideEffectReport<"./button.css", [], ["*.css"]>["resolution"], "ambient-module">>;
type _18c = Expect<Equal<SideEffectReport<"./button.css", [], ["*.css"]>["check"], "accepted-declaration">>;
type _18d = Expect<Equal<SideEffectReport<"./button.css", [], ["*.css"]>["bindings"], never>>;
type _18e = Expect<Equal<SideEffectReport<"./nope.js", [], ["*.css"]>["check"], "unresolved-error">>;
