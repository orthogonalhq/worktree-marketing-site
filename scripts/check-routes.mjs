import { siteRoutes } from "../src/config/site-routes.mjs";

const baseUrlInput = process.argv[2] ?? process.env.ROUTE_CHECK_BASE_URL;

if (!baseUrlInput) {
  throw new Error("Provide a base URL: npm run check:routes -- https://example.com");
}

const baseUrl = new URL(baseUrlInput);
const failures = [];

function absolutePath(path) {
  return new URL(path, baseUrl).toString();
}

function normalizeUrl(value) {
  const url = new URL(value, baseUrl);
  return `${url.origin}${url.pathname === "/" ? "" : url.pathname}`;
}

function attribute(tag, name) {
  return tag.match(new RegExp(`\\b${name}="([^"]*)"`, "i"))?.[1];
}

function canonicalFrom(html) {
  for (const match of html.matchAll(/<link\b[^>]*>/gi)) {
    if (attribute(match[0], "rel") === "canonical") return attribute(match[0], "href");
  }
}

function robotsFrom(html) {
  for (const match of html.matchAll(/<meta\b[^>]*>/gi)) {
    if (attribute(match[0], "name")?.toLowerCase() === "robots") return attribute(match[0], "content")?.toLowerCase();
  }
}

function h1Count(html) {
  return [...html.matchAll(/<h1(?:\s|>)/gi)].length;
}

function sitemapLocations(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/gi)].map((match) => normalizeUrl(match[1]));
}

function addFailure(message) {
  failures.push(message);
}

async function fetchPage(path) {
  const response = await fetch(absolutePath(path), { redirect: "manual" });
  return { response, html: await response.text() };
}

for (const redirect of siteRoutes.redirects) {
  const response = await fetch(absolutePath(redirect.source), { redirect: "manual" });
  const actualLocation = response.headers.get("location");

  if (response.status !== 308 || actualLocation !== redirect.destination) {
    addFailure(`${redirect.source}: expected 308 to ${redirect.destination}, received ${response.status} to ${actualLocation ?? "no location"}`);
  }
}

const unknownResponse = await fetch(absolutePath(siteRoutes.unknownRoutes.probePath), { redirect: "manual" });
if (unknownResponse.status !== siteRoutes.unknownRoutes.expectedStatus) {
  addFailure(`${siteRoutes.unknownRoutes.probePath}: expected ${siteRoutes.unknownRoutes.expectedStatus}, received ${unknownResponse.status}`);
}

for (const route of siteRoutes.staticRoutes) {
  const { response, html } = await fetchPage(route.path);
  const expectedCanonical = normalizeUrl(new URL(route.path, siteRoutes.canonicalOrigin).toString());
  const canonical = canonicalFrom(html);

  if (response.status !== 200) addFailure(`${route.path}: expected 200, received ${response.status}`);
  if (!canonical || normalizeUrl(canonical) !== expectedCanonical) addFailure(`${route.path}: expected canonical ${expectedCanonical}, received ${canonical ?? "none"}`);
  if (h1Count(html) !== 1) addFailure(`${route.path}: expected exactly one h1, received ${h1Count(html)}`);
  if (robotsFrom(html)?.includes("noindex")) addFailure(`${route.path}: must be indexable`);
}

for (const path of siteRoutes.noindexRoutes.map((route) => route.pattern).filter((path) => !path.includes("["))) {
  const { response, html } = await fetchPage(path);
  if (response.status !== 200) addFailure(`${path}: expected 200, received ${response.status}`);
  if (!robotsFrom(html)?.includes("noindex")) addFailure(`${path}: expected noindex robots metadata`);
}

const { response: blogResponse, html: blogHtml } = await fetchPage("/blog");
const blogCanonical = canonicalFrom(blogHtml);
if (blogResponse.status !== 200) addFailure(`/blog: expected 200, received ${blogResponse.status}`);
if (!blogCanonical || normalizeUrl(blogCanonical) !== normalizeUrl(new URL("/blog", siteRoutes.canonicalOrigin).toString())) addFailure(`/blog: expected self-canonical, received ${blogCanonical ?? "none"}`);
if (robotsFrom(blogHtml)?.includes("noindex")) addFailure("/blog: must be indexable once published content exists");
if (h1Count(blogHtml) !== 1) addFailure(`/blog: expected exactly one h1, received ${h1Count(blogHtml)}`);

const articlePaths = [...new Set([...blogHtml.matchAll(/href="([^"]+)"/gi)]
  .map((match) => match[1])
  .filter((href) => href.startsWith("/blog/") && !href.includes("?") && !href.includes("#")))];

if (articlePaths.length === 0) addFailure("/blog: expected at least one published article link");

for (const path of articlePaths) {
  const { response, html } = await fetchPage(path);
  const canonical = canonicalFrom(html);
  const expectedCanonical = normalizeUrl(new URL(path, siteRoutes.canonicalOrigin).toString());

  if (response.status !== 200) addFailure(`${path}: expected 200, received ${response.status}`);
  if (!canonical || normalizeUrl(canonical) !== expectedCanonical) addFailure(`${path}: expected self-canonical, received ${canonical ?? "none"}`);
  if (robotsFrom(html)?.includes("noindex")) addFailure(`${path}: must be indexable`);
  if (h1Count(html) !== 1) addFailure(`${path}: expected exactly one h1, received ${h1Count(html)}`);
}

const sitemapResponse = await fetch(absolutePath("/sitemap.xml"));
const sitemap = sitemapLocations(await sitemapResponse.text());
const expectedSitemapPaths = [...siteRoutes.staticRoutes.map((route) => route.path), "/blog", ...articlePaths];

if (sitemapResponse.status !== 200) addFailure(`/sitemap.xml: expected 200, received ${sitemapResponse.status}`);
for (const path of expectedSitemapPaths) {
  const expectedUrl = normalizeUrl(new URL(path, siteRoutes.canonicalOrigin).toString());
  const count = sitemap.filter((url) => url === expectedUrl).length;
  if (count !== 1) addFailure(`/sitemap.xml: expected ${expectedUrl} exactly once, received ${count}`);
}
for (const path of [...siteRoutes.redirects.map((redirect) => redirect.source), ...siteRoutes.noindexRoutes.map((route) => route.pattern).filter((path) => !path.includes("["))]) {
  const excludedUrl = normalizeUrl(new URL(path, siteRoutes.canonicalOrigin).toString());
  if (sitemap.includes(excludedUrl)) addFailure(`/sitemap.xml: must exclude ${excludedUrl}`);
}

if (![...blogHtml.matchAll(/href="([^"]+)"/gi)].some((match) => match[1] === "/blog")) {
  addFailure("/blog: expected a server-rendered internal /blog navigation link");
}

if (failures.length > 0) {
  throw new Error(`Route release check failed:\n${failures.join("\n")}`);
}

console.log(`Route release check passed for ${baseUrl.origin}: ${siteRoutes.staticRoutes.length} static routes and ${articlePaths.length} published article(s).`);
