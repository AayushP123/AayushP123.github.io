import { cp, mkdir, rm, writeFile } from "node:fs/promises";

const outputDirectory = new URL("../public-static/", import.meta.url);
const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("export", String(Date.now()));

const { default: worker } = await import(workerUrl.href);
const response = await worker.fetch(
  new Request("https://aayushp123.github.io/", {
    headers: {
      accept: "text/html",
      host: "aayushp123.github.io",
      "x-forwarded-proto": "https",
    },
  }),
  {
    ASSETS: {
      fetch: async () => new Response("Not found", { status: 404 }),
    },
  },
  {
    waitUntil() {},
    passThroughOnException() {},
  },
);

if (!response.ok) {
  throw new Error(`Static render failed with status ${response.status}.`);
}

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });
await writeFile(new URL("index.html", outputDirectory), await response.text());
await writeFile(new URL(".nojekyll", outputDirectory), "");
await cp(new URL("../dist/client/assets/", import.meta.url), new URL("assets/", outputDirectory), {
  recursive: true,
});
await cp(new URL("../dist/client/og.png", import.meta.url), new URL("og.png", outputDirectory));

console.log("Static portfolio exported to public-static/.");
