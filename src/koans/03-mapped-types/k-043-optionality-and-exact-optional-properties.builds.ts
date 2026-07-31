import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-043: optionality and exact optional properties — constructions
 * =============================================================================
 *
 * These constructions keep property presence separate from declared and
 * read-time value types. They model exact Partial/Required behavior, value and
 * presence guards, assignability, parameters and tuples, spreads, deletion,
 * serialization-visible presence, and preference update shapes. Replace each
 * `TODO` with a type satisfying the assertions directly below it.
 */

type GivenPreferences = {
  theme?: "light" | "dark";
  label?: string | undefined;
  retries: number | undefined;
};

type GivenOptionalKeys<Source> = {
  [Key in keyof Source]-?: {} extends Pick<Source, Key> ? Key : never;
}[keyof Source];

type GivenPartial<Source> = {
  [Key in keyof Source]+?: Source[Key];
};

type GivenRequired<Source> = {
  [Key in keyof Source]-?: Source[Key];
};

type PresenceState = "missing" | "present-undefined" | "present-value";

// ─── Declared values, reads, and mapped presence ───────────────────────────

// 1. Recover an optional property's declared present-value type.
export type DeclaredPresentValue<
  Source,
  Key extends keyof Source,
> = TODO; // TODO(koan)

type _01a = Expect<
  Equal<DeclaredPresentValue<{ value?: string }, "value">, string>
>;
type _01b = Expect<
  Equal<
    DeclaredPresentValue<{ value?: string | undefined }, "value">,
    string | undefined
  >
>;
type _01c = Expect<
  Equal<
    DeclaredPresentValue<GivenPreferences, "theme">,
    "light" | "dark"
  >
>;
type _01d = Expect<
  Equal<
    DeclaredPresentValue<GivenPreferences, "label">,
    string | undefined
  >
>;

// 2. Recover the read-time type, including undefined from possible absence.
export type OptionalPropertyRead<
  Source,
  Key extends keyof Source,
> = TODO; // TODO(koan)

type _02a = Expect<
  Equal<OptionalPropertyRead<{ value?: string }, "value">, string | undefined>
>;
type _02b = Expect<
  Equal<
    OptionalPropertyRead<{ value: string | undefined }, "value">,
    string | undefined
  >
>;
type _02c = Expect<
  Equal<
    OptionalPropertyRead<GivenPreferences, "theme">,
    "light" | "dark" | undefined
  >
>;
type _02d = Expect<
  Equal<
    OptionalPropertyRead<GivenPreferences, "retries">,
    number | undefined
  >
>;

// 3. Pair optional-key membership, declared value, and read value.
export type OptionalPropertyProfile<
  Source,
  Key extends keyof Source,
> = TODO; // TODO(koan)

type _03a = Expect<
  Equal<
    OptionalPropertyProfile<{ value?: string }, "value">,
    [optional: true, declared: string, read: string | undefined]
  >
>;
type _03b = Expect<
  Equal<
    OptionalPropertyProfile<{ value: string | undefined }, "value">,
    [
      optional: false,
      declared: string | undefined,
      read: string | undefined,
    ]
  >
>;
type _03c = Expect<
  Equal<
    OptionalPropertyProfile<GivenPreferences, "label">,
    [
      optional: true,
      declared: string | undefined,
      read: string | undefined,
    ]
  >
>;
type _03d = Expect<
  Equal<
    OptionalPropertyProfile<{ only: never }, "only">,
    [optional: false, declared: never, read: never]
  >
>;

// 4. Add absence to every property without adding undefined to declared values.
export type ExactPartial<Source> = TODO; // TODO(koan)

type _04a = Expect<
  Equal<
    ExactPartial<{ name: string; count: number | undefined }>,
    { name?: string; count?: number | undefined }
  >
>;
type _04b = Expect<
  Equal<
    ExactPartial<GivenPreferences>,
    {
      theme?: "light" | "dark";
      label?: string | undefined;
      retries?: number | undefined;
    }
  >
>;
type _04c = Expect<
  Equal<ExactPartial<{ readonly id: number }>, { readonly id?: number }>
>;
type _04d = Expect<Equal<ExactPartial<{}>, {}>>;

// 5. Remove absence without removing explicitly declared undefined.
export type ExactRequired<Source> = TODO; // TODO(koan)

type _05a = Expect<
  Equal<
    ExactRequired<GivenPreferences>,
    {
      theme: "light" | "dark";
      label: string | undefined;
      retries: number | undefined;
    }
  >
>;
type _05b = Expect<
  Equal<ExactRequired<{ value?: string }>, { value: string }>
>;
type _05c = Expect<
  Equal<
    ExactRequired<{ value?: string | undefined }>,
    { value: string | undefined }
  >
>;
type _05d = Expect<Equal<ExactRequired<{}>, {}>>;

// 6. Show how required-after-partial and partial-after-required affect presence.
export type PresenceComposition<Source> = TODO; // TODO(koan)

type _06a = Expect<
  Equal<
    PresenceComposition<{
      name: string;
      count: number | undefined;
      label?: string;
      note?: string | undefined;
    }>,
    [
      requiredAfterPartial: {
        name: string;
        count: number | undefined;
        label: string;
        note: string | undefined;
      },
      partialAfterRequired: {
        name?: string;
        count?: number | undefined;
        label?: string;
        note?: string | undefined;
      },
    ]
  >
>;
type _06b = Expect<
  Equal<
    PresenceComposition<{ readonly value?: string }>,
    [
      requiredAfterPartial: { readonly value: string },
      partialAfterRequired: { readonly value?: string },
    ]
  >
>;
type _06c = Expect<
  Equal<
    PresenceComposition<{ value: string | undefined }>,
    [
      requiredAfterPartial: { value: string | undefined },
      partialAfterRequired: { value?: string | undefined },
    ]
  >
>;
type _06d = Expect<
  Equal<
    PresenceComposition<{ only: never }>,
    [
      requiredAfterPartial: { only: never },
      partialAfterRequired: { only?: never },
    ]
  >
>;

// ─── Guards, defaults, and optional reads ──────────────────────────────────

// 7. Remove undefined from a property read after an explicit value comparison.
export type DefinedValueBranch<Read> = TODO; // TODO(koan)

type _07a = Expect<
  Equal<DefinedValueBranch<string | undefined>, string>
>;
type _07b = Expect<
  Equal<DefinedValueBranch<"light" | "dark" | undefined>, "light" | "dark">
>;
type _07c = Expect<
  Equal<DefinedValueBranch<null | undefined>, null>
>;
type _07d = Expect<Equal<DefinedValueBranch<undefined>, never>>;

// 8. Construct the read type on either side of an `in` presence check.
export type InPresenceBranch<
  Source,
  Key extends keyof Source,
  Present extends boolean,
> = TODO; // TODO(koan)

type _08a = Expect<
  Equal<InPresenceBranch<{ value?: string }, "value", true>, string>
>;
type _08b = Expect<
  Equal<InPresenceBranch<{ value?: string }, "value", false>, undefined>
>;
type _08c = Expect<
  Equal<
    InPresenceBranch<{ value?: string | undefined }, "value", true>,
    string | undefined
  >
>;
type _08d = Expect<
  Equal<
    InPresenceBranch<GivenPreferences, "theme", true>,
    "light" | "dark"
  >
>;

// 9. Keep Object.hasOwn's branch read at the original indexed type.
export type HasOwnBranch<
  Source,
  Key extends keyof Source,
> = TODO; // TODO(koan)

type _09a = Expect<
  Equal<HasOwnBranch<{ value?: string }, "value">, string | undefined>
>;
type _09b = Expect<
  Equal<
    HasOwnBranch<{ value?: string | undefined }, "value">,
    string | undefined
  >
>;
type _09c = Expect<
  Equal<
    HasOwnBranch<GivenPreferences, "theme">,
    "light" | "dark" | undefined
  >
>;
type _09d = Expect<
  Equal<HasOwnBranch<{ only: never }, "only">, never>
>;

// 10. Apply a destructuring or nullish default to an undefined-capable read.
export type DefaultedOptionalRead<Read, Fallback> = TODO; // TODO(koan)

type _10a = Expect<
  Equal<DefaultedOptionalRead<string | undefined, "none">, string>
>;
type _10b = Expect<
  Equal<
    DefaultedOptionalRead<"dark" | undefined, "light">,
    "light" | "dark"
  >
>;
type _10c = Expect<
  Equal<DefaultedOptionalRead<number | undefined, 0>, number>
>;
type _10d = Expect<
  Equal<DefaultedOptionalRead<undefined, "fallback">, "fallback">
>;

// 11. Construct an optional-chain result from its successful expression value.
export type OptionalChainResult<Result> = TODO; // TODO(koan)

type _11a = Expect<Equal<OptionalChainResult<number>, number | undefined>>;
type _11b = Expect<
  Equal<OptionalChainResult<string | number>, string | number | undefined>
>;
type _11c = Expect<Equal<OptionalChainResult<never>, undefined>>;
type _11d = Expect<
  Equal<
    OptionalChainResult<{ readonly id: 1 }>,
    { readonly id: 1 } | undefined
  >
>;

// ─── Assignability, parameters, and tuples ─────────────────────────────────

// 12. Construct the full assignability matrix for four presence/value shapes.
export type ExactPresenceRelations<
  Absent,
  Explicit,
  Both,
  RequiredShape,
> = TODO; // TODO(koan)

type _12a = Expect<
  Equal<
    ExactPresenceRelations<
      { value?: string },
      { value: string | undefined },
      { value?: string | undefined },
      { value: string }
    >,
    [
      absentToExplicit: false,
      explicitToAbsent: false,
      requiredToAbsent: true,
      absentToRequired: false,
      bothToAbsent: false,
      absentToBoth: true,
      explicitToBoth: true,
      bothToExplicit: false,
    ]
  >
>;
type _12b = Expect<
  Equal<
    ExactPresenceRelations<
      { count?: number },
      { count: number | undefined },
      { count?: number | undefined },
      { count: number }
    >[0 | 1 | 2 | 3],
    false | true
  >
>;
type _12c = Expect<
  Equal<
    ExactPresenceRelations<
      { value?: never },
      { value: undefined },
      { value?: undefined },
      { value: never }
    >[2],
    true
  >
>;
type _12d = Expect<
  Equal<
    ExactPresenceRelations<{}, { value: undefined }, { value?: undefined }, {}>[0],
    false
  >
>;

// 13. Decide whether an empty object satisfies a proposed presence shape.
export type EmptyObjectAccepted<Shape> = TODO; // TODO(koan)

type _13a = Expect<Equal<EmptyObjectAccepted<{ value?: string }>, true>>;
type _13b = Expect<
  Equal<EmptyObjectAccepted<{ value: string | undefined }>, false>
>;
type _13c = Expect<Equal<EmptyObjectAccepted<{ value: string }>, false>>;
type _13d = Expect<Equal<EmptyObjectAccepted<{}>, true>>;

// 14. Build an optional parameter signature, which accepts explicit undefined.
export type OptionalParameter<Value, Return> = TODO; // TODO(koan)

type _14a = Expect<
  Equal<OptionalParameter<string, void>, (value?: string) => void>
>;
type _14b = Expect<
  Equal<
    Parameters<OptionalParameter<string, void>>,
    [value?: string | undefined]
  >
>;
type _14c = Expect<
  Equal<ReturnType<OptionalParameter<never, number>>, number>
>;
type _14d = Expect<
  Equal<
    OptionalParameter<string | number, boolean>,
    (value?: string | number) => boolean
  >
>;

// 15. Construct an optional tuple whose positions retain exact declared values.
export type OptionalTuple<Name, Count> = TODO; // TODO(koan)

type _15a = Expect<
  Equal<OptionalTuple<string, number | undefined>, [name?: string, count?: number | undefined]>
>;
type _15b = Expect<
  Equal<OptionalTuple<string, number>[0], string | undefined>
>;
type _15c = Expect<
  Equal<OptionalTuple<never, never>, [name?: never, count?: never]>
>;
type _15d = Expect<
  Equal<
    OptionalTuple<"a" | "b", 0 | 1>[1],
    0 | 1 | undefined
  >
>;

// 16. Remove optional tuple markers, including the undefined attached to an
//     optional tuple slot.
export type RequiredOptionalTuple<
  Tuple extends readonly unknown[],
> = TODO; // TODO(koan)

type _16a = Expect<
  Equal<
    RequiredOptionalTuple<[name?: string, count?: number | undefined]>,
    [name: string, count: number]
  >
>;
type _16b = Expect<
  Equal<RequiredOptionalTuple<[value?: string]>, [value: string]>
>;
type _16c = Expect<
  Equal<
    RequiredOptionalTuple<readonly [value?: string | undefined]>,
    readonly [value: string]
  >
>;
type _16d = Expect<
  Equal<RequiredOptionalTuple<readonly []>, readonly []>
>;

// ─── Spreads, deletion, and runtime presence ────────────────────────────────

// 17. Preserve optionality but drop readonly when spreading into a fresh object.
export type SpreadOptionalCopy<Source extends object> = TODO; // TODO(koan)

type _17a = Expect<
  Equal<SpreadOptionalCopy<{ value?: string }>, { value?: string }>
>;
type _17b = Expect<
  Equal<
    SpreadOptionalCopy<{ value?: string | undefined }>,
    { value?: string | undefined }
  >
>;
type _17c = Expect<
  Equal<
    SpreadOptionalCopy<{ readonly value?: string }>,
    { value?: string }
  >
>;
type _17d = Expect<Equal<SpreadOptionalCopy<{}>, {}>>;

// 18. Model both spread orders for required defaults and an optional update.
export type SpreadOrderProfile<DefaultValue, UpdateValue> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<
    SpreadOrderProfile<string, string>,
    [
      defaultsThenUpdate: { value: string },
      updateThenDefaults: { value: string },
    ]
  >
>;
type _18b = Expect<
  Equal<
    SpreadOrderProfile<"light", "dark">,
    [
      defaultsThenUpdate: { value: "light" | "dark" },
      updateThenDefaults: { value: "light" },
    ]
  >
>;
type _18c = Expect<
  Equal<
    SpreadOrderProfile<string, undefined>,
    [
      defaultsThenUpdate: { value: string | undefined },
      updateThenDefaults: { value: string },
    ]
  >
>;
type _18d = Expect<
  Equal<
    SpreadOrderProfile<never, never>,
    [
      defaultsThenUpdate: { value: never },
      updateThenDefaults: { value: never },
    ]
  >
>;

// 19. Decide whether a key may be deleted because it is optional.
export type DeleteAllowed<
  Source,
  Key extends keyof Source,
> = TODO; // TODO(koan)

type _19a = Expect<
  Equal<DeleteAllowed<{ value?: string }, "value">, true>
>;
type _19b = Expect<
  Equal<DeleteAllowed<{ value: string | undefined }, "value">, false>
>;
type _19c = Expect<
  Equal<DeleteAllowed<GivenPreferences, "theme">, true>
>;
type _19d = Expect<
  Equal<DeleteAllowed<GivenPreferences, "retries">, false>
>;

// 20. Decide whether a written value satisfies the declared present-value type.
export type ExactOptionalWriteAllowed<Declared, Written> = TODO; // TODO(koan)

type _20a = Expect<
  Equal<ExactOptionalWriteAllowed<"light" | "dark", undefined>, false>
>;
type _20b = Expect<
  Equal<ExactOptionalWriteAllowed<string | undefined, undefined>, true>
>;
type _20c = Expect<
  Equal<ExactOptionalWriteAllowed<number | undefined, number>, true>
>;
type _20d = Expect<
  Equal<ExactOptionalWriteAllowed<never, never>, true>
>;

// 21. Construct the observable runtime facts for one property-slot state.
export type RuntimePresenceProfile<State extends PresenceState> = TODO; // TODO(koan)

type _21a = Expect<
  Equal<
    RuntimePresenceProfile<"missing">,
    [has: false, enumerated: false, read: undefined, serializedKey: false]
  >
>;
type _21b = Expect<
  Equal<
    RuntimePresenceProfile<"present-undefined">,
    [has: true, enumerated: true, read: undefined, serializedKey: false]
  >
>;
type _21c = Expect<
  Equal<
    RuntimePresenceProfile<"present-value">,
    [has: true, enumerated: true, read: "value", serializedKey: true]
  >
>;
type _21d = Expect<
  Equal<
    RuntimePresenceProfile<"missing" | "present-value">,
    | [has: false, enumerated: false, read: undefined, serializedKey: false]
    | [has: true, enumerated: true, read: "value", serializedKey: true]
  >
>;

// ─── Preference API shapes and built-in declarations ───────────────────────

// 22. Construct partial updates and required defaults for the preference shape.
export type PreferenceMergeShapes = TODO; // TODO(koan)

type _22a = Expect<
  Equal<
    PreferenceMergeShapes[0],
    {
      theme?: "light" | "dark";
      label?: string | undefined;
      retries?: number | undefined;
    }
  >
>;
type _22b = Expect<
  Equal<
    PreferenceMergeShapes[1],
    {
      theme: "light" | "dark";
      label: string | undefined;
      retries: number | undefined;
    }
  >
>;
type _22c = Expect<
  Equal<PreferenceMergeShapes[2], GivenPreferences>
>;
type _22d = Expect<
  Equal<keyof PreferenceMergeShapes[2], "theme" | "label" | "retries">
>;

// 23. Build the non-predicate Object.hasOwn declaration surface.
export type HasOwnSignature = TODO; // TODO(koan)

type _23a = Expect<
  Equal<HasOwnSignature, typeof Object.hasOwn>
>;
type _23b = Expect<
  Equal<Parameters<HasOwnSignature>, [object: object, property: PropertyKey]>
>;
type _23c = Expect<Equal<ReturnType<HasOwnSignature>, boolean>>;
type _23d = Expect<
  Equal<
    HasOwnSignature,
    (object: object, property: PropertyKey) => boolean
  >
>;
