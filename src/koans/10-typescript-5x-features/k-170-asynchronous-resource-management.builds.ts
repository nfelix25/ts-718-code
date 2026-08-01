import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-170: asynchronous resource management — constructions
 * =============================================================================
 *
 * `await using` is the asynchronous half of the same idea: bind a value, and
 * await its cleanup when the block ends. The contract is a different symbol and
 * a different result — `[Symbol.asyncDispose]()` returning something awaitable —
 * and satisfying it says nothing about satisfying the synchronous one.
 *
 * The binding is the more forgiving of the two. `await using` accepts an
 * asynchronous resource, a *synchronous* one, or nothing at all, which is what
 * lets one scope hold a mixture. What it does not do is make a synchronous
 * resource asynchronous, or let an `await using` binding appear outside an
 * async context — the awaiting is real. Replace each `TODO` with a type
 * satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

// An async resource declared explicitly, one that only has the method, and a
// synchronous resource for the mixed case.
declare class GivenAsyncResource implements AsyncDisposable {
  readonly name: string;
  disposed: boolean;
  constructor(name: string, log: string[]);
  use(): string;
  [Symbol.asyncDispose](): Promise<void>;
}
type GivenStructuralAsync = { close(): void; [Symbol.asyncDispose](): Promise<void> };
type GivenSynchronousFallback = { name: string; [Symbol.dispose](): void };

// ─── The asynchronous contract ────────────────────────────────────────

// 1. Build the reader that pulls the asynchronous disposal method off a type.
export type AsyncDisposeMethod<Value> = TODO; // TODO(koan)

type _01a = Expect<Equal<AsyncDisposeMethod<GivenAsyncResource>, () => Promise<void>>>;
type _01b = Expect<Equal<AsyncDisposeMethod<GivenStructuralAsync>, () => Promise<void>>>;
type _01c = Expect<Equal<AsyncDisposeMethod<GivenSynchronousFallback>, never>>;
type _01d = Expect<Equal<AsyncDisposeMethod<string>, never>>;
type _01e = Expect<Equal<AsyncDisposeMethod<AsyncDisposable>, () => PromiseLike<void>>>;

// 2. Build the reader that reports what asynchronous disposal hands back — the
//    thing the `await` in `await using` is waiting on.
export type AsyncDisposeResult<Value> = TODO; // TODO(koan)

type _02a = Expect<Equal<AsyncDisposeResult<GivenAsyncResource>, Promise<void>>>;
type _02b = Expect<Equal<AsyncDisposeResult<AsyncDisposable>, PromiseLike<void>>>;
type _02c = Expect<Equal<Awaited<AsyncDisposeResult<GivenAsyncResource>>, void>>;
type _02d = Expect<
  Equal<
    {
      asynchronousDisposalIsAwaitable: Awaited<AsyncDisposeResult<GivenAsyncResource>>;
      aSynchronousResourceHasNoAsyncDisposal: AsyncDisposeMethod<GivenSynchronousFallback>;
    },
    { asynchronousDisposalIsAwaitable: void; aSynchronousResourceHasNoAsyncDisposal: never }
  >
>;

// 3. Build the type an `await using` declaration accepts. It is the widest
//    binding of the three: either contract, or nothing.
export type AwaitUsingValue<
  Value extends AsyncDisposable | Disposable | null | undefined,
> = TODO; // TODO(koan)

type _03a = Expect<Equal<AwaitUsingValue<GivenAsyncResource>, GivenAsyncResource>>;
type _03b = Expect<Equal<AwaitUsingValue<GivenSynchronousFallback>, GivenSynchronousFallback>>;
type _03c = Expect<Equal<AwaitUsingValue<GivenAsyncResource | null>, GivenAsyncResource | null>>;
type _03d = Expect<Equal<AwaitUsingValue<undefined>, undefined>>;
type _03e = Expect<
  Equal<
    AwaitUsingValue<AsyncDisposable | Disposable | null | undefined>,
    AsyncDisposable | Disposable | null | undefined
  >
>;

// ─── The two contracts side by side ───────────────────────────────────

// 4. Report the asynchronous contract as the library declares it.
export type AsyncContractProfile = TODO; // TODO(koan)

type _04a = Expect<Equal<AsyncContractProfile["keys"], typeof Symbol.asyncDispose>>;
type _04b = Expect<Equal<AsyncContractProfile["method"], () => PromiseLike<void>>>;
type _04c = Expect<Equal<AsyncContractProfile["result"], PromiseLike<void>>>;
type _04d = Expect<Equal<AsyncContractProfile["awaited"], void>>;
type _04e = Expect<Equal<AsyncContractProfile["arguments"], []>>;

// 5. Report the independence of the two contracts. Neither implies the other,
//    and a type may of course have both.
export type IndependenceProfile = TODO; // TODO(koan)

type _05a = Expect<Equal<IndependenceProfile["asyncSatisfiesSync"], false>>;
type _05b = Expect<Equal<IndependenceProfile["syncSatisfiesAsync"], false>>;
type _05c = Expect<Equal<IndependenceProfile["asyncResourceIsSync"], false>>;
type _05d = Expect<Equal<IndependenceProfile["bothAtOnce"], true>>;
type _05e = Expect<
  Equal<IndependenceProfile["bothKeys"], typeof Symbol.asyncDispose | typeof Symbol.dispose>
>;

// 6. Report which binding accepts what. The synchronous one demands the
//    synchronous contract; the asynchronous one takes either.
export type BindingProfile = TODO; // TODO(koan)

type _06a = Expect<Equal<BindingProfile["usingTakesSync"], true>>;
type _06b = Expect<Equal<BindingProfile["usingTakesAsync"], false>>;
type _06c = Expect<Equal<BindingProfile["awaitUsingTakesSync"], true>>;
type _06d = Expect<Equal<BindingProfile["awaitUsingTakesAsync"], true>>;
type _06e = Expect<Equal<BindingProfile["awaitUsingTakesNothing"], true>>;

// ─── Deciding which disposal will run ─────────────────────────────────

// 7. Build the classifier that names which contract a value satisfies — the
//    question an `await using` binding answers at run time by looking for the
//    asynchronous method first.
export type DisposalKind<Value> = TODO; // TODO(koan)

type _07a = Expect<Equal<DisposalKind<GivenAsyncResource>, "asynchronous">>;
type _07b = Expect<Equal<DisposalKind<GivenSynchronousFallback>, "synchronous">>;
type _07c = Expect<Equal<DisposalKind<null>, "nothing to dispose">>;
type _07d = Expect<Equal<DisposalKind<{ close(): void }>, "not a resource">>;
type _07e = Expect<Equal<DisposalKind<AsyncDisposable & Disposable>, "asynchronous">>;

// 8. Build the predicate for the asynchronous binding.
export type IsAwaitUsable<Value> = TODO; // TODO(koan)

type _08a = Expect<Equal<IsAwaitUsable<GivenAsyncResource>, true>>;
type _08b = Expect<Equal<IsAwaitUsable<GivenSynchronousFallback>, true>>;
type _08c = Expect<Equal<IsAwaitUsable<GivenAsyncResource | GivenSynchronousFallback>, true>>;
type _08d = Expect<Equal<IsAwaitUsable<{ close(): void }>, false>>;
type _08e = Expect<Equal<IsAwaitUsable<GivenAsyncResource | string>, false>>;

// 9. Build the gate that admits a value only when `await using` would take it.
export type AwaitUsable<Value> = TODO; // TODO(koan)

type _09a = Expect<
  Equal<
    {
      admitted: AwaitUsable<GivenAsyncResource>;
      aSynchronousResourceHasNoAsyncDisposal: AsyncDisposeMethod<GivenSynchronousFallback>;
    },
    { admitted: GivenAsyncResource; aSynchronousResourceHasNoAsyncDisposal: never }
  >
>;
type _09b = Expect<Equal<AwaitUsable<{ close(): void }>, never>>;
type _09c = Expect<
  Equal<
    {
      mixedUnionAdmitted: AwaitUsable<GivenAsyncResource | GivenSynchronousFallback>;
      aSynchronousResourceHasNoAsyncDisposal: AsyncDisposeMethod<GivenSynchronousFallback>;
    },
    {
      mixedUnionAdmitted: GivenAsyncResource | GivenSynchronousFallback;
      aSynchronousResourceHasNoAsyncDisposal: never;
    }
  >
>;
type _09d = Expect<Equal<AwaitUsable<string>, never>>;

// ─── The resource itself ──────────────────────────────────────────────

// 10. Build the async resource's surface plus its contract.
export type AsyncResource = TODO; // TODO(koan)

type _10a = Expect<
  Equal<
    {
      resourceIsAsyncDisposable: GivenExtends<AsyncResource, AsyncDisposable>;
      aSynchronousResourceHasNoAsyncDisposal: AsyncDisposeMethod<GivenSynchronousFallback>;
    },
    { resourceIsAsyncDisposable: true; aSynchronousResourceHasNoAsyncDisposal: never }
  >
>;
type _10b = Expect<Equal<ReturnType<AsyncResource["use"]>, string>>;
type _10c = Expect<Equal<AsyncResource["name"], string>>;
type _10d = Expect<Equal<GivenExtends<AsyncResource, Disposable>, false>>;
type _10e = Expect<
  Equal<keyof AsyncResource, "name" | "disposed" | "use" | typeof Symbol.asyncDispose>
>;

// 11. Build the operator that turns a synchronous resource into one an
//     asynchronous scope would dispose asynchronously — the shape an adapter
//     would have.
export type AsAsyncDisposable<Value> = TODO; // TODO(koan)

type _11a = Expect<
  Equal<
    {
      adaptedIsAsyncDisposable: GivenExtends<AsAsyncDisposable<GivenSynchronousFallback>, AsyncDisposable>;
      aSynchronousResourceHasNoAsyncDisposal: AsyncDisposeMethod<GivenSynchronousFallback>;
    },
    { adaptedIsAsyncDisposable: true; aSynchronousResourceHasNoAsyncDisposal: never }
  >
>;
type _11b = Expect<Equal<GivenExtends<AsAsyncDisposable<GivenSynchronousFallback>, Disposable>, false>>;
type _11c = Expect<
  Equal<keyof AsAsyncDisposable<GivenSynchronousFallback>, "name" | typeof Symbol.asyncDispose>
>;
type _11d = Expect<Equal<DisposalKind<AsAsyncDisposable<GivenSynchronousFallback>>, "asynchronous">>;

// ─── The scopes ───────────────────────────────────────────────────────

// 12. Build the scope-running API. Every one of these is `async`, because an
//     `await using` binding can only appear where awaiting is possible.
export type AsyncScopeApi = TODO; // TODO(koan)

type _12a = Expect<Equal<ReturnType<AsyncScopeApi["runAsyncScope"]>, Promise<void>>>;
type _12b = Expect<Equal<Awaited<ReturnType<AsyncScopeApi["runAsyncEarlyReturn"]>>, string>>;
type _12c = Expect<Equal<Awaited<ReturnType<AsyncScopeApi["runAsyncThrow"]>>, never>>;
type _12d = Expect<
  Equal<
    {
      nullableParameter: Parameters<AsyncScopeApi["runNullableAsyncScope"]>[1];
      aSynchronousResourceHasNoAsyncDisposal: AsyncDisposeMethod<GivenSynchronousFallback>;
    },
    { nullableParameter: AsyncResource | null; aSynchronousResourceHasNoAsyncDisposal: never }
  >
>;
type _12e = Expect<Equal<Parameters<AsyncScopeApi["runAsyncScope"]>, [log: string[]]>>;

// 13. Report what the scope signatures say. Every result is a promise, and the
//     awaited types are the ones the bodies actually produce — disposal itself
//     never appears.
export type ScopeProfile = TODO; // TODO(koan)

type _13a = Expect<Equal<ScopeProfile["normalScope"], Promise<void>>>;
type _13b = Expect<Equal<ScopeProfile["awaitedNormalScope"], void>>;
type _13c = Expect<Equal<ScopeProfile["earlyReturn"], string>>;
type _13d = Expect<Equal<ScopeProfile["throwingScope"], never>>;
type _13e = Expect<Equal<ScopeProfile["everyScopeIsAPromise"], true>>;

// ─── Near misses ──────────────────────────────────────────────────────

// 14. Report the shapes that nearly satisfy the asynchronous contract. Note
//     where the `void` leniency stops: a method returning `number` satisfies a
//     `void` return, but a method returning `Promise<number>` does *not*
//     satisfy `PromiseLike<void>` — the forgiveness applies to the return
//     position itself, not to a type parameter inside it.
export type NearMissProfile = TODO; // TODO(koan)

type _14a = Expect<Equal<NearMissProfile["synchronousMethodInstead"], false>>;
type _14b = Expect<Equal<NearMissProfile["promiseOfSomethingElse"], false>>;
type _14c = Expect<Equal<NearMissProfile["thenableResult"], true>>;
type _14d = Expect<Equal<NearMissProfile["wrongSymbol"], false>>;
type _14e = Expect<Equal<NearMissProfile["correctShape"], true>>;

// ─── Working with mixed scopes ────────────────────────────────────────

// 15. Build the filter that keeps only the members of a record an asynchronous
//     scope would have to await.
export type AsyncDisposableKeys<Value> = TODO; // TODO(koan)

type _15a = Expect<Equal<AsyncDisposableKeys<{ a: AsyncResource; b: string }>, "a">>;
type _15b = Expect<Equal<AsyncDisposableKeys<{ a: GivenSynchronousFallback }>, never>>;
type _15c = Expect<
  Equal<AsyncDisposableKeys<{ a: AsyncResource; b: GivenStructuralAsync }>, "a" | "b">
>;
type _15d = Expect<Equal<AsyncDisposableKeys<Record<never, never>>, never>>;

// 16. Build its counterpart for the synchronous contract, so a mixed scope can
//     be described key by key.
export type SyncDisposableKeys<Value> = TODO; // TODO(koan)

type _16a = Expect<Equal<SyncDisposableKeys<{ a: AsyncResource; b: GivenSynchronousFallback }>, "b">>;
type _16b = Expect<Equal<SyncDisposableKeys<{ a: AsyncResource }>, never>>;
type _16c = Expect<
  Equal<
    {
      asyncAndSyncKeysAreDisjointHere: Extract<
        AsyncDisposableKeys<{ a: AsyncResource; b: GivenSynchronousFallback }>,
        SyncDisposableKeys<{ a: AsyncResource; b: GivenSynchronousFallback }>
      >;
      aSynchronousResourceHasNoAsyncDisposal: AsyncDisposeMethod<GivenSynchronousFallback>;
    },
    { asyncAndSyncKeysAreDisjointHere: never; aSynchronousResourceHasNoAsyncDisposal: never }
  >
>;
type _16d = Expect<Equal<SyncDisposableKeys<{ a: string }>, never>>;

// 17. Build the reader that says what awaiting a scope's disposal would produce
//     for one resource — the type the `await` in `await using` actually sees.
export type AwaitedDisposal<Value> = TODO; // TODO(koan)

type _17a = Expect<Equal<AwaitedDisposal<GivenAsyncResource>, void>>;
type _17b = Expect<Equal<AwaitedDisposal<GivenSynchronousFallback>, void>>;
type _17c = Expect<Equal<AwaitedDisposal<{ close(): void }>, never>>;
type _17d = Expect<Equal<AwaitedDisposal<AsyncResource>, void>>;

// 18. Report one candidate at a glance: which binding takes it, which contract
//     it satisfies, and what its cleanup produces.
export type AsyncResourceReport<Value> = TODO; // TODO(koan)

type _18a = Expect<Equal<AsyncResourceReport<GivenAsyncResource>["kind"], "asynchronous">>;
type _18b = Expect<Equal<AsyncResourceReport<GivenSynchronousFallback>["kind"], "synchronous">>;
type _18c = Expect<Equal<AsyncResourceReport<GivenAsyncResource>["awaitUsable"], true>>;
type _18d = Expect<Equal<AsyncResourceReport<GivenSynchronousFallback>["asyncDisposal"], never>>;
type _18e = Expect<Equal<AsyncResourceReport<{ close(): void }>["awaitedResult"], never>>;
