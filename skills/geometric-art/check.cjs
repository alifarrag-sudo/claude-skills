// Screenshots the block at 5 seek points + Arabic + web demo; fails on any page error.
// node check.cjs [outDir]   (needs playwright or playwright-core: `npm i playwright-core` in this folder)
// Uses an installed Chrome. Set GEOMETRIC_ART_CHROME to a Chromium-based browser's path to use another one.
// The block loads GSAP from a CDN, so this check needs network access.
const path = require("path"), fs = require("fs");
let pw; for (const m of ["playwright", "playwright-core"]) { try { pw = require(m); break; } catch {} }
if (!pw) { console.error("playwright missing: run `npm i playwright-core` in " + __dirname); process.exit(1); }
const { chromium } = pw;
const CHROME = process.env.GEOMETRIC_ART_CHROME;
const url = (f) => require("url").pathToFileURL(path.join(__dirname, f)).href;
const OUT = process.argv[2] || path.join(__dirname, "_check"); fs.mkdirSync(OUT, { recursive: true });
(async () => {
  const b = await chromium.launch({ ...(CHROME ? { executablePath: CHROME } : { channel: "chrome" }), args: ["--use-angle=swiftshader", "--enable-unsafe-swiftshader"] });
  const errs = [];
  const shot = async (name, file, { vars, times, viewport = { width: 1920, height: 1080 } } = {}) => {
    const p = await b.newPage({ viewport });
    p.on("pageerror", (e) => errs.push(name + ": " + e.message));
    p.on("console", (m) => m.type() === "error" && errs.push(name + ": " + m.text()));
    if (vars) await p.addInitScript((v) => { window.__hyperframes = { getVariables: () => v }; }, vars);
    await p.goto(url(file)); await p.waitForTimeout(800);
    for (const t of times || [null]) {
      if (t !== null) await p.evaluate((t) => { window.dispatchEvent(new CustomEvent("hf-seek", { detail: { time: t } })); }, t);
      await p.screenshot({ path: `${OUT}/${name}${t === null ? "" : "-t" + t}.png` });
    }
    await p.close();
  };
  await shot("block", "geometric-art.html", { times: [0, 0.7, 1.4, 4, 7.9] });
  await shot("block-ar", "geometric-art.html", { times: [4], vars: { headline1: "الهندسة", headline2: "في حركة", description: "مساحات مسطحة وحواف منقطة", palette: "#0E3B2E, #1F7A5A, #F4E9D0", bands: 5, angle: 120, pixel: 6, font: "Tahoma, Arial, sans-serif" } });
  await shot("web-desktop", "web-demo.html", { viewport: { width: 1440, height: 900 } });
  await shot("web-phone", "web-demo.html", { viewport: { width: 390, height: 844 } });
  if (errs.length) { console.error("ERRORS\n" + errs.join("\n")); process.exitCode = 1; } else console.log("ok, frames in " + OUT);
  await b.close();
})();
