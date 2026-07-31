import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type AppEvents,
  type EventArgs,
  type EventCall,
  type EventCallFor,
  type EventListener,
  type EventNames,
  type EventRecord,
  type EventSchema,
  type EventsMatching,
  type FirstArgument,
  shutdownEvent,
} from "./k-152-type-safe-event-emitters.js";

/**
 * EDGE CASES AND GOTCHAS
 * ======================
 *
 * The key sharp edge is correlation loss. A union of complete call tuples says
 * which name belongs with which arguments; a tuple built from separate unions
 * permits cross-pairings. Listener parameters add contravariance, while `void`
 * callbacks deliberately accept value-returning implementations.
 */

type Extends<From, To> = [From] extends [To] ? true : false;
type IsAny<Value> = 0 extends 1 & Value ? true : false;
type SatisfiesSchema<Value> = Value extends EventSchema<Value> ? true : false;
type BroadEvents = { [name: string]: [value: number] };
type UncorrelatedCall = [
  event: EventNames<AppEvents>,
  ...args: EventArgs<AppEvents, EventNames<AppEvents>>,
];

// Pre-solved demonstrations put the surprising rules beside their cause.
type _DemoCorrelated = Expect<Equal<EventCallFor<AppEvents, "ready" | "progress">, ["ready"] | ["progress", number]>>;
type _DemoOptional = Expect<Equal<EventArgs<AppEvents, "error">["length"], 1 | 2>>;
type _DemoVoidReturn = Expect<Equal<Extends<() => number, () => void>, true>>;
type _DemoInvalidSchema = Expect<Equal<SatisfiesSchema<{ broken: string }>, false>>;
// Runtime listener storage still uses an assertion internally: heterogeneous callbacks cannot be represented precisely in one mutable Set.

// 1. Separate unions lose the event/arguments pairing (1-8)
type _01 = Expect<Equal<EventCallFor<AppEvents, "ready" | "progress">, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<UncorrelatedCall, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Extends<["ready", number], UncorrelatedCall>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Extends<["ready", number], EventCall<AppEvents>>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<Extract<EventCall<AppEvents>, ["ready", ...unknown[]]>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Extract<EventCall<AppEvents>, ["progress", ...unknown[]]>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<EventRecord<AppEvents>["name"], TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Extract<EventRecord<AppEvents>, { name: "error" }>["args"], TODO>>; // TODO(koan) @koan-error

// 2. Optional tuples and conditional matching have exact assignability rules (9-16)
type _09 = Expect<Equal<EventArgs<AppEvents, "error">["length"], TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<FirstArgument<AppEvents, "error">, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<FirstArgument<AppEvents, "ready">, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<FirstArgument<AppEvents, "ready" | "progress">, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<EventsMatching<AppEvents, [number]>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<EventsMatching<AppEvents, [unknown]>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<EventsMatching<AppEvents, readonly unknown[]>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<SatisfiesSchema<{ optional: [value?: number] }>, TODO>>; // TODO(koan) @koan-error

// 3. Listener inputs are contravariant; void return handling is permissive (17-23)
type MessageListener = EventListener<AppEvents, "message">;
type BroadMessageListener = (text: string | number, from: { readonly id: string }) => void;
type ReturningMessageListener = (text: string, from: { readonly id: string }) => number;
type _17 = Expect<Equal<Extends<BroadMessageListener, MessageListener>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<Extends<MessageListener, BroadMessageListener>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Extends<ReturningMessageListener, MessageListener>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<ReturnType<ReturningMessageListener>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<ReturnType<MessageListener>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<Extends<(...args: never[]) => void, MessageListener>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<Extends<(...args: unknown[]) => void, MessageListener>, TODO>>; // TODO(koan) @koan-error

// 4. Broad keys, special types, and schema boundaries (24-30)
type _24 = Expect<Equal<EventNames<BroadEvents>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<EventArgs<BroadEvents, string>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<EventCall<BroadEvents>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<EventCallFor<AppEvents, never>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<IsAny<EventArgs<any, any>>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<SatisfiesSchema<{ broken: string }>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<Extract<EventNames<AppEvents>, typeof shutdownEvent>, TODO>>; // TODO(koan) @koan-error
