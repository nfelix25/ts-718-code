import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-016: Generic methods and this
 * =============================================================================
 *
 * A generic class fixes its class parameters per instance, while a generic method
 * chooses fresh method parameters on every call. `Collection<T>.map<Result>`
 * reuses T for its callback input and independently infers Result for the new
 * collection. A key-selecting method can similarly introduce `K extends keyof T`.
 *
 * I read `map<Result>(fn: (value: T) => Result): Collection<Result>` aloud as:
 *
 *   "This instance already owns T; for this call, choose Result from the callback
 *    and return a different member of the Collection family."
 *
 * The special `this` type means the current subclass type, enabling fluent base
 * methods to preserve derived instances. An explicit fake `this` parameter in a
 * function or method is checked statically but erased from JavaScript and from
 * ordinary parameter tuples. Extracting a prototype method removes its receiver
 * at runtime unless it is bound, while an arrow-property method captures its
 * instance lexically.
 */

export class Collection<T> {
  constructor(readonly values: readonly T[]) {}

  map<Result>(transform: (value: T, index: number) => Result): Collection<Result> {
    return new Collection(this.values.map(transform));
  }

  tap(effect: (value: T) => void): this {
    this.values.forEach(effect);
    return this;
  }

  reduce<Result>(
    initial: Result,
    combine: (result: Result, value: T) => Result,
  ): Result {
    return this.values.reduce(combine, initial);
  }
}

export class Model<T extends object> {
  constructor(public value: T) {}

  get<Key extends keyof T>(key: Key): T[Key] {
    return this.value[key];
  }

  set<Key extends keyof T>(key: Key, value: T[Key]): this {
    this.value[key] = value;
    return this;
  }

  project<Keys extends keyof T>(...keys: Keys[]): Pick<T, Keys> {
    const result = {} as Pick<T, Keys>;
    for (const key of keys) result[key] = this.value[key];
    return result;
  }
}

export class FluentBase {
  protected labels: string[] = [];

  label(value: string): this {
    this.labels.push(value);
    return this;
  }

  allLabels(): string[] {
    return [...this.labels];
  }
}

export class SpecializedFluent extends FluentBase {
  enabled = false;

  enable(): this {
    this.enabled = true;
    return this;
  }
}

export function invokeWith<This, Args extends unknown[], Result>(
  fn: (this: This, ...args: Args) => Result,
  receiver: This,
  ...args: Args
): Result {
  return fn.apply(receiver, args);
}

// Part 1: Each generic method call selects its own Result.
const mainNumbers = new Collection([1, 2, 3]);
const mainStrings = mainNumbers.map(String);
const mainFlags = mainNumbers.map((value) => value > 1);
const mainObjects = mainNumbers.map((value) => ({ value }));
const mainLengths = mainStrings.map((value) => value.length);
type _Main01 = Expect<Equal<typeof mainStrings, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<typeof mainFlags, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<typeof mainObjects, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<typeof mainLengths, TODO>>; // TODO(koan) @koan-error

// Part 2: A method-local accumulator type is independent of element T.
const mainSum = mainNumbers.reduce(0, (total, value) => total + value);
const mainText = mainNumbers.reduce("", (text, value) => text + value);
const mainRecord = mainNumbers.reduce({ count: 0 }, (result) => ({ count: result.count + 1 }));
const mainExplicitReduce = mainNumbers.reduce<string[]>([], (result, value) => [...result, String(value)]);
type _Main05 = Expect<Equal<typeof mainSum, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<typeof mainText, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<typeof mainRecord, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<typeof mainExplicitReduce, TODO>>; // TODO(koan) @koan-error

// Part 3: Related method parameters can project the class-owned object T.
const mainModel = new Model({ id: 1, name: "Ada", active: true });
const mainId = mainModel.get("id");
const mainName = mainModel.get("name");
const mainActive = mainModel.get("active");
const mainProjection = mainModel.project("id", "active");
type _Main09 = Expect<Equal<typeof mainId, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<typeof mainName, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<typeof mainActive, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<typeof mainProjection, TODO>>; // TODO(koan) @koan-error

// Part 4: Polymorphic this preserves a subclass through inherited fluent calls.
const mainFluent = new SpecializedFluent();
const mainLabeled = mainFluent.label("ready");
const mainEnabled = mainFluent.label("ready").enable();
const mainChained = mainFluent.enable().label("done");
const mainTapped = mainNumbers.tap(() => {});
type _Main13 = Expect<Equal<typeof mainLabeled, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<typeof mainEnabled, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<typeof mainChained, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<typeof mainTapped, TODO>>; // TODO(koan) @koan-error

// Part 5: An explicit this parameter participates in inference but not runtime args.
function mainDescribe(this: { prefix: string }, value: number): string {
  return `${this.prefix}${value}`;
}
const mainInvoked = invokeWith(mainDescribe, { prefix: "#" }, 1);
const mainBound = mainDescribe.bind({ prefix: "#" });
type MainReceiver = ThisParameterType<typeof mainDescribe>;
type MainWithoutThis = OmitThisParameter<typeof mainDescribe>;
type _Main17 = Expect<Equal<typeof mainInvoked, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<typeof mainBound, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<MainReceiver, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<MainWithoutThis, TODO>>; // TODO(koan) @koan-error
