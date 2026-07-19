import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-062 edge cases: any in conditional types
 * =============================================================================
 * Any can be the checked type, inferred type, branch value, indexed value, or
 * generic constraint argument. These cases stress each position and show why
 * tuple wrapping affects distribution but does not restore trustworthy evidence.
 */

type EIsAny<T> = 0 extends (1 & T) ? true : false;
type EReturn<T> = T extends (...args: any[]) => infer R ? R : never;
type EArgs<T> = T extends (...args: infer A) => any ? A : never;
type ECategory<T> = EIsAny<T> extends true ? "any" : T extends string ? "string" : T extends unknown ? "known" : "other";

// Inference from any may itself produce any or unknown-like utility views.
type _E01 = Expect<Equal<EIsAny<EReturn<any>>, TODO>>; // TODO(koan) @koan-error
type _E02 = Expect<Equal<EArgs<any>, TODO>>; // TODO(koan) @koan-error
type _E03 = Expect<Equal<EIsAny<ReturnType<any>>, TODO>>; // TODO(koan) @koan-error
type _E04 = Expect<Equal<Parameters<any>, TODO>>; // TODO(koan) @koan-error
type _E05 = Expect<Equal<ConstructorParameters<any>, TODO>>; // TODO(koan) @koan-error
type _E06 = Expect<Equal<EIsAny<InstanceType<any>>, TODO>>; // TODO(koan) @koan-error

// Tuple wrapping suppresses distribution but any remains assignability-wild.
type _E07 = Expect<Equal<[any] extends [string] ? true : false, TODO>>; // TODO(koan) @koan-error
type _E08 = Expect<Equal<[any] extends [never] ? true : false, TODO>>; // TODO(koan) @koan-error
type _E09 = Expect<Equal<[any] extends [unknown] ? true : false, TODO>>; // TODO(koan) @koan-error
type _E10 = Expect<Equal<{ value: any } extends { value: string } ? true : false, TODO>>; // TODO(koan) @koan-error
type _E11 = Expect<Equal<Promise<any> extends Promise<string> ? true : false, TODO>>; // TODO(koan) @koan-error

// Union and intersection normalization spreads or constrains poison differently.
type _E12 = Expect<Equal<EIsAny<any | never>, TODO>>; // TODO(koan) @koan-error
type _E13 = Expect<Equal<EIsAny<any | unknown>, TODO>>; // TODO(koan) @koan-error
type _E14 = Expect<Equal<EIsAny<any & unknown>, TODO>>; // TODO(koan) @koan-error
type _E15 = Expect<Equal<EIsAny<any & never>, TODO>>; // TODO(koan) @koan-error
type _E16 = Expect<Equal<EIsAny<any & { id: string }>, TODO>>; // TODO(koan) @koan-error
type _E17 = Expect<Equal<(any | string) extends infer T ? EIsAny<T> : never, TODO>>; // TODO(koan) @koan-error

// Indexed and mapped any can poison one property or an entire value domain.
type _E18 = Expect<Equal<EIsAny<any[string]>, TODO>>; // TODO(koan) @koan-error
type _E19 = Expect<Equal<EIsAny<any[number]>, TODO>>; // TODO(koan) @koan-error
type _E20 = Expect<Equal<EIsAny<{ value: any }["value"]>, TODO>>; // TODO(koan) @koan-error
type _E21 = Expect<Equal<EIsAny<Record<string, any>[string]>, TODO>>; // TODO(koan) @koan-error
type _E22 = Expect<Equal<{ [K in "a" | "b"]: K extends "a" ? any : string }, TODO>>; // TODO(koan) @koan-error
type _E23 = Expect<Equal<EIsAny<{ [K in "a" | "b"]: K extends "a" ? any : string }[keyof { a: 1; b: 2 }]>, TODO>>; // TODO(koan) @koan-error

// Detector-first classification contains any before normal branches run.
type _E24 = Expect<Equal<ECategory<any>, TODO>>; // TODO(koan) @koan-error
type _E25 = Expect<Equal<ECategory<unknown>, TODO>>; // TODO(koan) @koan-error
type _E26 = Expect<Equal<ECategory<never>, TODO>>; // TODO(koan) @koan-error
type _E27 = Expect<Equal<ECategory<string | number>, TODO>>; // TODO(koan) @koan-error
type _E28 = Expect<Equal<ECategory<any | string>, TODO>>; // TODO(koan) @koan-error
type _E29 = Expect<Equal<ECategory<any & string>, TODO>>; // TODO(koan) @koan-error
type _E30 = Expect<Equal<ECategory<unknown | string>, TODO>>; // TODO(koan) @koan-error

// Pre-solved: any in literal branches preserves both answers.
type _DemoBranches = Expect<Equal<any extends string ? "yes" : "no", "yes" | "no">>;

// Pre-solved: returning the checked any makes the result itself any.
type _DemoPoison = Expect<Equal<EIsAny<any extends string ? any : never>, true>>;

// Pre-solved: detector-first classification prevents normal branch ambiguity.
type _DemoSafe = Expect<Equal<ECategory<any>, "any">>;

// The compiler permits unsafe property access through any without a diagnostic.
declare const unsafe: any;
const silentlyAny = unsafe.missing.deep.call();
type _DemoSilentAny = Expect<Equal<EIsAny<typeof silentlyAny>, true>>;
