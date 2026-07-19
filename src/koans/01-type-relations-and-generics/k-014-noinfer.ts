import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-014: NoInfer
 * =============================================================================
 *
 * `NoInfer<T>` marks a use of T as a checking site but not an inference source.
 * The wrapped value must still be assignable to the T selected elsewhere. This
 * lets an API declare which argument is authoritative when several positions
 * could otherwise contribute candidates and silently widen the result.
 *
 * I read `(fallback: NoInfer<T>)` aloud as:
 *
 *   "Choose T without using fallback, then check fallback against that T."
 *
 * `NoInfer` does not freeze, narrow, brand, or transform T. Once T is chosen,
 * `NoInfer<T>` behaves as T. If every occurrence is blocked, inference must use
 * context, a default, a constraint fallback, or `unknown`. Explicit type
 * arguments also choose T before the wrapped site is checked. The pattern is
 * particularly useful for defaults, initial states, fallback values, and any
 * parameter that should validate against a domain defined elsewhere.
 */

export function looseDefault<Choice extends string>(
  choices: readonly Choice[],
  fallback: Choice,
): Choice {
  return choices.includes(fallback) ? fallback : choices[0]!;
}

export function checkedDefault<Choice extends string>(
  choices: readonly Choice[],
  fallback: NoInfer<Choice>,
): Choice {
  return choices.includes(fallback) ? fallback : choices[0]!;
}

export function preferPrimary<T>(primary: T, fallback: NoInfer<T>): T {
  return primary ?? fallback;
}

export function mapWithFallback<Input, Output>(
  value: Input,
  map: (value: Input) => Output,
  fallback: NoInfer<Output>,
): Output {
  try {
    return map(value);
  } catch {
    return fallback;
  }
}

export function createMachine<State extends string>(config: {
  states: readonly State[];
  initial: NoInfer<State>;
}): State {
  return config.initial;
}

// Part 1: An ordinary second argument can widen the inferred domain.
const mainLoose = looseDefault(["red", "yellow", "green"] as const, "blue");
const mainLooseMember = looseDefault(["red", "yellow", "green"] as const, "red");
const mainLoosePair = looseDefault(["on"] as const, "off");
const mainLooseBroad = looseDefault(["a", "b"], "c");
type _Main01 = Expect<Equal<typeof mainLoose, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<typeof mainLooseMember, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<typeof mainLoosePair, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<typeof mainLooseBroad, TODO>>; // TODO(koan) @koan-error

// Part 2: NoInfer makes the first position authoritative.
const mainChecked = checkedDefault(["red", "yellow", "green"] as const, "red");
const mainCheckedOther = checkedDefault(["red", "yellow", "green"] as const, "green");
const mainCheckedPair = checkedDefault(["on", "off"] as const, "off");
const mainCheckedBroad = checkedDefault(["a", "b"] as string[], "c");
type _Main05 = Expect<Equal<typeof mainChecked, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<typeof mainCheckedOther, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<typeof mainCheckedPair, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<typeof mainCheckedBroad, TODO>>; // TODO(koan) @koan-error

// Part 3: A primary value selects T and the fallback is checked afterward.
const mainNumber = preferPrimary(1 as number, 2);
const mainString = preferPrimary("a" as string, "b");
const mainObject = preferPrimary({ id: 1 }, { id: 2 });
const mainExplicit = preferPrimary<string>("a", "b");
type _Main09 = Expect<Equal<typeof mainNumber, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<typeof mainString, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<typeof mainObject, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<typeof mainExplicit, TODO>>; // TODO(koan) @koan-error

// Part 4: Callback output can own Output while fallback only validates it.
const mainMappedNumber = mapWithFallback("42", Number, 0);
const mainMappedString = mapWithFallback(42, String, "unknown");
const mainMappedObject = mapWithFallback(1, (value) => ({ value }), { value: 0 });
const mainMappedLiteral = mapWithFallback(1, () => "ok" as const, "ok");
type _Main13 = Expect<Equal<typeof mainMappedNumber, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<typeof mainMappedString, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<typeof mainMappedObject, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<typeof mainMappedLiteral, TODO>>; // TODO(koan) @koan-error

// Part 5: A state list defines the domain and initial merely selects within it.
const mainMachine = createMachine({ states: ["idle", "running"] as const, initial: "idle" });
const mainTraffic = createMachine({ states: ["red", "yellow", "green"] as const, initial: "green" });
const machineStates: Array<"open" | "closed"> = ["open", "closed"];
const mainVariableMachine = createMachine({ states: machineStates, initial: "open" });
const mainExplicitMachine = createMachine<"a" | "b">({ states: ["a"], initial: "b" });
type _Main17 = Expect<Equal<typeof mainMachine, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<typeof mainTraffic, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<typeof mainVariableMachine, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<typeof mainExplicitMachine, TODO>>; // TODO(koan) @koan-error
