FROM cypress/included:5.5.0
COPY package.json .
COPY package-lock.json .
RUN npm install
ENTRYPOINT npx cypress run
