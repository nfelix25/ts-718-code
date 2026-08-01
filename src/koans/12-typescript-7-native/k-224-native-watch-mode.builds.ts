import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-224: native watch mode — constructions
 * =============================================================================
 *
 * Watch mode is an invalidation problem wearing a file-events costume. The native
 * compiler ships a self-contained Go watcher precisely so the events are the same
 * shape on every operating system; polling everything was never an option once a
 * dependency tree got large enough to make the sweep cost more than the rebuild.
 *
 * What the events feed is the interesting part: a change invalidates the graph
 * state that depended on it, and in a project-referenced build a change to a
 * project's *public output* propagates to its dependents while a change to its
 * internals does not. Build the event kinds, the invalidation, and the
 * propagation rule that decides how far a rebuild travels.
 * Replace each `TODO` with a type satisfying the assertions directly below it.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

// ─── Where the events come from ───────────────────────────────────────

// 1. Build the strategies a watcher can use.
export type WatchStrategy = TODO; // TODO(koan)

type _01a = Expect<Equal<WatchStrategy, "os-events" | "polling" | "hybrid">>;
type _01b = Expect<Equal<Exclude<WatchStrategy, "polling">, "os-events" | "hybrid">>;
type _01c = Expect<Equal<Extract<WatchStrategy, `os-${string}`>, "os-events">>;
type _01d = Expect<Equal<Extract<WatchStrategy, "manual">, never>>;

// 2. Build how each strategy's cost scales with the size of the tree — the
//    reason pure polling was ruled out.
export type CostScalesWith<Strategy extends WatchStrategy> = TODO; // TODO(koan)

type _02a = Expect<Equal<CostScalesWith<"polling">, "the number of watched files">>;
type _02b = Expect<Equal<CostScalesWith<"os-events">, "the number of changes">>;
type _02c = Expect<Equal<CostScalesWith<"hybrid">, "the number of changes">>;
type _02d = Expect<
  Equal<Equal<CostScalesWith<"polling">, CostScalesWith<"os-events">>, false>
>;

// 3. Build the reason the watcher is part of the compiler rather than borrowed:
//    the event shape has to be the same everywhere.
export type EventShapeAcross<Source extends "bundled watcher" | "each platform"> = TODO; // TODO(koan)

type _03a = Expect<Equal<EventShapeAcross<"bundled watcher">, "consistent">>;
type _03b = Expect<Equal<EventShapeAcross<"each platform">, "platform-specific">>;
type _03c = Expect<
  Equal<EventShapeAcross<"bundled watcher" | "each platform">, "consistent" | "platform-specific">
>;
type _03d = Expect<
  Equal<Equal<EventShapeAcross<"bundled watcher">, EventShapeAcross<"each platform">>, false>
>;

// ─── What a change touches ────────────────────────────────────────────

// 4. Build the kinds of file a change can land on.
export type ChangedArtifact = TODO; // TODO(koan)

type _04a = Expect<
  Equal<ChangedArtifact, "source file" | "declaration output" | "config file" | "unrelated file">
>;
type _04b = Expect<Equal<Extract<ChangedArtifact, `${string}file`>, "source file" | "config file" | "unrelated file">>;
type _04c = Expect<Equal<Extract<ChangedArtifact, "declaration output">, "declaration output">>;
type _04d = Expect<Equal<Extract<ChangedArtifact, "lock file">, never>>;

// 5. Build what each change invalidates.
export type Invalidates<Artifact extends ChangedArtifact> = TODO; // TODO(koan)

type _05a = Expect<Equal<Invalidates<"source file">, "that file's checking">>;
type _05b = Expect<Equal<Invalidates<"declaration output">, "the dependents">>;
type _05c = Expect<Equal<Invalidates<"config file">, "the whole program">>;
type _05d = Expect<Equal<Invalidates<"unrelated file">, "nothing">>;
type _05e = Expect<
  Equal<
    Invalidates<ChangedArtifact>,
    "that file's checking" | "the dependents" | "the whole program" | "nothing"
  >
>;

// 6. Build whether a rebuild happens at all.
export type TriggersRebuild<Artifact extends ChangedArtifact> = TODO; // TODO(koan)

type _06a = Expect<Equal<TriggersRebuild<"source file">, true>>;
type _06b = Expect<Equal<TriggersRebuild<"config file">, true>>;
type _06c = Expect<Equal<TriggersRebuild<"unrelated file">, false>>;
type _06d = Expect<Equal<TriggersRebuild<ChangedArtifact>, boolean>>;

// ─── How far it travels ───────────────────────────────────────────────

// 7. Build the parts of a project a change can be in.
export type ProjectSurface = TODO; // TODO(koan)

type _07a = Expect<Equal<ProjectSurface, "public output" | "internals">>;
type _07b = Expect<Equal<Exclude<ProjectSurface, "internals">, "public output">>;
type _07c = Expect<Equal<Extract<ProjectSurface, "internals">, "internals">>;
type _07d = Expect<Equal<Extract<ProjectSurface, "tests">, never>>;

// 8. Build the propagation rule: only a change to what dependents can see
//    reaches them.
export type PropagatesToDependents<Surface extends ProjectSurface> = TODO; // TODO(koan)

type _08a = Expect<Equal<PropagatesToDependents<"public output">, true>>;
type _08b = Expect<Equal<PropagatesToDependents<"internals">, false>>;
type _08c = Expect<Equal<PropagatesToDependents<ProjectSurface>, boolean>>;
type _08d = Expect<
  Equal<Equal<PropagatesToDependents<"public output">, PropagatesToDependents<"internals">>, false>
>;

// 9. Build the set of projects a change reaches, given a dependency list.
export type Reached<
  Surface extends ProjectSurface,
  Changed extends string,
  Dependents extends readonly string[],
> = TODO; // TODO(koan)

type _09a = Expect<Equal<Reached<"public output", "core", ["app", "cli"]>, "core" | "app" | "cli">>;
type _09b = Expect<Equal<Reached<"internals", "core", ["app", "cli"]>, "core">>;
type _09c = Expect<Equal<Reached<"public output", "core", []>, "core">>;
type _09d = Expect<Equal<Reached<"internals", "core", []>, "core">>;

// 10. Build the count of projects rebuilt, which is what a watch session's cost
//     actually tracks.
export type RebuildCount<
  Surface extends ProjectSurface,
  Changed extends string,
  Dependents extends readonly string[],
> = TODO; // TODO(koan)

type _10a = Expect<Equal<RebuildCount<"public output", "core", ["app", "cli"]>, 3>>;
type _10b = Expect<Equal<RebuildCount<"internals", "core", ["app", "cli"]>, 1>>;
type _10c = Expect<Equal<RebuildCount<"public output", "core", []>, 1>>;
type _10d = Expect<Equal<RebuildCount<"public output", "core", ["app"]>, 2>>;

// ─── One cycle of the loop ────────────────────────────────────────────

// 11. Build the steps a watch cycle runs through.
export type CycleStep = TODO; // TODO(koan)

type _11a = Expect<Equal<CycleStep, "receive event" | "invalidate" | "recheck" | "emit">>;
type _11b = Expect<Equal<Extract<CycleStep, `re${string}`>, "receive event" | "recheck">>;
type _11c = Expect<Equal<Exclude<CycleStep, "receive event">, "invalidate" | "recheck" | "emit">>;
type _11d = Expect<Equal<Extract<CycleStep, "restart">, never>>;

// 12. Build the cycle a given change actually runs — an unrelated file stops
//     after the first step.
export type CycleFor<Artifact extends ChangedArtifact> = TODO; // TODO(koan)

type _12a = Expect<
  Equal<CycleFor<"source file">, ["receive event", "invalidate", "recheck", "emit"]>
>;
type _12b = Expect<Equal<CycleFor<"unrelated file">, ["receive event"]>>;
type _12c = Expect<Equal<CycleFor<"unrelated file">["length"], 1>>;
type _12d = Expect<Equal<CycleFor<"config file">["length"], 4>>;

// 13. Build the state that survives a cycle, since a watch session is worth
//     having only because it keeps something.
export type Retained = TODO; // TODO(koan)

type _13a = Expect<Equal<Retained, "parsed sources" | "unaffected checker state">>;
type _13b = Expect<Equal<Extract<Retained, `${string}state`>, "unaffected checker state">>;
type _13c = Expect<Equal<Exclude<Retained, "parsed sources">, "unaffected checker state">>;
type _13d = Expect<Equal<Extract<Retained, "diagnostics">, never>>;

// 14. Build what a config change does to that retained state: it takes it all.
export type RetainedAfter<Artifact extends ChangedArtifact> = TODO; // TODO(koan)

type _14a = Expect<Equal<RetainedAfter<"source file">, "parsed sources" | "unaffected checker state">>;
type _14b = Expect<Equal<RetainedAfter<"config file">, never>>;
type _14c = Expect<Equal<RetainedAfter<"unrelated file">, "parsed sources" | "unaffected checker state">>;
type _14d = Expect<Equal<Extract<RetainedAfter<"config file">, "parsed sources">, never>>;

// 15. Build what the native watcher improves, which is a resource claim rather
//     than a semantic one.
export type ImprovedProperty = TODO; // TODO(koan)

type _15a = Expect<Equal<ImprovedProperty, "startup cost" | "steady-state overhead" | "diagnostics">>;
type _15b = Expect<Equal<Extract<ImprovedProperty, `${string}cost` | `${string}overhead`>, "startup cost" | "steady-state overhead">>;
type _15c = Expect<Equal<Extract<ImprovedProperty, "diagnostics">, "diagnostics">>;
type _15d = Expect<Equal<Extract<ImprovedProperty, "correctness">, never>>;

// ─── Reading it back ──────────────────────────────────────────────────

// 16. Report what each kind of change invalidates.
export type InvalidationProfile = TODO; // TODO(koan)

type _16a = Expect<Equal<InvalidationProfile["source file"], "that file's checking">>;
type _16b = Expect<Equal<InvalidationProfile["declaration output"], "the dependents">>;
type _16c = Expect<Equal<InvalidationProfile["config file"], "the whole program">>;
type _16d = Expect<Equal<InvalidationProfile["unrelated file"], "nothing">>;
type _16e = Expect<Equal<keyof InvalidationProfile, ChangedArtifact>>;

// 17. Report the propagation pair: the same edit in two places, reaching two
//     very different distances.
export type PropagationProfile = TODO; // TODO(koan)

type _17a = Expect<Equal<PropagationProfile["publicChangeReaches"], "core" | "app" | "cli">>;
type _17b = Expect<Equal<PropagationProfile["internalChangeReaches"], "core">>;
type _17c = Expect<Equal<PropagationProfile["publicRebuildCount"], 3>>;
type _17d = Expect<Equal<PropagationProfile["internalRebuildCount"], 1>>;

// 18. Report one file event at a glance: whether anything happens, how far it
//     goes, what survives, and what the watcher's cost tracks.
export type WatchReport<
  Artifact extends ChangedArtifact,
  Surface extends ProjectSurface,
  Dependents extends readonly string[],
> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<WatchReport<"source file", "internals", ["app"]>["invalidates"], "that file's checking">
>;
type _18b = Expect<Equal<WatchReport<"unrelated file", "internals", ["app"]>["rebuilds"], false>>;
type _18c = Expect<
  Equal<WatchReport<"unrelated file", "internals", ["app"]>["cycle"], ["receive event"]>
>;
type _18d = Expect<
  Equal<WatchReport<"declaration output", "public output", ["app"]>["reached"], "core" | "app">
>;
type _18e = Expect<Equal<WatchReport<"config file", "internals", []>["retained"], never>>;
