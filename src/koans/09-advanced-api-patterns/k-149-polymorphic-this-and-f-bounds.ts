import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 149 - POLYMORPHIC THIS AND F-BOUNDS
 * ==========================================
 *
 * A method returning `this` promises the receiver's most-derived type, not merely
 * the class that declared the method. That makes inherited fluent methods retain
 * subclass capabilities. An F-bound makes the self type explicit:
 * `Self extends Comparable<Self>` relates multiple parameters and return values
 * to one recursively constrained identity.
 *
 * Read `label(...): this` as: "return the exact receiver type." Read
 * `Self extends Comparable<Self>` as: "choose a Self that knows how to compare
 * itself with another Self." Polymorphic this is ergonomic for receiver-local
 * chains; F-bounds are useful when self identity must flow through generic APIs.
 */

export class Fluent {
  readonly labels: string[] = [];

  label(value: string): this {
    this.labels.push(value);
    return this;
  }

  tap(effect: (value: this) => void): this {
    effect(this);
    return this;
  }
}

export class Command extends Fluent {
  readonly flags: string[] = [];

  flag(value: string): this {
    this.flags.push(value);
    return this;
  }
}

export class DeployCommand extends Command {
  environment = "development";

  to(environment: string): this {
    this.environment = environment;
    return this;
  }
}

export interface Comparable<Self> {
  compare: (other: Self) => number;
}

export abstract class Entity<Self extends Entity<Self>> {
  abstract copy(): Self;

  prefer(other: Self): Self {
    return other;
  }
}

export class Version extends Entity<Version> implements Comparable<Version> {
  constructor(readonly value: number) { super(); }
  copy(): Version { return new Version(this.value); }
  compare = (other: Version): number => this.value - other.value;
}

export class Priority implements Comparable<Priority> {
  constructor(readonly value: number) {}
  compare = (other: Priority): number => this.value - other.value;
}

export type SatisfiesSelf<Value> = [Value] extends [Comparable<Value>] ? true : false;

// Part 1: A base method's `this` return specializes at the receiver.
type _01 = Expect<Equal<ReturnType<Fluent["label"]>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<ReturnType<Command["label"]>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<ReturnType<DeployCommand["label"]>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<ReturnType<DeployCommand["to"]>, TODO>>; // TODO(koan) @koan-error

// Part 2: Chains preserve every most-derived capability.
type _05 = Expect<Equal<ReturnType<Command["flag"]>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<ReturnType<DeployCommand["flag"]>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Parameters<DeployCommand["tap"]>[0], TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<ThisParameterType<DeployCommand["label"]>, TODO>>; // TODO(koan) @koan-error

// Part 3: An explicit self parameter connects multiple values.
type _09 = Expect<Equal<SatisfiesSelf<Version>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<SatisfiesSelf<Priority>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Parameters<Version["compare"]>[0], TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<ReturnType<Version["copy"]>, TODO>>; // TODO(koan) @koan-error

// Part 4: Generic algorithms preserve the chosen self identity.
type _13 = Expect<Equal<ReturnType<typeof maxSelf<Version>>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Parameters<typeof maxSelf<Priority>>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<ReturnType<typeof cloneSelf<Version>>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Parameters<Version["prefer"]>[0], TODO>>; // TODO(koan) @koan-error

// Part 5: Structural compatibility and escape types still shape self constraints.
type StructuralVersion = { value: number; compare: (other: StructuralVersion) => number };
type _17 = Expect<Equal<SatisfiesSelf<StructuralVersion>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<SatisfiesSelf<{ compare: (other: Version) => number }>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<SatisfiesSelf<never>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<SatisfiesSelf<unknown>, TODO>>; // TODO(koan) @koan-error

export function maxSelf<Self extends Comparable<Self>>(left: Self, right: Self): Self {
  return left.compare(right) >= 0 ? left : right;
}

export function cloneSelf<Self extends Entity<Self>>(value: Self): Self {
  return value.copy();
}
