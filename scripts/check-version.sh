#!/usr/bin/env bash
# Check that every file carrying the project's version agrees with VERSION (scripts/set-version.sh sets them).
set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
version="$(tr -d '[:space:]' < "$root/VERSION")"
if [[ ! "$version" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  echo "✗ VERSION: '$version' is not X.Y.Z" >&2
  exit 1
fi

status=0
check() {
  local file="$1" expr="$2" found
  found="$(node -p "const j = require('$root/$file'); $expr")"
  if [[ "$found" != "$version" ]]; then
    echo "✗ $file: version $found, VERSION is $version — run scripts/set-version.sh $version" >&2
    status=1
  fi
}
check plugins/kheel-mockup/.claude-plugin/plugin.json 'j.version'
check extensions/vscode/package.json 'j.version'
check extensions/vscode/package-lock.json 'j.version'
check extensions/vscode/package-lock.json 'j.packages[""].version'

[[ $status -eq 0 ]] && echo "✓ version $version"
exit $status
