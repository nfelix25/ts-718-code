import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-146: bivariance, methods and properties — constructions
 * =============================================================================
 *
 * Two ways of writing the same callback disagree about assignability. Written as
 * a function-valued *property*, the parameter is checked contravariantly and the
 * unsafe direction is refused. Written as a *method*, the parameter is checked
 * bivariantly and both directions are accepted — a deliberate exception that
 * keeps mutable built-in APIs usable, at the cost of admitting a narrow handler
 * where a broad one was promised.
 *
 * The exception is a property of the declaration, not of the shape, which is why
 * indexing a one-method object type extracts a bivariant callback that can be
 * used anywhere a function type is expected. Watch construction 7 closely: the
 * extracted callback and the strict one are *identical* as far as the identity
 * check can see, and still behave differently under assignment. Replace each
 * `TODO` with a type satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

// Arity variants, supplied so the profiles have something to compare.
type GivenOptionalMethod<Value> = { run(value?: Value): void };
type GivenOptionalProperty<Value> = { run: (value?: Value) => void };
type GivenRestMethod<Value> = { run(...values: Value[]): void };
type GivenRestProperty<Value> = { run: (...values: Value[]) => void };

// ─── The hierarchy the exception is visible against ───────────────────

// 1. Build the base of the hierarchy.
export type Animal = TODO; // TODO(koan)

type _01a = Expect<Equal<Animal["kind"], "animal" | "dog" | "cat">>;
type _01b = Expect<Equal<keyof Animal, "kind" | "name">>;
type _01c = Expect<Equal<Animal["name"], string>>;

// 2. Build the narrow member. Its extra capability is what an unsafely accepted
//    handler would try to use on the wrong value.
export type Dog = TODO; // TODO(koan)

type _02a = Expect<Equal<Dog["kind"], "dog">>;
type _02b = Expect<
  Equal<
    { narrowIntoBroad: GivenExtends<Dog, Animal>; broadIntoNarrow: GivenExtends<Animal, Dog> },
    { narrowIntoBroad: true; broadIntoNarrow: false }
  >
>;
type _02c = Expect<Equal<ReturnType<Dog["bark"]>, string>>;

// 3. Build the sibling — the value that actually arrives when the exception is
//    taken advantage of.
export type Cat = TODO; // TODO(koan)

type _03a = Expect<Equal<Cat["kind"], "cat">>;
type _03b = Expect<Equal<GivenExtends<Dog, Cat>, false>>;
type _03c = Expect<
  Equal<
    { siblingIntoBase: GivenExtends<Cat, Animal>; baseIntoSibling: GivenExtends<Animal, Cat> },
    { siblingIntoBase: true; baseIntoSibling: false }
  >
>;

// ─── The same callback, written two ways ──────────────────────────────

// 4. Build the handler whose callback is a function-valued property.
export type PropertyHandler<Value> = TODO; // TODO(koan)

type _04a = Expect<
  Equal<
    { accepts: Parameters<PropertyHandler<Dog>["handle"]>[0]; broadIntoNarrow: GivenExtends<Animal, Dog> },
    { accepts: Dog; broadIntoNarrow: false }
  >
>;
type _04b = Expect<
  Equal<
    {
      broadIntoNarrowHandler: GivenExtends<PropertyHandler<Animal>, PropertyHandler<Dog>>;
      narrowIntoBroadHandler: GivenExtends<PropertyHandler<Dog>, PropertyHandler<Animal>>;
    },
    { broadIntoNarrowHandler: true; narrowIntoBroadHandler: false }
  >
>;
type _04c = Expect<Equal<GivenExtends<PropertyHandler<Dog>, PropertyHandler<Animal>>, false>>;
type _04d = Expect<Equal<GivenExtends<PropertyHandler<Cat>, PropertyHandler<Animal>>, false>>;

// 5. Build the same handler with the callback declared as a method. Nothing
//    about the shape changes; only the comparison rule does.
export type MethodHandler<Value> = TODO; // TODO(koan)

type _05a = Expect<
  Equal<
    { accepts: Parameters<MethodHandler<Dog>["handle"]>[0]; broadIntoNarrow: GivenExtends<Animal, Dog> },
    { accepts: Dog; broadIntoNarrow: false }
  >
>;
type _05b = Expect<
  Equal<
    {
      methodAcceptsUnsafe: GivenExtends<MethodHandler<Dog>, MethodHandler<Animal>>;
      propertyRefusesUnsafe: GivenExtends<PropertyHandler<Dog>, PropertyHandler<Animal>>;
    },
    { methodAcceptsUnsafe: true; propertyRefusesUnsafe: false }
  >
>;
type _05c = Expect<
  Equal<
    {
      siblingMethodAccepted: GivenExtends<MethodHandler<Cat>, MethodHandler<Animal>>;
      siblingPropertyRefused: GivenExtends<PropertyHandler<Cat>, PropertyHandler<Animal>>;
    },
    { siblingMethodAccepted: true; siblingPropertyRefused: false }
  >
>;
type _05d = Expect<
  Equal<
    {
      methodIntoProperty: GivenExtends<MethodHandler<Dog>, PropertyHandler<Dog>>;
      narrowMethodIntoBroadProperty: GivenExtends<MethodHandler<Dog>, PropertyHandler<Animal>>;
    },
    { methodIntoProperty: true; narrowMethodIntoBroadProperty: false }
  >
>;

// 6. Build the bare strict callback — the function type on its own, with no
//    object around it.
export type StrictCallback<Value> = TODO; // TODO(koan)

type _06a = Expect<
  Equal<
    { accepts: Parameters<StrictCallback<Dog>>[0]; broadIntoNarrow: GivenExtends<Animal, Dog> },
    { accepts: Dog; broadIntoNarrow: false }
  >
>;
type _06b = Expect<
  Equal<
    {
      broadIntoNarrowCallback: GivenExtends<StrictCallback<Animal>, StrictCallback<Dog>>;
      narrowIntoBroadCallback: GivenExtends<StrictCallback<Dog>, StrictCallback<Animal>>;
    },
    { broadIntoNarrowCallback: true; narrowIntoBroadCallback: false }
  >
>;
type _06c = Expect<Equal<GivenExtends<StrictCallback<Dog>, StrictCallback<Animal>>, false>>;
type _06d = Expect<Equal<ReturnType<StrictCallback<Dog>>, void>>;

// 7. Build the bivariance hack: a one-method object type, immediately indexed to
//    pull the method's signature out as a standalone callback. The exception
//    rides along with the signature.
export type BivariantCallback<Value> = TODO; // TODO(koan)

type _07a = Expect<
  Equal<
    { accepts: Parameters<BivariantCallback<Dog>>[0]; broadIntoNarrow: GivenExtends<Animal, Dog> },
    { accepts: Dog; broadIntoNarrow: false }
  >
>;
type _07b = Expect<
  Equal<
    {
      hackAcceptsUnsafe: GivenExtends<BivariantCallback<Dog>, BivariantCallback<Animal>>;
      strictRefusesUnsafe: GivenExtends<StrictCallback<Dog>, StrictCallback<Animal>>;
    },
    { hackAcceptsUnsafe: true; strictRefusesUnsafe: false }
  >
>;
type _07c = Expect<
  Equal<
    {
      extractedFromMethod: Equal<MethodHandler<Dog>["handle"], BivariantCallback<Dog>>;
      strictRefusesUnsafe: GivenExtends<StrictCallback<Dog>, StrictCallback<Animal>>;
    },
    { extractedFromMethod: true; strictRefusesUnsafe: false }
  >
>;
type _07d = Expect<
  Equal<
    {
      identityCannotSeeTheDifference: Equal<StrictCallback<Dog>, BivariantCallback<Dog>>;
      assignabilityCan: GivenExtends<BivariantCallback<Dog>, StrictCallback<Animal>>;
    },
    { identityCannotSeeTheDifference: true; assignabilityCan: false }
  >
>;
type _07e = Expect<
  Equal<
    {
      strictIntoHack: GivenExtends<StrictCallback<Dog>, BivariantCallback<Animal>>;
      hackIntoStrict: GivenExtends<BivariantCallback<Dog>, StrictCallback<Animal>>;
    },
    { strictIntoHack: true; hackIntoStrict: false }
  >
>;

// ─── Measuring the two rules ──────────────────────────────────────────

// 8. Build the direction classifier so the exception can be named rather than
//    described.
export type DirectionOf<AtNarrow, AtBroad> = TODO; // TODO(koan)

type _08a = Expect<Equal<DirectionOf<PropertyHandler<Dog>, PropertyHandler<Animal>>, "contravariant">>;
type _08b = Expect<Equal<DirectionOf<MethodHandler<Dog>, MethodHandler<Animal>>, "bivariant">>;
type _08c = Expect<Equal<DirectionOf<StrictCallback<Dog>, StrictCallback<Animal>>, "contravariant">>;
type _08d = Expect<Equal<DirectionOf<BivariantCallback<Dog>, BivariantCallback<Animal>>, "bivariant">>;

// 9. Build the method that also returns something. The exception covers the
//    parameter only — the return type is still compared covariantly.
export type ReturningMethod<Input, Output> = TODO; // TODO(koan)

type _09a = Expect<
  Equal<
    { produced: ReturnType<ReturningMethod<Dog, Cat>["run"]>; broadIntoNarrow: GivenExtends<Animal, Dog> },
    { produced: Cat; broadIntoNarrow: false }
  >
>;
type _09b = Expect<
  Equal<
    { accepts: Parameters<ReturningMethod<Dog, Animal>["run"]>; broadIntoNarrow: GivenExtends<Animal, Dog> },
    { accepts: [value: Dog]; broadIntoNarrow: false }
  >
>;
type _09c = Expect<
  Equal<
    {
      narrowReturnAccepted: GivenExtends<ReturningMethod<Dog, Dog>, ReturningMethod<Animal, Animal>>;
      broadReturnRefused: GivenExtends<ReturningMethod<Animal, Animal>, ReturningMethod<Dog, Dog>>;
    },
    { narrowReturnAccepted: true; broadReturnRefused: false }
  >
>;
type _09d = Expect<Equal<GivenExtends<ReturningMethod<Dog, Animal>, ReturningMethod<Animal, Dog>>, false>>;
type _09e = Expect<Equal<DirectionOf<ReturningMethod<Dog, Dog>, ReturningMethod<Animal, Animal>>, "covariant">>;

// 10. Build the two-parameter method. Extra parameters do not weaken the
//     exception; every one of them is bivariant.
export type TwoMethod<Value> = TODO; // TODO(koan)

type _10a = Expect<
  Equal<
    { accepts: Parameters<TwoMethod<Dog>["run"]>; broadIntoNarrow: GivenExtends<Animal, Dog> },
    { accepts: [left: Dog, right: Dog]; broadIntoNarrow: false }
  >
>;
type _10b = Expect<
  Equal<
    {
      methodNarrowIntoBroad: GivenExtends<TwoMethod<Dog>, TwoMethod<Animal>>;
      propertyNarrowIntoBroad: GivenExtends<PropertyHandler<Dog>, PropertyHandler<Animal>>;
    },
    { methodNarrowIntoBroad: true; propertyNarrowIntoBroad: false }
  >
>;
type _10c = Expect<
  Equal<
    {
      methodBroadIntoNarrow: GivenExtends<TwoMethod<Animal>, TwoMethod<Dog>>;
      strictCallbackNarrowIntoBroad: GivenExtends<StrictCallback<Dog>, StrictCallback<Animal>>;
    },
    { methodBroadIntoNarrow: true; strictCallbackNarrowIntoBroad: false }
  >
>;
type _10d = Expect<Equal<DirectionOf<TwoMethod<Dog>, TwoMethod<Animal>>, "bivariant">>;

// 11. Build the same two-parameter callback as a property, which closes both
//     parameters at once.
export type TwoProperty<Value> = TODO; // TODO(koan)

type _11a = Expect<
  Equal<
    { accepts: Parameters<TwoProperty<Dog>["run"]>; broadIntoNarrow: GivenExtends<Animal, Dog> },
    { accepts: [left: Dog, right: Dog]; broadIntoNarrow: false }
  >
>;
type _11b = Expect<Equal<GivenExtends<TwoProperty<Dog>, TwoProperty<Animal>>, false>>;
type _11c = Expect<Equal<DirectionOf<TwoProperty<Dog>, TwoProperty<Animal>>, "contravariant">>;
type _11d = Expect<
  Equal<
    {
      methodPairAccepts: GivenExtends<TwoMethod<Dog>, TwoMethod<Animal>>;
      propertyPairRefuses: GivenExtends<TwoProperty<Dog>, TwoProperty<Animal>>;
    },
    { methodPairAccepts: true; propertyPairRefuses: false }
  >
>;

// ─── How far the exception reaches ────────────────────────────────────

// 12. Report the two rules side by side at the same argument pair. The only
//     difference between each pair of rows is the syntax the callback was
//     written in.
export type SyntaxProfile = TODO; // TODO(koan)

type _12a = Expect<Equal<SyntaxProfile["propertyHandler"], "contravariant">>;
type _12b = Expect<Equal<SyntaxProfile["methodHandler"], "bivariant">>;
type _12c = Expect<Equal<SyntaxProfile["strictCallback"], "contravariant">>;
type _12d = Expect<Equal<SyntaxProfile["bivariantCallback"], "bivariant">>;
type _12e = Expect<Equal<SyntaxProfile["sameShapeEitherWay"], true>>;

// 13. Report the arity variants. Optional and rest parameters change what a
//     caller may pass, not which rule the parameter is compared under.
export type ArityProfile = TODO; // TODO(koan)

type _13a = Expect<Equal<ArityProfile["optionalMethod"], "bivariant">>;
type _13b = Expect<Equal<ArityProfile["optionalProperty"], "contravariant">>;
type _13c = Expect<Equal<ArityProfile["restMethod"], "bivariant">>;
type _13d = Expect<Equal<ArityProfile["restProperty"], "contravariant">>;
type _13e = Expect<Equal<ArityProfile["twoParameterMethod"], "bivariant">>;

// 14. Report the wrappers. A bivariant argument stays bivariant wherever it is
//     carried, because the exception is attached to the signature rather than
//     to the position it sits in.
export type WrapperProfile = TODO; // TODO(koan)

type _14a = Expect<Equal<WrapperProfile["inPromise"], true>>;
type _14b = Expect<Equal<WrapperProfile["inReadonlyArray"], true>>;
type _14c = Expect<Equal<WrapperProfile["inReturnPosition"], true>>;
type _14d = Expect<Equal<WrapperProfile["propertyInPromise"], false>>;
type _14e = Expect<Equal<WrapperProfile["propertyInReadonlyArray"], false>>;

// 15. Report the endpoints. Bivariance accepts both the top and the bottom
//     argument; the strict rule accepts only the one that is genuinely safe.
export type EndpointProfile = TODO; // TODO(koan)

type _15a = Expect<Equal<EndpointProfile["bottomMethod"], true>>;
type _15b = Expect<Equal<EndpointProfile["topMethod"], true>>;
type _15c = Expect<Equal<EndpointProfile["bottomProperty"], false>>;
type _15d = Expect<Equal<EndpointProfile["topProperty"], true>>;
type _15e = Expect<Equal<EndpointProfile["anyThroughTheHack"], true>>;

// 16. Report unions. A union of method handlers reaches the broad handler
//     because each member does; a union of property handlers cannot, because
//     neither member accepts the sibling's values.
export type UnionProfile = TODO; // TODO(koan)

type _16a = Expect<Equal<UnionProfile["unionOfMethodHandlers"], true>>;
type _16b = Expect<Equal<UnionProfile["unionOfPropertyHandlers"], false>>;
type _16c = Expect<Equal<UnionProfile["methodIntoUnionArgument"], true>>;
type _16d = Expect<Equal<UnionProfile["propertyIntoUnionArgument"], false>>;
type _16e = Expect<
  Equal<
    { reflected: UnionProfile["reflectedParameter"]; broadIntoNarrow: GivenExtends<Animal, Dog> },
    { reflected: Dog | Cat; broadIntoNarrow: false }
  >
>;

// ─── Choosing a rule on purpose ───────────────────────────────────────

// 17. Build the API signatures. Which syntax the parameter type was written in
//     decides what a caller is allowed to hand over.
export type HandlerApi = TODO; // TODO(koan)

type _17a = Expect<
  Equal<
    { demanded: Parameters<HandlerApi["invokeMethod"]>[0]; broadIntoNarrow: GivenExtends<Animal, Dog> },
    { demanded: MethodHandler<Animal>; broadIntoNarrow: false }
  >
>;
type _17b = Expect<
  Equal<
    { demanded: Parameters<HandlerApi["invokeStrict"]>[0]; broadIntoNarrow: GivenExtends<Animal, Dog> },
    { demanded: PropertyHandler<Animal>; broadIntoNarrow: false }
  >
>;
type _17c = Expect<Equal<ReturnType<HandlerApi["onAnimal"]>, void>>;
type _17d = Expect<
  Equal<
    {
      narrowHandlerReachesTheMethodSlot: GivenExtends<MethodHandler<Dog>, Parameters<HandlerApi["invokeMethod"]>[0]>;
      narrowHandlerRefusedByTheStrictSlot: GivenExtends<PropertyHandler<Dog>, Parameters<HandlerApi["invokeStrict"]>[0]>;
    },
    { narrowHandlerReachesTheMethodSlot: true; narrowHandlerRefusedByTheStrictSlot: false }
  >
>;

// 18. Build the two handler records over an event map. Every field carries its
//     own syntax's rule, so the whole record inherits one or the other.
export type MethodHandlers<Events> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<
    { field: MethodHandlers<{ pet: Dog }>["pet"]; broadIntoNarrow: GivenExtends<Animal, Dog> },
    { field: MethodHandler<Dog>; broadIntoNarrow: false }
  >
>;
type _18b = Expect<Equal<keyof MethodHandlers<{ pet: Dog; other: Cat }>, "pet" | "other">>;
type _18c = Expect<
  Equal<
    {
      methodRecordAcceptsUnsafe: GivenExtends<MethodHandlers<{ pet: Dog }>, MethodHandlers<{ pet: Animal }>>;
      propertyHandlerRefusesUnsafe: GivenExtends<PropertyHandler<Dog>, PropertyHandler<Animal>>;
    },
    { methodRecordAcceptsUnsafe: true; propertyHandlerRefusesUnsafe: false }
  >
>;
type _18d = Expect<Equal<DirectionOf<MethodHandlers<{ pet: Dog }>, MethodHandlers<{ pet: Animal }>>, "bivariant">>;
type _18e = Expect<Equal<MethodHandlers<Record<never, never>>, Record<never, never>>>;
