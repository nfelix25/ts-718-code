import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-105: recursive JSON values — constructions
 * =============================================================================
 *
 * These constructions build JSON's primitive base and mutually recursive array
 * and string-keyed object containers. They cover supported and rejected leaves,
 * deep combinations, index surfaces, optional properties, structural
 * approximations, cyclic shapes, special types, and the validating runtime
 * boundary. Replace each `TODO` with a type satisfying the assertions directly
 * below it.
 */

type GivenJsonPrimitive = string | number | boolean | null;
type GivenJsonValue = GivenJsonPrimitive | GivenJsonObject | GivenJsonArray;
interface GivenJsonObject {
  readonly [key: string]: GivenJsonValue;
}
interface GivenJsonArray extends ReadonlyArray<GivenJsonValue> {}
type GivenIsAny<Value> = 0 extends (1 & Value) ? true : false;

declare const givenSecret: unique symbol;
type GivenSymbolObject = { x: 1; [givenSecret]: 2 };
interface GivenCyclicObject {
  readonly self: GivenCyclicObject;
}

// ─── Grammar construction and direct observations ─────────────────────

// 1. Build JSON's four nonrecursive primitive branches.
export type JsonPrimitiveBase = TODO; // TODO(koan)

type _01a = Expect<Equal<JsonPrimitiveBase, GivenJsonPrimitive>>;
type _01b = Expect<Equal<Extract<JsonPrimitiveBase, string>, string>>;
type _01c = Expect<Equal<Extract<JsonPrimitiveBase, number>, number>>;
type _01d = Expect<Equal<Extract<JsonPrimitiveBase, null>, null>>;
type _01e = Expect<Equal<undefined extends JsonPrimitiveBase ? true : false, false>>;

// 2. Build the recursive primitive, readonly-array, and object value union.
export type RecursiveJsonValue = TODO; // TODO(koan)

type _02a = Expect<Equal<RecursiveJsonValue, GivenJsonValue>>;
type _02b = Expect<
  Equal<
    { family: RecursiveJsonValue; accepts: "x" extends RecursiveJsonValue ? true : false },
    { family: GivenJsonValue; accepts: true }
  >
>;
type _02c = Expect<
  Equal<
    {
      family: RecursiveJsonValue;
      accepts: readonly [1, readonly ["x"]] extends RecursiveJsonValue ? true : false;
    },
    { family: GivenJsonValue; accepts: true }
  >
>;
type _02d = Expect<
  Equal<
    {
      family: RecursiveJsonValue;
      accepts: { x: undefined } extends RecursiveJsonValue ? true : false;
    },
    { family: GivenJsonValue; accepts: false }
  >
>;
type _02e = Expect<
  Equal<
    {
      family: RecursiveJsonValue;
      accepts: { x: { y: readonly [1, null] } } extends RecursiveJsonValue ? true : false;
    },
    { family: GivenJsonValue; accepts: true }
  >
>;

// 3. Build the readonly string-indexed recursive object branch.
export type RecursiveJsonObject = TODO; // TODO(koan)

type _03a = Expect<Equal<RecursiveJsonObject, GivenJsonObject>>;
type _03b = Expect<Equal<RecursiveJsonObject[string], GivenJsonValue>>;
type _03c = Expect<Equal<RecursiveJsonObject[number], GivenJsonValue>>;
type _03d = Expect<Equal<keyof RecursiveJsonObject, string | number>>;
type _03e = Expect<
  Equal<
    {
      family: RecursiveJsonObject;
      accepts:
        { nested: { values: readonly [1, true] } } extends RecursiveJsonObject
          ? true
          : false;
    },
    { family: GivenJsonObject; accepts: true }
  >
>;

// 4. Build the readonly recursive array branch.
export type RecursiveJsonArray = TODO; // TODO(koan)

type _04a = Expect<Equal<RecursiveJsonArray, GivenJsonArray>>;
type _04b = Expect<Equal<RecursiveJsonArray[number], GivenJsonValue>>;
type _04c = Expect<Equal<RecursiveJsonArray["length"], number>>;
type _04d = Expect<
  Equal<
    {
      family: RecursiveJsonArray;
      accepts: readonly [] extends RecursiveJsonArray ? true : false;
    },
    { family: GivenJsonArray; accepts: true }
  >
>;
type _04e = Expect<
  Equal<
    {
      family: RecursiveJsonArray;
      accepts:
        readonly [1, { x: "a" }] extends RecursiveJsonArray
          ? true
          : false;
    },
    { family: GivenJsonArray; accepts: true }
  >
>;

// 5. Extract the primitive, array, and object branches from the value grammar.
export type JsonBranchProfile = TODO; // TODO(koan)

type _05a = Expect<Equal<JsonBranchProfile["string"], string>>;
type _05b = Expect<Equal<JsonBranchProfile["null"], null>>;
type _05c = Expect<Equal<JsonBranchProfile["array"], GivenJsonArray>>;
type _05d = Expect<Equal<JsonBranchProfile["object"], true>>;
type _05e = Expect<Equal<JsonBranchProfile["arrayIsValue"], true>>;

// 6. Read the recursively admitted value domain from an array position.
export type JsonArrayValue = TODO; // TODO(koan)

type _06a = Expect<Equal<JsonArrayValue, GivenJsonValue>>;
type _06b = Expect<Equal<Extract<JsonArrayValue, string>, string>>;
type _06c = Expect<Equal<Extract<JsonArrayValue, null>, null>>;
type _06d = Expect<
  Equal<
    {
      value: JsonArrayValue;
      accepts: GivenJsonObject extends JsonArrayValue ? true : false;
    },
    { value: GivenJsonValue; accepts: true }
  >
>;
type _06e = Expect<
  Equal<
    {
      value: JsonArrayValue;
      accepts: GivenJsonArray extends JsonArrayValue ? true : false;
    },
    { value: GivenJsonValue; accepts: true }
  >
>;

// 7. Read the recursively admitted value domain from any string object key.
export type JsonObjectValue = TODO; // TODO(koan)

type _07a = Expect<Equal<JsonObjectValue, GivenJsonValue>>;
type _07b = Expect<Equal<GivenJsonObject["missing"], JsonObjectValue>>;
type _07c = Expect<Equal<Pick<GivenJsonObject, "x">["x"], JsonObjectValue>>;
type _07d = Expect<Equal<Extract<JsonObjectValue, boolean>, boolean>>;
type _07e = Expect<Equal<undefined extends JsonObjectValue ? true : false, false>>;

// ─── Supported and rejected structural members ───────────────────────

// 8. Classify primitive leaves accepted by the recursive grammar.
export type JsonPrimitiveMembershipProfile = TODO; // TODO(koan)

type _08a = Expect<Equal<JsonPrimitiveMembershipProfile["string"], true>>;
type _08b = Expect<Equal<JsonPrimitiveMembershipProfile["number"], true>>;
type _08c = Expect<Equal<JsonPrimitiveMembershipProfile["boolean"], true>>;
type _08d = Expect<Equal<JsonPrimitiveMembershipProfile["null"], true>>;
type _08e = Expect<Equal<JsonPrimitiveMembershipProfile["object"], false>>;

// 9. Classify unsupported JavaScript leaf domains.
export type UnsupportedJsonProfile = TODO; // TODO(koan)

type _09a = Expect<Equal<UnsupportedJsonProfile["undefined"], false>>;
type _09b = Expect<Equal<UnsupportedJsonProfile["bigint"], false>>;
type _09c = Expect<Equal<UnsupportedJsonProfile["symbol"], false>>;
type _09d = Expect<Equal<UnsupportedJsonProfile["function"], false>>;
type _09e = Expect<Equal<UnsupportedJsonProfile["unknown"], false>>;

// 10. Classify finite, broad, nested, invalid, and bottom-element arrays.
export type JsonArrayMembershipProfile = TODO; // TODO(koan)

type _10a = Expect<Equal<JsonArrayMembershipProfile["finite"], true>>;
type _10b = Expect<Equal<JsonArrayMembershipProfile["deep"], true>>;
type _10c = Expect<Equal<JsonArrayMembershipProfile["invalid"], false>>;
type _10d = Expect<Equal<JsonArrayMembershipProfile["broad"], true>>;
type _10e = Expect<Equal<JsonArrayMembershipProfile["never"], true>>;

// 11. Classify empty, nested, array-valued, invalid, and broad objects.
export type JsonObjectMembershipProfile = TODO; // TODO(koan)

type _11a = Expect<Equal<JsonObjectMembershipProfile["empty"], true>>;
type _11b = Expect<Equal<JsonObjectMembershipProfile["nested"], true>>;
type _11c = Expect<Equal<JsonObjectMembershipProfile["array"], true>>;
type _11d = Expect<Equal<JsonObjectMembershipProfile["invalid"], false>>;
type _11e = Expect<Equal<JsonObjectMembershipProfile["broad"], false>>;

// 12. Verify deep valid combinations and reject unsupported deep leaves.
export type DeepJsonMembershipProfile = TODO; // TODO(koan)

type _12a = Expect<Equal<DeepJsonMembershipProfile["users"], true>>;
type _12b = Expect<Equal<DeepJsonMembershipProfile["objects"], true>>;
type _12c = Expect<Equal<DeepJsonMembershipProfile["arrays"], true>>;
type _12d = Expect<Equal<DeepJsonMembershipProfile["undefined"], false>>;
type _12e = Expect<Equal<DeepJsonMembershipProfile["bigint"], false>>;

// ─── Static approximation and runtime qualifications ─────────────────

// 13. Show that the static number branch cannot express finiteness.
export type JsonNumberApproximationProfile = TODO; // TODO(koan)

type _13a = Expect<Equal<JsonNumberApproximationProfile["nan"], true>>;
type _13b = Expect<Equal<JsonNumberApproximationProfile["infinity"], true>>;
type _13c = Expect<Equal<JsonNumberApproximationProfile["negativeZero"], true>>;
type _13d = Expect<Equal<JsonNumberApproximationProfile["number"], true>>;
type _13e = Expect<Equal<JsonNumberApproximationProfile["bigint"], false>>;

// 14. Distinguish safe optional properties from explicit undefined domains.
export type OptionalJsonPropertyProfile = TODO; // TODO(koan)

type _14a = Expect<Equal<OptionalJsonPropertyProfile["omitted"], true>>;
type _14b = Expect<Equal<OptionalJsonPropertyProfile["optionalUndefined"], false>>;
type _14c = Expect<Equal<OptionalJsonPropertyProfile["requiredUndefined"], false>>;
type _14d = Expect<Equal<OptionalJsonPropertyProfile["readonly"], true>>;
type _14e = Expect<Equal<OptionalJsonPropertyProfile["never"], true>>;

// 15. Reject built-in object families despite their runtime serialization behavior.
export type BuiltinJsonObjectProfile = TODO; // TODO(koan)

type _15a = Expect<Equal<BuiltinJsonObjectProfile["date"], false>>;
type _15b = Expect<Equal<BuiltinJsonObjectProfile["map"], false>>;
type _15c = Expect<Equal<BuiltinJsonObjectProfile["set"], false>>;
type _15d = Expect<Equal<BuiltinJsonObjectProfile["regexp"], false>>;
type _15e = Expect<Equal<BuiltinJsonObjectProfile["error"], false>>;

// 16. Describe string-index keys, ignored symbols, and cyclic structural acceptance.
export type JsonStructuralLimitProfile = TODO; // TODO(koan)

type _16a = Expect<Equal<JsonStructuralLimitProfile["symbolObject"], true>>;
type _16b = Expect<Equal<JsonStructuralLimitProfile["symbolKey"], false>>;
type _16c = Expect<Equal<JsonStructuralLimitProfile["numberKey"], true>>;
type _16d = Expect<Equal<JsonStructuralLimitProfile["stringKey"], true>>;
type _16e = Expect<Equal<JsonStructuralLimitProfile["cyclic"], false>>;

// 17. Classify `any`, `unknown`, `never`, and their array boundaries.
export type ExtremeJsonProfile = TODO; // TODO(koan)

type _17a = Expect<Equal<ExtremeJsonProfile["anyIntersection"], true>>;
type _17b = Expect<Equal<ExtremeJsonProfile["unknown"], false>>;
type _17c = Expect<Equal<ExtremeJsonProfile["never"], true>>;
type _17d = Expect<Equal<ExtremeJsonProfile["unknownArray"], false>>;
type _17e = Expect<Equal<ExtremeJsonProfile["neverArray"], true>>;

// 18. Build the strict validation, parsing, stringifying, and cloning signatures.
export type JsonRuntimeApi = TODO; // TODO(koan)

type _18a = Expect<
  Equal<JsonRuntimeApi["isJsonValue"], (value: unknown, seen?: Set<object>) => value is GivenJsonValue>
>;
type _18b = Expect<
  Equal<JsonRuntimeApi["stringifyJson"], (value: GivenJsonValue) => string>
>;
type _18c = Expect<
  Equal<JsonRuntimeApi["parseJson"], (text: string) => GivenJsonValue>
>;
type _18d = Expect<
  Equal<JsonRuntimeApi["cloneJson"], <Value extends GivenJsonValue>(value: Value) => Value>
>;
type _18e = Expect<
  Equal<ReturnType<JsonRuntimeApi["cloneJson"]>, GivenJsonValue>
>;
