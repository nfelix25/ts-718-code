import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type { Brand, BrandTags, HasBrand, Integer, OrderId, Positive, UserId } from "./k-138-branded-types.js";

/** GUIDED DRILLS: follow assignment direction, distinguish tags, accumulate evidence, and preserve it through APIs. */

type Extends<From, To> = [From] extends [To] ? true : false;

// Assignment direction and representation (1-12)
type _01 = Expect<Equal<Extends<UserId, string>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Extends<string, UserId>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Extends<OrderId, string>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Extends<string, OrderId>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Extends<Positive, number>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Extends<number, Positive>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Extends<UserId, String>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Extends<UserId, PropertyKey>, TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<Extends<UserId, unknown>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Extends<UserId, object>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Extends<Brand<{ id: string }, "entity">, { id: string }>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Extends<{ id: string }, Brand<{ id: string }, "entity">>, TODO>>; // TODO(koan) @koan-error

// Distinct nominal identities over equal bases (13-24)
type _13 = Expect<Equal<Extends<UserId, OrderId>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<Extends<OrderId, UserId>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Equal<UserId, OrderId>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Equal<UserId, Brand<string, "user-id">>, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<Extends<Brand<"fixed", "id">, Brand<string, "id">>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Extends<Brand<string, "id">, Brand<"fixed", "id">>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Extends<Brand<number, "count">, Brand<number, "index">>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Extract<UserId | OrderId, UserId>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Exclude<UserId | OrderId, UserId>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<UserId | OrderId extends string ? true : false, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<string extends UserId | OrderId ? true : false, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<BrandTags<UserId | OrderId>, TODO>>; // TODO(koan) @koan-error

// Brand introspection and accumulation (25-40)
type PositiveInteger = Brand<Positive, "integer">;
type Entity = Brand<{ id: string }, "entity">;
type SavedEntity = Brand<Entity, "saved">;
type _25 = Expect<Equal<BrandTags<UserId>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<BrandTags<Positive>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<BrandTags<string>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<HasBrand<UserId, "user-id">, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<HasBrand<UserId, "order-id">, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<BrandTags<PositiveInteger>, TODO>>; // TODO(koan) @koan-error
type _31 = Expect<Equal<HasBrand<PositiveInteger, "positive">, TODO>>; // TODO(koan) @koan-error
type _32 = Expect<Equal<HasBrand<PositiveInteger, "integer">, TODO>>; // TODO(koan) @koan-error
type _33 = Expect<Equal<HasBrand<PositiveInteger, "other">, TODO>>; // TODO(koan) @koan-error
type _34 = Expect<Equal<BrandTags<Entity>, TODO>>; // TODO(koan) @koan-error
type _35 = Expect<Equal<BrandTags<SavedEntity>, TODO>>; // TODO(koan) @koan-error
type _36 = Expect<Equal<HasBrand<SavedEntity, "entity">, TODO>>; // TODO(koan) @koan-error
type _37 = Expect<Equal<HasBrand<SavedEntity, "saved">, TODO>>; // TODO(koan) @koan-error
type _38 = Expect<Equal<BrandTags<Brand<string, "a" | "b">>, TODO>>; // TODO(koan) @koan-error
type _39 = Expect<Equal<HasBrand<Brand<string, "a" | "b">, "a">, TODO>>; // TODO(koan) @koan-error
type _40 = Expect<Equal<HasBrand<Brand<string, "a" | "b">, "c">, TODO>>; // TODO(koan) @koan-error

// Preservation through common type constructors (41-52)
type _41 = Expect<Equal<UserId[], TODO>>; // TODO(koan) @koan-error
type _42 = Expect<Equal<ReadonlyArray<UserId>[number], TODO>>; // TODO(koan) @koan-error
type _43 = Expect<Equal<Promise<UserId> extends Promise<infer Value> ? Value : never, TODO>>; // TODO(koan) @koan-error
type _44 = Expect<Equal<{ id: UserId }["id"], TODO>>; // TODO(koan) @koan-error
type _45 = Expect<Equal<Pick<{ id: UserId; name: string }, "id">["id"], TODO>>; // TODO(koan) @koan-error
type _46 = Expect<Equal<Partial<{ id: UserId }>["id"], TODO>>; // TODO(koan) @koan-error
type _47 = Expect<Equal<Awaited<Promise<OrderId>>, TODO>>; // TODO(koan) @koan-error
type _48 = Expect<Equal<ReturnType<() => Positive>, TODO>>; // TODO(koan) @koan-error
type _49 = Expect<Equal<Parameters<(id: UserId) => void>[0], TODO>>; // TODO(koan) @koan-error
type _50 = Expect<Equal<NonNullable<UserId | null>, TODO>>; // TODO(koan) @koan-error
type _51 = Expect<Equal<Extract<UserId | string, UserId>, TODO>>; // TODO(koan) @koan-error
type _52 = Expect<Equal<Exclude<UserId | null, null>, TODO>>; // TODO(koan) @koan-error

// Structural special cases and composition (53-60)
type _53 = Expect<Equal<Brand<never, "x">, TODO>>; // TODO(koan) @koan-error
type _54 = Expect<Equal<BrandTags<unknown>, TODO>>; // TODO(koan) @koan-error
type _55 = Expect<Equal<HasBrand<unknown, "x">, TODO>>; // TODO(koan) @koan-error
type _56 = Expect<Equal<HasBrand<never, "x">, TODO>>; // TODO(koan) @koan-error
type _57 = Expect<Equal<BrandTags<Positive | Integer>, TODO>>; // TODO(koan) @koan-error
type _58 = Expect<Equal<HasBrand<Positive | Integer, "positive">, TODO>>; // TODO(koan) @koan-error
type _59 = Expect<Equal<keyof Brand<{ id: string }, "entity"> extends keyof { id: string } ? true : false, TODO>>; // TODO(koan) @koan-error
type _60 = Expect<Equal<Extends<Brand<string | number, "token">, string | number>, TODO>>; // TODO(koan) @koan-error
