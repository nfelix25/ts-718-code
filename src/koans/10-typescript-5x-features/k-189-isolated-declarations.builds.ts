import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-189: isolated declarations — constructions
 * =============================================================================
 *
 * Declaration emit normally has the whole program to work with: it can follow an
 * import, infer a return type across files, and write the answer into a `.d.ts`.
 * `--isolatedDeclarations` refuses that reach. It reports every exported
 * construct whose declaration cannot be produced from this file's syntax alone,
 * which in practice means annotating public functions and complex exported
 * values — locals and private members are never anyone else's problem.
 *
 * The option is a diagnostic, not a transform: it requires `declaration` or
 * `composite`, changes no emitted output, and parallelises nothing by itself.
 * What it buys is the guarantee that a *different* tool could emit the `.d.ts`.
 * Build the audit vocabulary, the rule that decides which exports are reported,
 * and the annotated API surface that satisfies it.
 * Replace each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

// ─── The audit vocabulary ─────────────────────────────────────────────

// 1. Build the kinds of thing a module can export.
export type ExportKind = TODO; // TODO(koan)

type _01a = Expect<Equal<ExportKind, "function" | "variable" | "class" | "method">>;
type _01b = Expect<Equal<Exclude<ExportKind, "class">, "function" | "variable" | "method">>;
type _01c = Expect<Equal<Extract<ExportKind, "method">, "method">>;
type _01d = Expect<Equal<Extract<ExportKind, "namespace">, never>>;

// 2. Build the three states an export's type can be in. "Trivial" is the one
//    that matters: a literal initializer is recognizable from syntax alone.
export type AnnotationState = TODO; // TODO(koan)

type _02a = Expect<Equal<AnnotationState, "explicit" | "trivial" | "missing">>;
type _02b = Expect<Equal<Exclude<AnnotationState, "missing">, "explicit" | "trivial">>;
type _02c = Expect<Equal<Extract<AnnotationState, "missing">, "missing">>;
type _02d = Expect<Equal<Extract<AnnotationState, "inferred">, never>>;

// 3. Build one row of the audit.
export type DeclarationAudit = TODO; // TODO(koan)

type _03a = Expect<Equal<DeclarationAudit["kind"], "function" | "variable" | "class" | "method">>;
type _03b = Expect<Equal<DeclarationAudit["annotation"], "explicit" | "trivial" | "missing">>;
type _03c = Expect<Equal<keyof DeclarationAudit, "name" | "kind" | "annotation">>;
type _03d = Expect<Equal<Required<Partial<DeclarationAudit>>["name"], string>>;

// 4. Build the rule. Only value-shaped exports whose type is neither written nor
//    trivially recognizable get reported; a `class` declaration already says
//    everything a declaration file needs.
export type RequiresAnnotation<
  Kind extends ExportKind,
  State extends AnnotationState,
> = TODO; // TODO(koan)

type _04a = Expect<Equal<RequiresAnnotation<"function", "missing">, true>>;
type _04b = Expect<Equal<RequiresAnnotation<"function", "explicit">, false>>;
type _04c = Expect<Equal<RequiresAnnotation<"class", "missing">, false>>;
type _04d = Expect<Equal<RequiresAnnotation<"variable", "trivial">, false>>;
type _04e = Expect<Equal<RequiresAnnotation<never, "missing">, never>>;

// ─── The API that satisfies it ────────────────────────────────────────

// 5. Build the exported shape the rest of the surface is written in terms of.
export type User = TODO; // TODO(koan)

type _05a = Expect<Equal<keyof User, "id" | "name">>;
type _05b = Expect<Equal<User["id"], number>>;
type _05c = Expect<Equal<User["name"], string>>;
type _05d = Expect<Equal<Pick<User, "name">, { name: string }>>;

// 6. Build the annotated factory. Both parameters and the return type are
//    written down, so a declaration emitter needs nothing else.
export type CreateUser = TODO; // TODO(koan)

type _06a = Expect<Equal<Parameters<CreateUser>, [number, string]>>;
type _06b = Expect<Equal<ReturnType<CreateUser>, { id: number; name: string }>>;
type _06c = Expect<Equal<Parameters<CreateUser>["length"], 2>>;
type _06d = Expect<Equal<ReturnType<CreateUser>["name"], string>>;

// 7. Build the annotated exported constant — the arrow gets its type from the
//    annotation on the variable, not the other way round.
export type FormatUser = TODO; // TODO(koan)

type _07a = Expect<Equal<Parameters<FormatUser>[0], { id: number; name: string }>>;
type _07b = Expect<Equal<ReturnType<FormatUser>, string>>;
type _07c = Expect<Equal<Parameters<FormatUser>["length"], 1>>;
type _07d = Expect<
  Equal<
    {
      theAnnotatedFormIsAPlainFunction: GivenExtends<FormatUser, (user: User) => string>;
      butOneThatReturnsNothingIsNot: GivenExtends<(user: User) => void, FormatUser>;
    },
    { theAnnotatedFormIsAPlainFunction: true; butOneThatReturnsNothingIsNot: false }
  >
>;

// 8. Build the declaration-visible instance type of the exported class: public
//    members with written types, and nothing about the implementation.
export type UserStoreInstance = TODO; // TODO(koan)

type _08a = Expect<Equal<UserStoreInstance["users"], User[]>>;
type _08b = Expect<Equal<Parameters<UserStoreInstance["add"]>, [User]>>;
type _08c = Expect<Equal<ReturnType<UserStoreInstance["add"]>, void>>;
type _08d = Expect<Equal<UserStoreInstance["size"], number>>;
type _08e = Expect<Equal<keyof UserStoreInstance, "users" | "add" | "size">>;

// ─── Deciding what gets reported ──────────────────────────────────────

// 9. Build the classifier for an exported initializer: a literal is trivial, a
//    call or an object is not.
export type AnnotationFor<Initializer> = TODO; // TODO(koan)

type _09a = Expect<Equal<AnnotationFor<1>, "trivial">>;
type _09b = Expect<Equal<AnnotationFor<"koans">, "trivial">>;
type _09c = Expect<Equal<AnnotationFor<true>, "trivial">>;
type _09d = Expect<Equal<AnnotationFor<{ id: number }>, "missing">>;
type _09e = Expect<Equal<AnnotationFor<() => void>, "missing">>;

// 10. Build one audit row with its name kept as a literal, so a report can name
//     the export it is complaining about.
export type AuditOf<
  Name extends string,
  Kind extends ExportKind,
  State extends AnnotationState,
> = TODO; // TODO(koan)

type _10a = Expect<Equal<AuditOf<"createUser", "function", "explicit">["name"], "createUser">>;
type _10b = Expect<Equal<AuditOf<"createUser", "function", "explicit">["kind"], "function">>;
type _10c = Expect<Equal<AuditOf<"protocolVersion", "variable", "trivial">["annotation"], "trivial">>;
type _10d = Expect<
  Equal<keyof AuditOf<"createUser", "function", "explicit">, "name" | "kind" | "annotation">
>;

// 11. Build the report: the names of every export the option would complain
//     about, and nothing else.
export type Reported<Audits extends readonly DeclarationAudit[]> = TODO; // TODO(koan)

type _11a = Expect<
  Equal<
    Reported<[AuditOf<"createUser", "function", "explicit">, AuditOf<"parse", "function", "missing">]>,
    "parse"
  >
>;
type _11b = Expect<Equal<Reported<[AuditOf<"protocolVersion", "variable", "trivial">]>, never>>;
type _11c = Expect<Equal<Reported<[]>, never>>;
type _11d = Expect<
  Equal<
    Reported<[AuditOf<"parse", "function", "missing">, AuditOf<"format", "variable", "missing">]>,
    "parse" | "format"
  >
>;

// 12. Build the yes-or-no question a build wants answered.
export type IsReady<Audits extends readonly DeclarationAudit[]> = TODO; // TODO(koan)

type _12a = Expect<Equal<IsReady<[AuditOf<"createUser", "function", "explicit">]>, true>>;
type _12b = Expect<Equal<IsReady<[AuditOf<"parse", "function", "missing">]>, false>>;
type _12c = Expect<Equal<IsReady<[]>, true>>;
type _12d = Expect<
  Equal<IsReady<[AuditOf<"UserStore", "class", "missing">, AuditOf<"n", "variable", "trivial">]>, true>
>;

// ─── The precondition ─────────────────────────────────────────────────

// 13. Build the emit settings the option can sit alongside.
export type EmitOption = TODO; // TODO(koan)

type _13a = Expect<Equal<EmitOption, "declaration" | "composite" | "none">>;
type _13b = Expect<Equal<Exclude<EmitOption, "none">, "declaration" | "composite">>;
type _13c = Expect<Equal<Extract<EmitOption, "composite">, "composite">>;
type _13d = Expect<Equal<Extract<EmitOption, "emitDeclarationOnly">, never>>;

// 14. Build the precondition: without a declaration-producing setting there is
//     nothing for the option to check.
export type OptionAvailable<Emit extends EmitOption> = TODO; // TODO(koan)

type _14a = Expect<Equal<OptionAvailable<"declaration">, true>>;
type _14b = Expect<Equal<OptionAvailable<"composite">, true>>;
type _14c = Expect<Equal<OptionAvailable<"none">, false>>;
type _14d = Expect<Equal<OptionAvailable<EmitOption>, boolean>>;

// ─── Reading the surface back ─────────────────────────────────────────

// 15. Report the class surface a declaration file would carry.
export type StoreProfile = TODO; // TODO(koan)

type _15a = Expect<Equal<StoreProfile["publicMembers"], "users" | "add" | "size">>;
type _15b = Expect<Equal<StoreProfile["theListItHolds"], { id: number; name: string }[]>>;
type _15c = Expect<Equal<StoreProfile["whatAddTakes"], { id: number; name: string }>>;
type _15d = Expect<Equal<StoreProfile["whatAddReturns"], void>>;
type _15e = Expect<Equal<StoreProfile["theGetterReadsAsAProperty"], number>>;

// 16. Report the transformations a declaration file may still spell out. Every
//     one of them is computable from this file alone, which is the whole point.
export type UserViews = TODO; // TODO(koan)

type _16a = Expect<Equal<UserViews["readonlyView"], { readonly id: number; readonly name: string }>>;
type _16b = Expect<Equal<UserViews["partialView"], { id?: number; name?: string }>>;
type _16c = Expect<Equal<UserViews["justTheName"], { name: string }>>;
type _16d = Expect<Equal<UserViews["withoutTheName"], { id: number }>>;

// 17. Report the rule across the whole matrix, including the two rows that
//     surprise people: a trivial literal is fine, and a class never reports.
export type MatrixProfile = TODO; // TODO(koan)

type _17a = Expect<Equal<MatrixProfile["anUnannotatedFunction"], true>>;
type _17b = Expect<Equal<MatrixProfile["anUnannotatedMethod"], true>>;
type _17c = Expect<Equal<MatrixProfile["aTrivialVariable"], false>>;
type _17d = Expect<Equal<MatrixProfile["aClassDeclaration"], false>>;
type _17e = Expect<Equal<MatrixProfile["everyKindAtOnce"], boolean>>;

// 18. Report one module at a glance: whether the option is even available, what
//     it would report, and whether the module is ready for it.
export type IsolatedDeclarationsReport<
  Audits extends readonly DeclarationAudit[],
  Emit extends EmitOption,
> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<IsolatedDeclarationsReport<[AuditOf<"parse", "function", "missing">], "declaration">["reported"], "parse">
>;
type _18b = Expect<
  Equal<IsolatedDeclarationsReport<[AuditOf<"parse", "function", "missing">], "declaration">["ready"], false>
>;
type _18c = Expect<
  Equal<IsolatedDeclarationsReport<[AuditOf<"createUser", "function", "explicit">], "composite">["ready"], true>
>;
type _18d = Expect<
  Equal<IsolatedDeclarationsReport<[AuditOf<"createUser", "function", "explicit">], "none">["available"], false>
>;
type _18e = Expect<
  Equal<IsolatedDeclarationsReport<[AuditOf<"createUser", "function", "explicit">], "none">["checkedAtAll"], false>
>;
