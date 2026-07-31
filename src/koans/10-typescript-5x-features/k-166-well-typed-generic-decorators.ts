import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 166 - WELL-TYPED GENERIC DECORATORS
 * =========================================
 *
 * A reusable method decorator must preserve three correlated pieces: the
 * receiver, the entire argument tuple, and the result. For ordinary methods,
 * `<This, Args, Result>` exposes those pieces and lets a wrapper forward them
 * without `any` at its public boundary.
 *
 * A method can itself be generic or overloaded. Extracting `Parameters` and
 * `ReturnType` from such a method loses relationships between each call's input
 * and output. To preserve those higher-rank relationships, capture the complete
 * callable as `Method` and return that same `Method`. A runtime wrapper then
 * needs a narrow assertion: TypeScript cannot prove that one implementation
 * reconstructed from `Parameters<Method>` implements every generic/overloaded
 * signature.
 *
 * Read the identity-preserving form aloud as: "for this receiver and this exact
 * callable type, accept and return that exact callable type."
 *
 * Feature ownership: TypeScript's generic standard-decorator signatures and
 * standard ECMAScript decorator replacement semantics.
 *
 * Official sources:
 * - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html
 * - https://github.com/tc39/proposal-decorators
 */

export type TypedMethod<
  This,
  Args extends readonly unknown[],
  Result,
> = (this: This, ...args: Args) => Result;

export type TypedMethodDecorator<
  This,
  Args extends readonly unknown[],
  Result,
> = (
  original: TypedMethod<This, Args, Result>,
  context: ClassMethodDecoratorContext<
    This,
    TypedMethod<This, Args, Result>
  >,
) => TypedMethod<This, Args, Result> | void;

export type ExactCallableDecorator<
  This,
  Method extends (this: This, ...args: any[]) => any,
> = (
  original: Method,
  context: ClassMethodDecoratorContext<This, Method>,
) => Method | void;

export type MethodParts<Method> =
  Method extends (this: infer This, ...args: infer Args) => infer Result
    ? { this: This; args: Args; result: Result }
    : never;

export type DecoratedValue<Decorator> =
  Decorator extends (value: infer Value, ...rest: any[]) => any
    ? Value
    : never;

export function auditMethod(log: string[], label: string) {
  return function <This, Args extends readonly unknown[], Result>(
    original: TypedMethod<This, Args, Result>,
    context: ClassMethodDecoratorContext<
      This,
      TypedMethod<This, Args, Result>
    >,
  ): TypedMethod<This, Args, Result> {
    return function (this: This, ...args: Args): Result {
      log.push(`${label}:${String(context.name)}:${JSON.stringify(args)}`);
      return original.call(this, ...args);
    };
  };
}

export function auditExactCallable(log: string[], label: string) {
  return function <
    This,
    Method extends (this: This, ...args: any[]) => any,
  >(
    original: Method,
    context: ClassMethodDecoratorContext<This, Method>,
  ): Method {
    const wrapped = function (
      this: This,
      ...args: Parameters<Method>
    ): ReturnType<Method> {
      log.push(`${label}:${String(context.name)}:${JSON.stringify(args)}`);
      return original.apply(this, args);
    };

    return wrapped as Method;
  };
}

export function requireNonEmptyFirst(log: string[]) {
  return function <
    This,
    Rest extends readonly unknown[],
    Result,
  >(
    original: TypedMethod<This, [first: string, ...rest: Rest], Result>,
    context: ClassMethodDecoratorContext<
      This,
      TypedMethod<This, [first: string, ...rest: Rest], Result>
    >,
  ): TypedMethod<This, [first: string, ...rest: Rest], Result> {
    return function (this: This, first: string, ...rest: Rest): Result {
      if (first.trim().length === 0) {
        throw new TypeError(`${String(context.name)} requires non-empty text`);
      }
      log.push(`validated:${String(context.name)}`);
      return original.call(this, first, ...rest);
    };
  };
}

export function createGenericService(log: string[]) {
  class Service {
    constructor(readonly prefix: string) {}

    @auditMethod(log, "call")
    format(value: number, suffix = "!"): string {
      return `${this.prefix}${value}${suffix}`;
    }

    @auditExactCallable(log, "generic")
    identity<Value>(value: Value): Value {
      return value;
    }

    @auditMethod(log, "async")
    async increment(value: number): Promise<number> {
      return value + 1;
    }

    @requireNonEmptyFirst(log)
    greet(name: string, punctuation: "!" | "?" = "!"): string {
      return `${this.prefix}${name}${punctuation}`;
    }
  }

  return Service;
}

export function createAuditedBox<Value>(
  initialValue: Value,
  log: string[],
) {
  class Box {
    value = initialValue;

    @auditMethod(log, "box")
    set(nextValue: Value): Value {
      this.value = nextValue;
      return this.value;
    }
  }

  return Box;
}

type Receiver = { prefix: string };
type Format = TypedMethod<
  Receiver,
  [value: number, suffix?: string],
  string
>;
type FormatDecorator = TypedMethodDecorator<
  Receiver,
  [value: number, suffix?: string],
  string
>;

// Part 1: The three generic axes stay correlated in one method contract.
type _01 = Expect<Equal<MethodParts<Format>["this"], TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<MethodParts<Format>["args"], TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<MethodParts<Format>["result"], TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Parameters<FormatDecorator>[0], TODO>>; // TODO(koan) @koan-error

// Part 2: The specialized context contains that exact callable.
type FormatContext = Parameters<FormatDecorator>[1];
type _05 = Expect<Equal<FormatContext["kind"], TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<ReturnType<FormatContext["access"]["get"]>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Parameters<FormatContext["access"]["has"]>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<ReturnType<FormatDecorator>, TODO>>; // TODO(koan) @koan-error

// Part 3: Exact-callable capture preserves generic method identity.
type Identity = <Value>(value: Value) => Value;
type IdentityDecorator = ExactCallableDecorator<Receiver, Identity>;
type _09 = Expect<Equal<DecoratedValue<IdentityDecorator>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<ReturnType<IdentityDecorator>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Parameters<Identity>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<ReturnType<Identity>, TODO>>; // TODO(koan) @koan-error

// Part 4: Factories infer method specifics at the decoration site.
type _13 = Expect<Equal<Parameters<typeof auditMethod>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<ReturnType<typeof auditMethod>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Parameters<typeof auditExactCallable>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<ReturnType<typeof requireNonEmptyFirst>, TODO>>; // TODO(koan) @koan-error

// Part 5: Generic wrappers retain each decorated class contract.
type Service = InstanceType<ReturnType<typeof createGenericService>>;
type StringBox = InstanceType<ReturnType<typeof createAuditedBox<string>>>;
declare const service: Service;
type _17 = Expect<Equal<Parameters<Service["format"]>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<ReturnType<Service["increment"]>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<ReturnType<typeof service.identity<"literal">>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Parameters<StringBox["set"]>, TODO>>; // TODO(koan) @koan-error
