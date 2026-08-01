import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-141: unique symbol identity — constructions
 * =============================================================================
 *
 * `symbol` is a kind; a `unique symbol` is a name. Each declaration mints one
 * singleton type that only `typeof THAT_DECLARATION` can spell, which is why a
 * symbol-keyed record can hold values of completely different shapes and still
 * be indexed precisely. The identity is nominal in the only place TypeScript is
 * ever nominal: there is nothing structural to compare, so two singletons over
 * identical descriptions never overlap and their intersection is empty.
 *
 * The failure mode is widening. A singleton flows into `symbol`, never back, and
 * the moment `symbol` joins a union it absorbs every singleton in it — the
 * union is just `symbol` again and the identity is gone. A `symbol` index
 * signature has the same effect from the other direction: it accepts every
 * singleton key and answers every lookup with one value type. Replace each
 * `TODO` with a type satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

// Two singletons and one broad symbol, exactly as the packet declares them.
declare const USER: unique symbol;
declare const ORDER: unique symbol;
declare const BROAD: symbol;

// The heterogeneous payloads the registry has to keep apart.
type GivenUserValue = { id: string; name: string };
type GivenOrderValue = { id: number; total: number };

// ─── Naming the identity ──────────────────────────────────────────────

// 1. Build the classifier that separates a singleton from the broad kind. The
//    test is the same one that separates any literal from its base: the base
//    flows into the type only when the type *is* the base.
export type IsUniqueSymbol<Value> = TODO; // TODO(koan)

type _01a = Expect<Equal<IsUniqueSymbol<typeof USER>, true>>;
type _01b = Expect<Equal<IsUniqueSymbol<typeof BROAD>, false>>;
type _01c = Expect<Equal<IsUniqueSymbol<string>, false>>;
type _01d = Expect<Equal<IsUniqueSymbol<unknown>, false>>;
type _01e = Expect<Equal<IsUniqueSymbol<never>, never>>;

// 2. Build the registry: two singleton-keyed properties whose values share no
//    shape at all, plus one ordinary string key.
export type Registry = TODO; // TODO(koan)

type _02a = Expect<Equal<keyof Registry, typeof USER | typeof ORDER | "version">>;
type _02b = Expect<Equal<Registry[typeof USER], GivenUserValue>>;
type _02c = Expect<Equal<Registry[typeof ORDER], GivenOrderValue>>;
type _02d = Expect<Equal<Registry["version"], number>>;
type _02e = Expect<Equal<GivenExtends<typeof BROAD, keyof Registry>, false>>;

// 3. Build the operator that keeps only the symbol-keyed part of a key set.
export type SymbolKeysOf<Value> = TODO; // TODO(koan)

type _03a = Expect<Equal<SymbolKeysOf<Registry>, typeof USER | typeof ORDER>>;
type _03b = Expect<Equal<SymbolKeysOf<{ version: number }>, never>>;
type _03c = Expect<Equal<SymbolKeysOf<Record<symbol, number>>, symbol>>;
type _03d = Expect<
  Equal<
    {
      allAreSymbols: GivenExtends<SymbolKeysOf<Registry>, symbol>;
      noneAreStrings: GivenExtends<SymbolKeysOf<Registry>, string>;
    },
    { allAreSymbols: true; noneAreStrings: false }
  >
>;

// 4. Build its complement, which is what a string-key-only enumeration would
//    ever be able to see.
export type StringKeysOf<Value> = TODO; // TODO(koan)

type _04a = Expect<Equal<StringKeysOf<Registry>, "version">>;
type _04b = Expect<Equal<StringKeysOf<{ [USER]: number }>, never>>;
type _04c = Expect<Equal<StringKeysOf<Record<string, number>>, string>>;
type _04d = Expect<Equal<StringKeysOf<Registry> | SymbolKeysOf<Registry>, keyof Registry>>;

// 5. Build the key classifier that names every kind of key a property can have,
//    keeping the singleton apart from the broad kind in both families.
export type KeyKindOf<Key> = TODO; // TODO(koan)

type _05a = Expect<Equal<KeyKindOf<typeof USER>, "unique symbol">>;
type _05b = Expect<Equal<KeyKindOf<symbol>, "broad symbol">>;
type _05c = Expect<Equal<KeyKindOf<"version">, "literal string">>;
type _05d = Expect<Equal<KeyKindOf<string>, "broad string">>;
type _05e = Expect<Equal<KeyKindOf<keyof Registry>, "unique symbol" | "literal string">>;

// ─── Structures keyed by the identity ─────────────────────────────────

// 6. Build the homogeneous table over a set of symbol keys — the shape a
//     `Record` produces, written directly.
export type SymbolTable<Keys extends symbol, Value> = TODO; // TODO(koan)

type _06a = Expect<Equal<keyof SymbolTable<typeof USER | typeof ORDER, string>, typeof USER | typeof ORDER>>;
type _06b = Expect<Equal<SymbolTable<typeof USER, string>[typeof USER], string>>;
type _06c = Expect<Equal<SymbolTable<typeof USER, string>, { readonly [USER]: string }>>;
type _06d = Expect<Equal<keyof SymbolTable<symbol, string>, symbol>>;

// 7. Build the registry's API signatures. The reader is generic in the key, so
//    each call site gets that key's value type rather than the union.
export type RegistryApi = TODO; // TODO(koan)

type _07a = Expect<
  Equal<
    { built: ReturnType<RegistryApi["createRegistry"]>; broadIsNotAKey: GivenExtends<typeof BROAD, keyof Registry> },
    { built: Registry; broadIsNotAKey: false }
  >
>;
type _07b = Expect<Equal<Parameters<RegistryApi["readRegistry"]>[1], keyof Registry>>;
type _07c = Expect<Equal<ReturnType<RegistryApi["readRegistry"]>, GivenUserValue | GivenOrderValue | number>>;
type _07d = Expect<Equal<ReturnType<RegistryApi["ownKeys"]>, PropertyKey[]>>;
type _07e = Expect<Equal<ReturnType<typeof readOne>, GivenUserValue>>;

declare const readOne: (registry: Registry, key: typeof USER) => Registry[typeof USER];

// 8. Build the merge that lets the right side win, over a key set that mixes
//     singleton and string keys.
export type MergeRegistries<Left, Right> = TODO; // TODO(koan)

type _08a = Expect<
  Equal<
    {
      keys: keyof MergeRegistries<Registry, { version: string }>;
      broadIsNotAKey: GivenExtends<typeof BROAD, keyof Registry>;
    },
    { keys: keyof Registry; broadIsNotAKey: false }
  >
>;
type _08b = Expect<Equal<MergeRegistries<Registry, { version: string }>["version"], string>>;
type _08c = Expect<Equal<MergeRegistries<Registry, { version: string }>[typeof USER], GivenUserValue>>;
type _08d = Expect<Equal<MergeRegistries<Registry, { [ORDER]: boolean }>[typeof ORDER], boolean>>;
type _08e = Expect<Equal<MergeRegistries<{ [USER]: 1 }, { [ORDER]: 2 }>[typeof USER], 1>>;

// ─── What the identity buys ───────────────────────────────────────────

// 9. Report the nominal distinctness. Two singletons with identical
//    descriptions never meet, and their intersection is empty rather than a
//    symbol nobody can produce.
export type IdentityProfile = TODO; // TODO(koan)

type _09a = Expect<Equal<IdentityProfile["userIntoOrder"], false>>;
type _09b = Expect<Equal<IdentityProfile["userEqualsOrder"], false>>;
type _09c = Expect<Equal<IdentityProfile["intersected"], never>>;
type _09d = Expect<Equal<IdentityProfile["userIntoSymbol"], true>>;
type _09e = Expect<Equal<IdentityProfile["symbolIntoUser"], false>>;

// 10. Report the absorption. `symbol` in a union swallows every singleton beside
//     it, so nothing can be extracted back out afterwards.
export type AbsorptionProfile = TODO; // TODO(koan)

type _10a = Expect<Equal<AbsorptionProfile["unionWithBroad"], symbol>>;
type _10b = Expect<Equal<AbsorptionProfile["extractedAfterAbsorption"], never>>;
type _10c = Expect<Equal<AbsorptionProfile["extractedWithoutBroad"], typeof USER>>;
type _10d = Expect<Equal<AbsorptionProfile["excludedWithoutBroad"], typeof ORDER>>;
type _10e = Expect<Equal<AbsorptionProfile["bothStillUnique"], true>>;

// 11. Report the heterogeneous lookup that the identity exists to enable: one
//     structure, three key types, three unrelated value types.
export type LookupProfile = TODO; // TODO(koan)

type _11a = Expect<Equal<LookupProfile["atUser"], GivenUserValue>>;
type _11b = Expect<Equal<LookupProfile["atOrder"], GivenOrderValue>>;
type _11c = Expect<Equal<LookupProfile["atVersion"], number>>;
type _11d = Expect<Equal<LookupProfile["atEveryKey"], GivenUserValue | GivenOrderValue | number>>;
type _11e = Expect<Equal<LookupProfile["atSymbolKeys"], GivenUserValue | GivenOrderValue>>;

// 12. Report the mapped-type transforms carrying singleton keys through
//     untouched — the key set is a union like any other.
export type MappedPreservationProfile = TODO; // TODO(koan)

type _12a = Expect<Equal<MappedPreservationProfile["keyEchoed"], typeof USER>>;
type _12b = Expect<Equal<MappedPreservationProfile["readonlyValue"], GivenUserValue>>;
type _12c = Expect<Equal<MappedPreservationProfile["partialValue"], GivenOrderValue | undefined>>;
type _12d = Expect<Equal<MappedPreservationProfile["recordValue"], null>>;
type _12e = Expect<Equal<MappedPreservationProfile["valueEchoed"], GivenOrderValue>>;

// 13. Report the symbol index signature — the other way to lose the identity.
//     It accepts every singleton key and answers all of them the same way.
export type IndexSignatureProfile = TODO; // TODO(koan)

type _13a = Expect<Equal<IndexSignatureProfile["keys"], symbol>>;
type _13b = Expect<Equal<IndexSignatureProfile["atUser"], number>>;
type _13c = Expect<Equal<IndexSignatureProfile["atOrder"], number>>;
type _13d = Expect<Equal<IndexSignatureProfile["acceptsSingletonKey"], true>>;
type _13e = Expect<Equal<IndexSignatureProfile["valuesAgree"], true>>;

// 14. Report the key partition. Every key belongs to exactly one side, and the
//     two sides put back together are the original key set.
export type KeyPartitionProfile = TODO; // TODO(koan)

type _14a = Expect<Equal<KeyPartitionProfile["symbolSide"], typeof USER | typeof ORDER>>;
type _14b = Expect<Equal<KeyPartitionProfile["stringSide"], "version">>;
type _14c = Expect<Equal<KeyPartitionProfile["withoutSymbols"], "version">>;
type _14d = Expect<Equal<KeyPartitionProfile["withoutSingletons"], "version">>;
type _14e = Expect<Equal<KeyPartitionProfile["rejoined"], true>>;

// 15. Report the classifier over the inputs that are easy to guess wrong: the
//     empty union answers nothing, and `any` answers the broad verdict because
//     it walks both branches at once.
export type ClassificationProfile = TODO; // TODO(koan)

type _15a = Expect<Equal<ClassificationProfile["singleton"], true>>;
type _15b = Expect<Equal<ClassificationProfile["broad"], false>>;
type _15c = Expect<Equal<ClassificationProfile["mixedUnion"], false>>;
type _15d = Expect<Equal<ClassificationProfile["bottom"], never>>;
type _15e = Expect<Equal<ClassificationProfile["anything"], false>>;

// 16. Report `Pick` and `Omit` over singleton keys, which need no special
//     handling at all — a symbol key is just a member of the key union.
export type PickOmitProfile = TODO; // TODO(koan)

type _16a = Expect<Equal<PickOmitProfile["pickedValue"], GivenUserValue>>;
type _16b = Expect<Equal<PickOmitProfile["pickedKeys"], typeof USER | "version">>;
type _16c = Expect<Equal<PickOmitProfile["omittedKeys"], typeof ORDER | "version">>;
type _16d = Expect<Equal<PickOmitProfile["omittedValue"], number>>;
type _16e = Expect<Equal<PickOmitProfile["pickedIsNarrower"], true>>;

// 17. Report where singleton keys sit among property keys generally.
export type VisibilityProfile = TODO; // TODO(koan)

type _17a = Expect<Equal<VisibilityProfile["singletonIsAPropertyKey"], true>>;
type _17b = Expect<Equal<VisibilityProfile["broadIsAPropertyKey"], true>>;
type _17c = Expect<Equal<VisibilityProfile["singletonIsAKey"], true>>;
type _17d = Expect<Equal<VisibilityProfile["broadIsAKey"], false>>;

// 18. Build the describer that walks a structure and reports, per key, the kind
//     of key it is and the value stored under it — the two things a singleton
//     key set makes simultaneously available.
export type DescribeKeys<Value> = TODO; // TODO(koan)

type _18a = Expect<Equal<DescribeKeys<Registry>[typeof USER]["kind"], "unique symbol">>;
type _18b = Expect<Equal<DescribeKeys<Registry>["version"]["kind"], "literal string">>;
type _18c = Expect<Equal<DescribeKeys<Registry>[typeof ORDER]["value"], GivenOrderValue>>;
type _18d = Expect<Equal<DescribeKeys<Registry>[keyof Registry]["kind"], "unique symbol" | "literal string">>;
type _18e = Expect<
  Equal<
    { keys: keyof DescribeKeys<Registry>; broadIsNotAKey: GivenExtends<typeof BROAD, keyof Registry> },
    { keys: keyof Registry; broadIsNotAKey: false }
  >
>;
