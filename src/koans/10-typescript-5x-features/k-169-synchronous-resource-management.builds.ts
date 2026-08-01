import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-169: synchronous resource management — constructions
 * =============================================================================
 *
 * `using` binds a value and schedules its cleanup at the end of the enclosing
 * block, whatever happens in between — early return, throw, or falling off the
 * end. The contract it demands is one well-known method: `[Symbol.dispose]()`,
 * returning nothing.
 *
 * Two details shape how it is typed. The contract is *structural*, so a class
 * that never mentions `Disposable` still satisfies it by having the method, and
 * a class that declares `implements Disposable` gets no extra type — the
 * declaration is a check, not a marker. And `using` deliberately accepts `null`
 * and `undefined`, so an optional resource needs no branching at the binding
 * site. Replace each `TODO` with a type satisfying the assertions directly
 * below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

// A resource declared the explicit way, and one that only happens to have the
// method — the two are the same type as far as `using` is concerned.
declare class GivenResource implements Disposable {
  readonly name: string;
  disposed: boolean;
  constructor(name: string, log: string[]);
  use(): string;
  [Symbol.dispose](): void;
}
type GivenStructuralResource = { close(): void; [Symbol.dispose](): void };

// ─── The contract ─────────────────────────────────────────────────────

// 1. Build the reader that pulls the disposal method off a type, and answers
//    with nothing for anything that does not have one.
export type DisposeMethod<Value> = TODO; // TODO(koan)

type _01a = Expect<Equal<DisposeMethod<GivenResource>, () => void>>;
type _01b = Expect<Equal<DisposeMethod<GivenStructuralResource>, () => void>>;
type _01c = Expect<Equal<DisposeMethod<{ close(): void }>, never>>;
type _01d = Expect<Equal<DisposeMethod<string>, never>>;
type _01e = Expect<Equal<DisposeMethod<Disposable>, () => void>>;

// 2. Build the reader that goes one step further and reports what disposal
//    hands back. The answer is what makes this the *synchronous* form.
export type DisposeResult<Value> = TODO; // TODO(koan)

type _02a = Expect<Equal<DisposeResult<GivenResource>, void>>;
type _02b = Expect<Equal<DisposeResult<GivenStructuralResource>, void>>;
type _02c = Expect<Equal<DisposeResult<Disposable>, void>>;
type _02d = Expect<
  Equal<
    {
      synchronousDisposalReturnsNothing: DisposeResult<GivenResource>;
      aPlainCloseIsNotDisposal: DisposeMethod<{ close(): void }>;
    },
    { synchronousDisposalReturnsNothing: void; aPlainCloseIsNotDisposal: never }
  >
>;

// 3. Build the type a `using` declaration accepts. It is deliberately wider than
//    the contract itself: a resource that may not exist needs no branch.
export type UsingValue<Value extends Disposable | null | undefined> = TODO; // TODO(koan)

type _03a = Expect<Equal<UsingValue<GivenResource>, GivenResource>>;
type _03b = Expect<Equal<UsingValue<GivenResource | null>, GivenResource | null>>;
type _03c = Expect<Equal<UsingValue<undefined>, undefined>>;
type _03d = Expect<Equal<UsingValue<null>, null>>;
type _03e = Expect<Equal<UsingValue<Disposable | null | undefined>, Disposable | null | undefined>>;

// ─── What the library declares ────────────────────────────────────────

// 4. Report the contract as the standard library states it: one symbol-named
//    member, and nothing else.
export type ContractProfile = TODO; // TODO(koan)

type _04a = Expect<Equal<ContractProfile["keys"], typeof Symbol.dispose>>;
type _04b = Expect<Equal<ContractProfile["method"], () => void>>;
type _04c = Expect<Equal<ContractProfile["result"], void>>;
type _04d = Expect<Equal<ContractProfile["arguments"], []>>;
type _04e = Expect<Equal<ContractProfile["symbolIsNotJustAnySymbol"], false>>;

// 5. Report the structural nature of the contract. Declaring `implements
//    Disposable` changes nothing about the type — only whether the compiler
//    checks the class against it. Note how forgiving the result position is: a
//    disposal that returns something still satisfies a `void` return, because
//    `void` means "the caller ignores this".
export type StructuralProfile = TODO; // TODO(koan)

type _05a = Expect<Equal<StructuralProfile["declaredClassSatisfies"], true>>;
type _05b = Expect<Equal<StructuralProfile["structuralTypeSatisfies"], true>>;
type _05c = Expect<Equal<StructuralProfile["wrongMethodNameDoesNot"], false>>;
type _05d = Expect<Equal<StructuralProfile["returningAValueStillSatisfiesVoid"], true>>;
type _05e = Expect<Equal<StructuralProfile["implementsAddsNoMembers"], typeof Symbol.dispose>>;

// ─── The resource itself ──────────────────────────────────────────────

// 6. Build the resource's own surface — everything it offers besides disposal.
export type ResourceSurface = TODO; // TODO(koan)

type _06a = Expect<Equal<keyof ResourceSurface, "name" | "disposed" | "use">>;
type _06b = Expect<Equal<ResourceSurface["name"], string>>;
type _06c = Expect<Equal<ReturnType<ResourceSurface["use"]>, string>>;
type _06d = Expect<
  Equal<
    {
      surfaceAloneIsNotDisposable: GivenExtends<ResourceSurface, Disposable>;
      withTheMethodItIs: GivenExtends<ResourceSurface & Disposable, Disposable>;
    },
    { surfaceAloneIsNotDisposable: false; withTheMethodItIs: true }
  >
>;

// 7. Build the full resource type: its own surface plus the contract.
export type Resource = TODO; // TODO(koan)

type _07a = Expect<
  Equal<
    {
      resourceIsDisposable: GivenExtends<Resource, Disposable>;
      aPlainCloseIsNotDisposal: DisposeMethod<{ close(): void }>;
    },
    { resourceIsDisposable: true; aPlainCloseIsNotDisposal: never }
  >
>;
type _07b = Expect<Equal<DisposeMethod<Resource>, () => void>>;
type _07c = Expect<Equal<ReturnType<Resource["use"]>, string>>;
type _07d = Expect<Equal<Resource["disposed"], boolean>>;
type _07e = Expect<Equal<keyof Resource, "name" | "disposed" | "use" | typeof Symbol.dispose>>;

// ─── Where a `using` binding may be used ──────────────────────────────

// 8. Build the predicate that says whether a value may be bound with `using`.
export type IsUsable<Value> = TODO; // TODO(koan)

type _08a = Expect<Equal<IsUsable<Resource>, true>>;
type _08b = Expect<Equal<IsUsable<Resource | null>, true>>;
type _08c = Expect<Equal<IsUsable<undefined>, true>>;
type _08d = Expect<Equal<IsUsable<{ close(): void }>, false>>;
type _08e = Expect<Equal<IsUsable<Resource | { close(): void }>, false>>;

// 9. Build the gate that admits a value only when `using` would take it.
export type Usable<Value> = TODO; // TODO(koan)

type _09a = Expect<
  Equal<
    { admitted: Usable<Resource>; aPlainCloseIsNotDisposal: DisposeMethod<{ close(): void }> },
    { admitted: Resource; aPlainCloseIsNotDisposal: never }
  >
>;
type _09b = Expect<Equal<Usable<{ close(): void }>, never>>;
type _09c = Expect<Equal<Usable<null>, null>>;
type _09d = Expect<Equal<Usable<string>, never>>;

// 10. Report the nullable case, which is the reason `using` accepts more than
//     the contract. Nothing has to be unwrapped, and disposal simply does not
//     happen when there is nothing there.
export type NullableProfile = TODO; // TODO(koan)

type _10a = Expect<Equal<NullableProfile["optionalResourceIsUsable"], true>>;
type _10b = Expect<Equal<NullableProfile["disposalOfTheUnion"], () => void>>;
type _10c = Expect<
  Equal<
    {
      narrowedBack: NullableProfile["narrowedBackToTheResource"];
      aPlainCloseIsNotDisposal: DisposeMethod<{ close(): void }>;
    },
    { narrowedBack: Resource; aPlainCloseIsNotDisposal: never }
  >
>;
type _10d = Expect<Equal<NullableProfile["nullAloneIsUsable"], true>>;
type _10e = Expect<Equal<NullableProfile["unrelatedUnionIsNot"], false>>;

// ─── The scopes that use it ───────────────────────────────────────────

// 11. Build the scope-running API. None of these signatures says anything about
//     disposal — that is the point: cleanup is a property of the block, not of
//     the return type.
export type ScopeApi = TODO; // TODO(koan)

type _11a = Expect<Equal<ReturnType<ScopeApi["runNestedScope"]>, void>>;
type _11b = Expect<Equal<ReturnType<ScopeApi["runEarlyReturn"]>, string>>;
type _11c = Expect<Equal<ReturnType<ScopeApi["runThrowingScope"]>, never>>;
type _11d = Expect<
  Equal<
    {
      nullableParameter: Parameters<ScopeApi["runNullableScope"]>[1];
      aPlainCloseIsNotDisposal: DisposeMethod<{ close(): void }>;
    },
    { nullableParameter: Resource | null; aPlainCloseIsNotDisposal: never }
  >
>;
type _11e = Expect<Equal<Parameters<ScopeApi["runNestedScope"]>, [log: string[]]>>;

// 12. Report what the return types do and do not tell you. A scope that throws
//     still disposes, and a scope that returns early still disposes — neither
//     fact is visible in the signature.
export type ScopeProfile = TODO; // TODO(koan)

type _12a = Expect<Equal<ScopeProfile["normalScope"], void>>;
type _12b = Expect<Equal<ScopeProfile["earlyReturn"], string>>;
type _12c = Expect<Equal<ScopeProfile["throwingScope"], never>>;
type _12d = Expect<Equal<ScopeProfile["disposalIsInvisibleInTheSignature"], true>>;
type _12e = Expect<Equal<ScopeProfile["throwingScopeIsUninhabited"], true>>;

// ─── Near misses ──────────────────────────────────────────────────────

// 13. Report the shapes that look like resources and the ones that only seem
//     not to. The method name has to match and the arity has to fit, but the
//     result is checked against `void`, which accepts anything.
export type NearMissProfile = TODO; // TODO(koan)

type _13a = Expect<Equal<NearMissProfile["differentName"], false>>;
type _13b = Expect<Equal<NearMissProfile["returningAValue"], true>>;
type _13c = Expect<Equal<NearMissProfile["takingAnArgument"], false>>;
type _13d = Expect<Equal<NearMissProfile["optionalMethod"], false>>;
type _13e = Expect<Equal<NearMissProfile["correctShape"], true>>;

// 14. Report the asynchronous contract beside the synchronous one, since the two
//     are separate and satisfying one says nothing about the other.
export type ContractComparisonProfile = TODO; // TODO(koan)

type _14a = Expect<Equal<ContractComparisonProfile["synchronousKey"], typeof Symbol.dispose>>;
type _14b = Expect<Equal<ContractComparisonProfile["asynchronousKey"], typeof Symbol.asyncDispose>>;
type _14c = Expect<Equal<ContractComparisonProfile["synchronousResult"], void>>;
type _14d = Expect<Equal<ContractComparisonProfile["asynchronousResult"], PromiseLike<void>>>;
type _14e = Expect<Equal<ContractComparisonProfile["oneDoesNotImplyTheOther"], false>>;

// ─── Working with disposables generically ─────────────────────────────

// 15. Build the operator that adds the contract to any shape — the type-level
//     version of "make this a resource".
export type WithDisposal<Value> = TODO; // TODO(koan)

type _15a = Expect<
  Equal<
    {
      wrappedIsDisposable: GivenExtends<WithDisposal<{ close(): void }>, Disposable>;
      aPlainCloseIsNotDisposal: DisposeMethod<{ close(): void }>;
    },
    { wrappedIsDisposable: true; aPlainCloseIsNotDisposal: never }
  >
>;
type _15b = Expect<Equal<keyof WithDisposal<{ close(): void }>, "close" | typeof Symbol.dispose>>;
type _15c = Expect<Equal<DisposeMethod<WithDisposal<{ close(): void }>>, () => void>>;
type _15d = Expect<Equal<IsUsable<WithDisposal<{ close(): void }>>, true>>;

// 16. Build the operator that removes it, so the surface a resource offers can
//     be described without the cleanup obligation.
export type WithoutDisposal<Value> = TODO; // TODO(koan)

type _16a = Expect<Equal<keyof WithoutDisposal<Resource>, "name" | "disposed" | "use">>;
type _16b = Expect<Equal<GivenExtends<WithoutDisposal<Resource>, Disposable>, false>>;
type _16c = Expect<Equal<ReturnType<WithoutDisposal<Resource>["use"]>, string>>;
type _16d = Expect<Equal<IsUsable<WithoutDisposal<Resource>>, false>>;

// 17. Build the filter that keeps only the disposable members of a record — the
//     question "what in here needs cleaning up?".
export type DisposableKeys<Value> = TODO; // TODO(koan)

type _17a = Expect<Equal<DisposableKeys<{ a: Resource; b: string }>, "a">>;
type _17b = Expect<Equal<DisposableKeys<{ a: string; b: number }>, never>>;
type _17c = Expect<Equal<DisposableKeys<{ a: Resource; b: GivenStructuralResource }>, "a" | "b">>;
type _17d = Expect<Equal<DisposableKeys<Record<never, never>>, never>>;

// 18. Report one candidate at a glance: whether it may be bound with `using`,
//     what disposal would do, and what it offers besides.
export type ResourceReport<Value> = TODO; // TODO(koan)

type _18a = Expect<Equal<ResourceReport<Resource>["usable"], true>>;
type _18b = Expect<Equal<ResourceReport<Resource>["disposal"], () => void>>;
type _18c = Expect<Equal<ResourceReport<Resource>["disposalResult"], void>>;
type _18d = Expect<Equal<keyof ResourceReport<Resource>["surface"], "name" | "disposed" | "use">>;
type _18e = Expect<Equal<ResourceReport<{ close(): void }>["usable"], false>>;
