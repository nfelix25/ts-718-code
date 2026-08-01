import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-167: decorator initializers — constructions
 * =============================================================================
 *
 * `addInitializer` is the hook that runs *after* decoration, when there is
 * something real to act on. Every context has it, and its shape is the same
 * everywhere: a callback taking nothing and returning nothing. What differs is
 * `this` — for a member decorator it is the instance, and for a class decorator
 * it is the finished class value.
 *
 * That single difference is what makes each use case natural. An initializer on
 * a method can reach the instance and rebind, one on a field can read what the
 * field ended up holding, and one on a class can register the constructor
 * somewhere. None of them changes a type: an initializer returns `void`, so a
 * decorator that only registers one keeps the declaration exactly as written.
 * Replace each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

// One receiver and one class, so every context has something concrete.
type GivenReceiver = { count: number };
type GivenClass = abstract new (...args: any[]) => GivenReceiver;

// A class whose members were decorated with initializer-only decorators.
declare const decoratedController: {
  new (status: string): { handle(request: string): void; status: string; count: number };
};

// ─── Reading the hook off a context ───────────────────────────────────

// 1. Build the reader that recovers the initializer callback a context accepts.
export type InitializerOf<Context> = TODO; // TODO(koan)

type _01a = Expect<
  Equal<
    InitializerOf<ClassMethodDecoratorContext<GivenReceiver, () => void>>,
    (this: GivenReceiver) => void
  >
>;
type _01b = Expect<
  Equal<InitializerOf<ClassFieldDecoratorContext<GivenReceiver, number>>, (this: GivenReceiver) => void>
>;
type _01c = Expect<Equal<InitializerOf<string>, never>>;
type _01d = Expect<Equal<InitializerOf<Record<never, never>>, never>>;

// 2. Build the reader that goes one step further and names what the initializer
//    will be run against — the fact that actually differs between contexts.
export type InitializerReceiver<Context> = TODO; // TODO(koan)

type _02a = Expect<
  Equal<InitializerReceiver<ClassMethodDecoratorContext<GivenReceiver, () => void>>, GivenReceiver>
>;
type _02b = Expect<Equal<InitializerReceiver<ClassFieldDecoratorContext<GivenReceiver, number>>, GivenReceiver>>;
type _02c = Expect<Equal<InitializerReceiver<ClassDecoratorContext<GivenClass>>, GivenClass>>;
type _02d = Expect<Equal<InitializerReceiver<string>, never>>;

// 3. Build the class shape a class decorator's context is parameterised by —
//    abstract, because a decorator may be applied to an abstract class too.
export type AnyClass = TODO; // TODO(koan)

type _03a = Expect<
  Equal<
    {
      concreteClassFits: GivenExtends<new () => GivenReceiver, AnyClass>;
      aFunctionDoesNot: GivenExtends<() => GivenReceiver, AnyClass>;
    },
    { concreteClassFits: true; aFunctionDoesNot: false }
  >
>;
type _03b = Expect<
  Equal<
    {
      abstractClassFits: GivenExtends<GivenClass, AnyClass>;
      aFunctionIsNotAClass: GivenExtends<() => GivenReceiver, AnyClass>;
    },
    { abstractClassFits: true; aFunctionIsNotAClass: false }
  >
>;
type _03c = Expect<
  Equal<
    {
      bareAbstractFits: GivenExtends<abstract new () => object, AnyClass>;
      aFunctionIsNotAClass: GivenExtends<() => GivenReceiver, AnyClass>;
    },
    { bareAbstractFits: true; aFunctionIsNotAClass: false }
  >
>;
type _03d = Expect<
  Equal<
    {
      constructSignatureFits: GivenExtends<{ new (): object }, AnyClass>;
      aFunctionIsNotAClass: GivenExtends<() => GivenReceiver, AnyClass>;
    },
    { constructSignatureFits: true; aFunctionIsNotAClass: false }
  >
>;

// ─── The same hook, four receivers ────────────────────────────────────

// 4. Report the method case. The initializer runs on the instance, which is what
//    lets a `@bound` decorator install a bound copy of the method there.
export type MethodInitializerProfile = TODO; // TODO(koan)

type _04a = Expect<
  Equal<MethodInitializerProfile["registration"], [initializer: (this: GivenReceiver) => void]>
>;
type _04b = Expect<Equal<MethodInitializerProfile["registrationResult"], void>>;
type _04c = Expect<Equal<MethodInitializerProfile["callback"], (this: GivenReceiver) => void>>;
type _04d = Expect<Equal<MethodInitializerProfile["receiver"], GivenReceiver>>;
type _04e = Expect<Equal<MethodInitializerProfile["callbackArguments"], []>>;

// 5. Report the field case, whose initializer is *not* the initializer a field
//    decorator may return — this one takes nothing and cannot change the value.
export type FieldInitializerProfile = TODO; // TODO(koan)

type _05a = Expect<Equal<FieldInitializerProfile["hookCallback"], (this: GivenReceiver) => void>>;
type _05b = Expect<Equal<FieldInitializerProfile["hookArguments"], []>>;
type _05c = Expect<Equal<FieldInitializerProfile["hookResult"], void>>;
type _05d = Expect<Equal<FieldInitializerProfile["returnedInitializerArguments"], [initialValue: number]>>;
type _05e = Expect<Equal<FieldInitializerProfile["theyAreDifferent"], false>>;

// 6. Report the accessor cases, which behave exactly like the method one.
export type AccessorInitializerProfile = TODO; // TODO(koan)

type _06a = Expect<Equal<AccessorInitializerProfile["autoAccessorReceiver"], GivenReceiver>>;
type _06b = Expect<Equal<AccessorInitializerProfile["getterReceiver"], GivenReceiver>>;
type _06c = Expect<Equal<AccessorInitializerProfile["setterReceiver"], GivenReceiver>>;
type _06d = Expect<Equal<AccessorInitializerProfile["allAgree"], true>>;

// 7. Report the class case — the one that is different. Its initializer runs
//    with the finished class as `this`, which is why registration belongs here
//    and nowhere else.
export type ClassInitializerProfile = TODO; // TODO(koan)

type _07a = Expect<Equal<ClassInitializerProfile["registration"], [initializer: (this: GivenClass) => void]>>;
type _07b = Expect<Equal<ClassInitializerProfile["callback"], (this: GivenClass) => void>>;
type _07c = Expect<Equal<ClassInitializerProfile["receiver"], GivenClass>>;
type _07d = Expect<Equal<ClassInitializerProfile["receiverIsNotAnInstance"], false>>;
type _07e = Expect<Equal<ClassInitializerProfile["result"], void>>;

// ─── The decorators that only register ────────────────────────────────

// 8. Build the binding decorator. It replaces nothing — it registers an
//    initializer that installs a bound copy on the instance — so its return
//    type is `void`.
export type BoundDecorator = TODO; // TODO(koan)

type _08a = Expect<Equal<ReturnType<BoundDecorator>, void>>;
type _08b = Expect<Equal<Parameters<BoundDecorator>["length"], 2>>;
type _08c = Expect<
  Equal<Parameters<BoundDecorator>[1] extends { kind: infer Kind } ? Kind : never, "method">
>;
type _08d = Expect<
  Equal<
    {
      receiverIsAnObject: GivenExtends<
        Parameters<BoundDecorator>[0] extends (this: infer This, ...args: never[]) => unknown ? This : never,
        object
      >;
      nonContextHasNoInitializer: InitializerOf<string>;
    },
    { receiverIsAnObject: true; nonContextHasNoInitializer: never }
  >
>;

// 9. Build the observing factory in the whole-callable style, so a generic
//    method keeps its own type parameters while still being observed.
export type RecordMethodInitializerFactory = TODO; // TODO(koan)

type _09a = Expect<Equal<Parameters<RecordMethodInitializerFactory>, [log: string[]]>>;
type _09b = Expect<Equal<ReturnType<ReturnType<RecordMethodInitializerFactory>>, void>>;
type _09c = Expect<Equal<Parameters<ReturnType<RecordMethodInitializerFactory>>["length"], 2>>;
type _09d = Expect<
  Equal<
    {
      handedTheWholeMethod: Parameters<ReturnType<RecordMethodInitializerFactory>>[0];
      nonContextHasNoInitializer: InitializerOf<string>;
    },
    { handedTheWholeMethod: (this: object, ...args: any[]) => any; nonContextHasNoInitializer: never }
  >
>;

// 10. Build the field-lifecycle factory. It registers a hook that can read what
//     the field ended up holding — using the context's access object, since the
//     hook itself is handed nothing.
export type RecordFieldLifecycleFactory = TODO; // TODO(koan)

type _10a = Expect<Equal<ReturnType<ReturnType<RecordFieldLifecycleFactory>>, void>>;
type _10b = Expect<Equal<Parameters<ReturnType<RecordFieldLifecycleFactory>>[0], undefined>>;
type _10c = Expect<
  Equal<
    Parameters<ReturnType<RecordFieldLifecycleFactory>>[1] extends { kind: infer Kind } ? Kind : never,
    "field"
  >
>;
type _10d = Expect<Equal<Parameters<RecordFieldLifecycleFactory>, [log: string[]]>>;

// 11. Build the class-registration factory — the case the class-level receiver
//     was made for.
export type RegisterClassFactory = TODO; // TODO(koan)

type _11a = Expect<Equal<Parameters<RegisterClassFactory>, [registry: AnyClass[]]>>;
type _11b = Expect<Equal<ReturnType<ReturnType<RegisterClassFactory>>, void>>;
type _11c = Expect<Equal<Parameters<ReturnType<RegisterClassFactory>>["length"], 2>>;
type _11d = Expect<
  Equal<
    {
      initializerSeesTheClass: InitializerReceiver<
        Parameters<ReturnType<RegisterClassFactory>>[1]
      >;
      nonContextHasNoInitializer: InitializerOf<string>;
    },
    { initializerSeesTheClass: AnyClass; nonContextHasNoInitializer: never }
  >
>;

// ─── What registering costs ───────────────────────────────────────────

// 12. Report the shape of every registering decorator: it returns `void`, so
//     there is no replacement and the declaration is untouched.
export type RegistrationProfile = TODO; // TODO(koan)

type _12a = Expect<Equal<RegistrationProfile["boundResult"], void>>;
type _12b = Expect<Equal<RegistrationProfile["observerResult"], void>>;
type _12c = Expect<Equal<RegistrationProfile["fieldObserverResult"], void>>;
type _12d = Expect<Equal<RegistrationProfile["classRegistrarResult"], void>>;
type _12e = Expect<Equal<RegistrationProfile["noneOfThemReplaceAnything"], true>>;

// 13. Report the declared surface of a class whose members were all decorated
//     this way. Bound methods, logged fields — and the same signatures as
//     before.
export type DeclaredSurfaceProfile = TODO; // TODO(koan)

type _13a = Expect<Equal<DeclaredSurfaceProfile["constructorParameters"], [status: string]>>;
type _13b = Expect<Equal<DeclaredSurfaceProfile["boundMethodArguments"], [request: string]>>;
type _13c = Expect<Equal<DeclaredSurfaceProfile["boundMethodResult"], void>>;
type _13d = Expect<Equal<DeclaredSurfaceProfile["observedField"], string>>;
type _13e = Expect<Equal<DeclaredSurfaceProfile["keys"], "handle" | "status" | "count">>;

// ─── Asking questions about a hook ────────────────────────────────────

// 14. Build the predicate that says whether a context's initializer runs on an
//     instance or on the class — the one thing a decorator has to know before
//     it registers anything.
export type InitializerScope<Context> = TODO; // TODO(koan)

type _14a = Expect<Equal<InitializerScope<ClassDecoratorContext<GivenClass>>, "class">>;
type _14b = Expect<
  Equal<InitializerScope<ClassMethodDecoratorContext<GivenReceiver, () => void>>, "instance">
>;
type _14c = Expect<Equal<InitializerScope<ClassFieldDecoratorContext<GivenReceiver, number>>, "instance">>;
type _14d = Expect<Equal<InitializerScope<string>, "not a context">>;
type _14e = Expect<Equal<InitializerScope<ClassAccessorDecoratorContext<GivenReceiver, number>>, "instance">>;

// 15. Build the gate that admits a callback only when it matches a context's
//     initializer signature.
export type ValidInitializer<Context, Candidate> = TODO; // TODO(koan)

type _15a = Expect<
  Equal<
    {
      admitted: ValidInitializer<
        ClassMethodDecoratorContext<GivenReceiver, () => void>,
        (this: GivenReceiver) => void
      >;
      nonContextHasNoInitializer: InitializerOf<string>;
    },
    { admitted: (this: GivenReceiver) => void; nonContextHasNoInitializer: never }
  >
>;
type _15b = Expect<
  Equal<
    ValidInitializer<
      ClassMethodDecoratorContext<GivenReceiver, () => void>,
      (this: { unrelated: true }) => void
    >,
    never
  >
>;
type _15c = Expect<
  Equal<
    ValidInitializer<ClassDecoratorContext<GivenClass>, (this: GivenReceiver) => void>,
    never
  >
>;
type _15d = Expect<
  Equal<ValidInitializer<ClassMethodDecoratorContext<GivenReceiver, () => void>, string>, never>
>;

// 16. Report what an initializer can and cannot see. It is handed nothing, so
//     everything it knows comes from the context it was registered on — which
//     is why the access object matters more here than anywhere else.
export type VisibilityProfile = TODO; // TODO(koan)

type _16a = Expect<Equal<VisibilityProfile["argumentsGiven"], []>>;
type _16b = Expect<Equal<VisibilityProfile["valueReachableThroughTheContext"], number>>;
type _16c = Expect<Equal<VisibilityProfile["nameReachableThroughTheContext"], string | symbol>>;
type _16d = Expect<Equal<VisibilityProfile["resultIsIgnored"], void>>;

// 17. Build the reader that pairs a context with what its initializer will see —
//     the summary a decorator author actually wants.
export type InitializerFacts<Context> = TODO; // TODO(koan)

type _17a = Expect<
  Equal<InitializerFacts<ClassMethodDecoratorContext<GivenReceiver, () => void>>["scope"], "instance">
>;
type _17b = Expect<
  Equal<InitializerFacts<ClassMethodDecoratorContext<GivenReceiver, () => void>>["receiver"], GivenReceiver>
>;
type _17c = Expect<Equal<InitializerFacts<ClassDecoratorContext<GivenClass>>["scope"], "class">>;
type _17d = Expect<Equal<InitializerFacts<ClassDecoratorContext<GivenClass>>["receiver"], GivenClass>>;
type _17e = Expect<Equal<InitializerFacts<string>["callback"], never>>;

// 18. Report every context's hook side by side — same signature everywhere, one
//     receiver that is not like the others.
export type HookReport = TODO; // TODO(koan)

type _18a = Expect<Equal<HookReport["method"], GivenReceiver>>;
type _18b = Expect<Equal<HookReport["field"], GivenReceiver>>;
type _18c = Expect<Equal<HookReport["accessor"], GivenReceiver>>;
type _18d = Expect<Equal<HookReport["classLevel"], GivenClass>>;
type _18e = Expect<Equal<HookReport["membersAgree"], true>>;
