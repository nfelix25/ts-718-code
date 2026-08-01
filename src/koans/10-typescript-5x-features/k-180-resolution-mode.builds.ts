import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type { Equal as ImportResolvedEqual } from "../../utils/type-utils.js" with {
  "resolution-mode": "import"
};
import type { Equal as RequireResolvedEqual } from "../../utils/type-utils.js" with {
  "resolution-mode": "require"
};

/**
 * K-180: resolution mode — constructions
 * =============================================================================
 *
 * A package may publish different declarations under its `"import"` and
 * `"require"` export conditions. For a *value* import the surrounding file
 * format decides which one applies, but a type-only import emits nothing, so
 * there is no syntax to read the intent from. TypeScript 5.3 stabilised
 * `with { "resolution-mode": "require" }` for exactly that: it says which
 * condition to resolve under, without turning the import into a runtime one.
 *
 * The attribute is an ordinary import attribute — a string-keyed, string-valued
 * bag whose one key happens to be `"resolution-mode"`. Everything the type
 * system knows about it is what that bag says; which declarations it actually
 * reaches is a resolution-time fact this file cannot observe. The two real
 * imports above point at the same local module, so their utilities compare equal
 * — a conditional-exports package could make them differ, and nothing in the
 * type would show it. Replace each `TODO` with a type satisfying the assertions
 * directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

// ─── The vocabulary ───────────────────────────────────────────────────

// 1. Build the two conditions a request may be resolved under.
export type ResolutionMode = TODO; // TODO(koan)

type _01a = Expect<Equal<ResolutionMode, "import" | "require">>;
type _01b = Expect<Equal<Extract<ResolutionMode, "require">, "require">>;
type _01c = Expect<Equal<Exclude<ResolutionMode, "import">, "require">>;
type _01d = Expect<Equal<GivenExtends<"node", ResolutionMode>, false>>;

// 2. Build the attribute bag that carries one of them.
export type ResolutionAttributes<Mode extends ResolutionMode> = TODO; // TODO(koan)

type _02a = Expect<Equal<keyof ResolutionAttributes<"import">, "resolution-mode">>;
type _02b = Expect<Equal<ResolutionAttributes<"import">["resolution-mode"], "import">>;
type _02c = Expect<Equal<ResolutionAttributes<"require">["resolution-mode"], "require">>;
type _02d = Expect<
  Equal<ResolutionAttributes<ResolutionMode>["resolution-mode"], "import" | "require">
>;
type _02e = Expect<
  Equal<
    {
      fitsImportAttributes: GivenExtends<ResolutionAttributes<"import">, ImportAttributes>;
      andItsOnlyKeyIsTheModeKey: keyof ResolutionAttributes<"import">;
    },
    { fitsImportAttributes: true; andItsOnlyKeyIsTheModeKey: "resolution-mode" }
  >
>;

// 3. Build the two concrete branches.
export type ImportBranch = TODO; // TODO(koan)

type _03a = Expect<Equal<ImportBranch, { readonly "resolution-mode": "import" }>>;
type _03b = Expect<Equal<ImportBranch["resolution-mode"], "import">>;
type _03c = Expect<Equal<keyof ImportBranch, "resolution-mode">>;
type _03d = Expect<
  Equal<
    {
      fitsImportAttributes: GivenExtends<ImportBranch, ImportAttributes>;
      andItsValueIsThePinnedCondition: ImportBranch["resolution-mode"];
    },
    { fitsImportAttributes: true; andItsValueIsThePinnedCondition: "import" }
  >
>;

// 4. Build the other one, and confirm the two never coincide.
export type RequireBranch = TODO; // TODO(koan)

type _04a = Expect<Equal<RequireBranch, { readonly "resolution-mode": "require" }>>;
type _04b = Expect<Equal<RequireBranch["resolution-mode"], "require">>;
type _04c = Expect<
  Equal<
    {
      importIntoRequire: GivenExtends<ImportBranch, RequireBranch>;
      requireIntoImport: GivenExtends<RequireBranch, ImportBranch>;
    },
    { importIntoRequire: false; requireIntoImport: false }
  >
>;
type _04d = Expect<Equal<ImportBranch & RequireBranch, never>>;

// ─── Carrying a mode through a value ──────────────────────────────────

// 5. Build the factory that turns a mode into a bag. The `const` parameter is
//    what keeps the literal from widening to the whole union.
export type MakeResolutionAttributes = TODO; // TODO(koan)

type _05a = Expect<Equal<Parameters<MakeResolutionAttributes>[0], ResolutionMode>>;
type _05b = Expect<Equal<Parameters<MakeResolutionAttributes>["length"], 1>>;
type _05c = Expect<
  Equal<ReturnType<typeof makeImportAttributes>, { readonly "resolution-mode": "import" }>
>;
type _05d = Expect<
  Equal<ReturnType<typeof makeRequireAttributes>, { readonly "resolution-mode": "require" }>
>;
type _05e = Expect<
  Equal<
    {
      pinnedAtOneMode: ReturnType<typeof makeImportAttributes>["resolution-mode"];
      unpinnedIsTheWholeUnion: ResolutionAttributes<ResolutionMode>["resolution-mode"];
    },
    { pinnedAtOneMode: "import"; unpinnedIsTheWholeUnion: ResolutionMode }
  >
>;

declare const makeImportAttributes: (mode: "import") => ResolutionAttributes<"import">;
declare const makeRequireAttributes: (mode: "require") => ResolutionAttributes<"require">;

// 6. Build the signature that reports which condition is active — the runtime
//    counterpart of the attribute.
export type ActiveCondition = TODO; // TODO(koan)

type _06a = Expect<Equal<Parameters<ActiveCondition>[0], ResolutionMode>>;
type _06b = Expect<Equal<ReturnType<ActiveCondition>, "import" | "require">>;
type _06c = Expect<Equal<Parameters<ActiveCondition>["length"], 1>>;
type _06d = Expect<
  Equal<
    {
      oneConditionIsAnAcceptableArgument: GivenExtends<"import", Parameters<ActiveCondition>[0]>;
      butTheParameterAdmitsBoth: Parameters<ActiveCondition>[0];
    },
    { oneConditionIsAnAcceptableArgument: true; butTheParameterAdmitsBoth: "import" | "require" }
  >
>;

// ─── What the attribute reaches ───────────────────────────────────────

// 7. Report what the two real imports above resolved to. They point at the same
//    local module, so the two utilities are the same type — the attribute
//    changed the lookup, not the answer.
export type ResolvedUtilityProfile = TODO; // TODO(koan)

type _07a = Expect<Equal<ResolvedUtilityProfile["underImport"], true>>;
type _07b = Expect<Equal<ResolvedUtilityProfile["underRequire"], true>>;
type _07c = Expect<Equal<ResolvedUtilityProfile["disagreeing"], false>>;
type _07d = Expect<Equal<ResolvedUtilityProfile["theSameUtility"], true>>;
type _07e = Expect<Equal<ResolvedUtilityProfile["interchangeable"], true>>;

// 8. Report what the attribute does *not* do. It selects a condition; it does
//    not make the import a value import, produce a runtime require, or appear in
//    the resolved type in any way.
export type NonEffectProfile = TODO; // TODO(koan)

type _08a = Expect<Equal<NonEffectProfile["resolvedTypesAreIdentical"], true>>;
type _08b = Expect<Equal<NonEffectProfile["modeIsNotPartOfTheResult"], false>>;
type _08c = Expect<Equal<NonEffectProfile["theBagIsJustAnImportAttribute"], true>>;
type _08d = Expect<Equal<NonEffectProfile["andItsValueIsAString"], true>>;

// ─── Modelling a package that really does differ ──────────────────────

// 9. Build the shape of a package whose two conditions publish different
//    declarations — the situation the attribute exists for.
export type ConditionalExports<UnderImport, UnderRequire> = TODO; // TODO(koan)

type _09a = Expect<Equal<keyof ConditionalExports<1, 2>, "import" | "require">>;
type _09b = Expect<Equal<ConditionalExports<1, 2>["import"], 1>>;
type _09c = Expect<Equal<ConditionalExports<1, 2>["require"], 2>>;
type _09d = Expect<
  Equal<
    {
      bothConditionsMayPublishTheSameThing: ConditionalExports<1, 1>["import"];
      theTwoAgree: Equal<ConditionalExports<1, 1>["import"], ConditionalExports<1, 1>["require"]>;
    },
    { bothConditionsMayPublishTheSameThing: 1; theTwoAgree: true }
  >
>;

// 10. Build the resolver: given a package and a mode, the declarations that mode
//     reaches.
export type ResolveUnder<
  Package,
  Mode extends ResolutionMode,
> = TODO; // TODO(koan)

type _10a = Expect<Equal<ResolveUnder<ConditionalExports<"esm", "cjs">, "import">, "esm">>;
type _10b = Expect<Equal<ResolveUnder<ConditionalExports<"esm", "cjs">, "require">, "cjs">>;
type _10c = Expect<
  Equal<ResolveUnder<ConditionalExports<"esm", "cjs">, ResolutionMode>, "esm" | "cjs">
>;
type _10d = Expect<Equal<ResolveUnder<string, "import">, never>>;
type _10e = Expect<
  Equal<
    {
      underImport: ResolveUnder<ConditionalExports<"same", "same">, "import">;
      underRequire: ResolveUnder<ConditionalExports<"same", "same">, "require">;
    },
    { underImport: "same"; underRequire: "same" }
  >
>;

// 11. Build the predicate that says whether a package's two conditions actually
//     differ — the question that decides whether the attribute matters at all.
export type ConditionsDiffer<Package> = TODO; // TODO(koan)

type _11a = Expect<Equal<ConditionsDiffer<ConditionalExports<"esm", "cjs">>, true>>;
type _11b = Expect<Equal<ConditionsDiffer<ConditionalExports<"same", "same">>, false>>;
type _11c = Expect<Equal<ConditionsDiffer<string>, false>>;
type _11d = Expect<
  Equal<
    {
      thisFilesImportsPointAtOneModule: Equal<ImportResolvedEqual<1, 1>, RequireResolvedEqual<1, 1>>;
      soTheyBehaveLikeAnUndifferentiatedPackage: ConditionsDiffer<ConditionalExports<"same", "same">>;
    },
    { thisFilesImportsPointAtOneModule: true; soTheyBehaveLikeAnUndifferentiatedPackage: false }
  >
>;

// ─── Reading the attribute back ───────────────────────────────────────

// 12. Build the reader that recovers the mode from a bag.
export type ModeOf<Attributes> = TODO; // TODO(koan)

type _12a = Expect<Equal<ModeOf<ImportBranch>, "import">>;
type _12b = Expect<Equal<ModeOf<RequireBranch>, "require">>;
type _12c = Expect<Equal<ModeOf<{ type: "json" }>, never>>;
type _12d = Expect<Equal<ModeOf<ImportBranch | RequireBranch>, "import" | "require">>;

// 13. Build the gate that admits a bag only when it names a legal condition.
export type ValidResolutionBag<Value> = TODO; // TODO(koan)

type _13a = Expect<
  Equal<ValidResolutionBag<ImportBranch>, { readonly "resolution-mode": "import" }>
>;
type _13b = Expect<
  Equal<ValidResolutionBag<RequireBranch>, { readonly "resolution-mode": "require" }>
>;
type _13c = Expect<Equal<ValidResolutionBag<{ "resolution-mode": "node" }>, never>>;
type _13d = Expect<Equal<ValidResolutionBag<{ type: "json" }>, never>>;

// 14. Build the combinator that puts a resolution mode alongside other
//     attributes, since one import may carry several.
export type WithResolutionMode<
  Attributes extends ImportAttributes,
  Mode extends ResolutionMode,
> = TODO; // TODO(koan)

type _14a = Expect<Equal<ModeOf<WithResolutionMode<{ type: "json" }, "require">>, "require">>;
type _14b = Expect<
  Equal<keyof WithResolutionMode<{ type: "json" }, "import">, "type" | "resolution-mode">
>;
type _14c = Expect<Equal<WithResolutionMode<{ type: "json" }, "import">["type"], "json">>;
type _14d = Expect<
  Equal<
    {
      fitsImportAttributes: GivenExtends<
        WithResolutionMode<{ type: "json" }, "import">,
        ImportAttributes
      >;
      bothEntries: WithResolutionMode<{ type: "json" }, "import">["type" | "resolution-mode"];
    },
    { fitsImportAttributes: true; bothEntries: "json" | "import" }
  >
>;

// ─── What the two branches look like together ─────────────────────────

// 15. Report the branch union — what an attribute bag looks like before a
//     particular mode has been chosen.
export type BranchProfile = TODO; // TODO(koan)

type _15a = Expect<Equal<BranchProfile["eitherMode"], "import" | "require">>;
type _15b = Expect<
  Equal<BranchProfile["narrowedToImport"], { readonly "resolution-mode": "import" }>
>;
type _15c = Expect<Equal<BranchProfile["sharedKeys"], "resolution-mode">>;
type _15d = Expect<Equal<BranchProfile["neitherFitsTheOther"], false>>;
type _15e = Expect<
  Equal<
    BranchProfile["either"],
    { readonly "resolution-mode": "import" } | { readonly "resolution-mode": "require" }
  >
>;

// 16. Report the readonly-ness of the bag, which matters because the attribute
//     is a declaration rather than a value anyone should mutate.
export type ModifierProfile = TODO; // TODO(koan)

type _16a = Expect<Equal<ModifierProfile["declaredReadonly"], true>>;
type _16b = Expect<Equal<ModifierProfile["readonlyRoundTrips"], true>>;
type _16c = Expect<Equal<ModifierProfile["mutableVersionIsDifferent"], false>>;
type _16d = Expect<Equal<ModifierProfile["mutableStillFitsTheLibraryShape"], true>>;

// 17. Build the filter that finds the members of a record carrying a resolution
//     mode — an audit of which imports in a manifest pinned a condition.
export type PinnedKeys<Owner> = TODO; // TODO(koan)

type _17a = Expect<Equal<PinnedKeys<{ a: ImportBranch; b: { type: "json" } }>, "a">>;
type _17b = Expect<Equal<PinnedKeys<{ a: ImportBranch; b: RequireBranch }>, "a" | "b">>;
type _17c = Expect<Equal<PinnedKeys<{ a: { type: "json" } }>, never>>;
type _17d = Expect<Equal<PinnedKeys<Record<never, never>>, never>>;

// 18. Report one import at a glance: which condition it pinned, what that
//     condition reaches in a given package, and whether pinning changed
//     anything.
export type ResolutionReport<Attributes, Package> = TODO; // TODO(koan)

type _18a = Expect<Equal<ResolutionReport<ImportBranch, ConditionalExports<"esm", "cjs">>["mode"], "import">>;
type _18b = Expect<
  Equal<ResolutionReport<ImportBranch, ConditionalExports<"esm", "cjs">>["resolved"], "esm">
>;
type _18c = Expect<
  Equal<ResolutionReport<RequireBranch, ConditionalExports<"esm", "cjs">>["resolved"], "cjs">
>;
type _18d = Expect<
  Equal<ResolutionReport<ImportBranch, ConditionalExports<"same", "same">>["pinningMattered"], false>
>;
type _18e = Expect<Equal<ResolutionReport<{ type: "json" }, ConditionalExports<"esm", "cjs">>["mode"], never>>;
