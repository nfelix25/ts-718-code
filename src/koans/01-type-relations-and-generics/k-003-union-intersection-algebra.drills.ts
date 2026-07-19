import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type { AlgebraKind } from "./k-003-union-intersection-algebra.js";

/**
 * K-003 guided drills: union and intersection algebra
 * =============================================================================
 *
 * These repetitions move among literal sets, object guarantees, containers, and
 * functions. For every `|`, ask what additional values enter. For every `&`, ask
 * which values can still satisfy both sides. Then separately ask which members
 * are guaranteed through the resulting reference.
 */

// Group 1: Normalize unions.
// Variation: duplicates, nesting, subsumption, identity, and absorbing types.

type _D001 = Expect<Equal<"a" | "b", TODO>>; // TODO(koan) @koan-error
type _D002 = Expect<Equal<"a" | "a", TODO>>; // TODO(koan) @koan-error
type _D003 = Expect<Equal<(1 | 2) | (2 | 3), TODO>>; // TODO(koan) @koan-error
type _D004 = Expect<Equal<"literal" | string, TODO>>; // TODO(koan) @koan-error
type _D005 = Expect<Equal<1 | number, TODO>>; // TODO(koan) @koan-error
type _D006 = Expect<Equal<true | boolean, TODO>>; // TODO(koan) @koan-error
type _D007 = Expect<Equal<string | never, TODO>>; // TODO(koan) @koan-error
type _D008 = Expect<Equal<AlgebraKind<string | unknown>, TODO>>; // TODO(koan) @koan-error
type _D009 = Expect<Equal<AlgebraKind<string | any>, TODO>>; // TODO(koan) @koan-error
type _D010 = Expect<Equal<null | undefined, TODO>>; // TODO(koan) @koan-error
type _D011 = Expect<Equal<1 | 2 | 3, TODO>>; // TODO(koan) @koan-error
type _D012 = Expect<Equal<string | number | never, TODO>>; // TODO(koan) @koan-error
type _D013 = Expect<Equal<AlgebraKind<unknown | never>, TODO>>; // TODO(koan) @koan-error
type _D014 = Expect<Equal<AlgebraKind<any | never>, TODO>>; // TODO(koan) @koan-error

// Group 2: Normalize intersections.
// Variation: exact overlap, disjoint domains, top/bottom laws, and escape hatch.

type _D015 = Expect<Equal<"a" & "a", TODO>>; // TODO(koan) @koan-error
type _D016 = Expect<Equal<AlgebraKind<"a" & "b">, TODO>>; // TODO(koan) @koan-error
type _D017 = Expect<Equal<string & "a", TODO>>; // TODO(koan) @koan-error
type _D018 = Expect<Equal<number & 1, TODO>>; // TODO(koan) @koan-error
type _D019 = Expect<Equal<boolean & true, TODO>>; // TODO(koan) @koan-error
type _D020 = Expect<Equal<(1 | 2) & (2 | 3), TODO>>; // TODO(koan) @koan-error
type _D021 = Expect<Equal<(1 | 2 | 3) & (2 | 3 | 4), TODO>>; // TODO(koan) @koan-error
type _D022 = Expect<Equal<(string | number) & string, TODO>>; // TODO(koan) @koan-error
type _D023 = Expect<Equal<AlgebraKind<(string | number) & boolean>, TODO>>; // TODO(koan) @koan-error
type _D024 = Expect<Equal<unknown & Date, TODO>>; // TODO(koan) @koan-error
type _D025 = Expect<Equal<AlgebraKind<never & Date>, TODO>>; // TODO(koan) @koan-error
type _D026 = Expect<Equal<AlgebraKind<any & string>, TODO>>; // TODO(koan) @koan-error
type _D027 = Expect<Equal<AlgebraKind<unknown & never>, TODO>>; // TODO(koan) @koan-error
type _D028 = Expect<Equal<AlgebraKind<any & never>, TODO>>; // TODO(koan) @koan-error

// Group 3: Read the shared guarantees of object unions.
// Variation: shared keys with equal, literal-union, optional, and differing types.

type Cat = { kind: "cat"; name: string; meows: boolean };
type Dog = { kind: "dog"; name: string; barks: boolean };
type Pet = Cat | Dog;

type Success = { ok: true; value: string; requestId: string };
type Failure = { ok: false; error: Error; requestId: string };
type Result = Success | Failure;

type LeftValue = { side: "left"; value: string; shared: 1 };
type RightValue = { side: "right"; value: number; shared: 2 };
type EitherValue = LeftValue | RightValue;

type MaybeNote =
  | { id: string; note?: string }
  | { id: string; note: string; extra: boolean };

type _D029 = Expect<Equal<Pet["kind"], TODO>>; // TODO(koan) @koan-error
type _D030 = Expect<Equal<Pet["name"], TODO>>; // TODO(koan) @koan-error
type _D031 = Expect<Equal<keyof Pet, TODO>>; // TODO(koan) @koan-error
type _D032 = Expect<Equal<Result["ok"], TODO>>; // TODO(koan) @koan-error
type _D033 = Expect<Equal<Result["requestId"], TODO>>; // TODO(koan) @koan-error
type _D034 = Expect<Equal<keyof Result, TODO>>; // TODO(koan) @koan-error
type _D035 = Expect<Equal<EitherValue["value"], TODO>>; // TODO(koan) @koan-error
type _D036 = Expect<Equal<EitherValue["shared"], TODO>>; // TODO(koan) @koan-error
type _D037 = Expect<Equal<EitherValue["side"], TODO>>; // TODO(koan) @koan-error
type _D038 = Expect<Equal<keyof EitherValue, TODO>>; // TODO(koan) @koan-error
type _D039 = Expect<Equal<MaybeNote["id"], TODO>>; // TODO(koan) @koan-error
type _D040 = Expect<Equal<MaybeNote["note"], TODO>>; // TODO(koan) @koan-error
type _D041 = Expect<Equal<keyof MaybeNote, TODO>>; // TODO(koan) @koan-error
type _D042 = Expect<Equal<keyof ({ id: string; a: 1 } | { id: string; b: 2 } | { id: string; c: 3 }), TODO>>; // TODO(koan) @koan-error

// Group 4: Combine the simultaneous guarantees of object intersections.
// Variation: additional keys, compatible refinements, impossible properties,
// nested contracts, arrays with metadata, and callable objects.

type Named = { name: string };
type Counted = { count: number };
type Flagged = { flag: boolean };
type Complete = Named & Counted & Flagged;
type RefinedProperty = { value: string } & { value: "fixed" };
type ConflictingProperty = { value: string } & { value: number };
type NestedRequirements =
  & { config: { host: string } }
  & { config: { port: number } };
type TaggedArray = string[] & { tag: "words" };
type LabeledCallable = ((value: string) => number) & { label: string };

type _D043 = Expect<Equal<keyof (Named & Counted), TODO>>; // TODO(koan) @koan-error
type _D044 = Expect<Equal<(Named & Counted)["name"], TODO>>; // TODO(koan) @koan-error
type _D045 = Expect<Equal<(Named & Counted)["count"], TODO>>; // TODO(koan) @koan-error
type _D046 = Expect<Equal<keyof Complete, TODO>>; // TODO(koan) @koan-error
type _D047 = Expect<Equal<Complete["flag"], TODO>>; // TODO(koan) @koan-error
type _D048 = Expect<Equal<RefinedProperty["value"], TODO>>; // TODO(koan) @koan-error
type _D049 = Expect<Equal<AlgebraKind<ConflictingProperty["value"]>, TODO>>; // TODO(koan) @koan-error
type _D050 = Expect<Equal<({ value?: string } & { value: string })["value"], TODO>>; // TODO(koan) @koan-error
type _D051 = Expect<Equal<({ readonly value: string } & { value: string })["value"], TODO>>; // TODO(koan) @koan-error
type _D052 = Expect<Equal<NestedRequirements["config"]["host"], TODO>>; // TODO(koan) @koan-error
type _D053 = Expect<Equal<NestedRequirements["config"]["port"], TODO>>; // TODO(koan) @koan-error
type _D054 = Expect<Equal<TaggedArray[number], TODO>>; // TODO(koan) @koan-error
type _D055 = Expect<Equal<TaggedArray["tag"], TODO>>; // TODO(koan) @koan-error
type _D056 = Expect<Equal<LabeledCallable["label"], TODO>>; // TODO(koan) @koan-error

// Group 5: Rehearse the algebraic laws with finite sets.
// Variation: both operators, regrouping, absorption, and distribution.

type P = 1 | 2;
type Q = 2 | 3;
type R = 2 | 4;

type _D057 = Expect<Equal<Equal<P | P, P>, TODO>>; // TODO(koan) @koan-error
type _D058 = Expect<Equal<Equal<P & P, P>, TODO>>; // TODO(koan) @koan-error
type _D059 = Expect<Equal<Equal<P | Q, Q | P>, TODO>>; // TODO(koan) @koan-error
type _D060 = Expect<Equal<Equal<P & Q, Q & P>, TODO>>; // TODO(koan) @koan-error
type _D061 = Expect<Equal<Equal<(P | Q) | R, P | (Q | R)>, TODO>>; // TODO(koan) @koan-error
type _D062 = Expect<Equal<Equal<(P & Q) & R, P & (Q & R)>, TODO>>; // TODO(koan) @koan-error
type _D063 = Expect<Equal<Equal<P | (P & Q), P>, TODO>>; // TODO(koan) @koan-error
type _D064 = Expect<Equal<Equal<P & (P | Q), P>, TODO>>; // TODO(koan) @koan-error
type _D065 = Expect<Equal<Equal<P & (Q | R), (P & Q) | (P & R)>, TODO>>; // TODO(koan) @koan-error
type _D066 = Expect<Equal<Equal<P | (Q & R), (P | Q) & (P | R)>, TODO>>; // TODO(koan) @koan-error
type _D067 = Expect<Equal<Equal<P | never, P>, TODO>>; // TODO(koan) @koan-error
type _D068 = Expect<Equal<Equal<P & unknown, P>, TODO>>; // TODO(koan) @koan-error
type _D069 = Expect<Equal<AlgebraKind<P & never>, TODO>>; // TODO(koan) @koan-error
type _D070 = Expect<Equal<AlgebraKind<P | unknown>, TODO>>; // TODO(koan) @koan-error

// Group 6: Carry the algebra through containers, tuples, and function helpers.
// Variation: union outside versus inside a container, distributed utility types,
// overloaded-looking intersections, and intersections added around unions.

type StringHandler = (value: string) => "string";
type NumberHandler = (value: number) => "number";
type HandlerUnion = StringHandler | NumberHandler;
type HandlerIntersection = StringHandler & NumberHandler;

type _D071 = Expect<Equal<Array<string | number>[number], TODO>>; // TODO(koan) @koan-error
type _D072 = Expect<Equal<(string[] | number[])[number], TODO>>; // TODO(koan) @koan-error
type _D073 = Expect<Equal<(["ok", string] | ["error", Error])[0], TODO>>; // TODO(koan) @koan-error
type _D074 = Expect<Equal<(["ok", string] | ["error", Error])[1], TODO>>; // TODO(koan) @koan-error
type _D075 = Expect<Equal<Parameters<HandlerUnion>[0], TODO>>; // TODO(koan) @koan-error
type _D076 = Expect<Equal<ReturnType<HandlerUnion>, TODO>>; // TODO(koan) @koan-error
type _D077 = Expect<Equal<Parameters<HandlerIntersection>[0], TODO>>; // TODO(koan) @koan-error
type _D078 = Expect<Equal<ReturnType<HandlerIntersection>, TODO>>; // TODO(koan) @koan-error
type _D079 = Expect<Equal<Awaited<Promise<string> | Promise<number>>, TODO>>; // TODO(koan) @koan-error
type _D080 = Expect<Equal<keyof ({ id: string } & { updatedAt: Date }), TODO>>; // TODO(koan) @koan-error
type _D081 = Expect<Equal<({ id: string } & { updatedAt: Date })["id"], TODO>>; // TODO(koan) @koan-error
type _D082 = Expect<Equal<Array<{ id: string } & { updatedAt: Date }>[number]["updatedAt"], TODO>>; // TODO(koan) @koan-error
type _D083 = Expect<Equal<(({ a: 1 } | { b: 2 }) & { id: string })["id"], TODO>>; // TODO(koan) @koan-error
type _D084 = Expect<Equal<AlgebraKind<("left" | "right") & ("up" | "down")>, TODO>>; // TODO(koan) @koan-error
