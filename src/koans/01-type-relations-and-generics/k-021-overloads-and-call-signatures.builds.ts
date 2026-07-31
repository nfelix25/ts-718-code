import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-021: Overloads and call signatures — constructions
 * =============================================================================
 *
 * These constructions build public overload sets, generic and fixed call
 * signatures, callable properties, generic construct signatures, and the
 * last-overload views observed by utility types. They grade direct resolution,
 * specific fallbacks, whole-union arguments, `any`, `never`, and specificity.
 * Replace each `TODO` with a type that satisfies the assertions directly below.
 */

type GivenKind<Value> =
  0 extends 1 & Value
    ? "any"
    : [Value] extends [never]
      ? "never"
      : unknown extends Value
        ? [keyof Value] extends [never] ? "unknown" : "ordinary"
        : "ordinary";

declare const givenAny: any;
declare const givenNever: never;
declare const givenFiniteKey: "id" | "name";

// ─── Public overload sets ───────────────────────────────────────────────────

// 1. Construct the two public conversion overloads.
export type ConvertOverloads =
  TODO; // TODO(koan)

declare const givenConvert: ConvertOverloads;
const convertedString = givenConvert("abc");
const convertedNumber = givenConvert(123);
const convertedAny = givenConvert(givenAny);
const convertedNever = givenConvert(givenNever);
type _01a = Expect<
  Equal<
    ConvertOverloads,
    {
      (value: string): number;
      (value: number): string;
    }
  >
>;
type _01b = Expect<Equal<typeof convertedString, number>>;
type _01c = Expect<Equal<typeof convertedNumber, string>>;
type _01d = Expect<Equal<typeof convertedAny, number>>;
type _01e = Expect<Equal<typeof convertedNever, number>>;

// 2. Construct string and generic-array concatenation overloads.
export type ConcatenateOverloads =
  TODO; // TODO(koan)

declare const givenConcatenate: ConcatenateOverloads;
const concatenatedText = givenConcatenate("type", "script");
const concatenatedNumbers = givenConcatenate([1, 2], [3, 4]);
const concatenatedStrings = givenConcatenate(["a"], ["b"]);
const concatenatedObjects = givenConcatenate([{ id: 1 }], [{ id: 2 }]);
type _02a = Expect<
  Equal<
    ConcatenateOverloads,
    {
      (left: string, right: string): string;
      <Element>(
        left: readonly Element[],
        right: readonly Element[],
      ): Element[];
    }
  >
>;
type _02b = Expect<Equal<typeof concatenatedText, string>>;
type _02c = Expect<Equal<typeof concatenatedNumbers, number[]>>;
type _02d = Expect<Equal<typeof concatenatedStrings, string[]>>;
type _02e = Expect<Equal<typeof concatenatedObjects, { id: number }[]>>;

// 3. Put specific key overloads before one broad fallback.
export type LookupOverloads =
  TODO; // TODO(koan)

declare const givenLookup: LookupOverloads;
const lookedUpId = givenLookup("id");
const lookedUpName = givenLookup("name");
const lookedUpOther = givenLookup("other");
const lookedUpFinite = givenLookup(givenFiniteKey);
type _03a = Expect<
  Equal<
    LookupOverloads,
    {
      (key: "id"): number;
      (key: "name"): string;
      (key: string): unknown;
    }
  >
>;
type _03b = Expect<Equal<typeof lookedUpId, number>>;
type _03c = Expect<Equal<typeof lookedUpName, string>>;
type _03d = Expect<Equal<GivenKind<typeof lookedUpOther>, "unknown">>;
type _03e = Expect<Equal<GivenKind<typeof lookedUpFinite>, "unknown">>;

// 4. Build an overloaded callable date factory.
export type DateFactory =
  TODO; // TODO(koan)

declare const givenDateFactory: DateFactory;
const dateFromNumber = givenDateFactory(0);
const dateFromString = givenDateFactory("2020-01-01");
const dateFromAny = givenDateFactory(givenAny);
type _04a = Expect<
  Equal<
    DateFactory,
    {
      (timestamp: number): Date;
      (iso: string): Date;
    }
  >
>;
type _04b = Expect<Equal<typeof dateFromNumber, Date>>;
type _04c = Expect<Equal<typeof dateFromString, Date>>;
type _04d = Expect<Equal<typeof dateFromAny, Date>>;

// ─── Generic placement on call signatures ──────────────────────────────────

// 5. Construct an identity whose type parameter is fresh per call.
export type GenericIdentity =
  TODO; // TODO(koan)

type _05a = Expect<Equal<GenericIdentity, <Value>(value: Value) => Value>>;
type _05b = Expect<Equal<ReturnType<GenericIdentity>, unknown>>;
type _05c = Expect<
  Equal<GenericIdentity extends <Value>(value: Value) => Value ? true : false, true>
>;

// 6. Construct an identity whose argument is fixed by its containing type.
export type FixedIdentity<Value> =
  TODO; // TODO(koan)

type _06a = Expect<
  Equal<FixedIdentity<string>, (value: string) => string>
>;
type _06b = Expect<
  Equal<FixedIdentity<number>, (value: number) => number>
>;
type _06c = Expect<
  Equal<
    FixedIdentity<string | number>,
    (value: string | number) => string | number
  >
>;
type _06d = Expect<
  Equal<FixedIdentity<unknown>, (value: unknown) => unknown>
>;

// 7. Construct the generic array overload independently.
export type ArrayConcatenator<Element> =
  TODO; // TODO(koan)

type _07a = Expect<
  Equal<
    ArrayConcatenator<number>,
    (left: readonly number[], right: readonly number[]) => number[]
  >
>;
type _07b = Expect<
  Equal<
    ArrayConcatenator<string | number>,
    (
      left: readonly (string | number)[],
      right: readonly (string | number)[],
    ) => (string | number)[]
  >
>;
type _07c = Expect<
  Equal<
    ArrayConcatenator<readonly [1, 2]>,
    (
      left: readonly (readonly [1, 2])[],
      right: readonly (readonly [1, 2])[],
    ) => (readonly [1, 2])[]
  >
>;
type _07d = Expect<
  Equal<ArrayConcatenator<never>, (left: readonly never[], right: readonly never[]) => never[]>
>;

// ─── Utility extraction reads the last overload ─────────────────────────────

// 8. Build the Parameters/ReturnType view of the final convert overload.
export type ConvertUtilityView =
  TODO; // TODO(koan)

type _08a = Expect<
  Equal<ConvertUtilityView["parameters"], [value: number]>
>;
type _08b = Expect<Equal<ConvertUtilityView["result"], string>>;
type _08c = Expect<
  Equal<ConvertUtilityView, { parameters: [value: number]; result: string }>
>;

// 9. Build the utility view of the final generic concatenate overload.
export type ConcatenateUtilityView =
  TODO; // TODO(koan)

type _09a = Expect<
  Equal<
    ConcatenateUtilityView["parameters"],
    [left: readonly unknown[], right: readonly unknown[]]
  >
>;
type _09b = Expect<
  Equal<ConcatenateUtilityView["result"], unknown[]>
>;
type _09c = Expect<
  Equal<
    ConcatenateUtilityView,
    {
      parameters: [left: readonly unknown[], right: readonly unknown[]];
      result: unknown[];
    }
  >
>;

// 10. Build the utility view of the broad final lookup overload.
export type LookupUtilityView =
  TODO; // TODO(koan)

type _10a = Expect<
  Equal<LookupUtilityView["parameters"], [key: string]>
>;
type _10b = Expect<
  Equal<GivenKind<LookupUtilityView["result"]>, "unknown">
>;
type _10c = Expect<
  Equal<
    LookupUtilityView,
    { parameters: [key: string]; result: unknown }
  >
>;

// 11. Build the utility view of the final string date overload.
export type DateFactoryUtilityView =
  TODO; // TODO(koan)

type _11a = Expect<
  Equal<DateFactoryUtilityView["parameters"], [iso: string]>
>;
type _11b = Expect<Equal<DateFactoryUtilityView["result"], Date>>;
type _11c = Expect<
  Equal<
    DateFactoryUtilityView,
    { parameters: [iso: string]; result: Date }
  >
>;

// ─── Callable and constructable object contracts ────────────────────────────

// 12. Build a callable object that also carries mutable state.
export type CallableCounter =
  TODO; // TODO(koan)

type _12a = Expect<
  Equal<
    CallableCounter,
    {
      (step?: number): number;
      count: number;
    }
  >
>;
type _12b = Expect<Equal<CallableCounter["count"], number>>;
type _12c = Expect<
  Equal<Parameters<CallableCounter>, [step?: number | undefined]>
>;
type _12d = Expect<Equal<ReturnType<CallableCounter>, number>>;

// 13. Build a constructor that selects a fresh type per construction.
export type ConstructableBox =
  TODO; // TODO(koan)

declare const GivenBoxConstructor: ConstructableBox;
const constructedNumber = new GivenBoxConstructor(1);
const constructedString = new GivenBoxConstructor("a");
const constructedObject = new GivenBoxConstructor({ id: 1 });
type _13a = Expect<
  Equal<
    ConstructableBox,
    new <Value>(value: Value) => { value: Value }
  >
>;
type _13b = Expect<
  Equal<typeof constructedNumber, { value: number }>
>;
type _13c = Expect<
  Equal<typeof constructedString, { value: string }>
>;
type _13d = Expect<
  Equal<typeof constructedObject, { value: { id: number } }>
>;

// ─── Specificity, unions, and public surfaces ───────────────────────────────

// 14. Construct a literal-specific overload plus a broad string overload.
export type SpecificStringOverloads =
  TODO; // TODO(koan)

declare const givenSpecificString: SpecificStringOverloads;
const specificLiteral = givenSpecificString("a");
const specificBroad = givenSpecificString("b");
type _14a = Expect<
  Equal<
    SpecificStringOverloads,
    {
      (value: "a"): 1;
      (value: string): 2;
    }
  >
>;
type _14b = Expect<Equal<typeof specificLiteral, 1>>;
type _14c = Expect<Equal<typeof specificBroad, 2>>;

// 15. Keep the literal overload most specific even when broad appears first.
export type BroadFirstOverloads =
  TODO; // TODO(koan)

declare const givenBroadFirst: BroadFirstOverloads;
const broadFirstLiteral = givenBroadFirst("a");
const broadFirstOther = givenBroadFirst("b");
type _15a = Expect<
  Equal<
    BroadFirstOverloads,
    {
      (value: string): 2;
      (value: "a"): 1;
    }
  >
>;
type _15b = Expect<Equal<typeof broadFirstLiteral, 1>>;
type _15c = Expect<Equal<typeof broadFirstOther, 2>>;

// 16. Build a single public signature that deliberately accepts a whole union.
export type UnionConverter =
  TODO; // TODO(koan)

type _16a = Expect<
  Equal<
    UnionConverter,
    (value: string | number) => string | number
  >
>;
type _16b = Expect<
  Equal<Parameters<UnionConverter>, [value: string | number]>
>;
type _16c = Expect<
  Equal<ReturnType<UnionConverter>, string | number>
>;

// 17. Build a broad lookup fallback for a whole finite key union.
export type LookupFallback =
  TODO; // TODO(koan)

type _17a = Expect<Equal<LookupFallback, (key: string) => unknown>>;
type _17b = Expect<Equal<Parameters<LookupFallback>, [key: string]>>;
type _17c = Expect<
  Equal<GivenKind<ReturnType<LookupFallback>>, "unknown">
>;

// 18. Classify an overload result without allowing `any` to escape.
export type OverloadResultKind<Result> =
  TODO; // TODO(koan)

type _18a = Expect<Equal<OverloadResultKind<number>, "ordinary">>;
type _18b = Expect<Equal<OverloadResultKind<any>, "any">>;
type _18c = Expect<Equal<OverloadResultKind<unknown>, "unknown">>;
type _18d = Expect<Equal<OverloadResultKind<never>, "never">>;
