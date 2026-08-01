import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-166: well-typed generic decorators — constructions
 * =============================================================================
 *
 * A decorator that is generic in the *shape* of what it decorates — receiver,
 * argument tuple, and result as three separate parameters — can be applied to
 * any method and gives back exactly the same signature. That is enough for
 * wrappers that only observe or delegate.
 *
 * It is not enough for everything. Splitting a method into three parameters
 * loses whatever the method itself was generic in, so a decorator written that
 * way cannot preserve a method's *own* type parameters. Being generic in the
 * whole callable instead — one parameter constrained to a function type — keeps
 * the method intact, at the cost of not being able to talk about its pieces. The
 * two styles are the trade-off this packet is about; the constructions below let
 * you compare them directly. Replace each `TODO` with a type satisfying the
 * assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

// One receiver, and a method that is generic in its own right — the case the
// three-parameter style cannot describe.
type GivenReceiver = { offset: number };
type GivenGenericMethod = <Value extends string>(this: GivenReceiver, value: Value) => Value;

// A decorated class, so the declared surface can be checked at the end.
declare const decoratedService: {
  new (): {
    format(value: number): string;
    increment(): number;
    identity<Value extends string>(value: Value): Value;
  };
};

// ─── The three-parameter style ────────────────────────────────────────

// 1. Build the method shape, split into the three things a wrapper needs to
//    know.
export type TypedMethod<This, Args extends readonly unknown[], Result> = TODO; // TODO(koan)

type _01a = Expect<Equal<ThisParameterType<TypedMethod<GivenReceiver, [value: number], string>>, GivenReceiver>>;
type _01b = Expect<Equal<Parameters<TypedMethod<GivenReceiver, [value: number], string>>, [value: number]>>;
type _01c = Expect<Equal<ReturnType<TypedMethod<GivenReceiver, [value: number], string>>, string>>;
type _01d = Expect<Equal<Parameters<TypedMethod<GivenReceiver, [], number>>, []>>;

// 2. Build the decorator written in that style. It is generic in all three, so
//    it applies to any method — and hands back the same three.
export type TypedMethodDecorator<This, Args extends readonly unknown[], Result> = TODO; // TODO(koan)

type _02a = Expect<
  Equal<
    Parameters<TypedMethodDecorator<GivenReceiver, [value: number], string>>[0],
    TypedMethod<GivenReceiver, [value: number], string>
  >
>;
type _02b = Expect<
  Equal<
    Parameters<TypedMethodDecorator<GivenReceiver, [value: number], string>>[1] extends {
      kind: infer Kind;
    }
      ? Kind
      : never,
    "method"
  >
>;
type _02c = Expect<Equal<Parameters<TypedMethodDecorator<GivenReceiver, [], number>>["length"], 2>>;
type _02d = Expect<
  Equal<
    {
      sameShapeAccepted: GivenExtends<
        TypedMethod<GivenReceiver, [value: number], string>,
        TypedMethod<GivenReceiver, [value: number], string>
      >;
      differentResultRefused: GivenExtends<
        TypedMethod<GivenReceiver, [value: number], number>,
        TypedMethod<GivenReceiver, [value: number], string>
      >;
    },
    { sameShapeAccepted: true; differentResultRefused: false }
  >
>;

// 3. Build the splitter that reads the three parts back out of a method — the
//    operation the three-parameter style depends on.
export type MethodParts<Method> = TODO; // TODO(koan)

type _03a = Expect<
  Equal<MethodParts<TypedMethod<GivenReceiver, [value: number], string>>["this"], GivenReceiver>
>;
type _03b = Expect<
  Equal<MethodParts<TypedMethod<GivenReceiver, [value: number], string>>["args"], [value: number]>
>;
type _03c = Expect<
  Equal<MethodParts<TypedMethod<GivenReceiver, [value: number], string>>["result"], string>
>;
type _03d = Expect<Equal<MethodParts<string>, never>>;
type _03e = Expect<Equal<MethodParts<() => void>["args"], []>>;

// ─── The whole-callable style ─────────────────────────────────────────

// 4. Build the decorator that is generic in the method itself. It never takes
//    the method apart, so whatever the method was — including its own type
//    parameters — comes back untouched.
export type ExactCallableDecorator<This, Method extends (this: This, ...args: any[]) => any> = TODO; // TODO(koan)

type _04a = Expect<
  Equal<
    Parameters<ExactCallableDecorator<GivenReceiver, TypedMethod<GivenReceiver, [value: number], string>>>[0],
    TypedMethod<GivenReceiver, [value: number], string>
  >
>;
type _04b = Expect<
  Equal<
    ReturnType<ExactCallableDecorator<GivenReceiver, GivenGenericMethod>>,
    GivenGenericMethod | void
  >
>;
type _04c = Expect<
  Equal<Parameters<ExactCallableDecorator<GivenReceiver, GivenGenericMethod>>[0], GivenGenericMethod>
>;
type _04d = Expect<
  Equal<
    Parameters<ExactCallableDecorator<GivenReceiver, GivenGenericMethod>>["length"],
    2
  >
>;

// 5. Build the reader that recovers what a decorator was handed — the first
//    parameter, whatever else the signature has. A nullary function still
//    matches the pattern, because ignoring arguments is always allowed, so it
//    reports `unknown` rather than nothing.
export type DecoratedValue<Decorator> = TODO; // TODO(koan)

type _05a = Expect<
  Equal<
    {
      handed: DecoratedValue<TypedMethodDecorator<GivenReceiver, [value: number], string>>;
      nonMethodHasNoParts: MethodParts<string>;
    },
    { handed: TypedMethod<GivenReceiver, [value: number], string>; nonMethodHasNoParts: never }
  >
>;
type _05b = Expect<
  Equal<DecoratedValue<ExactCallableDecorator<GivenReceiver, GivenGenericMethod>>, GivenGenericMethod>
>;
type _05c = Expect<Equal<DecoratedValue<string>, never>>;
type _05d = Expect<Equal<DecoratedValue<() => void>, unknown>>;

// ─── What each style keeps ────────────────────────────────────────────

// 6. Report the generic method surviving the whole-callable style and not
//    surviving the split. Rebuilding it from its parts pins the type parameter
//    to its constraint, which is a different — and weaker — method.
export type GenericPreservationProfile = TODO; // TODO(koan)

type _06a = Expect<Equal<GenericPreservationProfile["rebuiltIsTheSame"], false>>;
type _06b = Expect<Equal<GenericPreservationProfile["exactStyleKeepsIt"], true>>;
type _06c = Expect<Equal<GenericPreservationProfile["splitResultCollapsedToTheConstraint"], string>>;
type _06d = Expect<
  Equal<
    {
      rebuilt: GenericPreservationProfile["rebuiltFromParts"];
      nonMethodHasNoParts: MethodParts<string>;
    },
    { rebuilt: TypedMethod<GivenReceiver, [value: string], string>; nonMethodHasNoParts: never }
  >
>;

// 7. Report what the split style *does* keep, which is everything about a
//    non-generic method — receiver, arity, labels, and result.
export type SplitFidelityProfile = TODO; // TODO(koan)

type _07a = Expect<Equal<SplitFidelityProfile["receiver"], GivenReceiver>>;
type _07b = Expect<Equal<SplitFidelityProfile["arguments"], [value: number]>>;
type _07c = Expect<Equal<SplitFidelityProfile["result"], string>>;
type _07d = Expect<Equal<SplitFidelityProfile["roundTrips"], true>>;
type _07e = Expect<Equal<SplitFidelityProfile["labelsSurvive"], true>>;

// ─── Constraining what a decorator may be applied to ──────────────────

// 8. Build the decorator that only fits methods whose first argument is a
//    string — the constraint is written into the parameter tuple rather than
//    checked in the body.
export type RequireStringFirst<This, Rest extends readonly unknown[], Result> = TODO; // TODO(koan)

type _08a = Expect<
  Equal<
    Parameters<RequireStringFirst<GivenReceiver, [], boolean>>[0],
    TypedMethod<GivenReceiver, [first: string], boolean>
  >
>;
type _08b = Expect<
  Equal<
    Parameters<RequireStringFirst<GivenReceiver, [count: number], boolean>>[0],
    TypedMethod<GivenReceiver, [first: string, count: number], boolean>
  >
>;
type _08c = Expect<
  Equal<
    {
      produced: ReturnType<RequireStringFirst<GivenReceiver, [], boolean>>;
      nonMethodHasNoParts: MethodParts<string>;
    },
    { produced: TypedMethod<GivenReceiver, [first: string], boolean>; nonMethodHasNoParts: never }
  >
>;
type _08d = Expect<
  Equal<
    {
      stringFirstFits: GivenExtends<
        TypedMethod<GivenReceiver, [first: string], boolean>,
        Parameters<RequireStringFirst<GivenReceiver, [], boolean>>[0]
      >;
      numberFirstDoesNot: GivenExtends<
        TypedMethod<GivenReceiver, [first: number], boolean>,
        Parameters<RequireStringFirst<GivenReceiver, [], boolean>>[0]
      >;
    },
    { stringFirstFits: true; numberFirstDoesNot: false }
  >
>;

// 9. Build the predicate that asks whether a decorator can be applied to a
//    method at all — the question a constrained decorator makes decidable.
export type AppliesTo<Decorator, Method> = TODO; // TODO(koan)

type _09a = Expect<
  Equal<
    AppliesTo<
      TypedMethodDecorator<GivenReceiver, [value: number], string>,
      TypedMethod<GivenReceiver, [value: number], string>
    >,
    true
  >
>;
type _09b = Expect<
  Equal<
    AppliesTo<
      TypedMethodDecorator<GivenReceiver, [value: number], string>,
      TypedMethod<GivenReceiver, [value: string], string>
    >,
    false
  >
>;
type _09c = Expect<
  Equal<AppliesTo<RequireStringFirst<GivenReceiver, [], boolean>, TypedMethod<GivenReceiver, [first: string], boolean>>, true>
>;
type _09d = Expect<
  Equal<AppliesTo<RequireStringFirst<GivenReceiver, [], boolean>, TypedMethod<GivenReceiver, [first: number], boolean>>, false>
>;
type _09e = Expect<Equal<AppliesTo<string, TypedMethod<GivenReceiver, [], void>>, false>>;

// ─── The factories ────────────────────────────────────────────────────

// 10. Build the observing factory in the split style — the case where splitting
//     costs nothing, because the wrapper only needs to forward.
export type AuditMethodFactory = TODO; // TODO(koan)

type _10a = Expect<Equal<Parameters<AuditMethodFactory>, [log: string[], label: string]>>;
type _10b = Expect<Equal<Parameters<ReturnType<AuditMethodFactory>>["length"], 2>>;
type _10c = Expect<
  Equal<
    {
      produced: ReturnType<ReturnType<AuditMethodFactory>>;
      nonMethodHasNoParts: MethodParts<string>;
    },
    { produced: TypedMethod<unknown, readonly unknown[], unknown>; nonMethodHasNoParts: never }
  >
>;
type _10d = Expect<
  Equal<
    {
      handed: Parameters<ReturnType<AuditMethodFactory>>[0];
      nonMethodHasNoParts: MethodParts<string>;
    },
    { handed: TypedMethod<unknown, readonly unknown[], unknown>; nonMethodHasNoParts: never }
  >
>;

// 11. Build the same factory in the whole-callable style. It is generic in the
//     method, so a generic method passes through it unchanged.
export type AuditExactFactory = TODO; // TODO(koan)

type _11a = Expect<Equal<Parameters<AuditExactFactory>, [log: string[], label: string]>>;
type _11b = Expect<Equal<Parameters<ReturnType<AuditExactFactory>>["length"], 2>>;
type _11c = Expect<
  Equal<
    Equal<
      Parameters<ReturnType<AuditExactFactory>>[0],
      ReturnType<ReturnType<AuditExactFactory>>
    >,
    true
  >
>;
type _11d = Expect<
  Equal<
    {
      exactStyleKeepsTheGenericMethod: Equal<
        DecoratedValue<ExactCallableDecorator<GivenReceiver, GivenGenericMethod>>,
        GivenGenericMethod
      >;
      nonMethodHasNoParts: MethodParts<string>;
    },
    { exactStyleKeepsTheGenericMethod: true; nonMethodHasNoParts: never }
  >
>;

// ─── What the declaration says afterwards ─────────────────────────────

// 12. Report the decorated class. Every signature is the one that was written,
//     generic member included — which is the outcome the whole-callable style
//     exists to protect.
export type DeclaredSurfaceProfile = TODO; // TODO(koan)

type _12a = Expect<Equal<DeclaredSurfaceProfile["plainArguments"], [value: number]>>;
type _12b = Expect<Equal<DeclaredSurfaceProfile["plainResult"], string>>;
type _12c = Expect<Equal<DeclaredSurfaceProfile["nullaryResult"], number>>;
type _12d = Expect<Equal<DeclaredSurfaceProfile["genericMemberIsStillGeneric"], true>>;
type _12e = Expect<Equal<DeclaredSurfaceProfile["keys"], "format" | "increment" | "identity">>;

// 13. Report what reflection does to a generic member. Instantiating it at a
//     literal keeps the literal; asking for its parts at all pins the parameter
//     to its constraint.
export type GenericReflectionProfile = TODO; // TODO(koan)

type _13a = Expect<Equal<GenericReflectionProfile["atALiteral"], "literal">>;
type _13b = Expect<Equal<GenericReflectionProfile["reflectedArguments"], [value: string]>>;
type _13c = Expect<Equal<GenericReflectionProfile["reflectedResult"], string>>;
type _13d = Expect<Equal<GenericReflectionProfile["literalIsNarrowerThanTheConstraint"], true>>;

declare const identityOfLiteral: (value: "literal") => "literal";

// 14. Report the choice between the two styles as a table: which one can talk
//     about the pieces, and which one keeps the whole.
export type StyleProfile = TODO; // TODO(koan)

type _14a = Expect<Equal<StyleProfile["splitCanNameTheArguments"], [value: number]>>;
type _14b = Expect<Equal<StyleProfile["splitLosesGenerics"], false>>;
type _14c = Expect<Equal<StyleProfile["exactKeepsGenerics"], true>>;
type _14d = Expect<Equal<StyleProfile["exactCannotNameTheArguments"], [value: string]>>;

// ─── Building on the constrained form ─────────────────────────────────

// 15. Build the decorator that only fits methods returning a promise — the same
//     technique as construction 8, applied to the result instead.
export type RequireAsync<This, Args extends readonly unknown[], Value> = TODO; // TODO(koan)

type _15a = Expect<
  Equal<
    Parameters<RequireAsync<GivenReceiver, [id: string], number>>[0],
    TypedMethod<GivenReceiver, [id: string], Promise<number>>
  >
>;
type _15b = Expect<
  Equal<
    {
      produced: ReturnType<RequireAsync<GivenReceiver, [id: string], number>>;
      nonMethodHasNoParts: MethodParts<string>;
    },
    { produced: TypedMethod<GivenReceiver, [id: string], Promise<number>>; nonMethodHasNoParts: never }
  >
>;
type _15c = Expect<
  Equal<
    {
      asyncMethodFits: AppliesTo<
        RequireAsync<GivenReceiver, [id: string], number>,
        TypedMethod<GivenReceiver, [id: string], Promise<number>>
      >;
      syncMethodDoesNot: AppliesTo<
        RequireAsync<GivenReceiver, [id: string], number>,
        TypedMethod<GivenReceiver, [id: string], number>
      >;
    },
    { asyncMethodFits: true; syncMethodDoesNot: false }
  >
>;
type _15d = Expect<
  Equal<
    MethodParts<Parameters<RequireAsync<GivenReceiver, [id: string], number>>[0]>["result"],
    Promise<number>
  >
>;

// 16. Build the gate that admits a method only when a given decorator can be
//     applied to it.
export type Decoratable<Decorator, Method> = TODO; // TODO(koan)

type _16a = Expect<
  Equal<
    {
      admitted: Decoratable<
        TypedMethodDecorator<GivenReceiver, [value: number], string>,
        TypedMethod<GivenReceiver, [value: number], string>
      >;
      nonMethodHasNoParts: MethodParts<string>;
    },
    { admitted: TypedMethod<GivenReceiver, [value: number], string>; nonMethodHasNoParts: never }
  >
>;
type _16b = Expect<
  Equal<
    Decoratable<
      TypedMethodDecorator<GivenReceiver, [value: number], string>,
      TypedMethod<GivenReceiver, [value: string], string>
    >,
    never
  >
>;
type _16c = Expect<
  Equal<
    Decoratable<RequireStringFirst<GivenReceiver, [], boolean>, TypedMethod<GivenReceiver, [first: number], boolean>>,
    never
  >
>;
type _16d = Expect<Equal<Decoratable<string, TypedMethod<GivenReceiver, [], void>>, never>>;

// 17. Build the filter that keeps only the members of a class a decorator could
//     be applied to — the type-level version of "where can I use this?".
export type DecoratableKeys<Owner, Decorator> = TODO; // TODO(koan)

type _17a = Expect<
  Equal<
    DecoratableKeys<
      { a: TypedMethod<GivenReceiver, [value: number], string>; b: TypedMethod<GivenReceiver, [], void> },
      TypedMethodDecorator<GivenReceiver, [value: number], string>
    >,
    "a"
  >
>;
type _17b = Expect<
  Equal<
    DecoratableKeys<
      { a: TypedMethod<GivenReceiver, [value: number], string> },
      TypedMethodDecorator<GivenReceiver, [value: string], string>
    >,
    never
  >
>;
type _17c = Expect<
  Equal<DecoratableKeys<Record<never, never>, TypedMethodDecorator<GivenReceiver, [], void>>, never>
>;
type _17d = Expect<
  Equal<
    DecoratableKeys<
      { a: TypedMethod<GivenReceiver, [], void>; b: TypedMethod<GivenReceiver, [], void> },
      TypedMethodDecorator<GivenReceiver, [], void>
    >,
    "a" | "b"
  >
>;

// 18. Report one method at a glance under both styles.
export type StyleReport<This, Method> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<
    StyleReport<GivenReceiver, TypedMethod<GivenReceiver, [value: number], string>>["parts"]["args"],
    [value: number]
  >
>;
type _18b = Expect<
  Equal<
    {
      splitResult: StyleReport<GivenReceiver, TypedMethod<GivenReceiver, [value: number], string>>["splitDecoratorHandsBack"];
      nonMethodHasNoParts: MethodParts<string>;
    },
    {
      splitResult: TypedMethod<GivenReceiver, [value: number], string>;
      nonMethodHasNoParts: never;
    }
  >
>;
type _18c = Expect<Equal<StyleReport<GivenReceiver, GivenGenericMethod>["stylesAgree"], true>>;
type _18d = Expect<
  Equal<
    {
      exactResult: StyleReport<GivenReceiver, GivenGenericMethod>["exactDecoratorHandsBack"];
      nonMethodHasNoParts: MethodParts<string>;
    },
    { exactResult: GivenGenericMethod; nonMethodHasNoParts: never }
  >
>;
type _18e = Expect<Equal<StyleReport<GivenReceiver, string>["parts"], never>>;
