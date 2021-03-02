# DfE - Get Into Teaching Automated Cypress Tests
Front End automation collection using [Cypress](https://www.cypress.io/). This will be used for live journey checks and a regression and also features a smoke pack.

## Setup
- Install the latest version of [node](https://nodejs.org/en/)
- Run the following comands from the terminal 
```bash 
    npm install
    npm install -D cypress-axe
```
- In the `cypress.json` file edit the `env` section and replace the redacted credentials with real ones, you will need to get these from another dev or team member
```
"env": {
	"baseurl_tta_flow": "https://get-teacher-training-adviser-service-test.london.cloudapps.digital/",
	"HTTPAUTH_USERNAME": "g*************g",
        "HTTPAUTH_PASSWORD": "u*************s",
        "EVENT_USER_EMAIL_API_KEY": "***************",
	"MAILING_LIST_USER_EMAIL_API_KEY": "***************",
	"TTA_USER_EMAIL_API_KEY": "***************"
}
```

## Running
The commands are built into the test command within the `package.json.`  By default the tests will run in a headerless browser and output results to the terminal.  The tests take a significant chunk of time to execute so it is best to not run them in batch in this way. To do so, use the following command.
```bash
npm test
```

To target a single 'pack' of tests, and execute them in headerless mode as above, pass the --spec variable along with the test pack filename. The test packs are located at 'cypress/integration/' this is the command to run the `homepage-smoke.spec.js`
```bash
npm run test -- --spec './cypress/integration/homepage-smoke.spec.js'
```

If you want to run the tests visually, whilst only focusing on a single test pack (this would be the recommended workflow) then add the --headed varaible too, and run the following command
```bash
npm run test -- --headed --spec './cypress/integration/homepage-smoke.spec.js'
```

To target your test run at a specific browser, use the --browser variable instead of the --headed variable (using a browser implies this will be run with a header so no need to also include the --headed). A list of browsers supported by Cypress can be fund [here](https://docs.cypress.io/guides/guides/launching-browsers.html#Browsers)
```bash
npm run test --  --browser chrome --spec './cypress/integration/homepage-smoke.spec.js'
```

## Automated Test Schedule
We have 2 environments which we want to execute the tests on, Development and QA. Using GitHub actions we have set up the following scheduled test runs:

| Environment         | Git Branch   | Scheduled Run Time |
| ------------------- | ------------ | ------------------ |
| Development Active  | master       | 23:00 UTC          |
| Development Passive | passive_test | 23:00 UTC          |
| QA Passive          | passive_test | 22:00 UTC          |

It is possible to run these actions manually at any time using [GitHub actions](https://github.com/DFE-Digital/get-into-teaching-frontend-tests/actions)

# Docker
## Building on Docker
```bash
docker build . -t <tagname>
```
## Running on Docker with default settings
Note: Shared Memory size may need to be increased depending on the number of tests
```bash
docker run -i -v $PWD:/test --shm-size=1g -e CYPRESS_HTTPAUTH_PASSWORD -e CYPRESS_HTTPAUTH_USERNAME -w /test cypress/included:4.2.0
```
## With Different environments
```bash
docker run -i -v $PWD:/test --shm-size=1g -e CYPRESS_HTTPAUTH_PASSWORD -e CYPRESS_HTTPAUTH_USERNAME  -w /test cypress/included:4.2.0 --config-file cypress-qa.json
```

