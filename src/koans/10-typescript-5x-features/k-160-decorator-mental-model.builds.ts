import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-160: the standard decorator mental model — constructions
 * =============================================================================
 *
 * A standard decorator is a function called once, at class-definition time, with
 * the thing being decorated and a typed context describing the declaration. It
 * may look, it may register an initializer, and it may return a replacement — but
 * the replacement has to honour the same contract, and there is no parameter
 * decorator in this model at all.
 *
 * The context types come from the standard library, so most of this file is
 * about reading them precisely: what each `kind` literal is, which names are
 * possible where, and which access helpers exist for which declaration. Watch
 * construction 9 in particular — a "get me the replacement type" helper written
 * with a `readonly unknown[]` rest pattern silently matches *nothing* with real
 * parameters, because that pattern is a genuine assignability check. Replace
 * each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;
type GivenIsAny<Value> = 0 extends 1 & Value ? true : false;

// One receiver shape, so the contexts have something concrete to describe.
type GivenReceiver = { count: number };

// ─── The vocabulary the library gives ─────────────────────────────────

// 1. Build the union of every context a standard decorator can be handed.
export type AnyDecoratorContext = TODO; // TODO(koan)

type _01a = Expect<Equal<Extract<AnyDecoratorContext, { kind: "class" }>["kind"], "class">>;
type _01b = Expect<Equal<Extract<AnyDecoratorContext, { kind: "accessor" }>["kind"], "accessor">>;
type _01c = Expect<Equal<keyof AnyDecoratorContext, "kind" | "name" | "addInitializer" | "metadata">>;
type _01d = Expect<Equal<AnyDecoratorContext["name"], string | symbol | undefined>>;

// 2. Build the discriminant — the set of declarations the model covers, which
//    is also the shortest possible statement of what it does *not* cover.
export type DecoratorKind = TODO; // TODO(koan)

type _02a = Expect<Equal<DecoratorKind, "class" | "method" | "getter" | "setter" | "field" | "accessor">>;
type _02b = Expect<Equal<Extract<DecoratorKind, "method">, "method">>;
type _02c = Expect<Equal<Extract<DecoratorKind, "parameter">, never>>;
type _02d = Expect<Equal<Exclude<DecoratorKind, "class">, "method" | "getter" | "setter" | "field" | "accessor">>;

// 3. Build the member half of the union — everything that decorates something
//    inside a class rather than the class itself.
export type MemberDecoratorContext = TODO; // TODO(koan)

type _03a = Expect<
  Equal<MemberDecoratorContext["kind"], "method" | "getter" | "setter" | "field" | "accessor">
>;
type _03b = Expect<Equal<Extract<MemberDecoratorContext["kind"], "class">, never>>;
type _03c = Expect<Equal<MemberDecoratorContext["name"], string | symbol>>;
type _03d = Expect<Equal<MemberDecoratorContext["static"], boolean>>;

// 4. Build the name reader. A class may be anonymous, so its name is optional;
//    a member always has one, and it may be a symbol.
export type ContextName<Context extends AnyDecoratorContext> = TODO; // TODO(koan)

type _04a = Expect<Equal<ContextName<ClassDecoratorContext>, string | undefined>>;
type _04b = Expect<Equal<ContextName<ClassMethodDecoratorContext>, string | symbol>>;
type _04c = Expect<Equal<ContextName<AnyDecoratorContext>, string | symbol | undefined>>;
type _04d = Expect<Equal<ContextName<never>, never>>;

// ─── The shapes a decorator sees and returns ──────────────────────────

// 5. Build the method shape, with the receiver stated explicitly so a
//    replacement has to accept the same `this`.
export type Method<This, Args extends readonly unknown[], Result> = TODO; // TODO(koan)

type _05a = Expect<Equal<Parameters<Method<GivenReceiver, [delta: number], number>>, [delta: number]>>;
type _05b = Expect<Equal<ThisParameterType<Method<GivenReceiver, [delta: number], number>>, GivenReceiver>>;
type _05c = Expect<Equal<ReturnType<Method<GivenReceiver, [delta: number], number>>, number>>;
type _05d = Expect<Equal<Parameters<Method<GivenReceiver, [], void>>, []>>;
type _05e = Expect<
  Equal<
    {
      wrongArgumentsRefused: GivenExtends<
        Method<GivenReceiver, [text: string], number>,
        Method<GivenReceiver, [delta: number], number>
      >;
      noParameterKind: Extract<DecoratorKind, "parameter">;
    },
    { wrongArgumentsRefused: false; noParameterKind: never }
  >
>;

// 6. Build the method decorator's own signature: the value and its context in,
//    a compatible replacement or nothing out.
export type StandardMethodDecorator<This, Args extends readonly unknown[], Result> = TODO; // TODO(koan)

type _06a = Expect<Equal<Parameters<StandardMethodDecorator<GivenReceiver, [delta: number], number>>["length"], 2>>;
type _06b = Expect<
  Equal<
    Parameters<StandardMethodDecorator<GivenReceiver, [delta: number], number>>[0],
    Method<GivenReceiver, [delta: number], number>
  >
>;
type _06c = Expect<
  Equal<
    Parameters<StandardMethodDecorator<GivenReceiver, [delta: number], number>>[1] extends {
      kind: infer Kind;
    }
      ? Kind
      : never,
    "method"
  >
>;
type _06d = Expect<
  Equal<
    {
      returned: ReturnType<StandardMethodDecorator<GivenReceiver, [delta: number], number>>;
      noParameterKind: Extract<DecoratorKind, "parameter">;
    },
    { returned: Method<GivenReceiver, [delta: number], number> | void; noParameterKind: never }
  >
>;
type _06e = Expect<
  Equal<
    {
      contextKnowsTheValue: Parameters<
        StandardMethodDecorator<GivenReceiver, [delta: number], number>
      >[1] extends {
        access: { get: (object: never) => infer Value };
      }
        ? Value
        : never;
      noParameterKind: Extract<DecoratorKind, "parameter">;
    },
    { contextKnowsTheValue: Method<GivenReceiver, [delta: number], number>; noParameterKind: never }
  >
>;

// 7. Build the field decorator's signature. There is no field value at
//    definition time, so the first argument is `undefined` — and what may be
//    returned is an *initializer*, run per instance with the value the field
//    would otherwise have had.
export type StandardFieldDecorator<This, Value> = TODO; // TODO(koan)

type _07a = Expect<Equal<Parameters<StandardFieldDecorator<GivenReceiver, number>>[0], undefined>>;
type _07b = Expect<
  Equal<
    Parameters<StandardFieldDecorator<GivenReceiver, number>>[1] extends { kind: infer Kind }
      ? Kind
      : never,
    "field"
  >
>;
type _07c = Expect<
  Equal<
    ReturnType<StandardFieldDecorator<GivenReceiver, number>>,
    ((this: GivenReceiver, initialValue: number) => number) | void
  >
>;
type _07d = Expect<Equal<Parameters<StandardFieldDecorator<GivenReceiver, number>>["length"], 2>>;

// 8. Build the legacy protocol for comparison. Nothing about it lines up with
//    the standard one — different arity, different arguments, different
//    return.
export type LegacyMethodDecorator = TODO; // TODO(koan)

type _08a = Expect<Equal<Parameters<LegacyMethodDecorator>["length"], 3>>;
type _08b = Expect<Equal<Parameters<LegacyMethodDecorator>[2], PropertyDescriptor>>;
type _08c = Expect<
  Equal<
    GivenExtends<StandardMethodDecorator<GivenReceiver, [delta: number], number>, LegacyMethodDecorator>,
    false
  >
>;
type _08d = Expect<
  Equal<
    GivenExtends<LegacyMethodDecorator, StandardMethodDecorator<GivenReceiver, [delta: number], number>>,
    false
  >
>;

// ─── Reading the replacement back out ─────────────────────────────────

// 9. Build the replacement reader the obvious way, with a `readonly unknown[]`
//    rest pattern. It works on a nullary function and matches nothing else: the
//    pattern is a real assignability check, and `unknown` does not flow into a
//    parameter that wanted something specific.
export type StrictReplacement<Decorator> = TODO; // TODO(koan)

type _09a = Expect<Equal<StrictReplacement<() => void>, never>>;
type _09b = Expect<
  Equal<
    {
      anyResultStaysAny: GivenIsAny<StrictReplacement<() => any>>;
      voidResultIsRemoved: StrictReplacement<() => void>;
    },
    { anyResultStaysAny: true; voidResultIsRemoved: never }
  >
>;
type _09c = Expect<Equal<StrictReplacement<StandardMethodDecorator<GivenReceiver, [delta: number], number>>, never>>;
type _09d = Expect<Equal<StrictReplacement<StandardFieldDecorator<GivenReceiver, number>>, never>>;

// 10. Build the version that actually works. `never` is assignable to every
//     parameter type, so a `never[]` rest pattern matches any function — which
//     is why that is the idiom for "some callable, whatever it takes".
export type DecoratorReplacement<Decorator> = TODO; // TODO(koan)

type _10a = Expect<
  Equal<
    {
      replacement: DecoratorReplacement<StandardMethodDecorator<GivenReceiver, [delta: number], number>>;
      noParameterKind: Extract<DecoratorKind, "parameter">;
    },
    { replacement: Method<GivenReceiver, [delta: number], number>; noParameterKind: never }
  >
>;
type _10b = Expect<
  Equal<
    DecoratorReplacement<StandardFieldDecorator<GivenReceiver, number>>,
    (this: GivenReceiver, initialValue: number) => number
  >
>;
type _10c = Expect<Equal<DecoratorReplacement<() => void>, never>>;
type _10d = Expect<
  Equal<
    {
      strictPatternMatchesNothing: StrictReplacement<StandardMethodDecorator<GivenReceiver, [delta: number], number>>;
      neverPatternMatches: GivenExtends<
        Method<GivenReceiver, [delta: number], number>,
        DecoratorReplacement<StandardMethodDecorator<GivenReceiver, [delta: number], number>>
      >;
    },
    { strictPatternMatchesNothing: never; neverPatternMatches: true }
  >
>;
type _10e = Expect<Equal<DecoratorReplacement<string>, never>>;

// ─── What each context actually carries ───────────────────────────────

// 11. Report the kind literals. Each declaration form has exactly one, and the
//     one that is missing is the whole point: standard decorators do not
//     decorate parameters.
export type KindProfile = TODO; // TODO(koan)

type _11a = Expect<Equal<KindProfile["classKind"], "class">>;
type _11b = Expect<Equal<KindProfile["methodKind"], "method">>;
type _11c = Expect<Equal<KindProfile["fieldKind"], "field">>;
type _11d = Expect<Equal<KindProfile["accessorKind"], "accessor">>;
type _11e = Expect<Equal<KindProfile["parameterKind"], never>>;

// 12. Report the surface every context shares, and the facts only a member
//     context can tell you.
export type ContextSurfaceProfile = TODO; // TODO(koan)

type _12a = Expect<Equal<ContextSurfaceProfile["sharedKeys"], "kind" | "name" | "addInitializer" | "metadata">>;
type _12b = Expect<Equal<ContextSurfaceProfile["className"], string | undefined>>;
type _12c = Expect<Equal<ContextSurfaceProfile["memberName"], string | symbol>>;
type _12d = Expect<Equal<ContextSurfaceProfile["placement"], boolean>>;
type _12e = Expect<Equal<ContextSurfaceProfile["visibility"], boolean>>;

// 13. Report the access helpers. A method can be read off an instance but not
//     written, while a field offers both — the context's shape mirrors what the
//     declaration actually permits.
export type AccessProfile = TODO; // TODO(koan)

type _13a = Expect<Equal<AccessProfile["methodAccessKeys"], "has" | "get">>;
type _13b = Expect<Equal<AccessProfile["fieldAccessKeys"], "has" | "get" | "set">>;
type _13c = Expect<Equal<AccessProfile["methodGetInput"], [object: GivenReceiver]>>;
type _13d = Expect<Equal<AccessProfile["methodGetOutput"], (delta: number) => number>>;
type _13e = Expect<Equal<AccessProfile["fieldSetInput"], [object: GivenReceiver, value: number]>>;

// 14. Report the initializer hook, which is the same on every context: a
//     callback that will run with the finished receiver as `this`, separate
//     from anything the decorator returns.
export type InitializerProfile = TODO; // TODO(koan)

type _14a = Expect<Equal<InitializerProfile["registration"], [initializer: (this: GivenReceiver) => void]>>;
type _14b = Expect<Equal<InitializerProfile["registrationResult"], void>>;
type _14c = Expect<Equal<InitializerProfile["onAClass"], 1>>;
type _14d = Expect<Equal<InitializerProfile["metadataIsShared"], DecoratorMetadata>>;

// 15. Report the two protocols side by side. They agree on nothing, which is
//     why the flag that selected the old one had to go away rather than be
//     blended in.
export type ProtocolProfile = TODO; // TODO(koan)

type _15a = Expect<Equal<ProtocolProfile["standardArity"], 2>>;
type _15b = Expect<Equal<ProtocolProfile["legacyArity"], 3>>;
type _15c = Expect<Equal<ProtocolProfile["standardIntoLegacy"], false>>;
type _15d = Expect<Equal<ProtocolProfile["legacyIntoStandard"], false>>;
type _15e = Expect<Equal<ProtocolProfile["legacyDescriptorArgument"], PropertyDescriptor>>;

// 16. Report the replacement contract. A returned method has to keep the same
//     receiver, arguments, and result — anything else is a different method,
//     not a wrapper.
export type ReplacementProfile = TODO; // TODO(koan)

type _16a = Expect<
  Equal<
    { replacement: ReplacementProfile["replacement"]; noParameterKind: Extract<DecoratorKind, "parameter"> },
    { replacement: Method<GivenReceiver, [delta: number], number>; noParameterKind: never }
  >
>;
type _16b = Expect<Equal<ReplacementProfile["sameShapeAccepted"], true>>;
type _16c = Expect<Equal<ReplacementProfile["wrongArgumentsRefused"], false>>;
type _16d = Expect<Equal<ReplacementProfile["wrongResultRefused"], false>>;
type _16e = Expect<Equal<ReplacementProfile["returningNothingIsAllowed"], true>>;

// 17. Report the field lifecycle, where the returned function is not a
//     replacement for the field but a transform applied to its initial value on
//     every instance.
export type FieldLifecycleProfile = TODO; // TODO(koan)

type _17a = Expect<Equal<FieldLifecycleProfile["valueAtDefinitionTime"], undefined>>;
type _17b = Expect<
  Equal<FieldLifecycleProfile["initializer"], (this: GivenReceiver, initialValue: number) => number>
>;
type _17c = Expect<Equal<FieldLifecycleProfile["initializerInput"], [initialValue: number]>>;
type _17d = Expect<Equal<FieldLifecycleProfile["initializerReceiver"], GivenReceiver>>;

// 18. Report one decorator at a glance: what it is handed, what declaration it
//     is allowed on, and what it may hand back.
export type DecoratorReport<Decorator extends (...args: never[]) => unknown> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<
    {
      decorates: DecoratorReport<StandardMethodDecorator<GivenReceiver, [delta: number], number>>["decorates"];
      noParameterKind: Extract<DecoratorKind, "parameter">;
    },
    { decorates: Method<GivenReceiver, [delta: number], number>; noParameterKind: never }
  >
>;
type _18b = Expect<
  Equal<DecoratorReport<StandardMethodDecorator<GivenReceiver, [delta: number], number>>["kind"], "method">
>;
type _18c = Expect<Equal<DecoratorReport<StandardFieldDecorator<GivenReceiver, number>>["decorates"], undefined>>;
type _18d = Expect<Equal<DecoratorReport<StandardFieldDecorator<GivenReceiver, number>>["kind"], "field">>;
type _18e = Expect<
  Equal<
    DecoratorReport<StandardFieldDecorator<GivenReceiver, number>>["replacement"],
    (this: GivenReceiver, initialValue: number) => number
  >
>;
