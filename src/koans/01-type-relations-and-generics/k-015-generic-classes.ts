import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-015: Generic classes
 * =============================================================================
 *
 * A generic class declaration describes a family of instance types. `Box<T>`
 * means that every instance operation using T agrees on one chosen element type.
 * Constructor arguments can infer that type, or callers can instantiate it
 * explicitly. The choice belongs to the instance, not to each method call.
 *
 * I read `class Box<T> { value: T }` aloud as:
 *
 *   "For each Box instance, choose one T and use it consistently wherever this
 *    instance surface mentions T."
 *
 * A method can introduce its own independent parameter, as `map<Result>` does.
 * The constructor value `typeof Box` lives on the static side and is itself able
 * to construct many different `Box<T>` instances. Static members cannot refer to
 * the instance's T because one runtime constructor is shared by every instance.
 * Generic arguments are erased at runtime; assignability between instantiations
 * follows their actual structural uses and TypeScript's variance rules.
 */

export class Box<T> {
  constructor(public value: T) {}

  get(): T {
    return this.value;
  }

  set(value: T): void {
    this.value = value;
  }

  map<Result>(transform: (value: T) => Result): Box<Result> {
    return new Box(transform(this.value));
  }

  static of<Value>(value: Value): Box<Value> {
    return new Box(value);
  }
}

export class Pair<Left, Right> {
  constructor(
    public left: Left,
    public right: Right,
  ) {}

  swap(): Pair<Right, Left> {
    return new Pair(this.right, this.left);
  }
}

export class Stack<T> {
  readonly #values: T[] = [];

  push(value: T): number {
    return this.#values.push(value);
  }

  pop(): T | undefined {
    return this.#values.pop();
  }

  toArray(): T[] {
    return [...this.#values];
  }
}

export class Registry<Key extends PropertyKey, Value = unknown> {
  readonly #values = new Map<Key, Value>();

  set(key: Key, value: Value): this {
    this.#values.set(key, value);
    return this;
  }

  get(key: Key): Value | undefined {
    return this.#values.get(key);
  }
}

// Part 1: Constructor inference selects one instance argument.
const mainNumberBox = new Box(1);
const mainStringBox = new Box("text");
const mainObjectBox = new Box({ id: 1 });
const mainExplicitBox = new Box<"a" | "b">("a");
type _Main01 = Expect<Equal<typeof mainNumberBox, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<typeof mainStringBox, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<typeof mainObjectBox, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<typeof mainExplicitBox, TODO>>; // TODO(koan) @koan-error

// Part 2: Instance methods reuse T; map chooses a new independent Result.
const mainNumber = mainNumberBox.get();
const mainMappedString = mainNumberBox.map(String);
const mainMappedObject = mainStringBox.map((value) => ({ value }));
const mainMappedBoolean = mainObjectBox.map((value) => value.id > 0);
type _Main05 = Expect<Equal<typeof mainNumber, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<typeof mainMappedString, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<typeof mainMappedObject, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<typeof mainMappedBoolean, TODO>>; // TODO(koan) @koan-error

// Part 3: Multiple class parameters retain their relationship across methods.
const mainPair = new Pair(1, "one");
const mainSwapped = mainPair.swap();
const mainLiteralPair = new Pair("left" as const, true as const);
const mainLiteralSwapped = mainLiteralPair.swap();
type _Main09 = Expect<Equal<typeof mainPair, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<typeof mainSwapped, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<typeof mainLiteralPair, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<typeof mainLiteralSwapped, TODO>>; // TODO(koan) @koan-error

// Part 4: Explicit instance arguments are useful before a collection has values.
const mainStack = new Stack<number>();
const mainEmptyPop = mainStack.pop();
mainStack.push(1);
const mainArray = mainStack.toArray();
const mainStringStack = new Stack<string>();
type _Main13 = Expect<Equal<typeof mainStack, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<typeof mainEmptyPop, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<typeof mainArray, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<typeof mainStringStack, TODO>>; // TODO(koan) @koan-error

// Part 5: Class constraints and defaults govern instance families.
const mainRegistry = new Registry<string>();
const mainCountRegistry = new Registry<"count", number>();
const mainSymbolRegistry = new Registry<symbol, boolean>();
const mainStaticBox = Box.of({ ready: true });
type _Main17 = Expect<Equal<typeof mainRegistry, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<typeof mainCountRegistry, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<typeof mainSymbolRegistry, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<typeof mainStaticBox, TODO>>; // TODO(koan) @koan-error
