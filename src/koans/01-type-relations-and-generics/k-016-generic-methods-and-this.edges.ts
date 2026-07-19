import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  Collection,
  FluentBase,
  Model,
  SpecializedFluent,
  invokeWith,
} from "./k-016-generic-methods-and-this.js";

/** K-016 edges: method extraction and receiver typing reveal where this really lives. */

// Group 1: The fake this parameter is inspected separately from runtime parameters.
function edgeMethod(this: { factor: number }, value: number, text: string): string {
  return `${value * this.factor}:${text}`;
}
type E001 = ThisParameterType<typeof edgeMethod>;
type E002 = OmitThisParameter<typeof edgeMethod>;
type E003 = Parameters<typeof edgeMethod>;
type E004 = ReturnType<typeof edgeMethod>;
const e005 = edgeMethod.call({ factor: 2 }, 3, "x");
const e006 = edgeMethod.apply({ factor: 2 }, [3, "x"]);
const e007 = edgeMethod.bind({ factor: 2 });
const e008 = edgeMethod.bind({ factor: 2 }, 3);
const e009 = invokeWith(edgeMethod, { factor: 2 }, 3, "x");
const e010: OmitThisParameter<typeof edgeMethod> = edgeMethod.bind({ factor: 1 });
type _E001 = Expect<Equal<E001, TODO>>; // TODO(koan) @koan-error
type _E002 = Expect<Equal<E002, TODO>>; // TODO(koan) @koan-error
type _E003 = Expect<Equal<E003, TODO>>; // TODO(koan) @koan-error
type _E004 = Expect<Equal<E004, TODO>>; // TODO(koan) @koan-error
type _E005 = Expect<Equal<typeof e005, TODO>>; // TODO(koan) @koan-error
type _E006 = Expect<Equal<typeof e006, TODO>>; // TODO(koan) @koan-error
type _E007 = Expect<Equal<typeof e007, TODO>>; // TODO(koan) @koan-error
type _E008 = Expect<Equal<typeof e008, TODO>>; // TODO(koan) @koan-error
type _E009 = Expect<Equal<typeof e009, TODO>>; // TODO(koan) @koan-error
type _E010 = Expect<Equal<typeof e010, TODO>>; // TODO(koan) @koan-error

// Demonstration A: the fake receiver is absent from Parameters but available
// through ThisParameterType.
type _SolvedThis = Expect<Equal<E001, { factor: number }>>;
type _SolvedParameters = Expect<Equal<E003, [value: number, text: string]>>;
// Demonstration B: binding removes the receiver and can also consume leading args.
type _SolvedBound = Expect<Equal<typeof e007, (value: number, text: string) => string>>;
type _SolvedPartiallyBound = Expect<Equal<typeof e008, (text: string) => string>>;

// @ts-expect-error The receiver does not satisfy the explicit this contract.
edgeMethod.call({ factor: "two" }, 3, "x");

// Group 2: Prototype extraction loses runtime receiver; arrow properties capture it.
class ReceiverDemo {
  constructor(readonly prefix: string) {}
  method(value: string): string { return this.prefix + value; }
  arrow = (value: string): string => this.prefix + value;
}
const receiver = new ReceiverDemo("#");
const extractedMethod = receiver.method;
const extractedArrow = receiver.arrow;
const e011 = extractedMethod;
const e012 = extractedArrow;
const e013 = extractedMethod.bind(receiver);
const e014 = extractedArrow.bind({ prefix: "!" });
const e015 = e013("a");
const e016 = e014("a");
const baseView: FluentBase = new SpecializedFluent();
const e017 = baseView.label("a");
const derivedView = new SpecializedFluent();
const e018 = derivedView.label("a");
const e019 = derivedView.label("a").enable();
const e020 = new Collection([1]).tap(() => {});
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

// Demonstration C: extraction preserves the call signature but JavaScript does
// not carry the original receiver with a prototype method.
type _SolvedExtractedSignature = Expect<Equal<typeof e011, (value: string) => string>>;
// Demonstration D: rebinding an arrow function cannot replace its lexical this.
type _SolvedArrowResult = Expect<Equal<typeof e016, string>>;
// Demonstration E: polymorphic this follows the static receiver view. Widening a
// derived instance to FluentBase makes the inherited call return FluentBase.
type _SolvedBaseView = Expect<Equal<typeof e017, FluentBase>>;
type _SolvedDerivedView = Expect<Equal<typeof e018, SpecializedFluent>>;

// Group 3: Generic methods choose per call, including special and union results.
const values = new Collection([1, 2]);
const e021 = values.map((value) => value as 1 | 2);
const e022 = values.map<unknown>((value) => value);
const e023 = values.map<any>((value) => value);
const e024 = values.map<never>(() => { throw new Error("never"); });
const e025 = values.reduce<unknown>(0, (result) => result);
const e026 = values.reduce<number | string>(0, (result, value) => value ? result : "none");
const model = new Model<{ id: number; optional?: string }>({ id: 1 });
const e027 = model.get("optional");
const modelKey: "id" | "optional" = Math.random() ? "id" : "optional";
const e028 = model.get(modelKey);
const e029 = model.project();
const e030 = model.project(modelKey);
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

// Demonstration F: explicit method arguments replace inference for just that call;
// the original Collection<number> instance remains unchanged.
type _SolvedUnknownMap = Expect<Equal<typeof e022, Collection<unknown>>>;
type _SolvedNeverMap = Expect<Equal<typeof e024, Collection<never>>>;
// Demonstration G: optionality and union-valued keys flow through method-local K.
type _SolvedOptionalGet = Expect<Equal<typeof e027, string | undefined>>;
type _SolvedUnionGet = Expect<Equal<typeof e028, string | number | undefined>>;
// Demonstration H: omitting a generic rest argument supplies no candidate, so
// Keys falls back to its `keyof T` constraint and the projection is the full model.
type _SolvedOmittedProject = Expect<
  Equal<typeof e029, Pick<{ id: number; optional?: string }, "id" | "optional">>
>;

// @ts-expect-error A method-local key still must belong to the class-owned T.
model.get("missing");
