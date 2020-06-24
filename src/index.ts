import { Environment, FileSystemLoader } from "nunjucks";
import { renderSync } from "sass";
import fs from "fs";
import path from "path";
import prettier from "prettier";
import { copy } from "fs-extra";

interface Entry {
  name: string;
  armVersion: boolean;
  link: string;
}

function validateEntry(filepath: string, entry: Entry) {
  if (!entry.name) {
    throw new Error(`validation error: ${filepath} missing name`);
  }

  if (typeof entry.armVersion !== "boolean") {
    throw new Error(
      `validation error: ${filepath} armVersion must be true/false`
    );
  }

  if (!entry.link) {
    throw new Error(`validation error: ${filepath} missing link`);
  }
}

async function readDataFiles(folder: string): Promise<[string, Entry[]]> {
  const files = await fs.promises.readdir(
    path.join(process.cwd(), "src", "data", folder)
  );
  const items: Entry[] = [];
  for (const filename of files) {
    const content = await fs.promises.readFile(
      path.join(process.cwd(), "src", "data", folder, filename),
      "utf8"
    );
    const entry = JSON.parse(content) as Entry;
    validateEntry(filename, entry);
    items.push(entry);
  }

  items.sort((a, b) => a.name.localeCompare(b.name));

  return [folder, items];
}

async function readDataFolder(): Promise<{ [key: string]: Entry[] }> {
  const filenames = await fs.promises.readdir(
    path.join(process.cwd(), "src", "data")
  );
  const sections = await Promise.all(filenames.map(readDataFiles));

  return sections.reduce((acc, [sectionName, items]) => {
    acc[sectionName] = items;
    return acc;
  }, {});
}

function sass() {
  return renderSync({ file: "src/styles/index.scss" }).css;
}

(async () => {
  const entries = await readDataFolder();
  const env = new Environment(new FileSystemLoader("src", { noCache: true }), {
    noCache: true,
  });

  env.addFilter("hasArm", (entries: Entry[]) => {
    return entries.filter((e) => e.armVersion);
  });

  const output = env.render("index.njs", { sass, entries });
  const formattedOutput = prettier.format(output, { parser: "html" });
  try {
    await fs.promises.stat(path.join(process.cwd(), "dist"));
  } catch (err) {
    await fs.promises.mkdir(path.join(process.cwd(), "dist"));
  }

  await fs.promises.writeFile(
    path.join(process.cwd(), "dist", "index.html"),
    formattedOutput,
    "utf8"
  );

  await copy(path.join(process.cwd(), "src", "static"), "dist");
})();
