import type { Equal, Expect, TODO } from "../../utils/type-utils.js";

/**
 * K-184: Object.groupBy and Map.groupBy — constructions
 * =============================================================================
 *
 * Both ES2024 grouping functions walk an iterable and drop each element into a
 * bucket named by a callback; TypeScript 5.4 shipped their declarations. The two
 * differ in what a key may be and in how absence is spelled. `Object.groupBy`
 * demands a `PropertyKey` and returns `Partial<Record<Key, Element[]>>` — every
 * bucket optional, because the callback *could* produce a key that this input
 * never did. `Map.groupBy` takes any key at all, keeps identity semantics, and
 * reports absence the way every Map does: `get` returns `Element[] | undefined`.
 *
 * The subtlety worth watching is what grouping does *not* do. Selecting a bucket
 * by `task.status === "done"` does not make that bucket's elements the "done"
 * subtype: the declaration preserves the element type and the key type, never a
 * correlation between them. Build both result shapes and the readers that take
 * them apart. Replace each `TODO` with a type satisfying the assertions below.
 */

type GivenExtends<From, To> = [From] extends [To] ? true : false;

type TaskStatus = "todo" | "doing" | "done";

interface Task {
  id: number;
  status: TaskStatus;
  title: string;
}

interface Owner {
  name: string;
}

type Pair = readonly [Owner, Task];

// ─── The two result shapes ────────────────────────────────────────────

// 1. Build the key domain `Object.groupBy` insists on.
export type GroupKey = TODO; // TODO(koan)

type _01a = Expect<Equal<GroupKey, string | number | symbol>>;
type _01b = Expect<Equal<Exclude<GroupKey, string | number>, symbol>>;
type _01c = Expect<Equal<Extract<GroupKey, boolean>, never>>;
type _01d = Expect<
  Equal<
    {
      literalsOfEveryKeyKindFit: GivenExtends<1 | "a" | symbol, GroupKey>;
      butAnObjectDoesNot: GivenExtends<object, GroupKey>;
    },
    { literalsOfEveryKeyKindFit: true; butAnObjectDoesNot: false }
  >
>;

// 2. Build the object result: one optional bucket per key the callback may
//    return. The optionality is the declaration's way of saying "this run may
//    have produced nothing for that key".
export type ObjectGroups<Key extends PropertyKey, Element> = TODO; // TODO(koan)

type _02a = Expect<Equal<ObjectGroups<TaskStatus, Task>["todo"], Task[] | undefined>>;
type _02b = Expect<Equal<keyof ObjectGroups<TaskStatus, Task>, TaskStatus>>;
type _02c = Expect<Equal<Required<ObjectGroups<TaskStatus, Task>>["done"], Task[]>>;
type _02d = Expect<Equal<ObjectGroups<"even" | "odd", number>["even"], number[] | undefined>>;

// 3. Build the reader that takes a bucket out of a result, absence removed.
export type BucketOf<Groups, Key extends keyof Groups> = TODO; // TODO(koan)

type _03a = Expect<Equal<BucketOf<ObjectGroups<TaskStatus, Task>, "todo">, Task[]>>;
type _03b = Expect<Equal<BucketOf<ObjectGroups<"even" | "odd", number>, "even">, number[]>>;
type _03c = Expect<Equal<BucketOf<{ a?: Task[] }, "a">, Task[]>>;
type _03d = Expect<Equal<BucketOf<{ a: Task[] | undefined }, "a">, Task[]>>;

// 4. Build the reader that opens a bucket and reports what is inside it.
export type ElementOf<Bucket> = TODO; // TODO(koan)

type _04a = Expect<Equal<ElementOf<Task[]>, Task>>;
type _04b = Expect<Equal<ElementOf<readonly Pair[]>, Pair>>;
type _04c = Expect<Equal<ElementOf<Task[] | undefined>, Task>>;
type _04d = Expect<Equal<ElementOf<number>, never>>;

// 5. Build the map result. Nothing here is optional — a Map simply may not have
//    the entry, which `get` reports at the call.
export type MapGroups<Key, Element> = TODO; // TODO(koan)

type _05a = Expect<Equal<ReturnType<MapGroups<Owner, Pair>["get"]>, Pair[] | undefined>>;
type _05b = Expect<Equal<Parameters<MapGroups<Owner, Pair>["get"]>[0], Owner>>;
type _05c = Expect<Equal<Parameters<MapGroups<Owner, Pair>["set"]>, [Owner, Pair[]]>>;
type _05d = Expect<Equal<MapGroups<Owner, Pair>["size"], number>>;

// 6. Build the key domain each function accepts, as a function of which one you
//    are calling. A Map takes anything; that is the entire reason it exists here.
export type KeyDomain<Kind extends "object" | "map"> = TODO; // TODO(koan)

type _06a = Expect<Equal<KeyDomain<"object">, string | number | symbol>>;
type _06b = Expect<Equal<KeyDomain<"map">, unknown>>;
type _06c = Expect<Equal<KeyDomain<"object" | "map">, unknown>>;
type _06d = Expect<
  Equal<
    {
      anObjectKeyIsFineForAMap: GivenExtends<Owner, KeyDomain<"map">>;
      butNotForAnObject: GivenExtends<Owner, KeyDomain<"object">>;
    },
    { anObjectKeyIsFineForAMap: true; butNotForAnObject: false }
  >
>;

// ─── The call sites ───────────────────────────────────────────────────

// 7. Build the callback both functions take: element first, index second.
export type GroupCallback<Element, Key> = TODO; // TODO(koan)

type _07a = Expect<Equal<Parameters<GroupCallback<Task, TaskStatus>>[0], Task>>;
type _07b = Expect<Equal<Parameters<GroupCallback<Task, TaskStatus>>[1], number>>;
type _07c = Expect<Equal<Parameters<GroupCallback<Task, TaskStatus>>["length"], 2>>;
type _07d = Expect<Equal<ReturnType<GroupCallback<Task, TaskStatus>>, TaskStatus>>;

// 8. Build `Object.groupBy` at one instantiation.
export type ObjectGroupByOf<Element, Key extends PropertyKey> = TODO; // TODO(koan)

type _08a = Expect<Equal<Parameters<ObjectGroupByOf<Task, TaskStatus>>[0], Iterable<Task>>>;
type _08b = Expect<
  Equal<ReturnType<ObjectGroupByOf<Task, TaskStatus>>, Partial<Record<TaskStatus, Task[]>>>
>;
type _08c = Expect<Equal<Parameters<ObjectGroupByOf<Task, TaskStatus>>["length"], 2>>;
type _08d = Expect<Equal<ReturnType<Parameters<ObjectGroupByOf<Task, TaskStatus>>[1]>, TaskStatus>>;

// 9. Build `Map.groupBy` at one instantiation — same callback, different result.
export type MapGroupByOf<Element, Key> = TODO; // TODO(koan)

type _09a = Expect<Equal<Parameters<MapGroupByOf<Pair, Owner>>[0], Iterable<Pair>>>;
type _09b = Expect<Equal<ReturnType<MapGroupByOf<Pair, Owner>>, Map<Owner, Pair[]>>>;
type _09c = Expect<Equal<ReturnType<Parameters<MapGroupByOf<Pair, Owner>>[1]>, Owner>>;
type _09d = Expect<Equal<Parameters<MapGroupByOf<Pair, Owner>>["length"], 2>>;

// 10. Build the reader for the key type a callback commits to.
export type KeyOfCallback<Callback> = TODO; // TODO(koan)

type _10a = Expect<Equal<KeyOfCallback<GroupCallback<Task, TaskStatus>>, TaskStatus>>;
type _10b = Expect<Equal<KeyOfCallback<GroupCallback<Pair, Owner>>, Owner>>;
type _10c = Expect<Equal<Extract<KeyOfCallback<GroupCallback<Task, TaskStatus>>, "done">, "done">>;
type _10d = Expect<Equal<KeyOfCallback<string>, never>>;

// 11. Build the check that decides which function a key type is legal for.
export type LegalObjectKey<Key> = TODO; // TODO(koan)

type _11a = Expect<Equal<LegalObjectKey<TaskStatus>, true>>;
type _11b = Expect<Equal<LegalObjectKey<1 | "a" | symbol>, true>>;
type _11c = Expect<Equal<LegalObjectKey<Owner>, false>>;
type _11d = Expect<Equal<LegalObjectKey<unknown>, false>>;

// ─── What grouping does not tell you ──────────────────────────────────

// 12. Build the element type found in one named bucket of a status grouping.
export type BucketElement<Key extends TaskStatus> = TODO; // TODO(koan)

type _12a = Expect<Equal<BucketElement<"done">, Task>>;
type _12b = Expect<Equal<BucketElement<TaskStatus>, Task>>;
type _12c = Expect<
  Equal<
    {
      theBucketIsNotRefinedByItsKey: GivenExtends<BucketElement<"done">, Task & { status: "done" }>;
      thoughARefinedTaskWouldFitInIt: GivenExtends<Task & { status: "done" }, BucketElement<"done">>;
    },
    { theBucketIsNotRefinedByItsKey: false; thoughARefinedTaskWouldFitInIt: true }
  >
>;
type _12d = Expect<Equal<Extract<BucketElement<"done">, { status: "done" }>, never>>;

// 13. Report how absence is spelled on each side, and how weak a constraint an
//     all-optional result is.
export type AbsenceProfile = TODO; // TODO(koan)

type _13a = Expect<Equal<AbsenceProfile["objectBucket"], Task[] | undefined>>;
type _13b = Expect<Equal<AbsenceProfile["mapBucket"], Pair[] | undefined>>;
type _13c = Expect<Equal<AbsenceProfile["absenceIsUndefinedOnBothSides"], undefined>>;
type _13d = Expect<Equal<AbsenceProfile["theEmptyObjectFitsTheResult"], true>>;
type _13e = Expect<Equal<AbsenceProfile["andSoDoesAFullRecord"], true>>;

// ─── Key kinds ────────────────────────────────────────────────────────

// 14. Report numeric keys. JavaScript turns them into property strings at
//     runtime; the type keeps them numeric, and `1` and `"1"` are two keys.
export type NumericKeyProfile = TODO; // TODO(koan)

type _14a = Expect<Equal<NumericKeyProfile["keys"], 1 | 2>>;
type _14b = Expect<Equal<NumericKeyProfile["bucketAtOne"], Task[] | undefined>>;
type _14c = Expect<Equal<NumericKeyProfile["numericAndStringKeysAreDistinct"], false>>;
type _14d = Expect<Equal<NumericKeyProfile["requiringTheResultRemovesTheUndefined"], Task[]>>;

// 15. Report the degenerate grouping: no key type at all. Every bucket is
//     optional, so an empty key domain leaves a result that constrains nothing.
export type EmptyKeyProfile = TODO; // TODO(koan)

type _15a = Expect<Equal<EmptyKeyProfile["groups"], {}>>;
type _15b = Expect<Equal<EmptyKeyProfile["keys"], never>>;
type _15c = Expect<Equal<EmptyKeyProfile["whichIsTheEmptyObjectType"], true>>;
type _15d = Expect<Equal<EmptyKeyProfile["andThereforeAcceptsAnything"], true>>;

// 16. Report the opposite extreme: a callback typed to return `string`. The
//     result becomes an index signature, and `noUncheckedIndexedAccess` keeps
//     `undefined` on every read of it — even after `Required`.
export type WideKeyProfile = TODO; // TODO(koan)

type _16a = Expect<Equal<WideKeyProfile["keys"], string>>;
type _16b = Expect<Equal<WideKeyProfile["anyNameIsABucket"], Task[] | undefined>>;
type _16c = Expect<Equal<WideKeyProfile["requiredDoesNotRemoveTheUndefined"], Task[] | undefined>>;
type _16d = Expect<Equal<WideKeyProfile["becauseTheKeyIsNoLongerAFiniteSet"], false>>;

// 17. Report the Map side: object keys are legal, identity decides membership,
//     and absence lives in the return type of `get` rather than in the shape.
export type MapIdentityProfile = TODO; // TODO(koan)

type _17a = Expect<Equal<MapIdentityProfile["keyParameter"], Owner>>;
type _17b = Expect<Equal<MapIdentityProfile["objectKeysAreIllegalForTheObjectForm"], false>>;
type _17c = Expect<Equal<MapIdentityProfile["butFineForAMap"], true>>;
type _17d = Expect<Equal<MapIdentityProfile["absenceIsInTheLookup"], undefined>>;
type _17e = Expect<Equal<MapIdentityProfile["bucketsThemselvesAreNotOptional"], Pair>>;

// 18. Report one grouping at a glance: both result shapes, what a bucket holds,
//     and whether the object form was even available.
export type GroupingReport<Element, Key extends PropertyKey> = TODO; // TODO(koan)

type _18a = Expect<
  Equal<GroupingReport<Task, TaskStatus>["objectResult"], Partial<Record<TaskStatus, Task[]>>>
>;
type _18b = Expect<Equal<GroupingReport<Task, TaskStatus>["mapResult"], Map<TaskStatus, Task[]>>>;
type _18c = Expect<Equal<GroupingReport<Task, TaskStatus>["bucketElement"], Task>>;
type _18d = Expect<Equal<GroupingReport<Task, TaskStatus>["everyObjectBucketIsOptional"], true>>;
type _18e = Expect<Equal<GroupingReport<number, "even" | "odd">["bucketElement"], number>>;
