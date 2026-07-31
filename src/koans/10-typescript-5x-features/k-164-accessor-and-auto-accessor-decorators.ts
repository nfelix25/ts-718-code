import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 164 - ACCESSOR AND AUTO-ACCESSOR DECORATORS
 * =================================================
 *
 * An ordinary getter or setter decorator receives one function and may replace
 * that function. An `accessor` declaration is different: JavaScript creates a
 * hidden backing slot plus a getter/setter pair, and its decorator receives that
 * pair as `{ get, set }`. It may return any combination of replacement `get`,
 * replacement `set`, and an `init` transform for the initial backing value.
 *
 * Read the auto-accessor result aloud as: "optionally replace reads, optionally
 * replace writes, and optionally map the value used during initialization."
 * `init` does not handle later assignments; a returned `set` does.
 *
 * The target functions use `this` and operate on one receiver. The context
 * `access` functions instead receive the object explicitly. Both reach the
 * element, but they serve different composition and initialization jobs.
 *
 * Feature ownership: standard ECMAScript accessor/auto-accessor decorator
 * semantics and TypeScript's accessor context, target, and result contracts.
 *
 * Official sources:
 * - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-0.html
 * - https://github.com/tc39/proposal-decorators
 */

export type GetterDecorator<This, Value> = (
  value: (this: This) => Value,
  context: ClassGetterDecoratorContext<This, Value>,
) => ((this: This) => Value) | void;

export type SetterDecorator<This, Value> = (
  value: (this: This, value: Value) => void,
  context: ClassSetterDecoratorContext<This, Value>,
) => ((this: This, value: Value) => void) | void;

export type AutoAccessorDecorator<This, Value> = (
  target: ClassAccessorDecoratorTarget<This, Value>,
  context: ClassAccessorDecoratorContext<This, Value>,
) => ClassAccessorDecoratorResult<This, Value> | void;

export type DecoratorReplacement<Decorator> =
  Decorator extends (...args: any[]) => infer Result
    ? Exclude<Result, void>
    : never;

export function trimmedGetter<This>(
  value: (this: This) => string,
  _context: ClassGetterDecoratorContext<This, string>,
): (this: This) => string {
  return function () {
    return value.call(this).trim();
  };
}

export function normalizedSetter<This>(
  value: (this: This, next: string) => void,
  _context: ClassSetterDecoratorContext<This, string>,
): (this: This, next: string) => void {
  return function (next) {
    value.call(this, next.trim());
  };
}

export function bounded(minimum: number, maximum: number) {
  return function <This>(
    target: ClassAccessorDecoratorTarget<This, number>,
    _context: ClassAccessorDecoratorContext<This, number>,
  ): ClassAccessorDecoratorResult<This, number> {
    const clamp = (value: number) =>
      Math.min(maximum, Math.max(minimum, value));

    return {
      init(initialValue) {
        return clamp(initialValue);
      },
      get() {
        return target.get.call(this);
      },
      set(nextValue) {
        target.set.call(this, clamp(nextValue));
      },
    };
  };
}

export function observeAccessor(log: string[]) {
  return function <This, Value>(
    target: ClassAccessorDecoratorTarget<This, Value>,
    context: ClassAccessorDecoratorContext<This, Value>,
  ): ClassAccessorDecoratorResult<This, Value> {
    const name = String(context.name);
    log.push(`decorate:${name}:${context.static}:${context.private}`);

    return {
      init(initialValue) {
        log.push(`init:${name}:${String(initialValue)}`);
        return initialValue;
      },
      get() {
        const current = target.get.call(this);
        log.push(`get:${name}:${String(current)}`);
        return current;
      },
      set(nextValue) {
        log.push(`set:${name}:${String(nextValue)}`);
        target.set.call(this, nextValue);
      },
    };
  };
}

export function createDecoratedGauge(log: string[]) {
  class Gauge {
    #label = "  READY  ";

    @trimmedGetter
    get label(): string {
      return this.#label;
    }

    @normalizedSetter
    set label(next: string) {
      this.#label = next;
    }

    @bounded(0, 100)
    accessor percent = 150;

    @observeAccessor(log)
    accessor enabled = true;

    readRawLabel(): string {
      return this.#label;
    }
  }

  return Gauge;
}

type Receiver = { value: number };
type NumberGetterDecorator = GetterDecorator<Receiver, number>;
type NumberSetterDecorator = SetterDecorator<Receiver, number>;
type NumberAccessorDecorator = AutoAccessorDecorator<Receiver, number>;
type AccessorContext = ClassAccessorDecoratorContext<Receiver, number>;

// Part 1: Getter and setter decorators receive different callable values.
type _01 = Expect<Equal<Parameters<NumberGetterDecorator>[0], TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Parameters<NumberSetterDecorator>[0], TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Parameters<NumberGetterDecorator>[1]["kind"], TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Parameters<NumberSetterDecorator>[1]["kind"], TODO>>; // TODO(koan) @koan-error

// Part 2: Their replacement functions preserve the respective contracts.
type _05 = Expect<Equal<DecoratorReplacement<NumberGetterDecorator>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<ReturnType<DecoratorReplacement<NumberGetterDecorator>>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<DecoratorReplacement<NumberSetterDecorator>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Parameters<DecoratorReplacement<NumberSetterDecorator>>, TODO>>; // TODO(koan) @koan-error

// Part 3: An auto-accessor target and result describe the complete pair.
type _09 = Expect<Equal<Parameters<NumberAccessorDecorator>[0], TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<keyof Parameters<NumberAccessorDecorator>[0], TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<keyof DecoratorReplacement<NumberAccessorDecorator>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Parameters<NonNullable<DecoratorReplacement<NumberAccessorDecorator>["init"]>>, TODO>>; // TODO(koan) @koan-error

// Part 4: Context access is object-oriented rather than this-oriented.
type _13 = Expect<Equal<AccessorContext["kind"], TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<keyof AccessorContext["access"], TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Parameters<AccessorContext["access"]["get"]>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Parameters<AccessorContext["access"]["set"]>, TODO>>; // TODO(koan) @koan-error

// Part 5: Decoration changes behavior, not the class's declared surface.
type GaugeClass = ReturnType<typeof createDecoratedGauge>;
type Gauge = InstanceType<GaugeClass>;
type _17 = Expect<Equal<Gauge["label"], TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Gauge["percent"], TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Gauge["enabled"], TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<keyof Gauge, TODO>>; // TODO(koan) @koan-error
