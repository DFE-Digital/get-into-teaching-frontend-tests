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

Cypress.Commands.add("logintoApp", () => {
	cy.visit(Cypress.env("baseUrl"), {
		auth: { username: "getintoteaching", password: "userneeds" },
	});
	cy.get(".cookie-acceptance__dialog > .call-to-action-button").click();
});

Cypress.Commands.add("shouldHaveTalkToUsSection", () => {
	cy.get(".talk-to-us__inner > .strapline")
		.should("exist")
		.then(function (sectionText) {
			cy.log(sectionText.text());
		});

	cy.get(
		"div.talk-to-us__inner__table__column:nth-child(1) > a.call-to-action-button:nth-child(2)"
	)
		.should("exist")
		.then(function (buttonText) {
			cy.log(buttonText.text());
		});
	cy.get(".talk-to-us__inner__table > :nth-child(2) > .call-to-action-button")
		.should("exist")
		.then(function (buttonText) {
			cy.log(buttonText.text());
		});
});

Cypress.Commands.add("shouldHaveFooter", () => {
	cy.get(".footer-bottom")
		.should("exist")
		.then(function (linkText) {
			cy.log(linkText.text());
		});
});

Cypress.Commands.add("shouldHavePageNavigation", () => {
	[
		"Home",
		"Funding your training",
		"Steps to become a teacher",
		"Teaching as a career",
		"Salaries and Benefits",
		"Find an event near you",
		"Talk to us",
	].forEach((text) => {
		cy.get("div.navbar__desktop").should("contain", text);
	});
});
