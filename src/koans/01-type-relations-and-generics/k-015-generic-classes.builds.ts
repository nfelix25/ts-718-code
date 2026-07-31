import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-015: Generic classes — constructions
 * =============================================================================
 *
 * These constructions build the persistent instance surfaces, independently
 * generic methods, constructor and static sides, paired parameters, stateful
 * containers, constrained registries, and structural variance boundaries of
 * generic classes. They keep the one shared static family separate from each
 * selected instance argument. Replace each `TODO` with a type that satisfies
 * the assertions directly below it.
 */

type GivenKind<Value> =
  0 extends 1 & Value
    ? "any"
    : [Value] extends [never]
      ? "never"
      : unknown extends Value
        ? [keyof Value] extends [never] ? "unknown" : "ordinary"
        : "ordinary";

class GivenAnimal {
  animal = true;
}

class GivenDog extends GivenAnimal {
  dog = true;
}

declare const givenPrivateCellBrand: unique symbol;

// ─── Box instances, methods, and constructors ───────────────────────────────

// 1. Build the instance surface that reuses one selected element type.
export type BoxInstance<Value> =
  TODO; // TODO(koan)

type _01a = Expect<
  Equal<
    BoxInstance<number>,
    {
      value: number;
      get(): number;
      set(value: number): void;
      map<Result>(
        transform: (value: number) => Result,
      ): BoxInstance<Result>;
    }
  >
>;
type _01b = Expect<
  Equal<ReturnType<BoxInstance<string>["get"]>, string>
>;
type _01c = Expect<
  Equal<Parameters<BoxInstance<{ id: number }>["set"]>, [value: { id: number }]>
>;
type _01d = Expect<
  Equal<BoxInstance<never>["value"], never>
>;
type _01e = Expect<
  Equal<BoxInstance<readonly [1, 2]>["value"], readonly [1, 2]>
>;

// 2. Produce the independently selected box returned by map.
export type BoxMapResult<Value, Result> =
  TODO; // TODO(koan)

type _02a = Expect<
  Equal<BoxMapResult<number, string>["value"], string>
>;
type _02b = Expect<
  Equal<
    ReturnType<BoxMapResult<string, { length: number }>["get"]>,
    { length: number }
  >
>;
type _02c = Expect<
  Equal<
    Parameters<BoxMapResult<never, boolean>["set"]>,
    [value: boolean]
  >
>;
type _02d = Expect<
  Equal<
    BoxMapResult<unknown, readonly [1, 2]>["value"],
    readonly [1, 2]
  >
>;

// 3. Construct the generic constructor that infers a fresh instance argument.
export type BoxConstructor =
  TODO; // TODO(koan)

declare const GivenBox: BoxConstructor;
const constructedNumberBox = new GivenBox(1);
const constructedStringBox = new GivenBox("text");
const constructedObjectBox = new GivenBox({ id: 1 });
const constructedTupleBox = new GivenBox([1, 2] as const);
type _03a = Expect<
  Equal<
    BoxConstructor,
    new <Value>(value: Value) => BoxInstance<Value>
  >
>;
type _03b = Expect<
  Equal<typeof constructedNumberBox["value"], number>
>;
type _03c = Expect<
  Equal<ReturnType<typeof constructedStringBox["get"]>, string>
>;
type _03d = Expect<
  Equal<typeof constructedObjectBox["value"], { id: number }>
>;
type _03e = Expect<
  Equal<typeof constructedTupleBox["value"], readonly [1, 2]>
>;

// 4. Build the shared static side with an independent generic factory.
export type BoxStaticSide =
  TODO; // TODO(koan)

declare const GivenBoxStatic: BoxStaticSide;
const staticConstructed = new GivenBoxStatic(true);
const staticNumber = GivenBoxStatic.of(1);
const staticObject = GivenBoxStatic.of({ ready: true });
const staticTuple = GivenBoxStatic.of([1, 2] as const);
type _04a = Expect<
  Equal<
    BoxStaticSide,
    {
      new <Value>(value: Value): BoxInstance<Value>;
      of<Value>(value: Value): BoxInstance<Value>;
    }
  >
>;
type _04b = Expect<
  Equal<typeof staticConstructed["value"], boolean>
>;
type _04c = Expect<Equal<typeof staticNumber["value"], number>>;
type _04d = Expect<
  Equal<typeof staticObject["value"], { ready: boolean }>
>;
type _04e = Expect<
  Equal<typeof staticTuple["value"], readonly [1, 2]>
>;

// 5. Fix one instance argument before exposing a constructor.
export type FixedBoxConstructor<Value> =
  TODO; // TODO(koan)

type _05a = Expect<
  Equal<
    FixedBoxConstructor<number>,
    new (value: number) => BoxInstance<number>
  >
>;
type _05b = Expect<
  Equal<ConstructorParameters<FixedBoxConstructor<string>>, [value: string]>
>;
type _05c = Expect<
  Equal<
    InstanceType<FixedBoxConstructor<{ id: number }>>["value"],
    { id: number }
  >
>;
type _05d = Expect<
  Equal<ConstructorParameters<FixedBoxConstructor<never>>, [value: never]>
>;

// ─── Multiple persistent class parameters ───────────────────────────────────

// 6. Build a pair instance whose two positional arguments persist through swap.
export type PairInstance<Left, Right> =
  TODO; // TODO(koan)

type _06a = Expect<
  Equal<
    PairInstance<number, string>,
    {
      left: number;
      right: string;
      swap(): PairInstance<string, number>;
    }
  >
>;
type _06b = Expect<
  Equal<PairInstance<"left", true>["left"], "left">
>;
type _06c = Expect<
  Equal<PairInstance<"left", true>["right"], true>
>;
type _06d = Expect<
  Equal<
    ReturnType<PairInstance<unknown, never>["swap"]>["left"],
    never
  >
>;

// 7. Reverse both selected pair positions.
export type SwappedPair<Left, Right> =
  TODO; // TODO(koan)

type _07a = Expect<
  Equal<SwappedPair<number, string>["left"], string>
>;
type _07b = Expect<
  Equal<SwappedPair<"left", true>["right"], "left">
>;
type _07c = Expect<
  Equal<
    SwappedPair<{ id: number }, readonly [1, 2]>["left"],
    readonly [1, 2]
  >
>;
type _07d = Expect<
  Equal<SwappedPair<never, unknown>["right"], never>
>;

// 8. Construct a generic two-argument pair constructor.
export type PairConstructor =
  TODO; // TODO(koan)

declare const GivenPair: PairConstructor;
const constructedPair = new GivenPair(1, "one");
const constructedObjectPair = new GivenPair({ id: 1 }, [1, 2]);
const constructedLiteralPair = new GivenPair(
  "left" as const,
  true as const,
);
const swappedConstructedPair = constructedPair.swap();
type _08a = Expect<
  Equal<
    PairConstructor,
    new <Left, Right>(
      left: Left,
      right: Right,
    ) => PairInstance<Left, Right>
  >
>;
type _08b = Expect<
  Equal<typeof constructedPair["left"], number>
>;
type _08c = Expect<
  Equal<
    typeof constructedObjectPair["right"],
    number[]
  >
>;
type _08d = Expect<
  Equal<typeof constructedLiteralPair["left"], "left">
>;
type _08e = Expect<
  Equal<typeof swappedConstructedPair["left"], string>
>;

// ─── Empty stateful containers ──────────────────────────────────────────────

// 9. Build a stack surface whose instance argument supplies its empty state.
export type StackInstance<Value> =
  TODO; // TODO(koan)

type _09a = Expect<
  Equal<
    StackInstance<number>,
    {
      push(value: number): number;
      pop(): number | undefined;
      toArray(): number[];
    }
  >
>;
type _09b = Expect<
  Equal<ReturnType<StackInstance<string>["pop"]>, string | undefined>
>;
type _09c = Expect<
  Equal<ReturnType<StackInstance<boolean>["toArray"]>, boolean[]>
>;
type _09d = Expect<
  Equal<Parameters<StackInstance<{ id: number }>["push"]>, [value: { id: number }]>
>;
type _09e = Expect<
  Equal<ReturnType<StackInstance<never>["pop"]>, undefined>
>;

// 10. Produce all observable stack method result types.
export type StackResults<Value> =
  TODO; // TODO(koan)

type _10a = Expect<
  Equal<StackResults<number>, [number, number | undefined, number[]]>
>;
type _10b = Expect<
  Equal<StackResults<string>, [number, string | undefined, string[]]>
>;
type _10c = Expect<
  Equal<
    StackResults<readonly [1, 2]>,
    [number, readonly [1, 2] | undefined, (readonly [1, 2])[]]
  >
>;
type _10d = Expect<
  Equal<StackResults<never>, [number, undefined, never[]]>
>;

// ─── Constrained, defaulted, and fluent registries ──────────────────────────

// 11. Build a registry instance with a constrained key and defaulted value.
export type RegistryInstance<
  Key extends PropertyKey,
  Value = unknown,
> = TODO; // TODO(koan)

type _11a = Expect<
  Equal<
    RegistryInstance<string>,
    {
      set(
        key: string,
        value: unknown,
      ): RegistryInstance<string, unknown>;
      get(key: string): unknown;
    }
  >
>;
type _11b = Expect<
  Equal<
    RegistryInstance<"count", number>["get"],
    (key: "count") => number | undefined
  >
>;
type _11c = Expect<
  Equal<
    RegistryInstance<number, boolean>["set"],
    (
      key: number,
      value: boolean,
    ) => RegistryInstance<number, boolean>
  >
>;
type _11d = Expect<
  Equal<
    RegistryInstance<symbol, Date>,
    {
      set(
        key: symbol,
        value: Date,
      ): RegistryInstance<symbol, Date>;
      get(key: symbol): Date | undefined;
    }
  >
>;
type _11e = Expect<
  Equal<RegistryInstance<never, string>["get"], (key: never) => string | undefined>
>;

// 12. Produce the read and fluent-write results for one registry family member.
export type RegistryResults<
  Key extends PropertyKey,
  Value = unknown,
> = TODO; // TODO(koan)

type _12a = Expect<
  Equal<
    RegistryResults<string>,
    [unknown, RegistryInstance<string, unknown>]
  >
>;
type _12b = Expect<
  Equal<
    RegistryResults<"id", number>,
    [number | undefined, RegistryInstance<"id", number>]
  >
>;
type _12c = Expect<
  Equal<
    RegistryResults<symbol, boolean>,
    [boolean | undefined, RegistryInstance<symbol, boolean>]
  >
>;
type _12d = Expect<
  Equal<
    RegistryResults<never, never>,
    [undefined, RegistryInstance<never, never>]
  >
>;

// 13. Construct the fixed constructor for a selected registry instantiation.
export type RegistryConstructor<
  Key extends PropertyKey,
  Value = unknown,
> = TODO; // TODO(koan)

type _13a = Expect<
  Equal<
    RegistryConstructor<string>,
    new () => RegistryInstance<string, unknown>
  >
>;
type _13b = Expect<
  Equal<
    ReturnType<InstanceType<RegistryConstructor<"id", number>>["get"]>,
    number | undefined
  >
>;
type _13c = Expect<
  Equal<ConstructorParameters<RegistryConstructor<number, boolean>>, []>
>;
type _13d = Expect<
  Equal<
    Parameters<InstanceType<RegistryConstructor<never, string>>["get"]>,
    [key: never]
  >
>;

// ─── Structural uses and variance edges ─────────────────────────────────────

// 14. Build a phantom family whose parameter has no structural occurrence.
export type PhantomInstance<Value> =
  TODO; // TODO(koan)

type _14a = Expect<Equal<PhantomInstance<number>, { tag: "same" }>>;
type _14b = Expect<Equal<PhantomInstance<string>, { tag: "same" }>>;
type _14c = Expect<
  Equal<keyof PhantomInstance<number>, "tag">
>;
type _14d = Expect<
  Equal<PhantomInstance<never>["tag"], "same">
>;

// 15. Build a cell whose setter is a class-style method.
export type MethodCell<Value> =
  TODO; // TODO(koan)

type _15a = Expect<
  Equal<
    MethodCell<number>,
    { get(): number; set(value: number): void }
  >
>;
type _15b = Expect<Equal<ReturnType<MethodCell<string>["get"]>, string>>;
type _15c = Expect<
  Equal<Parameters<MethodCell<GivenDog>["set"]>, [value: GivenDog]>
>;
type _15d = Expect<
  Equal<MethodCell<never>["get"], () => never>
>;

// 16. Build a strict cell whose getter and setter are function properties.
export type PropertyCell<Value> =
  TODO; // TODO(koan)

type _16a = Expect<
  Equal<
    PropertyCell<number>,
    {
      readonly get: () => number;
      readonly set: (value: number) => void;
    }
  >
>;
type _16b = Expect<
  Equal<PropertyCell<string>["get"], () => string>
>;
type _16c = Expect<
  Equal<PropertyCell<GivenDog>["set"], (value: GivenDog) => void>
>;
type _16d = Expect<
  Equal<
    PropertyCell<readonly [1, 2]>,
    {
      readonly get: () => readonly [1, 2];
      readonly set: (value: readonly [1, 2]) => void;
    }
  >
>;

// 17. Decide assignability between class-style method cells.
export type MethodCellAssignable<From, To> =
  TODO; // TODO(koan)

type _17a = Expect<
  Equal<MethodCellAssignable<GivenDog, GivenAnimal>, true>
>; // Method parameters are bivariant; the getter remains covariant.
type _17b = Expect<
  Equal<MethodCellAssignable<GivenAnimal, GivenDog>, false>
>;
type _17c = Expect<
  Equal<MethodCellAssignable<GivenDog, GivenDog>, true>
>;
type _17d = Expect<
  Equal<MethodCellAssignable<never, GivenAnimal>, true>
>;

// 18. Decide assignability between strict function-property cells.
export type PropertyCellAssignable<From, To> =
  TODO; // TODO(koan)

type _18a = Expect<
  Equal<PropertyCellAssignable<GivenDog, GivenAnimal>, false>
>;
type _18b = Expect<
  Equal<PropertyCellAssignable<GivenAnimal, GivenDog>, false>
>;
type _18c = Expect<
  Equal<PropertyCellAssignable<GivenDog, GivenDog>, true>
>;
type _18d = Expect<
  Equal<PropertyCellAssignable<never, GivenAnimal>, false>
>;

// 19. Build an instance with a private-like branded occurrence of its argument.
export type PrivateCell<Value> =
  TODO; // TODO(koan)

type _19a = Expect<
  Equal<
    PrivateCell<number>,
    {
      readonly [givenPrivateCellBrand]: number;
      get(): number;
    }
  >
>;
type _19b = Expect<
  Equal<ReturnType<PrivateCell<string>["get"]>, string>
>;
type _19c = Expect<
  Equal<
    PrivateCell<readonly [1, 2]>[typeof givenPrivateCellBrand],
    readonly [1, 2]
  >
>;
type _19d = Expect<
  Equal<PrivateCell<never>[typeof givenPrivateCellBrand], never>
>;

// 20. Classify a special instance argument after it flows through a read method.
export type BoxArgumentKind<Value> =
  TODO; // TODO(koan)

type _20a = Expect<Equal<BoxArgumentKind<number>, "ordinary">>;
type _20b = Expect<Equal<BoxArgumentKind<any>, "any">>;
type _20c = Expect<Equal<BoxArgumentKind<unknown>, "unknown">>;
type _20d = Expect<Equal<BoxArgumentKind<never>, "never">>;

// 21. Decide whether a method-based box instantiation widens structurally.
export type BoxAssignable<From, To> =
  TODO; // TODO(koan)

type _21a = Expect<Equal<BoxAssignable<GivenDog, GivenAnimal>, true>>;
type _21b = Expect<Equal<BoxAssignable<GivenAnimal, GivenDog>, false>>;
type _21c = Expect<Equal<BoxAssignable<GivenDog, GivenDog>, true>>;
type _21d = Expect<Equal<BoxAssignable<never, GivenAnimal>, true>>;

// 22. Decide whether a method-based stack instantiation widens structurally.
export type StackAssignable<From, To> =
  TODO; // TODO(koan)

type _22a = Expect<Equal<StackAssignable<GivenDog, GivenAnimal>, true>>;
type _22b = Expect<Equal<StackAssignable<GivenAnimal, GivenDog>, false>>;
type _22c = Expect<Equal<StackAssignable<GivenDog, GivenDog>, true>>;
type _22d = Expect<Equal<StackAssignable<never, GivenAnimal>, true>>;
