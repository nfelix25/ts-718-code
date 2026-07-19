import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  collectDefault,
  constrainedOption,
  createRegistry,
  defaultPair,
  optionalValue,
} from "./k-012-generic-defaults.js";

/** K-012 edges: defaults fill missing type arguments; they never replace evidence. */

type Kind<T> = 0 extends 1 & T
  ? "any"
  : [T] extends [never]
    ? "never"
    : unknown extends T
      ? [keyof T] extends [never] ? "unknown" : "ordinary"
      : "ordinary";

// Group 1: Explicit undefined, null, special types, and empty evidence.
const e001 = optionalValue();
const e002 = optionalValue(undefined);
const e003 = optionalValue(null);
const e004 = optionalValue<undefined>();
const e005 = optionalValue<never>();
declare const edgeAny: any;
const e006 = optionalValue(edgeAny);
declare const edgeUnknown: unknown;
const e007 = optionalValue(edgeUnknown);
const e008 = collectDefault();
const e009 = collectDefault<never>();
const e010 = collectDefault<unknown>();
type _E001 = Expect<Equal<typeof e001, TODO>>; // TODO(koan) @koan-error
type _E002 = Expect<Equal<typeof e002, TODO>>; // TODO(koan) @koan-error
type _E003 = Expect<Equal<typeof e003, TODO>>; // TODO(koan) @koan-error
type _E004 = Expect<Equal<typeof e004, TODO>>; // TODO(koan) @koan-error
type _E005 = Expect<Equal<Kind<Exclude<typeof e005, undefined>>, TODO>>; // TODO(koan) @koan-error
type _E006 = Expect<Equal<Kind<typeof e006>, TODO>>; // TODO(koan) @koan-error
type _E007 = Expect<Equal<Kind<Exclude<typeof e007, undefined>>, TODO>>; // TODO(koan) @koan-error
type _E008 = Expect<Equal<typeof e008, TODO>>; // TODO(koan) @koan-error
type _E009 = Expect<Equal<typeof e009, TODO>>; // TODO(koan) @koan-error
type _E010 = Expect<Equal<typeof e010, TODO>>; // TODO(koan) @koan-error

// Demonstration A: passing undefined supplies an inference candidate; the string
// default is used only when the argument is omitted entirely.
type _SolvedOmittedDefault = Expect<Equal<typeof e001, string | undefined>>;
type _SolvedUndefinedCandidate = Expect<Equal<typeof e002, undefined>>;
// Demonstration B: a `never | undefined` result normalizes to undefined.
type _SolvedNeverOptional = Expect<Equal<typeof e005, undefined>>;
// Demonstration C: any contaminates the whole union result, while unknown absorbs
// undefined into the safe top type.
type _SolvedAnyCandidate = Expect<Equal<Kind<typeof e006>, "any">>;
type _SolvedUnknownCandidate = Expect<Equal<Kind<typeof e007>, "unknown">>;
// Demonstration D: the no-argument rest call has no candidates and uses never.
type _SolvedEmptyDefault = Expect<Equal<typeof e008, never[]>>;

// Group 2: A dependent default observes the final earlier argument.
const e011 = defaultPair();
const e012 = defaultPair(undefined);
const e013 = defaultPair(null);
const e014 = defaultPair<"a" | "b">();
const e015 = defaultPair<"a" | "b">("a");
const e016 = defaultPair<"a" | "b", number>("a");
const e017 = defaultPair<never>();
const e018 = defaultPair<unknown>();
const e019 = defaultPair<any>();
const e020 = defaultPair<string, undefined>("a", undefined);
type _E011 = Expect<Equal<typeof e011, TODO>>; // TODO(koan) @koan-error
type _E012 = Expect<Equal<typeof e012, TODO>>; // TODO(koan) @koan-error
type _E013 = Expect<Equal<typeof e013, TODO>>; // TODO(koan) @koan-error
type _E014 = Expect<Equal<typeof e014, TODO>>; // TODO(koan) @koan-error
type _E015 = Expect<Equal<typeof e015, TODO>>; // TODO(koan) @koan-error
type _E016 = Expect<Equal<typeof e016, TODO>>; // TODO(koan) @koan-error
type _E017 = Expect<Equal<typeof e017, TODO>>; // TODO(koan) @koan-error
type _E018 = Expect<Equal<typeof e018, TODO>>; // TODO(koan) @koan-error
type _E019 = Expect<Equal<Kind<typeof e019[0]>, TODO>>; // TODO(koan) @koan-error
type _E020 = Expect<Equal<typeof e020, TODO>>; // TODO(koan) @koan-error

// Demonstration E: after First is inferred as undefined, Second's default is
// that same type; neither slot falls back to string.
type _SolvedDependentUndefined = Expect<Equal<typeof e012, [undefined, undefined]>>;
// Demonstration F: an explicit first union is used unchanged by the dependent
// second default, even if the runtime first argument is one member.
type _SolvedExplicitDependent = Expect<
  Equal<typeof e015, ["a" | "b" | undefined, "a" | "b" | undefined]>
>;
// Demonstration G: an independently explicit second slot replaces its default.
type _SolvedSecondOverride = Expect<
  Equal<typeof e016, ["a" | "b" | undefined, number | undefined]>
>;

// Group 3: Defaults must be legal declarations and constraints still reject calls.
type Container<Value = unknown> = { value: Value };
type Pair<Left = string, Right = Left> = [Left, Right];
type Constrained<Value extends PropertyKey = string> = Map<Value, unknown>;
type E021 = Container;
type E022 = Container<number>;
type E023 = Pair;
type E024 = Pair<number>;
type E025 = Pair<number, string>;
type E026 = Constrained;
type E027 = Constrained<"id">;
const e028 = createRegistry<never>();
const e029 = constrainedOption();
const e030 = constrainedOption<{ mode: string; extra: boolean }>();
type _E021 = Expect<Equal<E021, TODO>>; // TODO(koan) @koan-error
type _E022 = Expect<Equal<E022, TODO>>; // TODO(koan) @koan-error
type _E023 = Expect<Equal<E023, TODO>>; // TODO(koan) @koan-error
type _E024 = Expect<Equal<E024, TODO>>; // TODO(koan) @koan-error
type _E025 = Expect<Equal<E025, TODO>>; // TODO(koan) @koan-error
type _E026 = Expect<Equal<E026, TODO>>; // TODO(koan) @koan-error
type _E027 = Expect<Equal<E027, TODO>>; // TODO(koan) @koan-error
type _E028 = Expect<Equal<typeof e028, TODO>>; // TODO(koan) @koan-error
type _E029 = Expect<Equal<typeof e029, TODO>>; // TODO(koan) @koan-error
type _E030 = Expect<Equal<typeof e030, TODO>>; // TODO(koan) @koan-error

// Demonstration H: omitted aliases substitute defaults recursively.
type _SolvedContainerDefault = Expect<Equal<E021, { value: unknown }>>;
type _SolvedPairDefault = Expect<Equal<E023, [string, string]>>;
type _SolvedPairDependent = Expect<Equal<E024, [number, number]>>;
// Demonstration I: a constrained default is checked at declaration time and is
// then available exactly like an explicitly valid argument.
type _SolvedConstrainedAlias = Expect<Equal<E026, Map<string, unknown>>>;
// Demonstration J: never satisfies the PropertyKey constraint and does not cause
// the declaration to fall back to string.
type _SolvedNeverRegistry = Expect<Equal<typeof e028, Map<never, unknown>>>;

// @ts-expect-error Inference found a candidate, and the constraint rejects it;
// the default is not retried as a fallback.
constrainedOption({ mode: 1 });
// @ts-expect-error Explicit type arguments must satisfy the key constraint.
createRegistry<object>();
// @ts-expect-error A required parameter cannot follow an optional defaulted one.
type InvalidOrder<Optional = string, Required> = [Optional, Required];
// @ts-expect-error A default must satisfy its own declared constraint.
type InvalidDefault<T extends string = number> = T;
