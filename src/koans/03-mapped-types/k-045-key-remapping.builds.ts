import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-045: key remapping — constructions
 * =============================================================================
 *
 * These constructions keep the iterated source key, emitted destination key,
 * and source-derived value type visibly separate. They cover identity and
 * conditional renames, lookup tables, string/number/symbol destinations, union
 * expansion, collisions and modifier provenance, structured event unions,
 * broad and empty outputs, composition, and invalid destination boundaries.
 * Replace each `TODO` with a type satisfying the assertions directly below it.
 */

interface GivenSource {
  id: number;
  name: string;
  active: boolean;
}

interface GivenModified {
  readonly id: number;
  name?: string;
  active: boolean;
}

declare const givenIdKey: unique symbol;
declare const givenNameKey: unique symbol;
declare const givenActiveKey: unique symbol;
declare const givenEventKey: unique symbol;
declare const givenExtraKey: unique symbol;

type GivenRenameId<Source> = {
  [Key in keyof Source as Key extends "id" ? "key" : Key]: Source[Key];
};

type GivenIdentityRemap<Source> = {
  [Key in keyof Source as Key]: Source[Key];
};

type GivenIsAny<Value> = 0 extends (1 & Value) ? true : false;

// ─── Identity, conditional, and lookup renames ─────────────────────────────

// 1. Re-emit every property under its original key.
export type IdentityRemap<Source> = TODO; // TODO(koan)

type _01a = Expect<Equal<IdentityRemap<GivenSource>, GivenSource>>;
type _01b = Expect<Equal<IdentityRemap<GivenModified>, GivenModified>>;
type _01c = Expect<Equal<IdentityRemap<{}>, {}>>;
type _01d = Expect<Equal<IdentityRemap<unknown>, {}>>;
type _01e = Expect<Equal<IdentityRemap<never>, never>>;

// 2. Remove readonly while performing an identity remap.
export type MutableIdentityRemap<Source> = TODO; // TODO(koan)

type _02a = Expect<
  Equal<
    MutableIdentityRemap<GivenModified>,
    { id: number; name?: string; active: boolean }
  >
>;
type _02b = Expect<
  Equal<MutableIdentityRemap<{ readonly value: 1 }>, { value: 1 }>
>;
type _02c = Expect<
  Equal<MutableIdentityRemap<{ value?: string }>, { value?: string }>
>;
type _02d = Expect<Equal<MutableIdentityRemap<{}>, {}>>;

// 3. Rename only `id` to `key`, preserving every source value and modifier.
export type RenameId<Source> = TODO; // TODO(koan)

type _03a = Expect<
  Equal<
    RenameId<GivenSource>,
    { key: number; name: string; active: boolean }
  >
>;
type _03b = Expect<Equal<RenameId<{ id?: number }>, { key?: number }>>;
type _03c = Expect<
  Equal<
    RenameId<{ readonly id: 1; other: true }>,
    { readonly key: 1; other: true }
  >
>;
type _03d = Expect<Equal<RenameId<{}>, {}>>;

// 4. Rename `id` to `key` and `name` to `label` in one conditional remap.
export type RenameTwo<Source> = TODO; // TODO(koan)

type _04a = Expect<
  Equal<
    RenameTwo<GivenSource>,
    { key: number; label: string; active: boolean }
  >
>;
type _04b = Expect<
  Equal<RenameTwo<{ id: 1; name: "Ada" }>, { key: 1; label: "Ada" }>
>;
type _04c = Expect<
  Equal<
    RenameTwo<{ first: string; readonly name?: string }>,
    { first: string; readonly label?: string }
  >
>;
type _04d = Expect<Equal<RenameTwo<{}>, {}>>;

// 5. Use a complete lookup object to choose each destination PropertyKey.
export type LookupRename<
  Source,
  Names extends { [Key in keyof Source]-?: PropertyKey },
> = TODO; // TODO(koan)

type _05a = Expect<
  Equal<
    LookupRename<
      GivenSource,
      { id: "identifier"; name: "displayName"; active: "enabled" }
    >,
    { identifier: number; displayName: string; enabled: boolean }
  >
>;
type _05b = Expect<
  Equal<
    LookupRename<GivenSource, { id: 0; name: 1; active: 2 }>,
    { 0: number; 1: string; 2: boolean }
  >
>;
type _05c = Expect<
  Equal<
    LookupRename<
      GivenSource,
      {
        id: typeof givenIdKey;
        name: typeof givenNameKey;
        active: typeof givenActiveKey;
      }
    >,
    {
      [givenIdKey]: number;
      [givenNameKey]: string;
      [givenActiveKey]: boolean;
    }
  >
>;
type _05d = Expect<
  Equal<
    LookupRename<
      { readonly id: 1; name?: string },
      { id: "identifier"; name: "label" }
    >,
    { readonly identifier: 1; label?: string }
  >
>;
type _05e = Expect<Equal<LookupRename<{}, {}>, {}>>;

// 6. Swap `x` and `y` destinations while leaving other keys untouched.
export type SwapCoordinates<Source> = TODO; // TODO(koan)

type _06a = Expect<
  Equal<SwapCoordinates<{ x: number; y: number }>, { y: number; x: number }>
>;
type _06b = Expect<
  Equal<
    SwapCoordinates<{ x: "left"; y: "right"; z: boolean }>,
    { y: "left"; x: "right"; z: boolean }
  >
>;
type _06c = Expect<
  Equal<
    SwapCoordinates<{ readonly x?: 1; y: 2 }>,
    { readonly y?: 1; x: 2 }
  >
>;
type _06d = Expect<Equal<SwapCoordinates<{}>, {}>>;

// ─── Union destinations and collisions ─────────────────────────────────────

// 7. Emit each source property under both its own key and a shared key.
export type DuplicateDestinations<
  Source,
  Shared extends PropertyKey,
> = TODO; // TODO(koan)

type _07a = Expect<
  Equal<
    DuplicateDestinations<GivenSource, "all">,
    {
      id: number;
      name: string;
      active: boolean;
      all: number | string | boolean;
    }
  >
>;
type _07b = Expect<
  Equal<DuplicateDestinations<GivenSource, "all">["id"], number>
>;
type _07c = Expect<
  Equal<
    DuplicateDestinations<{ a: 1; b: 2 }, 0>,
    { a: 1; b: 2; 0: 1 | 2 }
  >
>;
type _07d = Expect<
  Equal<
    DuplicateDestinations<{ a: string; b: number }, typeof givenExtraKey>[
      typeof givenExtraKey
    ],
    string | number
  >
>;
type _07e = Expect<Equal<DuplicateDestinations<{}, "all">, {}>>;

// 8. Duplicate each property while pairing every emitted value with its source
//    key, so the shared destination retains provenance.
export type DuplicateWithSource<
  Source,
  Shared extends PropertyKey,
> = TODO; // TODO(koan)

type _08a = Expect<
  Equal<
    DuplicateWithSource<{ id: number; name: string }, "original">["original"],
    [source: "id" | "name", value: number | string]
  >
>;
type _08b = Expect<
  Equal<
    DuplicateWithSource<{ id: number; name: string }, "original">["id"],
    [source: "id", value: number]
  >
>;
type _08c = Expect<
  Equal<
    DuplicateWithSource<{ a: 1; b: 2; c: 3 }, 0>[0],
    [source: "a" | "b" | "c", value: 1 | 2 | 3]
  >
>;
type _08d = Expect<Equal<DuplicateWithSource<{}, "original">, {}>>;

// 9. Collapse every source property onto one destination key.
export type CollapseKeys<
  Source,
  Destination extends PropertyKey,
> = TODO; // TODO(koan)

type _09a = Expect<
  Equal<
    CollapseKeys<GivenSource, "value">,
    { value: number | string | boolean }
  >
>;
type _09b = Expect<
  Equal<
    CollapseKeys<GivenModified, "value">,
    { readonly value: number | string | boolean | undefined }
  >
>;
type _09c = Expect<
  Equal<
    CollapseKeys<{ a?: string; b?: number }, "value">,
    { value?: string | number }
  >
>;
type _09d = Expect<
  Equal<CollapseKeys<{ a: 1; b: 2 }, 0>, { 0: 1 | 2 }>
>;
type _09e = Expect<Equal<CollapseKeys<{}, "value">, {}>>;

// 10. Force a collision destination to be required while preserving readonly
//     provenance and the complete value union.
export type RequiredCollapse<
  Source,
  Destination extends PropertyKey,
> = TODO; // TODO(koan)

type _10a = Expect<
  Equal<
    RequiredCollapse<GivenModified, "value">,
    { readonly value: number | string | boolean | undefined }
  >
>;
type _10b = Expect<
  Equal<RequiredCollapse<{ a?: string }, "value">, { value: string }>
>;
type _10c = Expect<
  Equal<RequiredCollapse<{ a?: string; b: number }, 0>, { 0: string | number }>
>;
type _10d = Expect<Equal<RequiredCollapse<{}, "value">, {}>>;

// 11. Collapse selected keys while leaving every other destination unchanged.
export type PartialCollision<
  Source,
  Selected extends keyof Source,
  Destination extends PropertyKey,
> = TODO; // TODO(koan)

type _11a = Expect<
  Equal<
    PartialCollision<GivenSource, "id" | "name", "identity">,
    { identity: number | string; active: boolean }
  >
>;
type _11b = Expect<
  Equal<
    PartialCollision<GivenModified, "id" | "name", "identity">,
    {
      readonly identity: number | string | undefined;
      active: boolean;
    }
  >
>;
type _11c = Expect<
  Equal<
    PartialCollision<GivenSource, "id", "key">,
    { key: number; name: string; active: boolean }
  >
>;
type _11d = Expect<
  Equal<
    PartialCollision<{ a: 1; b: 2; c: 3 }, "a" | "c", 0>,
    { 0: 1 | 3; b: 2 }
  >
>;
type _11e = Expect<
  Equal<PartialCollision<{}, never, "value">, {}>
>;

// ─── Broad and empty destination domains ───────────────────────────────────

// 12. Send every source key to the broad string domain.
export type BroadStringRemap<Source> = TODO; // TODO(koan)

type _12a = Expect<
  Equal<
    BroadStringRemap<GivenSource>,
    { [key: string]: number | string | boolean }
  >
>;
type _12b = Expect<
  Equal<BroadStringRemap<{ a: 1; b: 2 }>[string], 1 | 2>
>;
type _12c = Expect<
  Equal<keyof BroadStringRemap<{ a: 1 }>, string | number>
>;
type _12d = Expect<Equal<BroadStringRemap<{}>, {}>>;

// 13. Send every source key to the broad number domain.
export type BroadNumberRemap<Source> = TODO; // TODO(koan)

type _13a = Expect<
  Equal<
    BroadNumberRemap<GivenSource>,
    { [key: number]: number | string | boolean }
  >
>;
type _13b = Expect<
  Equal<BroadNumberRemap<{ a: 1; b: 2 }>[number], 1 | 2>
>;
type _13c = Expect<
  Equal<keyof BroadNumberRemap<{ a: 1 }>, number>
>;
type _13d = Expect<Equal<BroadNumberRemap<{}>, {}>>;

// 14. Emit no property by remapping every source key to never.
export type RemoveAllKeys<Source> = TODO; // TODO(koan)

type _14a = Expect<Equal<RemoveAllKeys<GivenSource>, {}>>;
type _14b = Expect<Equal<keyof RemoveAllKeys<GivenSource>, never>>;
type _14c = Expect<Equal<RemoveAllKeys<{}>, {}>>;
type _14d = Expect<Equal<RemoveAllKeys<never>, never>>;

// ─── Structured union members as mapping inputs ────────────────────────────

// 15. Index event handlers by each union member's discriminator.
export type EventHandlers<Events extends { type: PropertyKey }> = TODO; // TODO(koan)

type _15a = Expect<
  Equal<
    EventHandlers<
      { type: "open"; id: string } | { type: "close"; code: number }
    >,
    {
      open: (event: { type: "open"; id: string }) => void;
      close: (event: { type: "close"; code: number }) => void;
    }
  >
>;
type _15b = Expect<
  Equal<
    keyof EventHandlers<
      { type: 200; body: string } | { type: 404; missing: true }
    >,
    200 | 404
  >
>;
type _15c = Expect<
  Equal<
    Parameters<
      EventHandlers<
        | { type: typeof givenEventKey; value: number }
        | { type: "text"; value: string }
      >[typeof givenEventKey]
    >,
    [event: { type: typeof givenEventKey; value: number }]
  >
>;
type _15d = Expect<
  Equal<
    EventHandlers<
      | { type: "data"; text: string }
      | { type: "data"; bytes: Uint8Array }
      | { type: "end" }
    >["data"],
    (event:
      | { type: "data"; text: string }
      | { type: "data"; bytes: Uint8Array }) => void
  >
>;
type _15e = Expect<Equal<EventHandlers<never>, {}>>;

// 16. Index each event's complete payload by its discriminator.
export type EventPayloads<Events extends { type: PropertyKey }> = TODO; // TODO(koan)

type _16a = Expect<
  Equal<
    EventPayloads<
      { type: "open"; id: string } | { type: "close"; code: number }
    >["open"],
    { type: "open"; id: string }
  >
>;
type _16b = Expect<
  Equal<
    EventPayloads<
      | { type: "data"; text: string }
      | { type: "data"; bytes: Uint8Array }
      | { type: "end" }
    >["data"],
    { type: "data"; text: string } | { type: "data"; bytes: Uint8Array }
  >
>;
type _16c = Expect<
  Equal<
    keyof EventPayloads<
      { type: 0; value: string } | { type: typeof givenEventKey; value: number }
    >,
    0 | typeof givenEventKey
  >
>;
type _16d = Expect<Equal<EventPayloads<never>, {}>>;

// ─── Mixed keys, composition, and validation boundaries ───────────────────

// 17. Expand every source property to its own key and every supplied extra key.
export type MixedExpansion<
  Source,
  Extra extends PropertyKey,
> = TODO; // TODO(koan)

type _17a = Expect<
  Equal<
    MixedExpansion<{ a: string; b: number }, 0 | typeof givenExtraKey>,
    {
      a: string;
      b: number;
      0: string | number;
      [givenExtraKey]: string | number;
    }
  >
>;
type _17b = Expect<
  Equal<MixedExpansion<{ a: 1; b: 2 }, 0>[0], 1 | 2>
>;
type _17c = Expect<
  Equal<
    MixedExpansion<{ a: 1; b: 2 }, typeof givenExtraKey>[
      typeof givenExtraKey
    ],
    1 | 2
  >
>;
type _17d = Expect<Equal<MixedExpansion<{}, 0>, {}>>;

// 18. Emit one source member under a symbol and the other under numeric zero.
export type MixedDestinationMap<SymbolKey extends symbol> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<
    MixedDestinationMap<typeof givenExtraKey>,
    { [givenExtraKey]: "text"; 0: "count" }
  >
>;
type _18b = Expect<
  Equal<keyof MixedDestinationMap<typeof givenExtraKey>, typeof givenExtraKey | 0>
>;
type _18c = Expect<
  Equal<MixedDestinationMap<typeof givenExtraKey>[typeof givenExtraKey], "text">
>;
type _18d = Expect<
  Equal<MixedDestinationMap<typeof givenExtraKey>[0], "count">
>;

// 19. Apply an identity remap to the result of renaming `id`.
export type IdentityAfterIdRename<Source> = TODO; // TODO(koan)

type _19a = Expect<
  Equal<
    IdentityAfterIdRename<GivenSource>,
    { key: number; name: string; active: boolean }
  >
>;
type _19b = Expect<
  Equal<IdentityAfterIdRename<{ id?: number }>, { key?: number }>
>;
type _19c = Expect<
  Equal<
    IdentityAfterIdRename<{ readonly id: 1; value: true }>,
    { readonly key: 1; value: true }
  >
>;
type _19d = Expect<Equal<IdentityAfterIdRename<{}>, {}>>;

// 20. Decide whether an entire proposed destination type is a valid
//     PropertyKey domain.
export type DestinationAllowed<Destination> = TODO; // TODO(koan)

type _20a = Expect<Equal<DestinationAllowed<"name">, true>>;
type _20b = Expect<
  Equal<DestinationAllowed<string | number | symbol>, true>
>;
type _20c = Expect<Equal<DestinationAllowed<{ source: "id" }>, false>>;
type _20d = Expect<
  Equal<DestinationAllowed<"ok" | { source: "id" }>, false>
>;
type _20e = Expect<Equal<DestinationAllowed<never>, true>>;

// 21. Characterize identity remapping of special inputs without making any
//     intended result itself `any`.
export type SpecialIdentityProfile<Input> = TODO; // TODO(koan)

type _21a = Expect<
  Equal<
    SpecialIdentityProfile<any>,
    [
      resultIsAny: false,
      keys: string | number,
      stringValueIsAny: true,
      numberValueIsAny: true,
    ]
  >
>;
type _21b = Expect<
  Equal<
    SpecialIdentityProfile<unknown>,
    [
      resultIsAny: false,
      keys: never,
      stringValueIsAny: false,
      numberValueIsAny: false,
    ]
  >
>;
type _21c = Expect<
  Equal<
    SpecialIdentityProfile<never>,
    [
      resultIsAny: false,
      keys: string | number | symbol,
      stringValueIsAny: false,
      numberValueIsAny: false,
    ]
  >
>;
type _21d = Expect<
  Equal<
    SpecialIdentityProfile<{ id: number }>,
    [
      resultIsAny: false,
      keys: "id",
      stringValueIsAny: false,
      numberValueIsAny: false,
    ]
  >
>;
