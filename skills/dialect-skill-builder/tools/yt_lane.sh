#!/bin/bash
# One YouTube lane (one IP): runs jobs from tools/lane_jobs.txt in order, one at a time, waiting out bot challenges.
# Run from the project root. Line format: <queries.tsv> <corpus_dir> <per_query> <max_comments>
# A job is done when its logs/*.done marker exists. Append lines while it runs; it exits when every job is done.
# PROBE_URL: any public video that normally loads (override with env PROBE_URL).
PROBE_URL="${PROBE_URL:-https://www.youtube.com/watch?v=jNQXAC9IVRw}"
mkdir -p logs
while :; do
  job=""; while read -r q c n m; do
    [ -z "$q" ] && continue; mk="logs/lane_$(echo "$q" | tr '/\:' '___').done"
    [ -f "$mk" ] || { job="$q $c $n $m"; break; }
  done < tools/lane_jobs.txt
  [ -z "$job" ] && { echo "$(date +%T) lane empty, exiting"; exit 0; }
  set -- $job; mk="logs/lane_$(echo "$1" | tr '/\:' '___').done"
  until yt-dlp -q --skip-download --print id "$PROBE_URL" >/dev/null 2>&1; do
    echo "$(date +%T) challenged, waiting 10 min"; sleep 600; done
  echo "$(date +%T) START $job"
  python -I tools/harvest.py "$1" "$2" "$3" "$4" 2 > "logs/lane_$(basename "$1" .tsv)_$(date +%H%M).log" 2>&1
  grep -q '^DONE' logs/lane_$(basename "$1" .tsv)_*.log && touch "$mk"
  echo "$(date +%T) END $job"
done
