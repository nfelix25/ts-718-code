import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/** K-044 drills: repeat array, fixed, labeled, readonly, optional, rest, variadic, and detached mappings. */

type DStrings<T> = { [K in keyof T]: string };
type DBox<T> = { [K in keyof T]: [T[K]] };
type DMutable<T> = { -readonly [K in keyof T]: T[K] };
type DOptional<T> = { [K in keyof T]+?: T[K] };
type DRequired<T> = { [K in keyof T]-?: T[K] };

// Group 1: Mutable and readonly arrays retain their container family.
type _D001 = Expect<Equal<DStrings<number[]>, TODO>>; // TODO(koan) @koan-error
type _D002 = Expect<Equal<DStrings<readonly number[]>, TODO>>; // TODO(koan) @koan-error
type _D003 = Expect<Equal<DBox<string[]>, TODO>>; // TODO(koan) @koan-error
type _D004 = Expect<Equal<DBox<readonly string[]>, TODO>>; // TODO(koan) @koan-error
type _D005 = Expect<Equal<DStrings<number[]>[number], TODO>>; // TODO(koan) @koan-error
type _D006 = Expect<Equal<DStrings<readonly number[]>[number], TODO>>; // TODO(koan) @koan-error
type _D007 = Expect<Equal<DBox<string[]>[number], TODO>>; // TODO(koan) @koan-error
type _D008 = Expect<Equal<keyof DStrings<number[]>, TODO>>; // TODO(koan) @koan-error
type _D009 = Expect<Equal<DMutable<readonly number[]>, TODO>>; // TODO(koan) @koan-error
type _D010 = Expect<Equal<Readonly<number[]>, TODO>>; // TODO(koan) @koan-error
type _D011 = Expect<Equal<DOptional<number[]>, TODO>>; // TODO(koan) @koan-error
type _D012 = Expect<Equal<DRequired<Array<number | undefined>>, TODO>>; // TODO(koan) @koan-error

// Group 2: Fixed and labeled tuples preserve positions and length.
type DPair = [string, number];
type DLabeled = [name: string, count: number, active: boolean];
type _D013 = Expect<Equal<DStrings<DPair>, TODO>>; // TODO(koan) @koan-error
type _D014 = Expect<Equal<DBox<DPair>, TODO>>; // TODO(koan) @koan-error
type _D015 = Expect<Equal<DStrings<DLabeled>, TODO>>; // TODO(koan) @koan-error
type _D016 = Expect<Equal<DBox<DLabeled>, TODO>>; // TODO(koan) @koan-error
type _D017 = Expect<Equal<DStrings<DPair>[0], TODO>>; // TODO(koan) @koan-error
type _D018 = Expect<Equal<DStrings<DPair>[1], TODO>>; // TODO(koan) @koan-error
type _D019 = Expect<Equal<DStrings<DPair>["length"], TODO>>; // TODO(koan) @koan-error
type _D020 = Expect<Equal<DPair[number], TODO>>; // TODO(koan) @koan-error
type _D021 = Expect<Equal<DLabeled[number], TODO>>; // TODO(koan) @koan-error
type _D022 = Expect<Equal<keyof DPair, TODO>>; // TODO(koan) @koan-error
type _D023 = Expect<Equal<DStrings<[]>, TODO>>; // TODO(koan) @koan-error
type _D024 = Expect<Equal<DStrings<[]>[number], TODO>>; // TODO(koan) @koan-error

// Group 3: Readonly transforms convert containers while preserving positions.
type DReadonlyPair = readonly ["a", 1];
type _D025 = Expect<Equal<DStrings<DReadonlyPair>, TODO>>; // TODO(koan) @koan-error
type _D026 = Expect<Equal<DBox<DReadonlyPair>, TODO>>; // TODO(koan) @koan-error
type _D027 = Expect<Equal<DMutable<DReadonlyPair>, TODO>>; // TODO(koan) @koan-error
type _D028 = Expect<Equal<Readonly<DPair>, TODO>>; // TODO(koan) @koan-error
type _D029 = Expect<Equal<DMutable<Readonly<DPair>>, TODO>>; // TODO(koan) @koan-error
type _D030 = Expect<Equal<Readonly<DMutable<DReadonlyPair>>, TODO>>; // TODO(koan) @koan-error
type _D031 = Expect<Equal<DMutable<readonly []>, TODO>>; // TODO(koan) @koan-error
type _D032 = Expect<Equal<Readonly<[]>, TODO>>; // TODO(koan) @koan-error
type _D033 = Expect<Equal<DStrings<readonly []>, TODO>>; // TODO(koan) @koan-error
type _D034 = Expect<Equal<DMutable<readonly string[]>, TODO>>; // TODO(koan) @koan-error
type _D035 = Expect<Equal<Readonly<string[]>, TODO>>; // TODO(koan) @koan-error
type _D036 = Expect<Equal<DBox<readonly [name: string, count: number]>, TODO>>; // TODO(koan) @koan-error

// Group 4: Optional, rest, and variadic slots retain their tuple structure.
type DMaybe = [name?: string, count?: number];
type DRest = [head: string, ...tail: number[]];
type DVariadic<T extends readonly unknown[]> = [prefix: string, ...rest: T];
type _D037 = Expect<Equal<DStrings<DMaybe>, TODO>>; // TODO(koan) @koan-error
type _D038 = Expect<Equal<DRequired<DMaybe>, TODO>>; // TODO(koan) @koan-error
type _D039 = Expect<Equal<DOptional<DPair>, TODO>>; // TODO(koan) @koan-error
type _D040 = Expect<Equal<DMaybe[number], TODO>>; // TODO(koan) @koan-error
type _D041 = Expect<Equal<DStrings<DRest>, TODO>>; // TODO(koan) @koan-error
type _D042 = Expect<Equal<DBox<DRest>, TODO>>; // TODO(koan) @koan-error
type _D043 = Expect<Equal<DRest[number], TODO>>; // TODO(koan) @koan-error
type _D044 = Expect<Equal<DStrings<DVariadic<[number, boolean]>>, TODO>>; // TODO(koan) @koan-error
type _D045 = Expect<Equal<DBox<DVariadic<readonly [1, true]>>, TODO>>; // TODO(koan) @koan-error
type _D046 = Expect<Equal<DVariadic<[]>["length"], TODO>>; // TODO(koan) @koan-error
type _D047 = Expect<Equal<DVariadic<string[]>[number], TODO>>; // TODO(koan) @koan-error
type _D048 = Expect<Equal<DMutable<readonly [head: string, ...tail: number[]]>, TODO>>; // TODO(koan) @koan-error

// Group 5: Element unions and detached key domains lose or preserve different information.
type DNumeric<T extends readonly unknown[]> = { [K in keyof T & number]: T[K] };
type DPositionStrings<T extends readonly unknown[]> = { [K in keyof T & `${number}`]: string };
type _D049 = Expect<Equal<DNumeric<DPair>, TODO>>; // TODO(koan) @koan-error
type _D050 = Expect<Equal<keyof DNumeric<DPair>, TODO>>; // TODO(koan) @koan-error
type _D051 = Expect<Equal<DNumeric<DPair>[number], TODO>>; // TODO(koan) @koan-error
type _D052 = Expect<Equal<DPositionStrings<DPair>, TODO>>; // TODO(koan) @koan-error
type _D053 = Expect<Equal<keyof DPositionStrings<DPair>, TODO>>; // TODO(koan) @koan-error
type _D054 = Expect<Equal<DPositionStrings<DPair>["0"], TODO>>; // TODO(koan) @koan-error
type _D055 = Expect<Equal<DPair[number], TODO>>; // TODO(koan) @koan-error
type _D056 = Expect<Equal<DStrings<DPair>[number], TODO>>; // TODO(koan) @koan-error
type _D057 = Expect<Equal<DBox<DPair>[number], TODO>>; // TODO(koan) @koan-error
type _D058 = Expect<Equal<Array<DPair[number]>, TODO>>; // TODO(koan) @koan-error
type _D059 = Expect<Equal<DStrings<never>, TODO>>; // TODO(koan) @koan-error
type _D060 = Expect<Equal<DStrings<unknown>, TODO>>; // TODO(koan) @koan-error
