import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-172: unrelated getter and setter types — constructions
 * =============================================================================
 *
 * Since TypeScript 5.1 a `get` and its `set` need not agree. A slot may accept
 * a string or a number and hand back a parsed number; a style rule may accept
 * CSS text and hand back a structured declaration. This is what the DOM has
 * always done, and it is now expressible.
 *
 * The cost is that "the type of the property" stops being one thing. Reading it
 * — `Owner["key"]`, `keyof`, a mapped type — gives you the *getter's* type,
 * because that is what an expression reading the property produces. The setter's
 * type is only visible at an assignment, so a type-level description of the
 * writable side has to be built separately. That asymmetry is what most of the
 * constructions below are about. Replace each `TODO` with a type satisfying the
 * assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

// The structured value one of the accessors below hands back.
type GivenStyleDeclaration = {
  readonly cssText: string;
  readonly declarations: Readonly<Record<string, string>>;
};

// ─── Reading a divergent property ─────────────────────────────────────

// 1. Build the numeric slot: it accepts either representation and reports the
//    parsed one, which may not be there yet.
export type ParsedNumberSlot = TODO; // TODO(koan)

type _01a = Expect<Equal<ParsedNumberSlot["value"], number | undefined>>;
type _01b = Expect<Equal<keyof ParsedNumberSlot, "value">>;
type _01c = Expect<
  Equal<
    {
      readingGivesTheGetter: ParsedNumberSlot["value"];
      whichIsNotTheSetterType: Equal<ParsedNumberSlot["value"], string | number>;
    },
    { readingGivesTheGetter: number | undefined; whichIsNotTheSetterType: false }
  >
>;
type _01d = Expect<Equal<NonNullable<ParsedNumberSlot["value"]>, number>>;

// 2. Build the style rule, where the two sides are not even in the same family:
//    strings in, a structured declaration out.
export type StyleRule = TODO; // TODO(koan)

type _02a = Expect<Equal<StyleRule["style"], GivenStyleDeclaration>>;
type _02b = Expect<Equal<StyleRule["style"]["cssText"], string>>;
type _02c = Expect<Equal<keyof StyleRule, "style">>;
type _02d = Expect<
  Equal<
    {
      readingGivesTheStructure: GivenExtends<StyleRule["style"], GivenStyleDeclaration>;
      andNotTheStringItAccepts: GivenExtends<StyleRule["style"], string>;
    },
    { readingGivesTheStructure: true; andNotTheStringItAccepts: false }
  >
>;

// 3. Build the date slot, the case where the write side is a *wider* version of
//    the read side rather than an unrelated one.
export type DateSlot = TODO; // TODO(koan)

type _03a = Expect<Equal<DateSlot["date"], Date>>;
type _03b = Expect<Equal<keyof DateSlot, "date">>;
type _03c = Expect<
  Equal<
    {
      readFitsTheWideWrite: GivenExtends<DateSlot["date"], Date | string | number>;
      wideWriteDoesNotFitTheRead: GivenExtends<Date | string | number, DateSlot["date"]>;
    },
    { readFitsTheWideWrite: true; wideWriteDoesNotFitTheRead: false }
  >
>;
type _03d = Expect<Equal<GivenExtends<Date | string | number, DateSlot["date"]>, false>>;

// ─── Making the write side visible ────────────────────────────────────

// 4. Build the read-side reader — the ordinary indexed access, which is the
//    only thing the type system offers directly.
export type ReadValue<Owner extends object, Key extends keyof Owner> = TODO; // TODO(koan)

type _04a = Expect<Equal<ReadValue<ParsedNumberSlot, "value">, number | undefined>>;
type _04b = Expect<Equal<ReadValue<StyleRule, "style">, GivenStyleDeclaration>>;
type _04c = Expect<Equal<ReadValue<DateSlot, "date">, Date>>;
type _04d = Expect<Equal<ReadValue<{ a: 1; b: 2 }, "a" | "b">, 1 | 2>>;

// 5. Build the shape of an explicit write operation. Since the setter's type
//    cannot be read off the property, describing the writable side means writing
//    a function that performs the write.
export type WriteOperation<Owner, Value> = TODO; // TODO(koan)

type _05a = Expect<
  Equal<Parameters<WriteOperation<ParsedNumberSlot, string | number>>, [owner: ParsedNumberSlot, value: string | number]>
>;
type _05b = Expect<Equal<ReturnType<WriteOperation<StyleRule, string>>, void>>;
type _05c = Expect<Equal<Parameters<WriteOperation<StyleRule, string>>[1], string>>;
type _05d = Expect<Equal<Parameters<WriteOperation<DateSlot, Date | string | number>>["length"], 2>>;

// 6. Build the reader that recovers the writable type from such an operation —
//    the closest thing to "the setter's type" the type system can offer.
export type WriteValue<Operation extends (...args: any[]) => void> = TODO; // TODO(koan)

type _06a = Expect<Equal<WriteValue<WriteOperation<ParsedNumberSlot, string | number>>, string | number>>;
type _06b = Expect<Equal<WriteValue<WriteOperation<StyleRule, string>>, string>>;
type _06c = Expect<Equal<WriteValue<WriteOperation<DateSlot, Date | string | number>>, Date | string | number>>;
type _06d = Expect<
  Equal<
    {
      writeSideRecovered: WriteValue<WriteOperation<StyleRule, string>>;
      readSideIsDifferent: Equal<WriteValue<WriteOperation<StyleRule, string>>, StyleRule["style"]>;
    },
    { writeSideRecovered: string; readSideIsDifferent: false }
  >
>;

// 7. Build the comparison the whole packet turns on: how the two sides of one
//    property relate to each other.
export type ReadWriteRelationship<Read, Write> = TODO; // TODO(koan)

type _07a = Expect<Equal<ReadWriteRelationship<number, number>, { readFitsWrite: true; writeFitsRead: true }>>;
type _07b = Expect<
  Equal<ReadWriteRelationship<Date, Date | string | number>, { readFitsWrite: true; writeFitsRead: false }>
>;
type _07c = Expect<
  Equal<
    ReadWriteRelationship<GivenStyleDeclaration, string>,
    { readFitsWrite: false; writeFitsRead: false }
  >
>;
type _07d = Expect<
  Equal<ReadWriteRelationship<number | undefined, string | number>["readFitsWrite"], false>
>;
type _07e = Expect<Equal<ReadWriteRelationship<never, string>, { readFitsWrite: true; writeFitsRead: false }>>;

// ─── How divergent the three cases are ────────────────────────────────

// 8. Report the three properties against the same measure. Only one of them is
//    a round trip; the others lose or transform information on the way through.
export type DivergenceProfile = TODO; // TODO(koan)

type _08a = Expect<Equal<DivergenceProfile["numberSlot"]["readFitsWrite"], false>>;
type _08b = Expect<Equal<DivergenceProfile["styleRule"]["writeFitsRead"], false>>;
type _08c = Expect<Equal<DivergenceProfile["dateSlot"]["readFitsWrite"], true>>;
type _08d = Expect<
  Equal<DivergenceProfile["ordinaryProperty"], { readFitsWrite: true; writeFitsRead: true }>
>;
type _08e = Expect<Equal<DivergenceProfile["onlyOneRoundTrips"], true>>;

// 9. Build the classifier that names the relationship in words.
export type AccessorShape<Read, Write> = TODO; // TODO(koan)

type _09a = Expect<Equal<AccessorShape<number, number>, "symmetric">>;
type _09b = Expect<Equal<AccessorShape<Date, Date | string | number>, "widened on write">>;
type _09c = Expect<Equal<AccessorShape<GivenStyleDeclaration, string>, "transformed">>;
type _09d = Expect<Equal<AccessorShape<number | string, number>, "narrowed on write">>;
type _09e = Expect<Equal<AccessorShape<number | undefined, string | number>, "transformed">>;

// ─── What reading the property gives you everywhere ───────────────────

// 10. Report the read side winning at every type-level position. Indexed access,
//     `keyof`, a mapped type, and a snapshot all describe the getter, because
//     they all describe what an expression produces.
export type ReadSideWinsProfile = TODO; // TODO(koan)

type _10a = Expect<Equal<ReadSideWinsProfile["indexed"], GivenStyleDeclaration>>;
type _10b = Expect<Equal<ReadSideWinsProfile["throughAMappedType"], GivenStyleDeclaration>>;
type _10c = Expect<Equal<ReadSideWinsProfile["throughReadonly"], GivenStyleDeclaration>>;
type _10d = Expect<Equal<ReadSideWinsProfile["throughPartial"], GivenStyleDeclaration | undefined>>;
type _10e = Expect<Equal<ReadSideWinsProfile["throughPick"], GivenStyleDeclaration>>;

// 11. Build the snapshot operator — a plain record of what reading every
//     property would produce. Applying it to a divergent type is exactly where
//     the write side disappears.
export type Snapshot<Owner> = TODO; // TODO(koan)

type _11a = Expect<Equal<Snapshot<ParsedNumberSlot>["value"], number | undefined>>;
type _11b = Expect<Equal<Snapshot<StyleRule>["style"], GivenStyleDeclaration>>;
type _11c = Expect<Equal<keyof Snapshot<DateSlot>, "date">>;
type _11d = Expect<
  Equal<
    {
      snapshotIsReadOnly: GivenExtends<Snapshot<StyleRule>, { readonly style: GivenStyleDeclaration }>;
      andCannotDescribeTheWriteSide: GivenExtends<Snapshot<StyleRule>, { style: string }>;
    },
    { snapshotIsReadOnly: true; andCannotDescribeTheWriteSide: false }
  >
>;

// ─── Describing both sides explicitly ─────────────────────────────────

// 12. Build the record that keeps both halves of a property, since no single
//     type can.
export type AccessorPair<Read, Write> = TODO; // TODO(koan)

type _12a = Expect<Equal<AccessorPair<GivenStyleDeclaration, string>["read"], GivenStyleDeclaration>>;
type _12b = Expect<Equal<AccessorPair<GivenStyleDeclaration, string>["write"], string>>;
type _12c = Expect<
  Equal<AccessorPair<GivenStyleDeclaration, string>["relationship"]["readFitsWrite"], false>
>;
type _12d = Expect<Equal<AccessorPair<number, number>["relationship"]["writeFitsRead"], true>>;

// 13. Build the interface a divergent property is declared with, generically —
//     so a family of such slots can be described once.
export type DivergentSlot<Key extends string, Read, Write> = TODO; // TODO(koan)

type _13a = Expect<Equal<keyof DivergentSlot<"value", number, string>, "value">>;
type _13b = Expect<Equal<ReturnType<DivergentSlot<"value", number, string>["value"]["get"]>, number>>;
type _13c = Expect<
  Equal<Parameters<DivergentSlot<"value", number, string>["value"]["set"]>, [value: string]>
>;
type _13d = Expect<Equal<ReturnType<DivergentSlot<"value", number, string>["value"]["set"]>, void>>;

// 14. Build the operator that turns such an explicit description back into an
//     ordinary property type — which necessarily keeps only the read side.
export type CollapseToRead<Slot> = TODO; // TODO(koan)

type _14a = Expect<Equal<CollapseToRead<DivergentSlot<"value", number, string>>, { value: number }>>;
type _14b = Expect<
  Equal<CollapseToRead<DivergentSlot<"style", GivenStyleDeclaration, string>>["style"], GivenStyleDeclaration>
>;
type _14c = Expect<Equal<CollapseToRead<{ a: { notAnAccessor: true } }>, { a: never }>>;
type _14d = Expect<Equal<keyof CollapseToRead<DivergentSlot<"date", Date, string>>, "date">>;

// ─── Where the write side still matters ───────────────────────────────

// 15. Build the write API for the three slots. These signatures are the only
//     place the setter types appear, which is why a library with divergent
//     accessors usually ships them.
export type WriteApi = TODO; // TODO(koan)

type _15a = Expect<Equal<WriteValue<WriteApi["writeNumberSlot"]>, string | number>>;
type _15b = Expect<Equal<WriteValue<WriteApi["writeStyle"]>, string>>;
type _15c = Expect<Equal<WriteValue<WriteApi["writeDate"]>, Date | string | number>>;
type _15d = Expect<Equal<Parameters<WriteApi["writeStyle"]>[0], StyleRule>>;
type _15e = Expect<Equal<ReturnType<WriteApi["writeNumberSlot"]>, void>>;

// 16. Report what a caller may pass to each write, next to what reading gives
//     back — the practical summary of a divergent accessor.
export type UsageProfile = TODO; // TODO(koan)

type _16a = Expect<Equal<UsageProfile["numberSlotAcceptsAString"], true>>;
type _16b = Expect<Equal<UsageProfile["numberSlotReadsANumber"], true>>;
type _16c = Expect<Equal<UsageProfile["styleAcceptsCssText"], true>>;
type _16d = Expect<Equal<UsageProfile["styleReadsAStructure"], true>>;
type _16e = Expect<Equal<UsageProfile["writingWhatYouReadIsNotAlwaysLegal"], false>>;

// 17. Build the predicate that flags the dangerous case: a property whose value
//     cannot be written back where it was read from.
export type RoundTrips<Read, Write> = TODO; // TODO(koan)

type _17a = Expect<Equal<RoundTrips<number, number>, true>>;
type _17b = Expect<Equal<RoundTrips<Date, Date | string | number>, true>>;
type _17c = Expect<Equal<RoundTrips<GivenStyleDeclaration, string>, false>>;
type _17d = Expect<Equal<RoundTrips<number | undefined, string | number>, false>>;

// 18. Report one property at a glance: what it reads as, what it accepts, how
//     the two relate, and whether a read value may be written back.
export type PropertyReport<Read, Write> = TODO; // TODO(koan)

type _18a = Expect<Equal<PropertyReport<GivenStyleDeclaration, string>["shape"], "transformed">>;
type _18b = Expect<Equal<PropertyReport<GivenStyleDeclaration, string>["roundTrips"], false>>;
type _18c = Expect<Equal<PropertyReport<Date, Date | string | number>["shape"], "widened on write">>;
type _18d = Expect<Equal<PropertyReport<Date, Date | string | number>["roundTrips"], true>>;
type _18e = Expect<Equal<PropertyReport<number, number>["shape"], "symmetric">>;
