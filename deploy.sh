#!/bin/zsh
set -euo pipefail

rm -rf out
STATIC_EXPORT=true npm run build
STATIC_EXPORT=true npm run export
touch out/.nojekyll
