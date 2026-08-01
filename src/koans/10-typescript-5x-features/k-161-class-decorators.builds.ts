import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-161: class decorators — constructions
 * =============================================================================
 *
 * A class decorator receives the constructor — the class's static side, not its
 * instances — together with a `ClassDecoratorContext`. Return nothing and the
 * declaration stands; return a compatible constructor and it is replaced, which
 * is how a subclass can wrap construction while keeping the original parameter
 * list and instance contract intact.
 *
 * The part that surprises people is what the *type* does afterwards: nothing. A
 * decorator that adds a field or a static member at runtime does not widen the
 * declared class, because the decorator's typing proves substitutability, not
 * macro expansion. That is why the compatibility questions below are all about
 * the three things a replacement has to keep: the static side, the constructor
 * parameters, and the instance type. Replace each `TODO` with a type satisfying
 * the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

// One class with a static member, and three near-misses that each drop or
// change exactly one of the three things a replacement must preserve.
type GivenBaseInstance = { readonly id: number };
type GivenBaseClass = { readonly kind: "base"; new (id: number): GivenBaseInstance };
type GivenMissingStatic = new (id: number) => GivenBaseInstance;
type GivenWrongArgs = { readonly kind: "base"; new (id: string): GivenBaseInstance };
type GivenWiderInstance = {
  readonly kind: "base";
  new (id: number): GivenBaseInstance & { readonly extra: true };
};

// The class a decorator chain was applied to at runtime. Its *declared* type is
// what the source said, which is the whole point of construction 14.
declare const decoratedService: {
  readonly category: "service";
  new (name: string): { readonly name: string; greet(): string };
};

// ─── The class value ──────────────────────────────────────────────────

// 1. Build the constructor shape a decorator is handed. Both parameters have
//    defaults, so the bare name means "some class".
export type Constructor<Instance = object, Args extends readonly unknown[] = any[]> = TODO; // TODO(koan)

type _01a = Expect<Equal<Constructor<{ id: number }, [id: number]>, new (id: number) => { id: number }>>;
type _01b = Expect<Equal<ConstructorParameters<Constructor<object, [name: string]>>, [name: string]>>;
type _01c = Expect<
  Equal<
    { anyClassFits: GivenExtends<{ new (): object }, Constructor>; aFunctionDoesNot: GivenExtends<() => object, Constructor> },
    { anyClassFits: true; aFunctionDoesNot: false }
  >
>;
type _01d = Expect<Equal<InstanceType<Constructor<{ id: number }, []>>, { id: number }>>;

// 2. Build the instance reader — the class's other side.
export type ClassInstance<Class extends Constructor> = TODO; // TODO(koan)

type _02a = Expect<Equal<ClassInstance<GivenBaseClass>, GivenBaseInstance>>;
type _02b = Expect<Equal<ClassInstance<GivenWiderInstance>, GivenBaseInstance & { readonly extra: true }>>;
type _02c = Expect<Equal<ClassInstance<Constructor>, object>>;
type _02d = Expect<Equal<ClassInstance<new () => { tag: "leaf" }>, { tag: "leaf" }>>;

// 3. Build the constructor-argument reader, which a replacement has to match
//    exactly — a caller writing `new Service(...)` is holding it to this list.
export type ClassArguments<Class extends Constructor> = TODO; // TODO(koan)

type _03a = Expect<Equal<ClassArguments<GivenBaseClass>, [id: number]>>;
type _03b = Expect<Equal<ClassArguments<GivenWrongArgs>, [id: string]>>;
type _03c = Expect<Equal<ClassArguments<GivenMissingStatic>, [id: number]>>;
type _03d = Expect<Equal<ClassArguments<Constructor>, any[]>>;

// 4. Build the decorator's own signature.
export type StandardClassDecorator<Class extends Constructor> = TODO; // TODO(koan)

type _04a = Expect<Equal<Parameters<StandardClassDecorator<GivenBaseClass>>[0], GivenBaseClass>>;
type _04b = Expect<
  Equal<Parameters<StandardClassDecorator<GivenBaseClass>>[1], ClassDecoratorContext<GivenBaseClass>>
>;
type _04c = Expect<Equal<ReturnType<StandardClassDecorator<GivenBaseClass>>, GivenBaseClass | void>>;
type _04d = Expect<Equal<Parameters<StandardClassDecorator<GivenBaseClass>>["length"], 2>>;
type _04e = Expect<
  Equal<
    Parameters<StandardClassDecorator<GivenBaseClass>>[1] extends { kind: infer Kind } ? Kind : never,
    "class"
  >
>;

// 5. Build the replacement reader.
export type ClassReplacement<Decorator> = TODO; // TODO(koan)

type _05a = Expect<Equal<ClassReplacement<StandardClassDecorator<GivenBaseClass>>, GivenBaseClass>>;
type _05b = Expect<Equal<ClassReplacement<() => void>, never>>;
type _05c = Expect<Equal<ClassReplacement<string>, never>>;
type _05d = Expect<
  Equal<
    {
      replacementFitsTheOriginal: GivenExtends<
        ClassReplacement<StandardClassDecorator<GivenBaseClass>>,
        GivenBaseClass
      >;
      nonFunctionHasNoReplacement: ClassReplacement<string>;
    },
    { replacementFitsTheOriginal: true; nonFunctionHasNoReplacement: never }
  >
>;

// ─── What the decorator is told about the declaration ─────────────────

// 6. Report the class context. A class expression may be anonymous, so the name
//    is optional — the only context in the family where that is true.
export type ClassContextProfile = TODO; // TODO(koan)

type _06a = Expect<Equal<ClassContextProfile["kind"], "class">>;
type _06b = Expect<Equal<ClassContextProfile["name"], string | undefined>>;
type _06c = Expect<
  Equal<ClassContextProfile["registration"], [initializer: (this: GivenBaseClass) => void]>
>;
type _06d = Expect<Equal<ClassContextProfile["registrationResult"], void>>;
type _06e = Expect<Equal<ClassContextProfile["metadata"], DecoratorMetadata>>;

// 7. Build the reader for the initializer a class decorator may register. It
//    runs once the class value is finalised, with that final class as `this` —
//    which is what makes registration the natural use for it.
export type ClassInitializer<Class extends Constructor> = TODO; // TODO(koan)

type _07a = Expect<Equal<ThisParameterType<ClassInitializer<GivenBaseClass>>, GivenBaseClass>>;
type _07b = Expect<Equal<Parameters<ClassInitializer<GivenBaseClass>>, []>>;
type _07c = Expect<Equal<ReturnType<ClassInitializer<GivenBaseClass>>, void>>;
type _07d = Expect<Equal<ThisParameterType<ClassInitializer<GivenWiderInstance>>, GivenWiderInstance>>;

// ─── What a replacement has to keep ───────────────────────────────────

// 8. Report the static side. A replacement that forgets a static member is not
//    the same class, however identical its instances are.
export type StaticSideProfile = TODO; // TODO(koan)

type _08a = Expect<Equal<StaticSideProfile["withTheStatic"], true>>;
type _08b = Expect<Equal<StaticSideProfile["withoutTheStatic"], false>>;
type _08c = Expect<Equal<StaticSideProfile["staticValue"], "base">>;
type _08d = Expect<Equal<StaticSideProfile["instancesAgreeAnyway"], true>>;

// 9. Report the constructor parameters, which are an input position and
//     therefore have no room to move at all in the direction people expect.
export type ArgumentProfile = TODO; // TODO(koan)

type _09a = Expect<Equal<ArgumentProfile["original"], [id: number]>>;
type _09b = Expect<Equal<ArgumentProfile["changed"], [id: string]>>;
type _09c = Expect<Equal<ArgumentProfile["changedIsRefused"], false>>;
type _09d = Expect<Equal<ArgumentProfile["originalIsAccepted"], true>>;

// 10. Report the instance side, which *is* free to move — a replacement whose
//     instances carry more still satisfies everyone holding the original,
//     because construction results are an output position.
export type InstanceSideProfile = TODO; // TODO(koan)

type _10a = Expect<Equal<InstanceSideProfile["widerInstanceAccepted"], true>>;
type _10b = Expect<Equal<InstanceSideProfile["narrowerInstanceRefused"], false>>;
type _10c = Expect<Equal<InstanceSideProfile["widerInstance"], GivenBaseInstance & { readonly extra: true }>>;
type _10d = Expect<Equal<InstanceSideProfile["extraMemberIsVisibleOnTheReplacement"], true>>;

// ─── The factories that produce decorators ────────────────────────────

// 11. Build the tracing factory's signature: configuration in, a decorator out.
//     The decorator stays generic in the class so it can be applied anywhere.
export type TraceConstructionFactory = TODO; // TODO(koan)

type _11a = Expect<Equal<Parameters<TraceConstructionFactory>, [log: string[]]>>;
type _11b = Expect<Equal<Parameters<ReturnType<TraceConstructionFactory>>["length"], 2>>;
type _11c = Expect<
  Equal<
    {
      decoratorResult: ReturnType<ReturnType<TraceConstructionFactory>>;
      nonFunctionHasNoReplacement: ClassReplacement<string>;
    },
    { decoratorResult: Constructor<object, any[]>; nonFunctionHasNoReplacement: never }
  >
>;
type _11d = Expect<
  Equal<Parameters<ReturnType<TraceConstructionFactory>>[0], Constructor<object, any[]>>
>;

// 12. Build the registration factory. It returns `void`, so the declaration is
//     kept — registration happens through the initializer, not by replacement.
export type RegisterClassFactory = TODO; // TODO(koan)

type _12a = Expect<Equal<Parameters<RegisterClassFactory>, [registry: Function[]]>>;
type _12b = Expect<Equal<ReturnType<ReturnType<RegisterClassFactory>>, void>>;
type _12c = Expect<Equal<ClassReplacement<ReturnType<RegisterClassFactory>>, never>>;
type _12d = Expect<Equal<Parameters<ReturnType<RegisterClassFactory>>["length"], 2>>;

// 13. Build the tagging factory, whose `const` parameter is what keeps the tag a
//     literal instead of widening it to `string` — the tag is evidence, so it
//     has to stay specific.
export type AddInstanceTagFactory = TODO; // TODO(koan)

type _13a = Expect<Equal<Parameters<AddInstanceTagFactory>, [tag: string]>>;
type _13b = Expect<Equal<Parameters<AddInstanceTagFactory>["length"], 1>>;
type _13c = Expect<Equal<Parameters<ReturnType<AddInstanceTagFactory>>["length"], 2>>;
type _13d = Expect<
  Equal<
    Parameters<ReturnType<AddInstanceTagFactory>>[1],
    ClassDecoratorContext<Constructor<object, any[]>>
  >
>;

// ─── What decoration does not do ──────────────────────────────────────

// 14. Report the decorated declaration. Its type is exactly what the source
//     said: the runtime subclass added a field, and the static surface says
//     nothing about it.
export type DeclaredSurfaceProfile = TODO; // TODO(koan)

type _14a = Expect<Equal<DeclaredSurfaceProfile["constructorParameters"], [name: string]>>;
type _14b = Expect<Equal<DeclaredSurfaceProfile["instanceKeys"], "name" | "greet">>;
type _14c = Expect<Equal<DeclaredSurfaceProfile["staticMember"], "service">>;
type _14d = Expect<Equal<DeclaredSurfaceProfile["runtimeTagIsVisible"], false>>;
type _14e = Expect<Equal<DeclaredSurfaceProfile["greetResult"], string>>;

// 15. Report the direction the missing member can still be reached from. The
//     declared instance does not have the runtime tag, but a type that
//     intersects it in is still an instance — which is the shape an assertion at
//     the boundary would produce.
export type AugmentationProfile = TODO; // TODO(koan)

type _15a = Expect<Equal<AugmentationProfile["declaredHasTheTag"], false>>;
type _15b = Expect<Equal<AugmentationProfile["intersectionIsStillAnInstance"], true>>;
type _15c = Expect<Equal<AugmentationProfile["declaredKeys"], "name" | "greet">>;
type _15d = Expect<Equal<AugmentationProfile["intersectedKeys"], "name" | "greet" | "runtimeTag">>;

// 16. Report the three compatibility questions together — the checklist a
//     replacement has to pass, and which of the near-misses fails which one.
export type ReplacementChecklist = TODO; // TODO(koan)

type _16a = Expect<Equal<ReplacementChecklist["keepsTheStatic"], false>>;
type _16b = Expect<Equal<ReplacementChecklist["keepsTheArguments"], false>>;
type _16c = Expect<Equal<ReplacementChecklist["keepsTheInstance"], true>>;
type _16d = Expect<Equal<ReplacementChecklist["allThree"], true>>;

// 17. Build the gate that admits a candidate only when it is a legal
//     replacement for a given class.
export type ValidReplacement<Class extends Constructor, Candidate> = TODO; // TODO(koan)

type _17a = Expect<
  Equal<
    { admitted: ValidReplacement<GivenBaseClass, GivenWiderInstance>; droppingTheStaticIsRefused: GivenExtends<GivenMissingStatic, GivenBaseClass> },
    { admitted: GivenWiderInstance; droppingTheStaticIsRefused: false }
  >
>;
type _17b = Expect<Equal<ValidReplacement<GivenBaseClass, GivenMissingStatic>, never>>;
type _17c = Expect<Equal<ValidReplacement<GivenBaseClass, GivenWrongArgs>, never>>;
type _17d = Expect<
  Equal<
    { admitted: ValidReplacement<GivenBaseClass, GivenBaseClass>; droppingTheStaticIsRefused: GivenExtends<GivenMissingStatic, GivenBaseClass> },
    { admitted: GivenBaseClass; droppingTheStaticIsRefused: false }
  >
>;

// 18. Report one class at a glance: how it is constructed, what it produces, and
//     what a decorator would be handed and allowed to hand back.
export type ClassReport<Class extends Constructor> = TODO; // TODO(koan)

type _18a = Expect<Equal<ClassReport<GivenBaseClass>["arguments"], [id: number]>>;
type _18b = Expect<Equal<ClassReport<GivenBaseClass>["instance"], GivenBaseInstance>>;
type _18c = Expect<
  Equal<
    { replacement: ClassReport<GivenBaseClass>["replacement"]; droppingTheStaticIsRefused: GivenExtends<GivenMissingStatic, GivenBaseClass> },
    { replacement: GivenBaseClass; droppingTheStaticIsRefused: false }
  >
>;
type _18d = Expect<Equal<Parameters<ClassReport<GivenBaseClass>["decorator"]>["length"], 2>>;
type _18e = Expect<Equal<ClassReport<GivenWiderInstance>["arguments"], [id: number]>>;
