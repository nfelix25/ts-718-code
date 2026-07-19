import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  addTimestamp,
  identifiedView,
  lengthOf,
  preserveIdentified,
  preserveKind,
} from "./k-008-generic-constraints.js";

/** K-008 edges: a bound is a gate, not a cast and not necessarily a result view. */

type Kind<T> = 0 extends 1 & T
  ? "any"
  : [T] extends [never]
    ? "never"
    : unknown extends T
      ? [keyof T] extends [never] ? "unknown" : "ordinary"
      : "ordinary";

// Group 1: Structural details decide whether a candidate clears the gate.
const e001 = preserveIdentified({ id: "a", extra: true });
const storedRich = { id: "a", extra: true };
const e002 = preserveIdentified(storedRich);
const e003 = preserveIdentified({ id: "a" } as { readonly id: string });
const e004 = preserveIdentified({ get id() { return "a"; } });
const e005 = preserveIdentified(Object.create(null) as { id: string; raw: true });
const e006 = lengthOf({ length: 0, id: "empty" });
const e007 = lengthOf("" as string & { readonly marker?: never });
const e008 = identifiedView({ id: "fixed" } as const);
const e009 = preserveIdentified({ id: "fixed" } as const);
const e010 = preserveIdentified<{ id: string } & { active: true }>({ id: "a", active: true });
type _E001 = Expect<Equal<typeof e001, TODO>>; // TODO(koan) @koan-error
type _E002 = Expect<Equal<typeof e002, TODO>>; // TODO(koan) @koan-error
type _E003 = Expect<Equal<typeof e003, TODO>>; // TODO(koan) @koan-error
type _E004 = Expect<Equal<typeof e004, TODO>>; // TODO(koan) @koan-error
type _E005 = Expect<Equal<typeof e005, TODO>>; // TODO(koan) @koan-error
type _E006 = Expect<Equal<typeof e006, TODO>>; // TODO(koan) @koan-error
type _E007 = Expect<Equal<typeof e007, TODO>>; // TODO(koan) @koan-error
type _E008 = Expect<Equal<typeof e008, TODO>>; // TODO(koan) @koan-error
type _E009 = Expect<Equal<typeof e009, TODO>>; // TODO(koan) @koan-error
type _E010 = Expect<Equal<typeof e010, TODO>>; // TODO(koan) @koan-error

// Demonstration A: fresh extra properties are captured by T because the target
// is a type parameter, so the result retains the richer structural candidate.
type _SolvedFreshRich = Expect<Equal<typeof e001, { id: string; extra: boolean }>>;
// Demonstration B: readonly id can satisfy a readable mutable-looking bound;
// TypeScript's object-property assignability is deliberately permissive here.
type _SolvedReadonlyBound = Expect<Equal<typeof e003, { readonly id: string }>>;
// Demonstration C: choosing the bound as the return view erases the literal,
// whereas returning T keeps it.
type _SolvedBoundView = Expect<Equal<typeof e008, { id: string }>>;
type _SolvedSubtypeView = Expect<Equal<typeof e009, { readonly id: "fixed" }>>;

// @ts-expect-error The bound requires id to exist.
preserveIdentified({ active: true });
// @ts-expect-error An optional id does not guarantee a string id is present.
preserveIdentified({} as { id?: string });
// @ts-expect-error Bounds check assignability; they do not coerce number to string.
preserveIdentified({ id: 1 });
// @ts-expect-error A union candidate must satisfy the bound in every branch.
preserveIdentified({} as { id: string } | { name: string });

// Group 2: {}, object, and the special types draw surprising boundaries.
function acceptsNonNullish<T extends {}>(value: T): T {
  return value;
}

function acceptsObject<T extends object>(value: T): T {
  return value;
}

const e011 = acceptsNonNullish("text");
const e012 = acceptsNonNullish(42);
const e013 = acceptsNonNullish(true);
const e014 = acceptsObject({ id: 1 });
const e015 = acceptsObject([1, 2]);
const e016 = acceptsObject(() => 1);
declare const edgeAny: any;
const e017 = preserveIdentified(edgeAny);
declare const edgeNever: never;
const e018 = preserveIdentified(edgeNever);
const e019 = addTimestamp(edgeAny, new Date(0));
const e020 = acceptsObject(edgeNever);
type _E011 = Expect<Equal<typeof e011, TODO>>; // TODO(koan) @koan-error
type _E012 = Expect<Equal<typeof e012, TODO>>; // TODO(koan) @koan-error
type _E013 = Expect<Equal<typeof e013, TODO>>; // TODO(koan) @koan-error
type _E014 = Expect<Equal<typeof e014, TODO>>; // TODO(koan) @koan-error
type _E015 = Expect<Equal<typeof e015, TODO>>; // TODO(koan) @koan-error
type _E016 = Expect<Equal<typeof e016, TODO>>; // TODO(koan) @koan-error
type _E017 = Expect<Equal<Kind<typeof e017>, TODO>>; // TODO(koan) @koan-error
type _E018 = Expect<Equal<Kind<typeof e018>, TODO>>; // TODO(koan) @koan-error
type _E019 = Expect<Equal<Kind<typeof e019>, TODO>>; // TODO(koan) @koan-error
type _E020 = Expect<Equal<Kind<typeof e020>, TODO>>; // TODO(koan) @koan-error

// Demonstration D: `{}` means non-nullish, so primitives satisfy it.
type _SolvedEmptyObjectString = Expect<Equal<typeof e011, "text">>;
type _SolvedEmptyObjectNumber = Expect<Equal<typeof e012, 42>>;
// Demonstration E: `object` excludes primitives but includes arrays and functions.
type _SolvedObjectArray = Expect<Equal<typeof e015, number[]>>;
type _SolvedObjectFunction = Expect<Equal<typeof e016, () => 1>>;
// Demonstration F: any bypasses the gate and contaminates a return of T.
type _SolvedAnyGate = Expect<Equal<Kind<typeof e017>, "any">>;
// Demonstration G: never is assignable to every constraint and remains never.
type _SolvedNeverGate = Expect<Equal<Kind<typeof e018>, "never">>;

// @ts-expect-error object rejects primitive strings.
acceptsObject("text");
// @ts-expect-error {} excludes null under strict null checks.
acceptsNonNullish(null);
// @ts-expect-error unknown does not promise the required id member.
preserveIdentified(undefined as unknown);

// Group 3: Constraint-driven literal inference still depends on evidence and view.
function constrainedString<T extends string>(value: T): T {
  return value;
}

function constrainedNumber<T extends number>(value: T): T {
  return value;
}

const e021 = constrainedString("ready");
const edgeString: string = "ready";
const e022 = constrainedString(edgeString);
const e023 = constrainedString<"ready" | "waiting">("ready");
const e024 = constrainedNumber(1);
const edgeNumber: number = 1;
const e025 = constrainedNumber(edgeNumber);
const e026 = preserveKind(Math.random() ? "created" : "updated");
const e027 = preserveKind<"created" | "updated">("created");
const e028 = identifiedView({ id: "a", nested: { exact: true } } as const);
const e029 = preserveIdentified({ id: "a", nested: { exact: true } } as const);
const e030 = addTimestamp({ createdAt: "old", id: 1 }, new Date(0));
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

// Demonstration H: a primitive constraint can provide a literal-preserving
// inference context, but a previously widened variable has already lost it.
type _SolvedConstrainedLiteral = Expect<Equal<typeof e021, "ready">>;
type _SolvedWidenedEvidence = Expect<Equal<typeof e022, string>>;
// Demonstration I: explicit arguments can deliberately select the whole family.
type _SolvedExplicitFamily = Expect<Equal<typeof e023, "ready" | "waiting">>;
// Demonstration J: returning the bound and returning T differ recursively too.
type _SolvedNestedErased = Expect<Equal<typeof e028, { id: string }>>;
type _SolvedNestedPreserved = Expect<
  Equal<typeof e029, { readonly id: "a"; readonly nested: { readonly exact: true } }>
>;
// Demonstration K: intersecting conflicting property types retains the
// unsimplified intersection rather than eagerly rewriting the property to never.
type _SolvedOverwrittenIntersection = Expect<Equal<typeof e030.createdAt, string & Date>>;

// @ts-expect-error Explicit type arguments must satisfy their constraint.
constrainedString<number>(1);
// @ts-expect-error The union bound does not convert an arbitrary string.
preserveKind("deleted");
