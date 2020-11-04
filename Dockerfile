FROM cypress/included:5.5.0
RUN npm install - D axe-core@^4
RUN npm install - D cypress@^5
RUN npm install - D cypress-axe
