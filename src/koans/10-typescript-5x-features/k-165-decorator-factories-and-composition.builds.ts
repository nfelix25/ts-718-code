import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-165: decorator factories and composition — constructions
 * =============================================================================
 *
 * A decorator factory is an ordinary function that returns a decorator, which
 * means configuration happens at one moment and decoration at another. Reading
 * a stack of them is a matter of keeping those moments apart: every factory
 * expression evaluates in source order, top to bottom, and only then are the
 * decorators applied — from the one closest to the declaration outward.
 *
 * Composition is the same idea made explicit. A combinator that folds several
 * decorators into one has to apply them in that same inner-to-outer order, and
 * because each step returns something assignable to the original method, the
 * whole stack does too. What a stack cannot do is change the method's declared
 * type: every wrapper is checked against the original, so a chain that
 * transformed the result would have to say so in the declaration. Replace each
 * `TODO` with a type satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

// One receiver, and a decorated class whose declared surface is what the source
// said — however many decorators were stacked on it.
type GivenReceiver = { offset: number };
declare const decoratedCalculator: {
  new (): { run(value: number): string; fail(): never; calculate(value: number): number };
};

// ─── The material a factory produces ──────────────────────────────────

// 1. Build the method shape the decorators in this file operate on.
export type ComposableMethod<This, Args extends readonly unknown[], Result> = TODO; // TODO(koan)

type _01a = Expect<
  Equal<Parameters<ComposableMethod<GivenReceiver, [value: number], string>>, [value: number]>
>;
type _01b = Expect<Equal<ThisParameterType<ComposableMethod<GivenReceiver, [], string>>, GivenReceiver>>;
type _01c = Expect<Equal<ReturnType<ComposableMethod<GivenReceiver, [], string>>, string>>;
type _01d = Expect<
  Equal<
    {
      widerInputAccepted: GivenExtends<
        ComposableMethod<GivenReceiver, [value: number | string], string>,
        ComposableMethod<GivenReceiver, [value: number], string>
      >;
      widerResultRefused: GivenExtends<
        ComposableMethod<GivenReceiver, [value: number], string | number>,
        ComposableMethod<GivenReceiver, [value: number], string>
      >;
    },
    { widerInputAccepted: true; widerResultRefused: false }
  >
>;

// 2. Build the decorator that operates on it.
export type ComposableMethodDecorator<This, Args extends readonly unknown[], Result> = TODO; // TODO(koan)

type _02a = Expect<
  Equal<
    Parameters<ComposableMethodDecorator<GivenReceiver, [value: number], string>>[0],
    ComposableMethod<GivenReceiver, [value: number], string>
  >
>;
type _02b = Expect<
  Equal<
    Parameters<ComposableMethodDecorator<GivenReceiver, [value: number], string>>[1] extends {
      name: infer Name;
    }
      ? Name
      : never,
    string | symbol
  >
>;
type _02c = Expect<
  Equal<
    {
      returned: ReturnType<ComposableMethodDecorator<GivenReceiver, [value: number], string>>;
      nonFactoryHasNoShape: FactoryShape<string>;
    },
    { returned: ComposableMethod<GivenReceiver, [value: number], string> | void; nonFactoryHasNoShape: never }
  >
>;
type _02d = Expect<Equal<Parameters<ComposableMethodDecorator<GivenReceiver, [], void>>["length"], 2>>;

// 3. Build the factory shape itself: some configuration in, a decorator out.
//    Making the configuration a tuple is what lets one alias describe factories
//    of every arity.
export type DecoratorFactory<Config extends readonly unknown[], Decorator> = TODO; // TODO(koan)

type _03a = Expect<
  Equal<
    Parameters<
      DecoratorFactory<[label: string], ComposableMethodDecorator<GivenReceiver, [value: number], string>>
    >,
    [label: string]
  >
>;
type _03b = Expect<
  Equal<
    {
      produced: ReturnType<
        DecoratorFactory<[label: string], ComposableMethodDecorator<GivenReceiver, [value: number], string>>
      >;
      nonFactoryHasNoShape: FactoryShape<string>;
    },
    { produced: ComposableMethodDecorator<GivenReceiver, [value: number], string>; nonFactoryHasNoShape: never }
  >
>;
type _03c = Expect<
  Equal<Parameters<DecoratorFactory<[], ComposableMethodDecorator<GivenReceiver, [], void>>>, []>
>;
type _03d = Expect<
  Equal<
    {
      sameArityAccepted: GivenExtends<
        (label: string) => ComposableMethodDecorator<GivenReceiver, [value: number], string>,
        DecoratorFactory<[label: string], ComposableMethodDecorator<GivenReceiver, [value: number], string>>
      >;
      extraConfigurationRefused: GivenExtends<
        (label: string, enabled: boolean) => ComposableMethodDecorator<GivenReceiver, [value: number], string>,
        DecoratorFactory<[label: string], ComposableMethodDecorator<GivenReceiver, [value: number], string>>
      >;
    },
    { sameArityAccepted: true; extraConfigurationRefused: false }
  >
>;
type _03e = Expect<
  Equal<
    {
      fewerConfigurationValuesAccepted: GivenExtends<
        () => ComposableMethodDecorator<GivenReceiver, [value: number], string>,
        DecoratorFactory<[label: string], ComposableMethodDecorator<GivenReceiver, [value: number], string>>
      >;
      nonFactoryHasNoShape: FactoryShape<string>;
    },
    { fewerConfigurationValuesAccepted: true; nonFactoryHasNoShape: never }
  >
>;

// ─── The two moments ──────────────────────────────────────────────────

// 4. Build the reader that separates them: from a factory, what it is
//    configured with and what it produces.
export type FactoryShape<Factory> = TODO; // TODO(koan)

type _04a = Expect<
  Equal<
    FactoryShape<
      DecoratorFactory<[label: string], ComposableMethodDecorator<GivenReceiver, [value: number], string>>
    >["configuration"],
    [label: string]
  >
>;
type _04b = Expect<
  Equal<
    {
      decorator: FactoryShape<
        DecoratorFactory<[label: string], ComposableMethodDecorator<GivenReceiver, [value: number], string>>
      >["decorator"];
      nonFactoryHasNoShape: FactoryShape<string>;
    },
    { decorator: ComposableMethodDecorator<GivenReceiver, [value: number], string>; nonFactoryHasNoShape: never }
  >
>;
type _04c = Expect<Equal<FactoryShape<string>, never>>;
type _04d = Expect<
  Equal<
    FactoryShape<
      DecoratorFactory<[log: string[], label: string], ComposableMethodDecorator<GivenReceiver, [], void>>
    >["configuration"],
    [log: string[], label: string]
  >
>;

// 5. Build the concrete factory this packet uses: two configuration values, and
//    a decorator that stays generic in the method so one factory covers a whole
//    class.
export type AroundFactory = TODO; // TODO(koan)

type _05a = Expect<Equal<Parameters<AroundFactory>, [log: string[], label: string]>>;
type _05b = Expect<Equal<Parameters<ReturnType<AroundFactory>>["length"], 2>>;
type _05c = Expect<
  Equal<
    Parameters<ReturnType<AroundFactory>>[1] extends { kind: infer Kind } ? Kind : never,
    "method"
  >
>;
type _05d = Expect<
  Equal<
    {
      wrapped: ReturnType<ReturnType<AroundFactory>>;
      nonFactoryHasNoShape: FactoryShape<string>;
    },
    { wrapped: ComposableMethod<unknown, readonly unknown[], unknown>; nonFactoryHasNoShape: never }
  >
>;

// ─── Folding a stack into one ─────────────────────────────────────────

// 6. Build the combinator's signature. It takes any number of decorators for one
//    method and produces a single decorator for that same method — which is
//    what makes a stack and a composition interchangeable. Note what reflection
//    does with a *readonly* rest parameter: `Parameters` infers into
//    `...args: infer P`, which wants a mutable list, so it answers `never`
//    rather than the element type.
export type ComposeMethodDecorators = TODO; // TODO(koan)

type _06a = Expect<Equal<Parameters<ComposeMethodDecorators>, never>>;
type _06b = Expect<
  Equal<
    {
      composed: ReturnType<ComposeMethodDecorators>;
      nonFactoryHasNoShape: FactoryShape<string>;
    },
    { composed: ComposableMethodDecorator<unknown, readonly unknown[], unknown>; nonFactoryHasNoShape: never }
  >
>;
type _06c = Expect<
  Equal<
    {
      resultIsAnotherDecorator: GivenExtends<
        ReturnType<ComposeMethodDecorators>,
        ComposableMethodDecorator<unknown, readonly unknown[], unknown>
      >;
      extraConfigurationRefused: GivenExtends<
        (label: string, enabled: boolean) => ComposableMethodDecorator<GivenReceiver, [value: number], string>,
        DecoratorFactory<[label: string], ComposableMethodDecorator<GivenReceiver, [value: number], string>>
      >;
    },
    { resultIsAnotherDecorator: true; extraConfigurationRefused: false }
  >
>;
type _06d = Expect<
  Equal<
    {
      composedReplacement: ReturnType<ReturnType<ComposeMethodDecorators>>;
      nonFactoryHasNoShape: FactoryShape<string>;
    },
    { composedReplacement: ComposableMethod<unknown, readonly unknown[], unknown> | void; nonFactoryHasNoShape: never }
  >
>;

// 7. Build the application order as data. Decorator *expressions* evaluate top
//    to bottom, but the decorators *apply* from the closest to the declaration
//    outward — so a stack written [a, b, c] is applied c, b, a.
export type ApplicationOrder<Stack extends readonly unknown[]> = TODO; // TODO(koan)

type _07a = Expect<Equal<ApplicationOrder<["a", "b", "c"]>, ["c", "b", "a"]>>;
type _07b = Expect<Equal<ApplicationOrder<["only"]>, ["only"]>>;
type _07c = Expect<Equal<ApplicationOrder<[]>, []>>;
type _07d = Expect<Equal<ApplicationOrder<["outer", "inner"]>, ["inner", "outer"]>>;
type _07e = Expect<Equal<ApplicationOrder<ApplicationOrder<["a", "b", "c"]>>, ["a", "b", "c"]>>;

// 8. Build the evaluation order, which is simply the source order — the two
//    lists are reverses of each other, and confusing them is the classic
//    stacked-decorator bug.
export type EvaluationOrder<Stack extends readonly unknown[]> = TODO; // TODO(koan)

type _08a = Expect<Equal<EvaluationOrder<["a", "b", "c"]>, ["a", "b", "c"]>>;
type _08b = Expect<Equal<EvaluationOrder<[]>, []>>;
type _08c = Expect<
  Equal<Equal<EvaluationOrder<["a", "b", "c"]>, ApplicationOrder<["a", "b", "c"]>>, false>
>;
type _08d = Expect<
  Equal<
    {
      singleStackAgrees: Equal<EvaluationOrder<["only"]>, ApplicationOrder<["only"]>>;
      nonFactoryHasNoShape: FactoryShape<string>;
    },
    { singleStackAgrees: true; nonFactoryHasNoShape: never }
  >
>;

// ─── What composition preserves ───────────────────────────────────────

// 9. Report the fold. Each decorator in a stack is checked against the original
//    method, so every intermediate result is assignable to it — and therefore so
//    is the composition.
export type CompositionProfile = TODO; // TODO(koan)

type _09a = Expect<Equal<CompositionProfile["eachStepFits"], true>>;
type _09b = Expect<Equal<CompositionProfile["composedIsADecorator"], true>>;
type _09c = Expect<
  Equal<
    {
      composedReplacement: CompositionProfile["composedReplacement"];
      nonFactoryHasNoShape: FactoryShape<string>;
    },
    { composedReplacement: ComposableMethod<unknown, readonly unknown[], unknown> | void; nonFactoryHasNoShape: never }
  >
>;
type _09d = Expect<Equal<CompositionProfile["emptyStackIsIdentity"], []>>;
type _09e = Expect<Equal<CompositionProfile["orderIsReversed"], true>>;

// 10. Build the factory that changes the result type on purpose. It cannot be a
//     plain wrapper — the replacement it returns has a different result, so the
//     declaration has to be written that way from the start.
export type MapResultFactory = TODO; // TODO(koan)

type _10a = Expect<Equal<Parameters<MapResultFactory>["length"], 1>>;
type _10b = Expect<Equal<Parameters<MapResultFactory>[0], (value: unknown) => unknown>>;
type _10c = Expect<Equal<Parameters<ReturnType<MapResultFactory>>["length"], 2>>;
type _10d = Expect<
  Equal<
    {
      produced: ReturnType<ReturnType<MapResultFactory>>;
      nonFactoryHasNoShape: FactoryShape<string>;
    },
    { produced: ComposableMethod<unknown, readonly unknown[], unknown>; nonFactoryHasNoShape: never }
  >
>;
type _10e = Expect<
  Equal<
    {
      transformedResult: ReturnType<typeof mapNumbersToStrings>;
      extraConfigurationRefused: GivenExtends<
        (label: string, enabled: boolean) => ComposableMethodDecorator<GivenReceiver, [value: number], string>,
        DecoratorFactory<[label: string], ComposableMethodDecorator<GivenReceiver, [value: number], string>>
      >;
    },
    {
      transformedResult: ComposableMethod<GivenReceiver, [value: number], string>;
      extraConfigurationRefused: false;
    }
  >
>;

declare const mapNumbersToStrings: (
  original: ComposableMethod<GivenReceiver, [value: number], number>,
  context: ClassMethodDecoratorContext<GivenReceiver, ComposableMethod<GivenReceiver, [value: number], number>>,
) => ComposableMethod<GivenReceiver, [value: number], string>;

// 11. Report the type-changing case. A wrapper whose result differs is *not*
//     assignable to the original, which is exactly the compiler refusing to let
//     a decorator silently rewrite a method's contract.
export type ResultChangeProfile = TODO; // TODO(koan)

type _11a = Expect<Equal<ResultChangeProfile["transformedFitsTheOriginal"], false>>;
type _11b = Expect<Equal<ResultChangeProfile["originalFitsTheTransformed"], false>>;
type _11c = Expect<Equal<ResultChangeProfile["soItIsNotAPlainDecorator"], false>>;
type _11d = Expect<Equal<ResultChangeProfile["transformedResult"], string>>;

// 12. Build the observing factory — the other common shape, which returns
//     nothing and therefore composes with anything.
export type ObserverFactory = TODO; // TODO(koan)

type _12a = Expect<Equal<ReturnType<ReturnType<ObserverFactory>>, void>>;
type _12b = Expect<Equal<Parameters<ObserverFactory>, [log: string[]]>>;
type _12c = Expect<
  Equal<
    {
      observerIsStillADecorator: GivenExtends<
        ReturnType<ObserverFactory>,
        ComposableMethodDecorator<unknown, readonly unknown[], unknown>
      >;
      nonFactoryHasNoShape: FactoryShape<string>;
    },
    { observerIsStillADecorator: true; nonFactoryHasNoShape: never }
  >
>;
type _12d = Expect<Equal<Parameters<ReturnType<ObserverFactory>>["length"], 2>>;

// ─── What a stack does not change ─────────────────────────────────────

// 13. Report the declared surface of a class with decorators stacked on every
//     member. Whatever the wrappers did at runtime, the signatures are the ones
//     that were written.
export type DeclaredSurfaceProfile = TODO; // TODO(koan)

type _13a = Expect<Equal<DeclaredSurfaceProfile["stackedMethodArguments"], [value: number]>>;
type _13b = Expect<Equal<DeclaredSurfaceProfile["stackedMethodResult"], string>>;
type _13c = Expect<Equal<DeclaredSurfaceProfile["neverReturningMethod"], never>>;
type _13d = Expect<Equal<DeclaredSurfaceProfile["transformedMethodResult"], number>>;
type _13e = Expect<Equal<DeclaredSurfaceProfile["keys"], "run" | "fail" | "calculate">>;

// 14. Report the two orders side by side for a three-deep stack — the answer to
//     "which one runs first" depends on which question is being asked.
export type OrderProfile = TODO; // TODO(koan)

type _14a = Expect<Equal<OrderProfile["factoriesEvaluate"], ["outer", "middle", "inner"]>>;
type _14b = Expect<Equal<OrderProfile["decoratorsApply"], ["inner", "middle", "outer"]>>;
type _14c = Expect<Equal<OrderProfile["firstToEvaluate"], "outer">>;
type _14d = Expect<Equal<OrderProfile["firstToApply"], "inner">>;
type _14e = Expect<Equal<OrderProfile["theyDisagree"], false>>;

// ─── Assembling a stack ───────────────────────────────────────────────

// 15. Build the gate that admits a stack only when every member decorates the
//     same method.
export type ValidStack<Decorator, Stack extends readonly unknown[]> = TODO; // TODO(koan)

type _15a = Expect<
  Equal<
    ValidStack<
      ComposableMethodDecorator<GivenReceiver, [value: number], string>,
      [ComposableMethodDecorator<GivenReceiver, [value: number], string>]
    >,
    [ComposableMethodDecorator<GivenReceiver, [value: number], string>]
  >
>;
type _15b = Expect<
  Equal<ValidStack<ComposableMethodDecorator<GivenReceiver, [value: number], string>, [string]>, never>
>;
type _15c = Expect<
  Equal<ValidStack<ComposableMethodDecorator<GivenReceiver, [value: number], string>, []>, []>
>;
type _15d = Expect<
  Equal<
    ValidStack<
      ComposableMethodDecorator<GivenReceiver, [value: number], string>,
      [ComposableMethodDecorator<GivenReceiver, [value: number], string>, number]
    >,
    never
  >
>;

// 16. Build the reader that recovers the method a whole stack operates on, by
//     taking it from the first decorator.
export type StackTarget<Stack extends readonly unknown[]> = TODO; // TODO(koan)

type _16a = Expect<
  Equal<
    {
      target: StackTarget<[ComposableMethodDecorator<GivenReceiver, [value: number], string>]>;
      nonFactoryHasNoShape: FactoryShape<string>;
    },
    { target: ComposableMethod<GivenReceiver, [value: number], string>; nonFactoryHasNoShape: never }
  >
>;
type _16b = Expect<
  Equal<
    {
      target: StackTarget<
        [
          ComposableMethodDecorator<GivenReceiver, [value: number], string>,
          ComposableMethodDecorator<GivenReceiver, [value: number], string>,
        ]
      >;
      nonFactoryHasNoShape: FactoryShape<string>;
    },
    { target: ComposableMethod<GivenReceiver, [value: number], string>; nonFactoryHasNoShape: never }
  >
>;
type _16c = Expect<Equal<StackTarget<[]>, never>>;
type _16d = Expect<Equal<StackTarget<[string]>, never>>;

// 17. Build the configuration reader that folds a list of factories into the
//     tuple of what each one needs — the thing a declarative decorator config
//     would be typed against.
export type StackConfiguration<Factories extends readonly unknown[]> = TODO; // TODO(koan)

type _17a = Expect<Equal<StackConfiguration<[AroundFactory]>, [[log: string[], label: string]]>>;
type _17b = Expect<Equal<StackConfiguration<[ObserverFactory]>, [[log: string[]]]>>;
type _17c = Expect<
  Equal<StackConfiguration<[AroundFactory, ObserverFactory]>, [[log: string[], label: string], [log: string[]]]>
>;
type _17d = Expect<Equal<StackConfiguration<[]>, []>>;
type _17e = Expect<Equal<StackConfiguration<[string]>, [never]>>;

// 18. Report one stack at a glance: what it decorates, in what order it applies,
//     and what the composed decorator looks like.
export type StackReport<Stack extends readonly unknown[]> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<
    {
      target: StackReport<[ComposableMethodDecorator<GivenReceiver, [value: number], string>]>["target"];
      nonFactoryHasNoShape: FactoryShape<string>;
    },
    { target: ComposableMethod<GivenReceiver, [value: number], string>; nonFactoryHasNoShape: never }
  >
>;
type _18b = Expect<Equal<StackReport<["a", "b", "c"]>["application"], ["c", "b", "a"]>>;
type _18c = Expect<Equal<StackReport<["a", "b", "c"]>["evaluation"], ["a", "b", "c"]>>;
type _18d = Expect<Equal<StackReport<["a", "b", "c"]>["size"], 3>>;
type _18e = Expect<Equal<StackReport<[]>["target"], never>>;
