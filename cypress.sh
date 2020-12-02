#!/bin/bash
npm install
cypress run --spec ${CYPRESS_SPEC} --headless --browser chrome
