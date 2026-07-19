import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type { Options } from "./k-004-literal-widening-as-const-satisfies.js";

/**
 * K-004 guided drills: literal widening, as const, and satisfies
 * =============================================================================
 *
 * These repetitions vary the write location and the contextual target. Predict
 * exactness in two passes: first ask whether the location is mutable, then ask
 * whether an annotation, assertion, `as const`, or `satisfies` context changes
 * how the expression is inferred.
 */

// Group 1: Primitive bindings.
// Variation: const versus let across strings, numbers, booleans, bigint, negative
// literals, template literals, and explicit assertions.

const dConstString = "alpha";
let dLetString = "alpha";
const dConstNumber = 42;
let dLetNumber = 42;
const dConstBoolean = true;
let dLetBoolean = true;
const dConstBigint = 10n;
let dLetBigint = 10n;
const dConstNegative = -1;
let dLetNegative = -1;
const dConstTemplate = `item-${1}`;
let dLetTemplate = `item-${1}`;
const dAssertedUnion = "left" as "left" | "right";
const dExplicitLiteral: "fixed" = "fixed";

type _D001 = Expect<Equal<typeof dConstString, TODO>>; // TODO(koan) @koan-error
type _D002 = Expect<Equal<typeof dLetString, TODO>>; // TODO(koan) @koan-error
type _D003 = Expect<Equal<typeof dConstNumber, TODO>>; // TODO(koan) @koan-error
type _D004 = Expect<Equal<typeof dLetNumber, TODO>>; // TODO(koan) @koan-error
type _D005 = Expect<Equal<typeof dConstBoolean, TODO>>; // TODO(koan) @koan-error
type _D006 = Expect<Equal<typeof dLetBoolean, TODO>>; // TODO(koan) @koan-error
type _D007 = Expect<Equal<typeof dConstBigint, TODO>>; // TODO(koan) @koan-error
type _D008 = Expect<Equal<typeof dLetBigint, TODO>>; // TODO(koan) @koan-error
type _D009 = Expect<Equal<typeof dConstNegative, TODO>>; // TODO(koan) @koan-error
type _D010 = Expect<Equal<typeof dLetNegative, TODO>>; // TODO(koan) @koan-error
type _D011 = Expect<Equal<typeof dConstTemplate, TODO>>; // TODO(koan) @koan-error
type _D012 = Expect<Equal<typeof dLetTemplate, TODO>>; // TODO(koan) @koan-error
type _D013 = Expect<Equal<typeof dAssertedUnion, TODO>>; // TODO(koan) @koan-error
type _D014 = Expect<Equal<typeof dExplicitLiteral, TODO>>; // TODO(koan) @koan-error

// Group 2: Mutable object properties, arrays, tuples, and function returns.
// Variation: nested writes, mixed arrays, explicit tuple context, and local
// literal assertions inside otherwise mutable structures.

const dMutableObject = {
  text: "alpha",
  count: 1,
  enabled: true,
  nested: { status: "new" },
};
const dStringArray = ["a", "b"];
const dMixedArray = ["a", 1, true];
const dAnnotatedTuple: [string, number] = ["a", 1];
const dLiteralProperty = { kind: "created" as const };
const dReadonlyAnnotation: { readonly kind: "created" | "updated" } = {
  kind: "created",
};
const dLiteralElementArray = ["a" as const, "b" as const];
const dFactory = { make: () => "made" };

type _D015 = Expect<Equal<typeof dMutableObject.text, TODO>>; // TODO(koan) @koan-error
type _D016 = Expect<Equal<typeof dMutableObject.count, TODO>>; // TODO(koan) @koan-error
type _D017 = Expect<Equal<typeof dMutableObject.enabled, TODO>>; // TODO(koan) @koan-error
type _D018 = Expect<Equal<typeof dMutableObject.nested.status, TODO>>; // TODO(koan) @koan-error
type _D019 = Expect<Equal<typeof dStringArray, TODO>>; // TODO(koan) @koan-error
type _D020 = Expect<Equal<typeof dStringArray[number], TODO>>; // TODO(koan) @koan-error
type _D021 = Expect<Equal<typeof dMixedArray, TODO>>; // TODO(koan) @koan-error
type _D022 = Expect<Equal<typeof dMixedArray[number], TODO>>; // TODO(koan) @koan-error
type _D023 = Expect<Equal<typeof dAnnotatedTuple, TODO>>; // TODO(koan) @koan-error
type _D024 = Expect<Equal<typeof dAnnotatedTuple[0], TODO>>; // TODO(koan) @koan-error
type _D025 = Expect<Equal<typeof dLiteralProperty.kind, TODO>>; // TODO(koan) @koan-error
type _D026 = Expect<Equal<typeof dReadonlyAnnotation.kind, TODO>>; // TODO(koan) @koan-error
type _D027 = Expect<Equal<typeof dLiteralElementArray, TODO>>; // TODO(koan) @koan-error
type _D028 = Expect<Equal<ReturnType<typeof dFactory.make>, TODO>>; // TODO(koan) @koan-error

// Group 3: Const assertions preserve direct literal syntax.
// Variation: primitives, deep literal syntax, tuples, spreads, referenced values,
// and computed keys.

const dPreservedString = "alpha" as const;
const dPreservedNumber = 42 as const;
const dPreservedObject = { kind: "created", count: 1 } as const;
const dPreservedNested = { config: { enabled: true } } as const;
const dPreservedArray = ["a", "b"] as const;
const dPreservedMixed = ["a", 1, true] as const;
const dSpreadBase = { id: "base", version: 1 };
const dPreservedSpread = { ...dSpreadBase, kind: "copy" } as const;
const dReferenced = { count: 1 };
const dPreservedReference = { referenced: dReferenced } as const;
const dComputedKey = "mode" as const;
const dComputedObject = { [dComputedKey]: "dark" } as const;

type _D029 = Expect<Equal<typeof dPreservedString, TODO>>; // TODO(koan) @koan-error
type _D030 = Expect<Equal<typeof dPreservedNumber, TODO>>; // TODO(koan) @koan-error
type _D031 = Expect<Equal<typeof dPreservedObject.kind, TODO>>; // TODO(koan) @koan-error
type _D032 = Expect<Equal<typeof dPreservedObject.count, TODO>>; // TODO(koan) @koan-error
type _D033 = Expect<Equal<typeof dPreservedNested.config, TODO>>; // TODO(koan) @koan-error
type _D034 = Expect<Equal<typeof dPreservedArray, TODO>>; // TODO(koan) @koan-error
type _D035 = Expect<Equal<typeof dPreservedArray[number], TODO>>; // TODO(koan) @koan-error
type _D036 = Expect<Equal<typeof dPreservedMixed, TODO>>; // TODO(koan) @koan-error
type _D037 = Expect<Equal<typeof dPreservedSpread.id, TODO>>; // TODO(koan) @koan-error
type _D038 = Expect<Equal<typeof dPreservedSpread.version, TODO>>; // TODO(koan) @koan-error
type _D039 = Expect<Equal<typeof dPreservedSpread.kind, TODO>>; // TODO(koan) @koan-error
type _D040 = Expect<Equal<typeof dPreservedReference.referenced, TODO>>; // TODO(koan) @koan-error
type _D041 = Expect<Equal<typeof dPreservedReference.referenced.count, TODO>>; // TODO(koan) @koan-error
type _D042 = Expect<Equal<typeof dComputedObject.mode, TODO>>; // TODO(koan) @koan-error

// Group 4: Annotations and assertions choose a view.
// Variation: interface contracts, broad assertions, literal annotations, arrays,
// tuples, readonly tuples, and asserted unions.

interface DrillConfig {
  mode: "light" | "dark";
  count: number;
  enabled: boolean;
}

const dAnnotatedConfig: DrillConfig = {
  mode: "dark",
  count: 1,
  enabled: true,
};
const dAssertedConfig = {
  mode: "dark",
  count: 1,
  enabled: true,
} as DrillConfig;
const dLiteralAnnotation: { mode: "dark"; count: 2 } = {
  mode: "dark",
  count: 2,
};
const dAnnotatedArray: string[] = ["a", "b"];
const dTupleAnnotation: [string, number] = ["a", 1];
const dReadonlyTupleAnnotation: readonly [string, number] = ["a", 1];
const dConstAssertedConfig = { mode: "dark", count: 1 } as const;
const dUnionAssertion = "idle" as "idle" | "busy";
const dBroadAssertion = "idle" as string;

type _D043 = Expect<Equal<typeof dAnnotatedConfig, TODO>>; // TODO(koan) @koan-error
type _D044 = Expect<Equal<typeof dAnnotatedConfig.mode, TODO>>; // TODO(koan) @koan-error
type _D045 = Expect<Equal<typeof dAnnotatedConfig.count, TODO>>; // TODO(koan) @koan-error
type _D046 = Expect<Equal<typeof dAnnotatedConfig.enabled, TODO>>; // TODO(koan) @koan-error
type _D047 = Expect<Equal<typeof dAssertedConfig, TODO>>; // TODO(koan) @koan-error
type _D048 = Expect<Equal<typeof dAssertedConfig.mode, TODO>>; // TODO(koan) @koan-error
type _D049 = Expect<Equal<typeof dLiteralAnnotation.mode, TODO>>; // TODO(koan) @koan-error
type _D050 = Expect<Equal<typeof dLiteralAnnotation.count, TODO>>; // TODO(koan) @koan-error
type _D051 = Expect<Equal<typeof dAnnotatedArray, TODO>>; // TODO(koan) @koan-error
type _D052 = Expect<Equal<typeof dTupleAnnotation, TODO>>; // TODO(koan) @koan-error
type _D053 = Expect<Equal<typeof dReadonlyTupleAnnotation, TODO>>; // TODO(koan) @koan-error
type _D054 = Expect<Equal<typeof dConstAssertedConfig, TODO>>; // TODO(koan) @koan-error
type _D055 = Expect<Equal<typeof dUnionAssertion, TODO>>; // TODO(koan) @koan-error
type _D056 = Expect<Equal<typeof dBroadAssertion, TODO>>; // TODO(koan) @koan-error

// Group 5: Satisfies validates without replacing exact keys and useful values.
// Variation: literal-union versus broad targets, booleans, records, tuple context,
// union-valued properties, and mutable arrays satisfying readonly contracts.

const dSatisfiedConfig = {
  mode: "dark",
  count: 1,
  enabled: true,
} satisfies DrillConfig;
const dSatisfiedScores = {
  ada: 10,
  grace: 9,
} satisfies Record<string, number>;
const dAnnotatedScores: Record<string, number> = {
  ada: 10,
  grace: 9,
};
type DrillColor = string | readonly [number, number, number];
const dPalette = {
  red: [255, 0, 0],
  green: "#00ff00",
} satisfies Record<"red" | "green", DrillColor>;
const dSatisfiedTuple = [1, 2] satisfies [number, number];
const dSatisfiedReadonlyArray = ["a", "b"] satisfies readonly string[];

type _D057 = Expect<Equal<typeof dSatisfiedConfig, TODO>>; // TODO(koan) @koan-error
type _D058 = Expect<Equal<typeof dSatisfiedConfig.mode, TODO>>; // TODO(koan) @koan-error
type _D059 = Expect<Equal<typeof dSatisfiedConfig.count, TODO>>; // TODO(koan) @koan-error
type _D060 = Expect<Equal<typeof dSatisfiedConfig.enabled, TODO>>; // TODO(koan) @koan-error
type _D061 = Expect<Equal<keyof typeof dSatisfiedConfig, TODO>>; // TODO(koan) @koan-error
type _D062 = Expect<Equal<keyof typeof dSatisfiedScores, TODO>>; // TODO(koan) @koan-error
type _D063 = Expect<Equal<typeof dSatisfiedScores.ada, TODO>>; // TODO(koan) @koan-error
type _D064 = Expect<Equal<typeof dSatisfiedScores, TODO>>; // TODO(koan) @koan-error
type _D065 = Expect<Equal<keyof typeof dAnnotatedScores, TODO>>; // TODO(koan) @koan-error
type _D066 = Expect<Equal<typeof dPalette.red, TODO>>; // TODO(koan) @koan-error
type _D067 = Expect<Equal<typeof dPalette.green, TODO>>; // TODO(koan) @koan-error
type _D068 = Expect<Equal<typeof dSatisfiedTuple, TODO>>; // TODO(koan) @koan-error
type _D069 = Expect<Equal<typeof dSatisfiedTuple[number], TODO>>; // TODO(koan) @koan-error
type _D070 = Expect<Equal<typeof dSatisfiedReadonlyArray, TODO>>; // TODO(koan) @koan-error

// Group 6: Combine preservation and validation for registries and tuples.
// Variation: exact registry keys, optional fields, readonly versus mutable tuple
// context, constrained element unions, and template-literal constraints.

interface Endpoint {
  method: "GET" | "POST";
  path: `/${string}`;
  headers?: readonly string[];
}

const dEndpoints = {
  list: { method: "GET", path: "/users" },
  create: { method: "POST", path: "/users", headers: ["content-type"] },
} as const satisfies Record<string, Endpoint>;
const dReadonlyNumbers = [1, 2, 3] as const satisfies readonly number[];
const dPreservedTuple = ["ok", 200] as const satisfies readonly [string, number];
const dMutableTuple = ["ok", 200] satisfies [string, number];
const dConstrainedArray = ["red", "green"] satisfies Array<
  "red" | "green" | "blue"
>;
const dConstrainedPath = "/users" as const satisfies `/${string}`;

type _D071 = Expect<Equal<keyof typeof dEndpoints, TODO>>; // TODO(koan) @koan-error
type _D072 = Expect<Equal<typeof dEndpoints.list.method, TODO>>; // TODO(koan) @koan-error
type _D073 = Expect<Equal<typeof dEndpoints.create.path, TODO>>; // TODO(koan) @koan-error
type _D074 = Expect<Equal<typeof dEndpoints.list, TODO>>; // TODO(koan) @koan-error
type _D075 = Expect<Equal<typeof dEndpoints.create.headers, TODO>>; // TODO(koan) @koan-error
type _D076 = Expect<Equal<typeof dReadonlyNumbers, TODO>>; // TODO(koan) @koan-error
type _D077 = Expect<Equal<typeof dReadonlyNumbers[number], TODO>>; // TODO(koan) @koan-error
type _D078 = Expect<Equal<typeof dPreservedTuple, TODO>>; // TODO(koan) @koan-error
type _D079 = Expect<Equal<typeof dPreservedTuple[0], TODO>>; // TODO(koan) @koan-error
type _D080 = Expect<Equal<typeof dMutableTuple, TODO>>; // TODO(koan) @koan-error
type _D081 = Expect<Equal<typeof dMutableTuple[0], TODO>>; // TODO(koan) @koan-error
type _D082 = Expect<Equal<typeof dConstrainedArray, TODO>>; // TODO(koan) @koan-error
type _D083 = Expect<Equal<typeof dConstrainedArray[number], TODO>>; // TODO(koan) @koan-error
type _D084 = Expect<Equal<typeof dConstrainedPath, TODO>>; // TODO(koan) @koan-error

type _OptionsVocabularyCheck = Expect<
  Equal<Options["mode"], "light" | "dark">
>;
