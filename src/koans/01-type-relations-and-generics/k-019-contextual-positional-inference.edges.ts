import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  inspectPair,
  pipeThree,
  produceAndConsume,
  visitArgs,
  zipWith,
} from "./k-019-contextual-positional-inference.js";

/** K-019 edges: context supplies expectations, then annotations and special types are checked against them. */

type Kind<T> = 0 extends 1 & T
  ? "any"
  : [T] extends [never]
    ? "never"
    : unknown extends T
      ? [keyof T] extends [never] ? "unknown" : "ordinary"
      : "ordinary";

// Group 1: Explicit annotations can agree, widen safely, or conflict.
const e001 = inspectPair([1, "a"] as const, (left: number, right: string) => left + right.length);
const e002 = inspectPair([1, "a"] as const, (left: 1, right: "a") => `${left}${right}`);
const e003 = inspectPair([1, "a"] as const, (left: unknown, right: unknown) => [left, right]);
const e004 = inspectPair<1, "a", void>([1, "a"] as const, (_left, _right) => 42);
const e005 = inspectPair([[1, 2], { id: 1 }] as const, ([first], { id }) => first + id);
const e006 = zipWith([1], ["a"], (left: number, right: string, index: number) => `${index}:${left}:${right}`);
const e007 = zipWith([1], ["a"], (left: unknown, right: unknown) => [left, right]);
const e008 = visitArgs([1, "a"] as const, (left: number, right: string) => left + right.length);
const e009 = visitArgs([1, "a"] as const, (...args) => args);
const e010 = visitArgs([] as const, (...args) => args);
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

// Demonstration A: contextual void permits a callback to return a runtime value,
// but the call exposes void because the explicit annotation discards that value.
type _SolvedContextualVoid = Expect<Equal<typeof e004, void>>;
// Demonstration B: rest parameters receive the complete contextual tuple.
type _SolvedContextualRest = Expect<Equal<typeof e009, [1, "a"]>>;
type _SolvedEmptyRest = Expect<Equal<typeof e010, []>>;

// @ts-expect-error The first tuple position is number, not string.
inspectPair([1, "a"] as const, (left: string, right) => left + right);
// @ts-expect-error Explicit callback result must satisfy explicit Result.
inspectPair<number, string, boolean>([1, "a"], (left, right) => `${left}${right}`);

// Group 2: Producer/consumer inference works across property order and explicit views.
const e011 = produceAndConsume({ produce: () => 1, consume: (value) => value.toFixed() });
const e012 = produceAndConsume({ consume: (value: number) => value.toFixed(), produce: () => 1 });
const e013 = produceAndConsume({ consume: (value) => String(value), produce: () => 1 });
const e014 = produceAndConsume<number, string>({ consume: String, produce: () => 1 });
const e015 = produceAndConsume<unknown, boolean>({ produce: () => 1, consume: Boolean });
const e016 = produceAndConsume({ produce: () => "a" as const, consume: (value) => value });
const e017 = produceAndConsume({ produce: (): "a" | "b" => "a", consume: (value) => value });
const e018 = produceAndConsume({ produce: () => ({ id: 1, extra: true }), consume: (value: { id: number }) => value.id });
const e019 = produceAndConsume({ produce: () => undefined, consume: (value) => value });
const e020 = produceAndConsume({ produce: () => null, consume: (value) => value });
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

// Demonstration C: modern inference can use the annotated consumer even when it
// appears before the producer property in source order.
type _SolvedReorderedObject = Expect<Equal<typeof e012, string>>;
// Demonstration D: an unannotated consumer is deferred until producer evidence is
// available, so the reversed property order still produces a string result.
type _SolvedDeferredConsumer = Expect<Equal<typeof e013, string>>;
// Demonstration E: a broader consumer parameter accepts a richer produced object;
// its annotation does not erase the producer's inference before checking.
type _SolvedStructuralConsumer = Expect<Equal<typeof e018, number>>;

// Group 3: Pipeline stages expose any, unknown, never, unions, and contextual targets.
declare const edgeAny: any;
declare const edgeUnknown: unknown;
declare const edgeNever: never;
const e021 = pipeThree(edgeAny, (value) => value, (value) => value);
const e022 = pipeThree(edgeUnknown, (value) => value, (value) => value);
const e023 = pipeThree(edgeNever, (value) => value, (value) => value);
const e024 = pipeThree(1, () => edgeAny, (value) => value);
const e025 = pipeThree(1, () => edgeUnknown, (value) => value);
const e026 = pipeThree(1, () => edgeNever, (value) => value);
const e027 = pipeThree(1, (value): string | number => value, (value) => value);
const e028: string | number = pipeThree(1, (value) => value + 1, (value) => value);
const e029 = pipeThree<number, unknown, boolean>(1, (value) => value, Boolean);
const e030 = pipeThree<number, string, never>(1, String, () => { throw new Error("x"); });
type _E021 = Expect<Equal<Kind<typeof e021>, TODO>>; // TODO(koan) @koan-error
type _E022 = Expect<Equal<Kind<typeof e022>, TODO>>; // TODO(koan) @koan-error
type _E023 = Expect<Equal<Kind<typeof e023>, TODO>>; // TODO(koan) @koan-error
type _E024 = Expect<Equal<Kind<typeof e024>, TODO>>; // TODO(koan) @koan-error
type _E025 = Expect<Equal<Kind<typeof e025>, TODO>>; // TODO(koan) @koan-error
type _E026 = Expect<Equal<Kind<typeof e026>, TODO>>; // TODO(koan) @koan-error
type _E027 = Expect<Equal<typeof e027, TODO>>; // TODO(koan) @koan-error
type _E028 = Expect<Equal<typeof e028, TODO>>; // TODO(koan) @koan-error
type _E029 = Expect<Equal<typeof e029, TODO>>; // TODO(koan) @koan-error
type _E030 = Expect<Equal<Kind<typeof e030>, TODO>>; // TODO(koan) @koan-error

// Demonstration F: special types propagate through a stage whose callbacks return
// their contextually typed inputs unchanged.
type _SolvedAnyPipeline = Expect<Equal<Kind<typeof e021>, "any">>;
type _SolvedUnknownPipeline = Expect<Equal<Kind<typeof e022>, "unknown">>;
type _SolvedNeverPipeline = Expect<Equal<Kind<typeof e023>, "never">>;
// Demonstration G: expected assignment context owns the binding view after the
// numeric pipeline result is checked against it.
type _SolvedPipelineContext = Expect<Equal<typeof e028, number>>;
// Demonstration H: explicit unknown in the middle stage safely contains its input.
type _SolvedExplicitMiddle = Expect<Equal<typeof e029, boolean>>;

// @ts-expect-error The second stage expects the inferred numeric middle value.
pipeThree(1, (value) => value + 1, (value: string) => value.length);
