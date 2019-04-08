#!/usr/bin/env bash

yarn build && scp -r  ./build/* dawnleo@amoeba.social:/home/dawnleo/new.nishants.site/public/
