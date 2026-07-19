import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  assignSelected,
  select,
  selectMany,
  selectPair,
  transformSelected,
} from "./k-011-related-type-parameters.js";

/** K-011 edges: a key/value relation can weaken when either side becomes a union. */

type Kind<T> = 0 extends 1 & T
  ? "any"
  : [T] extends [never]
    ? "never"
    : unknown extends T
      ? [keyof T] extends [never] ? "unknown" : "ordinary"
      : "ordinary";

// Group 1: Literal writes stay correlated; union-key writes admit a union value.
const writable = { id: 1, name: "Ada", active: true };
assignSelected(writable, "id", 2);
assignSelected(writable, "name", "Grace");
assignSelected(writable, "active", false);
const e001 = writable.id;
const e002 = writable.name;
const e003 = writable.active;
const writeKey: "id" | "name" = Math.random() ? "id" : "name";
assignSelected(writable, writeKey, 3);
const e004 = writeKey;
const e005 = select(writable, writeKey);
const optionalWritable: { required: string; optional?: number } = { required: "x" };
assignSelected(optionalWritable, "optional", undefined);
const e006 = optionalWritable.optional;
const readonlySource: { readonly id: number } = { id: 1 };
const e007 = select(readonlySource, "id");
const e008 = selectPair(writable, writeKey, writeKey);
const e009 = selectMany(writable, [writeKey]);
const e010 = transformSelected(writable, writeKey, String);
type _E001 = Expect<Equal<typeof e001, TODO>>; // TODO(koan) @koan-error
type _E002 = Expect<Equal<typeof e002, TODO>>; // TODO(koan) @koan-error
type _E003 = Expect<Equal<typeof e003, TODO>>; // TODO(koan) @koan-error
type _E004 = Expect<Equal<typeof e004, TODO>>; // TODO(koan) @koan-error
type _E005 = Expect<Equal<typeof e005, TODO>>; // TODO(koan) @koan-error
type _E006 = Expect<Equal<typeof e006, TODO>>; // TODO(koan) @koan-error
type _E007 = Expect<Equal<typeof e007, TODO>>; // TODO(koan) @koan-error
type _E008 = Expect<Equal<typeof e008, TODO>>; // TODO(koan) @koan-error
type _E009 = Expect<Equal<typeof e009, TODO>>; // TODO(koan) @koan-error
type _E010 = Expect<Equal<typeof e010, TODO>>; // TODO(koan) @koan-error

// Demonstration A: literal K checks its own value type.
type _SolvedLiteralRead = Expect<Equal<typeof e001, number>>;
// Demonstration B: a union K turns T[K] into a value union. That is precise for
// reads, but the generic write API cannot prove which member occurs at runtime.
type _SolvedUnionRead = Expect<Equal<typeof e005, string | number>>;
// Demonstration C: optional writes explicitly admit undefined.
type _SolvedOptionalWrite = Expect<Equal<typeof e006, number | undefined>>;

// @ts-expect-error id requires a number for a literal key.
assignSelected(writable, "id", "wrong");
// @ts-expect-error unknown is not one of writable's keys.
select(writable, "unknown");

// Group 2: T as a union offers only common keys to its dependent K.
type Left = { kind: "left"; shared: string; left: number };
type Right = { kind: "right"; shared: string; right: boolean };
const unionValue = {} as Left | Right;
const e011 = select(unionValue, "kind");
const e012 = select(unionValue, "shared");
const e013 = selectPair(unionValue, "kind", "shared");
const e014 = selectMany(unionValue, ["kind"] as const);
const e015 = selectMany(unionValue, ["kind", "shared"] as const);
const e016 = transformSelected(unionValue, "kind", (kind) => kind.toUpperCase());
const intersectionValue = {} as Left & Right;
const e017 = select(intersectionValue, "left");
const e018 = select(intersectionValue, "right");
const e019 = selectPair(intersectionValue, "left", "right");
const e020 = selectMany(intersectionValue, ["left", "right"] as const);
type _E011 = Expect<Equal<typeof e011, TODO>>; // TODO(koan) @koan-error
type _E012 = Expect<Equal<typeof e012, TODO>>; // TODO(koan) @koan-error
type _E013 = Expect<Equal<typeof e013, TODO>>; // TODO(koan) @koan-error
type _E014 = Expect<Equal<typeof e014, TODO>>; // TODO(koan) @koan-error
type _E015 = Expect<Equal<typeof e015, TODO>>; // TODO(koan) @koan-error
type _E016 = Expect<Equal<typeof e016, TODO>>; // TODO(koan) @koan-error
type _E017 = Expect<Equal<typeof e017, TODO>>; // TODO(koan) @koan-error
type _E018 = Expect<Equal<typeof e018, TODO>>; // TODO(koan) @koan-error
type _E019 = Expect<Equal<typeof e019, TODO>>; // TODO(koan) @koan-error
type _E020 = Expect<Equal<typeof e020, TODO>>; // TODO(koan) @koan-error

// Demonstration D: the discriminant is common, so its two literal values form
// the dependent return union.
type _SolvedUnionDiscriminant = Expect<Equal<typeof e011, "left" | "right">>;
// Demonstration E: Pick over common union keys preserves a mapped projection of
// the union rather than granting member-specific keys.
type _SolvedUnionPickKeys = Expect<Equal<keyof typeof e015, "kind" | "shared">>;
// Demonstration F: the impossible discriminant intersection collapses Left &
// Right to never; selecting any apparent key consequently yields never.
type _SolvedImpossibleIntersection = Expect<Equal<typeof e017, never>>;

// @ts-expect-error left is not guaranteed by the Right alternative.
select(unionValue, "left");
// @ts-expect-error a selected-key list has the same common-key restriction.
selectMany(unionValue, ["right"] as const);

// Group 3: Empty key sets, index signatures, broad types, and inference order.
const e021 = selectMany({ a: 1, b: 2 }, [] as const);
const dictionary: Record<string, number> = { a: 1 };
const e022 = select(dictionary, "missing");
const e023 = selectPair(dictionary, "a", "b");
const numberDictionary: Record<number, string> = { 0: "zero" };
const e024 = select(numberDictionary, 0);
declare const anyValue: any;
const e025 = select(anyValue, "anything");
const unknownValue: unknown = {};
const neverValue = undefined as never;
const e026 = select(neverValue, "anything");
const broadObject: object = {};
const e027 = selectMany(broadObject, [] as const);
const currentKey: "a" | "b" = "a";
const e028 = select({ a: 1, b: "b" }, currentKey);
const e029 = selectPair({ a: 1, b: "b" }, currentKey, "b");
const e030 = transformSelected({ a: 1, b: "b" }, currentKey, String);
type _E021 = Expect<Equal<typeof e021, TODO>>; // TODO(koan) @koan-error
type _E022 = Expect<Equal<typeof e022, TODO>>; // TODO(koan) @koan-error
type _E023 = Expect<Equal<typeof e023, TODO>>; // TODO(koan) @koan-error
type _E024 = Expect<Equal<typeof e024, TODO>>; // TODO(koan) @koan-error
type _E025 = Expect<Equal<Kind<typeof e025>, TODO>>; // TODO(koan) @koan-error
type _E026 = Expect<Equal<typeof e026, TODO>>; // TODO(koan) @koan-error
type _E027 = Expect<Equal<typeof e027, TODO>>; // TODO(koan) @koan-error
type _E028 = Expect<Equal<typeof e028, TODO>>; // TODO(koan) @koan-error
type _E029 = Expect<Equal<typeof e029, TODO>>; // TODO(koan) @koan-error
type _E030 = Expect<Equal<typeof e030, TODO>>; // TODO(koan) @koan-error

// Demonstration G: an empty readonly key tuple infers K as never, producing an
// empty Pick rather than widening to every key.
type _SolvedEmptyPick = Expect<Equal<typeof e021, Pick<{ a: number; b: number }, never>>>;
// Demonstration H: a string index signature admits every string key statically;
// runtime absence is handled by noUncheckedIndexedAccess at expression sites,
// not by changing the generic relationship itself.
type _SolvedDictionaryLookup = Expect<Equal<typeof e022, number>>;
// Demonstration I: never satisfies every constraint and never[K] remains never.
type _SolvedNeverSource = Expect<Equal<typeof e026, never>>;
// Demonstration J: control flow narrows a const key before inference.
type _SolvedCurrentKeyRead = Expect<Equal<typeof e028, number>>;
// Demonstration K: Result is inferred after the dependent callback input has
// been contextually established.
type _SolvedIndependentResult = Expect<Equal<typeof e030, string>>;

// @ts-expect-error unknown has no guaranteed key for K to select.
select(unknownValue, "anything");
