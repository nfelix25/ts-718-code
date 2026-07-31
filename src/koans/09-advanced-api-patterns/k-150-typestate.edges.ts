import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import type { Authenticated, CanAuthenticate, CanQuery, Closed, Connected, Disconnected, RuntimeStatus, SessionState, StateOf, UserOf } from "./k-150-typestate.js";
import { Session } from "./k-150-typestate.js";

/** EDGE CASES: visible-but-uncallable methods, erased receivers, union protocols, assertions, and runtime guards. */

type Extends<From, To> = [From] extends [To] ? true : false;
type IsAny<Value> = 0 extends 1 & Value ? true : false;
type User = { readonly id: "u1" };

// Pre-solved demonstrations distinguish method presence from legal invocation.
type _DemoVisible = Expect<Equal<"connect" extends keyof Session<Closed> ? true : false, true>>;
type _DemoReceiver = Expect<Equal<ThisParameterType<Session<Closed>["connect"]>, Session<Disconnected>>>;
type _DemoClosedReturn = Expect<Equal<ReturnType<Session<Connected>["close"]>, Session<Closed>>>;
type _DemoUnionCapability = Expect<Equal<CanQuery<Connected | Authenticated<User>>, boolean>>;
// Assertions or OmitThisParameter can bypass static legality; runtime guards still reject the forged call.

// 1. Methods stay visible; explicit this carries legality (1-8)
type _01 = Expect<Equal<keyof Session<Disconnected>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<keyof Session<Closed>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<Equal<keyof Session<Disconnected>, keyof Session<Closed>>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<Session<Closed>["connect"], TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<ThisParameterType<Session<Closed>["connect"]>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<Session<Disconnected>["query"], TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<ThisParameterType<Session<Disconnected>["query"]>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Parameters<Session<Disconnected>["query"]>, TODO>>; // TODO(koan) @koan-error

// 2. Removing the receiver removes the static precondition (9-16)
type _09 = Expect<Equal<OmitThisParameter<Session<Disconnected>["connect"]>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<ThisParameterType<OmitThisParameter<Session<Disconnected>["connect"]>>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<ReturnType<OmitThisParameter<Session<Disconnected>["connect"]>>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<OmitThisParameter<Session<Connected>["authenticate"]>, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<Parameters<OmitThisParameter<Session<Connected>["authenticate"]>>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<OmitThisParameter<Session<Authenticated<User>>["query"]>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<Parameters<OmitThisParameter<Session<Authenticated<User>>["query"]>>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<ReturnType<OmitThisParameter<Session<Authenticated<User>>["query"]>>, TODO>>; // TODO(koan) @koan-error

// 3. Union states distribute extraction and capability answers (17-23)
type _17 = Expect<Equal<StateOf<Session<Disconnected> | Session<Connected>>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<CanQuery<Disconnected | Authenticated<User>>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<CanAuthenticate<Disconnected | Connected>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<UserOf<Connected | Authenticated<User>>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<Extract<SessionState, Authenticated<unknown>>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<Exclude<SessionState, Closed>, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<StateOf<Session<Authenticated<User> | Connected>>, TODO>>; // TODO(koan) @koan-error

// 4. never, any, unknown, and runtime status (24-30)
type _24 = Expect<Equal<StateOf<Session<never>>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<Extends<Session<never>, Session<Closed>>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<IsAny<StateOf<Session<any>>>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<CanQuery<any>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<CanQuery<unknown>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<UserOf<Authenticated<never>>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<RuntimeStatus, TODO>>; // TODO(koan) @koan-error

