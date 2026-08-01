import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-168: decorator metadata — constructions
 * =============================================================================
 *
 * Every decorator context carries a `metadata` object, and every context on the
 * same class carries the *same* one. That is the whole mechanism: decorators
 * write facts into it as they run, and something later reads them back off the
 * finished class through `Symbol.metadata`.
 *
 * The typing is deliberately loose. `DecoratorMetadata` is an index-signature
 * object whose values are `unknown`, so reading a key gives you nothing until
 * you narrow it — the type system will not remember that a particular decorator
 * wrote a particular shape under a particular key. Any structure worth having
 * has to be imposed on top, which is what most of the constructions below do:
 * name the keys, name what lives under each one, and write the readers that
 * recover it safely. Replace each `TODO` with a type satisfying the assertions
 * directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

// Two metadata keys, and the receiver whose class they describe.
declare const serializableMetadataKey: unique symbol;
declare const routeMetadataKey: unique symbol;
type GivenReceiver = { id: string };

// A decorated class, so the read-back side has something concrete.
declare const decoratedProfile: {
  new (): { id: string; nickname: string; handle(): void };
};

// ─── What a context carries ───────────────────────────────────────────

// 1. Build the shape every metadata-carrying context has in common. Both class
//    and member contexts qualify, which is what makes one reader work for all of
//    them.
export type MetadataBearingContext = TODO; // TODO(koan)

type _01a = Expect<Equal<keyof MetadataBearingContext, "name" | "metadata">>;
type _01b = Expect<Equal<MetadataBearingContext["metadata"], DecoratorMetadata>>;
type _01c = Expect<
  Equal<
    {
      methodContextQualifies: GivenExtends<
        ClassMethodDecoratorContext<GivenReceiver, () => void>,
        MetadataBearingContext
      >;
      aPlainObjectDoesNot: GivenExtends<{ name: string }, MetadataBearingContext>;
    },
    { methodContextQualifies: true; aPlainObjectDoesNot: false }
  >
>;
type _01d = Expect<
  Equal<
    {
      classContextQualifies: GivenExtends<ClassDecoratorContext<new () => GivenReceiver>, MetadataBearingContext>;
      aPlainObjectIsNotAContext: GivenExtends<{ name: string }, MetadataBearingContext>;
    },
    { classContextQualifies: true; aPlainObjectIsNotAContext: false }
  >
>;

// 2. Build the reader that takes the metadata object off a context.
export type MetadataOf<Context extends MetadataBearingContext> = TODO; // TODO(koan)

type _02a = Expect<
  Equal<MetadataOf<ClassMethodDecoratorContext<GivenReceiver, () => void>>, DecoratorMetadata>
>;
type _02b = Expect<Equal<MetadataOf<ClassFieldDecoratorContext<GivenReceiver, string>>, DecoratorMetadata>>;
type _02c = Expect<
  Equal<
    {
      keys: keyof MetadataOf<ClassMethodDecoratorContext<GivenReceiver, () => void>>;
      aPlainObjectIsNotAContext: GivenExtends<{ name: string }, MetadataBearingContext>;
    },
    { keys: PropertyKey; aPlainObjectIsNotAContext: false }
  >
>;
type _02d = Expect<
  Equal<
    {
      everyContextSeesTheSameShape: Equal<
        MetadataOf<ClassMethodDecoratorContext<GivenReceiver, () => void>>,
        MetadataOf<ClassFieldDecoratorContext<GivenReceiver, string>>
      >;
      aPlainObjectIsNotAContext: GivenExtends<{ name: string }, MetadataBearingContext>;
    },
    { everyContextSeesTheSameShape: true; aPlainObjectIsNotAContext: false }
  >
>;

// 3. Build the reader that goes one key deeper — and notice what it answers.
//    The metadata object's values are `unknown`, so nothing about what was
//    written survives in the type.
export type MetadataAt<Context extends MetadataBearingContext, Key extends PropertyKey> = TODO; // TODO(koan)

type _03a = Expect<
  Equal<MetadataAt<ClassMethodDecoratorContext<GivenReceiver, () => void>, typeof routeMetadataKey>, unknown>
>;
type _03b = Expect<Equal<MetadataAt<ClassFieldDecoratorContext<GivenReceiver, string>, "custom">, unknown>>;
type _03c = Expect<
  Equal<
    {
      everyKeyReadsTheSame: Equal<
        MetadataAt<ClassMethodDecoratorContext<GivenReceiver, () => void>, typeof routeMetadataKey>,
        MetadataAt<ClassMethodDecoratorContext<GivenReceiver, () => void>, "anything-else">
      >;
      aPlainObjectIsNotAContext: GivenExtends<{ name: string }, MetadataBearingContext>;
    },
    { everyKeyReadsTheSame: true; aPlainObjectIsNotAContext: false }
  >
>;
type _03d = Expect<Equal<MetadataAt<ClassFieldDecoratorContext<GivenReceiver, string>, 0>, unknown>>;

// ─── Giving the untyped object a shape ────────────────────────────────

// 4. Build the entry a routing decorator would record. This is the structure the
//    metadata object cannot remember on its own.
export type RouteEntry = TODO; // TODO(koan)

type _04a = Expect<Equal<keyof RouteEntry, "name" | "path">>;
type _04b = Expect<Equal<RouteEntry["name"], string | symbol>>;
type _04c = Expect<Equal<RouteEntry["path"], string>>;
type _04d = Expect<
  Equal<
    {
      symbolNamedRouteAccepted: GivenExtends<{ name: symbol; path: "/x" }, RouteEntry>;
      missingPathRefused: GivenExtends<{ name: "handle" }, RouteEntry>;
    },
    { symbolNamedRouteAccepted: true; missingPathRefused: false }
  >
>;

// 5. Build the typed view of the metadata object: a mapping from each key this
//    application uses to what it stores there. Everything below reads through
//    this instead of through `unknown`.
export type TypedMetadata = TODO; // TODO(koan)

type _05a = Expect<Equal<keyof TypedMetadata, typeof serializableMetadataKey | typeof routeMetadataKey>>;
type _05b = Expect<Equal<TypedMetadata[typeof serializableMetadataKey], readonly (string | symbol)[]>>;
type _05c = Expect<Equal<TypedMetadata[typeof routeMetadataKey], readonly RouteEntry[]>>;
type _05d = Expect<
  Equal<
    {
      entry: TypedMetadata[typeof routeMetadataKey][number];
      aPlainObjectIsNotAContext: GivenExtends<{ name: string }, MetadataBearingContext>;
    },
    { entry: RouteEntry; aPlainObjectIsNotAContext: false }
  >
>;
type _05e = Expect<
  Equal<
    {
      typedViewIsSpecific: Equal<TypedMetadata[typeof routeMetadataKey], unknown>;
      rawViewIsNot: MetadataAt<ClassMethodDecoratorContext<GivenReceiver, () => void>, typeof routeMetadataKey>;
    },
    { typedViewIsSpecific: false; rawViewIsNot: unknown }
  >
>;

// 6. Build the safe reader: look a key up in the typed view when it is one this
//    application knows about, and admit ignorance otherwise.
export type ReadMetadata<Key extends PropertyKey> = TODO; // TODO(koan)

type _06a = Expect<Equal<ReadMetadata<typeof routeMetadataKey>, readonly RouteEntry[]>>;
type _06b = Expect<Equal<ReadMetadata<typeof serializableMetadataKey>, readonly (string | symbol)[]>>;
type _06c = Expect<Equal<ReadMetadata<"unknown-key">, unknown>>;
type _06d = Expect<
  Equal<ReadMetadata<typeof routeMetadataKey | typeof serializableMetadataKey>, readonly RouteEntry[] | readonly (string | symbol)[]>
>;

// ─── Where the finished metadata lives ────────────────────────────────

// 7. Report the well-known symbol and the property it names. A class may have no
//     metadata at all, which is why the property is nullable.
export type SymbolMetadataProfile = TODO; // TODO(koan)

type _07a = Expect<Equal<SymbolMetadataProfile["onEveryFunction"], DecoratorMetadata | null>>;
type _07b = Expect<Equal<SymbolMetadataProfile["nullWhenNothingWasWritten"], null>>;
type _07c = Expect<Equal<SymbolMetadataProfile["presentWhenSomethingWas"], DecoratorMetadata>>;
type _07d = Expect<Equal<SymbolMetadataProfile["theSymbolIsUnique"], false>>;
type _07e = Expect<Equal<SymbolMetadataProfile["metadataIsAnObject"], true>>;

// 8. Build the reader that gets metadata off a finished class, admitting that it
//    may not be there.
export type MetadataFromClass<Class> = TODO; // TODO(koan)

type _08a = Expect<Equal<MetadataFromClass<typeof decoratedProfile>, DecoratorMetadata | null>>;
type _08b = Expect<Equal<MetadataFromClass<{ id: string }>, undefined>>;
type _08c = Expect<Equal<NonNullable<MetadataFromClass<typeof decoratedProfile>>, DecoratorMetadata>>;
type _08d = Expect<Equal<MetadataFromClass<string>, undefined>>;

// ─── The decorators that write it ─────────────────────────────────────

// 9. Build the marking decorator's signature. It writes into the metadata and
//    returns nothing, so the declaration is untouched — the fact lives entirely
//    in the metadata object.
export type SerializableDecorator = TODO; // TODO(koan)

type _09a = Expect<Equal<ReturnType<SerializableDecorator>, void>>;
type _09b = Expect<Equal<Parameters<SerializableDecorator>[0], undefined>>;
type _09c = Expect<
  Equal<Parameters<SerializableDecorator>[1] extends { kind: infer Kind } ? Kind : never, "field">
>;
type _09d = Expect<
  Equal<
    {
      contextCarriesMetadata: Parameters<SerializableDecorator>[1] extends { metadata: infer Metadata }
        ? Metadata
        : never;
      rawLookupIsUnknown: MetadataAt<ClassFieldDecoratorContext<GivenReceiver, string>, "custom">;
    },
    { contextCarriesMetadata: DecoratorMetadata; rawLookupIsUnknown: unknown }
  >
>;

// 10. Build the routing factory, which records a structured entry rather than a
//     bare name.
export type RouteFactory = TODO; // TODO(koan)

type _10a = Expect<Equal<Parameters<RouteFactory>, [path: string]>>;
type _10b = Expect<Equal<ReturnType<ReturnType<RouteFactory>>, void>>;
type _10c = Expect<Equal<Parameters<ReturnType<RouteFactory>>["length"], 2>>;
type _10d = Expect<
  Equal<
    Parameters<ReturnType<RouteFactory>>[1] extends { kind: infer Kind } ? Kind : never,
    "method"
  >
>;

// 11. Build the union of contexts a "serializable" marker makes sense on — the
//     members that actually hold a value.
export type SerializableContext = TODO; // TODO(koan)

type _11a = Expect<Equal<SerializableContext["kind"], "field" | "getter" | "accessor">>;
type _11b = Expect<Equal<Extract<SerializableContext["kind"], "method">, never>>;
type _11c = Expect<Equal<SerializableContext["name"], string | symbol>>;
type _11d = Expect<
  Equal<
    {
      fieldQualifies: GivenExtends<ClassFieldDecoratorContext, SerializableContext>;
      setterDoesNot: GivenExtends<ClassSetterDecoratorContext, SerializableContext>;
    },
    { fieldQualifies: true; setterDoesNot: false }
  >
>;

// ─── Reading the facts back ───────────────────────────────────────────

// 12. Build the read-back API. Each entry point takes a class and answers with
//     the structure this application wrote — none of which the raw metadata type
//     could have told it.
export type MetadataApi = TODO; // TODO(koan)

type _12a = Expect<Equal<ReturnType<MetadataApi["serializableNamesOf"]>, readonly (string | symbol)[]>>;
type _12b = Expect<Equal<ReturnType<MetadataApi["routesOf"]>, readonly RouteEntry[]>>;
type _12c = Expect<Equal<ReturnType<MetadataApi["metadataOf"]>, DecoratorMetadata | undefined>>;
type _12d = Expect<Equal<Parameters<MetadataApi["routesOf"]>, [value: Function]>>;
type _12e = Expect<
  Equal<
    {
      recoveredStructure: ReturnType<MetadataApi["routesOf"]>[number];
      rawLookupIsUnknown: MetadataAt<ClassFieldDecoratorContext<GivenReceiver, string>, "custom">;
    },
    { recoveredStructure: RouteEntry; rawLookupIsUnknown: unknown }
  >
>;

// 13. Report the gap the typed view exists to close: what the raw object says
//     versus what the application knows.
export type TypingGapProfile = TODO; // TODO(koan)

type _13a = Expect<Equal<TypingGapProfile["rawValue"], unknown>>;
type _13b = Expect<Equal<TypingGapProfile["typedValue"], readonly RouteEntry[]>>;
type _13c = Expect<Equal<TypingGapProfile["rawKeys"], PropertyKey>>;
type _13d = Expect<Equal<TypingGapProfile["typedKeys"], typeof serializableMetadataKey | typeof routeMetadataKey>>;
type _13e = Expect<Equal<TypingGapProfile["rawIsUsableWithoutNarrowing"], false>>;

// 14. Report the sharing. Every context on one class sees the same metadata
//     object, which is why one decorator can read what another wrote.
export type SharingProfile = TODO; // TODO(koan)

type _14a = Expect<Equal<SharingProfile["fromAMethodContext"], DecoratorMetadata>>;
type _14b = Expect<Equal<SharingProfile["fromAFieldContext"], DecoratorMetadata>>;
type _14c = Expect<Equal<SharingProfile["fromAClassContext"], DecoratorMetadata>>;
type _14d = Expect<Equal<SharingProfile["allTheSameType"], true>>;
type _14e = Expect<Equal<SharingProfile["andTheSameAsOnTheFinishedClass"], true>>;

// ─── Building on the typed view ───────────────────────────────────────

// 15. Build the accumulator that describes what a marking decorator does to the
//     list under a key: it appends, and the entry type comes from the typed view
//     rather than from the write site.
export type AppendMetadata<Key extends keyof TypedMetadata, Entry> = TODO; // TODO(koan)

type _15a = Expect<
  Equal<AppendMetadata<typeof routeMetadataKey, { name: "handle"; path: "/x" }>, readonly RouteEntry[]>
>;
type _15b = Expect<Equal<AppendMetadata<typeof routeMetadataKey, { name: "handle" }>, never>>;
type _15c = Expect<
  Equal<AppendMetadata<typeof serializableMetadataKey, "nickname">, readonly (string | symbol)[]>
>;
type _15d = Expect<Equal<AppendMetadata<typeof serializableMetadataKey, number>, never>>;

// 16. Build the gate that admits a metadata key only when the application has
//     declared what lives under it.
export type KnownMetadataKey<Key extends PropertyKey> = TODO; // TODO(koan)

type _16a = Expect<Equal<KnownMetadataKey<typeof routeMetadataKey>, typeof routeMetadataKey>>;
type _16b = Expect<Equal<KnownMetadataKey<"unknown-key">, never>>;
type _16c = Expect<
  Equal<
    KnownMetadataKey<typeof routeMetadataKey | "unknown-key">,
    typeof routeMetadataKey
  >
>;
type _16d = Expect<Equal<KnownMetadataKey<PropertyKey>, never>>;

// 17. Report the declared surface of the decorated class. Marking a field as
//     serializable recorded a fact somewhere else entirely — the class looks
//     exactly as written.
export type DeclaredSurfaceProfile = TODO; // TODO(koan)

type _17a = Expect<Equal<DeclaredSurfaceProfile["keys"], "id" | "nickname" | "handle">>;
type _17b = Expect<Equal<DeclaredSurfaceProfile["markedField"], string>>;
type _17c = Expect<Equal<DeclaredSurfaceProfile["routedMethodResult"], void>>;
type _17d = Expect<Equal<DeclaredSurfaceProfile["metadataIsNotAMember"], false>>;
type _17e = Expect<Equal<DeclaredSurfaceProfile["metadataLivesOnTheClass"], DecoratorMetadata | null>>;

// 18. Report one metadata key end to end: what the raw object says, what the
//     typed view says, and what a reader can safely hand back.
export type MetadataKeyReport<Key extends PropertyKey> = TODO; // TODO(koan)

type _18a = Expect<Equal<MetadataKeyReport<typeof routeMetadataKey>["raw"], unknown>>;
type _18b = Expect<Equal<MetadataKeyReport<typeof routeMetadataKey>["typed"], readonly RouteEntry[]>>;
type _18c = Expect<Equal<MetadataKeyReport<typeof routeMetadataKey>["known"], true>>;
type _18d = Expect<
  Equal<
    {
      entry: MetadataKeyReport<typeof routeMetadataKey>["entry"];
      aPlainObjectIsNotAContext: GivenExtends<{ name: string }, MetadataBearingContext>;
    },
    { entry: RouteEntry; aPlainObjectIsNotAContext: false }
  >
>;
type _18e = Expect<Equal<MetadataKeyReport<"unknown-key">["known"], false>>;
