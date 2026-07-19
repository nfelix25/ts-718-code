import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-004 edge cases: preservation is contextual, static, and syntax-sensitive
 * =============================================================================
 *
 * `const`, readonly properties, const assertions, runtime freezing, annotations,
 * assertions, and `satisfies` solve different problems. Their overlap makes them
 * easy to conflate. These cases isolate where preservation stops: across a
 * referenced mutable object, across a spread from a widened source, inside a
 * contextually typed expression, or at a function return boundary.
 */

// Group 1: Const bindings and const assertions do not imply runtime immutability.
// Variation: writable properties, direct literal syntax, references, spreads,
// computed keys, and Object.freeze.

const edgeConstPrimitive = "fixed";
const edgeConstObject = { mode: "dark", count: 1 };
const edgePreservedObject = { mode: "dark", count: 1 } as const;
const edgeChild = { count: 1 };
const edgePreservedReference = { child: edgeChild } as const;
const edgeSpreadSource = { mode: "dark", count: 1 };
const edgePreservedSpread = { ...edgeSpreadSource, label: "copy" } as const;
const edgeKey = "mode" as const;
const edgeComputed = { [edgeKey]: "dark" } as const;
const edgeRuntimeFrozen = Object.freeze({ mode: "dark", count: 1 });

type _E001 = Expect<Equal<typeof edgeConstPrimitive, TODO>>; // TODO(koan) @koan-error
type _E002 = Expect<Equal<typeof edgeConstObject.mode, TODO>>; // TODO(koan) @koan-error
type _E003 = Expect<Equal<typeof edgePreservedObject, TODO>>; // TODO(koan) @koan-error
type _E004 = Expect<Equal<typeof edgePreservedReference.child, TODO>>; // TODO(koan) @koan-error
type _E005 = Expect<Equal<typeof edgePreservedReference.child.count, TODO>>; // TODO(koan) @koan-error
type _E006 = Expect<Equal<typeof edgePreservedSpread.mode, TODO>>; // TODO(koan) @koan-error
type _E007 = Expect<Equal<typeof edgePreservedSpread.label, TODO>>; // TODO(koan) @koan-error
type _E008 = Expect<Equal<typeof edgeComputed.mode, TODO>>; // TODO(koan) @koan-error

// Demonstration A: const protects the binding, but ordinary properties remain
// writable and therefore widen to accept future peers.
edgeConstObject.mode = "light";
type _SolvedMutableConstProperty = Expect<
  Equal<typeof edgeConstObject.mode, string>
>;

// Demonstration B: as const creates readonly types; it does not call
// Object.freeze or otherwise change the runtime object.
type _SolvedPreservedObject = Expect<
  Equal<typeof edgePreservedObject, { readonly mode: "dark"; readonly count: 1 }>
>;
const edgeIsActuallyFrozen = Object.isFrozen(edgePreservedObject);

// Demonstration C: const preservation follows direct literal syntax. The
// referenced child's existing mutable type is retained.
edgePreservedReference.child.count = 2;
type _SolvedReferencedChild = Expect<
  Equal<typeof edgePreservedReference.child, { count: number }>
>;

// Demonstration D: Object.freeze is a runtime operation with its own library
// typing; it is distinct from a const assertion.
const edgeFreezeCheck: boolean = Object.isFrozen(edgeRuntimeFrozen);

// Group 2: Const assertions are permitted only on specific literal expressions.
// Variation: branch placement, arrays, objects, template literals, negatives,
// bigint, and pre-widened variables.

const edgeCondition = true as boolean;
const edgeBranchPreserved = edgeCondition ? (0 as const) : (1 as const);
const edgeStringAssertion = "value" as const;
const edgeObjectAssertion = { value: 1 } as const;
const edgeArrayAssertion = [1, 2] as const;
const edgeTemplateAssertion = `user-${1}` as const;
const edgeNegativeAssertion = -1 as const;
const edgeBigintAssertion = 10n as const;
const edgeBooleanAssertion = false as const;

type _E009 = Expect<Equal<typeof edgeBranchPreserved, TODO>>; // TODO(koan) @koan-error
type _E010 = Expect<Equal<typeof edgeStringAssertion, TODO>>; // TODO(koan) @koan-error
type _E011 = Expect<Equal<typeof edgeObjectAssertion.value, TODO>>; // TODO(koan) @koan-error
type _E012 = Expect<Equal<typeof edgeArrayAssertion, TODO>>; // TODO(koan) @koan-error
type _E013 = Expect<Equal<typeof edgeTemplateAssertion, TODO>>; // TODO(koan) @koan-error
type _E014 = Expect<Equal<typeof edgeNegativeAssertion, TODO>>; // TODO(koan) @koan-error
type _E015 = Expect<Equal<typeof edgeBigintAssertion, TODO>>; // TODO(koan) @koan-error
type _E016 = Expect<Equal<typeof edgeBooleanAssertion, TODO>>; // TODO(koan) @koan-error

const edgeAlreadyInferred = 1;
// Demonstration E: a const assertion cannot be retroactively applied to an
// identifier, even if that identifier currently has a literal type.
// @ts-expect-error Const assertions apply only to eligible literal syntax.
const edgeInvalidIdentifierAssertion = edgeAlreadyInferred as const;

// Demonstration F: place assertions on conditional branches, not on the whole
// conditional expression.
// @ts-expect-error The entire conditional is not an eligible literal expression.
const edgeInvalidConditionalAssertion = (edgeCondition ? 0 : 1) as const;

type _SolvedPreservedBranches = Expect<
  Equal<typeof edgeBranchPreserved, 0 | 1>
>;

// Group 3: Satisfies contributes contextual typing without replacing the result.
// Variation: broad primitive targets, literal-union targets, tuple targets,
// arrays, readonly constraints, and constrained element unions.

interface EdgeWideContext {
  text: string;
  count: number;
  enabled: boolean;
}

interface EdgeLiteralContext {
  text: "alpha" | "beta";
  count: 1 | 2;
  enabled: true | false;
}

const edgeWideSatisfied = {
  text: "alpha",
  count: 1,
  enabled: true,
} satisfies EdgeWideContext;
const edgeLiteralSatisfied = {
  text: "alpha",
  count: 1,
  enabled: true,
} satisfies EdgeLiteralContext;
const edgeTupleSatisfied = [1, 2] satisfies [number, number];
const edgeArraySatisfied = [1, 2] satisfies number[];
const edgeReadonlySatisfied = [1, 2] satisfies readonly number[];
const edgeUnionArray = ["alpha", "beta"] satisfies Array<
  "alpha" | "beta" | "gamma"
>;

type _E017 = Expect<Equal<typeof edgeWideSatisfied.text, TODO>>; // TODO(koan) @koan-error
type _E018 = Expect<Equal<typeof edgeWideSatisfied.count, TODO>>; // TODO(koan) @koan-error
type _E019 = Expect<Equal<typeof edgeWideSatisfied.enabled, TODO>>; // TODO(koan) @koan-error
type _E020 = Expect<Equal<typeof edgeLiteralSatisfied.text, TODO>>; // TODO(koan) @koan-error
type _E021 = Expect<Equal<typeof edgeLiteralSatisfied.count, TODO>>; // TODO(koan) @koan-error
type _E022 = Expect<Equal<typeof edgeTupleSatisfied, TODO>>; // TODO(koan) @koan-error
type _E023 = Expect<Equal<typeof edgeTupleSatisfied["length"], TODO>>; // TODO(koan) @koan-error
type _E024 = Expect<Equal<typeof edgeArraySatisfied, TODO>>; // TODO(koan) @koan-error
type _E025 = Expect<Equal<typeof edgeReadonlySatisfied, TODO>>; // TODO(koan) @koan-error
type _E026 = Expect<Equal<typeof edgeUnionArray[number], TODO>>; // TODO(koan) @koan-error

// Demonstration G: boolean contextual typing can preserve the selected boolean
// literal, so the checked expression may be narrower than an annotation.
type _SolvedSatisfiedBoolean = Expect<
  Equal<typeof edgeWideSatisfied.enabled, true>
>;
// @ts-expect-error The retained property type is true, not writable boolean.
edgeWideSatisfied.enabled = false;

// Demonstration H: a tuple constraint supplies tuple context without preserving
// numeric literals or adding readonly.
type _SolvedSatisfiedTuple = Expect<
  Equal<typeof edgeTupleSatisfied, [number, number]>
>;
edgeTupleSatisfied[0] = 3;

// Demonstration I: satisfying a readonly array contract proves compatibility;
// it does not turn a mutable array expression into a readonly array.
edgeReadonlySatisfied.push(3);
type _SolvedReadonlyConstraint = Expect<
  Equal<typeof edgeReadonlySatisfied, number[]>
>;

// Group 4: Validation strength depends on freshness; assertions have different intent.
// Variation: exact record keys, annotations, stale objects, runtime identity,
// template constraints, and deliberately forced assertions.

interface EdgeNamed {
  name: string;
}

const edgeExactRecord = {
  first: 1,
  second: 2,
} satisfies Record<string, number>;
const edgeAnnotatedRecord: Record<string, number> = {
  first: 1,
  second: 2,
};
const edgeStaleNamed = { name: "Ada", role: "admin" };
const edgeCheckedStale = edgeStaleNamed satisfies EdgeNamed;
const edgeForced = { port: "wrong" } as unknown as { port: number };
const edgeIdentityResult = edgeStaleNamed satisfies EdgeNamed;
const edgeCheckedPath = "/users" satisfies `/${string}`;
const edgeCheckedLiteral = "dark" satisfies "light" | "dark";

type _E027 = Expect<Equal<typeof edgeExactRecord, TODO>>; // TODO(koan) @koan-error
type _E028 = Expect<Equal<keyof typeof edgeExactRecord, TODO>>; // TODO(koan) @koan-error
type _E029 = Expect<Equal<keyof typeof edgeAnnotatedRecord, TODO>>; // TODO(koan) @koan-error
type _E030 = Expect<Equal<keyof typeof edgeCheckedStale, TODO>>; // TODO(koan) @koan-error
type _E031 = Expect<Equal<typeof edgeCheckedStale.role, TODO>>; // TODO(koan) @koan-error
type _E032 = Expect<Equal<typeof edgeForced.port, TODO>>; // TODO(koan) @koan-error
type _E033 = Expect<Equal<typeof edgeIdentityResult, TODO>>; // TODO(koan) @koan-error
type _E034 = Expect<Equal<typeof edgeCheckedPath, TODO>>; // TODO(koan) @koan-error
type _E035 = Expect<Equal<typeof edgeCheckedLiteral, TODO>>; // TODO(koan) @koan-error
type _E036 = Expect<Equal<typeof edgeIdentityResult.role, TODO>>; // TODO(koan) @koan-error

// Demonstration J: satisfies applies fresh object-literal excess-property checks.
// @ts-expect-error `role` is not declared by EdgeNamed.
const edgeFreshExcess = { name: "Ada", role: "admin" } satisfies EdgeNamed;

// Demonstration K: a previously inferred value receives ordinary structural
// checking, so its extra property remains in the result type.
type _SolvedStaleResult = Expect<
  Equal<typeof edgeCheckedStale, { name: string; role: string }>
>;

interface EdgeRequiredConfig {
  mode: "light" | "dark";
  retries: number;
}

// Demonstration L: missing and incompatible properties are rejected.
// @ts-expect-error `retries` is missing.
const edgeMissingProperty = { mode: "dark" } satisfies EdgeRequiredConfig;
// @ts-expect-error retries must be numeric.
const edgeWrongProperty = { mode: "dark", retries: "three" } satisfies EdgeRequiredConfig;

// Demonstration M: a double assertion can force an untrue static view. Satisfies
// never performs this conversion; it only accepts genuinely compatible values.
type _SolvedForcedView = Expect<Equal<typeof edgeForced.port, number>>;

// Group 5: Function returns and conditional expressions have their own widening sites.
// Variation: inferred versus preserved returns, contextual call signatures,
// returned objects, const versus let conditionals, and tuple destructuring.

const edgeWidenedArrow = () => "ok";
const edgePreservedArrow = () => "ok" as const;
const edgeContextualArrow: () => "ok" | "error" = () => "ok";
const edgeObjectArrow = () => ({ kind: "ok" });
const edgePreservedObjectArrow = () => ({ kind: "ok" }) as const;
const edgeConstChoice = edgeCondition ? "left" : "right";
let edgeLetChoice = edgeCondition ? "left" : "right";
const edgePreservedTuple = ["ok", 200] as const;
const [edgeTupleTag, edgeTupleCode] = edgePreservedTuple;

type _E037 = Expect<Equal<ReturnType<typeof edgeWidenedArrow>, TODO>>; // TODO(koan) @koan-error
type _E038 = Expect<Equal<ReturnType<typeof edgePreservedArrow>, TODO>>; // TODO(koan) @koan-error
type _E039 = Expect<Equal<ReturnType<typeof edgeContextualArrow>, TODO>>; // TODO(koan) @koan-error
type _E040 = Expect<Equal<ReturnType<typeof edgeObjectArrow>["kind"], TODO>>; // TODO(koan) @koan-error
type _E041 = Expect<Equal<ReturnType<typeof edgePreservedObjectArrow>["kind"], TODO>>; // TODO(koan) @koan-error
type _E042 = Expect<Equal<typeof edgeConstChoice, TODO>>; // TODO(koan) @koan-error
type _E043 = Expect<Equal<typeof edgeLetChoice, TODO>>; // TODO(koan) @koan-error
type _E044 = Expect<Equal<typeof edgeTupleTag, TODO>>; // TODO(koan) @koan-error

// Demonstration N: return values are widening locations unless preservation is
// requested explicitly or supplied by a contextual call signature.
type _SolvedWidenedReturn = Expect<
  Equal<ReturnType<typeof edgeWidenedArrow>, string>
>;
type _SolvedPreservedReturn = Expect<
  Equal<ReturnType<typeof edgePreservedArrow>, "ok">
>;

// Demonstration O: a const conditional binding keeps the finite union of branch
// literals, while a let binding anticipates later string assignments.
type _SolvedConstChoice = Expect<
  Equal<typeof edgeConstChoice, "left" | "right">
>;
type _SolvedLetChoice = Expect<Equal<typeof edgeLetChoice, string>>;

// Demonstration P: destructuring a readonly literal tuple preserves each slot.
type _SolvedTupleTag = Expect<Equal<typeof edgeTupleTag, "ok">>;
type _SolvedTupleCode = Expect<Equal<typeof edgeTupleCode, 200>>;

// Demonstration Q: satisfies is an erased check; its runtime result is the exact
// same value, not a clone, cast, or frozen wrapper.
const edgeSameReference: boolean = edgeIdentityResult === edgeStaleNamed;

void edgeIsActuallyFrozen;
void edgeFreezeCheck;
void edgeInvalidIdentifierAssertion;
void edgeInvalidConditionalAssertion;
void edgeFreshExcess;
void edgeMissingProperty;
void edgeWrongProperty;
void edgeSameReference;
