import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  type ElementType,
  type IntrinsicElements,
  type IsValidTag,
  type KoanElement,
  type OutputOf,
  type PropsOf,
  type RenderOutput,
  AsyncIcon,
  TextTag,
} from "./k-174-jsx-elementtype-and-namespaced-attributes.js";

/** EDGE CASES: legacy element-result checking rejects broader components, colon names are atomic keys, broad strings are not intrinsic tags, union props can lose correlation, and any/unknown/never need classification. */

type Extends<From, To> = [From] extends [To] ? true : false;
type IsAny<Value> = 0 extends 1 & Value ? true : false;
type LegacyValid<Tag> =
  Tag extends (...args: any[]) => infer Output
    ? [Output] extends [KoanElement] ? true : false
    : Tag extends new (...args: any[]) => { render(): infer Output }
      ? [Output] extends [KoanElement] ? true : false
      : Tag extends keyof IntrinsicElements
        ? true
        : false;

// Pre-solved demonstrations contrast old result coupling with ElementType.
type _DemoLegacyText = Expect<Equal<LegacyValid<typeof TextTag>, false>>;
type _DemoCurrentText = Expect<Equal<IsValidTag<typeof TextTag>, true>>;
type _DemoLegacyAsync = Expect<Equal<LegacyValid<typeof AsyncIcon>, false>>;
type _DemoAtomicNamespace = Expect<Equal<"svg:path" extends keyof IntrinsicElements ? true : false, true>>;

// 1. Tag validity and produced values answer different questions (1-8)
type _01 = Expect<Equal<LegacyValid<typeof TextTag>, TODO>>; // TODO(koan) @koan-error
type _02 = Expect<Equal<IsValidTag<typeof TextTag>, TODO>>; // TODO(koan) @koan-error
type _03 = Expect<Equal<OutputOf<typeof TextTag>, TODO>>; // TODO(koan) @koan-error
type _04 = Expect<Equal<LegacyValid<typeof AsyncIcon>, TODO>>; // TODO(koan) @koan-error
type _05 = Expect<Equal<IsValidTag<typeof AsyncIcon>, TODO>>; // TODO(koan) @koan-error
type _06 = Expect<Equal<OutputOf<typeof AsyncIcon>, TODO>>; // TODO(koan) @koan-error
type _07 = Expect<Equal<Extends<OutputOf<typeof TextTag>, KoanElement>, TODO>>; // TODO(koan) @koan-error
type _08 = Expect<Equal<Extends<OutputOf<typeof TextTag>, RenderOutput>, TODO>>; // TODO(koan) @koan-error

// 2. Namespaced tags and attributes are atomic string keys (9-16)
type SvgProps = PropsOf<"svg:path">;
type _09 = Expect<Equal<"svg:path" extends keyof IntrinsicElements ? true : false, TODO>>; // TODO(koan) @koan-error
type _10 = Expect<Equal<"svg" extends keyof IntrinsicElements ? true : false, TODO>>; // TODO(koan) @koan-error
type _11 = Expect<Equal<"path" extends keyof IntrinsicElements ? true : false, TODO>>; // TODO(koan) @koan-error
type _12 = Expect<Equal<keyof SvgProps, TODO>>; // TODO(koan) @koan-error
type _13 = Expect<Equal<"stroke:width" extends keyof SvgProps ? true : false, TODO>>; // TODO(koan) @koan-error
type _14 = Expect<Equal<"stroke" extends keyof SvgProps ? true : false, TODO>>; // TODO(koan) @koan-error
type _15 = Expect<Equal<SvgProps["stroke:width"], TODO>>; // TODO(koan) @koan-error
type _16 = Expect<Equal<Required<SvgProps>["stroke:width"], TODO>>; // TODO(koan) @koan-error

// 3. Broad and union tags expose correlation limits (17-23)
type IntrinsicUnion = "button" | "svg:path";
type _17 = Expect<Equal<IsValidTag<string>, TODO>>; // TODO(koan) @koan-error
type _18 = Expect<Equal<IsValidTag<IntrinsicUnion>, TODO>>; // TODO(koan) @koan-error
type _19 = Expect<Equal<PropsOf<IntrinsicUnion>, TODO>>; // TODO(koan) @koan-error
type _20 = Expect<Equal<OutputOf<IntrinsicUnion>, TODO>>; // TODO(koan) @koan-error
type _21 = Expect<Equal<keyof PropsOf<IntrinsicUnion>, TODO>>; // TODO(koan) @koan-error
type _22 = Expect<Equal<PropsOf<"button" & "svg:path">, TODO>>; // TODO(koan) @koan-error
type _23 = Expect<Equal<IsValidTag<keyof IntrinsicElements>, TODO>>; // TODO(koan) @koan-error

// 4. Top/bottom/escape types and non-tag primitives stay sharp (24-30)
type _24 = Expect<Equal<IsValidTag<unknown>, TODO>>; // TODO(koan) @koan-error
type _25 = Expect<Equal<IsValidTag<never>, TODO>>; // TODO(koan) @koan-error
type _26 = Expect<Equal<IsAny<PropsOf<any>>, TODO>>; // TODO(koan) @koan-error
type _27 = Expect<Equal<OutputOf<unknown>, TODO>>; // TODO(koan) @koan-error
type _28 = Expect<Equal<IsValidTag<symbol>, TODO>>; // TODO(koan) @koan-error
type _29 = Expect<Equal<IsValidTag<number>, TODO>>; // TODO(koan) @koan-error
type _30 = Expect<Equal<Extends<ElementType, string | Function>, TODO>>; // TODO(koan) @koan-error
