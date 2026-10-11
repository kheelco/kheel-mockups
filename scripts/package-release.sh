#!/usr/bin/env bash
# Build everything a release carries into dist/: the skill zips and the VS Code extension's .vsix, after checking
# that every file agrees on the version. The release workflow runs this; it can be run locally to try a release.
set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
"$root/scripts/check-version.sh"
"$root/scripts/package-skills.sh"      # recreates dist/
"$root/scripts/package-extension.sh"
cp "$root"/extensions/vscode/dist/*.vsix "$root/dist/"
echo "Release files:"
ls -1 "$root/dist"
