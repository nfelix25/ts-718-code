import type { Equal, Expect, TODO } from "../../utils/type-utils.js";
import {
  addTimestamp,
  identifiedView,
  lengthOf,
  namedAndActive,
  preserveIdentified,
  preserveKind,
} from "./k-008-generic-constraints.js";

/** K-008 drills: check the bound, then keep track of the chosen subtype. */

// Group 1: Many unrelated structures can satisfy the same minimum contract.
const d001 = lengthOf("typescript");
const d002 = lengthOf([1, 2, 3]);
const d003 = lengthOf(["a", "b"] as const);
const d004 = lengthOf({ length: 0 });
const d005 = lengthOf({ length: 2, 0: "a", 1: "b" });
const d006 = lengthOf(new Uint8Array(4));
const d007 = lengthOf({ length: 1 as const });
const d008 = lengthOf<{ length: number; label: string }>({ length: 3, label: "x" });
const d009 = lengthOf<readonly number[]>([1, 2]);
const d010 = lengthOf<readonly []>([]);
const d011 = lengthOf(function twoParameters(_a: unknown, _b: unknown) {});
const d012 = lengthOf({ length: Number.MAX_SAFE_INTEGER });
type _D001 = Expect<Equal<typeof d001, TODO>>; // TODO(koan) @koan-error
type _D002 = Expect<Equal<typeof d002, TODO>>; // TODO(koan) @koan-error
type _D003 = Expect<Equal<typeof d003, TODO>>; // TODO(koan) @koan-error
type _D004 = Expect<Equal<typeof d004, TODO>>; // TODO(koan) @koan-error
type _D005 = Expect<Equal<typeof d005, TODO>>; // TODO(koan) @koan-error
type _D006 = Expect<Equal<typeof d006, TODO>>; // TODO(koan) @koan-error
type _D007 = Expect<Equal<typeof d007, TODO>>; // TODO(koan) @koan-error
type _D008 = Expect<Equal<typeof d008, TODO>>; // TODO(koan) @koan-error
type _D009 = Expect<Equal<typeof d009, TODO>>; // TODO(koan) @koan-error
type _D010 = Expect<Equal<typeof d010, TODO>>; // TODO(koan) @koan-error
type _D011 = Expect<Equal<typeof d011, TODO>>; // TODO(koan) @koan-error
type _D012 = Expect<Equal<typeof d012, TODO>>; // TODO(koan) @koan-error

// Group 2: Returning T retains every property inferred beyond the constraint.
const d013 = preserveIdentified({ id: "a" });
const d014 = preserveIdentified({ id: "a", active: true });
const d015 = preserveIdentified({ id: "a", count: 1 });
const d016 = preserveIdentified({ id: "a", tags: ["ts"] });
const d017 = preserveIdentified({ id: "a", profile: { name: "Ada" } });
const d018 = preserveIdentified({ id: "a", active: true } as const);
const d019 = preserveIdentified({ readonlyId: 1, id: "a" } as const);
const identifiedVariable: { id: string; score: number } = { id: "a", score: 10 };
const d020 = preserveIdentified(identifiedVariable);
const d021 = preserveIdentified<{ id: string; role: "admin" }>({ id: "a", role: "admin" });
const d022 = preserveIdentified<{ readonly id: string }>({ id: "a" });
const d023 = preserveIdentified({ id: String("a"), enabled: false });
const d024 = preserveIdentified(Object.assign({ id: "a" }, { page: 1 }));
type _D013 = Expect<Equal<typeof d013, TODO>>; // TODO(koan) @koan-error
type _D014 = Expect<Equal<typeof d014, TODO>>; // TODO(koan) @koan-error
type _D015 = Expect<Equal<typeof d015, TODO>>; // TODO(koan) @koan-error
type _D016 = Expect<Equal<typeof d016, TODO>>; // TODO(koan) @koan-error
type _D017 = Expect<Equal<typeof d017, TODO>>; // TODO(koan) @koan-error
type _D018 = Expect<Equal<typeof d018, TODO>>; // TODO(koan) @koan-error
type _D019 = Expect<Equal<typeof d019, TODO>>; // TODO(koan) @koan-error
type _D020 = Expect<Equal<typeof d020, TODO>>; // TODO(koan) @koan-error
type _D021 = Expect<Equal<typeof d021, TODO>>; // TODO(koan) @koan-error
type _D022 = Expect<Equal<typeof d022, TODO>>; // TODO(koan) @koan-error
type _D023 = Expect<Equal<typeof d023, TODO>>; // TODO(koan) @koan-error
type _D024 = Expect<Equal<typeof d024, TODO>>; // TODO(koan) @koan-error

// Group 3: A return annotation can expose the bound instead of the chosen T.
const d025 = identifiedView({ id: "a" });
const d026 = identifiedView({ id: "a", active: true });
const d027 = identifiedView({ id: "a", count: 1 } as const);
const d028 = identifiedView(identifiedVariable);
const d029 = identifiedView<{ id: string; role: string }>({ id: "a", role: "admin" });
const d030 = preserveIdentified({ id: "a", active: true });
const d031 = d025.id;
const d032 = d026.id;
const d033 = d030.id;
const d034 = d030.active;
const d035: { id: string } = preserveIdentified({ id: "a", extra: 1 });
const d036 = preserveIdentified<{ id: "fixed" }>({ id: "fixed" });
type _D025 = Expect<Equal<typeof d025, TODO>>; // TODO(koan) @koan-error
type _D026 = Expect<Equal<typeof d026, TODO>>; // TODO(koan) @koan-error
type _D027 = Expect<Equal<typeof d027, TODO>>; // TODO(koan) @koan-error
type _D028 = Expect<Equal<typeof d028, TODO>>; // TODO(koan) @koan-error
type _D029 = Expect<Equal<typeof d029, TODO>>; // TODO(koan) @koan-error
type _D030 = Expect<Equal<typeof d030, TODO>>; // TODO(koan) @koan-error
type _D031 = Expect<Equal<typeof d031, TODO>>; // TODO(koan) @koan-error
type _D032 = Expect<Equal<typeof d032, TODO>>; // TODO(koan) @koan-error
type _D033 = Expect<Equal<typeof d033, TODO>>; // TODO(koan) @koan-error
type _D034 = Expect<Equal<typeof d034, TODO>>; // TODO(koan) @koan-error
type _D035 = Expect<Equal<typeof d035, TODO>>; // TODO(koan) @koan-error
type _D036 = Expect<Equal<typeof d036, TODO>>; // TODO(koan) @koan-error

// Group 4: A union bound admits a family and inference selects a member or subset.
const d037 = preserveKind("created");
const d038 = preserveKind("updated");
const kindVariable: "created" | "updated" = Math.random() ? "created" : "updated";
const d039 = preserveKind(kindVariable);
const d040 = preserveKind("created" as "created" | "updated");
const d041 = preserveKind<"created">("created");
const d042 = preserveKind<"updated">("updated");
const d043 = preserveKind<"created" | "updated">("created");
const d044 = preserveKind<"created" | "updated">("updated");
const d045: "created" | "updated" = preserveKind("created");
const d046 = [preserveKind("created"), preserveKind("updated")];
const d047 = [preserveKind("created"), preserveKind("updated")] as const;
const d048 = preserveKind(kindVariable === "created" ? "created" : "updated");
type _D037 = Expect<Equal<typeof d037, TODO>>; // TODO(koan) @koan-error
type _D038 = Expect<Equal<typeof d038, TODO>>; // TODO(koan) @koan-error
type _D039 = Expect<Equal<typeof d039, TODO>>; // TODO(koan) @koan-error
type _D040 = Expect<Equal<typeof d040, TODO>>; // TODO(koan) @koan-error
type _D041 = Expect<Equal<typeof d041, TODO>>; // TODO(koan) @koan-error
type _D042 = Expect<Equal<typeof d042, TODO>>; // TODO(koan) @koan-error
type _D043 = Expect<Equal<typeof d043, TODO>>; // TODO(koan) @koan-error
type _D044 = Expect<Equal<typeof d044, TODO>>; // TODO(koan) @koan-error
type _D045 = Expect<Equal<typeof d045, TODO>>; // TODO(koan) @koan-error
type _D046 = Expect<Equal<typeof d046, TODO>>; // TODO(koan) @koan-error
type _D047 = Expect<Equal<typeof d047, TODO>>; // TODO(koan) @koan-error
type _D048 = Expect<Equal<typeof d048, TODO>>; // TODO(koan) @koan-error

// Group 5: Object and intersection bounds combine with the inferred subtype.
const epoch = new Date(0);
const d049 = addTimestamp({}, epoch);
const d050 = addTimestamp({ id: "a" }, epoch);
const d051 = addTimestamp({ id: "a" } as const, epoch);
const d052 = addTimestamp([1, 2], epoch);
const d053 = addTimestamp([1, 2] as const, epoch);
const d054 = addTimestamp(() => 1, epoch);
const d055 = addTimestamp(new Map<string, number>(), epoch);
const d056 = namedAndActive({ name: "Ada", active: true });
const d057 = namedAndActive({ name: "Ada", active: false, role: "admin" });
const d058 = namedAndActive({ name: "Ada", active: true } as const);
const d059 = namedAndActive<{ name: string; active: boolean }>({ name: "Ada", active: true });
const d060 = namedAndActive({ active: true, name: "Ada", id: 1 });
type _D049 = Expect<Equal<typeof d049, TODO>>; // TODO(koan) @koan-error
type _D050 = Expect<Equal<typeof d050, TODO>>; // TODO(koan) @koan-error
type _D051 = Expect<Equal<typeof d051, TODO>>; // TODO(koan) @koan-error
type _D052 = Expect<Equal<typeof d052, TODO>>; // TODO(koan) @koan-error
type _D053 = Expect<Equal<typeof d053, TODO>>; // TODO(koan) @koan-error
type _D054 = Expect<Equal<typeof d054, TODO>>; // TODO(koan) @koan-error
type _D055 = Expect<Equal<typeof d055, TODO>>; // TODO(koan) @koan-error
type _D056 = Expect<Equal<typeof d056, TODO>>; // TODO(koan) @koan-error
type _D057 = Expect<Equal<typeof d057, TODO>>; // TODO(koan) @koan-error
type _D058 = Expect<Equal<typeof d058, TODO>>; // TODO(koan) @koan-error
type _D059 = Expect<Equal<typeof d059, TODO>>; // TODO(koan) @koan-error
type _D060 = Expect<Equal<typeof d060, TODO>>; // TODO(koan) @koan-error
