import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

import {
  countLearnerHoles,
  fail,
  lessonSelector,
  repositoryRoot,
  resolvePacket,
  runCommand,
  typecheckPacket,
} from "./lib/koans.js";

const diagnosticPattern = /^(.+)\((\d+),(\d+)\): error TS(\d+):/gmu;

try {
  const packet = await resolvePacket(lessonSelector());
  const runtime = await runCommand("vitest", ["run", packet.files.test]);
  if (runtime.code !== 0) {
    fail(`Runtime verification failed for ${packet.id}.`);
  }

  const holes = await countLearnerHoles(packet);
  const result = await typecheckPacket(packet, true);
  const output = `${result.stdout}\n${result.stderr}`;
  const diagnostics = [...output.matchAll(diagnosticPattern)];
  const expectedMarkers = new Set<string>();

  for (const path of Object.values(packet.files)) {
    const lines = (await readFile(path, "utf8")).split("\n");
    lines.forEach((line, index) => {
      if (line.includes("@koan-error")) {
        expectedMarkers.add(`${resolve(path)}:${index + 1}`);
      }
    });
  }

  const seenMarkers = new Set<string>();
  const unexpected: string[] = [];
  for (const diagnostic of diagnostics) {
    const file = diagnostic[1];
    const line = diagnostic[2];
    if (file === undefined || line === undefined) {
      continue;
    }
    const marker = `${resolve(repositoryRoot, file)}:${line}`;
    if (expectedMarkers.has(marker)) {
      seenMarkers.add(marker);
    } else {
      unexpected.push(diagnostic[0]);
    }
  }

  const missingDiagnostics = [...expectedMarkers].filter((marker) => !seenMarkers.has(marker));
  if (unexpected.length > 0 || missingDiagnostics.length > 0) {
    if (unexpected.length > 0) {
      console.error(`Unexpected diagnostics:\n${unexpected.join("\n")}`);
    }
    if (missingDiagnostics.length > 0) {
      console.error(`Expected diagnostic markers without errors:\n${missingDiagnostics.join("\n")}`);
    }
    process.exit(1);
  }

  if (holes > 0 && diagnostics.length === 0) {
    fail(`${packet.id} has ${holes} learner holes but typechecking succeeded.`);
  }
  if (holes === 0 && result.code !== 0) {
    fail(`${packet.id} has no learner holes but typechecking failed.`);
  }

  console.log(`Verified ${packet.id}: runtime green, ${holes} learner holes, ${diagnostics.length} intended diagnostics.`);
} catch (error) {
  fail(error);
}
