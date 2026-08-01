import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-162: method decorators — constructions
 * =============================================================================
 *
 * A method decorator is handed the function itself and a context specialised to
 * that method. Returning a replacement is how wrapping works — logging,
 * counting, memoising — and the replacement has to be usable everywhere the
 * original was, which is an ordinary function-assignability question.
 *
 * That question has two directions and they are not the same. A wrapper may
 * accept *more* than the original, because parameters are inputs; it may return
 * *less*, because results are outputs. Widening the result or narrowing an
 * argument breaks callers. The other thing worth noticing is that a factory
 * stays generic across every method it will ever be applied to, so its own
 * reflected types are the constraints rather than any particular method.
 * Replace each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;
type GivenIsAny<Value> = 0 extends 1 & Value ? true : false;

// One receiver, and an overloaded member for the reflection edge case.
type GivenReceiver = { offset: number };
interface GivenOverloaded {
  (input: string): string;
  (input: number): number;
}

// ─── The method and its decorator ─────────────────────────────────────

// 1. Build the method shape. Stating the receiver explicitly is what makes a
//    replacement prove it can be called on the same instances.
export type MethodValue<This, Args extends readonly unknown[], Result> = TODO; // TODO(koan)

type _01a = Expect<Equal<ThisParameterType<MethodValue<GivenReceiver, [left: number], number>>, GivenReceiver>>;
type _01b = Expect<Equal<Parameters<MethodValue<GivenReceiver, [left: number, right: number], number>>, [left: number, right: number]>>;
type _01c = Expect<Equal<ReturnType<MethodValue<GivenReceiver, [], number>>, number>>;
type _01d = Expect<Equal<Parameters<MethodValue<GivenReceiver, [], void>>, []>>;
type _01e = Expect<
  Equal<
    {
      widerInputAccepted: GivenExtends<
        MethodValue<GivenReceiver, [input: string | number], number>,
        MethodValue<GivenReceiver, [input: string], number>
      >;
      narrowerInputRefused: GivenExtends<
        MethodValue<GivenReceiver, [input: "literal"], number>,
        MethodValue<GivenReceiver, [input: string], number>
      >;
    },
    { widerInputAccepted: true; narrowerInputRefused: false }
  >
>;

// 2. Build the decorator's signature.
export type MethodDecorator<This, Args extends readonly unknown[], Result> = TODO; // TODO(koan)

type _02a = Expect<
  Equal<
    Parameters<MethodDecorator<GivenReceiver, [left: number, right: number], number>>[0],
    MethodValue<GivenReceiver, [left: number, right: number], number>
  >
>;
type _02b = Expect<
  Equal<
    {
      returned: ReturnType<MethodDecorator<GivenReceiver, [left: number, right: number], number>>;
      nothingToDecorate: MethodContextOf<unknown>;
    },
    { returned: MethodValue<GivenReceiver, [left: number, right: number], number> | void; nothingToDecorate: never }
  >
>;
type _02c = Expect<Equal<Parameters<MethodDecorator<GivenReceiver, [], void>>["length"], 2>>;
type _02d = Expect<
  Equal<
    Parameters<MethodDecorator<GivenReceiver, [], void>>[1] extends { kind: infer Kind } ? Kind : never,
    "method"
  >
>;

// 3. Build the context reader — from a method type alone, the context a
//    decorator on it would be handed.
export type MethodContextOf<Method> = TODO; // TODO(koan)

type _03a = Expect<Equal<MethodContextOf<MethodValue<GivenReceiver, [input: string], number>>["kind"], "method">>;
type _03b = Expect<Equal<MethodContextOf<MethodValue<GivenReceiver, [input: string], number>>["name"], string | symbol>>;
type _03c = Expect<Equal<MethodContextOf<never>, never>>;
type _03d = Expect<Equal<MethodContextOf<unknown>, never>>;
type _03e = Expect<
  Equal<
    {
      recovered: ReturnType<MethodContextOf<MethodValue<GivenReceiver, [input: string], number>>["access"]["get"]>;
      nothingToDecorate: MethodContextOf<unknown>;
    },
    { recovered: MethodValue<GivenReceiver, [input: string], number>; nothingToDecorate: never }
  >
>;

// 4. Build the replacement reader.
export type MethodReplacement<Decorator> = TODO; // TODO(koan)

type _04a = Expect<
  Equal<
    {
      replacement: MethodReplacement<MethodDecorator<GivenReceiver, [left: number], number>>;
      nothingToDecorate: MethodContextOf<unknown>;
    },
    { replacement: MethodValue<GivenReceiver, [left: number], number>; nothingToDecorate: never }
  >
>;
type _04b = Expect<Equal<MethodReplacement<() => void>, never>>;
type _04c = Expect<Equal<MethodReplacement<() => never>, never>>;
type _04d = Expect<
  Equal<
    {
      anyResultStaysAny: GivenIsAny<MethodReplacement<() => any>>;
      voidResultIsRemoved: MethodReplacement<() => void>;
    },
    { anyResultStaysAny: true; voidResultIsRemoved: never }
  >
>;
type _04e = Expect<
  Equal<
    Parameters<MethodReplacement<MethodDecorator<GivenReceiver, [left: number, right: number], number>>>,
    [left: number, right: number]
  >
>;

// ─── Which replacements are legal ─────────────────────────────────────

// 5. Report the parameter direction. A wrapper that accepts a wider input still
//    handles every call the original could; one that demands a narrower input
//    does not.
export type ParameterDirectionProfile = TODO; // TODO(koan)

type _05a = Expect<Equal<ParameterDirectionProfile["widerInput"], true>>;
type _05b = Expect<Equal<ParameterDirectionProfile["narrowerInput"], false>>;
type _05c = Expect<Equal<ParameterDirectionProfile["sameInput"], true>>;
type _05d = Expect<Equal<ParameterDirectionProfile["extraParameterRefused"], false>>;
type _05e = Expect<Equal<ParameterDirectionProfile["fewerParametersAccepted"], true>>;

// 6. Report the result direction, which moves the other way: a wrapper may
//    promise *more* precisely than the original, never less.
export type ResultDirectionProfile = TODO; // TODO(koan)

type _06a = Expect<Equal<ResultDirectionProfile["narrowerResult"], true>>;
type _06b = Expect<Equal<ResultDirectionProfile["widerResult"], false>>;
type _06c = Expect<Equal<ResultDirectionProfile["sameResult"], true>>;
type _06d = Expect<Equal<ResultDirectionProfile["bothDirectionsAtOnce"], true>>;

// 7. Report the context. Everything it says about the declaration is a fact the
//     decorator can branch on, and none of it is narrowed by the method type.
export type ContextProfile = TODO; // TODO(koan)

type _07a = Expect<Equal<ContextProfile["kind"], "method">>;
type _07b = Expect<Equal<ContextProfile["name"], string | symbol>>;
type _07c = Expect<Equal<ContextProfile["placement"], boolean>>;
type _07d = Expect<Equal<ContextProfile["visibility"], boolean>>;
type _07e = Expect<Equal<ContextProfile["accessKeys"], "has" | "get">>;

// 8. Report the access helpers, which take the instance and hand back the method
//     — the read side only, because a method cannot be assigned through.
export type AccessProfile = TODO; // TODO(koan)

type _08a = Expect<Equal<AccessProfile["getInput"], [object: GivenReceiver]>>;
type _08b = Expect<
  Equal<
    {
      read: AccessProfile["getOutput"];
      nothingToDecorate: MethodContextOf<unknown>;
    },
    { read: MethodValue<GivenReceiver, [input: string], number>; nothingToDecorate: never }
  >
>;
type _08c = Expect<Equal<AccessProfile["hasInput"], [object: GivenReceiver]>>;
type _08d = Expect<Equal<AccessProfile["hasOutput"], boolean>>;

// ─── The factories ────────────────────────────────────────────────────

// 9. Build the logging factory. It is generic in the method, so one decorator
//     works on every method in a class — and its own reflected types are the
//     constraints rather than any one method's shape.
export type LogCallsFactory = TODO; // TODO(koan)

type _09a = Expect<Equal<Parameters<LogCallsFactory>, [log: string[], label: string]>>;
type _09b = Expect<Equal<Parameters<ReturnType<LogCallsFactory>>["length"], 2>>;
type _09c = Expect<
  Equal<
    {
      produced: ReturnType<ReturnType<LogCallsFactory>>;
      nothingToDecorate: MethodContextOf<unknown>;
    },
    { produced: MethodValue<unknown, readonly unknown[], unknown>; nothingToDecorate: never }
  >
>;
type _09d = Expect<
  Equal<Parameters<ReturnType<LogCallsFactory>>[0], MethodValue<unknown, readonly unknown[], unknown>>
>;

// 10. Build the counting factory, which needs no per-method information at all —
//     the only thing it uses the type parameters for is to hand the same shape
//     back.
export type CountCallsFactory = TODO; // TODO(koan)

type _10a = Expect<Equal<Parameters<CountCallsFactory>, [counter: { count: number }]>>;
type _10b = Expect<Equal<Parameters<ReturnType<CountCallsFactory>>["length"], 2>>;
type _10c = Expect<
  Equal<
    {
      produced: ReturnType<ReturnType<CountCallsFactory>>;
      nothingToDecorate: MethodContextOf<unknown>;
    },
    { produced: MethodValue<unknown, readonly unknown[], unknown>; nothingToDecorate: never }
  >
>;
type _10d = Expect<Equal<Parameters<CountCallsFactory>["length"], 1>>;

// 11. Build the memoising decorator, which is *not* a factory and is deliberately
//     narrower: it can only be applied where the receiver is an object and the
//     method takes exactly one argument, because that is what its cache needs.
export type MemoizeUnary = TODO; // TODO(koan)

type _11a = Expect<Equal<Parameters<MemoizeUnary>["length"], 2>>;
type _11b = Expect<Equal<Parameters<MemoizeUnary>[0], (this: object, input: unknown) => unknown>>;
type _11c = Expect<Equal<ReturnType<MemoizeUnary>, (this: object, input: unknown) => unknown>>;
type _11d = Expect<
  Equal<
    {
      appliedToAUnaryMethod: GivenExtends<
        MethodValue<GivenReceiver, [input: string], number>,
        (this: GivenReceiver, input: string) => number
      >;
      nothingToDecorate: MethodContextOf<unknown>;
    },
    { appliedToAUnaryMethod: true; nothingToDecorate: never }
  >
>;

// 12. Build the observing decorator, which returns nothing. The declaration is
//     kept exactly as written; only the context is read.
export type RecordContextFactory = TODO; // TODO(koan)

type _12a = Expect<Equal<ReturnType<ReturnType<RecordContextFactory>>, void>>;
type _12b = Expect<Equal<MethodReplacement<ReturnType<RecordContextFactory>>, never>>;
type _12c = Expect<Equal<Parameters<RecordContextFactory>, [log: string[]]>>;
type _12d = Expect<Equal<Parameters<ReturnType<RecordContextFactory>>["length"], 2>>;

// ─── Reflection edges ─────────────────────────────────────────────────

// 13. Report the asynchronous case. A promise is just the result type, so
//     nothing about the decorator changes — but the awaited type is one level
//     further in.
export type AsyncProfile = TODO; // TODO(koan)

type _13a = Expect<Equal<AsyncProfile["result"], Promise<number>>>;
type _13b = Expect<Equal<AsyncProfile["awaited"], number>>;
type _13c = Expect<Equal<AsyncProfile["kind"], "method">>;
type _13d = Expect<Equal<AsyncProfile["syncReplacementRefused"], false>>;

// 14. Report the overloaded case. Reflection sees only the last signature, so a
//     wrapper built from `Parameters` and `ReturnType` silently narrows a method
//     that had more than one way to be called.
export type OverloadProfile = TODO; // TODO(koan)

type _14a = Expect<Equal<OverloadProfile["reflectedParameters"], [input: number]>>;
type _14b = Expect<Equal<OverloadProfile["reflectedResult"], number>>;
type _14c = Expect<Equal<OverloadProfile["contextKind"], "method">>;
type _14d = Expect<
  Equal<
    {
      rebuilt: OverloadProfile["rebuiltFromReflection"];
      nothingToDecorate: MethodContextOf<unknown>;
    },
    { rebuilt: MethodValue<unknown, [input: number], number>; nothingToDecorate: never }
  >
>;
type _14e = Expect<Equal<OverloadProfile["rebuiltIsNotTheOriginal"], false>>;

// 15. Report the union case, where a method type is not yet decided. Reflection
//     answers with a union of what each member says, so nothing is callable
//     until the union is resolved.
export type UnionMethodProfile = TODO; // TODO(koan)

type _15a = Expect<Equal<UnionMethodProfile["parameters"], [input: string] | [id: string]>>;
type _15b = Expect<Equal<UnionMethodProfile["result"], number | Promise<number>>>;
type _15c = Expect<Equal<UnionMethodProfile["contextOfBottom"], never>>;
type _15d = Expect<Equal<UnionMethodProfile["contextOfTop"], never>>;

// ─── Putting a wrapper together ───────────────────────────────────────

// 16. Build the gate that admits a candidate only when it can stand in for the
//     original method everywhere.
export type ValidWrapper<Original, Candidate> = TODO; // TODO(koan)

type _16a = Expect<
  Equal<
    {
      admitted: ValidWrapper<
        MethodValue<GivenReceiver, [input: string], number>,
        MethodValue<GivenReceiver, [input: string | number], number>
      >;
      nothingToDecorate: MethodContextOf<unknown>;
    },
    { admitted: MethodValue<GivenReceiver, [input: string | number], number>; nothingToDecorate: never }
  >
>;
type _16b = Expect<
  Equal<
    ValidWrapper<
      MethodValue<GivenReceiver, [input: string], number>,
      MethodValue<GivenReceiver, [input: "literal"], number>
    >,
    never
  >
>;
type _16c = Expect<
  Equal<
    ValidWrapper<
      MethodValue<GivenReceiver, [input: string], number>,
      MethodValue<GivenReceiver, [input: string], number | string>
    >,
    never
  >
>;
type _16d = Expect<
  Equal<
    {
      admitted: ValidWrapper<
        MethodValue<GivenReceiver, [input: string], number>,
        MethodValue<GivenReceiver, [input: string], 1>
      >;
      nothingToDecorate: MethodContextOf<unknown>;
    },
    { admitted: MethodValue<GivenReceiver, [input: string], 1>; nothingToDecorate: never }
  >
>;

// 17. Build the wrapper generator: from a method, the decorator that could wrap
//     it and the replacement that decorator may return.
export type WrapperFor<Method> = TODO; // TODO(koan)

type _17a = Expect<
  Equal<
    {
      replacement: WrapperFor<MethodValue<GivenReceiver, [input: string], number>>["replacement"];
      nothingToDecorate: MethodContextOf<unknown>;
    },
    { replacement: MethodValue<GivenReceiver, [input: string], number>; nothingToDecorate: never }
  >
>;
type _17b = Expect<
  Equal<
    WrapperFor<MethodValue<GivenReceiver, [input: string], number>>["context"] extends { kind: infer Kind }
      ? Kind
      : never,
    "method"
  >
>;
type _17c = Expect<
  Equal<
    Parameters<WrapperFor<MethodValue<GivenReceiver, [input: string], number>>["decorator"]>["length"],
    2
  >
>;
type _17d = Expect<Equal<WrapperFor<string>, never>>;

// 18. Report one method at a glance: how it is called, what it answers, and what
//     a decorator on it is allowed to return.
export type MethodReport<Method> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<MethodReport<MethodValue<GivenReceiver, [input: string], number>>["receiver"], GivenReceiver>
>;
type _18b = Expect<
  Equal<MethodReport<MethodValue<GivenReceiver, [input: string], number>>["arguments"], [input: string]>
>;
type _18c = Expect<Equal<MethodReport<MethodValue<GivenReceiver, [input: string], number>>["result"], number>>;
type _18d = Expect<
  Equal<
    {
      replacement: MethodReport<MethodValue<GivenReceiver, [input: string], number>>["replacement"];
      nothingToDecorate: MethodContextOf<unknown>;
    },
    { replacement: MethodValue<GivenReceiver, [input: string], number>; nothingToDecorate: never }
  >
>;
type _18e = Expect<Equal<MethodReport<string>["replacement"], never>>;
