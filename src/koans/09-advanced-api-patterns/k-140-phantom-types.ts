import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 140 - PHANTOM TYPES
 * =========================
 *
 * A phantom parameter influences assignability without contributing runtime
 * data. The value below stores an id and content; its `State` parameter appears
 * only behind a declared symbol and is erased. Functions move the same runtime
 * shape through draft, submitted, and approved states by changing that parameter.
 *
 * Read `Workflow<Submitted>` aloud as: "a workflow value for which the type
 * checker has submitted-state evidence." A transition consumes the evidence it
 * requires and returns new evidence. This is useful when the runtime object need
 * not duplicate state, or when the state is guaranteed by the API sequence itself.
 */

declare const phantom: unique symbol;

export type Draft = { readonly state: "draft" };
export type Submitted = { readonly state: "submitted" };
export type Approved = { readonly state: "approved" };
export type WorkflowState = Draft | Submitted | Approved;

export type Workflow<State extends WorkflowState> = Readonly<{
  id: string;
  content: string;
  [phantom]: State;
}>;

export type LoosePhantom<Value, Marker> = Value & { readonly [phantom]?: Marker };

export type StateOf<Value> = Value extends Workflow<infer State> ? State : never;

export type CanTransition<From extends WorkflowState, To extends WorkflowState> =
  From extends Draft
    ? To extends Submitted ? true : false
    : From extends Submitted
      ? To extends Approved ? true : false
      : false;

type Extends<From, To> = [From] extends [To] ? true : false;

// Part 1: Equal runtime fields carry different compile-time lifecycle evidence.
type _01 = Expect<Equal<Extends<Workflow<Draft>, Workflow<Submitted>>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Extends<Workflow<Submitted>, Workflow<Draft>>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<keyof Workflow<Draft>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Workflow<Draft>["content"], TODO>>; // TODO(koan) @koan-error

// Part 2: Transition signatures encode the legal state graph.
type _05 = Expect<Equal<CanTransition<Draft, Submitted>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<CanTransition<Submitted, Approved>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<CanTransition<Draft, Approved>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<CanTransition<Approved, Draft>, TODO>>; // TODO(koan) @koan-error

// Part 3: Conditional inference can inspect phantom evidence.
type _09 = Expect<Equal<StateOf<Workflow<Draft>>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<StateOf<Workflow<Submitted>>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<StateOf<string>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<StateOf<Workflow<Draft> | Workflow<Approved>>, TODO>>; // TODO(koan) @koan-error

// Part 4: Generic APIs either preserve or intentionally transform the phantom.
type _13 = Expect<Equal<ReturnType<typeof createDraft>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<ReturnType<typeof submit>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<ReturnType<typeof approve>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<ReturnType<typeof readContent>, TODO>>; // TODO(koan) @koan-error

// Part 5: Optional markers, unions, and bottom types reveal important tradeoffs.
type Shape = Readonly<{ id: string; content: string }>;
type _17 = Expect<Equal<Extends<Shape, LoosePhantom<Shape, Draft>>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Extends<Workflow<Draft>, Shape>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<StateOf<Workflow<never>>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<StateOf<Workflow<WorkflowState>>, TODO>>; // TODO(koan) @koan-error

let nextId = 1;

export function createDraft(content: string): Workflow<Draft> {
  return { id: `doc-${nextId++}`, content } as Workflow<Draft>;
}

export function submit(value: Workflow<Draft>): Workflow<Submitted> {
  return value as unknown as Workflow<Submitted>;
}

export function approve(value: Workflow<Submitted>): Workflow<Approved> {
  return value as unknown as Workflow<Approved>;
}

export function readContent<State extends WorkflowState>(value: Workflow<State>): string {
  return value.content;
}

export function mapContent<State extends WorkflowState>(
  value: Workflow<State>,
  transform: (content: string) => string,
): Workflow<State> {
  return { ...value, content: transform(value.content) } as Workflow<State>;
}
