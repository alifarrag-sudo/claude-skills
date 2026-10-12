#!/bin/bash
# Copy the built skill into the agent's skills folder. Rerun after every update.
# usage (from the project root): bash tools/install_skill.sh <skill-name> [extra destination dir ...]
set -e
name="${1:?skill name}"; shift
for dest in "$HOME/.claude/skills/$name" "$@"; do
  rm -rf "$dest"; mkdir -p "$dest"
  cp skill-build/SKILL.md "$dest/"
  cp -r skill-build/references skill-build/evidence "$dest/"
  [ -f skill-build/native-check.md ] && cp skill-build/native-check.md "$dest/"
  echo "installed -> $dest ($(find "$dest" -type f | wc -l) files)"
done
