import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-088 edge cases: recursive grammar capstone
 * =============================================================================
 * Recursive grammars amplify delimiter, trimming, and failure-policy choices.
 * These cases stress empty statements, trailing separators, delimiter text in
 * values, ambiguous keywords, numeric widening, unions, broad/special inputs,
 * all-or-nothing failure, and moderate statement depth.
 */

type EWS = " " | "\t" | "\n" | "\r";
type EL<S extends string> = string extends S ? S : S extends `${EWS}${infer R}` ? EL<R> : S;
type ER<S extends string> = string extends S ? S : S extends `${infer R}${EWS}` ? ER<R> : S;
type ET<S extends string> = EL<ER<S>>;
type EN<S extends string> = S extends `${infer N extends number}` ? N : never;
type ECmd = { op: "get"; key: string } | { op: "set"; key: string; value: unknown } | { op: "delete"; key: string } | { op: "increment"; key: string; amount: number };
type ECommand<S extends string> = ET<S> extends `get ${infer K}` ? K extends "" ? never : { op: "get"; key: K }
  : ET<S> extends `set ${infer K}=${infer V}` ? K extends "" ? never : { op: "set"; key: K; value: EN<V> extends never ? V : EN<V> }
  : ET<S> extends `delete ${infer K}` ? K extends "" ? never : { op: "delete"; key: K }
  : ET<S> extends `increment ${infer K} by ${infer A}` ? K extends "" ? never : [EN<A>] extends [never] ? never : { op: "increment"; key: K; amount: EN<A> }
  : never;
type ELiteral<S extends string> = ET<S> extends "" ? []
  : S extends `${infer H};${infer R}` ? ECommand<H> extends infer C
    ? [C] extends [never] ? never : ELiteral<R> extends infer T
      ? [T] extends [never] ? never : T extends ECmd[] ? C extends ECmd ? [C, ...T] : never : never
      : never
    : never
  : ECommand<S> extends infer C ? [C] extends [never] ? never : C extends ECmd ? [C] : never : never;
type EProgram<S extends string> = S extends unknown ? string extends S ? ECmd[] : ELiteral<S> : never;
type EIsAny<T> = 0 extends (1 & T) ? true : false;

// Empty program and trailing separator are bases; other empty statements are invalid.
type _E01 = Expect<Equal<EProgram<"">, TODO>>; // TODO(koan) @koan-error
type _E02 = Expect<Equal<EProgram<"   ">, TODO>>; // TODO(koan) @koan-error
type _E03 = Expect<Equal<EProgram<"get x;">, TODO>>; // TODO(koan) @koan-error
type _E04 = Expect<Equal<EProgram<";get x">, TODO>>; // TODO(koan) @koan-error
type _E05 = Expect<Equal<EProgram<"get x;;delete x">, TODO>>; // TODO(koan) @koan-error
type _E06 = Expect<Equal<EProgram<"get x; ;delete x">, TODO>>; // TODO(koan) @koan-error

// Set uses the first equals; semicolon remains a program separator even inside text.
type _E07 = Expect<Equal<ECommand<"set x=a=b">, TODO>>; // TODO(koan) @koan-error
type _E08 = Expect<Equal<EProgram<"set x=a=b;get x">, TODO>>; // TODO(koan) @koan-error
type _E09 = Expect<Equal<EProgram<"set x=a;b">, TODO>>; // TODO(koan) @koan-error
type _E10 = Expect<Equal<ECommand<"set =value">, TODO>>; // TODO(koan) @koan-error
type _E11 = Expect<Equal<ECommand<"set key=">, TODO>>; // TODO(koan) @koan-error

// Prefix order and exact spacing determine command classification.
type _E12 = Expect<Equal<ECommand<"get get x">, TODO>>; // TODO(koan) @koan-error
type _E13 = Expect<Equal<ECommand<"delete delete x">, TODO>>; // TODO(koan) @koan-error
type _E14 = Expect<Equal<ECommand<"GET x">, TODO>>; // TODO(koan) @koan-error
type _E15 = Expect<Equal<ECommand<"get  x">, TODO>>; // TODO(koan) @koan-error
type _E16 = Expect<Equal<ECommand<"increment x  by 2">, TODO>>; // TODO(koan) @koan-error

// Numeric increment recognition may widen noncanonical accepted forms.
type _E17 = Expect<Equal<ECommand<"increment x by 2">, TODO>>; // TODO(koan) @koan-error
type _E18 = Expect<Equal<ECommand<"increment x by 01">, TODO>>; // TODO(koan) @koan-error
type _E19 = Expect<Equal<ECommand<"increment x by 1e3">, TODO>>; // TODO(koan) @koan-error
type _E20 = Expect<Equal<ECommand<"increment x by many">, TODO>>; // TODO(koan) @koan-error

// One invalid statement rejects the whole program rather than disappearing.
type _E21 = Expect<Equal<EProgram<"get x;unknown y">, TODO>>; // TODO(koan) @koan-error
type _E22 = Expect<Equal<EProgram<"unknown y;get x">, TODO>>; // TODO(koan) @koan-error
type _E23 = Expect<Equal<EProgram<"get x;increment y by no;delete z">, TODO>>; // TODO(koan) @koan-error

// Literal unions distribute; broad and special source types use boundary behavior.
type _E24 = Expect<Equal<EProgram<"get a" | "get b">, TODO>>; // TODO(koan) @koan-error
type _E25 = Expect<Equal<EProgram<"get a" | "unknown b">, TODO>>; // TODO(koan) @koan-error
type _E26 = Expect<Equal<EProgram<string>, TODO>>; // TODO(koan) @koan-error
type _E27 = Expect<Equal<EProgram<never>, TODO>>; // TODO(koan) @koan-error
type _E28 = Expect<Equal<EIsAny<EProgram<any>>, TODO>>; // TODO(koan) @koan-error

// Moderate command counts remain exact and ordered.
type _E29 = Expect<Equal<EProgram<"get a;get b;get c;get d;get e;get f">["length"], TODO>>; // TODO(koan) @koan-error
type _E30 = Expect<Equal<EProgram<"set a=1;set b=2;set c=3;delete a;delete b;delete c">[number]["op"], TODO>>; // TODO(koan) @koan-error

// Pre-solved: a trailing separator reaches the empty-tail base case.
type _DemoTrailing = Expect<Equal<EProgram<"get x;">, [{ op: "get"; key: "x" }]>>;

// Pre-solved: an interior empty command invalidates the complete program.
type _DemoInteriorEmpty = Expect<Equal<EProgram<"get x;;delete x">, never>>;

// Pre-solved: first-equals parsing retains later equals inside the value.
type _DemoFirstEquals = Expect<Equal<ECommand<"set x=a=b">, { op: "set"; key: "x"; value: "a=b" }>>;

// A literal invalid program is rejected by a constrained execution boundary.
declare function acceptProgram<P extends string>(program: P & (EProgram<P> extends never ? never : unknown)): void;
// @ts-expect-error The unknown command makes the literal program invalid.
acceptProgram("get x;unknown y");
