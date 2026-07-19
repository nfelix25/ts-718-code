import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-007: Contextual and return-site inference
 * =============================================================================
 *
 * Inference is not limited to values flowing into ordinary parameters. A type
 * parameter can be discovered from an argument callback's returned expression,
 * and a call with no input candidate can sometimes use the expected type of the
 * call expression. I read these directions separately:
 *
 *   `produce(() => expression)` means "infer T from what expression returns."
 *   `const target: Wanted = create()` means "Wanted is context for output-only T."
 *
 * Context is evidence, not a cast. If an input already fixes an incompatible
 * type, the assignment fails rather than rewriting that type. Function return
 * expressions are also widening locations: an ordinary arrow returning a string
 * literal usually contributes `string`, while `as const` or an explicit literal
 * return annotation preserves the exact value.
 */

export function produce<T>(factory: () => T): T {
  return factory();
}

export function transform<Input, Output>(
  input: Input,
  mapper: (input: Input) => Output,
): Output {
  return mapper(input);
}

export function defer<T>(factory: () => T): () => T {
  return factory;
}

export function emptyList<T>(): T[] {
  return [];
}

export function outputOnly<T>(): T {
  return undefined as T;
}

export function promiseFrom<T>(factory: () => T): Promise<T> {
  return Promise.resolve(factory());
}

// Part 1: Callback return expressions contribute Output candidates.
const mainProducedString = produce(() => "made");
const mainProducedLiteral = produce(() => "made" as const);
const mainProducedObject = produce(() => ({ id: "a" }));
const mainProducedTuple = produce(() => ["ok", 200] as const);
type _Main01 = Expect<Equal<typeof mainProducedString, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<typeof mainProducedLiteral, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<typeof mainProducedObject, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<typeof mainProducedTuple, TODO>>; // TODO(koan) @koan-error

// Part 2: Input and callback output occupy independent inference slots.
const mainLength = transform("koan", (value) => value.length);
const mainRecord = transform(3, (value) => ({ doubled: value * 2 }));
const mainBoolean = transform({ active: true }, (value) => value.active);
const mainMappedLiteral = transform("x", () => "done" as const);
type _Main05 = Expect<Equal<typeof mainLength, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<typeof mainRecord, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<typeof mainBoolean, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<typeof mainMappedLiteral, TODO>>; // TODO(koan) @koan-error

// Part 3: An expected result can supply an otherwise missing type argument.
const mainContextualString: string = outputOnly();
const mainContextualObject: { id: string } = outputOnly();
const mainContextualList: number[] = emptyList();
const mainNoContext = outputOnly();
type _Main09 = Expect<Equal<typeof mainContextualString, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<typeof mainContextualObject, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<typeof mainContextualList, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<typeof mainNoContext, TODO>>; // TODO(koan) @koan-error

// Part 4: Context can flow through a returned function or promise wrapper.
const mainDeferred = defer(() => ({ ready: true }));
const mainDeferredLiteral = defer(() => "later" as const);
const mainContextualDeferred: () => string = defer(() => "later");
const mainPromise = promiseFrom(() => ({ count: 1 }));
type _Main13 = Expect<Equal<typeof mainDeferred, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<ReturnType<typeof mainDeferredLiteral>, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<typeof mainContextualDeferred, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<typeof mainPromise, TODO>>; // TODO(koan) @koan-error

// Part 5: Explicit callback returns and explicit type arguments set the view.
const mainAnnotatedFactory = produce((): "yes" | "no" => "yes");
const mainExplicitProduce = produce<string>(() => "exact");
const mainExplicitTransform = transform<number, string>(1, String);
const mainExplicitPromise = promiseFrom<readonly [1, 2]>(() => [1, 2]);
type _Main17 = Expect<Equal<typeof mainAnnotatedFactory, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<typeof mainExplicitProduce, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<typeof mainExplicitTransform, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<typeof mainExplicitPromise, TODO>>; // TODO(koan) @koan-error
