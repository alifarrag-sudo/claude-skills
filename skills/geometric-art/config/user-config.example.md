# geometric-art: user config (example)

Copy this file to `user-config.md` in the same folder, or let the skill fill it on first run.
`user-config.md` is git-ignored: your details never get committed.

| Placeholder | What it means | Example (not real) |
|---|---|---|
| `{{BRAND_PALETTE}}` | Your default palette: 2 to 8 hex stops, dark to light, passed as `colors` / `palette`. | `#14213D, #3D5A80, #F4F1EA` |
| `{{HEADLINE_FONT}}` | The headline font stack for the block's `font` variable and the web hero. Include an Arabic-capable font if you write Arabic. | `"IBM Plex Sans", "Noto Sans Arabic", Arial, sans-serif` |
| `{{CHROME_PATH}}` | A Chromium-based browser `check.cjs` can launch. Leave as `chrome` to use the installed Google Chrome; otherwise set `GEOMETRIC_ART_CHROME` to the path. | `/usr/bin/chromium` |

Prerequisites the first-run step checks: Node 18 or later; the HyperFrames CLI (`npx hyperframes`) if you render the video block; `npm i playwright-core` in this folder if you run `check.cjs`.

## My values

BRAND_PALETTE: {{BRAND_PALETTE}}
HEADLINE_FONT: {{HEADLINE_FONT}}
CHROME_PATH: {{CHROME_PATH}}
