#!/usr/bin/env bash

set -euo pipefail

cd "$(dirname "$0")"

branch="main"
message="${1:-Deploy $(date '+%Y-%m-%d %H:%M:%S')}"

git add -A

if git diff --cached --quiet; then
  echo "No changes to deploy."
  exit 0
fi

git commit -m "$message"
git push origin "$branch"

echo "Deployed to origin/$branch"
