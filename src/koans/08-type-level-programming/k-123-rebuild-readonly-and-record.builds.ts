import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-123: rebuild Readonly and Record — constructions
 * =============================================================================
 *
 * These two mapped types run in opposite directions. One starts from an existing
 * shape and adds a capability modifier to every key it finds; the other starts
 * from a key vocabulary and manufactures a property for each key in it. Both are
 * shallow, and both are weaker guarantees than they look: a readonly property can
 * still point at a freely mutable object, and a record is total without being
 * exact — nothing stops extra keys from being present structurally. The key
 * vocabulary also decides the shape of the result, since a broad domain like
 * `string` produces an index signature rather than named properties. Replace each
 * `TODO` with a type satisfying the assertions directly below it.
 */

declare const givenToken: unique symbol;

type GivenSettings = {
  host: string;
  port?: number;
  nested: { retries: number };
};

// Declared with the packet's own signatures so constructions can be graded
// against real call sites.
declare function givenFreezeShallow<Source extends object>(
  value: Source,
): RebuiltReadonly<Source>;
declare function givenFromKeys<const Keys extends readonly PropertyKey[], Value>(
  keys: Keys,
  create: (key: Keys[number]) => Value,
): RebuiltRecord<Keys[number], Value>;

// ─── Two directions ───────────────────────────────────────────────────

// 1. Build the capability mapping: copy every source property and add write
//    protection.
//    `RebuiltReadonly<{ a: 1 }>` is `{ readonly a: 1 }`.
export type RebuiltReadonly<Source> = TODO; // TODO(koan)

type _01a = Expect<Equal<RebuiltReadonly<{ a: 1; b: 2 }>, { readonly a: 1; readonly b: 2 }>>;
type _01b = Expect<
  Equal<
    RebuiltReadonly<GivenSettings>,
    { readonly host: string; readonly port?: number; readonly nested: { retries: number } }
  >
>;
type _01c = Expect<Equal<keyof RebuiltReadonly<GivenSettings>, "host" | "port" | "nested">>;
type _01d = Expect<Equal<RebuiltReadonly<{ optional?: 1 }>, { readonly optional?: 1 }>>;
type _01e = Expect<Equal<RebuiltReadonly<{}>, {}>>;

// 2. Build the vocabulary mapping: for every key in the requested domain, require
//    one property of the given value type.
//    `RebuiltRecord<"a" | "b", number>` is `{ a: number; b: number }`.
export type RebuiltRecord<Keys extends keyof any, Value> = TODO; // TODO(koan)

type _02a = Expect<Equal<RebuiltRecord<"a", number>, { a: number }>>;
type _02b = Expect<Equal<RebuiltRecord<"a" | "b", number>, { a: number; b: number }>>;
type _02c = Expect<Equal<RebuiltRecord<never, number>, {}>>;
type _02d = Expect<Equal<keyof RebuiltRecord<"idle" | "busy", boolean>, "idle" | "busy">>;
type _02e = Expect<Equal<RebuiltRecord<"a" | "b", never>, { a: never; b: never }>>;

// ─── Adding a capability ──────────────────────────────────────────────

// 3. Report the modifier being added without disturbing anything else.
export type CapabilityProfile = TODO; // TODO(koan)

type _03a = Expect<Equal<CapabilityProfile["added"], { readonly a: 1; readonly b: 2 }>>;
type _03b = Expect<
  Equal<CapabilityProfile["alreadyReadonly"], { readonly existing: 1; readonly mutable: 2 }>
>;
type _03c = Expect<Equal<CapabilityProfile["idempotent"], { readonly value: 1 }>>;
type _03d = Expect<Equal<CapabilityProfile["optionalKept"], { readonly optional?: 1 }>>;
type _03e = Expect<Equal<CapabilityProfile["optionalRead"], number | undefined>>;

// 4. Report the protection stopping at the property itself: whatever the property
//    refers to is as mutable as it ever was.
export type ShallowCapabilityProfile = TODO; // TODO(koan)

type _04a = Expect<
  Equal<ShallowCapabilityProfile["outerShape"], { readonly nested: { value: 1 } }>
>;
type _04b = Expect<Equal<ShallowCapabilityProfile["innerUntouched"], { value: 1 }>>;
type _04c = Expect<Equal<ShallowCapabilityProfile["arrayUntouched"], number[]>>;
type _04d = Expect<Equal<ShallowCapabilityProfile["deeplyNested"], { b: { c: 1 } }>>;
type _04e = Expect<Equal<ShallowCapabilityProfile["settingsInner"], { retries: number }>>;

// 5. Report arrays and tuples, where the same modifier changes the whole
//    container's capability rather than one property's.
export type ContainerCapabilityProfile = TODO; // TODO(koan)

type _05a = Expect<Equal<ContainerCapabilityProfile["tuple"], readonly [1, 2]>>;
type _05b = Expect<
  Equal<ContainerCapabilityProfile["labelledTuple"], readonly [name: string, age: number]>
>;
type _05c = Expect<Equal<ContainerCapabilityProfile["array"], readonly string[]>>;
type _05d = Expect<Equal<ContainerCapabilityProfile["tuplePush"], false>>;
type _05e = Expect<Equal<ContainerCapabilityProfile["tupleLength"], 2>>;

// ─── Manufacturing from a vocabulary ──────────────────────────────────

// 6. Report a finite key union becoming that many required properties.
export type VocabularyProfile = TODO; // TODO(koan)

type _06a = Expect<Equal<VocabularyProfile["single"], { a: number }>>;
type _06b = Expect<Equal<VocabularyProfile["several"], { a: number; b: number }>>;
type _06c = Expect<Equal<VocabularyProfile["empty"], {}>>;
type _06d = Expect<Equal<VocabularyProfile["keys"], "idle" | "busy">>;
type _06e = Expect<Equal<VocabularyProfile["emptyValueDomain"], { a: never; b: never }>>;

// 7. Report every key domain being accepted, including numeric and symbol keys.
export type KeyDomainProfile = TODO; // TODO(koan)

type _07a = Expect<Equal<KeyDomainProfile["numeric"], { 0: string; 1: string }>>;
type _07b = Expect<Equal<KeyDomainProfile["symbolic"], { [givenToken]: { id: number } }>>;
type _07c = Expect<
  Equal<KeyDomainProfile["mixed"], { 0: boolean; label: boolean; [givenToken]: boolean }>
>;
type _07d = Expect<Equal<KeyDomainProfile["numericKeys"], 0 | 1>>;
type _07e = Expect<Equal<KeyDomainProfile["symbolKeys"], typeof givenToken>>;

// 8. Report a broad key domain producing an index signature instead of named
//    properties, which is a materially different kind of result.
export type BroadDomainProfile = TODO; // TODO(koan)

type _08a = Expect<Equal<BroadDomainProfile["strings"], { [key: string]: number }>>;
type _08b = Expect<Equal<BroadDomainProfile["numbers"], { [key: number]: string }>>;
type _08c = Expect<Equal<BroadDomainProfile["symbols"], { [key: symbol]: boolean }>>;
type _08d = Expect<
  Equal<
    BroadDomainProfile["everything"],
    { [key: string]: unknown; [key: number]: unknown; [key: symbol]: unknown }
  >
>;
type _08e = Expect<Equal<BroadDomainProfile["broadKeys"], string>>;

// 9. Report the record being total but not exact: it demands every key in the
//    vocabulary while saying nothing about keys outside it.
export type TotalityProfile = TODO; // TODO(koan)

type _09a = Expect<Equal<TotalityProfile["withExtra"], "a" | "extra">>;
type _09b = Expect<Equal<TotalityProfile["extraAccepted"], true>>;
type _09c = Expect<Equal<TotalityProfile["missingRejected"], false>>;
type _09d = Expect<Equal<TotalityProfile["partialised"], { a?: string; b?: string }>>;
type _09e = Expect<Equal<TotalityProfile["restored"], { a: string; b: string }>>;

// ─── Independent axes ─────────────────────────────────────────────────

// 10. Report the two utilities composing in either order, since capability and
//     vocabulary are separate axes.
export type CompositionProfile = TODO; // TODO(koan)

type _10a = Expect<
  Equal<CompositionProfile["readonlyOfRecord"], { readonly x: number; readonly y: number }>
>;
type _10b = Expect<
  Equal<CompositionProfile["recordOfReadonly"], { x: { readonly value: number } }>
>;
type _10c = Expect<Equal<CompositionProfile["partialOfRecord"], { x?: number; y?: number }>>;
type _10d = Expect<Equal<CompositionProfile["requiredOfReadonly"], { readonly x: number }>>;
type _10e = Expect<
  Equal<
    CompositionProfile["symbolRecordOfReadonly"],
    { [givenToken]: { readonly value: 1 } }
  >
>;

// 11. Report the top and bottom sources.
export type ExtremeSourceProfile = TODO; // TODO(koan)

type _11a = Expect<Equal<ExtremeSourceProfile["readonlyTop"], {}>>;
type _11b = Expect<Equal<ExtremeSourceProfile["readonlyBottom"], never>>;
type _11c = Expect<Equal<ExtremeSourceProfile["recordOfNever"], {}>>;
type _11d = Expect<
  Equal<ExtremeSourceProfile["symbolProperty"], { readonly [givenToken]: { value: 1 } }>
>;
type _11e = Expect<Equal<ExtremeSourceProfile["emptyKeys"], never>>;

// ─── Surfaces built on the two mappings ───────────────────────────────

// 12. Build the record whose value type depends on the key, which is the natural
//     generalisation once the vocabulary is already being walked.
export type RecordFromOf<Keys extends keyof any, Describe> = TODO; // TODO(koan)

type _12a = Expect<
  Equal<RecordFromOf<"a" | "b", { a: number; b: string }>, { a: number; b: string }>
>;
type _12b = Expect<Equal<RecordFromOf<"a", { a: 1; b: 2 }>, { a: 1 }>>;
type _12c = Expect<Equal<RecordFromOf<never, { a: 1 }>, {}>>;
type _12d = Expect<Equal<RecordFromOf<"missing", { a: 1 }>, { missing: never }>>;
type _12e = Expect<
  Equal<RecordFromOf<0 | 1, { 0: "zero"; 1: "one" }>, { 0: "zero"; 1: "one" }>
>;

// 13. Build the readonly variant that also protects one level further in, to make
//     the shallowness of the original explicit by contrast.
export type ReadonlyTwoLevelsOf<Source> = TODO; // TODO(koan)

type _13a = Expect<
  Equal<
    ReadonlyTwoLevelsOf<{ nested: { value: 1 } }>,
    { readonly nested: { readonly value: 1 } }
  >
>;
type _13b = Expect<
  Equal<
    ReadonlyTwoLevelsOf<{ a: { b: { c: 1 } } }>,
    { readonly a: { readonly b: { c: 1 } } }
  >
>;
type _13c = Expect<Equal<ReadonlyTwoLevelsOf<{}>, {}>>;
type _13d = Expect<
  Equal<ReadonlyTwoLevelsOf<{ list: number[] }>, { readonly list: readonly number[] }>
>;
type _13e = Expect<
  Equal<
    {
      twoLevels: ReadonlyTwoLevelsOf<{ nested: { value: 1 } }>["nested"];
      oneLevel: RebuiltReadonly<{ nested: { value: 1 } }>["nested"];
    },
    { twoLevels: { readonly value: 1 }; oneLevel: { value: 1 } }
  >
>;

// 14. Build the predicate that reports whether every property of a shape is
//     already write-protected.
export type IsFullyReadonlyOf<Source> = TODO; // TODO(koan)

type _14a = Expect<
  Equal<
    {
      frozen: IsFullyReadonlyOf<{ readonly a: 1 }>;
      mutable: IsFullyReadonlyOf<{ a: 1 }>;
    },
    { frozen: true; mutable: false }
  >
>;
type _14b = Expect<
  Equal<
    { empty: IsFullyReadonlyOf<{}>; mixed: IsFullyReadonlyOf<{ readonly a: 1; b: 2 }> },
    { empty: true; mixed: false }
  >
>;
type _14c = Expect<
  Equal<
    {
      shallowOnly: IsFullyReadonlyOf<{ readonly nested: { value: 1 } }>;
      tuple: IsFullyReadonlyOf<readonly [1, 2]>;
    },
    { shallowOnly: true; tuple: true }
  >
>;
type _14d = Expect<
  Equal<
    {
      mutableTuple: IsFullyReadonlyOf<[1, 2]>;
      record: IsFullyReadonlyOf<RebuiltRecord<"a", 1>>;
    },
    { mutableTuple: false; record: false }
  >
>;
type _14e = Expect<
  Equal<
    {
      afterMapping: IsFullyReadonlyOf<RebuiltReadonly<{ a: 1 }>>;
      optionalReadonly: IsFullyReadonlyOf<{ readonly a?: 1 }>;
    },
    { afterMapping: true; optionalReadonly: true }
  >
>;

// 15. Build the two signatures the packet exports. The freeze returns the
//     capability view even though the runtime call only freezes one level, and
//     the factory turns a key tuple into the record's vocabulary.
export type RecordRuntimeApi = TODO; // TODO(koan)

type _15a = Expect<
  Equal<
    RecordRuntimeApi["freezeShallow"],
    <Source extends object>(value: Source) => RebuiltReadonly<Source>
  >
>;
type _15b = Expect<
  Equal<
    RecordRuntimeApi["fromKeys"],
    <const Keys extends readonly PropertyKey[], Value>(
      keys: Keys,
      create: (key: Keys[number]) => Value,
    ) => RebuiltRecord<Keys[number], Value>
  >
>;
type _15c = Expect<
  Equal<ReturnType<typeof givenFromKeys<["a", "b"], number>>, { a: number; b: number }>
>;
type _15d = Expect<Equal<ReturnType<typeof givenFromKeys<[], number>>, {}>>;
type _15e = Expect<
  Equal<
    {
      frozen: ReturnType<typeof givenFreezeShallow<{ a: 1; nested: { b: 2 } }>>;
      innerStillMutable: ReturnType<
        typeof givenFreezeShallow<{ a: 1; nested: { b: 2 } }>
      >["nested"];
    },
    { frozen: { readonly a: 1; readonly nested: { b: 2 } }; innerStillMutable: { b: 2 } }
  >
>;
