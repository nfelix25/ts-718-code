import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-179: import attributes — constructions
 * =============================================================================
 *
 * An import attribute is a hint to the *host*, not to the type system. `with {
 * type: "json" }` tells the runtime how to interpret what it fetched; TypeScript
 * carries the syntax and checks a very loose shape, and that is deliberately all
 * it does. The declared type is an index signature from string keys to string
 * values, so no particular attribute is known and no value is validated.
 *
 * That looseness is the lesson. `{ type: "css" }` and `{ integrity: "..." }` are
 * equally acceptable to the checker even though only one of them may mean
 * anything to a given host, and `{ mode: 3 }` is rejected for the one reason the
 * type *can* see — the value is not a string. On the dynamic side the attributes
 * are nested one level deeper, under `with`, and the import still resolves to
 * `unknown`. Replace each `TODO` with a type satisfying the assertions directly
 * below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

// ─── What an attribute bag is ─────────────────────────────────────────

// 1. Build the JSON attribute bag — the one attribute nearly every host agrees
//    about.
export type JsonImportAttributes = TODO; // TODO(koan)

type _01a = Expect<Equal<JsonImportAttributes["type"], "json">>;
type _01b = Expect<Equal<keyof JsonImportAttributes, "type">>;
type _01c = Expect<
  Equal<
    {
      jsonBagIsAcceptable: GivenExtends<JsonImportAttributes, ImportAttributes>;
      aNumericValueIsRefused: IsAttributeBag<{ mode: number }>;
    },
    { jsonBagIsAcceptable: true; aNumericValueIsRefused: false }
  >
>;
type _01d = Expect<Equal<Readonly<JsonImportAttributes>, JsonImportAttributes>>;
type _01e = Expect<
  Equal<
    {
      literalValueIsKept: JsonImportAttributes["type"];
      butTheDeclaredValueTypeIsWider: ImportAttributes[string];
    },
    { literalValueIsKept: "json"; butTheDeclaredValueTypeIsWider: string }
  >
>;

// 2. Build the predicate that says whether a bag is acceptable to the checker.
//    Note how little it asks: string keys, string values, and nothing about
//    which attributes exist.
export type IsAttributeBag<Value> = TODO; // TODO(koan)

type _02a = Expect<Equal<IsAttributeBag<{ type: "json" }>, true>>;
type _02b = Expect<Equal<IsAttributeBag<{ type: "css" }>, true>>;
type _02c = Expect<Equal<IsAttributeBag<{ integrity: "sha256-value" }>, true>>;
type _02d = Expect<Equal<IsAttributeBag<{ mode: number }>, false>>;
type _02e = Expect<Equal<IsAttributeBag<{ nested: { deep: string } }>, false>>;

// 3. Build the value type every attribute has to have — the single thing the
//    checker actually enforces.
export type AttributeValue = TODO; // TODO(koan)

type _03a = Expect<Equal<AttributeValue, string>>;
type _03b = Expect<
  Equal<
    {
      aLiteralFits: GivenExtends<"json", AttributeValue>;
      aNumericValueIsRefused: IsAttributeBag<{ mode: number }>;
    },
    { aLiteralFits: true; aNumericValueIsRefused: false }
  >
>;
type _03c = Expect<Equal<GivenExtends<undefined, AttributeValue>, false>>;
type _03d = Expect<Equal<GivenExtends<number, AttributeValue>, false>>;

// 4. Build the reader that looks an attribute up by name. Since no attribute is
//    declared, the honest result admits that it might not be there.
export type ReadAttribute = TODO; // TODO(koan)

type _04a = Expect<Equal<ReturnType<ReadAttribute>, string | undefined>>;
type _04b = Expect<Equal<Parameters<ReadAttribute>, [attributes: ImportAttributes, name: string]>>;
type _04c = Expect<Equal<NonNullable<ReturnType<ReadAttribute>>, string>>;
type _04d = Expect<
  Equal<
    {
      lookupAdmitsAbsence: ReturnType<ReadAttribute>;
      whileTheIndexSignatureDoesNot: ImportAttributes[string];
    },
    { lookupAdmitsAbsence: string | undefined; whileTheIndexSignatureDoesNot: string }
  >
>;

// ─── The dynamic form ─────────────────────────────────────────────────

// 5. Build the options object a dynamic import takes. The attributes live one
//    level down, under a key that is itself optional.
export type ImportOptions = TODO; // TODO(koan)

type _05a = Expect<Equal<ImportOptions["with"], ImportAttributes | undefined>>;
type _05b = Expect<Equal<keyof ImportOptions, "with">>;
type _05c = Expect<
  Equal<
    {
      optionsFitTheLibraryShape: GivenExtends<ImportOptions, ImportCallOptions>;
      aNumericValueIsRefused: IsAttributeBag<{ mode: number }>;
    },
    { optionsFitTheLibraryShape: true; aNumericValueIsRefused: false }
  >
>;
type _05d = Expect<
  Equal<
    {
      theKeyIsOptional: GivenExtends<Record<never, never>, ImportOptions>;
      aNumericValueIsRefused: IsAttributeBag<{ mode: number }>;
    },
    { theKeyIsOptional: true; aNumericValueIsRefused: false }
  >
>;

// 6. Build the helper that wraps a bag into those options.
export type MakeImportOptions = TODO; // TODO(koan)

type _06a = Expect<Equal<Parameters<MakeImportOptions>[0], ImportAttributes>>;
type _06b = Expect<Equal<ReturnType<MakeImportOptions>, ImportCallOptions>>;
type _06c = Expect<Equal<ReturnType<MakeImportOptions>["with"], ImportAttributes | undefined>>;
type _06d = Expect<Equal<Parameters<MakeImportOptions>["length"], 1>>;

// 7. Build the dynamic import helper. Whatever the attributes say, the module
//    arrives as `unknown` — attributes are a host instruction, not a type
//    annotation.
export type ImportWithAttributes = TODO; // TODO(koan)

type _07a = Expect<Equal<ReturnType<ImportWithAttributes>, Promise<unknown>>>;
type _07b = Expect<Equal<Awaited<ReturnType<ImportWithAttributes>>, unknown>>;
type _07c = Expect<Equal<Parameters<ImportWithAttributes>[0], string>>;
type _07d = Expect<Equal<Parameters<ImportWithAttributes>[1], ImportAttributes>>;
type _07e = Expect<
  Equal<
    {
      resultIsUnknown: Awaited<ReturnType<ImportWithAttributes>>;
      attributesDidNotNarrowIt: GivenExtends<Awaited<ReturnType<ImportWithAttributes>>, { default: unknown }>;
    },
    { resultIsUnknown: unknown; attributesDidNotNarrowIt: false }
  >
>;

// 8. Build the merge helper, which is an ordinary object spread — nothing about
//    attributes makes combining them special.
export type MergeImportAttributes = TODO; // TODO(koan)

type _08a = Expect<Equal<Parameters<MergeImportAttributes>[0], ImportAttributes>>;
type _08b = Expect<Equal<ReturnType<MergeImportAttributes>, ImportAttributes>>;
type _08c = Expect<Equal<Parameters<MergeImportAttributes>["length"], 2>>;
type _08d = Expect<Equal<ReturnType<MergeImportAttributes>[string], string>>;

// ─── What the checker will and will not say ───────────────────────────

// 9. Report the acceptance boundary. Every string-valued bag passes, whatever
//    the attribute is called; only a non-string value is refused.
export type AcceptanceProfile = TODO; // TODO(koan)

type _09a = Expect<Equal<AcceptanceProfile["knownAttribute"], true>>;
type _09b = Expect<Equal<AcceptanceProfile["hostSpecificAttribute"], true>>;
type _09c = Expect<Equal<AcceptanceProfile["inventedAttribute"], true>>;
type _09d = Expect<Equal<AcceptanceProfile["numericValue"], false>>;
type _09e = Expect<Equal<AcceptanceProfile["emptyBag"], true>>;

// 10. Report what an attribute value may be. The index signature says `string`,
//     so a literal is fine and everything else is not — including the absence
//     the reader in construction 4 had to admit.
export type ValueProfile = TODO; // TODO(koan)

type _10a = Expect<Equal<ValueProfile["declared"], string>>;
type _10b = Expect<Equal<ValueProfile["aLiteralFits"], true>>;
type _10c = Expect<Equal<ValueProfile["aNumberDoesNot"], false>>;
type _10d = Expect<Equal<ValueProfile["undefinedDoesNot"], false>>;
type _10e = Expect<Equal<ValueProfile["soLookupHasToWiden"], false>>;

// 11. Report the layering. A static import states the bag directly; a dynamic
//     one nests it under `with`, and the two are one indirection apart.
export type LayeringProfile = TODO; // TODO(koan)

type _11a = Expect<Equal<LayeringProfile["nestedBag"], ImportAttributes | undefined>>;
type _11b = Expect<Equal<LayeringProfile["unwrappedNestedBag"], ImportAttributes>>;
type _11c = Expect<Equal<LayeringProfile["theyAgreeOnceUnwrapped"], true>>;
type _11d = Expect<Equal<LayeringProfile["staticShape"][string], string>>;
type _11e = Expect<
  Equal<
    {
      dynamicShapeFitsTheLibrary: GivenExtends<LayeringProfile["dynamicShape"], ImportCallOptions>;
      aNumericValueIsRefused: IsAttributeBag<{ mode: number }>;
    },
    { dynamicShapeFitsTheLibrary: true; aNumericValueIsRefused: false }
  >
>;

// ─── Giving the bag a shape the checker can use ───────────────────────

// 12. Build the typed bag an application would declare for itself — the only way
//     to get a specific attribute checked, since the library type declares none.
export type KnownAttributes = TODO; // TODO(koan)

type _12a = Expect<Equal<KnownAttributes["type"], "json" | "css" | "text">>;
type _12b = Expect<Equal<KnownAttributes["integrity"], string | undefined>>;
type _12c = Expect<Equal<keyof KnownAttributes, "type" | "integrity">>;
type _12d = Expect<
  Equal<
    {
      knownBagIsAnAttributeBag: GivenExtends<KnownAttributes, ImportAttributes>;
      aNumericValueIsRefused: IsAttributeBag<{ mode: number }>;
    },
    { knownBagIsAnAttributeBag: true; aNumericValueIsRefused: false }
  >
>;
type _12e = Expect<
  Equal<
    {
      knownBagIsStillAnAttributeBag: IsAttributeBag<KnownAttributes>;
      butItRefusesAnUnknownType: GivenExtends<{ type: "wasm" }, KnownAttributes>;
    },
    { knownBagIsStillAnAttributeBag: true; butItRefusesAnUnknownType: false }
  >
>;

// 13. Build the reader for that typed bag, which — unlike the untyped one — can
//     say exactly what a given attribute holds.
export type ReadKnownAttribute<Name extends keyof KnownAttributes> = TODO; // TODO(koan)

type _13a = Expect<Equal<ReadKnownAttribute<"type">, "json" | "css" | "text">>;
type _13b = Expect<Equal<ReadKnownAttribute<"integrity">, string | undefined>>;
type _13c = Expect<
  Equal<ReadKnownAttribute<"type" | "integrity">, "json" | "css" | "text" | string | undefined>
>;
type _13d = Expect<
  Equal<
    {
      typedLookupIsSpecific: ReadKnownAttribute<"type">;
      untypedLookupIsNot: ImportAttributes[string];
    },
    { typedLookupIsSpecific: "json" | "css" | "text"; untypedLookupIsNot: string }
  >
>;

// 14. Build the gate that admits a bag only when it satisfies the application's
//     own declaration rather than the library's index signature.
export type ValidatedAttributes<Value> = TODO; // TODO(koan)

type _14a = Expect<Equal<ValidatedAttributes<{ type: "json" }>, { type: "json" }>>;
type _14b = Expect<Equal<ValidatedAttributes<{ type: "wasm" }>, never>>;
type _14c = Expect<
  Equal<ValidatedAttributes<{ type: "css"; integrity: "sha256-x" }>, { type: "css"; integrity: "sha256-x" }>
>;
type _14d = Expect<Equal<ValidatedAttributes<{ mode: number }>, never>>;

// 15. Report the gap between the two gates. The library's check is a shape
//     check; the application's is a vocabulary check, and only the second one
//     catches an attribute the host will not understand.
export type GateComparisonProfile = TODO; // TODO(koan)

type _15a = Expect<Equal<GateComparisonProfile["libraryAcceptsUnknownVocabulary"], true>>;
type _15b = Expect<Equal<GateComparisonProfile["applicationRefusesIt"], true>>;
type _15c = Expect<Equal<GateComparisonProfile["bothAcceptTheKnownOne"], true>>;
type _15d = Expect<Equal<GateComparisonProfile["bothRefuseANumericValue"], true>>;
type _15e = Expect<Equal<GateComparisonProfile["libraryCheckIsWeaker"], true>>;

// 16. Build the typed dynamic import an application would write on top of its
//     own vocabulary — the shape that recovers both a checked bag and a known
//     module type.
export type TypedImport<Module> = TODO; // TODO(koan)

type _16a = Expect<Equal<Awaited<ReturnType<TypedImport<{ default: string }>>>, { default: string }>>;
type _16b = Expect<Equal<Parameters<TypedImport<unknown>>[1], KnownAttributes>>;
type _16c = Expect<Equal<ReturnType<TypedImport<number>>, Promise<number>>>;
type _16d = Expect<
  Equal<
    {
      typedImportKnowsItsModule: Awaited<ReturnType<TypedImport<{ default: string }>>>;
      untypedOneDoesNot: Awaited<ReturnType<ImportWithAttributes>>;
    },
    { typedImportKnowsItsModule: { default: string }; untypedOneDoesNot: unknown }
  >
>;

// 17. Build the filter that finds the attribute-shaped members of a record —
//     what an options object could legally carry into an import.
export type AttributeBagKeys<Owner> = TODO; // TODO(koan)

type _17a = Expect<Equal<AttributeBagKeys<{ a: { type: "json" }; b: string }>, "a">>;
type _17b = Expect<Equal<AttributeBagKeys<{ a: { mode: number } }>, never>>;
type _17c = Expect<Equal<AttributeBagKeys<{ a: { type: "json" }; b: { integrity: "x" } }>, "a" | "b">>;
type _17d = Expect<Equal<AttributeBagKeys<Record<never, never>>, never>>;

// 18. Report one bag at a glance: whether the checker accepts it, whether the
//     application's vocabulary does, and what an import using it would produce.
export type AttributeReport<Value> = TODO; // TODO(koan)

type _18a = Expect<Equal<AttributeReport<{ type: "json" }>["acceptedByTheChecker"], true>>;
type _18b = Expect<Equal<AttributeReport<{ type: "json" }>["acceptedByTheVocabulary"], true>>;
type _18c = Expect<Equal<AttributeReport<{ type: "wasm" }>["acceptedByTheVocabulary"], false>>;
type _18d = Expect<Equal<AttributeReport<{ type: "wasm" }>["acceptedByTheChecker"], true>>;
type _18e = Expect<Equal<AttributeReport<{ mode: number }>["acceptedByTheChecker"], false>>;
