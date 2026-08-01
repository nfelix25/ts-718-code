import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-163: field decorators — constructions
 * =============================================================================
 *
 * A field has no value when its decorator runs, so the first argument is
 * `undefined` and there is nothing to replace. What a field decorator may return
 * instead is an *initializer*: a function called once per instance with the value
 * the field would otherwise have had, whose result becomes the field's value.
 * Two different moments, two different values — that is the whole shape of it.
 *
 * The initializer is an ordinary function, so the usual direction rules apply:
 * it may accept a wider input than the field's type and must produce exactly
 * that type back, since whatever it returns is what the field will hold. And as
 * with every decorator, nothing about the declared class changes — a private
 * field stays invisible to `keyof` no matter what the context can reach at run
 * time. Replace each `TODO` with a type satisfying the assertions directly
 * below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;
type GivenIsAny<Value> = 0 extends 1 & Value ? true : false;

// One receiver, and a class that was decorated at runtime — its declared shape
// is what the source said, private members included (or rather, excluded).
type GivenReceiver = { score: number };
declare const decoratedRecord: {
  readonly category: "record";
  new (): { score: number; name: string };
};

// ─── The two moments ──────────────────────────────────────────────────

// 1. Build the initializer: the per-instance hook a field decorator may return.
//    It runs with the instance as `this` and the declared initial value as its
//    argument.
export type FieldInitializer<This, Value> = TODO; // TODO(koan)

type _01a = Expect<Equal<Parameters<FieldInitializer<GivenReceiver, number>>, [initialValue: number]>>;
type _01b = Expect<Equal<ReturnType<FieldInitializer<GivenReceiver, number>>, number>>;
type _01c = Expect<Equal<ThisParameterType<FieldInitializer<GivenReceiver, number>>, GivenReceiver>>;
type _01d = Expect<Equal<Parameters<FieldInitializer<GivenReceiver, unknown>>, [initialValue: unknown]>>;
type _01e = Expect<Equal<FieldInitializer<GivenReceiver, never>, (this: GivenReceiver, initialValue: never) => never>>;

// 2. Build the decorator's signature. The first argument is the one that
//    surprises people: there is no field value yet, so the only honest type for
//    it is `undefined`.
export type FieldDecorator<This, Value> = TODO; // TODO(koan)

type _02a = Expect<Equal<Parameters<FieldDecorator<GivenReceiver, number>>[0], undefined>>;
type _02b = Expect<
  Equal<Parameters<FieldDecorator<GivenReceiver, number>>[1], ClassFieldDecoratorContext<GivenReceiver, number>>
>;
type _02c = Expect<Equal<Parameters<FieldDecorator<GivenReceiver, number>>["length"], 2>>;
type _02d = Expect<
  Equal<
    Parameters<FieldDecorator<GivenReceiver, number>>[1] extends { kind: infer Kind } ? Kind : never,
    "field"
  >
>;
type _02e = Expect<
  Equal<
    {
      returned: ReturnType<FieldDecorator<GivenReceiver, number>>;
      thereIsNoValueYet: Parameters<FieldDecorator<GivenReceiver, number>>[0];
    },
    { returned: FieldInitializer<GivenReceiver, number> | void; thereIsNoValueYet: undefined }
  >
>;

// 3. Build the replacement reader.
export type FieldReplacement<Decorator> = TODO; // TODO(koan)

type _03a = Expect<
  Equal<
    {
      initializer: FieldReplacement<FieldDecorator<GivenReceiver, number>>;
      thereIsNoValueYet: Parameters<FieldDecorator<GivenReceiver, number>>[0];
    },
    { initializer: FieldInitializer<GivenReceiver, number>; thereIsNoValueYet: undefined }
  >
>;
type _03b = Expect<Equal<FieldReplacement<() => void>, never>>;
type _03c = Expect<Equal<FieldReplacement<() => never>, never>>;
type _03d = Expect<
  Equal<
    {
      anyResultStaysAny: GivenIsAny<FieldReplacement<() => any>>;
      voidResultIsRemoved: FieldReplacement<() => void>;
    },
    { anyResultStaysAny: true; voidResultIsRemoved: never }
  >
>;
type _03e = Expect<
  Equal<
    {
      unionWithVoidCollapses: FieldReplacement<() => FieldInitializer<GivenReceiver, number> | void>;
      thereIsNoValueYet: Parameters<FieldDecorator<GivenReceiver, number>>[0];
    },
    { unionWithVoidCollapses: FieldInitializer<GivenReceiver, number>; thereIsNoValueYet: undefined }
  >
>;

// ─── What the context can reach ───────────────────────────────────────

// 4. Report the field context. Unlike a method, a field can be written, so its
//    access object has a setter as well as a getter.
export type FieldContextProfile = TODO; // TODO(koan)

type _04a = Expect<Equal<FieldContextProfile["kind"], "field">>;
type _04b = Expect<Equal<FieldContextProfile["name"], string | symbol>>;
type _04c = Expect<Equal<FieldContextProfile["placement"], boolean>>;
type _04d = Expect<Equal<FieldContextProfile["visibility"], boolean>>;
type _04e = Expect<Equal<FieldContextProfile["accessKeys"], "has" | "get" | "set">>;

// 5. Report the access helpers in detail. The setter takes the instance *and*
//    the value, which is what makes a field context able to write where a method
//    context cannot.
export type AccessProfile = TODO; // TODO(koan)

type _05a = Expect<Equal<AccessProfile["getInput"], [object: GivenReceiver]>>;
type _05b = Expect<Equal<AccessProfile["getOutput"], number>>;
type _05c = Expect<Equal<AccessProfile["setInput"], [object: GivenReceiver, value: number]>>;
type _05d = Expect<Equal<AccessProfile["setOutput"], void>>;
type _05e = Expect<Equal<AccessProfile["hasOutput"], boolean>>;

// 6. Report the initializer hook, which is a different thing again from the
//    returned initializer: it takes no value, returns nothing, and only exists
//    to observe.
export type InitializerHookProfile = TODO; // TODO(koan)

type _06a = Expect<
  Equal<InitializerHookProfile["registration"], [initializer: (this: GivenReceiver) => void]>
>;
type _06b = Expect<Equal<InitializerHookProfile["registrationResult"], void>>;
type _06c = Expect<Equal<InitializerHookProfile["hookReceiver"], GivenReceiver>>;
type _06d = Expect<Equal<InitializerHookProfile["hookArguments"], []>>;

// ─── What an initializer may be ───────────────────────────────────────

// 7. Report the input direction. An initializer may take more than the field's
//    type, because whatever it is handed will be one of those values — but
//    demanding less is refused.
export type InitializerInputProfile = TODO; // TODO(koan)

type _07a = Expect<Equal<InitializerInputProfile["widerInput"], true>>;
type _07b = Expect<Equal<InitializerInputProfile["narrowerInput"], false>>;
type _07c = Expect<Equal<InitializerInputProfile["sameInput"], true>>;
type _07d = Expect<Equal<InitializerInputProfile["reversedIsRefused"], false>>;

// 8. Report the output direction. Whatever the initializer returns *becomes* the
//    field, so it has to be assignable to the declared type — a narrower result
//    is fine, a different one is not.
export type InitializerOutputProfile = TODO; // TODO(koan)

type _08a = Expect<Equal<InitializerOutputProfile["narrowerOutput"], true>>;
type _08b = Expect<Equal<InitializerOutputProfile["widerOutput"], false>>;
type _08c = Expect<Equal<InitializerOutputProfile["wrongOutput"], false>>;
type _08d = Expect<Equal<InitializerOutputProfile["bothDirections"], true>>;

// ─── The decorators themselves ────────────────────────────────────────

// 9. Build the factory that transforms the initial value. It fixes the field's
//    type but stays generic in the receiver, so it applies to any class with a
//    numeric field.
export type MultiplyByFactory = TODO; // TODO(koan)

type _09a = Expect<Equal<Parameters<MultiplyByFactory>, [factor: number]>>;
type _09b = Expect<Equal<Parameters<ReturnType<MultiplyByFactory>>[0], undefined>>;
type _09c = Expect<Equal<Parameters<ReturnType<MultiplyByFactory>>["length"], 2>>;
type _09d = Expect<
  Equal<
    {
      produced: ReturnType<ReturnType<MultiplyByFactory>>;
      thereIsNoValueYet: Parameters<FieldDecorator<GivenReceiver, number>>[0];
    },
    { produced: FieldInitializer<unknown, number>; thereIsNoValueYet: undefined }
  >
>;

// 10. Build the bare decorator — no factory, applied directly. It fixes the
//     field type to `string`, which is what stops it being usable on a numeric
//     field.
export type TrimFieldDecorator = TODO; // TODO(koan)

type _10a = Expect<Equal<Parameters<TrimFieldDecorator>[0], undefined>>;
type _10b = Expect<
  Equal<
    {
      produced: ReturnType<TrimFieldDecorator>;
      thereIsNoValueYet: Parameters<FieldDecorator<GivenReceiver, number>>[0];
    },
    { produced: FieldInitializer<unknown, string>; thereIsNoValueYet: undefined }
  >
>;
type _10c = Expect<Equal<Parameters<TrimFieldDecorator>["length"], 2>>;
type _10d = Expect<
  Equal<
    {
      fitsAStringField: GivenExtends<TrimFieldDecorator, FieldDecorator<GivenReceiver, string>>;
      doesNotFitANumericField: GivenExtends<TrimFieldDecorator, FieldDecorator<GivenReceiver, number>>;
    },
    { fitsAStringField: true; doesNotFitANumericField: false }
  >
>;

// 11. Build the observing factory. It returns nothing, so the field keeps its
//     declared initial value — everything it does happens through the context.
export type RecordFieldFactory = TODO; // TODO(koan)

type _11a = Expect<Equal<Parameters<RecordFieldFactory>, [log: string[]]>>;
type _11b = Expect<Equal<ReturnType<ReturnType<RecordFieldFactory>>, void>>;
type _11c = Expect<Equal<FieldReplacement<ReturnType<RecordFieldFactory>>, never>>;
type _11d = Expect<Equal<Parameters<ReturnType<RecordFieldFactory>>[0], undefined>>;

// ─── What decoration does not change ──────────────────────────────────

// 12. Report the declared surface of a decorated class. The initializers ran, the
//     values changed, and the types did not move at all.
export type DeclaredSurfaceProfile = TODO; // TODO(koan)

type _12a = Expect<Equal<DeclaredSurfaceProfile["numericField"], number>>;
type _12b = Expect<Equal<DeclaredSurfaceProfile["stringField"], string>>;
type _12c = Expect<Equal<DeclaredSurfaceProfile["staticMember"], "record">>;
type _12d = Expect<Equal<DeclaredSurfaceProfile["instanceKeys"], "score" | "name">>;
type _12e = Expect<Equal<DeclaredSurfaceProfile["privateFieldIsVisible"], false>>;

// 13. Report the field type flowing through the context. Everything the decorator
//     can read or write is pinned to the declared type, including an optional
//     field's `undefined`.
export type ValueFlowProfile = TODO; // TODO(koan)

type _13a = Expect<Equal<ValueFlowProfile["read"], number>>;
type _13b = Expect<Equal<ValueFlowProfile["written"], number>>;
type _13c = Expect<Equal<ValueFlowProfile["optionalRead"], string | undefined>>;
type _13d = Expect<Equal<ValueFlowProfile["optionalWritten"], string | undefined>>;
type _13e = Expect<Equal<ValueFlowProfile["initializerAgrees"], true>>;

// 14. Report the endpoints. A field typed `never` has an initializer nobody can
//     call, and one typed `unknown` has an initializer that must hand `unknown`
//     back — neither is useful, and both follow from the same rule.
export type EndpointProfile = TODO; // TODO(koan)

type _14a = Expect<
  Equal<EndpointProfile["bottomInitializer"], (this: GivenReceiver, initialValue: never) => never>
>;
type _14b = Expect<Equal<EndpointProfile["bottomInput"], [initialValue: never]>>;
type _14c = Expect<
  Equal<EndpointProfile["topInitializer"], (this: GivenReceiver, initialValue: unknown) => unknown>
>;
type _14d = Expect<Equal<EndpointProfile["topOutput"], unknown>>;

// ─── Putting one together ─────────────────────────────────────────────

// 15. Build the gate that admits an initializer only when it is legal for a
//     given field type.
export type ValidInitializer<This, Value, Candidate> = TODO; // TODO(koan)

type _15a = Expect<
  Equal<
    {
      admitted: ValidInitializer<
        GivenReceiver,
        number,
        (this: GivenReceiver, initialValue: number | string) => number
      >;
      thereIsNoValueYet: Parameters<FieldDecorator<GivenReceiver, number>>[0];
    },
    {
      admitted: (this: GivenReceiver, initialValue: number | string) => number;
      thereIsNoValueYet: undefined;
    }
  >
>;
type _15b = Expect<
  Equal<
    ValidInitializer<GivenReceiver, number, (this: GivenReceiver, initialValue: number) => string>,
    never
  >
>;
type _15c = Expect<
  Equal<ValidInitializer<GivenReceiver, number, (this: GivenReceiver, initialValue: 1) => number>, never>
>;
type _15d = Expect<Equal<ValidInitializer<GivenReceiver, number, string>, never>>;

// 16. Build the decorator generator: from a receiver and a field type, the
//     decorator that could be applied and the initializer it may return.
export type FieldDecoratorFor<This, Value> = TODO; // TODO(koan)

type _16a = Expect<
  Equal<
    {
      initializer: FieldDecoratorFor<GivenReceiver, number>["initializer"];
      thereIsNoValueYet: Parameters<FieldDecorator<GivenReceiver, number>>[0];
    },
    { initializer: FieldInitializer<GivenReceiver, number>; thereIsNoValueYet: undefined }
  >
>;
type _16b = Expect<
  Equal<
    FieldDecoratorFor<GivenReceiver, number>["context"] extends { kind: infer Kind } ? Kind : never,
    "field"
  >
>;
type _16c = Expect<Equal<FieldDecoratorFor<GivenReceiver, number>["decorationValue"], undefined>>;
type _16d = Expect<Equal<Parameters<FieldDecoratorFor<GivenReceiver, number>["decorator"]>["length"], 2>>;

// 17. Build the transform reader: given a decorator, the field type it can be
//     applied to, recovered from the initializer it hands back. Watch the
//     degenerate case: a decorator with no replacement leaves `never` on the
//     left of the pattern, and `never` matches everything — so the answer is
//     `unknown` rather than nothing.
export type DecoratedFieldType<Decorator> = TODO; // TODO(koan)

type _17a = Expect<Equal<DecoratedFieldType<FieldDecorator<GivenReceiver, number>>, number>>;
type _17b = Expect<Equal<DecoratedFieldType<FieldDecorator<GivenReceiver, string>>, string>>;
type _17c = Expect<Equal<DecoratedFieldType<() => void>, unknown>>;
type _17d = Expect<Equal<DecoratedFieldType<TrimFieldDecorator>, string>>;

// 18. Report one field at a glance: what its decorator is handed, what it may
//     hand back, and what the context lets it read and write.
export type FieldReport<This, Value> = TODO; // TODO(koan)

type _18a = Expect<Equal<FieldReport<GivenReceiver, number>["decorationValue"], undefined>>;
type _18b = Expect<
  Equal<
    {
      initializer: FieldReport<GivenReceiver, number>["initializer"];
      thereIsNoValueYet: Parameters<FieldDecorator<GivenReceiver, number>>[0];
    },
    { initializer: FieldInitializer<GivenReceiver, number>; thereIsNoValueYet: undefined }
  >
>;
type _18c = Expect<Equal<FieldReport<GivenReceiver, number>["readable"], number>>;
type _18d = Expect<Equal<FieldReport<GivenReceiver, string>["writable"], string>>;
type _18e = Expect<Equal<FieldReport<GivenReceiver, string | undefined>["readable"], string | undefined>>;
