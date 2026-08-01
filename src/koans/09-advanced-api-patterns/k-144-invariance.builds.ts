import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-144: invariance — constructions
 * =============================================================================
 *
 * Invariance is what happens when a type argument occupies both a positive and a
 * negative position at once. A mutable cell hands `Value` out through its
 * getter and takes `Value` in through its setter, so neither direction is safe:
 * a `Dog` cell used as an `Animal` cell could be written a `Cat`, and an
 * `Animal` cell used as a `Dog` cell could hand back one. The only assignment
 * that survives is the one that preserves the argument exactly.
 *
 * Two things blur this in practice. Writable properties and method-declared
 * parameters are checked leniently, so a cell written with `{ value: Value }` or
 * with `set(value: Value): void` reports covariant even though the same
 * mutation risk is there. And `any` is exempt from the whole question, which is
 * why mutual assignability is a weaker claim than identity. Replace each `TODO`
 * with a type satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

// ─── The hierarchy the exactness is measured against ──────────────────

// 1. Build the base of the hierarchy.
export type Animal = TODO; // TODO(koan)

type _01a = Expect<Equal<Animal["kind"], "animal" | "dog" | "cat">>;
type _01b = Expect<Equal<keyof Animal, "kind" | "name">>;
type _01c = Expect<Equal<Animal["name"], string>>;

// 2. Build the narrow member whose extra capability is what makes reading the
//    wrong value unsafe.
export type Dog = TODO; // TODO(koan)

type _02a = Expect<Equal<Dog["kind"], "dog">>;
type _02b = Expect<Equal<ReturnType<Dog["bark"]>, string>>;
type _02c = Expect<
  Equal<
    { narrowIntoBroad: GivenExtends<Dog, Animal>; broadIntoNarrow: GivenExtends<Animal, Dog> },
    { narrowIntoBroad: true; broadIntoNarrow: false }
  >
>;

// 3. Build the sibling, which is what makes writing the wrong value unsafe.
export type Cat = TODO; // TODO(koan)

type _03a = Expect<Equal<Cat["kind"], "cat">>;
type _03b = Expect<Equal<GivenExtends<Dog, Cat>, false>>;
type _03c = Expect<
  Equal<
    { siblingIntoBase: GivenExtends<Cat, Animal>; baseIntoSibling: GivenExtends<Animal, Cat> },
    { siblingIntoBase: true; baseIntoSibling: false }
  >
>;

// ─── Both positions in one type ───────────────────────────────────────

// 4. Build the mutable cell with both accessors declared as function-typed
//    *properties*, so both positions are checked strictly.
export type Cell<Value> = TODO; // TODO(koan)

type _04a = Expect<
  Equal<
    { read: ReturnType<Cell<Dog>["get"]>; broadIntoNarrow: GivenExtends<Animal, Dog> },
    { read: Dog; broadIntoNarrow: false }
  >
>;
type _04b = Expect<
  Equal<
    { written: Parameters<Cell<Dog>["set"]>[0]; broadIntoNarrow: GivenExtends<Animal, Dog> },
    { written: Dog; broadIntoNarrow: false }
  >
>;
type _04c = Expect<Equal<GivenExtends<Cell<Dog>, Cell<Animal>>, false>>;
type _04d = Expect<Equal<GivenExtends<Cell<Animal>, Cell<Dog>>, false>>;
type _04e = Expect<Equal<keyof Cell<Dog>, "get" | "set">>;

// 5. Build the codec. Its two operations look nothing like a getter and a
//    setter, but the argument sits in exactly the same two positions.
export type Codec<Value> = TODO; // TODO(koan)

type _05a = Expect<
  Equal<
    { decoded: ReturnType<Codec<Dog>["decode"]>; broadIntoNarrow: GivenExtends<Animal, Dog> },
    { decoded: Dog; broadIntoNarrow: false }
  >
>;
type _05b = Expect<
  Equal<
    { encoded: Parameters<Codec<Dog>["encode"]>[0]; broadIntoNarrow: GivenExtends<Animal, Dog> },
    { encoded: Dog; broadIntoNarrow: false }
  >
>;
type _05c = Expect<Equal<GivenExtends<Codec<Dog>, Codec<Animal>>, false>>;
type _05d = Expect<Equal<GivenExtends<Codec<Animal>, Codec<Dog>>, false>>;
type _05e = Expect<Equal<ReturnType<Codec<Dog>["encode"]>, string>>;

// 6. Build the self-map, where one signature holds both positions on its own.
export type Endomorphism<Value> = TODO; // TODO(koan)

type _06a = Expect<
  Equal<
    { accepts: Parameters<Endomorphism<Dog>>; broadIntoNarrow: GivenExtends<Animal, Dog> },
    { accepts: [value: Dog]; broadIntoNarrow: false }
  >
>;
type _06b = Expect<
  Equal<
    { produces: ReturnType<Endomorphism<Dog>>; broadIntoNarrow: GivenExtends<Animal, Dog> },
    { produces: Dog; broadIntoNarrow: false }
  >
>;
type _06c = Expect<Equal<GivenExtends<Endomorphism<Dog>, Endomorphism<Animal>>, false>>;
type _06d = Expect<Equal<GivenExtends<Endomorphism<Animal>, Endomorphism<Dog>>, false>>;

// ─── The two ways the exactness gets given away ───────────────────────

// 7. Build the same cell as a writable property. The write position is still
//    there at runtime, but property assignability does not look for it.
export type PropertyCell<Value> = TODO; // TODO(koan)

type _07a = Expect<
  Equal<
    {
      narrowIntoBroad: GivenExtends<PropertyCell<Dog>, PropertyCell<Animal>>;
      broadIntoNarrow: GivenExtends<PropertyCell<Animal>, PropertyCell<Dog>>;
    },
    { narrowIntoBroad: true; broadIntoNarrow: false }
  >
>;
type _07b = Expect<Equal<GivenExtends<PropertyCell<Animal>, PropertyCell<Dog>>, false>>;
type _07c = Expect<
  Equal<
    { stored: PropertyCell<Dog>["value"]; broadIntoNarrow: GivenExtends<Animal, Dog> },
    { stored: Dog; broadIntoNarrow: false }
  >
>;
type _07d = Expect<
  Equal<
    {
      strictCellRefuses: GivenExtends<Cell<Dog>, Cell<Animal>>;
      propertyCellAccepts: GivenExtends<PropertyCell<Dog>, PropertyCell<Animal>>;
    },
    { strictCellRefuses: false; propertyCellAccepts: true }
  >
>;

// 8. Build the same cell with method syntax. Method parameters are compared
//    bivariantly, so the setter stops contributing its direction entirely.
export type MethodCell<Value> = TODO; // TODO(koan)

type _08a = Expect<
  Equal<
    {
      narrowIntoBroad: GivenExtends<MethodCell<Dog>, MethodCell<Animal>>;
      broadIntoNarrow: GivenExtends<MethodCell<Animal>, MethodCell<Dog>>;
    },
    { narrowIntoBroad: true; broadIntoNarrow: false }
  >
>;
type _08b = Expect<Equal<GivenExtends<MethodCell<Animal>, MethodCell<Dog>>, false>>;
type _08c = Expect<
  Equal<
    { written: Parameters<MethodCell<Dog>["set"]>[0]; broadIntoNarrow: GivenExtends<Animal, Dog> },
    { written: Dog; broadIntoNarrow: false }
  >
>;
type _08d = Expect<
  Equal<
    {
      strictCellRefuses: GivenExtends<Cell<Dog>, Cell<Animal>>;
      methodCellAccepts: GivenExtends<MethodCell<Dog>, MethodCell<Animal>>;
    },
    { strictCellRefuses: false; methodCellAccepts: true }
  >
>;

// ─── Measuring exactness ──────────────────────────────────────────────

// 9. Build the direction classifier, so "invariant" is a measurement rather
//    than a claim.
export type DirectionOf<AtNarrow, AtBroad> = TODO; // TODO(koan)

type _09a = Expect<Equal<DirectionOf<Cell<Dog>, Cell<Animal>>, "invariant">>;
type _09b = Expect<Equal<DirectionOf<Codec<Dog>, Codec<Animal>>, "invariant">>;
type _09c = Expect<Equal<DirectionOf<Endomorphism<Dog>, Endomorphism<Animal>>, "invariant">>;
type _09d = Expect<Equal<DirectionOf<PropertyCell<Dog>, PropertyCell<Animal>>, "covariant">>;
type _09e = Expect<Equal<DirectionOf<MethodCell<Dog>, MethodCell<Animal>>, "covariant">>;

// 10. Build the mutual-assignability test, and notice it is *not* identity. Two
//     types that each flow into the other can still be distinguishable, which is
//     exactly the gap `any` lives in.
export type SameTypeAs<Left, Right> = TODO; // TODO(koan)

type _10a = Expect<Equal<SameTypeAs<Dog, Dog>, true>>;
type _10b = Expect<Equal<SameTypeAs<Dog, Animal>, false>>;
type _10c = Expect<
  Equal<
    { mutuallyAssignable: SameTypeAs<any, Dog>; identical: Equal<any, Dog> },
    { mutuallyAssignable: true; identical: false }
  >
>;
type _10d = Expect<Equal<SameTypeAs<Cell<Dog>, Cell<Animal>>, false>>;

// 11. Build the exactness filter: it keeps a type only when the two are the same
//     type, and answers `never` for anything merely narrower or broader. Note
//     the bracketing — without it the check would distribute and a union would
//     never match itself.
export type Exactly<Value, Shape> = TODO; // TODO(koan)

type _11a = Expect<
  Equal<
    { kept: Exactly<Dog, Dog>; broadIntoNarrow: GivenExtends<Animal, Dog> },
    { kept: Dog; broadIntoNarrow: false }
  >
>;
type _11b = Expect<Equal<Exactly<Dog, Animal>, never>>;
type _11c = Expect<Equal<Exactly<Animal, Dog>, never>>;
type _11d = Expect<
  Equal<
    { kept: Exactly<Dog | Cat, Dog | Cat>; broadIntoNarrow: GivenExtends<Animal, Dog> },
    { kept: Dog | Cat; broadIntoNarrow: false }
  >
>;
type _11e = Expect<Equal<Exactly<Dog | Cat, Dog>, never>>;

// ─── Where the exactness holds ────────────────────────────────────────

// 12. Report the survey. Three constructors are invariant because the argument
//     is both read and written; two report covariant because the checker does
//     not enforce the write side.
export type VarianceReport = TODO; // TODO(koan)

type _12a = Expect<Equal<VarianceReport["cell"], "invariant">>;
type _12b = Expect<Equal<VarianceReport["codec"], "invariant">>;
type _12c = Expect<Equal<VarianceReport["endomorphism"], "invariant">>;
type _12d = Expect<Equal<VarianceReport["propertyCell"], "covariant">>;
type _12e = Expect<Equal<VarianceReport["methodCell"], "covariant">>;

// 13. Report unions. Exactness means the union has to match member for member —
//     adding a member is as fatal as removing one.
export type UnionExactnessProfile = TODO; // TODO(koan)

type _13a = Expect<Equal<UnionExactnessProfile["memberIntoUnion"], false>>;
type _13b = Expect<Equal<UnionExactnessProfile["unionIntoMember"], false>>;
type _13c = Expect<Equal<UnionExactnessProfile["unionIntoBase"], false>>;
type _13d = Expect<
  Equal<
    { read: UnionExactnessProfile["read"]; broadIntoNarrow: GivenExtends<Animal, Dog> },
    { read: Dog | Cat; broadIntoNarrow: false }
  >
>;
type _13e = Expect<
  Equal<
    { written: UnionExactnessProfile["written"]; broadIntoNarrow: GivenExtends<Animal, Dog> },
    { written: Dog | Cat; broadIntoNarrow: false }
  >
>;

// 14. Report the wrappers. An invariant type stays invariant however it is
//     carried: a covariant shell cannot loosen an argument that was never free
//     to move.
export type WrapperProfile = TODO; // TODO(koan)

type _14a = Expect<Equal<WrapperProfile["inPromise"], false>>;
type _14b = Expect<Equal<WrapperProfile["inReadonlyArray"], false>>;
type _14c = Expect<Equal<WrapperProfile["inReturnPosition"], false>>;
type _14d = Expect<Equal<WrapperProfile["inParameterPosition"], false>>;
type _14e = Expect<Equal<WrapperProfile["inProperty"], false>>;

// 15. Report nesting an invariant constructor inside itself, which stays shut in
//     both directions however deep it goes.
export type NestingProfile = TODO; // TODO(koan)

type _15a = Expect<Equal<NestingProfile["cellOfCellNarrow"], false>>;
type _15b = Expect<Equal<NestingProfile["cellOfCellBroad"], false>>;
type _15c = Expect<Equal<NestingProfile["selfMapOfSelfMap"], false>>;
type _15d = Expect<Equal<NestingProfile["nestedDirection"], "invariant">>;
type _15e = Expect<Equal<NestingProfile["codecOfCell"], "invariant">>;

// 16. Report the special types. `never` and `unknown` are ordinary arguments
//     here and stay shut out in both directions; `any` is exempt from the whole
//     question and reports both directions at once.
export type SpecialTypeProfile = TODO; // TODO(koan)

type _16a = Expect<Equal<SpecialTypeProfile["bottomArgument"], "invariant">>;
type _16b = Expect<Equal<SpecialTypeProfile["topArgument"], "invariant">>;
type _16c = Expect<Equal<SpecialTypeProfile["anyArgument"], "bivariant">>;
type _16d = Expect<Equal<SpecialTypeProfile["bottomIsStillExact"], true>>;
type _16e = Expect<Equal<SpecialTypeProfile["anyIsNotExact"], false>>;

// ─── Working with an invariant argument ───────────────────────────────

// 17. Build the API. Every operation is generic in the argument rather than
//     taking a fixed one, which is how an invariant type stays usable: the
//     caller pins the argument and the signature never has to move it.
export type CellApi = TODO; // TODO(koan)

type _17a = Expect<
  Equal<
    { built: ReturnType<CellApi["makeCell"]>; broadIntoNarrow: GivenExtends<Animal, Dog> },
    { built: Cell<unknown>; broadIntoNarrow: false }
  >
>;
type _17b = Expect<Equal<ReturnType<CellApi["modify"]>, unknown>>;
type _17c = Expect<
  Equal<
    { demanded: Parameters<CellApi["modify"]>[1]; broadIntoNarrow: GivenExtends<Animal, Dog> },
    { demanded: Endomorphism<unknown>; broadIntoNarrow: false }
  >
>;
type _17d = Expect<Equal<ReturnType<CellApi["roundTrip"]>, unknown>>;
type _17e = Expect<Equal<Parameters<CellApi["roundTrip"]>["length"], 2>>;

// 18. Build the record of cells over a value map. Invariance propagates field by
//     field, so the whole record is pinned as tightly as any one of its fields.
export type Cells<Values> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<
    { field: Cells<{ pet: Dog }>["pet"]; broadIntoNarrow: GivenExtends<Animal, Dog> },
    { field: Cell<Dog>; broadIntoNarrow: false }
  >
>;
type _18b = Expect<Equal<keyof Cells<{ pet: Dog; other: Cat }>, "pet" | "other">>;
type _18c = Expect<Equal<GivenExtends<Cells<{ pet: Dog }>, Cells<{ pet: Animal }>>, false>>;
type _18d = Expect<Equal<GivenExtends<Cells<{ pet: Animal }>, Cells<{ pet: Dog }>>, false>>;
type _18e = Expect<Equal<DirectionOf<Cells<{ pet: Dog }>, Cells<{ pet: Animal }>>, "invariant">>;
