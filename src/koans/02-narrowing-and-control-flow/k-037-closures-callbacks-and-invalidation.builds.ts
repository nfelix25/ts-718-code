import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-037: closures, callbacks, and invalidation — constructions
 * =============================================================================
 *
 * These constructions describe which narrowed storage a closure may safely
 * capture, how last and later assignments affect its return, why property
 * snapshots differ from property reads, and what callback execution proves to
 * surrounding flow. Replace each `TODO` with a type satisfying the assertions
 * directly below it.
 */

type GivenKind<Value> =
  0 extends 1 & Value
    ? "any"
    : [Value] extends [never]
      ? "never"
      : unknown extends Value
        ? [keyof Value] extends [never] ? "unknown" : "ordinary"
        : "ordinary";

type GivenPositive<Source, Target> =
  0 extends 1 & Source
    ? Target
    : unknown extends Source
      ? Target
      : Source extends unknown
        ? Source extends Target ? Source : Target extends Source ? Target : never
        : never;

type CaptureFactors = {
  readonly stableStorage: boolean;
  readonly narrowedAtCreation: boolean;
  readonly noLaterWrite: boolean;
  readonly directBinding: boolean;
};

type GivenPreserved<Factors extends CaptureFactors> =
  Factors extends {
    readonly stableStorage: true;
    readonly narrowedAtCreation: true;
    readonly noLaterWrite: true;
    readonly directBinding: true;
  }
    ? true
    : false;

type GivenFactors = {
  readonly stableStorage: true;
  readonly narrowedAtCreation: true;
  readonly noLaterWrite: true;
  readonly directBinding: true;
};

type GivenItem =
  | { readonly kind: "text"; readonly value: string }
  | { readonly kind: "count"; readonly value: number };

type CallbackMechanism =
  | "immediate"
  | "forEach"
  | "map"
  | "direct-loop";

// ─── Stable captures and returned closures ─────────────────────────────────

// 1. Build a zero-argument reader for one captured value.
export type CapturedReader<Value> = TODO; // TODO(koan)

type _01a = Expect<Equal<CapturedReader<string>, () => string>>;
type _01b = Expect<Equal<CapturedReader<number>, () => number>>;
type _01c = Expect<
  Equal<CapturedReader<string | number>, () => string | number>
>;
type _01d = Expect<Equal<CapturedReader<never>, () => never>>;

// 2. Construct the value retained after a stable branch narrowing.
export type NarrowedCaptureValue<
  Source,
  Target extends Source,
> = TODO; // TODO(koan)

type _02a = Expect<
  Equal<NarrowedCaptureValue<string | number, string>, string>
>;
type _02b = Expect<
  Equal<NarrowedCaptureValue<string | number, number>, number>
>;
type _02c = Expect<Equal<NarrowedCaptureValue<unknown, Date>, Date>>;
type _02d = Expect<Equal<NarrowedCaptureValue<never, never>, never>>;

// 3. Build a closure returning the selected discriminated-union member.
export type DiscriminantCapture<
  Union,
  Key extends keyof Union,
  Tag,
> = TODO; // TODO(koan)

type _03a = Expect<
  Equal<
    DiscriminantCapture<GivenItem, "kind", "text">,
    () => { readonly kind: "text"; readonly value: string }
  >
>;
type _03b = Expect<
  Equal<
    ReturnType<DiscriminantCapture<GivenItem, "kind", "count">>,
    { readonly kind: "count"; readonly value: number }
  >
>;
type _03c = Expect<
  Equal<
    ReturnType<DiscriminantCapture<GivenItem, "kind", "text" | "count">>,
    GivenItem
  >
>;
type _03d = Expect<
  Equal<ReturnType<DiscriminantCapture<GivenItem, "kind", "missing">>, never>
>;

// 4. Build the common formatter factory surface for either narrowed branch.
export type FormatterFactory<Source> = TODO; // TODO(koan)

type _04a = Expect<
  Equal<FormatterFactory<string | number>, (value: string | number) => () => string>
>;
type _04b = Expect<
  Equal<ReturnType<FormatterFactory<unknown>>, () => string>
>;
type _04c = Expect<
  Equal<ReturnType<ReturnType<FormatterFactory<{}>>>, string>
>;
type _04d = Expect<
  Equal<Parameters<FormatterFactory<readonly []>>, [value: readonly []]>
>;

// ─── Preservation requirements and assignment order ───────────────────────

// 5. Decide whether all requirements for preserving a captured narrowing hold.
export type CapturePreserved<Factors extends CaptureFactors> = TODO; // TODO(koan)

type _05a = Expect<Equal<CapturePreserved<GivenFactors>, true>>;
type _05b = Expect<
  Equal<
    CapturePreserved<
      Omit<GivenFactors, "stableStorage"> & { readonly stableStorage: false }
    >,
    false
  >
>;
type _05c = Expect<
  Equal<
    CapturePreserved<
      Omit<GivenFactors, "noLaterWrite"> & { readonly noLaterWrite: false }
    >,
    false
  >
>;
type _05d = Expect<
  Equal<
    CapturePreserved<
      Omit<GivenFactors, "directBinding"> & { readonly directBinding: false }
    >,
    false
  >
>;
type _05e = Expect<
  Equal<
    CapturePreserved<
      Omit<GivenFactors, "narrowedAtCreation"> & {
        readonly narrowedAtCreation: false;
      }
    >,
    false
  >
>;

// 6. Construct every reason a captured narrowing cannot be retained.
export type CaptureBlockers<Factors extends CaptureFactors> = TODO; // TODO(koan)

type _06a = Expect<Equal<CaptureBlockers<GivenFactors>, never>>;
type _06b = Expect<
  Equal<
    CaptureBlockers<
      Omit<GivenFactors, "noLaterWrite"> & { readonly noLaterWrite: false }
    >,
    "later-write"
  >
>;
type _06c = Expect<
  Equal<
    CaptureBlockers<
      Omit<GivenFactors, "stableStorage" | "directBinding"> & {
        readonly stableStorage: false;
        readonly directBinding: false;
      }
    >,
    "unstable-storage" | "mutable-property"
  >
>;
type _06d = Expect<
  Equal<
    CaptureBlockers<{
      readonly stableStorage: false;
      readonly narrowedAtCreation: false;
      readonly noLaterWrite: false;
      readonly directBinding: false;
    }>,
    "unstable-storage" | "not-narrowed" | "later-write" | "mutable-property"
  >
>;

// 7. Retain the target only when capture preservation remains sound.
export type CapturedOutcome<
  Source,
  Target extends Source,
  Factors extends CaptureFactors,
> = TODO; // TODO(koan)

type _07a = Expect<
  Equal<CapturedOutcome<string | number, string, GivenFactors>, string>
>;
type _07b = Expect<
  Equal<
    CapturedOutcome<
      string | number,
      string,
      Omit<GivenFactors, "noLaterWrite"> & { readonly noLaterWrite: false }
    >,
    string | number
  >
>;
type _07c = Expect<
  Equal<
    CapturedOutcome<
      unknown,
      Date,
      Omit<GivenFactors, "directBinding"> & { readonly directBinding: false }
    >,
    unknown
  >
>;
type _07d = Expect<
  Equal<CapturedOutcome<never, never, GivenFactors>, never>
>;

// 8. Build a reader whose creation follows the last unconditional assignment.
export type LastAssignmentReader<Assigned> = TODO; // TODO(koan)

type _08a = Expect<Equal<LastAssignmentReader<"fixed">, () => "fixed">>;
type _08b = Expect<Equal<LastAssignmentReader<1>, () => 1>>;
type _08c = Expect<
  Equal<LastAssignmentReader<string | number>, () => string | number>
>;
type _08d = Expect<Equal<LastAssignmentReader<never>, () => never>>;

// 9. Construct the reader after a conditional last assignment.
export type ConditionalAssignmentReader<Left, Right> = TODO; // TODO(koan)

type _09a = Expect<
  Equal<ConditionalAssignmentReader<"yes", 0>, () => "yes" | 0>
>;
type _09b = Expect<
  Equal<ConditionalAssignmentReader<string, number>, () => string | number>
>;
type _09c = Expect<
  Equal<ConditionalAssignmentReader<null, undefined>, () => null | undefined>
>;
type _09d = Expect<
  Equal<ConditionalAssignmentReader<never, never>, () => never>
>;

// 10. Widen a closure back to its declared source after any later write.
export type LaterWriteReader<Source, Written extends Source> = TODO; // TODO(koan)

type _10a = Expect<
  Equal<LaterWriteReader<string | number, number>, () => string | number>
>;
type _10b = Expect<
  Equal<LaterWriteReader<string | number, string>, () => string | number>
>;
type _10c = Expect<
  Equal<LaterWriteReader<object | null, null>, () => object | null>
>;
type _10d = Expect<Equal<LaterWriteReader<never, never>, () => never>>;

// 11. Treat a possible write performed by another closure as invalidating.
export type CallbackMutationReader<
  Source,
  CallbackWrite extends Source,
> = TODO; // TODO(koan)

type _11a = Expect<
  Equal<CallbackMutationReader<string | number, string>, () => string | number>
>;
type _11b = Expect<
  Equal<CallbackMutationReader<string | number, number>, () => string | number>
>;
type _11c = Expect<
  Equal<CallbackMutationReader<unknown, Date>, () => unknown>
>;
type _11d = Expect<
  Equal<CallbackMutationReader<never, never>, () => never>
>;

// ─── Mutable properties and callback reachability ──────────────────────────

// 12. Pair a wide property reader with a stable narrowed snapshot reader.
export type PropertySnapshotReaders<
  Property,
  Snapshot extends Property,
> = TODO; // TODO(koan)

type _12a = Expect<
  Equal<
    PropertySnapshotReaders<string | number, string>,
    [property: () => string | number, snapshot: () => string]
  >
>;
type _12b = Expect<
  Equal<
    PropertySnapshotReaders<object | null, object>,
    [property: () => object | null, snapshot: () => object]
  >
>;
type _12c = Expect<
  Equal<
    PropertySnapshotReaders<unknown, Date>,
    [property: () => unknown, snapshot: () => Date]
  >
>;
type _12d = Expect<
  Equal<
    PropertySnapshotReaders<never, never>,
    [property: () => never, snapshot: () => never]
  >
>;

// 13. Keep even a readonly property reader at its declared property type.
export type ReadonlyPropertyReader<Property> = TODO; // TODO(koan)

type _13a = Expect<
  Equal<ReadonlyPropertyReader<string | number>, () => string | number>
>;
type _13b = Expect<
  Equal<ReadonlyPropertyReader<object | null>, () => object | null>
>;
type _13c = Expect<Equal<ReadonlyPropertyReader<unknown>, () => unknown>>;
type _13d = Expect<Equal<ReadonlyPropertyReader<never>, () => never>>;

// 14. Preserve possible absence after assignment inside a maybe-zero callback.
export type AssignmentAfterCallback<Value> = TODO; // TODO(koan)

type _14a = Expect<
  Equal<AssignmentAfterCallback<string>, string | undefined>
>;
type _14b = Expect<
  Equal<AssignmentAfterCallback<string | number>, string | number | undefined>
>;
type _14c = Expect<Equal<AssignmentAfterCallback<never>, undefined>>;
type _14d = Expect<
  Equal<
    AssignmentAfterCallback<{ readonly id: 1 }>,
    { readonly id: 1 } | undefined
  >
>;

// 15. Construct the assigned type visible inside the callback body itself.
export type AssignmentInsideCallback<Value> = TODO; // TODO(koan)

type _15a = Expect<Equal<AssignmentInsideCallback<string>, string>>;
type _15b = Expect<
  Equal<AssignmentInsideCallback<string | number>, string | number>
>;
type _15c = Expect<
  Equal<AssignmentInsideCallback<readonly []>, readonly []>
>;
type _15d = Expect<Equal<AssignmentInsideCallback<never>, never>>;

// 16. Build map, find, and outer-assignment results for one callback element.
export type CollectionCallbackResults<Element, Mapped> = TODO; // TODO(koan)

type _16a = Expect<
  Equal<
    CollectionCallbackResults<string, number>,
    [mapped: number[], found: string | undefined, assignedOutside: string | undefined]
  >
>;
type _16b = Expect<
  Equal<
    CollectionCallbackResults<string | number, string>,
    [
      mapped: string[],
      found: string | number | undefined,
      assignedOutside: string | number | undefined,
    ]
  >
>;
type _16c = Expect<
  Equal<
    CollectionCallbackResults<readonly [], boolean>,
    [mapped: boolean[], found: readonly [] | undefined, assignedOutside: readonly [] | undefined]
  >
>;
type _16d = Expect<
  Equal<
    CollectionCallbackResults<never, never>,
    [mapped: never[], found: undefined, assignedOutside: undefined]
  >
>;

// 17. Build a callback that may itself be absent and may read an absent index.
export type OptionalIndexedCallback<Element> = TODO; // TODO(koan)

type _17a = Expect<
  Equal<OptionalIndexedCallback<string>, (() => string | undefined) | undefined>
>;
type _17b = Expect<
  Equal<
    OptionalIndexedCallback<string | number>,
    (() => string | number | undefined) | undefined
  >
>;
type _17c = Expect<
  Equal<OptionalIndexedCallback<never>, (() => undefined) | undefined>
>;
type _17d = Expect<
  Equal<
    OptionalIndexedCallback<{ readonly id: 1 }>,
    (() => { readonly id: 1 } | undefined) | undefined
  >
>;

// ─── Closure forms, loops, and special values ──────────────────────────────

// 18. Construct immediate, returned, async, and nested closure surfaces.
export type ClosureForms<Value, Immediate> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<
    ClosureForms<string, number>,
    {
      readonly immediate: number;
      readonly returned: () => string;
      readonly asynchronous: Promise<string>;
      readonly nested: () => () => string;
    }
  >
>;
type _18b = Expect<
  Equal<
    ClosureForms<number, string>,
    {
      readonly immediate: string;
      readonly returned: () => number;
      readonly asynchronous: Promise<number>;
      readonly nested: () => () => number;
    }
  >
>;
type _18c = Expect<
  Equal<
    ClosureForms<string | number, boolean>["asynchronous"],
    Promise<string | number>
  >
>;
type _18d = Expect<
  Equal<ReturnType<ReturnType<ClosureForms<never, never>["nested"]>>, never>
>;

// 19. Keep a shadowing callback's parameter and result independent of the capture.
export type ShadowedCallbackProfile<Captured, Shadow, Result> = TODO; // TODO(koan)

type _19a = Expect<
  Equal<
    ShadowedCallbackProfile<string, number, string>,
    [captured: string, shadow: number, results: string[]]
  >
>;
type _19b = Expect<
  Equal<
    ShadowedCallbackProfile<number, string, boolean>,
    [captured: number, shadow: string, results: boolean[]]
  >
>;
type _19c = Expect<
  Equal<
    ShadowedCallbackProfile<unknown, never, readonly []>,
    [captured: unknown, shadow: never, results: Array<readonly []>]
  >
>;
type _19d = Expect<
  Equal<
    ShadowedCallbackProfile<never, never, never>,
    [captured: never, shadow: never, results: never[]]
  >
>;

// 20. Build one stable callback per for-of iteration element.
export type LoopCallbackList<Element> = TODO; // TODO(koan)

type _20a = Expect<Equal<LoopCallbackList<string>, Array<() => string>>>;
type _20b = Expect<
  Equal<LoopCallbackList<string | number>, Array<() => string | number>>
>;
type _20c = Expect<
  Equal<LoopCallbackList<readonly []>, Array<() => readonly []>>
>;
type _20d = Expect<Equal<LoopCallbackList<never>, Array<() => never>>>;

// 21. Construct the indexed callback and all invocation results.
export type LoopCallbackResults<Element> = TODO; // TODO(koan)

type _21a = Expect<
  Equal<
    LoopCallbackResults<string>,
    [first: (() => string) | undefined, invoked: string[]]
  >
>;
type _21b = Expect<
  Equal<
    LoopCallbackResults<string | number>,
    [first: (() => string | number) | undefined, invoked: Array<string | number>]
  >
>;
type _21c = Expect<
  Equal<
    LoopCallbackResults<readonly []>,
    [first: (() => readonly []) | undefined, invoked: Array<readonly []>]
  >
>;
type _21d = Expect<
  Equal<
    LoopCallbackResults<never>,
    [first: (() => never) | undefined, invoked: never[]]
  >
>;

// 22. Mark only an immediately invoked callback as guaranteed to execute.
export type CallbackExecutionGuaranteed<
  Mechanism extends CallbackMechanism,
> = TODO; // TODO(koan)

type _22a = Expect<Equal<CallbackExecutionGuaranteed<"immediate">, true>>;
type _22b = Expect<Equal<CallbackExecutionGuaranteed<"forEach">, false>>;
type _22c = Expect<Equal<CallbackExecutionGuaranteed<"map">, false>>;
type _22d = Expect<Equal<CallbackExecutionGuaranteed<"direct-loop">, false>>;
type _22e = Expect<
  Equal<CallbackExecutionGuaranteed<"immediate" | "forEach">, boolean>
>;

// 23. Classify special sources and their closure result after a stable guard.
export type SpecialCaptureProfile<
  Source,
  Target extends Source,
> = TODO; // TODO(koan)

type _23a = Expect<
  Equal<
    SpecialCaptureProfile<unknown, string>,
    [source: "unknown", captured: "ordinary", reader: "ordinary"]
  >
>;
type _23b = Expect<
  Equal<
    SpecialCaptureProfile<any, string>,
    [source: "any", captured: "ordinary", reader: "ordinary"]
  >
>;
type _23c = Expect<
  Equal<
    SpecialCaptureProfile<never, never>,
    [source: "never", captured: "never", reader: "never"]
  >
>;
type _23d = Expect<
  Equal<
    SpecialCaptureProfile<string | number, number>,
    [source: "ordinary", captured: "ordinary", reader: "ordinary"]
  >
>;
