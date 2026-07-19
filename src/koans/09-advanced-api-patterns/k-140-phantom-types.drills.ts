import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type { Approved, CanTransition, Draft, LoosePhantom, StateOf, Submitted, Workflow, WorkflowState } from "./k-140-phantom-types.js";
import { approve, createDraft, mapContent, readContent, submit } from "./k-140-phantom-types.js";

/** GUIDED DRILLS: distinguish states, read the graph, inspect evidence, and trace generic APIs. */

type Extends<From, To> = [From] extends [To] ? true : false;

// State identity over one runtime representation (1-12)
type _01 = Expect<Equal<Extends<Workflow<Draft>, Workflow<Draft>>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Extends<Workflow<Draft>, Workflow<Submitted>>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Extends<Workflow<Submitted>, Workflow<Draft>>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Extends<Workflow<Submitted>, Workflow<Approved>>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Extends<Workflow<Approved>, Workflow<Submitted>>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Equal<Workflow<Draft>, Workflow<Submitted>>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Workflow<Draft>["id"], TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Workflow<Draft>["content"], TODO>>; // TODO(koan) @koan-error
type _09 = Expect<Equal<keyof Workflow<Draft> extends keyof Workflow<Submitted> ? true : false, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Extends<Workflow<Draft>, Readonly<{ id: string; content: string }>>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Extends<Readonly<{ id: string; content: string }>, Workflow<Draft>>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Workflow<Draft> | Workflow<Submitted> extends { content: string } ? true : false, TODO>>; // TODO(koan) @koan-error

// Transition truth table (13-24)
type _13 = Expect<Equal<CanTransition<Draft, Draft>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<CanTransition<Draft, Submitted>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<CanTransition<Draft, Approved>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<CanTransition<Submitted, Draft>, TODO>>; // TODO(koan) @koan-error
type _17 = Expect<Equal<CanTransition<Submitted, Submitted>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<CanTransition<Submitted, Approved>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<CanTransition<Approved, Draft>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<CanTransition<Approved, Submitted>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<CanTransition<Approved, Approved>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<CanTransition<Draft | Submitted, Approved>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<CanTransition<Draft, Submitted | Approved>, TODO>>; // TODO(koan) @koan-error
type _24 = Expect<Equal<CanTransition<WorkflowState, WorkflowState>, TODO>>; // TODO(koan) @koan-error

// Phantom extraction and unions (25-36)
type _25 = Expect<Equal<StateOf<Workflow<Draft>>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<StateOf<Workflow<Submitted>>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<StateOf<Workflow<Approved>>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<StateOf<Workflow<WorkflowState>>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<StateOf<Workflow<Draft> | Workflow<Submitted>>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<StateOf<Workflow<Draft> | string>, TODO>>; // TODO(koan) @koan-error
type _31 = Expect<Equal<StateOf<string>, TODO>>; // TODO(koan) @koan-error
type _32 = Expect<Equal<StateOf<never>, TODO>>; // TODO(koan) @koan-error
type _33 = Expect<Equal<StateOf<Workflow<never>>, TODO>>; // TODO(koan) @koan-error
type _34 = Expect<Equal<Extract<StateOf<WorkflowState extends infer S extends WorkflowState ? Workflow<S> : never>, Draft>, TODO>>; // TODO(koan) @koan-error
type _35 = Expect<Equal<StateOf<Workflow<Draft | Submitted>>, TODO>>; // TODO(koan) @koan-error
type _36 = Expect<Equal<StateOf<Workflow<Draft>>["state"], TODO>>; // TODO(koan) @koan-error

// Public function signatures (37-48)
type _37 = Expect<Equal<Parameters<typeof createDraft>, TODO>>; // TODO(koan) @koan-error
type _38 = Expect<Equal<ReturnType<typeof createDraft>, TODO>>; // TODO(koan) @koan-error
type _39 = Expect<Equal<Parameters<typeof submit>, TODO>>; // TODO(koan) @koan-error
type _40 = Expect<Equal<ReturnType<typeof submit>, TODO>>; // TODO(koan) @koan-error
type _41 = Expect<Equal<Parameters<typeof approve>, TODO>>; // TODO(koan) @koan-error
type _42 = Expect<Equal<ReturnType<typeof approve>, TODO>>; // TODO(koan) @koan-error
type _43 = Expect<Equal<Parameters<typeof readContent>[0], TODO>>; // TODO(koan) @koan-error
type _44 = Expect<Equal<ReturnType<typeof readContent>, TODO>>; // TODO(koan) @koan-error
type _45 = Expect<Equal<Parameters<typeof mapContent>[0], TODO>>; // TODO(koan) @koan-error
type _46 = Expect<Equal<Parameters<typeof mapContent>[1], TODO>>; // TODO(koan) @koan-error
type _47 = Expect<Equal<ReturnType<typeof mapContent>, TODO>>; // TODO(koan) @koan-error
type _48 = Expect<Equal<StateOf<ReturnType<typeof mapContent>>, TODO>>; // TODO(koan) @koan-error

// Optional markers, variance, and wrappers (49-60)
type Shape = Readonly<{ id: string; content: string }>;
type _49 = Expect<Equal<Extends<Shape, LoosePhantom<Shape, Draft>>, TODO>>; // TODO(koan) @koan-error
type _50 = Expect<Equal<Extends<LoosePhantom<Shape, Draft>, Shape>, TODO>>; // TODO(koan) @koan-error
type _51 = Expect<Equal<Extends<LoosePhantom<Shape, Draft>, LoosePhantom<Shape, Submitted>>, TODO>>; // TODO(koan) @koan-error
type _52 = Expect<Equal<Extends<Workflow<Draft>, Workflow<WorkflowState>>, TODO>>; // TODO(koan) @koan-error
type _53 = Expect<Equal<Extends<Workflow<WorkflowState>, Workflow<Draft>>, TODO>>; // TODO(koan) @koan-error
type _54 = Expect<Equal<Array<Workflow<Draft>>[number], TODO>>; // TODO(koan) @koan-error
type _55 = Expect<Equal<Promise<Workflow<Submitted>> extends Promise<infer Value> ? StateOf<Value> : never, TODO>>; // TODO(koan) @koan-error
type _56 = Expect<Equal<Readonly<Workflow<Approved>>, TODO>>; // TODO(koan) @koan-error
type _57 = Expect<Equal<NonNullable<Workflow<Draft> | null>, TODO>>; // TODO(koan) @koan-error
type _58 = Expect<Equal<Extract<Workflow<Draft> | Workflow<Approved>, Workflow<Draft>>, TODO>>; // TODO(koan) @koan-error
type _59 = Expect<Equal<Exclude<Workflow<Draft> | Workflow<Approved>, Workflow<Draft>>, TODO>>; // TODO(koan) @koan-error
type _60 = Expect<Equal<Workflow<never> extends Workflow<Draft> ? true : false, TODO>>; // TODO(koan) @koan-error
