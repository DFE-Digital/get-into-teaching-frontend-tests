FROM cypress/included:5.5.0
COPY package.json .
COPY package-lock.json .
COPY cypress.sh .
RUN npm install
RUN  chmod 755 cypress.sh
ENTRYPOINT ["./cypress.sh"]

