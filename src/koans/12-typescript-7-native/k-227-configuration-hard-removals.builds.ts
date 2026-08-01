import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-227: configuration hard removals — constructions
 * =============================================================================
 *
 * The native compiler drops settings the previous major had deprecated: `es5` as
 * a target, `node10` and `classic` resolution, the `amd`/`umd`/`system`/`none`
 * module formats, `baseUrl` as a lookup root, and the interop switches that could
 * be turned off. The legacy import syntaxes go with them.
 *
 * "Hard" is the operative word: 6.0 would report these under a suppression, 7.0
 * will not accept them at all, so a suppression is a deadline rather than a fix.
 * Each removal still has a replacement, and one of them is not a replacement at
 * all but a promotion — interop is simply always on now. Build the removals, the
 * replacements, and the difference between a deprecation and a removal.
 * Replace each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

// ─── What is gone ─────────────────────────────────────────────────────

// 1. Build the settings the native compiler no longer accepts.
export type RemovedSetting = TODO; // TODO(koan)

type _01a = Expect<
  Equal<
    RemovedSetting,
    | "target: es5"
    | "moduleResolution: node10"
    | "moduleResolution: classic"
    | "module: amd"
    | "module: none"
    | "baseUrl"
    | "esModuleInterop: false"
  >
>;
type _01b = Expect<
  Equal<
    Extract<RemovedSetting, `moduleResolution: ${string}`>,
    "moduleResolution: node10" | "moduleResolution: classic"
  >
>;
type _01c = Expect<Equal<Extract<RemovedSetting, `target: ${string}`>, "target: es5">>;
type _01d = Expect<Equal<Extract<RemovedSetting, "strict: false">, never>>;

// 2. Build the replacement for each one.
export type ReplacementFor<Setting extends RemovedSetting> = TODO; // TODO(koan)

type _02a = Expect<
  Equal<ReplacementFor<"target: es5">, "a newer target, or an external downlevel step">
>;
type _02b = Expect<Equal<ReplacementFor<"moduleResolution: node10">, "nodenext or bundler">>;
type _02c = Expect<Equal<ReplacementFor<"module: amd">, "esnext or preserve, plus a bundler">>;
type _02d = Expect<Equal<ReplacementFor<"baseUrl">, "paths relative to the project root">>;
type _02e = Expect<Equal<ReplacementFor<"esModuleInterop: false">, "nothing: it is always on">>;

// 3. Build the odd one out: a setting whose removal *is* the feature, because the
//    behaviour it disabled is now unconditional.
export type WasPromoted<Setting extends RemovedSetting> = TODO; // TODO(koan)

type _03a = Expect<Equal<WasPromoted<"esModuleInterop: false">, true>>;
type _03b = Expect<Equal<WasPromoted<"baseUrl">, false>>;
type _03c = Expect<Equal<WasPromoted<"target: es5">, false>>;
type _03d = Expect<Equal<WasPromoted<RemovedSetting>, boolean>>;

// 4. Build who has to do the work now. Two of these hand a job to another tool.
export type HandledBy<Setting extends RemovedSetting> = TODO; // TODO(koan)

type _04a = Expect<Equal<HandledBy<"esModuleInterop: false">, "nobody">>;
type _04b = Expect<Equal<HandledBy<"target: es5">, "another tool">>;
type _04c = Expect<Equal<HandledBy<"module: amd">, "another tool">>;
type _04d = Expect<Equal<HandledBy<"baseUrl">, "another setting">>;
type _04e = Expect<Equal<HandledBy<RemovedSetting>, "nobody" | "another tool" | "another setting">>;

// ─── Deprecated versus removed ────────────────────────────────────────

// 5. Build the two compiler majors in play.
export type CompilerMajor = TODO; // TODO(koan)

type _05a = Expect<Equal<CompilerMajor, "6.0" | "7.0">>;
type _05b = Expect<Equal<Exclude<CompilerMajor, "6.0">, "7.0">>;
type _05c = Expect<Equal<Extract<CompilerMajor, "7.0">, "7.0">>;
type _05d = Expect<Equal<Extract<CompilerMajor, "5.9">, never>>;

// 6. Build what each one does with a removed setting — and what a suppression is
//    worth in each.
export type Treatment<
  Major extends CompilerMajor,
  Suppressed extends boolean,
> = TODO; // TODO(koan)

type _06a = Expect<Equal<Treatment<"6.0", true>, "silently accepted">>;
type _06b = Expect<Equal<Treatment<"6.0", false>, "deprecation error">>;
type _06c = Expect<Equal<Treatment<"7.0", true>, "unconditional error">>;
type _06d = Expect<Equal<Treatment<"7.0", false>, "unconditional error">>;

// 7. Build the fact that makes a suppression a deadline: it changes nothing about
//    the next major.
export type SuppressionHelps<Major extends CompilerMajor> = TODO; // TODO(koan)

type _07a = Expect<Equal<SuppressionHelps<"6.0">, true>>;
type _07b = Expect<Equal<SuppressionHelps<"7.0">, false>>;
type _07c = Expect<Equal<SuppressionHelps<CompilerMajor>, boolean>>;
type _07d = Expect<Equal<Equal<SuppressionHelps<"6.0">, SuppressionHelps<"7.0">>, false>>;

// 8. Build whether a configuration is accepted at all, which is the question a
//    build answers first.
export type Accepted<
  Major extends CompilerMajor,
  Used extends readonly RemovedSetting[],
  Suppressed extends boolean,
> = TODO; // TODO(koan)

type _08a = Expect<Equal<Accepted<"6.0", [], false>, true>>;
type _08b = Expect<Equal<Accepted<"6.0", ["baseUrl"], true>, true>>;
type _08c = Expect<Equal<Accepted<"6.0", ["baseUrl"], false>, false>>;
type _08d = Expect<Equal<Accepted<"7.0", ["baseUrl"], true>, false>>;
type _08e = Expect<Equal<Accepted<"7.0", [], true>, true>>;

// ─── The syntax that went with them ───────────────────────────────────

// 9. Build the legacy syntaxes removed alongside the settings.
export type LegacySyntax = TODO; // TODO(koan)

type _09a = Expect<Equal<LegacySyntax, "import equals" | "export equals" | "assert clause">>;
type _09b = Expect<Equal<Extract<LegacySyntax, `${string}equals`>, "import equals" | "export equals">>;
type _09c = Expect<Equal<Exclude<LegacySyntax, `${string}equals`>, "assert clause">>;
type _09d = Expect<Equal<Extract<LegacySyntax, "triple slash">, never>>;

// 10. Build what to write instead of each.
export type ModernSyntaxFor<Legacy extends LegacySyntax> = TODO; // TODO(koan)

type _10a = Expect<Equal<ModernSyntaxFor<"assert clause">, "a with clause">>;
type _10b = Expect<Equal<ModernSyntaxFor<"import equals">, "an ECMAScript import or export">>;
type _10c = Expect<Equal<ModernSyntaxFor<"export equals">, "an ECMAScript import or export">>;
type _10d = Expect<
  Equal<ModernSyntaxFor<LegacySyntax>, "a with clause" | "an ECMAScript import or export">
>;

// 11. Build the rewrite for the one that is pure text.
export type RewriteAssert<Clause extends string> = TODO; // TODO(koan)

type _11a = Expect<Equal<RewriteAssert<'assert { type: "json" }'>, 'with { type: "json" }'>>;
type _11b = Expect<Equal<RewriteAssert<'with { type: "json" }'>, 'with { type: "json" }'>>;
type _11c = Expect<Equal<RewriteAssert<"">, "">>;
type _11d = Expect<
  Equal<
    {
      theRewrittenClauseUsesTheNewKeyword: GivenExtends<
        RewriteAssert<'assert { type: "json" }'>,
        `with ${string}`
      >;
      andTheAttributeItselfIsUntouched: RewriteAssert<'assert { type: "json" }'>;
    },
    {
      theRewrittenClauseUsesTheNewKeyword: true;
      andTheAttributeItselfIsUntouched: 'with { type: "json" }';
    }
  >
>;

// ─── Auditing a project ───────────────────────────────────────────────

// 12. Build the audit of a project's settings.
export type UsedRemovals<Used extends readonly RemovedSetting[]> = TODO; // TODO(koan)

type _12a = Expect<Equal<UsedRemovals<["baseUrl"]>, "baseUrl">>;
type _12b = Expect<Equal<UsedRemovals<["baseUrl", "target: es5"]>, "baseUrl" | "target: es5">>;
type _12c = Expect<Equal<UsedRemovals<[]>, never>>;
type _12d = Expect<Equal<Extract<UsedRemovals<["baseUrl"]>, "target: es5">, never>>;

// 13. Build the plan: what each used setting becomes.
export type RemovalPlan<Used extends readonly RemovedSetting[]> = TODO; // TODO(koan)

type _13a = Expect<
  Equal<RemovalPlan<["baseUrl"]>, { baseUrl: "paths relative to the project root" }>
>;
type _13b = Expect<
  Equal<RemovalPlan<["target: es5"]>["target: es5"], "a newer target, or an external downlevel step">
>;
type _13c = Expect<Equal<keyof RemovalPlan<["baseUrl", "module: amd"]>, "baseUrl" | "module: amd">>;
type _13d = Expect<Equal<RemovalPlan<[]>, {}>>;

// 14. Build the part of the plan that needs a tool the project may not have yet.
export type NeedsNewTooling<Used extends readonly RemovedSetting[]> = TODO; // TODO(koan)

type _14a = Expect<Equal<keyof NeedsNewTooling<["target: es5", "baseUrl"]>, "target: es5">>;
type _14b = Expect<Equal<keyof NeedsNewTooling<["baseUrl"]>, never>>;
type _14c = Expect<Equal<keyof NeedsNewTooling<["module: amd", "module: none"]>, "module: amd" | "module: none">>;
type _14d = Expect<Equal<keyof NeedsNewTooling<["esModuleInterop: false"]>, never>>;

// 15. Build the work that disappears rather than moving: the promoted settings
//     need no replacement at all.
export type FreeRemovals<Used extends readonly RemovedSetting[]> = TODO; // TODO(koan)

type _15a = Expect<
  Equal<keyof FreeRemovals<["esModuleInterop: false", "baseUrl"]>, "esModuleInterop: false">
>;
type _15b = Expect<Equal<keyof FreeRemovals<["baseUrl"]>, never>>;
type _15c = Expect<
  Equal<FreeRemovals<["esModuleInterop: false"]>["esModuleInterop: false"], "nothing: it is always on">
>;
type _15d = Expect<Equal<FreeRemovals<[]>, {}>>;

// ─── Reading it back ──────────────────────────────────────────────────

// 16. Report the removals and who inherits each job.
export type RemovalProfile = TODO; // TODO(koan)

type _16a = Expect<Equal<RemovalProfile["target: es5"], "another tool">>;
type _16b = Expect<Equal<RemovalProfile["baseUrl"], "another setting">>;
type _16c = Expect<Equal<RemovalProfile["esModuleInterop: false"], "nobody">>;
type _16d = Expect<Equal<RemovalProfile["module: amd"], "another tool">>;
type _16e = Expect<Equal<keyof RemovalProfile, RemovedSetting>>;

// 17. Report the same configuration under both majors, with and without the
//     suppression — the table that shows a suppression is a deadline.
export type SuppressionProfile = TODO; // TODO(koan)

type _17a = Expect<Equal<SuppressionProfile["sixSuppressed"], "silently accepted">>;
type _17b = Expect<Equal<SuppressionProfile["sixUnsuppressed"], "deprecation error">>;
type _17c = Expect<Equal<SuppressionProfile["sevenSuppressed"], "unconditional error">>;
type _17d = Expect<Equal<SuppressionProfile["sevenUnsuppressed"], "unconditional error">>;
type _17e = Expect<Equal<SuppressionProfile["andItOnlyEverHelpedInTheOlderOne"], false>>;

// 18. Report one project at a glance: whether it builds under each major, what
//     its plan is, and how much of it needs new tooling.
export type HardRemovalReport<
  Used extends readonly RemovedSetting[],
  Suppressed extends boolean,
> = TODO; // TODO(koan)

type _18a = Expect<Equal<HardRemovalReport<["baseUrl"], true>["acceptedBySix"], true>>;
type _18b = Expect<Equal<HardRemovalReport<["baseUrl"], true>["acceptedBySeven"], false>>;
type _18c = Expect<
  Equal<HardRemovalReport<["baseUrl"], true>["plan"], { baseUrl: "paths relative to the project root" }>
>;
type _18d = Expect<Equal<HardRemovalReport<["target: es5"], false>["needsTooling"], "target: es5">>;
type _18e = Expect<Equal<HardRemovalReport<[], false>["acceptedBySeven"], true>>;
