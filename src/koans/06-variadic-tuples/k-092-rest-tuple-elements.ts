import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-092: rest tuple elements
 * =============================================================================
 *
 * A rest element gives one region of a tuple variable cardinality. In
 * `[command: string, ...args: number[]]`, position zero remains `string`; every
 * later present position is `number`; and length widens to `number` because the
 * tail has no fixed upper bound.
 *
 * Rest regions may be trailing, leading, or in the middle when fixed positions
 * make the surrounding boundary meaningful. I read
 * `[first: string, ...middle: boolean[], last: number]` aloud as "one string,
 * zero or more booleans, then one number." A tuple may have only one rest
 * element. Function rest parameters use exactly this tuple model.
 */

export type CommandArgs = [command: string, ...args: string[]];
export type FramedNumbers = [prefix: string, ...values: number[], suffix: boolean];

export function summarize(label: string, ...values: number[]): [label: string, total: number, count: number] {
  return [label, values.reduce((total, value) => total + value, 0), values.length];
}

export function commandLine(...parts: CommandArgs): string {
  return parts.join(" ");
}

export function frameNumbers(tuple: FramedNumbers): string {
  const [prefix, ...rest] = tuple;
  const suffix = rest.pop() as boolean;
  return `${prefix}:${rest.join(",")}:${suffix ? "on" : "off"}`;
}

export function collect<const Values extends readonly unknown[]>(...values: Values): Values {
  return values;
}

// Part 1: a trailing rest preserves the fixed prefix and opens the tail.
type MainTrailing = [label: string, ...scores: number[]];
type _Main01 = Expect<Equal<MainTrailing[0], TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<MainTrailing[1], TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<MainTrailing[number], TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<MainTrailing["length"], TODO>>; // TODO(koan) @koan-error

// Part 2: rest regions can precede a fixed suffix or sit between fixed ends.
type MainLeading = [...names: string[], count: number];
type MainMiddle = [name: string, ...flags: boolean[], count: number];
type _Main05 = Expect<Equal<MainLeading[number], TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<MainLeading["length"], TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<MainMiddle[0], TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<MainMiddle[number], TODO>>; // TODO(koan) @koan-error

// Part 3: assignability checks the fixed positions and every rest member.
type _Main09 = Expect<Equal<["x"] extends MainTrailing ? true : false, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<["x", 1, 2] extends MainTrailing ? true : false, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<["x", "bad"] extends MainTrailing ? true : false, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<["x", true, false, 2] extends MainMiddle ? true : false, TODO>>; // TODO(koan) @koan-error

// Part 4: optional fixed positions may appear before a trailing rest.
type MainOptionalRest = [label?: string, ...codes: number[]];
type _Main13 = Expect<Equal<MainOptionalRest[0], TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<MainOptionalRest[number], TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<MainOptionalRest["length"], TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<[] extends MainOptionalRest ? true : false, TODO>>; // TODO(koan) @koan-error

// Part 5: function rest parameters are variadic tuple parameter lists.
type MainSummaryArgs = Parameters<typeof summarize>;
type _Main17 = Expect<Equal<MainSummaryArgs, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<MainSummaryArgs[number], TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<ReturnType<typeof collect<readonly ["a", 1, true]>>, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<Parameters<typeof commandLine>, TODO>>; // TODO(koan) @koan-error
