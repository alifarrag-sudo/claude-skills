"""Build per-bucket reading packs + marker-frequency stats from corpus/ and watch/.
usage: python -I digest.py CORPUS_DIR WATCH_DIR OUT_DIR [MARKERS_FILE]
OUT_DIR/<bucket>.md   transcripts (capped) + whisper + substantive comments, per video
OUT_DIR/stats.md      per-bucket frequency of dialect marker words in comments+transcripts
"""
import json, os, re, sys, glob
from collections import Counter

AR = re.compile(r"[؀-ۿ]+")
# marker words to count: deliberately spans regions; analysts discover the rest.
# Default: Saudi and Gulf markers. Pass your market's MARKERS_FILE (4th arg) to replace them.
MARKERS = """وش ويش ايش إيش شنو وشو ابغى ابغي ابي أبي ودي بغيت يبغى تبغى تبين ابيك عشان علشان لأن
كذا كدا كذي چذي هيك الحين الحين دحين ذحين ذلحين هالحين توه تو توني تونا مره مرا مرة حيل وايد كثير
زين طيب تمام اوكي حلو يهبل يجنن خرافي فخم قوي قوية كفو كفوو فزعة هياط طقطقة يطقطق خقة ثقيل دلخ
ياخي يا رجال يارجال يا شيخ ياشيخ يابوي يبه يمه يمّه يبا والله والله وربي ورب قسم تكفى تكفين ابشر
سم لبيه طال عمرك هلا هلا والله يا هلا مرحبا حياك حيّاك عساك يعطيك ما عليه معليش مافي ما فيه ماهو
مب مو مهوب موب ماني مانيب ابد أبد بعد هاه ها اها ايوه ايوا إيوه اي إي ايه إيه لا لاه
ذا ذي هذا هذي هاذي هذولا ذولا دا دي دول هدا هادا اللي الي ياللي ذاك ذيك ذيك
راح بروح باروح بـ با بيصير بيجي حقي حقك حق تبع مال حقت حقتي
بزر بزران عيال ورعان ورع بنيه بنات حرمه حرمة اهل جماعة ربع الربع خوي خويي الخوياء شلة
خلاص بس يكفي زحمة زهقان طفشان طفش ملل مليت يطفش ضايق متضايق مقهور قهر
برو كرنج فايب سيرفر ستريم قيم قيمر بلوك ترند كيوت اوكيه سوري بليز ثانكس لول هههه ههههه خخخخ""".split()
MARKERS = set(MARKERS) - {"ما", "يا", "لا", "اهل", "فيه", "عليه", "شيخ", "رجال", "بعد"}  # fragments of multi-word phrases


def ar_words(s):
    return AR.findall(s or "")


def substantive(c):
    return len(ar_words(c["t"])) >= 4


def main():
    sys.stdout.reconfigure(encoding="utf-8")
    corpus, watch, out = sys.argv[1:4]
    global MARKERS
    if len(sys.argv) > 4:  # MARKERS_FILE: a market's own marker words, whitespace separated
        MARKERS = set(open(sys.argv[4], encoding="utf-8").read().split())
    os.makedirs(out, exist_ok=True)
    stats = {}
    for bdir in sorted(glob.glob(os.path.join(corpus, "*"))):
        b = os.path.basename(bdir)
        cnt, words, parts = Counter(), 0, []
        for f in sorted(glob.glob(os.path.join(bdir, "*.json"))):
            v = json.load(open(f, encoding="utf-8"))
            com = sorted([c for c in v["comments"] if substantive(c)], key=lambda c: -c["likes"])
            text = v["transcript"] + "\n" + "\n".join(c["t"] for c in com)
            ws = ar_words(text)
            words += len(ws)
            cnt.update(w for w in ws if w in MARKERS)
            wp = os.path.join(watch, b, v["id"], "whisper.txt")
            wt = open(wp, encoding="utf-8", errors="replace").read()[:4000] if os.path.exists(wp) else ""
            parts.append(
                f"\n\n## {v['title']}\nid={v['id']} channel={v['channel']} views={v['views']} "
                f"date={v['upload_date']} query={v['query']}\n"
                + (f"### transcript (YouTube captions, capped)\n{v['transcript'][:5000]}\n" if v["transcript"] else "")
                + (f"### whisper transcript (watched)\n{wt}\n" if wt else "")
                + "### comments (substantive, by likes)\n"
                + "\n".join(f"- [{c['likes']}] {c['t'][:400]}".replace("\n", " ") for c in com[:120]))
        open(os.path.join(out, f"{b}.md"), "w", encoding="utf-8").write(f"# bucket: {b}\n" + "".join(parts))
        stats[b] = (words, cnt)
    with open(os.path.join(out, "stats.md"), "w", encoding="utf-8") as fh:
        fh.write("# Marker frequency per 10k Arabic words (comments + captions)\n\n")
        for b, (n, cnt) in stats.items():
            top = ", ".join(f"{w} {cnt[w] * 10000 / max(n, 1):.1f}" for w, _ in cnt.most_common(45))
            fh.write(f"## {b} ({n} words)\n{top}\n\n")
    print("\n".join(f"{b}: {n} words, {os.path.getsize(os.path.join(out, b + '.md')) // 1024} KB"
                    for b, (n, _) in stats.items()))


if __name__ == "__main__":
    main()
