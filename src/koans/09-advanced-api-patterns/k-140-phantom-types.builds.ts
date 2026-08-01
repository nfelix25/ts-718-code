import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-140: phantom types — constructions
 * =============================================================================
 *
 * A phantom parameter buys assignability without buying storage. The carrier
 * keeps one runtime shape; a parameter that appears only behind an unexported
 * symbol decides which values the checker will accept where. That makes the
 * lifecycle a property of the type rather than of the data, so a transition is
 * just a signature that consumes one evidence and returns another.
 *
 * Two details drive everything below. The phantom position is a plain property,
 * so it is covariant: `Workflow<Draft>` flows into `Workflow<WorkflowState>` but
 * never back, and `Workflow<never>` flows into all of them. And making the
 * marker optional destroys the whole mechanism — an optional property is
 * satisfied by its absence, so the bare runtime shape forges the evidence for
 * free. Replace each `TODO` with a type satisfying the assertions directly
 * below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;
type GivenIsAny<Value> = 0 extends 1 & Value ? true : false;

// The phantom key stays unexported, exactly as the packet declares it.
declare const phantom: unique symbol;

// The lifecycle vocabulary is given; the carrier that holds it is not.
type Draft = { readonly state: "draft" };
type Submitted = { readonly state: "submitted" };
type Approved = { readonly state: "approved" };
type WorkflowState = Draft | Submitted | Approved;

// The runtime shape, with no state field anywhere in it.
type GivenShape = Readonly<{ id: string; content: string }>;

// ─── The carrier ──────────────────────────────────────────────────────

// 1. Build the phantom carrier: the readonly runtime shape plus a property
//    keyed by the private symbol whose type is the state parameter.
export type Workflow<State extends WorkflowState> = TODO; // TODO(koan)

type _01a = Expect<Equal<GivenExtends<Workflow<Draft>, Workflow<Submitted>>, false>>;
type _01b = Expect<Equal<GivenExtends<Workflow<Submitted>, Workflow<Draft>>, false>>;
type _01c = Expect<Equal<keyof Workflow<Draft>, "id" | "content" | typeof phantom>>;
type _01d = Expect<Equal<Workflow<Draft>["content"], string>>;
type _01e = Expect<Equal<Workflow<Draft>[typeof phantom], Draft>>;

// 2. Build the deliberately weakened variant, where the marker is optional. This
//    is the version that does not work, and knowing why is the point.
export type LoosePhantom<Value, Marker> = TODO; // TODO(koan)

type _02a = Expect<
  Equal<
    {
      shapeForgesEvidence: GivenExtends<GivenShape, LoosePhantom<GivenShape, Draft>>;
      markersStillDiffer: GivenExtends<LoosePhantom<GivenShape, Draft>, LoosePhantom<GivenShape, Submitted>>;
    },
    { shapeForgesEvidence: true; markersStillDiffer: false }
  >
>;
type _02b = Expect<
  Equal<
    {
      erasesToTheShape: GivenExtends<LoosePhantom<GivenShape, Draft>, GivenShape>;
      markersStillDiffer: GivenExtends<LoosePhantom<GivenShape, Draft>, LoosePhantom<GivenShape, Submitted>>;
    },
    { erasesToTheShape: true; markersStillDiffer: false }
  >
>;
type _02c = Expect<
  Equal<GivenExtends<LoosePhantom<GivenShape, Draft>, LoosePhantom<GivenShape, Submitted>>, false>
>;
type _02d = Expect<
  Equal<
    { requiredMarkerRefusesTheShape: GivenExtends<GivenShape, Workflow<Draft>>; optionalOneAccepts: GivenExtends<GivenShape, LoosePhantom<GivenShape, Draft>> },
    { requiredMarkerRefusesTheShape: false; optionalOneAccepts: true }
  >
>;

// 3. Build the extractor that reads the evidence back out of a carrier, and
//    reports nothing at all for anything that never carried it. Note where `any`
//    lands: it takes both branches, so the answer is the whole state union
//    rather than `any` itself.
export type StateOf<Value> = TODO; // TODO(koan)

type _03a = Expect<Equal<StateOf<Workflow<Draft>>, Draft>>;
type _03b = Expect<Equal<StateOf<Workflow<Submitted>>, Submitted>>;
type _03c = Expect<Equal<StateOf<GivenShape>, never>>;
type _03d = Expect<Equal<StateOf<unknown>, never>>;
type _03e = Expect<
  Equal<
    { fromAny: StateOf<any>; stillAny: GivenIsAny<StateOf<any>> },
    { fromAny: WorkflowState; stillAny: false }
  >
>;

// ─── The legal state graph ────────────────────────────────────────────

// 4. Build the transition predicate. Only draft→submitted and
//    submitted→approved are legal; everything else, including staying put, is
//    not.
export type CanTransition<From extends WorkflowState, To extends WorkflowState> = TODO; // TODO(koan)

type _04a = Expect<Equal<CanTransition<Draft, Submitted>, true>>;
type _04b = Expect<Equal<CanTransition<Submitted, Approved>, true>>;
type _04c = Expect<Equal<CanTransition<Draft, Approved>, false>>;
type _04d = Expect<Equal<CanTransition<Draft, Draft>, false>>;
type _04e = Expect<Equal<CanTransition<Approved, Submitted>, false>>;

// 5. Build the operator that collects the legal successors of a state. It has to
//    walk the whole state union, so it needs a distributive step of its own
//    rather than relying on `From` distributing.
export type LegalNext<From extends WorkflowState> = TODO; // TODO(koan)

type _05a = Expect<Equal<LegalNext<Draft>, Submitted>>;
type _05b = Expect<Equal<LegalNext<Submitted>, Approved>>;
type _05c = Expect<Equal<LegalNext<Approved>, never>>;
type _05d = Expect<Equal<[LegalNext<Approved>] extends [never] ? "terminal" : "open", "terminal">>;

// 6. Build the whole truth table as a nested record, keyed by the discriminant
//    the state markers carry rather than by the marker types themselves.
export type TransitionTable = TODO; // TODO(koan)

type _06a = Expect<Equal<keyof TransitionTable, "draft" | "submitted" | "approved">>;
type _06b = Expect<Equal<TransitionTable["draft"]["submitted"], true>>;
type _06c = Expect<Equal<TransitionTable["draft"]["approved"], false>>;
type _06d = Expect<Equal<TransitionTable["submitted"]["approved"], true>>;
type _06e = Expect<Equal<keyof TransitionTable["approved"], "draft" | "submitted" | "approved">>;

// ─── The API surface the evidence protects ────────────────────────────

// 7. Build the transition signatures. Each one names the evidence it demands and
//    the evidence it hands back; there is no other way to move a value along.
export type TransitionApi = TODO; // TODO(koan)

type _07a = Expect<Equal<TransitionApi["submit"], (value: Workflow<Draft>) => Workflow<Submitted>>>;
type _07b = Expect<Equal<Parameters<TransitionApi["createDraft"]>, [content: string]>>;
type _07c = Expect<
  Equal<
    { produced: ReturnType<TransitionApi["createDraft"]>; forged: GivenExtends<GivenShape, Workflow<Draft>> },
    { produced: Workflow<Draft>; forged: false }
  >
>;
type _07d = Expect<
  Equal<
    { demanded: Parameters<TransitionApi["approve"]>[0]; forged: GivenExtends<GivenShape, Workflow<Draft>> },
    { demanded: Workflow<Submitted>; forged: false }
  >
>;
type _07e = Expect<
  Equal<
    { moved: StateOf<ReturnType<TransitionApi["approve"]>>; forged: GivenExtends<GivenShape, Workflow<Draft>> },
    { moved: Approved; forged: false }
  >
>;

// 8. Build the state-agnostic operations: one reads shared data out of any
//    state, one rewrites the runtime content while carrying the evidence
//    through untouched.
export type ReadApi = TODO; // TODO(koan)

type _08a = Expect<Equal<ReturnType<ReadApi["readContent"]>, string>>;
type _08b = Expect<
  Equal<
    { widest: Parameters<ReadApi["readContent"]>[0]; forged: GivenExtends<GivenShape, Workflow<Draft>> },
    { widest: Workflow<WorkflowState>; forged: false }
  >
>;
type _08c = Expect<
  Equal<
    { carried: ReturnType<ReadApi["mapContent"]>; forged: GivenExtends<GivenShape, Workflow<Draft>> },
    { carried: Workflow<WorkflowState>; forged: false }
  >
>;
type _08d = Expect<Equal<StateOf<ReturnType<ReadApi["mapContent"]>>, WorkflowState>>;

// ─── What the phantom does and does not buy ───────────────────────────

// 9. Report the distinctness the phantom exists to create: one runtime shape,
//    three mutually unassignable types.
export type DistinctnessProfile = TODO; // TODO(koan)

type _09a = Expect<Equal<DistinctnessProfile["draftIntoSubmitted"], false>>;
type _09b = Expect<Equal<DistinctnessProfile["submittedIntoDraft"], false>>;
type _09c = Expect<Equal<DistinctnessProfile["draftIntoDraft"], true>>;
type _09d = Expect<Equal<DistinctnessProfile["draftEqualsSubmitted"], false>>;
type _09e = Expect<Equal<DistinctnessProfile["sharedFieldsAgree"], true>>;

// 10. Report the variance of the phantom position. It is an ordinary property,
//     so it is covariant, and the bottom state sits underneath every state.
export type CovarianceProfile = TODO; // TODO(koan)

type _10a = Expect<Equal<CovarianceProfile["narrowIntoWide"], true>>;
type _10b = Expect<Equal<CovarianceProfile["wideIntoNarrow"], false>>;
type _10c = Expect<Equal<CovarianceProfile["pairIntoWide"], true>>;
type _10d = Expect<Equal<CovarianceProfile["bottomIntoNarrow"], true>>;
type _10e = Expect<Equal<CovarianceProfile["carrierIntoShape"], true>>;

// 11. Report how unions move through the machinery. A union inside the phantom
//     and a union of carriers extract the same way; a union entering the
//     predicate makes it answer `boolean` instead of a verdict.
export type UnionProfile = TODO; // TODO(koan)

type _11a = Expect<Equal<UnionProfile["unionInside"], Draft | Submitted>>;
type _11b = Expect<Equal<UnionProfile["unionOutside"], Draft | Submitted>>;
type _11c = Expect<Equal<UnionProfile["unionSource"], boolean>>;
type _11d = Expect<Equal<UnionProfile["unionTarget"], boolean>>;
type _11e = Expect<Equal<UnionProfile["bottomSource"], never>>;

// 12. Report the forgery surface. The required marker is unforgeable from
//     outside because nobody else can name the key; the optional one is forged
//     by simply not mentioning it.
export type ForgeryProfile = TODO; // TODO(koan)

type _12a = Expect<Equal<ForgeryProfile["shapeIntoCarrier"], false>>;
type _12b = Expect<Equal<ForgeryProfile["shapeIntoLoose"], true>>;
type _12c = Expect<Equal<ForgeryProfile["carrierKeysCoverShape"], true>>;
type _12d = Expect<Equal<ForgeryProfile["shapeKeysCoverCarrier"], false>>;
type _12e = Expect<Equal<ForgeryProfile["looseEvidenceIsUnreadable"], never>>;

// 13. Report where the evidence stops. Anything that returns the bare runtime
//     shape has dropped it, and the extractor answers `never` for every type
//     that never carried it.
export type ErasureProfile = TODO; // TODO(koan)

type _13a = Expect<Equal<ErasureProfile["unwrappedContent"], string>>;
type _13b = Expect<Equal<ErasureProfile["droppedByReturnType"], GivenShape>>;
type _13c = Expect<Equal<ErasureProfile["fromShape"], never>>;
type _13d = Expect<Equal<ErasureProfile["fromUnknown"], never>>;
type _13e = Expect<Equal<ErasureProfile["fromBottomState"], never>>;

// 14. Report the wrappers that carry the evidence through, since a phantom
//     survives anything that preserves the type it was handed.
export type WrapperProfile = TODO; // TODO(koan)

type _14a = Expect<
  Equal<
    { held: WrapperProfile["arrayElement"]; forged: GivenExtends<GivenShape, Workflow<Draft>> },
    { held: Workflow<Draft>; forged: false }
  >
>;
type _14b = Expect<
  Equal<
    { held: WrapperProfile["awaited"]; forged: GivenExtends<GivenShape, Workflow<Draft>> },
    { held: Workflow<Submitted>; forged: false }
  >
>;
type _14c = Expect<
  Equal<
    { held: WrapperProfile["cleaned"]; forged: GivenExtends<GivenShape, Workflow<Draft>> },
    { held: Workflow<Draft>; forged: false }
  >
>;
type _14d = Expect<Equal<WrapperProfile["reReadonly"], true>>;
type _14e = Expect<
  Equal<
    { held: WrapperProfile["excluded"]; forged: GivenExtends<GivenShape, Workflow<Draft>> },
    { held: Workflow<Approved>; forged: false }
  >
>;

// ─── Operators over the evidence ──────────────────────────────────────

// 15. Build the retagger: given a carrier, produce the same carrier holding
//     different evidence, and refuse anything that was not a carrier.
export type WithState<Value, State extends WorkflowState> = TODO; // TODO(koan)

type _15a = Expect<
  Equal<
    { retagged: WithState<Workflow<Draft>, Approved>; forged: GivenExtends<GivenShape, Workflow<Draft>> },
    { retagged: Workflow<Approved>; forged: false }
  >
>;
type _15b = Expect<Equal<StateOf<WithState<Workflow<Draft>, Approved>>, Approved>>;
type _15c = Expect<Equal<WithState<GivenShape, Approved>, never>>;
type _15d = Expect<Equal<WithState<string, Draft>, never>>;

// 16. Build the guard that admits a carrier only when its evidence is the one
//     demanded. Checking the extracted state alone is not enough — a
//     non-carrier extracts to `never`, which satisfies every demand vacuously.
export type RequireState<Value, State extends WorkflowState> = TODO; // TODO(koan)

type _16a = Expect<
  Equal<
    { admitted: RequireState<Workflow<Draft>, Draft>; forged: GivenExtends<GivenShape, Workflow<Draft>> },
    { admitted: Workflow<Draft>; forged: false }
  >
>;
type _16b = Expect<Equal<RequireState<Workflow<Draft>, Submitted>, never>>;
type _16c = Expect<Equal<RequireState<GivenShape, Draft>, never>>;
type _16d = Expect<
  Equal<
    { widened: RequireState<Workflow<Draft>, WorkflowState>; forged: GivenExtends<GivenShape, Workflow<Draft>> },
    { widened: Workflow<Draft>; forged: false }
  >
>;

// 17. Build the runner that walks a tuple of target states from a starting
//     state, producing the carrier it lands on, or `never` the moment a step
//     is not on the legal graph.
export type RunTransitions<
  From extends WorkflowState,
  Steps extends readonly WorkflowState[],
> = TODO; // TODO(koan)

type _17a = Expect<
  Equal<
    { landed: RunTransitions<Draft, [Submitted, Approved]>; forged: GivenExtends<GivenShape, Workflow<Draft>> },
    { landed: Workflow<Approved>; forged: false }
  >
>;
type _17b = Expect<Equal<RunTransitions<Draft, [Approved]>, never>>;
type _17c = Expect<
  Equal<
    { landed: RunTransitions<Draft, []>; forged: GivenExtends<GivenShape, Workflow<Draft>> },
    { landed: Workflow<Draft>; forged: false }
  >
>;
type _17d = Expect<Equal<RunTransitions<Draft, [Submitted, Draft]>, never>>;
type _17e = Expect<Equal<StateOf<RunTransitions<Submitted, [Approved]>>, Approved>>;

// 18. Report a full run: where it landed, what evidence it holds, and whether it
//     was legal at all — the report a build step would print.
export type PipelineReport<Steps extends readonly WorkflowState[]> = TODO; // TODO(koan)

type _18a = Expect<Equal<PipelineReport<[Submitted, Approved]>["reached"], Approved>>;
type _18b = Expect<Equal<PipelineReport<[Submitted, Approved]>["legal"], true>>;
type _18c = Expect<Equal<PipelineReport<[Approved]>["legal"], false>>;
type _18d = Expect<Equal<PipelineReport<[Approved]>["reached"], never>>;
type _18e = Expect<
  Equal<
    { landed: PipelineReport<[]>["final"]; forged: GivenExtends<GivenShape, Workflow<Draft>> },
    { landed: Workflow<Draft>; forged: false }
  >
>;
