import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 131 - TYPE-LEVEL BOOLEAN LOGIC
 * ========================================
 *
 * Conditional types form a Boolean algebra. A naked Boolean parameter distributes,
 * so `boolean` means both truth-table rows are possible. Tuple wrapping asks whether
 * a value is guaranteed to be one exact Boolean instead.
 *
 * Read `And<A, B>` aloud as: "for every possible A, only inspect B when A is true;
 * for every possible B there, return true only for true." `AllTrue` uses the identity
 * true for an empty tuple; `AnyTrue` uses false. Their checks deliberately distinguish
 * guaranteed truth from a flag union that merely could contain true.
 */

export type Not<Value extends boolean> = Value extends true ? false : true;
export type And<Left extends boolean, Right extends boolean> =
  Left extends true ? (Right extends true ? true : false) : false;
export type Or<Left extends boolean, Right extends boolean> =
  Left extends true ? true : Right extends true ? true : false;
export type Xor<Left extends boolean, Right extends boolean> =
  Left extends true ? Not<Right> : Right;
export type Implies<Left extends boolean, Right extends boolean> = Or<Not<Left>, Right>;
export type If<Condition extends boolean, Then, Else> = Condition extends true ? Then : Else;

export type AllTrue<Flags extends readonly boolean[]> =
  number extends Flags["length"]
    ? boolean
    : Flags extends readonly [infer Head extends boolean, ...infer Tail extends boolean[]]
    ? [Head] extends [true]
      ? AllTrue<Tail>
      : false
    : true;

export type AnyTrue<Flags extends readonly boolean[]> =
  number extends Flags["length"]
    ? boolean
    : Flags extends readonly [infer Head extends boolean, ...infer Tail extends boolean[]]
    ? true extends Head
      ? true
      : AnyTrue<Tail>
    : false;

// Part 1: Negation maps each Boolean possibility.
type _01 = Expect<Equal<Not<true>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Not<false>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Not<boolean>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Not<Not<true>>, TODO>>; // TODO(koan) @koan-error

// Part 2: Binary operators encode their truth tables.
type _05 = Expect<Equal<And<true, true>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<And<true, false>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Or<false, true>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Xor<true, false>, TODO>>; // TODO(koan) @koan-error

// Part 3: Broad boolean distributes through possible rows.
type _09 = Expect<Equal<And<boolean, true>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<And<boolean, false>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Or<boolean, false>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<If<boolean, "yes", "no">, TODO>>; // TODO(koan) @koan-error

// Part 4: Fold tuples with explicit empty identities.
type _13 = Expect<Equal<AllTrue<[]>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<AllTrue<[true, true, true]>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<AllTrue<[true, false, true]>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<AnyTrue<[false, false, true]>, TODO>>; // TODO(koan) @koan-error

// Part 5: Logic composes into policies.
type CanPublish<Authenticated extends boolean, Valid extends boolean> = And<Authenticated, Valid>;
type _17 = Expect<Equal<Implies<true, false>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Implies<false, false>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<CanPublish<true, true>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<If<CanPublish<true, false>, "publish", "reject">, TODO>>; // TODO(koan) @koan-error

export function choose<const Condition extends boolean, Then, Else>(
  condition: Condition,
  whenTrue: Then,
  whenFalse: Else,
): If<Condition, Then, Else> {
  return (condition ? whenTrue : whenFalse) as If<Condition, Then, Else>;
}

export function allTrue<const Flags extends readonly boolean[]>(flags: Flags): AllTrue<Flags> {
  return flags.every(Boolean) as AllTrue<Flags>;
}

export function anyTrue<const Flags extends readonly boolean[]>(flags: Flags): AnyTrue<Flags> {
  return flags.some(Boolean) as AnyTrue<Flags>;
}
