#!/usr/bin/env bash
# Package each skill as a standalone zip for upload to the Claude app (Settings → Capabilities → Skills).
# Each zip contains one folder, <skill-name>/, with SKILL.md at its top.
set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
skills="$root/plugins/kheel-mockup/skills"
dist="$root/dist"

rm -rf "$dist"
mkdir -p "$dist"

status=0

# Every skill that carries the viewer must carry the same one (scripts/sync-viewer.sh copies it).
viewer="$skills/mockup-init/assets/viewer"
for dir in "$skills"/*/assets/viewer; do
  if ! diff -rq "$viewer" "$dir" >/dev/null; then
    echo "✗ $(basename "$(dirname "$(dirname "$dir")")"): viewer differs from mockup-init's — run scripts/sync-viewer.sh" >&2; status=1
  fi
done
for dir in "$skills"/*/; do
  name="$(basename "$dir")"
  skill_md="$dir/SKILL.md"

  if [[ ! -f "$skill_md" ]]; then
    echo "✗ $name: no SKILL.md" >&2; status=1; continue
  fi

  fm_name="$(awk '/^---$/{n++; next} n==1 && /^name:/{sub(/^name:[ ]*/, ""); print; exit}' "$skill_md")"
  fm_desc="$(awk '/^---$/{n++; next} n==1 && /^description:/{sub(/^description:[ ]*/, ""); print; exit}' "$skill_md")"

  if [[ "$fm_name" != "$name" ]]; then
    echo "✗ $name: frontmatter name '$fm_name' does not match folder name" >&2; status=1; continue
  fi
  if [[ -z "$fm_desc" ]]; then
    echo "✗ $name: missing description" >&2; status=1; continue
  fi
  if (( ${#fm_desc} > 200 )); then
    echo "✗ $name: description is ${#fm_desc} characters (max 200)" >&2; status=1; continue
  fi

  (cd "$skills" && zip -qr -X "$dist/$name.zip" "$name" -x '*.DS_Store')
  echo "✓ $name → dist/$name.zip"
done

exit $status
