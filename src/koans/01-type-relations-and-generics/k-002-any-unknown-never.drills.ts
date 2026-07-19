import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type {
  ClassifySpecial,
  IsAny,
  IsAssignable,
  IsNever,
  IsUnknown,
} from "./k-002-any-unknown-never.js";

/**
 * K-002 guided drills: any, unknown, and never
 * =============================================================================
 *
 * These repetitions train three separate instincts: classify the promise a type
 * makes, follow assignment direction, and simplify the special-type algebra.
 * Say each result aloud. "Unknown accepts this value but gives me no operations"
 * is more useful than memorizing that unknown is merely "wide."
 */

// Group 1: Classify isolated and immediately simplified types.
// Variation: primitives, containers, and unions/intersections that collapse.

type _D001 = Expect<Equal<ClassifySpecial<any>, TODO>>; // TODO(koan) @koan-error
type _D002 = Expect<Equal<ClassifySpecial<unknown>, TODO>>; // TODO(koan) @koan-error
type _D003 = Expect<Equal<ClassifySpecial<never>, TODO>>; // TODO(koan) @koan-error
type _D004 = Expect<Equal<ClassifySpecial<string>, TODO>>; // TODO(koan) @koan-error
type _D005 = Expect<Equal<ClassifySpecial<void>, TODO>>; // TODO(koan) @koan-error
type _D006 = Expect<Equal<ClassifySpecial<undefined>, TODO>>; // TODO(koan) @koan-error
type _D007 = Expect<Equal<ClassifySpecial<null>, TODO>>; // TODO(koan) @koan-error
type _D008 = Expect<Equal<ClassifySpecial<object>, TODO>>; // TODO(koan) @koan-error
type _D009 = Expect<Equal<ClassifySpecial<any | number>, TODO>>; // TODO(koan) @koan-error
type _D010 = Expect<Equal<ClassifySpecial<unknown | string>, TODO>>; // TODO(koan) @koan-error
type _D011 = Expect<Equal<ClassifySpecial<never | boolean>, TODO>>; // TODO(koan) @koan-error
type _D012 = Expect<Equal<ClassifySpecial<never & boolean>, TODO>>; // TODO(koan) @koan-error

// Group 2: Separate a special type from a container holding that type.
// Variation: direct detector inputs, absorbed expressions, and arrays.

type _D013 = Expect<Equal<IsAny<any>, TODO>>; // TODO(koan) @koan-error
type _D014 = Expect<Equal<IsAny<unknown>, TODO>>; // TODO(koan) @koan-error
type _D015 = Expect<Equal<IsAny<never>, TODO>>; // TODO(koan) @koan-error
type _D016 = Expect<Equal<IsAny<any & string>, TODO>>; // TODO(koan) @koan-error
type _D017 = Expect<Equal<IsAny<any | string>, TODO>>; // TODO(koan) @koan-error
type _D018 = Expect<Equal<IsAny<any[]>, TODO>>; // TODO(koan) @koan-error
type _D019 = Expect<Equal<IsUnknown<unknown>, TODO>>; // TODO(koan) @koan-error
type _D020 = Expect<Equal<IsUnknown<any>, TODO>>; // TODO(koan) @koan-error
type _D021 = Expect<Equal<IsUnknown<never>, TODO>>; // TODO(koan) @koan-error
type _D022 = Expect<Equal<IsUnknown<unknown | string>, TODO>>; // TODO(koan) @koan-error
type _D023 = Expect<Equal<IsNever<never>, TODO>>; // TODO(koan) @koan-error
type _D024 = Expect<Equal<IsNever<never[]>, TODO>>; // TODO(koan) @koan-error

// Group 3: Follow assignability from Source to Target.
// Variation: top/bottom direction, nullish values, and mutable containers.

type _D025 = Expect<Equal<IsAssignable<string, unknown>, TODO>>; // TODO(koan) @koan-error
type _D026 = Expect<Equal<IsAssignable<number, unknown>, TODO>>; // TODO(koan) @koan-error
type _D027 = Expect<Equal<IsAssignable<null, unknown>, TODO>>; // TODO(koan) @koan-error
type _D028 = Expect<Equal<IsAssignable<undefined, unknown>, TODO>>; // TODO(koan) @koan-error
type _D029 = Expect<Equal<IsAssignable<{ id: string }, unknown>, TODO>>; // TODO(koan) @koan-error
type _D030 = Expect<Equal<IsAssignable<unknown, unknown>, TODO>>; // TODO(koan) @koan-error
type _D031 = Expect<Equal<IsAssignable<unknown, string>, TODO>>; // TODO(koan) @koan-error
type _D032 = Expect<Equal<IsAssignable<unknown, {}>, TODO>>; // TODO(koan) @koan-error
type _D033 = Expect<Equal<IsAssignable<unknown, object>, TODO>>; // TODO(koan) @koan-error
type _D034 = Expect<Equal<IsAssignable<{}, unknown>, TODO>>; // TODO(koan) @koan-error
type _D035 = Expect<Equal<IsAssignable<never, string>, TODO>>; // TODO(koan) @koan-error
type _D036 = Expect<Equal<IsAssignable<never, unknown>, TODO>>; // TODO(koan) @koan-error
type _D037 = Expect<Equal<IsAssignable<never, never>, TODO>>; // TODO(koan) @koan-error
type _D038 = Expect<Equal<IsAssignable<string, never>, TODO>>; // TODO(koan) @koan-error
type _D039 = Expect<Equal<IsAssignable<unknown[], readonly unknown[]>, TODO>>; // TODO(koan) @koan-error
type _D040 = Expect<Equal<IsAssignable<readonly unknown[], unknown[]>, TODO>>; // TODO(koan) @koan-error

// Group 4: Simplify unions containing a special type.
// Variation: never as identity, unknown as absorber, and any as escape hatch.

type _D041 = Expect<Equal<string | never, TODO>>; // TODO(koan) @koan-error
type _D042 = Expect<Equal<number | never, TODO>>; // TODO(koan) @koan-error
type _D043 = Expect<Equal<null | never, TODO>>; // TODO(koan) @koan-error
type _D044 = Expect<Equal<undefined | never, TODO>>; // TODO(koan) @koan-error
type _D045 = Expect<Equal<ClassifySpecial<string | unknown>, TODO>>; // TODO(koan) @koan-error
type _D046 = Expect<Equal<ClassifySpecial<unknown | never>, TODO>>; // TODO(koan) @koan-error
type _D047 = Expect<Equal<ClassifySpecial<string | any>, TODO>>; // TODO(koan) @koan-error
type _D048 = Expect<Equal<ClassifySpecial<unknown | any>, TODO>>; // TODO(koan) @koan-error
type _D049 = Expect<Equal<ClassifySpecial<never | any>, TODO>>; // TODO(koan) @koan-error
type _D050 = Expect<Equal<ClassifySpecial<true | false>, TODO>>; // TODO(koan) @koan-error
type _D051 = Expect<Equal<ClassifySpecial<never | never>, TODO>>; // TODO(koan) @koan-error
type _D052 = Expect<Equal<unknown | unknown, TODO>>; // TODO(koan) @koan-error
type _D053 = Expect<Equal<ClassifySpecial<(string | unknown) | never>, TODO>>; // TODO(koan) @koan-error
type _D054 = Expect<Equal<ClassifySpecial<(string | never) | any>, TODO>>; // TODO(koan) @koan-error

// Group 5: Simplify intersections containing a special type.
// Variation: unknown as identity, never as annihilator, and any propagation.

type _D055 = Expect<Equal<string & unknown, TODO>>; // TODO(koan) @koan-error
type _D056 = Expect<Equal<number & unknown, TODO>>; // TODO(koan) @koan-error
type _D057 = Expect<Equal<{ id: string } & unknown, TODO>>; // TODO(koan) @koan-error
type _D058 = Expect<Equal<ClassifySpecial<string & any>, TODO>>; // TODO(koan) @koan-error
type _D059 = Expect<Equal<ClassifySpecial<unknown & any>, TODO>>; // TODO(koan) @koan-error
type _D060 = Expect<Equal<ClassifySpecial<unknown & never>, TODO>>; // TODO(koan) @koan-error
type _D061 = Expect<Equal<ClassifySpecial<any & never>, TODO>>; // TODO(koan) @koan-error
type _D062 = Expect<Equal<null & unknown, TODO>>; // TODO(koan) @koan-error
type _D063 = Expect<Equal<undefined & unknown, TODO>>; // TODO(koan) @koan-error
type _D064 = Expect<Equal<object & unknown, TODO>>; // TODO(koan) @koan-error
type _D065 = Expect<Equal<[1, 2] & unknown, TODO>>; // TODO(koan) @koan-error
type _D066 = Expect<Equal<ClassifySpecial<Date & unknown>, TODO>>; // TODO(koan) @koan-error
type _D067 = Expect<Equal<ClassifySpecial<(string & unknown) & never>, TODO>>; // TODO(koan) @koan-error
type _D068 = Expect<Equal<unknown & {}, TODO>>; // TODO(koan) @koan-error

// Group 6: Track the element or result, not merely the outer container.
// Variation: arrays, promises, function returns, and rest-parameter elements.

type ReturnsAny = () => any;
type ReturnsUnknown = () => unknown;
type ReturnsNever = () => never;

type _D069 = Expect<Equal<ClassifySpecial<unknown[][number]>, TODO>>; // TODO(koan) @koan-error
type _D070 = Expect<Equal<ClassifySpecial<any[][number]>, TODO>>; // TODO(koan) @koan-error
type _D071 = Expect<Equal<ClassifySpecial<never[][number]>, TODO>>; // TODO(koan) @koan-error
type _D072 = Expect<Equal<ClassifySpecial<unknown[]>, TODO>>; // TODO(koan) @koan-error
type _D073 = Expect<Equal<ClassifySpecial<any[]>, TODO>>; // TODO(koan) @koan-error
type _D074 = Expect<Equal<ClassifySpecial<never[]>, TODO>>; // TODO(koan) @koan-error
type _D075 = Expect<Equal<ClassifySpecial<Awaited<Promise<unknown>>>, TODO>>; // TODO(koan) @koan-error
type _D076 = Expect<Equal<ClassifySpecial<Awaited<Promise<any>>>, TODO>>; // TODO(koan) @koan-error
type _D077 = Expect<Equal<ClassifySpecial<Awaited<Promise<never>>>, TODO>>; // TODO(koan) @koan-error
type _D078 = Expect<Equal<ClassifySpecial<ReturnType<ReturnsAny>>, TODO>>; // TODO(koan) @koan-error
type _D079 = Expect<Equal<ClassifySpecial<ReturnType<ReturnsUnknown>>, TODO>>; // TODO(koan) @koan-error
type _D080 = Expect<Equal<ClassifySpecial<ReturnType<ReturnsNever>>, TODO>>; // TODO(koan) @koan-error
