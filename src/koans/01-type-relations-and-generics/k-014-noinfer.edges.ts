import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  checkedDefault,
  createMachine,
  mapWithFallback,
  preferPrimary,
} from "./k-014-noinfer.js";

/** K-014 edges: blocking candidates does not block checking, context, or explicit choice. */

type Kind<T> = 0 extends 1 & T
  ? "any"
  : [T] extends [never]
    ? "never"
    : unknown extends T
      ? [keyof T] extends [never] ? "unknown" : "ordinary"
      : "ordinary";

function onlyBlocked<T>(value: NoInfer<T>): T {
  return value;
}

function blockedWithDefault<T = string>(value?: NoInfer<T>): T | undefined {
  return value;
}

function contextOrBlocked<T>(value: NoInfer<T>): T {
  return value;
}

// Group 1: With no candidate sites, inference uses unknown, a default, or context.
const e001 = onlyBlocked("a");
const e002 = onlyBlocked(1);
const e003 = onlyBlocked({ id: 1 });
const e004 = onlyBlocked<string>("a");
const e005 = blockedWithDefault();
const e006 = blockedWithDefault("a");
const e007 = blockedWithDefault<number>(1);
const e008: string = contextOrBlocked("a");
const e009: number = contextOrBlocked(1);
const e010: { id: number } = contextOrBlocked({ id: 1 });
type _E001 = Expect<Equal<Kind<typeof e001>, TODO>>; // TODO(koan) @koan-error
type _E002 = Expect<Equal<Kind<typeof e002>, TODO>>; // TODO(koan) @koan-error
type _E003 = Expect<Equal<Kind<typeof e003>, TODO>>; // TODO(koan) @koan-error
type _E004 = Expect<Equal<typeof e004, TODO>>; // TODO(koan) @koan-error
type _E005 = Expect<Equal<typeof e005, TODO>>; // TODO(koan) @koan-error
type _E006 = Expect<Equal<typeof e006, TODO>>; // TODO(koan) @koan-error
type _E007 = Expect<Equal<typeof e007, TODO>>; // TODO(koan) @koan-error
type _E008 = Expect<Equal<typeof e008, TODO>>; // TODO(koan) @koan-error
type _E009 = Expect<Equal<typeof e009, TODO>>; // TODO(koan) @koan-error
type _E010 = Expect<Equal<typeof e010, TODO>>; // TODO(koan) @koan-error

// Demonstration A: blocking the only site leaves unconstrained T as unknown.
type _SolvedOnlyBlocked = Expect<Equal<Kind<typeof e001>, "unknown">>;
// Demonstration B: a declared default supplies T when inference has no candidates,
// even when a compatible runtime argument appears only at the blocked site.
type _SolvedBlockedDefault = Expect<Equal<typeof e006, string | undefined>>;
// Demonstration C: the blocked value is still checked, so a number is rejected
// against the string default rather than used to infer number.
// @ts-expect-error number is not assignable to the selected default string.
blockedWithDefault(1);
// Demonstration D: expected return context can select T independently of the
// blocked input site.
type _SolvedContextChoice = Expect<Equal<typeof e008, string>>;

// Group 2: NoInfer is transparent after T has been selected.
type E011 = NoInfer<string>;
type E012 = NoInfer<"a" | "b">;
type E013 = NoInfer<{ id: number }>;
type E014 = NoInfer<never>;
type E015 = NoInfer<unknown>;
type E016 = NoInfer<any>;
const primary = { id: 1, name: "Ada" };
const e017 = preferPrimary(primary, { id: 2, name: "Grace" });
const e018 = preferPrimary<{ id: number }>(primary, { id: 2 });
const richOutputFallback = { value: 0, extra: true };
const e019 = mapWithFallback(1, (value) => ({ value }), richOutputFallback);
const e020 = checkedDefault<string>(["a"], "outside");
type _E011 = Expect<Equal<E011, TODO>>; // TODO(koan) @koan-error
type _E012 = Expect<Equal<E012, TODO>>; // TODO(koan) @koan-error
type _E013 = Expect<Equal<E013, TODO>>; // TODO(koan) @koan-error
type _E014 = Expect<Equal<Kind<E014>, TODO>>; // TODO(koan) @koan-error
type _E015 = Expect<Equal<Kind<E015>, TODO>>; // TODO(koan) @koan-error
type _E016 = Expect<Equal<Kind<E016>, TODO>>; // TODO(koan) @koan-error
type _E017 = Expect<Equal<typeof e017, TODO>>; // TODO(koan) @koan-error
type _E018 = Expect<Equal<typeof e018, TODO>>; // TODO(koan) @koan-error
type _E019 = Expect<Equal<typeof e019, TODO>>; // TODO(koan) @koan-error
type _E020 = Expect<Equal<typeof e020, TODO>>; // TODO(koan) @koan-error

// Demonstration E: NoInfer<T> is equal to T once instantiated; it is an inference
// marker rather than a wrapper visible to consumers.
type _SolvedTransparentString = Expect<Equal<E011, string>>;
type _SolvedTransparentUnion = Expect<Equal<E012, "a" | "b">>;
type _SolvedTransparentObject = Expect<Equal<E013, { id: number }>>;
// Demonstration F: explicit type arguments choose a deliberately broader public
// type before the fallback is checked.
type _SolvedExplicitPrimary = Expect<Equal<typeof e018, { id: number }>>;
// Demonstration G: structural excess members on a non-fresh generic checking
// site do not become part of Output because fallback contributes no candidate.
type _SolvedFallbackNotInOutput = Expect<Equal<typeof e019, { value: number }>>;

// Group 3: Multiple authoritative sites, const inference, and nested wrappers.
function authoritativePair<const T>(left: T, right: T, fallback: NoInfer<T>): T {
  return left ?? right ?? fallback;
}

function arrayAuthoritative<T>(values: readonly T[], fallback: NoInfer<T>): T {
  return values[0] ?? fallback;
}

const e021 = authoritativePair("a", "b", "a");
const e022 = authoritativePair(1, 2, 1);
const e023 = authoritativePair({ id: 1 }, { id: 2 }, { id: 1 });
const e024 = arrayAuthoritative([1, 2], 0);
const e025 = arrayAuthoritative(["a", "b"] as const, "a");
const e026 = arrayAuthoritative<string>([], "empty");
const e027 = createMachine({ states: ["a", "b"] as const, initial: "a" });
const e028 = createMachine<"a" | "b">({ states: ["a"], initial: "b" });
declare const edgeAny: any;
const e029 = preferPrimary(edgeAny, "fallback");
const e030 = preferPrimary<unknown>(1, edgeAny);
type _E021 = Expect<Equal<typeof e021, TODO>>; // TODO(koan) @koan-error
type _E022 = Expect<Equal<typeof e022, TODO>>; // TODO(koan) @koan-error
type _E023 = Expect<Equal<typeof e023, TODO>>; // TODO(koan) @koan-error
type _E024 = Expect<Equal<typeof e024, TODO>>; // TODO(koan) @koan-error
type _E025 = Expect<Equal<typeof e025, TODO>>; // TODO(koan) @koan-error
type _E026 = Expect<Equal<typeof e026, TODO>>; // TODO(koan) @koan-error
type _E027 = Expect<Equal<typeof e027, TODO>>; // TODO(koan) @koan-error
type _E028 = Expect<Equal<typeof e028, TODO>>; // TODO(koan) @koan-error
type _E029 = Expect<Equal<Kind<typeof e029>, TODO>>; // TODO(koan) @koan-error
type _E030 = Expect<Equal<Kind<typeof e030>, TODO>>; // TODO(koan) @koan-error

// Demonstration H: NoInfer blocks only fallback; every other T occurrence may
// still contribute candidates, here under const literal inference.
type _SolvedMultipleSources = Expect<Equal<typeof e021, "a" | "b">>;
// Demonstration I: a readonly array's element union supplies T through a nested
// candidate site, and fallback is checked against that union.
type _SolvedNestedSource = Expect<Equal<typeof e025, "a" | "b">>;
// Demonstration J: a non-blocked any source selects any; blocking a separate any
// fallback cannot clean it up.
type _SolvedAnyAuthority = Expect<Equal<Kind<typeof e029>, "any">>;
// Demonstration K: explicit unknown accepts an any fallback but remains unknown.
type _SolvedExplicitUnknown = Expect<Equal<Kind<typeof e030>, "unknown">>;

// @ts-expect-error Initial is validated against the states-derived domain.
createMachine({ states: ["idle", "running"] as const, initial: "stopped" });
// @ts-expect-error The fallback is checked after number is inferred from mapping.
mapWithFallback("1", Number, "zero");
