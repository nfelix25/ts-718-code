import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 163 - FIELD DECORATORS
 * ============================
 *
 * A standard field decorator receives `undefined`, because a field has no
 * prototype value to replace at class-definition time. It may return an
 * initializer that runs for each instance (or once for a static field), receives
 * the original initial value, and returns the value that will be stored.
 *
 * The context access object can test, read, and write the field even when it is
 * private. `addInitializer` schedules additional work in the field lifecycle.
 * None of these runtime transformations rewrite the declared property type.
 *
 * Feature ownership: standard ECMAScript field decorator semantics and
 * TypeScript's ClassFieldDecoratorContext/initializer checking.
 *
 * Official sources:
 * - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html
 * - https://github.com/tc39/proposal-decorators
 */

export type FieldInitializer<This, Value> =
  (this: This, initialValue: Value) => Value;

export type FieldDecorator<This, Value> = (
  value: undefined,
  context: ClassFieldDecoratorContext<This, Value>,
) => FieldInitializer<This, Value> | void;

export type FieldReplacement<Decorator> =
  Decorator extends (...args: any[]) => infer Result
    ? Exclude<Result, void>
    : never;

export function multiplyBy(factor: number) {
  return function <This>(
    _value: undefined,
    _context: ClassFieldDecoratorContext<This, number>,
  ): FieldInitializer<This, number> {
    return function (initialValue) {
      return initialValue * factor;
    };
  };
}

export function trimField<This>(
  _value: undefined,
  _context: ClassFieldDecoratorContext<This, string>,
): FieldInitializer<This, string> {
  return function (initialValue) {
    return initialValue.trim();
  };
}

export function recordField(log: string[]) {
  return function <This, Value>(
    _value: undefined,
    context: ClassFieldDecoratorContext<This, Value>,
  ): void {
    log.push(`decorate:${String(context.name)}:${context.static}:${context.private}`);
    context.addInitializer(function () {
      log.push(`initialize:${String(context.name)}:${String(context.access.get(this))}`);
    });
  };
}

export function createDecoratedRecord(log: string[]) {
  class Record {
    @multiplyBy(2)
    score = 5;

    @trimField
    name = "  Ada  ";

    @recordField(log)
    status = "ready";

    @recordField(log)
    static category = "record";

    @recordField(log)
    #secret = 42;

    readSecret(): number {
      return this.#secret;
    }
  }

  return Record;
}

type Receiver = { count: number };
type CountDecorator = FieldDecorator<Receiver, number>;
type CountContext = ClassFieldDecoratorContext<Receiver, number>;

// Part 1: Field decorators receive undefined and a specialized context.
type _01 = Expect<Equal<Parameters<CountDecorator>[0], TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Parameters<CountDecorator>[1], TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<CountContext["kind"], TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<CountContext["name"], TODO>>; // TODO(koan) @koan-error

// Part 2: The returned initializer preserves the field value type.
type _05 = Expect<Equal<ReturnType<CountDecorator>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<FieldReplacement<CountDecorator>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Parameters<FieldReplacement<CountDecorator>>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<ThisParameterType<FieldReplacement<CountDecorator>>, TODO>>; // TODO(koan) @koan-error

// Part 3: Field access supports has, get, and set.
type _09 = Expect<Equal<keyof CountContext["access"], TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Parameters<CountContext["access"]["get"]>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<ReturnType<CountContext["access"]["get"]>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Parameters<CountContext["access"]["set"]>, TODO>>; // TODO(koan) @koan-error

// Part 4: Factories specialize field types without exposing runtime machinery.
type _13 = Expect<Equal<Parameters<typeof multiplyBy>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<ReturnType<typeof multiplyBy>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Parameters<typeof trimField>[0], TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<ReturnType<typeof recordField>, TODO>>; // TODO(koan) @koan-error

// Part 5: Decorated fields retain their declared public types.
type RecordClass = ReturnType<typeof createDecoratedRecord>;
type RecordInstance = InstanceType<RecordClass>;
type _17 = Expect<Equal<RecordInstance["score"], TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<RecordInstance["name"], TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<RecordClass["category"], TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<keyof RecordInstance, TODO>>; // TODO(koan) @koan-error
