import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-206: lib replacement — constructions
 * =============================================================================
 *
 * `lib` decides which declaration families are in the program. Since 4.5 a
 * package named `@typescript/lib-<name>` can *replace* the bundled file for one
 * of them — handy for pinning a DOM version. The catch is that the lookup costs
 * something even when nobody uses it: the compiler probes `node_modules` and
 * keeps watching in case such a package appears. TypeScript 5.8's
 * `libReplacement` flag lets a project say "don't bother".
 *
 * The two options are independent and it is worth keeping them apart: one
 * chooses the families, the other chooses where a chosen family's declarations
 * come from. Neither installs anything at runtime — a declaration file describes
 * globals; it does not create them. Build the package name, the resolution, and
 * the cost that is paid either way.
 * Replace each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

// ─── The two settings ─────────────────────────────────────────────────

// 1. Build the library families this koan chooses between.
export type StandardLibFamily = TODO; // TODO(koan)

type _01a = Expect<Equal<StandardLibFamily, "dom" | "es2024" | "webworker">>;
type _01b = Expect<Equal<Extract<StandardLibFamily, `es${number}`>, "es2024">>;
type _01c = Expect<Equal<Exclude<StandardLibFamily, "dom">, "es2024" | "webworker">>;
type _01d = Expect<Equal<Extract<StandardLibFamily, "node">, never>>;

// 2. Build the flag that decides whether replacement lookup happens at all.
export type LibReplacementSetting = TODO; // TODO(koan)

type _02a = Expect<Equal<LibReplacementSetting, "enabled" | "disabled">>;
type _02b = Expect<Equal<Exclude<LibReplacementSetting, "enabled">, "disabled">>;
type _02c = Expect<Equal<Extract<LibReplacementSetting, "enabled">, "enabled">>;
type _02d = Expect<Equal<Extract<LibReplacementSetting, "auto">, never>>;

// 3. Build whether the replacement package is actually there.
export type ReplacementPackageState = TODO; // TODO(koan)

type _03a = Expect<Equal<ReplacementPackageState, "installed" | "missing">>;
type _03b = Expect<Equal<Exclude<ReplacementPackageState, "missing">, "installed">>;
type _03c = Expect<Equal<Extract<ReplacementPackageState, "missing">, "missing">>;
type _03d = Expect<Equal<Extract<ReplacementPackageState, "stale">, never>>;

// 4. Build where a family's declarations came from in the end.
export type LibDeclarationSource = TODO; // TODO(koan)

type _04a = Expect<Equal<LibDeclarationSource, "replacement-package" | "bundled-lib">>;
type _04b = Expect<Equal<Extract<LibDeclarationSource, `${string}package`>, "replacement-package">>;
type _04c = Expect<Equal<Exclude<LibDeclarationSource, "replacement-package">, "bundled-lib">>;
type _04d = Expect<Equal<Extract<LibDeclarationSource, "ambient-declaration">, never>>;

// ─── The package name ─────────────────────────────────────────────────

// 5. Build the name the compiler looks for. The family name is lowercased,
//     because that is how the packages are published.
export type ReplacementPackageName<
  Lib extends string,
> = TODO; // TODO(koan)

type _05a = Expect<Equal<ReplacementPackageName<"dom">, "@typescript/lib-dom">>;
type _05b = Expect<Equal<ReplacementPackageName<"ES2024">, "@typescript/lib-es2024">>;
type _05c = Expect<Equal<ReplacementPackageName<StandardLibFamily>, "@typescript/lib-dom" | "@typescript/lib-es2024" | "@typescript/lib-webworker">>;
type _05d = Expect<
  Equal<
    ReplacementPackageName<"dom"> extends `@typescript/lib-${infer Name}` ? Name : never,
    "dom"
  >
>;

// 6. Build the reader that recovers the family from a package name.
export type FamilyOfPackage<Package extends string> = TODO; // TODO(koan)

type _06a = Expect<Equal<FamilyOfPackage<"@typescript/lib-dom">, "dom">>;
type _06b = Expect<Equal<FamilyOfPackage<"@typescript/lib-es2024">, "es2024">>;
type _06c = Expect<Equal<FamilyOfPackage<"typescript">, never>>;
type _06d = Expect<
  Equal<FamilyOfPackage<ReplacementPackageName<"webworker">>, "webworker">
>;

// ─── The resolution ───────────────────────────────────────────────────

// 7. Build the resolution. Both conditions have to hold; either one missing and
//    the bundled file is used.
export type ResolveLibDeclarations<
  Setting extends LibReplacementSetting,
  Package extends ReplacementPackageState,
> = TODO; // TODO(koan)

type _07a = Expect<Equal<ResolveLibDeclarations<"enabled", "installed">, "replacement-package">>;
type _07b = Expect<Equal<ResolveLibDeclarations<"enabled", "missing">, "bundled-lib">>;
type _07c = Expect<Equal<ResolveLibDeclarations<"disabled", "installed">, "bundled-lib">>;
type _07d = Expect<Equal<ResolveLibDeclarations<"disabled", "missing">, "bundled-lib">>;
type _07e = Expect<
  Equal<ResolveLibDeclarations<LibReplacementSetting, "installed">, "replacement-package" | "bundled-lib">
>;

// 8. Build the cost the flag exists to remove: with lookup enabled the compiler
//    probes and watches whether or not anything is found.
export type ProbesNodeModules<Setting extends LibReplacementSetting> = TODO; // TODO(koan)

type _08a = Expect<Equal<ProbesNodeModules<"enabled">, true>>;
type _08b = Expect<Equal<ProbesNodeModules<"disabled">, false>>;
type _08c = Expect<Equal<ProbesNodeModules<LibReplacementSetting>, boolean>>;
type _08d = Expect<Equal<Equal<ProbesNodeModules<"enabled">, ProbesNodeModules<"disabled">>, false>>;

// 9. Build the whole picture for one family: where the declarations came from
//    and whether the lookup was paid for.
export type LibResolution<
  Lib extends StandardLibFamily,
  Setting extends LibReplacementSetting,
  Package extends ReplacementPackageState,
> = TODO; // TODO(koan)

type _09a = Expect<
  Equal<LibResolution<"dom", "enabled", "installed">["source"], "replacement-package">
>;
type _09b = Expect<Equal<LibResolution<"dom", "enabled", "missing">["lookedFor"], "@typescript/lib-dom">>;
type _09c = Expect<Equal<LibResolution<"dom", "disabled", "installed">["probed"], false>>;
type _09d = Expect<Equal<LibResolution<"es2024", "enabled", "installed">["lib"], "es2024">>;

// ─── The families in the program ──────────────────────────────────────

// 10. Build the set of families a `lib` setting selects. This is the other
//     option, and it decides membership rather than sourcing.
export type SelectedFamilies<
  Libs extends readonly StandardLibFamily[],
> = TODO; // TODO(koan)

type _10a = Expect<Equal<SelectedFamilies<["dom", "es2024"]>, "dom" | "es2024">>;
type _10b = Expect<Equal<SelectedFamilies<["es2024"]>, "es2024">>;
type _10c = Expect<Equal<SelectedFamilies<[]>, never>>;
type _10d = Expect<
  Equal<SelectedFamilies<["dom", "es2024", "webworker"]>, "dom" | "es2024" | "webworker">
>;

// 11. Build the membership question, since replacement only applies to families
//     that are in the program in the first place.
export type IsSelected<
  Lib extends StandardLibFamily,
  Libs extends readonly StandardLibFamily[],
> = TODO; // TODO(koan)

type _11a = Expect<Equal<IsSelected<"dom", ["dom", "es2024"]>, true>>;
type _11b = Expect<Equal<IsSelected<"webworker", ["dom", "es2024"]>, false>>;
type _11c = Expect<Equal<IsSelected<"dom", []>, false>>;
type _11d = Expect<Equal<IsSelected<StandardLibFamily, ["dom"]>, boolean>>;

// 12. Build the sourcing of every selected family at once — the shape a build
//     would actually report.
export type SourcesFor<
  Libs extends readonly StandardLibFamily[],
  Setting extends LibReplacementSetting,
  Package extends ReplacementPackageState,
> = TODO; // TODO(koan)

type _12a = Expect<
  Equal<
    SourcesFor<["dom", "es2024"], "enabled", "installed">,
    { dom: "replacement-package"; es2024: "replacement-package" }
  >
>;
type _12b = Expect<
  Equal<SourcesFor<["dom"], "disabled", "installed">, { dom: "bundled-lib" }>
>;
type _12c = Expect<Equal<SourcesFor<[], "enabled", "installed">, {}>>;
type _12d = Expect<Equal<keyof SourcesFor<["dom", "webworker"], "enabled", "missing">, "dom" | "webworker">>;

// ─── What neither option does ─────────────────────────────────────────

// 13. Build the claims the two options might be confused with.
export type Claim = TODO; // TODO(koan)

type _13a = Expect<
  Equal<
    Claim,
    "theFamilyIsInTheProgram" | "itsDeclarationsCameFromAPackage" | "theGlobalsExistAtRuntime" | "theHostImplementsThem"
  >
>;
type _13b = Expect<Equal<Extract<Claim, `the${"G" | "H"}${string}`>, "theGlobalsExistAtRuntime" | "theHostImplementsThem">>;
type _13c = Expect<Equal<Extract<Claim, `its${string}`>, "itsDeclarationsCameFromAPackage">>;
type _13d = Expect<Equal<Extract<Claim, "theTypesAreCorrect">, never>>;

// 14. Build which option, if any, settles each claim. The last two are not
//     anybody's compile-time business.
export type SettledBy<TheClaim extends Claim> = TODO; // TODO(koan)

type _14a = Expect<Equal<SettledBy<"theFamilyIsInTheProgram">, "lib">>;
type _14b = Expect<Equal<SettledBy<"itsDeclarationsCameFromAPackage">, "libReplacement">>;
type _14c = Expect<Equal<SettledBy<"theGlobalsExistAtRuntime">, "neither">>;
type _14d = Expect<Equal<SettledBy<"theHostImplementsThem">, "neither">>;
type _14e = Expect<Equal<SettledBy<Claim>, "lib" | "libReplacement" | "neither">>;

// 15. Build the independence directly: changing one option never changes what
//     the other decides.
export type OptionsAreIndependent = TODO; // TODO(koan)

type _15a = Expect<Equal<OptionsAreIndependent["membershipIgnoresSourcing"], true>>;
type _15b = Expect<Equal<OptionsAreIndependent["sourcingIgnoresMembership"], true>>;
type _15c = Expect<Equal<OptionsAreIndependent["aFamilyCanBeSelectedAndBundled"], "bundled-lib">>;
type _15d = Expect<
  Equal<OptionsAreIndependent["aFamilyCanBeSelectedAndReplaced"], "replacement-package">
>;

// ─── Reading it back ──────────────────────────────────────────────────

// 16. Report the four rows the koan tabulates.
export type CaseProfile = TODO; // TODO(koan)

type _16a = Expect<Equal<CaseProfile["enabledAndInstalled"], "replacement-package">>;
type _16b = Expect<Equal<CaseProfile["enabledButMissing"], "bundled-lib">>;
type _16c = Expect<Equal<CaseProfile["disabledButInstalled"], "bundled-lib">>;
type _16d = Expect<Equal<CaseProfile["andOnlyTheFirstUsedAPackage"], false>>;

// 17. Report the cost. Two of those rows produced the same declarations; only
//     one of them paid for a lookup to find that out.
export type CostProfile = TODO; // TODO(koan)

type _17a = Expect<Equal<CostProfile["enabledButMissingStillProbed"], true>>;
type _17b = Expect<Equal<CostProfile["disabledDidNot"], false>>;
type _17c = Expect<Equal<CostProfile["andBothEndedUpWithTheSameSource"], true>>;
type _17d = Expect<Equal<CostProfile["whichIsTheBundledFile"], "bundled-lib">>;

// 18. Report one family at a glance: whether it is in the program, what package
//     would have replaced it, where its declarations came from, and what none of
//     that proves.
export type LibReplacementReport<
  Lib extends StandardLibFamily,
  Libs extends readonly StandardLibFamily[],
  Setting extends LibReplacementSetting,
  Package extends ReplacementPackageState,
> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<LibReplacementReport<"dom", ["dom"], "enabled", "installed">["selected"], true>
>;
type _18b = Expect<
  Equal<LibReplacementReport<"dom", ["dom"], "enabled", "installed">["candidatePackage"], "@typescript/lib-dom">
>;
type _18c = Expect<
  Equal<LibReplacementReport<"dom", ["dom"], "enabled", "installed">["source"], "replacement-package">
>;
type _18d = Expect<
  Equal<LibReplacementReport<"dom", ["es2024"], "disabled", "installed">["selected"], false>
>;
type _18e = Expect<
  Equal<LibReplacementReport<"dom", ["dom"], "enabled", "installed">["provesTheGlobalsExist"], "neither">
>;
