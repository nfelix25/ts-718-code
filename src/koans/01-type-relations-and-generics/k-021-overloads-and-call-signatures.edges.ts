import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  concatenate,
  convert,
  genericIdentity,
  lookup,
  makeDate,
  type DateFactory,
} from "./k-021-overloads-and-call-signatures.js";

/** K-021 edges: overload resolution handles one whole call and utility extraction reads the last signature. */

type Kind<T> = 0 extends 1 & T
  ? "any"
  : [T] extends [never]
    ? "never"
    : unknown extends T
      ? [keyof T] extends [never] ? "unknown" : "ordinary"
      : "ordinary";

// Group 1: The implementation signature is hidden and union arguments need one match.
const unionValue: string | number = Math.random() ? "a" : 1;
const finiteKey: "id" | "name" = Math.random() ? "id" : "name";
const e001 = convert("a");
const e002 = convert(1);
const e003 = lookup(finiteKey);
const e004 = lookup("other");
const e005 = concatenate([1], [2]);
const e006 = concatenate<string | number>([1], ["a"]);
declare const edgeAny: any;
const e007 = convert(edgeAny);
const e008 = lookup(edgeAny);
const e009 = convert(undefined as never);
const e010 = lookup(undefined as never);
type _E001 = Expect<Equal<typeof e001, TODO>>; // TODO(koan) @koan-error
type _E002 = Expect<Equal<typeof e002, TODO>>; // TODO(koan) @koan-error
type _E003 = Expect<Equal<Kind<typeof e003>, TODO>>; // TODO(koan) @koan-error
type _E004 = Expect<Equal<Kind<typeof e004>, TODO>>; // TODO(koan) @koan-error
type _E005 = Expect<Equal<typeof e005, TODO>>; // TODO(koan) @koan-error
type _E006 = Expect<Equal<typeof e006, TODO>>; // TODO(koan) @koan-error
type _E007 = Expect<Equal<typeof e007, TODO>>; // TODO(koan) @koan-error
type _E008 = Expect<Equal<Kind<typeof e008>, TODO>>; // TODO(koan) @koan-error
type _E009 = Expect<Equal<typeof e009, TODO>>; // TODO(koan) @koan-error
type _E010 = Expect<Equal<typeof e010, TODO>>; // TODO(koan) @koan-error

// Demonstration A: the broad lookup overload accepts the union key but exposes
// unknown; overload resolution does not union the two earlier return types.
type _SolvedUnionFallback = Expect<Equal<Kind<typeof e003>, "unknown">>;
// Demonstration B: any and never are applicable to the first overload, so ordered
// resolution selects its number result for convert.
type _SolvedAnyFirst = Expect<Equal<typeof e007, number>>;
type _SolvedNeverFirst = Expect<Equal<typeof e009, number>>;

// @ts-expect-error Neither public convert overload accepts the whole union.
convert(unionValue);
// @ts-expect-error The implementation's union signature is not public.
convert(true);
// @ts-expect-error The string and array overloads cannot be mixed.
concatenate("a", ["b"]);

// Group 2: Last-signature extraction differs from resolving a call.
type E011 = Parameters<typeof convert>;
type E012 = ReturnType<typeof convert>;
type E013 = Parameters<typeof concatenate>;
type E014 = ReturnType<typeof concatenate>;
type E015 = Parameters<typeof lookup>;
type E016 = ReturnType<typeof lookup>;
type E017 = Parameters<DateFactory>;
type E018 = ReturnType<DateFactory>;
type E019 = Parameters<typeof makeDate>;
type E020 = ReturnType<typeof makeDate>;
type _E011 = Expect<Equal<E011, TODO>>; // TODO(koan) @koan-error
type _E012 = Expect<Equal<E012, TODO>>; // TODO(koan) @koan-error
type _E013 = Expect<Equal<E013, TODO>>; // TODO(koan) @koan-error
type _E014 = Expect<Equal<E014, TODO>>; // TODO(koan) @koan-error
type _E015 = Expect<Equal<E015, TODO>>; // TODO(koan) @koan-error
type _E016 = Expect<Equal<Kind<E016>, TODO>>; // TODO(koan) @koan-error
type _E017 = Expect<Equal<E017, TODO>>; // TODO(koan) @koan-error
type _E018 = Expect<Equal<E018, TODO>>; // TODO(koan) @koan-error
type _E019 = Expect<Equal<E019, TODO>>; // TODO(koan) @koan-error
type _E020 = Expect<Equal<E020, TODO>>; // TODO(koan) @koan-error

// Demonstration C: convert's last public overload is number -> string.
type _SolvedConvertParameters = Expect<Equal<E011, [value: number]>>;
type _SolvedConvertReturn = Expect<Equal<E012, string>>;
// Demonstration D: lookup's last public overload is the broad string -> unknown
// fallback, regardless of earlier literal overloads.
type _SolvedLookupParameters = Expect<Equal<E015, [key: string]>>;
type _SolvedLookupReturn = Expect<Equal<Kind<E016>, "unknown">>;
// Demonstration E: an overloaded callable interface follows the same last-signature rule.
type _SolvedFactoryParameters = Expect<Equal<E017, [iso: string]>>;
type _SolvedFactoryReturn = Expect<Equal<E018, Date>>;

// Group 3: Call/construct signatures and order are structural contracts.
interface CallableCounter {
  (step?: number): number;
  count: number;
}

interface ConstructableBox {
  new <T>(value: T): { value: T };
}

function firstSpecific(value: "a"): 1;
function firstSpecific(value: string): 2;
function firstSpecific(value: string): 1 | 2 { return value === "a" ? 1 : 2; }

function broadFirst(value: string): 2;
function broadFirst(value: "a"): 1;
function broadFirst(value: string): 1 | 2 { return value === "a" ? 1 : 2; }

const e021 = firstSpecific("a");
const e022 = firstSpecific("b");
const e023 = broadFirst("a");
const e024 = genericIdentity;
const e025: <T>(value: T) => T = e024;
declare const BoxConstructor: ConstructableBox;
const e026 = new BoxConstructor(1);
const e027 = new BoxConstructor("a");
declare const counter: CallableCounter;
const e028 = counter();
const e029 = counter(2);
const e030 = counter.count;
type _E021 = Expect<Equal<typeof e021, TODO>>; // TODO(koan) @koan-error
type _E022 = Expect<Equal<typeof e022, TODO>>; // TODO(koan) @koan-error
type _E023 = Expect<Equal<typeof e023, TODO>>; // TODO(koan) @koan-error
type _E024 = Expect<Equal<typeof e024, TODO>>; // TODO(koan) @koan-error
type _E025 = Expect<Equal<typeof e025, TODO>>; // TODO(koan) @koan-error
type _E026 = Expect<Equal<typeof e026, TODO>>; // TODO(koan) @koan-error
type _E027 = Expect<Equal<typeof e027, TODO>>; // TODO(koan) @koan-error
type _E028 = Expect<Equal<typeof e028, TODO>>; // TODO(koan) @koan-error
type _E029 = Expect<Equal<typeof e029, TODO>>; // TODO(koan) @koan-error
type _E030 = Expect<Equal<typeof e030, TODO>>; // TODO(koan) @koan-error

// Demonstration F: the literal overload is more specific and wins even when the
// broad string overload appears first. Source order matters when applicability
// and specificity do not otherwise distinguish the candidates.
type _SolvedSpecificFirst = Expect<Equal<typeof e021, 1>>;
type _SolvedBroadFirst = Expect<Equal<typeof e023, 1>>;
// Demonstration G: construct signatures can be generic per construction.
type _SolvedConstructNumber = Expect<Equal<typeof e026, { value: number }>>;
type _SolvedConstructString = Expect<Equal<typeof e027, { value: string }>>;
// Demonstration H: callable object types can carry properties alongside calls.
type _SolvedCallableProperty = Expect<Equal<typeof e030, number>>;
