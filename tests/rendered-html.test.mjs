import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

const templateRoot = new URL("../", import.meta.url);

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html", host: "localhost" },
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
}

test("server-renders Aayush's portfolio", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Aayush Pandey/);
  assert.match(html, /AAYUSH/);
  assert.match(html, /PANDEY/);
  assert.match(html, /5M\+/);
  assert.match(html, /SlackDB/);
  assert.match(html, /FinOps Agent/);
  assert.match(html, /Microsoft Kiota/);
  assert.match(html, /github\.com\/AayushP123/);
  assert.match(html, /linkedin\.com\/in\/aayush-pandey-511827378/);
  assert.match(html, /http:\/\/localhost\/og\.png/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|SkeletonPreview/);
});

test("removes starter-only assets and dependencies", async () => {
  const [page, layout, styles, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /className="projects-stage"/);
  assert.match(page, /WHAT I CAN DO/);
  assert.doesNotMatch(page, /projects-sticky/);
  assert.match(page, /prefers-reduced-motion/);
  assert.doesNotMatch(styles, /scroll-behavior:\s*smooth/);
  assert.match(layout, /generateMetadata/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  await assert.rejects(access(new URL("app\/_sites-preview", templateRoot)));
});
