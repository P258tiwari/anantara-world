import assert from "node:assert/strict";
import { access } from "node:fs/promises";
import { resolve } from "node:path";
import test from "node:test";

const staticRoutes = [
  "/", "/about-us", "/anantara-world", "/residences", "/amenities",
  "/landscape", "/location", "/gallery", "/construction-updates",
  "/news-and-events", "/media-coverage", "/downloads", "/contact",
  "/campaign", "/legal-rera", "/privacy-policy", "/thank-you",
];
const dynamicRoutes = [
  "/news-and-events/project-planning-note",
  "/news-and-events/community-design-preview",
  "/news-and-events/private-presentation",
  "/news-and-events/project-announcement-note",
  "/media-coverage/sample-coverage",
];

let workerPromise;
function getWorker() {
  workerPromise ??= import(new URL("../dist/server/index.js", import.meta.url)).then(({ default: worker }) => worker);
  return workerPromise;
}

const env = { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } };
const ctx = { waitUntil() {}, passThroughOnException() {} };

async function request(path = "/", init = {}, origin = "http://localhost") {
  const worker = await getWorker();
  return worker.fetch(new Request(`${origin}${path}`, { headers: { accept: "text/html", ...init.headers }, ...init }), env, ctx);
}

test("server-renders every public route with a title, heading and main landmark", async () => {
  for (const path of [...staticRoutes, ...dynamicRoutes]) {
    const response = await request(path);
    assert.equal(response.status, 200, path);
    const html = await response.text();
    assert.match(html, /<title>[^<]+<\/title>/, `${path} title`);
    assert.match(html, /<h1[ >]/, `${path} h1`);
    assert.match(html, /<main(?: id="main")?/, `${path} main`);
    assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/, path);
  }
});

test("all rendered internal page links resolve", async () => {
  const links = new Set();
  for (const path of staticRoutes) {
    const html = await (await request(path)).text();
    for (const match of html.matchAll(/href="(\/[^"]*)"/g)) {
      const href = match[1].split(/[?#]/)[0] || "/";
      if (!href.startsWith("/_") && !/\.(?:png|jpe?g|webp|svg|gif|avif|css|js)$/i.test(href)) links.add(href);
    }
  }
  for (const href of links) {
    const response = await request(href);
    assert.notEqual(response.status, 404, href);
    assert.ok(response.status < 500, `${href}: ${response.status}`);
  }
});

test("all rendered local images exist with case-correct paths", async () => {
  const sources = new Set();
  for (const path of staticRoutes) {
    const html = await (await request(path)).text();
    for (const match of html.matchAll(/src="(\/(?!_)[^"?]+\.(?:png|jpe?g|webp|svg|gif|avif))"/gi)) sources.add(match[1]);
  }
  for (const source of sources) await access(resolve("public", `.${source}`));
});

test("unknown static and dynamic routes return the custom 404", async () => {
  for (const path of ["/definitely-not-a-page", "/news-and-events/not-real", "/media-coverage/not-real"]) {
    const response = await request(path);
    assert.equal(response.status, 404, path);
    assert.match(await response.text(), /This horizon leads elsewhere/);
  }
});

test("enquiry API rejects hostile, malformed, invalid and oversized requests", async () => {
  const hostile = await request("/api/enquiry", { method: "POST", headers: { origin: "https://evil.example", "content-type": "application/json", accept: "application/json" }, body: "{}" });
  assert.equal(hostile.status, 403);
  const malformedOrigin = await request("/api/enquiry", { method: "POST", headers: { origin: "not a url", "content-type": "application/json", accept: "application/json" }, body: "{}" });
  assert.equal(malformedOrigin.status, 403);
  const malformed = await request("/api/enquiry", { method: "POST", headers: { "content-type": "application/json", accept: "application/json", "cf-connecting-ip": "audit-malformed" }, body: "{" });
  assert.equal(malformed.status, 400);
  const invalid = await request("/api/enquiry", { method: "POST", headers: { "content-type": "application/json", accept: "application/json", "cf-connecting-ip": "audit-invalid" }, body: JSON.stringify({ fullName: "A", phone: "bad", email: "bad", consent: "no", startedAt: Date.now() - 5000 }) });
  assert.equal(invalid.status, 422);
  const oversized = await request("/api/enquiry", { method: "POST", headers: { "content-type": "application/json", "content-length": "32001", accept: "application/json", "cf-connecting-ip": "audit-large" }, body: "{}" });
  assert.equal(oversized.status, 413);
});

test("production responses include baseline security headers", async () => {
  const response = await request("/", {}, "https://anantara.world");
  assert.equal(response.status, 200);
  assert.equal(response.headers.get("x-content-type-options"), "nosniff");
  assert.equal(response.headers.get("x-frame-options"), "SAMEORIGIN");
  assert.equal(response.headers.get("referrer-policy"), "strict-origin-when-cross-origin");
  assert.match(response.headers.get("content-security-policy") || "", /object-src 'none'/);
  assert.match(response.headers.get("strict-transport-security") || "", /max-age=31536000/);
});
test("robots and sitemap expose the canonical production domain", async () => {
  const robots = await request("/robots.txt");
  assert.equal(robots.status, 200);
  assert.match(await robots.text(), /https:\/\/anantara\.world\/sitemap\.xml/);
  const sitemap = await request("/sitemap.xml");
  assert.equal(sitemap.status, 200);
  const xml = await sitemap.text();
  assert.match(xml, /https:\/\/anantara\.world\//);
  assert.doesNotMatch(xml, /localhost|127\.0\.0\.1/);
});
test("indexable pages have unique titles, descriptions and canonical URLs", async () => {
  const titles = new Set();
  for (const path of staticRoutes.filter((route) => route !== "/thank-you")) {
    const html = await (await request(path)).text();
    const title = html.match(/<title>([^<]+)<\/title>/)?.[1];
    assert.ok(title, `${path} title`);
    assert.ok(!titles.has(title), `${path} duplicate title: ${title}`);
    titles.add(title);
    assert.match(html, /<meta name="description" content="[^"]+"/i, `${path} description`);
    assert.match(html, new RegExp(`<link rel="canonical" href="https://anantara\\.world${path === "/" ? "" : path}"`), `${path} canonical`);
  }
});