import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-218: DOM iterable consolidation — constructions
 * =============================================================================
 *
 * `dom.iterable` and `dom.asynciterable` existed because iteration arrived at the
 * DOM later than the DOM did. TypeScript 6.0 folds them into `dom`, so selecting
 * one library gets you `for (const node of nodeList)` and the entry iteration on
 * form data — and the two old names stay accepted as empty shims so no config
 * breaks.
 *
 * The thing to keep straight is what a `lib` entry is. It selects declarations,
 * not capabilities: adding `dom` to a server project makes the errors go away and
 * makes nothing work, and a browser project still needs the runtime to have the
 * API however visible its type is. Build the collection shapes, the selection
 * rule, and the boundary between the two.
 * Replace each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

// ─── The library names ────────────────────────────────────────────────

// 1. Build the three names involved.
export type DomLibName = TODO; // TODO(koan)

type _01a = Expect<Equal<DomLibName, "dom" | "dom.iterable" | "dom.asynciterable">>;
type _01b = Expect<Equal<Extract<DomLibName, `dom.${string}`>, "dom.iterable" | "dom.asynciterable">>;
type _01c = Expect<Equal<Exclude<DomLibName, `dom.${string}`>, "dom">>;
type _01d = Expect<Equal<Extract<DomLibName, "webworker">, never>>;

// 2. Build what each name contributes in 6.0. Two of them are now empty.
export type ContributionOf<Name extends DomLibName> = TODO; // TODO(koan)

type _02a = Expect<Equal<ContributionOf<"dom">, "declarations">>;
type _02b = Expect<Equal<ContributionOf<"dom.iterable">, "empty-shim">>;
type _02c = Expect<Equal<ContributionOf<"dom.asynciterable">, "empty-shim">>;
type _02d = Expect<Equal<ContributionOf<DomLibName>, "declarations" | "empty-shim">>;

// 3. Build the selection a project writes down.
export type SelectedLibs<Libs extends readonly DomLibName[]> = TODO; // TODO(koan)

type _03a = Expect<Equal<SelectedLibs<["dom"]>, "dom">>;
type _03b = Expect<Equal<SelectedLibs<["dom", "dom.iterable"]>, "dom" | "dom.iterable">>;
type _03c = Expect<Equal<SelectedLibs<[]>, never>>;
type _03d = Expect<Equal<Extract<SelectedLibs<["dom.iterable"]>, "dom">, never>>;

// 4. Build the rule that changed: iteration is visible as soon as `dom` is
//    selected, whatever else is listed.
export type IterationVisible<Libs extends readonly DomLibName[]> = TODO; // TODO(koan)

type _04a = Expect<Equal<IterationVisible<["dom"]>, true>>;
type _04b = Expect<Equal<IterationVisible<["dom", "dom.iterable"]>, true>>;
type _04c = Expect<Equal<IterationVisible<["dom.iterable"]>, false>>;
type _04d = Expect<Equal<IterationVisible<[]>, false>>;

// 5. Build the old rule, where the granular name was the one that carried it.
export type IterationVisibleBefore6<Libs extends readonly DomLibName[]> = TODO; // TODO(koan)

type _05a = Expect<Equal<IterationVisibleBefore6<["dom", "dom.iterable"]>, true>>;
type _05b = Expect<Equal<IterationVisibleBefore6<["dom"]>, false>>;
type _05c = Expect<Equal<IterationVisibleBefore6<["dom.iterable"]>, true>>;
type _05d = Expect<Equal<IterationVisibleBefore6<[]>, false>>;

// 6. Build the configurations the change actually affects.
export type ChangedIn6<Libs extends readonly DomLibName[]> = TODO; // TODO(koan)

type _06a = Expect<Equal<ChangedIn6<["dom"]>, true>>;
type _06b = Expect<Equal<ChangedIn6<["dom", "dom.iterable"]>, false>>;
type _06c = Expect<Equal<ChangedIn6<[]>, false>>;
type _06d = Expect<Equal<ChangedIn6<["dom.iterable"]>, true>>;

// ─── The collections themselves ───────────────────────────────────────

// 7. Build an indexed DOM collection: a length, an item lookup that admits
//    absence, and — now — an iterator.
export type IndexedCollection<Element> = TODO; // TODO(koan)

type _07a = Expect<Equal<IndexedCollection<string>["length"], number>>;
type _07b = Expect<Equal<ReturnType<IndexedCollection<string>["item"]>, string | null>>;
type _07c = Expect<
  Equal<ReturnType<IndexedCollection<string>[typeof Symbol.iterator]>, ArrayIterator<string>>
>;
type _07d = Expect<
  Equal<keyof IndexedCollection<string>, "length" | "item" | typeof Symbol.iterator>
>;

// 8. Build the reader for what such a collection yields.
export type ElementOf<Collection> = TODO; // TODO(koan)

type _08a = Expect<Equal<ElementOf<IndexedCollection<string>>, string>>;
type _08b = Expect<Equal<ElementOf<string[]>, string>>;
type _08c = Expect<Equal<ElementOf<{ length: number }>, never>>;
type _08d = Expect<Equal<ElementOf<IndexedCollection<{ tag: "div" }>>, { tag: "div" }>>;

// 9. Build an entry collection — the form-data shape, whose iteration yields
//    pairs rather than elements.
export type EntryCollection<Key, Value> = TODO; // TODO(koan)

type _09a = Expect<Equal<ElementOf<EntryCollection<string, string>>, [string, string]>>;
type _09b = Expect<Equal<ReturnType<EntryCollection<string, number>["get"]>, number | null>>;
type _09c = Expect<Equal<ElementOf<EntryCollection<string, number>>[0], string>>;
type _09d = Expect<Equal<ElementOf<EntryCollection<string, number>>[1], number>>;

// 10. Build the shape `for await` needs, which is the other lib that got folded
//     in — a different well-known symbol entirely.
export type AsyncCollection<Element> = TODO; // TODO(koan)

type _10a = Expect<Equal<keyof AsyncCollection<string>, typeof Symbol.asyncIterator>>;
type _10b = Expect<
  Equal<
    Awaited<ReturnType<ReturnType<AsyncCollection<string>[typeof Symbol.asyncIterator]>["next"]>>,
    IteratorResult<string, undefined>
  >
>;
type _10c = Expect<Equal<ElementOf<AsyncCollection<string>>, never>>;
type _10d = Expect<
  Equal<
    {
      theSyncSymbolIsNotTheAsyncOne: Equal<typeof Symbol.iterator, typeof Symbol.asyncIterator>;
      andTheAsyncShapeIsKeyedByTheAsyncOne: keyof AsyncCollection<string>;
    },
    {
      theSyncSymbolIsNotTheAsyncOne: false;
      andTheAsyncShapeIsKeyedByTheAsyncOne: typeof Symbol.asyncIterator;
    }
  >
>;

// 11. Build what a `for-of` over each shape binds, so the difference between an
//     indexed collection and an entry collection is on the page.
export type ForOfBinding<Collection> = TODO; // TODO(koan)

type _11a = Expect<Equal<ForOfBinding<IndexedCollection<string>>, string>>;
type _11b = Expect<Equal<ForOfBinding<EntryCollection<string, number>>, [string, number]>>;
type _11c = Expect<Equal<ForOfBinding<AsyncCollection<string>>, never>>;
type _11d = Expect<Equal<ForOfBinding<readonly number[]>, number>>;

// ─── Declarations are not capabilities ────────────────────────────────

// 12. Build the claims adding a lib entry might be read as making.
export type Claim = TODO; // TODO(koan)

type _12a = Expect<
  Equal<
    Claim,
    "theTypesResolve" | "theIterationIsTypeVisible" | "theGlobalsExistAtRuntime" | "theHostImplementsTheMethod"
  >
>;
type _12b = Expect<
  Equal<Extract<Claim, `the${"G" | "H"}${string}`>, "theGlobalsExistAtRuntime" | "theHostImplementsTheMethod">
>;
type _12c = Expect<Equal<Extract<Claim, "theTypesResolve">, "theTypesResolve">>;
type _12d = Expect<Equal<Extract<Claim, "theCodeIsCorrect">, never>>;

// 13. Build which of them a lib selection settles.
export type SettledByLib<TheClaim extends Claim> = TODO; // TODO(koan)

type _13a = Expect<Equal<SettledByLib<"theTypesResolve">, true>>;
type _13b = Expect<Equal<SettledByLib<"theIterationIsTypeVisible">, true>>;
type _13c = Expect<Equal<SettledByLib<"theGlobalsExistAtRuntime">, false>>;
type _13d = Expect<Equal<SettledByLib<"theHostImplementsTheMethod">, false>>;
type _13e = Expect<Equal<SettledByLib<Claim>, boolean>>;

// 14. Build the advice for a project that has an error mentioning a DOM type:
//     whether adding the lib is the fix depends on where the code runs.
export type AdviceFor<Environment extends "browser" | "server"> = TODO; // TODO(koan)

type _14a = Expect<Equal<AdviceFor<"browser">, "select dom">>;
type _14b = Expect<Equal<AdviceFor<"server">, "do not select dom to silence the error">>;
type _14c = Expect<
  Equal<AdviceFor<"browser" | "server">, "select dom" | "do not select dom to silence the error">
>;
type _14d = Expect<Equal<Equal<AdviceFor<"browser">, AdviceFor<"server">>, false>>;

// 15. Build what a shim name still buys a project that lists it: nothing, and
//     nothing broken either.
export type ShimEffect<Name extends DomLibName> = TODO; // TODO(koan)

type _15a = Expect<Equal<ShimEffect<"dom.iterable">, "no declarations, no error">>;
type _15b = Expect<Equal<ShimEffect<"dom.asynciterable">, "no declarations, no error">>;
type _15c = Expect<Equal<ShimEffect<"dom">, "the declarations">>;
type _15d = Expect<Equal<Equal<ShimEffect<"dom">, ShimEffect<"dom.iterable">>, false>>;

// ─── Reading it back ──────────────────────────────────────────────────

// 16. Report the configuration that the consolidation actually helps: `dom`
//     alone, which used to be missing iteration.
export type ConfigurationProfile = TODO; // TODO(koan)

type _16a = Expect<Equal<ConfigurationProfile["visibleNow"], true>>;
type _16b = Expect<Equal<ConfigurationProfile["visibleBefore"], false>>;
type _16c = Expect<Equal<ConfigurationProfile["changed"], true>>;
type _16d = Expect<Equal<ConfigurationProfile["andListingBothIsUnchanged"], false>>;
type _16e = Expect<Equal<ConfigurationProfile["becauseTheOldNameIsEmpty"], "empty-shim">>;

// 17. Report what the newly visible iteration binds for each collection shape.
export type IterationProfile = TODO; // TODO(koan)

type _17a = Expect<Equal<IterationProfile["overAnIndexedCollection"], { tag: "div" }>>;
type _17b = Expect<Equal<IterationProfile["overAnEntryCollection"], [string, string]>>;
type _17c = Expect<
  Equal<IterationProfile["theIndexedLookupStillAdmitsAbsence"], { tag: "div" } | null>
>;
type _17d = Expect<Equal<IterationProfile["andASyncForOfCannotWalkTheAsyncShape"], never>>;

// 18. Report one project at a glance: whether iteration is visible, whether that
//     is new, and what the selection still does not give it.
export type DomLibReport<
  Libs extends readonly DomLibName[],
  Environment extends "browser" | "server",
> = TODO; // TODO(koan)

type _18a = Expect<Equal<DomLibReport<["dom"], "browser">["iterationVisible"], true>>;
type _18b = Expect<Equal<DomLibReport<["dom"], "browser">["newInThisRelease"], true>>;
type _18c = Expect<Equal<DomLibReport<["dom"], "browser">["advice"], "select dom">>;
type _18d = Expect<
  Equal<DomLibReport<[], "server">["advice"], "do not select dom to silence the error">
>;
type _18e = Expect<Equal<DomLibReport<["dom"], "browser">["runtimeGuaranteed"], false>>;
