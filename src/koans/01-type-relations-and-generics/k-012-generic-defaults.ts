import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-012: Generic defaults
 * =============================================================================
 *
 * A generic default supplies a type argument only when no argument was selected
 * explicitly or by inference. It is not a value default and it is not a recovery
 * strategy for a candidate that violates a constraint. If inference finds a
 * candidate, that candidate wins even when the default would be more convenient.
 *
 * I read `<T = string>` aloud as:
 *
 *   "Choose T from explicit arguments or inference; only if neither chooses T,
 *    use string."
 *
 * Defaults make type parameters optional from right to left. A later default may
 * refer to an earlier parameter, which is useful for expressing a dependent
 * fallback such as `<Input = string, Output = Input>`. A constrained parameter's
 * default must itself satisfy the bound. Runtime omission still has ordinary
 * JavaScript behavior, so these helpers include `undefined` where values may be
 * absent even when their type arguments have defaults.
 */

export function optionalValue<T = string>(value?: T): T | undefined {
  return value;
}

export function defaultPair<First = string, Second = First>(
  first?: First,
  second?: Second,
): [First | undefined, Second | undefined] {
  return [first, second];
}

export function collectDefault<T = never>(...values: T[]): T[] {
  return values;
}

export function createRegistry<
  Key extends PropertyKey = string,
  Value = unknown,
>(): Map<Key, Value> {
  return new Map<Key, Value>();
}

export function constrainedOption<
  T extends { mode: string } = { mode: "standard" },
>(value?: T): T | undefined {
  return value;
}

// Part 1: Omission uses the default; an inference candidate replaces it.
const mainOmitted = optionalValue();
const mainNumber = optionalValue(1);
const mainBoolean = optionalValue(true);
const mainExplicit = optionalValue<Date>();
type _Main01 = Expect<Equal<typeof mainOmitted, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<typeof mainNumber, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<typeof mainBoolean, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<typeof mainExplicit, TODO>>; // TODO(koan) @koan-error

// Part 2: A later default may depend on an earlier selected parameter.
const mainPairDefault = defaultPair();
const mainPairFirst = defaultPair(1);
const mainPairBoth = defaultPair(1, "one");
const mainPairExplicit = defaultPair<boolean>();
type _Main05 = Expect<Equal<typeof mainPairDefault, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<typeof mainPairFirst, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<typeof mainPairBoth, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<typeof mainPairExplicit, TODO>>; // TODO(koan) @koan-error

// Part 3: A default can deliberately describe an empty generic result.
const mainEmpty = collectDefault();
const mainNumbers = collectDefault(1, 2, 3);
const mainStrings = collectDefault("a", "b");
const mainExplicitEmpty = collectDefault<unknown>();
type _Main09 = Expect<Equal<typeof mainEmpty, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<typeof mainNumbers, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<typeof mainStrings, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<typeof mainExplicitEmpty, TODO>>; // TODO(koan) @koan-error

// Part 4: Rightmost defaults permit partial explicit instantiation.
const mainRegistry = createRegistry();
const mainIdRegistry = createRegistry<"id">();
const mainCountRegistry = createRegistry<"id" | "count", number>();
const mainSymbolRegistry = createRegistry<symbol, boolean>();
type _Main13 = Expect<Equal<typeof mainRegistry, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<typeof mainIdRegistry, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<typeof mainCountRegistry, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<typeof mainSymbolRegistry, TODO>>; // TODO(koan) @koan-error

// Part 5: Defaults and constraints are checked independently of call inference.
const mainOptionDefault = constrainedOption();
const mainOptionBasic = constrainedOption({ mode: "custom" });
const mainOptionRich = constrainedOption({ mode: "custom", retries: 3 });
const mainOptionLiteral = constrainedOption({ mode: "custom", retries: 3 } as const);
type _Main17 = Expect<Equal<typeof mainOptionDefault, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<typeof mainOptionBasic, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<typeof mainOptionRich, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<typeof mainOptionLiteral, TODO>>; // TODO(koan) @koan-error
