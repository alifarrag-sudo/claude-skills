"""Harvest Snapchat Spotlight (public web, no login) for dialect research.
usage: python -I snap_harvest.py topics.tsv CORPUS_DIR [workers=4]
topics.tsv: bucket<TAB>hashtag-or-@username
Writes CORPUS_DIR/<bucket>/snap_<id>.json in the same shape as harvest.py, plus "media_url" for watching.
"""
import json, os, re, subprocess, sys, urllib.parse
from concurrent.futures import ThreadPoolExecutor

UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0 Safari/537.36"
NEXT = re.compile(r'<script id="__NEXT_DATA__"[^>]*>(.*?)</script>', re.S)


def page(url):
    r = subprocess.run(["curl", "-s", "-L", "--max-time", "60", "-A", UA, url], capture_output=True)
    m = NEXT.search(r.stdout.decode("utf-8", "replace"))
    return json.loads(m.group(1))["props"]["pageProps"] if m else {}


def cards(src):
    url = (f"https://www.snapchat.com/{src}" if src.startswith("@")
           else "https://www.snapchat.com/explore/" + urllib.parse.quote(src))
    pp = page(url)
    out = {}
    for sid, c in (pp.get("spotlightCardMap") or {}).items():
        txt = json.dumps(c, ensure_ascii=False)
        g = lambda k: (re.search(r'"' + k + r'": ?"([^"]*)"', txt) or [None, ""])[1]
        out[sid] = {"desc": g("description"), "views": g("viewCount"), "media_url": g("mediaUrl"),
                    "hashtags": sorted(set(re.findall(r'"title": ?"(#?[^"]+)", ?"isServerSuggested"', txt)))}
    # profile pages keep spotlight snaps under spotlightHighlights / story snaps under story
    for st in (pp.get("spotlightHighlights") or []) + [pp.get("story") or {}]:
        for sn in st.get("snapList", []) if isinstance(st, dict) else []:
            sid = sn.get("snapId", {}).get("value") if isinstance(sn.get("snapId"), dict) else sn.get("snapId")
            if sid:
                out.setdefault(sid, {"desc": st.get("storyTitle", {}).get("value", "") if isinstance(st.get("storyTitle"), dict) else "",
                                     "views": "", "hashtags": [],
                                     "media_url": (sn.get("snapUrls") or {}).get("mediaUrl", "")})
    return out


def fetch(bucket, src, sid, meta, corpus):
    dest = os.path.join(corpus, bucket, f"snap_{sid[:40]}.json")
    if os.path.exists(dest):
        return "skip"
    pp = page(f"https://www.snapchat.com/spotlight/{sid}")
    ec = pp.get("encodedComments") or []
    if isinstance(ec, str):  # usually arrives as one JSON string
        try:
            ec = json.loads(ec)
        except ValueError:
            ec = []
    comments = [{"t": c["replyText"], "reply": False,
                 "likes": sum(int(r.get("reactCount", 0) or 0) for r in c.get("reactCounts", []) if isinstance(r, dict))}
                for c in ec if isinstance(c, dict) and c.get("replyText")]
    vtt = "\n".join(re.sub(r"^\d\d:.*$|WEBVTT", "", v.get("text", ""), flags=re.M).strip()
                    for v in (pp.get("transcriptMap") or {}).values())
    # videoMetadata holds the creator's own caption, the creator, and an UNENCRYPTED mp4 (card mediaUrl is encrypted)
    vm = pp.get("videoMetadata") or {}
    cr = (vm.get("creator") or {}).get("personCreator") or {}
    rec = {"id": f"snap_{sid[:40]}", "platform": "snapchat", "snap_id": sid, "bucket": bucket, "query": src,
           "title": (vm.get("name") or meta["desc"])[:300], "channel": f"{cr.get('name', '')} @{cr.get('username', '')}",
           "views": vm.get("viewCount") or meta["views"], "upload_date": vm.get("uploadDateMs", ""),
           "description": " ".join(meta["hashtags"]), "transcript": vtt, "media_url": vm.get("contentUrl", ""),
           "comments": [c for c in comments if c["t"]]}
    os.makedirs(os.path.dirname(dest), exist_ok=True)
    json.dump(rec, open(dest, "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    return f"ok snap {sid[:16]} c={len(rec['comments'])} t={len(vtt)}"


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    tfile, corpus = sys.argv[1], sys.argv[2]
    workers = int(sys.argv[3]) if len(sys.argv) > 3 else 4
    jobs = [l.rstrip("\n").split("\t", 1) for l in open(tfile, encoding="utf-8") if l.strip() and not l.startswith("#")]
    seen, tasks = set(), []
    with ThreadPoolExecutor(workers) as ex:
        for (b, src), cs in zip(jobs, ex.map(lambda j: cards(j[1]), jobs)):
            print(f"topic [{b}] {src}: {len(cs)}", flush=True)
            for sid, meta in cs.items():
                if sid not in seen:
                    seen.add(sid)
                    tasks.append((b, src, sid, meta))
        for res in ex.map(lambda t: fetch(*t, corpus), tasks):
            print(res, flush=True)
    print(f"DONE {len(tasks)} snaps", flush=True)


if __name__ == "__main__":
    main()
