import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-062 guided drills: any in conditional types
 * =============================================================================
 * Determine whether any only influences branch selection or is returned from a
 * branch. When the result may itself be any, classify with IsAny before using
 * Equal so the TODO sentinel cannot hide the exercise.
 */

type DIsAny<T> = 0 extends (1 & T) ? true : false;
type DBranch<T> = T extends string ? "string" : "other";
type DKeep<T, U> = T extends U ? T : never;
type DBox<T> = T extends object ? { object: T } : { scalar: T };
type DSafe<T> = DIsAny<T> extends true ? "any" : T extends string ? "string" : T extends number ? "number" : "other";

// Any as a checked type with literal branch results.
type _D01 = Expect<Equal<any extends string ? true : false, TODO>>; // TODO(koan) @koan-error
type _D02 = Expect<Equal<any extends number ? "n" : "x", TODO>>; // TODO(koan) @koan-error
type _D03 = Expect<Equal<any extends object ? 1 : 2, TODO>>; // TODO(koan) @koan-error
type _D04 = Expect<Equal<any extends never ? "bottom" : "not", TODO>>; // TODO(koan) @koan-error
type _D05 = Expect<Equal<any extends unknown ? "top" : "not", TODO>>; // TODO(koan) @koan-error
type _D06 = Expect<Equal<any extends any ? "same" : "different", TODO>>; // TODO(koan) @koan-error
type _D07 = Expect<Equal<DBranch<any>, TODO>>; // TODO(koan) @koan-error
type _D08 = Expect<Equal<(any extends readonly unknown[] ? "array" : "other"), TODO>>; // TODO(koan) @koan-error
type _D09 = Expect<Equal<(any extends (...args: any[]) => any ? "fn" : "other"), TODO>>; // TODO(koan) @koan-error
type _D10 = Expect<Equal<(any extends { id: number } ? "id" : "other"), TODO>>; // TODO(koan) @koan-error
type _D11 = Expect<Equal<(any extends 1 | 2 ? "small" : "other"), TODO>>; // TODO(koan) @koan-error
type _D12 = Expect<Equal<([any] extends [string] ? true : false), TODO>>; // TODO(koan) @koan-error
type _D13 = Expect<Equal<({ value: any } extends { value: string } ? true : false), TODO>>; // TODO(koan) @koan-error
type _D14 = Expect<Equal<(() => any) extends (() => string) ? true : false, TODO>>; // TODO(koan) @koan-error
type _D15 = Expect<Equal<((value: any) => void) extends ((value: string) => void) ? true : false, TODO>>; // TODO(koan) @koan-error

// IsAny classifications across unions, intersections, containers, and aliases.
type _D16 = Expect<Equal<DIsAny<any>, TODO>>; // TODO(koan) @koan-error
type _D17 = Expect<Equal<DIsAny<unknown>, TODO>>; // TODO(koan) @koan-error
type _D18 = Expect<Equal<DIsAny<never>, TODO>>; // TODO(koan) @koan-error
type _D19 = Expect<Equal<DIsAny<string>, TODO>>; // TODO(koan) @koan-error
type _D20 = Expect<Equal<DIsAny<{}>, TODO>>; // TODO(koan) @koan-error
type _D21 = Expect<Equal<DIsAny<any | string>, TODO>>; // TODO(koan) @koan-error
type _D22 = Expect<Equal<DIsAny<any & string>, TODO>>; // TODO(koan) @koan-error
type _D23 = Expect<Equal<DIsAny<unknown | string>, TODO>>; // TODO(koan) @koan-error
type _D24 = Expect<Equal<DIsAny<never | string>, TODO>>; // TODO(koan) @koan-error
type _D25 = Expect<Equal<DIsAny<any[]>, TODO>>; // TODO(koan) @koan-error
type _D26 = Expect<Equal<DIsAny<{ value: any }>, TODO>>; // TODO(koan) @koan-error
type _D27 = Expect<Equal<DIsAny<Promise<any>>, TODO>>; // TODO(koan) @koan-error
type _D28 = Expect<Equal<DIsAny<Awaited<Promise<any>>>, TODO>>; // TODO(koan) @koan-error
type _D29 = Expect<Equal<DIsAny<ReturnType<() => any>>, TODO>>; // TODO(koan) @koan-error
type _D30 = Expect<Equal<DIsAny<Parameters<any>>, TODO>>; // TODO(koan) @koan-error

// Returning T or expressions containing T spreads poison into results.
type _D31 = Expect<Equal<DIsAny<DKeep<any, string>>, TODO>>; // TODO(koan) @koan-error
type _D32 = Expect<Equal<DIsAny<DKeep<any, never>>, TODO>>; // TODO(koan) @koan-error
type _D33 = Expect<Equal<DIsAny<any extends string ? any : never>, TODO>>; // TODO(koan) @koan-error
type _D34 = Expect<Equal<DIsAny<any extends string ? string : any>, TODO>>; // TODO(koan) @koan-error
type _D35 = Expect<Equal<DBox<any>, TODO>>; // TODO(koan) @koan-error
type _D36 = Expect<Equal<DIsAny<DBox<any>>, TODO>>; // TODO(koan) @koan-error
type _D37 = Expect<Equal<DIsAny<Awaited<any>>, TODO>>; // TODO(koan) @koan-error
type _D38 = Expect<Equal<DIsAny<Exclude<any, string>>, TODO>>; // TODO(koan) @koan-error
type _D39 = Expect<Equal<DIsAny<Extract<any, string>>, TODO>>; // TODO(koan) @koan-error
type _D40 = Expect<Equal<DIsAny<NonNullable<any>>, TODO>>; // TODO(koan) @koan-error
type _D41 = Expect<Equal<{ [K in "x"]: DBranch<any> }, TODO>>; // TODO(koan) @koan-error
type _D42 = Expect<Equal<{ [K in "x"]: DKeep<any, string> }["x"] extends any ? true : false, TODO>>; // TODO(koan) @koan-error
type _D43 = Expect<Equal<DIsAny<{ [K in "x"]: DKeep<any, string> }["x"]>, TODO>>; // TODO(koan) @koan-error
type _D44 = Expect<Equal<keyof any, TODO>>; // TODO(koan) @koan-error
type _D45 = Expect<Equal<DIsAny<any[string]>, TODO>>; // TODO(koan) @koan-error

// Guarding the detector before ordinary conditionals contains the poison.
type _D46 = Expect<Equal<DSafe<any>, TODO>>; // TODO(koan) @koan-error
type _D47 = Expect<Equal<DSafe<unknown>, TODO>>; // TODO(koan) @koan-error
type _D48 = Expect<Equal<DSafe<string>, TODO>>; // TODO(koan) @koan-error
type _D49 = Expect<Equal<DSafe<number>, TODO>>; // TODO(koan) @koan-error
type _D50 = Expect<Equal<DSafe<boolean>, TODO>>; // TODO(koan) @koan-error
type _D51 = Expect<Equal<DSafe<never>, TODO>>; // TODO(koan) @koan-error
type _D52 = Expect<Equal<DSafe<any | string>, TODO>>; // TODO(koan) @koan-error
type _D53 = Expect<Equal<DSafe<unknown | string>, TODO>>; // TODO(koan) @koan-error
type _D54 = Expect<Equal<DSafe<string | number>, TODO>>; // TODO(koan) @koan-error
type _D55 = Expect<Equal<DIsAny<any> extends true ? "caught" : DBranch<any>, TODO>>; // TODO(koan) @koan-error
type _D56 = Expect<Equal<DIsAny<string> extends true ? "caught" : DBranch<string>, TODO>>; // TODO(koan) @koan-error
type _D57 = Expect<Equal<DIsAny<unknown> extends true ? "caught" : DBranch<unknown>, TODO>>; // TODO(koan) @koan-error
type _D58 = Expect<Equal<[DIsAny<any>] extends [true] ? "caught" : "missed", TODO>>; // TODO(koan) @koan-error
type _D59 = Expect<Equal<Record<string, any>["x"] extends string ? "yes" : "no", TODO>>; // TODO(koan) @koan-error
type _D60 = Expect<Equal<DIsAny<Record<string, any>["x"]>, TODO>>; // TODO(koan) @koan-error
