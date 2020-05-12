#!/usr/bin/env bash

yarn build

gsutil acl ch -u AllUsers:R gs://www.img123.tools
gsutil -m rsync -R dist gs://www.img123.tools
