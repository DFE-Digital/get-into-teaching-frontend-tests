
# DfE - Get Into Teaching Automated Cypress Tests

Integration tests using [Cypress](https://www.cypress.io/); ensures the GiT systems are all working together correctly on our test environment.

## Setup

1. Install the latest version of [node](https://nodejs.org/en/)
2. Install all the node dependencies:

```bash
npm install
```

3. In the `cypress.json` file edit the `env` section and replace the redacted credentials with real ones, you will need to get these from another dev or team member.

## Running

The commands are built into the test command within the `package.json.` By default the tests will run in a headerless browser and output results to the terminal.

```bash
npm run specs
```

You can run with a headed browser and only certain tests by passing arguments to the command:

```bash
npm run specs -- --headed --spec ./cypress/integration/mailing_list.js
```

If you want to run a single test you can isolate it with `it.only(...)`

## Automation

The Cypress tests are ran on every deploy for the Get into Teaching website, Get an Adviser service and GiT API. 

## Docker

### Building on Docker

```bash
docker build . -t <tagname>
```

### Running on Docker with default settings

Note: Shared Memory size may need to be increased depending on the number of tests

```bash
docker run -i -v $PWD:/test --shm-size=1g -e CYPRESS_HTTPAUTH_PASSWORD -e CYPRESS_HTTPAUTH_USERNAME -w /test cypress/included:4.2.0
```

### With Different environments

```bash
docker run -i -v $PWD:/test --shm-size=1g -e CYPRESS_HTTPAUTH_PASSWORD -e CYPRESS_HTTPAUTH_USERNAME -w /test cypress/included:4.2.0 --config-file cypress-qa.json
```
