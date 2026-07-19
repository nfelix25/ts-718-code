import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type { Brand, BrandTags, HasBrand, OrderId, Positive, UserId, brand } from "./k-138-branded-types.js";

/** EDGE CASES: structural forgery, brand accumulation, unions, top/bottom types, widening, and runtime erasure. */

type Extends<From, To> = [From] extends [To] ? true : false;
type IsAny<T> = 0 extends 1 & T ? true : false;

// Pre-solved demonstrations establish the intended trust boundary.
type _DemoOneWay = Expect<Equal<Extends<UserId, string>, true>>;
type _DemoNotReverse = Expect<Equal<Extends<string, UserId>, false>>;
type _DemoDistinct = Expect<Equal<Extends<UserId, OrderId>, false>>;
type _DemoStacked = Expect<Equal<BrandTags<Brand<Positive, "integer">>, "positive" | "integer">>;
type _DemoRuntimeBase = Expect<Equal<UserId extends string ? true : false, true>>;
// A type assertion can forge evidence. Brands organize trust; they do not make assertions safe.

// 1. Brands are structural once their unique key is in scope (1-8)
type ForgedUser = string & { readonly [brand]: Readonly<Record<"user-id", true>> };
type _01 = Expect<Equal<Equal<ForgedUser, UserId>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Extends<ForgedUser, UserId>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<keyof UserId extends keyof string ? true : false, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<typeof brand extends keyof UserId ? true : false, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Readonly<UserId>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<BrandTags<Readonly<UserId>>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Extends<UserId, { readonly [brand]: object }>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<HasBrand<ForgedUser, "user-id">, TODO>>; // TODO(koan) @koan-error

// 2. Tag records accumulate instead of intersecting literal tag values to never (9-16)
type Both = Brand<Brand<number, "positive">, "integer">;
type Three = Brand<Both, "finite">;
type _09 = Expect<Equal<BrandTags<Both>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<BrandTags<Three>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<HasBrand<Three, "positive">, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<HasBrand<Three, "integer">, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<HasBrand<Three, "finite">, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<HasBrand<Three, "missing">, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Extends<Three, Both>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Extends<Both, Three>, TODO>>; // TODO(koan) @koan-error

// 3. Distribution and normalization affect brand queries across unions (17-23)
type _17 = Expect<Equal<BrandTags<UserId | OrderId>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<HasBrand<UserId | OrderId, "user-id">, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<HasBrand<UserId | OrderId, "missing">, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Extract<UserId | OrderId, Brand<string, "user-id">>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<BrandTags<Brand<string | number, "token">>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<Extends<Brand<string | number, "token">, Brand<string, "token">>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<BrandTags<never | UserId>, TODO>>; // TODO(koan) @koan-error

// 4. any, unknown, never, widening, and arithmetic can discard or poison evidence (24-30)
type _24 = Expect<Equal<IsAny<Brand<any, "x">>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<Brand<never, "x">, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<BrandTags<Brand<unknown, "x">>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<Extends<Brand<unknown, "x">, unknown>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<UserId & string, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<ReturnType<(id: UserId) => string>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<Positive extends number ? number : never, TODO>>; // TODO(koan) @koan-error
