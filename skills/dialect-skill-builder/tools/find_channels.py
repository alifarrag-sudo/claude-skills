"""Find YouTube channels per niche. usage: python -I find_channels.py niches.tsv OUT.tsv  (niches: bucket<TAB>query)"""
import json, subprocess, sys, urllib.parse
from concurrent.futures import ThreadPoolExecutor
sys.stdout.reconfigure(encoding="utf-8")

def find(job):
    b, q = job
    url = "https://www.youtube.com/results?search_query=" + urllib.parse.quote(q) + "&sp=EgIQAg%253D%253D"
    r = subprocess.run(["yt-dlp", "--flat-playlist", "-J", "--playlist-end", "8", url],
                       capture_output=True, text=True, encoding="utf-8", errors="replace", timeout=180)
    try:
        return [(b, q, e["id"], e.get("title") or e.get("channel") or "", e.get("channel_follower_count") or 0)
                for e in json.loads(r.stdout)["entries"]]
    except Exception:
        return []

jobs = [l.rstrip("\n").split("\t", 1) for l in open(sys.argv[1], encoding="utf-8") if l.strip() and not l.startswith("#")]
seen = set()
with open(sys.argv[2], "w", encoding="utf-8") as out, ThreadPoolExecutor(int(sys.argv[3]) if len(sys.argv) > 3 else 2) as ex:
    for rows in ex.map(find, jobs):
        for b, q, cid, title, subs in rows:
            if cid not in seen and subs >= 15000:
                seen.add(cid)
                out.write(f"{b}\t{cid}\t{subs}\t{title}\t{q}\n")
print(len(seen), "channels")
