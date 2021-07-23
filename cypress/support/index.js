// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import "./commands";

Cypress.on("uncaught:exception", (err, runnable) => {
	// this stops tests automtically failing for console errors
	return false;
});

require("@cypress/skip-test/support");

// Disable Turbolinks
Cypress.on('window:load', $window => {
  $window.document.addEventListener('turbolinks:click', event => {
    event.preventDefault()
  })
})

// Alternatively you can use CommonJS syntax:
// require('./commands')
