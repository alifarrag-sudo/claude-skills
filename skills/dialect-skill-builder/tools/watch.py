"""'Watch' YouTube videos: contact sheets of frames + whisper.cpp dialect transcript of the audio.
usage: python -I watch.py watchlist.tsv OUT_DIR [audio_minutes=15]
watchlist.tsv: bucket<TAB>video_id<TAB>label[<TAB>direct media url, e.g. Snapchat]
Writes OUT_DIR/<bucket>/<id>/sheet_1.jpg.. (4x4 frames, row-major, evenly spaced; meta.json has the timestamps)
       OUT_DIR/<bucket>/<id>/whisper.txt
"""
import json, os, subprocess, sys, urllib.request

# A dialect prompt nudges whisper to keep dialect spelling instead of normalising to the standard language.
# Default: a Saudi example. Write a 2-line prompt in YOUR target dialect and point WHISPER_PROMPT_FILE at it.
PROMPT = ("هلا والله، وش علومك؟ ابغى اروح معك بس ما ادري وش السالفة. يا شيخ خلك منه، "
          "تكفى لا تفشلني. ايش تبغى؟ كذا يعني، مره حلو. ابشر، سم، طال عمرك.")
# a market can override the prompt: env WHISPER_PROMPT_FILE=<market>/whisper_prompt.txt
if os.environ.get("WHISPER_PROMPT_FILE"):
    PROMPT = open(os.environ["WHISPER_PROMPT_FILE"], encoding="utf-8").read().strip()
FRAMES_PER_SHEET = 16
# Speech-to-text command (whisper.cpp CLI or compatible), whitespace separated; override with env WHISPER_CMD,
# for example a wrapper that queues GPU jobs. Called as: <cmd> -l <lang> --prompt <p> -otxt -of <out> <wav>
WHISPER_CMD = os.environ.get("WHISPER_CMD", "whisper-cli").split()
LANG = os.environ.get("WHISPER_LANG", "ar")


def sh(cmd, timeout=1800):
    return subprocess.run(cmd, capture_output=True, text=True, encoding="utf-8", errors="replace", timeout=timeout)


def duration(path):
    r = sh(["ffprobe", "-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", path])
    return float(r.stdout.strip() or 0)


def watch(bucket, vid, label, out_dir, audio_min, url=""):
    d = os.path.join(out_dir, bucket, vid)
    if os.path.exists(os.path.join(d, "meta.json")):
        return f"skip {vid}"
    os.makedirs(d, exist_ok=True)
    mp4 = os.path.join(d, "v.mp4")
    if url:  # direct media (Snapchat)
        try:  # urllib: Windows curl hangs on the CDN's revocation check
            req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
            open(mp4, "wb").write(urllib.request.urlopen(req, timeout=120).read())
        except OSError as e:
            return f"fail download {vid}: {e}"
    else:
        sh(["yt-dlp", "-f", "bv*[height<=360][vcodec^=avc1]+ba[ext=m4a]/b[height<=360]/bv*[height<=480]+ba",
        "--merge-output-format", "mp4", "-o", mp4,
        f"https://www.youtube.com/watch?v={vid}"])
    if not os.path.exists(mp4):
        return f"fail download {vid}"
    dur = duration(mp4)
    if dur < 1:  # photo snap or broken file: nothing to watch
        os.remove(mp4)
        return f"fail no-video {vid}"
    sheets = 1 if dur < 900 else 2 if dur < 3600 else 3
    n = sheets * FRAMES_PER_SHEET
    stamps = [round(dur * (i + 0.5) / n, 1) for i in range(n)]
    sh(["ffmpeg", "-y", "-v", "error", "-i", mp4, "-vf",
        f"fps={n}/{dur:.2f},scale=320:-2,tile=4x4", "-q:v", "4", os.path.join(d, "sheet_%d.jpg")])
    wav = os.path.join(d, "a.wav")
    sh(["ffmpeg", "-y", "-v", "error", "-i", mp4, "-t", str(audio_min * 60), "-ar", "16000", "-ac", "1", wav])
    w = sh([*WHISPER_CMD, "-l", LANG, "--prompt", PROMPT, "-otxt", "-of", os.path.join(d, "whisper"), wav])
    for f in (mp4, wav):
        if os.path.exists(f):
            os.remove(f)
    ok = os.path.exists(os.path.join(d, "whisper.txt"))
    json.dump({"id": vid, "bucket": bucket, "label": label, "duration": dur, "frame_times_s": stamps,
               "sheets": sheets, "whisper_ok": ok, "whisper_err": "" if ok else w.stderr[-400:]},
              open(os.path.join(d, "meta.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    return f"ok {vid} dur={dur:.0f}s sheets={sheets} whisper={ok}"


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    wl, out_dir = sys.argv[1], sys.argv[2]
    audio_min = int(sys.argv[3]) if len(sys.argv) > 3 else 15
    for line in open(wl, encoding="utf-8"):
        if line.strip() and not line.startswith("#"):
            b, vid, label, url = (line.rstrip("\n").split("\t") + ["", ""])[:4]
            try:
                print(watch(b, vid, label, out_dir, audio_min, url), flush=True)
            except Exception as e:  # keep the batch going; failures are listed in the log
                print(f"fail {vid}: {e}", flush=True)
    print("DONE", flush=True)


if __name__ == "__main__":
    main()
