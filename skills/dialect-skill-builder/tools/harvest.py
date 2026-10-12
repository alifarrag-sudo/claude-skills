"""Harvest YouTube captions + comments for dialect research.
usage: python -I harvest.py queries.tsv OUT_DIR [per_query=5] [max_comments=150] [workers=4]
queries.tsv: bucket<TAB>query  (one per line, # comments ok)
Writes OUT_DIR/<bucket>/<video_id>.json = {id,title,channel,views,upload_date,query,transcript,comments[]}
"""
import json, os, re, subprocess, sys, tempfile, glob
from concurrent.futures import ThreadPoolExecutor

YT = "yt-dlp"


def run(args, timeout=300):
    try:
        return subprocess.run([YT, *args], capture_output=True, text=True, encoding="utf-8",
                              errors="replace", timeout=timeout)
    except subprocess.TimeoutExpired:
        return None


def search(query, n):
    # a URL (channel /videos or /shorts tab) is read as a playlist; anything else is a search
    src = ["--playlist-end", str(n), query] if query.startswith("http") else [f"ytsearch{n}:{query}"]
    r = run(["--flat-playlist", "-J", *src], 120)
    if not r or r.returncode:
        return []
    return [e["id"] for e in (json.loads(r.stdout).get("entries") or []) if e.get("id")]


def vtt_text(path):
    out, last = [], None
    for line in open(path, encoding="utf-8", errors="replace"):
        line = line.strip()
        if not line or "-->" in line or line.startswith(("WEBVTT", "Kind:", "Language:")) or "<c>" in line:
            continue
        line = re.sub(r"<[^>]+>", "", line)
        if line != last:  # auto-captions repeat each line
            out.append(line)
        last = line
    return "\n".join(out)


def fetch(bucket, query, vid, out_dir, max_comments):
    dest = os.path.join(out_dir, bucket, f"{vid}.json")
    if os.path.exists(dest):
        return "skip"
    with tempfile.TemporaryDirectory() as td:
        r = run(["--skip-download", "--write-info-json", "--write-comments",
                 "--write-sub", "--write-auto-sub", "--sub-lang", "ar-orig,ar", "--sub-format", "vtt",
                 "--extractor-args", f"youtube:max_comments={max_comments},all,{max_comments},0;comment_sort=top",
                 "--sleep-requests", "1.5", "--sleep-interval", "4", "--max-sleep-interval", "10", "--sleep-subtitles", "3", "--ignore-errors", "-o", os.path.join(td, "%(id)s"),
                 f"https://www.youtube.com/watch?v={vid}"])
        info_p = os.path.join(td, f"{vid}.info.json")
        if not os.path.exists(info_p):
            return f"fail {vid}: {(r.stderr if r else 'timeout')[-200:]}"
        d = json.load(open(info_p, encoding="utf-8"))
        subs = sorted(glob.glob(os.path.join(td, f"{vid}.ar-orig.vtt"))) or sorted(glob.glob(os.path.join(td, "*.vtt")))
        rec = {
            "id": vid, "bucket": bucket, "query": query, "title": d.get("title"),
            "channel": d.get("channel"), "views": d.get("view_count"), "upload_date": d.get("upload_date"),
            "duration": d.get("duration"), "description": (d.get("description") or "")[:1500],
            "transcript": vtt_text(subs[0]) if subs else "",
            "comments": [{"t": c.get("text", ""), "likes": c.get("like_count") or 0,
                          "reply": c.get("parent") not in (None, "root")}
                         for c in (d.get("comments") or [])],
        }
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    json.dump(rec, open(dest, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    return f"ok {vid} t={len(rec['transcript'])} c={len(rec['comments'])}"


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    qfile, out_dir = sys.argv[1], sys.argv[2]
    per_q = int(sys.argv[3]) if len(sys.argv) > 3 else 5
    max_c = int(sys.argv[4]) if len(sys.argv) > 4 else 150
    workers = int(sys.argv[5]) if len(sys.argv) > 5 else 4
    jobs = [l.rstrip("\n").split("\t", 1) for l in open(qfile, encoding="utf-8")
            if l.strip() and not l.startswith("#")]
    seen, tasks = set(), []
    with ThreadPoolExecutor(workers) as ex:
        for (bucket, q), ids in zip(jobs, ex.map(lambda j: search(j[1], per_q), jobs)):
            print(f"search [{bucket}] {q}: {len(ids)}", flush=True)
            for vid in ids:
                if vid not in seen:
                    seen.add(vid)
                    tasks.append((bucket, q, vid))
        for res in ex.map(lambda t: fetch(*t, out_dir, max_c), tasks):
            print(res, flush=True)
    print(f"DONE {len(tasks)} videos", flush=True)


if __name__ == "__main__":
    main()
