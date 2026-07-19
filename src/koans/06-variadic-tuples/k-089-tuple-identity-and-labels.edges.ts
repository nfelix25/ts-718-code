import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-089 edge cases: tuple identity and labels
 * =============================================================================
 * Finite length is a structural clue, not a hidden tuple brand. Union behavior,
 * intersections that forge a literal length, special element types, and tuple
 * keys show exactly what the common tuple test can and cannot prove.
 */

type EIsTuple<T extends readonly unknown[]> = T extends unknown
  ? number extends T["length"] ? false : true
  : never;
type ENonDistributiveTuple<T extends readonly unknown[]> =
  number extends T["length"] ? false : true;
type EKeys<T extends readonly unknown[]> = Exclude<keyof T, keyof readonly unknown[]>;
type EIsAny<T> = 0 extends (1 & T) ? true : false;

// Empty and unusual element domains retain finite tuple identity.
type _E01 = Expect<Equal<EIsTuple<[]>, TODO>>; // TODO(koan) @koan-error
type _E02 = Expect<Equal<EIsTuple<[never]>, TODO>>; // TODO(koan) @koan-error
type _E03 = Expect<Equal<EIsTuple<[any]>, TODO>>; // TODO(koan) @koan-error
type _E04 = Expect<Equal<EIsTuple<[unknown]>, TODO>>; // TODO(koan) @koan-error
type _E05 = Expect<Equal<[never][number], TODO>>; // TODO(koan) @koan-error
type _E06 = Expect<Equal<EIsAny<[any][number]>, TODO>>; // TODO(koan) @koan-error

// Distributive and whole-union length tests answer different questions.
type _E07 = Expect<Equal<EIsTuple<[] | string[]>, TODO>>; // TODO(koan) @koan-error
type _E08 = Expect<Equal<ENonDistributiveTuple<[] | string[]>, TODO>>; // TODO(koan) @koan-error
type _E09 = Expect<Equal<EIsTuple<[1] | [1, 2]>, TODO>>; // TODO(koan) @koan-error
type _E10 = Expect<Equal<([1] | [1, 2])["length"], TODO>>; // TODO(koan) @koan-error
type _E11 = Expect<Equal<EIsTuple<never>, TODO>>; // TODO(koan) @koan-error
type _E12 = Expect<Equal<EIsAny<EIsTuple<any>>, TODO>>; // TODO(koan) @koan-error

// A forged literal length can fool this structural detector.
type ForgedPair = string[] & { length: 2 };
type _E13 = Expect<Equal<EIsTuple<ForgedPair>, TODO>>; // TODO(koan) @koan-error
type _E14 = Expect<Equal<ForgedPair["length"], TODO>>; // TODO(koan) @koan-error
type _E15 = Expect<Equal<ForgedPair[number], TODO>>; // TODO(koan) @koan-error
type _E16 = Expect<Equal<EKeys<ForgedPair>, TODO>>; // TODO(koan) @koan-error

// Labels never become keys and cannot be retrieved through indexed access.
type Labeled = [userId: string, active: boolean];
type _E17 = Expect<Equal<EKeys<Labeled>, TODO>>; // TODO(koan) @koan-error
type _E18 = Expect<Equal<"userId" extends keyof Labeled ? true : false, TODO>>; // TODO(koan) @koan-error
type _E19 = Expect<Equal<"active" extends keyof Labeled ? true : false, TODO>>; // TODO(koan) @koan-error
type _E20 = Expect<Equal<"0" extends keyof Labeled ? true : false, TODO>>; // TODO(koan) @koan-error
type _E21 = Expect<Equal<number extends keyof Labeled ? true : false, TODO>>; // TODO(koan) @koan-error
type _E22 = Expect<Equal<Labeled[0 | 1], TODO>>; // TODO(koan) @koan-error

// Structural compatibility still checks order, cardinality, and element types.
type _E23 = Expect<Equal<[x: number, y: string] extends [number, string] ? true : false, TODO>>; // TODO(koan) @koan-error
type _E24 = Expect<Equal<[x: number, y: string] extends [string, number] ? true : false, TODO>>; // TODO(koan) @koan-error
type _E25 = Expect<Equal<[number, string] extends [x: number] ? true : false, TODO>>; // TODO(koan) @koan-error
type _E26 = Expect<Equal<[number] extends [x: number, y: string] ? true : false, TODO>>; // TODO(koan) @koan-error

// Parameter labels survive for tooling, while type operators see tuple shape.
type EParams = Parameters<(source: string, destination: string) => void>;
type _E27 = Expect<Equal<Equal<EParams, [string, string]>, TODO>>; // TODO(koan) @koan-error
type _E28 = Expect<Equal<EKeys<EParams>, TODO>>; // TODO(koan) @koan-error
type _E29 = Expect<Equal<EParams[number], TODO>>; // TODO(koan) @koan-error
type _E30 = Expect<Equal<EParams["length"], TODO>>; // TODO(koan) @koan-error

// Pre-solved: label spelling is irrelevant to strict structural equality.
type _DemoLabels = Expect<Equal<[left: number, right: number], [x: number, y: number]>>;

// Pre-solved: tuple labels are not string keys.
type _DemoNoLabelKey = Expect<Equal<"left" extends keyof [left: number] ? true : false, false>>;

// Pre-solved: a union of finite tuple lengths remains a literal union.
type _DemoLengthUnion = Expect<Equal<([1] | [1, 2, 3])["length"], 1 | 3>>;

declare const labeled: [name: string, count: number];
// @ts-expect-error Labels do not create named properties at runtime or in the type.
labeled.name;
