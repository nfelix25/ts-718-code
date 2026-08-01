import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-178: symbols as weak collection keys — constructions
 * =============================================================================
 *
 * A `WeakMap` used to demand an object key, because garbage collection needs an
 * identity that can actually become unreachable. Symbols have such an identity —
 * an unregistered one is a value nobody else can produce — so TypeScript 5.2
 * widened the key type to `WeakKey`, which is `object | symbol`.
 *
 * The interesting part is which symbols this is *safe* for, and the type system
 * cannot tell you. A symbol from `Symbol()` is collectable; one from
 * `Symbol.for()` lives in a cross-realm registry and never becomes unreachable,
 * so using it as a weak key quietly makes the entry permanent. Both have type
 * `symbol`, so the distinction is a runtime one — `Symbol.keyFor` is the only
 * thing that can answer it. Replace each `TODO` with a type satisfying the
 * assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

// Two unregistered symbols and one registered one.
declare const localToken: unique symbol;
declare const secondToken: unique symbol;
declare const registeredToken: symbol;

// ─── The admissible key universe ──────────────────────────────────────

// 1. Build the symbol half of the key universe.
export type WeakSymbol = TODO; // TODO(koan)

type _01a = Expect<Equal<WeakSymbol, symbol>>;
type _01b = Expect<
  Equal<
    {
      unregisteredTokenFits: GivenExtends<typeof localToken, WeakSymbol>;
      aStringIsNotAWeakKey: IsWeakKey<string>;
    },
    { unregisteredTokenFits: true; aStringIsNotAWeakKey: false }
  >
>;
type _01c = Expect<
  Equal<
    {
      registeredTokenFits: GivenExtends<typeof registeredToken, WeakSymbol>;
      aStringIsNotAWeakKey: IsWeakKey<string>;
    },
    { registeredTokenFits: true; aStringIsNotAWeakKey: false }
  >
>;
type _01d = Expect<Equal<GivenExtends<string, WeakSymbol>, false>>;

// 2. Build the object half.
export type WeakObject = TODO; // TODO(koan)

type _02a = Expect<Equal<WeakObject, object>>;
type _02b = Expect<
  Equal<
    {
      objectFits: GivenExtends<{ id: string }, WeakObject>;
      aStringIsNotAWeakKey: IsWeakKey<string>;
    },
    { objectFits: true; aStringIsNotAWeakKey: false }
  >
>;
type _02c = Expect<
  Equal<
    {
      functionFits: GivenExtends<() => void, WeakObject>;
      aStringIsNotAWeakKey: IsWeakKey<string>;
    },
    { functionFits: true; aStringIsNotAWeakKey: false }
  >
>;
type _02d = Expect<Equal<GivenExtends<symbol, WeakObject>, false>>;

// 3. Build the whole universe from its two halves, and confirm nothing else is
//    in it.
export type WeakKeyUniverse = TODO; // TODO(koan)

type _03a = Expect<Equal<WeakKeyUniverse, object | symbol>>;
type _03b = Expect<Equal<Equal<WeakKeyUniverse, WeakKey>, true>>;
type _03c = Expect<Equal<Extract<WeakKeyUniverse, string>, never>>;
type _03d = Expect<
  Equal<
    {
      universeFitsWeakKey: GivenExtends<WeakKeyUniverse, WeakKey>;
      aStringIsNotAWeakKey: IsWeakKey<string>;
    },
    { universeFitsWeakKey: true; aStringIsNotAWeakKey: false }
  >
>;
type _03e = Expect<
  Equal<
    {
      weakKeyFitsUniverse: GivenExtends<WeakKey, WeakKeyUniverse>;
      aStringIsNotAWeakKey: IsWeakKey<string>;
    },
    { weakKeyFitsUniverse: true; aStringIsNotAWeakKey: false }
  >
>;

// 4. Build the predicate that says whether a type may be used as a weak key.
export type IsWeakKey<Value> = TODO; // TODO(koan)

type _04a = Expect<Equal<IsWeakKey<symbol>, true>>;
type _04b = Expect<Equal<IsWeakKey<{ id: string }>, true>>;
type _04c = Expect<Equal<IsWeakKey<string>, false>>;
type _04d = Expect<Equal<IsWeakKey<number>, false>>;
type _04e = Expect<Equal<IsWeakKey<symbol | { id: string }>, true>>;

// 5. Report the primitives that stay out. Everything with value semantics is
//    excluded, because two equal values are not one identity.
export type ExcludedProfile = TODO; // TODO(koan)

type _05a = Expect<Equal<ExcludedProfile["strings"], false>>;
type _05b = Expect<Equal<ExcludedProfile["numbers"], false>>;
type _05c = Expect<Equal<ExcludedProfile["bigints"], false>>;
type _05d = Expect<Equal<ExcludedProfile["nullValue"], false>>;
type _05e = Expect<Equal<ExcludedProfile["undefinedValue"], false>>;

// ─── The collections ──────────────────────────────────────────────────

// 6. Build the symbol-keyed map — a spelling that was an error before 5.2.
export type SymbolWeakMap = TODO; // TODO(koan)

type _06a = Expect<Equal<Parameters<SymbolWeakMap["set"]>[0], symbol>>;
type _06b = Expect<Equal<Parameters<SymbolWeakMap["get"]>[0], symbol>>;
type _06c = Expect<Equal<ReturnType<SymbolWeakMap["get"]>, string | undefined>>;
type _06d = Expect<Equal<ReturnType<SymbolWeakMap["has"]>, boolean>>;
type _06e = Expect<
  Equal<
    {
      symbolMapIsAWeakMap: GivenExtends<SymbolWeakMap, WeakMap<WeakKey, string>>;
      aStringIsNotAWeakKey: IsWeakKey<string>;
    },
    { symbolMapIsAWeakMap: true; aStringIsNotAWeakKey: false }
  >
>;

// 7. Build the symbol-keyed set.
export type SymbolWeakSet = TODO; // TODO(koan)

type _07a = Expect<Equal<Parameters<SymbolWeakSet["add"]>[0], symbol>>;
type _07b = Expect<Equal<ReturnType<SymbolWeakSet["has"]>, boolean>>;
type _07c = Expect<Equal<ReturnType<SymbolWeakSet["delete"]>, boolean>>;
type _07d = Expect<
  Equal<
    {
      symbolSetIsAWeakSet: GivenExtends<SymbolWeakSet, WeakSet<WeakKey>>;
      aStringIsNotAWeakKey: IsWeakKey<string>;
    },
    { symbolSetIsAWeakSet: true; aStringIsNotAWeakKey: false }
  >
>;

// 8. Build the collections keyed by the whole universe — the shape a general
//    registry would use.
export type UniversalWeakMap = TODO; // TODO(koan)

type _08a = Expect<Equal<Parameters<UniversalWeakMap["set"]>[0], WeakKey>>;
type _08b = Expect<Equal<ReturnType<UniversalWeakMap["get"]>, string | undefined>>;
type _08c = Expect<
  Equal<
    {
      setReturnsTheMap: ReturnType<UniversalWeakMap["set"]>;
      aStringIsNotAWeakKey: IsWeakKey<string>;
    },
    { setReturnsTheMap: UniversalWeakMap; aStringIsNotAWeakKey: false }
  >
>;
type _08d = Expect<Equal<ReturnType<UniversalWeakMap["delete"]>, boolean>>;
type _08e = Expect<
  Equal<
    {
      symbolKeyAccepted: GivenExtends<symbol, Parameters<UniversalWeakMap["set"]>[0]>;
      stringKeyRefused: GivenExtends<string, Parameters<UniversalWeakMap["set"]>[0]>;
    },
    { symbolKeyAccepted: true; stringKeyRefused: false }
  >
>;

// ─── What the widening does and does not decide ───────────────────────

// 9. Report the variance of the key parameter. A narrower key type produces a
//    collection usable where the wider one was promised — the key position of a
//    weak collection behaves covariantly under structural comparison.
export type CollectionVarianceProfile = TODO; // TODO(koan)

type _09a = Expect<Equal<CollectionVarianceProfile["symbolMapIntoUniversal"], true>>;
type _09b = Expect<Equal<CollectionVarianceProfile["universalMapIntoSymbol"], false>>;
type _09c = Expect<Equal<CollectionVarianceProfile["symbolSetIntoUniversal"], true>>;
type _09d = Expect<Equal<CollectionVarianceProfile["objectMapIntoUniversal"], true>>;
type _09e = Expect<Equal<CollectionVarianceProfile["narrowKeyIsStillAWeakKey"], true>>;

// 10. Report the identity question the type system cannot answer. Both kinds of
//     symbol have type `symbol`, so nothing at the type level distinguishes a
//     collectable token from a registry entry that will never be collected.
export type IdentityProfile = TODO; // TODO(koan)

type _10a = Expect<Equal<IdentityProfile["unregisteredIsASymbol"], true>>;
type _10b = Expect<Equal<IdentityProfile["registeredIsASymbol"], true>>;
type _10c = Expect<Equal<IdentityProfile["bothAreWeakKeys"], true>>;
type _10d = Expect<Equal<IdentityProfile["typesCannotTellThemApart"], true>>;
type _10e = Expect<Equal<IdentityProfile["onlyARuntimeCallCan"], string | undefined>>;

// 11. Report what unique symbols *do* buy, which is distinctness rather than
//     collectability. Two separately declared tokens never coincide.
export type UniquenessProfile = TODO; // TODO(koan)

type _11a = Expect<Equal<UniquenessProfile["firstIntoSecond"], false>>;
type _11b = Expect<Equal<UniquenessProfile["secondIntoFirst"], false>>;
type _11c = Expect<Equal<UniquenessProfile["firstIntoItself"], true>>;
type _11d = Expect<Equal<UniquenessProfile["intersected"], never>>;
type _11e = Expect<Equal<UniquenessProfile["registeredIsNotUnique"], true>>;

// ─── The registry API ─────────────────────────────────────────────────

// 12. Build the registry signatures. Every one takes the whole key universe, so
//     an object and a symbol are equally acceptable.
export type WeakRegistryApi = TODO; // TODO(koan)

type _12a = Expect<Equal<Parameters<WeakRegistryApi["describeWeakly"]>[0], WeakKey>>;
type _12b = Expect<Equal<ReturnType<WeakRegistryApi["describeWeakly"]>, void>>;
type _12c = Expect<Equal<ReturnType<WeakRegistryApi["readWeakDescription"]>, string | undefined>>;
type _12d = Expect<Equal<ReturnType<WeakRegistryApi["wasVisited"]>, boolean>>;
type _12e = Expect<
  Equal<
    {
      aSymbolIsAcceptable: GivenExtends<symbol, Parameters<WeakRegistryApi["markVisited"]>[0]>;
      aStringIsNot: GivenExtends<string, Parameters<WeakRegistryApi["markVisited"]>[0]>;
    },
    { aSymbolIsAcceptable: true; aStringIsNot: false }
  >
>;

// 13. Build the symbol-registry reader, whose result is the one runtime fact
//     that separates the two kinds of symbol.
export type SymbolRegistryApi = TODO; // TODO(koan)

type _13a = Expect<Equal<ReturnType<SymbolRegistryApi["keyFor"]>, string | undefined>>;
type _13b = Expect<Equal<Parameters<SymbolRegistryApi["forKey"]>, [key: string]>>;
type _13c = Expect<Equal<ReturnType<SymbolRegistryApi["forKey"]>, symbol>>;
type _13d = Expect<
  Equal<
    {
      registeredSymbolsHaveAKey: NonNullable<ReturnType<SymbolRegistryApi["keyFor"]>>;
      butTheResultAdmitsNotHavingOne: ReturnType<SymbolRegistryApi["keyFor"]>;
    },
    { registeredSymbolsHaveAKey: string; butTheResultAdmitsNotHavingOne: string | undefined }
  >
>;

// ─── Building a safer key type ────────────────────────────────────────

// 14. Build the gate that admits a value only if it may be a weak key at all —
//     the check the type system *can* make.
export type WeakKeyOnly<Value> = TODO; // TODO(koan)

type _14a = Expect<Equal<WeakKeyOnly<symbol>, symbol>>;
type _14b = Expect<Equal<WeakKeyOnly<{ id: string }>, { id: string }>>;
type _14c = Expect<Equal<WeakKeyOnly<string>, never>>;
type _14d = Expect<Equal<WeakKeyOnly<symbol | string>, never>>;

// 15. Build the branded key type an application would use to record that a
//     symbol was checked at run time — the only way to make the registry
//     distinction visible to the checker.
export type CollectableSymbol = TODO; // TODO(koan)

type _15a = Expect<
  Equal<
    {
      brandedIsStillASymbol: GivenExtends<CollectableSymbol, symbol>;
      aStringIsNotAWeakKey: IsWeakKey<string>;
    },
    { brandedIsStillASymbol: true; aStringIsNotAWeakKey: false }
  >
>;
type _15b = Expect<Equal<GivenExtends<symbol, CollectableSymbol>, false>>;
type _15c = Expect<Equal<IsWeakKey<CollectableSymbol>, true>>;
type _15d = Expect<
  Equal<
    {
      brandedFlowsIntoPlain: GivenExtends<CollectableSymbol, symbol>;
      plainDoesNotFlowBack: GivenExtends<symbol, CollectableSymbol>;
    },
    { brandedFlowsIntoPlain: true; plainDoesNotFlowBack: false }
  >
>;

// 16. Build the guard signature that produces that evidence — the runtime check
//     the type system delegates to.
export type CollectableGuard = TODO; // TODO(koan)

type _16a = Expect<Equal<Parameters<CollectableGuard>, [value: symbol]>>;
type _16b = Expect<Equal<ReturnType<CollectableGuard>, boolean>>;
type _16c = Expect<
  Equal<
    {
      guardTakesAnySymbol: GivenExtends<typeof registeredToken, Parameters<CollectableGuard>[0]>;
      aStringIsNotAWeakKey: IsWeakKey<string>;
    },
    { guardTakesAnySymbol: true; aStringIsNotAWeakKey: false }
  >
>;
type _16d = Expect<Equal<Parameters<CollectableGuard>["length"], 1>>;

// 17. Build the filter that finds the members of a record usable as weak keys.
export type WeakKeyValuedKeys<Owner> = TODO; // TODO(koan)

type _17a = Expect<Equal<WeakKeyValuedKeys<{ a: symbol; b: string }>, "a">>;
type _17b = Expect<Equal<WeakKeyValuedKeys<{ a: { id: string }; b: symbol }>, "a" | "b">>;
type _17c = Expect<Equal<WeakKeyValuedKeys<{ a: number; b: string }>, never>>;
type _17d = Expect<Equal<WeakKeyValuedKeys<Record<never, never>>, never>>;

// 18. Report one candidate at a glance: whether the type system accepts it,
//     which half of the universe it belongs to, and whether anything about
//     collectability can be known statically.
export type WeakKeyReport<Value> = TODO; // TODO(koan)

type _18a = Expect<Equal<WeakKeyReport<symbol>["accepted"], true>>;
type _18b = Expect<Equal<WeakKeyReport<symbol>["symbolHalf"], symbol>>;
type _18c = Expect<Equal<WeakKeyReport<symbol>["objectHalf"], never>>;
type _18d = Expect<Equal<WeakKeyReport<{ id: string }>["objectHalf"], { id: string }>>;
type _18e = Expect<Equal<WeakKeyReport<string>["accepted"], false>>;
