"""Pick YouTube videos to watch per bucket. usage: python -I pick_watch.py CORPUS OUT.tsv"""
import glob, json, os, sys
QUOTA = {"telfaz11": 16, "series": 10, "comedy": 10, "films": 8, "gen_old": 8, "rap": 6, "songs": 4,
         "gen_young": 6, "gen_women": 6, "pod": 4, "sports": 4, "compare": 6}
DEFAULT = 5  # each regional bucket
rows = []
for bdir in sorted(glob.glob(os.path.join(sys.argv[1], "*"))):
    b = os.path.basename(bdir)
    vids = [json.load(open(f, encoding="utf-8")) for f in glob.glob(os.path.join(bdir, "*.json"))
            if not os.path.basename(f).startswith("snap_")]
    # speech-bearing videos with an engaged audience; one per channel so a bucket is not one creator
    vids = [v for v in vids if (v.get("duration") or 0) >= 30 and len(v["comments"]) >= 20]
    vids.sort(key=lambda v: -(v.get("views") or 0))
    seen, picked = set(), []
    for v in vids:
        if v["channel"] not in seen:
            seen.add(v["channel"]); picked.append(v)
        if len(picked) >= QUOTA.get(b, DEFAULT):
            break
    rows += [f"{b}\t{v['id']}\t{(v['title'] or '')[:70]}" for v in picked]
open(sys.argv[2], "w", encoding="utf-8").write("\n".join(rows) + "\n")
print(len(rows), "videos to watch")
