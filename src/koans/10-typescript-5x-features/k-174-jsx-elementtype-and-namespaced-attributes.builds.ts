import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-174: JSX ElementType and namespaced attributes — constructions
 * =============================================================================
 *
 * TypeScript 5.1 separated two questions JSX used to conflate: *what may be used
 * as a tag* and *what a tag produces*. Before, a component had to return
 * something assignable to the element type; now `JSX.ElementType` names the legal
 * tags and the return type is checked on its own. That is what lets a component
 * return a string, a number, or a promise — an async component is legal because
 * nothing forces its result to be an element.
 *
 * The same release let attribute names contain a colon, so a namespaced
 * attribute is just a property whose key happens to have one in it. Nothing
 * about the type system changes for that: it is an ordinary string-literal key,
 * which is exactly why the intrinsic table below can describe `svg:path` and
 * `stroke:width` with no special machinery. Replace each `TODO` with a type
 * satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

// The three tag implementations this file measures.
declare function GivenTextTag(props: { text: string }): string;
declare function GivenAsyncIcon(props: { name: string }): Promise<KoanElement>;
declare class GivenBadgeTag {
  readonly props: { tone: "info" | "warning" };
  constructor(props: { tone: "info" | "warning" });
  render(): KoanElement;
}

// ─── What a tag produces ──────────────────────────────────────────────

// 1. Build the element a host tag creates — deliberately minimal, because after
//    5.1 very little has to be an element at all.
export type KoanElement = TODO; // TODO(koan)

type _01a = Expect<Equal<keyof KoanElement, "type" | "props">>;
type _01b = Expect<Equal<KoanElement["type"], string>>;
type _01c = Expect<Equal<KoanElement["props"], Readonly<Record<string, unknown>>>>;
type _01d = Expect<
  Equal<
    {
      structuralElementFits: GivenExtends<{ readonly type: "button"; readonly props: {} }, KoanElement>;
      divIsNotATag: IsValidTag<"div">;
    },
    { structuralElementFits: true; divIsNotATag: false }
  >
>;

// 2. Build the set of things a tag may return. This is the union 5.1 made
//    possible: an element, a primitive, nothing, or a promise of an element.
export type RenderOutput = TODO; // TODO(koan)

type _02a = Expect<
  Equal<
    {
      stringIsAllowed: GivenExtends<string, RenderOutput>;
      divIsNotATag: IsValidTag<"div">;
    },
    { stringIsAllowed: true; divIsNotATag: false }
  >
>;
type _02b = Expect<
  Equal<
    {
      promiseIsAllowed: GivenExtends<Promise<KoanElement>, RenderOutput>;
      divIsNotATag: IsValidTag<"div">;
    },
    { promiseIsAllowed: true; divIsNotATag: false }
  >
>;
type _02c = Expect<
  Equal<
    {
      nullIsAllowed: GivenExtends<null, RenderOutput>;
      divIsNotATag: IsValidTag<"div">;
    },
    { nullIsAllowed: true; divIsNotATag: false }
  >
>;
type _02d = Expect<Equal<GivenExtends<undefined, RenderOutput>, false>>;
type _02e = Expect<Equal<Extract<RenderOutput, string | number>, string | number>>;

// ─── What may be used as a tag ────────────────────────────────────────

// 3. Build the intrinsic table. The colons in these names are not syntax — they
//    are ordinary characters in a string-literal key.
export type IntrinsicElements = TODO; // TODO(koan)

type _03a = Expect<Equal<keyof IntrinsicElements, "button" | "svg:path" | "math:sum">>;
type _03b = Expect<Equal<IntrinsicElements["button"]["label"], string>>;
type _03c = Expect<Equal<keyof IntrinsicElements["svg:path"], "d" | "stroke:width">>;
type _03d = Expect<Equal<IntrinsicElements["svg:path"]["stroke:width"], number | undefined>>;
type _03e = Expect<Equal<IntrinsicElements["math:sum"]["values"], readonly number[]>>;

// 4. Build the function-tag shape. Its result is `RenderOutput`, not the element
//    type — which is the entire point of the decoupling.
export type FunctionTag<Props = any> = TODO; // TODO(koan)

type _04a = Expect<
  Equal<
    {
      result: ReturnType<FunctionTag>;
      divIsNotATag: IsValidTag<"div">;
    },
    { result: RenderOutput; divIsNotATag: false }
  >
>;
type _04b = Expect<Equal<Parameters<FunctionTag<{ text: string }>>, [props: { text: string }]>>;
type _04c = Expect<
  Equal<
    {
      stringReturningTagFits: GivenExtends<typeof GivenTextTag, FunctionTag<{ text: string }>>;
      divIsNotATag: IsValidTag<"div">;
    },
    { stringReturningTagFits: true; divIsNotATag: false }
  >
>;
type _04d = Expect<Equal<GivenExtends<(props: { text: string }) => undefined, FunctionTag<{ text: string }>>, false>>;

// 5. Build the instance contract a class tag has to satisfy.
export type ElementClass = TODO; // TODO(koan)

type _05a = Expect<Equal<keyof ElementClass, "render">>;
type _05b = Expect<
  Equal<
    {
      renderResult: ReturnType<ElementClass["render"]>;
      divIsNotATag: IsValidTag<"div">;
    },
    { renderResult: RenderOutput; divIsNotATag: false }
  >
>;
type _05c = Expect<
  Equal<
    {
      classSatisfiesTheContract: GivenExtends<GivenBadgeTag, ElementClass>;
      divIsNotATag: IsValidTag<"div">;
    },
    { classSatisfiesTheContract: true; divIsNotATag: false }
  >
>;
type _05d = Expect<Equal<GivenExtends<{ draw(): KoanElement }, ElementClass>, false>>;

// 6. Build the class-tag shape.
export type ClassTag<Props = any> = TODO; // TODO(koan)

type _06a = Expect<Equal<ConstructorParameters<ClassTag<{ tone: "info" }>>, [props: { tone: "info" }]>>;
type _06b = Expect<
  Equal<
    {
      instance: InstanceType<ClassTag>;
      divIsNotATag: IsValidTag<"div">;
    },
    { instance: ElementClass; divIsNotATag: false }
  >
>;
type _06c = Expect<
  Equal<
    {
      badgeIsAClassTag: GivenExtends<typeof GivenBadgeTag, ClassTag<{ tone: "info" | "warning" }>>;
      divIsNotATag: IsValidTag<"div">;
    },
    { badgeIsAClassTag: true; divIsNotATag: false }
  >
>;
type _06d = Expect<Equal<GivenExtends<typeof GivenTextTag, ClassTag<{ text: string }>>, false>>;

// 7. Build the union 5.1 introduced: everything that may appear in tag
//    position, and nothing about what it returns.
export type ElementType = TODO; // TODO(koan)

type _07a = Expect<Equal<Extract<ElementType, string>, keyof IntrinsicElements>>;
type _07b = Expect<
  Equal<
    {
      hostTagIsLegal: GivenExtends<"button", ElementType>;
      divIsNotATag: IsValidTag<"div">;
    },
    { hostTagIsLegal: true; divIsNotATag: false }
  >
>;
type _07c = Expect<Equal<GivenExtends<"div", ElementType>, false>>;
type _07d = Expect<
  Equal<
    {
      functionTagIsLegal: GivenExtends<typeof GivenTextTag, ElementType>;
      divIsNotATag: IsValidTag<"div">;
    },
    { functionTagIsLegal: true; divIsNotATag: false }
  >
>;
type _07e = Expect<
  Equal<
    {
      classTagIsLegal: GivenExtends<typeof GivenBadgeTag, ElementType>;
      divIsNotATag: IsValidTag<"div">;
    },
    { classTagIsLegal: true; divIsNotATag: false }
  >
>;

// 8. Build the predicate that answers the first of the two decoupled questions.
export type IsValidTag<Tag> = TODO; // TODO(koan)

type _08a = Expect<Equal<IsValidTag<"button">, true>>;
type _08b = Expect<Equal<IsValidTag<"svg:path">, true>>;
type _08c = Expect<Equal<IsValidTag<typeof GivenTextTag>, true>>;
type _08d = Expect<Equal<IsValidTag<typeof GivenBadgeTag>, true>>;
type _08e = Expect<Equal<IsValidTag<"div">, false>>;

// ─── The two questions, answered separately ───────────────────────────

// 9. Build the props reader — what a tag accepts, whichever kind of tag it is.
export type PropsOf<Tag> = TODO; // TODO(koan)

type _09a = Expect<
  Equal<
    {
      props: PropsOf<"button">;
      divIsNotATag: IsValidTag<"div">;
    },
    { props: IntrinsicElements["button"]; divIsNotATag: false }
  >
>;
type _09b = Expect<Equal<PropsOf<typeof GivenTextTag>, { text: string }>>;
type _09c = Expect<Equal<PropsOf<typeof GivenAsyncIcon>, { name: string }>>;
type _09d = Expect<Equal<PropsOf<typeof GivenBadgeTag>, { tone: "info" | "warning" }>>;
type _09e = Expect<Equal<PropsOf<"div">, never>>;

// 10. Build the output reader — what a tag produces, answered without reference
//     to what it accepts. A host tag makes an element; a component makes
//     whatever it said it makes.
export type OutputOf<Tag> = TODO; // TODO(koan)

type _10a = Expect<
  Equal<
    {
      output: OutputOf<"button">;
      divIsNotATag: IsValidTag<"div">;
    },
    { output: KoanElement; divIsNotATag: false }
  >
>;
type _10b = Expect<Equal<OutputOf<typeof GivenTextTag>, string>>;
type _10c = Expect<Equal<OutputOf<typeof GivenAsyncIcon>, Promise<KoanElement>>>;
type _10d = Expect<
  Equal<
    {
      output: OutputOf<typeof GivenBadgeTag>;
      divIsNotATag: IsValidTag<"div">;
    },
    { output: KoanElement; divIsNotATag: false }
  >
>;
type _10e = Expect<Equal<OutputOf<"div">, never>>;

// ─── What the decoupling buys ─────────────────────────────────────────

// 11. Report the outputs side by side. None of them has to be an element, and
//     that is precisely what changed.
export type OutputProfile = TODO; // TODO(koan)

type _11a = Expect<
  Equal<
    {
      hostOutput: OutputProfile["hostTag"];
      divIsNotATag: IsValidTag<"div">;
    },
    { hostOutput: KoanElement; divIsNotATag: false }
  >
>;
type _11b = Expect<Equal<OutputProfile["stringComponent"], string>>;
type _11c = Expect<Equal<OutputProfile["asyncComponent"], Promise<KoanElement>>>;
type _11d = Expect<
  Equal<
    {
      classOutput: OutputProfile["classComponent"];
      divIsNotATag: IsValidTag<"div">;
    },
    { classOutput: KoanElement; divIsNotATag: false }
  >
>;
type _11e = Expect<Equal<OutputProfile["onlyTheHostTagMustBeAnElement"], false>>;

// 12. Report the asynchronous component in particular. It is a legal tag whose
//     output is a promise — the case the old coupling made impossible.
export type AsyncComponentProfile = TODO; // TODO(koan)

type _12a = Expect<Equal<AsyncComponentProfile["isAValidTag"], true>>;
type _12b = Expect<Equal<AsyncComponentProfile["output"], Promise<KoanElement>>>;
type _12c = Expect<
  Equal<
    {
      awaited: AsyncComponentProfile["awaitedOutput"];
      divIsNotATag: IsValidTag<"div">;
    },
    { awaited: KoanElement; divIsNotATag: false }
  >
>;
type _12d = Expect<Equal<AsyncComponentProfile["outputIsNotAnElement"], false>>;
type _12e = Expect<Equal<AsyncComponentProfile["butItsAwaitedValueIs"], true>>;

// ─── Namespaced attributes ────────────────────────────────────────────

// 13. Report the namespaced names. A colon in a key is a character, not a
//     construct — every ordinary key operation works on it unchanged.
export type NamespacedProfile = TODO; // TODO(koan)

type _13a = Expect<Equal<NamespacedProfile["namespacedTagIsAKey"], true>>;
type _13b = Expect<Equal<NamespacedProfile["namespacedAttributeKeys"], "d" | "stroke:width">>;
type _13c = Expect<Equal<NamespacedProfile["namespacedAttributeValue"], number | undefined>>;
type _13d = Expect<Equal<NamespacedProfile["optionalNamespacedAttribute"], string | undefined>>;
type _13e = Expect<Equal<NamespacedProfile["plainKeysAreUnaffected"], string>>;

// 14. Build the operator that splits a namespaced name into its two halves,
//     since the namespace is only recoverable by looking at the string.
export type SplitNamespace<Name extends string> = TODO; // TODO(koan)

type _14a = Expect<Equal<SplitNamespace<"svg:path">, { namespace: "svg"; local: "path" }>>;
type _14b = Expect<Equal<SplitNamespace<"button">, { namespace: never; local: "button" }>>;
type _14c = Expect<Equal<SplitNamespace<"stroke:width">["namespace"], "stroke">>;
type _14d = Expect<Equal<SplitNamespace<"aria:label">["local"], "label">>;
type _14e = Expect<Equal<SplitNamespace<"math:sum">["namespace"], "math">>;

// 15. Build the filter that collects the namespaced keys of a props table — the
//     question "which of these attributes belong to a namespace?".
export type NamespacedKeys<Props> = TODO; // TODO(koan)

type _15a = Expect<Equal<NamespacedKeys<IntrinsicElements["svg:path"]>, "stroke:width">>;
type _15b = Expect<Equal<NamespacedKeys<IntrinsicElements["button"]>, "aria:label">>;
type _15c = Expect<Equal<NamespacedKeys<IntrinsicElements["math:sum"]>, never>>;
type _15d = Expect<Equal<NamespacedKeys<Record<never, never>>, never>>;

// ─── Using the two answers together ───────────────────────────────────

// 16. Build the render signature. It is generic in the tag, so the props it
//     demands and the output it promises are both derived from that one
//     parameter — separately.
export type RenderTag = TODO; // TODO(koan)

type _16a = Expect<Equal<Parameters<RenderTag>["length"], 2>>;
type _16b = Expect<
  Equal<
    {
      arguments: Parameters<typeof renderButton>;
      divIsNotATag: IsValidTag<"div">;
    },
    { arguments: [tag: "button", props: IntrinsicElements["button"]]; divIsNotATag: false }
  >
>;
type _16c = Expect<
  Equal<
    {
      output: ReturnType<typeof renderButton>;
      divIsNotATag: IsValidTag<"div">;
    },
    { output: KoanElement; divIsNotATag: false }
  >
>;
type _16d = Expect<Equal<Parameters<typeof renderText>[1], { text: string }>>;
type _16e = Expect<Equal<ReturnType<typeof renderText>, string>>;

declare const renderButton: (tag: "button", props: PropsOf<"button">) => OutputOf<"button">;
declare const renderText: (
  tag: typeof GivenTextTag,
  props: PropsOf<typeof GivenTextTag>,
) => OutputOf<typeof GivenTextTag>;

// 17. Build the gate that admits a tag only when it is legal *and* produces
//     something a particular host is willing to accept — the two questions
//     recombined deliberately rather than by accident.
export type TagProducing<Tag, Accepted> = TODO; // TODO(koan)

type _17a = Expect<Equal<TagProducing<"button", KoanElement>, "button">>;
type _17b = Expect<Equal<TagProducing<typeof GivenTextTag, KoanElement>, never>>;
type _17c = Expect<Equal<TagProducing<typeof GivenTextTag, RenderOutput>, typeof GivenTextTag>>;
type _17d = Expect<Equal<TagProducing<"div", RenderOutput>, never>>;
type _17e = Expect<Equal<TagProducing<typeof GivenBadgeTag, KoanElement>, typeof GivenBadgeTag>>;

// 18. Report one tag at a glance: whether it may be used, what it takes, what it
//     gives back, and which of its attributes are namespaced.
export type TagReport<Tag> = TODO; // TODO(koan)

type _18a = Expect<Equal<TagReport<"svg:path">["valid"], true>>;
type _18b = Expect<
  Equal<
    {
      props: TagReport<"svg:path">["props"];
      divIsNotATag: IsValidTag<"div">;
    },
    { props: IntrinsicElements["svg:path"]; divIsNotATag: false }
  >
>;
type _18c = Expect<
  Equal<
    {
      output: TagReport<"svg:path">["output"];
      divIsNotATag: IsValidTag<"div">;
    },
    { output: KoanElement; divIsNotATag: false }
  >
>;
type _18d = Expect<Equal<TagReport<"svg:path">["namespacedAttributes"], "stroke:width">>;
type _18e = Expect<Equal<TagReport<typeof GivenTextTag>["output"], string>>;
