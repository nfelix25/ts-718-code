import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  firstValue,
  gather,
  inferFromConsumer,
  optionalValue,
  tapValue,
  unwrapBox,
  unwrapPayload,
} from "./k-006-parameter-site-inference.js";

/** K-006 edges: absent evidence, widened nested sites, and callback direction. */

type EdgeKind<T> = 0 extends 1 & T
  ? "any"
  : [T] extends [never]
    ? "never"
    : unknown extends T
      ? [keyof T] extends [never] ? "unknown" : "ordinary"
      : "ordinary";

// Group 1: An empty or omitted site may contribute no usable candidate.
const e001 = optionalValue();
const e002 = optionalValue<string>();
const e003 = gather();
const e004 = gather<number>();
const e005 = firstValue([]);
const e006 = firstValue([] as const);
const e007 = firstValue<string>([]);
const e008 = inferFromConsumer((value) => void value);
const edgeAny: any = 1;
const e009 = unwrapBox({ value: edgeAny });
const e010 = unwrapBox({ value: 1 as unknown });
type _E001 = Expect<Equal<EdgeKind<typeof e001>, TODO>>; // TODO(koan) @koan-error
type _E002 = Expect<Equal<typeof e002, TODO>>; // TODO(koan) @koan-error
type _E003 = Expect<Equal<typeof e003, TODO>>; // TODO(koan) @koan-error
type _E004 = Expect<Equal<typeof e004, TODO>>; // TODO(koan) @koan-error
type _E005 = Expect<Equal<typeof e005, TODO>>; // TODO(koan) @koan-error
type _E006 = Expect<Equal<typeof e006, TODO>>; // TODO(koan) @koan-error
type _E007 = Expect<Equal<typeof e007, TODO>>; // TODO(koan) @koan-error
type _E008 = Expect<Equal<Parameters<typeof e008>[0], TODO>>; // TODO(koan) @koan-error
type _E009 = Expect<Equal<EdgeKind<typeof e009>, TODO>>; // TODO(koan) @koan-error
type _E010 = Expect<Equal<EdgeKind<typeof e010>, TODO>>; // TODO(koan) @koan-error

// Demonstration A: an omitted optional argument leaves T uninferred, producing
// unknown after `T | undefined` is normalized.
type _SolvedOmitted = Expect<Equal<EdgeKind<typeof e001>, "unknown">>;
// Demonstration B: an unannotated callback-only site also has unknown input.
type _SolvedUnknownConsumer = Expect<
  Equal<Parameters<typeof e008>[0], unknown>
>;
// Demonstration C: an empty array infers never for its element, leaving only
// undefined in the first-element result.
type _SolvedEmpty = Expect<Equal<typeof e005, undefined>>;
// Demonstration D: any and unknown remain distinct candidates.
type _SolvedAny = Expect<Equal<EdgeKind<typeof e009>, "any">>;
type _SolvedUnknown = Expect<Equal<EdgeKind<typeof e010>, "unknown">>;

// Group 2: Nested sites see their property's inferred or annotated static type.
const edgeMutable = { value: { kind: "a" } };
const edgePreserved = { value: { kind: "a" } } as const;
const edgeAnnotated: { value: { kind: "a" | "b" } } = { value: { kind: "a" } };
const edgePayloadWithExtra = { payload: [1, 2], source: "x", extra: true };
const e011 = unwrapBox(edgeMutable);
const e012 = unwrapBox(edgePreserved);
const e013 = unwrapBox(edgeAnnotated);
const e014 = unwrapPayload(edgePayloadWithExtra);
const e015 = unwrapPayload({ payload: [1, 2], source: "x" } as const);
const e016 = firstValue([{ kind: "a" }, { kind: "b" }]);
const e017 = firstValue([{ kind: "a" }, { kind: "b" }] as const);
const e018 = gather(1 as const, 2 as const);
const e019 = gather("a" as const, "b" as const);
const e020 = optionalValue("a" as "a" | "b");
type _E011 = Expect<Equal<typeof e011, TODO>>; // TODO(koan) @koan-error
type _E012 = Expect<Equal<typeof e012, TODO>>; // TODO(koan) @koan-error
type _E013 = Expect<Equal<typeof e013, TODO>>; // TODO(koan) @koan-error
type _E014 = Expect<Equal<typeof e014, TODO>>; // TODO(koan) @koan-error
type _E015 = Expect<Equal<typeof e015, TODO>>; // TODO(koan) @koan-error
type _E016 = Expect<Equal<typeof e016, TODO>>; // TODO(koan) @koan-error
type _E017 = Expect<Equal<typeof e017, TODO>>; // TODO(koan) @koan-error
type _E018 = Expect<Equal<typeof e018, TODO>>; // TODO(koan) @koan-error
type _E019 = Expect<Equal<typeof e019, TODO>>; // TODO(koan) @koan-error
type _E020 = Expect<Equal<typeof e020, TODO>>; // TODO(koan) @koan-error

// Demonstration E: inference cannot restore the literal inside a mutable object.
type _SolvedMutableNested = Expect<Equal<typeof e011, { kind: string }>>;
// Demonstration F: direct const syntax supplies a readonly literal candidate.
type _SolvedPreservedNested = Expect<
  Equal<typeof e012, { readonly kind: "a" }>
>;
// Demonstration G: unrelated outer properties do not affect matching the payload.
type _SolvedExtraOuter = Expect<Equal<typeof e014, number[]>>;
// @ts-expect-error A fresh literal still receives an excess-property check first.
unwrapPayload({ payload: [1, 2], source: "x", extra: true });

// Group 3: Callback parameter sites are contravariant under strict checking.
const e021 = inferFromConsumer((value: string) => value.length);
const e022 = inferFromConsumer((value: string | number) => String(value));
const e023 = inferFromConsumer((value: unknown) => void value);
const e024 = tapValue("a", (value) => value.toUpperCase());
const e025 = tapValue(1, (value) => value.toFixed());
const e026 = tapValue({ id: "a" }, (value) => value.id);
const e027 = tapValue<string | number>("a", (value) => String(value));
const e028 = tapValue<"a" | "b">("a", (value) => value);
const e029 = inferFromConsumer<(value: string) => void>;
const e030 = tapValue<unknown>({ id: "a" }, () => undefined);
type _E021 = Expect<Equal<typeof e021, TODO>>; // TODO(koan) @koan-error
type _E022 = Expect<Equal<typeof e022, TODO>>; // TODO(koan) @koan-error
type _E023 = Expect<Equal<typeof e023, TODO>>; // TODO(koan) @koan-error
type _E024 = Expect<Equal<typeof e024, TODO>>; // TODO(koan) @koan-error
type _E025 = Expect<Equal<typeof e025, TODO>>; // TODO(koan) @koan-error
type _E026 = Expect<Equal<typeof e026, TODO>>; // TODO(koan) @koan-error
type _E027 = Expect<Equal<typeof e027, TODO>>; // TODO(koan) @koan-error
type _E028 = Expect<Equal<typeof e028, TODO>>; // TODO(koan) @koan-error
type _E029 = Expect<Equal<typeof e029, TODO>>; // TODO(koan) @koan-error
type _E030 = Expect<Equal<typeof e030, TODO>>; // TODO(koan) @koan-error

// Demonstration H: an explicit callback annotation supplies the consumer type.
type _SolvedStringConsumer = Expect<
  Equal<typeof e021, (value: string) => void>
>;
// Demonstration I: a value-site candidate contextually types the callback.
type _SolvedTappedNumber = Expect<Equal<typeof e025, number>>;
// Demonstration J: an explicit type argument fixes both the value and callback view.
type _SolvedExplicitUnion = Expect<Equal<typeof e027, string | number>>;

// @ts-expect-error A string-only callback cannot safely consume every number.
tapValue<number>(1, (value: string) => value.length);
// @ts-expect-error Explicit string rejects a number at the direct value site.
tapValue<string>(1, (value) => value.length);
