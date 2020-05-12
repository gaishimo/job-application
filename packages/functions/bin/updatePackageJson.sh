#!/bin/bash

# functionのdeploy時にmonorepoの内部package依存がnpm error (404) になるため、
# 回避するために一時的にpackage.jsonを更新する
# 
# "@etco-job-application/core" : "0.0.0" → "file:core"

mv -f package.json package.temp.json
npx ts-node ./bin/_updatePackageJson/update.ts

