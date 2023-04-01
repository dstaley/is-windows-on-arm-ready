import { readFile } from "node:fs/promises";
import { glob } from "glob";
import s from "../sass/style.module.scss";
import type { Entry, CategorizedData } from "../types";
import ProgressGrid from "../components/ProgressGrid";
import type { Metadata } from "next";

async function getData() {
  const dataFilePaths = await glob("./content/*.json");
  const files = await Promise.all(
    dataFilePaths.map(async (p) => {
      const contents = await readFile(p, "utf-8");
      return JSON.parse(contents) as Entry;
    })
  );

  return files.reduce(
    (a, b) => {
      a[b.category].push(b);
      return a;
    },
    {
      microsoft: [],
      applications: [],
      development: [],
    } as CategorizedData
  );
}

export default async function Page() {
  const data = await getData();

  return (
    <>
      <main className={s.container}>
        <h1 id="is-windows-on-arm-ready">Is Windows on ARM ready?</h1>
        <p>
          This site shows whether popular Windows applications and development
          platforms natively support Windows on ARM64.
        </p>
        <ProgressGrid data={data} />
        <h2 id="frequently-asked-questions">Frequently Asked Questions</h2>
        <h3 id="why-is-this-important">Why is this important?</h3>
        <p>
          While Windows on ARM64 can emulate x86 applications, performance and
          battery consumption are greatly improved for applications that are
          compiled natively for ARM64. In order to support a healthy ecosystem,
          it's important that the most popular applications support ARM64
          natively.
        </p>
        <h3 id="what-applications-are-included">
          What applications are included?
        </h3>
        <p>
          This listing only contains the most popular applications; it doesn't
          attempt to be an exhaustive list. Good candidates for inclusion are
          applications that are widely installed, or are widely used in
          particular workloads. Additionally, we include the most popular
          development SDKs that are used to build applications on Windows.
        </p>
        <h3 id="can-i-suggest-an-application-or-suggest-a-change">
          Can I suggest an application or suggest a change?
        </h3>
        <p>
          Please do! You can file an issue on{" "}
          <a href="https://github.com/dstaley/is-windows-on-arm-ready">
            GitHub
          </a>{" "}
          or <a href="https://twitter.com/dstaley">send me a tweet</a>.
        </p>
      </main>
      <footer>
        <p>
          Made with ❤️ by&#32;
          <a href="https://dstaley.com">Dylan Staley</a>, who dreams of a full
          ARM64 future.
        </p>
        <p>
          <a href="https://github.com/dstaley/is-windows-on-arm-ready">
            View on GitHub
          </a>
        </p>
      </footer>
    </>
  );
}

export const metadata: Metadata = {
  title: "Is Windows on ARM ready?",
  description: "Tracking ARM versions of popular Windows applications",
  icons: "/laptop.png",
  twitter: {
    title: "Is Windows on ARM ready?",
    description: "Tracking ARM versions of popular Windows applications",
    card: "summary_large_image",
    site: "@dstaley",
    creator: "@dstaley",
    images: process.env.VERCEL
      ? `https://${process.env.VERCEL_URL}/twittercard.png`
      : undefined,
  },
  openGraph: {
    title: "Is Windows on ARM ready?",
    description: "Tracking ARM versions of popular Windows applications",
    images: process.env.VERCEL
      ? `https://${process.env.VERCEL_URL}/opengraph.png`
      : undefined,
    url: process.env.VERCEL ? `https://${process.env.VERCEL_URL}/` : undefined,
    siteName: "Is Windows on ARM ready?",
    locale: "en_US",
    type: "website",
  },
};
