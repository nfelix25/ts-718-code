import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-211: modern compiler defaults — constructions
 * =============================================================================
 *
 * TypeScript 6.0 moves the zero-configuration starting point: strict checking on,
 * ES modules, a current-year target, side-effect imports checked, standard-lib
 * replacement probing off, and no ambient `@types` enumeration. Read those as
 * assumptions about a modern project rather than as a config file — the compiler
 * is guessing well, not deciding for you.
 *
 * The distinction that matters is which defaults are *pinned* and which *float*.
 * A floating default is convenient for an experiment and dangerous for a
 * deployed artifact, because the same source can mean something different after
 * an upgrade. Build the default table, the pinned/floating split, and what a
 * checked-in configuration overrides.
 * Replace each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

// ─── The defaults ─────────────────────────────────────────────────────

// 1. Build the settings whose defaults 6.0 changed.
export type DefaultedOption = TODO; // TODO(koan)

type _01a = Expect<
  Equal<
    DefaultedOption,
    "strict" | "module" | "target" | "noUncheckedSideEffectImports" | "libReplacement" | "types"
  >
>;
type _01b = Expect<Equal<Extract<DefaultedOption, `no${string}`>, "noUncheckedSideEffectImports">>;
type _01c = Expect<
  Equal<Exclude<DefaultedOption, "strict" | "module" | "target">, "noUncheckedSideEffectImports" | "libReplacement" | "types">
>;
type _01d = Expect<Equal<Extract<DefaultedOption, "jsx">, never>>;

// 2. Build the default value each one now takes.
export type DefaultFor<Option extends DefaultedOption> = TODO; // TODO(koan)

type _02a = Expect<Equal<DefaultFor<"strict">, true>>;
type _02b = Expect<Equal<DefaultFor<"module">, "esnext">>;
type _02c = Expect<Equal<DefaultFor<"target">, "es2025">>;
type _02d = Expect<Equal<DefaultFor<"libReplacement">, false>>;
type _02e = Expect<Equal<DefaultFor<"types">, []>>;

// 3. Build the whole default configuration as one object.
export type ModernDefaults = TODO; // TODO(koan)

type _03a = Expect<Equal<ModernDefaults["strict"], true>>;
type _03b = Expect<Equal<ModernDefaults["module"], "esnext">>;
type _03c = Expect<Equal<ModernDefaults["types"], []>>;
type _03d = Expect<Equal<keyof ModernDefaults, DefaultedOption>>;
type _03e = Expect<Equal<ModernDefaults["noUncheckedSideEffectImports"], true>>;

// ─── Pinned or floating ───────────────────────────────────────────────

// 4. Build the property that decides whether a default can change meaning under
//    a later compiler.
export type Stability = TODO; // TODO(koan)

type _04a = Expect<Equal<Stability, "pinned" | "floating">>;
type _04b = Expect<Equal<Exclude<Stability, "pinned">, "floating">>;
type _04c = Expect<Equal<Extract<Stability, "floating">, "floating">>;
type _04d = Expect<Equal<Extract<Stability, "deprecated">, never>>;

// 5. Build which defaults float. `target` follows the year and `module` follows
//    the latest edition; a boolean default is a decision that stays put.
export type StabilityOf<Option extends DefaultedOption> = TODO; // TODO(koan)

type _05a = Expect<Equal<StabilityOf<"target">, "floating">>;
type _05b = Expect<Equal<StabilityOf<"module">, "floating">>;
type _05c = Expect<Equal<StabilityOf<"strict">, "pinned">>;
type _05d = Expect<Equal<StabilityOf<"types">, "pinned">>;
type _05e = Expect<Equal<StabilityOf<DefaultedOption>, "pinned" | "floating">>;

// 6. Build the settings a deployable project should therefore write down.
export type MustBeWrittenDown<Option extends DefaultedOption> = TODO; // TODO(koan)

type _06a = Expect<Equal<MustBeWrittenDown<"target">, true>>;
type _06b = Expect<Equal<MustBeWrittenDown<"module">, true>>;
type _06c = Expect<Equal<MustBeWrittenDown<"strict">, false>>;
type _06d = Expect<Equal<MustBeWrittenDown<"libReplacement">, false>>;

// ─── What a config file does ──────────────────────────────────────────

// 7. Build the effective configuration: the defaults with a project's own
//    settings written over them.
export type Effective<Written extends Partial<ModernDefaults>> = TODO; // TODO(koan)

type _07a = Expect<Equal<Effective<{}>["strict"], true>>;
type _07b = Expect<Equal<Effective<{ target: "es2025" }>["target"], "es2025">>;
type _07c = Expect<Equal<Effective<{ strict: true }>["module"], "esnext">>;
type _07d = Expect<Equal<keyof Effective<{}>, DefaultedOption>>;

// 8. Build the question of whether a setting was inherited or stated.
export type CameFrom<
  Option extends DefaultedOption,
  Written extends Partial<ModernDefaults>,
> = TODO; // TODO(koan)

type _08a = Expect<Equal<CameFrom<"target", { target: "es2025" }>, "the config file">>;
type _08b = Expect<Equal<CameFrom<"strict", { target: "es2025" }>, "the default">>;
type _08c = Expect<Equal<CameFrom<"strict", {}>, "the default">>;
type _08d = Expect<Equal<CameFrom<"module", { module: "esnext"; strict: true }>, "the config file">>;

// 9. Build the risk a project carries: a floating default that was never
//    written down.
export type FloatingAndUnwritten<Written extends Partial<ModernDefaults>> = TODO; // TODO(koan)

type _09a = Expect<Equal<keyof FloatingAndUnwritten<{}>, "module" | "target">>;
type _09b = Expect<Equal<keyof FloatingAndUnwritten<{ target: "es2025" }>, "module">>;
type _09c = Expect<
  Equal<keyof FloatingAndUnwritten<{ target: "es2025"; module: "esnext" }>, never>
>;
type _09d = Expect<Equal<FloatingAndUnwritten<{}>["target"], "es2025">>;

// ─── Two of the defaults have type-level content ──────────────────────

// 10. Build what the `types` default means: nothing is enumerated, so nothing
//     ambient arrives without being asked for.
export type AmbientTypesFrom<Types extends readonly string[]> = TODO; // TODO(koan)

type _10a = Expect<Equal<AmbientTypesFrom<[]>, never>>;
type _10b = Expect<Equal<AmbientTypesFrom<["node"]>, "node">>;
type _10c = Expect<Equal<AmbientTypesFrom<["node", "vitest"]>, "node" | "vitest">>;
type _10d = Expect<Equal<AmbientTypesFrom<ModernDefaults["types"]>, never>>;

// 11. Build what the `strict` default brings with it — and what it still does
//     not, since the adjacent flags stayed independent.
export type EnabledByStrictDefault<Flag extends string> = TODO; // TODO(koan)

type _11a = Expect<Equal<EnabledByStrictDefault<"strictNullChecks">, true>>;
type _11b = Expect<Equal<EnabledByStrictDefault<"useUnknownInCatchVariables">, true>>;
type _11c = Expect<Equal<EnabledByStrictDefault<"noUncheckedIndexedAccess">, false>>;
type _11d = Expect<Equal<EnabledByStrictDefault<"exactOptionalPropertyTypes">, false>>;

// 12. Build the module format the `module` default implies for a plain file,
//     which is the other default with an observable consequence.
export type ImpliedFormat<Module extends "esnext" | "commonjs" | "preserve"> = TODO; // TODO(koan)

type _12a = Expect<Equal<ImpliedFormat<"esnext">, "esm">>;
type _12b = Expect<Equal<ImpliedFormat<"preserve">, "esm">>;
type _12c = Expect<Equal<ImpliedFormat<"commonjs">, "commonjs">>;
type _12d = Expect<Equal<ImpliedFormat<ModernDefaults["module"]>, "esm">>;

// ─── The upgrade question ─────────────────────────────────────────────

// 13. Build what happens to a project's meaning when the compiler changes its
//     floating defaults.
export type AfterUpgrade<
  Option extends DefaultedOption,
  Written extends Partial<ModernDefaults>,
  NewDefault,
> = TODO; // TODO(koan)

type _13a = Expect<Equal<AfterUpgrade<"target", {}, "es2026">, "es2026">>;
type _13b = Expect<Equal<AfterUpgrade<"target", { target: "es2025" }, "es2026">, "es2025">>;
type _13c = Expect<Equal<AfterUpgrade<"strict", {}, false>, false>>;
type _13d = Expect<Equal<AfterUpgrade<"strict", { strict: true }, false>, true>>;

// 14. Build the question that follows: did the upgrade change this project?
export type ChangedByUpgrade<
  Option extends DefaultedOption,
  Written extends Partial<ModernDefaults>,
  NewDefault,
> = TODO; // TODO(koan)

type _14a = Expect<Equal<ChangedByUpgrade<"target", {}, "es2026">, true>>;
type _14b = Expect<Equal<ChangedByUpgrade<"target", { target: "es2025" }, "es2026">, false>>;
type _14c = Expect<Equal<ChangedByUpgrade<"strict", { strict: true }, false>, false>>;
type _14d = Expect<Equal<ChangedByUpgrade<"module", {}, "esnext">, false>>;

// 15. Build the recommendation for one option, which is the whole practical
//     lesson: write down what floats.
export type AdviceFor<Option extends DefaultedOption> = TODO; // TODO(koan)

type _15a = Expect<Equal<AdviceFor<"target">, "state it explicitly">>;
type _15b = Expect<Equal<AdviceFor<"module">, "state it explicitly">>;
type _15c = Expect<Equal<AdviceFor<"strict">, "the default is a decision you can keep">>;
type _15d = Expect<Equal<AdviceFor<"types">, "the default is a decision you can keep">>;

// ─── Reading it back ──────────────────────────────────────────────────

// 16. Report the defaults table.
export type DefaultsProfile = TODO; // TODO(koan)

type _16a = Expect<Equal<DefaultsProfile["strict"], true>>;
type _16b = Expect<Equal<DefaultsProfile["target"], "es2025">>;
type _16c = Expect<Equal<DefaultsProfile["libReplacement"], false>>;
type _16d = Expect<Equal<DefaultsProfile["types"], []>>;
type _16e = Expect<Equal<keyof DefaultsProfile, DefaultedOption>>;

// 17. Report an empty project: everything came from a default, and two of those
//     defaults will move.
export type EmptyProjectProfile = TODO; // TODO(koan)

type _17a = Expect<Equal<EmptyProjectProfile["effectiveTarget"], "es2025">>;
type _17b = Expect<Equal<EmptyProjectProfile["whereItCameFrom"], "the default">>;
type _17c = Expect<Equal<EmptyProjectProfile["atRiskOnUpgrade"], "module" | "target">>;
type _17d = Expect<Equal<EmptyProjectProfile["advice"], "state it explicitly">>;
type _17e = Expect<Equal<EmptyProjectProfile["andStrictIsAlreadyOn"], true>>;

// 18. Report one option at a glance: its default, where this project's value
//     came from, whether it floats, and whether an upgrade would move it.
export type DefaultReport<
  Option extends DefaultedOption,
  Written extends Partial<ModernDefaults>,
  NewDefault,
> = TODO; // TODO(koan)

type _18a = Expect<Equal<DefaultReport<"target", {}, "es2026">["defaultValue"], "es2025">>;
type _18b = Expect<Equal<DefaultReport<"target", {}, "es2026">["source"], "the default">>;
type _18c = Expect<Equal<DefaultReport<"target", {}, "es2026">["movedByUpgrade"], true>>;
type _18d = Expect<
  Equal<DefaultReport<"target", { target: "es2025" }, "es2026">["movedByUpgrade"], false>
>;
type _18e = Expect<Equal<DefaultReport<"strict", {}, "es2026">["stability"], "pinned">>;
