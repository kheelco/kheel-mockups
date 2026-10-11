#!/usr/bin/env bash
# Build, test and package the VS Code previewer (extensions/vscode) as a .vsix in extensions/vscode/dist/.
set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
ext="$root/extensions/vscode"

# The extension carries the repository's licence, since it is installed and redistributed on its own.
if ! cmp -s "$root/LICENSE.md" "$ext/LICENSE.md"; then
  echo "✗ extensions/vscode: LICENSE.md missing or differs from the root one — cp LICENSE.md extensions/vscode/" >&2
  exit 1
fi

cd "$ext"
[[ -d node_modules ]] || npm ci
npm run check
npm test
rm -rf dist
mkdir dist
npm run package
ls dist/*.vsix
