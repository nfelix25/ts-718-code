import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-056: structural assignability in conditionals — constructions
 * =============================================================================
 *
 * These constructions encode structural usage contracts for objects, nested
 * values, optional and readonly members, open records, arrays, tuples,
 * functions, methods, call and construct signatures, classes, and branded
 * primitives. They emphasize width/depth compatibility, variance, private or
 * protected origin identity, and the difference between type relations and
 * expression-level freshness. Replace each `TODO` with a type satisfying the
 * assertions directly below it.
 */

declare const givenUserBrand: unique symbol;
declare const givenOrderBrand: unique symbol;
declare const givenKey: unique symbol;

class GivenBase {
  private identity = 0;
  protected state = "base";
  value = "base";
}

class GivenChild extends GivenBase {
  child = true;
}

class GivenSibling extends GivenBase {
  sibling = true;
}

class GivenUnrelated {
  private identity = 0;
  protected state = "base";
  value = "base";
}

type GivenMethodHandler<Value> = {
  handle(value: Value): void;
};

type GivenPropertyHandler<Value> = {
  handle: (value: Value) => void;
};

type GivenCallable = {
  (value: string): number;
  label: string;
};

type GivenConstructable = new (value: string) => { value: string };

// ─── Width, depth, and structural capabilities ────────────────────────────

// 1. Return whether a source type is structurally assignable to a target.
export type StructuralAssignable<Source, Target> = TODO; // TODO(koan)

type _01a = Expect<
  Equal<StructuralAssignable<{ id: number; name: string }, { id: number }>, true>
>;
type _01b = Expect<
  Equal<StructuralAssignable<{ id: number }, { id: number; name: string }>, false>
>;
type _01c = Expect<
  Equal<StructuralAssignable<{ id: 1 }, { id: number }>, true>
>;
type _01d = Expect<
  Equal<StructuralAssignable<{ id: string }, { id: number }>, false>
>;
type _01e = Expect<
  Equal<StructuralAssignable<never, { id: number }>, never>
>;

// 2. Compare a structural relation in both directions.
export type StructuralDirections<Left, Right> = TODO; // TODO(koan)

type _02a = Expect<
  Equal<
    StructuralDirections<{ id: number; name: string }, { id: number }>,
    [true, false]
  >
>;
type _02b = Expect<
  Equal<StructuralDirections<{ id: 1 }, { id: number }>, [true, false]>
>;
type _02c = Expect<
  Equal<
    StructuralDirections<
      { nested: { a: 1; b: 2 } },
      { nested: { a: number } }
    >,
    [true, false]
  >
>;
type _02d = Expect<
  Equal<StructuralDirections<{ x: number }, { x: number }>, [true, true]>
>;

// 3. Check for an identifier from any PropertyKey family.
export type HasPropertyKeyId<Value> = TODO; // TODO(koan)

type _03a = Expect<Equal<HasPropertyKeyId<{ id: string; extra: true }>, true>>;
type _03b = Expect<Equal<HasPropertyKeyId<{ id: 1 }>, true>>;
type _03c = Expect<
  Equal<HasPropertyKeyId<{ id: typeof givenKey }>, true>
>;
type _03d = Expect<Equal<HasPropertyKeyId<{ id: {} }>, false>>;
type _03e = Expect<Equal<HasPropertyKeyId<{ name: string }>, false>>;

// 4. Project id and name capabilities while discarding extra fields.
export type PublicView<Value> = TODO; // TODO(koan)

type _04a = Expect<
  Equal<
    PublicView<{ id: 1; name: "Ada"; secret: true }>,
    { id: 1; name: "Ada" }
  >
>;
type _04b = Expect<
  Equal<
    PublicView<{ readonly id: string; readonly name: string }>,
    { id: string; name: string }
  >
>;
type _04c = Expect<
  Equal<
    PublicView<
      | { id: 1; name: "one"; extra: true }
      | { id: 2; name: "two"; other: false }
    >,
    { id: 1; name: "one" } | { id: 2; name: "two" }
  >
>;
type _04d = Expect<Equal<PublicView<{ id: number }>, never>>;

// 5. Check a nested required capability without demanding an exact shape.
export type HasNestedNumberA<Value> = TODO; // TODO(koan)

type _05a = Expect<
  Equal<HasNestedNumberA<{ nested: { a: 1; b: 2 }; extra: true }>, true>
>;
type _05b = Expect<
  Equal<HasNestedNumberA<{ nested: { a: string } }>, false>
>;
type _05c = Expect<
  Equal<HasNestedNumberA<{ nested: { b: number } }>, false>
>;
type _05d = Expect<Equal<HasNestedNumberA<{}>, false>>;

// 6. Check intersection and union coordinate contracts side by side.
export type CoordinateContracts<Value> = TODO; // TODO(koan)

type _06a = Expect<
  Equal<CoordinateContracts<{ x: 1; y: 2 }>, [true, true]>
>;
type _06b = Expect<
  Equal<CoordinateContracts<{ x: 1 }>, [false, true]>
>;
type _06c = Expect<
  Equal<CoordinateContracts<{ y: 2; extra: true }>, [false, true]>
>;
type _06d = Expect<Equal<CoordinateContracts<{}>, [false, false]>>;

// 7. Check selected built-in types through their public structural capabilities.
export type BuiltInCapabilities<Value> = TODO; // TODO(koan)

type _07a = Expect<
  Equal<BuiltInCapabilities<Date>, [true, false, false, false]>
>;
type _07b = Expect<
  Equal<BuiltInCapabilities<Map<string, number>>, [false, true, true, false]>
>;
type _07c = Expect<
  Equal<BuiltInCapabilities<Set<string>>, [false, true, true, false]>
>;
type _07d = Expect<
  Equal<
    BuiltInCapabilities<{ 0: string; length: 1 }>,
    [false, false, false, true]
  >
>;

// ─── Optionality, readonly, and open records ───────────────────────────────

// 8. Compare required, optional, absent, and explicit-undefined properties.
export type OptionalityRelations<Value> = TODO; // TODO(koan)

type _08a = Expect<
  Equal<OptionalityRelations<number>, [true, false, true, false]>
>;
type _08b = Expect<
  Equal<OptionalityRelations<number | undefined>, [true, false, true, true]>
>;
type _08c = Expect<
  Equal<OptionalityRelations<undefined>, [true, false, true, true]>
>;
type _08d = Expect<
  Equal<OptionalityRelations<never>, [true, false, true, false]>
>;

// 9. Compare readonly and mutable object-property contracts.
export type ReadonlyPropertyRelations<Value> = TODO; // TODO(koan)

type _09a = Expect<Equal<ReadonlyPropertyRelations<number>, [true, true]>>;
type _09b = Expect<
  Equal<ReadonlyPropertyRelations<{ nested: string }>, [true, true]>
>;
type _09c = Expect<
  Equal<ReadonlyPropertyRelations<readonly string[]>, [true, true]>
>;
type _09d = Expect<Equal<ReadonlyPropertyRelations<never>, [true, true]>>;

// 10. Check an open record contract for a chosen key and value domain.
export type SatisfiesRecord<
  Source,
  Key extends PropertyKey,
  Value,
> = TODO; // TODO(koan)

type _10a = Expect<
  Equal<SatisfiesRecord<{ a: string; b: string }, string, string>, true>
>;
type _10b = Expect<
  Equal<SatisfiesRecord<{ a: string; b: number }, string, string>, false>
>;
type _10c = Expect<
  Equal<SatisfiesRecord<{ x: 1 }, "x" | "y", number>, false>
>;
type _10d = Expect<
  Equal<SatisfiesRecord<{ 0: string }, number, string>, true>
>;
type _10e = Expect<
  Equal<
    SatisfiesRecord<{ [key: symbol]: number }, symbol, number>,
    true
  >
>;

// 11. Compare a source and an open record in both directions.
export type RecordDirections<Source, Value> = TODO; // TODO(koan)

type _11a = Expect<
  Equal<RecordDirections<{ fixed: string }, string>, [true, false]>
>;
type _11b = Expect<
  Equal<RecordDirections<{ fixed: "x"; extra: "y" }, string>, [true, false]>
>;
type _11c = Expect<
  Equal<RecordDirections<{ fixed: number }, string>, [false, false]>
>;
type _11d = Expect<
  Equal<RecordDirections<{}, unknown>, [true, false]>
>;

// ─── Container and callable variance ──────────────────────────────────────

// 12. Compare two array or tuple contracts in both directions.
export type ContainerDirections<
  Source extends readonly unknown[],
  Target extends readonly unknown[],
> = TODO; // TODO(koan)

type _12a = Expect<
  Equal<ContainerDirections<string[], readonly string[]>, [true, false]>
>;
type _12b = Expect<
  Equal<ContainerDirections<"x"[], string[]>, [true, false]>
>;
type _12c = Expect<
  Equal<ContainerDirections<[1, 2], number[]>, [true, false]>
>;
type _12d = Expect<
  Equal<
    ContainerDirections<readonly [1, 2], readonly number[]>,
    [true, false]
  >
>;
type _12e = Expect<
  Equal<ContainerDirections<readonly [], readonly unknown[]>, [true, false]>
>;

// 13. Check tuple length, optional position, and rest-position contracts.
export type TupleContractProfile<Tuple extends readonly unknown[]> = TODO; // TODO(koan)

type _13a = Expect<
  Equal<TupleContractProfile<readonly [1, 2]>, [true, true, true]>
>;
type _13b = Expect<
  Equal<TupleContractProfile<readonly [1]>, [false, true, true]>
>;
type _13c = Expect<
  Equal<TupleContractProfile<readonly []>, [false, false, false]>
>;
type _13d = Expect<
  Equal<TupleContractProfile<readonly number[]>, [false, false, false]>
>;

// 14. Compare two callable contracts in both directions.
export type FunctionDirections<
  Source extends (...args: any[]) => any,
  Target extends (...args: any[]) => any,
> = TODO; // TODO(koan)

type _14a = Expect<
  Equal<FunctionDirections<() => "x", () => string>, [true, false]>
>;
type _14b = Expect<
  Equal<
    FunctionDirections<
      (value: unknown) => string,
      (value: string) => unknown
    >,
    [true, false]
  >
>;
type _14c = Expect<
  Equal<
    FunctionDirections<
      (value: string, count?: number) => void,
      (value: string) => void
    >,
    [true, true]
  >
>;
type _14d = Expect<
  Equal<FunctionDirections<(...values: number[]) => void, () => void>, [true, true]>
>;

// 15. Contrast method bivariance with strict function-property variance.
export type HandlerVariance<Wide, Narrow> = TODO; // TODO(koan)

type _15a = Expect<
  Equal<HandlerVariance<unknown, string>, [true, true, false, true]>
>;
type _15b = Expect<
  Equal<HandlerVariance<string | number, string>, [true, true, false, true]>
>;
type _15c = Expect<
  Equal<HandlerVariance<{ id: number }, { id: 1 }>, [true, true, false, true]>
>;
type _15d = Expect<
  Equal<HandlerVariance<string, string>, [true, true, true, true]>
>;

// 16. Classify callable objects, plain functions, and constructors by surface.
export type CallableSurface<Value> = TODO; // TODO(koan)

type _16a = Expect<Equal<CallableSurface<GivenCallable>, [true, false, true]>>;
type _16b = Expect<
  Equal<CallableSurface<(value: string) => number>, [true, false, false]>
>;
type _16c = Expect<
  Equal<CallableSurface<GivenConstructable>, [false, true, false]>
>;
type _16d = Expect<
  Equal<CallableSurface<{ label: string }>, [false, false, true]>
>;

// ─── Class identity and structural brands ─────────────────────────────────

// 17. Compare class identity while also exposing each public value capability.
export type ClassRelation<Source, Target> = TODO; // TODO(koan)

type _17a = Expect<
  Equal<ClassRelation<GivenChild, GivenBase>, [true, true, true]>
>;
type _17b = Expect<
  Equal<ClassRelation<GivenBase, GivenChild>, [false, true, true]>
>;
type _17c = Expect<
  Equal<ClassRelation<GivenChild, GivenSibling>, [false, true, true]>
>;
type _17d = Expect<
  Equal<ClassRelation<GivenBase, GivenUnrelated>, [false, true, true]>
>;
type _17e = Expect<
  Equal<ClassRelation<GivenUnrelated, { value: string }>, [true, true, true]>
>;

// 18. Construct a structural brand from a base, name, and symbol identity.
export type Branded<
  Value,
  Name,
  Token extends symbol,
> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<
    Branded<string, "UserId", typeof givenUserBrand>,
    string & { readonly [givenUserBrand]: "UserId" }
  >
>;
type _18b = Expect<
  Equal<
    Branded<number, "Order", typeof givenOrderBrand>,
    number & { readonly [givenOrderBrand]: "Order" }
  >
>;
type _18c = Expect<
  Equal<
    Branded<string, "UserId", typeof givenUserBrand> extends string
      ? true
      : false,
    true
  >
>;
type _18d = Expect<
  Equal<
    string extends Branded<string, "UserId", typeof givenUserBrand>
      ? true
      : false,
    false
  >
>;
type _18e = Expect<
  Equal<
    Branded<string, "UserId", typeof givenUserBrand> extends
      Branded<string, "OrderId", typeof givenOrderBrand>
      ? true
      : false,
    false
  >
>;

// 19. Compare shared brand machinery through its name parameter.
type GivenSharedBrand<Value, Name> =
  Value & { readonly [givenUserBrand]: Name };

export type SharedBrandDirections<LeftName, RightName> = TODO; // TODO(koan)

type _19a = Expect<
  Equal<SharedBrandDirections<"User", string>, [true, false]>
>;
type _19b = Expect<
  Equal<SharedBrandDirections<"User", "Order">, [false, false]>
>;
type _19c = Expect<
  Equal<SharedBrandDirections<"User", "User">, [true, true]>
>;
type _19d = Expect<
  Equal<SharedBrandDirections<1, number>, [true, false]>
>;

// 20. Preserve a brand when a wider branded value gains public source metadata.
export type AddBrandMetadata<Brand, Metadata extends object> = TODO; // TODO(koan)

type _20a = Expect<
  Equal<
    AddBrandMetadata<
      GivenSharedBrand<string, "User">,
      { source: "db" }
    >,
    GivenSharedBrand<string, "User"> & { source: "db" }
  >
>;
type _20b = Expect<
  Equal<
    AddBrandMetadata<
      GivenSharedBrand<number, "Order">,
      { readonly cached: true }
    > extends GivenSharedBrand<number, "Order">
      ? true
      : false,
    true
  >
>;
type _20c = Expect<
  Equal<AddBrandMetadata<string, {}>, string>
>;
type _20d = Expect<
  Equal<AddBrandMetadata<never, { source: string }>, never>
>;

// ─── Nullish and exact-optional boundary cases ─────────────────────────────

// 21. Compare void, undefined, and null assignability for one source.
export type NullishRelations<Value> = TODO; // TODO(koan)

type _21a = Expect<Equal<NullishRelations<undefined>, [true, true, false]>>;
type _21b = Expect<Equal<NullishRelations<void>, [true, false, false]>>;
type _21c = Expect<Equal<NullishRelations<null>, [false, false, true]>>;
type _21d = Expect<Equal<NullishRelations<string>, [false, false, false]>>;

// 22. Compare optional absence with a required explicitly-undefined value.
export type ExactOptionalDirections<Value> = TODO; // TODO(koan)

type _22a = Expect<Equal<ExactOptionalDirections<number>, [false, false]>>;
type _22b = Expect<
  Equal<ExactOptionalDirections<number | undefined>, [false, true]>
>;
type _22c = Expect<Equal<ExactOptionalDirections<undefined>, [false, true]>>;
type _22d = Expect<Equal<ExactOptionalDirections<never>, [false, false]>>;
