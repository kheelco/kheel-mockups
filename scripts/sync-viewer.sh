#!/usr/bin/env bash
# The viewer (index.html, _runtime.js, _guide.md) is edited in one place — mockup-init/assets/viewer/ — and copied
# into every other skill that installs it, since each skill must stand alone. Run after changing the viewer.
set -euo pipefail
root="$(cd "$(dirname "$0")/.." && pwd)"
skills="$root/plugins/kheel-mockup/skills"
src="$skills/mockup-init/assets/viewer"
for dir in "$skills"/*/assets/viewer; do
  [[ "$dir" == "$src" ]] && continue
  cp "$src"/* "$dir"/
  echo "✓ $(basename "$(dirname "$(dirname "$dir")")")"
done
