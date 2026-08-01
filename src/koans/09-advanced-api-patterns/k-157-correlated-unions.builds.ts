import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-157: correlated unions — constructions
 * =============================================================================
 *
 * A correlated union is a union of whole relationships. If the discriminant says
 * "text" then the value is a string *and* the formatter consumes a string; if it
 * says "count" both move to number together. Building the member inside a mapped
 * type and indexing the result is what keeps the three facts attached to each
 * other.
 *
 * Project them apart first and the relationship is gone: a shape assembled from
 * one key union, one value union, and one callback union accepts "text" beside a
 * number, and its formatter reflects as accepting every value type while safely
 * accepting none of them. Reading a property off a correlated union has the same
 * effect — the answer is a union of what each member says, and the pairing is
 * only recoverable by narrowing the whole value. Replace each `TODO` with a type
 * satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;
type GivenIsAny<Value> = 0 extends 1 & Value ? true : false;

// A map with an optional entry, for the case where modifiers survive the
// mapping and put `undefined` into the union.
type GivenOptionalMap = { optional?: string; required: number };

// ─── The relation ─────────────────────────────────────────────────────

// 1. Build the map the whole file is generated from: one discriminant name per
//    value type.
export type FieldMap = TODO; // TODO(koan)

type _01a = Expect<Equal<keyof FieldMap, "text" | "count" | "active">>;
type _01b = Expect<Equal<FieldMap["text"], string>>;
type _01c = Expect<Equal<FieldMap["count"], number>>;
type _01d = Expect<Equal<FieldMap[keyof FieldMap], string | number | boolean>>;

// 2. Build the correlated case: one member per key, each carrying its own
//    discriminant, its own value, and a formatter that consumes exactly that
//    value.
export type CorrelatedCase<Map, Kind extends keyof Map = keyof Map> = TODO; // TODO(koan)

type _02a = Expect<Equal<CorrelatedCase<FieldMap>["kind"], "text" | "count" | "active">>;
type _02b = Expect<Equal<Extract<CorrelatedCase<FieldMap>, { kind: "text" }>["value"], string>>;
type _02c = Expect<
  Equal<Extract<CorrelatedCase<FieldMap>, { kind: "count" }>["format"], (value: number) => string>
>;
type _02d = Expect<
  Equal<Parameters<Extract<CorrelatedCase<FieldMap>, { kind: "active" }>["format"]>, [value: boolean]>
>;
type _02e = Expect<Equal<CorrelatedCase<FieldMap, never>, never>>;

// 3. Build the same relation positionally. A tuple keeps the pairing just as
//    well as an object does — the union is over whole tuples, not over slots.
export type CorrelatedTuple<Map, Kind extends keyof Map = keyof Map> = TODO; // TODO(koan)

type _03a = Expect<Equal<CorrelatedTuple<FieldMap>[0], "text" | "count" | "active">>;
type _03b = Expect<Equal<CorrelatedTuple<FieldMap>[1], string | number | boolean>>;
type _03c = Expect<Equal<Extract<CorrelatedTuple<FieldMap>, readonly ["text", ...unknown[]]>[1], string>>;
type _03d = Expect<
  Equal<Extract<CorrelatedTuple<FieldMap>, readonly ["count", ...unknown[]]>[2], (value: number) => string>
>;
type _03e = Expect<Equal<CorrelatedTuple<FieldMap, "text">, readonly [kind: "text", value: string, format: (value: string) => string]>>;

// 4. Build the dispatcher's argument tuple — the same idea reduced to the two
//    things a call site actually passes.
export type DispatchArgs<Map, Kind extends keyof Map = keyof Map> = TODO; // TODO(koan)

type _04a = Expect<
  Equal<DispatchArgs<FieldMap>, ["text", string] | ["count", number] | ["active", boolean]>
>;
type _04b = Expect<Equal<DispatchArgs<FieldMap, "text" | "count">, ["text", string] | ["count", number]>>;
type _04c = Expect<Equal<DispatchArgs<FieldMap, never>, never>>;
type _04d = Expect<Equal<DispatchArgs<FieldMap>[1], string | number | boolean>>;
type _04e = Expect<Equal<GivenExtends<["text", number], DispatchArgs<FieldMap, "text" | "count">>, false>>;

// 5. Build the keyed handler map, which keeps the pairing by *key* rather than
//    by union member — one callback per entry, each with its own input.
export type HandlerMap<Map> = TODO; // TODO(koan)

type _05a = Expect<Equal<keyof HandlerMap<FieldMap>, "text" | "count" | "active">>;
type _05b = Expect<Equal<Parameters<HandlerMap<FieldMap>["text"]>, [value: string]>>;
type _05c = Expect<Equal<Parameters<HandlerMap<FieldMap>["count"]>, [value: number]>>;
type _05d = Expect<Equal<ReturnType<HandlerMap<FieldMap>["active"]>, string>>;
type _05e = Expect<
  Equal<HandlerMap<GivenOptionalMap>["optional"], ((value: string | undefined) => string) | undefined>
>;

// 6. Build the shape a careless implementation writes instead: the three facts
//    projected into independent unions, with nothing joining them.
export type UncorrelatedCase<Map> = TODO; // TODO(koan)

type _06a = Expect<Equal<UncorrelatedCase<FieldMap>["kind"], "text" | "count" | "active">>;
type _06b = Expect<Equal<UncorrelatedCase<FieldMap>["value"], string | number | boolean>>;
type _06c = Expect<Equal<Parameters<UncorrelatedCase<FieldMap>["format"]>, [value: string | number | boolean]>>;
type _06d = Expect<
  Equal<
    {
      looseAcceptsAMismatch: GivenExtends<
        { kind: "text"; value: 42; format: UncorrelatedCase<FieldMap>["format"] },
        UncorrelatedCase<FieldMap>
      >;
      correlatedRefusesIt: GivenExtends<
        { kind: "text"; value: 42; format: (value: number) => string },
        CorrelatedCase<FieldMap>
      >;
    },
    { looseAcceptsAMismatch: true; correlatedRefusesIt: false }
  >
>;

// 7. Build the safe-argument reader: what a *union* of callbacks can actually be
//    called with, as opposed to what reflection reports it accepts. Wrapping
//    both sides in a tuple stops the union distributing, so the answer is the
//    input every member accepts — usually nothing.
export type SafeArgument<FunctionUnion> = TODO; // TODO(koan)

type _07a = Expect<Equal<SafeArgument<(value: string) => void>, string>>;
type _07b = Expect<Equal<SafeArgument<((value: string) => void) | ((value: string | number) => void)>, string>>;
type _07c = Expect<Equal<SafeArgument<(value: unknown) => void>, unknown>>;
type _07d = Expect<
  Equal<
    {
      anyInputStaysAny: GivenIsAny<SafeArgument<(value: any) => void>>;
      ordinaryInputIsNot: GivenIsAny<SafeArgument<(value: string) => void>>;
    },
    { anyInputStaysAny: true; ordinaryInputIsNot: false }
  >
>;
type _07e = Expect<Equal<SafeArgument<string>, never>>;

// 8. Build the loose generic pair — one type parameter used in both slots of a
//    single tuple. Instantiating it at a union does *not* produce a union of
//    matched tuples; it produces one tuple of unions.
export type GenericPair<Key extends keyof FieldMap> = TODO; // TODO(koan)

type _08a = Expect<Equal<GenericPair<"text">, [key: "text", value: string]>>;
type _08b = Expect<Equal<GenericPair<"text" | "count">, ["text" | "count", string | number]>>;
type _08c = Expect<Equal<GenericPair<keyof FieldMap>[1], string | number | boolean>>;
type _08d = Expect<
  Equal<
    {
      pairAcceptsTheMismatch: GivenExtends<["text", number], GenericPair<"text" | "count">>;
      mappedUnionRefusesIt: GivenExtends<["text", number], DispatchArgs<FieldMap, "text" | "count">>;
    },
    { pairAcceptsTheMismatch: true; mappedUnionRefusesIt: false }
  >
>;

// ─── The three concrete relations ─────────────────────────────────────

// 9. Build the case union this file's API is written against.
export type FieldCase = TODO; // TODO(koan)

type _09a = Expect<Equal<FieldCase["kind"], "text" | "count" | "active">>;
type _09b = Expect<Equal<keyof FieldCase, "kind" | "value" | "format">>;
type _09c = Expect<Equal<Extract<FieldCase, { kind: "text" }>["value"], string>>;
type _09d = Expect<
  Equal<
    {
      matchedMemberAccepted: GivenExtends<
        { readonly kind: "text"; readonly value: string; readonly format: (value: string) => string },
        FieldCase
      >;
      mismatchedMemberRefused: GivenExtends<
        { kind: "text"; value: 42; format: (value: number) => string },
        FieldCase
      >;
    },
    { matchedMemberAccepted: true; mismatchedMemberRefused: false }
  >
>;

// 10. Build the tuple form of the same relation.
export type FieldTuple = TODO; // TODO(koan)

type _10a = Expect<Equal<FieldTuple[0], "text" | "count" | "active">>;
type _10b = Expect<Equal<Extract<FieldTuple, readonly ["text", ...unknown[]]>[1], string>>;
type _10c = Expect<Equal<Extract<FieldTuple, readonly ["active", ...unknown[]]>[2], (value: boolean) => string>>;
type _10d = Expect<Equal<FieldTuple["length"], 3>>;

// 11. Build the handler record the dispatcher takes.
export type FieldHandlers = TODO; // TODO(koan)

type _11a = Expect<Equal<keyof FieldHandlers, "text" | "count" | "active">>;
type _11b = Expect<Equal<FieldHandlers["text"], (value: string) => string>>;
type _11c = Expect<Equal<FieldHandlers["count"], (value: number) => string>>;
type _11d = Expect<Equal<ReturnType<FieldHandlers["active"]>, string>>;

// ─── What correlation buys, and what reading loses ────────────────────

// 12. Report the correlation surviving in the object form. Narrowing on the
//     discriminant narrows the value and the formatter with it.
export type ObjectCorrelationProfile = TODO; // TODO(koan)

type _12a = Expect<Equal<ObjectCorrelationProfile["textValue"], string>>;
type _12b = Expect<Equal<ObjectCorrelationProfile["countValue"], number>>;
type _12c = Expect<Equal<ObjectCorrelationProfile["countFormatter"], (value: number) => string>>;
type _12d = Expect<Equal<ObjectCorrelationProfile["activeFormatterInput"], [value: boolean]>>;
type _12e = Expect<Equal<ObjectCorrelationProfile["mismatchRefused"], false>>;

// 13. Report what reading a property off the union does. Each answer is the
//     union of what the members say, so the pairing is gone until something
//     narrows the whole value again.
export type ProjectionProfile = TODO; // TODO(koan)

type _13a = Expect<Equal<ProjectionProfile["everyKind"], "text" | "count" | "active">>;
type _13b = Expect<Equal<ProjectionProfile["everyValue"], string | number | boolean>>;
type _13c = Expect<
  Equal<
    ProjectionProfile["everyFormatter"],
    ((value: string) => string) | ((value: number) => string) | ((value: boolean) => string)
  >
>;
type _13d = Expect<Equal<ProjectionProfile["reflectedInput"], string | number | boolean>>;
type _13e = Expect<Equal<ProjectionProfile["actuallyCallableWith"], never>>;

// 14. Report the same comparison for the loose shape, which never had the
//     correlation to lose — its formatter really does accept every value type,
//     and that is exactly why the shape is wrong.
export type LooseProfile = TODO; // TODO(koan)

type _14a = Expect<Equal<LooseProfile["kinds"], "text" | "count" | "active">>;
type _14b = Expect<Equal<LooseProfile["values"], string | number | boolean>>;
type _14c = Expect<Equal<LooseProfile["reflectedInput"], string | number | boolean>>;
type _14d = Expect<Equal<LooseProfile["actuallyCallableWith"], string | number | boolean>>;
type _14e = Expect<Equal<LooseProfile["mismatchAccepted"], true>>;

// 15. Report the generic-parameter version of the same trap. A parameter used
//     twice in one tuple is instantiated once; only a mapped type distributes
//     the key before pairing it.
export type GenericKeyProfile = TODO; // TODO(koan)

type _15a = Expect<Equal<GenericKeyProfile["atOneKey"], [key: "text", value: string]>>;
type _15b = Expect<Equal<GenericKeyProfile["atTwoKeys"], ["text" | "count", string | number]>>;
type _15c = Expect<Equal<GenericKeyProfile["mappedAtTwoKeys"], ["text", string] | ["count", number]>>;
type _15d = Expect<Equal<GenericKeyProfile["pairAcceptsMismatch"], true>>;
type _15e = Expect<Equal<GenericKeyProfile["mappedRefusesMismatch"], false>>;

// 16. Report the modifier case. The mapping over `keyof Map` is homomorphic, so
//     an optional entry stays optional — and indexing the result therefore puts
//     `undefined` into the case union itself.
export type OptionalEntryProfile = TODO; // TODO(koan)

type _16a = Expect<Equal<OptionalEntryProfile["optionalValue"], string | undefined>>;
type _16b = Expect<Equal<OptionalEntryProfile["optionalFormatterInput"], [value: string | undefined]>>;
type _16c = Expect<Equal<OptionalEntryProfile["undefinedIsAMember"], undefined>>;
type _16d = Expect<Equal<OptionalEntryProfile["kindsAfterRemovingIt"], "optional" | "required">>;

// ─── Using the relation ───────────────────────────────────────────────

// 17. Build the API. One entry point takes a whole correlated case and narrows
//     it; the other threads a single generic key through both dependent inputs,
//     which is the other way to keep the pairing alive at a call site.
export type FieldApi = TODO; // TODO(koan)

type _17a = Expect<
  Equal<
    { demanded: Parameters<FieldApi["formatFieldCase"]>[0]; mismatchRefused: GivenExtends<["text", number], DispatchArgs<FieldMap>> },
    { demanded: FieldCase; mismatchRefused: false }
  >
>;
type _17b = Expect<Equal<ReturnType<FieldApi["formatFieldCase"]>, string>>;
type _17c = Expect<
  Equal<
    { demanded: Parameters<FieldApi["dispatchField"]>[1]; mismatchRefused: GivenExtends<["text", number], DispatchArgs<FieldMap>> },
    { demanded: keyof FieldMap; mismatchRefused: false }
  >
>;
type _17d = Expect<Equal<Parameters<FieldApi["dispatchField"]>[2], string | number | boolean>>;
type _17e = Expect<Equal<ReturnType<FieldApi["dispatchField"]>, string>>;

// 18. Report one relation end to end: what the discriminant may be, what a
//     narrowed member carries, and whether the pairing survived the trip.
export type RelationReport<Map, Key extends keyof Map> = TODO; // TODO(koan)

type _18a = Expect<Equal<RelationReport<FieldMap, "text">["kinds"], "text" | "count" | "active">>;
type _18b = Expect<Equal<RelationReport<FieldMap, "text">["narrowedValue"], string>>;
type _18c = Expect<Equal<RelationReport<FieldMap, "count">["narrowedFormatter"], (value: number) => string>>;
type _18d = Expect<Equal<RelationReport<FieldMap, "active">["callArguments"], ["active", boolean]>>;
type _18e = Expect<
  Equal<RelationReport<FieldMap, "text" | "count">["callArguments"], ["text", string] | ["count", number]>
>;
