import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-226: the compiler API and side-by-side use — constructions
 * =============================================================================
 *
 * The native release ships a fast executable and an LSP server; what it does not
 * ship on day one is the old programmatic API. That is survivable because the two
 * packages coexist: the compatibility package keeps a non-conflicting CLI and the
 * exported 6.0 API, so a repository can typecheck with the native compiler while
 * a code generator or a lint rule keeps calling the JavaScript one.
 *
 * The decision is therefore per *consumer*, not per repository. A project check
 * moves immediately; an editor moves immediately; a programmatic consumer stays
 * until the documented new API arrives, and framework tooling has to be looked at
 * one package at a time. Build the consumer table, the coexistence, and the
 * question each consumer actually has to answer.
 * Replace each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

// ─── Who is asking ────────────────────────────────────────────────────

// 1. Build the kinds of consumer a repository has.
export type Consumer = TODO; // TODO(koan)

type _01a = Expect<
  Equal<Consumer, "project check" | "editor" | "programmatic tool" | "framework tooling">
>;
type _01b = Expect<
  Equal<Extract<Consumer, `${string}tool` | `${string}tooling`>, "programmatic tool" | "framework tooling">
>;
type _01c = Expect<Equal<Extract<Consumer, "editor">, "editor">>;
type _01d = Expect<Equal<Extract<Consumer, "bundler">, never>>;

// 2. Build what each consumer talks to. This is what decides whether it can move.
export type SurfaceUsedBy<TheConsumer extends Consumer> = TODO; // TODO(koan)

type _02a = Expect<Equal<SurfaceUsedBy<"project check">, "the cli">>;
type _02b = Expect<Equal<SurfaceUsedBy<"editor">, "the language server">>;
type _02c = Expect<Equal<SurfaceUsedBy<"programmatic tool">, "the javascript api">>;
type _02d = Expect<Equal<SurfaceUsedBy<"framework tooling">, "the javascript api">>;
type _02e = Expect<
  Equal<SurfaceUsedBy<Consumer>, "the cli" | "the language server" | "the javascript api">
>;

// 3. Build which surfaces the native release provides.
export type ProvidedByNative<
  Surface extends "the cli" | "the language server" | "the javascript api",
> = TODO; // TODO(koan)

type _03a = Expect<Equal<ProvidedByNative<"the cli">, true>>;
type _03b = Expect<Equal<ProvidedByNative<"the language server">, true>>;
type _03c = Expect<Equal<ProvidedByNative<"the javascript api">, false>>;
type _03d = Expect<
  Equal<ProvidedByNative<"the cli" | "the javascript api">, boolean>
>;

// 4. Build the recommendation for each consumer, which follows from the two
//    tables above rather than from taste.
export type MoveTo<TheConsumer extends Consumer> = TODO; // TODO(koan)

type _04a = Expect<Equal<MoveTo<"project check">, "the native package">>;
type _04b = Expect<Equal<MoveTo<"editor">, "the native package">>;
type _04c = Expect<Equal<MoveTo<"programmatic tool">, "the compatibility package">>;
type _04d = Expect<Equal<MoveTo<"framework tooling">, "the compatibility package">>;
type _04e = Expect<Equal<MoveTo<Consumer>, "the native package" | "the compatibility package">>;

// ─── The two packages ─────────────────────────────────────────────────

// 5. Build the packages a repository can have installed.
export type Package = TODO; // TODO(koan)

type _05a = Expect<Equal<Package, "native" | "compatibility">>;
type _05b = Expect<Equal<Exclude<Package, "native">, "compatibility">>;
type _05c = Expect<Equal<Extract<Package, "native">, "native">>;
type _05d = Expect<Equal<Extract<Package, "nightly">, never>>;

// 6. Build the executable each one installs. They differ, which is what makes
//    having both possible.
export type BinaryOf<ThePackage extends Package> = TODO; // TODO(koan)

type _06a = Expect<Equal<BinaryOf<"native">, "tsc">>;
type _06b = Expect<Equal<BinaryOf<"compatibility">, "tsc6">>;
type _06c = Expect<Equal<BinaryOf<Package>, "tsc" | "tsc6">>;
type _06d = Expect<Equal<Equal<BinaryOf<"native">, BinaryOf<"compatibility">>, false>>;

// 7. Build the coexistence check: two packages can be installed together exactly
//    when their binaries do not collide.
export type CanCoexist<Left extends Package, Right extends Package> = TODO; // TODO(koan)

type _07a = Expect<Equal<CanCoexist<"native", "compatibility">, true>>;
type _07b = Expect<Equal<CanCoexist<"native", "native">, false>>;
type _07c = Expect<Equal<CanCoexist<"compatibility", "compatibility">, false>>;
type _07d = Expect<Equal<CanCoexist<"compatibility", "native">, true>>;

// 8. Build what each package exports to a program that imports it.
export type ExportsApi<ThePackage extends Package> = TODO; // TODO(koan)

type _08a = Expect<Equal<ExportsApi<"compatibility">, true>>;
type _08b = Expect<Equal<ExportsApi<"native">, false>>;
type _08c = Expect<Equal<ExportsApi<Package>, boolean>>;
type _08d = Expect<Equal<Equal<ExportsApi<"native">, ExportsApi<"compatibility">>, false>>;

// 9. Build the packages a given set of consumers requires.
export type PackagesNeededBy<
  Consumers extends readonly Consumer[],
> = TODO; // TODO(koan)

type _09a = Expect<Equal<PackagesNeededBy<["project check"]>, "native">>;
type _09b = Expect<Equal<PackagesNeededBy<["programmatic tool"]>, "compatibility">>;
type _09c = Expect<
  Equal<PackagesNeededBy<["project check", "programmatic tool"]>, "native" | "compatibility">
>;
type _09d = Expect<Equal<PackagesNeededBy<[]>, never>>;

// 10. Build whether a repository has to install both, which is the practical
//     question a migration answers first.
export type NeedsBoth<Consumers extends readonly Consumer[]> = TODO; // TODO(koan)

type _10a = Expect<Equal<NeedsBoth<["project check", "programmatic tool"]>, true>>;
type _10b = Expect<Equal<NeedsBoth<["project check", "editor"]>, false>>;
type _10c = Expect<Equal<NeedsBoth<["programmatic tool"]>, false>>;
type _10d = Expect<Equal<NeedsBoth<[]>, false>>;

// ─── What the old consumers are waiting for ───────────────────────────

// 11. Build the milestones a programmatic consumer's plan hangs on.
export type Milestone = TODO; // TODO(koan)

type _11a = Expect<Equal<Milestone, "today" | "the documented new api" | "never">>;
type _11b = Expect<Equal<Extract<Milestone, `the ${string}`>, "the documented new api">>;
type _11c = Expect<Equal<Exclude<Milestone, "never">, "today" | "the documented new api">>;
type _11d = Expect<Equal<Extract<Milestone, "next week">, never>>;

// 12. Build when each consumer can move to the native package.
export type MovesAt<TheConsumer extends Consumer> = TODO; // TODO(koan)

type _12a = Expect<Equal<MovesAt<"project check">, "today">>;
type _12b = Expect<Equal<MovesAt<"editor">, "today">>;
type _12c = Expect<Equal<MovesAt<"programmatic tool">, "the documented new api">>;
type _12d = Expect<Equal<MovesAt<Consumer>, "today" | "the documented new api">>;

// 13. Build the extra work framework tooling has that a plain programmatic
//     consumer does not: it has to be evaluated package by package.
export type RequiresEvaluation<TheConsumer extends Consumer> = TODO; // TODO(koan)

type _13a = Expect<Equal<RequiresEvaluation<"framework tooling">, true>>;
type _13b = Expect<Equal<RequiresEvaluation<"programmatic tool">, false>>;
type _13c = Expect<Equal<RequiresEvaluation<"project check">, false>>;
type _13d = Expect<Equal<RequiresEvaluation<Consumer>, boolean>>;

// ─── What using both means ────────────────────────────────────────────

// 14. Build the claims a side-by-side setup might be read as making.
export type Claim = TODO; // TODO(koan)

type _14a = Expect<
  Equal<
    Claim,
    | "eachConsumerHasAWorkingCompiler"
    | "bothCompilersAgreeOnTheProgram"
    | "theOldApiIsSupportedForever"
    | "onlyOneCompilerIsInstalled"
  >
>;
type _14b = Expect<Equal<Extract<Claim, `only${string}`>, "onlyOneCompilerIsInstalled">>;
type _14c = Expect<Equal<Extract<Claim, `theOld${string}`>, "theOldApiIsSupportedForever">>;
type _14d = Expect<Equal<Extract<Claim, "theBuildIsFaster">, never>>;

// 15. Build which of them a side-by-side setup supports. Agreement is the one
//     you have to go and check; the last two are false by construction.
export type SupportedBySideBySide<TheClaim extends Claim> = TODO; // TODO(koan)

type _15a = Expect<Equal<SupportedBySideBySide<"eachConsumerHasAWorkingCompiler">, true>>;
type _15b = Expect<Equal<SupportedBySideBySide<"bothCompilersAgreeOnTheProgram">, false>>;
type _15c = Expect<Equal<SupportedBySideBySide<"theOldApiIsSupportedForever">, false>>;
type _15d = Expect<Equal<SupportedBySideBySide<"onlyOneCompilerIsInstalled">, false>>;
type _15e = Expect<Equal<SupportedBySideBySide<Claim>, boolean>>;

// ─── Reading it back ──────────────────────────────────────────────────

// 16. Report where each consumer should go and when.
export type ConsumerProfile = TODO; // TODO(koan)

type _16a = Expect<Equal<ConsumerProfile["project check"], "the native package">>;
type _16b = Expect<Equal<ConsumerProfile["editor"], "the native package">>;
type _16c = Expect<Equal<ConsumerProfile["programmatic tool"], "the compatibility package">>;
type _16d = Expect<Equal<ConsumerProfile["framework tooling"], "the compatibility package">>;
type _16e = Expect<Equal<keyof ConsumerProfile, Consumer>>;

// 17. Report a repository with both kinds of consumer — the common case, and the
//     one the two packages were designed for.
export type MixedRepositoryProfile = TODO; // TODO(koan)

type _17a = Expect<Equal<MixedRepositoryProfile["packages"], "native" | "compatibility">>;
type _17b = Expect<Equal<MixedRepositoryProfile["bothRequired"], true>>;
type _17c = Expect<Equal<MixedRepositoryProfile["theyCanCoexist"], true>>;
type _17d = Expect<Equal<MixedRepositoryProfile["becauseTheBinariesDiffer"], "tsc6">>;
type _17e = Expect<Equal<MixedRepositoryProfile["andTheApiComesFrom"], true>>;

// 18. Report one consumer at a glance: what it talks to, where it should go,
//     when, and whether it needs a package-by-package look.
export type AdoptionReport<
  TheConsumer extends Consumer,
  Consumers extends readonly Consumer[],
> = TODO; // TODO(koan)

type _18a = Expect<Equal<AdoptionReport<"project check", ["project check"]>["surface"], "the cli">>;
type _18b = Expect<
  Equal<AdoptionReport<"project check", ["project check"]>["destination"], "the native package">
>;
type _18c = Expect<
  Equal<AdoptionReport<"programmatic tool", ["programmatic tool"]>["timing"], "the documented new api">
>;
type _18d = Expect<
  Equal<AdoptionReport<"framework tooling", ["framework tooling"]>["evaluationNeeded"], true>
>;
type _18e = Expect<
  Equal<AdoptionReport<"project check", ["project check", "programmatic tool"]>["repositoryNeedsBoth"], true>
>;
