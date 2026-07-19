import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-082 edge cases: type-level join
 * =============================================================================
 * Exact join depends on finite tuple identity. These cases stress empty and
 * singleton separator behavior, nullish interpolation, broad/rest/optional
 * tuples, never and any, separator unions, and split-join round trips.
 */

type EValue = string | number | bigint | boolean | null | undefined;
type EJoin<T extends readonly EValue[], S extends string> = number extends T["length"]
  ? string
  : T extends readonly []
    ? ""
    : T extends readonly [infer O extends EValue]
      ? `${O}`
      : T extends readonly [infer H extends EValue, ...infer R extends readonly EValue[]]
        ? `${H}${S}${EJoin<R, S>}`
        : string;
type ESplit<S extends string, D extends string> = S extends `${infer H}${D}${infer R}`
  ? [H, ...ESplit<R, D>]
  : [S];
type EIsAny<T> = 0 extends (1 & T) ? true : false;

// Empty and singleton tuples never emit the separator.
type _E01 = Expect<Equal<EJoin<[], ",">, TODO>>; // TODO(koan) @koan-error
type _E02 = Expect<Equal<EJoin<[], never>, TODO>>; // TODO(koan) @koan-error
type _E03 = Expect<Equal<EJoin<["a"], ",">, TODO>>; // TODO(koan) @koan-error
type _E04 = Expect<Equal<EJoin<["a"], never>, TODO>>; // TODO(koan) @koan-error
type _E05 = Expect<Equal<EJoin<["a", "b"], never>, TODO>>; // TODO(koan) @koan-error

// Null and undefined stringify explicitly, unlike native Array.join defaults.
type _E06 = Expect<Equal<EJoin<[null], ",">, TODO>>; // TODO(koan) @koan-error
type _E07 = Expect<Equal<EJoin<[undefined], ",">, TODO>>; // TODO(koan) @koan-error
type _E08 = Expect<Equal<EJoin<[null, undefined], ",">, TODO>>; // TODO(koan) @koan-error
type _E09 = Expect<Equal<EJoin<["", null, undefined], ",">, TODO>>; // TODO(koan) @koan-error

// Never in an element position annihilates the corresponding template branch.
type _E10 = Expect<Equal<EJoin<[never], ",">, TODO>>; // TODO(koan) @koan-error
type _E11 = Expect<Equal<EJoin<["a", never], ",">, TODO>>; // TODO(koan) @koan-error
type _E12 = Expect<Equal<EJoin<[never, "b"], ",">, TODO>>; // TODO(koan) @koan-error
type _E13 = Expect<Equal<EJoin<["a" | never, "b"], ",">, TODO>>; // TODO(koan) @koan-error

// Broad arrays, rest tuples, and optional tuples cannot always expose finite cardinality.
type _E14 = Expect<Equal<EJoin<string[], ",">, TODO>>; // TODO(koan) @koan-error
type _E15 = Expect<Equal<EJoin<readonly number[], ",">, TODO>>; // TODO(koan) @koan-error
type _E16 = Expect<Equal<EJoin<[head: string, ...tail: string[]], ",">, TODO>>; // TODO(koan) @koan-error
type _E17 = Expect<Equal<EJoin<[only?: string], ",">, TODO>>; // TODO(koan) @koan-error
type _E18 = Expect<Equal<EJoin<[head: string, tail?: string], ",">, TODO>>; // TODO(koan) @koan-error

// Element and separator unions multiply across every emitted position.
type _E19 = Expect<Equal<EJoin<["a" | "b", "x" | "y"], ":">, TODO>>; // TODO(koan) @koan-error
type _E20 = Expect<Equal<EJoin<["a", "b"], ":" | "/">, TODO>>; // TODO(koan) @koan-error
type _E21 = Expect<Equal<EJoin<["a", "b", "c"], ":" | "/">, TODO>>; // TODO(koan) @koan-error
type _E22 = Expect<Equal<EJoin<[boolean, boolean], ":">, TODO>>; // TODO(koan) @koan-error

// Any and never at the tuple boundary retain special behavior.
type _E23 = Expect<Equal<EIsAny<EJoin<any, ",">>, TODO>>; // TODO(koan) @koan-error
type _E24 = Expect<Equal<EJoin<never, ",">, TODO>>; // TODO(koan) @koan-error

// Split and join round-trip when both utilities share empty-segment semantics.
type _E25 = Expect<Equal<EJoin<ESplit<"a,b,c", ",">, ",">, TODO>>; // TODO(koan) @koan-error
type _E26 = Expect<Equal<EJoin<ESplit<",a,", ",">, ",">, TODO>>; // TODO(koan) @koan-error
type _E27 = Expect<Equal<EJoin<ESplit<"single", ",">, ",">, TODO>>; // TODO(koan) @koan-error
type _E28 = Expect<Equal<ESplit<EJoin<["a", "b", "c"], ",">, ",">, TODO>>; // TODO(koan) @koan-error

// Moderate finite tuples remain precise.
type _E29 = Expect<Equal<EJoin<["a", "b", "c", "d", "e", "f", "g", "h"], "-">, TODO>>; // TODO(koan) @koan-error
type _E30 = Expect<Equal<EJoin<[1, 2, 3, 4, 5, 6, 7, 8], "">, TODO>>; // TODO(koan) @koan-error

// Pre-solved: separators appear only between elements.
type _DemoPlacement = Expect<Equal<EJoin<["a", "b", "c"], ",">, "a,b,c">>;

// Pre-solved: nullish elements use template interpolation spellings.
type _DemoNullish = Expect<Equal<EJoin<[null, undefined], ",">, "null,undefined">>;

// Pre-solved: a split tuple round-trips through join including empty fields.
type _DemoRoundTrip = Expect<Equal<EJoin<ESplit<",a,", ",">, ",">, ",a,">>;

// Arbitrary objects are outside the interpolation domain.
// @ts-expect-error Object tuple members cannot be joined by this string utility.
type InvalidJoinMember = EJoin<[{ id: 1 }], ",">;
