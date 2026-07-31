import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-128: this utility types — constructions
 * =============================================================================
 *
 * Three utilities share a word and almost nothing else. Two of them reflect on a
 * fake first parameter: one captures the receiver, the other rebuilds the
 * callable without it. Their awkward corner is that `unknown` does double duty —
 * it is both a legitimate receiver type and the sentinel meaning "no receiver
 * found" — so a signature that explicitly declares `this: unknown` is
 * indistinguishable from one that declares nothing, and omission leaves it alone.
 * The third is not a reflection at all: it is a structurally empty marker whose
 * meaning is a contextual rule the compiler applies to object-literal methods, so
 * nothing you can write structurally would reproduce it. Replace each `TODO` with
 * a type satisfying the assertions directly below it.
 */

type GivenIsAny<Value> = 0 extends 1 & Value ? true : false;

type GivenHandler = (
  this: { prefix: string },
  value: number,
  suffix?: string,
) => string;

interface GivenForwardOverload {
  (this: { a: 1 }, value: string): 1;
  (this: { b: 2 }, value: number): 2;
}

interface GivenReverseOverload {
  (this: { b: 2 }, value: number): 2;
  (this: { a: 1 }, value: string): 1;
}

// Declared with the packet's own signatures so constructions can be graded
// against real call sites.
declare function givenBindReceiver<Receiver, Fn extends (this: Receiver, ...args: any[]) => any>(
  fn: Fn,
  receiver: Receiver,
): RebuiltOmitThisParameter<Fn>;
declare function givenDefineObject<Data, Methods>(spec: {
  data: Data;
  methods: Methods & ThisType<Data & Methods>;
}): Data & Methods;

// ─── Reflecting on the receiver ───────────────────────────────────────

// 1. Build the receiver capture: if the input can be seen as a function with an
//    explicit receiver, take it; otherwise report the sentinel that means none
//    was found.
//    `RebuiltThisParameterType<(this: Date) => void>` is `Date`.
//    Hint: a deliberately unsatisfiable rest parameter keeps the pattern from
//    matching on argument shape, so only the receiver is being asked about.
export type RebuiltThisParameterType<Fn> = TODO; // TODO(koan)

type _01a = Expect<Equal<RebuiltThisParameterType<GivenHandler>, { prefix: string }>>;
type _01b = Expect<Equal<RebuiltThisParameterType<(this: Date) => number>, Date>>;
type _01c = Expect<Equal<RebuiltThisParameterType<(value: string) => number>, unknown>>;
type _01d = Expect<Equal<RebuiltThisParameterType<() => void>, unknown>>;
type _01e = Expect<
  Equal<RebuiltThisParameterType<(this: void, value: string) => void>, void>
>;

// 2. Build the rebuild that drops the receiver channel while keeping the ordinary
//    argument tuple and result. Leave the input untouched when no receiver was
//    found — which, because of the sentinel, includes an explicit `this: unknown`.
export type RebuiltOmitThisParameter<Fn> = TODO; // TODO(koan)

type _02a = Expect<
  Equal<RebuiltOmitThisParameter<GivenHandler>, (value: number, suffix?: string) => string>
>;
type _02b = Expect<
  Equal<RebuiltOmitThisParameter<(value: string) => number>, (value: string) => number>
>;
type _02c = Expect<
  Equal<
    RebuiltOmitThisParameter<(this: unknown, value: string) => void>,
    (this: unknown, value: string) => void
  >
>;
type _02d = Expect<
  Equal<RebuiltOmitThisParameter<(this: void, value: string) => void>, (value: string) => void>
>;
type _02e = Expect<Equal<RebuiltOmitThisParameter<never>, never>>;

// ─── The sentinel problem ─────────────────────────────────────────────

// 3. Report `unknown` serving as both a real receiver and the "none found"
//    answer, which is what makes the two cases indistinguishable.
export type SentinelProfile = TODO; // TODO(koan)

type _03a = Expect<Equal<SentinelProfile["noReceiver"], unknown>>;
type _03b = Expect<Equal<SentinelProfile["explicitUnknown"], unknown>>;
type _03c = Expect<Equal<SentinelProfile["indistinguishable"], true>>;
type _03d = Expect<Equal<SentinelProfile["omittedFromPlain"], (value: string) => void>>;
type _03e = Expect<
  Equal<
    SentinelProfile["omittedFromExplicitUnknown"],
    (this: unknown, value: string) => void
  >
>;

// 4. Report the receiver types that are not the sentinel, and so are removed.
export type ReceiverDomainProfile = TODO; // TODO(koan)

type _04a = Expect<Equal<ReceiverDomainProfile["voidReceiver"], void>>;
type _04b = Expect<Equal<ReceiverDomainProfile["objectReceiver"], { prefix: string }>>;
type _04c = Expect<Equal<ReceiverDomainProfile["classReceiver"], Date>>;
type _04d = Expect<Equal<ReceiverDomainProfile["voidRemoved"], (value: string) => void>>;
type _04e = Expect<
  Equal<ReceiverDomainProfile["objectRemoved"], (...values: number[]) => boolean>
>;

// ─── What survives the rebuild ────────────────────────────────────────

// 5. Report the argument tuple and result surviving the rebuild intact.
export type RebuildFidelityProfile = TODO; // TODO(koan)

type _05a = Expect<
  Equal<RebuildFidelityProfile["rebuilt"], (value: number, suffix?: string) => string>
>;
type _05b = Expect<
  Equal<RebuildFidelityProfile["arguments"], [value: number, suffix?: string | undefined]>
>;
type _05c = Expect<Equal<RebuildFidelityProfile["result"], string>>;
type _05d = Expect<
  Equal<RebuildFidelityProfile["optionalArgument"], [value?: string | undefined]>
>;
type _05e = Expect<Equal<RebuildFidelityProfile["receiverGone"], unknown>>;

// 6. Report overloads collapsing to one visible signature, so the rebuild is
//    lossy in exactly the way the return and parameter captures are.
export type OverloadCollapseProfile = TODO; // TODO(koan)

type _06a = Expect<Equal<OverloadCollapseProfile["forwardReceiver"], { b: 2 }>>;
type _06b = Expect<Equal<OverloadCollapseProfile["forwardRebuilt"], (value: number) => 2>>;
type _06c = Expect<Equal<OverloadCollapseProfile["reverseReceiver"], { a: 1 }>>;
type _06d = Expect<Equal<OverloadCollapseProfile["reverseRebuilt"], (value: string) => 1>>;
type _06e = Expect<Equal<OverloadCollapseProfile["forwardArguments"], [value: number]>>;

// ─── The marker that is not a reflection ──────────────────────────────

// 7. Report the contextual marker being structurally empty, so every ordinary
//    type-level observation of it reports nothing at all.
export type MarkerEmptinessProfile = TODO; // TODO(koan)

type _07a = Expect<Equal<MarkerEmptinessProfile["itself"], {}>>;
type _07b = Expect<Equal<MarkerEmptinessProfile["keys"], never>>;
type _07c = Expect<Equal<MarkerEmptinessProfile["madeReadonly"], {}>>;
type _07d = Expect<Equal<MarkerEmptinessProfile["madePartial"], {}>>;
type _07e = Expect<Equal<MarkerEmptinessProfile["insideAProperty"], { methods: {} }>>;

// 8. Report the marker contributing nothing to an intersection either, and being
//    equally empty for every argument it is given.
export type MarkerCompositionProfile = TODO; // TODO(koan)

type _08a = Expect<Equal<MarkerCompositionProfile["intersectedKeys"], "label">>;
type _08b = Expect<Equal<MarkerCompositionProfile["forAny"], {}>>;
type _08c = Expect<Equal<MarkerCompositionProfile["forNever"], {}>>;
type _08d = Expect<Equal<MarkerCompositionProfile["forUnknown"], {}>>;
type _08e = Expect<Equal<MarkerCompositionProfile["argumentIsIgnored"], true>>;

// ─── Extremes ─────────────────────────────────────────────────────────

// 9. Report the top and bottom inputs, where the receiver capture takes both
//    conditional branches and lands back on the sentinel.
export type ExtremeInputProfile = TODO; // TODO(koan)

type _09a = Expect<Equal<ExtremeInputProfile["anyReceiver"], unknown>>;
type _09b = Expect<Equal<ExtremeInputProfile["neverReceiver"], never>>;
type _09c = Expect<Equal<ExtremeInputProfile["anyOmission"], true>>;
type _09d = Expect<Equal<ExtremeInputProfile["neverOmission"], never>>;
type _09e = Expect<Equal<ExtremeInputProfile["nonCallable"], unknown>>;

// ─── Surfaces built on the reflection ─────────────────────────────────

// 10. Build the predicate that reports whether a signature declares a receiver
//     the rebuild would actually remove.
export type HasReceiverOf<Fn> = TODO; // TODO(koan)

type _10a = Expect<
  Equal<
    {
      declared: HasReceiverOf<GivenHandler>;
      absent: HasReceiverOf<(value: string) => void>;
    },
    { declared: true; absent: false }
  >
>;
type _10b = Expect<
  Equal<
    {
      voidReceiver: HasReceiverOf<(this: void) => void>;
      unknownReceiver: HasReceiverOf<(this: unknown) => void>;
    },
    { voidReceiver: true; unknownReceiver: false }
  >
>;
type _10c = Expect<
  Equal<
    {
      overloaded: HasReceiverOf<GivenForwardOverload>;
      nonCallable: HasReceiverOf<{ id: 1 }>;
    },
    { overloaded: true; nonCallable: false }
  >
>;
type _10d = Expect<
  Equal<
    {
      afterRemoval: HasReceiverOf<RebuiltOmitThisParameter<GivenHandler>>;
      beforeRemoval: HasReceiverOf<GivenHandler>;
    },
    { afterRemoval: false; beforeRemoval: true }
  >
>;
type _10e = Expect<
  Equal<
    { top: HasReceiverOf<any>; classReceiver: HasReceiverOf<(this: Date) => void> },
    { top: false; classReceiver: true }
  >
>;

// 11. Build the bound shape a receiver-binding helper returns: the same callable
//     with its receiver channel already supplied.
export type BoundShapeOf<Fn> = TODO; // TODO(koan)

type _11a = Expect<
  Equal<BoundShapeOf<GivenHandler>, (value: number, suffix?: string) => string>
>;
type _11b = Expect<
  Equal<BoundShapeOf<(this: { id: 1 }) => void>, () => void>
>;
type _11c = Expect<
  Equal<BoundShapeOf<(value: string) => number>, (value: string) => number>
>;
type _11d = Expect<Equal<ReturnType<BoundShapeOf<GivenHandler>>, string>>;
type _11e = Expect<
  Equal<Parameters<BoundShapeOf<(this: Date, ...values: number[]) => boolean>>, number[]>
>;

// 12. Build the two signatures the packet exports. The binder proves the receiver
//     type against the function it is given; the object definer threads the
//     contextual marker so the methods' `this` sees both halves of the result.
export type ReceiverRuntimeApi = TODO; // TODO(koan)

type _12a = Expect<
  Equal<
    ReceiverRuntimeApi["bindReceiver"],
    <Receiver, Fn extends (this: Receiver, ...args: any[]) => any>(
      fn: Fn,
      receiver: Receiver,
    ) => RebuiltOmitThisParameter<Fn>
  >
>;
type _12b = Expect<
  Equal<
    ReceiverRuntimeApi["defineObject"],
    <Data, Methods>(spec: {
      data: Data;
      methods: Methods & ThisType<Data & Methods>;
    }) => Data & Methods
  >
>;
type _12c = Expect<
  Equal<
    ReturnType<typeof givenBindReceiver<{ prefix: string }, GivenHandler>>,
    (value: number, suffix?: string) => string
  >
>;
type _12d = Expect<
  Equal<
    {
      receiver: Parameters<typeof givenBindReceiver<{ prefix: string }, GivenHandler>>[1];
      bound: ReturnType<typeof givenBindReceiver<{ prefix: string }, GivenHandler>>;
    },
    { receiver: { prefix: string }; bound: (value: number, suffix?: string) => string }
  >
>;
type _12e = Expect<
  Equal<
    {
      definer: ReceiverRuntimeApi["defineObject"];
      markerIsEmpty: ThisType<{ x: 1 } & { run(): void }>;
    },
    {
      definer: <Data, Methods>(spec: {
        data: Data;
        methods: Methods & ThisType<Data & Methods>;
      }) => Data & Methods;
      markerIsEmpty: {};
    }
  >
>;
