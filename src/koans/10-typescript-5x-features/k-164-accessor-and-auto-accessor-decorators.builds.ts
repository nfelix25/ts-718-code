import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-164: accessor and auto-accessor decorators — constructions
 * =============================================================================
 *
 * `get` and `set` are decorated separately: each receives its own half of the
 * pair and may replace only that half. A getter decorator sees a nullary
 * function returning the value; a setter decorator sees a one-argument function
 * returning nothing. Their contexts differ to match — a getter's access object
 * can read, a setter's can write.
 *
 * An `accessor` declaration is different in kind. It is one member backed by a
 * private field, so its decorator is handed *both* halves as an object and may
 * return a new pair — plus an optional `init`, which is the auto-accessor's
 * version of a field initializer. That third slot is what makes an auto-accessor
 * decorator able to do things neither a getter nor a setter decorator can.
 * Replace each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

// One receiver for every accessor in the file.
type GivenReceiver = { value: number };

// A class whose accessors were decorated at runtime.
declare const decoratedGauge: {
  new (): { readonly label: string; percent: number; enabled: boolean };
};

// ─── The two halves ───────────────────────────────────────────────────

// 1. Build the getter decorator's signature. The value it receives is the
//    getter itself: no arguments, the property's type back.
export type GetterDecorator<This, Value> = TODO; // TODO(koan)

type _01a = Expect<Equal<Parameters<GetterDecorator<GivenReceiver, number>>[0], (this: GivenReceiver) => number>>;
type _01b = Expect<
  Equal<
    Parameters<GetterDecorator<GivenReceiver, number>>[1] extends { kind: infer Kind } ? Kind : never,
    "getter"
  >
>;
type _01c = Expect<
  Equal<ReturnType<GetterDecorator<GivenReceiver, number>>, ((this: GivenReceiver) => number) | void>
>;
type _01d = Expect<Equal<Parameters<GetterDecorator<GivenReceiver, number>>["length"], 2>>;

// 2. Build the setter decorator's signature — the mirror image, and note that
//    the two are not interchangeable in either direction.
export type SetterDecorator<This, Value> = TODO; // TODO(koan)

type _02a = Expect<
  Equal<Parameters<SetterDecorator<GivenReceiver, number>>[0], (this: GivenReceiver, value: number) => void>
>;
type _02b = Expect<
  Equal<
    Parameters<SetterDecorator<GivenReceiver, number>>[1] extends { kind: infer Kind } ? Kind : never,
    "setter"
  >
>;
type _02c = Expect<
  Equal<
    {
      getterIsNotASetter: GivenExtends<GetterDecorator<GivenReceiver, number>, SetterDecorator<GivenReceiver, number>>;
      setterIsNotAGetter: GivenExtends<SetterDecorator<GivenReceiver, number>, GetterDecorator<GivenReceiver, number>>;
    },
    { getterIsNotASetter: false; setterIsNotAGetter: false }
  >
>;
type _02d = Expect<Equal<Parameters<SetterDecorator<GivenReceiver, number>>["length"], 2>>;

// 3. Build the replacement reader.
export type DecoratorReplacement<Decorator> = TODO; // TODO(koan)

type _03a = Expect<
  Equal<
    {
      replacement: DecoratorReplacement<GetterDecorator<GivenReceiver, number>>;
      getterIsNotASetter: GivenExtends<
        GetterDecorator<GivenReceiver, number>,
        SetterDecorator<GivenReceiver, number>
      >;
    },
    { replacement: (this: GivenReceiver) => number; getterIsNotASetter: false }
  >
>;
type _03b = Expect<
  Equal<
    {
      replacement: DecoratorReplacement<SetterDecorator<GivenReceiver, number>>;
      getterIsNotASetter: GivenExtends<
        GetterDecorator<GivenReceiver, number>,
        SetterDecorator<GivenReceiver, number>
      >;
    },
    { replacement: (this: GivenReceiver, value: number) => void; getterIsNotASetter: false }
  >
>;
type _03c = Expect<Equal<DecoratorReplacement<() => void>, never>>;
type _03d = Expect<Equal<DecoratorReplacement<string>, never>>;

// ─── The auto-accessor, which is one member with two halves ───────────

// 4. Build the auto-accessor decorator's signature. It is handed both halves at
//    once and may hand back a new pair — plus an initializer for the private
//    field behind them.
export type AutoAccessorDecorator<This, Value> = TODO; // TODO(koan)

type _04a = Expect<
  Equal<
    Parameters<AutoAccessorDecorator<GivenReceiver, number>>[0],
    ClassAccessorDecoratorTarget<GivenReceiver, number>
  >
>;
type _04b = Expect<
  Equal<
    Parameters<AutoAccessorDecorator<GivenReceiver, number>>[1] extends { kind: infer Kind } ? Kind : never,
    "accessor"
  >
>;
type _04c = Expect<
  Equal<
    {
      replacement: DecoratorReplacement<AutoAccessorDecorator<GivenReceiver, number>>;
      getterIsNotASetter: GivenExtends<
        GetterDecorator<GivenReceiver, number>,
        SetterDecorator<GivenReceiver, number>
      >;
    },
    { replacement: ClassAccessorDecoratorResult<GivenReceiver, number>; getterIsNotASetter: false }
  >
>;
type _04d = Expect<Equal<Parameters<AutoAccessorDecorator<GivenReceiver, number>>["length"], 2>>;

// 5. Report the target — what the decorator is handed. It is the existing pair,
//    and nothing else: there is no `init` on the way in, because there is
//    nothing to initialise yet.
export type TargetProfile = TODO; // TODO(koan)

type _05a = Expect<Equal<TargetProfile["keys"], "get" | "set">>;
type _05b = Expect<Equal<TargetProfile["getter"], (this: GivenReceiver) => number>>;
type _05c = Expect<Equal<TargetProfile["setter"], (this: GivenReceiver, value: number) => void>>;
type _05d = Expect<Equal<TargetProfile["getterResult"], number>>;
type _05e = Expect<Equal<TargetProfile["setterArgument"], [value: number]>>;

// 6. Report the result — what the decorator may hand back. Every slot is
//     optional, and the third one has no counterpart on the way in.
export type ResultProfile = TODO; // TODO(koan)

type _06a = Expect<Equal<ResultProfile["keys"], "get" | "set" | "init">>;
type _06b = Expect<
  Equal<ResultProfile["initializer"], ((this: GivenReceiver, value: number) => number) | undefined>
>;
type _06c = Expect<Equal<ResultProfile["initializerArgument"], [value: number]>>;
type _06d = Expect<Equal<ResultProfile["initializerResult"], number>>;
type _06e = Expect<Equal<ResultProfile["extraSlotComparedToTheTarget"], "init">>;

// ─── What each context can reach ──────────────────────────────────────

// 7. Report the getter context. It can read the property and nothing else,
//    which mirrors what a getter itself can do.
export type GetterContextProfile = TODO; // TODO(koan)

type _07a = Expect<Equal<GetterContextProfile["kind"], "getter">>;
type _07b = Expect<Equal<GetterContextProfile["accessKeys"], "has" | "get">>;
type _07c = Expect<Equal<GetterContextProfile["read"], number>>;
type _07d = Expect<Equal<GetterContextProfile["name"], string | symbol>>;

// 8. Report the setter context, which is the other half of the same idea.
export type SetterContextProfile = TODO; // TODO(koan)

type _08a = Expect<Equal<SetterContextProfile["kind"], "setter">>;
type _08b = Expect<Equal<SetterContextProfile["accessKeys"], "has" | "set">>;
type _08c = Expect<Equal<SetterContextProfile["written"], [object: GivenReceiver, value: number]>>;
type _08d = Expect<Equal<SetterContextProfile["canRead"], false>>;

// 9. Report the auto-accessor context, which can do both — because the member it
//    describes can do both.
export type AccessorContextProfile = TODO; // TODO(koan)

type _09a = Expect<Equal<AccessorContextProfile["kind"], "accessor">>;
type _09b = Expect<Equal<AccessorContextProfile["accessKeys"], "has" | "get" | "set">>;
type _09c = Expect<Equal<AccessorContextProfile["read"], [object: GivenReceiver]>>;
type _09d = Expect<Equal<AccessorContextProfile["written"], [object: GivenReceiver, value: number]>>;
type _09e = Expect<
  Equal<AccessorContextProfile["registration"], [initializer: (this: GivenReceiver) => void]>
>;

// ─── The decorators ───────────────────────────────────────────────────

// 10. Build the getter transform. It wraps the read, so its replacement is
//     another getter of the same property type.
export type TrimmedGetter = TODO; // TODO(koan)

type _10a = Expect<Equal<Parameters<TrimmedGetter>["length"], 2>>;
type _10b = Expect<Equal<ReturnType<TrimmedGetter>, (this: unknown) => string>>;
type _10c = Expect<
  Equal<
    {
      fitsAStringGetter: GivenExtends<TrimmedGetter, GetterDecorator<GivenReceiver, string>>;
      doesNotFitANumericGetter: GivenExtends<TrimmedGetter, GetterDecorator<GivenReceiver, number>>;
    },
    { fitsAStringGetter: true; doesNotFitANumericGetter: false }
  >
>;
type _10d = Expect<Equal<Parameters<TrimmedGetter>[0], (this: unknown) => string>>;

// 11. Build the setter transform, which wraps the write instead.
export type NormalizedSetter = TODO; // TODO(koan)

type _11a = Expect<Equal<Parameters<NormalizedSetter>["length"], 2>>;
type _11b = Expect<Equal<ReturnType<NormalizedSetter>, (this: unknown, next: string) => void>>;
type _11c = Expect<
  Equal<
    {
      fitsAStringSetter: GivenExtends<NormalizedSetter, SetterDecorator<GivenReceiver, string>>;
      doesNotFitAGetter: GivenExtends<NormalizedSetter, GetterDecorator<GivenReceiver, string>>;
    },
    { fitsAStringSetter: true; doesNotFitAGetter: false }
  >
>;
type _11d = Expect<Equal<ReturnType<ReturnType<NormalizedSetter>>, void>>;

// 12. Build the auto-accessor factory that clamps the value. It replaces both
//     halves and supplies an `init`, so the constraint holds for the declared
//     initial value as well as for every later write.
export type BoundedFactory = TODO; // TODO(koan)

type _12a = Expect<Equal<Parameters<BoundedFactory>, [minimum: number, maximum: number]>>;
type _12b = Expect<Equal<Parameters<ReturnType<BoundedFactory>>["length"], 2>>;
type _12c = Expect<
  Equal<
    {
      produced: ReturnType<ReturnType<BoundedFactory>>;
      getterIsNotASetter: GivenExtends<
        GetterDecorator<GivenReceiver, number>,
        SetterDecorator<GivenReceiver, number>
      >;
    },
    { produced: ClassAccessorDecoratorResult<unknown, number>; getterIsNotASetter: false }
  >
>;
type _12d = Expect<Equal<keyof ReturnType<ReturnType<BoundedFactory>>, "get" | "set" | "init">>;

// ─── What the three forms can and cannot do ───────────────────────────

// 13. Report the capability difference. Only the auto-accessor's result has a
//     slot for an initial value, which is why a clamp on an `accessor` covers
//     the declared initial value and a clamp on a plain setter does not.
export type CapabilityProfile = TODO; // TODO(koan)

type _13a = Expect<Equal<CapabilityProfile["getterCanReplaceRead"], true>>;
type _13b = Expect<Equal<CapabilityProfile["autoAccessorCanInitialize"], true>>;
type _13c = Expect<Equal<CapabilityProfile["targetHasNoInit"], false>>;
type _13d = Expect<
  Equal<CapabilityProfile["setterReplacementIsJustAFunction"], (this: GivenReceiver, value: number) => void>
>;
type _13e = Expect<Equal<CapabilityProfile["autoAccessorReplacementIsAnObject"], "get" | "set" | "init">>;

// 14. Report the property type flowing through all three forms. It is the same
//     type everywhere — read, written, initialised — which is what keeps a pair
//     coherent.
export type ValueFlowProfile = TODO; // TODO(koan)

type _14a = Expect<Equal<ValueFlowProfile["throughTheGetter"], number>>;
type _14b = Expect<Equal<ValueFlowProfile["throughTheSetter"], number>>;
type _14c = Expect<Equal<ValueFlowProfile["throughTheInitializer"], number>>;
type _14d = Expect<Equal<ValueFlowProfile["throughTheContext"], number>>;
type _14e = Expect<Equal<ValueFlowProfile["allAgree"], true>>;

// 15. Report the declared surface of the decorated class. A getter-only member
//     stays readonly, an auto-accessor stays a read/write property, and no
//     decorator changed either one.
export type DeclaredSurfaceProfile = TODO; // TODO(koan)

type _15a = Expect<Equal<DeclaredSurfaceProfile["getterOnlyMember"], string>>;
type _15b = Expect<Equal<DeclaredSurfaceProfile["accessorMember"], number>>;
type _15c = Expect<Equal<DeclaredSurfaceProfile["plainMember"], boolean>>;
type _15d = Expect<Equal<DeclaredSurfaceProfile["keys"], "label" | "percent" | "enabled">>;
type _15e = Expect<Equal<DeclaredSurfaceProfile["getterOnlyIsReadonly"], true>>;

// ─── Choosing a form ──────────────────────────────────────────────────

// 16. Build the classifier that names which decorator form a context belongs to.
export type AccessorFormOf<Context> = TODO; // TODO(koan)

type _16a = Expect<Equal<AccessorFormOf<ClassGetterDecoratorContext<GivenReceiver, number>>, "read only">>;
type _16b = Expect<Equal<AccessorFormOf<ClassSetterDecoratorContext<GivenReceiver, number>>, "write only">>;
type _16c = Expect<
  Equal<AccessorFormOf<ClassAccessorDecoratorContext<GivenReceiver, number>>, "read and write">
>;
type _16d = Expect<Equal<AccessorFormOf<ClassMethodDecoratorContext>, "not an accessor">>;
type _16e = Expect<Equal<AccessorFormOf<string>, "not an accessor">>;

// 17. Build the gate that admits a replacement pair only when both halves keep
//     the property's type.
export type ValidAccessorResult<This, Value, Candidate> = TODO; // TODO(koan)

type _17a = Expect<
  Equal<
    {
      admitted: ValidAccessorResult<
        GivenReceiver,
        number,
        { get(this: GivenReceiver): number; set(this: GivenReceiver, value: number): void }
      >;
      getterIsNotASetter: GivenExtends<
        GetterDecorator<GivenReceiver, number>,
        SetterDecorator<GivenReceiver, number>
      >;
    },
    {
      admitted: { get(this: GivenReceiver): number; set(this: GivenReceiver, value: number): void };
      getterIsNotASetter: false;
    }
  >
>;
type _17b = Expect<
  Equal<
    ValidAccessorResult<GivenReceiver, number, { get(this: GivenReceiver): string }>,
    never
  >
>;
type _17c = Expect<
  Equal<
    {
      partialPairIsFine: ValidAccessorResult<GivenReceiver, number, { get(this: GivenReceiver): number }>;
      getterIsNotASetter: GivenExtends<
        GetterDecorator<GivenReceiver, number>,
        SetterDecorator<GivenReceiver, number>
      >;
    },
    { partialPairIsFine: { get(this: GivenReceiver): number }; getterIsNotASetter: false }
  >
>;
type _17d = Expect<Equal<ValidAccessorResult<GivenReceiver, number, string>, never>>;

// 18. Report one accessor at a glance: which form it is, what it can reach, and
//     what its decorator is allowed to hand back.
export type AccessorReport<This, Value> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<
    {
      getter: AccessorReport<GivenReceiver, number>["getterReplacement"];
      getterIsNotASetter: GivenExtends<
        GetterDecorator<GivenReceiver, number>,
        SetterDecorator<GivenReceiver, number>
      >;
    },
    { getter: (this: GivenReceiver) => number; getterIsNotASetter: false }
  >
>;
type _18b = Expect<
  Equal<
    {
      setter: AccessorReport<GivenReceiver, number>["setterReplacement"];
      getterIsNotASetter: GivenExtends<
        GetterDecorator<GivenReceiver, number>,
        SetterDecorator<GivenReceiver, number>
      >;
    },
    { setter: (this: GivenReceiver, value: number) => void; getterIsNotASetter: false }
  >
>;
type _18c = Expect<Equal<AccessorReport<GivenReceiver, number>["autoAccessorSlots"], "get" | "set" | "init">>;
type _18d = Expect<
  Equal<
    {
      autoAccessor: AccessorReport<GivenReceiver, string>["autoAccessorReplacement"];
      getterIsNotASetter: GivenExtends<
        GetterDecorator<GivenReceiver, number>,
        SetterDecorator<GivenReceiver, number>
      >;
    },
    { autoAccessor: ClassAccessorDecoratorResult<GivenReceiver, string>; getterIsNotASetter: false }
  >
>;
type _18e = Expect<Equal<AccessorReport<GivenReceiver, string>["getterReplacement"] extends (this: never) => infer Value ? Value : never, string>>;
