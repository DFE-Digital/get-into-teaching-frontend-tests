# DfE - Get Into Teaching Automated Cypress Tests

Front End automation collection using Cypress.io. This will be used for live journey checks and a regression and smoke pack.

## Automated Test Schedule
We have 2 environments which we want to execute the tests on, Development and QA. Using GitHub actions we have set up the following test runs:

- Development Active ( Master Branch) (cypress.json). Ran automatically at 23:00 UTC 
- Development Passive ( Passive_test branch ) (cypress.json) Ran automatically at 23:00 UTC 
- QA Passive ( Passive_test branch) ( cypress-qa.json ) Ran automatically at 22:00 UTC

It is possible to run these actions manually at any time.


## Running locally

### Install System dependencies

System dependencies required to run the tests locally

- [Node.js](https://nodejs.org/en/download/package-manager/#windows) - JavaScript runtime environment.


### Install project dependencies

Once you've aquired the system dependencies, you can now install the project depnendencies.

```bash
npm install
```

### Run the tests via CLI

### Invoke all tests in Electron (default) browser headlessly

```bash
npm test
```

### Invoke all tests in Electron browser in headed mode

```bash
npm run test -- --headed
```

### Invoke all tests in specific browser in headed mode

```bash
npm run test -- --browser browser_name (Ex. npm run test -- --browser chrome)
```

### Invoke all tests in specific browser headlessly

```bash
npm run test -- --headless --browser browser_name (Ex. npm run test -- --headless --browser chrome)
```

### Run the specific spec file

```bash
npm run test -- --spec 'cypress/integration/spec_file_name.js
```

### Running on Docker
```bash
docker run -i -v $PWD:/test -w /test cypress/included:4.2.0
```
