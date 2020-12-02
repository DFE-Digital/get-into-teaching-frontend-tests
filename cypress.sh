#!/bin/bash
npm install
cypress run --reporter-options=${CYPRESS_REPORTER_OPTIONS} --config=${CYPRESS_CONFIG} --spec ${CYPRESS_SPEC} --headless --browser chrome
