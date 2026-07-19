import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/** K-043 edges: presence checks, spreads, deletion, serialization, and explicit undefined reveal exact optional semantics. */

type EAbsent = { value?: string };
type EExplicit = { value: string | undefined };
type EBoth = { value?: string | undefined };

// Group 1: Missing and present-undefined objects differ despite identical reads.
const eMissing: EBoth = {};
const ePresent: EBoth = { value: undefined };
const eMissingRead = eMissing.value;
const ePresentRead = ePresent.value;
const eMissingIn = "value" in eMissing;
const ePresentIn = "value" in ePresent;
type _E001 = Expect<Equal<typeof eMissingRead, TODO>>; // TODO(koan) @koan-error
type _E002 = Expect<Equal<typeof ePresentRead, TODO>>; // TODO(koan) @koan-error
type _E003 = Expect<Equal<typeof eMissingIn, TODO>>; // TODO(koan) @koan-error
type _E004 = Expect<Equal<typeof ePresentIn, TODO>>; // TODO(koan) @koan-error
const eMissingKeys = Object.keys(eMissing);
const ePresentKeys = Object.keys(ePresent);
type _E005 = Expect<Equal<typeof eMissingKeys, TODO>>; // TODO(koan) @koan-error
type _E006 = Expect<Equal<typeof ePresentKeys, TODO>>; // TODO(koan) @koan-error
type _E007 = Expect<Equal<typeof eMissing, TODO>>; // TODO(koan) @koan-error
type _E008 = Expect<Equal<typeof ePresent, TODO>>; // TODO(koan) @koan-error

// Demonstration A: reads alone cannot distinguish absence from present undefined;
// `in`, Object.hasOwn, and enumeration observe the property slot itself.

// Group 2: Presence APIs have different control-flow declarations.
function edgePresence(value: EAbsent) {
  if ("value" in value) {
    type _E009 = Expect<Equal<typeof value.value, TODO>>; // TODO(koan) @koan-error
  } else {
    type _E010 = Expect<Equal<typeof value.value, TODO>>; // TODO(koan) @koan-error
  }
  if (Object.hasOwn(value, "value")) {
    type _E011 = Expect<Equal<typeof value.value, TODO>>; // TODO(koan) @koan-error
  }
  if (value.value !== undefined) {
    type _E012 = Expect<Equal<typeof value.value, TODO>>; // TODO(koan) @koan-error
  }
}
function edgeBoth(value: EBoth) {
  if ("value" in value) {
    type _E013 = Expect<Equal<typeof value.value, TODO>>; // TODO(koan) @koan-error
  }
  if (value.value === undefined) {
    type _E014 = Expect<Equal<typeof value.value, TODO>>; // TODO(koan) @koan-error
  }
}
type _E015 = Expect<Equal<Parameters<typeof Object.hasOwn>, TODO>>; // TODO(koan) @koan-error
type _E016 = Expect<Equal<ReturnType<typeof Object.hasOwn>, TODO>>; // TODO(koan) @koan-error
void edgePresence;
void edgeBoth;

// Demonstration B: Object.hasOwn returns boolean rather than a type predicate.
// A value comparison remains the direct way to narrow the property read.

// Group 3: Spread and defaults change what is known about resulting presence.
const eDefaults = { value: "default" };
function edgeSpread(update: EAbsent) {
  const merged = { ...eDefaults, ...update };
  type _E017 = Expect<Equal<typeof merged, TODO>>; // TODO(koan) @koan-error
  type _E018 = Expect<Equal<typeof merged.value, TODO>>; // TODO(koan) @koan-error
  const reverse = { ...update, ...eDefaults };
  type _E019 = Expect<Equal<typeof reverse, TODO>>; // TODO(koan) @koan-error
  type _E020 = Expect<Equal<typeof reverse.value, TODO>>; // TODO(koan) @koan-error
  const { value = "fallback" } = update;
  type _E021 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
}
const eSpreadMissing = { ...eMissing };
const eSpreadPresent = { ...ePresent };
type _E022 = Expect<Equal<typeof eSpreadMissing, TODO>>; // TODO(koan) @koan-error
type _E023 = Expect<Equal<typeof eSpreadPresent, TODO>>; // TODO(koan) @koan-error
type _E024 = Expect<Equal<typeof eDefaults, TODO>>; // TODO(koan) @koan-error
void edgeSpread;

// Demonstration C: spread order controls which source establishes requiredness.
// Runtime spreads copy only present own properties.

// Group 4: Deletion, JSON, and assignment restrictions expose runtime intent.
function edgeDelete(value: EAbsent, required: EExplicit) {
  delete value.value;
  type _E025 = Expect<Equal<typeof value, TODO>>; // TODO(koan) @koan-error
  required.value = undefined;
  type _E026 = Expect<Equal<typeof required.value, TODO>>; // TODO(koan) @koan-error
  const missingJson = JSON.stringify(value);
  const presentJson = JSON.stringify({ value: undefined });
  type _E027 = Expect<Equal<typeof missingJson, TODO>>; // TODO(koan) @koan-error
  type _E028 = Expect<Equal<typeof presentJson, TODO>>; // TODO(koan) @koan-error
}
type _E029 = Expect<Equal<Required<EBoth>, TODO>>; // TODO(koan) @koan-error
type _E030 = Expect<Equal<Partial<EExplicit>, TODO>>; // TODO(koan) @koan-error
void edgeDelete;

// @ts-expect-error Exact optional properties reject present undefined unless declared.
const invalidOptional: EAbsent = { value: undefined };
// @ts-expect-error Only optional properties may be deleted under strict checking.
function invalidDelete(value: EExplicit) { delete value.value; }
