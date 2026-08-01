import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-205: erasable syntax only — constructions
 * =============================================================================
 *
 * A type-stripping runtime deletes TypeScript syntax; it does not *compile* it.
 * An annotation can be deleted and the program still runs. An `enum` cannot,
 * because the enum object has to be constructed from somewhere — and the same
 * goes for a namespace with runtime code, a parameter property, and the legacy
 * `import =` / `export =` forms.
 *
 * `erasableSyntaxOnly` (TypeScript 5.8) reports exactly that category. The rule
 * to hold in mind is "after deleting type-only syntax, what remains must be
 * valid JavaScript with the intended behaviour" — which is also why it pairs
 * with `verbatimModuleSyntax`, so import elision cannot quietly change what is
 * left. Build the partition and the rewrites that move a construct across it.
 * Replace each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

// ─── The syntax ───────────────────────────────────────────────────────

// 1. Build the constructs whose syntax vanishes entirely.
export type ErasableSyntax = TODO; // TODO(koan)

type _01a = Expect<
  Equal<
    ErasableSyntax,
    | "type-annotation"
    | "interface"
    | "type-alias"
    | "type-only-import"
    | "type-assertion"
    | "generic-parameter"
  >
>;
type _01b = Expect<Equal<Extract<ErasableSyntax, `type-${string}`>, "type-annotation" | "type-alias" | "type-only-import" | "type-assertion">>;
type _01c = Expect<Equal<Extract<ErasableSyntax, "interface">, "interface">>;
type _01d = Expect<Equal<Extract<ErasableSyntax, "enum">, never>>;

// 2. Build the constructs that need a transform, because deleting them would
//    delete behaviour.
export type TransformedSyntax = TODO; // TODO(koan)

type _02a = Expect<
  Equal<
    TransformedSyntax,
    "enum" | "runtime-namespace" | "parameter-property" | "import-equals" | "export-equals"
  >
>;
type _02b = Expect<Equal<Extract<TransformedSyntax, `${string}-equals`>, "import-equals" | "export-equals">>;
type _02c = Expect<Equal<Extract<TransformedSyntax, ErasableSyntax>, never>>;
type _02d = Expect<Equal<Extract<TransformedSyntax, "decorator">, never>>;

// 3. Build the whole vocabulary, which is the two halves together.
export type SyntaxTransformKind = TODO; // TODO(koan)

type _03a = Expect<Equal<Extract<SyntaxTransformKind, "enum">, "enum">>;
type _03b = Expect<Equal<Extract<SyntaxTransformKind, "interface">, "interface">>;
type _03c = Expect<
  Equal<
    Extract<SyntaxTransformKind, `${string}-property` | `${string}-namespace`>,
    "parameter-property" | "runtime-namespace"
  >
>;
type _03d = Expect<Equal<Extract<SyntaxTransformKind, "jsx">, never>>;

// 4. Build the verdict the option reports.
export type ErasabilityCheck = TODO; // TODO(koan)

type _04a = Expect<Equal<ErasabilityCheck, "erasable" | "requires-transform">>;
type _04b = Expect<Equal<Exclude<ErasabilityCheck, "erasable">, "requires-transform">>;
type _04c = Expect<Equal<Extract<ErasabilityCheck, `requires-${string}`>, "requires-transform">>;
type _04d = Expect<Equal<Extract<ErasabilityCheck, "unsupported">, never>>;

// 5. Build the classifier.
export type ClassifyErasability<Syntax extends SyntaxTransformKind> = TODO; // TODO(koan)

type _05a = Expect<Equal<ClassifyErasability<"type-annotation">, "erasable">>;
type _05b = Expect<Equal<ClassifyErasability<"interface">, "erasable">>;
type _05c = Expect<Equal<ClassifyErasability<"enum">, "requires-transform">>;
type _05d = Expect<Equal<ClassifyErasability<"parameter-property">, "requires-transform">>;
type _05e = Expect<Equal<ClassifyErasability<SyntaxTransformKind>, "erasable" | "requires-transform">>;

// 6. Build the question the option asks of a whole file: is anything in it
//    unerasable?
export type FileIsErasable<Used extends readonly SyntaxTransformKind[]> = TODO; // TODO(koan)

type _06a = Expect<Equal<FileIsErasable<["type-annotation", "interface"]>, true>>;
type _06b = Expect<Equal<FileIsErasable<["type-annotation", "enum"]>, false>>;
type _06c = Expect<Equal<FileIsErasable<[]>, true>>;
type _06d = Expect<Equal<FileIsErasable<["parameter-property"]>, false>>;

// ─── What is left after stripping ─────────────────────────────────────

// 7. Build what survives type-stripping for each construct: the erasable ones
//    leave nothing, the others leave something a stripper cannot produce.
export type LeavesBehind<Syntax extends SyntaxTransformKind> = TODO; // TODO(koan)

type _07a = Expect<Equal<LeavesBehind<"type-annotation">, "nothing">>;
type _07b = Expect<Equal<LeavesBehind<"enum">, "a runtime object">>;
type _07c = Expect<Equal<LeavesBehind<"parameter-property">, "an assignment in the constructor">>;
type _07d = Expect<Equal<LeavesBehind<"import-equals">, "a module-system call">>;
type _07e = Expect<Equal<LeavesBehind<ErasableSyntax>, "nothing">>;

// 8. Build the rewrite that moves each reported construct into erasable syntax.
export type ErasableAlternativeFor<Syntax extends TransformedSyntax> = TODO; // TODO(koan)

type _08a = Expect<Equal<ErasableAlternativeFor<"enum">, "a const object plus a union type">>;
type _08b = Expect<Equal<ErasableAlternativeFor<"runtime-namespace">, "a module">>;
type _08c = Expect<
  Equal<ErasableAlternativeFor<"parameter-property">, "a field and an explicit assignment">
>;
type _08d = Expect<Equal<ErasableAlternativeFor<"import-equals">, "an ECMAScript import or export">>;

// ─── The enum rewrite in types ────────────────────────────────────────

// 9. Build the erasable stand-in for an enum's values.
export type ConstObject<Members extends Record<string, string | number>> = TODO; // TODO(koan)

type _09a = Expect<
  Equal<ConstObject<{ Draft: "draft"; Live: "live" }>, { readonly Draft: "draft"; readonly Live: "live" }>
>;
type _09b = Expect<Equal<keyof ConstObject<{ Draft: "draft" }>, "Draft">>;
type _09c = Expect<Equal<ConstObject<{ Draft: "draft" }>["Draft"], "draft">>;
type _09d = Expect<Equal<ConstObject<{}>, {}>>;

// 10. Build the union type that replaces the enum's *type* side.
export type ValueUnion<
  Members extends Record<string, string | number>,
> = TODO; // TODO(koan)

type _10a = Expect<Equal<ValueUnion<{ Draft: "draft"; Live: "live" }>, "draft" | "live">>;
type _10b = Expect<Equal<ValueUnion<{ Zero: 0; One: 1 }>, 0 | 1>>;
type _10c = Expect<Equal<ValueUnion<{ Draft: "draft" }>, "draft">>;
type _10d = Expect<Equal<ValueUnion<{}>, never>>;

// 11. Build the pair a rewritten enum is: one runtime object, one type. Both are
//     ordinary JavaScript and ordinary type syntax.
export type RewrittenEnum<Members extends Record<string, string | number>> = TODO; // TODO(koan)

type _11a = Expect<
  Equal<RewrittenEnum<{ Draft: "draft"; Live: "live" }>["type"], "draft" | "live">
>;
type _11b = Expect<
  Equal<RewrittenEnum<{ Draft: "draft" }>["values"], { readonly Draft: "draft" }>
>;
type _11c = Expect<Equal<keyof RewrittenEnum<{ Draft: "draft" }>, "values" | "type">>;
type _11d = Expect<
  Equal<RewrittenEnum<{ Draft: "draft"; Live: "live" }>["values"]["Live"], "live">
>;

// 12. Build the parameter-property rewrite as a type: the field is declared, and
//     the constructor is an ordinary one.
export type RewrittenParameterProperty<Fields extends object> = TODO; // TODO(koan)

type _12a = Expect<Equal<RewrittenParameterProperty<{ id: number }>["fields"], { id: number }>>;
type _12b = Expect<
  Equal<RewrittenParameterProperty<{ id: number }>["constructorParameters"], [{ id: number }]>
>;
type _12c = Expect<Equal<keyof RewrittenParameterProperty<{}>, "fields" | "constructorParameters">>;
type _12d = Expect<
  Equal<RewrittenParameterProperty<{ id: number }>["constructorParameters"]["length"], 1>
>;

// ─── The option it pairs with ─────────────────────────────────────────

// 13. Build what import elision could do to a statement, which is the reason the
//     two options belong together.
export type AfterElision<
  Elision extends "on" | "off",
  Usage extends "type-only" | "value",
> = TODO; // TODO(koan)

type _13a = Expect<Equal<AfterElision<"on", "type-only">, "removed">>;
type _13b = Expect<Equal<AfterElision<"on", "value">, "kept">>;
type _13c = Expect<Equal<AfterElision<"off", "type-only">, "kept">>;
type _13d = Expect<Equal<AfterElision<"off", "value">, "kept">>;

// 14. Build what an explicit type-only marker guarantees instead: the statement
//     goes because you said so, not because the compiler worked it out.
export type WithVerbatimModuleSyntax<Marked extends "type" | "value"> = TODO; // TODO(koan)

type _14a = Expect<Equal<WithVerbatimModuleSyntax<"type">, "removed">>;
type _14b = Expect<Equal<WithVerbatimModuleSyntax<"value">, "kept">>;
type _14c = Expect<Equal<WithVerbatimModuleSyntax<"type" | "value">, "removed" | "kept">>;
type _14d = Expect<
  Equal<
    {
      theExplicitMarkerAgreesWithElision: Equal<
        WithVerbatimModuleSyntax<"type">,
        AfterElision<"on", "type-only">
      >;
      butItSaysSoInTheSource: WithVerbatimModuleSyntax<"type">;
    },
    { theExplicitMarkerAgreesWithElision: true; butItSaysSoInTheSource: "removed" }
  >
>;

// 15. Build the claim a clean `erasableSyntaxOnly` build supports, and the ones
//     it does not.
export type Claim = TODO; // TODO(koan)

type _15a = Expect<
  Equal<Claim, "typeStrippingLeavesValidJavaScript" | "theProgramTypechecks" | "everyRuntimeCanRunTheOutput">
>;
type _15b = Expect<Equal<Extract<Claim, `type${string}`>, "typeStrippingLeavesValidJavaScript">>;
type _15c = Expect<
  Equal<Exclude<Claim, "typeStrippingLeavesValidJavaScript">, "theProgramTypechecks" | "everyRuntimeCanRunTheOutput">
>;
type _15d = Expect<Equal<Extract<Claim, "theOutputIsFast">, never>>;

// ─── Reading it back ──────────────────────────────────────────────────

// 16. Report the partition itself: six constructs that vanish, five that do not.
export type PartitionProfile = TODO; // TODO(koan)

type _16a = Expect<Equal<PartitionProfile["anAnnotation"], "erasable">>;
type _16b = Expect<Equal<PartitionProfile["anInterface"], "erasable">>;
type _16c = Expect<Equal<PartitionProfile["anEnum"], "requires-transform">>;
type _16d = Expect<Equal<PartitionProfile["aNamespaceWithCode"], "requires-transform">>;
type _16e = Expect<Equal<PartitionProfile["aParameterProperty"], "requires-transform">>;

// 17. Report the enum rewrite end to end: what was reported, what to write
//     instead, and what the replacement is made of.
export type EnumRewriteProfile = TODO; // TODO(koan)

type _17a = Expect<Equal<EnumRewriteProfile["whyItWasReported"], "a runtime object">>;
type _17b = Expect<Equal<EnumRewriteProfile["whatToWriteInstead"], "a const object plus a union type">>;
type _17c = Expect<
  Equal<EnumRewriteProfile["theValues"], { readonly Draft: "draft"; readonly Live: "live" }>
>;
type _17d = Expect<Equal<EnumRewriteProfile["theType"], "draft" | "live">>;
type _17e = Expect<Equal<EnumRewriteProfile["andBothHalvesAreNowErasable"], "erasable">>;

// 18. Report one construct at a glance: whether it survives stripping, what it
//     would leave behind, and what to write if it is reported.
export type ErasabilityReport<Syntax extends SyntaxTransformKind> = TODO; // TODO(koan)

type _18a = Expect<Equal<ErasabilityReport<"enum">["verdict"], "requires-transform">>;
type _18b = Expect<Equal<ErasabilityReport<"enum">["reported"], true>>;
type _18c = Expect<Equal<ErasabilityReport<"enum">["alternative"], "a const object plus a union type">>;
type _18d = Expect<Equal<ErasabilityReport<"interface">["reported"], false>>;
type _18e = Expect<Equal<ErasabilityReport<"interface">["alternative"], "nothing to change">>;
