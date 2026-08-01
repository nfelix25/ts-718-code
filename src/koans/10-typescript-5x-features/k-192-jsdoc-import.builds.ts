import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-192: the JSDoc @import tag — constructions
 * =============================================================================
 *
 * A checked JavaScript file often needs a type from another module and nothing
 * else from it. An ECMAScript import would be a runtime operation for a purely
 * compile-time need, so before TypeScript 5.5 the alternatives were repeating
 * `import("./models.js").User` at every use site or introducing a local
 * `@typedef`. 5.5 added `@import`, a JSDoc tag whose payload reads exactly like
 * an import statement and whose effect is confined to the file's type space.
 *
 * That "reads like an import" is the part worth building. The tag has the two
 * forms a real import has — named bindings and a namespace alias — and each puts
 * different names in scope: `{ User, UserId }` gives you `User`, while
 * `* as models` gives you `models.User`. Build the two specs, the renderer that
 * turns them into the literal comment, and the scope each one produces.
 * Replace each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

// ─── The two forms ────────────────────────────────────────────────────

// 1. Build the tag's two shapes, as a tag to discriminate on.
export type JSDocImportKind = TODO; // TODO(koan)

type _01a = Expect<Equal<JSDocImportKind, "named" | "namespace">>;
type _01b = Expect<Equal<Exclude<JSDocImportKind, "named">, "namespace">>;
type _01c = Expect<Equal<Extract<JSDocImportKind, "named">, "named">>;
type _01d = Expect<Equal<Extract<JSDocImportKind, "default">, never>>;

// 2. Build the named form: a module and the bindings taken from it.
export type NamedImport<Module extends string, Names extends readonly string[]> = TODO; // TODO(koan)

type _02a = Expect<Equal<NamedImport<"./models.js", ["User"]>["kind"], "named">>;
type _02b = Expect<Equal<NamedImport<"./models.js", ["User"]>["from"], "./models.js">>;
type _02c = Expect<Equal<NamedImport<"./models.js", ["User", "UserId"]>["names"], ["User", "UserId"]>>;
type _02d = Expect<Equal<keyof NamedImport<"./models.js", []>, "kind" | "from" | "names">>;

// 3. Build the namespace form: a module and the single name it is bound to.
export type NamespaceImport<Module extends string, Alias extends string> = TODO; // TODO(koan)

type _03a = Expect<Equal<NamespaceImport<"./models.js", "models">["kind"], "namespace">>;
type _03b = Expect<Equal<NamespaceImport<"./models.js", "models">["alias"], "models">>;
type _03c = Expect<Equal<keyof NamespaceImport<"./models.js", "models">, "kind" | "from" | "alias">>;
type _03d = Expect<Equal<NamespaceImport<"./models.js", "models">["from"], "./models.js">>;

// 4. Build the union a renderer dispatches on.
export type JSDocImport = TODO; // TODO(koan)

type _04a = Expect<Equal<JSDocImport["kind"], "named" | "namespace">>;
type _04b = Expect<Equal<Extract<JSDocImport, { kind: "namespace" }>["alias"], string>>;
type _04c = Expect<Equal<keyof JSDocImport, "kind" | "from">>;
type _04d = Expect<
  Equal<
    {
      aNamedSpecIsOneOfThem: GivenExtends<NamedImport<"./m.js", ["A"]>, JSDocImport>;
      butTheUnionIsNotJustThatOne: GivenExtends<JSDocImport, NamedImport<"./m.js", ["A"]>>;
    },
    { aNamedSpecIsOneOfThem: true; butTheUnionIsNotJustThatOne: false }
  >
>;

// ─── Rendering the comment ────────────────────────────────────────────

// 5. Build the list join the named form needs — the separator goes *between*
//    names, so a one-element list gets none and an empty list renders nothing.
export type JoinNames<Names extends readonly string[], Separator extends string = ", "> = TODO; // TODO(koan)

type _05a = Expect<Equal<JoinNames<["User", "UserId"]>, "User, UserId">>;
type _05b = Expect<Equal<JoinNames<["User"]>, "User">>;
type _05c = Expect<Equal<JoinNames<[]>, "">>;
type _05d = Expect<Equal<JoinNames<["a", "b", "c"], " | ">, "a | b | c">>;

// 6. Build the rendered named tag, comment delimiters and all.
export type RenderNamed<
  Module extends string,
  Names extends readonly string[],
> = TODO; // TODO(koan)

type _06a = Expect<
  Equal<
    RenderNamed<"./models.js", ["User", "UserId"]>,
    '/** @import { User, UserId } from "./models.js" */'
  >
>;
type _06b = Expect<Equal<RenderNamed<"./m.js", ["A"]>, '/** @import { A } from "./m.js" */'>>;
type _06c = Expect<Equal<RenderNamed<"./m.js", []>, '/** @import {  } from "./m.js" */'>>;
type _06d = Expect<
  Equal<
    {
      itIsAComment: GivenExtends<RenderNamed<"./m.js", ["A"]>, `/**${string}*/`>;
      andItNamesTheModule: RenderNamed<"./m.js", ["A"]> extends `${string}"${infer Module}"${string}`
        ? Module
        : never;
    },
    { itIsAComment: true; andItNamesTheModule: "./m.js" }
  >
>;

// 7. Build the rendered namespace tag.
export type RenderNamespace<
  Module extends string,
  Alias extends string,
> = TODO; // TODO(koan)

type _07a = Expect<
  Equal<RenderNamespace<"./models.js", "models">, '/** @import * as models from "./models.js" */'>
>;
type _07b = Expect<Equal<RenderNamespace<"./m.js", "m">, '/** @import * as m from "./m.js" */'>>;
type _07c = Expect<
  Equal<
    Equal<RenderNamespace<"./m.js", "m">, RenderNamed<"./m.js", ["m"]>>,
    false
  >
>;
type _07d = Expect<
  Equal<
    {
      itBindsTheWholeModule: GivenExtends<RenderNamespace<"./m.js", "m">, `${string}* as m${string}`>;
      andItIsNotTheNamedForm: GivenExtends<RenderNamespace<"./m.js", "m">, `${string}{${string}`>;
    },
    { itBindsTheWholeModule: true; andItIsNotTheNamedForm: false }
  >
>;

// 8. Build the renderer that dispatches on the spec.
export type RenderImport<Spec extends JSDocImport> = TODO; // TODO(koan)

type _08a = Expect<
  Equal<
    RenderImport<NamedImport<"./models.js", ["User", "UserId"]>>,
    '/** @import { User, UserId } from "./models.js" */'
  >
>;
type _08b = Expect<
  Equal<
    RenderImport<NamespaceImport<"./models.js", "models">>,
    '/** @import * as models from "./models.js" */'
  >
>;
type _08c = Expect<Equal<RenderImport<NamedImport<"./m.js", ["A"]>>, '/** @import { A } from "./m.js" */'>>;
type _08d = Expect<
  Equal<
    RenderImport<NamedImport<"./a.js", ["A"]> | NamespaceImport<"./b.js", "b">>,
    '/** @import { A } from "./a.js" */' | '/** @import * as b from "./b.js" */'
  >
>;

// ─── What the tag puts in scope ───────────────────────────────────────

// 9. Build the names each form makes available in the file's type space.
export type ImportedNames<Spec extends JSDocImport> = TODO; // TODO(koan)

type _09a = Expect<Equal<ImportedNames<NamedImport<"./m.js", ["User", "UserId"]>>, "User" | "UserId">>;
type _09b = Expect<Equal<ImportedNames<NamespaceImport<"./m.js", "models">>, "models">>;
type _09c = Expect<Equal<ImportedNames<NamedImport<"./m.js", []>>, never>>;
type _09d = Expect<
  Equal<ImportedNames<NamedImport<"./a.js", ["A"]> | NamespaceImport<"./b.js", "b">>, "A" | "b">
>;

// 10. Build the reference you actually write at a use site. The namespace form
//     costs a qualifier; the named form does not.
export type ReferenceOf<Spec extends JSDocImport, Name extends string> = TODO; // TODO(koan)

type _10a = Expect<Equal<ReferenceOf<NamespaceImport<"./m.js", "models">, "User">, "models.User">>;
type _10b = Expect<Equal<ReferenceOf<NamedImport<"./m.js", ["User"]>, "User">, "User">>;
type _10c = Expect<Equal<ReferenceOf<NamespaceImport<"./m.js", "m">, "UserId">, "m.UserId">>;
type _10d = Expect<
  Equal<
    Equal<
      ReferenceOf<NamespaceImport<"./m.js", "m">, "User">,
      ReferenceOf<NamedImport<"./m.js", ["User"]>, "User">
    >,
    false
  >
>;

// ─── What it costs at runtime ─────────────────────────────────────────

// 11. Build the ways a type can be brought in from another module.
export type ImportForm = TODO; // TODO(koan)

type _11a = Expect<
  Equal<ImportForm, "jsdocImportTag" | "importTypeExpression" | "typedefAlias" | "esImport">
>;
type _11b = Expect<Equal<Extract<ImportForm, `jsdoc${string}`>, "jsdocImportTag">>;
type _11c = Expect<Equal<Exclude<ImportForm, "esImport">, "jsdocImportTag" | "importTypeExpression" | "typedefAlias">>;
type _11d = Expect<Equal<Extract<ImportForm, "requireCall">, never>>;

// 12. Build what each one leaves in the emitted file. Only one of them is a
//     runtime operation, which is the entire reason the tag exists.
export type EmitsRuntimeImport<Form extends ImportForm> = TODO; // TODO(koan)

type _12a = Expect<Equal<EmitsRuntimeImport<"jsdocImportTag">, false>>;
type _12b = Expect<Equal<EmitsRuntimeImport<"importTypeExpression">, false>>;
type _12c = Expect<Equal<EmitsRuntimeImport<"typedefAlias">, false>>;
type _12d = Expect<Equal<EmitsRuntimeImport<"esImport">, true>>;
type _12e = Expect<Equal<EmitsRuntimeImport<ImportForm>, boolean>>;

// 13. Build the pre-5.5 spelling the tag replaces: an inline import type, which
//     has to be repeated at every use site.
export type ImportTypeExpression<
  Module extends string,
  Name extends string,
> = TODO; // TODO(koan)

type _13a = Expect<
  Equal<ImportTypeExpression<"./models.js", "User">, 'import("./models.js").User'>
>;
type _13b = Expect<Equal<ImportTypeExpression<"./m.js", "A">, 'import("./m.js").A'>>;
type _13c = Expect<
  Equal<
    {
      itStartsWithTheImportKeyword: GivenExtends<ImportTypeExpression<"./m.js", "A">, `import(${string}`>;
      andItIsNotAComment: GivenExtends<ImportTypeExpression<"./m.js", "A">, `/**${string}*/`>;
    },
    { itStartsWithTheImportKeyword: true; andItIsNotAComment: false }
  >
>;
type _13d = Expect<
  Equal<Equal<ImportTypeExpression<"./m.js", "A">, ReferenceOf<NamedImport<"./m.js", ["A"]>, "A">>, false>
>;

// 14. Build the other pre-5.5 spelling: a local alias declared in a comment.
export type TypedefAlias<
  Name extends string,
  Target extends string,
> = TODO; // TODO(koan)

type _14a = Expect<
  Equal<
    TypedefAlias<"User", 'import("./models.js").User'>,
    '/** @typedef {import("./models.js").User} User */'
  >
>;
type _14b = Expect<Equal<TypedefAlias<"A", "string">, "/** @typedef {string} A */">>;
type _14c = Expect<
  Equal<
    {
      itIsAComment: GivenExtends<TypedefAlias<"A", "string">, `/**${string}*/`>;
      andItNamesTheAlias: TypedefAlias<"A", "string"> extends `${string}} ${infer Name} */`
        ? Name
        : never;
    },
    { itIsAComment: true; andItNamesTheAlias: "A" }
  >
>;
type _14d = Expect<Equal<GivenExtends<TypedefAlias<"A", "string">, `${string}@import${string}`>, false>>;

// ─── Reading it back ──────────────────────────────────────────────────

// 15. Build the scope each form's names live in. The tag is not a module-level
//     export; it is visible in the file that wrote the comment.
export type ScopeOf<Form extends ImportForm> = TODO; // TODO(koan)

type _15a = Expect<Equal<ScopeOf<"jsdocImportTag">, "file">>;
type _15b = Expect<Equal<ScopeOf<"typedefAlias">, "file">>;
type _15c = Expect<Equal<ScopeOf<"esImport">, "module">>;
type _15d = Expect<Equal<ScopeOf<ImportForm>, "file" | "module">>;

// 16. Report the two forms of the same import side by side.
export type FormComparisonProfile = TODO; // TODO(koan)

type _16a = Expect<
  Equal<FormComparisonProfile["namedRendersAs"], '/** @import { User, UserId } from "./models.js" */'>
>;
type _16b = Expect<
  Equal<FormComparisonProfile["namespaceRendersAs"], '/** @import * as models from "./models.js" */'>
>;
type _16c = Expect<Equal<FormComparisonProfile["namedPutsInScope"], "User" | "UserId">>;
type _16d = Expect<Equal<FormComparisonProfile["namespacePutsInScope"], "models">>;
type _16e = Expect<Equal<FormComparisonProfile["andTheUseSitesDiffer"], false>>;

// 17. Report the cost of each spelling: what it emits, where its names live, and
//     whether it has to be repeated.
export type CostProfile = TODO; // TODO(koan)

type _17a = Expect<Equal<CostProfile["theTagEmitsNothing"], false>>;
type _17b = Expect<Equal<CostProfile["soDoesAnInlineImportType"], false>>;
type _17c = Expect<Equal<CostProfile["butARealImportDoes"], true>>;
type _17d = Expect<Equal<CostProfile["andTheTagsNamesAreFileScoped"], "file">>;

// 18. Report one spec at a glance: the comment to write, the names it grants,
//     one use site, and what it costs.
export type JSDocImportReport<Spec extends JSDocImport, Name extends string> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<
    JSDocImportReport<NamedImport<"./models.js", ["User"]>, "User">["comment"],
    '/** @import { User } from "./models.js" */'
  >
>;
type _18b = Expect<
  Equal<JSDocImportReport<NamedImport<"./models.js", ["User"]>, "User">["useSite"], "User">
>;
type _18c = Expect<
  Equal<JSDocImportReport<NamespaceImport<"./models.js", "models">, "User">["useSite"], "models.User">
>;
type _18d = Expect<
  Equal<JSDocImportReport<NamespaceImport<"./models.js", "models">, "User">["grants"], "models">
>;
type _18e = Expect<
  Equal<JSDocImportReport<NamedImport<"./models.js", ["User"]>, "User">["emitted"], false>
>;
