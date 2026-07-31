import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * KOAN 174 - JSX.ELEMENTTYPE AND NAMESPACED JSX NAMES
 * ====================================================
 *
 * JSX libraries define two different boundaries. `JSX.Element` describes the
 * value produced by a JSX expression. Since TypeScript 5.1, `JSX.ElementType`
 * independently describes which intrinsic names, function components, and class
 * components are legal in tag position. A library can therefore admit a
 * component that returns text or a promise without pretending every JSX
 * expression is itself text or a promise.
 *
 * TypeScript 5.1 also parses namespaced tag and attribute spelling. At the type
 * boundary, `svg:path` and `stroke:width` are exact string keys; the colon does
 * not create a nested object. A lowercase namespaced tag is looked up in the
 * intrinsic-element registry just like another intrinsic name.
 *
 * Read `ElementType` aloud as: "the union of values legal between angle
 * brackets", not "the type returned after rendering those values."
 *
 * Feature ownership: TypeScript 5.1 JSX tag checking and parser support,
 * configured by library-owned JSX namespace declarations.
 *
 * Official source:
 * - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-1.html#decoupled-type-checking-between-jsx-elements-and-jsx-tag-types
 * - https://www.typescriptlang.org/docs/handbook/release-notes/typescript-5-1.html#namespaced-jsx-attributes
 */

export type KoanElement = {
  readonly type: string;
  readonly props: Readonly<Record<string, unknown>>;
};

export type IntrinsicElements = {
  button: {
    label: string;
    disabled?: boolean;
    "aria:label"?: string;
  };
  "svg:path": {
    d: string;
    "stroke:width"?: number;
  };
  "math:sum": {
    values: readonly number[];
  };
};

export type RenderOutput =
  | KoanElement
  | string
  | number
  | null
  | Promise<KoanElement>;

export type FunctionTag<Props = any> =
  (props: Props) => RenderOutput;

export interface ElementClass {
  render(): RenderOutput;
}

export type ClassTag<Props = any> =
  new (props: Props) => ElementClass;

export type ElementType =
  | keyof IntrinsicElements
  | FunctionTag
  | ClassTag;

export type PropsOf<Tag> =
  Tag extends keyof IntrinsicElements
    ? IntrinsicElements[Tag]
    : Tag extends (props: infer Props) => RenderOutput
      ? Props
      : Tag extends new (props: infer Props) => ElementClass
        ? Props
        : never;

export type OutputOf<Tag> =
  Tag extends keyof IntrinsicElements
    ? KoanElement
    : Tag extends (props: any) => infer Output
      ? Output
      : Tag extends new (...args: any[]) => infer Instance
        ? Instance extends ElementClass
          ? ReturnType<Instance["render"]>
          : never
        : never;

export type IsValidTag<Tag> =
  [Tag] extends [ElementType] ? true : false;

export function TextTag(props: { text: string }): string {
  return props.text;
}

export async function AsyncIcon(
  props: { name: string },
): Promise<KoanElement> {
  return { type: "icon", props };
}

export class BadgeTag implements ElementClass {
  constructor(readonly props: { tone: "info" | "warning" }) {}

  render(): KoanElement {
    return { type: "badge", props: this.props };
  }
}

export function renderTag<Tag extends ElementType>(
  tag: Tag,
  props: PropsOf<Tag>,
): OutputOf<Tag> {
  if (typeof tag === "string") {
    return { type: tag, props } as OutputOf<Tag>;
  }

  const reflected = tag as Function & {
    prototype?: Partial<ElementClass>;
  };

  if (typeof reflected.prototype?.render === "function") {
    const Constructor = tag as ClassTag<PropsOf<Tag>>;
    return new Constructor(props).render() as OutputOf<Tag>;
  }

  const Component = tag as FunctionTag<PropsOf<Tag>>;
  return Component(props) as OutputOf<Tag>;
}

// Part 1: ElementType names every legal intrinsic and component tag.
type _01 = Expect<Equal<keyof IntrinsicElements, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<IsValidTag<"button">, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<IsValidTag<typeof TextTag>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<IsValidTag<typeof BadgeTag>, TODO>>; // TODO(koan) @koan-error

// Part 2: Produced output is independent from tag validity.
type _05 = Expect<Equal<OutputOf<"button">, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<OutputOf<typeof TextTag>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<OutputOf<typeof AsyncIcon>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<OutputOf<typeof BadgeTag>, TODO>>; // TODO(koan) @koan-error

// Part 3: Props are inferred from the selected tag family.
type _09 = Expect<Equal<PropsOf<"button">, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<PropsOf<typeof TextTag>, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<PropsOf<typeof AsyncIcon>, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<PropsOf<typeof BadgeTag>, TODO>>; // TODO(koan) @koan-error

// Part 4: Namespaced spellings are exact colon-containing keys.
type _13 = Expect<Equal<PropsOf<"svg:path">, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<keyof PropsOf<"svg:path">, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<PropsOf<"svg:path">["stroke:width"], TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<PropsOf<"math:sum">["values"], TODO>>; // TODO(koan) @koan-error

// Part 5: The renderer correlates each valid tag with its props and output.
type _17 = Expect<Equal<Parameters<typeof renderTag<"button">>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<ReturnType<typeof renderTag<"svg:path">>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<Parameters<typeof renderTag<typeof TextTag>>[1], TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<ReturnType<typeof renderTag<typeof AsyncIcon>>, TODO>>; // TODO(koan) @koan-error
