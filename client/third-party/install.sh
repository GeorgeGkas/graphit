#!/bin/sh
for i in $(find ./third-party -type d -maxdepth 1) ; do
  packageJson="${i}/package.json"
  if [ -f "${packageJson}" ]; then
    echo "installing ${i}..."
    cd "${i}"
    yarn
    yarn run build
    cd "../../"
  fi
done
