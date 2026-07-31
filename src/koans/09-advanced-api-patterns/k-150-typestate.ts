import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 150 - TYPESTATE
 * =====================
 *
 * Typestate makes an object's legal operations depend on a type parameter that
 * records its current protocol state. A disconnected session can connect; a
 * connected session can authenticate; an authenticated session can query. Each
 * transition returns a new instantiation, while an explicit `this` parameter
 * prevents the same method from being called in the wrong state.
 *
 * Read `connect(this: Session<Disconnected>): Session<Connected>` aloud as:
 * "this operation requires disconnected evidence and returns connected evidence."
 * The marker is erased, but runtime status checks still defend assertion or
 * JavaScript callers. Typestate improves legal-call construction; it is not a
 * substitute for runtime protocol enforcement.
 */

declare const sessionState: unique symbol;

export type Disconnected = { readonly state: "disconnected" };
export type Connected = { readonly state: "connected" };
export type Authenticated<User> = { readonly state: "authenticated"; readonly user: User };
export type Closed = { readonly state: "closed" };
export type SessionState = Disconnected | Connected | Authenticated<unknown> | Closed;
export type RuntimeStatus = SessionState["state"];

export type StateOf<Value> = Value extends Session<infer State> ? State : never;
export type UserOf<State> = State extends Authenticated<infer User> ? User : never;
export type CanQuery<State> = State extends Authenticated<unknown> ? true : false;
export type CanAuthenticate<State> = State extends Connected ? true : false;

export class Session<State extends SessionState> {
  declare readonly [sessionState]: State;

  private constructor(
    readonly id: string,
    readonly status: RuntimeStatus,
    readonly user: unknown,
  ) {}

  static create(id: string): Session<Disconnected> {
    return new Session(id, "disconnected", undefined);
  }

  connect(this: Session<Disconnected>): Session<Connected> {
    this.expect("disconnected");
    return new Session(this.id, "connected", undefined);
  }

  authenticate<User>(
    this: Session<Connected>,
    user: User,
  ): Session<Authenticated<User>> {
    this.expect("connected");
    return new Session(this.id, "authenticated", user);
  }

  query(this: Session<Authenticated<unknown>>, statement: string): string {
    this.expect("authenticated");
    return `${this.id}:${statement}`;
  }

  close(
    this: Session<Disconnected | Connected | Authenticated<unknown>>,
  ): Session<Closed> {
    if (this.status === "closed") throw new Error("session is already closed");
    return new Session(this.id, "closed", this.user);
  }

  private expect(expected: RuntimeStatus): void {
    if (this.status !== expected) {
      throw new Error(`expected ${expected}, received ${this.status}`);
    }
  }
}

// Part 1: The state parameter distinguishes equal runtime representations.
type _01 = Expect<Equal<StateOf<Session<Disconnected>>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<StateOf<Session<Connected>>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<StateOf<Session<Closed>>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<StateOf<Session<Authenticated<{ id: 1 }>>>, TODO>>; // TODO(koan) @koan-error

// Part 2: Explicit receiver types state transition preconditions.
type _05 = Expect<Equal<ThisParameterType<Session<Disconnected>["connect"]>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<ReturnType<Session<Disconnected>["connect"]>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<ThisParameterType<Session<Connected>["authenticate"]>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<ReturnType<Session<Connected>["authenticate"]>, TODO>>; // TODO(koan) @koan-error

// Part 3: Authentication carries a payload into later state evidence.
type User = { readonly id: "u1"; readonly role: "admin" };
type _09 = Expect<Equal<UserOf<Authenticated<User>>, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<UserOf<Connected>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<StateOf<Session<Authenticated<User>>>["user"], TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<Parameters<Session<Connected>["authenticate"]>, TODO>>; // TODO(koan) @koan-error

// Part 4: Capability predicates summarize the legal operation surface.
type _13 = Expect<Equal<CanQuery<Disconnected>, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<CanQuery<Authenticated<User>>, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<CanAuthenticate<Connected>, TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<CanAuthenticate<Closed>, TODO>>; // TODO(koan) @koan-error

// Part 5: Closing is terminal, while unions and bottom states need care.
type _17 = Expect<Equal<ReturnType<Session<Connected>["close"]>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<ThisParameterType<Session<Closed>["close"]>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<CanQuery<Authenticated<User> | Connected>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<StateOf<Session<never>>, TODO>>; // TODO(koan) @koan-error
