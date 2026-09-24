#!/usr/bin/env bash
# Populate target/ (git-ignored) as a mockup project space, the way the mockup-init skill does, so the mechanism
# can be tried and developed without installing the skill.
#
#   scripts/init-target.sh [--empty | --jui] [--reset] [--serve [port]]
#
#   (default)  starter mode: the starter design system and the example mockups
#   --empty    empty mode: only the viewer and an empty manifest
#   --jui      the JUI design system and its example mockups (as mockup-init-jui installs them)
#   --reset    delete target/ first and start again
#   --serve    serve target/ afterwards (default port 8000)
#
# Files in the design system and examples are never overwritten, so your edits in target/ survive a re-run.
# The viewer files (index.html, _runtime.js, _guide.md) are always refreshed from the templates, so a re-run picks
# up runtime changes.
set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
skills="$root/plugins/kheel-mockup/skills"
assets="$skills/mockup-init/assets"
target="$root/target"
mode=starter
reset=false
serve=false
port=8000

while [[ $# -gt 0 ]]; do
  case "$1" in
    --empty) mode=empty ;;
    --jui) mode=jui ;;
    --reset) reset=true ;;
    --serve) serve=true; if [[ "${2:-}" =~ ^[0-9]+$ ]]; then port="$2"; shift; fi ;;
    -h|--help) sed -n '2,16p' "$0" | sed 's/^# \{0,1\}//'; exit 0 ;;
    *) echo "Unknown option: $1 (see --help)" >&2; exit 1 ;;
  esac
  shift
done

# copy_new SRC DEST — copy files from SRC into DEST, skipping any that already exist
copy_new() {
  (cd "$1" && find . -type f) | while read -r f; do
    if [[ ! -e "$2/$f" ]]; then mkdir -p "$(dirname "$2/$f")"; cp "$1/$f" "$2/$f"; fi
  done
}

if $reset; then rm -rf "$target"; echo "Removed target/"; fi
mkdir -p "$target/design-system"

if [[ -f "$target/design-system/README.md" ]]; then
  echo "target/ already has a design system; keeping it (use --reset to start again)"
else
  if [[ $mode == jui ]]; then copy_new "$skills/mockup-init-jui/assets/jui" "$target"; else copy_new "$assets/$mode" "$target"; fi
  echo "Initialised target/ in $mode mode"
fi
cp "$assets/viewer/"* "$target/design-system/"
echo "Viewer refreshed (runtime $(sed -n "s/^export const VERSION = '\(.*\)';/\1/p" "$assets/viewer/_runtime.js"))"

if ! $serve; then
  echo
  echo "To view:  scripts/init-target.sh --serve   (or: cd target && python3 -m http.server $port)"
  exit 0
fi

cd "$target"
url="http://localhost:$port/design-system/"
echo
echo "Serving target/ at $url  (Ctrl-C to stop)"
if command -v python3 >/dev/null 2>&1 && python3 -c 'import http.server' >/dev/null 2>&1; then
  exec python3 -m http.server "$port"
elif command -v py >/dev/null 2>&1; then
  exec py -m http.server "$port"
elif command -v npx >/dev/null 2>&1; then
  exec npx --yes http-server -p "$port" -c-1 .
else
  echo "No static file server found. Install Python 3 (macOS: xcode-select --install) or Node.js, then re-run." >&2
  exit 1
fi
