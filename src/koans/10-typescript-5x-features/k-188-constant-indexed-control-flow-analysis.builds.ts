import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-188: constant indexed control-flow analysis — constructions
 * =============================================================================
 *
 * TypeScript 5.5 attaches narrowing facts to `record[key]` when the object
 * reference and the key are both effectively constant. `typeof record[key] ===
 * "string"` then makes the *same* indexed expression a `string` further down the
 * path, exactly as a local variable would be — no temporary needed.
 *
 * The fact belongs to that access path and nothing else. Reassign the object or
 * the key, write through the property, or reach the same slot through another
 * expression, and the read falls back to the declared indexed type. That
 * declared type is also where the real difficulty lives: `Record<string,
 * unknown>` reads as `unknown`, an optional property reads with `undefined`
 * attached, and `typeof x === "object"` still admits `null`.
 * Replace each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;
type IsAny<Value> = 0 extends 1 & Value ? true : false;

// ─── The declared read ────────────────────────────────────────────────

// 1. Build the record the koan indexes into.
export type UnknownRecord = TODO; // TODO(koan)

type _01a = Expect<Equal<UnknownRecord[string], unknown>>;
type _01b = Expect<Equal<keyof UnknownRecord, string>>;
type _01c = Expect<Equal<UnknownRecord["whicheverKeyYouLike"], unknown>>;
type _01d = Expect<Equal<Extract<UnknownRecord[string], string>, never>>;

// 2. Build the declared type of one access, before any guard has run.
export type IndexedValue<Owner, Key extends keyof Owner> = TODO; // TODO(koan)

type _02a = Expect<Equal<IndexedValue<UnknownRecord, string>, unknown>>;
type _02b = Expect<Equal<IndexedValue<{ a: number }, "a">, number>>;
type _02c = Expect<Equal<IndexedValue<readonly string[], number>, string>>;
type _02d = Expect<Equal<IndexedValue<Record<string, never>, string>, never>>;

// ─── What a guard establishes ─────────────────────────────────────────

// 3. Build the tags a `typeof` test can compare against.
export type TypeTag = TODO; // TODO(koan)

type _03a = Expect<Equal<TypeTag, "string" | "number" | "boolean" | "object" | "undefined">>;
type _03b = Expect<Equal<Extract<TypeTag, "object">, "object">>;
type _03c = Expect<Equal<Exclude<TypeTag, "object" | "undefined">, "string" | "number" | "boolean">>;
type _03d = Expect<Equal<Extract<TypeTag, "function">, never>>;

// 4. Build the type each tag stands for. `"object"` is the awkward one: `typeof
//    null` is `"object"` too, so the tag alone cannot promise an object.
export type TypeOfTag<Tag extends TypeTag> = TODO; // TODO(koan)

type _04a = Expect<Equal<TypeOfTag<"string">, string>>;
type _04b = Expect<Equal<TypeOfTag<"object">, object | null>>;
type _04c = Expect<Equal<TypeOfTag<"undefined">, undefined>>;
type _04d = Expect<Equal<TypeOfTag<TypeTag>, string | number | boolean | object | null | undefined>>;

// 5. Build the narrowing itself. From `unknown` the guard *lands on* the tag's
//    type; from an existing union it filters instead — `Extract` alone would
//    collapse the `unknown` case to `never`.
export type TypeofNarrow<Declared, Tag extends TypeTag> = TODO; // TODO(koan)

type _05a = Expect<Equal<TypeofNarrow<unknown, "string">, string>>;
type _05b = Expect<Equal<TypeofNarrow<string | number, "string">, string>>;
type _05c = Expect<Equal<TypeofNarrow<unknown, "object">, object | null>>;
type _05d = Expect<Equal<TypeofNarrow<string | number, "boolean">, never>>;

// 6. Build the `Array.isArray` narrowing, which is a different guard with the
//    same shape.
export type ArrayNarrow<Declared> = TODO; // TODO(koan)

type _06a = Expect<Equal<ArrayNarrow<unknown>, unknown[]>>;
type _06b = Expect<Equal<ArrayNarrow<string | readonly number[]>, readonly number[]>>;
type _06c = Expect<Equal<ArrayNarrow<string | number>, never>>;
type _06d = Expect<Equal<ArrayNarrow<unknown>[number], unknown>>;

// 7. Build the two-step guard the koan actually writes: `typeof x === "object"`
//    followed by `x !== null`.
export type ObjectNarrow<Declared> = TODO; // TODO(koan)

type _07a = Expect<Equal<ObjectNarrow<unknown>, object>>;
type _07b = Expect<Equal<ObjectNarrow<string | null>, never>>;
type _07c = Expect<Equal<ObjectNarrow<{ a: 1 } | string>, { a: 1 }>>;
type _07d = Expect<Equal<keyof ObjectNarrow<unknown>, never>>;

// ─── When the fact survives ───────────────────────────────────────────

// 8. Build the list of things that take the fact away again.
export type Invalidator = TODO; // TODO(koan)

type _08a = Expect<
  Equal<
    Invalidator,
    | "objectReassigned"
    | "keyReassigned"
    | "writtenThroughTheProperty"
    | "reachedThroughAnotherExpression"
  >
>;
type _08b = Expect<Equal<Extract<Invalidator, `${string}Reassigned`>, "objectReassigned" | "keyReassigned">>;
type _08c = Expect<Equal<Extract<Invalidator, "writtenThroughTheProperty">, "writtenThroughTheProperty">>;
type _08d = Expect<Equal<Extract<Invalidator, "readTwice">, never>>;

// 9. Build the condition for the access path being tracked at all.
export type Tracked<Invalidators extends readonly Invalidator[]> = TODO; // TODO(koan)

type _09a = Expect<Equal<Tracked<[]>, true>>;
type _09b = Expect<Equal<Tracked<["objectReassigned"]>, false>>;
type _09c = Expect<Equal<Tracked<["keyReassigned", "writtenThroughTheProperty"]>, false>>;
type _09d = Expect<Equal<Tracked<["reachedThroughAnotherExpression"]>, false>>;

// 10. Build the type a later read of the same expression produces.
export type NarrowedValue<
  Owner,
  Key extends keyof Owner,
  Tag extends TypeTag,
  Invalidators extends readonly Invalidator[],
> = TODO; // TODO(koan)

type _10a = Expect<Equal<NarrowedValue<UnknownRecord, string, "string", []>, string>>;
type _10b = Expect<Equal<NarrowedValue<UnknownRecord, string, "number", []>, number>>;
type _10c = Expect<Equal<NarrowedValue<UnknownRecord, string, "string", ["objectReassigned"]>, unknown>>;
type _10d = Expect<
  Equal<NarrowedValue<{ a: string | number }, "a", "string", []>, string>
>;

// ─── Whose fact is it ─────────────────────────────────────────────────

// 11. Build the identity of an access path — the pair the fact is filed under.
export type AccessPath<Owner, Key extends PropertyKey> = TODO; // TODO(koan)

type _11a = Expect<Equal<AccessPath<UnknownRecord, "a">["key"], "a">>;
type _11b = Expect<Equal<keyof AccessPath<UnknownRecord, "a">, "owner" | "key">>;
type _11c = Expect<Equal<AccessPath<{ a: 1 }, "a">["owner"], { a: 1 }>>;
type _11d = Expect<Equal<AccessPath<{ a: 1 }, "a" | "b">["key"], "a" | "b">>;

// 12. Build the question of whether two reads see the same fact. Nothing weaker
//     than the identical path will do — a different key, or the same slot
//     reached another way, starts over from the declared type.
export type SharesFactWith<Left, Right> = TODO; // TODO(koan)

type _12a = Expect<
  Equal<SharesFactWith<AccessPath<UnknownRecord, "a">, AccessPath<UnknownRecord, "a">>, true>
>;
type _12b = Expect<
  Equal<SharesFactWith<AccessPath<UnknownRecord, "a">, AccessPath<UnknownRecord, "b">>, false>
>;
type _12c = Expect<
  Equal<SharesFactWith<AccessPath<UnknownRecord, "a">, AccessPath<{ a: 1 }, "a">>, false>
>;
type _12d = Expect<Equal<SharesFactWith<AccessPath<UnknownRecord, string>, AccessPath<UnknownRecord, string>>, true>>;

// ─── What the declared type keeps ─────────────────────────────────────

// 13. Report optional reads. A guard can narrow one, but the declared read still
//     carries the absence that made the guard necessary.
export type OptionalProfile = TODO; // TODO(koan)

type _13a = Expect<Equal<OptionalProfile["declaredRead"], string | undefined>>;
type _13b = Expect<Equal<OptionalProfile["afterRequired"], string>>;
type _13c = Expect<Equal<OptionalProfile["withAbsenceRemoved"], string>>;
type _13d = Expect<Equal<OptionalProfile["aPartialRecordReadsTheSameWay"], string | undefined>>;

// 14. Report aliasing. Two names for one type index identically and are mutually
//     assignable — and still do not share a control-flow fact unless the access
//     path is the same expression.
export type AliasProfile = TODO; // TODO(koan)

type _14a = Expect<Equal<AliasProfile["anAliasIndexesTheSameWay"], true>>;
type _14b = Expect<Equal<AliasProfile["andIsMutuallyAssignable"], true>>;
type _14c = Expect<Equal<AliasProfile["theSamePathSharesItsFact"], true>>;
type _14d = Expect<Equal<AliasProfile["aDifferentKeyDoesNot"], false>>;

// 15. Report the four invalidators against the same guard.
export type InvalidationProfile = TODO; // TODO(koan)

type _15a = Expect<Equal<InvalidationProfile["nothingInTheWay"], string>>;
type _15b = Expect<Equal<InvalidationProfile["theObjectWasReassigned"], unknown>>;
type _15c = Expect<Equal<InvalidationProfile["theKeyWasReassigned"], unknown>>;
type _15d = Expect<Equal<InvalidationProfile["thePropertyWasWritten"], unknown>>;
type _15e = Expect<Equal<InvalidationProfile["anotherExpressionWasUsed"], unknown>>;

// 16. Report the extremes of the value type. Narrowing cannot rescue an `any`,
//     and a record of `never` has nothing to select.
export type ExtremesProfile = TODO; // TODO(koan)

type _16a = Expect<Equal<ExtremesProfile["anyValuesStayAny"], true>>;
type _16b = Expect<Equal<ExtremesProfile["unknownValuesDoNot"], false>>;
type _16c = Expect<Equal<ExtremesProfile["neverValuedReads"], never>>;
type _16d = Expect<Equal<ExtremesProfile["andGuardingNeverKeepsIt"], never>>;

// 17. Build the public signature of a function that does all this inside. None
//     of the narrowing shows up here; the parameters stay as broad as declared.
export type IndexedReader<Owner, Key extends keyof Owner> = TODO; // TODO(koan)

type _17a = Expect<
  Equal<Parameters<IndexedReader<UnknownRecord, string>>, [Record<string, unknown>, string]>
>;
type _17b = Expect<Equal<ReturnType<IndexedReader<UnknownRecord, string>>, string>>;
type _17c = Expect<Equal<Parameters<IndexedReader<readonly unknown[], number>>[1], number>>;
type _17d = Expect<Equal<Parameters<IndexedReader<UnknownRecord, string>>["length"], 2>>;

// 18. Report one indexed access at a glance: what it reads by declaration, what
//     the guard would make of it, and whether the path is tracked at all.
export type IndexedAccessReport<
  Owner,
  Key extends keyof Owner,
  Tag extends TypeTag,
  Invalidators extends readonly Invalidator[],
> = TODO; // TODO(koan)

type _18a = Expect<Equal<IndexedAccessReport<UnknownRecord, string, "string", []>["declared"], unknown>>;
type _18b = Expect<Equal<IndexedAccessReport<UnknownRecord, string, "string", []>["observed"], string>>;
type _18c = Expect<Equal<IndexedAccessReport<UnknownRecord, string, "string", []>["tracked"], true>>;
type _18d = Expect<
  Equal<IndexedAccessReport<UnknownRecord, string, "string", ["keyReassigned"]>["observed"], unknown>
>;
type _18e = Expect<
  Equal<IndexedAccessReport<UnknownRecord, string, "string", ["keyReassigned"]>["guardedAs"], string>
>;
