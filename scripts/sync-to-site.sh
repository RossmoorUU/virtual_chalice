#!/usr/bin/env bash
# Build the app and copy the result into the club's website repo.
#
# rossmooruu.org serves this app from /chalice/, so the checked-in copy there
# has to be exactly this app's dist/ — index.html included, because Vite
# content-hashes the asset filenames and index.html is what references them.
# Copying the whole directory is what keeps those references in step; editing
# them by hand is how the previous build went stale.
#
# Usage:
#   ./scripts/sync-to-site.sh                       # default site checkout
#   ./scripts/sync-to-site.sh /path/to/rossmooruu-www
set -euo pipefail

site="${1:-$HOME/workspace/rossmooruu-www}"
target="$site/chalice"

if [ ! -d "$site/_layouts" ]; then
  echo "Not a rossmooruu-www checkout: $site" >&2
  exit 1
fi

here="$(cd "$(dirname "$0")/.." && pwd)"
cd "$here"

npm run build
rsync -a --delete dist/ "$target/"

echo
echo "Synced dist/ to $target"
echo "Now commit it in the site repo:"
echo "  cd $site && git add chalice && git commit -m 'chore: rebuild the virtual chalice'"
