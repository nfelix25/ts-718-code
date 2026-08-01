import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-212: this-less function context sensitivity — constructions
 * =============================================================================
 *
 * Generic inference postpones *context-sensitive* arguments: a function whose
 * parameters cannot be checked until the type argument is known contributes no
 * candidate in the first pass. Method syntax used to be treated that way on
 * sight, because a method has an implicit `this` — even when the body never
 * touches it. TypeScript 6.0 looks at the body instead, so a this-less method
 * can supply evidence in the first pass like an arrow always could.
 *
 * The shape of the fix is worth building: gather independent candidates, fix the
 * type argument, then contextually type whatever was postponed. A method that
 * genuinely reads `this` still takes the conservative path, and an argument list
 * with no independent evidence at all still ends at `unknown`.
 * Replace each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;
type IsUnknown<Value> = [unknown] extends [Value] ? ([Value] extends [unknown] ? true : false) : false;

// ─── What makes an argument postponed ─────────────────────────────────

// 1. Build the argument forms an inference pass has to classify.
export type ArgumentForm = TODO; // TODO(koan)

type _01a = Expect<
  Equal<ArgumentForm, "value" | "arrow" | "thisLessMethod" | "methodUsingThis" | "annotatedCallback">
>;
type _01b = Expect<
  Equal<Extract<ArgumentForm, `${string}ethod${string}`>, "thisLessMethod" | "methodUsingThis">
>;
type _01c = Expect<Equal<Extract<ArgumentForm, "value">, "value">>;
type _01d = Expect<Equal<Extract<ArgumentForm, "constructor">, never>>;

// 2. Build the old rule: anything written as a method was postponed, because the
//    implicit receiver might depend on the type being inferred.
export type PostponedBefore6<Form extends ArgumentForm> = TODO; // TODO(koan)

type _02a = Expect<Equal<PostponedBefore6<"arrow">, true>>;
type _02b = Expect<Equal<PostponedBefore6<"thisLessMethod">, true>>;
type _02c = Expect<Equal<PostponedBefore6<"methodUsingThis">, true>>;
type _02d = Expect<Equal<PostponedBefore6<"value">, false>>;
type _02e = Expect<Equal<PostponedBefore6<"annotatedCallback">, false>>;

// 3. Build the new rule: an unannotated function body still has to wait, unless
//    it demonstrably has nothing to do with the receiver.
export type PostponedIn6<Form extends ArgumentForm> = TODO; // TODO(koan)

type _03a = Expect<Equal<PostponedIn6<"methodUsingThis">, true>>;
type _03b = Expect<Equal<PostponedIn6<"thisLessMethod">, false>>;
type _03c = Expect<Equal<PostponedIn6<"value">, false>>;
type _03d = Expect<Equal<PostponedIn6<"annotatedCallback">, false>>;

// 4. Build the single row that moved.
export type ChangedIn6<Form extends ArgumentForm> = TODO; // TODO(koan)

type _04a = Expect<Equal<ChangedIn6<"thisLessMethod">, true>>;
type _04b = Expect<Equal<ChangedIn6<"methodUsingThis">, false>>;
type _04c = Expect<Equal<ChangedIn6<"arrow">, false>>;
type _04d = Expect<Equal<ChangedIn6<"value">, false>>;

// ─── The candidate gathering ──────────────────────────────────────────

// 5. Build one argument as the inference pass sees it: a form and the type it
//    would contribute.
export type Argument<Form extends ArgumentForm, Contributes> = TODO; // TODO(koan)

type _05a = Expect<Equal<Argument<"value", string>["form"], "value">>;
type _05b = Expect<Equal<Argument<"value", string>["contributes"], string>>;
type _05c = Expect<Equal<keyof Argument<"arrow", never>, "form" | "contributes">>;
type _05d = Expect<Equal<Argument<"thisLessMethod", number>["contributes"], number>>;

// 6. Build the first pass: collect what the un-postponed arguments say.
export type CandidatesFrom<
  Arguments extends readonly Argument<ArgumentForm, unknown>[],
> = TODO; // TODO(koan)

type _06a = Expect<Equal<CandidatesFrom<[Argument<"value", string>]>, string>>;
type _06b = Expect<Equal<CandidatesFrom<[Argument<"arrow", string>]>, never>>;
type _06c = Expect<Equal<CandidatesFrom<[Argument<"thisLessMethod", number>]>, number>>;
type _06d = Expect<
  Equal<CandidatesFrom<[Argument<"arrow", string>, Argument<"value", number>]>, number>
>;
type _06e = Expect<Equal<CandidatesFrom<[]>, never>>;

// 7. Build the selection: with no candidate at all there is nothing to fix the
//    parameter to, and the safe top type is what remains.
export type SelectedType<Arguments extends readonly Argument<ArgumentForm, unknown>[]> = TODO; // TODO(koan)

type _07a = Expect<Equal<SelectedType<[Argument<"value", string>]>, string>>;
type _07b = Expect<
  Equal<
    {
      aPostponedArgumentFixesNothing: IsUnknown<SelectedType<[Argument<"arrow", string>]>>;
      whereasAValueArgumentDoes: SelectedType<[Argument<"value", string>]>;
    },
    { aPostponedArgumentFixesNothing: true; whereasAValueArgumentDoes: string }
  >
>;
type _07c = Expect<
  Equal<SelectedType<[Argument<"thisLessMethod", "a">, Argument<"value", "b">]>, "a" | "b">
>;
type _07d = Expect<
  Equal<
    {
      noArgumentsFixNothingEither: IsUnknown<SelectedType<[]>>;
      andOneThisLessMethodIsEnough: SelectedType<[Argument<"thisLessMethod", number>]>;
    },
    { noArgumentsFixNothingEither: true; andOneThisLessMethodIsEnough: number }
  >
>;

// 8. Build the same selection under the old rule, which is where the difference
//    shows up.
export type SelectedBefore6<
  Arguments extends readonly Argument<ArgumentForm, unknown>[],
> = TODO; // TODO(koan)

type _08a = Expect<Equal<SelectedBefore6<[Argument<"value", string>]>, string>>;
type _08b = Expect<Equal<SelectedBefore6<[Argument<"thisLessMethod", number>]>, never>>;
type _08c = Expect<Equal<SelectedBefore6<[Argument<"arrow", string>]>, never>>;
type _08d = Expect<
  Equal<SelectedBefore6<[Argument<"annotatedCallback", boolean>]>, boolean>
>;

// ─── What the postponed argument then gets ────────────────────────────

// 9. Build the contextual type a postponed callback receives once the parameter
//    has been fixed.
export type ContextualParameter<Selected> = TODO; // TODO(koan)

type _09a = Expect<Equal<Parameters<ContextualParameter<string>>[0], string>>;
type _09b = Expect<Equal<ReturnType<ContextualParameter<string>>, void>>;
type _09c = Expect<
  Equal<
    {
      anUnfixedParameterIsTheTopType: Parameters<ContextualParameter<unknown>>[0];
      andThereIsStillExactlyOne: Parameters<ContextualParameter<unknown>>["length"];
    },
    { anUnfixedParameterIsTheTopType: unknown; andThereIsStillExactlyOne: 1 }
  >
>;
type _09d = Expect<Equal<Parameters<ContextualParameter<string>>["length"], 1>>;

// 10. Build the whole two-phase result for one call: what was selected and what
//     the postponed callback ends up seeing.
export type CallResult<Arguments extends readonly Argument<ArgumentForm, unknown>[]> = TODO; // TODO(koan)

type _10a = Expect<Equal<CallResult<[Argument<"value", string>]>["selected"], string>>;
type _10b = Expect<Equal<CallResult<[Argument<"value", string>]>["callbackParameter"], string>>;
type _10c = Expect<
  Equal<
    {
      nothingFixedIt: IsUnknown<CallResult<[Argument<"arrow", string>]>["selected"]>;
      soTheCallbackSeesTheTopTypeToo: CallResult<[Argument<"arrow", string>]>["callbackParameter"];
    },
    { nothingFixedIt: true; soTheCallbackSeesTheTopTypeToo: unknown }
  >
>;
type _10d = Expect<
  Equal<CallResult<[Argument<"thisLessMethod", number>]>["callbackParameter"], number>
>;

// ─── The receiver that caused all this ────────────────────────────────

// 11. Build the implicit parameter a method has and an arrow does not.
export type WithReceiver<Receiver, Result> = TODO; // TODO(koan)

type _11a = Expect<Equal<ReturnType<WithReceiver<{ id: number }, string>>, string>>;
type _11b = Expect<Equal<Parameters<WithReceiver<{ id: number }, string>>, []>>;
type _11c = Expect<Equal<ThisParameterType<WithReceiver<{ id: number }, string>>, { id: number }>>;
type _11d = Expect<
  Equal<OmitThisParameter<WithReceiver<{ id: number }, string>>, () => string>
>;

// 12. Build the observation that decides the new rule: does the body's type
//     depend on the receiver at all?
export type DependsOnReceiver<Signature> = TODO; // TODO(koan)

type _12a = Expect<Equal<DependsOnReceiver<WithReceiver<{ id: number }, string>>, true>>;
type _12b = Expect<Equal<DependsOnReceiver<() => string>, false>>;
type _12c = Expect<Equal<DependsOnReceiver<(value: string) => void>, false>>;
type _12d = Expect<Equal<DependsOnReceiver<WithReceiver<string, void>>, true>>;

// 13. Build the classification of a written argument from that observation,
//     which is what 6.0 does instead of trusting the syntax.
export type FormOf<Signature, Written extends "method" | "arrow"> = TODO; // TODO(koan)

type _13a = Expect<Equal<FormOf<() => string, "method">, "thisLessMethod">>;
type _13b = Expect<Equal<FormOf<WithReceiver<{ id: number }, string>, "method">, "methodUsingThis">>;
type _13c = Expect<Equal<FormOf<() => string, "arrow">, "arrow">>;
type _13d = Expect<Equal<FormOf<WithReceiver<{ id: number }, string>, "arrow">, "arrow">>;

// ─── The escape hatch ─────────────────────────────────────────────────

// 14. Build the annotation that removes the question entirely: an argument whose
//     parameters are written down is never postponed.
export type AnnotatedCallback<Value> = TODO; // TODO(koan)

type _14a = Expect<Equal<Parameters<AnnotatedCallback<string>>[0], string>>;
type _14b = Expect<Equal<PostponedIn6<"annotatedCallback">, false>>;
type _14c = Expect<Equal<PostponedBefore6<"annotatedCallback">, false>>;
type _14d = Expect<
  Equal<
    SelectedType<[Argument<"annotatedCallback", Parameters<AnnotatedCallback<string>>[0]>]>,
    string
  >
>;

// 15. Build the other escape: putting the value-shaped argument first, so there
//     is independent evidence whatever the callback does.
export type EvidenceOrder<Arguments extends readonly Argument<ArgumentForm, unknown>[]> = TODO; // TODO(koan)

type _15a = Expect<
  Equal<EvidenceOrder<[Argument<"arrow", string>, Argument<"value", number>]>, "an argument fixed it">
>;
type _15b = Expect<Equal<EvidenceOrder<[Argument<"arrow", string>]>, "no independent evidence">>;
type _15c = Expect<
  Equal<EvidenceOrder<[Argument<"thisLessMethod", number>]>, "an argument fixed it">
>;
type _15d = Expect<Equal<EvidenceOrder<[]>, "no independent evidence">>;

// ─── Reading it back ──────────────────────────────────────────────────

// 16. Report the row that changed, on both sides of the release.
export type ThisLessMethodProfile = TODO; // TODO(koan)

type _16a = Expect<Equal<ThisLessMethodProfile["postponedBefore"], true>>;
type _16b = Expect<Equal<ThisLessMethodProfile["postponedNow"], false>>;
type _16c = Expect<Equal<ThisLessMethodProfile["selectedBefore"], never>>;
type _16d = Expect<Equal<ThisLessMethodProfile["selectedNow"], number>>;
type _16e = Expect<Equal<ThisLessMethodProfile["changed"], true>>;

// 17. Report the row that did not: a method that reads its receiver is still
//     postponed, and with nothing else to go on the parameter is still unknown.
export type ReceiverUsingProfile = TODO; // TODO(koan)

type _17a = Expect<Equal<ReceiverUsingProfile["stillPostponed"], true>>;
type _17b = Expect<
  Equal<
    {
      nothingElseFixedIt: IsUnknown<ReceiverUsingProfile["withNothingElseToGoOn"]>;
      butAnotherArgumentWould: ReceiverUsingProfile["butAnotherArgumentStillFixesIt"];
    },
    { nothingElseFixedIt: true; butAnotherArgumentWould: string }
  >
>;
type _17c = Expect<Equal<ReceiverUsingProfile["butAnotherArgumentStillFixesIt"], string>>;
type _17d = Expect<Equal<ReceiverUsingProfile["andTheCallbackThenSeesThat"], string>>;

// 18. Report one call at a glance: what each rule postpones, what got selected,
//     and what the postponed argument ends up being checked against.
export type InferenceReport<
  Arguments extends readonly Argument<ArgumentForm, unknown>[],
> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<InferenceReport<[Argument<"thisLessMethod", number>]>["candidates"], number>
>;
type _18b = Expect<
  Equal<InferenceReport<[Argument<"thisLessMethod", number>]>["selectedBefore6"], never>
>;
type _18c = Expect<
  Equal<InferenceReport<[Argument<"thisLessMethod", number>]>["evidence"], "an argument fixed it">
>;
type _18d = Expect<
  Equal<InferenceReport<[Argument<"thisLessMethod", number>]>["callbackParameter"], number>
>;
type _18e = Expect<
  Equal<
    {
      anArrowAloneFixesNothing: IsUnknown<InferenceReport<[Argument<"arrow", string>]>["selected"]>;
      andTheReportSaysSo: InferenceReport<[Argument<"arrow", string>]>["evidence"];
    },
    { anArrowAloneFixesNothing: true; andTheReportSaysSo: "no independent evidence" }
  >
>;
