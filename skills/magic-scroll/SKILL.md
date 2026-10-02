---
name: magic-scroll
description: >
  Magic Scroll: premium scroll-controlled product animation with a liquid glass layer.
  An object, pack, device, logo or scene transforms frame by frame as the visitor
  scrolls (assemble, explode, open, rotate, reveal, before/after, material change,
  zoom to detail), rendered on a sticky canvas from an image sequence, with Apple-style
  liquid glass panes (vanilla port of rdev/liquid-glass-react) refracting the live
  sequence behind them. Covers start/end keyframes, AI transition video, frame
  extraction, WebP/AVIF optimisation, the reusable component, mobile sets,
  reduced-motion and poster fallbacks, and a Chrome QA harness. Use for "magic scroll",
  "Apple-style scroll animation", "make this product animate while scrolling",
  "scroll-controlled product reveal", "make the product assemble as I scroll",
  "turn this video into a scroll animation", "frame-by-frame scroll", "image sequence
  on scroll", "premium product scroll sequence", "make this section feel like an Apple
  product page", "liquid glass", "iOS 26 glass", "glass cards over a scroll animation".
allowed-tools: Bash, Read, Write, Edit, Glob, Grep, AskUserQuestion
---

# Magic Scroll

## First-run setup

Before using this skill for the first time, set it up for the person you are working with.

1. Look for `config/user-config.md` in this skill's folder. If it exists and has no `{{...}}` left in it, read it and skip to the skill.
2. If it is missing, copy `config/user-config.example.md` to `config/user-config.md`.
3. Fill every `{{PLACEHOLDER}}` you can from context you already hold about the user: memory, CLAUDE.md or AGENTS.md, their profile, and existing project files. Note where each value came from.
4. For every `{{TOOL_*}}` value, the config example names the capability it stands for (for example video generation or web search). Check what this agent already has: connected MCP servers, command-line tools on the PATH, and API keys present as environment variables (check the variable names only, never print or store a key). If something fits, propose it. If nothing fits, ask the user which tool they want to use and tell them what to connect or install.
5. Ask the user only for what is still missing, one question at a time. Give a suggested answer with each question so they can accept it in one word.
6. Save the answers to `config/user-config.md`. Never write an API key or token into it: record the tool and the name of the environment variable that holds its key. Read that file at the start of every later use and do not ask again unless the user wants to change something.

Wherever this skill or its reference files show `{{NAME}}`, use the value saved in `config/user-config.md`.


Scroll is the timeline. Scrolling down advances the transformation, scrolling up
reverses it, stopping freezes it on that exact state. The visitor should feel they are
physically moving the product, not watching a video play behind the page. Liquid glass
is the surface the copy sits on: every pane bends the live frame behind it at the rim.

**When invoked, execute the whole pipeline and ship a working, QA'd section.** Do not
stop at an explanation.

## What is in this folder

| Path | What |
|---|---|
| `engine/magic-scroll.js` | The component. Sticky canvas, scroll to frame mapping, DPR, contain/cover, coarse-to-fine + direction-aware preload, mobile set, overlays, reduced motion, poster fallback. No dependencies. |
| `engine/liquid-glass.js` + `liquid-glass-maps.js` | Vanilla port of rdev/liquid-glass-react: same SVG displacement + RGB-split filter chain, elastic pointer pull, rim light. Four map modes. |
| `engine/magic-scroll.css` | Stage, overlays, glass layers, reduced-motion / reduced-transparency / no-JS fallbacks. Override the tokens at the top. |
| `scripts/make-frames.mjs` | Video in, numbered WebP/AVIF/PNG frames out (desktop + mobile), manifest, budget verdict, ready-made markup. |
| `scripts/qa.mjs` | Headless Chrome through the step-16 checklist: 26 checks, screenshots, contact sheet, `report.json`, exit 1 on failure. |
| `demo/index.html` | Reference page for a synthetic 118-frame test sequence. The frames are not shipped; generate them once (below), then `node scripts/qa.mjs --root . --page demo/index.html` passes 26/26. |
| `references/generation.md` | Start/end keyframe spec, what to send to {{TOOL_IMAGE_GEN}} and {{TOOL_VIDEO_GEN}}, transition prompts, frame count and dimension table. |
| `vendor/liquid-glass-react/` | Upstream source + MIT licence (commit ac48eab). Read-only reference. |

- `config/user-config.md`: the user's saved setup (see First-run setup). Never commit it.

Prerequisites (the first-run step checks for them): Node 18+, `npm i` in this folder
(installs `playwright-core` for QA), an ffmpeg build with libwebp (and libaom for AVIF) at
{{FFMPEG_PATH}}, and a Chromium-based browser the QA script can launch at {{CHROME_PATH}}.
QA uses that installed browser, never a bundled Chromium. If ffmpeg is not on the PATH, set
`MAGIC_SCROLL_FFMPEG` to {{FFMPEG_PATH}}; if the browser is not in a standard install
location, set `MAGIC_SCROLL_CHROME` to {{CHROME_PATH}}.

Demo frames (no network, uses ffmpeg's built-in Mandelbrot test source):
```bash
ffmpeg -f lavfi -i "mandelbrot=size=1280x720:rate=24" -t 4 -pix_fmt yuv420p demo/demo-src.mp4
node scripts/make-frames.mjs demo/demo-src.mp4 demo/frames --fps 30 --smooth --width 1280 --mobile-width 720 --mobile-crop 4:5 --quality 70
```
That writes exactly 118 desktop and 118 mobile frames, which `demo/index.html` expects.

## Before anything: house rules

- **Read the project's rules first** (its CLAUDE.md or equivalent). Client material may be
  under NDA. Never send a client's pack, logo or photo to {{TOOL_IMAGE_GEN}},
  {{TOOL_VIDEO_GEN}} or any other generator unless {{GENERATOR_ASSET_POLICY}} or the user
  allows it.
- **Real product, cinematic, never cartoon.** Follow the client's brand and image/video
  guides. Packs stay exactly as supplied: no re-lettering, no translated packs.
- **AI-generated frames in a pitch are labelled concept visuals** when the client bans
  generative imagery in its own communication.
- **Casting follows the market** if people appear. Copy follows the project's language
  rules and {{HOUSE_STYLE_RULES}}.

## Pipeline

### 1. Understand the animation (write it down, 10 lines max)
Object or scene; start state; end state; the transformation between; camera position and
movement (default: locked-off); lighting; background (match the page or transparent);
orientation; style; direction; duration (3 to 6 s of source motion); desktop vs mobile
behaviour; section height (300 to 500 vh desktop, 250 to 360 vh mobile); which messages
appear at which progress. If a website exists, inspect its framework, CSS system, animation
libs, asset pipeline and build before deciding anything, and integrate into its design
system. If the user supplied assets, inspect and use them; do not recreate them.

### 2. Start and end states
Two keyframes, identical dimensions, aspect, camera, lens, lighting, background and
product position unless motion is the point. Change only what the animation requires;
logos, type, proportions and materials must survive. Transparent background only if the
section needs to sit on varied page colours (then the video step needs an alpha-capable
path; see references). Spec template and prompts: `references/generation.md`.

### 3. Transition
Generate a start-to-end transition clip with {{TOOL_VIDEO_GEN}}: send the start frame,
the end frame (pinned as the last frame), the motion prompt, a 5 s duration and the
keyframes' aspect; expect one video file back (inputs, outputs and the prompt pattern are in
`references/generation.md`). Or a supplied product video, or a 3D render. Reject and
regenerate clips with camera jumps, warped branding, flicker, morphing parts or background
drift: scroll scrubbing exposes every one of them, forwards and backwards.

### 4. Image sequence
```bash
node <skill>/scripts/make-frames.mjs clip.mp4 public/sequences/product --fps 30 --width 1600 --mobile-width 900 --quality 78
```
Add `--smooth` for 24 fps AI clips (motion-interpolates to 30), `--mobile-crop 4:5` for a
portrait mobile crop, `--format avif` for smaller files, `--alpha` + `--format webp|png`
for transparency, `--start/--end` to trim, `--max-frames` to cap. It numbers
`frame_0001...` contiguously, checks for gaps, writes `manifest.json` and prints the
budget verdict and the section markup.

### 5 to 8. Build the section
```html
<link rel="stylesheet" href="/magic-scroll/magic-scroll.css">
<section class="ms-sequence" data-magic-scroll
         data-frames="/sequences/product/desktop/" data-count="120"
         data-mobile-frames="/sequences/product/mobile/" data-mobile-count="120"
         data-fit="contain" data-height="400vh" data-mobile-height="300vh">
  <div class="ms-stage">
    <img class="ms-poster" src="/sequences/product/desktop/frame_0001.webp" alt="[describe the product]" width="1600" height="900">
    <canvas class="ms-canvas" aria-hidden="true"></canvas>
    <div class="ms-overlay" data-ms-range="0,0.25" data-liquid-glass data-lg-mode="shader">Headline</div>
    <div class="ms-overlay" data-ms-range="0.25,0.5" data-liquid-glass data-lg-mode="shader">Feature</div>
    <div class="ms-overlay" data-ms-range="0.5,0.75" data-liquid-glass data-lg-mode="shader">Second message</div>
    <div class="ms-overlay" data-ms-range="0.75,1" data-liquid-glass data-lg-mode="shader"><a href="#buy">CTA</a></div>
  </div>
</section>
<script src="/magic-scroll/liquid-glass-maps.js"></script>
<script src="/magic-scroll/liquid-glass.js"></script>
<script src="/magic-scroll/magic-scroll.js"></script>
<script>LiquidGlass.init(); MagicScroll.init();</script>
```
Copy the three engine files into the project's static/public folder (do not hot-link the
skill folder). Preload the first frame with `<link rel="preload" as="image" media=...>`
per breakpoint.

All options (data attribute or `MagicScroll.sequence(section, {...})`): `framesPath`,
`frameCount`, `filePrefix` ("frame_"), `fileExtension` ("webp"), `pad` (4), `fitMode`
("contain" | "cover"), `focusX/focusY` (cover crop anchor, 0.5), `startFrame`, `endFrame`,
`posterFrame` (reduced-motion still, default start), `scrollHeight`, `mobileScrollHeight`,
`mobileFramesPath`, `mobileFrameCount`, `mobileBreakpoint` (768), `preloadStrategy`
("progressive" | "all" | "nearby"), `maxDpr` (2), `onProgress(p, frame)`.

How it behaves, so you can reason about changes:
- progress = -section.top / (section.height - viewport), clamped 0..1;
  frame = round(start + progress x (end - start)). Scroll events only schedule one rAF;
  the canvas redraws only when the frame or canvas size changes.
- Preload: frame 1 first, then coarse to fine (every 16th, 8th, 4th, 2nd, 1st), plus a
  12-frame look-ahead in the current scroll direction. If the wanted frame is not decoded
  yet, the nearest decoded one is drawn, so the stage is never blank.
- `--ms-progress` is set on the section and `--ms-local` / `--ms-vis` on every overlay, so
  any CSS can react. Overlays fade and rise over the first and last 20% of their range; a
  range starting at 0 is visible on load, a range ending at 1 stays on at the end.
- Poster `<img>` sits under the canvas: shown until frame 1 draws, and again if more than
  20% of frames fail (`ms-failed`). Never blank.
- Reduced motion: no pin, no scrub, section height auto, the poster frame only, every
  overlay stacked and visible, CTA working. No-JS gets the same via `@media (scripting: none)`.

Framework wrappers: in React/Next, render the same markup and call
`MagicScroll.sequence(ref.current, opts)` in `useEffect`, returning `api.destroy`; same for
`LiquidGlass.apply(el, opts)` / `handle.destroy`. In Vite, put engine files in `public/`.
Keep one engine, never fork it per project.

### 9. Responsive
Decide mobile deliberately: same sequence at 900 px, a portrait crop (`--mobile-crop 4:5`),
fewer frames (`--max-frames 72` on a second run into a `mobile` folder), shorter scroll
(`data-mobile-height`), or `cover` with `focusX/focusY` keeping the product in frame.
Overlays move to top or bottom bands on phones so they never cover the product. Test
desktop 1440, tablet 768 and phone 390 separately.

### 10. Content overlays
Place overlays with `top/left/right/bottom/inset/grid`, never `transform` (transform is the
motion channel). Keep them off the product's path. Text contrast holds on the busiest frame
it overlaps; if not, raise the glass tint (`data-lg-tint`) rather than the blur.

### Liquid glass rules
- **Modes:** `shader` builds a displacement map for the pane's exact size (use for cards and
  panels); `standard` and `polar` are rdev's pill maps (use for pills and buttons,
  `data-lg-radius="999"`); `prominent` is the strongest bevel. Default scale 70; 30 to 50 is
  calmer on large cards.
- **Refraction is Chromium desktop only.** Safari, Firefox and touch devices get blur +
  saturate + rim light (still reads as glass). `refractOnTouch: true` opts phones in; it
  costs a full filter pass per frame over a moving canvas, so test on a mid-range Android.
- **Never put opacity, filter, clip-path, mask or mix-blend-mode on a glass pane or any of
  its ancestors up to the stage.** Each one becomes the backdrop root and the glass goes
  blind. The CSS fades glass overlays by fading the layers inside the pane, not the pane.
- **Engine notes:** the rims blend normally (a rim `mix-blend-mode` blinds the glass), the
  warp is clipped to the pane's computed `border-radius` (otherwise the filter leaks a grey
  box past rounded corners), and the shader map uses a CPU canvas (a GPU one cost seconds per
  render). If a pane's radius changes after `apply`, call `handle.set({})` so the clip follows.
- Hidden overlays are `visibility: hidden`, so off-range panes cost nothing. Keep one or two
  panes visible at a time over a scrubbing canvas.
- `prefers-reduced-transparency` swaps in an opaque surface; `prefers-reduced-motion` kills
  the elastic pull.

### 11. Accessibility
Poster `alt` describes the product; canvas is `aria-hidden`. All meaning lives in real HTML
text in the overlays. Reduced motion shows one representative frame and every message.

### 12. Performance budget (make-frames and QA both enforce it)
| | Desktop | Mobile |
|---|---|---|
| Frames | 90 to 150 | 60 to 120 |
| Width | 1440 to 1920 | 720 to 1000 |
| Per frame | <= 180 KB | <= 90 KB |
| Whole set | <= 12 MB | <= 5 MB |
| Canvas DPR | capped at 2 | capped at 2 |
Decoded memory is width x height x 4 x frames (the manifest prints it); past about 800 MB
cut frames or width. Over budget: lower quality 5 to 10 points, then width, then frame
count, then switch to AVIF.

### 16. QA (never declare done without it)
```bash
node <skill>/scripts/qa.mjs --root <site root> --page index.html --out qa-out
node <skill>/scripts/qa.mjs --url http://localhost:5173/ --out qa-out     # running dev server
```
Checks, per desktop (1440x900 @2x) and phone (390x844 @3x, touch): first frame, last frame,
no missing frames, forward monotonic and exact, backward reverses, 80 random fast jumps never
blank, canvas DPR-sharp, CLS < 0.05, engine frame cost (avg < 4 ms, max < 16 ms), overlays
in sync, glass live, no 4xx or console errors, download budget; plus reduced motion (static,
no preload, all copy visible) and broken frames (poster shows). Long tasks are reported as
information: headless Chrome rasterises in software, so confirm smoothness on a real phone.
Then look at `qa-out/contact-sheet.jpg` yourself: aspect, crop, product visible, text legible.

## Required output (report in this order)
1. Animation concept  2. Start-state spec  3. End-state spec  4. Transition spec
5. Recommended frame count  6. Recommended dimensions  7. Asset-generation workflow (what
was generated, with which tool, cost)  8. Image-sequence preparation (make-frames manifest)
9. Scroll-animation component (files and markup added)  10. Responsive implementation
11. Performance optimisation (budget numbers)  12. Accessibility fallback
13. Integration instructions  14. QA results (qa.mjs PASS/FAIL lines + contact sheet)

## Known limits
- `feImage` data-URL maps and `backdrop-filter: url()` are Chromium-only by platform, not
  by this code; the fallback is intentional.
- Chromium detection uses `navigator.userAgentData` (marked `NOTE:` in the source).
- `make-frames` needs an ffmpeg build with libwebp (and libaom for AVIF). It tries
  `MAGIC_SCROLL_FFMPEG`, then `ffmpeg` on the PATH, then a WinGet "Gyan.FFmpeg" install on
  Windows.

## Credits

The liquid glass layer is a vanilla port of rdev/liquid-glass-react (MIT, (c) 2025 rdev); its licence is in `vendor/liquid-glass-react/LICENSE`. The shader-mode map follows shuding/liquid-glass, as adapted in that project.
