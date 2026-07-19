import {
  discoverPackets,
  expectedPhase,
  missingPacketFiles,
  parseSyllabus,
} from "./lib/koans.js";

const entries = await parseSyllabus();
const packets = await discoverPackets();
const entriesById = new Map(entries.map((entry) => [entry.id, entry]));
const packetsById = new Map(packets.map((packet) => [packet.id, packet]));
const errors: string[] = [];
const requireComplete = process.argv.includes("--complete");

if (entries.length !== 229) {
  errors.push(`Expected 229 syllabus rows, found ${entries.length}.`);
}

for (let index = 0; index < entries.length; index += 1) {
  const entry = entries[index];
  const expectedNumber = index + 1;
  if (entry === undefined) {
    continue;
  }
  if (entry.number !== expectedNumber) {
    errors.push(`Expected k-${String(expectedNumber).padStart(3, "0")} at row ${index + 1}, found ${entry.id}.`);
  }
  if (entry.phase !== expectedPhase(entry.number)) {
    errors.push(`${entry.id} is assigned to Phase ${entry.phase}; expected Phase ${expectedPhase(entry.number)}.`);
  }

  const packet = packetsById.get(entry.id);
  if (entry.authored && !packet) {
    errors.push(`${entry.id} is marked authored but its main file is missing.`);
  }
  if (packet && !entry.authored) {
    errors.push(`${entry.id} has lesson files but is not marked authored in SYLLABUS.md.`);
  }
  if (packet) {
    for (const missing of await missingPacketFiles(packet)) {
      errors.push(`${entry.id} is missing companion file ${missing}.`);
    }
  }
  if (requireComplete && !entry.authored) {
    errors.push(`${entry.id} is not authored.`);
  }
}

for (const packet of packets) {
  if (!entriesById.has(packet.id)) {
    errors.push(`${packet.id} exists on disk but is absent from SYLLABUS.md.`);
  }
}

if (errors.length > 0) {
  console.error(errors.join("\n"));
  process.exit(1);
}

console.log(`Syllabus valid: ${entries.length} continuous entries, ${packets.length} authored packets.`);
