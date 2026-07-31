import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-065: function-type inference — constructions
 * =============================================================================
 *
 * These constructions treat call and construct signatures as type-level data:
 * parameter tuples retain arity, labels, optional positions, and rests; result
 * types stay correlated with their own union member; explicit `this` metadata
 * remains separate from runtime arguments; and constructors require their own
 * pattern. Replace each `TODO` with a type satisfying the assertions directly
 * below it.
 */

interface GivenOverload {
  (value: string): number;
  (value: number, radix?: number): string;
}

interface GivenThisOverload {
  (this: { mode: "text" }, value: string): number;
  (this: { mode: "numeric" }, value: number): string;
}

type GivenIdentity = <Value>(value: Value) => Value;
type GivenPair = <Left, Right>(left: Left, right: Right) => [Left, Right];
type GivenMethod =
  (this: { count: number }, delta: number) => number;
type GivenHybrid = {
  (source: string): number;
  new (timestamp: number): Date;
};

class GivenWidget {
  constructor(
    readonly id: number,
    readonly name?: string,
  ) {}
}

abstract class GivenBase {
  constructor(readonly token: symbol) {}
}

type GivenIsAny<Value> =
  0 extends (1 & Value) ? true : false;
type GivenArgs<Fn> =
  Fn extends (...args: infer Params) => unknown ? Params : never;
type GivenResult<Fn> =
  Fn extends (...args: any[]) => infer Result ? Result : never;
type GivenConstructorArgs<Constructor> =
  Constructor extends abstract new (...args: infer Params) => unknown
    ? Params
    : never;
type GivenInstance<Constructor> =
  Constructor extends abstract new (...args: any[]) => infer Instance
    ? Instance
    : never;

// ─── Complete call signatures ────────────────────────────────────────────

// 1. Capture a callable's complete runtime parameter tuple.
export type ParametersOf<Fn> = TODO; // TODO(koan)

type _01a = Expect<Equal<ParametersOf<() => void>, []>>;
type _01b = Expect<
  Equal<ParametersOf<(id: number) => string>, [id: number]>
>;
type _01c = Expect<
  Equal<
    ParametersOf<(id: number, active?: boolean) => void>,
    [id: number, active?: boolean | undefined]
  >
>;
type _01d = Expect<
  Equal<ParametersOf<(head: string, ...tail: number[]) => void>, [head: string, ...tail: number[]]>
>;
type _01e = Expect<
  Equal<
    ParametersOf<((value: string) => 1) | ((value: number) => 2)>,
    [value: string] | [value: number]
  >
>;

// 2. Capture the result position of each callable union member.
export type ResultOf<Fn> = TODO; // TODO(koan)

type _02a = Expect<Equal<ResultOf<() => undefined>, undefined>>;
type _02b = Expect<Equal<ResultOf<(value: string) => Promise<number>>, Promise<number>>>;
type _02c = Expect<Equal<ResultOf<() => never>, never>>;
type _02d = Expect<
  Equal<ResultOf<(() => 1) | (() => 2) | boolean>, 1 | 2>
>;
type _02e = Expect<Equal<ResultOf<unknown>, never>>;

// 3. Capture parameters and result together to preserve union correlation.
export type SignatureOf<Fn> = TODO; // TODO(koan)

type _03a = Expect<
  Equal<SignatureOf<() => void>, { params: []; result: void }>
>;
type _03b = Expect<
  Equal<
    SignatureOf<(id: number, label?: string) => boolean>,
    {
      params: [id: number, label?: string | undefined];
      result: boolean;
    }
  >
>;
type _03c = Expect<
  Equal<
    SignatureOf<((value: 1) => "a") | ((value: 2) => "b")>,
    | { params: [value: 1]; result: "a" }
    | { params: [value: 2]; result: "b" }
  >
>;
type _03d = Expect<
  Equal<
    SignatureOf<GivenOverload>,
    {
      params: [value: number, radix?: number | undefined];
      result: string;
    }
  >
>;
type _03e = Expect<Equal<SignatureOf<{ label: string }>, never>>;

// 4. Rebuild a callable from its inferred arguments and result.
export type RebuildFunction<Fn> = TODO; // TODO(koan)

type _04a = Expect<
  Equal<RebuildFunction<() => string>, () => string>
>;
type _04b = Expect<
  Equal<
    RebuildFunction<(id: number, active?: boolean) => void>,
    (id: number, active?: boolean) => void
  >
>;
type _04c = Expect<
  Equal<
    RebuildFunction<(...names: string[]) => number>,
    (...names: string[]) => number
  >
>;
type _04d = Expect<
  Equal<
    RebuildFunction<((value: 1) => "a") | ((value: 2) => "b")>,
    ((value: 1) => "a") | ((value: 2) => "b")
  >
>;
type _04e = Expect<Equal<RebuildFunction<unknown>, never>>;

// ─── Positional tuple inference and binding ──────────────────────────────

// 5. Capture a required first parameter from the inferred tuple.
export type FirstParameter<Fn> = TODO; // TODO(koan)

type _05a = Expect<Equal<FirstParameter<(name: string) => void>, string>>;
type _05b = Expect<
  Equal<FirstParameter<(name: string, count: number) => void>, string>
>;
type _05c = Expect<Equal<FirstParameter<() => void>, never>>;
type _05d = Expect<Equal<FirstParameter<(value?: Date) => void>, never>>;
type _05e = Expect<Equal<FirstParameter<(...values: number[]) => void>, never>>;

// 6. Capture a required final parameter from the inferred tuple.
export type LastParameter<Fn> = TODO; // TODO(koan)

type _06a = Expect<Equal<LastParameter<(name: string) => void>, string>>;
type _06b = Expect<
  Equal<LastParameter<(name: string, count: number) => void>, number>
>;
type _06c = Expect<Equal<LastParameter<() => void>, never>>;
type _06d = Expect<
  Equal<LastParameter<(name: string, count?: number) => void>, never>
>;
type _06e = Expect<Equal<LastParameter<(...values: number[]) => void>, never>>;

// 7. Remove one required leading parameter and return the remaining tuple.
export type RestAfterFirst<Fn> = TODO; // TODO(koan)

type _07a = Expect<
  Equal<RestAfterFirst<(id: number) => void>, []>
>;
type _07b = Expect<
  Equal<
    RestAfterFirst<(id: number, label: string, active?: boolean) => void>,
    [label: string, active?: boolean | undefined]
  >
>;
type _07c = Expect<
  Equal<
    RestAfterFirst<(head: string, ...tail: number[]) => void>,
    number[]
  >
>;
type _07d = Expect<Equal<RestAfterFirst<() => void>, never>>;
type _07e = Expect<
  Equal<RestAfterFirst<(value?: string) => void>, never>
>;

// 8. Describe the value accepted by `bindFirst` and the callable it returns.
export type BoundFirst<Fn> = TODO; // TODO(koan)

type _08a = Expect<
  Equal<
    BoundFirst<(left: number, right: number) => number>,
    { first: number; bound: (right: number) => number }
  >
>;
type _08b = Expect<
  Equal<
    BoundFirst<(head: string, ...tail: boolean[]) => Date>,
    { first: string; bound: (...tail: boolean[]) => Date }
  >
>;
type _08c = Expect<
  Equal<
    BoundFirst<(id: number, label?: string) => void>,
    { first: number; bound: (label?: string) => void }
  >
>;
type _08d = Expect<Equal<BoundFirst<() => string>, never>>;
type _08e = Expect<Equal<BoundFirst<(value?: string) => void>, never>>;

// 9. Form the union of all values that can occupy a runtime argument slot.
export type ParameterValues<Fn> = TODO; // TODO(koan)

type _09a = Expect<Equal<ParameterValues<() => void>, never>>;
type _09b = Expect<
  Equal<ParameterValues<(id: number, name: string) => void>, number | string>
>;
type _09c = Expect<
  Equal<ParameterValues<(id: number, active?: boolean) => void>, number | boolean | undefined>
>;
type _09d = Expect<
  Equal<ParameterValues<(...values: Date[]) => void>, Date>
>;
type _09e = Expect<
  Equal<
    ParameterValues<((value: 1) => void) | ((value: 2) => void)>,
    1 | 2
  >
>;

// 10. Expose fixed, optional, and rest arity through the tuple's length.
export type FunctionArity<Fn> = TODO; // TODO(koan)

type _10a = Expect<Equal<FunctionArity<() => void>, 0>>;
type _10b = Expect<
  Equal<FunctionArity<(left: string, right: number) => void>, 2>
>;
type _10c = Expect<
  Equal<FunctionArity<(id: number, label?: string) => void>, 1 | 2>
>;
type _10d = Expect<
  Equal<FunctionArity<(...values: number[]) => void>, number>
>;
type _10e = Expect<
  Equal<FunctionArity<(head: string, ...tail: boolean[]) => void>, number>
>;

// ─── Explicit this metadata ──────────────────────────────────────────────

// 11. Recover an explicit receiver, or unknown when none was declared.
export type ThisOf<Fn> = TODO; // TODO(koan)

type _11a = Expect<
  Equal<ThisOf<GivenMethod>, { count: number }>
>;
type _11b = Expect<
  Equal<ThisOf<(this: Date, format: string) => string>, Date>
>;
type _11c = Expect<
  Equal<ThisOf<(value: string) => number>, unknown>
>;
type _11d = Expect<
  Equal<ThisOf<GivenThisOverload>, { mode: "numeric" }>
>;

// 12. Remove receiver metadata while retaining runtime arguments and result.
export type WithoutThis<Fn> = TODO; // TODO(koan)

type _12a = Expect<
  Equal<WithoutThis<GivenMethod>, (delta: number) => number>
>;
type _12b = Expect<
  Equal<
    WithoutThis<(this: Date, format: string, locale?: string) => string>,
    (format: string, locale?: string) => string
  >
>;
type _12c = Expect<
  Equal<WithoutThis<(value: string) => number>, (value: string) => number>
>;
type _12d = Expect<
  Equal<
    WithoutThis<GivenThisOverload>,
    (value: number) => string
  >
>;

// 13. Capture receiver metadata, runtime arguments, and result separately.
export type MethodSignature<Fn> = TODO; // TODO(koan)

type _13a = Expect<
  Equal<
    MethodSignature<GivenMethod>,
    {
      this: { count: number };
      params: [delta: number];
      result: number;
    }
  >
>;
type _13b = Expect<
  Equal<
    MethodSignature<(value: string) => boolean>,
    {
      this: unknown;
      params: [value: string];
      result: boolean;
    }
  >
>;
type _13c = Expect<
  Equal<
    MethodSignature<GivenThisOverload>,
    {
      this: { mode: "numeric" };
      params: [value: number];
      result: string;
    }
  >
>;
type _13d = Expect<Equal<MethodSignature<unknown>, never>>;

// ─── Constructor signatures ─────────────────────────────────────────────

// 14. Capture the complete argument tuple of a concrete or abstract constructor.
export type ConstructorParametersOf<Constructor> = TODO; // TODO(koan)

type _14a = Expect<
  Equal<
    ConstructorParametersOf<typeof GivenWidget>,
    [id: number, name?: string | undefined]
  >
>;
type _14b = Expect<
  Equal<ConstructorParametersOf<typeof GivenBase>, [token: symbol]>
>;
type _14c = Expect<
  Equal<ConstructorParametersOf<new () => Date>, []>
>;
type _14d = Expect<
  Equal<
    ConstructorParametersOf<abstract new (...values: number[]) => object>,
    number[]
  >
>;
type _14e = Expect<
  Equal<ConstructorParametersOf<() => Date>, never>
>;

// 15. Capture constructor arguments and the instance they create together.
export type ConstructorSignature<Constructor> = TODO; // TODO(koan)

type _15a = Expect<
  Equal<
    ConstructorSignature<typeof GivenWidget>,
    {
      params: [id: number, name?: string | undefined];
      instance: GivenWidget;
    }
  >
>;
type _15b = Expect<
  Equal<
    ConstructorSignature<typeof GivenBase>,
    { params: [token: symbol]; instance: GivenBase }
  >
>;
type _15c = Expect<
  Equal<
    ConstructorSignature<new (source: string, flags?: string) => RegExp>,
    {
      params: [source: string, flags?: string | undefined];
      instance: RegExp;
    }
  >
>;
type _15d = Expect<
  Equal<
    ConstructorSignature<(new (value: 1) => Date) | (new (value: 2) => RegExp)>,
    | { params: [value: 1]; instance: Date }
    | { params: [value: 2]; instance: RegExp }
  >
>;
type _15e = Expect<Equal<ConstructorSignature<Date>, never>>;

// 16. Expose call and construction channels independently on hybrid types.
export type HybridSignature<Value> = TODO; // TODO(koan)

type _16a = Expect<
  Equal<
    HybridSignature<GivenHybrid>,
    [
      { params: [source: string]; result: number },
      { params: [timestamp: number]; instance: Date },
    ]
  >
>;
type _16b = Expect<
  Equal<
    HybridSignature<() => string>,
    [{ params: []; result: string }, never]
  >
>;
type _16c = Expect<
  Equal<
    HybridSignature<new () => Date>,
    [never, { params: []; instance: Date }]
  >
>;
type _16d = Expect<
  Equal<HybridSignature<unknown>, [never, never]>
>;

// ─── Generic, overload, and special-type boundaries ─────────────────────

// 17. Capture generic signatures at their broad declaration-level placeholders.
export type GenericSignature<Fn> = TODO; // TODO(koan)

type _17a = Expect<
  Equal<GenericSignature<GivenIdentity>, [[value: unknown], unknown]>
>;
type _17b = Expect<
  Equal<
    GenericSignature<GivenPair>,
    [[left: unknown, right: unknown], [unknown, unknown]]
  >
>;
type _17c = Expect<
  Equal<
    GenericSignature<<Value extends string>(value: Value) => Value>,
    [[value: string], string]
  >
>;
type _17d = Expect<
  Equal<
    GenericSignature<GivenOverload>,
    [[value: number, radix?: number | undefined], string]
  >
>;
type _17e = Expect<Equal<GenericSignature<never>, never>>;

// 18. Describe parameter inference for any, never, unknown, and structural calls.
export type ParameterSpecialProfile<Fn> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<ParameterSpecialProfile<any>, [false, unknown[]]>
>;
type _18b = Expect<
  Equal<ParameterSpecialProfile<never>, [false, never]>
>;
type _18c = Expect<
  Equal<ParameterSpecialProfile<unknown>, [false, never]>
>;
type _18d = Expect<
  Equal<
    ParameterSpecialProfile<{ (value: 1): 2; tag: "fn" }>,
    [false, [value: 1]]
  >
>;
type _18e = Expect<
  Equal<ParameterSpecialProfile<new (value: number) => object>, [false, never]>
>;

// 19. Describe result inference without allowing a raw any answer.
export type ResultSpecialProfile<Fn> = TODO; // TODO(koan)

type _19a = Expect<
  Equal<ResultSpecialProfile<any>, [false, unknown]>
>;
type _19b = Expect<
  Equal<ResultSpecialProfile<never>, [false, never]>
>;
type _19c = Expect<
  Equal<ResultSpecialProfile<unknown>, [false, never]>
>;
type _19d = Expect<
  Equal<ResultSpecialProfile<Function>, [false, never]>
>;
type _19e = Expect<
  Equal<ResultSpecialProfile<{ (): 1; tag: "fn" }>, [false, 1]>
>;

// 20. Describe constructor-argument inference at the same special boundaries.
export type ConstructorSpecialProfile<Constructor> = TODO; // TODO(koan)

type _20a = Expect<
  Equal<ConstructorSpecialProfile<any>, [false, unknown[], unknown]>
>;
type _20b = Expect<
  Equal<ConstructorSpecialProfile<never>, [false, never, never]>
>;
type _20c = Expect<
  Equal<ConstructorSpecialProfile<unknown>, [false, never, never]>
>;
type _20d = Expect<
  Equal<
    ConstructorSpecialProfile<{
      new (value: string): { value: string };
      tag: "constructor";
    }>,
    [false, [value: string], { value: string }]
  >
>;
type _20e = Expect<
  Equal<ConstructorSpecialProfile<() => Date>, [false, never, never]>
>;
