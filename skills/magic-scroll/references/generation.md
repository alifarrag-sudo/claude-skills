# Generating the sequence

Check the project's rules (and {{GENERATOR_ASSET_POLICY}}) before uploading any client asset to a generator.

## Keyframe spec (fill before generating anything)

```
Object / scene:
Start state:          (what the viewer sees at 0%)
End state:            (what the viewer sees at 100%)
Transformation:       (one sentence; one physical idea, e.g. "the stack separates into its seven layers along the vertical axis")
Camera:               locked-off | slow push-in | orbit N degrees   (lens mm, height, angle)
Lighting:             key direction, softness, colour temperature; identical in both frames
Background:           hex colour matching the page, or transparent (alpha path below)
Orientation:          product facing, label to camera
Framing:              product occupies N% of frame height, centred; safe margin for mobile crop
Output size:          1920x1080 (16:9) or 1600x1600 (1:1 for contain on both layouts)
Must not change:      logo, label type, pack colours, proportions, materials
Messages by progress: 0-25% ... 25-50% ... 50-75% ... 75-100% CTA
```

## Keyframes

- Best: a real pack shot or render for the start frame (supplied by the client), then
  derive the end frame from it with an image edit so camera, light and background match.
- Edit with {{TOOL_IMAGE_GEN}}. Send: the start frame as the reference image, the edit
  prompt, and the output aspect (16:9 or 1:1, same pixel size as the start frame). Expect
  back: one end-frame image at that size.
- Prompt the edit as a delta: "Same camera, same lighting, same seamless #0b0b0c background.
  The bottle is now [end state]. Keep the label, logo and typography exactly as in the
  reference." Then compare the two frames side by side before spending on video.
- Packs stay as supplied. Image models usually re-letter small print; if that happens,
  composite the real pack back over the generated frame.

## Transition video

Generate a start-to-end transition clip with {{TOOL_VIDEO_GEN}}:

| Send | Value |
|---|---|
| Start (first) frame | `start.png` |
| End (last) frame | `end.png`, pinned so the clip lands exactly on the end state |
| Motion prompt | see the pattern below |
| Duration | 4 to 6 s (5 s default) |
| Aspect | same as the keyframes (16:9 or 1:1) |
| Expect back | one MP4 (or MOV/WebM), no audio needed, at least 24 fps |

If the tool cannot pin an end frame, generate from the start frame only and check the last
frame against `end.png`; otherwise use another tool. Motion prompt
pattern: "Locked-off camera, no camera movement. [Object] slowly [transformation],
smooth continuous motion, constant lighting, background unchanged, no new objects,
label stays sharp and readable throughout." Five seconds at 24 fps is 120 source frames,
plenty for a 400vh section.

Reject a clip when any of these appear, because scrubbing plays them forwards and
backwards at the visitor's own speed: camera jump or drift, flicker, label warp or
re-lettering, parts appearing or vanishing, background or light change, a morph that
is not physically coherent. Regenerate rather than patch.

Alternatives: a supplied product video (trim with `--start/--end`), or a 3D render (Blender
or any 3D package can keyframe an explode or assemble and render a PNG sequence with alpha).

## Transparency

Generators return opaque video. For a sequence that must float over varied page colours:
render in 3D with alpha, or generate on a flat chroma background and key it
(`ffmpeg -vf "colorkey=0x00ff00:0.3:0.1"`) into a PNG sequence, then
`make-frames.mjs --alpha --format webp`. Easier and usually better: make the frame
background exactly the page colour and set `--ms-bg` to match.

## Frame count and dimensions

| Section | Source | Frames | Desktop | Mobile |
|---|---|---|---|---|
| Short reveal (250 to 300 vh) | 3 s | 72 to 90 | 1600 wide | 900 wide |
| Standard (400 vh) | 4 to 5 s | 120 | 1600 to 1920 | 900 |
| Long hero (500 vh+) | 6 s | 150 cap | 1600 | 900, or 72 frames |

More frames than about 30 per 100 vh add weight without visible smoothness. Contain-fit
square sources (1:1) serve both desktop and portrait mobile with one set; 16:9 cover sources
need `--mobile-crop` and a checked `focusX`.
