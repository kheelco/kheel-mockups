#!/usr/bin/env bash
# Set the project's version: VERSION, and every file that carries it (the plugin, the VS Code extension).
# The release workflow releases a version once it reaches main without a tag; see README.md, "Releasing".
set -euo pipefail

root="$(cd "$(dirname "$0")/.." && pwd)"
version="${1:-}"
if [[ ! "$version" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  echo "usage: $0 X.Y.Z" >&2
  exit 1
fi

echo "$version" > "$root/VERSION"
node -e '
  const fs = require("fs");
  const [file, version] = process.argv.slice(1);
  const json = JSON.parse(fs.readFileSync(file, "utf8"));
  json.version = version;
  fs.writeFileSync(file, JSON.stringify(json, null, 2) + "\n");
' "$root/plugins/kheel-mockup/.claude-plugin/plugin.json" "$version"
(cd "$root/extensions/vscode" && npm version "$version" --no-git-tag-version --allow-same-version > /dev/null)

"$root/scripts/check-version.sh"
echo "Add a '## $version' entry to CHANGELOG.md for the release notes."
