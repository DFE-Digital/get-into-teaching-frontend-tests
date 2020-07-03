// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('logintoApp', () => {
	cy.visit(Cypress.env('baseUrl'), {
		auth: { username: 'getintoteaching', password: 'userneeds' },
	});
});

Cypress.Commands.add('shouldHaveTalkToUsSection', () => {
	cy.contains('Talk to us').should('exist');
	cy.get('.talk-to-us__inner > .strapline').should('have.text', 'Talk to us');
	cy.get(
		'.talk-to-us__inner__table > :nth-child(1) > a > .call-to-action-button'
	).should('have.text', 'Chat online  ');
	cy.get(
		'.talk-to-us__inner__table > :nth-child(2) > a > .call-to-action-button'
	).should('have.text', 'Sign up to talk to a teacher training adviser ');
	cy.get('.talk-to-us__inner__freephone > p').should(
		'have.text',
		'\n                    If you’d prefer, you can call us about teaching or teacher training on Freephone 0800 389 2500, Monday-Friday between 8.30am and 5pm.\n                    0800 389 2500.\n                '
	);
});

Cypress.Commands.add('shouldHaveFooter', () => {
	cy.get('.footer-bottom').should(
		'contain.text',
		'Feedback\n             | \n            Cookies\n             | \n            Privacy notice\n             | \n            Accessibility\n            \n            All content is available under the Open Government License v.3.0, except where otherwise stated\n        \n    '
	);
});
