import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type { Approved, CanTransition, Draft, LoosePhantom, StateOf, Submitted, Workflow, WorkflowState } from "./k-140-phantom-types.js";
import { mapContent } from "./k-140-phantom-types.js";

/** EDGE CASES: optional evidence, covariance, union distribution, any/never, inference, assertions, and erasure. */

type Extends<From, To> = [From] extends [To] ? true : false;
type IsAny<T> = 0 extends 1 & T ? true : false;
type Shape = Readonly<{ id: string; content: string }>;

// Pre-solved demonstrations expose the core tradeoffs.
type _DemoDistinct = Expect<Equal<Extends<Workflow<Draft>, Workflow<Submitted>>, false>>;
type _DemoCovariant = Expect<Equal<Extends<Workflow<Draft>, Workflow<WorkflowState>>, true>>;
type _DemoOptionalForgery = Expect<Equal<Extends<Shape, LoosePhantom<Shape, Draft>>, true>>;
type _DemoNeverState = Expect<Equal<StateOf<Workflow<never>>, never>>;
// No runtime field proves state; an assertion can fabricate any phantom state.

// 1. Required versus optional phantom markers change constructibility (1-8)
type _01 = Expect<Equal<Extends<Shape, Workflow<Draft>>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<Extends<Workflow<Draft>, Shape>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Extends<Shape, LoosePhantom<Shape, Draft>>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Extends<LoosePhantom<Shape, Draft>, Shape>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Extends<LoosePhantom<Shape, Draft>, LoosePhantom<Shape, Submitted>>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<StateOf<LoosePhantom<Shape, Draft>>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<keyof Workflow<Draft> extends keyof Shape ? true : false, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<keyof Shape extends keyof Workflow<Draft> ? true : false, TODO>>; // TODO(koan) @koan-error

// 2. This phantom position is covariant and distributes through unions (9-16)
type _09 = Expect<Equal<Extends<Workflow<Draft>, Workflow<WorkflowState>>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<Extends<Workflow<WorkflowState>, Workflow<Draft>>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<Extends<Workflow<Draft | Submitted>, Workflow<WorkflowState>>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<StateOf<Workflow<Draft | Submitted>>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<StateOf<Workflow<Draft> | Workflow<Submitted>>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<CanTransition<Draft | Submitted, Approved>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<CanTransition<Draft, Submitted | Approved>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Extract<StateOf<Workflow<WorkflowState>>, Approved>, TODO>>; // TODO(koan) @koan-error

// 3. Generic APIs can preserve evidence, erase it, or fail to infer it (17-23)
type _17 = Expect<Equal<ReturnType<typeof mapContent>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<StateOf<ReturnType<typeof mapContent>>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<ReturnType<(value: Workflow<Draft>) => Shape>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<Parameters<<State extends WorkflowState>(value: Workflow<State>) => State>[0], TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<ReturnType<<State extends WorkflowState>(value: Workflow<State>) => State>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<StateOf<Awaited<Promise<Workflow<Submitted>>>>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<StateOf<Readonly<Workflow<Approved>>>, TODO>>; // TODO(koan) @koan-error

// 4. any, unknown, never, and broad states stress evidence extraction (24-30)
type _24 = Expect<Equal<IsAny<StateOf<any>>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<StateOf<unknown>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<StateOf<never>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<StateOf<Workflow<never>>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<StateOf<Workflow<WorkflowState>>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<Extends<Workflow<never>, Workflow<Draft>>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<CanTransition<never, Submitted>, TODO>>; // TODO(koan) @koan-error
