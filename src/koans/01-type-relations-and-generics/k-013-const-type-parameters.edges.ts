import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  captureConst,
  captureConstMutableArray,
  captureConstReadonlyArray,
  captureOrdinary,
  captureParts,
  defineRoutes,
} from "./k-013-const-type-parameters.js";

/** K-013 edges: const inference preserves available evidence; it cannot recreate lost evidence. */

// Group 1: Inline expressions and previously inferred variables take different paths.
const e001 = captureConst({ kind: "inline" });
const widenedObject = { kind: "variable" };
const e002 = captureConst(widenedObject);
const preservedObject = { kind: "preserved" } as const;
const e003 = captureOrdinary(preservedObject);
const e004 = captureConst(preservedObject);
const e005 = captureConst(["inline", 1]);
const widenedArray = ["variable", 1];
const e006 = captureConst(widenedArray);
const preservedTuple = ["preserved", 1] as const;
const e007 = captureOrdinary(preservedTuple);
const nestedReference = { mode: "shared" };
const e008 = captureConst({ nested: nestedReference });
const e009 = captureConst({ ...widenedObject, active: true });
const e010 = captureConst({ ...preservedObject, active: true });
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

// Demonstration A: direct object syntax receives deep readonly literal inference.
type _SolvedInlineObject = Expect<Equal<typeof e001, { readonly kind: "inline" }>>;
// Demonstration B: const inference does not rewind the earlier widening of a variable.
type _SolvedWidenedVariable = Expect<Equal<typeof e002, { kind: string }>>;
// Demonstration C: already-preserved evidence stays preserved under either generic.
type _SolvedPreservedOrdinary = Expect<Equal<typeof e003, { readonly kind: "preserved" }>>;
// Demonstration D: referenced values keep their existing type; only the containing
// property introduced by the inline expression becomes readonly.
type _SolvedNestedReference = Expect<
  Equal<typeof e008, { readonly nested: { mode: string } }>
>;

// Group 2: Constraint mutability shapes the preserved tuple candidate.
const e011 = captureConstMutableArray(["a", "b"]);
const e012 = captureConstReadonlyArray(["a", "b"]);
const e013 = captureConstMutableArray(["a", "b"] as ["a", "b"]);
const mutableVariable: string[] = ["a", "b"];
const e014 = captureConstReadonlyArray(mutableVariable);
const readonlyVariable: readonly string[] = ["a", "b"];
const e015 = captureConstReadonlyArray(readonlyVariable);
const e016 = captureParts(...mutableVariable);
const e017 = captureParts(...readonlyVariable);
const e018 = captureParts(...(["a", "b"] as const));
const e019 = captureConst<readonly string[]>(["a", "b"]);
const e020 = captureConst<string[]>(["a", "b"]);
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

// Demonstration E: the current compiler preserves a mutable literal tuple under
// a mutable array constraint. This is more precise than early TS 5.0 examples
// that demonstrated fallback to the broad string[] constraint.
type _SolvedMutableCandidate = Expect<Equal<typeof e011, ["a", "b"]>>;
// Demonstration F: a readonly-compatible constraint accepts the preserved tuple.
type _SolvedReadonlyCandidate = Expect<Equal<typeof e012, readonly ["a", "b"]>>;
// Demonstration G: an explicit mutable tuple assertion supplies a legal precise
// candidate even under the mutable constraint.
type _SolvedAssertedMutableTuple = Expect<Equal<typeof e013, ["a", "b"]>>;
// Demonstration H: explicit type arguments bypass const inference preference.
type _SolvedExplicitReadonlyArray = Expect<Equal<typeof e019, readonly string[]>>;
type _SolvedExplicitMutableArray = Expect<Equal<typeof e020, string[]>>;

// Group 3: Const inference is compile-time preference, not runtime immutability.
const runtimeMutable = { count: 1 };
const e021 = captureConst(runtimeMutable);
e021.count = 2;
const e022 = e021.count;
const inlineCaptured = captureConst({ count: 1 });
const e023 = inlineCaptured.count;
const e024 = defineRoutes({ home: { method: "GET", path: "/" } });
const routeVariable = { home: { method: "GET", path: "/" } };
const e025 = defineRoutes(routeVariable);
const e026 = defineRoutes({ home: { method: "GET", path: "/" } } as const);
declare const edgeAny: any;
const e027 = captureConst(edgeAny);
declare const edgeUnknown: unknown;
const e028 = captureConst(edgeUnknown);
declare const edgeNever: never;
const e029 = captureConst(edgeNever);
const e030 = captureConst({ value: undefined as string | undefined });
type _E021 = Expect<Equal<typeof e021, TODO>>; // TODO(koan) @koan-error
type _E022 = Expect<Equal<typeof e022, TODO>>; // TODO(koan) @koan-error
type _E023 = Expect<Equal<typeof e023, TODO>>; // TODO(koan) @koan-error
type _E024 = Expect<Equal<typeof e024, TODO>>; // TODO(koan) @koan-error
type _E025 = Expect<Equal<typeof e025, TODO>>; // TODO(koan) @koan-error
type _E026 = Expect<Equal<typeof e026, TODO>>; // TODO(koan) @koan-error
type _E027 = Expect<Equal<0 extends 1 & typeof e027 ? "any" : "other", TODO>>; // TODO(koan) @koan-error
type _E028 = Expect<Equal<unknown extends typeof e028 ? "unknown" : "other", TODO>>; // TODO(koan) @koan-error
type _E029 = Expect<Equal<[typeof e029] extends [never] ? "never" : "other", TODO>>; // TODO(koan) @koan-error
type _E030 = Expect<Equal<typeof e030, TODO>>; // TODO(koan) @koan-error

// Demonstration I: passing a variable preserves its mutability; const inference
// has no runtime freeze operation and does not rewrite its established type.
type _SolvedRuntimeMutable = Expect<Equal<typeof e021, { count: number }>>;
// Demonstration J: the inline result is statically readonly even though the same
// JavaScript object would remain mutable through an alias or assertion.
type _SolvedInlineReadonly = Expect<Equal<typeof inlineCaptured, { readonly count: 1 }>>;
// Demonstration K: a registry expression retains key names and nested literals,
// while a previously widened registry remains widened.
type _SolvedInlineRegistry = Expect<
  Equal<typeof e024, { readonly home: { readonly method: "GET"; readonly path: "/" } }>
>;
type _SolvedVariableRegistry = Expect<
  Equal<typeof e025, { home: { method: string; path: string } }>
>;

// @ts-expect-error The inferred inline object is readonly at compile time.
inlineCaptured.count = 2;
// @ts-expect-error const modifiers are not permitted on a type alias parameter.
type InvalidConstAlias<const T> = T;
