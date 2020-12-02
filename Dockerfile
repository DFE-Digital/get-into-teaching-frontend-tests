FROM cypress/included:5.5.0
COPY package.json .
COPY package-lock.json .
ENTRYPOINT npm install ; cypress run

