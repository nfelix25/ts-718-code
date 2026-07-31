import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-052: indexed access plus mapping — constructions
 * =============================================================================
 *
 * These constructions preserve a mapped iteration key long enough to relate it
 * to its indexed value, then collect the completed rows into unions, registries,
 * tuple views, and inverted lookup tables. They also contrast correlated and
 * loose pairs, optional-table leakage, common and distributed union views,
 * container keys, special types, and static inversion collisions with runtime
 * overwrite behavior. Replace each `TODO` with a type satisfying the assertions
 * directly below it.
 */

declare const givenToken: unique symbol;

interface GivenModel {
  id: number;
  name: string;
  active: boolean;
  tags: readonly string[];
}

interface GivenMixed {
  text: string;
  0: number;
  [givenToken]: boolean;
}

type GivenVariant =
  | { kind: "a"; a: number }
  | { kind: "b"; b: string };

type GivenValueUnion<Source> = Source[keyof Source];
type GivenDescriptorTable<Source> = {
  [Key in keyof Source]-?: { key: Key; value: Source[Key] };
};
type GivenEntries<Source> = {
  [Key in keyof Source]-?: [key: Key, value: Source[Key]];
}[keyof Source];
type GivenLooseEntry<Source> = [
  key: keyof Source,
  value: Source[keyof Source],
];
type GivenDistributedEntries<Union> =
  Union extends unknown ? GivenEntries<Union> : never;
type GivenInvert<Source extends Record<PropertyKey, PropertyKey>> = {
  [Key in keyof Source as Source[Key]]: Key;
};
type GivenIsAny<Value> = 0 extends (1 & Value) ? true : false;

// ─── Correlated values and descriptors ────────────────────────────────────

// 1. Collect the values addressed by every key of the source.
//    { id: number; name: string } → number | string
export type ValueUnion<Source> = TODO; // TODO(koan)

type _01a = Expect<Equal<ValueUnion<GivenModel>, number | string | boolean | readonly string[]>>;
type _01b = Expect<Equal<ValueUnion<{ value?: string }>, string | undefined>>;
type _01c = Expect<Equal<ValueUnion<Record<string, bigint>>, bigint>>;
type _01d = Expect<Equal<ValueUnion<{}>, never>>;

// 2. Collect only the values addressed by a supplied key subset.
export type SelectedValues<
  Source,
  Keys extends keyof Source,
> = TODO; // TODO(koan)

type _02a = Expect<Equal<SelectedValues<GivenModel, "id" | "active">, number | boolean>>;
type _02b = Expect<Equal<SelectedValues<GivenModel, "tags">, readonly string[]>>;
type _02c = Expect<Equal<SelectedValues<GivenMixed, 0 | typeof givenToken>, number | boolean>>;
type _02d = Expect<Equal<SelectedValues<{ only: 1 }, never>, never>>;

// 3. Build one descriptor property for each correlated key and value.
export type DescriptorTable<Source> = TODO; // TODO(koan)

type _03a = Expect<
  Equal<
    DescriptorTable<{ id: number; name: string }>,
    {
      id: { key: "id"; value: number };
      name: { key: "name"; value: string };
    }
  >
>;
type _03b = Expect<
  Equal<
    DescriptorTable<{ readonly value?: string }>,
    { readonly value: { key: "value"; value: string | undefined } }
  >
>;
type _03c = Expect<
  Equal<
    DescriptorTable<GivenMixed>,
    {
      text: { key: "text"; value: string };
      0: { key: 0; value: number };
      [givenToken]: { key: typeof givenToken; value: boolean };
    }
  >
>;
type _03d = Expect<Equal<DescriptorTable<{}>, {}>>;

// 4. Index a completed descriptor table to collect its correlated rows.
export type DescriptorUnion<Source> = TODO; // TODO(koan)

type _04a = Expect<
  Equal<
    DescriptorUnion<{ id: number; name: string }>,
    { key: "id"; value: number } | { key: "name"; value: string }
  >
>;
type _04b = Expect<
  Equal<
    DescriptorUnion<{ value?: string }>,
    { key: "value"; value: string | undefined }
  >
>;
type _04c = Expect<
  Equal<
    DescriptorUnion<GivenMixed>,
    | { key: "text"; value: string }
    | { key: 0; value: number }
    | { key: typeof givenToken; value: boolean }
  >
>;
type _04d = Expect<Equal<DescriptorUnion<{}>, never>>;

// 5. Build a discriminated command union from a payload schema.
export type CommandUnion<Schema> = TODO; // TODO(koan)

type _05a = Expect<
  Equal<
    CommandUnion<{ save: { id: number }; close: undefined }>,
    | { command: "save"; payload: { id: number } }
    | { command: "close"; payload: undefined }
  >
>;
type _05b = Expect<
  Equal<
    Extract<CommandUnion<GivenModel>, { command: "active" }>,
    { command: "active"; payload: boolean }
  >
>;
type _05c = Expect<
  Equal<
    CommandUnion<{ optional?: string }>,
    { command: "optional"; payload: string | undefined }
  >
>;
type _05d = Expect<Equal<CommandUnion<{}>, never>>;

// 6. Build a required mutable handler table whose parameter follows each key.
export type HandlerTable<Schema> = TODO; // TODO(koan)

type _06a = Expect<
  Equal<
    HandlerTable<{ save: { id: number }; close: undefined }>,
    {
      save: (payload: { id: number }) => void;
      close: (payload: undefined) => void;
    }
  >
>;
type _06b = Expect<
  Equal<
    HandlerTable<{ readonly optional?: string }>,
    { optional: (payload: string | undefined) => void }
  >
>;
type _06c = Expect<
  Equal<
    HandlerTable<GivenMixed>[typeof givenToken],
    (payload: boolean) => void
  >
>;
type _06d = Expect<Equal<HandlerTable<{}>, {}>>;

// ─── Map then index, and the loose alternative ────────────────────────────

// 7. Construct a correlated entry tuple union.
export type CorrelatedEntries<Source> = TODO; // TODO(koan)

type _07a = Expect<
  Equal<
    CorrelatedEntries<{ id: number; name: string }>,
    ["id", number] | ["name", string]
  >
>;
type _07b = Expect<
  Equal<
    CorrelatedEntries<{ value?: string }>,
    ["value", string | undefined]
  >
>;
type _07c = Expect<
  Equal<
    CorrelatedEntries<GivenMixed>,
    ["text", string] | [0, number] | [typeof givenToken, boolean]
  >
>;
type _07d = Expect<Equal<CorrelatedEntries<{}>, never>>;
type _07e = Expect<
  Equal<
    CorrelatedEntries<Record<number, boolean>>,
    [number, boolean]
  >
>;

// 8. Leave mapped optionality intact so indexing can reveal its extra leak.
export type LeakyEntries<Source> = TODO; // TODO(koan)

type _08a = Expect<
  Equal<
    LeakyEntries<{ value?: string }>,
    ["value", string | undefined] | undefined
  >
>;
type _08b = Expect<
  Equal<
    LeakyEntries<{ a?: 1; b?: 2 }>,
    ["a", 1 | undefined] | ["b", 2 | undefined] | undefined
  >
>;
type _08c = Expect<
  Equal<
    LeakyEntries<{ required: string | undefined }>,
    ["required", string | undefined]
  >
>;
type _08d = Expect<Equal<LeakyEntries<{}>, never>>;

// 9. Construct the loose Cartesian pair produced by indexing too early.
export type LooseEntry<Source> = TODO; // TODO(koan)

type _09a = Expect<
  Equal<
    LooseEntry<GivenModel>,
    [
      key: keyof GivenModel,
      value: number | string | boolean | readonly string[],
    ]
  >
>;
type _09b = Expect<Equal<LooseEntry<{ only: 1 }>, ["only", 1]>>;
type _09c = Expect<Equal<LooseEntry<GivenMixed>, [keyof GivenMixed, string | number | boolean]>>;
type _09d = Expect<Equal<LooseEntry<{}>, [never, never]>>;

// 10. Report whether a candidate pair passes correlated and loose entry tests.
export type PairingReport<
  Source,
  Candidate extends [PropertyKey, unknown],
> = TODO; // TODO(koan)

type _10a = Expect<Equal<PairingReport<GivenModel, ["id", number]>, [true, true]>>;
type _10b = Expect<Equal<PairingReport<GivenModel, ["id", string]>, [false, true]>>;
type _10c = Expect<Equal<PairingReport<GivenModel, ["active", readonly string[]]>, [false, true]>>;
type _10d = Expect<Equal<PairingReport<GivenModel, ["active", boolean]>, [true, true]>>;
type _10e = Expect<Equal<PairingReport<{}, ["missing", 1]>, [false, false]>>;

// 11. Select correlated entry members by the type in their value slot.
export type EntriesMatching<Source, Value> = TODO; // TODO(koan)

type _11a = Expect<
  Equal<
    EntriesMatching<GivenModel, string | boolean>,
    ["name", string] | ["active", boolean]
  >
>;
type _11b = Expect<
  Equal<
    EntriesMatching<{ a: 1; b: 2; c: 3 }, 1 | 3>,
    ["a", 1] | ["c", 3]
  >
>;
type _11c = Expect<
  Equal<
    EntriesMatching<{ maybe?: string; exact: string | undefined }, string>,
    never
  >
>;
type _11d = Expect<Equal<EntriesMatching<{}, unknown>, never>>;

// ─── Object unions and containers ─────────────────────────────────────────

// 12. Construct entries available through the keys common to every union arm.
export type CommonUnionEntries<Union> = TODO; // TODO(koan)

type _12a = Expect<
  Equal<
    CommonUnionEntries<GivenVariant>,
    ["kind", "a"] | ["kind", "b"]
  >
>;
type _12b = Expect<
  Equal<CommonUnionEntries<{ a: 1 } | { b: 2 }>, never>
>;
type _12c = Expect<
  Equal<
    CommonUnionEntries<{ shared: 1; a: "a" } | { shared: 2; b: "b" }>,
    ["shared", 1] | ["shared", 2]
  >
>;
type _12d = Expect<Equal<CommonUnionEntries<never>, never>>;

// 13. Distribute first so every union arm contributes all of its own entries.
export type DistributedEntries<Union> = TODO; // TODO(koan)

type _13a = Expect<
  Equal<
    DistributedEntries<GivenVariant>,
    | ["kind", "a"]
    | ["a", number]
    | ["kind", "b"]
    | ["b", string]
  >
>;
type _13b = Expect<
  Equal<
    DistributedEntries<{ a: 1 } | { b: 2 }>,
    ["a", 1] | ["b", 2]
  >
>;
type _13c = Expect<
  Equal<
    DistributedEntries<{ shared: 1; a: "a" } | { shared: 2; b: "b" }>,
    ["shared", 1] | ["a", "a"] | ["shared", 2] | ["b", "b"]
  >
>;
type _13d = Expect<Equal<DistributedEntries<never>, never>>;

// 14. Collect all values from every union arm instead of only common keys.
export type DistributedValues<Union> = TODO; // TODO(koan)

type _14a = Expect<
  Equal<DistributedValues<GivenVariant>, "a" | "b" | number | string>
>;
type _14b = Expect<Equal<DistributedValues<{ a: 1 } | { b: 2 }>, 1 | 2>>;
type _14c = Expect<
  Equal<
    DistributedValues<{ shared: true; a: Date } | { shared: false; b: bigint }>,
    boolean | Date | bigint
  >
>;
type _14d = Expect<Equal<DistributedValues<never>, never>>;

// 15. Build entries only for a tuple's finite positional keys.
type GivenTupleIndices<Tuple extends readonly unknown[]> =
  Exclude<keyof Tuple, keyof any[]>;

export type TupleEntries<Tuple extends readonly unknown[]> = TODO; // TODO(koan)

type _15a = Expect<
  Equal<TupleEntries<readonly ["a", 1]>, ["0", "a"] | ["1", 1]>
>;
type _15b = Expect<Equal<TupleEntries<[boolean]>, ["0", boolean]>>;
type _15c = Expect<
  Equal<
    TupleEntries<readonly [{ deep: { id: 1 } }, readonly string[]]>,
    ["0", { deep: { id: 1 } }] | ["1", readonly string[]]
  >
>;
type _15d = Expect<Equal<TupleEntries<readonly []>, never>>;

// 16. Construct an entry for an array's broad numeric element index.
export type ArrayElementEntry<ArrayType extends readonly unknown[]> = TODO; // TODO(koan)

type _16a = Expect<Equal<ArrayElementEntry<string[]>, [number, string]>>;
type _16b = Expect<
  Equal<ArrayElementEntry<readonly ["a", 1]>, [number, "a" | 1]>
>;
type _16c = Expect<
  Equal<ArrayElementEntry<readonly { id: number }[]>, [number, { id: number }]>
>;
type _16d = Expect<Equal<ArrayElementEntry<readonly []>, [number, never]>>;

// 17. Classify value and entry results for empty, top, bottom, and any sources.
export type SpecialMapIndexProfile<Source> = TODO; // TODO(koan)

type _17a = Expect<
  Equal<SpecialMapIndexProfile<{}>, [false, false]>
>;
type _17b = Expect<
  Equal<SpecialMapIndexProfile<unknown>, [false, false]>
>;
type _17c = Expect<
  Equal<SpecialMapIndexProfile<never>, [false, false]>
>;
type _17d = Expect<
  Equal<SpecialMapIndexProfile<any>, [true, false]>
>;

// ─── Value-driven remapping and inversion ─────────────────────────────────

// 18. Invert a PropertyKey-valued lookup table.
export type InvertLookup<
  Source extends Record<PropertyKey, PropertyKey>,
> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<
    InvertLookup<{ ready: 200; missing: 404; moved: 301 }>,
    { 200: "ready"; 404: "missing"; 301: "moved" }
  >
>;
type _18b = Expect<
  Equal<InvertLookup<{ first: "same"; second: "same" }>, { same: "first" | "second" }>
>;
type _18c = Expect<
  Equal<InvertLookup<{ token: typeof givenToken; text: "token" }>, {
    [givenToken]: "token";
    token: "text";
  }>
>;
type _18d = Expect<
  Equal<InvertLookup<Record<string, number>>, Record<number, string>>
>;
type _18e = Expect<Equal<InvertLookup<{}>, {}>>;

// 19. Describe the static and runtime contracts at one inverted destination.
export type InversionCollisionContract<
  Source extends Record<PropertyKey, PropertyKey>,
  Destination extends keyof GivenInvert<Source>,
> = TODO; // TODO(koan)

type _19a = Expect<
  Equal<
    InversionCollisionContract<{ first: "same"; second: "same" }, "same">,
    {
      staticSources: "first" | "second";
      runtimePolicy: "last-write-wins";
    }
  >
>;
type _19b = Expect<
  Equal<
    InversionCollisionContract<{ ready: 200; missing: 404 }, 404>,
    { staticSources: "missing"; runtimePolicy: "last-write-wins" }
  >
>;
type _19c = Expect<
  Equal<
    InversionCollisionContract<{ a: "x"; b: "y"; c: "x" }, "x" | "y">,
    { staticSources: "a" | "b" | "c"; runtimePolicy: "last-write-wins" }
  >
>;
type _19d = Expect<
  Equal<
    InversionCollisionContract<{ token: typeof givenToken }, typeof givenToken>,
    { staticSources: "token"; runtimePolicy: "last-write-wins" }
  >
>;

// 20. Safely invert only source properties whose values can be property keys.
export type SafeInvert<Source> = TODO; // TODO(koan)

type _20a = Expect<
  Equal<
    SafeInvert<{ ok: "ready"; bad: { nested: true }; count: 2 }>,
    { ready: "ok"; 2: "count" }
  >
>;
type _20b = Expect<
  Equal<
    SafeInvert<{ first: "same"; second: "same"; nope: null }>,
    { same: "first" | "second" }
  >
>;
type _20c = Expect<
  Equal<
    SafeInvert<{ token: typeof givenToken; maybe?: "optional" }>,
    { [givenToken]: "token" }
  >
>;
type _20d = Expect<Equal<SafeInvert<{}>, {}>>;

// 21. Reindex values while retaining source and destination information.
export type DestinationDescriptors<
  Source extends Record<PropertyKey, PropertyKey>,
> = TODO; // TODO(koan)

type _21a = Expect<
  Equal<
    DestinationDescriptors<{ ok: 200; missing: 404 }>,
    {
      200: { source: "ok"; destination: 200 };
      404: { source: "missing"; destination: 404 };
    }
  >
>;
type _21b = Expect<
  Equal<
    DestinationDescriptors<{ first: "same"; second: "same" }>,
    {
      same: {
        source: "first" | "second";
        destination: "same";
      };
    }
  >
>;
type _21c = Expect<
  Equal<
    DestinationDescriptors<{ token: typeof givenToken }>,
    {
      [givenToken]: {
        source: "token";
        destination: typeof givenToken;
      };
    }
  >
>;
type _21d = Expect<Equal<DestinationDescriptors<{}>, {}>>;
