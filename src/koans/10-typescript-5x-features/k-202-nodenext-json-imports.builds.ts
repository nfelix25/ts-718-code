import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-202: validated JSON imports under NodeNext — constructions
 * =============================================================================
 *
 * Node's ESM loader gives a JSON module one export: `default`. It also requires
 * the import to say `with { type: "json" }`. Under `module: "nodenext"`,
 * TypeScript 5.7 checks both instead of accepting shapes Node would reject at
 * runtime — so `import data from "./config.json" with { type: "json" }` is fine,
 * a namespace import must reach the value through `.default`, and named imports
 * are never synthesised from the object's properties.
 *
 * It is module-shape validation, not schema validation. The compiler still
 * infers the file's contents perfectly well; what it now insists on is the two
 * rules that decide whether Node will hand you that value at all. Build the
 * attribute, the namespace shape, and the check that pairs an import form with
 * the access it licenses.
 * Replace each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

type ConfigValue = { readonly name: "koans"; readonly version: 7 };

// ─── The syntax ───────────────────────────────────────────────────────

// 1. Build the three ways a module can be imported.
export type JsonImportForm = TODO; // TODO(koan)

type _01a = Expect<Equal<JsonImportForm, "default" | "namespace" | "named">>;
type _01b = Expect<Equal<Exclude<JsonImportForm, "named">, "default" | "namespace">>;
type _01c = Expect<Equal<Extract<JsonImportForm, "namespace">, "namespace">>;
type _01d = Expect<Equal<Extract<JsonImportForm, "sideEffect">, never>>;

// 2. Build whether the attribute is there.
export type JsonAttributeState = TODO; // TODO(koan)

type _02a = Expect<Equal<JsonAttributeState, "present" | "missing">>;
type _02b = Expect<Equal<Exclude<JsonAttributeState, "missing">, "present">>;
type _02c = Expect<Equal<Extract<JsonAttributeState, "missing">, "missing">>;
type _02d = Expect<Equal<Extract<JsonAttributeState, "inferred">, never>>;

// 3. Build the attribute itself. It is an ordinary import-attribute bag whose
//    one entry says how the module is to be interpreted.
export type JsonAttributes = TODO; // TODO(koan)

type _03a = Expect<Equal<JsonAttributes, { readonly type: "json" }>>;
type _03b = Expect<Equal<JsonAttributes["type"], "json">>;
type _03c = Expect<Equal<keyof JsonAttributes, "type">>;
type _03d = Expect<
  Equal<
    {
      itIsALegalAttributeBag: GivenExtends<JsonAttributes, ImportAttributes>;
      andItsOneValueIsTheJsonTag: JsonAttributes["type"];
    },
    { itIsALegalAttributeBag: true; andItsOneValueIsTheJsonTag: "json" }
  >
>;

// 4. Build the ways the imported value can be read.
export type JsonAccessForm = TODO; // TODO(koan)

type _04a = Expect<Equal<JsonAccessForm, "direct-default" | "namespace-default" | "named">>;
type _04b = Expect<
  Equal<Extract<JsonAccessForm, `${string}default`>, "direct-default" | "namespace-default">
>;
type _04c = Expect<Equal<Exclude<JsonAccessForm, `${string}default`>, "named">>;
type _04d = Expect<Equal<Extract<JsonAccessForm, "destructured">, never>>;

// ─── The module shape ─────────────────────────────────────────────────

// 5. Build what a JSON module's namespace actually contains. One export, and it
//    is not the object's properties.
export type JsonModuleNamespace<Value> = TODO; // TODO(koan)

type _05a = Expect<Equal<keyof JsonModuleNamespace<ConfigValue>, "default">>;
type _05b = Expect<Equal<JsonModuleNamespace<ConfigValue>["default"], ConfigValue>>;
type _05c = Expect<Equal<Extract<"name", keyof JsonModuleNamespace<ConfigValue>>, never>>;
type _05d = Expect<Equal<JsonModuleNamespace<number>["default"], number>>;

// 6. Build the unwrapping a namespace import has to do.
export type UnwrapJsonModule<Namespace> = TODO; // TODO(koan)

type _06a = Expect<Equal<UnwrapJsonModule<JsonModuleNamespace<ConfigValue>>, ConfigValue>>;
type _06b = Expect<Equal<UnwrapJsonModule<JsonModuleNamespace<number[]>>, number[]>>;
type _06c = Expect<Equal<UnwrapJsonModule<ConfigValue>, never>>;
type _06d = Expect<Equal<UnwrapJsonModule<{ default: never }>, never>>;

// 7. Build what each import form binds. Only the namespace form leaves you
//    holding the module object rather than the value.
export type BindingOf<Form extends JsonImportForm, Value> = TODO; // TODO(koan)

type _07a = Expect<Equal<BindingOf<"default", ConfigValue>, ConfigValue>>;
type _07b = Expect<Equal<BindingOf<"namespace", ConfigValue>, { default: ConfigValue }>>;
type _07c = Expect<Equal<BindingOf<"named", ConfigValue>, never>>;
type _07d = Expect<Equal<UnwrapJsonModule<BindingOf<"namespace", ConfigValue>>, ConfigValue>>;

// ─── The check ────────────────────────────────────────────────────────

// 8. Build the outcomes the compiler can report.
export type JsonImportCheck = TODO; // TODO(koan)

type _08a = Expect<Equal<JsonImportCheck, "valid" | "missing-json-attribute" | "default-export-only">>;
type _08b = Expect<
  Equal<Exclude<JsonImportCheck, "valid">, "missing-json-attribute" | "default-export-only">
>;
type _08c = Expect<Equal<Extract<JsonImportCheck, `missing-${string}`>, "missing-json-attribute">>;
type _08d = Expect<Equal<Extract<JsonImportCheck, "schema-mismatch">, never>>;

// 9. Build the pairing of form and access that Node actually supports.
export type AccessFor<Form extends JsonImportForm> = TODO; // TODO(koan)

type _09a = Expect<Equal<AccessFor<"default">, "direct-default">>;
type _09b = Expect<Equal<AccessFor<"namespace">, "namespace-default">>;
type _09c = Expect<Equal<AccessFor<"named">, "named">>;
type _09d = Expect<
  Equal<AccessFor<JsonImportForm>, "direct-default" | "namespace-default" | "named">
>;

// 10. Build the check itself. The attribute is tested first, because without it
//     Node never gets as far as the export shape.
export type ValidateJsonImport<
  Form extends JsonImportForm,
  Attribute extends JsonAttributeState,
  Access extends JsonAccessForm,
> = TODO; // TODO(koan)

type _10a = Expect<Equal<ValidateJsonImport<"default", "present", "direct-default">, "valid">>;
type _10b = Expect<Equal<ValidateJsonImport<"namespace", "present", "namespace-default">, "valid">>;
type _10c = Expect<
  Equal<ValidateJsonImport<"default", "missing", "direct-default">, "missing-json-attribute">
>;
type _10d = Expect<Equal<ValidateJsonImport<"named", "present", "named">, "default-export-only">>;
type _10e = Expect<
  Equal<ValidateJsonImport<"namespace", "present", "direct-default">, "default-export-only">
>;

// 11. Build the yes-or-no question a build cares about.
export type IsAccepted<Check extends JsonImportCheck> = TODO; // TODO(koan)

type _11a = Expect<Equal<IsAccepted<"valid">, true>>;
type _11b = Expect<Equal<IsAccepted<"missing-json-attribute">, false>>;
type _11c = Expect<Equal<IsAccepted<"default-export-only">, false>>;
type _11d = Expect<Equal<IsAccepted<JsonImportCheck>, boolean>>;

// 12. Build the statement each form renders to, attribute included.
export type RenderJsonImport<
  Form extends JsonImportForm,
  Specifier extends string,
> = TODO; // TODO(koan)

type _12a = Expect<
  Equal<
    RenderJsonImport<"default", "./config.json">,
    'import data from "./config.json" with { type: "json" };'
  >
>;
type _12b = Expect<
  Equal<
    RenderJsonImport<"namespace", "./config.json">,
    'import * as data from "./config.json" with { type: "json" };'
  >
>;
type _12c = Expect<
  Equal<
    RenderJsonImport<"named", "./config.json">,
    'import { name } from "./config.json" with { type: "json" };'
  >
>;
type _12d = Expect<
  Equal<
    Equal<RenderJsonImport<"default", "./c.json">, RenderJsonImport<"namespace", "./c.json">>,
    false
  >
>;

// ─── What is and is not checked ───────────────────────────────────────

// 13. Build the claims this validation could be confused with.
export type Claim = TODO; // TODO(koan)

type _13a = Expect<
  Equal<
    Claim,
    "theAttributeIsPresent" | "theExportShapeMatchesNode" | "theFileParsesAsJson" | "theContentsMatchASchema"
  >
>;
type _13b = Expect<Equal<Extract<Claim, `${string}Schema`>, "theContentsMatchASchema">>;
type _13c = Expect<
  Equal<Exclude<Claim, "theAttributeIsPresent" | "theExportShapeMatchesNode">, "theFileParsesAsJson" | "theContentsMatchASchema">
>;
type _13d = Expect<Equal<Extract<Claim, "theFileExists">, never>>;

// 14. Build which of them the check makes. Two are about module shape; the
//     others are somebody else's job.
export type CheckedByCompiler<TheClaim extends Claim> = TODO; // TODO(koan)

type _14a = Expect<Equal<CheckedByCompiler<"theAttributeIsPresent">, true>>;
type _14b = Expect<Equal<CheckedByCompiler<"theExportShapeMatchesNode">, true>>;
type _14c = Expect<Equal<CheckedByCompiler<"theFileParsesAsJson">, false>>;
type _14d = Expect<Equal<CheckedByCompiler<"theContentsMatchASchema">, false>>;
type _14e = Expect<Equal<CheckedByCompiler<Claim>, boolean>>;

// 15. Build the type of the value once it has arrived, which is inferred from
//     the file and untouched by any of this.
export type ImportedValue<Form extends JsonImportForm, Value> = TODO; // TODO(koan)

type _15a = Expect<Equal<ImportedValue<"default", ConfigValue>, ConfigValue>>;
type _15b = Expect<Equal<ImportedValue<"namespace", ConfigValue>, ConfigValue>>;
type _15c = Expect<Equal<ImportedValue<"named", ConfigValue>, never>>;
type _15d = Expect<Equal<ImportedValue<"default", ConfigValue>["version"], 7>>;

// ─── Reading the matrix back ──────────────────────────────────────────

// 16. Report the four rows the koan collects.
export type CaseProfile = TODO; // TODO(koan)

type _16a = Expect<Equal<CaseProfile["aDefaultImportWithTheAttribute"], "valid">>;
type _16b = Expect<Equal<CaseProfile["aNamespaceImportReadThroughDefault"], "valid">>;
type _16c = Expect<Equal<CaseProfile["aDefaultImportWithoutTheAttribute"], "missing-json-attribute">>;
type _16d = Expect<Equal<CaseProfile["aNamedImport"], "default-export-only">>;

// 17. Report the shape of the module both accepted forms are looking at — one
//     export, reached two ways.
export type NamespaceProfile = TODO; // TODO(koan)

type _17a = Expect<Equal<NamespaceProfile["whatTheNamespaceHolds"], "default">>;
type _17b = Expect<Equal<NamespaceProfile["whatTheDefaultFormBinds"], ConfigValue>>;
type _17c = Expect<Equal<NamespaceProfile["whatTheNamespaceFormBinds"], { default: ConfigValue }>>;
type _17d = Expect<Equal<NamespaceProfile["andBothReachTheSameValue"], true>>;
type _17e = Expect<Equal<NamespaceProfile["namedPropertiesAreNotExports"], never>>;

// 18. Report one import at a glance: the statement, the verdict, and the value
//     if there is one.
export type JsonImportReport<
  Form extends JsonImportForm,
  Attribute extends JsonAttributeState,
  Value,
> = TODO; // TODO(koan)

type _18a = Expect<Equal<JsonImportReport<"default", "present", ConfigValue>["verdict"], "valid">>;
type _18b = Expect<Equal<JsonImportReport<"default", "present", ConfigValue>["value"], ConfigValue>>;
type _18c = Expect<Equal<JsonImportReport<"default", "missing", ConfigValue>["accepted"], false>>;
type _18d = Expect<Equal<JsonImportReport<"named", "present", ConfigValue>["value"], never>>;
type _18e = Expect<Equal<JsonImportReport<"default", "present", ConfigValue>["schemaChecked"], false>>;
