import {
  copyFile,
  mkdir,
  mkdtemp,
  readFile,
  rm,
  writeFile,
} from "node:fs/promises";
import { basename, join } from "node:path";

import {
  discoverPackets,
  fail,
  repositoryRoot,
  runCommand,
} from "./lib/koans.js";

const representativeNumbers = [
  22, 39, 54, 73, 88, 103, 117, 137, 159, 208, 220, 229,
];
const assertionPattern =
  /(Expect<Equal<)(.+)(,\s*TODO>>;)(\s*\/\/ TODO\(koan\) @koan-error)/gu;

function solveAssertions(source: string): { source: string; solved: number } {
  let solved = 0;
  const transformed = source.replace(
    assertionPattern,
    (_match, prefix: string, actual: string, _suffix: string, marker: string) => {
      solved += 1;
      return `${prefix}${actual}, ${actual}>>;${marker}`;
    },
  );
  return { source: transformed, solved };
}

const packets = await discoverPackets();
const selected = representativeNumbers.map((number) => {
  const packet = packets.find((candidate) => candidate.number === number);
  if (packet === undefined) {
    fail(`Missing representative packet k-${String(number).padStart(3, "0")}.`);
  }
  return packet;
});

const temporaryRoot = await mkdtemp(join(repositoryRoot, ".solved-samples-"));
const utilityDirectory = join(temporaryRoot, "src/utils");
const files: string[] = [];
let solvedAssertions = 0;

try {
  await mkdir(utilityDirectory, { recursive: true });
  await copyFile(
    join(repositoryRoot, "src/utils/type-utils.ts"),
    join(utilityDirectory, "type-utils.ts"),
  );

  for (const packet of selected) {
    const destinationDirectory = join(
      temporaryRoot,
      "src/koans",
      packet.phaseDirectory,
    );
    await mkdir(destinationDirectory, { recursive: true });

    for (const sourcePath of Object.values(packet.files)) {
      const destinationPath = join(destinationDirectory, basename(sourcePath));
      const source = await readFile(sourcePath, "utf8");
      const solved = solveAssertions(source);
      solvedAssertions += solved.solved;
      await writeFile(destinationPath, solved.source, "utf8");
      files.push(destinationPath);
    }
  }

  const configPath = join(temporaryRoot, "tsconfig.json");
  await writeFile(
    configPath,
    `${JSON.stringify({
      extends: join(repositoryRoot, "tsconfig.json"),
      compilerOptions: { noEmit: true },
      include: [],
      files,
    }, null, 2)}\n`,
    "utf8",
  );

  const result = await runCommand(
    "tsc",
    ["--project", configPath, "--pretty", "false"],
    true,
  );
  if (result.code !== 0) {
    console.error(result.stdout);
    console.error(result.stderr);
    fail("Representative solved-packet verification failed.");
  }

  console.log(
    `Solved samples valid: ${selected.length} phases, ${solvedAssertions} assertions, no remaining diagnostics.`,
  );
} finally {
  await rm(temporaryRoot, { recursive: true, force: true });
}
