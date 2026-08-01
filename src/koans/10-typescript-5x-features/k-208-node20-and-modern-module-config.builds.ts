import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-208: node20 and modern module config — constructions
 * =============================================================================
 *
 * A Node module mode is not only about emitted syntax. It selects Node-aware
 * resolution, decides per file whether the code is ESM or CommonJS from the
 * extension and the nearest package `"type"`, and settles which interop is
 * allowed. TypeScript 5.9 added stable `module: "node20"` — modern Node 20
 * behaviour, including `require` of ESM, and an implied `target: "es2023"`.
 *
 * `nodenext` is the deliberately floating counterpart: it tracks current stable
 * Node and implies the floating `target: "esnext"`. Choosing between them is a
 * deployment promise, and neither is what a bundled application wants — that is
 * `moduleResolution: "bundler"` with the module syntax preserved. Build the two
 * configurations, the per-file format rule, and what each choice implies.
 * Replace each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

// ─── The two modes ────────────────────────────────────────────────────

// 1. Build the modern Node module modes.
export type ModernNodeModuleMode = TODO; // TODO(koan)

type _01a = Expect<Equal<ModernNodeModuleMode, "node20" | "nodenext">>;
type _01b = Expect<Equal<Exclude<ModernNodeModuleMode, "nodenext">, "node20">>;
type _01c = Expect<Equal<Extract<ModernNodeModuleMode, `node${number}`>, "node20">>;
type _01d = Expect<Equal<Extract<ModernNodeModuleMode, "commonjs">, never>>;

// 2. Build the resolution mode each one selects. They do not have the same name
//    as the module mode, which is the first thing that surprises people.
export type ResolutionFor<Mode extends ModernNodeModuleMode> = TODO; // TODO(koan)

type _02a = Expect<Equal<ResolutionFor<"node20">, "node16">>;
type _02b = Expect<Equal<ResolutionFor<"nodenext">, "nodenext">>;
type _02c = Expect<Equal<ResolutionFor<ModernNodeModuleMode>, "node16" | "nodenext">>;
type _02d = Expect<
  Equal<
    {
      theResolutionIsNotNamedAfterTheMode: Equal<ResolutionFor<"node20">, "node20">;
      itIsTheOlderPinnedName: ResolutionFor<"node20">;
    },
    { theResolutionIsNotNamedAfterTheMode: false; itIsTheOlderPinnedName: "node16" }
  >
>;

// 3. Build the target each mode implies when nothing overrides it.
export type ImpliedTargetFor<Mode extends ModernNodeModuleMode> = TODO; // TODO(koan)

type _03a = Expect<Equal<ImpliedTargetFor<"node20">, "es2023">>;
type _03b = Expect<Equal<ImpliedTargetFor<"nodenext">, "esnext">>;
type _03c = Expect<Equal<ImpliedTargetFor<ModernNodeModuleMode>, "es2023" | "esnext">>;
type _03d = Expect<Equal<Equal<ImpliedTargetFor<"node20">, ImpliedTargetFor<"nodenext">>, false>>;

// 4. Build the promise each mode makes about the future: one is pinned, the
//    other moves.
export type StabilityOf<Mode extends ModernNodeModuleMode> = TODO; // TODO(koan)

type _04a = Expect<Equal<StabilityOf<"node20">, "stable">>;
type _04b = Expect<Equal<StabilityOf<"nodenext">, "floating">>;
type _04c = Expect<Equal<StabilityOf<ModernNodeModuleMode>, "stable" | "floating">>;
type _04d = Expect<Equal<Extract<StabilityOf<"node20">, "floating">, never>>;

// 5. Build the whole configuration each mode amounts to.
export type ModernNodeConfig<Mode extends ModernNodeModuleMode> = TODO; // TODO(koan)

type _05a = Expect<
  Equal<
    ModernNodeConfig<"node20">,
    {
      module: "node20";
      moduleResolution: "node16";
      impliedTarget: "es2023";
      stability: "stable";
      requireEsm: true;
    }
  >
>;
type _05b = Expect<Equal<ModernNodeConfig<"nodenext">["moduleResolution"], "nodenext">>;
type _05c = Expect<Equal<ModernNodeConfig<"nodenext">["impliedTarget"], "esnext">>;
type _05d = Expect<
  Equal<keyof ModernNodeConfig<"node20">, "module" | "moduleResolution" | "impliedTarget" | "stability" | "requireEsm">
>;
type _05e = Expect<Equal<ModernNodeConfig<ModernNodeModuleMode>["requireEsm"], true>>;

// ─── The per-file format rule ─────────────────────────────────────────

// 6. Build the file extensions a Node mode reads a format from.
export type SourceExtension = TODO; // TODO(koan)

type _06a = Expect<Equal<SourceExtension, ".ts" | ".mts" | ".cts">>;
type _06b = Expect<Equal<Exclude<SourceExtension, ".ts">, ".mts" | ".cts">>;
type _06c = Expect<Equal<Extract<SourceExtension, ".mts">, ".mts">>;
type _06d = Expect<Equal<Extract<SourceExtension, ".tsx">, never>>;

// 7. Build the `"type"` field of the nearest package, which is what an ambiguous
//    extension falls back to.
export type PackageType = TODO; // TODO(koan)

type _07a = Expect<Equal<PackageType, "module" | "commonjs">>;
type _07b = Expect<Equal<Exclude<PackageType, "commonjs">, "module">>;
type _07c = Expect<Equal<Extract<PackageType, "commonjs">, "commonjs">>;
type _07d = Expect<Equal<Extract<PackageType, "auto">, never>>;

// 8. Build the format rule itself. The explicit extensions decide on their own;
//    only the plain one consults the package.
export type FormatOf<
  Extension extends SourceExtension,
  Type extends PackageType,
> = TODO; // TODO(koan)

type _08a = Expect<Equal<FormatOf<".mts", "commonjs">, "esm">>;
type _08b = Expect<Equal<FormatOf<".cts", "module">, "commonjs">>;
type _08c = Expect<Equal<FormatOf<".ts", "module">, "esm">>;
type _08d = Expect<Equal<FormatOf<".ts", "commonjs">, "commonjs">>;
type _08e = Expect<Equal<FormatOf<SourceExtension, "module">, "esm" | "commonjs">>;

// 9. Build the question of whether the extension settled it by itself.
export type ExtensionDecides<Extension extends SourceExtension> = TODO; // TODO(koan)

type _09a = Expect<Equal<ExtensionDecides<".mts">, true>>;
type _09b = Expect<Equal<ExtensionDecides<".cts">, true>>;
type _09c = Expect<Equal<ExtensionDecides<".ts">, false>>;
type _09d = Expect<Equal<ExtensionDecides<SourceExtension>, boolean>>;

// 10. Build the interop question each format raises: which imports of the other
//     format are allowed.
export type CanRequireEsm<Mode extends ModernNodeModuleMode> = TODO; // TODO(koan)

type _10a = Expect<Equal<CanRequireEsm<"node20">, true>>;
type _10b = Expect<Equal<CanRequireEsm<"nodenext">, true>>;
type _10c = Expect<Equal<CanRequireEsm<ModernNodeModuleMode>, true>>;
type _10d = Expect<Equal<Extract<CanRequireEsm<"node20">, false>, never>>;

// ─── The other kind of project ────────────────────────────────────────

// 11. Build the settings a bundled application uses instead. Its resolution is
//     not Node's, and its module syntax is left for the bundler to deal with.
export type BundlerConfig = TODO; // TODO(koan)

type _11a = Expect<Equal<BundlerConfig["moduleResolution"], "bundler">>;
type _11b = Expect<Equal<BundlerConfig["module"], "preserve">>;
type _11c = Expect<Equal<BundlerConfig["perFileFormat"], false>>;
type _11d = Expect<Equal<keyof BundlerConfig, "module" | "moduleResolution" | "perFileFormat">>;

// 12. Build the project kinds and the configuration each one should reach for.
export type ProjectKind = TODO; // TODO(koan)

type _12a = Expect<Equal<ProjectKind, "pinned-node" | "tracking-node" | "bundled-app">>;
type _12b = Expect<Equal<Extract<ProjectKind, `${string}node`>, "pinned-node" | "tracking-node">>;
type _12c = Expect<Equal<Exclude<ProjectKind, `${string}node`>, "bundled-app">>;
type _12d = Expect<Equal<Extract<ProjectKind, "library">, never>>;

// 13. Build the recommendation.
export type ConfigFor<Kind extends ProjectKind> = TODO; // TODO(koan)

type _13a = Expect<Equal<ConfigFor<"pinned-node">["module"], "node20">>;
type _13b = Expect<Equal<ConfigFor<"tracking-node">["module"], "nodenext">>;
type _13c = Expect<Equal<ConfigFor<"bundled-app">["module"], "preserve">>;
type _13d = Expect<Equal<ConfigFor<"bundled-app">["moduleResolution"], "bundler">>;
type _13e = Expect<Equal<ConfigFor<"pinned-node">["moduleResolution"], "node16">>;

// ─── What a mode does and does not promise ────────────────────────────

// 14. Build the claims a module mode might be read as making.
export type Claim = TODO; // TODO(koan)

type _14a = Expect<
  Equal<
    Claim,
    "resolutionFollowsNode" | "eachFilesFormatIsDecided" | "theBehaviourWillNotChange" | "theRuntimeIsInstalled"
  >
>;
type _14b = Expect<Equal<Extract<Claim, `the${string}`>, "theBehaviourWillNotChange" | "theRuntimeIsInstalled">>;
type _14c = Expect<Equal<Extract<Claim, "resolutionFollowsNode">, "resolutionFollowsNode">>;
type _14d = Expect<Equal<Extract<Claim, "theOutputIsBundled">, never>>;

// 15. Build which claims each mode supports. Only the pinned one promises
//     stability, and neither promises anything about the machine.
export type HoldsUnder<
  Mode extends ModernNodeModuleMode,
  TheClaim extends Claim,
> = TODO; // TODO(koan)

type _15a = Expect<Equal<HoldsUnder<"node20", "resolutionFollowsNode">, true>>;
type _15b = Expect<Equal<HoldsUnder<"nodenext", "eachFilesFormatIsDecided">, true>>;
type _15c = Expect<Equal<HoldsUnder<"node20", "theBehaviourWillNotChange">, true>>;
type _15d = Expect<Equal<HoldsUnder<"nodenext", "theBehaviourWillNotChange">, false>>;
type _15e = Expect<Equal<HoldsUnder<"node20", "theRuntimeIsInstalled">, false>>;

// ─── Reading it back ──────────────────────────────────────────────────

// 16. Report the two modes side by side.
export type ModeProfile = TODO; // TODO(koan)

type _16a = Expect<Equal<ModeProfile["pinnedResolution"], "node16">>;
type _16b = Expect<Equal<ModeProfile["floatingResolution"], "nodenext">>;
type _16c = Expect<Equal<ModeProfile["pinnedTarget"], "es2023">>;
type _16d = Expect<Equal<ModeProfile["floatingTarget"], "esnext">>;
type _16e = Expect<Equal<ModeProfile["andBothAllowRequireOfEsm"], true>>;

// 17. Report the per-file rule across the three extensions, which is the part of
//     a Node mode that has nothing to do with syntax.
export type FormatProfile = TODO; // TODO(koan)

type _17a = Expect<Equal<FormatProfile["anEsmExtensionInACommonJsPackage"], "esm">>;
type _17b = Expect<Equal<FormatProfile["aCommonJsExtensionInAModulePackage"], "commonjs">>;
type _17c = Expect<Equal<FormatProfile["aPlainExtensionInAModulePackage"], "esm">>;
type _17d = Expect<Equal<FormatProfile["aPlainExtensionInACommonJsPackage"], "commonjs">>;
type _17e = Expect<Equal<FormatProfile["andOnlyThePlainOneAsked"], false>>;

// 18. Report one project at a glance: the configuration it should use, what that
//     implies, and what it still does not promise.
export type ModuleConfigReport<
  Kind extends ProjectKind,
  Mode extends ModernNodeModuleMode,
> = TODO; // TODO(koan)

type _18a = Expect<Equal<ModuleConfigReport<"pinned-node", "node20">["resolution"], "node16">>;
type _18b = Expect<Equal<ModuleConfigReport<"tracking-node", "nodenext">["resolution"], "nodenext">>;
type _18c = Expect<Equal<ModuleConfigReport<"bundled-app", "node20">["resolution"], "bundler">>;
type _18d = Expect<Equal<ModuleConfigReport<"tracking-node", "nodenext">["stability"], "floating">>;
type _18e = Expect<
  Equal<ModuleConfigReport<"pinned-node", "node20">["promisesTheRuntimeIsInstalled"], false>
>;
