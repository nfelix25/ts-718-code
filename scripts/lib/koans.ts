import { access, mkdtemp, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { spawn } from "node:child_process";

const scriptDirectory = dirname(fileURLToPath(import.meta.url));

export const repositoryRoot = resolve(scriptDirectory, "../..");
export const koansRoot = join(repositoryRoot, "src/koans");
export const syllabusPath = join(repositoryRoot, "SYLLABUS.md");

const primaryFilePattern = /^k-(\d{3})-([a-z0-9]+(?:-[a-z0-9]+)*)\.ts$/;

export interface PacketFiles {
  main: string;
  drills: string;
  edges: string;
  test: string;
}

export interface KoanPacket {
  number: number;
  id: string;
  topic: string;
  phaseDirectory: string;
  files: PacketFiles;
}

export interface SyllabusEntry {
  number: number;
  id: string;
  topic: string;
  phase: number;
  authored: boolean;
}

export interface CommandResult {
  code: number;
  stdout: string;
  stderr: string;
}

async function walk(directory: string): Promise<string[]> {
  const entries = await readdir(directory, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      files.push(...await walk(path));
    } else {
      files.push(path);
    }
  }

  return files;
}

export async function pathExists(path: string): Promise<boolean> {
  try {
    await access(path);
    return true;
  } catch {
    return false;
  }
}

export async function discoverPackets(): Promise<KoanPacket[]> {
  if (!await pathExists(koansRoot)) {
    return [];
  }

  const paths = await walk(koansRoot);
  const packets: KoanPacket[] = [];

  for (const path of paths) {
    const fileName = path.slice(path.lastIndexOf("/") + 1);
    const match = primaryFilePattern.exec(fileName);
    if (!match) {
      continue;
    }

    const numberText = match[1];
    const topic = match[2];
    if (numberText === undefined || topic === undefined) {
      continue;
    }

    const id = `k-${numberText}-${topic}`;
    const directory = dirname(path);
    packets.push({
      number: Number(numberText),
      id,
      topic,
      phaseDirectory: relative(koansRoot, directory),
      files: {
        main: path,
        drills: join(directory, `${id}.drills.ts`),
        edges: join(directory, `${id}.edges.ts`),
        test: join(directory, `${id}.test.ts`),
      },
    });
  }

  return packets.sort((left, right) => left.number - right.number);
}

export async function missingPacketFiles(packet: KoanPacket): Promise<string[]> {
  const missing: string[] = [];
  for (const path of Object.values(packet.files)) {
    if (!await pathExists(path)) {
      missing.push(relative(repositoryRoot, path));
    }
  }
  return missing;
}

export async function resolvePacket(selector: string | undefined): Promise<KoanPacket> {
  if (!selector) {
    throw new Error("Provide a lesson selector such as 1, k-001, or k-001-structural-assignability.");
  }

  const packets = await discoverPackets();
  const normalized = selector
    .replace(/\.test\.ts$|\.drills\.ts$|\.edges\.ts$|\.ts$/u, "")
    .toLowerCase();
  const numericMatch = /^(?:k-)?(\d{1,3})$/u.exec(normalized);

  const matches = numericMatch
    ? packets.filter((packet) => packet.number === Number(numericMatch[1]))
    : packets.filter((packet) => packet.id === normalized || packet.id.includes(normalized));

  if (matches.length === 0) {
    throw new Error(`No authored lesson matches "${selector}". Use a number, k-NNN, or a unique lesson stem.`);
  }
  if (matches.length > 1) {
    throw new Error(`Selector "${selector}" is ambiguous: ${matches.map((packet) => packet.id).join(", ")}`);
  }

  const packet = matches[0];
  if (packet === undefined) {
    throw new Error(`No authored lesson matches "${selector}".`);
  }

  const missing = await missingPacketFiles(packet);
  if (missing.length > 0) {
    throw new Error(`Lesson ${packet.id} is incomplete. Missing: ${missing.join(", ")}`);
  }

  return packet;
}

export async function runCommand(
  command: string,
  arguments_: string[],
  capture = false,
): Promise<CommandResult> {
  return await new Promise((resolvePromise, reject) => {
    const child = spawn(command, arguments_, {
      cwd: repositoryRoot,
      env: process.env,
      stdio: capture ? ["ignore", "pipe", "pipe"] : "inherit",
    });
    let stdout = "";
    let stderr = "";

    if (capture) {
      child.stdout?.on("data", (chunk: Buffer) => {
        stdout += chunk.toString();
      });
      child.stderr?.on("data", (chunk: Buffer) => {
        stderr += chunk.toString();
      });
    }

    child.on("error", reject);
    child.on("close", (code) => {
      resolvePromise({ code: code ?? 1, stdout, stderr });
    });
  });
}

export async function typecheckPacket(
  packet: KoanPacket,
  capture = false,
): Promise<CommandResult> {
  const temporaryDirectory = await mkdtemp(join(repositoryRoot, ".koan-"));
  const configPath = join(temporaryDirectory, "tsconfig.json");
  const config = {
    extends: join(repositoryRoot, "tsconfig.json"),
    compilerOptions: { noEmit: true },
    include: [],
    files: Object.values(packet.files),
  };

  await writeFile(configPath, `${JSON.stringify(config, null, 2)}\n`, "utf8");
  try {
    return await runCommand("tsc", ["--project", configPath, "--pretty", "false"], capture);
  } finally {
    await rm(temporaryDirectory, { recursive: true, force: true });
  }
}

export async function parseSyllabus(): Promise<SyllabusEntry[]> {
  const source = await readFile(syllabusPath, "utf8");
  const rowPattern = /^\|\s*`?(k-(\d{3}))`?\s*\|\s*`?([a-z0-9-]+)`?\s*\|\s*(\d+)\s*\|\s*\[([ xX])\]\s*\|$/gmu;
  const entries: SyllabusEntry[] = [];

  for (const match of source.matchAll(rowPattern)) {
    const prefix = match[1];
    const numberText = match[2];
    const topic = match[3];
    const phaseText = match[4];
    const authoredMarker = match[5];
    if (prefix === undefined || numberText === undefined || topic === undefined || phaseText === undefined) {
      continue;
    }

    entries.push({
      number: Number(numberText),
      id: `${prefix}-${topic}`,
      topic,
      phase: Number(phaseText),
      authored: authoredMarker?.toLowerCase() === "x",
    });
  }

  return entries;
}

export function expectedPhase(number: number): number {
  const phaseEnds = [22, 39, 54, 73, 88, 103, 117, 137, 159, 208, 220, 229];
  const phaseIndex = phaseEnds.findIndex((end) => number <= end);
  return phaseIndex + 1;
}

export async function countLearnerHoles(packet: KoanPacket): Promise<number> {
  let count = 0;
  for (const path of Object.values(packet.files)) {
    const source = await readFile(path, "utf8");
    count += source.match(/TODO\(koan\)/gu)?.length ?? 0;
  }
  return count;
}

export function fail(message: unknown): never {
  console.error(message instanceof Error ? message.message : String(message));
  process.exit(1);
}

export function lessonSelector(arguments_: string[] = process.argv.slice(2)): string | undefined {
  return arguments_.find((argument) => argument !== "--" && !argument.startsWith("--"));
}
