import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  chooseMember,
  mapField,
  pickerFor,
  pickFields,
  pickFieldsDefault,
  writeField,
} from "./k-022-partial-inference-and-correlation-capstone.js";

/** K-022 edges: defaults, empty evidence, and union keys can silently broaden an API surface. */

type Kind<T> = 0 extends 1 & T
  ? "any"
  : [T] extends [never]
    ? "never"
    : unknown extends T
      ? [keyof T] extends [never] ? "unknown" : "ordinary"
      : "ordinary";

interface User { id: number; name: string; active: boolean; }
const user: User = { id: 1, name: "Ada", active: true };

// Group 1: Omitted rest evidence and defaulted slots broaden differently.
const e001 = pickFields(user);
const e002 = pickFields<User, never>(user);
const e003 = pickFieldsDefault(user, "id");
const e004 = pickFieldsDefault<User>(user, "id");
const e005 = pickFieldsDefault<User, "id">(user, "id");
const e006 = pickFieldsDefault<User>(user);
const e007 = pickerFor<User>()(user);
const emptyKeys = [] as const;
const e008 = pickFields(user, ...emptyKeys);
const e009 = pickerFor<User>()(user, ...emptyKeys);
const broadKey: keyof User = "id";
const e010 = pickFields(user, broadKey);
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

// Demonstration A: omitting a generic rest argument provides no K candidate, so
// K falls back to its constraint and the result is the full object view.
type _SolvedOmittedKeys = Expect<Equal<typeof e001, Pick<User, keyof User>>>;
// Demonstration B: explicitly spreading an empty const tuple has the same lack of
// element candidates for this rest parameter; explicit never is required for {}.
type _SolvedEmptySpread = Expect<Equal<typeof e008, Pick<User, keyof User>>>;
type _SolvedExplicitNever = Expect<Equal<typeof e002, Pick<User, never>>>;
// Demonstration C: after explicit T, default K is substituted instead of inferred.
type _SolvedDefaultTrap = Expect<Equal<typeof e004, Pick<User, keyof User>>>;
type _SolvedExplicitK = Expect<Equal<typeof e005, Pick<User, "id">>>;

// @ts-expect-error pickFields has two required type parameters; T alone is not partial inference.
pickFields<User>(user, "id");

// Group 2: A union key preserves read unions but weakens write correlation.
const unionKey: "id" | "name" = Math.random() ? "id" : "name";
const e011 = mapField(user, unionKey, (value) => value);
const e012 = mapField(user, unionKey, String);
const e013 = pickFields(user, unionKey);
writeField(user, unionKey, 2);
writeField(user, unionKey, "Grace");
const e014 = unionKey;
const e015 = user.id;
const e016 = user.name;
const literalId = "id" as const;
writeField(user, literalId, 3);
const e017 = mapField(user, literalId, (value) => value.toFixed());
const currentKey: "id" | "name" = "id";
const e018 = mapField(user, currentKey, (value) => value.toFixed());
const e019 = pickFields(user, currentKey);
const e020 = pickFieldsDefault<User>(user, currentKey);
type _E011 = Expect<Equal<typeof e011, TODO>>; // TODO(koan) @koan-error
type _E012 = Expect<Equal<typeof e012, TODO>>; // TODO(koan) @koan-error
type _E013 = Expect<Equal<typeof e013, TODO>>; // TODO(koan) @koan-error
type _E014 = Expect<Equal<typeof e014, TODO>>; // TODO(koan) @koan-error
type _E015 = Expect<Equal<typeof e015, TODO>>; // TODO(koan) @koan-error
type _E016 = Expect<Equal<typeof e016, TODO>>; // TODO(koan) @koan-error
type _E017 = Expect<Equal<typeof e017, TODO>>; // TODO(koan) @koan-error
type _E018 = Expect<Equal<typeof e018, TODO>>; // TODO(koan) @koan-error
type _E019 = Expect<Equal<typeof e019, TODO>>; // TODO(koan) @koan-error
type _E020 = Expect<Equal<typeof e020, TODO>>; // TODO(koan) @koan-error

// Demonstration D: T[K] for a union key is the union of both value types, which
// is ideal for reads but lets either value accompany either runtime key on writes.
type _SolvedUnionRead = Expect<Equal<typeof e011, string | number>>;
// Demonstration E: a current const key is narrowed before generic inference.
type _SolvedCurrentKey = Expect<Equal<typeof e018, string>>;
type _SolvedCurrentPick = Expect<Equal<typeof e019, Pick<User, "id">>>;
// Demonstration F: explicit T plus default K still exposes every field even when
// the runtime key expression is currently one literal.
type _SolvedCurrentDefault = Expect<Equal<typeof e020, Pick<User, keyof User>>>;

// @ts-expect-error Literal id retains its number correlation.
writeField(user, "id", "wrong");

// Group 3: Domain validation, object unions, and special types test API boundaries.
const e021 = chooseMember(["a", "b"] as const, "a");
const broadChoices: string[] = ["a"];
const e022 = chooseMember(broadChoices, "outside");
declare const edgeAny: any;
const e023 = chooseMember(edgeAny, "outside");
const e024 = mapField(edgeAny, "anything", (value) => value);
const e025 = pickFields(edgeAny, "anything");
const unknownValue: unknown = {};
const neverValue = undefined as never;
const e026 = pickFields(neverValue);
const unionObject = {} as { shared: string; left: number } | { shared: string; right: boolean };
const e027 = pickFields(unionObject, "shared");
const e028 = mapField(unionObject, "shared", (value) => value.length);
const e029 = pickerFor<typeof unionObject>()(unionObject, "shared");
const e030 = pickFields<Record<string, number>, string>({ a: 1 }, "missing");
type _E021 = Expect<Equal<typeof e021, TODO>>; // TODO(koan) @koan-error
type _E022 = Expect<Equal<typeof e022, TODO>>; // TODO(koan) @koan-error
type _E023 = Expect<Equal<Kind<typeof e023>, TODO>>; // TODO(koan) @koan-error
type _E024 = Expect<Equal<Kind<typeof e024>, TODO>>; // TODO(koan) @koan-error
type _E025 = Expect<Equal<typeof e025, TODO>>; // TODO(koan) @koan-error
type _E026 = Expect<Equal<typeof e026, TODO>>; // TODO(koan) @koan-error
type _E027 = Expect<Equal<typeof e027, TODO>>; // TODO(koan) @koan-error
type _E028 = Expect<Equal<typeof e028, TODO>>; // TODO(koan) @koan-error
type _E029 = Expect<Equal<typeof e029, TODO>>; // TODO(koan) @koan-error
type _E030 = Expect<Equal<typeof e030, TODO>>; // TODO(koan) @koan-error

// Demonstration G: a broad choice collection admits any string fallback, while
// the const tuple keeps the finite member union.
type _SolvedFiniteChoice = Expect<Equal<typeof e021, "a" | "b">>;
type _SolvedBroadChoice = Expect<Equal<typeof e022, string>>;
// Demonstration H: object-union APIs expose only keys common to every alternative.
type _SolvedUnionObjectPick = Expect<Equal<typeof e027, Pick<typeof unionObject, "shared">>>;
// Demonstration I: a string index signature accepts absent runtime keys statically;
// noUncheckedIndexedAccess is a runtime-expression concern outside this return type.
type _SolvedIndexSignature = Expect<Equal<typeof e030, Record<string, number>>>;

// @ts-expect-error NoInfer checks fallback against the tuple-derived domain.
chooseMember(["a", "b"] as const, "c");
// @ts-expect-error unknown guarantees no keys for projection.
pickFields(unknownValue, "anything");
// @ts-expect-error Member-specific keys are unavailable on the object union.
pickFields(unionObject, "left");
