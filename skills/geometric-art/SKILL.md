---
name: geometric-art
description: Posterised gradient field with ordered-dither band edges and a pixel dissolve into paper, behind a masked headline reveal. Two uses from one engine, a web/deck hero background (vanilla WebGL2, no deps) and a seek-safe HyperFrames title block (1920×1080, 8s, 18 variables). Inspired by Componentry's Hero Geometric (MIT). Use for "geometric art", "geometric hero", "dithered gradient", "bayer dither background", "pixel gradient", "posterized gradient", "retro print hero", or a calm branded title card or section opener in a web deck or film.
---

# Geometric Art

## First-run setup

Before using this skill for the first time, set it up for the person you are working with.

1. Look for `config/user-config.md` in this skill's folder. If it exists and has no `{{...}}` left in it, read it and skip to the skill.
2. If it is missing, copy `config/user-config.example.md` to `config/user-config.md`.
3. Fill every `{{PLACEHOLDER}}` you can from context you already hold about the user: memory, CLAUDE.md or AGENTS.md, their profile, and existing project files. Note where each value came from.
4. For every `{{TOOL_*}}` value, the config example names the capability it stands for (for example video generation or web search). Check what this agent already has: connected MCP servers, command-line tools on the PATH, and API keys present as environment variables (check the variable names only, never print or store a key). If something fits, propose it. If nothing fits, ask the user which tool they want to use and tell them what to connect or install.
5. Ask the user only for what is still missing, one question at a time. Give a suggested answer with each question so they can accept it in one word.
6. Save the answers to `config/user-config.md`. Never write an API key or token into it: record the tool and the name of the environment variable that holds its key. Read that file at the start of every later use and do not ask again unless the user wants to change something.

Wherever this skill or its reference files show `{{NAME}}`, use the value saved in `config/user-config.md`.


A linear colour ramp is cut into 2 to 8 flat bands. Simplex noise makes the band edges wander, an 8×8 Bayer matrix dithers each edge in chunky pixel cells, and the start corner dissolves into the paper colour. The drift is slow. It reads as print, not glow, so it sits well behind heavy type.

Prerequisites (the first-run step checks for them): a WebGL2 browser for the web use; Node 18+ and the HyperFrames CLI (`npx hyperframes`) for the video block; `playwright-core` plus a Chromium-based browser at {{CHROME_PATH}} for `check.cjs`.

## Files

- `assets/geometric-art.js`: the engine. Exposes `globalThis.GeometricArt = { create, mount, DEFAULTS, parseColors }`.
- `geometric-art.html`: HyperFrames block, composition id `geometric-art`.
- `web-demo.html`: responsive hero with a **Tune** panel. Open it, dial the look, and copy the printed `mount(...)` config.
- `registry-item.json`: HyperFrames registry manifest.
- `check.cjs`: screenshot check of the block and the web demo (see Verify).
- `NOTICE`: third-party licence notice.
- `config/user-config.md`: the user's saved setup (see First-run setup). Never commit it.

## Use 1: web or deck background

```html
<section class="hero" style="position:relative">…</section>
<script src="geometric-art.js"></script>
<script>
  GeometricArt.mount(document.querySelector(".hero"), { colors: ["#0E3B2E", "#1F7A5A", "#F4E9D0"], bands: 5 });
</script>
```

In Vite, put the file in `public/` and add a `<script>` tag, or use `import "./geometric-art.js"` and then `globalThis.GeometricArt`. `mount` returns `{ set(opts), render(t), destroy() }`, or `null` when WebGL2 is missing (the element then gets hard CSS bands). It animates only while on screen, holds a still frame under `prefers-reduced-motion`, and caps DPR at 2. For the headline copy the `.ga-mask` / `.ga-line` CSS from `web-demo.html` (a pure CSS rise, no JS).

## Use 2: HyperFrames block

Copy `geometric-art.html` and `assets/geometric-art.js` to `compositions/geometric-art/` and mount it:

```html
<div data-composition-id="geometric-art" data-composition-src="compositions/geometric-art/geometric-art.html"
  data-start="0" data-duration="8" data-track-index="1" data-width="1920" data-height="1080"></div>
```

```sh
npx --yes hyperframes@0.8.12 render 'compositions/geometric-art/geometric-art.html' --variables '{"headline1":"Built on","headline2":"clear lines","palette":"#111111, #F5F0E6"}'
```

Timeline: bands flood in from the far corner as the dissolve radius shrinks (0 to 2.2s), headlines rise out of masks (0.55s, 0.15s stagger, expo.out), and the description fades up (1.05s). After that it holds with a slow drift to 8s.

## Options

Engine options (`mount` / `create`) and their block variables:

| option (block variable)  | default                  | notes                                                          |
| ------------------------ | ------------------------ | -------------------------------------------------------------- |
| `colors` (`palette`)     | `"#2F6BFF, #EEF5FF"`     | 2 to 8 hex stops, array or comma string; bands spread across them |
| `bands`                  | `4`                      | 2 to 8                                                         |
| `angle`                  | `45`                     | degrees the ramp climbs; 0 = left to right, 90 = bottom to top |
| `noise`                  | `0.25`                   | edge wander; 0 = straight bands                                |
| `scale` (`noiseScale`)   | `1.5`                    | noise frequency                                                |
| `dither`                 | `0.5`                    | 0 = hard edges, 1 = dither across whole bands                  |
| `pixel`                  | web `2`, block `4`       | dither cell in CSS px                                          |
| `fade`                   | `0.35`                   | dissolve radius into paper at the ramp's start corner, in frame heights; 0 = off |
| `paper`                  | `"#FFFFFF"`              | dissolve colour and page background                            |
| `speed`                  | `1`                      | drift; 0 freezes it                                            |

Block-only variables: `headline1`, `headline2`, `description` (leave empty to hide), `ink`, `font`, `fontWeight`, `fontSize` (auto-fits down to 1600px), `letterSpacing`.

## Rules

1. **Video needs `pixel` ≥ 3.** 1–2px dither turns to mush after H.264. The block defaults to 4.
2. **Check ink against the centre band.** The headline sits on the middle of the ramp. With a dark-to-light palette the middle is mid-tone, so pick ink with contrast against it, or turn the angle so the light end sits behind the copy.
3. **Arabic is handled.** If any copy has Arabic, the block sets RTL, zeroes tracking (tracking breaks letter joining) and loosens leading so the mask does not clip. Pass an Arabic font through `font` ({{HEADLINE_FONT}} if it covers Arabic). The web demo leaves this to you: set `dir="rtl"` and `letter-spacing: 0`.
4. **Seek-safe.** Every frame is a pure function of `(t, fade)`: no rAF, no Date.now, and the canvas is created at runtime. Keep it that way. GSAP `seek()` suppresses `onUpdate`, so seek with the `hf-seek` event (as Studio does) or `tl.seek(t, false)`.
5. **One look per piece.** Palette and angle are the brand levers. Leave noise and dither near default unless asked.

## Palette starting points

With a brand: start from {{BRAND_PALETTE}}, ordered dark to light, and set `font` to {{HEADLINE_FONT}}. Without one:

- Original blue: `#2F6BFF, #EEF5FF`, 4 bands, 45°
- Forest print: `#0E3B2E, #1F7A5A, #F4E9D0`, 5 bands, paper `#F4E9D0`
- Ink mono: `#111111, #F5F0E6`, 3 bands, dither 0.8, paper `#F5F0E6`
- Desert dusk: `#3A1C4A, #C2410C, #FCD9A8`, 6 bands, 120°

## Verify

Open `web-demo.html` directly (file:// works; the script is classic, not a module). For the block, seek a few times with `hf-seek` in a headless Chrome and screenshot: `node check.cjs [outDir]` does this at five seek points plus an Arabic variant and the web demo at desktop and phone sizes, and exits 1 on any page error. It needs `npm i playwright-core` in this folder, network access (the block loads GSAP from a CDN), and an installed Chrome; set `GEOMETRIC_ART_CHROME` to {{CHROME_PATH}} to use another Chromium-based browser. Frame 0 is a dithered dissolve, the art is full from about 2.2s, and a WebGL error surfaces as a thrown shader log in the console.

## Credits

Inspired by the Hero Geometric component in Componentry by harshjdhv (MIT). See `NOTICE`. Simplex noise is by Ashima Arts / Ian McEwan (MIT).
