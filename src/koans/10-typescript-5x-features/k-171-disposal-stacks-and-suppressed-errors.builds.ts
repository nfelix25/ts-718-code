import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-171: disposal stacks and suppressed errors — constructions
 * =============================================================================
 *
 * A `using` binding ties cleanup to a block. A `DisposableStack` unties it: the
 * stack collects resources however you like — an existing disposable with `use`,
 * something foreign with `adopt`, a bare callback with `defer` — and disposes
 * them in reverse order when *it* is disposed. Because the stack is itself
 * disposable, one `using` on the stack covers everything in it.
 *
 * `move` is what makes ownership transferable: it hands the contents to a new
 * stack and leaves the old one empty, so a factory can build resources under a
 * `using` guard and then release that guard only once construction has
 * succeeded. And when cleanup itself throws while an error is already in flight,
 * neither is lost — they are wrapped in a `SuppressedError`, whose two payload
 * properties are `any` because nothing constrains what may be thrown. Replace
 * each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

// A resource for the stack to hold.
type GivenResource = { readonly name: string; disposed: boolean } & Disposable;

// ─── The stack's own contract ─────────────────────────────────────────

// 1. Build the reader that names what kind of resource a given stack accepts.
export type StackResource<Value> = TODO; // TODO(koan)

type _01a = Expect<Equal<StackResource<DisposableStack>, Disposable>>;
type _01b = Expect<Equal<StackResource<AsyncDisposableStack>, AsyncDisposable>>;
type _01c = Expect<Equal<StackResource<GivenResource>, never>>;
type _01d = Expect<Equal<StackResource<string>, never>>;

// 2. Build the reader for what `move` hands back. It is the same kind of stack,
//    which is what makes ownership transfer type-preserving.
export type MoveResult<Stack extends DisposableStack | AsyncDisposableStack> = TODO; // TODO(koan)

type _02a = Expect<Equal<MoveResult<DisposableStack>, DisposableStack>>;
type _02b = Expect<Equal<MoveResult<AsyncDisposableStack>, AsyncDisposableStack>>;
type _02c = Expect<
  Equal<
    {
      moveKeepsTheKind: Equal<MoveResult<DisposableStack>, DisposableStack>;
      andDoesNotCrossOver: Equal<MoveResult<DisposableStack>, AsyncDisposableStack>;
    },
    { moveKeepsTheKind: true; andDoesNotCrossOver: false }
  >
>;
type _02d = Expect<
  Equal<
    {
      movedStackIsStillDisposable: GivenExtends<MoveResult<DisposableStack>, Disposable>;
      aPlainValueIsNotAResource: StackResource<GivenResource>;
    },
    { movedStackIsStillDisposable: true; aPlainValueIsNotAResource: never }
  >
>;

// 3. Build the `any` detector — needed because the error payloads below are
//    genuinely unconstrained, and saying so precisely matters.
export type IsAny<Value> = TODO; // TODO(koan)

type _03a = Expect<Equal<IsAny<any>, true>>;
type _03b = Expect<Equal<IsAny<unknown>, false>>;
type _03c = Expect<Equal<IsAny<never>, false>>;
type _03d = Expect<Equal<IsAny<Error>, false>>;

// ─── What the synchronous stack offers ────────────────────────────────

// 4. Report the stack as a resource in its own right. That is the whole trick:
//    one `using` on the stack disposes everything it collected.
export type StackContractProfile = TODO; // TODO(koan)

type _04a = Expect<Equal<StackContractProfile["isDisposable"], true>>;
type _04b = Expect<Equal<StackContractProfile["disposedFlag"], boolean>>;
type _04c = Expect<Equal<StackContractProfile["explicitDisposal"], void>>;
type _04d = Expect<Equal<StackContractProfile["contractDisposal"], void>>;
type _04e = Expect<Equal<StackContractProfile["bothAreTheSame"], true>>;

// 5. Report the three ways to put something into a stack. `use` takes a
//    resource, `adopt` takes a value and a cleanup for it, and `defer` takes a
//    bare callback — the escape hatch for things with no disposal method at all.
export type CollectionProfile = TODO; // TODO(koan)

type _05a = Expect<Equal<CollectionProfile["useArity"], 1>>;
type _05b = Expect<Equal<CollectionProfile["adoptArity"], 2>>;
type _05c = Expect<Equal<CollectionProfile["deferArguments"], [onDispose: () => void]>>;
type _05d = Expect<Equal<CollectionProfile["deferResult"], void>>;
type _05e = Expect<Equal<CollectionProfile["deferCallbackResult"], void>>;

// 6. Report `use` giving the value straight back. That is what lets a resource
//    be registered and bound in one expression.
export type UseProfile = TODO; // TODO(koan)

type _06a = Expect<Equal<UseProfile["handsTheValueBack"], GivenResource>>;
type _06b = Expect<Equal<UseProfile["soItCanBeBoundInline"], true>>;
type _06c = Expect<Equal<UseProfile["onlyTakesDisposables"], true>>;
type _06d = Expect<Equal<UseProfile["aPlainValueIsNotAccepted"], false>>;

declare const useResource: (stack: DisposableStack, resource: GivenResource) => GivenResource;

// ─── What the asynchronous stack offers ───────────────────────────────

// 7. Report the asynchronous stack, which mirrors the synchronous one with an
//    awaitable disposal and a `defer` that may hand back a promise.
export type AsyncStackProfile = TODO; // TODO(koan)

type _07a = Expect<Equal<AsyncStackProfile["isAsyncDisposable"], true>>;
type _07b = Expect<Equal<AsyncStackProfile["isSyncDisposable"], false>>;
type _07c = Expect<Equal<AsyncStackProfile["explicitDisposal"], Promise<void>>>;
type _07d = Expect<
  Equal<AsyncStackProfile["deferArguments"], [onDisposeAsync: () => void | PromiseLike<void>]>
>;
type _07e = Expect<Equal<AsyncStackProfile["awaitedDisposal"], void>>;

// 8. Build the classifier that says which stack a resource belongs in.
export type StackFor<Resource> = TODO; // TODO(koan)

type _08a = Expect<Equal<StackFor<GivenResource>, DisposableStack>>;
type _08b = Expect<Equal<StackFor<AsyncDisposable>, AsyncDisposableStack>>;
type _08c = Expect<Equal<StackFor<{ close(): void }>, never>>;
type _08d = Expect<Equal<StackFor<AsyncDisposable & Disposable>, AsyncDisposableStack>>;

// ─── Ownership transfer ───────────────────────────────────────────────

// 9. Build the shape of a successful transfer: a new stack holding everything,
//    and the old one left empty but still usable.
export type TransferResult<Stack extends DisposableStack | AsyncDisposableStack> = TODO; // TODO(koan)

type _09a = Expect<Equal<TransferResult<DisposableStack>["destination"], DisposableStack>>;
type _09b = Expect<Equal<TransferResult<DisposableStack>["source"], DisposableStack>>;
type _09c = Expect<Equal<TransferResult<AsyncDisposableStack>["destination"], AsyncDisposableStack>>;
type _09d = Expect<Equal<TransferResult<DisposableStack>["sourceIsEmptyAfterwards"], true>>;
type _09e = Expect<
  Equal<
    {
      bothSidesAreStillDisposable: GivenExtends<TransferResult<DisposableStack>["source"], Disposable>;
      aPlainValueIsNotAResource: StackResource<GivenResource>;
    },
    { bothSidesAreStillDisposable: true; aPlainValueIsNotAResource: never }
  >
>;

// 10. Build the factory signature that `move` exists for: build under a guard,
//     and hand ownership out only once everything succeeded.
export type GuardedFactory<Value> = TODO; // TODO(koan)

type _10a = Expect<Equal<ReturnType<GuardedFactory<GivenResource>>["value"], GivenResource>>;
type _10b = Expect<Equal<ReturnType<GuardedFactory<GivenResource>>["cleanup"], DisposableStack>>;
type _10c = Expect<Equal<Parameters<GuardedFactory<GivenResource>>, [log: string[]]>>;
type _10d = Expect<
  Equal<
    {
      guardIsDisposable: GivenExtends<ReturnType<GuardedFactory<GivenResource>>["cleanup"], Disposable>;
      aPlainValueIsNotAResource: StackResource<GivenResource>;
    },
    { guardIsDisposable: true; aPlainValueIsNotAResource: never }
  >
>;

// ─── When cleanup itself fails ────────────────────────────────────────

// 11. Report the error the runtime raises when disposal throws while another
//     error is already travelling. Both payloads are `any`, because JavaScript
//     places no constraint at all on what may be thrown.
export type SuppressedErrorProfile = TODO; // TODO(koan)

type _11a = Expect<Equal<SuppressedErrorProfile["isAnError"], true>>;
type _11b = Expect<Equal<SuppressedErrorProfile["primaryIsUnconstrained"], true>>;
type _11c = Expect<Equal<SuppressedErrorProfile["suppressedIsUnconstrained"], true>>;
type _11d = Expect<Equal<SuppressedErrorProfile["hasAMessage"], string>>;
type _11e = Expect<Equal<SuppressedErrorProfile["constructorArity"], 2 | 3>>;

// 12. Build the reader that recovers both errors from a suppression, and reports
//     honestly that neither is known to be an `Error`.
export type SuppressionParts<Value> = TODO; // TODO(koan)

type _12a = Expect<Equal<IsAny<SuppressionParts<SuppressedError>["primary"]>, true>>;
type _12b = Expect<Equal<IsAny<SuppressionParts<SuppressedError>["suppressed"]>, true>>;
type _12c = Expect<Equal<SuppressionParts<SuppressedError>["bothUnknownShape"], true>>;
type _12d = Expect<Equal<SuppressionParts<Error>, never>>;
type _12e = Expect<Equal<SuppressionParts<string>, never>>;

// 13. Build the chain reader: a suppression may itself have suppressed another,
//     so unwinding one level is rarely enough.
export type SuppressionDepth<Value, Depth extends readonly unknown[] = []> = TODO; // TODO(koan)

type _13a = Expect<Equal<SuppressionDepth<Error>, 0>>;
type _13b = Expect<Equal<SuppressionDepth<string>, 0>>;
type _13c = Expect<Equal<SuppressionDepth<{ notAnError: true }>, 0>>;
type _13d = Expect<Equal<SuppressionDepth<never>, never>>;

// ─── Reading a scope's shape ──────────────────────────────────────────

// 14. Build the scope API. Every one of these hands back what it built so a test
//     can inspect it afterwards — which is only possible because the stack
//     outlives the block that filled it.
export type StackScopeApi = TODO; // TODO(koan)

type _14a = Expect<Equal<ReturnType<StackScopeApi["runDisposableStack"]>["stack"], DisposableStack>>;
type _14b = Expect<Equal<ReturnType<StackScopeApi["runMovedStack"]>["destination"], DisposableStack>>;
type _14c = Expect<Equal<ReturnType<StackScopeApi["runAsyncDisposableStack"]>, Promise<AsyncDisposableStack>>>;
type _14d = Expect<Equal<ReturnType<StackScopeApi["failBodyAndCleanup"]>, never>>;
type _14e = Expect<
  Equal<Awaited<ReturnType<StackScopeApi["runAsyncDisposableStack"]>>, AsyncDisposableStack>
>;

// 15. Report the disposal order a stack promises. It is a stack, so the last
//     thing added is the first thing cleaned up.
export type DisposalOrder<Added extends readonly unknown[]> = TODO; // TODO(koan)

type _15a = Expect<Equal<DisposalOrder<["first", "second", "third"]>, ["third", "second", "first"]>>;
type _15b = Expect<Equal<DisposalOrder<["only"]>, ["only"]>>;
type _15c = Expect<Equal<DisposalOrder<[]>, []>>;
type _15d = Expect<Equal<DisposalOrder<DisposalOrder<["a", "b", "c"]>>, ["a", "b", "c"]>>;
type _15e = Expect<Equal<DisposalOrder<["a", "b"]>[0], "b">>;

// ─── Building on the stack ────────────────────────────────────────────

// 16. Build the predicate that says whether a stack could hold a given value.
export type StackAccepts<Stack, Value> = TODO; // TODO(koan)

type _16a = Expect<Equal<StackAccepts<DisposableStack, GivenResource>, true>>;
type _16b = Expect<Equal<StackAccepts<DisposableStack, { close(): void }>, false>>;
type _16c = Expect<Equal<StackAccepts<AsyncDisposableStack, AsyncDisposable>, true>>;
type _16d = Expect<Equal<StackAccepts<AsyncDisposableStack, GivenResource>, false>>;
type _16e = Expect<Equal<StackAccepts<string, GivenResource>, false>>;

// 17. Build the filter that keeps only the members of a record a given stack
//     could take — the question "what can this scope own?".
export type StackableKeys<Owner, Stack> = TODO; // TODO(koan)

type _17a = Expect<Equal<StackableKeys<{ a: GivenResource; b: string }, DisposableStack>, "a">>;
type _17b = Expect<Equal<StackableKeys<{ a: GivenResource }, AsyncDisposableStack>, never>>;
type _17c = Expect<
  Equal<StackableKeys<{ a: AsyncDisposable; b: AsyncDisposable }, AsyncDisposableStack>, "a" | "b">
>;
type _17d = Expect<Equal<StackableKeys<Record<never, never>, DisposableStack>, never>>;

// 18. Report one stack at a glance: what it accepts, what disposing it produces,
//     and what moving it hands back.
export type StackReport<Stack extends DisposableStack | AsyncDisposableStack> = TODO; // TODO(koan)

type _18a = Expect<Equal<StackReport<DisposableStack>["accepts"], Disposable>>;
type _18b = Expect<Equal<StackReport<AsyncDisposableStack>["accepts"], AsyncDisposable>>;
type _18c = Expect<Equal<StackReport<DisposableStack>["moved"], DisposableStack>>;
type _18d = Expect<Equal<StackReport<DisposableStack>["isSynchronous"], true>>;
type _18e = Expect<Equal<StackReport<AsyncDisposableStack>["isSynchronous"], false>>;
