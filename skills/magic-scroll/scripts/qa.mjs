#!/usr/bin/env node
/**
 * Magic Scroll QA: drives installed Chrome through the step-16 checklist and fails loudly.
 *
 *   node qa.mjs --root <site dir> [--page index.html] [--selector "[data-magic-scroll]"] [--out qa-out]
 *   node qa.mjs --url http://localhost:5173/        (already-running dev server)
 *
 * Needs playwright-core resolvable from the skill folder or the cwd (`npm i` in the skill once).
 * Writes <out>/report.json, screenshots per viewport and a contact sheet (ffmpeg, if found).
 * Exit code 1 if any check fails.
 */
import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import { createRequire } from "node:module";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
let chromium;
for (const base of [path.join(here, ".."), process.cwd()]) {
  try { ({ chromium } = createRequire(path.join(base, "package.json"))("playwright-core")); break; } catch {}
}
if (!chromium) { console.error("playwright-core missing: run `npm i` in " + path.join(here, "..")); process.exit(1); }

const argv = process.argv.slice(2);
const arg = (n, d) => { const i = argv.indexOf(n); return i > -1 ? argv[i + 1] : d; };
const SEL = arg("--selector", "[data-magic-scroll]");
const OUT = path.resolve(arg("--out", "qa-out"));
fs.mkdirSync(OUT, { recursive: true });

const CHROME = [process.env.MAGIC_SCROLL_CHROME,
  "C:/Program Files/Google/Chrome/Application/chrome.exe", "C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
  "C:/Program Files/Microsoft/Edge/Application/msedge.exe", "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/usr/bin/google-chrome", "/usr/bin/chromium"].find((p) => p && fs.existsSync(p));
if (!CHROME) { console.error("No Chrome/Edge found. Set MAGIC_SCROLL_CHROME."); process.exit(1); }

// Static server: file:// would taint the canvas and hide real network behaviour.
let server, URL = arg("--url");
if (!URL) {
  const root = path.resolve(arg("--root", "."));
  const types = { ".html": "text/html", ".js": "text/javascript", ".mjs": "text/javascript", ".css": "text/css", ".webp": "image/webp",
    ".avif": "image/avif", ".png": "image/png", ".jpg": "image/jpeg", ".json": "application/json", ".svg": "image/svg+xml", ".mp4": "video/mp4" };
  server = http.createServer((req, res) => {
    const p = path.join(root, decodeURIComponent(req.url.split("?")[0]));
    if (!p.startsWith(root) || !fs.existsSync(p) || fs.statSync(p).isDirectory()) { res.writeHead(404); return res.end(); }
    res.writeHead(200, { "Content-Type": types[path.extname(p)] || "application/octet-stream" });
    fs.createReadStream(p).pipe(res);
  }).listen(0);
  URL = `http://127.0.0.1:${server.address().port}/${arg("--page", "index.html")}`;
}

const results = [];
const check = (group, name, ok, detail) => { results.push({ group, name, ok: !!ok, detail }); };
const browser = await chromium.launch({ executablePath: CHROME, headless: true });

async function open(ctxOpts, setup) {
  const ctx = await browser.newContext(ctxOpts);
  const page = await ctx.newPage();
  const bad = [], errors = [];
  page.on("response", (r) => { if (r.status() >= 400) bad.push(r.status() + " " + r.url()); });
  page.on("pageerror", (e) => errors.push(e.message));
  page.on("console", (m) => { if (m.type() === "error") errors.push(m.text()); });
  if (setup) await setup(page);
  await page.addInitScript(() => {
    window.__cls = 0; window.__long = 0;
    new PerformanceObserver((l) => l.getEntries().forEach((e) => { if (!e.hadRecentInput) window.__cls += e.value; })).observe({ type: "layout-shift", buffered: true });
    new PerformanceObserver((l) => { window.__long += l.getEntries().length; }).observe({ type: "longtask", buffered: true });
  });
  await page.goto(URL, { waitUntil: "load" });
  await page.addStyleTag({ content: "html{scroll-behavior:auto!important}" });
  return { ctx, page, bad, errors };
}
const frames2 = (page) => page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
const st = (page) => page.evaluate((s) => document.querySelector(s).__magicScroll.state(), SEL);
async function scrollTo(page, p) {
  await page.evaluate(([s, p]) => { const el = document.querySelector(s); window.scrollTo(0, el.offsetTop + p * (el.offsetHeight - innerHeight)); }, [SEL, p]);
  await frames2(page);
}
async function waitLoaded(page, ms = 30000) {
  const t = Date.now();
  while (Date.now() - t < ms) { const s = await st(page); if (s.loaded + s.errors >= s.end - s.start + 1) return s; await page.waitForTimeout(150); }
  return st(page);
}
async function blank(page) { // true if the canvas centre is empty
  return page.evaluate((s) => {
    const c = document.querySelector(s + " canvas"), x = c.getContext("2d");
    const d = x.getImageData(c.width >> 1, c.height >> 1, 1, 1).data; return d[3] === 0;
  }, SEL);
}
async function shots(page, tag) {
  const files = [];
  for (const p of [0, 0.375, 0.625, 0.875, 1]) {
    await scrollTo(page, p); await page.waitForTimeout(120);
    const f = path.join(OUT, `${tag}-${String(Math.round(p * 1000)).padStart(4, "0")}.png`); await page.screenshot({ path: f }); files.push(f);
  }
  return files;
}

async function sweep(group, page) {
  let s = await st(page);
  await scrollTo(page, 0); s = await st(page);
  check(group, "first frame renders", s.drawn === s.start && !(await blank(page)), `drawn ${s.drawn}, start ${s.start}`);
  await scrollTo(page, 0.02); s = await waitLoaded(page);
  check(group, "no missing frames", s.loaded === s.end - s.start + 1 && s.errors === 0, `loaded ${s.loaded}/${s.end - s.start + 1}, errors ${s.errors}`);
  let prev = 0, mono = true, exact = true;
  const lt0 = await page.evaluate(() => window.__long);
  for (let i = 0; i <= 60; i++) { await scrollTo(page, i / 60); s = await st(page); if (s.drawn < prev) mono = false; if (s.drawn !== s.want) exact = false; prev = s.drawn; }
  check(group, "forward scroll advances", mono && exact, `monotonic ${mono}, drawn==wanted ${exact}`);
  const lt = (await page.evaluate(() => window.__long)) - lt0;
  // The engine's own per-frame JS is what the component controls; long tasks in headless Chrome mostly measure
  // software rasterisation (no GPU), so they are reported, not gated. Confirm on a real phone.
  check(group, "engine frame cost (avg < 4 ms, max < 16 ms)", s.tickAvgMs < 4 && s.tickMaxMs < 16, `avg ${s.tickAvgMs} ms, max ${s.tickMaxMs} ms; ${lt} long tasks in headless raster (info)`);
  check(group, "last frame renders", s.drawn === s.end, `drawn ${s.drawn}, end ${s.end}`);
  prev = 1e9; mono = true;
  for (let i = 60; i >= 0; i--) { await scrollTo(page, i / 60); s = await st(page); if (s.drawn > prev) mono = false; prev = s.drawn; }
  check(group, "backward scroll reverses", mono && s.drawn === s.start, `monotonic ${mono}, back at ${s.drawn}`);
  const b0 = (await st(page)).blanks; let blanks = 0;
  for (let i = 0; i < 80; i++) {
    await page.evaluate(([sel, p]) => { const el = document.querySelector(sel); window.scrollTo(0, el.offsetTop + p * (el.offsetHeight - innerHeight)); }, [SEL, Math.random()]);
    await page.evaluate(() => new Promise(requestAnimationFrame));
    if (await blank(page)) blanks++;
  }
  s = await st(page);
  check(group, "fast scroll never blanks", blanks === 0 && s.blanks === b0, `blank samples ${blanks}, engine blanks +${s.blanks - b0}`);
  const dpr = await page.evaluate(() => devicePixelRatio);
  const expW = Math.round(s.css[0] * Math.min(dpr, 2));
  check(group, "canvas sharp (DPR-scaled)", Math.abs(s.canvas[0] - expW) <= 1, `canvas ${s.canvas.join("x")}, css ${s.css.join("x")}, dpr ${dpr}`);
  const cls = await page.evaluate(() => window.__cls);
  check(group, "no layout shift", cls < 0.05, `CLS ${cls.toFixed(4)}`);
  return s;
}

// ---- desktop ----
{
  const { ctx, page, bad, errors } = await open({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
  const s = await sweep("desktop", page);
  const vis = async (p) => { await scrollTo(page, p); return page.evaluate((sel) => [...document.querySelectorAll(sel + " [data-ms-range]")].map((e) => +getComputedStyle(e).getPropertyValue("--ms-vis")), SEL); };
  const v10 = await vis(0.1), v99 = await vis(0.99);
  if (v10.length) check("desktop", "overlays sync to scroll", v10[0] > 0.9 && v10.slice(1).every((v) => v < 0.05) && v99[v99.length - 1] > 0.9, `@10% ${v10.map((v) => v.toFixed(2))}, @99% ${v99.map((v) => v.toFixed(2))}`);
  const glass = await page.evaluate(() => [...document.querySelectorAll(".lg-warp")].map((w) => { const c = getComputedStyle(w); return { bf: c.backdropFilter, f: c.filter }; }));
  if (glass.length) check("desktop", "liquid glass live (blur + refraction filter)", glass.every((g) => /blur/.test(g.bf) && /url\(/.test(g.f)), `${glass.length} panes, e.g. ${JSON.stringify(glass[0])}`);
  check("desktop", "no 4xx/5xx and no console errors", !bad.length && !errors.length, [...bad, ...errors].slice(0, 5).join(" | ") || "clean");
  const bytes = await page.evaluate(() => performance.getEntriesByType("resource").filter((r) => /\.(webp|avif|png|jpe?g)$/.test(r.name)).reduce((a, r) => a + (r.encodedBodySize || r.transferSize || 0), 0));
  check("desktop", "download budget (<= 12 MB)", bytes <= 12 * 1048576, `${(bytes / 1048576).toFixed(2)} MB of frames, ${s.count} frames`);
  results.push({ group: "desktop", shots: await shots(page, "desktop") });
  await ctx.close();
}
// ---- mobile ----
{
  const { ctx, page } = await open({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true });
  const s0 = await st(page);
  check("mobile", "mobile frame set selected", s0.mobile, `mobile ${s0.mobile}, count ${s0.count}`);
  await sweep("mobile", page);
  results.push({ group: "mobile", shots: await shots(page, "mobile") });
  await ctx.close();
}
// ---- reduced motion ----
{
  const { ctx, page } = await open({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  await page.waitForTimeout(800);
  const s = await st(page);
  const h = await page.evaluate((sel) => document.querySelector(sel).offsetHeight / innerHeight, SEL);
  const vis = await page.evaluate((sel) => [...document.querySelectorAll(sel + " [data-ms-range]")].map((e) => getComputedStyle(e).opacity), SEL);
  check("reduced-motion", "static frame, no pin, no preload", s.reduced && s.drawn > 0 && s.loaded <= 2 && h < 3, `drawn ${s.drawn}, loaded ${s.loaded}, height ${h.toFixed(2)} viewports`);
  check("reduced-motion", "all copy and CTA visible", vis.every((o) => +o === 1), `overlay opacity ${vis.join(",")}`);
  await page.screenshot({ path: path.join(OUT, "reduced-motion.png"), fullPage: true });
  await ctx.close();
}
// ---- broken frames fall back to poster ----
{
  const { ctx, page } = await open({ viewport: { width: 1440, height: 900 } }, (p) =>
    p.route(/frame_\d+\.(webp|avif|png|jpe?g)$/, (r) => /frame_0*1\.\w+$/.test(r.request().url()) ? r.continue() : r.abort()));
  await scrollTo(page, 0.5); await page.waitForTimeout(2500);
  const r = await page.evaluate((sel) => { const s = document.querySelector(sel), p = s.querySelector(".ms-poster");
    return { failed: s.classList.contains("ms-failed"), poster: p ? getComputedStyle(p).visibility === "visible" && p.naturalWidth > 0 : false }; }, SEL);
  check("fallback", "failed sequence shows poster, never blank", r.failed && r.poster, JSON.stringify(r));
  await ctx.close();
}

await browser.close();
server?.close();

// contact sheet
const allShots = results.filter((r) => r.shots).flatMap((r) => r.shots);
try {
  const ff = process.env.MAGIC_SCROLL_FFMPEG || "ffmpeg";
  const d = allShots.filter((f) => /desktop/.test(f)), m = allShots.filter((f) => /mobile/.test(f));
  execFileSync(ff, ["-hide_banner", "-loglevel", "error", "-y", ...d.flatMap((f) => ["-i", f]), ...m.flatMap((f) => ["-i", f]), "-filter_complex",
    `${d.map((_, i) => `[${i}]scale=576:-1[d${i}]`).join(";")};${m.map((_, i) => `[${i + d.length}]scale=-1:324[m${i}]`).join(";")};` +
    `${d.map((_, i) => `[d${i}]`).join("")}hstack=${d.length}[top];${m.map((_, i) => `[m${i}]`).join("")}hstack=${m.length}[bot];[bot]pad=2880:ih:(ow-iw)/2:0[botp];[top][botp]vstack`,
    path.join(OUT, "contact-sheet.jpg")]);
} catch (e) { /* ffmpeg optional */ }

const checks = results.filter((r) => "ok" in r);
fs.writeFileSync(path.join(OUT, "report.json"), JSON.stringify({ url: URL, at: new Date().toISOString(), checks }, null, 2));
for (const c of checks) console.log(`${c.ok ? "PASS" : "FAIL"}  [${c.group}] ${c.name}  (${c.detail})`);
const failed = checks.filter((c) => !c.ok).length;
console.log(`\n${checks.length - failed}/${checks.length} passed. Report: ${path.join(OUT, "report.json")}`);
process.exit(failed ? 1 : 0);
