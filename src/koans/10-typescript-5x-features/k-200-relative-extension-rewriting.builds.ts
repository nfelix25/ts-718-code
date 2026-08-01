import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-200: relative import extension rewriting — constructions
 * =============================================================================
 *
 * A runtime that executes TypeScript directly wants `import "./worker.ts"`.
 * Published JavaScript needs that same line to say `./worker.js`. TypeScript
 * 5.7's `rewriteRelativeImportExtensions` bridges the two at emit, and the rule
 * is deliberately mechanical: if a static specifier begins with `./` or `../`,
 * ends in `.ts`, `.tsx`, `.mts` or `.cts`, and is not a declaration file,
 * replace that suffix with `.js`, `.jsx`, `.mjs` or `.cjs`.
 *
 * Everything the rule leaves alone is as important as what it changes. Package
 * names, `#imports`, path aliases, extensionless specifiers, specifiers that
 * already name JavaScript, and `.d.ts` files are all untouched — the transform
 * resolves nothing, it only rewrites a suffix it can see. Build the pairing, the
 * two guards, and the rewrite they gate.
 * Replace each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

// ─── The extensions ───────────────────────────────────────────────────

// 1. Build the source extensions the rule recognises.
export type TypeScriptSourceExtension = TODO; // TODO(koan)

type _01a = Expect<Equal<TypeScriptSourceExtension, ".ts" | ".tsx" | ".mts" | ".cts">>;
type _01b = Expect<Equal<Extract<TypeScriptSourceExtension, ".mts" | ".cts">, ".mts" | ".cts">>;
type _01c = Expect<Equal<Exclude<TypeScriptSourceExtension, ".ts">, ".tsx" | ".mts" | ".cts">>;
type _01d = Expect<Equal<Extract<TypeScriptSourceExtension, ".d.ts">, never>>;

// 2. Build the output extensions it writes.
export type JavaScriptOutputExtension = TODO; // TODO(koan)

type _02a = Expect<Equal<JavaScriptOutputExtension, ".js" | ".jsx" | ".mjs" | ".cjs">>;
type _02b = Expect<Equal<Extract<JavaScriptOutputExtension, ".mjs" | ".cjs">, ".mjs" | ".cjs">>;
type _02c = Expect<Equal<Extract<JavaScriptOutputExtension, TypeScriptSourceExtension>, never>>;
type _02d = Expect<Equal<Extract<JavaScriptOutputExtension, ".json">, never>>;

// 3. Build the pairing between them. Each source extension has exactly one
//    output, and the module-format ones keep their format.
export type OutputFor<Extension extends TypeScriptSourceExtension> = TODO; // TODO(koan)

type _03a = Expect<Equal<OutputFor<".ts">, ".js">>;
type _03b = Expect<Equal<OutputFor<".tsx">, ".jsx">>;
type _03c = Expect<Equal<OutputFor<".mts">, ".mjs">>;
type _03d = Expect<Equal<OutputFor<".cts">, ".cjs">>;
type _03e = Expect<Equal<OutputFor<TypeScriptSourceExtension>, ".js" | ".jsx" | ".mjs" | ".cjs">>;

// ─── The two guards ───────────────────────────────────────────────────

// 4. Build the first guard: the rule only touches specifiers that are relative
//    on their face. Nothing is resolved to find out.
export type IsRelative<Path extends string> = TODO; // TODO(koan)

type _04a = Expect<Equal<IsRelative<"./worker.ts">, true>>;
type _04b = Expect<Equal<IsRelative<"../ui/view.tsx">, true>>;
type _04c = Expect<Equal<IsRelative<"react">, false>>;
type _04d = Expect<Equal<IsRelative<"#internal/worker.ts">, false>>;
type _04e = Expect<Equal<IsRelative<"@app/worker.ts">, false>>;

// 5. Build the second guard: a declaration file names no emitted JavaScript, so
//    rewriting its suffix would point at nothing.
export type IsDeclarationPath<Path extends string> = TODO; // TODO(koan)

type _05a = Expect<Equal<IsDeclarationPath<"./types.d.ts">, true>>;
type _05b = Expect<Equal<IsDeclarationPath<"./types.d.mts">, true>>;
type _05c = Expect<Equal<IsDeclarationPath<"./worker.ts">, false>>;
type _05d = Expect<Equal<IsDeclarationPath<"./d.ts">, false>>;

// ─── The rewrite ──────────────────────────────────────────────────────

// 6. Build the suffix replacement. The order matters: `.mts` and `.cts` have to
//    be matched before the shorter pattern gets a chance at them.
export type RewriteSourceExtension<Path extends string> = TODO; // TODO(koan)

type _06a = Expect<Equal<RewriteSourceExtension<"./worker.ts">, "./worker.js">>;
type _06b = Expect<Equal<RewriteSourceExtension<"../ui/view.tsx">, "../ui/view.jsx">>;
type _06c = Expect<Equal<RewriteSourceExtension<"./loader.mts">, "./loader.mjs">>;
type _06d = Expect<Equal<RewriteSourceExtension<"./legacy.cts">, "./legacy.cjs">>;
type _06e = Expect<Equal<RewriteSourceExtension<"./already.js">, "./already.js">>;

// 7. Build the whole rule: both guards, then the replacement.
export type RewriteRelativeImport<Path extends string> = TODO; // TODO(koan)

type _07a = Expect<Equal<RewriteRelativeImport<"./worker.ts">, "./worker.js">>;
type _07b = Expect<Equal<RewriteRelativeImport<"./types.d.ts">, "./types.d.ts">>;
type _07c = Expect<Equal<RewriteRelativeImport<"pkg/worker.ts">, "pkg/worker.ts">>;
type _07d = Expect<Equal<RewriteRelativeImport<"./worker">, "./worker">>;
type _07e = Expect<Equal<RewriteRelativeImport<"../legacy.cts">, "../legacy.cjs">>;

// 8. Build the question of whether anything happened at all.
export type Rewritten<Path extends string> = TODO; // TODO(koan)

type _08a = Expect<Equal<Rewritten<"./worker.ts">, true>>;
type _08b = Expect<Equal<Rewritten<"./types.d.ts">, false>>;
type _08c = Expect<Equal<Rewritten<"react">, false>>;
type _08d = Expect<Equal<Rewritten<"./worker.js">, false>>;

// ─── Reading a specifier apart ────────────────────────────────────────

// 9. Build the reader for the suffix. A relative specifier begins with a dot,
//    so "the part after a dot" is not enough — an extension never spans a `/`.
export type ExtensionOf<Path extends string> = TODO; // TODO(koan)

type _09a = Expect<Equal<ExtensionOf<"./worker.ts">, ".ts">>;
type _09b = Expect<Equal<ExtensionOf<"../ui/view.tsx">, ".tsx">>;
type _09c = Expect<Equal<ExtensionOf<"./types.d.ts">, ".ts">>;
type _09d = Expect<Equal<ExtensionOf<"./worker">, "">>;

// 10. Build the reader for everything before that suffix.
export type StemOf<Path extends string> = TODO; // TODO(koan)

type _10a = Expect<Equal<StemOf<"./worker.ts">, "./worker">>;
type _10b = Expect<Equal<StemOf<"../ui/view.tsx">, "../ui/view">>;
type _10c = Expect<Equal<StemOf<"./worker">, "./worker">>;
type _10d = Expect<Equal<StemOf<"./types.d.ts">, "./types.d">>;

// 11. Build the classification of a specifier's *shape*, which is all the rule
//     ever consults.
export type SpecifierKind<Path extends string> = TODO; // TODO(koan)

type _11a = Expect<Equal<SpecifierKind<"./worker.ts">, "relative">>;
type _11b = Expect<Equal<SpecifierKind<"#internal/worker.ts">, "package-import">>;
type _11c = Expect<Equal<SpecifierKind<"react">, "bare">>;
type _11d = Expect<Equal<SpecifierKind<"@app/worker.ts">, "bare">>;

// 12. Build the rewrite over a whole import list, since a module has many.
export type RewriteAll<Paths extends readonly string[]> = TODO; // TODO(koan)

type _12a = Expect<
  Equal<RewriteAll<["./a.ts", "./b.tsx", "react"]>, ["./a.js", "./b.jsx", "react"]>
>;
type _12b = Expect<Equal<RewriteAll<[]>, []>>;
type _12c = Expect<Equal<RewriteAll<["./types.d.ts"]>, ["./types.d.ts"]>>;
type _12d = Expect<Equal<RewriteAll<readonly ["./a.mts"]>, readonly ["./a.mjs"]>>;

// ─── What it leaves alone ─────────────────────────────────────────────

// 13. Build the list of specifier shapes the transform never touches.
export type UntouchedKind = TODO; // TODO(koan)

type _13a = Expect<
  Equal<
    UntouchedKind,
    | "bareSpecifier"
    | "packageImport"
    | "pathAlias"
    | "extensionless"
    | "alreadyJavaScript"
    | "declarationFile"
  >
>;
type _13b = Expect<Equal<Extract<UntouchedKind, `${string}Import`>, "packageImport">>;
type _13c = Expect<Equal<Extract<UntouchedKind, "declarationFile">, "declarationFile">>;
type _13d = Expect<Equal<Extract<UntouchedKind, "relativeSource">, never>>;

// 14. Build the answer for each shape. The transform is syntactic, so "would a
//     resolver find a `.ts` file there?" is never asked.
export type IsRewritten<Kind extends UntouchedKind | "relativeSource"> = TODO; // TODO(koan)

type _14a = Expect<Equal<IsRewritten<"relativeSource">, true>>;
type _14b = Expect<Equal<IsRewritten<"bareSpecifier">, false>>;
type _14c = Expect<Equal<IsRewritten<"pathAlias">, false>>;
type _14d = Expect<Equal<IsRewritten<"alreadyJavaScript">, false>>;
type _14e = Expect<Equal<IsRewritten<UntouchedKind>, false>>;

// 15. Build the signature of the runtime helper that mirrors the rule, `const`
//     parameter and all, so a literal argument keeps its literal result.
export type RewriteSignature = TODO; // TODO(koan)

type _15a = Expect<Equal<Parameters<RewriteSignature>["length"], 1>>;
type _15b = Expect<Equal<Parameters<RewriteSignature>[0], string>>;
type _15c = Expect<Equal<ReturnType<RewriteSignature>, string>>;
type _15d = Expect<
  Equal<
    {
      itAcceptsALiteral: GivenExtends<RewriteSignature, (path: "./a.ts") => string>;
      butItIsNotJustThatCall: GivenExtends<(path: "./a.ts") => "./a.js", RewriteSignature>;
    },
    { itAcceptsALiteral: true; butItIsNotJustThatCall: false }
  >
>;

// ─── Reading the cases back ───────────────────────────────────────────

// 16. Report the four rewrites the koan tabulates.
export type RewriteProfile = TODO; // TODO(koan)

type _16a = Expect<Equal<RewriteProfile["aSourceFile"], "./foo.js">>;
type _16b = Expect<Equal<RewriteProfile["aComponent"], "../ui/view.jsx">>;
type _16c = Expect<Equal<RewriteProfile["anEsmModule"], "./loader.mjs">>;
type _16d = Expect<Equal<RewriteProfile["aCommonJsModule"], "./legacy.cjs">>;
type _16e = Expect<Equal<RewriteProfile["andTheSuffixIsAllThatChanged"], "./foo">>;

// 17. Report the specifiers that come out exactly as they went in, and why.
export type UntouchedProfile = TODO; // TODO(koan)

type _17a = Expect<Equal<UntouchedProfile["aBareSpecifier"], "react">>;
type _17b = Expect<Equal<UntouchedProfile["aPackageImport"], "#internal/worker.ts">>;
type _17c = Expect<Equal<UntouchedProfile["aPathAlias"], "@app/worker.ts">>;
type _17d = Expect<Equal<UntouchedProfile["anExtensionlessPath"], "./worker">>;
type _17e = Expect<Equal<UntouchedProfile["aDeclarationFile"], "./types.d.ts">>;

// 18. Report one specifier at a glance: its shape, its suffix, what emit writes,
//     and whether anything moved.
export type SpecifierReport<Path extends string> = TODO; // TODO(koan)

type _18a = Expect<Equal<SpecifierReport<"./worker.ts">["kind"], "relative">>;
type _18b = Expect<Equal<SpecifierReport<"./worker.ts">["emitted"], "./worker.js">>;
type _18c = Expect<Equal<SpecifierReport<"./worker.ts">["changed"], true>>;
type _18d = Expect<Equal<SpecifierReport<"./types.d.ts">["declaration"], true>>;
type _18e = Expect<Equal<SpecifierReport<"react">["kind"], "bare">>;
