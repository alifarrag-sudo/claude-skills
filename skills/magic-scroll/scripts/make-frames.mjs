#!/usr/bin/env node
/**
 * Magic Scroll frame maker: video in, numbered web frames out.
 *
 *   node make-frames.mjs <video> <outDir> [options]
 *
 *   --fps 30             sample rate (the scroll is the clock, fps only sets density)
 *   --smooth             motion-interpolate up to --fps (for 24 fps AI clips; slower)
 *   --width 1600         desktop frame width (height keeps aspect)
 *   --mobile-width 900   also write <outDir>/mobile at this width; 0 to skip
 *   --mobile-crop 4:5    crop the mobile set to this aspect around the centre (optional)
 *   --format webp        webp | avif | png | jpg
 *   --quality 78         webp/jpg quality 0-100 (avif: mapped to crf)
 *   --alpha              keep transparency (webp/png/avif); needs an alpha source (ProRes 4444, webm, png seq)
 *   --start 0 --end 5    trim, seconds
 *   --max-frames 150     hard cap; fps is lowered to fit
 *   --prefix frame_      filename prefix, 4-digit pad
 *
 * Writes <outDir>/desktop/frame_0001.webp..., <outDir>/mobile/..., <outDir>/manifest.json
 * and prints a performance budget verdict. Existing frames in the target folders are removed first.
 */
import fs from "node:fs";
import path from "node:path";
import { execFileSync } from "node:child_process";

const argv = process.argv.slice(2);
const flag = (n, d) => { const i = argv.indexOf(n); return i > -1 && argv[i + 1] && !argv[i + 1].startsWith("--") ? argv[i + 1] : d; };
const has = (n) => argv.includes(n);
const [input, outDir] = argv.filter((a, i) => !a.startsWith("--") && !(i > 0 && argv[i - 1].startsWith("--") && !["--smooth", "--alpha"].includes(argv[i - 1])));
if (!input || !outDir) { console.error("usage: make-frames.mjs <video> <outDir> [--fps 30 --width 1600 --mobile-width 900 --format webp --quality 78]"); process.exit(1); }

function findFfmpeg() {
  const home = process.env.USERPROFILE || process.env.HOME || "";
  const cands = [process.env.MAGIC_SCROLL_FFMPEG, "ffmpeg"];
  const wg = path.join(home, "AppData/Local/Microsoft/WinGet/Packages");
  if (fs.existsSync(wg)) for (const d of fs.readdirSync(wg).filter((d) => d.startsWith("Gyan.FFmpeg")))
    for (const b of fs.readdirSync(path.join(wg, d))) cands.push(path.join(wg, d, b, "bin", "ffmpeg.exe"));
  for (const c of cands.filter(Boolean)) {
    try { if (execFileSync(c, ["-hide_banner", "-encoders"], { encoding: "utf8" }).includes("libwebp")) return c; } catch {}
  }
  throw new Error("No ffmpeg with libwebp found. Set MAGIC_SCROLL_FFMPEG.");
}
const FF = findFfmpeg();
const FP = FF.replace(/ffmpeg(\.exe)?$/i, (m, e) => "ffprobe" + (e || ""));

const probe = JSON.parse(execFileSync(FP, ["-v", "error", "-select_streams", "v:0", "-show_entries",
  "stream=width,height,r_frame_rate,pix_fmt:format=duration", "-of", "json", input], { encoding: "utf8" }));
const st = probe.streams[0];
const srcFps = st.r_frame_rate.split("/").reduce((a, b) => a / b); // "30000/1001"
const start = parseFloat(flag("--start", "0"));
const end = parseFloat(flag("--end", probe.format.duration));
const dur = end - start;
let fps = parseFloat(flag("--fps", "30"));
const maxFrames = parseInt(flag("--max-frames", "150"), 10);
if (dur * fps > maxFrames) fps = Math.floor((maxFrames / dur) * 100) / 100;
const fmt = flag("--format", "webp");
const q = parseInt(flag("--quality", "78"), 10);
const prefix = flag("--prefix", "frame_");
const alpha = has("--alpha");
const smooth = has("--smooth") && fps > srcFps;

function encodeArgs() {
  if (fmt === "webp") return ["-c:v", "libwebp", "-quality", String(q), "-compression_level", "6", "-pix_fmt", alpha ? "yuva420p" : "yuv420p"];
  if (fmt === "avif") return ["-c:v", "libaom-av1", "-still-picture", "1", "-crf", String(Math.round(63 - q * 0.5)), "-cpu-used", "6", "-pix_fmt", alpha ? "yuva420p" : "yuv420p"];
  if (fmt === "png") return ["-c:v", "png", "-pix_fmt", alpha ? "rgba" : "rgb24", "-compression_level", "9"];
  if (fmt === "jpg") return ["-c:v", "mjpeg", "-q:v", String(Math.max(2, Math.round(31 - q * 0.29)))];
  throw new Error("format must be webp|avif|png|jpg");
}

function run(width, sub, crop) {
  const dir = path.join(outDir, sub);
  fs.mkdirSync(dir, { recursive: true });
  for (const f of fs.readdirSync(dir)) if (f.startsWith(prefix)) fs.unlinkSync(path.join(dir, f));
  const vf = [
    smooth ? `minterpolate=fps=${fps}:mi_mode=mci:mc_mode=aobmc:vsbmc=1` : `fps=${fps}`,
    crop ? (() => { const [a, b] = crop.split(":").map(Number); return `crop='min(iw,ih*${a}/${b})':'min(ih,iw*${b}/${a})'`; })() : null,
    `scale=${width}:-2:flags=lanczos`,
  ].filter(Boolean).join(",");
  const ext = fmt === "jpg" ? "jpg" : fmt;
  const args = ["-hide_banner", "-loglevel", "error", "-y", "-ss", String(start), "-t", String(dur), "-i", input, "-vf", vf, "-an",
    ...encodeArgs(), "-start_number", "1"];
  if (fmt === "avif") args.push("-f", "image2");
  args.push(path.join(dir, `${prefix}%04d.${ext}`));
  execFileSync(FF, args, { stdio: "inherit" });
  const files = fs.readdirSync(dir).filter((f) => f.startsWith(prefix)).sort();
  const sizes = files.map((f) => fs.statSync(path.join(dir, f)).size);
  const dims = execFileSync(FP, ["-v", "error", "-show_entries", "stream=width,height", "-of", "csv=p=0", path.join(dir, files[0])], { encoding: "utf8" }).trim().split(",").map(Number);
  // Sanity: numbering must be contiguous from 1.
  files.forEach((f, i) => { if (!f.includes(String(i + 1).padStart(4, "0"))) throw new Error("gap in sequence at " + f); });
  return { path: sub + "/", frameCount: files.length, width: dims[0], height: dims[1],
    totalBytes: sizes.reduce((a, b) => a + b, 0), maxBytes: Math.max(...sizes), avgBytes: Math.round(sizes.reduce((a, b) => a + b, 0) / sizes.length),
    decodedMB: Math.round((dims[0] * dims[1] * 4 * files.length) / 1048576) };
}

const desktop = run(parseInt(flag("--width", "1600"), 10), "desktop", null);
const mw = parseInt(flag("--mobile-width", "900"), 10);
const mobile = mw > 0 ? run(mw, "mobile", flag("--mobile-crop", null)) : null;

const MB = (b) => (b / 1048576).toFixed(2) + " MB";
const budget = { desktopMB: 12, mobileMB: 5, frameKB: 180 };
const verdict = [];
if (desktop.totalBytes > budget.desktopMB * 1048576) verdict.push(`desktop set ${MB(desktop.totalBytes)} > ${budget.desktopMB} MB: lower --quality, --width or --fps`);
if (mobile && mobile.totalBytes > budget.mobileMB * 1048576) verdict.push(`mobile set ${MB(mobile.totalBytes)} > ${budget.mobileMB} MB: lower --mobile-width or frames`);
if (desktop.maxBytes > budget.frameKB * 1024) verdict.push(`largest desktop frame ${Math.round(desktop.maxBytes / 1024)} KB > ${budget.frameKB} KB`);

const manifest = { source: path.basename(input), sourceFps: srcFps, fps, smooth, start, end, format: fmt, quality: q, prefix, pad: 4,
  desktop, mobile, budget, verdict: verdict.length ? verdict : ["within budget"], createdAt: new Date().toISOString() };
fs.writeFileSync(path.join(outDir, "manifest.json"), JSON.stringify(manifest, null, 2));

console.log(`\nframes: desktop ${desktop.frameCount} @ ${desktop.width}x${desktop.height}, ${MB(desktop.totalBytes)} (avg ${Math.round(desktop.avgBytes / 1024)} KB, decoded ~${desktop.decodedMB} MB)`);
if (mobile) console.log(`        mobile  ${mobile.frameCount} @ ${mobile.width}x${mobile.height}, ${MB(mobile.totalBytes)} (avg ${Math.round(mobile.avgBytes / 1024)} KB)`);
console.log("budget: " + manifest.verdict.join("; "));
console.log(`\n<section class="ms-sequence" data-magic-scroll data-frames="${outDir.replace(/\\/g, "/")}/desktop/" data-count="${desktop.frameCount}" data-ext="${fmt === "jpg" ? "jpg" : fmt}"` +
  (mobile ? ` data-mobile-frames="${outDir.replace(/\\/g, "/")}/mobile/" data-mobile-count="${mobile.frameCount}"` : "") + ">");
