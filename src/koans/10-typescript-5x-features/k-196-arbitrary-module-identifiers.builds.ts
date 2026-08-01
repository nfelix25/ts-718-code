import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-196: arbitrary module identifiers — constructions
 * =============================================================================
 *
 * A module's *external* export name is a string, and it has never had to be a
 * legal JavaScript identifier. WebAssembly modules export `wasm:add`; generated
 * code emits `build-version` and `01`. TypeScript 5.6 accepts the ECMAScript
 * string-literal spelling for both directions — `export { local as "wasm:add" }`
 * and `import { "wasm:add" as wasmAdd }` — so the boundary can say exactly what
 * it means while the file keeps identifiers it can actually type.
 *
 * Two facts survive that. The string is an exact namespace key, so the module's
 * type reads `Namespace["wasm:add"]` and nothing shorter; and the local side is
 * still an identifier, because none of this makes `wasm:add` a variable name.
 * Build the two spellings, the key/identifier distinction that forces them, and
 * the namespace the strings produce.
 * Replace each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

// ─── The names at the boundary ────────────────────────────────────────

// 1. Build the external names the koan exports. None of the three is a legal
//    identifier, which is the entire reason the string form exists.
export type ArbitraryExportName = TODO; // TODO(koan)

type _01a = Expect<Equal<ArbitraryExportName, "wasm:add" | "build-version" | "01">>;
type _01b = Expect<Equal<Extract<ArbitraryExportName, `${string}:${string}`>, "wasm:add">>;
type _01c = Expect<Equal<Extract<ArbitraryExportName, `${string}-${string}`>, "build-version">>;
type _01d = Expect<Equal<Extract<ArbitraryExportName, `${number}`>, "01">>;

// 2. Build the pairing the boundary is made of: one string outside, one
//    identifier inside.
export type ExportBinding<External extends string, Local extends string> = TODO; // TODO(koan)

type _02a = Expect<Equal<ExportBinding<"wasm:add", "wasmAdd">["external"], "wasm:add">>;
type _02b = Expect<Equal<ExportBinding<"wasm:add", "wasmAdd">["local"], "wasmAdd">>;
type _02c = Expect<Equal<keyof ExportBinding<"01", "firstOrdinal">, "external" | "local">>;
type _02d = Expect<
  Equal<
    ExportBinding<"01", "firstOrdinal">["external"] | ExportBinding<"01", "firstOrdinal">["local"],
    "01" | "firstOrdinal"
  >
>;

// 3. Build the export statement. The local name is bare; the external name is
//    quoted.
export type RenderExport<
  Local extends string,
  External extends string,
> = TODO; // TODO(koan)

type _03a = Expect<Equal<RenderExport<"wasmAdd", "wasm:add">, 'export { wasmAdd as "wasm:add" };'>>;
type _03b = Expect<
  Equal<RenderExport<"firstOrdinal", "01">, 'export { firstOrdinal as "01" };'>
>;
type _03c = Expect<
  Equal<
    RenderExport<"wasmAdd", "wasm:add"> extends `export { ${infer Local} as ${string}` ? Local : never,
    "wasmAdd"
  >
>;
type _03d = Expect<
  Equal<
    {
      itIsAnExportStatement: GivenExtends<RenderExport<"wasmAdd", "wasm:add">, `export {${string}};`>;
      andTheQuotedNameIsTheBoundaryOne: RenderExport<"wasmAdd", "wasm:add"> extends
        `${string}"${infer External}"${string}`
        ? External
        : never;
    },
    { itIsAnExportStatement: true; andTheQuotedNameIsTheBoundaryOne: "wasm:add" }
  >
>;

// 4. Build the import statement, where the two names swap sides.
export type RenderImport<
  External extends string,
  Local extends string,
  From extends string,
> = TODO; // TODO(koan)

type _04a = Expect<
  Equal<
    RenderImport<"wasm:add", "wasmAdd", "./math.js">,
    'import { "wasm:add" as wasmAdd } from "./math.js";'
  >
>;
type _04b = Expect<
  Equal<
    RenderImport<"01", "firstOrdinal", "./m.js">,
    'import { "01" as firstOrdinal } from "./m.js";'
  >
>;
type _04c = Expect<
  Equal<
    RenderImport<"wasm:add", "wasmAdd", "./m.js"> extends `${string} as ${infer Local} }${string}`
      ? Local
      : never,
    "wasmAdd"
  >
>;
type _04d = Expect<
  Equal<
    Equal<RenderImport<"a", "a", "./m.js">, RenderExport<"a", "a">>,
    false
  >
>;

// ─── Which names need the string form ─────────────────────────────────

// 5. Build the digits, so a name that starts with one can be recognised.
export type Digit = TODO; // TODO(koan)

type _05a = Expect<Equal<Digit, "0" | "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9">>;
type _05b = Expect<Equal<Extract<Digit, "0" | "9">, "0" | "9">>;
type _05c = Expect<Equal<Extract<Digit, "a">, never>>;
type _05d = Expect<Equal<Exclude<Digit, "0" | "1" | "2" | "3" | "4">, "5" | "6" | "7" | "8" | "9">>;

// 6. Build the test for a name that cannot be written bare — it begins with a
//    digit, or contains punctuation an identifier may not.
export type NeedsStringForm<Name extends string> = TODO; // TODO(koan)

type _06a = Expect<Equal<NeedsStringForm<"wasm:add">, true>>;
type _06b = Expect<Equal<NeedsStringForm<"build-version">, true>>;
type _06c = Expect<Equal<NeedsStringForm<"01">, true>>;
type _06d = Expect<Equal<NeedsStringForm<"wasmAdd">, false>>;
type _06e = Expect<Equal<NeedsStringForm<"_private$1">, false>>;

// ─── Looking a binding up ─────────────────────────────────────────────

// 7. Build the lookup from the boundary name to the identifier this file uses.
export type LocalFor<
  External extends string,
  Bindings extends readonly ExportBinding<string, string>[],
> = TODO; // TODO(koan)

type _07a = Expect<
  Equal<LocalFor<"wasm:add", [ExportBinding<"wasm:add", "wasmAdd">]>, "wasmAdd">
>;
type _07b = Expect<
  Equal<
    LocalFor<"01", [ExportBinding<"wasm:add", "wasmAdd">, ExportBinding<"01", "firstOrdinal">]>,
    "firstOrdinal"
  >
>;
type _07c = Expect<Equal<LocalFor<"absent", [ExportBinding<"wasm:add", "wasmAdd">]>, never>>;
type _07d = Expect<Equal<LocalFor<"wasm:add", []>, never>>;

// 8. Build the inverse, which is what a renamed re-export needs.
export type ExternalFor<
  Local extends string,
  Bindings extends readonly ExportBinding<string, string>[],
> = TODO; // TODO(koan)

type _08a = Expect<
  Equal<ExternalFor<"wasmAdd", [ExportBinding<"wasm:add", "wasmAdd">]>, "wasm:add">
>;
type _08b = Expect<
  Equal<
    ExternalFor<"firstOrdinal", [ExportBinding<"wasm:add", "wasmAdd">, ExportBinding<"01", "firstOrdinal">]>,
    "01"
  >
>;
type _08c = Expect<Equal<ExternalFor<"absent", [ExportBinding<"wasm:add", "wasmAdd">]>, never>>;
type _08d = Expect<Equal<ExternalFor<"wasmAdd", []>, never>>;

// ─── The namespace the strings produce ────────────────────────────────

// 9. Build one entry of a module namespace: the boundary name and the type it
//    carries.
export type ModuleEntry<External extends string, Value> = TODO; // TODO(koan)

type _09a = Expect<Equal<ModuleEntry<"01", 1>["value"], 1>>;
type _09b = Expect<Equal<ModuleEntry<"01", 1>["external"], "01">>;
type _09c = Expect<Equal<keyof ModuleEntry<"01", 1>, "external" | "value">>;
type _09d = Expect<
  Equal<ModuleEntry<"wasm:add", (left: number, right: number) => number>["value"], (left: number, right: number) => number>
>;

// 10. Build the namespace itself, keyed by the exact strings. Remapping the key
//     is what turns a list of entries into the shape `import * as` produces.
export type NamespaceOf<Entries extends readonly ModuleEntry<string, unknown>[]> = TODO; // TODO(koan)

type _10a = Expect<
  Equal<
    NamespaceOf<[ModuleEntry<"01", 1>, ModuleEntry<"build-version", "7.0">]>,
    { "01": 1; "build-version": "7.0" }
  >
>;
type _10b = Expect<Equal<keyof NamespaceOf<[ModuleEntry<"wasm:add", () => void>]>, "wasm:add">>;
type _10c = Expect<Equal<NamespaceOf<[ModuleEntry<"01", 1>]>["01"], 1>>;
type _10d = Expect<Equal<NamespaceOf<[]>, {}>>;

// 11. Build the access form each key forces. A key that is not an identifier can
//     only be read with brackets, whatever the local binding is called.
export type AccessFormFor<Key extends string> = TODO; // TODO(koan)

type _11a = Expect<Equal<AccessFormFor<"wasm:add">, "bracket">>;
type _11b = Expect<Equal<AccessFormFor<"01">, "bracket">>;
type _11c = Expect<Equal<AccessFormFor<"wasmAdd">, "dot">>;
type _11d = Expect<Equal<AccessFormFor<ArbitraryExportName>, "bracket">>;

// 12. Build the expression that reads it.
export type RenderAccess<
  Namespace extends string,
  Key extends string,
> = TODO; // TODO(koan)

type _12a = Expect<Equal<RenderAccess<"math", "wasm:add">, 'math["wasm:add"]'>>;
type _12b = Expect<Equal<RenderAccess<"math", "wasmAdd">, "math.wasmAdd">>;
type _12c = Expect<Equal<RenderAccess<"math", "01">, 'math["01"]'>>;
type _12d = Expect<Equal<Equal<RenderAccess<"m", "a">, RenderAccess<"m", "a-b">>, false>>;

// ─── What it does and does not license ────────────────────────────────

// 13. Build the claims someone might make about the feature.
export type Claim = TODO; // TODO(koan)

type _13a = Expect<
  Equal<
    Claim,
    | "externalNamesMayBeAnyString"
    | "namespaceKeysAreExact"
    | "localBindingsMayBeAnyString"
    | "everyRuntimeUnderstandsTheSyntax"
  >
>;
type _13b = Expect<Equal<Extract<Claim, `local${string}`>, "localBindingsMayBeAnyString">>;
type _13c = Expect<Equal<Extract<Claim, `every${string}`>, "everyRuntimeUnderstandsTheSyntax">>;
type _13d = Expect<Equal<Extract<Claim, "typesAreChecked">, never>>;

// 14. Build which of them hold. The two about the boundary do; the two about the
//     surrounding language and toolchain do not.
export type Holds<TheClaim extends Claim> = TODO; // TODO(koan)

type _14a = Expect<Equal<Holds<"externalNamesMayBeAnyString">, true>>;
type _14b = Expect<Equal<Holds<"namespaceKeysAreExact">, true>>;
type _14c = Expect<Equal<Holds<"localBindingsMayBeAnyString">, false>>;
type _14d = Expect<Equal<Holds<"everyRuntimeUnderstandsTheSyntax">, false>>;
type _14e = Expect<Equal<Holds<Claim>, boolean>>;

// ─── Reading it back ──────────────────────────────────────────────────

// 15. Report one binding from both sides.
export type BindingProfile = TODO; // TODO(koan)

type _15a = Expect<Equal<BindingProfile["theLocalName"], "wasmAdd">>;
type _15b = Expect<Equal<BindingProfile["backAgain"], "wasm:add">>;
type _15c = Expect<Equal<BindingProfile["theBoundaryNameNeedsQuoting"], true>>;
type _15d = Expect<Equal<BindingProfile["theLocalNameDoesNot"], false>>;

// 16. Report the namespace the koan's three exports produce.
export type NamespaceProfile = TODO; // TODO(koan)

type _16a = Expect<Equal<NamespaceProfile["keys"], "wasm:add" | "build-version" | "01">>;
type _16b = Expect<Equal<NamespaceProfile["theVersion"], "7.0">>;
type _16c = Expect<Equal<NamespaceProfile["theOrdinal"], 1>>;
type _16d = Expect<Equal<NamespaceProfile["everyKeyNeedsBrackets"], "bracket">>;

// 17. Report the syntax both directions produce for the same binding.
export type SyntaxProfile = TODO; // TODO(koan)

type _17a = Expect<Equal<SyntaxProfile["atTheExport"], 'export { wasmAdd as "wasm:add" };'>>;
type _17b = Expect<
  Equal<SyntaxProfile["atTheImport"], 'import { "wasm:add" as wasmAdd } from "./math.js";'>
>;
type _17c = Expect<Equal<SyntaxProfile["atTheUseSite"], 'math["wasm:add"]'>>;
type _17d = Expect<Equal<SyntaxProfile["andTheLocalNameIsOrdinary"], "math.wasmAdd">>;

// 18. Report one boundary name at a glance: whether it needs the string form,
//     what it is called locally, how it is read, and what is still not licensed.
export type ModuleIdentifierReport<
  External extends string,
  Bindings extends readonly ExportBinding<string, string>[],
> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<ModuleIdentifierReport<"wasm:add", [ExportBinding<"wasm:add", "wasmAdd">]>["quoted"], true>
>;
type _18b = Expect<
  Equal<ModuleIdentifierReport<"wasm:add", [ExportBinding<"wasm:add", "wasmAdd">]>["local"], "wasmAdd">
>;
type _18c = Expect<
  Equal<ModuleIdentifierReport<"wasm:add", []>["access"], 'ns["wasm:add"]'>
>;
type _18d = Expect<
  Equal<
    ModuleIdentifierReport<"wasm:add", []>["importStatement"],
    'import { "wasm:add" as local } from "./m.js";'
  >
>;
type _18e = Expect<
  Equal<ModuleIdentifierReport<"wasm:add", []>["localNamesAreStillIdentifiers"], false>
>;
