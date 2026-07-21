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
  assert.match(html, /Aayush/);
  assert.match(html, /Pandey/);
  assert.match(html, /5M\+/);
  assert.match(html, /Gene Editing Trials/);
  assert.match(html, /SlackDB/);
  assert.match(html, /Microsoft Kiota/);
  assert.match(html, /NES 6502 Emulator/);
  assert.match(html, /Modified DoWG/);
  assert.match(html, /crisprtrials\.duckdns\.org/);
  assert.match(html, /slackdb\.vercel\.app/);
  assert.match(html, /microsoft\/kiota\/pull\/7760/);
  assert.match(html, /colab\.research\.google\.com/);
  assert.match(html, /Aayush-Pandey-Resume-2026\.pdf/);
  assert.doesNotMatch(html, /FinOps Agent|microsoft\/kiota\/pull\/7943/);
  assert.match(html, /github\.com\/AayushP123/);
  assert.match(html, /linkedin\.com\/in\/aayush-pandey-511827378/);
  assert.match(html, /http:\/\/localhost\/og-devhq\.png/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|SkeletonPreview/);
});

test("removes starter-only assets and dependencies", async () => {
  const [page, layout, styles, packageJson] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../package.json", import.meta.url), "utf8"),
  ]);

  assert.match(page, /className="projects panel-section"/);
  assert.match(page, /02 \/ EXPERIENCE/);
  assert.match(page, /03 \/ PROJECTS/);
  assert.match(page, /className="cursor-spotlight"/);
  assert.match(page, /Won 1st place at VillageHacks/);
  assert.match(page, /<Starfield \/>/);
  assert.match(page, /Filter technical skills/);
  assert.match(page, /prefers-reduced-motion/);
  assert.match(page, /function navigateToSection/);
  assert.match(page, /window\.history\.replaceState/);
  assert.match(page, /onClick={navigateToSection}/);
  assert.doesNotMatch(styles, /scroll-behavior:\s*smooth/);
  assert.match(styles, /body\s*{[^}]*overflow-x:\s*clip/s);
  assert.doesNotMatch(styles, /body\s*{[^}]*overflow-x:\s*hidden/s);
  assert.match(layout, /generateMetadata/);
  assert.doesNotMatch(packageJson, /react-loading-skeleton/);
  await access(new URL("../public/Aayush-Pandey-Resume-2026.pdf", import.meta.url));
  await assert.rejects(access(new URL("app\/_sites-preview", templateRoot)));
});
