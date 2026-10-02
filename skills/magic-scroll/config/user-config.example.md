# magic-scroll: user config (example)

Copy this file to `user-config.md` in the same folder, or let the skill fill it on first run.
`user-config.md` is git-ignored: your details never get committed.

| Placeholder | What it means | Example (not real) |
|---|---|---|
| `{{TOOL_IMAGE_GEN}}` | Image generation with a reference image, used to derive the end keyframe from the start keyframe. The skill sends the start frame as reference, an edit prompt and the output aspect; it expects one image back at the same pixel size. Record the tool and the name of the environment variable that holds its key, never the key. | Nano Banana, GPT Image, Flux Kontext, or any image model that edits from a reference image |
| `{{TOOL_VIDEO_GEN}}` | Image-to-video generation with start and end frame support, used for the transition clip. The skill sends the start frame, the end frame (pinned as the last frame), a motion prompt, a duration of 4 to 6 s and the aspect; it expects one MP4 (or MOV/WebM) back, 24 fps or more, no audio needed. Record the tool and the name of the environment variable that holds its key, never the key. | Runway, Kling, Veo, Luma, or any image-to-video model with start and end frame support |
| `{{GENERATOR_ASSET_POLICY}}` | Which client assets (packs, logos, photos) may be uploaded to the generators above, and how AI frames must be labelled. | Client assets only with written client approval; AI frames labelled "concept visual" in pitches |
| `{{HOUSE_STYLE_RULES}}` | Writing rules every piece of overlay copy and report must follow. | Sentence-case headlines, no em dashes, British English |
| `{{FFMPEG_PATH}}` | Path to an ffmpeg build with libwebp (and libaom for AVIF). Set `MAGIC_SCROLL_FFMPEG` to it if ffmpeg is not on the PATH. Prerequisite: the first-run step checks `ffmpeg -encoders` lists libwebp. | `ffmpeg` (on the PATH) or `/opt/homebrew/bin/ffmpeg` |
| `{{CHROME_PATH}}` | A Chromium-based browser the QA script can launch (Chrome, Edge, Chromium). Set `MAGIC_SCROLL_CHROME` to it if it is not in a standard install location. | `/usr/bin/google-chrome` |

Other prerequisites the first-run step checks: Node 18 or later, and `npm i` run once in this skill's folder (installs `playwright-core` from `package.json`).

## My values

TOOL_IMAGE_GEN: {{TOOL_IMAGE_GEN}}
TOOL_VIDEO_GEN: {{TOOL_VIDEO_GEN}}
GENERATOR_ASSET_POLICY: {{GENERATOR_ASSET_POLICY}}
HOUSE_STYLE_RULES: {{HOUSE_STYLE_RULES}}
FFMPEG_PATH: {{FFMPEG_PATH}}
CHROME_PATH: {{CHROME_PATH}}
