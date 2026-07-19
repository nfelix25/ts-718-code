import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-095: last and init
 * =============================================================================
 *
 * Right-side tuple patterns reverse the previous decomposition:
 * `T extends readonly [...infer Init, infer Last]`. The pattern asks whether T
 * guarantees a final position. If so, `Last` captures it and `Init` captures
 * every earlier position.
 *
 * A fixed suffix after a leading or middle rest is guaranteed and therefore
 * decomposable. A plain array or trailing-rest tuple has no fixed final
 * position: it might be empty at the open end, so it does not match this
 * pattern. An optional final position is also possible rather than guaranteed.
 * As with Tail, inferred Init is a fresh mutable tuple shape.
 */

export type Last<Value extends readonly unknown[]> =
  Value extends readonly [...unknown[], infer Final] ? Final : never;

export type Init<Value extends readonly unknown[]> =
  Value extends readonly [...infer Beginning, unknown] ? Beginning : never;

export type ReadonlyInit<Value extends readonly unknown[]> = Readonly<Init<Value>>;

export function last<Final, const Beginning extends readonly unknown[]>(
  values: readonly [...Beginning, Final],
): Final {
  return values[values.length - 1] as Final;
}

export function dropLast<Final, const Beginning extends readonly unknown[]>(
  values: readonly [...Beginning, Final],
): [...Beginning] {
  return values.slice(0, -1) as [...Beginning];
}

export function popTuple<Final, const Beginning extends readonly unknown[]>(
  values: readonly [...Beginning, Final],
): [init: [...Beginning], last: Final] {
  return [values.slice(0, -1) as [...Beginning], values[values.length - 1] as Final];
}

export function lastOrUndefined<Value>(values: readonly Value[]): Value | undefined {
  return values.at(-1);
}

// Part 1: Last extracts the guaranteed final position.
type _Main01 = Expect<Equal<Last<[1]>, TODO>>; // TODO(koan) @koan-error
type _Main02 = Expect<Equal<Last<[1, 2, 3]>, TODO>>; // TODO(koan) @koan-error
type _Main03 = Expect<Equal<Last<readonly ["x", true]>, TODO>>; // TODO(koan) @koan-error
type _Main04 = Expect<Equal<Last<[]>, TODO>>; // TODO(koan) @koan-error

// Part 2: Init preserves every preceding finite position.
type _Main05 = Expect<Equal<Init<[1]>, TODO>>; // TODO(koan) @koan-error
type _Main06 = Expect<Equal<Init<[1, 2, 3]>, TODO>>; // TODO(koan) @koan-error
type _Main07 = Expect<Equal<Init<readonly ["x", true, 3]>, TODO>>; // TODO(koan) @koan-error
type _Main08 = Expect<Equal<ReadonlyInit<readonly ["x", true, 3]>, TODO>>; // TODO(koan) @koan-error

// Part 3: arrays, trailing rests, and optional suffixes lack a fixed last value.
type _Main09 = Expect<Equal<Last<string[]>, TODO>>; // TODO(koan) @koan-error
type _Main10 = Expect<Equal<Init<[string, ...number[]]>, TODO>>; // TODO(koan) @koan-error
type _Main11 = Expect<Equal<Last<[value?: string]>, TODO>>; // TODO(koan) @koan-error
type _Main12 = Expect<Equal<Init<[head: string, value?: number]>, TODO>>; // TODO(koan) @koan-error

// Part 4: fixed suffixes after open regions satisfy the pattern.
type _Main13 = Expect<Equal<Last<[...names: string[], count: number]>, TODO>>; // TODO(koan) @koan-error
type _Main14 = Expect<Equal<Init<[...names: string[], count: number]>, TODO>>; // TODO(koan) @koan-error
type _Main15 = Expect<Equal<Last<[flag: boolean, ...names: string[], count: number]>, TODO>>; // TODO(koan) @koan-error
type _Main16 = Expect<Equal<Init<[flag: boolean, ...names: string[], count: number]>, TODO>>; // TODO(koan) @koan-error

// Part 5: union branches decompose independently from the right.
type _Main17 = Expect<Equal<Last<[] | [1] | [2, 3]>, TODO>>; // TODO(koan) @koan-error
type _Main18 = Expect<Equal<Init<[] | [1] | [2, 3]>, TODO>>; // TODO(koan) @koan-error
type _Main19 = Expect<Equal<ReturnType<typeof last<true, readonly ["a", 1]>>, TODO>>; // TODO(koan) @koan-error
type _Main20 = Expect<Equal<ReturnType<typeof dropLast<true, readonly ["a", 1]>>, TODO>>; // TODO(koan) @koan-error
