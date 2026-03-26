#!/usr/bin/env bash
set -euo pipefail

rm -rf .next out
STATIC_EXPORT=true npm run build
STATIC_EXPORT=true npm run export
touch out/.nojekyll
