@echo off
CALL ./node_modules/.bin/gulp clean
CALL ./node_modules/.bin/gulp mini-css
CALL ./node_modules/.bin/gulp mini-js
CALL ./node_modules/.bin/gulp images
CALL ./node_modules/.bin/gulp rev

