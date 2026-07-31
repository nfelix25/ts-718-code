import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-047: template literal keys — constructions
 * =============================================================================
 *
 * These constructions compute destination names from string, number, bigint,
 * boolean, and nullish fragments while continuing to read values from original
 * source keys. They cover prefixes, suffixes, casing, union cross-products,
 * normalization collisions, mixed PropertyKey policy, modifiers, broad pattern
 * domains, tuple infrastructure, special sources, composition, and invalid
 * symbol interpolation. Replace each `TODO` with a type satisfying the
 * assertions directly below it.
 */

declare const givenSymbol: unique symbol;

type GivenPrefix<Source, Prefix extends string> = {
  [Key in keyof Source as
    Key extends string
      ? `${Prefix}${Capitalize<Key>}`
      : never]: Source[Key];
};

type GivenSuffix<Source, Suffix extends string> = {
  [Key in keyof Source as
    Key extends string ? `${Key}${Suffix}` : never]: Source[Key];
};

type GivenIsAny<Value> = 0 extends (1 & Value) ? true : false;
type GivenIsNever<Value> = [Value] extends [never] ? true : false;

// ─── Finite string-key transformations ─────────────────────────────────────

// 1. Prefix and capitalize every string source key.
export type PrefixKeys<
  Source,
  Prefix extends string,
> = TODO; // TODO(koan)

type _01a = Expect<
  Equal<
    PrefixKeys<{ name: string; active: boolean; count: number }, "api">,
    { apiName: string; apiActive: boolean; apiCount: number }
  >
>;
type _01b = Expect<
  Equal<
    PrefixKeys<{ "": 1; URL: string; user_id: boolean }, "get">,
    { get: 1; getURL: string; getUser_id: boolean }
  >
>;
type _01c = Expect<
  Equal<
    PrefixKeys<{ x: 1; y: 2 }, "a" | "b">,
    { aX: 1; bX: 1; aY: 2; bY: 2 }
  >
>;
type _01d = Expect<
  Equal<
    PrefixKeys<{ readonly id: number; label?: string }, "get">,
    { readonly getId: number; getLabel?: string }
  >
>;
type _01e = Expect<Equal<PrefixKeys<{}, "get">, {}>>;

// 2. Append a suffix to every string source key.
export type SuffixKeys<
  Source,
  Suffix extends string,
> = TODO; // TODO(koan)

type _02a = Expect<
  Equal<
    SuffixKeys<{ name: string; active: boolean }, "Changed">,
    { nameChanged: string; activeChanged: boolean }
  >
>;
type _02b = Expect<
  Equal<
    SuffixKeys<{ x: 1 }, "A" | "B">,
    { xA: 1; xB: 1 }
  >
>;
type _02c = Expect<
  Equal<SuffixKeys<{ "": 1 }, "end">, { end: 1 }>
>;
type _02d = Expect<
  Equal<
    SuffixKeys<{ readonly id?: number }, "Value">,
    { readonly idValue?: number }
  >
>;
type _02e = Expect<Equal<SuffixKeys<{ x: 1 }, never>, {}>>;

// 3. Wrap every string source key between independently varying fragments.
export type WrappedKeys<
  Source,
  Prefix extends string,
  Suffix extends string,
> = TODO; // TODO(koan)

type _03a = Expect<
  Equal<WrappedKeys<{ id: number }, "[", "]">, { "[id]": number }>
>;
type _03b = Expect<
  Equal<
    keyof WrappedKeys<{ x: 1; y: 2 }, "(" | "[", ")" | "]">,
    "(x)" | "(x]" | "[x)" | "[x]" | "(y)" | "(y]" | "[y)" | "[y]"
  >
>;
type _03c = Expect<
  Equal<WrappedKeys<{ id: number }, "", "">, { id: number }>
>;
type _03d = Expect<Equal<WrappedKeys<{}, "[", "]">, {}>>;

// 4. Construct all four intrinsic casing results for a text union.
export type CasingResults<Text extends string> = TODO; // TODO(koan)

type _04a = Expect<
  Equal<
    CasingResults<"name">,
    [upper: "NAME", lower: "name", capital: "Name", uncapital: "name"]
  >
>;
type _04b = Expect<
  Equal<
    CasingResults<"URL">,
    [upper: "URL", lower: "url", capital: "URL", uncapital: "uRL"]
  >
>;
type _04c = Expect<
  Equal<
    CasingResults<"first-name" | "_private">,
    [
      upper: "FIRST-NAME" | "_PRIVATE",
      lower: "first-name" | "_private",
      capital: "First-name" | "_private",
      uncapital: "first-name" | "_private",
    ]
  >
>;
type _04d = Expect<
  Equal<CasingResults<"">, [upper: "", lower: "", capital: "", uncapital: ""]>
>;

// ─── Union cross-products and normalization collisions ─────────────────────

// 5. Form the complete union cross-product of prefix, stem, and suffix.
export type CrossProductKeys<
  Stem extends string,
  Prefix extends string,
  Suffix extends string,
> = TODO; // TODO(koan)

type _05a = Expect<
  Equal<
    CrossProductKeys<"file" | "user", "read" | "write", "">,
    "readFile" | "readUser" | "writeFile" | "writeUser"
  >
>;
type _05b = Expect<
  Equal<
    CrossProductKeys<"x" | "y", "a-" | "b-", "-1" | "-2">,
    | "a-X-1"
    | "a-X-2"
    | "a-Y-1"
    | "a-Y-2"
    | "b-X-1"
    | "b-X-2"
    | "b-Y-1"
    | "b-Y-2"
  >
>;
type _05c = Expect<
  Equal<CrossProductKeys<"", "pre", "post">, "prepost">
>;
type _05d = Expect<Equal<CrossProductKeys<never, "a", "b">, never>>;
type _05e = Expect<
  Equal<CrossProductKeys<"x", never, "b">, never>
>;

// 6. Emit boolean permissions for every action/resource cross-product.
export type PermissionMap<
  Resource extends string,
  Action extends string,
> = TODO; // TODO(koan)

type _06a = Expect<
  Equal<
    PermissionMap<"file" | "user", "read" | "write">,
    {
      readFile: boolean;
      writeFile: boolean;
      readUser: boolean;
      writeUser: boolean;
    }
  >
>;
type _06b = Expect<
  Equal<PermissionMap<"report", "view">, { viewReport: boolean }>
>;
type _06c = Expect<
  Equal<keyof PermissionMap<"x" | "y", "a" | "b">, "aX" | "bX" | "aY" | "bY">
>;
type _06d = Expect<Equal<PermissionMap<never, "read">, {}>>;

// 7. Build both Capitalize- and Uppercase-normalized maps to expose collisions.
export type NormalizedKeyMaps<Keys extends string> = TODO; // TODO(koan)

type _07a = Expect<
  Equal<
    NormalizedKeyMaps<"name" | "Name">[0],
    { Name: "name" | "Name" }
  >
>;
type _07b = Expect<
  Equal<
    NormalizedKeyMaps<"id" | "ID">[1],
    { ID: "id" | "ID" }
  >
>;
type _07c = Expect<
  Equal<
    NormalizedKeyMaps<"first" | "last">,
    [
      capitalized: { First: "first"; Last: "last" },
      uppercased: { FIRST: "first"; LAST: "last" },
    ]
  >
>;
type _07d = Expect<
  Equal<
    NormalizedKeyMaps<"">,
    [capitalized: { "": "" }, uppercased: { "": "" }]
  >
>;
type _07e = Expect<
  Equal<keyof NormalizedKeyMaps<never>[0 | 1], never>
>;

// ─── Non-string fragments and PropertyKey policy ───────────────────────────

// 8. Convert string and number keys to strings while filtering symbols.
export type StringifyKeys<Source> = TODO; // TODO(koan)

type _08a = Expect<
  Equal<
    StringifyKeys<{
      text: string;
      0: number;
      7: boolean;
      [givenSymbol]: Date;
    }>,
    { text: string; "0": number; "7": boolean }
  >
>;
type _08b = Expect<
  Equal<StringifyKeys<Record<number, string>>, { [key: `${number}`]: string }>
>;
type _08c = Expect<
  Equal<keyof StringifyKeys<Record<number, string>>, `${number}`>
>;
type _08d = Expect<
  Equal<StringifyKeys<Record<symbol, Date>>, {}>
>;
type _08e = Expect<Equal<StringifyKeys<{}>, {}>>;

// 9. Prefix every string or number key with `data-`, filtering symbols.
export type DataKeys<Source> = TODO; // TODO(koan)

type _09a = Expect<
  Equal<
    DataKeys<{ userId: number; active: boolean }>,
    { "data-userId": number; "data-active": boolean }
  >
>;
type _09b = Expect<
  Equal<
    DataKeys<{ title: string; 0: number; [givenSymbol]: boolean }>,
    { "data-title": string; "data-0": number }
  >
>;
type _09c = Expect<
  Equal<
    DataKeys<Record<number, boolean>>,
    { [key: `data-${number}`]: boolean }
  >
>;
type _09d = Expect<Equal<DataKeys<{}>, {}>>;

// 10. Turn finite or broad numeric inputs into `slot-N` properties.
export type NumericSlotMap<Keys extends number> = TODO; // TODO(koan)

type _10a = Expect<
  Equal<NumericSlotMap<1 | 2>, { "slot-1": 1; "slot-2": 2 }>
>;
type _10b = Expect<
  Equal<keyof NumericSlotMap<number>, `slot-${number}`>
>;
type _10c = Expect<
  Equal<NumericSlotMap<number>[`slot-${number}`], number>
>;
type _10d = Expect<Equal<NumericSlotMap<never>, {}>>;

// 11. Interpolate a permitted non-symbol fragment into a key.
export type FragmentKeyMap<
  Fragment extends string | number | bigint | boolean | null | undefined,
> = TODO; // TODO(koan)

type _11a = Expect<
  Equal<FragmentKeyMap<boolean>, { true: "value"; false: "value" }>
>;
type _11b = Expect<
  Equal<
    FragmentKeyMap<null | undefined>,
    { null: "value"; undefined: "value" }
  >
>;
type _11c = Expect<
  Equal<keyof FragmentKeyMap<bigint>, `${bigint}`>
>;
type _11d = Expect<
  Equal<keyof FragmentKeyMap<number>, `${number}`>
>;

// 12. Prefix string keys while preserving number and symbol keys unchanged.
export type PreserveNonStringKeys<
  Source,
  Prefix extends string,
> = TODO; // TODO(koan)

type _12a = Expect<
  Equal<
    PreserveNonStringKeys<
      { title: string; 0: number; [givenSymbol]: boolean },
      "get"
    >,
    { getTitle: string; 0: number; [givenSymbol]: boolean }
  >
>;
type _12b = Expect<
  Equal<
    keyof PreserveNonStringKeys<
      { text: string; 7: boolean; [givenSymbol]: Date },
      "api"
    >,
    "apiText" | 7 | typeof givenSymbol
  >
>;
type _12c = Expect<
  Equal<
    PreserveNonStringKeys<{ readonly id?: number }, "get">,
    { readonly getId?: number }
  >
>;
type _12d = Expect<Equal<PreserveNonStringKeys<{}, "get">, {}>>;

// ─── Modifiers and composition ─────────────────────────────────────────────

// 13. Prefix string keys and remove readonly from every survivor.
export type MutablePrefixKeys<
  Source,
  Prefix extends string,
> = TODO; // TODO(koan)

type _13a = Expect<
  Equal<
    MutablePrefixKeys<{ readonly id: number; label?: string }, "get">,
    { getId: number; getLabel?: string }
  >
>;
type _13b = Expect<
  Equal<MutablePrefixKeys<{ readonly value: 1 }, "">, { Value: 1 }>
>;
type _13c = Expect<
  Equal<MutablePrefixKeys<{ name?: string }, "api">, { apiName?: string }>
>;
type _13d = Expect<Equal<MutablePrefixKeys<{}, "get">, {}>>;

// 14. Prefix string keys and require every surviving property.
export type RequiredPrefixKeys<
  Source,
  Prefix extends string,
> = TODO; // TODO(koan)

type _14a = Expect<
  Equal<
    RequiredPrefixKeys<{ readonly id: number; label?: string }, "get">,
    { readonly getId: number; getLabel: string }
  >
>;
type _14b = Expect<
  Equal<
    RequiredPrefixKeys<{ label?: string | undefined }, "get">,
    { getLabel: string | undefined }
  >
>;
type _14c = Expect<
  Equal<RequiredPrefixKeys<{ value: never }, "is">, { isValue: never }>
>;
type _14d = Expect<Equal<RequiredPrefixKeys<{}, "get">, {}>>;

// 15. Construct both orders of a prefix-plus-suffix composition.
export type PrefixSuffixComposition<
  Source,
  Prefix extends string,
  Suffix extends string,
> = TODO; // TODO(koan)

type _15a = Expect<
  Equal<
    PrefixSuffixComposition<{ name: string }, "get", "Value">,
    [
      prefixAfterSuffix: { getNameValue: string },
      suffixAfterPrefix: { getNameValue: string },
    ]
  >
>;
type _15b = Expect<
  Equal<
    PrefixSuffixComposition<{ "": 1 }, "pre", "End">,
    [
      prefixAfterSuffix: { preEnd: 1 },
      suffixAfterPrefix: { preEnd: 1 },
    ]
  >
>;
type _15c = Expect<
  Equal<
    PrefixSuffixComposition<{ readonly id?: number }, "get", "Now">,
    [
      prefixAfterSuffix: { readonly getIdNow?: number },
      suffixAfterPrefix: { readonly getIdNow?: number },
    ]
  >
>;
type _15d = Expect<
  Equal<
    keyof PrefixSuffixComposition<{}, "get", "Now">[0],
    never
  >
>;
type _15e = Expect<
  Equal<
    keyof PrefixSuffixComposition<{}, "get", "Now">[1],
    never
  >
>;

// ─── Broad domains, special sources, and tuple infrastructure ──────────────

// 16. Pair a broad prefix pattern with the union of values it can address.
export type BroadPrefixProfile<
  Source,
  Prefix extends string,
> = TODO; // TODO(koan)

type _16a = Expect<
  Equal<
    BroadPrefixProfile<Record<string, number>, "get">,
    [keys: `get${Capitalize<string>}`, values: number]
  >
>;
type _16b = Expect<
  Equal<
    BroadPrefixProfile<{ [key: string]: boolean; [givenSymbol]: Date }, "is">,
    [keys: `is${Capitalize<string>}`, values: boolean]
  >
>;
type _16c = Expect<
  Equal<
    BroadPrefixProfile<Record<number, string>, "get">,
    [keys: never, values: never]
  >
>;
type _16d = Expect<
  Equal<BroadPrefixProfile<{}, "get">, [keys: never, values: never]>
>;

// 17. Characterize prefix mapping over any, unknown, never, and symbol-only
//     sources without making the intended answer itself any.
export type SpecialPrefixProfile<
  Source,
  Prefix extends string,
> = TODO; // TODO(koan)

type _17a = Expect<
  Equal<
    SpecialPrefixProfile<any, "get">,
    [
      resultIsAny: false,
      resultIsNever: false,
      keys: `get${Capitalize<string>}`,
    ]
  >
>;
type _17b = Expect<
  Equal<
    SpecialPrefixProfile<unknown, "get">,
    [resultIsAny: false, resultIsNever: false, keys: never]
  >
>;
type _17c = Expect<
  Equal<
    SpecialPrefixProfile<never, "get">,
    [
      resultIsAny: false,
      resultIsNever: true,
      keys: string | number | symbol,
    ]
  >
>;
type _17d = Expect<
  Equal<
    SpecialPrefixProfile<Record<symbol, Date>, "get">,
    [resultIsAny: false, resultIsNever: false, keys: never]
  >
>;

// 18. Expose which tuple infrastructure keys a string-prefix remap emits.
export type TuplePrefixFacts<
  Source extends readonly unknown[],
  Prefix extends string,
> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<
    TuplePrefixFacts<readonly ["a", 1], "p">,
    [
      hasZero: true,
      hasLength: true,
      hasPush: false,
      zeroValue: "a",
      lengthValue: 2,
    ]
  >
>;
type _18b = Expect<
  Equal<
    TuplePrefixFacts<[name?: string], "get">,
    [
      hasZero: true,
      hasLength: true,
      hasPush: true,
      zeroValue: string | undefined,
      lengthValue: 0 | 1,
    ]
  >
>;
type _18c = Expect<
  Equal<
    TuplePrefixFacts<readonly [], "x">,
    [
      hasZero: false,
      hasLength: true,
      hasPush: false,
      zeroValue: never,
      lengthValue: 0,
    ]
  >
>;
type _18d = Expect<
  Equal<
    TuplePrefixFacts<readonly string[], "p">,
    [
      hasZero: false,
      hasLength: true,
      hasPush: false,
      zeroValue: never,
      lengthValue: number,
    ]
  >
>;

// 19. Decide whether an entire fragment type is accepted in template
//     interpolation; symbols and objects are not.
export type InterpolationAllowed<Fragment> = TODO; // TODO(koan)

type _19a = Expect<
  Equal<InterpolationAllowed<string | number | bigint>, true>
>;
type _19b = Expect<Equal<InterpolationAllowed<boolean | null | undefined>, true>>;
type _19c = Expect<Equal<InterpolationAllowed<typeof givenSymbol>, false>>;
type _19d = Expect<Equal<InterpolationAllowed<{ value: string }>, false>>;
type _19e = Expect<
  Equal<InterpolationAllowed<"ok" | typeof givenSymbol>, false>
>;
