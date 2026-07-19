import {
  countLearnerHoles,
  discoverPackets,
  missingPacketFiles,
  parseSyllabus,
} from "./lib/koans.js";

const entries = await parseSyllabus();
const packets = await discoverPackets();
const packetsById = new Map(packets.map((packet) => [packet.id, packet]));
const showAll = process.argv.includes("--all");
const rows: Array<{ id: string; state: string; holes: number }> = [];

for (const entry of entries) {
  const packet = packetsById.get(entry.id);
  if (!packet) {
    rows.push({ id: entry.id, state: "planned", holes: 0 });
    continue;
  }

  const missing = await missingPacketFiles(packet);
  if (missing.length > 0) {
    rows.push({ id: entry.id, state: "incomplete", holes: 0 });
    continue;
  }

  const holes = await countLearnerHoles(packet);
  rows.push({ id: entry.id, state: holes === 0 ? "solved" : "unsolved", holes });
}

const totals = new Map<string, number>();
for (const row of rows) {
  totals.set(row.state, (totals.get(row.state) ?? 0) + 1);
}

console.log(`Curriculum progress: ${totals.get("solved") ?? 0}/${entries.length} solved`);
console.log(`Unsolved: ${totals.get("unsolved") ?? 0} | Incomplete: ${totals.get("incomplete") ?? 0} | Planned: ${totals.get("planned") ?? 0}`);

const visible = showAll
  ? rows
  : rows.filter((row) => row.state !== "planned").concat(rows.filter((row) => row.state === "planned").slice(0, 5));

for (const row of visible) {
  const holes = row.holes > 0 ? ` (${row.holes} holes)` : "";
  console.log(`${row.id}: ${row.state}${holes}`);
}

if (!showAll && visible.length < rows.length) {
  console.log("Use `pnpm progress -- --all` to list every planned lesson.");
}
