import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-150: typestate — constructions
 * =============================================================================
 *
 * Typestate makes the legal operations of an object a function of its type. The
 * protocol state lives in a parameter, each transition returns the object at a
 * new state, and an explicit `this` parameter states the precondition of every
 * step: `connect(this: Session<Disconnected>)` cannot be called on a session
 * that is not disconnected, because the receiver simply does not fit.
 *
 * Two things about the mechanism are easy to get wrong. Every method stays
 * *visible* in every state — the key set never changes — so the guarantee comes
 * from the receiver type and not from the shape, and `OmitThisParameter` strips
 * it entirely. And a union of states makes a capability predicate answer
 * `boolean` rather than a verdict, which is the type-level way of saying "it
 * depends which one you have". Replace each `TODO` with a type satisfying the
 * assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;
type GivenIsAny<Value> = 0 extends 1 & Value ? true : false;

// The unexported evidence key, and the states that do not carry a payload.
declare const sessionState: unique symbol;
type Disconnected = { readonly state: "disconnected" };
type Connected = { readonly state: "connected" };
type Closed = { readonly state: "closed" };

// One concrete payload, so the authenticated state has something to carry.
type GivenUser = { readonly id: "u1"; readonly role: "admin" };

// The session, given because `this` parameters only exist inside class and
// interface bodies. Every precondition it states is written on the receiver.
declare class Session<State extends SessionState> {
  readonly [sessionState]: State;
  readonly id: string;
  readonly status: RuntimeStatus;
  readonly user: unknown;
  static create(id: string): Session<Disconnected>;
  connect(this: Session<Disconnected>): Session<Connected>;
  authenticate<User>(this: Session<Connected>, user: User): Session<Authenticated<User>>;
  query(this: Session<Authenticated<unknown>>, statement: string): string;
  close(this: Session<Disconnected | Connected | Authenticated<unknown>>): Session<Closed>;
}

// ─── The protocol vocabulary ──────────────────────────────────────────

// 1. Build the one state that carries evidence beyond its own name: the
//    authenticated state remembers who authenticated.
export type Authenticated<User> = TODO; // TODO(koan)

type _01a = Expect<Equal<Authenticated<GivenUser>["state"], "authenticated">>;
type _01b = Expect<
  Equal<
    { carried: Authenticated<GivenUser>["user"]; connectedIsNotAuthenticated: CanQuery<Connected> },
    { carried: GivenUser; connectedIsNotAuthenticated: false }
  >
>;
type _01c = Expect<Equal<keyof Authenticated<GivenUser>, "state" | "user">>;
type _01d = Expect<
  Equal<
    { specificFitsTheWidest: GivenExtends<Authenticated<GivenUser>, Authenticated<unknown>>; connectedIsNotAuthenticated: CanQuery<Connected> },
    { specificFitsTheWidest: true; connectedIsNotAuthenticated: false }
  >
>;

// 2. Build the whole protocol as the union of its states. The payload-carrying
//    member has to appear at its widest, or a specific payload would not be a
//    member of the protocol at all.
export type SessionState = TODO; // TODO(koan)

type _02a = Expect<Equal<Extract<SessionState, Closed>, Closed>>;
type _02b = Expect<
  Equal<
    { extracted: Extract<SessionState, Authenticated<unknown>>; connectedIsNotAuthenticated: CanQuery<Connected> },
    { extracted: Authenticated<unknown>; connectedIsNotAuthenticated: false }
  >
>;
type _02c = Expect<
  Equal<
    { stillOpen: Exclude<SessionState, Closed>; connectedIsNotAuthenticated: CanQuery<Connected> },
    { stillOpen: Disconnected | Connected | Authenticated<unknown>; connectedIsNotAuthenticated: false }
  >
>;
type _02d = Expect<
  Equal<
    { specificPayloadIsAMember: GivenExtends<Authenticated<GivenUser>, SessionState>; connectedIsNotAuthenticated: CanQuery<Connected> },
    { specificPayloadIsAMember: true; connectedIsNotAuthenticated: false }
  >
>;
type _02e = Expect<Equal<GivenExtends<{ readonly state: "paused" }, SessionState>, false>>;

// 3. Build the runtime status: the discriminant of every state, which is what a
//    defensive check at run time actually compares.
export type RuntimeStatus = TODO; // TODO(koan)

type _03a = Expect<Equal<RuntimeStatus, "disconnected" | "connected" | "authenticated" | "closed">>;
type _03b = Expect<Equal<Extract<RuntimeStatus, "closed">, "closed">>;
type _03c = Expect<Equal<GivenExtends<"paused", RuntimeStatus>, false>>;
type _03d = Expect<
  Equal<
    { discriminantIsAStatus: Authenticated<GivenUser>["state"] extends RuntimeStatus ? true : false; connectedIsNotAuthenticated: CanQuery<Connected> },
    { discriminantIsAStatus: true; connectedIsNotAuthenticated: false }
  >
>;

// ─── Reading the evidence back ────────────────────────────────────────

// 4. Build the extractor that recovers the protocol state from a session.
export type StateOf<Value> = TODO; // TODO(koan)

type _04a = Expect<Equal<StateOf<Session<Disconnected>>, Disconnected>>;
type _04b = Expect<
  Equal<
    { recovered: StateOf<Session<Authenticated<GivenUser>>>; connectedIsNotAuthenticated: CanQuery<Connected> },
    { recovered: Authenticated<GivenUser>; connectedIsNotAuthenticated: false }
  >
>;
type _04c = Expect<Equal<StateOf<Session<Disconnected> | Session<Connected>>, Disconnected | Connected>>;
type _04d = Expect<Equal<StateOf<Session<never>>, never>>;
type _04e = Expect<Equal<StateOf<RuntimeStatus>, never>>;

// 5. Build the extractor that reaches one level further and recovers the
//    payload, answering with nothing for every state that never carried one.
export type UserOf<State> = TODO; // TODO(koan)

type _05a = Expect<
  Equal<
    { recovered: UserOf<Authenticated<GivenUser>>; connectedIsNotAuthenticated: CanQuery<Connected> },
    { recovered: GivenUser; connectedIsNotAuthenticated: false }
  >
>;
type _05b = Expect<Equal<UserOf<Connected>, never>>;
type _05c = Expect<
  Equal<
    { recovered: UserOf<Connected | Authenticated<GivenUser>>; connectedIsNotAuthenticated: CanQuery<Connected> },
    { recovered: GivenUser; connectedIsNotAuthenticated: false }
  >
>;
type _05d = Expect<Equal<UserOf<Authenticated<never>>, never>>;

// 6. Build the capability predicate for the operation that needs the strongest
//    evidence.
export type CanQuery<State> = TODO; // TODO(koan)

type _06a = Expect<Equal<CanQuery<Authenticated<GivenUser>>, true>>;
type _06b = Expect<Equal<CanQuery<Disconnected>, false>>;
type _06c = Expect<Equal<CanQuery<Closed>, false>>;
type _06d = Expect<Equal<CanQuery<Connected | Authenticated<GivenUser>>, boolean>>;
type _06e = Expect<Equal<CanQuery<never>, never>>;

// 7. Build the capability predicate one step earlier in the protocol.
export type CanAuthenticate<State> = TODO; // TODO(koan)

type _07a = Expect<Equal<CanAuthenticate<Connected>, true>>;
type _07b = Expect<Equal<CanAuthenticate<Disconnected>, false>>;
type _07c = Expect<Equal<CanAuthenticate<Closed>, false>>;
type _07d = Expect<Equal<CanAuthenticate<Disconnected | Connected>, boolean>>;

// 8. Build the transition graph: from each state, the states it may legally
//    move to. The terminal state goes nowhere.
export type LegalNext<State> = TODO; // TODO(koan)

type _08a = Expect<Equal<LegalNext<Disconnected>, Connected | Closed>>;
type _08b = Expect<
  Equal<
    { next: LegalNext<Connected>; connectedIsNotAuthenticated: CanQuery<Connected> },
    { next: Authenticated<unknown> | Closed; connectedIsNotAuthenticated: false }
  >
>;
type _08c = Expect<Equal<LegalNext<Authenticated<GivenUser>>, Closed>>;
type _08d = Expect<Equal<LegalNext<Closed>, never>>;
type _08e = Expect<Equal<[LegalNext<Closed>] extends [never] ? "terminal" : "open", "terminal">>;

// ─── The preconditions, written down ──────────────────────────────────

// 9. Build the operation signatures with their receivers. This is where a
//    typestate API keeps its promises: the state a step needs is stated as the
//    type of `this`, not checked in the body.
export type SessionApi = TODO; // TODO(koan)

type _09a = Expect<
  Equal<
    { required: ThisParameterType<SessionApi["connect"]>; connectedIsNotAuthenticated: CanQuery<Connected> },
    { required: Session<Disconnected>; connectedIsNotAuthenticated: false }
  >
>;
type _09b = Expect<
  Equal<
    { produced: ReturnType<SessionApi["connect"]>; connectedIsNotAuthenticated: CanQuery<Connected> },
    { produced: Session<Connected>; connectedIsNotAuthenticated: false }
  >
>;
type _09c = Expect<
  Equal<
    { required: ThisParameterType<SessionApi["query"]>; connectedIsNotAuthenticated: CanQuery<Connected> },
    { required: Session<Authenticated<unknown>>; connectedIsNotAuthenticated: false }
  >
>;
type _09d = Expect<Equal<Parameters<SessionApi["query"]>, [statement: string]>>;
type _09e = Expect<Equal<ReturnType<SessionApi["query"]>, string>>;

// 10. Build the reader that names a step's precondition, so a whole protocol can
//     be audited without reading any bodies.
export type PreconditionOf<Method> = TODO; // TODO(koan)

type _10a = Expect<
  Equal<
    {
      required: PreconditionOf<Session<Disconnected>["connect"]>;
      connectedIsNotAuthenticated: CanQuery<Connected>;
    },
    { required: Session<Disconnected>; connectedIsNotAuthenticated: false }
  >
>;
type _10b = Expect<
  Equal<
    {
      required: PreconditionOf<Session<Connected>["authenticate"]>;
      connectedIsNotAuthenticated: CanQuery<Connected>;
    },
    { required: Session<Connected>; connectedIsNotAuthenticated: false }
  >
>;
type _10c = Expect<
  Equal<
    {
      required: PreconditionOf<Session<Closed>["close"]>;
      connectedIsNotAuthenticated: CanQuery<Connected>;
    },
    {
      required: Session<Disconnected | Connected | Authenticated<unknown>>;
      connectedIsNotAuthenticated: false;
    }
  >
>;
type _10d = Expect<Equal<PreconditionOf<() => void>, unknown>>;

// ─── What the mechanism does and does not guarantee ───────────────────

// 11. Report the visibility. The key set is the same in every state — a method
//     you may not call is still there, and the precondition it states is the
//     only thing standing in the way.
export type VisibilityProfile = TODO; // TODO(koan)

type _11a = Expect<Equal<VisibilityProfile["connectIsVisibleWhenClosed"], true>>;
type _11b = Expect<Equal<VisibilityProfile["queryIsVisibleWhenDisconnected"], true>>;
type _11c = Expect<Equal<VisibilityProfile["keySetsAgree"], true>>;
type _11d = Expect<
  Equal<
    {
      required: VisibilityProfile["requiredReceiverWhenClosed"];
      connectedIsNotAuthenticated: CanQuery<Connected>;
    },
    { required: Session<Disconnected>; connectedIsNotAuthenticated: false }
  >
>;
type _11e = Expect<Equal<VisibilityProfile["closedIsNotDisconnected"], false>>;

// 12. Report the escape hatch. Removing the receiver removes the precondition
//     and leaves a callable that promises the transition without demanding the
//     evidence — which is exactly why the runtime check in the body is not
//     redundant.
export type ErasureProfile = TODO; // TODO(koan)

type _12a = Expect<
  Equal<
    { erased: ErasureProfile["erased"]; connectedIsNotAuthenticated: CanQuery<Connected> },
    { erased: () => Session<Connected>; connectedIsNotAuthenticated: false }
  >
>;
type _12b = Expect<Equal<ErasureProfile["erasedReceiver"], unknown>>;
type _12c = Expect<
  Equal<
    { produced: ErasureProfile["erasedStillTransitions"]; connectedIsNotAuthenticated: CanQuery<Connected> },
    { produced: Session<Connected>; connectedIsNotAuthenticated: false }
  >
>;
type _12d = Expect<Equal<ErasureProfile["erasedQueryArguments"], [statement: string]>>;
type _12e = Expect<Equal<ErasureProfile["erasedQueryResult"], string>>;

// 13. Report the union case. A session whose state is not pinned answers every
//     capability question with `boolean`, which is the type-level form of "not
//     yet decided".
export type UnionProfile = TODO; // TODO(koan)

type _13a = Expect<Equal<UnionProfile["queryOnUnion"], boolean>>;
type _13b = Expect<Equal<UnionProfile["authenticateOnUnion"], boolean>>;
type _13c = Expect<Equal<UnionProfile["stateOfUnionOfSessions"], Disconnected | Connected>>;
type _13d = Expect<
  Equal<
    { payload: UnionProfile["payloadOfUnion"]; connectedIsNotAuthenticated: CanQuery<Connected> },
    { payload: GivenUser; connectedIsNotAuthenticated: false }
  >
>;
type _13e = Expect<Equal<UnionProfile["decidedOnce"], true>>;

// 14. Report the special types at the edges of the protocol.
export type SpecialTypeProfile = TODO; // TODO(koan)

type _14a = Expect<Equal<SpecialTypeProfile["bottomState"], never>>;
type _14b = Expect<Equal<SpecialTypeProfile["bottomSessionFitsAnywhere"], true>>;
type _14c = Expect<Equal<SpecialTypeProfile["anyStateStaysAny"], true>>;
type _14d = Expect<Equal<SpecialTypeProfile["capabilityOfAnything"], boolean>>;
type _14e = Expect<Equal<SpecialTypeProfile["capabilityOfTop"], false>>;

// 15. Report the payload flowing through the protocol: authentication is where
//     a value enters the type, and it stays retrievable from then on.
export type PayloadProfile = TODO; // TODO(koan)

type _15a = Expect<
  Equal<
    { produced: PayloadProfile["producedByAuthenticate"]; connectedIsNotAuthenticated: CanQuery<Connected> },
    { produced: Session<Authenticated<unknown>>; connectedIsNotAuthenticated: false }
  >
>;
type _15b = Expect<Equal<PayloadProfile["demandedByAuthenticate"], [user: unknown]>>;
type _15c = Expect<
  Equal<
    { stored: PayloadProfile["storedInTheState"]; connectedIsNotAuthenticated: CanQuery<Connected> },
    { stored: GivenUser; connectedIsNotAuthenticated: false }
  >
>;
type _15d = Expect<
  Equal<
    { recovered: PayloadProfile["recoveredAgain"]; connectedIsNotAuthenticated: CanQuery<Connected> },
    { recovered: GivenUser; connectedIsNotAuthenticated: false }
  >
>;

// 16. Report the terminal state. Closing is reachable from everything that is
//     still open, and nothing is reachable from it.
export type TerminalProfile = TODO; // TODO(koan)

type _16a = Expect<
  Equal<
    { produced: TerminalProfile["closeResult"]; connectedIsNotAuthenticated: CanQuery<Connected> },
    { produced: Session<Closed>; connectedIsNotAuthenticated: false }
  >
>;
type _16b = Expect<
  Equal<
    { accepts: TerminalProfile["closeAccepts"]; connectedIsNotAuthenticated: CanQuery<Connected> },
    {
      accepts: Session<Disconnected | Connected | Authenticated<unknown>>;
      connectedIsNotAuthenticated: false;
    }
  >
>;
type _16c = Expect<Equal<TerminalProfile["nextFromClosed"], never>>;
type _16d = Expect<Equal<TerminalProfile["closedCanQuery"], false>>;

// ─── Walking the protocol ─────────────────────────────────────────────

// 17. Build the walker that runs a sequence of intended states from a starting
//     state, landing on the last one or answering `never` the moment a step is
//     not on the graph.
export type RunProtocol<
  From extends SessionState,
  Steps extends readonly SessionState[],
> = TODO; // TODO(koan)

type _17a = Expect<
  Equal<
    {
      landed: RunProtocol<Disconnected, [Connected, Authenticated<unknown>]>;
      connectedIsNotAuthenticated: CanQuery<Connected>;
    },
    { landed: Session<Authenticated<unknown>>; connectedIsNotAuthenticated: false }
  >
>;
type _17b = Expect<Equal<RunProtocol<Disconnected, [Authenticated<unknown>]>, never>>;
type _17c = Expect<
  Equal<
    { landed: RunProtocol<Disconnected, []>; connectedIsNotAuthenticated: CanQuery<Connected> },
    { landed: Session<Disconnected>; connectedIsNotAuthenticated: false }
  >
>;
type _17d = Expect<Equal<RunProtocol<Closed, [Connected]>, never>>;
type _17e = Expect<Equal<RunProtocol<Connected, [Closed, Connected]>, never>>;

// 18. Report a whole run: where it landed, what state that is, and which
//     operations are legal once it gets there.
export type ProtocolReport<Steps extends readonly SessionState[]> = TODO; // TODO(koan)

type _18a = Expect<Equal<ProtocolReport<[Connected]>["canAuthenticate"], true>>;
type _18b = Expect<Equal<ProtocolReport<[Connected]>["canQuery"], false>>;
type _18c = Expect<Equal<ProtocolReport<[Connected, Authenticated<unknown>]>["canQuery"], true>>;
type _18d = Expect<Equal<ProtocolReport<[Authenticated<unknown>]>["legal"], false>>;
type _18e = Expect<Equal<ProtocolReport<[Authenticated<unknown>]>["state"], never>>;
