import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 138 - BRANDED TYPES
 * =========================
 *
 * Structural typing intentionally treats equal shapes as interchangeable. Some
 * domains need a proof that two equal runtime representations mean different
 * things: a user id is not an order id, and an arbitrary number is not a checked
 * positive number. A brand intersects the representation with a phantom property
 * keyed by a unique symbol. The property exists only in the static model.
 *
 * Read `Brand<string, "user-id">` aloud as: "a string carrying compile-time
 * evidence named user-id." The branded value still flows to APIs accepting a
 * string, but an unchecked string cannot flow back. Constructors are the trust
 * boundary: validate or deliberately assert there, not throughout the program.
 */

export declare const brand: unique symbol;

export type Brand<Value, Tag extends PropertyKey> = Value & {
  readonly [brand]: Readonly<Record<Tag, true>>;
};

export type BrandTags<Value> = Value extends { readonly [brand]: infer Tags }
  ? keyof Tags
  : never;

export type HasBrand<Value, Tag extends PropertyKey> = Value extends {
  readonly [brand]: infer Tags;
}
  ? Tag extends keyof Tags ? true : false
  : false;

type Extends<From, To> = [From] extends [To] ? true : false;

export type UserId = Brand<string, "user-id">;
export type OrderId = Brand<string, "order-id">;
export type Positive = Brand<number, "positive">;
export type Integer = Brand<number, "integer">;

// Part 1: A brand narrows assignment in one direction.
type _01 = Expect<Equal<Extends<UserId, string>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Extends<string, UserId>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Extends<Positive, number>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Extends<number, Positive>, TODO>>; // TODO(koan) @koan-error

// Part 2: Equal representations remain distinct when their evidence differs.
type _05 = Expect<Equal<Extends<UserId, OrderId>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Extends<OrderId, UserId>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Equal<UserId, OrderId>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<UserId | OrderId extends string ? true : false, TODO>>; // TODO(koan) @koan-error

// Part 3: Tag records let one value accumulate independent proofs.
type CheckedCount = Brand<Positive, "integer">;
type _09 = Expect<Equal<BrandTags<UserId>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<BrandTags<CheckedCount>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<HasBrand<CheckedCount, "positive">, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<HasBrand<CheckedCount, "integer">, TODO>>; // TODO(koan) @koan-error

// Part 4: Generic containers and functions preserve evidence when they preserve T.
type _13 = Expect<Equal<Array<UserId>[number], TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Promise<OrderId> extends Promise<infer Value> ? Value : never, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Readonly<UserId>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Extract<UserId | OrderId, UserId>, TODO>>; // TODO(koan) @koan-error

// Part 5: Top, bottom, union, and object representations reveal structural edges.
type _17 = Expect<Equal<BrandTags<UserId | OrderId>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Brand<never, "x">, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<HasBrand<unknown, "x">, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<keyof Brand<{ id: string }, "entity">, TODO>>; // TODO(koan) @koan-error

export function brandValue<Value, Tag extends PropertyKey>(value: Value): Brand<Value, Tag> {
  return value as Brand<Value, Tag>;
}

export function makeUserId(value: string): UserId {
  if (!/^usr_[a-z0-9]+$/u.test(value)) {
    throw new TypeError("invalid user id");
  }
  return brandValue<string, "user-id">(value);
}

export function makePositive(value: number): Positive {
  if (!(value > 0)) {
    throw new RangeError("expected a positive number");
  }
  return brandValue<number, "positive">(value);
}

export function formatUserPath(id: UserId): string {
  return `/users/${id}`;
}
