import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  defer,
  emptyList,
  outputOnly,
  produce,
  promiseFrom,
  transform,
} from "./k-007-contextual-return-inference.js";

/** K-007 edges: context is evidence, not conversion or runtime construction. */

type Kind<T> = 0 extends 1 & T
  ? "any"
  : [T] extends [never]
    ? "never"
    : unknown extends T
      ? [keyof T] extends [never] ? "unknown" : "ordinary"
      : "ordinary";

// Group 1: Output-only parameters use context or fall back to unknown.
const e001 = outputOnly();
const e002: string = outputOnly();
const e003: string | number = outputOnly();
const e004: { id: string; active: boolean } = outputOnly();
const e005: readonly ["a", 1] = outputOnly();
const e006 = outputOnly<never>();
const e007 = emptyList();
const e008: readonly string[] = emptyList();
const e009: () => number = defer(() => outputOnly());
const e010: Promise<string> = promiseFrom(() => outputOnly());
type _E001 = Expect<Equal<Kind<typeof e001>, TODO>>; // TODO(koan) @koan-error
type _E002 = Expect<Equal<typeof e002, TODO>>; // TODO(koan) @koan-error
type _E003 = Expect<Equal<typeof e003, TODO>>; // TODO(koan) @koan-error
type _E004 = Expect<Equal<typeof e004, TODO>>; // TODO(koan) @koan-error
type _E005 = Expect<Equal<typeof e005, TODO>>; // TODO(koan) @koan-error
type _E006 = Expect<Equal<Kind<typeof e006>, TODO>>; // TODO(koan) @koan-error
type _E007 = Expect<Equal<typeof e007, TODO>>; // TODO(koan) @koan-error
type _E008 = Expect<Equal<typeof e008, TODO>>; // TODO(koan) @koan-error
type _E009 = Expect<Equal<typeof e009, TODO>>; // TODO(koan) @koan-error
type _E010 = Expect<Equal<typeof e010, TODO>>; // TODO(koan) @koan-error

// Demonstration A: without argument or target evidence, output-only T is unknown.
type _SolvedNoContext = Expect<Equal<Kind<typeof e001>, "unknown">>;
// Demonstration B: context can travel through an array, function, or promise shell.
type _SolvedReadonlyListContext = Expect<Equal<typeof e008, readonly string[]>>;
type _SolvedFunctionContext = Expect<Equal<typeof e009, () => number>>;
type _SolvedPromiseContext = Expect<Equal<typeof e010, Promise<string>>>;

// Group 2: Callback return expressions have their own widening rules.
const edgeCondition = true as boolean;
const e011 = produce(() => edgeCondition ? "a" : "b");
const e012 = produce(() => edgeCondition ? ("a" as const) : ("b" as const));
const e013 = produce(() => ({ kind: "a" }));
const e014 = produce(() => ({ kind: "a" } as const));
const e015 = produce((): "a" | "b" => "a");
const e016 = transform(1, () => edgeCondition ? 1 : "a");
const e017 = transform(1, () => edgeCondition ? (1 as const) : (2 as const));
const e018 = promiseFrom(() => "a" as const);
const edgeVoidCallback: () => void = () => 42;
const e019 = edgeVoidCallback;
const e020 = defer(() => async () => 1);
type _E011 = Expect<Equal<typeof e011, TODO>>; // TODO(koan) @koan-error
type _E012 = Expect<Equal<typeof e012, TODO>>; // TODO(koan) @koan-error
type _E013 = Expect<Equal<typeof e013, TODO>>; // TODO(koan) @koan-error
type _E014 = Expect<Equal<typeof e014, TODO>>; // TODO(koan) @koan-error
type _E015 = Expect<Equal<typeof e015, TODO>>; // TODO(koan) @koan-error
type _E016 = Expect<Equal<typeof e016, TODO>>; // TODO(koan) @koan-error
type _E017 = Expect<Equal<typeof e017, TODO>>; // TODO(koan) @koan-error
type _E018 = Expect<Equal<typeof e018, TODO>>; // TODO(koan) @koan-error
type _E019 = Expect<Equal<ReturnType<typeof e019>, TODO>>; // TODO(koan) @koan-error
type _E020 = Expect<Equal<ReturnType<ReturnType<typeof e020>>, TODO>>; // TODO(koan) @koan-error

// Demonstration C: unlike a single widening literal return, a conditional can
// contribute the finite union formed by its alternative branches.
type _SolvedConditionalWide = Expect<Equal<typeof e011, "a" | "b">>;
// Demonstration D: explicitly preserving each branch produces the same union.
type _SolvedConditionalLiteral = Expect<Equal<typeof e012, "a" | "b">>;
// Demonstration E: a contextual void function may return a runtime value, but
// callers are instructed to discard it and ReturnType observes void.
type _SolvedVoidReturn = Expect<Equal<ReturnType<typeof e019>, void>>;

// Group 3: Strong input evidence is checked against context rather than rewritten.
function echo<T>(value: T): T {
  return value;
}

const e021: number = echo(1);
const e022: string | number = echo(1);
const e023 = echo("a");
const e024: { id: string } = produce(() => ({ id: "a", extra: true }));
const e025 = transform("a", (value): string | number => value.length);
const e026: () => string = defer(() => "a" as const);
const e027: Promise<number> = promiseFrom(() => 1 as const);
const e028 = outputOnly<string | undefined>();
const e029: unknown = outputOnly();
const e030 = produce<readonly [1, 2]>(() => [1, 2]);
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

// Demonstration F: a broader annotation accepts the result, while control-flow
// analysis knows this const binding currently contains the numeric branch.
type _SolvedBroaderTarget = Expect<Equal<typeof e022, number>>;
// Demonstration G: context does not widen the call expression itself after
// assignment; the annotated binding owns the broader visible type.
type _SolvedUnannotatedEcho = Expect<Equal<typeof e023, "a">>;
// Demonstration H: structural return context permits extra inferred properties,
// then the binding annotation exposes only its declared contract.
type _SolvedContextualObject = Expect<Equal<typeof e024, { id: string }>>;
// Demonstration I: explicit generic output fixes the readonly tuple result.
type _SolvedExplicitTuple = Expect<Equal<typeof e030, readonly [1, 2]>>;

// @ts-expect-error Input inference fixes number; string context cannot rewrite it.
const edgeConflict: string = echo(1);
// @ts-expect-error Explicit string output rejects a numeric factory result.
produce<string>(() => 1);

// Demonstration J: outputOnly is intentionally unsafe runtime scaffolding. Its
// contextual type is static evidence and does not manufacture a value.
type _SolvedOutputOnlySignature = Expect<
  Equal<typeof outputOnly, <T>() => T>
>;
